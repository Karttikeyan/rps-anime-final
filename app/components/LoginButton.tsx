'use client';
import { useConnectKit } from '@farcaster/connect-kit';

export function LoginButton() {
  const { signIn, signOut, isConnected, userData } = useConnectKit();
  
  if (isConnected) {
    return (
      <div style={{ padding: '10px', background: '#f0f8ff', borderRadius: '8px', margin: '10px' }}>
        <p>✅ Connected: {userData?.username || userData?.fid}</p>
        <button 
          onClick={signOut}
          style={{
            padding: '8px 16px',
            background: '#ff6b6b',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
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
  );
}