//apiService.js
const apiUrl = 'http://localhost:3001';

export const fetchData = async () => {
  try {
    const response = await fetch(`${apiUrl}/db`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Erreur lors du chargement des données.');
  }
};

export const fetchCards = async () => {
  try {
    const response = await fetch(`${apiUrl}/cards`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Erreur lors du chargement des cartes.');
  }
};

export const addTerm = async (termData) => {
  try {
    const response = await fetch(`${apiUrl}/terms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(termData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Erreur lors de l\'ajout du terme.');
  }
};


export const deleteTerm = async (termId) => {
  try {
    // Appelez la fonction deleteTerm dans le backend pour supprimer le terme et ses dépendances
    const response = await fetch(`${apiUrl}/terms/${termId}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Erreur lors de la suppression du terme.');
  }
};


export const addCard = async (cardData) => {
  try {
    const response = await fetch(`${apiUrl}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cardData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Erreur lors de l\'ajout de la carte.');
  }
};

export const updateCard = async (cardId, updatedCardData) => {
  try {
    const response = await fetch(`${apiUrl}/cards/${cardId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCardData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Erreur lors de la mise à jour de la carte.');
  }
};

export const deleteCard = async (cardId) => {
  try {
    const response = await fetch(`${apiUrl}/cards/${cardId}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Erreur lors de la suppression de la carte.');
  }
};

