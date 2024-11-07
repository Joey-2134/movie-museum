import {useQuery} from "react-query";
import {ActorJSON} from "../types/types.ts";
import {fetchActors} from "../api/actorRequests.ts";

import './Tables.css'

export default function Actors() {
      const { isLoading, error, data } = useQuery<ActorJSON[], Error>('actors', fetchActors);

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>

      // Check if data is empty
      if (data && data.length === 0) {
        return <div>No actors found</div>;
      }

    return (
        <table className="tableContent">
            <thead>
            <tr>
                <th className="header">Name</th>
                <th className="header">Age</th>
            </tr>
            </thead>
            <tbody>
                {data?.map((actor: ActorJSON) => (
                    <tr>
                        <td>{actor.firstName + " " + actor.lastName}</td>
                        <td>{actor.age}</td>
                    </tr>
                ))}
            </tbody>

        </table>
        //  <>
       //
       // </>
    )
}