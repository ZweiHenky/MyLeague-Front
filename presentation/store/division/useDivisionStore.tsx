import { deleteDivision, getDivisions, postDivision, putDivision } from "@/core/actions/division-actions";
import { deleteTeam, getTeamsById, postTeam, putTeam } from "@/core/actions/team-actions";
import { DivisionInterface } from "@/infraestructure/interfaces/divisions.interface";
import TeamInterface from "@/infraestructure/interfaces/teams.interface";
import { create } from "zustand";


export interface divisionState{
    divisions: DivisionInterface[];
    // division: DivisionInterface | null

    saveDivisions: (id:number) => Promise<void>;
    newDivision: (nombre:string, premio:number, arbitraje:number, descripcion:string, idLiga:number) => Promise<Boolean>;
    updateDivision: (idDivision:number, nombre:string, premio:number, arbitraje:number, descripcion:string) => Promise<Boolean>;
    deleteDivision: (idDivision:number) => Promise<Boolean>;
}

export const useDivisionStore = create<divisionState>()( (set, get)=>({

    // properties
    divisions: [],
    // division: null,

    // actions
    saveDivisions: async(id:number)=>{
        const res = await getDivisions()

        if (res.status) {
            set({divisions:res.data})
        }
        

    },

    newDivision: async(nombre:string, premio:number, arbitraje:number, descripcion:string, idLiga:number) => {
        const res = await postDivision(nombre, premio, arbitraje, descripcion, idLiga)

        if (!res.status) {
            return false
        }

        set((state)=> ({divisions: [...state.divisions , res.data]}))
        
        return true
        
    },

    updateDivision: async (idDivision:number, nombre:string, premio:number, arbitraje:number, descripcion:string) => {

        const res =  await putDivision(idDivision, nombre, premio, arbitraje, descripcion)

        if (!res.status) {
            return false
        }

        set((state)=> ({divisions: [...state.divisions.filter(div => div.id != idDivision) , res.data]}))

        return true
    },

    deleteDivision: async (idDivision:number) =>{

        const res = await deleteDivision(idDivision)

        if (!res.status) {
            return false
        }

        set((state)=> ({divisions: state.divisions.filter(div => div.id != idDivision) }))

        return true
    }

}))