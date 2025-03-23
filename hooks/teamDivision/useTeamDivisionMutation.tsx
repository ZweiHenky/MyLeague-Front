import { addTeamToDivision, deleteTeamtoDivision, getTeamsByDivision } from "@/core/actions/division-actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { toast } from "sonner-native";


export const useTeamDivisionMutation = () => {

    const queryClient = useQueryClient();

    const mutateTeamsDivision = useMutation({
        mutationFn: (data: any) => addTeamToDivision(data.idDivision, data.idTeam),
        onSuccess: (data, variables, context) => {

            console.log(data,variables,context);
            queryClient.invalidateQueries({queryKey:["teamsDivision"]})
            
            // queryClient.setQueryData(["teamsDivision"], (oldData: any) => {
            //     return [...oldData.data, data]
            // })


            toast.success("Equipo agregado correctamente")
            router.back()

        },

        onError: (error, variables, context) => {
            toast.error("Error al agregar el equipo")
        }
    })

    const mutateDeleteTeamDivision = useMutation({
        mutationFn: (data: any) => deleteTeamtoDivision(data.idDivision, data.idTeam),
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: ["teamsDivision"] });

            toast.success("Equipo eliminada correctamente de la division")
        },
        onError: (error, variables, context) => {       
            
            toast.error("Error al eliminar el equipo de la division")
        }
    });

    return {
        mutateTeamsDivision,
        mutateDeleteTeamDivision
    }
}
