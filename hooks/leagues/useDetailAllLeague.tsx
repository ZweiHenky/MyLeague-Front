import { getDetailAllLeague } from "@/core/actions/league-actions"
import { useQuery } from "@tanstack/react-query"


interface Props{
    idLiga:number
}

export const useDetailAllLeague = ({idLiga}:Props) =>{

    const queryDetailAllLeague = useQuery({
        queryKey:["getDetailAllLeague", idLiga],
        queryFn:()=> getDetailAllLeague(idLiga),
    })

    return{
        queryDetailAllLeague
    }
}