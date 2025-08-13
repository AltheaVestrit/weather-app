// Query builder: https://www.visualcrossing.com/weather-query-builder/

async function getWeatherData(location) {
  const API_key = "Z85Y9JDDWDK4FHFWLRN9FY6Y8";
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&elements=datetime%2CresolvedAddress%2Ctempmax%2Ctempmin%2Ctemp%2Cprecip%2Cprecipprob%2Cpreciptype%2Cwindspeed%2Cwinddir%2Ccloudcover%2Cuvindex&include=days%2Cfcst&&key=${API_key}&contentType=json`;

  let response = await fetch(url, { mode: "cors" });
  let json = await response.json();
  return json;
}

const p = document.querySelector("p");

getWeatherData("London").then((response) =>
  console.log(
    response.days[0].datetime,
    "||",
    response.days[0].temp + " degrees Celcius"
  )
);
