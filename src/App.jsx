import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "./layout/Layout";

import { HomePage } from "./pages/HomePage";

import { NewClient } from "./pages/NewClient";
import { EditClient } from "./pages/EditClient";

function App() {
    return (
        <Router>
            <Routes>
                <Route>
                    <Route path="/clients" element={<Layout />}>
                        <Route index element={<HomePage />} />
                        <Route path="new" element={<NewClient />} />
                        <Route path="edit/:id" element={<EditClient />} />
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
