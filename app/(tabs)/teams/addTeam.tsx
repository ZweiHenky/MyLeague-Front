import { View, Text, Pressable, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import ThemeInput from '@/presentation/shared/ThemedInput'
import { Formik } from 'formik';
import { addTeamSchema } from '@/infraestructure/schemas/addTeamSchema';
import * as ImagePicker from 'expo-image-picker';
import { useAuthStore } from '@/presentation/store/auth/useAuthStore';
import { useTeamStore } from '@/presentation/store/team/useTeamStore';
import { toast } from 'sonner-native';
import * as FileSystem from 'expo-file-system';
import { router } from 'expo-router';

const initialValues = {
    nombre:'',
    logo:''
}

const uploadImage = async(url:string)=>{
    try {
        const base64Data = await FileSystem.readAsStringAsync(url, {
          encoding: FileSystem.EncodingType.Base64,
        });
      
        const formData = new FormData();
        formData.append("file", `data:image/jpeg;base64,${base64Data}`);
        formData.append("upload_preset", "teamsUpdate");
      
        const res = await fetch("https://api.cloudinary.com/v1_1/duyh7uidy/upload", {
          method: "POST",
          body: formData,
        });
      
        if (!res.ok) {
          throw new Error(`Error en la solicitud: ${res.status} ${res.statusText}`);
        }
      
        const data = await res.json();
        console.log("Respuesta de Cloudinary:", data);
        return {
            status:true,
            url:data.secure_url
        }
      } catch (error) {
        console.error("Error al subir el archivo a Cloudinary:", error);
        return {
            status:false,
            message:error
        }
      }

}

const pickImageAsync = async (setFieldValue:any) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.5,
      aspect:[3,4]
    });

    if (!result.canceled) {
        console.log(result.assets[0].fileSize);

        if ( result.assets[0].fileSize! > 2097152) {
            toast.error("El tamaño de la imagen es muy grande")
            return 
        }
        
        setFieldValue('logo', result.assets[0].uri)
    } else {
        setFieldValue('logo', '')
    }
  };

export default function addTeam() {

    const {user} = useAuthStore()
    const {newTeam} = useTeamStore()

  return (
    <View className='p-5 gap-5 bg-white h-full'>
            <Formik 
                initialValues={initialValues}
                onSubmit={async(values, actions)=>{   

                    const res = await uploadImage(values.logo)

                    if (!res.status) {
                        toast.error("Error al subir la imagen")
                        return
                    }
                    

                    const resTeam = await newTeam(values.nombre, res.url, user!.id!)

                    if (resTeam) {
                        toast.success("Se creo el equipo con exito")
                        router.back()
                    }else{
                        toast.error("Ocurrio un error al crear el equipo")
                    }

                    actions.setSubmitting(false)
                }}
                validationSchema={addTeamSchema}
            >
                {
                    ({isSubmitting, values, errors, handleChange, submitForm, setFieldValue, touched, handleBlur}) =>(
                        <>
                            <View className='gap-4'>
                                <Text className='text-2xl'>Nombre del Equipo</Text>
                                <ThemeInput className="px-2 w-full" placeholder='Introduzca el nombre del equipo...' autoCapitalize="words" onBlur={handleBlur("nombre")} onChangeText={handleChange("nombre")} value={values.nombre} />
                            </View>
                            {
                                errors.nombre && touched.nombre && (
                                    <View>
                                        <Text>{errors.nombre}</Text>
                                    </View>
                                )
                            }
                            <View className='gap-4'>
                                <Text className='text-2xl'>Logo del Equipo</Text>
                                <TouchableOpacity className='py-4 px-2 rounded-2xl bg-gray-100' onPress={() => pickImageAsync(setFieldValue)}>
                                    <Text>Seleccionar un logo</Text>
                                </TouchableOpacity>
                            </View>
                            {
                                errors.logo && touched.logo && (
                                    <View>
                                        <Text>{errors.logo}</Text>
                                    </View>
                                )
                            }
                            {values.logo && (
                                <Image source={{ uri: values.logo }} style={{ width: 200, height: 200 }} />
                            )}

                            <View className='flex-row items-center justify-between '>

                                <Pressable className='w-[48%] border-light-textRed border-2 rounded-3xl p-3 z-100'>
                                    <Text className='text-center text-light-textRed text-xl'>Cancelar</Text>
                                </Pressable>

                                <Pressable onPress={submitForm} disabled={isSubmitting} className='w-[48%] rounded-3xl bg-light-primary p-3'>
                                    <Text className='text-center text-white text-xl'>Agregar</Text>
                                </Pressable>

                            </View>
                        </>
                    )
                }
            </Formik>
    </View>

    );
}