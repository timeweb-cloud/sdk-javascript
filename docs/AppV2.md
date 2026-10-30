# TimewebCloudApi.AppV2

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** | ID для каждого экземпляра приложения. Автоматически генерируется при создании. | 
**type** | **String** | Тип приложения. | 
**name** | **String** | Удобочитаемое имя, установленное для приложения. | 
**status** | **String** | Текущее состояние приложения. После принятия запроса на создание — new. Ответ 201 не означает завершение развёртывания. | 
**provider** | [**AppV2Provider**](AppV2Provider.md) |  | 
**ip** | **String** | Публичный IPv4-адрес. Отсутствует, пока сервер и IP-адрес не созданы. | [optional] 
**domains** | [**[AppV2DomainsInner]**](AppV2DomainsInner.md) | Домены приложения. В начальном ответе на создание массив пуст. | 
**framework** | **String** | Фреймворк приложения. Поле может отсутствовать до создания инфраструктуры. | [optional] 
**location** | **String** | Локация сервера. Может отсутствовать до создания сервера. | [optional] 
**repository** | [**Repository**](Repository.md) |  | [optional] 
**envVersion** | **String** | Версия окружения. Поле может отсутствовать до создания инфраструктуры. | [optional] 
**envs** | **{String: String}** | Переменные окружения приложения. Объект с ключами и значениями типа string. Поле может отсутствовать до создания инфраструктуры. | [optional] 
**isAutoDeploy** | **Boolean** | Включен ли автоматический деплой. | 
**commitSha** | **String** | Хэш коммита, из которого собрано приложение. | [optional] 
**comment** | **String** | Комментарий к приложению. | [optional] 
**presetId** | **Number** | ID тарифа приложения; 0 при использовании конфигуратора. | 
**indexDir** | **String** | Каталог со статическими файлами frontend-приложения. До создания инфраструктуры поле отсутствует. Для backend — null. | [optional] 
**buildCmd** | **String** | Команда сборки приложения. Поле может отсутствовать до создания инфраструктуры. | [optional] 
**avatarLink** | **String** | Ссылка на аватар приложения. | 
**runCmd** | **String** | Команда запуска backend-приложения. До создания инфраструктуры поле отсутствует. Для frontend — null. | [optional] 
**configuration** | [**AppV2Configuration**](AppV2Configuration.md) |  | [optional] 
**diskStatus** | [**AppV2DiskStatus**](AppV2DiskStatus.md) |  | [optional] 
**isQemuAgent** | **Boolean** | Включён ли агент QEMU. Для frontend — null. Для backend поле отсутствует до создания сервера. | [optional] 
**language** | **String** | Язык или способ развёртывания. Может отсутствовать до создания инфраструктуры. Поле может отсутствовать до создания инфраструктуры. | [optional] 
**startTime** | **Date** | Время последнего изменения записи приложения. | 
**branch** | **String** | Ветка Git-репозитория. В ответе v2 поле называется branch. | [optional] 
**configuratorId** | **Number** | ID конфигуратора приложения; null при использовании готового тарифа. | 
**projectId** | **Number** | ID проекта приложения. Может отсутствовать, если проект не задан. | [optional] 
**systemDependencies** | **[String]** | Системные пакеты приложения. Поле отсутствует, если зависимости не заданы. | [optional] 
**createdAt** | **Date** | Время создания записи приложения. | 
**availabilityZone** | **String** | Зона доступности сервера. Может быть null или отсутствовать до создания сервера. | [optional] 
**requestsLimit** | **Number** | Ограничение количества запросов; null, если индивидуальный лимит не задан. | 
**buildEntryPath** | **String** | Каталог приложения в Git-репозитории, относительно которого выполняется сборка. Может отсутствовать до создания инфраструктуры. | [optional] 
**healthCheck** | **String** | HTTP-путь для проверки работоспособности backend-приложения. Может отсутствовать до создания инфраструктуры. | [optional] 
**dockerImage** | **String** | Имя готового Docker-образа без тега. Присутствует для backend из готового Docker-образа. | [optional] 
**dockerImageTag** | **String** | Тег готового Docker-образа. Присутствует для backend из готового Docker-образа. | [optional] 
**isRussianTrustedCa** | **Boolean** | Добавлены ли доверенные корневые сертификаты Минцифры в окружение backend-приложения. Поле возвращается в российском регионе после создания инфраструктуры. | [optional] 
**isTciTrustedCa** | **Boolean** | Добавлены ли доверенные корневые сертификаты ТЦИ в окружение backend-приложения. Поле возвращается в российском регионе после создания инфраструктуры. | [optional] 
**blockedPorts** | **[Number]** | Заблокированные порты backend-приложения. Поле может отсутствовать до создания сервера. | [optional] 
**reverseProxy** | **Object** | Настройки обратного прокси. В начальном ответе на создание — null. | 



