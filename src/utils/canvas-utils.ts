
import { generateRandomNumber } from '.';
import fontGoth from '../assets/fonts/ManuskriptGotisch.ttf';
import fontText from '../assets/fonts/IMFeENsc28P.ttf';
// import fontGothPixel from '../assets/fonts/GothicPixels.ttf';
// import fontHandPixel from '../assets/fonts/rose.ttf';

export const addText = (
    ctx: CanvasRenderingContext2D,
    text: string,
    font: string,
    textColor: string,
    size: number,
    place?: "TOP_LEFT" | "TOP_RIGHT" | "BOTTOM_RIGHT" | "BOTTOM_LEFT"
) => {

    const MARGIN = 10;
    ctx.fillStyle = textColor;
    ctx.font = `${size}px ${font}`;

    ctx.shadowColor = 'black';
    ctx.shadowOffsetX = size * 0.05;
    ctx.shadowOffsetY = size * 0.05;


    if (place === "TOP_RIGHT") {
        ctx.textAlign = 'right';
        ctx.fillText(text, ctx.canvas.width - MARGIN, MARGIN + size);
    } else if (place === "BOTTOM_RIGHT") {
        ctx.textAlign = 'right';
        ctx.fillText(text, ctx.canvas.width - MARGIN, ctx.canvas.height - size * 0.5);
    } else if (place === "BOTTOM_LEFT") {
        ctx.textAlign = 'left';
        ctx.fillText(text, MARGIN, ctx.canvas.height - size * 0.5);
    } else {
        ctx.textAlign = 'left';
        ctx.fillText(text, MARGIN, MARGIN + size);
    }
}

export const loadAllFonts = async () => {
    const font1 = new FontFace('Gothic', `url(${fontGoth})`);
    await font1.load();
    document.fonts.add(font1);

    const font2 = new FontFace('TextFont', `url(${fontText})`);
    await font2.load();
    document.fonts.add(font2);
}

export const copyPasteRectangle = (ctx: CanvasRenderingContext2D, amplitude: number, isCube: boolean, odd: boolean, color?: "r" | "g" | "b") => {

    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const steering = odd ? "max" : "min";
    // Use the generateRandomNumber function for these variables
    let rectWidth = Math.floor(generateRandomNumber(1, width, steering)) * amplitude * 0.01;
    let rectHeight = isCube ? rectWidth : Math.floor(generateRandomNumber(1, height * 0.1, steering));

    let startY = Math.floor(generateRandomNumber(1, height))
    let startX = Math.floor(generateRandomNumber(1, width));

    const biasDirection = odd ? 'max' : 'min'; // Decide bias based on odd variable
    const lagX = Math.floor(generateRandomNumber(-width * 0.5 + startX, width * 0.5 - startX, biasDirection)) * generateRandomNumber(1, amplitude, biasDirection);


    try {
        const imageData = ctx.getImageData(startX, startY, rectWidth, rectHeight);
        if (color) adjustSaturation(imageData, color);
        const pasteY = startY;
        const pasteX = startX + lagX;

        const finalY = pasteY == 0 ? 1 : pasteY;
        const finalX = pasteX == 0 ? 1 : pasteX;

        // Paste the copied part
        ctx.putImageData(imageData, finalX, finalY);
    } catch { (e: any) => console.error(e) };

}

export const customGlitch = (ctx: CanvasRenderingContext2D, numIterations: number, amplitude: number) => {

    let odd = false;

    // Small noise
    for (let i = 0; i < numIterations; i++) {
        copyPasteRectangle(ctx, 1, true, odd);
        copyPasteRectangle(ctx, 1, true, odd, "r");
        copyPasteRectangle(ctx, 1, true, odd, "g");
        copyPasteRectangle(ctx, 1, true, odd, "b");
        odd = generateRandomNumber(0, 1) === 0;
    }

    // Lines
    for (let i = 0; i < numIterations; i++) {
        copyPasteRectangle(ctx, amplitude, false, odd);
        odd = generateRandomNumber(0, 1) === 0;
    }

    for (let i = 0; i < numIterations; i++) {
        copyPasteRectangle(ctx, amplitude, false, odd, "r");
        copyPasteRectangle(ctx, amplitude, false, odd, "g");
        copyPasteRectangle(ctx, amplitude, false, odd, "b");
        odd = generateRandomNumber(0, 1) === 0;
    }
}


function adjustSaturation(imageData: ImageData, color: "r" | "g" | "b") {
    for (let i = 0; i < imageData.data.length; i += 4) {
        // Extract RGB values
        let r = imageData.data[i];
        let g = imageData.data[i + 1];
        let b = imageData.data[i + 2];
        imageData.data[i] = color === "r" ? generateRandomNumber(1, 255) : r;
        imageData.data[i + 1] = color === "g" ? generateRandomNumber(1, 255) : g;
        imageData.data[i + 2] = color === "b" ? generateRandomNumber(1, 255) : b;
    }
}
