import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
// ajuste o caminho conforme a sua pasta (ou use '@/services/api' se o projeto tiver o atalho @/)
import { buscarMusicaDoDia, MusicaDoDia } from '../../services/api';

const DAY_COLOR = '#F8E8D8';
const NIGHT_COLOR = '#473A2F';

// dia: das 06:00 às 17:59. noite: das 18:00 às 05:59
const DAY_START = 6;
const NIGHT_START = 18;

function isNightTime(): boolean {
  const hour = new Date().getHours();
  return hour < DAY_START || hour >= NIGHT_START;
}

export default function HomeScreen() {
  const [isNight, setIsNight] = useState(isNightTime());
  const [musica, setMusica] = useState<MusicaDoDia | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  // confere o horário a cada minuto
  useEffect(() => {
    const interval = setInterval(() => setIsNight(isNightTime()), 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // busca a música do dia na API quando a tela abre
  useEffect(() => {
    buscarMusicaDoDia()
      .then(setMusica)
      .catch((e) => setErro(`Erro: ${e?.message ?? e}`));
  }, []);

  const backgroundColor = isNight ? NIGHT_COLOR : DAY_COLOR;
  const textColor = isNight ? DAY_COLOR : NIGHT_COLOR;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {musica ? (
        <>
          <Text style={[styles.trecho, { color: textColor }]}>
            “{musica.trecho}”
          </Text>
          <Text style={[styles.titulo, { color: textColor }]}>
            {musica.titulo}
          </Text>
          {musica.artista ? (
            <Text style={[styles.artista, { color: textColor }]}>
              {musica.artista}
            </Text>
          ) : null}
          <Text style={[styles.detalhes, { color: textColor }]}>
            {[musica.album, musica.estilo].filter(Boolean).join(' · ')}
          </Text>
        </>
      ) : (
        <Text style={[styles.status, { color: textColor }]}>
          {erro ?? 'Carregando...'}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 28,
  },
  trecho: {
    fontSize: 26,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 36,
    marginBottom: 28,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  artista: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 12,
  },
  detalhes: {
    fontSize: 14,
    opacity: 0.8,
    textAlign: 'center',
  },
  status: {
    fontSize: 16,
    textAlign: 'center',
  },
});