import {useQuery} from "react-query";
import {DirectorJSON} from "../types/types.ts";
import {fetchDirectors} from "../api/directorRequests.ts";

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
        <>
            {data?.map((director: DirectorJSON) => (
                <div>
                    <ul>
                        <li>
                            <span>Name: {director.firstName + " " + director.lastName}</span>
                            <br/>
                            <span>Age: {director.age}</span>
                        </li>
                    </ul>
                </div>
            ))}
        </>
    )
}