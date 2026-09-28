# 🎵 Música API

API REST para gerenciamento de músicas, desenvolvida com **Node.js**, **Express** e **MongoDB (Mongoose)**.

Permite cadastrar, listar, buscar, atualizar e excluir músicas, além de sortear uma música aleatória.

---

## 📋 Sumário

- [Tecnologias](#-tecnologias)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Como executar](#-como-executar)
- [Estrutura do projeto](#-estrutura-do-projeto)
- [Endpoints](#-endpoints)
- [Exemplos de uso](#-exemplos-de-uso)
- [Códigos de resposta](#-códigos-de-resposta)
- [Autores](#-autores)

---

## 🛠 Tecnologias

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [dotenv](https://www.npmjs.com/package/dotenv)

## ✅ Pré-requisitos

Antes de começar, você precisa ter instalado:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [MongoDB](https://www.mongodb.com/try/download/community) local **ou** uma conta no [MongoDB Atlas](https://www.mongodb.com/atlas)
- Um cliente HTTP para testar a API, como [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/)

## 📦 Instalação

```bash
# 1. Clone o repositório
git clone <URL-DO-REPOSITORIO>

# 2. Entre na pasta do projeto
cd <NOME-DA-PASTA>

# 3. Instale as dependências
npm install
```

## ⚙️ Configuração

Crie um arquivo `.env` na raiz do projeto com as variáveis abaixo:

```env
MONGODB_URI=mongodb://localhost:27017/musicas
PORT=3000
```

| Variável      | Descrição                                         | Exemplo                               |
| ------------- | ------------------------------------------------- | ------------------------------------- |
| `MONGODB_URI` | String de conexão com o MongoDB                   | `mongodb://localhost:27017/musicas`   |
| `PORT`        | Porta em que o servidor vai rodar (padrão: 3000)  | `3000`                                |

> ⚠️ O arquivo `.env` **não deve ser enviado ao repositório**. Confirme que ele está no `.gitignore`.

## ▶️ Como executar

```bash
node index.js
```

Se tudo estiver certo, o terminal exibirá:

```
MongoDB conectado!
Música API - porta 3000
```

A API ficará disponível em `http://localhost:3000`.

## 🗂 Estrutura do projeto

```
.
├── models/
│   └── Musica.js            # Schema/model do Mongoose
├── routes/
│   └── musica.routes.js     # Rotas de /musicas
├── database.js              # Conexão com o MongoDB
├── server.js                 # Ponto de entrada da aplicação
├── .env                     # Variáveis de ambiente (não versionar)
├── .gitignore
├── package.json
└── README.md
```

## 🔗 Endpoints

Base URL: `http://localhost:3000`

| Método   | Rota                 | Descrição                          |
| -------- | -------------------- | ---------------------------------- |
| `GET`    | `/`                  | Verifica se a API está no ar       |
| `GET`    | `/musicas`           | Lista todas as músicas             |
| `GET`    | `/musicas/aleatoria` | Retorna uma música aleatória       |
| `GET`    | `/musicas/:id`       | Busca uma música pelo ID           |
| `POST`   | `/musicas`           | Cadastra uma nova música           |
| `PUT`    | `/musicas/:id`       | Atualiza uma música existente      |
| `DELETE` | `/musicas/:id`       | Remove uma música                  |

### Modelo de dados

| Campo       | Tipo   | Obrigatório | Descrição                                   |
| ----------- | ------ | ----------- | ------------------------------------------- |
| `titulo`    | String | Sim         | Título da música                            |
| `artista`   | String | Não         | Nome do artista (padrão: `"Desconhecido"`)  |
| `_id`       | String | Automático  | Identificador gerado pelo MongoDB           |
| `createdAt` | Date   | Automático  | Data de criação                             |
| `updatedAt` | Date   | Automático  | Data da última atualização                  |

## 💡 Exemplos de uso

### Listar músicas

```http
GET /musicas
```

Resposta `200 OK`:

```json
[
  {
    "_id": "66f8a1b2c3d4e5f6a7b8c9d0",
    "titulo": "If I Fell",
    "artista": "The Beatles"
  }
]
```

### Cadastrar música

```http
POST /musicas
Content-Type: application/json
```

```json
{
  "titulo": "Azul",
  "artista": "Gal Costa"
}
```

Resposta `201 Created`:

```json
{
  "_id": "66f8a1b2c3d4e5f6a7b8c9d1",
  "titulo": "Azul",
  "artista": "Gal Costa"
}
```

### Atualizar música

```http
PUT /musicas/66f8a1b2c3d4e5f6a7b8c9d1
Content-Type: application/json
```

```json
{
  "artista": "Gal Costa (ao vivo)"
}
```

Resposta `200 OK` com a música atualizada.

### Excluir música

```http
DELETE /musicas/66f8a1b2c3d4e5f6a7b8c9d1
```

Resposta `204 No Content` (sem corpo).

## 📡 Códigos de resposta

| Código | Significado                                        |
| ------ | -------------------------------------------------- |
| `200`  | Requisição bem-sucedida                            |
| `201`  | Recurso criado com sucesso                         |
| `204`  | Recurso removido (sem conteúdo na resposta)        |
| `400`  | Requisição inválida (ID inválido ou campo faltando) |
| `404`  | Música ou rota não encontrada                      |
| `500`  | Erro interno no servidor                           |

Formato padrão de erro:

```json
{
  "error": "Música não encontrada"
}
