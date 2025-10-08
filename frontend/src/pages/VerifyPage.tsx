import React, { useState } from "react";
import axios from "axios";

const VerifyPage: React.FC = () => {
  const [id, setId] = useState("");
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    setLoading(true);
    setResponse(null);
    try {
      const res = await axios.post(
        "https://zupple-verification-service.onrender.com/verify",
        { credential: { id: Number(id) } },
        { timeout: 10000 }
      );
      setResponse(res.data);
    } catch (err: any) {
      setResponse(
        err?.response?.data || { error: err?.message || "Unknown error" }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Verify Credential</h2>
      <input
        placeholder="Credential ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <br />
      <button onClick={handleVerify} disabled={loading}>
        {loading ? "Verifying..." : "Verify"}
      </button>
      <pre style={{ whiteSpace: "pre-wrap" }}>
        {JSON.stringify(response, null, 2)}
      </pre>
    </div>
  );
};

export default VerifyPage;
