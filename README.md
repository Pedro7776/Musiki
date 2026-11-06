# Musiki

Projeto em desenvolvimento composto por uma API REST e um aplicativo Expo. A API oferece cadastro e login de usuários e retorna uma música diária escolhida do catálogo do MongoDB. O aplicativo ainda está no estágio inicial do template Expo e não está conectado à API.

## Tecnologias

- Backend: Node.js, Express 5, MongoDB, Mongoose, JWT e Nodemailer.
- Frontend: React Native, Expo SDK 54, Expo Router e TypeScript.

## Estrutura

```text
Musiki/
├── backend/
│   ├── controller/
│   ├── database/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── .env.example
│   └── server.js
└── frontend/
    ├── app/
    ├── assets/
    ├── components/
    ├── hooks/
    └── package.json
```

## Requisitos

- Node.js e npm.
- MongoDB local ou uma instância MongoDB Atlas.
- Para executar em dispositivo: Expo Go ou um emulador Android/iOS.

## Backend

No diretório `backend`, instale as dependências e crie seu arquivo de ambiente a partir do exemplo:

```bash
cd backend
npm install
```

Copie `backend/.env.example` para `backend/.env` e preencha as variáveis:

```env
PORT=3000
DATABASE_URI=mongodb://localhost:27017/musiki
JWT_SECRET=defina-um-segredo-longo-e-aleatorio
SMTP_USER=seu-email@gmail.com
SMTP_PASS=sua-senha-de-aplicativo
```

`SMTP_USER` e `SMTP_PASS` são necessários para o envio de e-mail de recuperação de senha. Use uma senha de aplicativo do Gmail. `PORT` define a porta da API (o padrão é `3000`).

Inicie o servidor:

```bash
npm start
```

A API ficará disponível em `http://localhost:3000` (ou na porta configurada). O servidor só inicia com uma conexão válida ao MongoDB.

### Catálogo de músicas

O modelo de música tem os campos `titulo` (obrigatório), `artista` e `album`. As músicas ficam na coleção `Musics`. Atualmente não há endpoints para cadastrar ou administrar o catálogo; os documentos precisam ser inseridos diretamente no MongoDB. A rota de música diária retorna erro 404 quando não há músicas elegíveis.

### Rotas

Todas as rotas abaixo usam o prefixo `http://localhost:3000`.

| Método | Rota | Acesso | Descrição |
| --- | --- | --- | --- |
| `POST` | `/usuarios/cadastrar` | Público | Cadastra usuário; recebe `username`, `senha` e `email` opcional. |
| `POST` | `/usuarios/logar` | Público | Autentica com `usernameOuEmail` e `senha`; retorna token JWT e username. |
| `POST` | `/usuarios/enviar-email` | Público | Solicita o envio de código de recuperação; recebe `email`. |
| `POST` | `/usuarios/checar-otp` | Público | Valida o código; recebe `email` e `OTP`. |
| `POST` | `/usuarios/mudar-senha` | Público | Recebe `email`, `token` de recuperação e `novaSenha`. |
| `GET` | `/musicas/diaria` | JWT | Retorna a música diária do usuário autenticado. |

A rota protegida espera o cabeçalho `Authorization: Bearer <token>`. A música diária é mantida para o usuário durante o dia; a seleção evita as músicas presentes em seu histórico recente (até 10 itens).

Exemplo de cadastro:

```bash
curl -X POST http://localhost:3000/usuarios/cadastrar \
  -H "Content-Type: application/json" \
  -d '{"username":"ana","senha":"senha-segura","email":"ana@example.com"}'
```

Exemplo de consulta da música diária:

```bash
curl http://localhost:3000/musicas/diaria \
  -H "Authorization: Bearer SEU_TOKEN_JWT"
```

## Frontend

Em outro terminal, instale as dependências e inicie o Expo:

```bash
cd frontend
npm install
npm start
```

Use o QR Code com o Expo Go ou selecione um emulador no menu do Expo. Para executar diretamente em uma plataforma:

```bash
npm run android
npm run ios
npm run web
```

O app atual contém telas iniciais de exemplo do Expo Router; login, música diária e integração com o backend ainda não estão implementados no frontend. Para validar o estilo do código, execute `npm run lint` dentro de `frontend`.
