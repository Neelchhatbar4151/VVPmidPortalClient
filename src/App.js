import { Routes, Route } from "react-router-dom";

import "./assets/styles/Login.css";
import "./assets/styles/markSheet.css";
import "./assets/styles/Bubbles.css";
import "./assets/styles/Loader.css";
import "./assets/styles/SuperAdmin.css";

import Login from "./pages/Login";
import StudentLogin from "./pages/StudentLogin";
import MarkSheet from "./pages/MarkSheet";
import AdminPortal from "./pages/AdminPortal";
import SuperAdminPortal from "./pages/SuperAdminPortal";
import HighestMarks from "./pages/HighestMakrs";

const Error = () => {
    return <>Invalid URL</>;
};
function App() {
    return (
        <>
            <Routes>
                <Route exact path="/" element={<StudentLogin />} />
                <Route exact path="/adminLogin" element={<Login />} />
                <Route exact path="/MarkSheet" element={<MarkSheet />} />
                <Route exact path="/AdminPortal" element={<AdminPortal />} />
                <Route
                    exact
                    path="/SuperAdminPortal"
                    element={<SuperAdminPortal />}
                />
                <Route exact path="/Highest" element={<HighestMarks />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </>
    );
}

export default App;
