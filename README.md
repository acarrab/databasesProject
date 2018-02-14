# MeTube

## Running

In order to get this to run, we need to install Laravel on the web
server. We are using Laravel 5.1 since it is supported by the version
of PHP on the webapp server that Clemson provides.


### Step 1

First we need to install composer (a package manager for laravel) on
the web-server.


```bash
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php -r "if (hash_file('SHA384', 'composer-setup.php') === '544e09ee996cdf60ece3804abc52599c22b1f40f4323403c44d44fdfdd586475ca9813a858088ffbc1f233e9b180f061') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
```

We want to install into our bin, but I just made one in the home
directory. You can make yours wherever, but make sure to add it to the
`PATH` variable.

```bash
mkdir bin
php composer-setup.php --install-dir=bin --filename=composer
```

Then add to the `.bashrc`...

```bash
export PATH=$PATH:~/bin

```

Then remove the installer (you can do this before the last step too)
```bash
php -r "unlink('composer-setup.php');"
```



### Step 2

Depending where you installed composer (I just did so in the home
directory) you are going to want to install laravel now.

```bash
./composer.phar global require "laravel/installer"
```

### Step 3

You now have to add things that are installed through Composer to your
PATH variable.

This just entails adding a line to `.bashrc` as so...

```bash
export PATH=$PATH:~/.config/composer/vendor/bin
```

You also need to reload your `.bashrc`. You can do this with

```bash
source ~/.bashrc
```


### Step 4

Install base project through Laravel

Run the command from the `public_html` directory on the web server

```bash
composer create-project laravel/laravel tmp "5.1.*"
mv tmp/* .
mv tmp/.* .
rmdir tmp

mv server.php index.php
```


### Step 5

You did it! that is all.
