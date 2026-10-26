import { Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../../assets/GlobalStyles.js';

/*ícones */
import FontAwesome from '@expo/vector-icons/FontAwesome';

/*Navegação */
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen(){

    const navigate = useNavigation();

    return(
        <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Cadastro</Text>
            <View /*Essa view é para os campos de entrada e validação de email.
            TODO: adicionar funcionalidade de login */>
                <View style={styles.inputContainer}>
                    <FontAwesome name="user" size={24} color="black" />
                    <TextInput
                        style = {styles.input}
                        placeholder='Nome de usuário'
                    />
                </View>
                <View style={styles.inputContainer}>
                    <FontAwesome name="envelope" size={22} color="black" />
                    <TextInput
                        style = {styles.input}
                        placeholder='E-mail (opcional)'
                        keyboardType="email-address"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <FontAwesome name="lock" size={24} color="black" />
                    <TextInput
                        style={styles.input}
                        placeholder='Senha'
                        secureTextEntry={true}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <FontAwesome name="lock" size={24} color="black" />
                    <TextInput
                        style={styles.input}
                        placeholder='Confirme sua senha'
                        secureTextEntry={true}
                    />
                </View>
                <Pressable 
                style={styles.loginButton}
                onPress={() => navigate.navigate('Home')}
                >
                    <Text style={styles.buttonText}>Criar conta</Text>
                </Pressable>
            </View>
            {/*TODO: Adicionar opções de login com google e outras redes vinculadas também */}
        </SafeAreaView>
    )
}