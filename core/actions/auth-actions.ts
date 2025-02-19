import { Alert } from "react-native";
import { myLeagueApi } from "../api/myLeaguesApi";
import { AuthResponse } from "@/infraestructure/interfaces/authdb-response";
import { User } from "@/infraestructure/interfaces/user.interface";

const returnUserToken = (data:AuthResponse): { user:User, token:string } =>{
    const {token, ...user} = data

    return {
        user,
        token,
    }
}


export const authLogin = async (email:string, usu_pass:string) =>{

    email = email.toLowerCase()

    try {
        const { data } = await myLeagueApi.post<AuthResponse>('/auth/login',{
            email,
            usu_pass
        })

        return returnUserToken(data)

    } catch (error) {
        return null
    }

}

export const authRegister = async(nombre:string, apellido: string, email:string, telefono:string, usu_pass:string)=>{

    try {
        
        const {data} = await myLeagueApi.post('/auth/register', {
                nombre,
                apellido,
                email,
                telefono,
                usu_pass
            }
        )

        return data
        

    } catch (error) {
        return error
    }

}

export const authCheckStatus = async () =>{

    try {
        
        const { data } = await myLeagueApi.get<AuthResponse>('/auth/verifyToken')
        
        return returnUserToken(data)

    } catch (error) {
        return null
    }

}