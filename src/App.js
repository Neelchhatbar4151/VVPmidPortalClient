import { Routes, Route } from "react-router-dom";

import Demo from "./components/Demo";

function App() {
    return (
        <>
            <Routes>
                <Route exact path="/" element={<Demo />} />
            </Routes>
        </>
    );
}

export default App;
