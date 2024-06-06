import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const calculateTimeLeft = () => {
    const launchDate = new Date('2024-06-20T13:00:00+01:00'); // 1pm BST
    const difference = +launchDate - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 60000); // Update every minute

    return () => clearTimeout(timer);
  });

  const countdownComponents = Object.keys(timeLeft).map((interval) => {
    if (!timeLeft[interval]) {
      return null;
    }

    return (
      <span key={interval}>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>CheaterWatch</h1>
        <p>Your ultimate solution for monitoring and reporting in-game cheaters.</p>
        <p>We are working hard to launch our closed beta. Stay tuned!</p>
        <div className="countdown">
          <h2>Closed Beta Launch In:</h2>
          {countdownComponents.length ? countdownComponents : <span>Time's up!</span>}
        </div>
        <div className="social-links">
          <a href="https://discord.com/invite/xUFtKYwDbV" target="_blank" rel="noopener noreferrer">Join our Discord</a>
          <a href="https://github.com/KingCharlesVI/CheaterWatch-Frontend" target="_blank" rel="noopener noreferrer">Visit our Github</a>
        </div>
      </header>
    </div>
  );
}

export default App;