export { fetchWeatherData };

// Units of measurement:  default is metric
const UNIT = "metric";
const API_KEY = "91492b37eb6ad58d515d2091164745b6";



const generateApiURL = (cityName) => {
  return `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=${UNIT}`;
};

const fetchWeatherData = async (cityName, dateStr = "") => {
  
  const response = await fetch(generateApiURL(cityName), { mode: "cors" });
  const data = await response.json();
  const date = dateStr == '' ? new Date(): dateStr;
  const weatherObj = processRawData(data, date)
  return weatherObj;
};


const processRawData = (rawData, date) => {
  const weather = {
    main: {
      city: rawData["name"],
      temperature: parseInt(rawData["main"]["temp"]),
      date: date,
      weather: rawData["weather"][0]["main"],
      description: rawData["weather"][0]["description"],
    },
    detail: {
      cloud: rawData["clouds"]["all"],
      humidity: rawData["main"]["humidity"],
      wind: rawData["wind"]["speed"],
    },
  };
  return weather;
};


