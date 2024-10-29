import {useQuery} from "react-query";
import {GenreJSON} from "../types/types.ts";
import {fetchGenres} from "../api/genreRequests.ts";

import './Tables.css'

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
        <table className="tableContent">
            <thead>
            <tr>
                <th className="header">Name</th>
            </tr>
            </thead>
            <tbody>
                {data?.map((genre: GenreJSON) => (
                    <tr>
                        <td>{genre.genreName}</td>
                    </tr>
                ))}
            </tbody>

        </table>
    )
}