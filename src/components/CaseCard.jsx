import { Link } from "react-router-dom";

function CaseCard({ caseData, role, onAssignJudge }) {

const getStatusBadge = (status) => {

    switch (status) {

        case "PENDING":
            return "badge-warning";

        case "APPROVED":
            return "badge-success";

        case "REJECTED":
            return "badge-error";

        case "CLOSED":
            return "badge-neutral";

        default:
            return "badge-primary";
    }
};

return (

    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200 overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4">

            <h2 className="text-lg font-bold text-white line-clamp-1">

                {caseData.title}

            </h2>

        </div>

        {/* Body */}
        <div className="p-5">

            <p className="text-gray-600 text-sm min-h-[70px] line-clamp-3">

                {caseData.description}

            </p>

            {/* Status & Type */}
            <div className="flex flex-wrap gap-2 mt-4">

                <div className={`badge ${getStatusBadge(caseData.status)}`}>
                    {caseData.status}
                </div>

                <div className="badge badge-outline">
                    {caseData.caseType}
                </div>

            </div>

            {/* Case Details */}
            <div className="mt-5 space-y-2 text-sm">

                <div className="flex justify-between">

                    <span className="font-semibold text-slate-700">
                        Citizen
                    </span>

                    <span className="text-gray-500 text-right">
                        {caseData.citizenEmail}
                    </span>

                </div>

                <div className="flex justify-between">

                    <span className="font-semibold text-slate-700">
                        Assigned Judge
                    </span>

                    <span className="text-gray-500 text-right">

                        {caseData.assignedJudge
                            ? caseData.assignedJudge
                            : "Not Assigned"}

                    </span>

                </div>

            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-6">

                <Link
                    to={`/cases/${caseData.id}`}
                    className="btn btn-outline btn-sm flex-1"
                >
                    View Details
                </Link>

                {role === "ADMIN" && (

                    <button
                        className="btn btn-primary btn-sm flex-1"
                        onClick={() =>
                            onAssignJudge(caseData.id)
                        }
                    >
                        Assign Judge
                    </button>

                )}

            </div>

        </div>

    </div>

);


}

export default CaseCard;
