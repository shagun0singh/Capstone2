// src/utils/nutritionixApi.js
export async function fetchRecommendedIntake({ age, gender, weight, height }) {
  const API_KEY = 'YOUR_API_KEY'; // TODO: Replace with your Nutritionix API key
  const APP_ID = 'YOUR_APP_ID';   // TODO: Replace with your Nutritionix App ID
  const url = 'https://trackapi.nutritionix.com/v2/natural/nutrients';

  // Nutritionix expects a query string, so we build a sentence
  const query = `recommended water intake for a ${age} year old ${gender} weighing ${weight}kg and ${height}cm tall`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'x-app-id': APP_ID,
        'x-app-key': API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });
    if (!response.ok) throw new Error('API error');
    const data = await response.json();
    // You may need to adjust this based on Nutritionix API response structure
    // For demo, fallback to 2000 if not found
    return data.recommended_water_ml || 2000;
  } catch (e) {
    return 2000;
  }
} 