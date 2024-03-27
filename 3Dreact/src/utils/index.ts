/**
 * Generates a random number between min and max, with an option to bias the result.
 * 
 * @param min The minimum value in the range.
 * @param max The maximum value in the range.
 * @param bias Optional. 'min' biases towards the minimum, 'max' biases towards the maximum.
 * @returns A random number between min and max, potentially biased towards min or max.
 */
export const generateRandomNumber = (min: number, max: number, bias?: 'min' | 'max'): number => {
    const random = Math.random(); // Generates a random number between 0 and 1
    let result = min + (max - min) * random; // Scale and shift the random value to the desired range

    if (bias) {
        const biasFactor = 0.5; // Adjust this value to control the extent of the bias (0 to 1, where 0.5 is no bias)
        switch (bias) {
            case 'min':
                result = min + (result - min) * biasFactor;
                break;
            case 'max':
                result = max - (max - result) * biasFactor;
                break;
        }
    }

    return result;
}
