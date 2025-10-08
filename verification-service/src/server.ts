import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "*" }));
app.use(express.json());

app.post("/verify", (req: Request, res: Response) => {
  const { credential } = req.body || {};

  const isValid = !!credential && !!credential.id;

  res.status(200).json({
    verified: isValid,
    verifiedAt: new Date().toISOString(),
    credentialId: credential?.id ?? null,
  });
});

app.listen(PORT, () => {
  console.log(`✅ Verification Service running on port ${PORT}`);
});
