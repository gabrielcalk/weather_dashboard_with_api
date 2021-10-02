const input_cities = document.querySelector('#input_cities')
const button_city = document.querySelector('#button_city')
const cities_chosen_div = document.querySelector('#cities_chosen_div')
const cities_chosen_button = document.querySelector('#cities_chosen_button')

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

  const url_api = ('http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=6086d1f039acf014abeacd1138429b35&units=imperial&q='+city+',EUA')
// Getting the data from the weather API using the input value
  fetch(url_api)
    .then(function (response){
      return response.json();
  })
    .then(function (data){
      return get_wheater(data);
  })
  }

function get_wheater(data){
  cities_chosen_button.classList.remove('hide');
  cities_chosen_button.innerHTML = data.city.name;
  console.log(data.list[0].weather[0]);
  
}

// Calling the get_wheater function after click on the button
button_city.addEventListener('click', get_city);
