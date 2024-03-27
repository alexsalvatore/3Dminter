type RGBColor = [number, number, number];

export const getDominantColor = (img: HTMLImageElement): RGBColor => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        throw new Error('Unable to get canvas context');
    }

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height);

    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const colorMap: { [key: string]: number } = {};

    for (let i = 0; i < data.length; i += 4) {
        const key = `${data[i]}-${data[i + 1]}-${data[i + 2]}`;
        colorMap[key] = (colorMap[key] || 0) + 1;
    }

    const dominantColorKey = Object.keys(colorMap).reduce((a, b) => colorMap[a] > colorMap[b] ? a : b);
    return dominantColorKey.split('-').map(Number) as RGBColor;
};

export const getComplementaryColor = ([r, g, b]: RGBColor): RGBColor => {
    return [255 - r, 255 - g, 255 - b];
};

// Helper function to convert a color component to hex
const componentToHex = (c: number): string => {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
};

// Function to convert RGBColor to HEX string
export const rgbToHex = ([r, g, b]: RGBColor): string => {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};

export const createGradientImage = (width: number, height: number): string => {
    // Helper function to generate a random color
    function getRandomColor(): string {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // Helper function to generate a smooth gradient transition
    function addColorStops(gradient: CanvasGradient, count: number): void {
        const step = 1 / count;
        for (let i = 0; i <= count; i++) {
            gradient.addColorStop(i * step, getRandomColor());
        }
    }

    // Create canvas element
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');

    if (ctx === null) {
        throw new Error('Unable to get canvas context');
    }

    // Set the canvas dimensions
    canvas.width = width;
    canvas.height = height;

    // Define the gradient parameters
    const radialGradientParams = {
        x0: Math.random() * width,
        y0: Math.random() * height,
        r0: Math.random() * 100,
        x1: Math.random() * width,
        y1: Math.random() * height,
        r1: Math.random() * (width / 2)
    };

    // Create radial gradient
    const radialGradient: CanvasGradient = ctx.createRadialGradient(
        radialGradientParams.x0, radialGradientParams.y0, radialGradientParams.r0,
        radialGradientParams.x1, radialGradientParams.y1, radialGradientParams.r1
    );

    // Add color stops to the radial gradient
    addColorStops(radialGradient, 3);

    // Create linear gradient
    const linearGradient: CanvasGradient = ctx.createLinearGradient(
        0, 0,
        width, 0
    );

    // Add color stops to the linear gradient
    addColorStops(linearGradient, 3);

    // Set the global composite operation to "screen" to create a lighter effect
    ctx.globalCompositeOperation = 'screen';

    // Apply the radial gradient
    /*ctx.fillStyle = radialGradient;
    ctx.fillRect(0, 0, width, height);*/

    // Apply the linear gradient
    ctx.fillStyle = linearGradient;
    ctx.fillRect(0, 0, width, height);

    // Return the data URL of the canvas's image
    return canvas.toDataURL();
}