import { HfInference } from "@huggingface/inference";
import { useEffect, useState } from "react";
import { blobToDataURL } from "../utils/files-utils";
import { getLocalstorageHuggingface, setLocalstorageHuggingface } from "../api/localstorage-api";

const useHugginfaceCase = () => {

    const [tokenHugface, setTokenHugface] = useState<string>(getLocalstorageHuggingface());
    const [imageGen, setImageGen] = useState<string>('');
    const [isGenerating, setIsGenerating] = useState<boolean>(false);
    const [genError, setGenError] = useState<string>('');

    const generateImage = (prompt: string, model: string) => {
        if (isGenerating) return;
        setGenError('');
        setIsGenerating(true);
        const inference = new HfInference(tokenHugface);
        inference.textToImage({
            inputs: prompt,
            model
        }).then(blob => blobToDataURL(blob))
            .then(dataUrl => setImageGen(dataUrl))
            .catch(error => {
                console.error(error);
                setGenError(`Error from the WS: ${JSON.stringify(error)}`);
            }).finally(() => setIsGenerating(false));
    }

    useEffect(() => {
        const tokenSaved = getLocalstorageHuggingface();
        if (tokenHugface !== tokenSaved) {
            setLocalstorageHuggingface(tokenHugface);
        }
    }, [tokenHugface]);

    return {
        tokenHugface,
        setTokenHugface,
        generateImage,
        imageGen,
        isGenerating,
        genError
    };

}

export default useHugginfaceCase;