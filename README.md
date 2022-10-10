<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Ejecutar en desarrollo

1. Clonar del repositorio
2. Ejecutar

```bash
$ yarn install
```

3. Tener Nest CLI instaladao

```
$ npm i -g @nestjs/cli
```

4. Levantar la base dedatos

```
$ docker-compose up -d
```

5. Iniciara el servidor 

```
$ yarn start:dev
```

6. Poblar la base de datos con la semilla

```
http://localhost:3000/api/v2/seed 
```
## Stack usado

* MongoDB
* Nest
* Axios 0.27.2 (La última versión 1.1.2 da problemas)

## Stay in touch

- Author - Antony Delgado


## License

Nest is [MIT licensed](LICENSE).
