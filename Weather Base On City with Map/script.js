const apiKey = "afe7973d356c54b94bc7455004751c9f"; // Replace with your OpenWeather API key

// Initialize the world map
const map = L.map("map").setView([20, 0], 2); // Default to world map

// Load OpenStreetMap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

document.getElementById("weatherForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const city = document.getElementById("city").value.trim();
  
  if (city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (data.cod === 200) {
          const lat = data.coord.lat;
          const lon = data.coord.lon;
          const temperature = data.main.temp;
          const humidity = data.main.humidity;
          const windSpeed = data.wind.speed;
          const weatherDescription = data.weather[0].description;

          // Move map to the city's location
          map.setView([lat, lon], 10);

          // Add a marker with weather details
          L.marker([lat, lon])
            .addTo(map)
            .bindPopup(
              `<b>${data.name}</b><br>
              🌡️ Temp: ${temperature}°C<br>
              💧 Humidity: ${humidity}%<br>
              🌬️ Wind Speed: ${windSpeed} m/s<br>
              ☁️ ${weatherDescription}`
            )
            .openPopup();
        } else {
          alert("City not found!");
        }
      })
      .catch(error => {
        alert("Error fetching weather data!");
      });
  } else {
    alert("Please enter a city name.");
  }
});
