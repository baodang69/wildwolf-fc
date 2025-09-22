import axios from "axios";
import { BASE_URL, GALLERIES } from "../url";

export function getImages() {
  return axios
    .get(`${BASE_URL}${GALLERIES.GET_IMAGES}`)
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      console.error("Error fetching images:", error);
      throw error;
    });
}

export function getImageDetail(params: string) {
  return axios
    .get(`${BASE_URL}${GALLERIES.GET_IMAGES}/${params}`)
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      console.error("Error fetching images:", error);
      throw error;
    });
}
