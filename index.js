require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const HUBSPOT_TOKEN = process.env.PRIVATE_APP_ACCESS_TOKEN;
const OBJECT_TYPE = process.env.CUSTOM_OBJECT_TYPE; // ex: "2-XXXXXXX"

const hubspotClient = axios.create({
  baseURL: 'https://api.hubapi.com',
  headers: {
    Authorization: `Bearer ${HUBSPOT_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

// ──────────────────────────────────────────────
// GET / — Homepage: lista todos os registros
// ──────────────────────────────────────────────
app.get('/', async (req, res) => {
  try {
    const response = await hubspotClient.get(
      `/crm/v3/objects/${OBJECT_TYPE}`,
      {
        params: {
          properties: 'name,model,year',
          limit: 100,
        },
      }
    );

    const records = response.data.results;

    res.render('homepage', {
      title: 'Custom Object Table | Integrating With HubSpot I Practicum',
      records,
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).send('Erro ao buscar dados do HubSpot.');
  }
});

// ──────────────────────────────────────────────
// GET /update-cobj — Formulário de criação
// ──────────────────────────────────────────────
app.get('/update-cobj', (req, res) => {
  res.render('updates', {
    title: 'Update Custom Object Form | Integrating With HubSpot I Practicum',
  });
});

// ──────────────────────────────────────────────
// POST /update-cobj — Cria novo registro via API
// ──────────────────────────────────────────────
app.post('/update-cobj', async (req, res) => {
  const { name, model, year } = req.body;

  try {
    await hubspotClient.post(`/crm/v3/objects/${OBJECT_TYPE}`, {
      properties: {
        name,
        model,
        year,
      },
    });

    res.redirect('/');
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).send('Erro ao criar registro no HubSpot.');
  }
});

// ──────────────────────────────────────────────
app.listen(3000, () =>
  console.log('Server running at http://localhost:3000')
);
