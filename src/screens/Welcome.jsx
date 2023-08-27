import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useEffect } from 'react';
import { styles } from './../theme/appTheme';

const Welcome = ({navigation}) => {

  return (
    <View style={styles.globalMargin}>
      <Text style={styles.title}>Bienvenido</Text>

      <Button
        title='Lector de QR´s'
        onPress={() => navigation.navigate('readQR')}
      />

    </View>
  )
}

export default Welcome

