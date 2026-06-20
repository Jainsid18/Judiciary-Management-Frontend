import { useEffect, useState } from "react";
import api from "../services/api";

function Timeline({ caseId }) {

    const [timeline, setTimeline] = useState([]);

    useEffect(() => {
        if (caseId) {
            loadTimeline();
        }
    }, [caseId]);

    const loadTimeline = async () => {
        try {
            const res = await api.get(`/timeline/${caseId}`);
            setTimeline(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="p-4">

            <h2 className="text-2xl font-bold mb-4 text-primary">
                Case Timeline
            </h2>

            {timeline.length === 0 ? (
                <div className="alert alert-info">
                    No timeline available
                </div>
            ) : (
                <ul className="timeline timeline-vertical">

                    {timeline.map((t, i) => (
                        <li key={i}>

                            <div className="timeline-start">
                                <div className="text-sm text-gray-500">
                                    #{i + 1}
                                </div>
                            </div>

                            <div className="timeline-middle">
                                <div className="w-3 h-3 bg-primary rounded-full"></div>
                            </div>

                            <div className="timeline-end mb-6">
                                <div className="card bg-base-100 shadow-md p-4">

                                    <h3 className="font-bold text-lg text-primary">
                                        {t.eventType}
                                    </h3>

                                    <p className="text-gray-700">
                                        {t.description}
                                    </p>

                                    <p className="text-xs text-gray-400 mt-2">
                                        {t.eventTime}
                                    </p>

                                </div>
                            </div>

                            {i !== timeline.length - 1 && (
                                <hr className="bg-gray-300" />
                            )}

                        </li>
                    ))}

                </ul>
            )}

        </div>
    );
}

export default Timeline;