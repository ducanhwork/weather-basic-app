const apiUrlBase = 'https://api.weatherstack.com/current?access_key=b454e953e9376caddd9ad185466fc174&query=';

document.querySelector('button').addEventListener('click', function () {
  const city = document.getElementById('city').value;
  if (!city) return;

  const apiUrl = `${apiUrlBase}${city}`;
  
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const weatherDiv = document.getElementById('weather');
      const weather = data.current;

      weatherDiv.innerHTML = `
        <h2>Weather in ${data.location.name}, ${data.location.country}</h2>
        <p><strong>Local Time:</strong> ${data.location.localtime}</p>
        <p><strong>Temperature:</strong> ${weather.temperature}°C (Feels like: ${weather.feelslike}°C)</p>
        <p><strong>Weather:</strong> ${weather.weather_descriptions[0]}</p>
        <p><strong>Wind:</strong> ${weather.wind_speed} km/h (Direction: ${weather.wind_dir})</p>
        <p><strong>Humidity:</strong> ${weather.humidity}%</p>
        <p><strong>Pressure:</strong> ${weather.pressure} hPa</p>
        <p><strong>Visibility:</strong> ${weather.visibility} km</p>
        <p><strong>UV Index:</strong> ${weather.uv_index}</p>
        <img src="${weather.weather_icons[0]}" alt="Weather Icon">
      `;

      weatherDiv.classList.add('show'); // Add class to trigger fade-in
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      document.getElementById('weather').innerHTML = 'Failed to load weather information.';
    });
});
