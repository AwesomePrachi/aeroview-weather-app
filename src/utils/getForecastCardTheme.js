export const getForecastCardTheme = (weatherMain) => {
    switch (weatherMain) {

        case "Clear":
            return "bg-yellow-100/50"

        case "Clouds":
            return "bg-slate-200/70"

        case "Rain":
        case "Drizzle":
            return "bg-blue-200/50"

        case "Thunderstorm":
            return "bg-slate-300/90"

        case "Snow":
            return "bg-white"

        case "Mist":
        case "Fog":
        case "Haze":
            return "bg-slate-300/70"

        default:
            return "bg-violet-200/60"
    }
}
