export type ActorJSON = {
    firstName: string;
    lastName: string;
    age: number;
    movies: MovieJSON[];
}

export type MovieJSON = {
    title: string;
    releaseYear: number;
    imdbRating: number;
    actors: ActorJSON[];
    director: DirectorJSON;
    genres: GenreJSON[];
}

export type DirectorJSON = {
    firstName: string;
    lastName: string;
    age: number;
    movies: MovieJSON[];
}

export type GenreJSON = {
    genreName: string;
    movies: MovieJSON[];
}

export type TableProps<T> = {
    columns: string[];
    data: T[];
    // onCreate: (newData: T) => void;    // Function for creating a new entity
    // onEdit: (updatedData: T) => void;  // Function for editing an entity
    onDelete: (firstName: string, lastName: string) => Promise<void>;
}