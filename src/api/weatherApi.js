const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const BASE_URL = "https://api.openweathermap.org/data/2.5"

export const fetchCurrentWeatherByCity = async (city) => {
    const url = `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`

    const response = await fetch(url)

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error("City not found.")
        }
        throw new Error("Something went wrong.")
    }

    return await response.json()
}

export const fetchForecastByCity = async (city) => {
    const url = `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`

    const response = await fetch(url)

    if (!response.ok) {
        throw new Error("Forecast not available.")
    }

    return await response.json()
}

export const fetchCurrentWeatherByCoords = async (lat, lon) => {
    const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`

    const response = await fetch(url)

    if (!response.ok) {
        throw new Error("Unable to fetch location weather.")
    }

    return await response.json()
}

export const fetchForecastByCoords = async (lat, lon) => {
    const url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`

    const response = await fetch(url)

    if (!response.ok) {
        throw new Error("Unable to fetch location forecast.")
    }

    return await response.json()
}
