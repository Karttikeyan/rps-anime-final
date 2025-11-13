import { useEffect } from 'react';

export default function Index() {
  useEffect(() => {
    const initSDK = async () => {
      if (typeof window !== 'undefined') {
        const { sdk } = await import('@farcaster/miniapp-sdk');
        await sdk.actions.ready();
        console.log('Farcaster SDK initialized!');
      }
    };
    initSDK();
  }, []);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-8">RPS Anime Game</h1>
      <div className="flex justify-center space-x-4">
        <button className="p-2 hover:opacity-80">
          <img src="/rock.png" alt="Rock" className="w-20 h-20" />
        </button>
        <button className="p-2 hover:opacity-80">
          <img src="/paper.png" alt="Paper" className="w-20 h-20" />
        </button>
        <button className="p-2 hover:opacity-80">
          <img src="/scissors.png" alt="Scissors" className="w-20 h-20" />
        </button>
      </div>
      <p className="text-center mt-4 text-sm text-gray-600">¡Elige tu jugada!</p>
    </div>
  );
}