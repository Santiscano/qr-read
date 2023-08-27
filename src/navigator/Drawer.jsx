import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { DrawerContentScrollView, createDrawerNavigator } from '@react-navigation/drawer';
import { StackNavigation } from './Stack';
import ListClients from '../screens/ListClients';

const DrawerNavigator = createDrawerNavigator();

const Drawer = () => {
  return (
    <DrawerNavigator.Navigator
      drawerContent={(props) => <InternalMenu {...props}/>}
    >
      <DrawerNavigator.Screen name="StackNavigation" options={{ title: "Lector QR's"}} component={StackNavigation} />
      <DrawerNavigator.Screen name="ListClients" options={{ title: "Lista clientes"}} component={ListClients} />
    </DrawerNavigator.Navigator>
  );
}

export default Drawer;


const InternalMenu = ({ navigation }) => {

    return(
      <DrawerContentScrollView>

        {/* Parte del avatar */}
        <View style={{
          alignItems: 'center',
          marginTop: 20,
          borderRadius: 100
        }}>
          <Image
            source={{
              uri: 'https://static.thenounproject.com/png/1931948-200.png'
            }}
            style={{
              width: 200,
              height: 200,
              borderRadius: 100
            }}
          />
        </View>

      {/* Opciones de menú */}
      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={{
            ...styles.menuBoton,
            flexDirection: "row"
          }}
          onPress={() => navigation.navigate('StackNavigation')}
        >
          <Text style={{fontSize: 20, marginTop: 10}}> Inicio</Text>
        </TouchableOpacity>


        <TouchableOpacity
          style={{
            ...styles.menuBoton,
            flexDirection: "row"
          }}
          onPress={() => navigation.navigate('ListClients')}
        >
          <Text style={{fontSize: 20, marginTop: 30}}> Lista Clientes</Text>
        </TouchableOpacity>
      </View>



      </DrawerContentScrollView>
    )
};


const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: 'center',
    marginTop: 20
  },
  avatar: {
      width: 150,
      height: 150,
      borderRadius: 100
  },
  menuContainer: {
    marginVertical: 30,
    marginHorizontal: 50,
  },
})
