import { getTeamsByDivision } from "@/core/actions/division-actions";
import { ListTeamResponse } from "@/infraestructure/interfaces/teamdb-response";
import TeamInterface from "@/infraestructure/interfaces/teams.interface";
import { create } from "zustand";

export interface TeamDivision{
    teamByDivision: TeamInterface[];

    saveTeamDivision: (idDivision:number) => Promise<void>;
    newTeamDivision: (nombre:string, idDivision:number) => Promise<Boolean>;
}


export const useTeamDivisionStore = create<TeamDivision>()( (set, get)=>({

    teamByDivision: [],

    saveTeamDivision: async(idDivision:number)=>{
        const res = await getTeamsByDivision(idDivision)

        if (res.status) {
            set({teamByDivision:res.data})
        }
        
    },

    newTeamDivision: async(nombre:string, idDivision:number) => {
        // const res = await postTeamDivision(nombre, idDivision)

        // if (!res.status) {
        //     return false
        // }

        // set((state)=> ({teamByDivision: [...state.teamByDivision , res.data]}))
        
        return true
        
    },

}))