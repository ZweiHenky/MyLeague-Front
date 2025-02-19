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


export const authLogin = async (usu_email:string, usu_pass:string) =>{

    usu_email = usu_email.toLowerCase()

    try {
        const { data } = await myLeagueApi.post<AuthResponse>('/auth/login',{
            usu_email,
            usu_pass
        })

        return returnUserToken(data)

    } catch (error) {
        return null
    }

}

export const authRegister = async(usu_name:string, usu_last: string, usu_email:string, usu_tel:string, usu_pass:string)=>{

    try {
        
        const {data} = await myLeagueApi.post('/auth/register', {
                usu_name,
                usu_last,
                usu_email,
                usu_tel,
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