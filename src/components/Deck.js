import React, { useState } from 'react';
import Card from './Card';

const Deck = () => {
    const [deck, setDeck] = useState(createDeck());

    function createDeck() {
        const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
        const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        let deck = [];
        for (let suit of suits) {
            for (let value of values) {
                deck.push({ suit, value });
            }
        }
        return deck;
    }

    function shuffleDeck() {
        let shuffledDeck = [...deck];
        for (let i = shuffledDeck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
        }
        setDeck(shuffledDeck);
    }

    return (
        <div>
            <button onClick={shuffleDeck}>Shuffle Deck</button>
            <div className="deck">
                {deck.map((card, index) => (
                    <Card key={index} value={card.value} suit={card.suit} />
                ))}
            </div>
        </div>
    );
};

export default Deck;
