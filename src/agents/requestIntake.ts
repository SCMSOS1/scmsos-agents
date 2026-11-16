import { tools as scmsos } from "../tools/scmsos.js";

/**
 * Request Intake Agent
 * 
 * Expected API (to be provided by Saurav):
 * - GET  /requests/:id
 * - GET  /requests?status=Draft
 * - PATCH /requests/:id  (to set agentFlags, completeness, notes)
 * - POST /agentAuditLog
 */

export interface RequestRecord {
  id: string;
  status: "Draft" | "Ready to Quote" | string;
  designReady?: boolean;
  products?: Array<{ name: string; quantity?: number; specs?: string }>;
  techpackUrl?: string;
  notes?: string;
  agentFlags?: string[];
}

export async function runRequestIntake(requestId: string) {
  console.log(`[RequestIntake] Checking request ${requestId}`);

  // 1. Fetch the request
  const request = await scmsos.getRequest(requestId) as RequestRecord;

  const missing: string[] = [];
  const flags: string[] = [];

  // 2. Completeness checks
  if (!request.techpackUrl) missing.push("Tech pack / design file");
  if (!request.products || request.products.length === 0) missing.push("At least one product");
  if (request.products?.some(p => !p.quantity)) missing.push("Quantities on all products");
  if (request.status === "Draft" && request.designReady === false) {
    flags.push("Design not ready");
  }

  // 3. Decide outcome
  let recommendation = "Ready for sourcing";
  if (missing.length > 0) {
    recommendation = "Needs more information before quoting";
    flags.push("Incomplete");
  }

  const summary = missing.length
    ? `Missing: ${missing.join(", ")}. ${recommendation}.`
    : `Request looks complete. ${recommendation}.`;

  console.log(`[RequestIntake] ${summary}`);

  // 4. Write back (stub until API exists)
  // await scmsos.updateRequest(requestId, {
  //   agentFlags: flags,
  //   agentNotes: summary,
  //   completeness: missing.length === 0 ? "complete" : "incomplete"
  // });

  return { requestId, missing, flags, summary, recommendation };
}

// Example runner (can be called from index.ts later)
export async function runOnNewRequests() {
  // const drafts = await scmsos.listRequests({ status: "Draft" });
  // for (const r of drafts) {
  //   await runRequestIntake(r.id);
  // }
  console.log("[RequestIntake] Ready to process drafts once API is available.");
}
