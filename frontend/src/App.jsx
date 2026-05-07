import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Bookmarks from "./pages/Bookmarks";
import Navbar from "./component/Navbar";
import ProtectedRoute from "./routes/ProtectedRoute";



function App() {

  return (

    <BrowserRouter>

      <Navbar />
      <Routes>

        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/home" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/bookmarks" element={ <ProtectedRoute> <Bookmarks /> </ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;