/*para rodar, abra o terminal, escreva: npx expo start --tunnel   escaneie o qr code no seu celular*/

/*Componentes */
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
/*ícones */
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';

/*Constantes */
import { styles } from '../../assets/GlobalStyles.js';

/*Navegação */
import { useNavigation } from 'expo-router';

/*Exporta a nossa HomeScreen pra gente poder utilizar ela lá */
export default function HomeScreen() {

    const navigate = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.quote}>
          {"“Tente (tente)\nE não diga que a vitória está perdida\nSe é de batalhas que se vive a vida\nTente outra vez”"}
        </Text>
        <Text style={styles.artist}>Raul Seixas</Text>
        <Text style={styles.info}>Tente outra vez - MPB</Text>
      
        <View style={styles.row}>
          <Pressable
            style={styles.button}
            onPress={() => alert('aqui podia abrir um menu da pessoa escolher em que app abrir a musica')}
            >
              <AntDesign name="play-circle" size={24} color={"white"}/>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => alert(' Palestina Livre')}
            >
              <AntDesign name="star" size={24} color={"white"}/>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => alert(' vidas trans importam')}
            >
              <AntDesign name="share-alt" size={24} color={"white"}/>
          </Pressable>
        </View>
      </View>

      <View style={styles.navbar}>
        <Pressable style={styles.buttonNav}>
          <FontAwesome name="music" size={24} color="black" />
          <Text>Trecho</Text>
        </Pressable>

        <Pressable style={styles.buttonNav}>
          <FontAwesome name="clock-o" size={24} color="black" />
          <Text>Histórico</Text>
        </Pressable>

        <Pressable //Botão de perfil
            style={styles.buttonNav}
            onPress={() => navigate.navigate('Login')}>
          <FontAwesome name="user" size={24} color="black" />
          <Text>Perfil</Text>
        </Pressable>

        <Pressable style={styles.buttonNav}>
          <FontAwesome name="gear" size={24} color="black" />
          <Text>Opções</Text>
        </Pressable>
      </View>

    </SafeAreaView>
  );
}