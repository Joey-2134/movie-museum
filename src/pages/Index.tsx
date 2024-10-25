import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "../components/Layout";
import Home from "./Home.tsx";
import Actors from "./Actors.tsx";
import Movies from "./Movies.tsx";
import NoPage from "./NoPage.tsx";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="actors" element={<Actors />} />
                    <Route path="movies" element={<Movies />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
    </BrowserRouter>
    )
}