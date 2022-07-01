import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Outlet } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<MainPage />}>
                </Route>
            </Routes>
            <Outlet />
        </div>
    );
}

export default App;
