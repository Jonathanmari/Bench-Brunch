import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AjouterExerciceProgramme = () => {
    const [programmes, setProgrammes] = useState([]);
    const [exercices, setExercices] = useState([]);
    const [programmeId, setProgrammeId] = useState('');
    const [exerciceId, setExerciceId] = useState('');
    const [jour, setJour] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/api/programmes')
            .then(response => setProgrammes(response.data));
        axios.get('http://localhost:5000/api/exercices')
            .then(response => setExercices(response.data));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/programme_exercice', { programmeId, exerciceId, jour })
            .then(() => alert("Exercice ajouté au programme !"))
            .catch(error => console.error(error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Choisir un programme :</label>
            <select onChange={(e) => setProgrammeId(e.target.value)}>
                <option value="">Sélectionner...</option>
                {programmes.map(prog => (
                    <option key={prog.id} value={prog.id}>{prog.nom}</option>
                ))}
            </select>

            <label>Choisir un exercice :</label>
            <select onChange={(e) => setExerciceId(e.target.value)}>
                <option value="">Sélectionner...</option>
                {exercices.map(ex => (
                    <option key={ex.id} value={ex.id}>{ex.nom}</option>
                ))}
            </select>

            <label>Jour dans le programme :</label>
            <input type="number" placeholder="Ex: 1, 2, 3..." onChange={(e) => setJour(e.target.value)} />

            <button type="submit">Ajouter l’exercice</button>
        </form>
    );
};

export default AjouterExerciceProgramme;
