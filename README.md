# HubSpot Practicum — Video Game Characters

A Node.js + Express app that integrates with HubSpot's CRM API to manage a custom "Video Game Characters" object.

## Custom Object List View

[View Video Game Characters in HubSpot](https://app.hubspot.com/contacts/YOUR_ACCOUNT_ID/objects/YOUR_CUSTOM_OBJECT_ID/views/all/list)

> **Note:** Replace `YOUR_ACCOUNT_ID` and `YOUR_CUSTOM_OBJECT_ID` with your actual HubSpot test account values.

## Setup

1. Clone this repository.
2. Copy `.env.example` to `.env` and fill in your values:
   ```
   HUBSPOT_ACCESS_TOKEN=your_private_app_token
   CUSTOM_OBJECT_TYPE=2-XXXXXXXX
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   node index.js
   ```
5. Open [http://localhost:3000](http://localhost:3000)

## Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/` | GET | Homepage — lists all Video Game Character records in a table |
| `/update-cobj` | GET | Form to add a new character |
| `/update-cobj` | POST | Creates the new record via HubSpot API, redirects to homepage |

## Custom Object Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | String | Character name (required) |
| `game` | String | Game the character is from |
| `abilities` | String | Character's key abilities |

## Tech Stack

- Node.js
- Express
- Axios
- Pug
- dotenv
- HubSpot CRM API v3
