import React from "react";
import { StyleSheet, View, Text, Button, Image, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const ViewConfirmation = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>App Store 🔥</Text>
      <View style={styles.appInfo}>
        <Image style={styles.image} source={require("../../assets/mario.jpg")} />
        <View style={{ marginLeft: 15 }}>
          <Text style={styles.text}>Rockets X</Text>
          <Text style={[styles.text, { color: "gray" }]}>betomoedano</Text>
          <Text style={[styles.text, { color: "gray" }]}>
            Offers In-App-Purchases
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
        ACCOUNT<Text style={[styles.text]}> betomoedano@outlook.com</Text>
      </Text>
      <View style={styles.separator}></View>
      <TouchableOpacity onPress={() => Alert.alert("Thanks for your purchase")}>
        <View style={styles.confirmButton}>
          <Text style={{ color: "#fff", fontSize: 30 }}>💸</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ViewConfirmation;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 30,
    letterSpacing: 0.5,
    color: "#000",
  },
  text: {
    color: "#000",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  appInfo: {
    flexDirection: "row",
    marginLeft: "10%",
    alignItems: "center",
    marginBottom: 20,
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
