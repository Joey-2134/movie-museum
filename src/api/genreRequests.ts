import {API_BASE_URL} from "../utils/constants.ts";
import axios from "axios";
import { GenreJSON } from "../types/types.ts"

export const fetchGenres = async (): Promise<GenreJSON[]> => {
    console.log('Fetching Genres...');
    const response = await axios.get(API_BASE_URL + 'genres');
    return response.data;
}

export const postGenre = async (genre: GenreJSON): Promise<GenreJSON> => {
    const url = `${API_BASE_URL}` + "genre/post";
    const response = await axios.post(url, genre);
    return response.data;
}

export const putGenres = async (genres: GenreJSON[]): Promise<void> => {
    console.log("Updating genres: " + genres);
    const url = `${API_BASE_URL}genres/put`;
    await axios.put(url, genres);
}

export const deleteGenres = async (ids: number[]): Promise<void> => {
    console.log("Deleting selected Genres");
    const url = `${API_BASE_URL}genres/delete`;
    await axios.delete(url, {data: ids});
}