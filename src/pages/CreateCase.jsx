import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function CreateCase() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        caseType: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post("/cases", formData);

            alert("Case Filed Successfully ⚖️");
            navigate("/cases");

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Navbar />

            {/* BACKGROUND */}
            <div
                className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
                style={{ backgroundImage: "url('/judiciary-bg.jpg')" }}
            >

                {/* LIGHT OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-blue-50/50 to-slate-100/60"></div>

                {/* CARD */}
                <div className="card w-[420px] bg-white/80 backdrop-blur-xl border border-gray-200 shadow-xl z-10">

                    <div className="card-body">

                        <h2 className="text-center text-2xl font-bold text-blue-900">
                            ⚖️ File a New Case
                        </h2>

                        <p className="text-center text-sm text-gray-600">
                            Fill the details carefully before submitting
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-4 mt-4">

                            <input
                                type="text"
                                name="title"
                                placeholder="Case Title"
                                className="input input-bordered w-full bg-white text-black"
                                onChange={handleChange}
                            />

                            <textarea
                                name="description"
                                placeholder="Case Description"
                                className="textarea textarea-bordered w-full bg-white text-black h-28"
                                onChange={handleChange}
                            />

                            <input
                                type="text"
                                name="caseType"
                                placeholder="Case Type (Civil / Criminal / etc.)"
                                className="input input-bordered w-full bg-white text-black"
                                onChange={handleChange}
                            />

                            <button
                                type="submit"
                                className="btn bg-blue-600 text-white w-full hover:bg-blue-700 transition"
                            >
                                File Case ⚖️
                            </button>

                        </form>

                    </div>

                </div>

            </div>
        </>
    );
}

export default CreateCase;