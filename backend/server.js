const express = require('express');  // Importation d’Express
const cors = require('cors');  // Importation de CORS
require('dotenv').config();  // Charge les variables d’environnement

const app = express();  
app.use(express.json());  // Permet de traiter les requêtes en JSON
app.use(cors());  // Active les autorisations CORS

// Route de test pour voir si l’API fonctionne
app.get('/api/recettes', (req, res) => {
    res.json([{ id: 1, nom: "Poulet aux légumes", calories: 600 }]);
});

//Route pour récupérer les exercices
app.get('/api/exercices', (req, res) => {
    db.query("SELECT * FROM exercices", (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Erreur serveur" });
        } else {
            res.json(result);
        }
    });
});


const PORT = process.env.PORT || 5000;  // Définition du port du serveur
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));

// Route pour ajouter un programme
const mysql = require('mysql2');
const db = require('./db'); // Importation de la connexion MySQL
app.post('/api/programmes', (req, res) => {
    const { nom, nbJours, description, motsCles } = req.body;
    db.query("INSERT INTO programmes (nom, nb_jours, description, mots_cles) VALUES (?, ?, ?, ?)", 
    [nom, nbJours, description, motsCles], 
    (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Erreur serveur" });
        } else {
            res.json({ message: "Programme ajouté avec succès !" });
        }
    });
});

// Route pour ajouter un exercice à un programme
app.post('/api/programme_exercice', (req, res) => {
    const { programmeId, exerciceId, jour } = req.body;
    db.query("INSERT INTO programme_exercice (programme_id, exercice_id, jour) VALUES (?, ?, ?)", 
    [programmeId, exerciceId, jour], 
    (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Erreur serveur" });
        } else {
            res.json({ message: "Exercice ajouté au programme avec succès !" });
        }
    });
});
