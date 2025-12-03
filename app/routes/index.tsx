import { useState, useEffect } from 'react';

type Choice = 'rock' | 'paper' | 'scissors' | null;
type Result = 'win' | 'lose' | 'draw' | null;

const choices: { name: Choice; image: string; beats: Choice; kanji: string }[] = [
  { name: 'rock', image: '/rock.png', beats: 'scissors', kanji: '石' },
  { name: 'paper', image: '/paper.png', beats: 'rock', kanji: '紙' },
  { name: 'scissors', image: '/scissors.png', beats: 'paper', kanji: '鋏' },
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
    }, 600);
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
  };

  const getResultMessage = () => {
    switch (result) {
      case 'win': return 'VICTORY';
      case 'lose': return 'DEFEAT';
      case 'draw': return 'DRAW';
      default: return '';
    }
  };

  const getResultClass = () => {
    switch (result) {
      case 'win': return 'result-win';
      case 'lose': return 'result-lose';
      case 'draw': return 'result-draw';
      default: return '';
    }
  };

  return (
    <div className="game-container min-h-screen flex flex-col items-center justify-center p-4 text-white">
      <img 
        src="/icon.png" 
        alt="RPS Anime" 
        className="logo-image w-24 h-24 md:w-32 md:h-32 mb-4"
      />
      
      <h1 className="game-title text-4xl md:text-6xl font-extrabold mb-1 tracking-wider">
        RPS ANIME
      </h1>
      <p className="subtitle text-sm md:text-base mb-8 font-medium">
        ROCK PAPER SCISSORS
      </p>

      <div className="score-container flex gap-8 md:gap-12 px-8 py-4 mb-8">
        <div className="text-center">
          <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">You</p>
          <p className="score-number font-bold text-3xl md:text-4xl">{score.player}</p>
        </div>
        <div className="vs-text flex items-center text-2xl font-bold">VS</div>
        <div className="text-center">
          <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">CPU</p>
          <p className="score-number font-bold text-3xl md:text-4xl">{score.computer}</p>
        </div>
      </div>

      {result && (
        <div className="mb-8 text-center">
          <div className="flex justify-center gap-6 md:gap-12 mb-6">
            <div className="text-center">
              <p className="text-gray-400 text-xs uppercase tracking-widest mb-3">Your Choice</p>
              <img 
                src={choices.find(c => c.name === playerChoice)?.image} 
                alt={playerChoice || ''} 
                className="result-image w-24 h-24 md:w-32 md:h-32 object-contain"
              />
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-xs uppercase tracking-widest mb-3">CPU Choice</p>
              <img 
                src={choices.find(c => c.name === computerChoice)?.image} 
                alt={computerChoice || ''} 
                className="result-image w-24 h-24 md:w-32 md:h-32 object-contain"
              />
            </div>
          </div>
          <p className={`text-4xl md:text-5xl font-extrabold mb-6 tracking-widest ${getResultClass()}`}>
            {getResultMessage()}
          </p>
          <button
            onClick={resetGame}
            className="play-again-btn"
          >
            Battle Again
          </button>
        </div>
      )}

      {!result && (
        <>
          <p className="prompt-text text-lg md:text-xl mb-8 font-medium tracking-wide">
            Choose Your Element
          </p>
          <div className="flex justify-center gap-4 md:gap-8">
            {choices.map((choice) => (
              <button
                key={choice.name}
                onClick={() => handleChoice(choice.name)}
                disabled={isPlaying}
                className="choice-button w-28 h-28 md:w-36 md:h-36 flex flex-col items-center justify-center"
              >
                <img 
                  src={choice.image} 
                  alt={choice.name || ''} 
                  className="w-20 h-20 md:w-28 md:h-28 object-contain"
                />
                <p className="choice-label">
                  {choice.name}
                </p>
              </button>
            ))}
          </div>
        </>
      )}

      <p className="footer-text mt-12 text-xs uppercase tracking-widest">
        Powered by Farcaster
      </p>
    </div>
  );
}
