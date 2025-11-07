import { useConnectKit } from '@farcaster/connect-kit';

export default function FarcasterAuth() {
  const { 
    signIn, 
    signOut, 
    isConnected, 
    userData,
    isSigningIn 
  } = useConnectKit();

  // Estado de carga
  if (isSigningIn) {
    return (
      <div style={{ 
        padding: '20px', 
        textAlign: 'center',
        background: '#f8f9fa',
        borderRadius: '8px',
        margin: '10px'
      }}>
        <p>Connecting to Farcaster...</p>
      </div>
    );
  }

  // Usuario conectado
  if (isConnected && userData) {
    return (
      <div style={{ 
        padding: '15px', 
        background: '#e8f5e8',
        borderRadius: '8px',
        margin: '10px',
        border: '1px solid #4caf50'
      }}>
        <h3>✅ Farcaster Connected</h3>
        <p><strong>User:</strong> {userData.username}</p>
        <p><strong>FID:</strong> {userData.fid}</p>
        <button 
          onClick={signOut}
          style={{
            padding: '8px 16px',
            background: '#ff4444',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '10px'
          }}
        >
          Disconnect
        </button>
      </div>
    );
  }

  // Botón de login
  return (
    <div style={{ 
      padding: '20px', 
      textAlign: 'center',
      background: '#f0f0f0',
      borderRadius: '8px',
      margin: '10px'
    }}>
      <h3>Connect Farcaster Account</h3>
      <button 
        onClick={signIn}
        style={{
          padding: '12px 24px',
          background: '#8a63d2',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold'
        }}
      >
        Sign in with Farcaster
      </button>
    </div>
  );
}