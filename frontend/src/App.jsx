import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import Home from "./components/Home";
import Profile from "./components/Profile";
import GradientBackground from "./components/GradientBackground";
import "./App.css";
import ProtectedRoute from "./routes/ProtectedRoute";

function ConditionalBackground() {
  const location = useLocation();
  const hideGradient = ["/", "/profile"].includes(location.pathname);

  if (hideGradient) return null;
  return <GradientBackground />;
}

function App() {
  return (
    <>
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="custom-card-clip" clipPathUnits="objectBoundingBox">
            <path d="M0 0.0351351C0 0.0157306 0.0174609 0 0.039 0H0.5H0.727414C0.741798 0 0.755513 0.00547207 0.765179 0.0150678L0.858 0.107207L0.98622 0.236143C0.995093 0.245066 1 0.256625 1 0.268605V0.5V0.964865C1 0.984269 0.982539 1 0.961 1H0.039C0.0174609 1 0 0.984269 0 0.964865V0.0351351Z" />
          </clipPath>
        </defs>
      </svg>

      <Router>
        <ConditionalBackground />
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;