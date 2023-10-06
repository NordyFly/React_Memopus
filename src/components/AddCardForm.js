import React, { useState } from 'react';

function AddCardForm({ columns, selectedTerm, onAddCard }) {
  const [newCardData, setNewCardData] = useState({
    question: '',
    answer: '',
    column: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCardData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddCard = () => {
    if (newCardData.question && newCardData.answer && newCardData.column) {
      onAddCard({
        question: newCardData.question,
        answer: newCardData.answer,
        column: newCardData.column,
        tid: selectedTerm.id,
      });

      setNewCardData({
        question: '',
        answer: '',
        column: '',
      });
    }
  };

  return (
    <div>
      <h3>Ajouter une nouvelle carte</h3>
      <form>
        <div className="form-group">
          <label>Question :</label>
          <input
            type="text"
            name="question"
            value={newCardData.question}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Réponse :</label>
          <input
            type="text"
            name="answer"
            value={newCardData.answer}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Colonne de destination :</label>
          <select
            name="column"
            value={newCardData.column}
            onChange={handleInputChange}
            className="form-control"
          >
            <option value="">Sélectionnez une colonne</option>
            {columns.map((column) => (
              <option key={column.id} value={column.id}>
                {column.label}
              </option>
            ))}
          </select>
        </div>
        <button type="button" className="btn btn-primary" onClick={handleAddCard}>
          Ajouter
        </button>
      </form>
    </div>
  );
}

export default AddCardForm;
