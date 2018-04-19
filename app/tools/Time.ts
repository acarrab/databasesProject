

const plural = (value) => (value !== 1)

export function getTimeSince(datetime: string) {

    let ms = Date.now() - Date.parse(datetime);

    let trimSize = 1000
    let seconds = Math.floor(ms / trimSize) % 60
    trimSize *= 60
    let minutes = Math.floor(ms / trimSize) % 60
    trimSize *= 60
    var hours = Math.floor(ms / trimSize) % 24
    trimSize *= 24
    var days = Math.floor(ms / trimSize) % 365;
    trimSize *= 365
    var years = Math.floor(ms / trimSize);

    let value = years
    let type = "year"

    if (years) { }
    else if (days) { value = days; type = "day" }
    else if (hours) { value = hours; type = "hour" }
    else if (minutes) { value = minutes; type = "minute" }
    else return "a few seconds ago"

    return (plural(value) ? "" + value : "a") + " " + type + (plural(value) ? 's ago' : ' ago')

}
