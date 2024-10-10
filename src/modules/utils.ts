import axios from "axios";
import qs from "qs";

const baseApi = axios.create({
  baseURL: `${process.env.__NEXT_PRIVATE_ORIGIN ?? ""}/api`,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  paramsSerializer(params) {
    return qs.stringify(params, { arrayFormat: "comma" });
  },
});

const nasaApi = axios.create({
  baseURL: process.env.NASA_API_URL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

nasaApi.interceptors.request.use((config) => {
  if (config.params instanceof URLSearchParams && process.env.NASA_API_KEY) {
    config.params.set("api_key", process.env.NASA_API_KEY);
  }

  return config;
});

const nasaImagesApi = axios.create({
  baseURL: process.env.NASA_IMAGES_API_URL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export { baseApi, nasaApi, nasaImagesApi };
