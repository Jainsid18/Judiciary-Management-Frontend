import { Navigate } from "react-router-dom";

function RoleProtectedRoute({
    children,
    allowedRole
}) {

    const token =
        localStorage.getItem("token");

    const role =
        localStorage.getItem("role");

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (role !== allowedRole) {
        return <Navigate to="/cases" />;
    }

    return children;
}

export default RoleProtectedRoute;