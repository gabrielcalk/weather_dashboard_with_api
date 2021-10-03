const parse_saved_cities = JSON.parse(localStorage.getItem('city'));

const input_cities = document.querySelector('#input_cities')
const cities_chosen_div = document.querySelector('#cities_chosen_div')
const cities_chosen_button = document.querySelector('#cities_chosen_button')

const city_name = document.querySelector('#city_name');
const img_weather_today = document.querySelector('#img_weather_today');
const temp = document.querySelector('#temp');
const wind = document.querySelector('#wind');
const humidity = document.querySelector('#humidity');
const uv_index = document.querySelector('#uv_index');

const cities_saved = []

get_cities_saved()

function get_cities_saved(){
  for (i = 0; i < parse_saved_cities.length; i++){
    var button_cities = document.createElement('button');
    button_cities.classList.add('get');
    button_cities.setAttribute('data-value', parse_saved_cities[i].texts);
    button_cities.textContent = parse_saved_cities[i].texts;
    cities_chosen_div.append(button_cities);
  }
}

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
  button_cities.classList.add('get')
  button_cities.textContent = city;
  cities_chosen_div.append(button_cities);

  button_cities.setAttribute('data-value', city);

  var object_city = {
    texts: city
  }

  cities_saved.push(object_city);
  localStorage.setItem('city', JSON.stringify(cities_saved));

  input_cities.value = '';

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
  city_name.innerHTML = data.city.name+' '+moment().format("(MM-DD-YYYY)");  
  
  temp.innerHTML = ' '+data.list[0].main.temp+'ºF'
  wind.innerHTML = ' '+data.list[0].wind.speed+' MPH'
  humidity.innerHTML = ' '+data.list[0].main.humidity+'%'
  uv_index.innerHTML = ' '+'pending'

  if (data.list[0].weather[0].main == "Clear"){
    img_weather_today.classList.remove('hide')
    img_weather_today.setAttribute('src', 'Assets/weather-icons/day.svg')
    img_weather_today.setAttribute('alt', 'clear wheater')
    
  } else if (data.list[0].weather[0].description == "broken clouds"){
    img_weather_today.classList.remove('hide')
    img_weather_today.setAttribute('src', 'Assets/weather-icons/cloudy-day-1.svg')
    img_weather_today.setAttribute('alt', 'broken clouds')
  
  } else if (data.list[0].weather[0].main == "Clouds"){
    img_weather_today.classList.remove('hide')
    img_weather_today.setAttribute('src', 'Assets/weather-icons/cloudy.svg')
    img_weather_today.setAttribute('alt', 'clouds')
  
  } else if (data.list[0].weather[0].main == "Rain"){
    img_weather_today.classList.remove('hide')
    img_weather_today.setAttribute('src', 'Assets/weather-icons/rainy-6.svg')
    img_weather_today.setAttribute('alt', 'rain')
  
  } else if (data.list[0].weather[0].main == "Snow"){
    img_weather_today.classList.remove('hide')
    img_weather_today.setAttribute('src', 'Assets/weather-icons/snowy-5.svg')
    img_weather_today.setAttribute('alt', 'snow')
  
  } else{
    img_weather_today.classList.remove('hide')
    img_weather_today.setAttribute('src', 'Assets/weather-icons/thunder.svg')
    img_weather_today.setAttribute('alt', 'extreme')
  }
  get_wheater_5(data)
}

function get_wheater_5(data){
  console.log(data)
  for (i = 1; i <= 5; i++){
      var time_5 = document.querySelector('#time'+[i]);
      time_5.textContent = moment().add([i],'days').format("MM/DD/YYYY");
      
      var temp_5 = document.querySelector('#temp'+[i]);
      var wind_5 = document.querySelector('#wind'+[i]);
      var humidity_5 = document.querySelector('#humidity'+[i]) ;
      var img_5 = document.querySelector('#img'+[i]) ;

      temp_5.textContent = ` ${data.list[i*7].main.temp} ºF`;
      wind_5.textContent = ` ${data.list[i*7].wind.speed} MPH`;
      humidity_5.textContent = ` ${data.list[i*7].main.humidity} %`;

      if (data.list[i*7].weather[0].main == "Clear"){
        img_5.classList.remove('hide')
        img_5.setAttribute('src', 'Assets/weather-icons/day.svg')
        img_5.setAttribute('alt', 'clear wheater')
        
      } else if (data.list[i*7].weather[0].main == "broken clouds"){
        img_5.classList.remove('hide')
        img_5.setAttribute('src', 'Assets/weather-icons/cloudy-day-1.svg')
        img_5.setAttribute('alt', 'broken clouds')
      
      } else if (data.list[i*7].weather[0].main == "Clouds"){
        img_5.classList.remove('hide')
        img_5.setAttribute('src', 'Assets/weather-icons/cloudy.svg')
        img_5.setAttribute('alt', 'clouds')
      
      } else if (data.list[i*7].weather[0].main == "Rain"){
        img_5.classList.remove('hide')
        img_5.setAttribute('src', 'Assets/weather-icons/rainy-6.svg')
        img_5.setAttribute('alt', 'rain')
      
      } else if (data.list[i*7].weather[0].main == "Snow"){
        img_5.classList.remove('hide')
        img_5.setAttribute('src', 'Assets/weather-icons/snowy-5.svg')
        img_5.setAttribute('alt', 'snow')
      
      } else{
        img_5.classList.remove('hide')
        img_5.setAttribute('src', 'Assets/weather-icons/thunder.svg')
        img_5.setAttribute('alt', 'extreme')
      }
  }
}

// Calling the get_wheater function after click on the button
button_city.addEventListener('click', get_city);

var button_get = document.querySelector('.get');
button_get.addEventListener('click', get_city_chosen);

function get_city_chosen() {
  var button_cities_attribute = button_get.getAttribute('data-value')
  city = button_cities_attribute
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