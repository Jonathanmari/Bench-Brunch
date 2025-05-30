const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Anatidaephobie7', // Remplace par ton vrai mot de passe
    database: 'muscu_db' // Assure-toi que c'est la bonne base !
});

db.connect(err => {
    if (err) throw err;
    console.log("✅ Connecté à MySQL !");
});

module.exports = db;
