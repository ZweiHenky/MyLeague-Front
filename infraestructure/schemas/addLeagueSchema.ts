import { mixed, number, object, string } from "yup"

export const addLeagueSchema = object({
    nombre: string().required("El nombre es requerido").min(3, "El nombre tiene que tener minimo 3 caracteres"),
    logo: string().required("Selecciona una imagen"),
    direccion: string().required("La direccion es requerida"),
    // premio: string().required("El premio es requerido"),
    // division: string().required("La division es requerida"),
    descripcion: string().required("La descripcion es requerida").min(10, "La descripcion tiene que tener minimo 10 caracteres")
})