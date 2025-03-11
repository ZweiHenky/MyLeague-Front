import { deleteLeague, getLeaguesByIdUser, postLeague, putLeague } from "@/core/actions/league-actions";
import { PostLeagueResponse } from "@/infraestructure/interfaces/leaguedb-response";
import LeagueInterface from "@/infraestructure/interfaces/leagues.interface";
import { create } from "zustand";

export interface LeagueState{
    leagues: LeagueInterface[];

    saveLeagues: (idUser:number) => Promise<void>;
    newLeague: (nombre:string, direccion:string, descripcion:string, logo:string, idUser:number) => Promise<PostLeagueResponse>;
    updateLeague: (nombre:string, direccion:string, descripcion:string, logo:string, idUser:number, idLiga:string)=>Promise<PostLeagueResponse>;
    deleteLeague:(idLiga:number)=>Promise<Boolean>
}

export const useLeagueStore = create<LeagueState>()((set, get)=>({
    // properties
    leagues:[],

    // actions
    saveLeagues: async(idUser:number)=>{
        const res = await getLeaguesByIdUser(idUser)

        if (!res.status) {
            return
        }
        
        set({leagues: res.data})
        
    },

    newLeague: async(nombre:string, direccion:string, descripcion:string, logo:string, idUser:number)=>{

        const res = await postLeague(nombre, direccion, descripcion, logo, idUser)

        if (res.status) {
            set((state)=>({leagues:[...state.leagues, res.data]}))
        }

        return res
    },

    updateLeague: async(nombre:string, direccion:string, descripcion:string, logo:string, idUser:number, idLiga:string)=>{

        const res = await putLeague(nombre, direccion, descripcion, logo, idUser, idLiga)

        if (res.status) {
            set((state)=>({leagues:[...state.leagues.filter(league => league.id != res.data.id), res.data]}))
        }

        return res
    },
    deleteLeague: async(idLiga:number)=>{

        const res = await deleteLeague(idLiga)
        
        if (!res) {
            return false
        }

        set((state)=>({leagues:[...state.leagues.filter(league => league.id != idLiga)]}))
          
        return true
    }

}))