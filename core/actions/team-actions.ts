import { CreateTeamResponse, ListTeamResponse, } from "@/infraestructure/interfaces/teamdb-response"
import { teamsLeaguesApi } from "../api/teamsLeaguesApi"
import { AxiosError } from "axios"


export const postTeam = async(nombre:string, logo:string, idUser:number) =>{
   
    try {
        const { data } = await teamsLeaguesApi.post<CreateTeamResponse>("/equipo",{
          nombre,
          logo,
          usuario:{
            id:idUser
          }  
        })

        return data
    } catch (error:any) {
        return error.response
    }
    
}

export const getTeamsById = async(idUser:number)=> {

    try {
        
        const { data } = await teamsLeaguesApi.get<ListTeamResponse>(`/equipo/usuario/${idUser}`)

        return data

    } catch (error:any) {
        return error
    }

}

export const getDetailsTeamById = async(id:number)=>{

}

export const putTeam = async(nombre:string, logo:string, idUser:number, idTeam:string) =>{
    try {
        
        const { data } = await teamsLeaguesApi.put<CreateTeamResponse>(`/equipo/${idTeam}`,{
            nombre,
            logo,
            usuario:{
                id:idUser
            }
        })

        return data

    } catch (error:any) {
        return error.response.data
    }
}

export const deleteTeam = async(idTeam:string)=>{
    try {
        
        const res = await teamsLeaguesApi.delete(`/equipo/${idTeam}`)
        return res

    } catch (error:any) {
        return error.response.data
    }
}