## Enum: TypeEnum


* `backend` (value: `"backend"`)

* `frontend` (value: `"frontend"`)





## Enum: StatusEnum


* `active` (value: `"active"`)

* `paused` (value: `"paused"`)

* `no_paid` (value: `"no_paid"`)

* `deploy` (value: `"deploy"`)

* `failure` (value: `"failure"`)

* `startup_error` (value: `"startup_error"`)

* `new` (value: `"new"`)

* `reboot` (value: `"reboot"`)

* `blocked` (value: `"blocked"`)

* `request_limit_exceeded` (value: `"request_limit_exceeded"`)





## Enum: FrameworkEnum


* `django` (value: `"django"`)

* `express` (value: `"express"`)

* `phoenix` (value: `"phoenix"`)

* `Spring` (value: `"Spring"`)

* `laravel` (value: `"laravel"`)

* `beego` (value: `"beego"`)

* `fastapi` (value: `"fastapi"`)

* `ASP.NET Core` (value: `"ASP.NET Core"`)

* `hapi` (value: `"hapi"`)

* `celery` (value: `"celery"`)

* `flask` (value: `"flask"`)

* `gin` (value: `"gin"`)

* `docker` (value: `"docker"`)

* `docker-compose` (value: `"docker-compose"`)

* `fastify` (value: `"fastify"`)

* `nest` (value: `"nest"`)

* `symfony` (value: `"symfony"`)

* `yii` (value: `"yii"`)

* `next.js` (value: `"next.js"`)

* `nuxt` (value: `"nuxt"`)

* `astro` (value: `"astro"`)

* `tanstack-start` (value: `"tanstack-start"`)

* `solid-start` (value: `"solid-start"`)

* `ktor` (value: `"ktor"`)

* `axum` (value: `"axum"`)

* `actix` (value: `"actix"`)

* `tornado` (value: `"tornado"`)

* `aiohttp` (value: `"aiohttp"`)

* `fiber` (value: `"fiber"`)

* `echo` (value: `"echo"`)

* `Micronaut` (value: `"Micronaut"`)

* `Quarkus` (value: `"Quarkus"`)

* `remix` (value: `"remix"`)

* `sveltekit` (value: `"sveltekit"`)

* `angular` (value: `"angular"`)

* `ember` (value: `"ember"`)

* `preact` (value: `"preact"`)

* `react` (value: `"react"`)

* `solid` (value: `"solid"`)

* `svelte` (value: `"svelte"`)

* `vue` (value: `"vue"`)

* `static-nobuild` (value: `"static-nobuild"`)

* `another` (value: `"another"`)





## Enum: LocationEnum


* `ru-1` (value: `"ru-1"`)

* `ru-2` (value: `"ru-2"`)

* `ru-3` (value: `"ru-3"`)

* `pl-1` (value: `"pl-1"`)

* `kz-1` (value: `"kz-1"`)

* `nl-1` (value: `"nl-1"`)

* `us-1` (value: `"us-1"`)

* `us-2` (value: `"us-2"`)

* `de-1` (value: `"de-1"`)





## Enum: LanguageEnum


* `javascript` (value: `"javascript"`)

* `node` (value: `"node"`)

* `elixir` (value: `"elixir"`)

* `go` (value: `"go"`)

* `php` (value: `"php"`)

* `python` (value: `"python"`)

* `ruby` (value: `"ruby"`)

* `docker` (value: `"docker"`)

* `docker-compose` (value: `"docker-compose"`)

* `dotnet` (value: `"dotnet"`)

* `java` (value: `"java"`)

* `kotlin` (value: `"kotlin"`)

* `rust` (value: `"rust"`)

* `bun` (value: `"bun"`)

* `deno` (value: `"deno"`)

* `custom-image` (value: `"custom-image"`)





## Enum: AvailabilityZoneEnum


* `spb-1` (value: `"spb-1"`)

* `spb-2` (value: `"spb-2"`)

* `spb-3` (value: `"spb-3"`)

* `spb-4` (value: `"spb-4"`)

* `nsk-1` (value: `"nsk-1"`)

* `ams-1` (value: `"ams-1"`)

* `gdn-1` (value: `"gdn-1"`)

* `ala-1` (value: `"ala-1"`)

* `nyc-1` (value: `"nyc-1"`)

* `msk-1` (value: `"msk-1"`)




