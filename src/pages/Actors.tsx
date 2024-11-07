import {useMutation, useQuery, useQueryClient} from "react-query";
import {ActorJSON} from "../types/types.ts";
import {deleteActors, fetchActors} from "../api/actorRequests.ts";

import '../styles/Tables.css'
import Table from "../components/Table.tsx";
import {useState} from "react";

export default function Actors() {

    const queryClient = useQueryClient();
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const { isLoading, error, data } = useQuery<ActorJSON[], Error>('actors', fetchActors);

    const deleteMutation = useMutation(deleteActors, {
        onSuccess: () => {
            queryClient.invalidateQueries('actors');
        }
    });

    const handleDelete = (selectedRows: number[]) => {
        if (data) {
            const actorsToDelete: ActorJSON[] = data.filter((actor: ActorJSON) =>
                selectedRows.includes(actor.id as number)
            );
            deleteMutation.mutate(actorsToDelete);
        }
    };

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    if (data && data.length === 0) return <div>No actors found</div>

    return (
        <Table<ActorJSON>
            columns={["","First Name", "Last Name", "Age"]}
            data={data || []}
            setSelectedRows={setSelectedRows}
            selectedRows={selectedRows}
            onDelete={() => handleDelete(selectedRows)}>
        </Table>
    )
}