import { mixed, number, object, string } from "yup"

export const addDivisionSchema = object({
    nombre: string().required("El nombre es requerido").min(3, "El nombre tiene que tener minimo 3 caracteres"),
    premio: number().required("El premio es requerido").min(0,"El premio no puede ser menos de 0"),
    arbitraje: number().required("El arbitraje es requerido").min(0,"El arbitraje no puede ser menos de 0"),
    descripcion: string().required("La descripcion es requerida").min(10, "La descripcion tiene que tener minimo 10 caracteres")
})