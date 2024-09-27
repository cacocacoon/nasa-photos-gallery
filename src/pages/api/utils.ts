import axios from "axios";

const baseApi = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

const nasaImagesApi = axios.create({
  baseURL: process.env.NASA_IMAGES_API_URL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

const nasaImagesAssetsApi = axios.create({
  baseURL: process.env.NASA_IMAGES_ASSETS_API_URL,
});

export { baseApi, nasaImagesApi, nasaImagesAssetsApi };
