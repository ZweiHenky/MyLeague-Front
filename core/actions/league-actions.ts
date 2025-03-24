import { ListLeagueResponse, PostLeagueResponse } from "@/infraestructure/interfaces/leaguedb-response"
import { teamsLeaguesApi } from "../api/teamsLeaguesApi"
import LeagueInterface from "@/infraestructure/interfaces/leagues.interface"
import { myLeagueApi } from "../api/myLeaguesApi"
import { DetailLeagueResponse } from "@/infraestructure/interfaces/detailAllLeaguedb.-response"


export const getLeaguesByIdUser = async(idUser:number)=> {

    try {

        const { data } = await teamsLeaguesApi.get<ListLeagueResponse>(`/ligas/usuario/${idUser}`)
        return data

    } catch (error:any) {
        return error.response.data
    }

}
export const getLeaguesByName = async(nombre:string)=> {

    const { data } = await myLeagueApi.get<LeagueInterface[]>(`/leagues/search?nombre=${nombre}`)
    
    return data
}

export const getAllLeague = async(page:number)=> {

    const { data } = await myLeagueApi.get<LeagueInterface[]>(`/leagues/search?nombre=&page=${page}`)
    
    return data
}

export const postLeague = async(nombre:string, direccion:string, descripcion:string, logo:string, idUser:number):Promise<PostLeagueResponse>=> {
    try {

        const { data } = await teamsLeaguesApi.post<PostLeagueResponse>(`/ligas`,{
            nombre,
            descripcion,
            direccion,
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
export const putLeague = async(nombre:string, direccion:string, descripcion:string, logo:string, idUser:number, idLiga:string):Promise<PostLeagueResponse>=> {
    try {

        const { data } = await teamsLeaguesApi.put<PostLeagueResponse>(`/ligas/${idLiga}`,{
            nombre,
            descripcion,
            direccion,
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

export const deleteLeague = async(idLiga:number) =>{
    try {

        const {status} = await teamsLeaguesApi.delete(`/ligas/${idLiga}`)

        if (status==204) {
            return true
        }

        return false

    } catch (error:any) {
        return false
    }
}

export const getDetailAllLeague = async(idLiga:number) => {

    const {data} = await teamsLeaguesApi.get<DetailLeagueResponse>(`/ligas/detallesGenerales/${idLiga}`)
    
    return data
}