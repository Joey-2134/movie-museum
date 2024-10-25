import {API_BASE_URL} from "../utils/constants.ts";
import axios from "axios";
import { DirectorJSON } from "../types/types.ts"

export const fetchDirectors = async (): Promise<DirectorJSON[]> => {
    console.log("Fetching Directors from API");
    const response = await axios.get(API_BASE_URL + "directors");
    return response.data;
}