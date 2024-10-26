import {useQuery} from "react-query";
import {MovieJSON} from "../types/types.ts";
import {fetchMovies} from "../api/movieRequests.ts";

import './Tables.css'

export default function Movies() {
    const { isLoading, error, data } = useQuery<MovieJSON[], Error>(
        'directors',
        fetchMovies,
    )

    const headerMovieNames = `header movieHeader`
    const movieTitleHeader = `header movieTitle`
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>

    // Check if returned data is empty
    if (data && data.length === 0) {
        return <div>No directors found</div>;
    }

    return (
        <div className={'container'}>
            <table className="tableContent">
                <thead>
                <tr>
                    <th className={movieTitleHeader}>Title</th>
                    <th className={headerMovieNames}>Release Year</th>
                    <th className={headerMovieNames}>IMDB Rating</th>
                </tr>
                </thead>
                <tbody>
                {data?.map((movie: MovieJSON) => (
                    <tr>
                        <td>{movie.title}</td>
                        <td>{movie.releaseYear}</td>
                        <td>{movie.imdbRating}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}