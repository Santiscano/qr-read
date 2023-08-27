import React from "react";
import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";
import { formatearFecha } from "../utilities/formater";
import AwesomeAlert from 'react-native-awesome-alerts';
import ViewConfirmation from "../components/viewConfirmation";
// import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
// import ViewConfirmation from "../components/viewConfirmation";

const ReadQR = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  const [isProgress, setIsProgress] = useState(false);

  // variables para el desplegable
  // const sheetRef = useRef(null);
  // const snapPoints = ["40%"];
  // const [isOpen, setIsOpen] = useState(true);
  // const handleSheetChange = () => {
    // console.log("handleSheetChange", index);
  // }
  // useCallback((index) => {
  // }, []);

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
    setShowAlert(true);
    setIsProgress(true);

    try {
      let parseData = JSON.parse(data);
      setText(parseData);

      const readQRSearch = await axios.post(
        "https://event-registered-tickets.vercel.app/api/validateUser",
        {
          "fullname": parseData.fullname,
          "email": parseData.email,
          "phone": parseData.phone,
        }
      );
      console.log(readQRSearch.data);
    } catch (error) {
      console.log('error: ', error);
    } finally{
    setIsProgress(false);
    }


    // alert(`${readQRSearch.data.message} \n \nultima lectura: ${formatearFecha(readQRSearch.data.lastReadDate)} \nlectura actual: ${formatearFecha(readQRSearch.data.now)}`);
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
        <Text>Se requieren permisos de la camara</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No pudimos acceder a tu camara</Text>
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
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 4000 }}
        />
      </View>
      {text !== "" && (
        <View>
          <Text style={styles.mainText}>Usuario: {text.fullname}</Text>
          <Text style={styles.mainText}>Email: {text.email}</Text>
          <Text style={styles.mainText}>Es Prensa?: {text.isPress}</Text>
        </View>
      )}
      {scanned && (
        <Button
          title={"Escanear de nuevo"}
          onPress={() => {
            setText("");
            setScanned(false);
          }}
          color="tomato"
        />
      )}

      {/* awesome alert */}
      <AwesomeAlert
        show={showAlert}

        // title="funciona bien"
        // titleStyle={{}}

        // message="este es el mensaje"
        // messageStyle={{}}

        showCancelButton={true}
        cancelText="Cancelar"
        cancelButtonStyle={{}}
        onCancelPressed={() => {
          setShowAlert(false);
        }}

        showConfirmButton={true}
        confirmText="Confirmar"
        confirmButtonStyle={{}}
        onConfirmPressed={() => {
          setShowAlert(false);
        }}

        customView={
          <View>
            <ViewConfirmation/>
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
});
