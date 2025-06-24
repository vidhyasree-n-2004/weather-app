const apiKey = "481d7c6364a584d93dce1425cd21ac25"; // Replace with your real API key

async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const weatherBox = document.getElementById("weatherBox");

    if (!city) {
        weatherBox.innerHTML = "⚠️ Please enter a city name.";
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod == 200) {  // Don't use ===
            const temp = data.main.temp;
            const desc = data.weather[0].description;
            const humidity = data.main.humidity;
            const icon = data.weather[0].icon;

            weatherBox.innerHTML = `
                <h2>${data.name}</h2>
                <img src="https://openweathermap.org/img/wn/${icon}@2x.png" />
                <p><strong>${temp}°C</strong></p>
                <p>${desc}</p>
                <p>Humidity: ${humidity}%</p>
            `;
        } else {
            weatherBox.innerHTML = "❌ City not found. Try again.";
        }
    } catch (error) {
        weatherBox.innerHTML = "❌ Error fetching weather data.";
        console.error(error);
    }
}
