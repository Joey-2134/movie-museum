import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "../components/Layout";
import Home from "./Home.tsx";
import Actors from "./Actors.tsx";
import Directors from "./Directors.tsx";
import Movies from "./Movies.tsx";
import Genres from "./Genres.tsx";
import NoPage from "./NoPage.tsx";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="actors" element={<Actors />} />
                    <Route path="directors" element={<Directors />} />
                    <Route path="movies" element={<Movies />} />
                    <Route path="genres" element={<Genres />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
    </BrowserRouter>
    )
}