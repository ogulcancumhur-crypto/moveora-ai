import OpenAI from "openai";

const openai = new OpenAI({
apiKey: process.env.OPENAI_API_KEY,
});

// 🌍 20 CITY DATA
const cities = [
{"city":"Paris","cost":2,"weather":3,"remote":3},
{"city":"Rome","cost":3,"weather":4,"remote":3},
{"city":"Barcelona","cost":3,"weather":5,"remote":4},
{"city":"Lisbon","cost":3,"weather":5,"remote":4},
{"city":"Berlin","cost":2,"weather":3,"remote":4},
{"city":"Dubai","cost":2,"weather":5,"remote":4},
{"city":"Bangkok","cost":5,"weather":5,"remote":4},
{"city":"Bali","cost":5,"weather":5,"remote":5},
{"city":"Singapore","cost":1,"weather":5,"remote":5},
{"city":"Tokyo","cost":2,"weather":3,"remote":4},
{"city":"New York","cost":1,"weather":3,"remote":4},
{"city":"Austin","cost":3,"weather":5,"remote":4},
{"city":"Los Angeles","cost":2,"weather":5,"remote":4},
{"city":"Mexico City","cost":4,"weather":4,"remote":4},
{"city":"Buenos Aires","cost":4,"weather":4,"remote":3},
{"city":"Istanbul","cost":4,"weather":4,"remote":4},
{"city":"Budapest","cost":4,"weather":3,"remote":4},
{"city":"Prague","cost":3,"weather":3,"remote":4},
{"city":"Tallinn","cost":3,"weather":2,"remote":4},
{"city":"Cape Town","cost":4,"weather":5,"remote":3}
];

// 🧠 SCORING FUNCTION
function scoreCity(city, input) {
let score = 0;
const text = input.toLowerCase();

if (text.includes("cheap")) score += city.cost * 2;
if (text.includes("warm")) score += city.weather * 2;
if (text.includes("remote")) score += city.remote * 2;

return score;
}

// 🎯 TOP 3 CITIES
function getTopCities(input) {
return cities
.map(city => ({
...city,
score: scoreCity(city, input)
}))
.sort((a, b) => b.score - a.score)
.slice(0, 3);
}

// 🚀 API HANDLER
export default async function handler(req, res) {
try {
const input = req.body.prompt || "";

const topCities = getTopCities(input);

const aiPrompt = `
Explain why these cities are good choices:

${topCities.map(c => c.city).join(", ")}

User input: ${input}

Keep it short and clear.
`;

const response = await openai.responses.create({
model: "gpt-4.1-mini",
input: aiPrompt,
});

const text = response.output[0].content[0].text;

res.status(200).json({
cities: topCities,
reply: text
});

} catch (error) {
res.status(500).json({
error: error.message
});
}
}
