import React, { useState } from 'react';
import axios from 'axios';

const AjouterProgramme = () => {
    const [nom, setNom] = useState('');
    const [nbJours, setNbJours] = useState('');
    const [description, setDescription] = useState('');
    const [motsCles, setMotsCles] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/programmes', { nom, nbJours, description, motsCles })
            .then(() => alert("Programme ajouté !"))
            .catch(error => console.error(error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Nom du programme" onChange={(e) => setNom(e.target.value)} />
            <input type="number" placeholder="Nombre de jours" onChange={(e) => setNbJours(e.target.value)} />
            <textarea placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
            <input type="text" placeholder="Mots clés (ex : Force, Hypertrophie)" onChange={(e) => setMotsCles(e.target.value)} />
            <button type="submit">Ajouter le programme</button>
        </form>
    );
};

export default AjouterProgramme;
