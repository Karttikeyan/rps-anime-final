import React from 'react';

const FarcasterFrame = () => {
  // Esta versión es específica para mostrar dentro del frame de Farcaster
  // sin redireccionar fuera de la app
  
  return (
    <div style={{
      padding: '20px',
      textAlign: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>🎮 RPS Anime Game</h1>
      <p>Usa los botones de Farcaster para jugar</p>
      <div style={{
        fontSize: '3rem',
        margin: '20px 0'
      }}>
        🪨 📄 ✂️
      </div>
      <p>El juego se controla completamente desde los botones del frame</p>
    </div>
  );
};

export default FarcasterFrame;