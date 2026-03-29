export default async function handler(req, res) {
  try {
    const input = req.body?.input || "default";

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
