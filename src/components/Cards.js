//Cards.js
import React from 'react';
import { Card, Button } from 'react-bootstrap';

function Cards({ cards, onEditCard, onDeleteCard}) {
  return (
    <div>
      {cards.map((card) => (
        <Card>
          <Card.Body>
            <Card.Title>{card.question}</Card.Title>
            <Card.Text>{card.answer}</Card.Text>
            <Button variant="primary" onClick={() => onEditCard(card)}>
              Modifier
            </Button>
            <Button variant="danger" onClick={() => onDeleteCard(card)}>
              Supprimer
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
export default Cards;