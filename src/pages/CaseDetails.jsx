import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";
import Timeline from "./Timeline";

function CaseDetails() {

    const { id } = useParams();

    const [caseData, setCaseData] = useState(null);
    const [activeTab, setActiveTab] = useState("details");

    const [file, setFile] = useState(null);
    const [docs, setDocs] = useState([]);
    const [hearings, setHearings] = useState([]);
    const [hearingTime, setHearingTime] = useState("");
    const [remarks, setRemarks] = useState("");
    const role = localStorage.getItem("role");
    const [uploading, setUploading] = useState(false);

    const fileRef = useRef();


    useEffect(() => {
        if (!id) return;

        loadAll();
    }, [id]);

    const loadAll = async () => {
        try {
            await Promise.all([
                loadCase(),
                loadDocs(),
                loadHearings()
            ]);
        } catch (err) {
            console.log(err);
        }
    };

    // ---------------- CASE ----------------
    const loadCase = async () => {
        const res = await api.get(`/cases/${id}`);
        setCaseData(res.data);
    };

    // ---------------- DOCS ----------------
    const loadDocs = async () => {
        const res = await api.get(`/documents/case/${id}`);
        setDocs(res.data);
    };

    const uploadFile = async () => {

        if (!file) return;

        setUploading(true);

        try {
            const formData = new FormData();
            formData.append("file", file);

            await api.post(`/documents/upload/${id}`, formData);

            setFile(null);
            fileRef.current.value = "";

            loadDocs();
        } catch (err) {
            console.log(err);
        } finally {
            setUploading(false);
        }
    };

    // ---------------- HEARINGS ----------------
    const loadHearings = async () => {
        const res = await api.get(`/hearings/case/${id}`);
        setHearings(res.data);
    };

    const scheduleHearing = async () => {

    if (!hearingTime) {
        alert("Please select hearing time");
        return;
    }

    try {

        await api.post("/hearings", {
            caseId: Number(id),
            hearingDate: hearingTime,
            remarks: remarks
        });

        setHearingTime("");
        setRemarks("");

        loadHearings();

    } catch (err) {

        console.log(err);
    }
};
    // ---------------- LOADING ----------------
    if (!caseData) {
        return (
            <>
                <Navbar />
                <div className="p-6">
                    <div className="alert alert-info">
                        Loading case details...
                    </div>
                </div>
            </>
        );
    }

    // ---------------- UI ----------------
    return (
        <>
            <Navbar />

            <div className="p-6 max-w-5xl mx-auto">

                {/* HEADER */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-primary">
                        Case #{id}
                    </h1>
                    <p className="text-gray-500">
                        {caseData.title || "Untitled Case"}
                    </p>
                </div>

                {/* TABS */}
                <div className="tabs tabs-boxed mb-6 bg-base-200">

                    <a
                        className={`tab ${activeTab === "details" ? "tab-active" : ""}`}
                        onClick={() => setActiveTab("details")}
                    >
                        Details
                    </a>

                    <a
                        className={`tab ${activeTab === "timeline" ? "tab-active" : ""}`}
                        onClick={() => setActiveTab("timeline")}
                    >
                        Timeline
                    </a>

                    <a
                        className={`tab ${activeTab === "documents" ? "tab-active" : ""}`}
                        onClick={() => setActiveTab("documents")}
                    >
                        Documents
                    </a>

                    <a
                        className={`tab ${activeTab === "hearings" ? "tab-active" : ""}`}
                        onClick={() => setActiveTab("hearings")}
                    >
                        Hearings
                    </a>

                </div>

                {/* CONTENT BOX */}
                <div className="bg-base-100 shadow-lg rounded-lg p-6">

                    {/* DETAILS */}
                    {activeTab === "details" && (
                        <div className="space-y-3">

                            <p><b>Description:</b> {caseData.description}</p>

                            <p>
                                <b>Status:</b>{" "}
                                <span className="badge badge-primary">
                                    {caseData.status}
                                </span>
                            </p>

                            <p><b>Type:</b> {caseData.caseType}</p>
                            <p><b>Citizen:</b> {caseData.citizenEmail}</p>
                            <p><b>Judge:</b> {caseData.assignedJudge || "Not assigned"}</p>

                        </div>
                    )}

                    {/* TIMELINE */}
                    {activeTab === "timeline" && (
                        <Timeline caseId={id} />
                    )}

                    {/* DOCUMENTS */}
                    {activeTab === "documents" && (
                        <div>

                            <div className="flex gap-2 mb-4">

                                <input
                                    ref={fileRef}
                                    type="file"
                                    className="file-input file-input-bordered w-full"
                                    onChange={(e) => setFile(e.target.files[0])}
                                />

                                <button
                                    className="btn btn-primary"
                                    onClick={uploadFile}
                                    disabled={!file || uploading}
                                >
                                    {uploading ? "Uploading..." : "Upload"}
                                </button>

                            </div>

                            {docs.length === 0 ? (
                                <div className="alert alert-warning">
                                    No documents uploaded
                                </div>
                            ) : (
                                docs.map((d) => (
                                    <div
                                        key={d.id}
                                        className="card bg-base-200 p-3 mb-2 flex justify-between items-center"
                                    >
                                        <p className="font-medium">📄 {d.fileName}</p>

                                        <a
                                            href={d.fileUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="btn btn-sm btn-outline"
                                        >
                                            View
                                        </a>
                                    </div>
                                ))
                            )}

                        </div>
                    )}

                    {/* HEARINGS */}
                    {activeTab === "hearings" && (
                        <div>

                            {/* schedule */}
                            {role === "JUDGE" && (
                            <div className="card bg-base-200 p-4 mb-4">

                                <h2 className="font-bold mb-2">
                                    Schedule Hearing
                                </h2>

                                <input
                                    type="datetime-local"
                                    className="input input-bordered w-full"
                                    value={hearingTime}
                                    onChange={(e) => setHearingTime(e.target.value)}
                                />

                                 <textarea
            className="textarea textarea-bordered w-full mt-3"
            placeholder="Remarks"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
        />
                                <button
                                    className="btn btn-primary mt-3"
                                    onClick={scheduleHearing}
                                >
                                    Schedule
                                </button>

                            </div>
                            )}

                            {/* list */}
                            <div className="space-y-3">

                                {hearings.length === 0 ? (
                                    <div className="alert alert-info">
                                        No hearings scheduled
                                    </div>
                                ) : (
                                    hearings.map((h) => (
                                        <div
                                            key={h.id || h.hearingTime}
                                            className="card bg-base-100 shadow p-3"
                                        >
                                            <p className="font-bold">
                                                📅 {new Date(h.hearingTime).toLocaleString()}
                                            </p>
                                              
                                              <p className="text-sm text-gray-500">
                                                   📝 {h.remarks}
                                              </p>
                                            <p className="text-sm text-gray-500">
                                                Status: {h.status || "UPCOMING"}
                                            </p>
                                        </div>
                                    ))
                                )}

                            </div>

                        </div>
                    )}

                </div>
            </div>
        </>
    );
}

export default CaseDetails;