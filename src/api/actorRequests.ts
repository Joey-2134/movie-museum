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

export const putActors = async (actors: ActorJSON[]): Promise<void> => {
    console.log("Updating actors: " + actors);
    const url = `${API_BASE_URL}actors/put`;
    await axios.put(url, actors);
};

export const deleteActors = async (ids : number[]): Promise<void> => {
    console.log("Deleting selected Actors");
    const url = `${API_BASE_URL}actors/delete`;
    await axios.delete(url, {data: ids});
};