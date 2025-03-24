import { myLeagueApi } from "../api/myLeaguesApi"
import { teamsLeaguesApi } from "../api/teamsLeaguesApi"


export const getMatchdayByDivision = async(idDivision:number) =>{
    const {data} = await teamsLeaguesApi.get(`/jornada/todas/${idDivision}`)
    return data
}

export const getDetailMatchday = async(idMatchday:number) =>{
    const {data} = await teamsLeaguesApi.get(`/jornada/${idMatchday}`)
    return data
}

export const getMacth = async(idMatch:number) =>{
    const {data} = await teamsLeaguesApi.get(`/partido/${idMatch}`)
    return data
}

export const updateMacth = async({match}:any) =>{

    const {data} = await myLeagueApi.put(`/matchday/match/${Number(match.id)}`,
        {
            golesLocal: Number(match.golesLocal),
            golesVisitante: Number(match.golesVisitante),
        }
    )


    return data
}
export const postMatchDay = async({matchDay}:any) =>{

    const {data} = await teamsLeaguesApi.post(`/jornada`,
        {
            dias: matchDay.dias,
            divisionId: matchDay.divisionId, 
            lapsoTiempo: matchDay.lapsoTiempo, 
            numero: matchDay.numero
        }
    )

    return data
}

