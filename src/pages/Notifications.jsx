import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Notifications() {

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        loadNotifications();
    }, []);

    const loadNotifications = async () => {

        try {

            const response =
                await api.get("/notifications");

            setNotifications(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Navbar />

            <div className="p-6">

                <h1 className="text-3xl font-bold mb-6">
                    Notifications
                </h1>

                {notifications.length === 0 ? (
                    <p className="text-gray-500">
                        No Notifications Found
                    </p>
                ) : (
                    notifications.map((n) => (

                        <div
                            key={n.id}
                            className="card bg-base-100 shadow-md mb-4"
                        >

                            <div className="card-body">

                                <p className="text-lg">
                                    {n.message}
                                </p>

                                <div className="flex justify-between text-sm text-gray-500">

                                    <span>
                                        {new Date(n.createdAt).toLocaleString()}
                                    </span>

                                    <span
                                        className={
                                            n.read
                                                ? "badge badge-success"
                                                : "badge badge-warning"
                                        }
                                    >
                                        {n.read
                                            ? "Read"
                                            : "Unread"}
                                    </span>

                                </div>

                            </div>

                        </div>

                    ))
                )}

            </div>

        </>
    );
}

export default Notifications;