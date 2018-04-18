
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

    if (years) return "" + years + " years ago"
    if (days) return "" + days + " days ago"
    if (hours) return "" + hours + " hours ago"
    if (minutes) return "" + minutes + " minutes ago"
    if (seconds) return "" + seconds + " seconds ago"
}
