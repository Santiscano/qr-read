import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigation } from './src/navigator/Stack';
import Drawer from './src/navigator/Drawer';

export default function App() {

  return (
    <NavigationContainer>
      {/* <StackNavigation/> */}
      <Drawer/>
    </NavigationContainer>
  )
}


