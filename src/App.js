import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Outlet } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import ChatPage from "./pages/ChatPage/ChatPage";
function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<MainPage />}/>
                <Route path="/connect/:categoryId" element={<ChatPage />}/>
            </Routes>
            <Outlet />
        </div>
    );
}

export default App;
