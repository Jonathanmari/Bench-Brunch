import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProgrammesEtExercices = () => {
    const [programmes, setProgrammes] = useState([]);
    const [exercices, setExercices] = useState([]);
    const [filtre, setFiltre] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/api/programmes')
            .then(response => setProgrammes(response.data))
            .catch(error => console.error(error));

        axios.get('http://localhost:5000/api/exercices')
            .then(response => setExercices(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h1>Programmes et Exercices</h1>

            <input 
                type="text" 
                placeholder="Filtrer par mot-clé ou partie du corps" 
                onChange={(e) => setFiltre(e.target.value)}
            />

            <h2>Programmes</h2>
            <ul>
                {programmes.filter(prog => prog.mots_cles.includes(filtre)).map(prog => (
                    <li key={prog.id}>
                        <strong>{prog.nom}</strong> ({prog.nb_jours} jours) - {prog.description}
                    </li>
                ))}
            </ul>

            <h2>Exercices</h2>
            <ul>
                {exercices.filter(ex => ex.parties_du_corps.includes(filtre)).map(ex => (
                    <li key={ex.id}>
                        <strong>{ex.nom}</strong> - {ex.parties_du_corps} : {ex.description}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProgrammesEtExercices;
