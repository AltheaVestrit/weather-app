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
const p = document.querySelector("p");

async function getWeatherData(location) {
  const API_key = "Z85Y9JDDWDK4FHFWLRN9FY6Y8";
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&elements=datetime%2CresolvedAddress%2Ctempmax%2Ctempmin%2Ctemp%2Cprecip%2Cprecipprob%2Cpreciptype%2Cwindspeed%2Cwinddir%2Ccloudcover%2Cuvindex&include=days%2Cfcst&&key=${API_key}&contentType=json`;

  let response = await fetch(url, { mode: "cors" });
  let json = await response.json();
  return json;
}

function decideWeatherIcon(precip, precipprob, preciptype, cloudcover) {}

function decidePrecipitationIcon(precip, precipprob, preciptype) {}

function decideWindIcon(winddir, windspeed) {}

function formatDate(dateInput) {
  const date = new Date(dateInput);
  const weekDay = weekDays[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return { weekDay, day, month, year };
}

getWeatherData("London").then((response) => {
  for (let i = 0; i < 7; i++) {
    const date = formatDate(response.days[i].datetime);
    p.innerText += `${date.weekDay} ${date.day} ${date.month} ${date.year} | ${response.days[i].temp} °C\n`;
    console.log(response);
  }
});
