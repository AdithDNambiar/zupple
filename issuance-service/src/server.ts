import express, { Request, Response } from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;

// Public verification service URL (override via env if you want)
const VERIFICATION_URL =
  process.env.VERIFICATION_URL ||
  "https://zupple-verification-service.onrender.com";

app.use(cors({ origin: "*" }));
app.use(express.json());

app.post("/issue", async (req: Request, res: Response) => {
  const { credentialData } = req.body || {};

  const issuedCredential = {
    id: Math.floor(Math.random() * 10000),
    credentialData,
    issuedAt: new Date().toISOString(),
  };

  try {
    const verifyResponse = await axios.post(
      `${VERIFICATION_URL.replace(/\/$/, "")}/verify`,
      { credential: issuedCredential },
      { timeout: 10000 }
    );

    return res.status(200).json({
      message: "Credential issued and verified successfully!",
      issuedCredential,
      verificationResult: verifyResponse.data,
    });
  } catch (error: any) {
    // Better logging for debugging
    console.error("Error contacting verification-service:");
    if (error.response) {
      console.error("status:", error.response.status);
      console.error("data:", error.response.data);
    } else {
      console.error(error.message || error);
    }
    return res.status(500).json({
      message: "Credential issued but verification failed.",
      error: error?.response?.data || error?.message || String(error),
    });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Issuance Service running on port ${PORT}`);
  console.log(`Using verification URL: ${VERIFICATION_URL}`);
});
