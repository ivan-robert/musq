import axios from "axios";
import { API_HOST, API_KEY, API_URL } from "./environment";



export const fetchExosAPI = async (
    limit: number,
    offset: number
  ): Promise<any[]> => {
    try {
      const response = await axios.request({
        baseURL: API_URL,
        url: "/exercises",
        method: "GET",
        headers: {
          "X-RapidAPI-Key": API_KEY,
          "X-RapidAPI-Host": API_HOST,
        },
        params: { limit, offset },
      });
      return response.data;
    } catch (error) {
      console.error("Error while fetching the exercises from the API :", error);
      throw new Error("Error fetching exercises");
    }
  };

