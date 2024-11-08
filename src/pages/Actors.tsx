import {useQuery} from "react-query";
import {ActorJSON} from "../types/types.ts";
import {deleteActor, fetchActors, postActor, putActor} from "../api/actorRequests.ts";

import '../styles/Tables.css'
import Table from "../components/Table.tsx";

export default function Actors() {
      const { isLoading, error, data } = useQuery<ActorJSON[], Error>('actors', fetchActors);

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>

    if (data && data.length === 0) {
        return <div>No actors found</div>;
    }

    return (
        <>
            <Table<ActorJSON>
                columns={["First Name", "Last Name", "Age"]}
                data={data}
                onCreate={postActor}
                onEdit={putActor}
                onDelete={deleteActor}>
            </Table>
        </>
    )
}