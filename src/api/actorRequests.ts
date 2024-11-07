import {API_BASE_URL} from "../utils/constants.ts";
import axios from "axios";
import { ActorJSON } from "../types/types.ts"

export const fetchActors = async (): Promise<ActorJSON[]> => {
    console.log('fetching actors');
    const response = await axios.get(API_BASE_URL + 'actors');
    return response.data;
}

export const postActor = async (actor: ActorJSON): Promise<ActorJSON> => {
    const url = `${API_BASE_URL}` + "actors";
    const response = await axios.post(url, actor);
    return response.data;
}

export const putActor = async (firstName: string, lastName: string, updatedActor: ActorJSON): Promise<ActorJSON> => {
    const url = `${API_BASE_URL}actor/${firstName}/${lastName}`;
    const response = await axios.put(url, updatedActor);
    return response.data;
};

export const deleteActor = async (firstName: string, lastName: string): Promise<void> => {
    const url = `${API_BASE_URL}actor/${firstName}/${lastName}`;
    await axios.delete(url);
};