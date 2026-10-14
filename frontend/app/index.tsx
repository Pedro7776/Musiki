{/*para rodar, abra o terminal, escreva: npx expo start --tunnel   escaneie o qr code no seu celular*/}

import { Pressable, StyleSheet, Text, View, } from 'react-native';
{/*o pressable são os nossos botões
 stylesheet estiliza a aplicação
 text é texto*/}
import { SafeAreaView } from 'react-native-safe-area-context';
{/*Esse componente é importante porque ele vai manter nossa aplicação fora das áreas importantes do celular, como a barra de notificações e tal*/}

const DAY_COLOR = '#f3dfcd';
const NIGHT_COLOR = '#403326';
{/*essas cores são as saturadas que o thur mandou
pesquisei no google qual seria o codigo, pode nao ser exato.*/}

{/* a função homescreen basicamente mostra a tela, não tem muito segredo, 
export default utiliza a mesma tela em outros lugares */}
export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}> {/*Essa primeira view aqui é do trecho e opções relacionadas; tem que ser com o SafeAreaView*/}
      <View>
        <Text style={styles.quote}>
          {"“Tente (tente)\nE não diga que a vitória está perdida\nSe é de batalhas que se vive a vida\nTente outra vez”"} {/*TODO: Tirar a placeholder e colocar um trecho do nosso banco de dados */}
        </Text>
        <Text>- Tente outra vez, Raul Seixas</Text>
      
        <View style={styles.row}> {/*Essa view aqui é a barra dos botões com relação à musica do dia*/}
          <Pressable
            style={styles.button}
            onPress={() => alert('aqui podia abrir um menu da pessoa escolher em que app abrir a musica')}
            >
              <Text style={styles.buttonText}>Botão de escutar a musica</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => alert(' Palestina Livre')}
            >
              <Text style={styles.buttonText}>Botão de favoritar/salvar a musica</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => alert(' vidas trans importam')}
            >
              <Text style={styles.buttonText}>Botão de compartilhar o trecho</Text>
          </Pressable>
        </View> {/*Fim da view dos botões*/}
      </View> {/*Fim da view do trecho de musica*/}

      <View> {/*View da barra de navegação*/}
        <Pressable style={styles.button}>
          <Text>Trecho diário</Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Text>Favoritos/salvos</Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Text>Perfil</Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Text>Opções</Text>
        </Pressable>
      </View> {/*Fim da view da barra de navegação*/}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  quote: { /*Estilização do trecho de música */
    fontSize: 16,
    marginBottom: 30,
  },

  button: {
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 10,
    backgroundColor: '#007AFF',
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  row: {
    flexDirection: "row",
    alignItems: "center"
  }
});