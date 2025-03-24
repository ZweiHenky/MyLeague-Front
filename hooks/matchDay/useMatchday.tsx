import { getDetailMatchday, getMacth, getMatchdayByDivision } from "@/core/actions/matchDay-actions"
import { useQuery } from "@tanstack/react-query"

interface Props{
    idDivision?:number,
    idMatchday?:number,
    idMatch?:number
}

export const useMatchday = ({idDivision, idMatchday, idMatch}:Props) =>{
    const queryMatchday = useQuery({
        queryKey:["matchday","division", idDivision],
        queryFn:()=>getMatchdayByDivision(idDivision!)
    })

    const queryDetailMatchday = useQuery({
        queryKey:["matchday", "detail", idMatchday],
        queryFn: () => getDetailMatchday(idMatchday!)
    })

    const queryMacth = useQuery({
        queryKey:["match", "detail", idMatch],
        queryFn: () => getMacth(idMatch!),
        staleTime: 1000 * 60 * 5, 
    })

    return {
        queryMatchday,
        queryDetailMatchday,
        queryMacth
    }
}