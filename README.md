# Integrating With HubSpot I: Foundations — Practicum

Node.js app that integrates with the HubSpot API using a Private App token.
Built as part of the HubSpot Academy certification practicum.

## Stack

- Node.js + Express
- Axios
- Pug (templates)
- dotenv

## Routes

| Method | Route          | Description                                      |
|--------|----------------|--------------------------------------------------|
| GET    | `/`            | Lists all custom object records in a table       |
| GET    | `/update-cobj` | Renders form to create a new record              |
| POST   | `/update-cobj` | Creates a new record via API and redirects home  |

## Custom Object

**Video Game** object with properties: `name`, `model`, `year`

View records in HubSpot:
https://app.hubspot.com/contacts/51609680/objects/2-64520254/views/all/list

## Setup

```bash
npm install
# Create .env from .env.example and fill in your token
node index.js
# Open http://localhost:3000
```

## Security

The `.env` file (containing the private app token) is listed in `.gitignore` and is never committed.
