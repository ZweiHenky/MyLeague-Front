import { DivisionResponse, GetDivisionResponse } from "@/infraestructure/interfaces/divisiondb-response"
import { teamsLeaguesApi } from "../api/teamsLeaguesApi"

export const postDivision = async(nombre:string, arbitraje:number, premio:number, descripcion:string, idLiga:number):Promise<DivisionResponse>=> {
    try {

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

    } catch (error:any) {
        return error.response.data
    }

}

export const getDivisions = async():Promise<GetDivisionResponse>=> {
    try {

        const { data } = await teamsLeaguesApi.get<GetDivisionResponse>(`/division`)
        return data

    } catch (error:any) {
        return error.response.data
    }

}

export const deleteDivision = async(idDivision:number):Promise<DivisionResponse>=> {
    try {

        const { data } = await teamsLeaguesApi.delete<DivisionResponse>(`/division/${idDivision}`)
        return data

    } catch (error:any) {
        return error.response.data
    }

}

export const putDivision = async(idDivision:number, nombre:string, premio:number, arbitraje:number, descripcion:string):Promise<DivisionResponse>=> {
    try {

        const { data } = await teamsLeaguesApi.put<DivisionResponse>(`/division/${idDivision}`,{
                nombre,
                descripcion,
                edad_minima: null,
                edad_maxima: null,
                arbitraje,
                premio,
            }
        )
        return data

    } catch (error:any) {
        return error.response.data
    }

}