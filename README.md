# Shape My Tasks

Monorepo for shapemytasks.com.

Simple web application for tracking tasks on a [Shape Up](https://basecamp.com/shapeup)-inspired hill chart.

## Development
1. Generate `dev.key` and `dev.crt` SSL certs in the `./ssl` directory:
```bash
$ openssl req -x509 -sha256 -nodes -newkey rsa:2048 -days 365 -keyout ./ssl/dev.key -out ./ssl/dev.crt
```
2. Run
```bash
$ docker-compose up -d --build
```
3. Navigate to `client` directory and install dependencies
```bash
$ cd ./client && npm install
```
4. Start `client` dev server
```bash
$ npm start
```
5. In a separate terminal shell, go to `server` and install dependencies
```bash
$ ./server && npm install
```
6. Start `server` dev server
```bash
$ npm start
```
7. Go to https://localhost/ in your browser

## Production
1. Ensure `prod` SSL cert values are in the `./ssl` directory
2. Run
```bash
$ docker-compose -f docker-compose.prod-sim.yml up -d --build
```
3. Go to https://localhost/ in your browser

## Useful Commands
* Connect to db:
```bash
$ docker-compose exec db psql -U postgres smt
```

## Notes:
* TODO: Container networking hasn't been tested for MacOS development, might need some tweaks.
* On Windows, if localhost can't be reached, run `wsl --shutdown` which will also restart docker. See [this issue](https://github.com/microsoft/WSL/issues/4204).
