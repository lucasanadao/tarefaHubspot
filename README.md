# Integrating With HubSpot I: Foundations — Practicum

Aplicação Node.js que integra com a API do HubSpot usando um token de Private App.
Desenvolvida como parte do practicum de certificação da HubSpot Academy.

## Stack

- Node.js + Express
- Axios
- Pug (templates)
- dotenv

## Rotas

| Método | Rota           | Descrição                                              |
|--------|----------------|--------------------------------------------------------|
| GET    | `/`            | Lista todos os registros do custom object em tabela    |
| GET    | `/update-cobj` | Renderiza formulário para criar um novo registro       |
| POST   | `/update-cobj` | Cria um novo registro via API e redireciona para home  |

## Custom Object

Objeto **Video Game** com as properties: `name`, `model`, `year`

Visualizar registros no HubSpot:
https://app.hubspot.com/contacts/51609280/objects/2-64520254/views/all/list

## Como rodar

```bash
npm install
# Crie o .env a partir do .env.example e preencha com seu token
node index.js
# Acesse http://localhost:3000
```

## Segurança

O arquivo `.env` (que contém o token do private app) está listado no `.gitignore` e nunca é commitado.
