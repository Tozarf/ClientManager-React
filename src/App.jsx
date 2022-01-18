import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "./layout/Layout";
import { Login } from "./layout/Login";
import { HomePage } from "./pages/HomePage";
import { LoginForm } from "./pages/LoginForm";

function App() {
    return (
        <Router>
            <Routes>
                <Route>
                    <Route path="/" element={<Login />}>
                        <Route index element={<LoginForm />} />
                    </Route>
                    <Route path="/clients" element={<Layout />}>
                        <Route index element={<HomePage />} />
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
