export const dataURLtoArrayBuffer = (dataURL: string): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
        try {
            // Decode the base64 string
            const base64String = dataURL.split(',')[1];
            const binaryString = atob(base64String);

            // Create a Uint8Array from the binary string
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }

            // Resolve the promise with the ArrayBuffer
            resolve(bytes.buffer);
        } catch (error) {
            reject(error);
        }
    });
}

export const blobToDataURL = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            resolve(reader.result as string);
        };
        reader.onerror = () => {
            reject(new Error("Error reading blob"));
        };
        reader.readAsDataURL(blob);
    });
}

export const dataURLToFile = async (dataURL: string, fileName: string): Promise<File> => {
    const blob = await dataURLToBlob(dataURL);
    const file = await blobToFile(blob, fileName);
    return file;
}


export const dataURLToBlob = (dataURL: string): Promise<Blob> => {
    return new Promise((resolve, reject) => {
        try {
            // Split the dataURL to get the base64 string
            const base64String = dataURL.split(',')[1];
            // Decode the base64 string to a binary string
            const binaryString = atob(base64String);

            // Create a Uint8Array from the binary string
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }

            // Determine the content type from the DataURL
            const mimeType = dataURL.split(',')[0].split(':')[1].split(';')[0];

            // Create and resolve the Blob
            const blob = new Blob([bytes], { type: mimeType });
            resolve(blob);
        } catch (error) {
            reject(error);
        }
    });
}

export const blobToFile = (blob: Blob, fileName: string): File => {
    return new File([blob], fileName, {
        type: blob.type,
        lastModified: new Date().getTime(), // Optional: you can use the current time or any timestamp
    });
}