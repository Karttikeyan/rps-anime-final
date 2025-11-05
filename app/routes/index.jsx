import { useState } from 'react';

export default function GamePage() {
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [gameState, setGameState] = useState('ready'); // ready, playing, result
  const [playerChoice, setPlayerChoice] = useState(null);
  const [aiChoice, setAiChoice] = useState(null);
  const [result, setResult] = useState('');

  // Opciones del juego
  const choices = [
    { id: 'rock', name: 'Piedra', emoji: '🪨', color: '#00ffff' },
    { id: 'paper', name: 'Papel', emoji: '📄', color: '#00ff00' },
    { id: 'scissors', name: 'Tijera', emoji: '✂️', color: '#ff00ff' }
  ];

  // Función SEGURA para conectar MetaMask
  const connectMetaMask = async () => {
    setLoading(true);
    try {
      if (typeof window.ethereum === 'undefined') {
        alert('¡MetaMask no está instalado! Descárgalo desde https://metamask.io');
        return;
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      if (accounts.length > 0) {
        setAccount(accounts[0]);
      }
    } catch (error) {
      if (error.code === 4001) {
        alert('Conexión rechazada por el usuario');
      } else {
        alert('Error al conectar: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Jugar contra IA
  const playGame = (playerChoiceId) => {
    if (!account) return;

    setGameState('playing');
    setPlayerChoice(playerChoiceId);

    // IA elige aleatoriamente
    const aiChoiceId = choices[Math.floor(Math.random() * 3)].id;
    setAiChoice(aiChoiceId);

    // Determinar resultado
    setTimeout(() => {
      let gameResult = '';
      
      if (playerChoiceId === aiChoiceId) {
        gameResult = 'empate';
      } else if (
        (playerChoiceId === 'rock' && aiChoiceId === 'scissors') ||
        (playerChoiceId === 'paper' && aiChoiceId === 'rock') ||
        (playerChoiceId === 'scissors' && aiChoiceId === 'paper')
      ) {
        gameResult = 'ganaste';
      } else {
        gameResult = 'perdiste';
      }

      setResult(gameResult);
      setGameState('result');

      // Si gana, simular minting de NFT
      if (gameResult === 'ganaste') {
        setTimeout(() => {
          if (window.confirm('🎉 ¡Ganaste! ¿Quieres mintear un NFT especial?')) {
            alert('🚀 NFT minteado con éxito! (Simulación)');
          }
        }, 1000);
      }
    }, 1500);
  };

  // Reiniciar juego
  const resetGame = () => {
    setGameState('ready');
    setPlayerChoice(null);
    setAiChoice(null);
    setResult('');
  };

  const getChoiceEmoji = (choiceId) => {
    return choices.find(c => c.id === choiceId)?.emoji || '';
  };

  const getChoiceName = (choiceId) => {
    return choices.find(c => c.id === choiceId)?.name || '';
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      minHeight: '100vh',
      padding: '20px',
      fontFamily: '"Arial", sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Efectos de partículas animadas */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%)
        `,
        animation: 'float 6s ease-in-out infinite'
      }}></div>

      {/* Botón de conexión MetaMask */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        zIndex: 10
      }}>
        {!account ? (
          <button
            onClick={connectMetaMask}
            disabled={loading}
            style={{
              background: 'linear-gradient(45deg, #ff6b6b, #ffa726)',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '25px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 0 20px rgba(255, 107, 107, 0.5)',
              transition: 'all 0.3s ease'
            }}
          >
            {loading ? 'Conectando...' : '🚀 Conectar MetaMask'}
          </button>
        ) : (
          <div style={{
            background: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            padding: '12px 20px',
            borderRadius: '25px',
            fontSize: '14px',
            backdropFilter: 'blur(10px)'
          }}>
            ✅ {account.slice(0, 6)}...{account.slice(-4)}
          </div>
        )}
      </div>

      <h1 style={{
        color: 'white',
        textAlign: 'center',
        fontSize: '3rem',
        marginBottom: '40px',
        textShadow: '0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff',
        position: 'relative',
        zIndex: 1
      }}>
        ⚔️ Anime Rock Paper Scissors 🎴
      </h1>

      {/* Área de juego */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '30px',
        marginBottom: '40px',
        position: 'relative',
        zIndex: 1
      }}>
        {choices.map((choice) => (
          <button
            key={choice.id}
            onClick={() => playGame(choice.id)}
            disabled={!account || gameState === 'playing'}
            style={{
              background: 'none',
              border: 'none',
              cursor: (account && gameState !== 'playing') ? 'pointer' : 'not-allowed',
              transition: 'transform 0.3s ease',
              filter: (account && gameState !== 'playing') ? `drop-shadow(0 0 10px ${choice.color})` : 'grayscale(1)',
              opacity: (account && gameState !== 'playing') ? 1 : 0.6
            }}
            onMouseOver={(e) => (account && gameState !== 'playing') && (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseOut={(e) => (account && gameState !== 'playing') && (e.currentTarget.style.transform = 'scale(1)')}
          >
            <img 
              src={`/${choice.id}.jpg`} 
              alt={choice.name}
              style={{
                width: '180px',
                height: '180px',
                borderRadius: '15px',
                border: `3px solid ${choice.color}`
              }} 
            />
          </button>
        ))}
      </div>

      {/* Resultado del juego */}
      {gameState === 'playing' && (
        <div style={{
          color: 'white',
          textAlign: 'center',
          fontSize: '2rem',
          marginBottom: '20px',
          position: 'relative',
          zIndex: 1
        }}>
          ⏳ La IA está eligiendo...
        </div>
      )}

      {gameState === 'result' && (
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          color: 'white',
          padding: '30px',
          borderRadius: '20px',
          textAlign: 'center',
          margin: '0 auto 30px',
          maxWidth: '500px',
          position: 'relative',
          zIndex: 1,
          border: '2px solid rgba(255, 255, 255, 0.2)'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            marginBottom: '20px',
            textShadow: '0 0 10px rgba(255,255,255,0.5)'
          }}>
            {result === 'ganaste' && '🎉 ¡GANASTE! 🎉'}
            {result === 'perdiste' && '😞 Perdiste...'}
            {result === 'empate' && '🤝 Empate'}
          </h2>
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <div>
              <div style={{ fontSize: '4rem' }}>{getChoiceEmoji(playerChoice)}</div>
              <div>Tú: {getChoiceName(playerChoice)}</div>
            </div>
            <div style={{ fontSize: '2rem' }}>VS</div>
            <div>
              <div style={{ fontSize: '4rem' }}>{getChoiceEmoji(aiChoice)}</div>
              <div>IA: {getChoiceName(aiChoice)}</div>
            </div>
          </div>

          <button
            onClick={resetGame}
            style={{
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              color: 'white',
              border: 'none',
              padding: '12px 30px',
              borderRadius: '25px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 0 20px rgba(102, 126, 234, 0.5)'
            }}
          >
            🔄 Jugar otra vez
          </button>
        </div>
      )}

      {/* Mensaje de estado */}
      <div style={{
        color: 'white',
        textAlign: 'center',
        fontSize: '1.4rem',
        position: 'relative',
        zIndex: 1,
        textShadow: '0 0 10px rgba(255,255,255,0.5)'
      }}>
        <p>{account ? '🎮 ¡Elige tu movimiento!' : '🔐 Conecta tu wallet para jugar'}</p>
        <p style={{ fontSize: '1rem', marginTop: '10px', opacity: 0.8 }}>
          ✨ Gana para mintear un NFT especial ✨
        </p>
      </div>

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
        `}
      </style>
    </div>
  );
}