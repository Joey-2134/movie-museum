import {useQuery} from "react-query";
import {GenreJSON} from "../types/types.ts";
import {fetchGenres} from "../api/genreRequests.ts";

import '../styles/Tables.css'
import Table from "../components/Table.tsx";

export default function Genres() {
      const { isLoading, error, data } = useQuery<GenreJSON[], Error>(
      'genres',
      fetchGenres
     )
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>

      // Check if data is empty
      if (data && data.length === 0) {
        return <div>No genres found</div>;
      }

    return (
        <Table<GenreJSON>
            columns={["Genre Name"]}
            data={data}>
        </Table>
    )
}