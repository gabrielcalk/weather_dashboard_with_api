// API URL missing just the name of the city and the country
const url_api = ('http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=6086d1f039acf014abeacd1138429b35&units=imperial&q=')


$( function() {
    var availableTags = ['Orlando', 'Atlanta', 'Denver'];
    $( "#input_cities" ).autocomplete({
      source: availableTags,
    });
  } );

  console.log('oi')


//   fetch(url_api)
// .then(function (response){
//     console.log(response)
//     return response.json();
// })
// .then(function (data){
//     console.log(data)
// })