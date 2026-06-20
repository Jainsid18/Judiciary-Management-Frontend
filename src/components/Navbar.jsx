import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const role = localStorage.getItem("role");

    const handleLogout = () => {

        localStorage.clear();
        navigate("/login");
    };

    return (

        <div className="navbar bg-base-200 shadow-lg px-6">

            <div className="flex-1">

                <Link
                    to="/"
                    className="text-xl font-bold"
                >
                    Judiciary System
                </Link>

            </div>

            <div className="flex gap-3">

                {role === "ADMIN" && (
                    <>
                        <Link
                            className="btn btn-ghost"
                            to="/dashboard"
                        >
                            Dashboard
                        </Link>

                        <Link
                            className="btn btn-ghost"
                            to="/cases"
                        >
                            Cases
                        </Link>
                    </>
                )}

                {role === "JUDGE" && (
                    <Link
                        className="btn btn-ghost"
                        to="/cases"
                    >
                        My Cases
                    </Link>
                )}

                {role === "CITIZEN" && (
                    <>
                        <Link
                            className="btn btn-ghost"
                            to="/create-case"
                        >
                            Create Case
                        </Link>

                        <Link
                            className="btn btn-ghost"
                            to="/cases"
                        >
                            My Cases
                        </Link>
                    </>
                )}

                <Link
                    className="btn btn-ghost"
                    to="/notifications"
                >
                    Notifications
                </Link>

                <button
                    className="btn btn-error"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

        </div>
    );
}

export default Navbar;