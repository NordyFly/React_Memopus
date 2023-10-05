// LoginForm.js
import React, { useState } from 'react';

function LoginForm({ setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simulez une requête API pour vérifier les informations de connexion
    // Remplacez ce bloc par une vraie requête API
    // Exemple simplifié :
    if (username === 'me' && password === '123') {
      localStorage.setItem('isLoggedIn', 'true'); // Stockez l'état de connexion dans localStorage
      setIsLoggedIn(true); // Mettez à jour l'état local
      setError('');
    } else {
      setError('Nom d\'utilisateur ou mot de passe incorrect');
    }
  };

  return (
    <div className="container">
      <header className="text-center my-4">
        <h1 className="text-primary">eMo</h1>
      </header>
      <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '400px' }}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">Se connecter</button>
        {error && <p className="text-danger">{error}</p>}
      </form>
      <footer className="text-center mt-4">
        <p>Memaupus.com</p>
      </footer>
    </div>
  );
}

export default LoginForm;
