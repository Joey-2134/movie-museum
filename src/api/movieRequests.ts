import {API_BASE_URL} from "../utils/constants.ts";
import axios from "axios";
import { MovieJSON } from "../types/types.ts"

export const fetchMovies = async (): Promise<MovieJSON[]> => {
    console.log('fetching movies');
    const response = await axios.get(API_BASE_URL + 'movies');
    return response.data;
}

export const postMovie = async (movie: MovieJSON): Promise<MovieJSON> => {
    const url = `${API_BASE_URL}` + "movie/post";
    const response = await axios.post(url, movie);
    return response.data;
}

export const putMovies = async (movies: MovieJSON[]): Promise<void> => {
    console.log("Updating movies: " + movies);
    const url = `${API_BASE_URL}movies/put`;
    await axios.put(url, movies);
}

export const deleteMovies = async (ids: number[]): Promise<void> => {
    console.log("Deleting selected Movies");
    const url = `${API_BASE_URL}movies/delete`;
    await axios.delete(url, {data: ids});
}