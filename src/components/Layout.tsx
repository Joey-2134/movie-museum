import {Link, Outlet} from "react-router-dom";

export default function Layout() {
    return (
        <>
            <nav>
                <ol>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/actors">Actors</Link>
                    </li>
                    <li>
                        <Link to="/directors">Directors</Link>
                    </li>
                    <li>
                        <Link to="/movies">Movies</Link>
                    </li>
                </ol>
            </nav>

            <Outlet />
        </>
    )
}