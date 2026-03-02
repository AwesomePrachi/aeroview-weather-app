import { convertTemp } from "../utils/convertTemp"
import { getWeatherIcon } from "../utils/getWeatherIcon"
import { updateBackground } from "../background/updateBackground"

export const renderCurrentWeather = (data, unit, appBg, skyAnimation) => {

    const currentWeather = document.getElementById("currentWeather")
    if (!currentWeather) return

    const iconCode = data?.weather?.[0]?.icon
    const weatherMain = data?.weather?.[0]?.main

    // update background safely
    updateBackground(appBg, skyAnimation, weatherMain, iconCode)

    currentWeather.classList.remove("hidden")
    currentWeather.classList.add("animate-fade")

    const cityNameEl = document.getElementById("cityName")
    const iconEl = document.getElementById("weatherIcon")
    const tempEl = document.getElementById("temperature")
    const conditionEl = document.getElementById("condition")
    const humidityEl = document.getElementById("humidity")
    const windEl = document.getElementById("wind")

    if (cityNameEl)
        cityNameEl.textContent = `${data?.name}, ${data?.sys?.country}`

    if (iconEl) {
        const isNight = iconCode?.includes("n")
        iconEl.className = `
      wi text-6xl
      ${isNight ? "text-indigo-400" : "text-yellow-400"}
      ${getWeatherIcon(iconCode)}
    `
    }

    if (tempEl)
        tempEl.textContent =
            `${Math.round(convertTemp(data?.main?.temp, unit))}${unit === "metric" ? "°C" : "°F"}`

    if (conditionEl)
        conditionEl.textContent = data?.weather?.[0]?.description || ""

    if (humidityEl)
        humidityEl.textContent = `Humidity: ${data?.main?.humidity}%`

    if (windEl)
        windEl.textContent = `Wind: ${data?.wind?.speed} m/s`
}