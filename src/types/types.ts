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
    setData?: (value: (((prevState: T[]) => T[]) | T[])) => void,
    createData?: T,
    setCreateData?: (value: (((prevState: (T)) => (T)) | T)) => void,
    setSelectedIds?: (value: (((prevState: number[]) => number[]) | number[])) => void,
    selectedIds?: number[],
    onDelete?: () => void,
    onUpdate?: () => void,
    onSubmit?: () => void
}