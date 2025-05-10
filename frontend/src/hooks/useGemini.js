// src/hooks/useGemini.js

export const useGemini = () => {
  const GEMINI_API_KEY = "AIzaSyAogWlkkEMp5KQKvPcF-7YHTXNU8kWJUO0"; // Replace or use from .env

  const askGemini = async (prompt) => {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: prompt }],
              },
            ],
          }),
        }
      );

      const data = await res.json();
      return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
    } catch (err) {
      console.error("Gemini API error:", err);
      return "Something went wrong with Gemini API.";
    }
  };

  return { askGemini };
};
