import { deleteDivision, postDivision, putDivision } from "@/core/actions/division-actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { toast } from "sonner-native";


export const useDivisionMutation = () => {

    const queryClient = useQueryClient();

    const mutateDeleteDivision = useMutation({
        mutationFn: (data: any) => deleteDivision(data.idDivision),
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: ["division"] });

            toast.success("Division eliminada correctamente")
            router.back()

        },
        onError: (error, variables, context) => {          
            toast.error("Error al eliminar la division")
        }
    });
    const mutateNewDivision = useMutation({
        mutationFn: (data: any) => postDivision(data.nombre, data.premio, data.arbitraje, data.descripcion, data.idLiga),
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: ["division"] });

            toast.success("Division creada correctamente")
            router.back()

        },
        onError: (error, variables, context) => {
            toast.error("Error al crear la division")
        }
    });
    const mutateUpdateDivision = useMutation({
        mutationFn: (data: any) => putDivision(data.idDivision, data.nombre, data.premio, data.arbitraje, data.descripcion, data.idLiga),
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: ["division"] });

            toast.success("Division Actualizada correctamente")
            router.back()

        },
        onError: (error, variables, context) => {
            toast.error("Error al actualizar la division")
        }
    });
    return {
        mutateDeleteDivision,
        mutateNewDivision,
        mutateUpdateDivision,
    };
}