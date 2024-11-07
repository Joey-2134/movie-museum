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

export const putActors = async (firstName: string, lastName: string, actors: ActorJSON[]): Promise<void> => {
    for (const actor of actors) {
        console.log("Updating actor: " + actor.firstName + " " + actor.lastName);
        const url = `${API_BASE_URL}actor/${firstName}/${lastName}`;
        await axios.put(url, actor);
    }
};

export const deleteActors = async (actors : ActorJSON[]): Promise<void> => {
    for (const actor of actors) {
        console.log("Deleting actor: " + actor.firstName + " " + actor.lastName);
        const url = `${API_BASE_URL}actor/${actor.firstName}/${actor.lastName}`;
        await axios.delete(url);
    }
};