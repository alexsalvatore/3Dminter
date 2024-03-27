import { ReactNode } from "react";

interface IpfsLinkProps {
    ipfsHash: string;
    children: ReactNode;
}


const IpfsLink = ({ ipfsHash, children }: IpfsLinkProps) => {

    /*
        Can be theses:
        "https://ipfs.io/ipfs/",
        "https://gateway.pinata.cloud/ipfs/",
        "https://amethyst-sleepy-penguin-958.mypinata.cloud/ipfs/"
    */

    const ipfsGateway = "https://ipfs.io/ipfs/";

    return (<a href={`${ipfsGateway}${ipfsHash}`} target="_blank">
        {children}
    </a>);
}

export default IpfsLink;