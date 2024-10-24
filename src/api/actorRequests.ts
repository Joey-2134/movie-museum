import {API_BASE_URL} from "../utils/constants.ts";
import axios from "axios";
import { ActorJSON } from "../types/types.ts"

export const fetchActors = async (): Promise<ActorJSON[]> => {
    console.log('fetching actors');
    const response = await axios.get(API_BASE_URL + 'actors');
    return response.data;
}