import { deleteTeam, getTeamsById, postTeam, putTeam } from "@/core/actions/team-actions";
import TeamInterface from "@/infraestructure/interfaces/teams.interface";
import { create } from "zustand";


export interface teamState{
    teams: TeamInterface[];

    saveTeams: (id:number) => Promise<void>;
    newTeam: (nombre:string, logo:string, id:number) => Promise<Boolean>;
    updateTeam: (nombre:string, logo:string, id:number, idTeam:string) => Promise<Boolean>;
    deleteTeam: (id:string) => Promise<Boolean>
}

export const useTeamStore = create<teamState>()( (set, get)=>({

    // properties
    teams: [],

    // actions
    saveTeams: async(id:number)=>{
        const res = await getTeamsById(id)
        
        if (res.data.length > 0) {
            set({teams: res.data})
        }
    },

    newTeam: async(nombre:string, logo:string, id:number) => {
        const res = await postTeam(nombre, logo, id)

        if (!res.status) {
            return false
        }

        set((state)=> ({teams: [...state.teams , res.data]}))
        
        return true
        
    },

    updateTeam: async(nombre:string, logo:string, id:number, idTeam:string) =>{
        
        const res = await putTeam(nombre, logo, id, idTeam)

        if (!res.status) {
            return false
        }

        set((state)=>(
            {teams: [...state.teams.filter(team=> team.id != Number(idTeam)), res.data]}
        ))
        
        return true
    },

    deleteTeam: async(id:string)=>{

        const res = await deleteTeam(id)

        if (!res.status) {
            return false
        }

        set((state)=>({
            teams:[...state.teams.filter(team=> team.id != Number(id) )]
        }))
        
        return true
    }

}))