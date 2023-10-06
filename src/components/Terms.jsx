//Terms.js
import React, { useState } from 'react';

function Terms({ terms, onTermClick, onAddTerm, onDeleteTerm }) {
  const [newTerm, setNewTerm] = useState('');

  const handleTermAdd = () => {
    if (newTerm.trim() === '') {
      return; // Empêchez l'ajout de termes vides
    }
    onAddTerm({ name: newTerm });
    setNewTerm(''); // Effacez le champ de saisie après l'ajout
  };


  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container justify-content-center">
        <ul className="navbar-nav">
          {terms.map((term) => (
            <li key={term.id} className="nav-item">
              <button className="nav-link btn btn-light" onClick={() => onTermClick(term)}>
                {term.name}
              </button>
            </li>
          ))}
          {/* Champ de saisie pour ajouter un nouveau terme */}
          <li className="nav-item">
            <input
              type="text"
              className="form-control"
              placeholder="Ajouter un terme"
              value={newTerm}
              onChange={(e) => setNewTerm(e.target.value)}
            />
          </li>
          <li className="nav-item">
            <button className="btn btn-primary" onClick={handleTermAdd}>
              Ajouter
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Terms;