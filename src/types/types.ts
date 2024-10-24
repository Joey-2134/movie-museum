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
    name: string;
    movies: MovieJSON[];
}


