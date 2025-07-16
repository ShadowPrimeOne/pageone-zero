export async function POST(req) {
  try {
    const { prompt } = await req.json();
    const ollamaRes = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gemma:2b", // using the 2b model for UI testing
        prompt,
        options: { temperature: 0 },
        stream: false // <-- ensure Ollama returns a single JSON object
      }),
    });
    if (!ollamaRes.ok) {
      const errorText = await ollamaRes.text();
      console.error("Ollama error:", errorText);
      return Response.json({ error: "Ollama error: " + errorText }, { status: 500 });
    }
    const data = await ollamaRes.json();
    if (!data.response) {
      console.error("Ollama response missing 'response' field:", data);
      return Response.json({ error: "Ollama response missing 'response' field", raw: data }, { status: 500 });
    }
    return Response.json({ text: data.response.trim() });
  } catch (err) {
    console.error("API error:", err);
    return Response.json({ error: err.message || String(err) }, { status: 500 });
  }
} 