document.addEventListener('DOMContentLoaded', () => {
  const getLocationBtn = document.getElementById('getLocationBtn');
  const form = document.getElementById('manualForm');
  const resultDiv = document.getElementById('result');

  const resultCity = document.getElementById('resultCity');
  const temp = document.getElementById('temp');
  const humidity = document.getElementById('humidity');
  const wind = document.getElementById('wind');
  const condition = document.getElementById('condition');
  const recommendation = document.getElementById('recommendation');

  function showResult(data) {
    resultCity.textContent = data.city;
    temp.textContent = data.current.temperature;
    humidity.textContent = data.current.humidity;
    wind.textContent = data.current.windSpeed;
    condition.textContent = data.current.condition;
    recommendation.textContent = data.recommendation;
    resultDiv.classList.remove('d-none');
  }

  getLocationBtn.addEventListener('click', () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        const response = await fetch(`/weather?lat=${latitude}&lon=${longitude}&crop=auto`);
        const data = await response.json();
        showResult(data);
        const city = document.getElementById('city').value = data.city ;

      } catch (err) {
        alert('Failed to fetch weather by location');
      }
    }, () => {
      alert('Unable to retrieve your location');
    });

  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const city = document.getElementById('city').value.trim();
    const crop = document.getElementById('crop').value.trim();

    try {
      const response = await fetch(`/weather?city=${city}&crop=${crop}`);
      const data = await response.json();

      if (data.error) {
        alert(data.error);
        return;
      }

      showResult(data);
    } catch (err) {
      alert('Failed to fetch weather data');
    }
  });
});
