import { authCheckStatus, authCheckToken, authLogin, authRegister } from "@/core/actions/auth-actions"
import { SecureStorageAdapter } from "@/helpers/adapters/secure-storage.adapter"
import { User } from "@/infraestructure/interfaces/user.interface";
import { create } from 'zustand'


export type AuthStatus = 'authenticated' | 'unauthenticated' | 'checking';

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;

  login: (email: string, password: string) => Promise<boolean>;
  checkStatus: () => Promise<void>;
  logout: () => Promise<void>;
  register:(nombre:string, apellido: string, email:string, telefono:string, password:string) => Promise<any>;
  authenticateBiometrically: ()=>Promise<void>

  changeStatus: (token?: string, user?: User, refreshToken?:string) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  // Properties
  status: 'checking',
  token: undefined,
  user: undefined,

  // Actions
  changeStatus: async (token?: string, user?: User, refreshToken?:string) => {
    if (!token || !user) {
      set({ status: 'unauthenticated', token: undefined, user: undefined });
      await SecureStorageAdapter.deleteItem('token');
      console.log("usuario no guardado");
      
      return false;
    }

    set({
      status: 'authenticated',
      token: token,
      user: user,
    });

    await SecureStorageAdapter.setItem('token', token);

    if (refreshToken) {
      await SecureStorageAdapter.setItem('refreshToken', refreshToken);
    }

    return true;
  },

  login: async (email: string, password: string) => {
    const resp = await authLogin(email, password);
    return get().changeStatus(resp?.token, resp?.user, resp?.refreshToken);
  },

  register: async (nombre:string, apellido: string, email:string, telefono:string, password:string)=>{
    const res = await authRegister(nombre, apellido, email, telefono, password)

    if (res.status == 400) {
        return res.data
    }

    return res
  },

  checkStatus: async () => {
    const resp = await authCheckStatus();
    
    get().changeStatus(resp?.token, resp?.user);
  },

  logout: async () => {
    SecureStorageAdapter.deleteItem('token');

    set({ status: 'unauthenticated', token: undefined, user: undefined });
  },

  authenticateBiometrically: async() => {

    const refreshToken = await SecureStorageAdapter.getItem("refreshToken")

    if (refreshToken) {
      const resp = await authCheckToken(refreshToken);

      get().changeStatus(resp?.token, resp?.user, resp?.refreshToken);
    }else{
      throw new Error("Inicio de sesion con datos requerido")
    }

  }
}));