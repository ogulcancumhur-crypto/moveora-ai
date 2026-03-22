export default async function handler(req, res) {
  try {
    const { input } = req.body || {};

    // ALWAYS return data (even if no input)
    const cities = [
      { name: "Bali", score: 30 },
      { name: "Bangkok", score: 28 },
      { name: "Barcelona", score: 24 },
    ];

    return res.status(200).json({
      success: true,
      result: cities,
      explanation:
        "Top cities for affordable, warm, and remote-friendly lifestyle.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
}
