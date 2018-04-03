# MeTube

## Running And Building

You need to install `node` and `npm` on your local machine.


### Testing and Running

You have to be on the schools internet, or using vpn to connect to the
database.

To set up project so that you can add stuff run

```
git pull
npm install
```

#### Watching
The project can automatically build, but you still have to reload the webpage


**Running the typescript transpiler**
```
npm run watch-web
```

**Running the scss transpiler**
```
npm run watch-scss
```

If you want to run a test development server, you can just use php's built in one
```
php -S localhost:8000
```

#### Deploying

**locally run build**
```
npm run build
git add .
git commit -m "<note whatever changes you made>"
git push
```

**go to webdev server then**
```
git pull
bash modEverything.sh
```
