import {useQuery} from "react-query";
import {DirectorJSON} from "../types/types.ts";
import {fetchDirectors} from "../api/directorRequests.ts";

import '../styles/Tables.css'
import Table from "../components/Table.tsx";

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
            <Table<DirectorJSON>
                columns={["First Name", "Last Name", "Age"]}
                data={data}>
            </Table>
        </>
    )
}