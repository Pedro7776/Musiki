# Musiki

Musiki é um aplicativo mobile pensado para transformar o gosto musical diário em conteúdo compartilhável. Todos os dias, pela manhã, o app seleciona um trecho aleatório de uma música, exibe o nome da faixa, o artista ou banda e oferece uma forma simples de compartilhar esse momento com amigos e seguidores nas redes sociais.

## Ideia do projeto

O objetivo é criar uma experiência leve e divertida em que o usuário receba, diariamente, uma citação musical inspirada por uma música aleatória do catálogo. Em vez de apenas ouvir, a pessoa pode descobrir uma frase marcante, salvar o momento e compartilhar o trecho do dia com outras pessoas.

A proposta principal é:

- selecionar uma música aleatoriamente
- mostrar um trecho curto da letra
- exibir o nome da música e o artista/banda
- permitir que o usuário compartilhe esse trecho em redes sociais
- criar uma rotina de descoberta musical todos os dias pela manhã

## Visão geral da solução

O projeto é dividido em duas partes:

- Backend: API REST em Node.js com Express para gerenciar músicas e fornecer trechos aleatórios.
- Frontend: aplicativo mobile desenvolvido com React Native e Expo para apresentar a música do dia e o compartilhamento.

## Tecnologias

- Node.js
- Express
- MongoDB + Mongoose
- React Native
- Expo
- TypeScript

## Estrutura do projeto

```bash
Musiki/
├── backend/
│   ├── database/
│   │   └── database.js
│   ├── routes/
│   │   └── musicRoutes.js
│   ├── .env
│   ├── index.js
│   └── package.json
├── frontend/
│   ├── app/
│   ├── components/
│   ├── constants/
│   ├── hooks/
│   ├── assets/
│   ├── package.json
│   └── tsconfig.json
├── README.md
└── .gitignore
```

## Requisitos

Antes de iniciar, certifique-se de ter instalado:

- Node.js 18 ou superior
- npm
- MongoDB local ou uma string de conexão MongoDB Atlas
- Expo Go no celular, ou um emulador Android/iOS

## Configuração do backend

1. Abra o terminal e entre na pasta do backend:

```bash
cd Musiki/backend
```

2. Instale as dependências:

```bash
npm install
```

3. Crie um arquivo `.env` dentro de `backend/` com a seguinte configuração:

```env
PORT=3000
DATABASE_URI=mongodb://localhost:27017/musiki
```

Se estiver usando MongoDB Atlas, substitua pela URL fornecida pelo serviço.

4. Inicie a API:

```bash
npm start
```

A API estará disponível em:

```bash
http://localhost:3000
```

## Rotas da API

### Base

- `GET /` → mensagem de status da API

### Músicas

- `GET /musics` → lista todas as músicas
- `GET /musics/aleatoria` → retorna uma música aleatória
- `GET /musics/:id` → busca uma música por id
- `POST /musics` → cria uma nova música
- `PUT /musics/:id` → atualiza uma música
- `DELETE /musics/:id` → remove uma música

### Exemplo de criação de música

```bash
curl -X POST http://localhost:3000/musics \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Bohemian Rhapsody",
    "artista": "Queen"
  }'
```

## Configuração do frontend

1. Abra um novo terminal e entre na pasta do frontend:

```bash
cd Musiki/frontend
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o app Expo:

```bash
npm start
```

Ou, como indicado no app, pode ser usado:

```bash
npx expo start --tunnel
```

Em seguida, escaneie o QR Code com o Expo Go no celular ou execute em um emulador.

## Fluxo recomendado de execução

Para rodar o projeto completo, execute em terminais separados:

```bash
cd Musiki/backend
npm start
```

```bash
cd Musiki/frontend
npm start
```

## Observações

- O backend depende de uma conexão ativa com MongoDB.
- Se o banco não estiver acessível, a API não iniciará corretamente.
- O frontend foi configurado com Expo Router e pode ser usado em desenvolvimento local em dispositivos móveis ou navegador.

## Funcionalidades previstas

- seleção aleatória de música por dia
- exibição de um trecho da letra em destaque
- apresentação do nome da música e do artista/banda
- botão de compartilhar para redes sociais
- experiência visual simples e amigável para uso diário
- armazenamento de músicas no backend para alimentar o sistema

## Fluxo de uso

1. O usuário abre o app pela manhã.
2. O sistema escolhe uma música aleatória do catálogo.
3. A música do dia é exibida com:
   - nome da música
   - nome do artista ou banda
   - trecho selecionado da letra
4. O usuário pode copiar ou compartilhar o conteúdo em redes sociais.
5. A rotina repete todos os dias com uma nova música.

## Possíveis melhorias futuras

- agendamento automático do trecho do dia
- personalização por gênero musical
- histórico de músicas compartilhadas
- geração de imagens para postar no Instagram ou WhatsApp
- integração com redes sociais e deep links
- autenticação de usuários
- busca por título ou artista

## Licença

Este projeto está em desenvolvimento e pode ser ajustado conforme as necessidades do time ou da disciplina.
