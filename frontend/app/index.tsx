/*para rodar, abra o terminal, escreva: npx expo start --tunnel   escaneie o qr code no seu celular*/

/*Navegação entre páginas */
import { createNativeStackNavigator } from '@react-navigation/native-stack';

/*Telas */
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <Stack.Navigator>
        <Stack.Screen name='Login' component={LoginScreen}/>
        <Stack.Screen name='Home' component={HomeScreen}/>
        <Stack.Screen name='SignupScreen' component={SignupScreen}/>
      </Stack.Navigator>
  );
}