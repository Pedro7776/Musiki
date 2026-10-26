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
                <Text style={styles.title}>Cadastro</Text>
            <View /*TODO: adicionar funcionalidade de cadastro */>
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
                    <AntDesign name="question-circle" size={22} color="black"/>
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
                <View style={styles.inputContainer}>
                    <FontAwesome name="lock" size={24} color="black" />
                    <TextInput
                        style={styles.input}
                        placeholder='Confirme sua senha'
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={setPassword}                    />
                    <Pressable
                    onPress={() => setShowPassword(!showPassword)}>
                        <AntDesign
                        name={showPassword ? 'eye-invisible' : 'eye'}
                        size={22}
                        color="black"
                        />
                    </Pressable>
                </View>
                <Pressable 
                style={styles.loginButton}
                onPress={() => navigate.navigate('Home')}
                >
                    <Text style={styles.buttonText}>Criar conta</Text>
                </Pressable>
            </View>
            <View style={styles.row}
                >
                    <Text>Já tem uma conta?</Text>
                    <Pressable style={styles.highlight}
                    onPress={() => navigate.navigate('Login')}
                    >
                        <Text style={styles.highlight}>
                        Entrar
                        </Text>
                        </Pressable>
                </View>
            {/*TODO: Adicionar opções de login com google e outras redes vinculadas também */}
        </SafeAreaView>
    )
}