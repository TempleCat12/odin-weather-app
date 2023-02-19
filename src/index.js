import * as View from "./view";
import * as Weather from "./weather";
import "./index.css";
const content = document.getElementById("content");
// cities
let cities = ["Shanghai", "Beijing", "Guangzhou", "Chengdu"];

async function loadPage (city){
    await Weather.fetchWeatherData(city).then(resp => {
        content.appendChild(View.createDisplayBoard(resp.main));
        content.appendChild(View.createMenuBoard(cities, resp.detail));
        
    })
    addListeners()
}
loadPage('Shanghai')
// addListener()
function addListeners() {
  
  const form = document.getElementById('form')
  const search = document.getElementById('search')
  form.addEventListener('submit', e => {
    e.preventDefault()
    Weather.fetchWeatherData(search.value).then(resp => {
      refreshPage(resp)
      form.reset()
    }).catch(err => {
      alert('Location not found')
      form.reset()
    })
    
  })

  const list = document.querySelectorAll("#menu > ul > li")
  list.forEach(li => {
    li.addEventListener('click', e => {
      const city = e.target.textContent
      Weather.fetchWeatherData(city).then(resp => {
        refreshPage(resp)
      }) 
    })
  });

}

function refreshPage(weather) {
  const display = document.getElementById('display')
  const menu = document.getElementById('menu')
  const detail = document.getElementById('detail')

  content.removeChild(display)
  content.insertBefore(View.createDisplayBoard(weather.main), menu)

  menu.removeChild(detail)
  menu.appendChild(View.createDetail(weather.detail))
}



