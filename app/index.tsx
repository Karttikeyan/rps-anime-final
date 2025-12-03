import { useState, useEffect } from 'react';

type Choice = 'rock' | 'paper' | 'scissors' | null;
type Result = 'win' | 'lose' | 'draw' | null;

const choices: { name: Choice; image: string; beats: Choice }[] = [
  { name: 'rock', image: '/rock.png', beats: 'scissors' },
  { name: 'paper', image: '/paper.png', beats: 'rock' },
  { name: 'scissors', image: '/scissors.png', beats: 'paper' },
];

export default function Index() {
  const [playerChoice, setPlayerChoice] = useState<Choice>(null);
  const [computerChoice, setComputerChoice] = useState<Choice>(null);
  const [result, setResult] = useState<Result>(null);
  const [score, setScore] = useState({ player: 0, computer: 0 });
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const initSDK = async () => {
      if (typeof window !== 'undefined') {
        try {
          const { sdk } = await import('@farcaster/frame-sdk');
          await sdk.actions.ready({ disableNativeGestures: true });
          console.log('Farcaster SDK ready!');
        } catch (error) {
          console.log('Running in browser mode');
        }
      }
    };
    initSDK();
  }, []);

  const getComputerChoice = (): Choice => {
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex].name;
  };

  const determineWinner = (player: Choice, computer: Choice): Result => {
    if (player === computer) return 'draw';
    const playerData = choices.find(c => c.name === player);
    if (playerData?.beats === computer) return 'win';
    return 'lose';
  };

  const handleChoice = (choice: Choice) => {
    if (isPlaying) return;
    
    setIsPlaying(true);
    setPlayerChoice(choice);
    
    setTimeout(() => {
      const computer = getComputerChoice();
      setComputerChoice(computer);
      
      const gameResult = determineWinner(choice, computer);
      setResult(gameResult);
      
      if (gameResult === 'win') {
        setScore(prev => ({ ...prev, player: prev.player + 1 }));
      } else if (gameResult === 'lose') {
        setScore(prev => ({ ...prev, computer: prev.computer + 1 }));
      }
      
      setIsPlaying(false);
    }, 500);
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
  };

  const getResultMessage = () => {
    switch (result) {
      case 'win': return 'You Win!';
      case 'lose': return 'You Lose!';
      case 'draw': return 'Draw!';
      default: return '';
    }
  };

  const getResultColor = () => {
    switch (result) {
      case 'win': return 'text-green-400';
      case 'lose': return 'text-red-400';
      case 'draw': return 'text-yellow-400';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-white">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-2 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 bg-clip-text text-transparent">
        RPS Anime
      </h1>
      <p className="text-gray-400 mb-8">Rock, Paper, Scissors</p>

      <div className="flex gap-8 mb-8 text-xl">
        <div className="text-center">
          <p className="text-gray-400 text-sm">You</p>
          <p className="font-bold text-2xl">{score.player}</p>
        </div>
        <div className="text-gray-500">vs</div>
        <div className="text-center">
          <p className="text-gray-400 text-sm">CPU</p>
          <p className="font-bold text-2xl">{score.computer}</p>
        </div>
      </div>

      {result && (
        <div className="mb-8 text-center">
          <div className="flex justify-center gap-8 mb-4">
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-2">You chose</p>
              <img 
                src={choices.find(c => c.name === playerChoice)?.image} 
                alt={playerChoice || ''} 
                className="w-20 h-20 object-contain"
              />
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-2">CPU chose</p>
              <img 
                src={choices.find(c => c.name === computerChoice)?.image} 
                alt={computerChoice || ''} 
                className="w-20 h-20 object-contain"
              />
            </div>
          </div>
          <p className={`text-3xl font-bold ${getResultColor()}`}>
            {getResultMessage()}
          </p>
          <button
            onClick={resetGame}
            className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-full font-semibold transition-all"
          >
            Play Again
          </button>
        </div>
      )}

      {!result && (
        <>
          <p className="text-gray-400 mb-6">Choose your move!</p>
          <div className="flex justify-center gap-4 md:gap-8">
            {choices.map((choice) => (
              <button
                key={choice.name}
                onClick={() => handleChoice(choice.name)}
                disabled={isPlaying}
                className={`choice-button p-4 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-purple-500/30 hover:border-purple-400 anime-glow ${
                  isPlaying ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <img 
                  src={choice.image} 
                  alt={choice.name || ''} 
                  className="w-20 h-20 md:w-24 md:h-24 object-contain"
                />
                <p className="mt-2 text-sm font-medium capitalize text-gray-300">
                  {choice.name}
                </p>
              </button>
            ))}
          </div>
        </>
      )}

      <p className="mt-12 text-xs text-gray-500">
        Powered by Farcaster
      </p>
    </div>
  );
}
