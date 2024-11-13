import {API_BASE_URL} from "../utils/constants.ts";
import axios from "axios";
import { DirectorJSON } from "../types/types.ts"

export const fetchDirectors = async (): Promise<DirectorJSON[]> => {
    console.log("Fetching Directors from API");
    const response = await axios.get(API_BASE_URL + "directors");
    return response.data;
}

export const postDirector = async (director: DirectorJSON): Promise<DirectorJSON> => {
    const url = `${API_BASE_URL}` + "director/post";
    const response = await axios.post(url, director);
    return response.data;
}

export const putDirectors = async (directors: DirectorJSON[]): Promise<void> => {
    console.log("Updating directors: " + directors);
    const url = `${API_BASE_URL}directors/put`;
    await axios.put(url, directors);
}

export const deleteDirectors = async (ids: number[]): Promise<void> => {
    console.log("Deleting selected Directors");
    const url = `${API_BASE_URL}directors/delete`;
    await axios.delete(url, {data: ids});
}