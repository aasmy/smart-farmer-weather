/**
 * Provide simple agricultural recommendations based on weather and crop type.
 * @param {Object} weather - Contains temperature, humidity, windSpeed
 * @param {string} crop - Name of the crop (e.g., tomato, wheat)
 * @returns {string} - Recommendation message
 */
function getRecommendation(weather, crop) {
  const { temperature, humidity, windSpeed } = weather;

  if (temperature < 5) {
    return `The temperature is very low. It is advised to protect ${crop} from frost.`;
  }

  if (temperature > 35) {
    return `High temperature detected. Make sure to irrigate the ${crop} adequately.`;
  }

  if (humidity < 30) {
    return `Humidity is low. Irrigating the ${crop} today is recommended.`;
  }

  if (windSpeed > 10) {
    return `Strong winds expected. Protect the ${crop} from possible damage.`;
  }

  return `Weather conditions are suitable for growing or irrigating ${crop}.`;
}

module.exports = { getRecommendation };
