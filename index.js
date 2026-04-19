require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const HUBSPOT_BASE_URL = 'https://api.hubapi.com';
const ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN;

const hubspotClient = axios.create({
  baseURL: HUBSPOT_BASE_URL,
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

// Homepage — list all contacts with custom character properties
app.get('/', async (req, res) => {
  try {
    const response = await hubspotClient.get('/crm/v3/objects/contacts', {
      params: {
        properties: 'firstname,lastname,character_game,character_abilities,character_role',
        limit: 100,
      },
    });
    const records = response.data.results;
    res.render('homepage', {
      title: 'Video Game Characters | HubSpot Practicum',
      records,
    });
  } catch (error) {
    console.error('Error fetching records:', error.response?.data || error.message);
    res.status(500).send('Error fetching records from HubSpot.');
  }
});

// GET form to add a new character record
app.get('/update-cobj', (req, res) => {
  res.render('updates', {
    title: 'Update Custom Object Form | Integrating With HubSpot I Practicum',
  });
});

// POST form — create a new contact with character properties
app.post('/update-cobj', async (req, res) => {
  const { name, game, abilities, role } = req.body;
  const [firstname, ...rest] = name.trim().split(' ');
  const lastname = rest.join(' ') || '';
  try {
    await hubspotClient.post('/crm/v3/objects/contacts', {
      properties: {
        firstname,
        lastname,
        email: `${firstname.toLowerCase()}.${Date.now()}@characters.com`,
        character_game: game,
        character_abilities: abilities,
        character_role: role,
      },
    });
    res.redirect('/');
  } catch (error) {
    console.error('Error creating record:', error.response?.data || error.message);
    res.status(500).send('Error creating record in HubSpot.');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
