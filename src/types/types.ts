export interface Identifiable {
    id: number | string;
}

export type ActorJSON = {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    movies: MovieJSON[];
}

export type MovieJSON = {
    id: number;
    title: string;
    releaseYear: number;
    imdbRating: number;
    actors: ActorJSON[];
    director: DirectorJSON;
    genres: GenreJSON[];
}

export type DirectorJSON = {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    movies: MovieJSON[];
}

export type GenreJSON = {
    id: number;
    genreName: string;
    movies: MovieJSON[];
}

export type TableProps<T> = {
    columns: string[],
    data: T[],
    setSelectedRows?: (value: (((prevState: number[]) => number[]) | number[])) => void,
    selectedRows?: number[],
    onDelete?: () => void
}