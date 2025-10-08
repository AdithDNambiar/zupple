import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import axios from "axios";
import cors from "cors"; // ✅ Add this line

const app = express();
const PORT = 4000;

app.use(cors()); // ✅ Add this line
app.use(bodyParser.json());

app.post("/issue", async (req: Request, res: Response) => {
  const { credentialData } = req.body;

  // Dummy issuance process
  const issuedCredential = {
    id: Math.floor(Math.random() * 10000),
    credentialData,
    issuedAt: new Date(),
  };

  try {
    // Call verification service inside Docker network
    const verifyResponse = await axios.post(
      "http://verification-service:5000/verify",
      { credential: issuedCredential }
    );

    res.status(200).json({
      message: "Credential issued and verified successfully!",
      issuedCredential,
      verificationResult: verifyResponse.data,
    });
  } catch (error: any) {
    console.error("Error contacting verification-service:", error.message);
    res.status(500).json({
      message: "Credential issued but verification failed.",
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Issuance Service running on port ${PORT}`);
});
