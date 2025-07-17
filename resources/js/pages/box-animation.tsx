import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';

export default function BoxAnimation() {
  const boxRef = useRef<HTMLDivElement>(null);
  const [boxShow, setBoxShow] = useState(false);
  const [origin, setOrigin] = useState({ top: 0, left: 0, width: 0, height: 0 });

  const handleClick = () => {
    if (boxRef.current) {
      const rect = boxRef.current.getBoundingClientRect();
      setOrigin({ top: rect.top, left: rect.left, width: rect.width, height: rect.height });
    }
    setBoxShow(true);

    setTimeout(() => {
      setBoxShow(false);
    }, 2000);
  };

  return (
    <div>
      <AnimatePresence>
          <motion.div
            ref={boxRef}
            className="w-full aspect-square bg-blue-500 cursor-pointer rounded-xl"
            onClick={handleClick}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            oke
          </motion.div>

        {boxShow && (
          // Kotak biru fixed, animasi dari posisi origin ke tengah dan membesar
          <motion.div
            className="fixed z-50 bg-blue-500 cursor-pointer rounded-xl"
            style={{
              width: origin.width,
              height: origin.height,
            }}
            initial={{
              top: origin.top,
              left: origin.left,
              scale: 1,
              opacity: 1,
              x: 0,
              y: 0,
              position: 'fixed',
            }}
            animate={{
              top: '50%',
              left: '50%',
              scale: 3,
              x: '-50%',
              y: '-50%',
            }}
            exit={{
              top: origin.top,
              left: origin.left,
              scale: 1,
              opacity: 0,
              x: 0,
              y: 0,
            }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 25,
            }}
          >
            oke
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
