import LeagueInterface from "@/infraestructure/interfaces/leagues.interface";
import { create } from "zustand";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FavoriteInterface {
  favorites: LeagueInterface[];
  isLoaded: boolean;
  addFavorite: (league: LeagueInterface) => void;
  deleteFavorite: (id: number) => void;
  getFavorites: () => void;
}

export const useFavoriteStore = create<FavoriteInterface>()((set, get) => ({
  favorites: [],
  isLoaded: false,

  // Agregar un favorito
  addFavorite: async (league: LeagueInterface) => {
    const { favorites } = get();

    if (favorites.some(favorite => favorite.id === league.id)) return;

    const updatedFavorites = [...favorites, league];

    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      set({ favorites: updatedFavorites });
    } catch (error) {
      console.error('Error al agregar favorito:', error);
    }
  },

  // Eliminar un favorito
  deleteFavorite: async (id: number) => {
    const { favorites } = get();
    const updatedFavorites = favorites.filter((league) => league.id !== id);

    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      set({ favorites: updatedFavorites });
    } catch (error) {
      console.error('Error al eliminar favorito:', error);
    }
  },

  // Obtener los favoritos
  getFavorites: async () => {
    const { isLoaded } = get();
    if (isLoaded) return;

    try {
      const favorites = await AsyncStorage.getItem('favorites');
      if (favorites) {
        const parsedFavorites = JSON.parse(favorites) as LeagueInterface[];
        if (Array.isArray(parsedFavorites)) {
          set({ favorites: parsedFavorites, isLoaded: true });
        }
      }
    } catch (error) {
      console.error('Error al obtener favoritos:', error);
    }
  },
}));