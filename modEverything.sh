function mod_read() {
    for file in $@; do
	echo chmod o+r $file
	chmod o+r $file
    done
}
function mod_run() {
    for file in $@; do
	echo chmod u+r $file
	chmod u+r $file
    done
}


mod_read index.html $(find ./public -type f)
mod_run $(find ./api)
