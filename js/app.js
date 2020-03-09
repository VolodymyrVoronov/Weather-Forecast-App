const citySearchForm = document.querySelector('.app__form');
const searchFormField = citySearchForm.querySelector('.app__search');
const weatherItems = document.querySelector('.app__items');

searchFormField.focus();

// get a random background image, if you need

changeBackGroundImage = () => {
  const sourceOfImages = 'https://source.unsplash.com/random/?nature';
  document.body.style.backgroundImage = `url(${sourceOfImages})`;
  document.body.style.backgroundSize = 'cover';
  document.body.style.backgroundRepeat = 'no-repeat';
  document.body.style.backgroundAttachment = "fixed";
}
// changeBackGroundImage();

// update a website after enter a city

updateUI = (data) => {
  weatherItems.innerHTML = '';
  for (let i = 0; i < data.cityWeather.consolidated_weather.length; i++) {
    const cityName = data.cityWeather.title;
    const weatherState = data.cityWeather.consolidated_weather[i].weather_state_name;
    const weatherIcon = 'img/' + data.cityWeather.consolidated_weather[i].weather_state_abbr + '.svg';
    const minTemp = Math.round(data.cityWeather.consolidated_weather[i].min_temp);
    const maxTemp = Math.round(data.cityWeather.consolidated_weather[i].max_temp);
    const currentTemp = Math.round(data.cityWeather.consolidated_weather[i].the_temp);
    const date = data.cityWeather.consolidated_weather[i].applicable_date;

    const html = `
    <li class="app__item item-info">
      <p class="item-info__title">${cityName}</p>
      <span class="item-info__date">${date}</span>
      <span class="item-info__weather-state">${weatherState}</span>
      <img src="${weatherIcon}" alt="" class="item-info__weater-icon">
      <ul class="item-info__temp">
        <li class="item-info__min-temp">Min: ${minTemp} &#186;C</li>
        <li class="item-info__current-temp">${currentTemp} &#186;C</li>
        <li class="item-info__max-temp">Max: ${maxTemp} &#186;C</li>
      </ul>
      
    </li>
    `;

    weatherItems.innerHTML += html;
  } 
}

updateCity = async (city) => {
  const cityDetails = await getCity(city);  
  const cityWeather = await getWeather(cityDetails);

  return {  cityDetails, cityWeather }
}

// search a city

citySearchForm.addEventListener('submit', e => {
  e.preventDefault();

  const city = citySearchForm.querySelector('.app__search').value.trim();

  updateCity(city)
    .then(data => updateUI(data))
    .then(err => console.log(err));
    citySearchForm.reset();
});

