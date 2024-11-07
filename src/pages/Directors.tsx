import {useQuery} from "react-query";
import {DirectorJSON} from "../types/types.ts";
import {fetchDirectors} from "../api/directorRequests.ts";

import '../styles/Tables.css'
import Table from "../components/Table.tsx";
import {useState} from "react";

export default function Directors() {

    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const { isLoading, error, data } = useQuery<DirectorJSON[], Error>('directors', fetchDirectors)

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    if (data && data.length === 0) return <div>No directors found</div>

    return (
        <Table<DirectorJSON>
            columns={["First Name", "Last Name", "Age"]}
            data={data || []}
            setSelectedRows={setSelectedRows}
            selectedRows={selectedRows}>
        </Table>
    )
}