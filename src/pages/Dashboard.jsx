import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {

    const [stats, setStats] = useState(null);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            const res = await api.get("/admin/dashboard");
            setStats(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    if (!stats) {
        return (
            <>
                <Navbar />
                <p className="p-6">Loading dashboard...</p>
            </>
        );
    }

    const data = {
        labels: ["Open", "Closed", "Assigned"],
        datasets: [
            {
                data: [
                    stats.openCases,
                    stats.closedCases,
                    stats.assignedCases
                ],
                backgroundColor: ["#facc15", "#22c55e", "#3b82f6"]
            }
        ]
    };

    return (
        <>
            <Navbar />

            <div className="p-6">

                <h1 className="text-3xl font-bold mb-6">
                    Admin Dashboard
                </h1>

                {/* STATS CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">

                    <div className="card bg-base-200 p-4">
                        <p>Total Cases</p>
                        <h2 className="text-2xl font-bold">
                            {stats.totalCases}
                        </h2>
                    </div>

                    <div className="card bg-base-200 p-4">
                        <p>Open Cases</p>
                        <h2 className="text-2xl font-bold text-yellow-500">
                            {stats.openCases}
                        </h2>
                    </div>

                    <div className="card bg-base-200 p-4">
                        <p>Closed Cases</p>
                        <h2 className="text-2xl font-bold text-green-500">
                            {stats.closedCases}
                        </h2>
                    </div>

                    <div className="card bg-base-200 p-4">
                        <p>Assigned Cases</p>
                        <h2 className="text-2xl font-bold text-blue-500">
                            {stats.assignedCases}
                        </h2>
                    </div>

                </div>

                {/* CHART */}
                <div className="card bg-base-200 p-6 w-full md:w-1/2 mx-auto">

                    <h2 className="text-xl font-bold mb-4 text-center">
                        Case Distribution
                    </h2>

                    <Pie data={data} />

                </div>

            </div>
        </>
    );
}

export default Dashboard;