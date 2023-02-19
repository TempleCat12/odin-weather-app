export {createDisplayBoard, createMenuBoard, createDetail};

const websiteName = 'city.current.weather'
const createDisplayBoard = (weatherObj) => {
  const display = document.createElement("div");
  const h5 = document.createElement("h5");
  h5.textContent = websiteName;
  display.appendChild(h5);
  display.appendChild(createWeather(weatherObj));
  display.setAttribute("id", "display");
  return display;
};

const createWeather = (weatherObj) => {
  const div = document.createElement("div");
  div.setAttribute("id", "weather");
  const p_temperature = document.createElement("p");
  const div_city = document.createElement("div");
  const div_weather = document.createElement("div");
  const p_city = document.createElement("p");
  const p_date = document.createElement("p");
  const p_weather = document.createElement("p");
  const p_description = document.createElement("p");
  const weatherIcon = createSVG(
    "M6,19A5,5 0 0,1 1,14A5,5 0 0,1 6,9C7,6.65 9.3,5 12,5C15.43,5 18.24,7.66 18.5,11.03L19,11A4,4 0 0,1 23,15A4,4 0 0,1 19,19H6M19,13H17V12A5,5 0 0,0 12,7C9.5,7 7.45,8.82 7.06,11.19C6.73,11.07 6.37,11 6,11A3,3 0 0,0 3,14A3,3 0 0,0 6,17H19A2,2 0 0,0 21,15A2,2 0 0,0 19,13Z",
    60
  );
  p_temperature.textContent = weatherObj.temperature + '°';
  p_city.textContent = weatherObj.city;
  p_date.textContent = weatherObj.date.toDateString();
  p_weather.textContent = weatherObj.weather;
  p_description.textContent = weatherObj.description;
  div_city.appendChild(p_city);
  div_city.appendChild(p_date);
  div_weather.appendChild(p_weather)
  div_weather.appendChild(p_description)
  div.appendChild(p_temperature);
  div.appendChild(div_city);
  div.appendChild(div_weather);
  return div;
};

// menu board
const createMenuBoard = (famousCities, detailObj) => {
  const menu = document.createElement("div");
  menu.setAttribute("id", "menu");
  menu.appendChild(searchBar());
  menu.appendChild(createUl(famousCities));
  menu.appendChild(createDetail(detailObj));
  return menu;
};

const createDetail = (detailObj) => {
  const div = document.createElement("div");
  const h3 = document.createElement("h3");
  const ul = document.createElement("ul");

  h3.textContent = "Weather Details"; // todo

  div.appendChild(h3);
  div.appendChild(ul);
  div.setAttribute("id", "detail");
  for (const key in detailObj) {
    ul.appendChild(createDetailLi(key, detailObj[key]));
  }
  return div;
};
const createDetailLi = (key, value) => {
  const li = document.createElement("li");
  const p_key = document.createElement("p");
  const p_value = document.createElement("p");
  p_key.textContent = key;
  key == 'wind' ? p_value.textContent = value + ' km/h': p_value.textContent = value + '%'
  
  li.appendChild(p_key);
  li.appendChild(p_value);
  return li;
};

const createUl = (array) => {
  const ul = document.createElement("ul");
  array.forEach((item) => {
    ul.appendChild(createLi(item));
  });
  return ul;
};

const createLi = (city) => {
  const li = document.createElement("li");
  const btn = document.createElement("button");
  btn.textContent = city;
  li.appendChild(btn);
  return li;
};

const searchBar = () => {
  const form = document.createElement("form");
  const search = document.createElement("input");
  const searchSVG = createSVG(
    "M15.5,12C18,12 20,14 20,16.5C20,17.38 19.75,18.2 19.31,18.9L22.39,22L21,23.39L17.88,20.32C17.19,20.75 16.37,21 15.5,21C13,21 11,19 11,16.5C11,14 13,12 15.5,12M15.5,14A2.5,2.5 0 0,0 13,16.5A2.5,2.5 0 0,0 15.5,19A2.5,2.5 0 0,0 18,16.5A2.5,2.5 0 0,0 15.5,14M19.5,2A0.5,0.5 0 0,1 20,2.5V11.81C19.42,11.26 18.75,10.81 18,10.5V4.7L15,5.86V10C14.3,10.07 13.62,10.24 13,10.5V5.87L9,4.47V16.13H9V16.5C9,17.14 9.09,17.76 9.26,18.34L8,17.9L2.66,19.97L2.5,20A0.5,0.5 0 0,1 2,19.5V4.38C2,4.15 2.15,3.97 2.36,3.9L8,2L14,4.1L19.34,2.03L19.5,2M4,5.46V17.31L7,16.15V4.45L4,5.46Z",
    40
  );

  search.placeholder = "Another location";
  search.setAttribute("id", "search")
  search.required = true
  form.setAttribute("id", "form");

  form.appendChild(search);
  form.appendChild(searchSVG);

  return form;
};

function createSVG(d, size) {
  const iconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const iconPath = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  iconSvg.setAttribute("fill", "currentColor");
  iconSvg.setAttribute("width", size);
  iconSvg.setAttribute("height", size);
  iconSvg.setAttribute("viewBox", "0 0 24 24");
  iconSvg.setAttribute("stroke", "currentColor");
  iconPath.setAttribute("d", d);

  iconSvg.appendChild(iconPath);
  return iconSvg;
}
