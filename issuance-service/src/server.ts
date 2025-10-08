import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(cors());

app.post("/issue", async (req: Request, res: Response) => {
  const { credentialData } = req.body;

  const issuedCredential = {
    id: Math.floor(Math.random() * 10000),
    credentialData,
    issuedAt: new Date(),
  };

  try {
    const verifyResponse = await axios.post(
      "https://zupple-verification-service.onrender.com/verify",
      { credential: issuedCredential }
    );

    res.status(200).json({
      message: "Credential issued and verified successfully!",
      issuedCredential,
      verificationResult: verifyResponse.data,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Credential issued but verification failed.",
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Issuance Service running on port ${PORT}`);
});
