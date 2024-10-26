import {Link, Outlet} from "react-router-dom";
import './Layout.css';
export default function Layout() {
    return (
        <>
            <nav id="navbar">
                <ul>
                    <li>
                        <Link className="link" to="/">Home</Link>
                    </li>
                    <li>
                        <Link className="link" to="/actors">Actors</Link>
                    </li>
                    <li>
                        <Link className="link" to="/directors">Directors</Link>
                    </li>
                    <li>
                        <Link className="link" to="/movies">Movies</Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </>
    )
}