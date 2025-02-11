import { authCheckStatus, authLogin } from "@/core/actions/auth-actions"
import { User } from "@/core/interfaces/auth/user"
import { SecureStorageAdapter } from "@/helpers/adapters/secure-storage.adapter"
import { create } from 'zustand'


export type AuthStatus = 'authenticated' | 'unauthenticated' | 'checking'

export interface AuthState {
    status: AuthStatus,
    token?: string,
    user?:User

    login: (email:string, password:string) => Promise<boolean>,
    checkStatus: () => Promise<void>,
    logOut: () => Promise<void>
}

export const useAuthStore = create<AuthState>()( (set, get) => ({
    // props
    status:'checking',
    token: undefined,
    user: undefined,

    // actions
    login: async(email:string, password:string) => {

        const res = await authLogin(email, password)

        if (!res) {
            get().logOut()
            return false
        }

        set({
            status: 'authenticated',
            token: res.token,
            user: res.user
        })

        await SecureStorageAdapter.setItem('token', res.token)

        return true
    },

    checkStatus: async() => {
        const res = await authCheckStatus()

        console.log(res);
        

        if (!res) {
            get().logOut()
            return 
        }

        set({
            status: 'authenticated',
            token: res.token,
            user: res.user
        })

        await SecureStorageAdapter.setItem('token', res.token)

        return 
    },

    logOut: async () => {

        await SecureStorageAdapter.deleteItem('token')

        set({status: 'unauthenticated', user: undefined, token: undefined})
    },

}) )

