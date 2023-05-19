import axios from "axios";
import { IImageInfo } from "../@type";

export const uploadProductImage = async (uid: string, imageFiles: any) => {
  const baseURL = `https://api.cloudinary.com/v1_1`;
  const cloudName = process.env.REACT_APP_CLOUD_NAME;
  const uploadURL = `${baseURL}/${cloudName}/image/upload`;
  const uploadPreset = process.env.REACT_APP_UPLOAD_PRESET_PRODUCT;

  const count = imageFiles.length;
  const imageUrlArray = [] as IImageInfo[];

  for (let i = 0; i < count; i++) {
    const base64Image = imageFiles[i].src; // Base64-encoded image

    const response = await axios.post(uploadURL, {
      file: base64Image,
      upload_preset: uploadPreset,
      folder: `${uploadPreset}/${uid}`,
    });

    if (response.status !== 200) {
      throw Error();
    }

    imageUrlArray.push({ url: response.data.url, publicId: response.data.public_id });
  }

  return imageUrlArray;
};
