import { Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../../assets/GlobalStyles.js';

/*ícones */
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function LoginScreen(){
    return(
        <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Entrar</Text>
            <View /*Essa view é para os campos de entrada e validação de email.
            TODO: adicionar funcionalidade de login */>
                <View style={styles.inputContainer}>
                    <FontAwesome name="user" size={24} color="black" />
                    <TextInput
                        style = {styles.input}
                        placeholder='Email ou nome de usuário'
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
                <Pressable style={styles.forgot}>
                    <Text>Esqueceu sua senha?</Text>
                </Pressable>
                <Pressable style={styles.login}>
                    <Text>Entrar</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}