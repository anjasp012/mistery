import React, {
    useEffect,
    useRef,
    useState,
    useImperativeHandle,
    forwardRef
} from 'react';

export type SpriteCanvasRef = {
    start: () => void;
};

type SpriteCanvasProps = {
    imageSrc: string;
    totalFrames?: number;
    frameDuration?: number;
    drawFrameIndex?: number;
    onAnimationStart?: () => void;
    onAnimationEnd?: () => void; // ✅ Tambahkan ke tipe
};

const frameWidth = 562;
const frameHeight = 450;

const SpriteCanvas = forwardRef<SpriteCanvasRef, SpriteCanvasProps>(
    (
        {
            imageSrc,
            totalFrames = 4,
            frameDuration = 100,
            drawFrameIndex,
            onAnimationStart, // ✅ Tambahkan ke parameter
            onAnimationEnd // ✅ Tambahkan ke parameter
        },
        ref
    ) => {
        const canvasRef = useRef<HTMLCanvasElement>(null);
        const [image, setImage] = useState<HTMLImageElement | null>(null);
        const [isAnimating, setIsAnimating] = useState(false);
        const animationFrame = useRef(0);
        const intervalRef = useRef<number | null>(null);

        useEffect(() => {
            const img = new Image();
            img.src = imageSrc;
            img.onload = () => setImage(img);
        }, [imageSrc]);

        const drawFrame = (frame: number) => {
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext('2d');
            if (!canvas || !ctx || !image) return;

            const dpr = window.devicePixelRatio || 1;
            const cssWidth = canvas.clientWidth;
            const cssHeight = canvas.clientHeight;

            const scale = cssWidth / frameWidth;
            const scaledWidth = frameWidth * scale;
            const scaledHeight = frameHeight * scale;

            canvas.width = scaledWidth * dpr;
            canvas.height = scaledHeight * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            ctx.clearRect(0, 0, scaledWidth, scaledHeight);
            ctx.drawImage(
                image,
                frame * frameWidth,
                0,
                frameWidth,
                frameHeight,
                0,
                0,
                scaledWidth,
                scaledHeight
            );
        };

        useEffect(() => {
            if (image && drawFrameIndex !== undefined) {
                drawFrame(drawFrameIndex);
            }
        }, [image, drawFrameIndex]);

        const start = () => {
            if (isAnimating || !image) return;

            onAnimationStart?.();
            setIsAnimating(true);
            animationFrame.current = 0;

            intervalRef.current = window.setInterval(() => {
                drawFrame(animationFrame.current);
                animationFrame.current++;

                if (animationFrame.current >= totalFrames) {
                    if (intervalRef.current) {
                        clearInterval(intervalRef.current);
                    }
                    setIsAnimating(false);
                    onAnimationEnd?.(); // ✅ Pastikan ini terpanggil
                }
            }, frameDuration);
        };

        useImperativeHandle(ref, () => ({
            start
        }));

        useEffect(() => {
            if (image && !isAnimating && drawFrameIndex === undefined) {
                drawFrame(0);
            }
        }, [image, isAnimating, drawFrameIndex]);

        return (
            <canvas
                ref={canvasRef}
                className="w-full h-full cursor-pointer select-none"
                style={{ imageRendering: 'pixelated' }}
            />
        );
    }
);

export default SpriteCanvas;
