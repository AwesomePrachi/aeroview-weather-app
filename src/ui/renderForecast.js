import { convertTemp } from "../utils/convertTemp"
import { getWeatherIcon } from "../utils/getWeatherIcon"
import { getForecastCardTheme } from "../utils/getForecastCardTheme"

export const renderForecast = (data, unit) => {

  const forecastContainer = document.getElementById("forecast")
  if (!forecastContainer) return

  forecastContainer.classList.remove("hidden")
  forecastContainer.innerHTML = ""

  const dailyData = data?.list?.filter(item =>
    item.dt_txt?.includes("12:00:00")
  ) || []

  dailyData.slice(0, 5).forEach(day => {

    const theme = getForecastCardTheme(day.weather?.[0]?.main)
    const iconCode = day.weather?.[0]?.icon

    const card = document.createElement("div")

    card.className = `
      ${theme}
      rounded-xl
      border border-slate-200
      backdrop-blur-sm
      shadow-sm
      p-4
      text-center
      space-y-3
      transition-all duration-300
      hover:shadow-md hover:-translate-y-1
      flex flex-col items-center
    `

    const date = new Date(day.dt_txt)
    const dayName = date.toLocaleDateString("en-US", { weekday: "short" })

    card.innerHTML = `
      <p class="text-sm font-medium text-slate-500">
        ${dayName}
      </p>

      <i class="wi ${getWeatherIcon(iconCode)} text-4xl text-blue-500"></i>

      <p class="text-2xl font-bold text-slate-800">
        ${Math.round(convertTemp(day.main.temp, unit))}
        ${unit === "metric" ? "°C" : "°F"}
      </p>

      <p class="text-xs capitalize text-slate-500">
        ${day.weather?.[0]?.description || ""}
      </p>
    `

    forecastContainer.appendChild(card)
  })
}
