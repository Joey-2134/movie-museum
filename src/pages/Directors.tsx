import {useQuery} from "react-query";
import {DirectorJSON} from "../types/types.ts";
import {fetchDirectors} from "../api/directorRequests.ts";

import './Tables.css'

export default function Directors() {
    const { isLoading, error, data } = useQuery<DirectorJSON[], Error>(
        'directors',
        fetchDirectors,
    )
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>

    // Check if returned data is empty
    if (data && data.length === 0) {
        return <div>No directors found</div>;
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
            {data?.map((actor: DirectorJSON) => (
                <tr>
                    <td>{actor.firstName + " " + actor.lastName}</td>
                    <td>{actor.age}</td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}