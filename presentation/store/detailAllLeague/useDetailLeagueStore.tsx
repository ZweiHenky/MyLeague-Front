import { Data, DetailLeagueResponse, Divisione } from "@/infraestructure/interfaces/detailAllLeaguedb.-response";
import { create } from "zustand";

interface DetailLeagueState{
    detailLeague: Data | null;
    divisions: Divisione[] | null;
    divisionActual: Divisione | null

    save: (data:Data) => Promise<void>;
    selectDivisionActual: (division:Divisione) => Promise<void>
}

export const useDetailLeagueStore = create<DetailLeagueState>()((set, get)=>({

    detailLeague: null,
    divisions: null,
    divisionActual: null,

    save: async(data:Data) =>{
        set({detailLeague:data})

        // const divisiones = data.divisiones.map(el => ({
        //     nombre: el.nombre,
        //     id: el.id
        // }));
        
        set({divisions:data.divisiones})
        
    },

    selectDivisionActual: async(division:Divisione)=>{
        set({divisionActual:division})
    }
}))