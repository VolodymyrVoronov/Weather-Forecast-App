// get a weather forecast of a city

getWeather = async (id) => {
  const proxy = 'https://cors-anywhere.herokuapp.com/';
  const endpoint = 'https://www.metaweather.com/api/location/';
  const query = `${id}`;

  const response = await fetch(proxy + endpoint + query);  
  const data = await response.json();

  return data;
}

// get a city

getCity = async (city) => {
  const proxy = 'https://cors-anywhere.herokuapp.com/';
  const endpoint = 'https://www.metaweather.com/api/location/search/';
  const query = `?query=${city}`;

  const response = await fetch(proxy + endpoint + query);  
  const data = await response.json();

  return data[0].woeid;
}
