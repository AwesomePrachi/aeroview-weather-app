export const updateBackground = (appBg, skyAnimation, weatherMain, iconCode) => {

    skyAnimation.style.opacity = "0"
    skyAnimation.style.transition = "opacity 1s ease"

    const isNight = iconCode?.includes("n")

    let gradient = ""

    switch (weatherMain) {
        case "Clear":
            gradient = isNight
                ? "bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800"
                : "bg-gradient-to-br from-yellow-200 via-orange-200 to-yellow-100"
            break

        case "Clouds":
            gradient = "bg-gradient-to-br from-slate-300 via-slate-200 to-slate-100"
            break

        case "Rain":
        case "Drizzle":
            gradient = "bg-gradient-to-br from-blue-400 via-blue-300 to-blue-200"
            break

        case "Thunderstorm":
            gradient = "bg-gradient-to-br from-gray-700 via-gray-600 to-gray-500"
            break

        case "Snow":
            gradient = "bg-gradient-to-br from-white via-slate-100 to-slate-200"
            break

        case "Mist":
        case "Fog":
        case "Haze":
            gradient = "bg-gradient-to-br from-gray-400 via-gray-300 to-gray-200"
            break

        default:
            gradient = "bg-gradient-to-br from-slate-200 via-slate-100 to-white"
    }

    appBg.className = `min-h-screen flex items-center justify-center p-4 transition-all duration-500 ${gradient}`
}
