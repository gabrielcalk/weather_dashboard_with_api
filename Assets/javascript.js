const input_cities = document.querySelector('#input_cities')
const cities_chosen_div = document.querySelector('#cities_chosen_div')
const cities_chosen_button = document.querySelector('#cities_chosen_button')

const city_name = document.querySelector('#city_name');
const img_weather_today = document.querySelector('#img_weather_today');
const temp = document.querySelector('#temp');
const wind = document.querySelector('#wind');
const humidity = document.querySelector('#humidity');
const uv_index = document.querySelector('#uv_index');




// Adding the autocomplete on the input
$( function() {
    var availableTags = ['Orlando', 'Atlanta', 'Denver', 'New York', 'Boston', 'Chicago'];
    $( "#input_cities" ).autocomplete({
      source: availableTags,
    });
  } );

function get_city(){
// Getting the value from the input and taking out all the space that user could put
  var city = input_cities.value.trim();
  var button_cities = document.createElement('button');
  button_cities.textContent = city;
  cities_chosen_div.append(button_cities)

  const url_api_weather = ('http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=6086d1f039acf014abeacd1138429b35&units=imperial&q='+city+',EUA')
// Getting the data from the weather API using the input value
  fetch(url_api_weather)
    .then(function (response){
      return response.json();
  })
    .then(function (data){
      return get_wheater(data);
  })
}

function get_wheater(data){
  console.log(data)
  city_name.innerHTML = data.city.name+' '+moment().format("(MM-DD-YYYY)");  
  
  temp.innerHTML = ' '+data.list[0].main.temp+'ºF'
  wind.innerHTML = ' '+data.list[0].wind.speed+' MPH'
  humidity.innerHTML = ' '+data.list[0].main.humidity+'%'
  uv_index.innerHTML = ' '+'pending'

  if (data.list[0].weather[0].description = "clear sky"){
    var img_h2 = img_weather_today.setAttribute('src', 'Assets/weather-icons/svg/wi-day-sunny.svg')
  }

  if (data.list[0].weather[0].main = "broken clouds"){
    var img_h2 = img_weather_today.setAttribute('src', 'Assets/weather-icons/svg/wi-day-sunny.svg')
  }

  if (data.list[0].weather[0].description = "clear sky"){
    var img_h2 = img_weather_today.setAttribute('src', 'Assets/weather-icons/svg/wi-day-sunny.svg')
  }

  if (data.list[0].weather[0].description = "clear sky"){
    var img_h2 = img_weather_today.setAttribute('src', 'Assets/weather-icons/svg/wi-day-sunny.svg')
  }
  // img_weather_today.setAttribute('src', )
}

// Calling the get_wheater function after click on the button
button_city.addEventListener('click', get_city);
