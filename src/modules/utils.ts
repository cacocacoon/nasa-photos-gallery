import axios from "axios";
import qs from "qs";

const baseApi = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  paramsSerializer(params) {
    return qs.stringify(params, { arrayFormat: "comma" });
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
