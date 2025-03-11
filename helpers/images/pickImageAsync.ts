import { toast } from "sonner-native";
import * as ImagePicker from 'expo-image-picker';

export const pickImageAsync = async (setFieldValue:any) => {
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