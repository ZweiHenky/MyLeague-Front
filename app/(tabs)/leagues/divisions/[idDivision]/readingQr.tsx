import { View, Text, StyleSheet, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useLocalSearchParams } from 'expo-router';
import { useTeamDivisionMutation } from '@/hooks/teamDivision/useTeamDivisionMutation';

export default function ReadingQr() {

    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(null)

    const {mutateTeamsDivision} = useTeamDivisionMutation()
    const {idDivision} = useLocalSearchParams()

    useEffect(()=>{
      if(scanned){
        const {idTeam} = JSON.parse(scanned)

        mutateTeamsDivision.mutate({idDivision:Number(idDivision), idTeam:Number(idTeam)})
        
      }
    },[scanned])
  
    if (!permission) {
      // Camera permissions are still loading.
      return <View />;
    }
  
    if (!permission.granted) {
      // Camera permissions are not granted yet.
      return (
        <View style={styles.container}>
          <Text style={styles.message}>We need your permission to show the camera</Text>
          <Button onPress={requestPermission} title="grant permission" />
        </View>
      );
    }

    const getDataQr = (data:any)=>{
      setScanned(data)
    }
  
    return (
      <View style={styles.container}>
        <CameraView 
          style={styles.camera} 
          onBarcodeScanned={(data) => getDataQr(data.data)}
        >
          <View style={styles.qrBorder} />
        </CameraView>
      </View>
    );

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center'
    },
    message: {
      textAlign: 'center',
      paddingBottom: 10,
    },
    camera: {
      flex: 1,
    },
    qrBorder: {
      position: 'absolute',
      top: '25%',
      left: '10%',
      width: '80%',
      height: '50%',
      borderColor: 'white',
      borderWidth: 2,
      borderRadius: 10,
    },
    buttonContainer: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: 'transparent',
      margin: 64,
    },
    button: {
      flex: 1,
      alignSelf: 'flex-end',
      alignItems: 'center',
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
    },
  });