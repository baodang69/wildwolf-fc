import axios from "axios";
import { BASE_URL, FORMATIONS } from "../url";

export default function getFormation() {
  return axios
    .get(`${BASE_URL}${FORMATIONS.GET_TRUE_FORMATION}`)
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      console.error("Error fetching matches:", error);
      throw error;
    });
}
