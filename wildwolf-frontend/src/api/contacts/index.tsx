import axios from "axios";
import { BASE_URL, CONTACTS } from "../url";
import { MatchRequestData } from "../../interfaces/contact.type";

export default function createContacts(contactData: MatchRequestData) {
  return axios
    .post(`${BASE_URL}${CONTACTS.CREATE_CONTACTS}`, contactData)
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      console.error("Error creating contacts:", error);
      throw error;
    });
}
