
import { myLeagueApi } from "../api/myLeaguesApi";
import { AuthResponse, RegisterResponse } from "@/infraestructure/interfaces/authdb-response";
import { User } from "@/infraestructure/interfaces/user.interface";

const returnUserToken = (data:AuthResponse): { user:User, token:string } =>{
    const {token, ...user} = data

    return {
        user,
        token,
    }
}


export const authLogin = async (email:string, password:string) =>{

    email = email.toLowerCase()

    try {
        const { data } = await myLeagueApi.post<AuthResponse>('/auth/login',{
            email,
            password
        })

        return returnUserToken(data)

    } catch (error) {
        return null
    }

}

export const authRegister = async(nombre:string, apellido: string, email:string, telefono:string, password:string)=>{

    email = email.toLowerCase()

    try {
        
        const {data} = await myLeagueApi.post<RegisterResponse>('/auth/register', {
                nombre,
                apellido,
                email,
                telefono,
                password
            }
        )

        return data
        

    } catch (error:any) {
        return error.response
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