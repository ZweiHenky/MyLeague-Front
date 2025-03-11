import { SecureStorageAdapter } from "@/helpers/adapters/secure-storage.adapter";
import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_URL_API_ANDROID_TEAMS


export const teamsLeaguesApi = axios.create({
    baseURL: API_URL
})

teamsLeaguesApi.interceptors.request.use( async (config)=>{
    
    const token = await SecureStorageAdapter.getItem('token')

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
} )