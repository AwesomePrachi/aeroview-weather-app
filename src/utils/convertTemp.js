export const convertTemp = (temp, currentUnit) => {
    return currentUnit === "metric"
        ? temp
        : (temp * 9 / 5) + 32
}