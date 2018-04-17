
export function Password(a: string, b: string) {

    if (null === a.match('[a-z]')) {
        return "Needs lower case letters"
    }
    if (null === a.match('[A-Z]')) {
        return "Needs upper case letters"
    }
    if (null === a.match('[^a-zA-Z]')) {
        return "Needs some symbols"
    }
    if (a.length < 8) {
        return "Needs to be at least 8 characters"
    }

    if (a !== b) {
        return "The passwords do not match"
    }
}

export function Over255(a: string) {
    if (a.trim().length > 255) {
        return "This should be at most 255 characters"
    }
}

export function Over45(a: string) {
    if (a.trim().length > 255) {
        return "This should be at most 45 characters"
    }
}

export function Required(a: string) {
    if (a.trim().length === 0) {
        return "This is a required field"
    }
}

export function Email(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log("email: ")
    console.log(re.test(String(email).toLowerCase()))
    if (!re.test(String(email).toLowerCase())) {
        return "Not a valid email address"
    }
}