import { StyleSheet } from "react-native";

export const Colors = {
    /*Esses aqui são do modo claro */
    backgroundLight: '#F3DFCD',
    buttonsLight: '#403326',
    fontLight: '#403326',
    navbarBgLight: '#E1C5AC',
    /*Os abaixo são do modo escuro */
    backgroundDark: '#403326',
    buttonsDark: '#F3DFCD',
    fontDark: '#F5F5F5',
    navbarBgDark: '#31251A',
}

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundLight,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /*Aquié a estilização da página inicial */
  quote: { /*Estilização do trecho de música */
    fontSize: 20,
    marginBottom: 30,
    textAlign: 'center',
    lineHeight: 30,
  },

  artist: {
    fontSize: 16,
    textAlign: 'center',
  },

  info: {
    textAlign: 'center',
  },

  row: { /*Organiza a exibição dos botões relacionados ao trecho de música */
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-around',
    marginVertical: 20,
  },

  button: { /*Estilização dos botões relacionados ao trecho diário */
    borderRadius: 32,
		width: 44,
		height: 44,
    backgroundColor: Colors.buttonsLight,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  navbar: { /*Autoexplicativo, mas aqui é a estilização da navbar*/
    /*TODO: tem que deixar essa navbar na parte de baixo da tela.
    nao sei se é melhor de fazer isso colocando a posição dela em absolute ou o que */
    flexDirection: "row",
    backgroundColor: Colors.navbarBgLight,
    padding: 20,
    borderRadius: 50,
  },

  buttonNav: {
    alignItems: 'center',
    paddingHorizontal: 10
  }
});