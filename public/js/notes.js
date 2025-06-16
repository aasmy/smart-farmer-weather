document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('noteForm');
  const titleInput = document.getElementById('noteTitle');
  const cityInput = document.getElementById('noteCity');
  const cropInput = document.getElementById('noteCrop');
  const contentInput = document.getElementById('noteContent');
  const weatherBtn = document.getElementById('fetchWeatherBtn');

  // Handle user input 
document.getElementById('noteForm').addEventListener('submit', function (e) {
  const userInputField = document.getElementById('userInput');
  const noteContent = document.getElementById('noteContent').value;
  userInputField.value = noteContent;
});

  // Handle "Fetch Weather" button click
  weatherBtn.addEventListener('click', async () => {
    const city = cityInput.value.trim();
    const crop = cropInput.value.trim();

    if (city) {
      fetchWeatherByCity(city, crop);
    } else {
      if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser.");
        return;
      }

      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          const res = await fetch(`/weather?lat=${lat}&lon=${lon}&crop=${crop || "crop"}`);
          const data = await res.json();

          if (data.error) {
            alert("Weather fetch failed: " + data.error);
            return;
          }

          const weatherText = `Weather in ${data.city}: ${data.current.temperature}°C, ${data.current.condition}. Recommendation: ${data.recommendation}`;
          alert(weatherText);
        } catch (err) {
          alert("Failed to fetch weather data by location.");
          console.error(err);
        }
      }, () => {
        alert("Location access denied.");
      });
    }
  });

  // Fetch weather data using city name
  async function fetchWeatherByCity(city, crop) {
    try {
      const res = await fetch(`/weather?city=${city}&crop=${crop || "crop"}`);
      const data = await res.json();

      if (data.error) {
        alert("Weather fetch failed: " + data.error);
        return;
      }

      const weatherText = `Weather in ${data.city}: ${data.current.temperature}°C, ${data.current.condition}. Recommendation: ${data.recommendation}`;
      contentInput.value = weatherText + "\n\n" + contentInput.value;
    } catch (err) {
      alert("Failed to fetch weather by city.");
      console.error(err);
    }
  }

  // Handle inline editing of notes
  document.querySelectorAll('.edit-note').forEach(button => {
    button.addEventListener('click', function () {
      const card = this.closest('.card');
      const index = this.dataset.index;

      const titleEl = card.querySelector('.card-title');
      const textEl = card.querySelector('.card-text');

      const originalTitle = titleEl.innerText;
      const originalText = textEl.innerText;

      // Replace static text with input fields
      titleEl.innerHTML = `<input type="text" class="form-control mb-2" value="${originalTitle}">`;
      textEl.innerHTML = `<textarea class="form-control mb-2">${originalText}</textarea>`;

      // Replace edit button with save button
      this.outerHTML = `<button class="btn btn-sm btn-success save-note" data-index="${index}">💾 Save</button>`;

      // Handle saving updated note
      setTimeout(() => {
        const saveBtn = card.querySelector('.save-note');
        saveBtn.addEventListener('click', async function () {
          const newTitle = card.querySelector('input').value;
          const newNote = card.querySelector('textarea').value;

          const response = await fetch('/notes/edit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ index, title: newTitle, note: newNote })
          });

          if (response.ok) {
            location.reload(); // Reload to reflect changes
          } else {
            alert("Failed to save changes.");
          }
        });
      }, 0);
    });
  });
});
