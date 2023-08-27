import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TextInput,
} from "react-native";
import axios from "axios";

const ListClients = () => {
  const [users, setusers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const onChangeInput = (text) => {
    setSearchTerm(text)
  }

  // method filter

  // let result = [];
  // if(!searchTerm){
  //   result = users
  // } else {
  //   users.filter(data => data.fullname.toLowerCase().includes(searchTerm.toLocaleLowerCase()))
  // }
  // const result = !searchTerm
  // ? users
  // : users
  // : users.filter((item) => {
  //   item.fullname.toLowerCase().includes(searchTerm.toLowerCase());
  // });

  const getListUsers = async () => {
    try {
      const res = await axios.get(
        "https://event-registered-tickets.vercel.app/api/allUsers"
      );
      console.log("res", res.data.users);
      setusers(res.data.users);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    getListUsers();
  }, []);

  return (
    <ScrollView>
      <TextInput
        placeholder="Buscar"
        style={styles.input}
        value={searchTerm}
        onChangeText={(text) => onChangeInput(text)}
      />
      {users.map((user, index) => (
        <View key={index} style={styles.container}>
          <View style={styles.containerCard}>
            <View
              style={{
                alignItems: "center",
                marginTop: 10,
                borderRadius: 100,
              }}
            >
              <Image
                source={{
                  uri: "https://www.citypng.com/public/uploads/preview/profile-user-round-white-icon-symbol-png-11639594348fn8rlcxrqo.png",
                }}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 100,
                }}
              />
            </View>

            <Text style={styles.text}>{user.email}</Text>
            <Text style={styles.text}>{user.fullname}</Text>
            <Text style={{...styles.text, paddingBottom: 15}}>{user.identification}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  containerCard: {
    backgroundColor: "#2cb5a0",
    borderRadius: 30,
    width: 250,
    paddingHorizontal: 5,
    paddingVertical: 5,
    textAlign: "center",
  },
  input: {},
  text: {
    color: "#fff",
    textAlign: "center",
    marginTop: 10,
  },
});

export default ListClients;
