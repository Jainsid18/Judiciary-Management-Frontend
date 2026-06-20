import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response =
                await api.post("/auth/login", {
                    email,
                    password
                });

            const token = response.data.token;

            localStorage.setItem("token", token);

            // decode role from backend OR store separately
            const role = response.data.role;

            localStorage.setItem("role", role);

            navigate("/cases");

        } catch (error) {
            console.log(error);
        }
    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-base-200">

            <div className="card w-96 bg-base-100 shadow-xl">

                <div className="card-body">

                    <h2 className="text-center text-2xl font-bold">
                        Judiciary System Login
                    </h2>

                    <form onSubmit={handleLogin} className="space-y-4 mt-4">

                        <input
                            type="email"
                            placeholder="Email"
                            className="input input-bordered w-full"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            className="input input-bordered w-full"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button
                            className="btn btn-primary w-full"
                            type="submit"
                        >
                            Login
                        </button>

                    </form>

                    <p className="text-center text-sm mt-2">
                        Don’t have account?{" "}
                        <Link to="/register" className="text-primary">
                            Register
                        </Link>
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Login;