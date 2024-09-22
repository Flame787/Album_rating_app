// require("dotenv").config(); // load 'dotenv' file
import dotenv from "dotenv";
dotenv.config();

// load Express:
// const express = require("express");
// const cors = require("cors");
// const https = require("https");
// const bodyParser = require("body-parser");
// const fetch = require("node-fetch");
// const path = require("path"); // Za rad s datotekama i direktorijima
// preporučljiv kada se baviš putanjama datoteka kako bi osigurao da su one unakrsno kompatibilne za različite operativne sustave (npr. Windows, macOS, Linux). 
// ako planiraš koristiti relativne putanje, path može spriječiti moguće greške s krivo definiranom putanjom, posebno kada koristiš metode poput res.sendFile() za posluživanje statičnih datoteka.

import express from "express";
import cors from "cors";
import https from "https";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

// Izračunaj __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express app:
const app = express();

// Define port:
const PORT = process.env.PORT || 3000;

// Client ID i Client Secret iz .env datoteke
const clientId = process.env.client_id;
const clientSecret = process.env.client_secret;

// Middleware:
app.use(cors());
app.use(express.static("public"));
// - for stacit files (pictures etc), index.JS and all CSS files - put them all in the map 'public' so Express could serve them at request.
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); // Parsiranje tijela zahtjeva u URL

// Define main route- only for testing:

// app.get("/", (req, res) => {
//   res.send("Hello, World!");
// });
// SEND-request can be only ONE! - nothing else can be returned after that. Next SEND-requests following after this one will not be realised!

// Ruta za posluživanje index.html-a:
// If index.html is in the same map as server.js (on the same 'hierarchy level'), the path to index.html should look like this:
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});


// Funkcija za dohvaćanje access tokena:
async function getAccessToken() {
  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");
  params.append("client_id", clientId);
  params.append("client_secret", clientSecret);

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  const data = await response.json();
  return data.access_token; // Vraćamo access token
}


// Ruta za dohvaćanje informacija o artistu
app.get("/artist/:id", async (req, res) => {
  const artistId = req.params.id; // ID artista iz URL-a
  const token = await getAccessToken(); // Dohvati access token

  // URL za dohvaćanje informacija o artistu
  const artistUrl = `https://api.spotify.com/v1/artists/${artistId}`;

  const response = await fetch(artistUrl, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` }, // Postavi access token
  });

  if (response.ok) {
    const artistData = await response.json();
    res.json(artistData); // Vrati podatke o artistu kao JSON
  } else {
    res.status(response.status).json({ error: "Artist not found" });
  }
});

// Ruta za pretragu pjesama (npr. API-call to Spotify API):
app.get("/api/search", async (req, res) => {
  const query = req.query.q; // Pretraga pjesme
  const token = await getAccessToken(); // Dohvati access token

  // URL za pretragu na Spotify API-ju
  const searchUrl = `https://api.spotify.com/v1/search?q=${query}&type=track`;

  const response = await fetch(searchUrl, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.ok) {
    const searchResults = await response.json();
    res.json(searchResults); // Vrati rezultate pretrage
  } else {
    res.status(response.status).json({ error: "Search failed" });
  }
});



// Define additional routes (if needed):
// app.get("/api/data", (req, res) => {
//   res.json({ message: "This is some data" });
// });

// Logic for searching songs (npr. API-call to Spotify API):
// app.get("/api/search", async (req, res) => {
//   const query = req.query.q;
// });

// Edited endpoint for searching artist, song or album:
// app.get("/api/suggestions", (req, res) => {
//   const query = req.query.q;
  // Add logic for searching (from API-documentation - Search)
  // Add logic for returning results
//   const results = searchDatabaseForSuggestions(query); // current logic for saving results
//   res.json({ results });
// });

// Error handling middleware:
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start server:
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Bash command for starting the server:
// node server.js  -OR-  nodemon server.js

// Result, if status ok:
// Server is running on port 3000
