export default async function handler(req, res) {
  try {
    const { input } = req.body;

    if (!input) {
      return res.status(400).json({
        error: "No input provided",
      });
    }

    const cities = [
      { name: "Bali", score: 30 },
      { name: "Bangkok", score: 28 },
      { name: "Barcelona", score: 24 },
    ];

    return res.status(200).json({
      result: cities,
      explanation:
        "These cities match your preferences for warm weather, affordability, and remote work lifestyle.",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
}
