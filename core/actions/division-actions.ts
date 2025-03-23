import { DivisionResponse, GetDivisionResponse } from "@/infraestructure/interfaces/divisiondb-response"
import { teamsLeaguesApi } from "../api/teamsLeaguesApi"
import { ListTeamResponse } from "@/infraestructure/interfaces/teamdb-response";

export const postDivision = async(nombre:string, arbitraje:number, premio:number, descripcion:string, idLiga:number):Promise<DivisionResponse>=> {

        const { data } = await teamsLeaguesApi.post<DivisionResponse>(`/division`,{
            nombre,
            descripcion,
            edad_minima: null,
            edad_maxima: null,
            arbitraje,
            premio,
            liga:{
                id:idLiga
            }
        })
        return data
}

// mandar id de la liga para la division
export const getDivisions = async(idLiga:number):Promise<GetDivisionResponse>=> {
    try {

        const { data } = await teamsLeaguesApi.get<GetDivisionResponse>(`/division?ligaId=${idLiga}`)
        return data

    } catch (error:any) {
        return error.response.data
    }

}

// mandar id de la liga para la division
export const getDivisionById = async(idDivision:number):Promise<DivisionResponse>=> {

    const { data } = await teamsLeaguesApi.get<DivisionResponse>(`/division/${idDivision}`)
    return data

}

export const deleteDivision = async(idDivision:number):Promise<Boolean>=> {

        const { status } = await teamsLeaguesApi.delete<DivisionResponse>(`/division/${idDivision}`)
        if (status==204) {
            return true
        }

        return false

}

export const putDivision = async(idDivision:number, nombre:string, premio:number, arbitraje:number, descripcion:string, idLiga: number):Promise<DivisionResponse>=> {
    try {

        const { data } = await teamsLeaguesApi.put<DivisionResponse>(`/division/${idDivision}`,{
                nombre,
                descripcion,
                edad_minima: null,
                edad_maxima: null,
                arbitraje,
                premio,
                liga:{
                    id:idLiga
                }
            }
        )
        return data

    } catch (error:any) {

        return error.response.data
    }

}

export const getTeamsByDivision = async(idDivision:number):Promise<ListTeamResponse>=> {

    const { data } = await teamsLeaguesApi.get<ListTeamResponse>(`/equipo?divisionId=${idDivision}`)
    return data
    
}

export const addTeamToDivision = async(idDivision:number, idEquipo:number):Promise<Boolean>=> {

    const { data } = await teamsLeaguesApi.post(`/equipo/${idDivision}/${idEquipo}`)
    return data

}
export const deleteTeamtoDivision = async(idDivision:number, idEquipo:number):Promise<Boolean>=> {

    const { data } = await teamsLeaguesApi.delete(`/equipo?idEquipo=${idEquipo}&idDivision=${idDivision}`)
    return true

}