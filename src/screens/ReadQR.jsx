import React from "react";
import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { StyleSheet, Text, View, Button, ActivityIndicator } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";
import AwesomeAlert from 'react-native-awesome-alerts';
import ViewConfirmation from "../components/viewConfirmation";

const ReadQR = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  const [isProgress, setIsProgress] = useState(false);

  // response api
  const [validateInfo, setValidateInfo] = useState(false);
  const [dataUser, setdataUser] = useState();

  // permisos de la camara
  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status == "granted");
    })();
  };

  // what happens when we scan the bar code
  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setIsProgress(true);
    setValidateInfo(true);

    try {
      let parseData = JSON.parse(data);
      setText(parseData);
      console.log('se rompe despues de esto')

      const readQRSearch = await axios.post(
        "https://event-registered-tickets.vercel.app/api/validateUser",
        {
          "fullname": parseData.fullname,
          "email": parseData.email,
          "phone": parseData.phone,
        }
      );
      console.log('valor data',readQRSearch.data); // mostrar en consola
      setdataUser(readQRSearch.data); // setear los datos de la respuesta
      setShowAlert(true); //mostrar el modal
    } catch (error) {
      console.log('error: ', error);
    } finally{
    setIsProgress(false);
    setValidateInfo(false);
    }


    // alert(`${readQRSearch.data.message} \n \nultima lectura: ${formatearFecha(readQRSearch.data.lastReadDate)} \nlectura actual: ${formatearFecha(readQRSearch.data.now)}`);
  };

  const handleResetView = () => {
    setText("");
    setScanned(false);
    // setdataUser(); //esta es la linea que rompe
    setShowAlert(false);
  };

  // request camera permission
  useEffect(() => {
    askForCameraPermission();

    navigation.setOptions({
      title: "Inicio",
      headerBackTitle: "Inicio",
    });
  }, []);

  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={{ color:"#fff" }}>Se requieren permisos de la camara</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10, color:"#fff", }}>No pudimos acceder a tu camara</Text>
        <Button
          title={"Permitir usar camara"}
          onPress={() => askForCameraPermission()}
        />
      </View>
    );
  }

  // view if permission true
  return (
    <View style={styles.container}>
      {!validateInfo ? (
        <View style={styles.barcodebox}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ height: 400, width: 4000 }}
          />
        </View>) :(
          <ActivityIndicator size="large"></ActivityIndicator>
        )
      }


      {/* awesome alert */}
      <AwesomeAlert
        show={showAlert}

        // title="funciona bien"
        // titleStyle={{}}

        // message="este es el mensaje"
        // messageStyle={{}}

        // showCancelButton={true}
        // cancelText="Cancelar"
        // cancelButtonStyle={{}}
        // onCancelPressed={() => {
        //   setShowAlert(false);
        // }}

        showConfirmButton={true}
        confirmText="CERRAR"
        confirmButtonStyle={styles.buttonCloseModal}
        onConfirmPressed={() => {
          handleResetView()
        }}

        customView={
          <View>
            <ViewConfirmation
              dataUser={dataUser}
            />
          </View>
        }

        showProgress={isProgress}
        progressColor="green"
        progressSize={40}
      />

      {/* buttonsheet */}
      {/* <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
      >
        <BottomSheetView>
          <Text>hola</Text>
        </BottomSheetView>
      </BottomSheet> */}
    </View>
  );
};

export default ReadQR;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(26,33,64,1)",
    alignItems: "center",
    justifyContent: "center",
  },
  barcodebox: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: 300,
    overflow: "hidden",
    borderRadius: 30,
    backgroundColor: "tomato",
  },
  mainText: {
    fontSize: 16,
    marginHorizontal: 20,
    marginTop: 3,
    color:"#fff",
  },
  buttonCloseModal: {
    padding: 12,
    backgroundColor: "rgba(26,33,64,1)",
  },
});
