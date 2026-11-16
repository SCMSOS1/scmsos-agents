/**
 * Recraft.ai tool stub
 */
export async function generateImage(prompt: string) {
  const token = process.env.RECRAFT_API_TOKEN;
  if (!token) throw new Error("RECRAFT_API_TOKEN not set");

  const res = await fetch("https://external.api.recraft.ai/v1/images/generations", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
      model: "recraftv4_1",
    }),
  });
  if (!res.ok) throw new Error(`Recraft ${res.status}: ${await res.text()}`);
  return res.json();
}
