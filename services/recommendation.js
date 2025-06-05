const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function getAIRecommendation(weather, crop) {
  const { temperature, humidity, windSpeed } = weather;

  const prompt = `
You are an agricultural assistant. Provide a concise farming recommendation based on the following weather conditions and crop type.

Crop: ${crop}
Temperature: ${temperature}°C
Humidity: ${humidity}%
Wind Speed: ${windSpeed} m/s

Give a short and practical recommendation in English.
`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); 
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text.trim();
  } catch (error) {
    console.error("Gemini error:", error.message);
    return "AI could not generate a recommendation at this time.";
  }
}

module.exports = { getAIRecommendation };
