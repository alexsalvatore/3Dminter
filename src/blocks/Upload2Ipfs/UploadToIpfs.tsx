import { useEffect, useState } from "react";
import { getLocalstorageIPFSHash, getLocalstoragePinata, setLocalstorageIPFSHash, setLocalstoragePinata } from "../../api/localstorage-api";
import { URL_IPFS_PIN_FILE } from "../../api/ipfs-api";
import axios from "axios";
import { dataURLToFile } from "../../utils/files-utils";
import { UploadPinataIPFSRes } from "../../models/upload-pinata-response";
import IpfsLink from "../../elements/IpfsLink/IpfsLink";

interface UploadToIpfsProps {
    imageDataUrl: string;
    fileName: string;
    onIPFShash: (link: string) => void;
}

const UploadToIpfs = ({ imageDataUrl, fileName, onIPFShash }: UploadToIpfsProps) => {

    const [pinataToken, setPinataToken] = useState(getLocalstoragePinata());
    const [isLoading, setIsLoading] = useState(false);
    const [ipfsHash, setIpfsHash] = useState(getLocalstorageIPFSHash());
    const [uploadError, setUploadError] = useState('');

    useEffect(() => {
        if (ipfsHash) {
            onIPFShash(`https://amethyst-sleepy-penguin-958.mypinata.cloud/ipfs/${ipfsHash}`);
            setLocalstorageIPFSHash(ipfsHash);
        }
    }, [ipfsHash])

    useEffect(() => {
        if (pinataToken) setLocalstoragePinata(pinataToken);
    }, [pinataToken]);

    const handleUploadToIpfs = async () => {
        const fileToUpload = await dataURLToFile(imageDataUrl, fileName);
        setIsLoading(true);
        uploadToIpfs(fileToUpload).then(res => {
            const data = res.data as UploadPinataIPFSRes;
            setIpfsHash(data.IpfsHash);
        }).catch((error: any) => setUploadError(error))
            .finally(() => setIsLoading(false));
    }

    const uploadToIpfs = (file: File): Promise<any> => {
        const pinataMetadata = JSON.stringify({
            name: file.name,
        });

        const formData = new FormData();
        formData.append('file', file);
        formData.append('pinataMetadata', pinataMetadata);

        return axios.post(URL_IPFS_PIN_FILE(), formData, {
            maxBodyLength: 1000000000,
            headers: {
                'Content-Type': 'multipart/form-data;',
                'Authorization': `Bearer ${pinataToken}`
            }
        });
    }

    return (<>
        {imageDataUrl && <div><img alt="file preview" src={imageDataUrl} width="125px" /></div>}
        <div>🦙 Pinata token: <input type="password" value={pinataToken} onChange={(e) => setPinataToken(e.target.value)} /></div>
        {pinataToken && <div><button onClick={() => handleUploadToIpfs()} disabled={isLoading}>Upload to IPFS</button></div>}
        {isLoading && <>Uploading to IPFS...</>}
        {uploadError && <div>Error during upload: {uploadError}</div>}
        {ipfsHash && <div>IPFS HASH: <IpfsLink ipfsHash={ipfsHash}> {ipfsHash}</IpfsLink></div>}
    </>);
}

export default UploadToIpfs;