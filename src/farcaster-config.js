import { createFrameSession } from '@farcaster/frame-sdk';

export const initializeFarcaster = async () => {
  try {
    const frame = await createFrameSession();
    return frame;
  } catch (error) {
    console.log('Farcaster no disponible:', error);
    return null;
  }
};