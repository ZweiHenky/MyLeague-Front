import { mixed, object, string } from "yup"

export const addTeamSchema = object({
    nombre: string().required("El nombre es requerido").min(3, "El nombre tiene que tener minimo 3 caracteres"),
    logo: string().required("Selecciona una imagen")
})