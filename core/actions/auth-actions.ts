import { Alert } from "react-native";
import { myLeagueApi } from "../api/myLeaguesApi";
import { User } from "../interfaces/auth/user";

export interface AuthResponse {
    token:        string;
    usu_id:       number;
    usu_name:     string;
    usu_last:     string;
    usu_email:    string;
    usu_tel:      string;
}


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

export const authCheckStatus = async () =>{

    try {
        
        const { data } = await myLeagueApi.get<AuthResponse>('/auth/verifyToken')
        
        return returnUserToken(data)
    } catch (error) {
        return null
    }

}