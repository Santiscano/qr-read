import React from "react";
import { StyleSheet, View, Text, Button, Image, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import formatearFecha from "../utilities/formater.js"

const ViewConfirmation = ({dataUser}) => {

  const opciones = {
    day: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  };

  const { access, message, userFound } = dataUser;
  const { email, fullname, identification, isPress, lastReadDate, phone } = userFound;
  console.log('valores dentro del modal', access, message, userFound);

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Alternative Fashion 🔥</Text>

      <View style={styles.appInfo}>
        <Image
          style={styles.image}
          src="https://lh3.googleusercontent.com/a-/ALV-UjVZUvyGaKTI4aac8CKIq48ligS3wmT7LOz5Tr4DApfyod4=s64-p-k-rw-no"
          //  source={require("https://lh3.googleusercontent.com/a-/ALV-UjVZUvyGaKTI4aac8CKIq48ligS3wmT7LOz5Tr4DApfyod4=s64-p-k-rw-no")}
        />
        <View style={{ marginLeft: 15 }}>
          <Text
            style={[
              styles.text,
              { color: `${access ? 'green' : 'red'}`}
            ]}
          >
            Acceso: {access ? 'Permitido' : 'Restringido'}
          </Text>
          <Text
            style={[styles.text, { color: `${!access && 'red'}` }]}
          >
            {message}
          </Text>
        </View>
      </View>

      <View style={styles.separator}></View>

      <Text
        style={[
          styles.text,
          { color: "gray", marginLeft: 15, marginVertical: 5 },
        ]}
      >
        NOMBRE: <Text style={[styles.text]}> {fullname}</Text>
      </Text>
      <Text
        style={[
          styles.text,
          { color: "gray", marginLeft: 15, marginVertical: 5 },
        ]}
      >
        EMAIL: <Text style={[styles.text]}> {email}</Text>
      </Text>
      <Text
        style={[
          styles.text,
          { color: "gray", marginLeft: 15, marginVertical: 5 },
        ]}
      >
        CEDULA: <Text style={[styles.text]}> {identification}</Text>
      </Text>
      <Text
        style={[
          styles.text,
          { color: "gray", marginLeft: 15, marginVertical: 5 },
        ]}
      >
        ROL: <Text style={[styles.text]}> {isPress ? "Prensa": "Usuario"}</Text>
      </Text>
      <Text
        style={[
          styles.text,
          { color: "gray", marginLeft: 15, marginVertical: 5 },
        ]}
      >
        ULTIMA LECTURA: <Text style={[styles.text]}>
        {
          new Date(lastReadDate).toLocaleString("es-ES", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })
        }
      </Text>
      </Text>

      <View style={styles.separator}></View>
      {/*
      <TouchableOpacity onPress={() => Alert.alert("Thanks for your purchase")}>
        <View style={styles.confirmButton}>
          <Text style={{ color: "#fff", fontSize: 30 }}>💸</Text>
        </View>
      </TouchableOpacity> */}
    </View>
  );
};

export default ViewConfirmation;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 30,
    letterSpacing: 0.5,
    color: "#000",
  },
  appInfo: {
    flexDirection: "row",
    marginHorizontal: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  text: {
    color: "#000",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  separator: {
    height: 1,
    backgroundColor: "#00000040",
    marginVertical: 10,
  },
  confirmButton: {
    backgroundColor: "#0080FB",
    height: 50,
    width: 50,
    borderRadius: 30,
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 15,
    alignItems: "center",
  },
});
