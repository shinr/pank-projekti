const dayToString = ["sunnuntai", "maanantai", "tiistai", "keskiviikko", "torstai", "perjantai", "lauantai"]
const monthToString = ["Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu", "Toukokuu", "Kesäkuu", "Heinäkuu", "Elokuu", "Syyskuu", "Lokakuu", "Marraskuu", "Joulukuu"]

export const timestampToDDMMYYYY = (timestamp) => {
    return new Date(timestamp)
}

export const timestampToObject = timestamp => {
    return {
        day: dayToString[timestamp.getDay()],
        month: monthToString[timestamp.getMonth()],
        year: timestamp.getFullYear(),
        date: timestamp.getDate()
    }
}

export const newsTimestamp = timestamp => {
    const date = new Date(Date.parse(timestamp))
    return eventTimestamp(date)
}

export const shortEventTimestamp = (timestamp) => {
    const formatted = `${timestamp.getDate()}. `
        + `${monthToString[timestamp.getMonth()]}ta `
    return formatted
}

export const eventTimestamp = (timestamp) => {
    const formatted = `${dayToString[timestamp.getDay()]} `
        + `${timestamp.getDate()}. `
        + `${monthToString[timestamp.getMonth()]}ta `
        + `${timestamp.getFullYear()}`
    return formatted;
}