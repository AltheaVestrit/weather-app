// Query builder: https://www.visualcrossing.com/weather-query-builder/
// icons: https://www.visualcrossing.com/resources/documentation/weather-api/defining-icon-set-in-the-weather-api/

const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const cards = document.querySelector(".cards");

async function getWeatherData(location) {
  const API_key = "Z85Y9JDDWDK4FHFWLRN9FY6Y8";
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&elements=datetime%2CresolvedAddress%2Ctempmax%2Ctempmin%2Ctemp%2Cprecip%2Cprecipprob%2Cpreciptype%2Cuvindex%2Cicon&include=days%2Cfcst&&key=${API_key}&contentType=json&iconSet=icons1`;

  let response = await fetch(url, { mode: "cors" });
  let json = await response.json();
  return json;
}

function decideWeatherIcon(icon) {
  return [`./img/weather_icons/${icon}.svg`, icon];
}

function decidePrecipitationIcon(precipprob) {
  if (precipprob > 30) {
    return ["./img/weather_icons/drop_full.svg", "Heavy rain"];
  } else if (precipprob == 0) {
    return ["./img/weather_icons/drop_empty.svg", "No rain"];
  } else {
    return ["./img/weather_icons/drop_medium.svg", "Some rain"];
  }
}

function formatDate(dateInput) {
  const date = new Date(dateInput);
  const weekDay = weekDays[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return { weekDay, day, month, year };
}

function createEl(type, elClass) {
  let el = document.createElement(type);
  el.classList.add(elClass);
  return el;
}

function getTemps(data) {
  return [parseInt(data.tempmin), parseInt(data.tempmax)];
}

function createCard(
  weekday,
  day,
  month,
  year,
  tempmin,
  tempmax,
  icon,
  iconAlt,
  precip,
  precipIcon,
  precipAlt,
  uvindex
) {
  let card = createEl("div", "card");
  let cardElements = [];
  // Weekday
  cardElements[0] = createEl("h3", "card__weekday");
  cardElements[0].innerText = weekday;
  // Date
  cardElements[1] = createEl("div", "card__date");
  let dayNode = createEl("h5", "card__date__day");
  dayNode.innerText = day;
  let monthYearNode = createEl("p", "card__date__month-year");
  monthYearNode.innerText = `${month} ${year}`;
  cardElements[1].appendChild(dayNode);
  cardElements[1].appendChild(monthYearNode);
  // Weather
  cardElements[2] = createEl("div", "card__weather");
  let weatherIconNode = createEl("img", "card__weather__icon");
  weatherIconNode.src = icon;
  weatherIconNode.alt = iconAlt;
  let tempNode = createEl("p", "card__weather__temp");
  tempNode.innerText = `${tempmin} / ${tempmax} °C`;
  cardElements[2].appendChild(weatherIconNode);
  cardElements[2].appendChild(tempNode);
  // Precipitation
  cardElements[3] = createEl("div", "card__precip");
  let precipIconNode = createEl("img", "card__precip__icon");
  precipIconNode.src = precipIcon;
  precipIconNode.alt = precipAlt;
  let precipNode = createEl("p", "card__precip__value");
  precipNode.innerText = `${precip} mm`;
  cardElements[3].appendChild(precipIconNode);
  cardElements[3].appendChild(precipNode);
  // UV-index
  cardElements[4] = createEl("div", "card__uvindex");
  let uvValue = createEl("h5", "card__uvindex__value");
  uvValue.innerText = uvindex;
  let uvText = createEl("p", "card__uvindex__text");
  uvText.innerText = "UV-index";
  cardElements[4].appendChild(uvValue);
  cardElements[4].appendChild(uvText);
  // Add new nodes to document
  cardElements.forEach((element) => {
    card.appendChild(element);
  });
  cards.appendChild(card);
}

getWeatherData("London").then((response) => {
  for (let i = 0; i < 7; i++) {
    const date = formatDate(response.days[i].datetime);
    const [icon, iconAlt] = decideWeatherIcon(response.days[i].icon);
    const [precipIcon, precipAlt] = decidePrecipitationIcon(
      response.days[i].precipprob
    );
    const [tempmin, tempmax] = getTemps(response.days[i]);
    createCard(
      date.weekDay,
      date.day,
      date.month,
      date.year,
      tempmin,
      tempmax,
      icon,
      iconAlt,
      response.days[i].precip,
      precipIcon,
      precipAlt,
      response.days[i].uvindex
    );
  }
});
