//Columns.js
import React, { useEffect, useState } from 'react';
import Cards from './Cards';
import { fetchData, fetchCards, addCard, updateCard, deleteCard, addTerm } from '../services/apiService';
import { Modal, Button } from 'react-bootstrap';


function Columns({ selectedTerm }) {
  const [columns, setColumns] = useState([]);
  const [newCardData, setNewCardData] = useState({
    question: '',
    answer: '',
  });
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [showEditCardModal, setShowEditCardModal] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [showDeleteCardModal, setShowDeleteCardModal] = useState(false);
  const [deletingCard, setDeletingCard] = useState(null);
  const [newTermData, setNewTermData] = useState({
    name: '',
  });
  const [showAddTermModal, setShowAddTermModal] = useState(false);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const data = await fetchData();
        const cardData = await fetchCards();

        const columnsWithCards = data.columns.map((column) => {
          const filteredCards = cardData.filter(
            (card) => card.column === column.id && card.tid === selectedTerm.id
          );

          return {
            ...column,
            cards: filteredCards,
          };
        });

        setColumns(columnsWithCards);
      } catch (error) {
        console.error('Erreur lors du chargement des données : ', error);
      }
    };

    fetchDataFromApi();
  }, [selectedTerm]);

  const handleAddCard = async () => {
    try {
      // Créez un nouvel objet de carte avec les données du formulaire
      const newCard = {
        question: newCardData.question,
        answer: newCardData.answer,
        column: selectedColumn.id,
        tid: selectedTerm.id,
      };
  
      // Appelez la fonction addCard pour ajouter la carte
      const addedCard = await addCard(newCard);
  
      // Mettez à jour l'état des colonnes avec les nouvelles données de carte
      setColumns((prevColumns) =>
        prevColumns.map((column) => {
          if (column.id === selectedColumn.id) {
            return {
              ...column,
              cards: [...column.cards, addedCard],
            };
          }
          return column;
        })
      );
  
      // Réinitialisez les données du formulaire
      setNewCardData({
        question: '',
        answer: '',
      });
  
      // Fermez la modal d'ajout de carte
      setShowAddCardModal(false);
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la carte : ', error);
    }
  };
  
  const handleEditCard = async () => {
    try {
      // Appelez la fonction updateCard pour modifier la carte
      const updatedCard = await updateCard(editingCard.id, editingCard);
  
      // Mettez à jour l'état des colonnes pour refléter la modification de la carte
      setColumns((prevColumns) =>
        prevColumns.map((column) => {
          if (column.id === updatedCard.column) {
            const updatedCards = column.cards.map((card) =>
              card.id === updatedCard.id ? updatedCard : card
            );
            return {
              ...column,
              cards: updatedCards,
            };
          }
          return column;
        })
      );
  
      // Fermez la modal de modification de carte
      setShowEditCardModal(false);
    } catch (error) {
      console.error('Erreur lors de la modification de la carte : ', error);
    }
  };
  
  const handleDeleteCard = async () => {
    try {
      // Vérifiez si la carte appartient à la colonne du terme sélectionné
      if (deletingCard && deletingCard.tid === selectedTerm.id) {
        // Appelez la fonction deleteCard pour supprimer la carte
        await deleteCard(deletingCard.id);
  
        // Mettez à jour l'état des colonnes pour refléter la suppression de la carte
        setColumns((prevColumns) =>
          prevColumns.map((column) => {
            if (column.id === deletingCard.column) {
              const updatedCards = column.cards.filter(
                (card) => card.id !== deletingCard.id
              );
              return {
                ...column,
                cards: updatedCards,
              };
            }
            return column;
          })
        );
      }
  
      // Fermez la modal de suppression de carte
      setShowDeleteCardModal(false);
    } catch (error) {
      console.error('Erreur lors de la suppression de la carte : ', error);
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCardData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddTerm = async () => {
    try {
      // Créez un nouvel objet de terme avec les données du formulaire
      const newTerm = {
        name: newTermData.name,
      };
  
      // Appelez la fonction addTerm pour ajouter le terme
      const addedTerm = await addTerm(newTerm);
  
      // Mettez à jour l'état des colonnes pour refléter le nouveau terme
      setColumns((prevColumns) => [...prevColumns, addedTerm]);
  
      // Réinitialisez les données du formulaire
      setNewTermData({
        name: '',
      });
  
      // Fermez la modal d'ajout de terme
      setShowAddTermModal(false);
    } catch (error) {
      console.error('Erreur lors de l\'ajout du terme : ', error);
    }
  };
  

  return (
    <div className="container">
      <div className="row">
        {columns.map((column) => (
          <div key={column.id} className="col-md-3">
            <h3>
              {column.label}
              <button
                className="btn btn-primary btn-sm ml-2"
                onClick={() => {
                  setShowAddCardModal(true);
                  setSelectedColumn(column);
                }}
              >
                +
              </button>
            </h3>
            <Cards
  cards={column.cards}
  onEditCard={(card) => {
    setEditingCard(card);
    setShowEditCardModal(true);
  }}
  onDeleteCard={(card) => {
    setDeletingCard(card);
    setShowDeleteCardModal(true);
  }}
/>

          </div>
        ))}
      </div>

      {/* Modal d'ajout de carte */}
      <Modal show={showAddCardModal} onHide={() => setShowAddCardModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter une nouvelle carte</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddCardModal(false)}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleAddCard}>
            Ajouter
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de modification de carte */}
      <Modal show={showEditCardModal} onHide={() => setShowEditCardModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier la carte</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label>Question :</label>
              <input
                type="text"
                name="question"
                value={editingCard?.question || ''}
                onChange={(e) => setEditingCard({ ...editingCard, question: e.target.value })}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Réponse :</label>
              <input
                type="text"
                name="answer"
                value={editingCard?.answer || ''}
                onChange={(e) => setEditingCard({ ...editingCard, answer: e.target.value })}
                className="form-control"
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditCardModal(false)}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleEditCard}>
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de suppression de carte */}
      <Modal show={showDeleteCardModal} onHide={() => setShowDeleteCardModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Supprimer la carte</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Êtes-vous sûr de vouloir supprimer cette carte ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteCardModal(false)}>
            Annuler
          </Button>
          <Button variant="danger" onClick={handleDeleteCard}>
            Supprimer
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal d'ajout de terme */}
      <Modal show={showAddTermModal} onHide={() => setShowAddTermModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un nouveau terme</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label>Nom du terme :</label>
              <input
                type="text"
                name="name"
                value={newTermData.name}
                onChange={(e) => setNewTermData({ ...newTermData, name: e.target.value })}
                className="form-control"
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddTermModal(false)}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleAddTerm}>
            Ajouter
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Columns;