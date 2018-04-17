#!/bin/bash

function get_params {
    local file=$(cat $1 | tr -d '\n')
    echo $file |
	egrep -o $2' *= *array\([^\)]*\)' |
	sed 's/'$2' *= *array(\([^)]*\))/\1/g' |
	sed 's/ *" *//g' |
	sed 's/,/: string, /g' |
	sed 's/\([a-zA-Z]\)$/\1: string/'
}
function get_name {
    echo "$2\$$(echo $1 | sed 's_/_$_g' | sed 's/\..*$//')"
}
function get {
    local file=$1
    local type=$2
    local result=$(get_params "$1" "$2")
    # if characters are found

    if [[ $(echo $result | sed 's/ //g') ]]; then
	echo "export interface $(get_name $file $type) {\n    $result\n}"
    else
	echo "export interface $(get_name $file $type) { }"
    fi
}

function get_input {
    get $1 'input'
}
function get_output {
    get $1 'output'
}


out='app/Api.ts'

function w { printf "$@" >> "$out"; }


echo "import axios from 'axios'" > "$out"
echo '// Auto generated api - author: Angelo Carrabba' >> "$out"




directories=$(ls api | grep -v 'tools')

w "\n"
for directory in $directories; do
    for file in $(find api/$directory -type f | sort); do
	w "$(get_input $file)\n\n"
    done
    w "\n"
done



w "\n"
for directory in $directories; do
    for file in $(find api/$directory -type f | sort); do
	w "$(get_output $file)\n\n"
    done
    w "\n"
done


function is_post {
    cat $1 | grep 'Request::is_post()'
}
function is_upload {
    if [[ $(echo $1 | egrep -o 'upload.php') ]]; then echo 1; fi
}


function write_upload {
    local file="$1"
    local space="$2"

    local result="${space}$(basename $file | sed 's/\..*$//'): function (data: FormData, success?: (res: $(get_name $file "output")) => void, "
    result+="failure?: (err: any) => void) {\n"
    result+="${space}    return post('$file', data, success, failure)\n"
    result+="${space}}"
    echo "$result"
}

function write_post {
    local file="$1"
    local space="$2"

    if [[  $(egrep -o <$file "validate_and_put_array") ]]; then local isArray=1; fi

    local result="${space}$(basename $file | sed 's/\..*$//'): function (data: $(get_name "$file" "input"), success?: (res: "
    if [[ $isArray ]]; then result+="Array<"; fi
    result+="$(get_name "$file" "output")"
    if [[ $isArray ]]; then result+=">"; fi
    result+=") => void, failure?: (err: any) => void) {\n"

    result+="${space}    return post('$file', data, success, failure)\n"
    result+="${space}}"
    echo "$result"
}

function write_get {
    local file=$1
    local space="$2"

    if [[  $(egrep -o <$file "validate_and_put_array") ]]; then local isArray=1; fi

    local result="${space}$(basename $file | sed 's/\..*$//'): function (success?: (res: "
    if [[ $isArray ]]; then result+="Array<"; fi
    result+="$(get_name "$file" 'output')"
    if [[ $isArray ]]; then result+=">"; fi
    result+=") => void, failure?: (err: any) => void) {\n"
    result+="${space}    return get('$file', success, failure)\n"
    result+="${space}}"
    echo "$result"
}



w '\n
function post(route: string, data: any, success?: (res: any) => any, failure?: (err: any) => any) {\n
    if (success === undefined)\n
        success = (res) => { console.log("POST success: " + route); console.log(res); }\n
    if (failure === undefined)\n
        failure = (err) => { console.error("POST failure: " + route); console.log(err); }\n
\n
    return axios.post(route, data).then(res => success(res.data)).catch(failure)\n
}\n
function get(route: string, success?: (res: any) => any, failure?: (err: any) => any) {\n
    if (success === undefined)\n
        success = (res) => { console.log("GET success: " + route); console.log(res); }\n
    if (failure === undefined)\n
        failure = (err) => { console.error("GET failure: " + route); console.log(err); }\n
\n
    return axios.get(route).then(res => success(res.data)).catch(failure)\n
}\n'




w "\n"
w "export const api = {\n"

firstDir=1

for directory in $directories; do
    if [[ ! $firstDir ]]; then w ",\n"; else firstDir=''; fi
    space="    "
    w "$space$(basename $directory): {\n"
    firstFunc=1

    for file in $(find api/$directory -type f | sort); do
	if [[ ! $file ]]; then continue; fi
	if [[ ! $firstFunc ]]; then w ",\n"; else firstFunc=''; fi

	if [[ $(is_upload $file) ]]; then
	    w "$(write_upload $file "$space$space")"
	elif [[ $(is_post $file) ]]; then
	    w "$(write_post $file "$space$space")"
	else
	    w "$(write_get $file "$space$space")"
	fi
    done
    w "\n$space}"
done
w "\n"
w "}\n"
