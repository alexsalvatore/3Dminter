import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import WatermarkCanvas from "../blocks/WatermarkCanvas/WatermarkCanvas";
import glitch from "glitch-canvas";
import ImagePrompt from "../blocks/ImagePrompt/ImagePrompt";
import { getLocalstorageImageSaved, setLocalstorageImageSaved } from "../api/localstorage-api";
import UploadToIpfs from "../blocks/Upload2Ipfs/UploadToIpfs";
// import MintSolana from "../blocks/MintSolana/MintSolana";

const MintPage = () => {

    const [coverDataUrl, setCoverDataUrl] = useState(getLocalstorageImageSaved());
    const [glitchedDataUrl, setGlitchedDataUrl] = useState('');
    const [ipfsUrl, setIpfsUrl] = useState('');
    const [finalDataUrl, setFinalDataUrl] = useState('');
    const [text, setText] = useState('@Alex');
    const [iterations, setIterations] = useState(20);
    const [amplitude, setAmplitude] = useState(40);

    useEffect(() => {
        setGlitchedDataUrl(coverDataUrl);
        setLocalstorageImageSaved(coverDataUrl);
    }, [coverDataUrl]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {

            if (e.target.files[0]) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const result = reader.result as string;
                    setCoverDataUrl(result);
                };
                reader.readAsDataURL(e.target.files[0]);
            }

        }
    };

    const handleUnGlitch = () => {
        setGlitchedDataUrl(coverDataUrl);
    }

    const handleRandomGlitch = () => {
        const randQuality = Math.floor(Math.random() * 100);
        const randAmount = Math.floor(Math.random() * 100);
        const randIterations = Math.floor(Math.random() * 100);
        const randSeed = Math.floor(Math.random() * 100);

        const image = new Image();
        image.onload = () => {
            glitch({ seed: randSeed, quality: randQuality, amount: randAmount, iterations: randIterations })
                .fromImage(image)
                .toDataURL()
                .then((dataURL: string) => {
                    setGlitchedDataUrl(dataURL);
                });
        };
        image.src = coverDataUrl;
    }

    return <>
        <h2>AI art generator</h2>
        {coverDataUrl && <div>
            <img alt="preview" width={150} src={coverDataUrl} />
        </div>}
        <div><ImagePrompt addCover={(dataUrl) => setCoverDataUrl(dataUrl)}></ImagePrompt></div>
        <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload an image from the hard-drive</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
        </Form.Group>

        <div>Text: <input value={text} onChange={(e) => setText(e.target.value)} /></div>
        <div>Iteration: <input type="number" value={iterations} onChange={(e) => setIterations(+e.target.value)} /></div>
        <div>Amplitude: <input type="number" value={amplitude} onChange={(e) => setAmplitude(+e.target.value)} /></div>

        {glitchedDataUrl && <>
            <div>
                <div><button onClick={() => handleRandomGlitch()}> Glitch! </button> <button onClick={() => handleUnGlitch()}> Un-Glitch. </button></div>
            </div>
            <div>
                <WatermarkCanvas
                    src={glitchedDataUrl}
                    watermarkText="3D"
                    text={text}
                    scale={0.5}
                    iterations={iterations}
                    amplitude={amplitude}
                    onSaveImage={(dataURL: string) => setFinalDataUrl(dataURL)}
                >

                </WatermarkCanvas>
            </div>
            {finalDataUrl && <><UploadToIpfs
                imageDataUrl={finalDataUrl}
                fileName="test-3dchan"
                onIPFShash={(link) => setIpfsUrl(link)}
            ></UploadToIpfs>
                {/*<MintSolana ipfsUrl={ipfsUrl}></MintSolana>*/}
            </>}
        </>}
    </>;
}

export default MintPage;