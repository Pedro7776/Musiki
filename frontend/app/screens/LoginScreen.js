import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../../assets/GlobalStyles.js';


export default function LoginScreen(){
    return(
        <SafeAreaView style={styles.container}>
    <View>
        <Text>Ola mundo</Text>
    </View>
        </SafeAreaView>
    )
}