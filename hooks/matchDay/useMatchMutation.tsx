import { updateMacth } from "@/core/actions/matchDay-actions"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { router } from "expo-router"
import { toast } from "sonner-native"


export const useMatchMutation = () =>{

    const queryClient = useQueryClient()

    const queryMatchMutation = useMutation({
        mutationFn:(data:any)=> updateMacth({match:data}),
        onSuccess: () =>{

            queryClient.invalidateQueries({queryKey:["matchday", "detail"]})

            toast.success("Se modifco el resultado con exito")
            router.back()
        },
        onError:()=>{
            toast.error("Ocurrio un error")
        }
    })

    return{
        queryMatchMutation
    }
}