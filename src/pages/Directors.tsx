import {useMutation, useQuery, useQueryClient} from "react-query";
import {ActorJSON, DirectorJSON} from "../types/types.ts";
import {deleteDirectors, fetchDirectors, postDirector, putDirectors} from "../api/directorRequests.ts";

import '../styles/Tables.css'
import Table from "../components/Table.tsx";
import {useState} from "react";

export default function Directors() {

    const queryClient = useQueryClient();
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [data, setData] = useState<DirectorJSON[]>([]);
    const [createData, setCreateData] = useState<ActorJSON>(
        {
            id: 0,
            firstName: "",
            lastName: "",
            age: 0,
            movies: []
        }
    );
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

    const submitMutation = useMutation(postDirector, {
        onSuccess: () => {
            queryClient.invalidateQueries('directors');
        }
    });

    const handleSubmit = (createData: DirectorJSON) => {
        if (!createData) return;

        submitMutation.mutate(createData);
        setCreateData({
            id: 0,
            firstName: "",
            lastName: "",
            age: 0,
            movies: []
        })
    }

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    if (data && data.length === 0) return <div>No directors found</div>

    return (
        <Table<DirectorJSON>
            columns={["","First Name", "Last Name", "Age"]}
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