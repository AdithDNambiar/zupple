import axios from "axios";

const ISSUANCE_URL = "http://localhost:4000/issue";

async function testIssueAndVerify() {
  try {
    const issueResponse = await axios.post(ISSUANCE_URL, {
      credentialData: { name: "Alice", role: "Developer" },
    });

    console.log("✅ Issuance Response:");
    console.log(issueResponse.data);

    const issuedCredential = issueResponse.data.issuedCredential;

    const verifyResponse = await axios.post("http://localhost:5000/verify", {
      credential: issuedCredential,
    });

    console.log("\n✅ Direct Verification Response:");
    console.log(verifyResponse.data);
  } catch (err) {
    console.error("❌ Error during test:", err.message);
  }
}

testIssueAndVerify();
