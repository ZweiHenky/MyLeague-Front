import { getDivisionById, getDivisions } from "@/core/actions/division-actions";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface Props {
    idLiga?:number,
    idDivision?:number
}

export const useDivision = ({idLiga, idDivision}:Props) => {
    const queryClient = useQueryClient();

    const divisionQuery = useQuery({
        queryKey: ["division", idLiga],
        queryFn: () => getDivisions(idLiga!),
    })

    const divisionIdQuery = useQuery({
        queryKey: ["division", idDivision],
        queryFn: () => getDivisionById(idDivision!),
    })

    return {
        divisionQuery,
        divisionIdQuery
    }
}