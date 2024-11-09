import {useMutation, useQuery, useQueryClient} from "react-query";
import {MovieJSON} from "../types/types.ts";
import {deleteMovies, fetchMovies, putMovies} from "../api/movieRequests.ts";

import '../styles/Tables.css'
import Table from "../components/Table.tsx";
import {useState} from "react";

export default function Movies() {

    const queryClient = useQueryClient();
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [data, setData] = useState<MovieJSON[]>([]);
    const { isLoading, error } = useQuery<MovieJSON[], Error>('movies', fetchMovies, {
       onSuccess: (data) => setData(data)
    });

    const deleteMutation = useMutation(deleteMovies, {
       onSuccess: () => {
           queryClient.invalidateQueries('movies');
       }
    });

    const updateMutation = useMutation(putMovies, {
        onSuccess: () => {
            queryClient.invalidateQueries('movies');
        }
    });

    const handleDelete = (selectedIds: number[]) => {
        if (!selectedIds) return;

        deleteMutation.mutate(selectedIds);
    }

    const handleUpdate = (data: MovieJSON[]) => {
        if (!data) return;

        const moviesToUpdate: MovieJSON[] = data.filter((movie: MovieJSON) =>
            selectedIds.includes(movie.id as number)
        );

        updateMutation.mutate(moviesToUpdate);
        setSelectedIds([]);
    }

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    if (data && data.length === 0) return <div>No movies found</div>

    return (
        <Table<MovieJSON>
            columns={["", "Title", "Release Year", "IMDB Rating"]}
            data={data || []}
            setData={setData}
            setSelectedIds={setSelectedIds}
            selectedIds={selectedIds}
            onDelete={() => handleDelete(selectedIds)}
            onUpdate={() => handleUpdate(data)}>
        </Table>
    )
}