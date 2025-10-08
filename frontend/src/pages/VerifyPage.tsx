import React, { useState } from "react";
import axios from "axios";

const VerifyPage: React.FC = () => {
  const [id, setId] = useState("");
  const [response, setResponse] = useState<any>(null);

  const handleVerify = async () => {
    try {
      const res = await axios.post("https://zupple-verification-service.onrender.com/verify", {
        credential: { id: Number(id) },
      });
      setResponse(res.data);
    } catch (err: any) {
      setResponse(err.response?.data || { error: err.message });
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
      <button onClick={handleVerify}>Verify</button>
      <pre>{JSON.stringify(response, null, 2)}</pre>
    </div>
  );
};

export default VerifyPage;
