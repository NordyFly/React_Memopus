//Home.js
import React, { useState, useEffect } from 'react';
import '../App.css';
import LoginForm from './LoginForm';
import Header from './Header';
import Footer from './Footer';
import Terms from './Terms';
import Columns from './Columns';
import { fetchData, addTerm } from '../services/apiService';


function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [terms, setTerms] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectedTerm, setSelectedTerm] = useState(null);

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(storedIsLoggedIn);

    const fetchDataFromApi = async () => {
      try {
        const data = await fetchData();
        setTerms(data.terms);
        setColumns(data.columns);
      } catch (error) {
        console.error('Erreur lors du chargement des données : ', error);
      }
    };

    fetchDataFromApi();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); 
    setIsLoggedIn(false);
  };

  const handleTermClick = (term) => {
    setSelectedTerm(term);
  };

  const handleAddTerm = async (newTerm) => {
    try {
      const addedTerm = await addTerm(newTerm);
      setTerms([...terms, addedTerm]);
    } catch (error) {
      console.error('Erreur lors de l\'ajout du terme : ', error);
    }
  };


  
  return (
    <div className="home">
      <Header handleLogout={handleLogout} />
      <div className="content">
        {isLoggedIn ? (
          <div className="main">
            <Terms
              terms={terms}
              onTermClick={handleTermClick}
              onAddTerm={handleAddTerm}
            />
            {selectedTerm ? (
              <Columns columns={columns} selectedTerm={selectedTerm} />
            ) : (
              <p>Sélectionnez un terme pour afficher les colonnes et les cartes correspondantes.</p>
            )}
          </div>
        ) : (
          <div className="login">
            <section className="login-form">
              <LoginForm setIsLoggedIn={setIsLoggedIn} />
            </section>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Home;