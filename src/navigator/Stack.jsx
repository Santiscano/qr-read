import { createStackNavigator } from '@react-navigation/stack';
import ReadQR from '../screens/ReadQR';
import Welcome from '../screens/Welcome';

const Stack = createStackNavigator();

export const StackNavigation = () => {

  return (
    <Stack.Navigator
      initialRouteName='welcome'
      screenOptions={{
        headerStyle: {
          elevation: 0,
          shadowColor: "transparent"
        },

        cardStyle: {
          backgroundColor: "rgba(26,33,64,1)",
        }
      }}
    >
      <Stack.Screen name="welcome" options={{ title: "Bienvenidos"}} component={Welcome} />
      <Stack.Screen name="readQR" options={{ title: "Leer QR"}} component={ReadQR} />
    </Stack.Navigator>
  );
}
