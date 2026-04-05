import Imagekit from "@imagekit/nodejs";

let imagekit = null;

const hasImageKitEnv =
  process.env.IMAGEKIT_PRIVATE_KEY &&
  process.env.IMAGEKIT_PUBLIC_KEY &&
  process.env.IMAGEKIT_URL_ENDPOINT;

if (hasImageKitEnv) {
  imagekit = new Imagekit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  });
}

export default imagekit;

