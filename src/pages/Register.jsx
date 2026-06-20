import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Register() {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("CITIZEN");

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await api.post("/auth/register", {
                fullName,
                email,
                password,
                phone,
                
            });

            alert("Registration Successful 🎉");
            navigate("/login");

        } catch (error) {
            console.log(error);
            alert("Registration Failed ❌");
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
            style={{ backgroundImage: "url('/judiciary-bg.jpg')" }}
        >

            {/* LIGHT OVERLAY (IMPORTANT) */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-blue-50/40 to-slate-100/50"></div>

            {/* CARD */}
            <div className="card w-96 bg-white/80 backdrop-blur-xl border border-gray-200 shadow-xl z-10">

                <div className="card-body text-gray-800">

                    <h2 className="text-center text-2xl font-bold text-blue-900">
                        ⚖️ Judiciary System Register
                    </h2>

                    <form onSubmit={handleRegister} className="space-y-3 mt-4">

                        <input
                            type="text"
                            placeholder="Full Name"
                            className="input input-bordered w-full bg-white text-black"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            className="input input-bordered w-full bg-white text-black"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            className="input input-bordered w-full bg-white text-black"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder="Phone"
                            className="input input-bordered w-full bg-white text-black"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />

                        {/* Role Dropdown */}
                        <select
                            className="select select-bordered w-full bg-white text-black"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="CITIZEN">Citizen</option>
                            <option value="JUDGE">Judge</option>
                            <option value="LAWYER">Lawyer</option>
                            <option value="ADMIN">Admin</option>
                        </select>

                        <button className="btn bg-blue-600 text-white w-full hover:bg-blue-700">
                            Register
                        </button>

                    </form>

                    <p className="text-center text-sm mt-2 text-gray-600">
                        Already have account?{" "}
                        <Link to="/login" className="text-blue-700 font-semibold">
                            Login
                        </Link>
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Register;