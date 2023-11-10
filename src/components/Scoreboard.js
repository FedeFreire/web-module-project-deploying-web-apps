import React from 'react';

const Scoreboard = ({ playerScore, dealerScore }) => {
    return (
        <div className="scoreboard">
            <div>Player Score: {playerScore}</div>
            <div>Dealer Score: {dealerScore}</div>
        </div>
    );
};

export default Scoreboard;
