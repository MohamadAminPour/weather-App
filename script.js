let message = document.querySelector('.message')
let weather = document.querySelector('.weather')
let loader = document.querySelector('.weather-loader')
let input = document.querySelector('.weather-search__input')
let btn = document.querySelector('.weather-search__icon')
let weather_image = document.querySelector('.weather-image')
let weather_temp = document.querySelector('.weather-temp')
let countryName = document.querySelector('.weather-countryName')
let Windspeed_txt = document.querySelector('.Windspeed-txt__top')
let humidity_txt = document.querySelector('.humidity-txt__top')


let ApiKey = 'fc3e179c0a7afcc7fff1ee3a90f49346'

function SearchCountry() {
    weather.style.opacity = '0'
    weather.style.top = '10rem'

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${ApiKey}`)
        .then(res => res.json())
        .then(data => {
            showData(data)
            console.log(data);
        })
        .catch(err => {
            console.log(err);
            message.classList.add('active')
            setTimeout(() => {
                message.classList.remove('active')
            }, 5000);
        })


    setTimeout(() => {
        weather.style.top = '0'
        weather.style.opacity = '1'
    }, 5000);


}

function showData(data) {
    weather_temp.innerHTML = `${Math.floor(data.main.temp - 273.15)} °c`
    countryName.innerHTML = data.name
    humidity_txt.innerHTML = `${data.main.humidity}%`
    Windspeed_txt.innerHTML = `${Math.floor(data.wind.speed)} Km/h`

    if (data.weather[0].main === 'Snow') {
        weather_image.src = './image/snow.png'
    }
    else if (data.weather[0].main === 'Clouds') {
        weather_image.src = './image/clouds.png'
    }
    else if (data.weather[0].main === 'Clear') {
        weather_image.src = './image/sun.png'
    }
    else if (data.weather[0].main === 'Rain') {
        weather_image.src = './image/rain.png'
    }
}

input.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
        SearchCountry()
    }
})

btn.addEventListener('click', SearchCountry)