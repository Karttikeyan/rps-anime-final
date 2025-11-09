import { useState, useEffect } from 'react';

export const useFarcaster = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Verificar si hay datos de Farcaster en localStorage (simulación)
    const farcasterData = localStorage.getItem('farcaster_user');
    if (farcasterData) {
      setUserData(JSON.parse(farcasterData));
      setIsConnected(true);
    }

    // Simular conexión Farcaster (en realidad necesitarías @farcaster/auth-kit)
    const simulateFarcasterConnection = () => {
      const user = {
        fid: Math.random().toString(36).substr(2, 9),
        username: 'anon_' + Math.random().toString(36).substr(2, 5),
        displayName: 'Jugador Anónimo'
      };
      localStorage.setItem('farcaster_user', JSON.stringify(user));
      setUserData(user);
      setIsConnected(true);
    };

    // Exponer función global para conectar
    window.connectFarcaster = simulateFarcasterConnection;
  }, []);

  const disconnect = () => {
    localStorage.removeItem('farcaster_user');
    setUserData(null);
    setIsConnected(false);
  };

  return { 
    isConnected, 
    userData, 
    disconnect,
    connect: () => window.connectFarcaster?.() 
  };
};