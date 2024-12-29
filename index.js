const form = document.getElementById("form");
const resultDiv = document.getElementById("result");

// Event listener for form submission
form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the form from refreshing the page
    
    // Get the values of latitude and longitude
    const latitude = document.getElementById("latitude").value;
    const longitude = document.getElementById("longitude").value;

    // Validate inputs
    if (!latitude || !longitude) {
        alert("Please enter valid latitude and longitude values.");
        return;
    }

    try {
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '4ccf3b5477msh550a57e0f19d7a8p19d6b6jsnf89e3eea6790',
                'x-rapidapi-host': 'air-quality.p.rapidapi.com'
            }
        };
        
        // Call an API for air quality data (replace with actual API endpoint)
        const response = await fetch('https://air-quality.p.rapidapi.com/history/airquality?lon=-78.638&lat=35.779',
            options
        );
        if (!response.ok) {
            throw new Error("Failed to fetch air quality data.");
        }

        const data = await response.json();
        console.log(data);
        // Update the UI with air quality data
        document.getElementById("aqi").textContent = data.aqi || "N/A";
        document.getElementById("co").textContent = data.co || "N/A";
        document.getElementById("no2").textContent = data.no2 || "N/A";
        document.getElementById("o3").textContent = data.o3 || "N/A";
        document.getElementById("pm2").textContent = data.pm2_5 || "N/A";
        document.getElementById("pm10").textContent = data.pm10 || "N/A";
        document.getElementById("so2").textContent = data.so2 || "N/A";

        resultDiv.style.display = "block"; // Ensure result is visible
    } catch (error) {
        console.error("Error fetching air quality data:", error.message);
        alert("There was an error fetching air quality data. Please try again.");
    }
});