import * as FileSystem from 'expo-file-system';

export const uploadImage = async(url:string)=>{
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