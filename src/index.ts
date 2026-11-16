import "dotenv/config";

console.log("SCMSOS Agents service starting…");
console.log("API base:", process.env.SCMSOS_API_BASE_URL || "(not set)");

async function main() {
  console.log("Ready. Waiting for SCMSOS API key and first tools.");
}

main().catch(console.error);
