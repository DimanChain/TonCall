import './App.css';
import './bootstrap.min.css';
import { Routes, Route, Outlet } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import ChatPage from "./pages/ChatPage/ChatPage";
import { Buffer } from 'buffer'

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/connect/:categoryId" element={<ChatPage />} />
            </Routes>
            <Outlet />
        </div>
    );
}

export default App;
