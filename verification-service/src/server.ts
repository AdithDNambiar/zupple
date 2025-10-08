import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors"; // ✅ Add this line

const app = express();
const PORT = 5000;

app.use(cors()); // ✅ Add this line
app.use(bodyParser.json());

app.post("/verify", (req: Request, res: Response) => {
  const { credential } = req.body;

  // Simple mock verification
  const isValid = !!credential && !!credential.id;

  res.status(200).json({
    verified: isValid,
    verifiedAt: new Date(),
    credentialId: credential?.id,
  });
});

app.listen(PORT, () => {
  console.log(`✅ Verification Service running on port ${PORT}`);
});
