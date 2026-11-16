/**
 * SCMSOS API tools
 * These will call the endpoints Saurav creates.
 * Currently stubs until the API key and routes exist.
 */

const BASE = process.env.SCMSOS_API_BASE_URL || "";
const KEY = process.env.SCMSOS_API_KEY || "";

export async function scmsosFetch(path: string, options: RequestInit = {}) {
  if (!BASE || !KEY) {
    throw new Error("SCMSOS_API_BASE_URL or SCMSOS_API_KEY not set");
  }
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      "Authorization": `Bearer ${KEY}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  if (!res.ok) {
    throw new Error(`SCMSOS API ${res.status}: ${await res.text()}`);
  }
  return res.json();
}

export const tools = {
  async getRequest(id: string) {
    return scmsosFetch(`/requests/${id}`);
  },
  async listQualifiedFactoryQuotes(requestId: string) {
    return scmsosFetch(`/requests/${requestId}/factory-quotes?qualified=true`);
  },
};
