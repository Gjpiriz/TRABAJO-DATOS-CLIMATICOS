// script.js
document.addEventListener("DOMContentLoaded", function() {
    const apiKey = "fc0499261b69e9e806bd3384265c28e3";

    function fetchWeatherData(city) {
        console.log(`Fetching weather data for ${city}`);

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => {
            console.log('Received response:', response);
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Parsed JSON data:', data);
            const weatherDataDiv = document.getElementById('weatherData');
            if (data.main && data.wind) {
                const weatherHtml = `
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${data.name}</h5>
                            <p class="card-text">Temperatura: ${data.main.temp}°C</p>
                            <p class="card-text">Humedad: ${data.main.humidity}%</p>
                            <p class="card-text">Intensidad del Viento: ${data.wind.speed} m/s</p>
                        </div>
                    </div>
                `;
                weatherDataDiv.innerHTML = weatherHtml;
                console.log('Weather data displayed');
            } else {
                weatherDataDiv.innerHTML = `<p>No se encontraron datos del clima para la ciudad especificada.</p>`;
                console.log('No weather data found for the specified city');
            }
        })
        .catch(error => {
            console.error('Error al obtener datos del clima:', error);
            const weatherDataDiv = document.getElementById('weatherData');
            weatherDataDiv.innerHTML = `<p>Error al obtener datos del clima: ${error.message}</p>`;
        });
    }

    // Evento de submit para el formulario de la ciudad
    document.getElementById('cityForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const city = document.getElementById('city').value.trim();
        if (city) {
            fetchWeatherData(city);
        } else {
            alert('Por favor ingresa una ciudad.');
        }
    });

    // Cargar datos del clima para una ciudad predeterminada al iniciar
    fetchWeatherData('London');
});








