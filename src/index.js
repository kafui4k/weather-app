require('./styles.scss');

window.addEventListener('load', function() {
    const form = document.getElementsByTagName('form')[0];
    const search_city_name_data = document.querySelector('[search-city-name-data]');
    const search___form___error = document.querySelector('.search___form___error');
    const location___timezone = document.querySelector(".location___timezone");
    const temperature___section___description = document.querySelector(".temperature___section___description");
    const temperature___section___degree = document.querySelector(".temperature___section___degree");
    const temperature___section___details___feels_like = document.querySelector(".temperature___section___details___feels-like");
    const temperature___section___details___humidity = document.querySelector(".temperature___section___details___humidity");
    const temperature___section___details___wind_mph = document.querySelector(".temperature___section___details___wind-mph");

    let lat;
    let lng;

    function success(position) {

        lat  = position.coords.latitude;
        lng = position.coords.longitude;

        // make API call 
        // Fetch API data
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=e0e81e5f1216da0221cb390528427c96`)
            .then((dataRensponse) => {
                return dataRensponse.json();
            })
            .then((data) => {
                // console.log(data);
                // fetch all data variables here
                location___timezone.innerText = data.name + ", " + data.sys.country;
                const {feels_like, humidity, pressure, temp} = data.main;
                temperature___section___details___feels_like.innerText = `FEELS LIKE: ${feels_like}`;
                temperature___section___details___humidity.innerText = `HUMIDITY: ${humidity}%`;
                temperature___section___details___wind_mph.innerText = `WIND: ${data.wind.speed} MPH`
                temperature___section___degree.innerText = temp;
                data.weather.map(weatherData => {
                    const {description, icon, main} = weatherData;
                    temperature___section___description.innerText = main + " | " + description;
                    
                })

            })
    }

    function error() {
        console.log = 'Unable to retrieve your location';
    }

    function searchCity(e) {
        e.preventDefault(); // prevent page reload

        const city_name = search_city_name_data.value;

        // reset all fields
        // back to empt here
        location___timezone.innerText = "";
        temperature___section___details___feels_like.innerText = "";
        temperature___section___details___humidity.innerText = "";
        temperature___section___details___wind_mph.innerText = "";
        temperature___section___degree.innerText = "";
        temperature___section___description.innerText = "";
            
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=e0e81e5f1216da0221cb390528427c96`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                location___timezone.innerText = data.name + " " + data.sys.country;
                const {feels_like, humidity, pressure, temp} = data.main;
                temperature___section___details___feels_like.innerText = `FEELS LIKE: ${feels_like}`;
                temperature___section___details___humidity.innerText = `HUMIDITY: ${humidity}%`;
                temperature___section___details___wind_mph.innerText = `WIND: ${data.wind.speed} MPH`
                temperature___section___degree.innerText = temp;
                data.weather.map(weatherData => {
                    const {description, icon, main} = weatherData;
                    temperature___section___description.innerText = main + " | " + description;
                    
                })
            })
    }

    // validate against input here
    function validateSearch() {
        
    }

    if(navigator.geolocation) {
        navigator.geolocation.watchPosition(success, error);
    } else {
        console.log = 'Geolocation is not supported by your browser';
    }

    
    // eventListeners
    search_city_name_data.addEventListener('input', validateSearch);
    form.addEventListener('submit', searchCity);
});