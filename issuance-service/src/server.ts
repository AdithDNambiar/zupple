import express, { Request, Response } from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const dataFile = path.join(__dirname, "credentials.json");

if (!fs.existsSync(dataFile)) {
  fs.writeFileSync(dataFile, JSON.stringify([]));
}

app.post("/issue", (req: Request, res: Response) => {
  const { name, role } = req.body;

  if (!name || !role) {
    return res.status(400).json({ error: "Name and role are required" });
  }

  const credentials = JSON.parse(fs.readFileSync(dataFile, "utf-8"));
  const existing = credentials.find(
    (c: any) =>
      c.credentialData.name === name && c.credentialData.role === role
  );

  if (existing) {
    return res.json({
      message: "Credential already exists",
      issuedCredential: existing,
    });
  }

  const newCredential = {
    id: Math.floor(1000 + Math.random() * 9000),
    credentialData: { name, role },
    issuedAt: new Date().toISOString(),
  };

  credentials.push(newCredential);
  fs.writeFileSync(dataFile, JSON.stringify(credentials, null, 2));

  res.json({
    message: "Credential issued successfully",
    issuedCredential: newCredential,
  });
});

app.get("/", (_req: Request, res: Response) => {
  res.send("✅ Issuance Service is running!");
});

app.listen(PORT, () =>
  console.log(`✅ Issuance Service running on port ${PORT}`)
);
