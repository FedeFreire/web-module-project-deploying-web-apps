import React from 'react';

const Card = ({ value, suit }) => {
    const cardSymbol = {
        'Hearts': '♥',
        'Diamonds': '♦',
        'Clubs': '♣',
        'Spades': '♠'
    };

    const getCardColor = (suit) => {
        return ['Hearts', 'Diamonds'].includes(suit) ? 'red' : 'black';
    };

    return (
        <div className={`card ${getCardColor(suit)}`}>
            <div className="card-value">{value}</div>
            <div className="card-suit">{cardSymbol[suit]}</div>
        </div>
    );
};

export default Card;
