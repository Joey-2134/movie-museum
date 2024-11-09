import {useMutation, useQuery, useQueryClient} from "react-query";
import {DirectorJSON} from "../types/types.ts";
import {deleteDirectors, fetchDirectors, putDirectors} from "../api/directorRequests.ts";

import '../styles/Tables.css'
import Table from "../components/Table.tsx";
import {useState} from "react";

export default function Directors() {

    const queryClient = useQueryClient();
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [data, setData] = useState<DirectorJSON[]>([]);
    const { isLoading, error } = useQuery<DirectorJSON[], Error>('directors', fetchDirectors, {
       onSuccess: (data) => setData(data),
    });

    const deleteMutation = useMutation(deleteDirectors, {
        onSuccess: () => {
            queryClient.invalidateQueries('directors');
        }
    });

    const updateMutation = useMutation(putDirectors, {
        onSuccess: () => {
            queryClient.invalidateQueries('directors');
        }
    });

    const handleDelete = (selectedIds: number[]) => {
        if (!selectedIds) return;

        deleteMutation.mutate(selectedIds);
    };

    const handleUpdate = (data: DirectorJSON[]) => {
        if (!data) return;

        const directorsToUpdate: DirectorJSON[] = data.filter((director: DirectorJSON)=>
            selectedIds.includes(director.id as number)
        );
        updateMutation.mutate(directorsToUpdate);
        setSelectedIds([]);
    };

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    if (data && data.length === 0) return <div>No directors found</div>

    return (
        <Table<DirectorJSON>
            columns={["", "First Name", "Last Name", "Age"]}
            data={data || []}
            setData={setData}
            setSelectedIds={setSelectedIds}
            selectedIds={selectedIds}
            onDelete={() => handleDelete(selectedIds)}
            onUpdate={() => handleUpdate(data)}>
        </Table>
    )
}