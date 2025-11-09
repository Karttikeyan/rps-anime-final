export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = await req.json();
  const { untrustedData } = body;
  
  const choices = [
    { id: 'rock', name: 'Piedra', emoji: '🪨' },
    { id: 'paper', name: 'Papel', emoji: '📄' },
    { id: 'scissors', name: 'Tijera', emoji: '✂️' }
  ];

  // Si es la primera vez o reinicio
  if (!untrustedData?.buttonIndex || untrustedData.buttonIndex === 1) {
    return res.status(200).json({
      type: 'frame',
      frame: {
        version: 'vNext',
        image: `https://rps-anime-final-jupmj4tcj-karttikeyas-projects-1c75e8e1.vercel.app/vite.svg?text=${encodeURIComponent('🎮 Elige tu movimiento!')}`,
        buttons: [
          { action: 'post', label: '🪨 Piedra' },
          { action: 'post', label: '📄 Papel' },
          { action: 'post', label: '✂️ Tijeras' }
        ],
        postUrl: `https://rps-anime-final-jupmj4tcj-karttikeyas-projects-1c75e8e1.vercel.app/api/frame`
      }
    });
  }

  // Procesar jugada
  let playerChoice;
  if (untrustedData.buttonIndex === 2) playerChoice = choices[0]; // Piedra
  if (untrustedData.buttonIndex === 3) playerChoice = choices[1]; // Papel  
  if (untrustedData.buttonIndex === 4) playerChoice = choices[2]; // Tijeras

  const aiChoice = choices[Math.floor(Math.random() * 3)];

  let result;
  if (playerChoice.id === aiChoice.id) {
    result = 'empate';
  } else if (
    (playerChoice.id === 'rock' && aiChoice.id === 'scissors') ||
    (playerChoice.id === 'paper' && aiChoice.id === 'rock') ||
    (playerChoice.id === 'scissors' && aiChoice.id === 'paper')
  ) {
    result = 'ganaste';
  } else {
    result = 'perdiste';
  }

  const response = {
    type: 'frame',
    frame: {
      version: 'vNext',
      image: `https://rps-anime-final-jupmj4tcj-karttikeyas-projects-1c75e8e1.vercel.app/vite.svg?text=${encodeURIComponent(`Tú: ${playerChoice.emoji} vs IA: ${aiChoice.emoji}\nResultado: ${result}`)}`,
      buttons: [
        { action: 'post', label: '🔄 Jugar otra vez' }
      ],
      postUrl: `https://rps-anime-final-jupmj4tcj-karttikeyas-projects-1c75e8e1.vercel.app/api/frame`,
      title: `RPS: ${result === 'ganaste' ? '🎉 Ganaste!' : result === 'perdiste' ? '😞 Perdiste' : '🤝 Empate'}`
    }
  };

  return res.status(200).json(response);
}