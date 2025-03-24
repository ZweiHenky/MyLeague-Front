import { SecureStorageAdapter } from '@/helpers/adapters/secure-storage.adapter'
import axios from 'axios'

const STAGE = process.env.EXPO_PUBLIC_STAGE || 'prod'

const API_URL = process.env.EXPO_PUBLIC_URL_API_ANDROID
const API_URL_LOCAL = process.env.EXPO_PUBLIC_URL_API_ANDROID_LOCAL

const myLeagueApi = axios.create({
    baseURL: API_URL,
})

myLeagueApi.interceptors.request.use( async (config)=>{
    
    const token = await SecureStorageAdapter.getItem('token')

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
} )

export { myLeagueApi }