import {useQuery} from "react-query";
import {MovieJSON} from "../types/types.ts";
import {fetchMovies} from "../api/movieRequests.ts";

import '../styles/Tables.css'
import Table from "../components/Table.tsx";
import {useState} from "react";

export default function Movies() {

    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const { isLoading, error, data } = useQuery<MovieJSON[], Error>('directors', fetchMovies)

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    if (data && data.length === 0) return <div>No directors found</div>

    return (
        <Table<MovieJSON>
            columns={["Title", "Release Year", "IMDB Rating"]}
            data={data || []}
            setSelectedIds={setSelectedRows}
            selectedIds={selectedRows}>
        </Table>
    )
}