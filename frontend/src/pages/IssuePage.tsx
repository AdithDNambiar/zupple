import React, { useState } from "react";
import axios from "axios";

const IssuePage: React.FC = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [response, setResponse] = useState<any>(null);
  const [issuedId, setIssuedId] = useState<number | null>(null);

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "https://zupple-issuance-service.onrender.com/issue", // ✅ POST to /issue
        { credentialData: { name, role } }
      );
      setResponse(res.data);
      setIssuedId(res.data.issuedCredential?.id || null);
    } catch (err: any) {
      setResponse(err.response?.data || { error: err.message });
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Issue Credential</h2>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <input
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit}>Issue</button>

      {issuedId && (
        <p>
          Credential ID: <strong>{issuedId}</strong> (use this to verify)
        </p>
      )}

      <pre>{JSON.stringify(response, null, 2)}</pre>
    </div>
  );
};

export default IssuePage;
