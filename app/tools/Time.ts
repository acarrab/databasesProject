

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

    if (years) {
        if (plural(years))
            return "" + years + " years ago"
        return "A year ago"
    }
    if (days) {
        if (plural(days))
            return "" + days + " days ago"
        return "A day ago"
    }
    if (hours) {
        if (plural(hours))
            return "" + hours + " hours ago"
        return "An hour ago"
    }
    if (minutes) {
        if (plural(minutes))
            return "" + minutes + " minutes ago"
        return "A minute ago"
    }

    return "A few seconds ago"
}
