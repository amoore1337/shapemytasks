# Shape My Tasks

Monorepo for shapemytasks.com.

Simple web application for tracking tasks on a [Shape Up](https://basecamp.com/shapeup)-inspired hill chart.

## Development
1. Run
```bash
$ docker-compose up -d --build
```
2. Navigate to `client` directory and install dependencies
```bash
$ cd ./client && npm install
```
3. Start `client` dev server
```bash
$ npm start
```
4. In a separate terminal shell, go to `server` and install dependencies
```bash
$ ./server && npm install
```
5. Start `server` dev server
```bash
$ npm start
```
6. Go to https://localhost/ in your browser

## Production Simulation
1. Run
```bash
$ docker-compose -f docker-compose.prod-sim.yml up -d --build
```
2. Go to https://localhost/ in your browser

## Useful Commands
* Connect to db:
```bash
$ docker-compose exec db psql -U postgres smt
```
* Backup db:
```bash
$ sudo docker-compose exec db sh -c "pg_dump -U username smt" > ~/Desktop/backup.sql
```

## Notes
* TODO: Container networking hasn't been tested for MacOS development, might need some tweaks.
* On Windows, if localhost can't be reached, run `wsl --shutdown` which will also restart docker. See [this issue](https://github.com/microsoft/WSL/issues/4204).
* Blocked dependency updates:
    * `autoprefixer`: Can update with tailwind and PostCSS once CRA supports PostCSS 8 ([issue](https://github.com/facebook/create-react-app/issues/9664))
    * `postcss`: Can update with tailwind and autoprefixer once CRA supports PostCSS 8 ([issue](https://github.com/facebook/create-react-app/issues/9664))
    * `history`: Can update once `react-router-dom` supports v5 ([issue](https://github.com/ReactTraining/history/issues/804))
