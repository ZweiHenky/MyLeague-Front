import { getTeamsByDivision } from "@/core/actions/division-actions";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface Props {
    idDivision:number
}

export const useTeamDivision = ({ idDivision }: Props) => {

    const queryClient = useQueryClient();

    const teamsDivisionQuery = useQuery({
        queryKey: ["teamsDivision", idDivision],
        queryFn: () => getTeamsByDivision(idDivision),
    })

    return {
        teamsDivisionQuery
    }
}
