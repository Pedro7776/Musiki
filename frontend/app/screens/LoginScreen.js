import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../../assets/GlobalStyles.js';

/*ícones */
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';

/*Navegação */
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen(){

    const navigate = useNavigation();

    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

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
                        keyboardType="email-address"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <FontAwesome name="lock" size={24} color="black" />
                    <TextInput
                        style={styles.input}
                        placeholder='Senha'
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <Pressable
                    onPress={() => setShowPassword(!showPassword)}>
                        <AntDesign
                        name={showPassword ? 'eye-invisible' : 'eye'}
                        size={22}
                        color="black"
                        />
                    </Pressable>
                </View>
                <Pressable>
                    <Text style={styles.highlight}>Esqueceu sua senha?</Text>
                </Pressable>
                <Pressable 
                style={styles.loginButton}
                onPress={() => navigate.navigate('Home')}
                >
                    <Text style={styles.buttonText}>Entrar</Text>
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