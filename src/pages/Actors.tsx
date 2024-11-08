import {useMutation, useQuery, useQueryClient} from "react-query";
import {ActorJSON} from "../types/types.ts";
import {deleteActors, fetchActors, putActors} from "../api/actorRequests.ts";

import '../styles/Tables.css'
import Table from "../components/Table.tsx";
import {useState} from "react";

export default function Actors() {

    const queryClient = useQueryClient();
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [data, setData] = useState<ActorJSON[]>([]);
    const { isLoading, error } = useQuery<ActorJSON[], Error>('actors', fetchActors, {
        onSuccess: (data) => setData(data)
    });

    const deleteMutation = useMutation(deleteActors, {
        onSuccess: () => {
            queryClient.invalidateQueries('actors');
        }
    });

    const updateMutation = useMutation(putActors, {
        onSuccess: () => {
            queryClient.invalidateQueries('actors');
        }
    });

    const handleDelete = (selectedIds: number[]) => {
        if (!data) return;

        const actorsToDelete: ActorJSON[] = data.filter((actor: ActorJSON) =>
            selectedIds.includes(actor.id as number)
        );
        deleteMutation.mutate(actorsToDelete);
    };

    const handleUpdate = (data: ActorJSON[]) => {
        if (!data) return;

        const actorsToUpdate: ActorJSON[] = data.filter((actor: ActorJSON) =>
            selectedIds.includes(actor.id as number)
        );
        updateMutation.mutate(actorsToUpdate);
        setSelectedIds([]);
    }

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    if (data && data.length === 0) return <div>No actors found</div>

    return (
        <Table<ActorJSON>
            columns={["","First Name", "Last Name", "Age"]}
            data={data || []}
            setData={setData}
            setSelectedIds={setSelectedIds}
            selectedIds={selectedIds}
            onDelete={() => handleDelete(selectedIds)}
            onUpdate={() => handleUpdate(data)}>
        </Table>
    )
}