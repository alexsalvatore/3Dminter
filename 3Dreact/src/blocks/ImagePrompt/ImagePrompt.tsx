import { useEffect, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import useHugginfaceCase from "../../hooks/use-hugginface-case";

const models = [
    "stabilityai/stable-diffusion-xl-base-1.0",
    "nerijs/pixel-art-xl",
    "SimianLuo/LCM_Dreamshaper_v7",
    // "openskyml/dalle-3-xl", // AMAZING
    "dreamlike-art/dreamlike-anime-1.0", // nice
    "Ojimi/anime-kawai-diffusion",// nice
    "segmind/SSD-1B", // AMAZING
    "Meina/MeinaMix_V10",
    "Linaqruf/animagine-xl-2.0",
];

interface ImagePromptProps {
    addCover: (dataURL: string) => void;
}


const ImagePrompt = ({ addCover }: ImagePromptProps) => {

    const [prompt, setPrompt] = useState<string>("")
    const { isGenerating, generateImage, imageGen, genError, tokenHugface, setTokenHugface } = useHugginfaceCase();
    const [selectedModels, setSelectedModels] = useState<string>(models[0]);

    // Handle change in selection
    const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedModels(event.target.value);
    };

    useEffect(() => {
        if (imageGen) {
            addCover(imageGen);
        }
    }, [imageGen]);

    const onGenImage = () => {
        generateImage(prompt, selectedModels);
    }

    return (<>
        <div>
            <div>🤗 Huggingface token : <input type="password" value={tokenHugface} onChange={(e) => setTokenHugface(e.target.value)} /></div>
        </div>
        <div>
            <Form.Group className="mb-3" >
                <Form.Label>Prompt</Form.Label>
                <Form.Control className="form-control" type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} disabled={isGenerating || !tokenHugface} />
            </Form.Group>
        </div>
        <div>
            <Form.Group className="mb-3">
                <Form.Select value={selectedModels} onChange={handleModelChange}>
                    {models.map((model) => (
                        <option key={model} value={model}>
                            {model}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
        </div>
        {isGenerating && <div>Generation is running ...</div>}
        {
            genError && <Alert variant={"danger"}>
                {genError}
            </Alert>
        }
        <div>
            <Button className="w-100" variant="outline-primary" disabled={isGenerating || !tokenHugface} onClick={() => onGenImage()}>GENERATE TXT 2 IMAGE!</Button>
        </div>
    </>);
}

export default ImagePrompt;