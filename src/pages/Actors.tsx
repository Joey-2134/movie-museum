import {useQuery} from "react-query";
import {ActorJSON} from "../types/types.ts";
import {fetchActors} from "../api/actorRequests.ts";

export default function Actors() {
      const { isLoading, error, data } = useQuery<ActorJSON[], Error>(
      'actors',
      fetchActors
     )
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>

      // Check if data is empty
      if (data && data.length === 0) {
        return <div>No actors found</div>;
      }

    return (
        <>
            {data?.map((actor: ActorJSON) => (
             <div>
               <ul>
                 <li>
                     <span>Name: {actor.firstName + " " + actor.lastName}</span>
                     <br/>
                     <span>Age: {actor.age}</span>
                 </li>
               </ul>
             </div>
         ))}
       </>
    )
}