import { InferType, number, object, ref, string } from 'yup';

export const registerSchema = object({
  usu_name: string().required("El nombre es requerido"),
  usu_last: string().required("El apellido es requerido"),
  usu_email: string().email("No es un email valido").required("el email es requerido"),
  usu_tel: string().required("El telefono es requerido").matches(/^\d{10}$/, "El teléfono debe contener solo números y tener 10 dígitos"),
  usu_pass: string().min(6, "La contraseña debe tener minimo 6 caracteres").required("La contraseña es requerida"),
  usu_pass2: string().required("La confirmacion es requerida").oneOf([ref('usu_pass')], 'Las contraseñas no coinciden')
});
