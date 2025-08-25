import axios from "axios";
import { BASE_URL, MEMBERS } from "../url";

export default function getMember() {
  return axios
    .get(`${BASE_URL}${MEMBERS.GET_MEMBERS}`)
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      console.error("Error fetching members:", error);
      throw error;
    });
}
