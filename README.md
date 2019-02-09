# my-first-nuxt-app

## Requirement
- Docker

## Usage

```shell
$ git clone https://github.com/satokibi/my-first-nuxt-app
$ cd my-first-nuxt-app
$ docker-compose up -d --build
$ docker-compose exec web /bin/ash
```

```terminal:コンテナ内
/app # cd my-first-nuxt-app
/app/my-first-nuxt-app # npm install
/app/my-first-nuxt-app # npm run dev
```

http://localhost:3002

