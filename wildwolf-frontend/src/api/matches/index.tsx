import axios from "axios";
import { BASE_URL, MATCHES } from "../url";

export default function getMatches() {
  return axios
    .get(`${BASE_URL}${MATCHES.GET_MATCHES}`)
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      console.error("Error fetching matches:", error);
      throw error;
    });
}
