import {useMutation, useQuery, useQueryClient} from "react-query";
import {GenreJSON} from "../types/types.ts";
import {deleteGenres, fetchGenres, postGenre, putGenres} from "../api/genreRequests.ts";

import '../styles/Tables.css'
import Table from "../components/Table.tsx";
import {useState} from "react";

export default function Genres() {

    const queryClient = useQueryClient();
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [data, setData] = useState<GenreJSON[]>([]);
    const [createData, setCreateData] = useState<GenreJSON>({
        id: 0,
        genreName: "",
        movies: []
    });


    const { isLoading, error } = useQuery<GenreJSON[], Error>('genres', fetchGenres, {
       onSuccess: (data) => setData(data)
    });

    const deleteMutation = useMutation(deleteGenres, {
        onSuccess: () => {
            queryClient.invalidateQueries('genres');
        }
    });

    const updateMutation = useMutation(putGenres, {
        onSuccess: () => {
            queryClient.invalidateQueries('genres');
        }
    });

    const handleDelete = (selectedIds: number[]) => {
        if (!selectedIds) return;

        deleteMutation.mutate(selectedIds);
    };

    const handleUpdate = (data: GenreJSON[]) => {
        if (!data) return;

        const genresToUpdate: GenreJSON[] = data.filter((genre: GenreJSON)=>
            selectedIds.includes(genre.id as number)
        );
        updateMutation.mutate(genresToUpdate);
        setSelectedIds([]);
    };

    const submitMutation = useMutation(postGenre, {
        onSuccess: () => {
            queryClient.invalidateQueries('genres');
        }
    });

    const handleSubmit = (createData: GenreJSON) => {
        if (!createData) return;

        submitMutation.mutate(createData);
        setCreateData({
            id: 0,
            genreName: "",
            movies: []
        });
    };


    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    if (data && data.length === 0) return <div>No genres found</div>

    return (
        <Table<GenreJSON>
            columns={["", "Genre Name"]}
            data={data || []}
            setData={setData}
            createData={createData}
            setCreateData={setCreateData}
            setSelectedIds={setSelectedIds}
            selectedIds={selectedIds}
            onDelete={() => handleDelete(selectedIds)}
            onUpdate={() => handleUpdate(data)}
            onSubmit={() => handleSubmit(createData)}>
        </Table>
    )
}