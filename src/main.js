import './style.css'

import {
  fetchCurrentWeatherByCity,
  fetchForecastByCity,
  fetchCurrentWeatherByCoords,
  fetchForecastByCoords
} from './api/weatherApi'

import { renderForecast } from './ui/renderForecast'
import { renderCurrentWeather } from './ui/renderCurrentWeather'

let currentUnit = "metric"
let lastWeatherData = null
let lastForecastData = null

document.querySelector('#app').innerHTML = `
<div id="appBg" class="min-h-screen flex items-center justify-center p-4 transition-all duration-500 relative overflow-hidden">
  
  <div id="skyAnimation" class="absolute inset-0 pointer-events-none overflow-hidden">
    <div class="cloud-img c1"></div>
    <div class="cloud-img c2"></div>
    <div class="cloud-img c3"></div>
    <div class="cloud-img c4"></div>
    <div class="cloud-img c5"></div>
  </div>

  <div class="w-full max-w-4xl bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-6 space-y-6 border border-white/40">

    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

      <div class="flex items-center gap-3">
        <img src="/logo.png" class="h-10">
        <div>
          <h1 class="text-xl font-bold text-slate-800">AeroView</h1>
          <p class="text-xs text-slate-500">Weather Forecast Dashboard</p>
        </div>
      </div>

      <div class="flex gap-2">
        <button id="celsiusBtn" class="px-3 py-1 bg-blue-500 text-white rounded-md text-sm">°C</button>
        <button id="fahrenheitBtn" class="px-3 py-1 bg-slate-200 rounded-md text-sm">°F</button>
      </div>

    </div>

    <div class="flex flex-col sm:flex-row gap-3">
      <input id="cityInput" class="flex-1 px-4 py-2 border rounded-md" placeholder="Enter city name..." />
      <button id="searchBtn" class="px-4 py-2 bg-blue-500 text-white rounded-md">Search</button>
      <button id="locationBtn" class="px-4 py-2 bg-slate-200 rounded-md">Use My Location</button>
    </div>

    <div id="errorMsg" class="text-red-500 text-sm hidden"></div>

    <div id="currentWeather" class="bg-slate-50 p-5 rounded-lg hidden"></div>

    <div id="forecast" class="grid grid-cols-2 sm:grid-cols-5 gap-4 hidden"></div>

    <div id="loading" class="flex justify-center hidden">
      <div class="animate-spin rounded-full h-10 w-10 border-4 border-blue-400 border-t-transparent"></div>
    </div>

  </div>
</div>
`
// dom elements
const appBg = document.getElementById("appBg")
const skyAnimation = document.getElementById("skyAnimation")

const searchBtn = document.getElementById("searchBtn")
const locationBtn = document.getElementById("locationBtn")
const cityInput = document.getElementById("cityInput")
const errorMsg = document.getElementById("errorMsg")
const loading = document.getElementById("loading")

const celsiusBtn = document.getElementById("celsiusBtn")
const fahrenheitBtn = document.getElementById("fahrenheitBtn")

// unit switch
const switchUnit = (unit) => {

  if (currentUnit === unit) return

  currentUnit = unit

  celsiusBtn.classList.toggle("bg-blue-500", unit === "metric")
  celsiusBtn.classList.toggle("text-white", unit === "metric")

  fahrenheitBtn.classList.toggle("bg-blue-500", unit === "imperial")
  fahrenheitBtn.classList.toggle("text-white", unit === "imperial")

  if (lastWeatherData)
    renderCurrentWeather(lastWeatherData, currentUnit, appBg, skyAnimation)

  if (lastForecastData)
    renderForecast(lastForecastData, currentUnit)
}

// search
const handleSearch = async () => {

  const city = cityInput.value.trim()

  if (!city)
    return showError("Please enter a city name.")

  try {

    showLoading()
    clearError()

    const [weatherData, forecastData] = await Promise.all([
      fetchCurrentWeatherByCity(city),
      fetchForecastByCity(city)
    ])

    lastWeatherData = weatherData
    lastForecastData = forecastData

    renderCurrentWeather(weatherData, currentUnit, appBg, skyAnimation)
    renderForecast(forecastData, currentUnit)

  } catch (error) {

    showError(error.message)

  } finally {

    hideLoading()

  }
}

// location
const handleLocation = async () => {

  if (!navigator.geolocation)
    return showError("Geolocation not supported.")

  showLoading()
  clearError()

  navigator.geolocation.getCurrentPosition(async (position) => {

    try {

      const { latitude, longitude } = position.coords

      const [weatherData, forecastData] = await Promise.all([
        fetchCurrentWeatherByCoords(latitude, longitude),
        fetchForecastByCoords(latitude, longitude)
      ])

      lastWeatherData = weatherData
      lastForecastData = forecastData

      renderCurrentWeather(weatherData, currentUnit, appBg, skyAnimation)
      renderForecast(forecastData, currentUnit)

    } catch (error) {

      showError(error.message)

    } finally {

      hideLoading()

    }

  }, () => {

    hideLoading()
    showError("Location permission denied.")

  })
}

// ui-helpers
const showError = (message) => {
  errorMsg.textContent = message
  errorMsg.classList.remove("hidden")
}

const clearError = () => {
  errorMsg.classList.add("hidden")
}

const showLoading = () => {
  loading.classList.remove("hidden")
  searchBtn.disabled = true
  locationBtn.disabled = true
}

const hideLoading = () => {
  loading.classList.add("hidden")
  searchBtn.disabled = false
  locationBtn.disabled = false
}

// event listeners
celsiusBtn.addEventListener("click", () => switchUnit("metric"))
fahrenheitBtn.addEventListener("click", () => switchUnit("imperial"))

searchBtn.addEventListener("click", handleSearch)
locationBtn.addEventListener("click", handleLocation)
