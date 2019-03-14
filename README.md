## Создание базы данных:

```sh
psql -c "create user gorod with password '123qwe'" postgres
psql -c "create database kicker owner gorod encoding 'UTF8' lc_collate 'ru_RU.UTF-8' LC_CTYPE 'ru_RU.UTF-8' template template0;" postgres
```
## Разворачивание проекта

Установка зависимостей

```sh
yarn install
```
Сборка проекта (при наличии ошибок tslint и компиляции typescript падает с ошибкой)

```sh
yarn build
```

Запуск миграций

```sh
yarn migrate
```

Запуск приложения
```sh
yarn start
```

## Команды

Миграции

```sh
yarn migrate // накатить миграции

yarn migrate-undo // откатить миграции

typeorm migration:create -n MIGRATION_NAME // генерирует новый файл миграции, typeorm должен быть установлен глобально и запускаться из той директории,где нужно сгенерировать файл миграции
```