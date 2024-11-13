import {useMutation, useQuery, useQueryClient} from "react-query";
import {DirectorJSON} from "../types/types.ts";
import {deleteDirectors, fetchDirectors, postDirector, putDirectors} from "../api/directorRequests.ts";

import '../styles/Tables.css'
import Table from "../components/Table.tsx";
import {useState} from "react";

export default function Directors() {

    const queryClient = useQueryClient();
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [data, setData] = useState<DirectorJSON[]>([]);
    const [createData, setCreateData] = useState<DirectorJSON>(
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
            selectedIds.forEach((id) => {
                setData(data.filter((director) => director.id !== id));
            });
            setSelectedIds([]);
        }
    });

    const updateMutation = useMutation(putDirectors, {
        onSuccess: () => {
            queryClient.invalidateQueries('directors');
            setSelectedIds([]);
        }
    });

    const submitMutation = useMutation(postDirector, {
        onSuccess: (newDirector) => {
            setData(prevState => [...prevState, newDirector]); // instead of invalidating the query, we add the new director to the data
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