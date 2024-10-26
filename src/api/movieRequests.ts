import {API_BASE_URL} from "../utils/constants.ts";
import axios from "axios";
import { MovieJSON } from "../types/types.ts"

export const fetchMovies = async (): Promise<MovieJSON[]> => {
    console.log('fetching movies');
    const response = await axios.get(API_BASE_URL + 'movies');
    return response.data;
}