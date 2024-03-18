const IPFS_PINATA_KEY = "IPFS_PINATA_KEY";
const HUGGINSFACE_KEY = "HUGGINSFACE_KEY";
const IMAGE_SAVED_KEY = "IMAGE_SAVED_KEY";
const IMAGE_FINAL_KEY = "IMAGE_FINAL_KEY";
const IPFS_HASH_KEY = "IPFS_HASH_KEY";

export const setLocalstoragePinata = (token: string) => localStorage.setItem(IPFS_PINATA_KEY, token);
export const getLocalstoragePinata = () => localStorage.getItem(IPFS_PINATA_KEY) as string;

export const setLocalstorageHuggingface = (token: string) => localStorage.setItem(HUGGINSFACE_KEY, token);
export const getLocalstorageHuggingface = () => localStorage.getItem(HUGGINSFACE_KEY) as string;

export const setLocalstorageImageSaved = (image: string) => localStorage.setItem(IMAGE_SAVED_KEY, image);
export const getLocalstorageImageSaved = () => localStorage.getItem(IMAGE_SAVED_KEY) as string;

export const setLocalstorageIPFSHash = (hash: string) => localStorage.setItem(IPFS_HASH_KEY, hash);
export const getLocalstorageIPFSHash = () => localStorage.getItem(IPFS_HASH_KEY) as string;

export const setLocalstorageImageFinal = (image: string) => localStorage.setItem(IMAGE_FINAL_KEY, image);
export const getLocalstorageImageFinal = () => localStorage.getItem(IMAGE_FINAL_KEY) as string;