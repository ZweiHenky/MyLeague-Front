import { postMatchDay } from "@/core/actions/matchDay-actions"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { router } from "expo-router"
import { toast } from "sonner-native"


export const useMatchDayMutation= () =>{
    
    const queryClient = useQueryClient()

    const queryMatchdayMutation = useMutation({
        mutationFn:(data:any)=>postMatchDay({matchDay:data}),
        onSuccess: () =>{

            queryClient.invalidateQueries({queryKey:["matchday","division"]})

            toast.success("Se agrego la jornada con exito")
            router.back()
        },
        onError:(error)=>{
            toast.error("Ocurrio un error")
        }
    })

    return{
        queryMatchdayMutation
    }

}