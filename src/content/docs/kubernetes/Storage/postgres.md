# Postgres

## Operators
### cloudnative-pg
* [https://cloudnative-pg.io/](https://cloudnative-pg.io/)
* [Quick start](https://cloudnative-pg.io/documentation/1.22/quickstart/)
* [https://www.youtube.com/watch?v=Ny9RxM6H6Hg](https://www.youtube.com/watch?v=Ny9RxM6H6Hg)

### cnpg kubectl plugin
Install:
```sh
curl -sSfL \
  https://github.com/cloudnative-pg/cloudnative-pg/raw/main/hack/install-cnpg-plugin.sh | \
  sudo sh -s -- -b /usr/local/bin
```

Use:
```sh
kubectl cnpg status name-of-cluster
```

 

### pgo
* [https://github.com/CrunchyData/postgres-operator](https://github.com/CrunchyData/postgres-operator)
