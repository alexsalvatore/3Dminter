import React, { useRef, useEffect } from 'react';
import { addText, customGlitch, loadAllFonts } from '../../utils/canvas-utils';
interface WatermarkCanvasProps {
    src: string;
    watermarkText: string;
    text?: string;
    scale: number;
    iterations: number;
    amplitude: number;
    onSaveImage: (dataUrl: string) => void;
}

const SIZE_CANVAS_PIX = 750;

const WatermarkCanvas: React.FC<WatermarkCanvasProps> = ({ src, watermarkText, text, scale, iterations, amplitude, onSaveImage }) => {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const captureFinalImage = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            onSaveImage(canvas.toDataURL("image/png"));
        }
    }

    const downloadImage = () => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const image = canvas.toDataURL("image/png");
            const link = document.createElement('a');
            link.download = 'my-canvas.png';
            link.href = image;
            link.click();
        }
    }

    useEffect(() => {

        const generateCanvas = async () => {

            await loadAllFonts();

            const canvas = canvasRef.current;
            if (!canvas) return; // Ensure canvas is not null

            const ctx = canvas.getContext('2d');
            if (!ctx) return; // Ensure the context is not null

            const image = new Image();

            // Load the image
            image.onload = function () {
                // Resize canvas to match image size
                canvas.width = image.width;
                canvas.height = image.height;

                // Draw the image onto the canvas
                ctx.drawImage(image, 0, 0);

                addText(ctx, "3D", "Gothic", "white", 50);
                addText(ctx, "3D", "Gothic", "white", 50, "TOP_RIGHT");
                addText(ctx, "3D", "Gothic", "white", 50, "BOTTOM_RIGHT");

                customGlitch(ctx, iterations, amplitude);

                if (text) {
                    addText(ctx, text, "TextFont", "white", 50, "BOTTOM_LEFT");
                } else {
                    addText(ctx, "3D", "Gothic", "white", 50, "BOTTOM_LEFT");
                }
            };

            // Set the source of the image
            image.src = src;
            canvas.style.width = `${SIZE_CANVAS_PIX * scale}px`;
            canvas.style.height = `${SIZE_CANVAS_PIX * scale}px`;
        }

        generateCanvas();

    }, [src, watermarkText, text, iterations, amplitude]);

    return (<>
        <div><canvas ref={canvasRef}></canvas></div>
        <div><button onClick={() => downloadImage()}>Download</button></div>
        <div><button onClick={() => captureFinalImage()}>Finalize upload</button></div>
    </>);
};

export default WatermarkCanvas;