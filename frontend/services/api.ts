// esse arquivo é o que faz o app conversar com a  API.
// a tela (index.tsx) não sabe nada de rede nem de banco de dados,
// ela só chama a função buscarMusicaDoDia() daqui e mostra o resultado.

import AsyncStorage from '@react-native-async-storage/async-storage';
/* o AsyncStorage é tipo o localStorage do navegador, só que pro celular.
 ele guarda dados pequenos no próprio aparelho, e eles continuam lá mesmo
 depois de fechar o app. aqui vou usar pra guardar o "id" do dispositivo */

import * as Crypto from 'expo-crypto';
/* o expo-crypto eu uso só pra gerar um código aleatório (UUID).
 o celular não tem o crypto.randomUUID() do navegador, então precisa disso */

// endereço da minha API.
// o celular não enxerga o "localhost" do computador (pra ele, localhost é o próprio celular),
// então tem que ser o IP do computador na rede wi-fi. pra descobrir: rode "hostname -I" no terminal.
// atenção: esse IP pode mudar se o computador reconectar no wi-fi, aí tem que atualizar aqui.
const API_URL = 'http://192.168.0.14:3000';

/* esse type descreve o formato da música que a API devolve.
 serve pro TypeScript avisar se eu tentar usar um campo que não existe.
 o ? depois do nome quer dizer que o campo é opcional (pode não vir),
 já o titulo e o trecho são obrigatórios */
export type MusicaDoDia = {
  titulo: string;
  artista?: string;
  album?: string;
  trecho: string;
  estilo?: string;
};

/* essa função descobre qual é o "id" desse celular.
 o app não tem login, então a API precisa de outro jeito de saber quem está pedindo
 a música, pra dar o mesmo trecho o dia inteiro e não repetir música pro mesmo aparelho.
 a solução foi criar um código aleatório na primeira vez que o app abre e guardar,
 aí nas próximas vezes ele usa sempre o mesmo código.
 é async porque ler e gravar no AsyncStorage leva um tempinho (devolve uma promessa) */
export async function getDeviceId(): Promise<string> {
  // tenta ler o id que já foi guardado antes
  let id = await AsyncStorage.getItem('deviceId');

  // se não tinha nada guardado, é a primeira vez que o app abre
  if (!id) {
    id = Crypto.randomUUID(); // gera um código aleatório único
    await AsyncStorage.setItem('deviceId', id); // guarda pra usar das próximas vezes
  }

  return id;
}

/* essa é a função principal, a que a tela chama.
 ela pede pra API a música do dia e devolve os dados (trecho, título, artista...) */
export async function buscarMusicaDoDia(): Promise<MusicaDoDia> {
  // pega o id do aparelho (ou cria, se for a primeira vez)
  const deviceId = await getDeviceId();

  // faz a requisição GET pra rota /musicas/do-dia da API.
  // o id vai no header x-device-id, que é onde o backend espera encontrar ele.
  // sem esse header a API responde erro 400
  const resp = await fetch(`${API_URL}/musicas/do-dia`, {
    headers: { 'x-device-id': deviceId },
  });

  // o fetch não dá erro sozinho quando a API responde 400, 404 ou 500,
  // então eu confiro na mão. resp.ok só é true quando o status é 200 a 299.
  // se deu errado, lança um erro, e a tela mostra a mensagem
  if (!resp.ok) throw new Error(`Erro ${resp.status}`);

  // transforma a resposta (que vem em texto JSON) num objeto que o JavaScript entende
  return resp.json();
}