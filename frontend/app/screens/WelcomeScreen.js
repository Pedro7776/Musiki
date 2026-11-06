/*Componentes */
import { Pressable, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
/*ícones */

/*Constantes */
import { styles } from '../../assets/GlobalStyles.js';

/*Navegação */
import { useNavigation } from 'expo-router';

export default function WelcomeScreen(){

    const navigate = useNavigation();

    return(
        <SafeAreaView style={styles.container}>
            <Text>
                ola bem vindo ao app :)
            </Text>
            <Pressable 
                style={styles.loginButton}
                onPress={() => navigate.navigate('Login')}
                >
                <Text style={styles.buttonText}>Entrar</Text>
                </Pressable>
        </SafeAreaView>
    )
}