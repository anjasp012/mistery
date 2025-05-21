import { useEffect, useRef, useCallback } from 'react';
import { Howl } from 'howler';

const useSound = (files: string[] = []) => {
  const cache = useRef<Record<string, Howl>>({});

  // Preload all sounds
  useEffect(() => {
    files.forEach((file) => {
      if (!cache.current[file]) {
        cache.current[file] = new Howl({
          src: [`/${file}`],
          preload: true,
        });
      }
    });
  }, [files]);

  const playSound = useCallback((file: string) => {
    const sound = cache.current[file];
    if (sound) {
      sound.play();
    } else {
      console.warn(`Sound '${file}' not preloaded.`);
    }
  }, []);

  return { playSound };
};

export default useSound;
