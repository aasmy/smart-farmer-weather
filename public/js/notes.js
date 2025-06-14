document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('noteForm');
  const titleInput = document.getElementById('noteTitle');
  const cityInput = document.getElementById('noteCity');
  const cropInput = document.getElementById('noteCrop');
  const contentInput = document.getElementById('noteContent');
  const weatherBtn = document.getElementById('fetchWeatherBtn');
  const notesList = document.getElementById('notesList');

  // Dummy notes storage (can later be replaced by DB)
  const notes = [];

  // Save Note handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const note = {
      title: titleInput.value,
      city: cityInput.value,
      crop: cropInput.value,
      content: contentInput.value,
      timestamp: new Date().toLocaleString()
    };

    notes.push(note);
    renderNotes();
    form.reset();
  });

  // Fetch Weather handler
  weatherBtn.addEventListener('click', async () => {
  const city = cityInput.value.trim();
  const crop = cropInput.value.trim();

  if (city) {
    // if city is provided, fetch weather by city
    fetchWeatherByCity(city, crop);
  } else {
    // if no city, fetch weather by geolocation
    if (!navigator.geolocation) {
      alert("Geolocation not supported by your browser.");
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
        contentInput.value = weatherText + "\n\n" + contentInput.value;
      } catch (err) {
        alert("Failed to fetch weather by location.");
        console.error(err);
      }
    }, () => {
      alert("Location access denied.");
    });
  }
});

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


  // Render notes dynamically
 function renderNotes() {
  notesList.innerHTML = "";

  if (notes.length === 0) {
    notesList.innerHTML = `<p class="text-muted">No notes available yet.</p>`;
    return;
  }

  notes.forEach((note, index) => {
    const card = document.createElement("div");
    card.className = "col-md-6";
    card.innerHTML = `
      <div class="card shadow-sm">
        <div class="card-body">
          <h5 class="card-title">${note.title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${note.city} • ${note.crop}</h6>
          <p class="card-text">${note.content.replace(/\n/g, '<br>')}</p>
          <small class="text-muted">${note.timestamp}</small>
          <div class="mt-3 d-flex justify-content-end gap-2">
            <button class="btn btn-sm btn-outline-primary edit-note" data-index="${index}">✏ Edit</button>
            <button class="btn btn-sm btn-outline-danger delete-note" data-index="${index}">🗑 Delete</button>
          </div>
        </div>
      </div>
    `;
    notesList.appendChild(card);
  });

  // Attach Delete listeners
  document.querySelectorAll('.delete-note').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = e.target.getAttribute('data-index');
      notes.splice(idx, 1);
      renderNotes();
    });
  });

  // Attach Edit listeners
  document.querySelectorAll('.edit-note').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = e.target.getAttribute('data-index');
      const note = notes[idx];

      titleInput.value = note.title;
      cityInput.value = note.city;
      cropInput.value = note.crop;
      contentInput.value = note.content;

      // Remove the note being edited
      notes.splice(idx, 1);
      renderNotes();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

  // Delete buttons
document.querySelectorAll('.delete-note').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const idx = e.target.getAttribute('data-index');
    notes.splice(idx, 1);
    renderNotes();
  });
});

// Edit buttons
document.querySelectorAll('.edit-note').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const idx = e.target.getAttribute('data-index');
    const note = notes[idx];

    titleInput.value = note.title;
    cityInput.value = note.city;
    cropInput.value = note.crop;
    contentInput.value = note.content;

    // Remove the note being edited
    notes.splice(idx, 1);
    renderNotes();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

});
