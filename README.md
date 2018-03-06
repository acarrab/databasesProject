# MeTube

## Running


## Installing Node on WebApp

This step is not necessary, but it is if you want to do your
development directly on webapp.

This script installs node
```bash
echo 'export Path=$HOME/.local/bin:$PATH'' >> ~/.bashrc
. ~/.bashrc
mkdir ~/.local

mkdir ~/node-latest-install
cd ~/node-latest-install

wget http://nodejs.org/dist/node-latest.tar.gz
tar -xzvf node-latest.tar.gz --strip-components=1


./configure --prefix=~/.local
make install
```

Then this just installs npm
```bash
mkdir ~/npm-install
cd ~/npm-install
wget https://www.npmjs.org/install.sh
/bin/bash install.sh
```
