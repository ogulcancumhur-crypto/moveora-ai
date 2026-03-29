export default async function handler(req, res) {

  // ✅ CORS CONFIG (KRİTİK)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ✅ Preflight request fix
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const input = req.body?.input || "default";

    // ✅ MOCK DATA (AI yerine geçici)
    const cities = [
      { name: "Bali", score: 30 },
      { name: "Bangkok", score: 28 },
      { name: "Barcelona", score: 24 },
    ];

    return res.status(200).json({
      result: cities,
      explanation: `Results for: ${input}`,
    });

  } catch (error) {
    return res.status(500).json({
      result: [],
      explanation: "Server error",
    });
  }
}
