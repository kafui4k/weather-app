require('./styles.scss');

window.addEventListener('load', function() {
    let lat;
    let lng;

    const location___timezone = document.querySelector(".location___timezone");
    const temperature___section___description = document.querySelector(".temperature___section___description");
    const temperature___section___degree = this.document.querySelector(".temperature___section___degree");
    const temperature___section___details___feels_like = document.querySelector(".temperature___section___details___feels-like");
    const temperature___section___details___humidity = document.querySelector(".temperature___section___details___humidity");
    const temperature___section___details___wind_mph = document.querySelector(".temperature___section___details___wind-mph");
    
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);

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
                    console.log(data);
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

    } else {
        console.log = 'Geolocation is not supported by your browser';
    }

})