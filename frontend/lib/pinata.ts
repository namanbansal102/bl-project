import { createHash } from "crypto"

// You'll need to install and configure the Pinata client
// npm install pinata-web3
import { PinataSDK } from "pinata"

function createPinataClient() {
  return new PinataSDK({
    pinataJwt: process.env.NEXT_PUBLIC_PINATA_KEY!,
    pinataGateway: "example-gateway.mypinata.cloud",
  })
}

export async function fetchImageUrl(cid: string): Promise<string> {
  console.log("my cid is::",cid);
  
  const pinata = new PinataSDK({
    pinataJwt: process.env.NEXT_PUBLIC_PINATA_KEY!,
    pinataGateway: "jade-added-egret-280.mypinata.cloud",
  });
  
  try {
    const url = await pinata.gateways.createSignedURL({
      gateway: "jade-added-egret-280.mypinata.cloud",
      cid: cid,
      expires: 1800000000000,
    });
    console.log("Pinata Signed URL:", url);
    return url;
  } catch (error) {
    console.error("Error fetching image URL from Pinata:", error);
    return "";
  }
}

export async function uploadJSONToIPFS(jsonMetadata: any): Promise<{ ipfsUrl: string; contentHash: string }> {
  const pinata = createPinataClient()
  
  try {
    const  IpfsHash  = await pinata.upload.json(jsonMetadata)
    const contentHash = createHash("sha256")
      .update(JSON.stringify(jsonMetadata))
      .digest("hex")
    
    return {
      ipfsUrl: `https://ipfs.io/ipfs/${IpfsHash}`,
      contentHash: `0x${contentHash}`,
    }
  } catch (error) {
    console.error("Failed to upload JSON to IPFS:", error)
    throw new Error(`IPFS upload failed: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}
export async function uploadFileToIPFS(file: File): Promise<{ ipfsUrl: string; cid: string }> {
  const pinata = new PinataSDK({
    pinataJwt: process.env.NEXT_PUBLIC_PINATA_KEY!,
    pinataGateway: "jade-added-egret-280.mypinata.cloud",
  });
  
  try {
    const uploadResult = await pinata.upload.file(file);
    
    console.log("IPFS Hash from Pinata:", uploadResult.cid);
    
    return {
      ipfsUrl: `ipfs://${uploadResult.cid}`,
      cid: uploadResult.cid,
    };
  } catch (error) {
    console.error("Failed to upload file to IPFS:", error);
    throw new Error(`IPFS upload failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}
