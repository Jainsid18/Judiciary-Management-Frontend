import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";
import CaseCard from "../components/CaseCard";

function Cases() {

const [cases, setCases] = useState([]);
const [selectedCase, setSelectedCase] = useState(null);

const [judges, setJudges] = useState([]);
const [selectedJudge, setSelectedJudge] = useState("");

const role = localStorage.getItem("role");

useEffect(() => {

    loadCases();

    if (role === "ADMIN") {
        loadJudges();
    }

}, []);

const loadCases = async () => {

    try {

        let response;

        if (role === "CITIZEN") {

            response = await api.get("/cases/my");

        } else if (role === "JUDGE") {

            response = await api.get("/judge/cases");

        } else if (role === "ADMIN") {

            response = await api.get("/cases");

        }

        setCases(response.data);

    } catch (error) {

        console.log(error);
    }
};

const loadJudges = async () => {

    try {

        const res = await api.get("/admin/judges");

        setJudges(res.data);

    } catch (error) {

        console.log(error);
    }
};

const openAssignModal = (caseId) => {

    setSelectedCase(caseId);
};

const assignJudge = async () => {

    if (!selectedJudge) {

        alert("Please select a judge");
        return;
    }

    try {

        await api.post(
            `/admin/cases/${selectedCase}/assign-judge/${selectedJudge}`,
            {
                judgeId: Number(selectedJudge)
            }
        );

        alert("Judge Assigned Successfully");

        setSelectedCase(null);
        setSelectedJudge("");

        loadCases();

    } catch (error) {

        console.log(error);

        alert("Assignment Failed");
    }
};

return (
    <>
        <Navbar />

        <div className="min-h-screen bg-slate-100 p-6">

            <div className="flex justify-between items-center mb-6">

                <div>

                    <h1 className="text-3xl font-bold text-slate-800">
                        ⚖️ {role === "ADMIN" ? "All Cases" : "My Cases"}
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Total Cases: {cases.length}
                    </p>

                </div>

            </div>

            {cases.length === 0 ? (

                <div className="alert alert-info shadow-md">
                    No Cases Found
                </div>

            ) : (

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

                    {cases.map((c) => (

                        <CaseCard
                            key={c.id}
                            caseData={c}
                            role={role}
                            onAssignJudge={openAssignModal}
                        />

                    ))}

                </div>

            )}

            {selectedCase && (

                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

                    <div className="bg-white rounded-xl shadow-xl p-6 w-[450px]">

                        <h2 className="text-xl font-bold mb-2">
                            👨‍⚖️ Assign Judge
                        </h2>

                        <p className="text-gray-500 mb-4">
                            Case ID: #{selectedCase}
                        </p>

                        <select
                            className="select select-bordered w-full"
                            value={selectedJudge}
                            onChange={(e) =>
                                setSelectedJudge(e.target.value)
                            }
                        >

                            <option value="">
                                Select Judge
                            </option>

                            {judges.map((judge) => (

                                <option
                                    key={judge.id}
                                    value={judge.id}
                                >
                                    {judge.fullName} ({judge.email})
                                </option>

                            ))}

                        </select>

                        <div className="flex justify-end gap-3 mt-5">

                            <button
                                className="btn btn-outline"
                                onClick={() => {
                                    setSelectedCase(null);
                                    setSelectedJudge("");
                                }}
                            >
                                Cancel
                            </button>

                            <button
                                className="btn btn-primary"
                                onClick={assignJudge}
                            >
                                Assign Judge
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    </>
);


}

export default Cases;
