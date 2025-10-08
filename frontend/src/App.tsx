import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import IssuePage from "./pages/IssuePage";
import VerifyPage from "./pages/VerifyPage";

const App: React.FC = () => {
  return (
    <Router>
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/" style={{ marginRight: "10px" }}>Issue Credential</Link>
        <Link to="/verify">Verify Credential</Link>
      </nav>
      <Routes>
        <Route path="/" element={<IssuePage />} />
        <Route path="/verify" element={<VerifyPage />} />
      </Routes>
    </Router>
  );
};

export default App;
