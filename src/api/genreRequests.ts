import {API_BASE_URL} from "../utils/constants.ts";
import axios from "axios";
import { GenreJSON } from "../types/types.ts"

export const fetchGenres = async (): Promise<GenreJSON[]> => {
    console.log('Fetching Genres...');
    const response = await axios.get(API_BASE_URL + 'genres');
    return response.data;
}