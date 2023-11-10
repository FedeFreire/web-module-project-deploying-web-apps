import React, { useState, useEffect } from "react";
import Hand from "./Hand";
import Scoreboard from "./Scoreboard";

const Game = () => {
  const [deck, setDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);
  const [gameStatus, setGameStatus] = useState("");
  const [playerWins, setPlayerWins] = useState(0);
  const [playerLosses, setPlayerLosses] = useState(0);

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    const newPlayerScore = calculateScore(playerHand);
    const newDealerScore = calculateScore(dealerHand);

    setPlayerScore(newPlayerScore);
    setDealerScore(newDealerScore);

    if (
      (playerScore === 21 && playerHand.length === 2) ||
      (newPlayerScore === 21 && playerHand.length === 2)
    ) {
      setGameStatus("Player has Blackjack!");
      setPlayerWins((wins) => wins + 1);
    } else if (newDealerScore === 21 && dealerHand.length === 2) {
      setGameStatus("Dealer has Blackjack!");
      setPlayerLosses((losses) => losses + 1);
    } else if (newPlayerScore > 21) {
      setGameStatus("Player busts! Dealer wins.");
      setPlayerLosses((losses) => losses + 1);
    } else if (newDealerScore > 21) {
      setGameStatus("Dealer busts! Player wins.");
      setPlayerWins((wins) => wins + 1);
    } else if (gameStatus === "Player stands" && newDealerScore >= 17) {
      if (newPlayerScore < newDealerScore) {
        setGameStatus("Dealer wins!");
        setPlayerLosses((losses) => losses + 1);
      } else if (newPlayerScore > newDealerScore) {
        setGameStatus("Player wins!");
        setPlayerWins((wins) => wins + 1);
      } else if (newPlayerScore === newDealerScore) {
        setGameStatus("It's a draw!");
      }
    }
  }, [playerHand, dealerHand]);

  const initializeGame = () => {
    const newDeck = createDeck();
    shuffleDeck(newDeck);
    setDeck(newDeck);
    dealInitialCards(newDeck);
  };

  const createDeck = () => {
    const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
    const values = [
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
      "A",
    ];
    let newDeck = [];
    for (let suit of suits) {
      for (let value of values) {
        newDeck.push({ suit, value });
      }
    }
    return newDeck;
  };

  const shuffleDeck = (newDeck) => {
    for (let i = newDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
    }
  };

  const dealInitialCards = () => {
    const newDeck = createDeck();
    shuffleDeck(newDeck);

    const initialPlayerHand = [newDeck.pop(), newDeck.pop()];
    const initialDealerHand = [newDeck.pop(), newDeck.pop()];

    setPlayerHand(initialPlayerHand);
    setDealerHand(initialDealerHand);
    setDeck(newDeck);

    setPlayerScore(calculateScore(initialPlayerHand));
    setDealerScore(calculateScore(initialDealerHand));
  };

  const calculateScore = (hand) => {
    let score = 0;
    let aceCount = 0;

    hand.forEach((card) => {
      if (["J", "Q", "K"].includes(card.value)) {
        score += 10;
      } else if (card.value === "A") {
        aceCount += 1;
        score += 11;
      } else {
        score += parseInt(card.value, 10);
      }
    });

    while (score > 21 && aceCount > 0) {
      score -= 10;
      aceCount -= 1;
    }

    return score;
  };

  const handleHit = () => {
    if (playerScore < 21 && gameStatus === "") {
      const newCard = deck.pop();
      const newHand = [...playerHand, newCard];
      setPlayerHand(newHand);
      setDeck((deck) => deck.slice(0, -1));
    }
  };

  const handleDealerTurn = () => {
    let newDealerHand = [...dealerHand];
    while (calculateScore(newDealerHand) < 17) {
      const newCard = deck.pop();
      newDealerHand.push(newCard);
      setDeck((deck) => deck.slice(0, -1));
    }
    setDealerHand(newDealerHand);
    setDealerScore(calculateScore(newDealerHand));
    if (calculateScore(newDealerHand) < 21) {
      setGameStatus("Player stands");
    }
  };

  const handleStand = () => {
    setGameStatus("Player stands");
    handleDealerTurn();
  };

  const resetGame = () => {
    setGameStatus("");
    setPlayerScore(0);
    setDealerScore(0);
    setPlayerHand([]);
    setDealerHand([]);
    initializeGame();
  };

  return (
    <div className="game">
      <h2>Blackjack Game</h2>
      <Scoreboard playerScore={playerScore} dealerScore={dealerScore} />
      <div className="hands">
        <div>
          <h3>Player's Hand:</h3>
          <Hand cards={playerHand} />
        </div>
        <div>
          <h3>Dealer's Hand:</h3>
          <Hand cards={dealerHand} />
        </div>
      </div>
      <button onClick={handleHit} disabled={gameStatus !== ""}>
        Hit
      </button>
      <button onClick={handleStand} disabled={gameStatus !== ""}>
        Stand
      </button>
      <button onClick={resetGame} disabled={gameStatus === ""}>
        Play Again
      </button>

      {gameStatus && <p>{gameStatus}</p>}
    </div>
  );
};

export default Game;
