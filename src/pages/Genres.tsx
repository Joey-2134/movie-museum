import {useQuery} from "react-query";
import {GenreJSON} from "../types/types.ts";
import {fetchGenres} from "../api/genreRequests.ts";

import '../styles/Tables.css'
import Table from "../components/Table.tsx";
import {useState} from "react";

export default function Genres() {

    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const { isLoading, error, data } = useQuery<GenreJSON[], Error>('genres', fetchGenres)

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    if (data && data.length === 0) return <div>No genres found</div>

    return (
        <Table<GenreJSON>
            columns={["Genre Name"]}
            data={data || []}
            setSelectedRows={setSelectedRows}
            selectedRows={selectedRows}>
        </Table>
    )
}