import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Cases from "./pages/Cases";
import CaseDetails from "./pages/CaseDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import Notifications from "./pages/Notifications";
import CreateCase from "./pages/CreateCase";
import RoleProtectedRoute from "./components/RoleProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={ <RoleProtectedRoute allowedRole="ADMIN">  <Dashboard /> </RoleProtectedRoute> }/>
<Route path="/cases" element={ <ProtectedRoute> <Cases /> </ProtectedRoute> }/>

<Route path="/cases/:id" element={ <ProtectedRoute> <CaseDetails /></ProtectedRoute>}/>
            <Route path="/notifications" element={<ProtectedRoute> <Notifications /> </ProtectedRoute>}
/>

<Route path="/create-case"  element={  <ProtectedRoute>    <CreateCase /> </ProtectedRoute>
    }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;