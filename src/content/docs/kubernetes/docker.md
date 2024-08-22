# Docker

## List
```sh
docker images
```

## Bulid
```sh
docker build -t repo.skobba.net:v4
```

## Push image
```sh
docker push repo.skobba.net:v4
```

## Run container
```sh
docker run --name myname myimage:latest
```

## Stop/remove
```sh
docker stop <id>
docker rm -f <id>
```

## List containers
```sh
docker ps
```

## Logs
```sh
docker logs <name/id>
```
