import { getAllLeague, getLeaguesByName } from "@/core/actions/league-actions"
import { useInfiniteQuery, useQueries, useQuery } from "@tanstack/react-query"

interface Props{
    nombre:string
}

export const useLeague = ({nombre}:Props) =>{

    const queryLeagueByName = useQuery({
        queryKey:["leagueByName",nombre],
        queryFn: () => getLeaguesByName(nombre),
        enabled: nombre.trim() !== ''
    })

    const queryInfinityLeague = useInfiniteQuery({
        initialPageParam: 1,
        queryKey:["allLeague","infinityScroll"],
        queryFn: ({pageParam})=>{
            return getAllLeague(pageParam)
        },
        getNextPageParam: (lastPage, allPages) => {            
            
            if (lastPage.length > 0) {
                return allPages.length + 1;
            }
            return undefined; // No hay más páginass
          },
    })

    return {
        queryLeagueByName,
        queryInfinityLeague
    }
}