import { Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../../assets/GlobalStyles.js';

/*ícones */
import FontAwesome from '@expo/vector-icons/FontAwesome';

/*Navegação */
import { useNavigation } from 'expo-router';

export default function ForgotScreen(){

    const navigate = useNavigation();

    return(
        <SafeAreaView style={styles.container}>
                <Text style={styles.title}>esqueci minha senha!!!!</Text>
            <View /*Essa view é para os campos de entrada e validação de email.
            TODO: adicionar funcionalidade de login */>
                <View style={styles.inputContainer}>
                    <FontAwesome name="user" size={24} color="black" />
                    <TextInput
                        style = {styles.input}
                        placeholder='Email ou nome de usuário'
                        keyboardType="email-address"
                    />
                </View>
                <Pressable 
                style={styles.loginButton}
                onPress={() => navigate.navigate('Home')}
                >
                    <Text style={styles.buttonText}>Enviar</Text>
                </Pressable>
                <View style={styles.row}
                >
                    <Text>Não tem uma conta?</Text>
                    <Pressable style={styles.highlight}
                    onPress={() => navigate.navigate('Signup')}
                    >
                        <Text style={styles.highlight}>
                        Criar conta
                        </Text>
                        </Pressable>
                </View>
            </View>
            {/*TODO: Adicionar opções de login com google e outras redes vinculadas também */}
        </SafeAreaView>
    )
}