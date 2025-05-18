import { useCallback } from 'react';

const useSound = () => {
  const playSound = useCallback((fileName: string) => {
    if (!fileName) return;

    const audio = new Audio(`${fileName}`);
    audio.currentTime = 0;
    audio.play().catch((e) => {
      console.warn('Sound play failed:', e.message);
    });
  }, []);

  return { playSound };
};

export default useSound;
