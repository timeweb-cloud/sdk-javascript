# timeweb_cloud_api

TimewebCloudApi - JavaScript client for timeweb_cloud_api
# Введение
API Timeweb Cloud позволяет вам управлять ресурсами в облаке программным способом с использованием обычных HTTP-запросов.

Множество функций, которые доступны в панели управления Timeweb Cloud, также доступны через API, что позволяет вам автоматизировать ваши собственные сценарии.

В этой документации сперва будет описан общий дизайн и принципы работы API, а после этого конкретные конечные точки. Также будут приведены примеры запросов к ним.


## Запросы
Запросы должны выполняться по протоколу `HTTPS`, чтобы гарантировать шифрование транзакций. Поддерживаются следующие методы запроса:
|Метод|Применение|
|--- |--- |
|GET|Извлекает данные о коллекциях и отдельных ресурсах.|
|POST|Для коллекций создает новый ресурс этого типа. Также используется для выполнения действий с конкретным ресурсом.|
|PUT|Обновляет существующий ресурс.|
|PATCH|Некоторые ресурсы поддерживают частичное обновление, то есть обновление только части атрибутов ресурса, в этом случае вместо метода PUT будет использован PATCH.|
|DELETE|Удаляет ресурс.|

Методы `POST`, `PUT` и `PATCH` могут включать объект в тело запроса с типом содержимого `application/json`.

### Параметры в запросах
Некоторые коллекции поддерживают пагинацию, поиск или сортировку в запросах. В параметрах запроса требуется передать:
- `limit` — обозначает количество записей, которое необходимо вернуть
 - `offset` — указывает на смещение, относительно начала списка
 - `search` — позволяет указать набор символов для поиска
 - `sort` — можно задать правило сортировки коллекции

## Ответы
Запросы вернут один из следующих кодов состояния ответа HTTP:

|Статус|Описание|
|--- |--- |
|200 OK|Действие с ресурсом было выполнено успешно.|
|201 Created|Ресурс был успешно создан. При этом ресурс может быть как уже готовым к использованию, так и находиться в процессе запуска.|
|204 No Content|Действие с ресурсом было выполнено успешно, и ответ не содержит дополнительной информации в теле.|
|400 Bad Request|Был отправлен неверный запрос, например, в нем отсутствуют обязательные параметры и т. д. Тело ответа будет содержать дополнительную информацию об ошибке.|
|401 Unauthorized|Ошибка аутентификации.|
|403 Forbidden|Аутентификация прошла успешно, но недостаточно прав для выполнения действия.|
|404 Not Found|Запрашиваемый ресурс не найден.|
|409 Conflict|Запрос конфликтует с текущим состоянием.|
|423 Locked|Ресурс из запроса заблокирован от применения к нему указанного метода.|
|429 Too Many Requests|Был достигнут лимит по количеству запросов в единицу времени.|
|500 Internal Server Error|При выполнении запроса произошла какая-то внутренняя ошибка. Чтобы решить эту проблему, лучше всего создать тикет в панели управления.|

### Структура успешного ответа
Все конечные точки будут возвращать данные в формате `JSON`. Ответы на `GET`-запросы будут иметь на верхнем уровне следующую структуру атрибутов: 
|Название поля|Тип|Описание|
|--- |--- |--- |
|[entity_name]|object, object[], string[], number[], boolean|Динамическое поле, которое будет меняться в зависимости от запрашиваемого ресурса и будет содержать все атрибуты, необходимые для описания этого ресурса. Например, при запросе списка баз данных будет возвращаться поле `dbs`, а при запросе конкретного облачного сервера `server`. Для некоторых конечных точек в ответе может возвращаться сразу несколько ресурсов.|
|meta|object|Опционально. Объект, который содержит вспомогательную информацию о ресурсе. Чаще всего будет встречаться при запросе коллекций и содержать поле `total`, которое будет указывать на количество элементов в коллекции.|
|response_id|string|Опционально. В большинстве случаев в ответе будет содержаться уникальный идентификатор ответа в формате UUIDv4, который однозначно указывает на ваш запрос внутри нашей системы. Если вам потребуется задать вопрос нашей поддержке, приложите к вопросу этот идентификатор — так мы сможем найти ответ на него намного быстрее. Также вы можете использовать этот идентификатор, чтобы убедиться, что это новый ответ на запрос и результат не был получен из кэша.|

Пример запроса на получение списка SSH-ключей:
```
    HTTP/2.0 200 OK
    {
      \"ssh_keys\":[
          {
            \"body\":\"ssh-rsa AAAAB3NzaC1sdfghjkOAsBwWhs= example@device.local\",
            \"created_at\":\"2021-09-15T19:52:27Z\",
            \"expired_at\":null,
            \"id\":5297,
            \"is_default\":false,
            \"name\":\"example@device.local\",
            \"used_at\":null,
            \"used_by\":[]
          }
      ],
      \"meta\":{
          \"total\":1
      },
      \"response_id\":\"94608d15-8672-4eed-8ab6-28bd6fa3cdf7\"
    }
```

### Структура ответа с ошибкой
|Название поля|Тип|Описание|
|--- |--- |--- |
|status_code|number|Короткий числовой идентификатор ошибки.|
|error_code|string|Короткий текстовый идентификатор ошибки, который уточняет числовой идентификатор и удобен для программной обработки. Самый простой пример — это код `not_found` для ошибки 404.|
|message|string, string[]|Опционально. В большинстве случаев в ответе будет содержаться человекочитаемое подробное описание ошибки или ошибок, которые помогут понять, что нужно исправить.|
|response_id|string|Опционально. В большинстве случае в ответе будет содержаться уникальный идентификатор ответа в формате UUIDv4, который однозначно указывает на ваш запрос внутри нашей системы. Если вам потребуется задать вопрос нашей поддержке, приложите к вопросу этот идентификатор — так мы сможем найти ответ на него намного быстрее.|

Пример:
```
    HTTP/2.0 403 Forbidden
    {
      \"status_code\": 403,
      \"error_code\":  \"forbidden\",
      \"message\":     \"You do not have access for the attempted action\",
      \"response_id\": \"94608d15-8672-4eed-8ab6-28bd6fa3cdf7\"
    }
```

## Статусы ресурсов
Важно учесть, что при создании большинства ресурсов внутри платформы вам будет сразу возвращен ответ от сервера со статусом `200 OK` или `201 Created` и идентификатором созданного ресурса в теле ответа, но при этом этот ресурс может быть ещё в *состоянии запуска*.

Для того чтобы понять, в каком состоянии сейчас находится ваш ресурс, мы добавили поле `status` в ответ на получение информации о ресурсе.

Список статусов будет отличаться в зависимости от типа ресурса. Увидеть поддерживаемый список статусов вы сможете в описании каждого конкретного ресурса.

 

## Ограничение скорости запросов (Rate Limiting)
Чтобы обеспечить стабильность для всех пользователей, Timeweb Cloud защищает API от всплесков входящего трафика, анализируя количество запросов c каждого аккаунта к каждой конечной точке.

Если ваше приложение отправляет более 20 запросов в секунду на одну конечную точку, то для этого запроса API может вернуть код состояния HTTP `429 Too Many Requests`.


## Аутентификация
Доступ к API осуществляется с помощью JWT-токена. Токенами можно управлять внутри панели управления Timeweb Cloud в разделе *API и Terraform*.

Токен необходимо передавать в заголовке каждого запроса в формате:
```
  Authorization: Bearer $TIMEWEB_CLOUD_TOKEN
```

## Формат примеров API
Примеры в этой документации описаны с помощью `curl`, HTTP-клиента командной строки. На компьютерах `Linux` и `macOS` обычно по умолчанию установлен `curl`, и он доступен для загрузки на всех популярных платформах, включая `Windows`.

Каждый пример разделен на несколько строк символом `\\`, который совместим с `bash`. Типичный пример выглядит так:
```
  curl -X PATCH 
    -H \"Content-Type: application/json\" 
    -H \"Authorization: Bearer $TIMEWEB_CLOUD_TOKEN\" 
    -d '{\"name\":\"Cute Corvus\",\"comment\":\"Development Server\"}' 
    \"https://api.timeweb.cloud/api/v1/dedicated/1051\"
```
- Параметр `-X` задает метод запроса. Для согласованности метод будет указан во всех примерах, даже если он явно не требуется для методов `GET`.
- Строки `-H` задают требуемые HTTP-заголовки.
- Примеры, для которых требуется объект JSON в теле запроса, передают требуемые данные через параметр `-d`.

Чтобы использовать приведенные примеры, не подставляя каждый раз в них свой токен, вы можете добавить токен один раз в переменные окружения в вашей консоли. Например, на `Linux` это можно сделать с помощью команды:

```
TIMEWEB_CLOUD_TOKEN=\"token\"
```

После этого токен будет автоматически подставляться в ваши запросы.

Обратите внимание, что все значения в этой документации являются примерами. Не полагайтесь на идентификаторы операционных систем, тарифов и т.д., используемые в примерах. Используйте соответствующую конечную точку для получения значений перед созданием ресурсов.


## Версионирование
API построено согласно принципам [семантического версионирования](https://semver.org/lang/ru). Это значит, что мы гарантируем обратную совместимость всех изменений в пределах одной мажорной версии.

Мажорная версия каждой конечной точки обозначается в пути запроса, например, запрос `/api/v1/servers` указывает, что этот метод имеет версию 1.
This SDK is automatically generated by the [OpenAPI Generator](https://openapi-generator.tech) project:

- API version: 1.0.0
- Package version: 1.0.0
- Build package: org.openapitools.codegen.languages.JavascriptClientCodegen

## Installation

### For [Node.js](https://nodejs.org/)

#### npm

To publish the library as a [npm](https://www.npmjs.com/), please follow the procedure in ["Publishing npm packages"](https://docs.npmjs.com/getting-started/publishing-npm-packages).

Then install it via:

```shell
npm install timeweb_cloud_api --save
```

Finally, you need to build the module:

```shell
npm run build
```

##### Local development

To use the library locally without publishing to a remote npm registry, first install the dependencies by changing into the directory containing `package.json` (and this README). Let's call this `JAVASCRIPT_CLIENT_DIR`. Then run:

```shell
npm install
```

Next, [link](https://docs.npmjs.com/cli/link) it globally in npm with the following, also from `JAVASCRIPT_CLIENT_DIR`:

```shell
npm link
```

To use the link you just defined in your project, switch to the directory you want to use your timeweb_cloud_api from, and run:

```shell
npm link /path/to/<JAVASCRIPT_CLIENT_DIR>
```

Finally, you need to build the module:

```shell
npm run build
```

#### git

If the library is hosted at a git repository, e.g.https://github.com/GIT_USER_ID/GIT_REPO_ID
then install it via:

```shell
    npm install GIT_USER_ID/GIT_REPO_ID --save
```

### For browser

The library also works in the browser environment via npm and [browserify](http://browserify.org/). After following
the above steps with Node.js and installing browserify with `npm install -g browserify`,
perform the following (assuming *main.js* is your entry file):

```shell
browserify main.js > bundle.js
```

Then include *bundle.js* in the HTML pages.

### Webpack Configuration

Using Webpack you may encounter the following error: "Module not found: Error:
Cannot resolve module", most certainly you should disable AMD loader. Add/merge
the following section to your webpack config:

```javascript
module: {
  rules: [
    {
      parser: {
        amd: false
      }
    }
  ]
}
```

## Getting Started

Please follow the [installation](#installation) instruction and execute the following JS code:

```javascript
var TimewebCloudApi = require('timeweb_cloud_api');

var defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

var api = new TimewebCloudApi.APIKeysApi()
var createApiKey = new TimewebCloudApi.CreateApiKey(); // {CreateApiKey} 
var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
api.createToken(createApiKey, callback);

```

## Documentation for API Endpoints

All URIs are relative to *https://api.timeweb.cloud*

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*TimewebCloudApi.APIKeysApi* | [**createToken**](docs/APIKeysApi.md#createToken) | **POST** /api/v1/auth/api-keys | Создание токена
*TimewebCloudApi.APIKeysApi* | [**deleteToken**](docs/APIKeysApi.md#deleteToken) | **DELETE** /api/v1/auth/api-keys/{token_id} | Удалить токен
*TimewebCloudApi.APIKeysApi* | [**getTokens**](docs/APIKeysApi.md#getTokens) | **GET** /api/v1/auth/api-keys | Получение списка выпущенных токенов
*TimewebCloudApi.APIKeysApi* | [**reissueToken**](docs/APIKeysApi.md#reissueToken) | **PUT** /api/v1/auth/api-keys/{token_id} | Перевыпустить токен
*TimewebCloudApi.APIKeysApi* | [**updateToken**](docs/APIKeysApi.md#updateToken) | **PATCH** /api/v1/auth/api-keys/{token_id} | Изменить токен
*TimewebCloudApi.AccountApi* | [**addCountriesToAllowedList**](docs/AccountApi.md#addCountriesToAllowedList) | **POST** /api/v1/auth/access/countries | Добавление стран в список разрешенных
*TimewebCloudApi.AccountApi* | [**addIPsToAllowedList**](docs/AccountApi.md#addIPsToAllowedList) | **POST** /api/v1/auth/access/ips | Добавление IP-адресов в список разрешенных
*TimewebCloudApi.AccountApi* | [**deleteCountriesFromAllowedList**](docs/AccountApi.md#deleteCountriesFromAllowedList) | **DELETE** /api/v1/auth/access/countries | Удаление стран из списка разрешенных
*TimewebCloudApi.AccountApi* | [**deleteIPsFromAllowedList**](docs/AccountApi.md#deleteIPsFromAllowedList) | **DELETE** /api/v1/auth/access/ips | Удаление IP-адресов из списка разрешенных
*TimewebCloudApi.AccountApi* | [**getAccountStatus**](docs/AccountApi.md#getAccountStatus) | **GET** /api/v1/account/status | Получение статуса аккаунта
*TimewebCloudApi.AccountApi* | [**getAuthAccessSettings**](docs/AccountApi.md#getAuthAccessSettings) | **GET** /api/v1/auth/access | Получить информацию о ограничениях авторизации пользователя
*TimewebCloudApi.AccountApi* | [**getCountries**](docs/AccountApi.md#getCountries) | **GET** /api/v1/auth/access/countries | Получение списка стран
*TimewebCloudApi.AccountApi* | [**getFinances**](docs/AccountApi.md#getFinances) | **GET** /api/v1/account/finances | Получение платежной информации
*TimewebCloudApi.AccountApi* | [**getNotificationSettings**](docs/AccountApi.md#getNotificationSettings) | **GET** /api/v1/account/notification-settings | Получение настроек уведомлений аккаунта
*TimewebCloudApi.AccountApi* | [**updateAuthRestrictionsByCountries**](docs/AccountApi.md#updateAuthRestrictionsByCountries) | **POST** /api/v1/auth/access/countries/enabled | Включение/отключение ограничений по стране
*TimewebCloudApi.AccountApi* | [**updateAuthRestrictionsByIP**](docs/AccountApi.md#updateAuthRestrictionsByIP) | **POST** /api/v1/auth/access/ips/enabled | Включение/отключение ограничений по IP-адресу
*TimewebCloudApi.AccountApi* | [**updateNotificationSettings**](docs/AccountApi.md#updateNotificationSettings) | **PATCH** /api/v1/account/notification-settings | Изменение настроек уведомлений аккаунта
*TimewebCloudApi.BalancersApi* | [**addIPsToBalancer**](docs/BalancersApi.md#addIPsToBalancer) | **POST** /api/v1/balancers/{balancer_id}/ips | Добавление IP-адресов к балансировщику
*TimewebCloudApi.BalancersApi* | [**createBalancer**](docs/BalancersApi.md#createBalancer) | **POST** /api/v1/balancers | Создание бaлансировщика
*TimewebCloudApi.BalancersApi* | [**createBalancerRule**](docs/BalancersApi.md#createBalancerRule) | **POST** /api/v1/balancers/{balancer_id}/rules | Создание правила для балансировщика
*TimewebCloudApi.BalancersApi* | [**deleteBalancer**](docs/BalancersApi.md#deleteBalancer) | **DELETE** /api/v1/balancers/{balancer_id} | Удаление балансировщика
*TimewebCloudApi.BalancersApi* | [**deleteBalancerRule**](docs/BalancersApi.md#deleteBalancerRule) | **DELETE** /api/v1/balancers/{balancer_id}/rules/{rule_id} | Удаление правила для балансировщика
*TimewebCloudApi.BalancersApi* | [**deleteIPsFromBalancer**](docs/BalancersApi.md#deleteIPsFromBalancer) | **DELETE** /api/v1/balancers/{balancer_id}/ips | Удаление IP-адресов из балансировщика
*TimewebCloudApi.BalancersApi* | [**getBalancer**](docs/BalancersApi.md#getBalancer) | **GET** /api/v1/balancers/{balancer_id} | Получение бaлансировщика
*TimewebCloudApi.BalancersApi* | [**getBalancerIPs**](docs/BalancersApi.md#getBalancerIPs) | **GET** /api/v1/balancers/{balancer_id}/ips | Получение списка IP-адресов балансировщика
*TimewebCloudApi.BalancersApi* | [**getBalancerRules**](docs/BalancersApi.md#getBalancerRules) | **GET** /api/v1/balancers/{balancer_id}/rules | Получение правил балансировщика
*TimewebCloudApi.BalancersApi* | [**getBalancers**](docs/BalancersApi.md#getBalancers) | **GET** /api/v1/balancers | Получение списка всех бaлансировщиков
*TimewebCloudApi.BalancersApi* | [**getBalancersPresets**](docs/BalancersApi.md#getBalancersPresets) | **GET** /api/v1/presets/balancers | Получение списка тарифов для балансировщика
*TimewebCloudApi.BalancersApi* | [**updateBalancer**](docs/BalancersApi.md#updateBalancer) | **PATCH** /api/v1/balancers/{balancer_id} | Обновление балансировщика
*TimewebCloudApi.BalancersApi* | [**updateBalancerRule**](docs/BalancersApi.md#updateBalancerRule) | **PATCH** /api/v1/balancers/{balancer_id}/rules/{rule_id} | Обновление правила для балансировщика
*TimewebCloudApi.DatabasesApi* | [**createDatabase**](docs/DatabasesApi.md#createDatabase) | **POST** /api/v1/dbs | Создание базы данных
*TimewebCloudApi.DatabasesApi* | [**createDatabaseBackup**](docs/DatabasesApi.md#createDatabaseBackup) | **POST** /api/v1/dbs/{db_id}/backups | Создание бэкапа базы данных
*TimewebCloudApi.DatabasesApi* | [**createDatabaseCluster**](docs/DatabasesApi.md#createDatabaseCluster) | **POST** /api/v1/databases | Создание кластера базы данных
*TimewebCloudApi.DatabasesApi* | [**createDatabaseInstance**](docs/DatabasesApi.md#createDatabaseInstance) | **POST** /api/v1/databases/{db_cluster_id}/instances | Создание инстанса базы данных
*TimewebCloudApi.DatabasesApi* | [**createDatabaseUser**](docs/DatabasesApi.md#createDatabaseUser) | **POST** /api/v1/databases/{db_cluster_id}/admins | Создание пользователя базы данных
*TimewebCloudApi.DatabasesApi* | [**deleteDatabase**](docs/DatabasesApi.md#deleteDatabase) | **DELETE** /api/v1/dbs/{db_id} | Удаление базы данных
*TimewebCloudApi.DatabasesApi* | [**deleteDatabaseBackup**](docs/DatabasesApi.md#deleteDatabaseBackup) | **DELETE** /api/v1/dbs/{db_id}/backups/{backup_id} | Удаление бэкапа базы данных
*TimewebCloudApi.DatabasesApi* | [**deleteDatabaseCluster**](docs/DatabasesApi.md#deleteDatabaseCluster) | **DELETE** /api/v1/databases/{db_cluster_id} | Удаление кластера базы данных
*TimewebCloudApi.DatabasesApi* | [**deleteDatabaseInstance**](docs/DatabasesApi.md#deleteDatabaseInstance) | **DELETE** /api/v1/databases/{db_cluster_id}/instances/{instance_id} | Удаление инстанса базы данных
*TimewebCloudApi.DatabasesApi* | [**deleteDatabaseUser**](docs/DatabasesApi.md#deleteDatabaseUser) | **DELETE** /api/v1/databases/{db_cluster_id}/admins/{admin_id} | Удаление пользователя базы данных
*TimewebCloudApi.DatabasesApi* | [**getDatabase**](docs/DatabasesApi.md#getDatabase) | **GET** /api/v1/dbs/{db_id} | Получение базы данных
*TimewebCloudApi.DatabasesApi* | [**getDatabaseAutoBackupsSettings**](docs/DatabasesApi.md#getDatabaseAutoBackupsSettings) | **GET** /api/v1/dbs/{db_id}/auto-backups | Получение настроек автобэкапов базы данных
*TimewebCloudApi.DatabasesApi* | [**getDatabaseBackup**](docs/DatabasesApi.md#getDatabaseBackup) | **GET** /api/v1/dbs/{db_id}/backups/{backup_id} | Получение бэкапа базы данных
*TimewebCloudApi.DatabasesApi* | [**getDatabaseBackups**](docs/DatabasesApi.md#getDatabaseBackups) | **GET** /api/v1/dbs/{db_id}/backups | Список бэкапов базы данных
*TimewebCloudApi.DatabasesApi* | [**getDatabaseCluster**](docs/DatabasesApi.md#getDatabaseCluster) | **GET** /api/v1/databases/{db_cluster_id} | Получение кластера базы данных
*TimewebCloudApi.DatabasesApi* | [**getDatabaseClusterTypes**](docs/DatabasesApi.md#getDatabaseClusterTypes) | **GET** /api/v1/database-types | Получение списка типов кластеров баз данных
*TimewebCloudApi.DatabasesApi* | [**getDatabaseClusters**](docs/DatabasesApi.md#getDatabaseClusters) | **GET** /api/v1/databases | Получение списка кластеров баз данных
*TimewebCloudApi.DatabasesApi* | [**getDatabaseInstance**](docs/DatabasesApi.md#getDatabaseInstance) | **GET** /api/v1/databases/{db_cluster_id}/instances/{instance_id} | Получение инстанса базы данных
*TimewebCloudApi.DatabasesApi* | [**getDatabaseInstances**](docs/DatabasesApi.md#getDatabaseInstances) | **GET** /api/v1/databases/{db_cluster_id}/instances | Получение списка инстансов баз данных
*TimewebCloudApi.DatabasesApi* | [**getDatabaseUser**](docs/DatabasesApi.md#getDatabaseUser) | **GET** /api/v1/databases/{db_cluster_id}/admins/{admin_id} | Получение пользователя базы данных
*TimewebCloudApi.DatabasesApi* | [**getDatabaseUsers**](docs/DatabasesApi.md#getDatabaseUsers) | **GET** /api/v1/databases/{db_cluster_id}/admins | Получение списка пользователей базы данных
*TimewebCloudApi.DatabasesApi* | [**getDatabases**](docs/DatabasesApi.md#getDatabases) | **GET** /api/v1/dbs | Получение списка всех баз данных
*TimewebCloudApi.DatabasesApi* | [**getDatabasesPresets**](docs/DatabasesApi.md#getDatabasesPresets) | **GET** /api/v1/presets/dbs | Получение списка тарифов для баз данных
*TimewebCloudApi.DatabasesApi* | [**restoreDatabaseFromBackup**](docs/DatabasesApi.md#restoreDatabaseFromBackup) | **PUT** /api/v1/dbs/{db_id}/backups/{backup_id} | Восстановление базы данных из бэкапа
*TimewebCloudApi.DatabasesApi* | [**updateDatabase**](docs/DatabasesApi.md#updateDatabase) | **PATCH** /api/v1/dbs/{db_id} | Обновление базы данных
*TimewebCloudApi.DatabasesApi* | [**updateDatabaseAutoBackupsSettings**](docs/DatabasesApi.md#updateDatabaseAutoBackupsSettings) | **PATCH** /api/v1/dbs/{db_id}/auto-backups | Изменение настроек автобэкапов базы данных
*TimewebCloudApi.DatabasesApi* | [**updateDatabaseCluster**](docs/DatabasesApi.md#updateDatabaseCluster) | **PATCH** /api/v1/databases/{db_cluster_id} | Изменение кластера базы данных
*TimewebCloudApi.DatabasesApi* | [**updateDatabaseInstance**](docs/DatabasesApi.md#updateDatabaseInstance) | **PATCH** /api/v1/databases/{db_cluster_id}/instances/{instance_id} | Изменение инстанса базы данных
*TimewebCloudApi.DatabasesApi* | [**updateDatabaseUser**](docs/DatabasesApi.md#updateDatabaseUser) | **PATCH** /api/v1/databases/{db_cluster_id}/admins/{admin_id} | Изменение пользователя базы данных
*TimewebCloudApi.DedicatedServersApi* | [**createDedicatedServer**](docs/DedicatedServersApi.md#createDedicatedServer) | **POST** /api/v1/dedicated-servers | Создание выделенного сервера
*TimewebCloudApi.DedicatedServersApi* | [**deleteDedicatedServer**](docs/DedicatedServersApi.md#deleteDedicatedServer) | **DELETE** /api/v1/dedicated-servers/{dedicated_id} | Удаление выделенного сервера
*TimewebCloudApi.DedicatedServersApi* | [**getDedicatedServer**](docs/DedicatedServersApi.md#getDedicatedServer) | **GET** /api/v1/dedicated-servers/{dedicated_id} | Получение выделенного сервера
*TimewebCloudApi.DedicatedServersApi* | [**getDedicatedServerPresetAdditionalServices**](docs/DedicatedServersApi.md#getDedicatedServerPresetAdditionalServices) | **GET** /api/v1/presets/dedicated-servers/{preset_id}/additional-services | Получение дополнительных услуг для выделенного сервера
*TimewebCloudApi.DedicatedServersApi* | [**getDedicatedServers**](docs/DedicatedServersApi.md#getDedicatedServers) | **GET** /api/v1/dedicated-servers | Получение списка выделенных серверов
*TimewebCloudApi.DedicatedServersApi* | [**getDedicatedServersPresets**](docs/DedicatedServersApi.md#getDedicatedServersPresets) | **GET** /api/v1/presets/dedicated-servers | Получение списка тарифов для выделенного сервера
*TimewebCloudApi.DedicatedServersApi* | [**updateDedicatedServer**](docs/DedicatedServersApi.md#updateDedicatedServer) | **PATCH** /api/v1/dedicated-servers/{dedicated_id} | Обновление выделенного сервера
*TimewebCloudApi.DomainsApi* | [**addDomain**](docs/DomainsApi.md#addDomain) | **POST** /api/v1/add-domain/{fqdn} | Добавление домена на аккаунт
*TimewebCloudApi.DomainsApi* | [**addSubdomain**](docs/DomainsApi.md#addSubdomain) | **POST** /api/v1/domains/{fqdn}/subdomains/{subdomain_fqdn} | Добавление поддомена
*TimewebCloudApi.DomainsApi* | [**checkDomain**](docs/DomainsApi.md#checkDomain) | **GET** /api/v1/check-domain/{fqdn} | Проверить, доступен ли домен для регистрации
*TimewebCloudApi.DomainsApi* | [**createDomainDNSRecord**](docs/DomainsApi.md#createDomainDNSRecord) | **POST** /api/v1/domains/{fqdn}/dns-records | Добавить информацию о DNS-записи для домена или поддомена
*TimewebCloudApi.DomainsApi* | [**createDomainRequest**](docs/DomainsApi.md#createDomainRequest) | **POST** /api/v1/domains-requests | Создание заявки на регистрацию/продление/трансфер домена
*TimewebCloudApi.DomainsApi* | [**deleteDomain**](docs/DomainsApi.md#deleteDomain) | **DELETE** /api/v1/domains/{fqdn} | Удаление домена
*TimewebCloudApi.DomainsApi* | [**deleteDomainDNSRecord**](docs/DomainsApi.md#deleteDomainDNSRecord) | **DELETE** /api/v1/domains/{fqdn}/dns-records/{record_id} | Удалить информацию о DNS-записи для домена или поддомена
*TimewebCloudApi.DomainsApi* | [**deleteSubdomain**](docs/DomainsApi.md#deleteSubdomain) | **DELETE** /api/v1/domains/{fqdn}/subdomains/{subdomain_fqdn} | Удаление поддомена
*TimewebCloudApi.DomainsApi* | [**getDomain**](docs/DomainsApi.md#getDomain) | **GET** /api/v1/domains/{fqdn} | Получение информации о домене
*TimewebCloudApi.DomainsApi* | [**getDomainDNSRecords**](docs/DomainsApi.md#getDomainDNSRecords) | **GET** /api/v1/domains/{fqdn}/dns-records | Получить информацию обо всех пользовательских DNS-записях домена или поддомена
*TimewebCloudApi.DomainsApi* | [**getDomainDefaultDNSRecords**](docs/DomainsApi.md#getDomainDefaultDNSRecords) | **GET** /api/v1/domains/{fqdn}/default-dns-records | Получить информацию обо всех DNS-записях по умолчанию домена или поддомена
*TimewebCloudApi.DomainsApi* | [**getDomainNameServers**](docs/DomainsApi.md#getDomainNameServers) | **GET** /api/v1/domains/{fqdn}/name-servers | Получение списка name-серверов домена
*TimewebCloudApi.DomainsApi* | [**getDomainRequest**](docs/DomainsApi.md#getDomainRequest) | **GET** /api/v1/domains-requests/{request_id} | Получение заявки на регистрацию/продление/трансфер домена
*TimewebCloudApi.DomainsApi* | [**getDomainRequests**](docs/DomainsApi.md#getDomainRequests) | **GET** /api/v1/domains-requests | Получение списка заявок на регистрацию/продление/трансфер домена
*TimewebCloudApi.DomainsApi* | [**getDomains**](docs/DomainsApi.md#getDomains) | **GET** /api/v1/domains | Получение списка всех доменов
*TimewebCloudApi.DomainsApi* | [**getTLD**](docs/DomainsApi.md#getTLD) | **GET** /api/v1/tlds/{tld_id} | Получить информацию о доменной зоне по идентификатору
*TimewebCloudApi.DomainsApi* | [**getTLDs**](docs/DomainsApi.md#getTLDs) | **GET** /api/v1/tlds | Получить информацию о доменных зонах
*TimewebCloudApi.DomainsApi* | [**updateDomainAutoProlongation**](docs/DomainsApi.md#updateDomainAutoProlongation) | **PATCH** /api/v1/domains/{fqdn} | Включение/выключение автопродления домена
*TimewebCloudApi.DomainsApi* | [**updateDomainDNSRecord**](docs/DomainsApi.md#updateDomainDNSRecord) | **PATCH** /api/v1/domains/{fqdn}/dns-records/{record_id} | Обновить информацию о DNS-записи домена или поддомена
*TimewebCloudApi.DomainsApi* | [**updateDomainNameServers**](docs/DomainsApi.md#updateDomainNameServers) | **PUT** /api/v1/domains/{fqdn}/name-servers | Изменение name-серверов домена
*TimewebCloudApi.DomainsApi* | [**updateDomainRequest**](docs/DomainsApi.md#updateDomainRequest) | **PATCH** /api/v1/domains-requests/{request_id} | Оплата/обновление заявки на регистрацию/продление/трансфер домена
*TimewebCloudApi.FirewallApi* | [**addResourceToGroup**](docs/FirewallApi.md#addResourceToGroup) | **POST** /api/v1/firewall/groups/{group_id}/resources/{resource_id} | Линковка ресурса в firewall group
*TimewebCloudApi.FirewallApi* | [**createGroup**](docs/FirewallApi.md#createGroup) | **POST** /api/v1/firewall/groups | Создание группы правил
*TimewebCloudApi.FirewallApi* | [**createGroupRule**](docs/FirewallApi.md#createGroupRule) | **POST** /api/v1/firewall/groups/{group_id}/rules | Создание firewall правила
*TimewebCloudApi.FirewallApi* | [**deleteGroup**](docs/FirewallApi.md#deleteGroup) | **DELETE** /api/v1/firewall/groups/{group_id} | Удаление группы правил
*TimewebCloudApi.FirewallApi* | [**deleteGroupRule**](docs/FirewallApi.md#deleteGroupRule) | **DELETE** /api/v1/firewall/groups/{group_id}/rules/{rule_id} | Удаление firewall правила
*TimewebCloudApi.FirewallApi* | [**deleteResourceFromGroup**](docs/FirewallApi.md#deleteResourceFromGroup) | **DELETE** /api/v1/firewall/groups/{group_id}/resources/{resource_id} | Отлинковка ресурса из firewall group
*TimewebCloudApi.FirewallApi* | [**getGroup**](docs/FirewallApi.md#getGroup) | **GET** /api/v1/firewall/groups/{group_id} | Получение информации о группе правил
*TimewebCloudApi.FirewallApi* | [**getGroupResources**](docs/FirewallApi.md#getGroupResources) | **GET** /api/v1/firewall/groups/{group_id}/resources | Получение слинкованных ресурсов
*TimewebCloudApi.FirewallApi* | [**getGroupRule**](docs/FirewallApi.md#getGroupRule) | **GET** /api/v1/firewall/groups/{group_id}/rules/{rule_id} | Получение информации о правиле
*TimewebCloudApi.FirewallApi* | [**getGroupRules**](docs/FirewallApi.md#getGroupRules) | **GET** /api/v1/firewall/groups/{group_id}/rules | Получение списка правил
*TimewebCloudApi.FirewallApi* | [**getGroups**](docs/FirewallApi.md#getGroups) | **GET** /api/v1/firewall/groups | Получение групп правил
*TimewebCloudApi.FirewallApi* | [**getRulesForResource**](docs/FirewallApi.md#getRulesForResource) | **GET** /api/v1/firewall/service/{resource_type}/{resource_id} | Получение групп правил для ресурса
*TimewebCloudApi.FirewallApi* | [**updateGroup**](docs/FirewallApi.md#updateGroup) | **PATCH** /api/v1/firewall/groups/{group_id} | Обновление группы правил
*TimewebCloudApi.FirewallApi* | [**updateGroupRule**](docs/FirewallApi.md#updateGroupRule) | **PATCH** /api/v1/firewall/groups/{group_id}/rules/{rule_id} | Обновление firewall правила
*TimewebCloudApi.FloatingIPApi* | [**bindFloatingIp**](docs/FloatingIPApi.md#bindFloatingIp) | **POST** /api/v1/floating-ips/{floating_ip_id}/bind | Привязать IP к сервису
*TimewebCloudApi.FloatingIPApi* | [**createFloatingIp**](docs/FloatingIPApi.md#createFloatingIp) | **POST** /api/v1/floating-ips | Создание плавающего IP
*TimewebCloudApi.FloatingIPApi* | [**deleteFloatingIP**](docs/FloatingIPApi.md#deleteFloatingIP) | **DELETE** /api/v1/floating-ips/{floating_ip_id} | Удаление плавающего IP по идентификатору
*TimewebCloudApi.FloatingIPApi* | [**getFloatingIp**](docs/FloatingIPApi.md#getFloatingIp) | **GET** /api/v1/floating-ips/{floating_ip_id} | Получение плавающего IP
*TimewebCloudApi.FloatingIPApi* | [**getFloatingIps**](docs/FloatingIPApi.md#getFloatingIps) | **GET** /api/v1/floating-ips | Получение списка плавающих IP
*TimewebCloudApi.FloatingIPApi* | [**unbindFloatingIp**](docs/FloatingIPApi.md#unbindFloatingIp) | **POST** /api/v1/floating-ips/{floating_ip_id}/unbind | Отвязать IP от сервиса
*TimewebCloudApi.FloatingIPApi* | [**updateFloatingIP**](docs/FloatingIPApi.md#updateFloatingIP) | **PATCH** /api/v1/floating-ips/{floating_ip_id} | Изменение плавающего IP по идентификатору
*TimewebCloudApi.ImagesApi* | [**createImage**](docs/ImagesApi.md#createImage) | **POST** /api/v1/images | Создание образа
*TimewebCloudApi.ImagesApi* | [**createImageDownloadUrl**](docs/ImagesApi.md#createImageDownloadUrl) | **POST** /api/v1/images/{image_id}/download-url | Создание ссылки на скачивание образа
*TimewebCloudApi.ImagesApi* | [**deleteImage**](docs/ImagesApi.md#deleteImage) | **DELETE** /api/v1/images/{image_id} | Удаление образа
*TimewebCloudApi.ImagesApi* | [**deleteImageDownloadURL**](docs/ImagesApi.md#deleteImageDownloadURL) | **DELETE** /api/v1/images/{image_id}/download-url/{image_url_id} | Удаление ссылки на образ
*TimewebCloudApi.ImagesApi* | [**getImage**](docs/ImagesApi.md#getImage) | **GET** /api/v1/images/{image_id} | Получение информации о образе
*TimewebCloudApi.ImagesApi* | [**getImageDownloadURL**](docs/ImagesApi.md#getImageDownloadURL) | **GET** /api/v1/images/{image_id}/download-url/{image_url_id} | Получение информации о ссылке на скачивание образа
*TimewebCloudApi.ImagesApi* | [**getImageDownloadURLs**](docs/ImagesApi.md#getImageDownloadURLs) | **GET** /api/v1/images/{image_id}/download-url | Получение информации о ссылках на скачивание образов
*TimewebCloudApi.ImagesApi* | [**getImages**](docs/ImagesApi.md#getImages) | **GET** /api/v1/images | Получение списка образов
*TimewebCloudApi.ImagesApi* | [**updateImage**](docs/ImagesApi.md#updateImage) | **PATCH** /api/v1/images/{image_id} | Обновление информации о образе
*TimewebCloudApi.ImagesApi* | [**uploadImage**](docs/ImagesApi.md#uploadImage) | **POST** /api/v1/images/{image_id} | Загрузка образа
*TimewebCloudApi.KubernetesApi* | [**createCluster**](docs/KubernetesApi.md#createCluster) | **POST** /api/v1/k8s/clusters | Создание кластера
*TimewebCloudApi.KubernetesApi* | [**createClusterNodeGroup**](docs/KubernetesApi.md#createClusterNodeGroup) | **POST** /api/v1/k8s/clusters/{cluster_id}/groups | Создание группы нод
*TimewebCloudApi.KubernetesApi* | [**deleteCluster**](docs/KubernetesApi.md#deleteCluster) | **DELETE** /api/v1/k8s/clusters/{cluster_id} | Удаление кластера
*TimewebCloudApi.KubernetesApi* | [**deleteClusterNode**](docs/KubernetesApi.md#deleteClusterNode) | **DELETE** /api/v1/k8s/clusters/{cluster_id}/nodes/{node_id} | Удаление ноды
*TimewebCloudApi.KubernetesApi* | [**deleteClusterNodeGroup**](docs/KubernetesApi.md#deleteClusterNodeGroup) | **DELETE** /api/v1/k8s/clusters/{cluster_id}/groups/{group_id} | Удаление группы нод
*TimewebCloudApi.KubernetesApi* | [**getCluster**](docs/KubernetesApi.md#getCluster) | **GET** /api/v1/k8s/clusters/{cluster_id} | Получение информации о кластере
*TimewebCloudApi.KubernetesApi* | [**getClusterKubeconfig**](docs/KubernetesApi.md#getClusterKubeconfig) | **GET** /api/v1/k8s/clusters/{cluster_id}/kubeconfig | Получение файла kubeconfig
*TimewebCloudApi.KubernetesApi* | [**getClusterNodeGroup**](docs/KubernetesApi.md#getClusterNodeGroup) | **GET** /api/v1/k8s/clusters/{cluster_id}/groups/{group_id} | Получение информации о группе нод
*TimewebCloudApi.KubernetesApi* | [**getClusterNodeGroups**](docs/KubernetesApi.md#getClusterNodeGroups) | **GET** /api/v1/k8s/clusters/{cluster_id}/groups | Получение групп нод кластера
*TimewebCloudApi.KubernetesApi* | [**getClusterNodes**](docs/KubernetesApi.md#getClusterNodes) | **GET** /api/v1/k8s/clusters/{cluster_id}/nodes | Получение списка нод
*TimewebCloudApi.KubernetesApi* | [**getClusterNodesFromGroup**](docs/KubernetesApi.md#getClusterNodesFromGroup) | **GET** /api/v1/k8s/clusters/{cluster_id}/groups/{group_id}/nodes | Получение списка нод, принадлежащих группе
*TimewebCloudApi.KubernetesApi* | [**getClusterResources**](docs/KubernetesApi.md#getClusterResources) | **GET** /api/v1/k8s/clusters/{cluster_id}/resources | Получение ресурсов кластера
*TimewebCloudApi.KubernetesApi* | [**getClusters**](docs/KubernetesApi.md#getClusters) | **GET** /api/v1/k8s/clusters | Получение списка кластеров
*TimewebCloudApi.KubernetesApi* | [**getK8SNetworkDrivers**](docs/KubernetesApi.md#getK8SNetworkDrivers) | **GET** /api/v1/k8s/network_drivers | Получение списка сетевых драйверов k8s
*TimewebCloudApi.KubernetesApi* | [**getK8SVersions**](docs/KubernetesApi.md#getK8SVersions) | **GET** /api/v1/k8s/k8s_versions | Получение списка версий k8s
*TimewebCloudApi.KubernetesApi* | [**getKubernetesPresets**](docs/KubernetesApi.md#getKubernetesPresets) | **GET** /api/v1/presets/k8s | Получение списка тарифов
*TimewebCloudApi.KubernetesApi* | [**increaseCountOfNodesInGroup**](docs/KubernetesApi.md#increaseCountOfNodesInGroup) | **POST** /api/v1/k8s/clusters/{cluster_id}/groups/{group_id}/nodes | Увеличение количества нод в группе на указанное количество
*TimewebCloudApi.KubernetesApi* | [**reduceCountOfNodesInGroup**](docs/KubernetesApi.md#reduceCountOfNodesInGroup) | **DELETE** /api/v1/k8s/clusters/{cluster_id}/groups/{group_id}/nodes | Уменьшение количества нод в группе на указанное количество
*TimewebCloudApi.KubernetesApi* | [**updateCluster**](docs/KubernetesApi.md#updateCluster) | **PATCH** /api/v1/k8s/clusters/{cluster_id} | Обновление информации о кластере
*TimewebCloudApi.LocationsApi* | [**getLocations**](docs/LocationsApi.md#getLocations) | **GET** /api/v2/locations | Получение списка локаций
*TimewebCloudApi.MailApi* | [**createDomainMailbox**](docs/MailApi.md#createDomainMailbox) | **POST** /api/v1/mail/domains/{domain} | Создание почтового ящика
*TimewebCloudApi.MailApi* | [**deleteMailbox**](docs/MailApi.md#deleteMailbox) | **DELETE** /api/v1/mail/domains/{domain}/mailboxes/{mailbox} | Удаление почтового ящика
*TimewebCloudApi.MailApi* | [**getDomainMailInfo**](docs/MailApi.md#getDomainMailInfo) | **GET** /api/v1/mail/domains/{domain}/info | Получение почтовой информации о домене
*TimewebCloudApi.MailApi* | [**getDomainMailboxes**](docs/MailApi.md#getDomainMailboxes) | **GET** /api/v1/mail/domains/{domain} | Получение списка почтовых ящиков домена
*TimewebCloudApi.MailApi* | [**getMailQuota**](docs/MailApi.md#getMailQuota) | **GET** /api/v1/mail/quota | Получение квоты почты аккаунта
*TimewebCloudApi.MailApi* | [**getMailbox**](docs/MailApi.md#getMailbox) | **GET** /api/v1/mail/domains/{domain}/mailboxes/{mailbox} | Получение почтового ящика
*TimewebCloudApi.MailApi* | [**getMailboxes**](docs/MailApi.md#getMailboxes) | **GET** /api/v1/mail | Получение списка почтовых ящиков аккаунта
*TimewebCloudApi.MailApi* | [**updateDomainMailInfo**](docs/MailApi.md#updateDomainMailInfo) | **PATCH** /api/v1/mail/domains/{domain}/info | Изменение почтовой информации о домене
*TimewebCloudApi.MailApi* | [**updateMailQuota**](docs/MailApi.md#updateMailQuota) | **PATCH** /api/v1/mail/quota | Изменение квоты почты аккаунта
*TimewebCloudApi.MailApi* | [**updateMailbox**](docs/MailApi.md#updateMailbox) | **PATCH** /api/v1/mail/domains/{domain}/mailboxes/{mailbox} | Изменение почтового ящика
*TimewebCloudApi.ProjectsApi* | [**addBalancerToProject**](docs/ProjectsApi.md#addBalancerToProject) | **POST** /api/v1/projects/{project_id}/resources/balancers | Добавление балансировщика в проект
*TimewebCloudApi.ProjectsApi* | [**addClusterToProject**](docs/ProjectsApi.md#addClusterToProject) | **POST** /api/v1/projects/{project_id}/resources/clusters | Добавление кластера в проект
*TimewebCloudApi.ProjectsApi* | [**addDatabaseToProject**](docs/ProjectsApi.md#addDatabaseToProject) | **POST** /api/v1/projects/{project_id}/resources/databases | Добавление базы данных в проект
*TimewebCloudApi.ProjectsApi* | [**addDedicatedServerToProject**](docs/ProjectsApi.md#addDedicatedServerToProject) | **POST** /api/v1/projects/{project_id}/resources/dedicated | Добавление выделенного сервера в проект
*TimewebCloudApi.ProjectsApi* | [**addServerToProject**](docs/ProjectsApi.md#addServerToProject) | **POST** /api/v1/projects/{project_id}/resources/servers | Добавление сервера в проект
*TimewebCloudApi.ProjectsApi* | [**addStorageToProject**](docs/ProjectsApi.md#addStorageToProject) | **POST** /api/v1/projects/{project_id}/resources/buckets | Добавление хранилища в проект
*TimewebCloudApi.ProjectsApi* | [**createProject**](docs/ProjectsApi.md#createProject) | **POST** /api/v1/projects | Создание проекта
*TimewebCloudApi.ProjectsApi* | [**deleteProject**](docs/ProjectsApi.md#deleteProject) | **DELETE** /api/v1/projects/{project_id} | Удаление проекта
*TimewebCloudApi.ProjectsApi* | [**getAccountBalancers**](docs/ProjectsApi.md#getAccountBalancers) | **GET** /api/v1/projects/resources/balancers | Получение списка всех балансировщиков на аккаунте
*TimewebCloudApi.ProjectsApi* | [**getAccountClusters**](docs/ProjectsApi.md#getAccountClusters) | **GET** /api/v1/projects/resources/clusters | Получение списка всех кластеров на аккаунте
*TimewebCloudApi.ProjectsApi* | [**getAccountDatabases**](docs/ProjectsApi.md#getAccountDatabases) | **GET** /api/v1/projects/resources/databases | Получение списка всех баз данных на аккаунте
*TimewebCloudApi.ProjectsApi* | [**getAccountDedicatedServers**](docs/ProjectsApi.md#getAccountDedicatedServers) | **GET** /api/v1/projects/resources/dedicated | Получение списка всех выделенных серверов на аккаунте
*TimewebCloudApi.ProjectsApi* | [**getAccountServers**](docs/ProjectsApi.md#getAccountServers) | **GET** /api/v1/projects/resources/servers | Получение списка всех серверов на аккаунте
*TimewebCloudApi.ProjectsApi* | [**getAccountStorages**](docs/ProjectsApi.md#getAccountStorages) | **GET** /api/v1/projects/resources/buckets | Получение списка всех хранилищ на аккаунте
*TimewebCloudApi.ProjectsApi* | [**getAllProjectResources**](docs/ProjectsApi.md#getAllProjectResources) | **GET** /api/v1/projects/{project_id}/resources | Получение всех ресурсов проекта
*TimewebCloudApi.ProjectsApi* | [**getProject**](docs/ProjectsApi.md#getProject) | **GET** /api/v1/projects/{project_id} | Получение проекта по идентификатору
*TimewebCloudApi.ProjectsApi* | [**getProjectBalancers**](docs/ProjectsApi.md#getProjectBalancers) | **GET** /api/v1/projects/{project_id}/resources/balancers | Получение списка балансировщиков проекта
*TimewebCloudApi.ProjectsApi* | [**getProjectClusters**](docs/ProjectsApi.md#getProjectClusters) | **GET** /api/v1/projects/{project_id}/resources/clusters | Получение списка кластеров проекта
*TimewebCloudApi.ProjectsApi* | [**getProjectDatabases**](docs/ProjectsApi.md#getProjectDatabases) | **GET** /api/v1/projects/{project_id}/resources/databases | Получение списка баз данных проекта
*TimewebCloudApi.ProjectsApi* | [**getProjectDedicatedServers**](docs/ProjectsApi.md#getProjectDedicatedServers) | **GET** /api/v1/projects/{project_id}/resources/dedicated | Получение списка выделенных серверов проекта
*TimewebCloudApi.ProjectsApi* | [**getProjectServers**](docs/ProjectsApi.md#getProjectServers) | **GET** /api/v1/projects/{project_id}/resources/servers | Получение списка серверов проекта
*TimewebCloudApi.ProjectsApi* | [**getProjectStorages**](docs/ProjectsApi.md#getProjectStorages) | **GET** /api/v1/projects/{project_id}/resources/buckets | Получение списка хранилищ проекта
*TimewebCloudApi.ProjectsApi* | [**getProjects**](docs/ProjectsApi.md#getProjects) | **GET** /api/v1/projects | Получение списка проектов
*TimewebCloudApi.ProjectsApi* | [**transferResourceToAnotherProject**](docs/ProjectsApi.md#transferResourceToAnotherProject) | **PUT** /api/v1/projects/{project_id}/resources/transfer | Перенести ресурс в другой проект
*TimewebCloudApi.ProjectsApi* | [**updateProject**](docs/ProjectsApi.md#updateProject) | **PUT** /api/v1/projects/{project_id} | Изменение проекта
*TimewebCloudApi.S3Api* | [**addStorageSubdomainCertificate**](docs/S3Api.md#addStorageSubdomainCertificate) | **POST** /api/v1/storages/certificates/generate | Добавление сертификата для поддомена хранилища
*TimewebCloudApi.S3Api* | [**addStorageSubdomains**](docs/S3Api.md#addStorageSubdomains) | **POST** /api/v1/storages/buckets/{bucket_id}/subdomains | Добавление поддоменов для хранилища
*TimewebCloudApi.S3Api* | [**copyStorageFile**](docs/S3Api.md#copyStorageFile) | **POST** /api/v1/storages/buckets/{bucket_id}/object-manager/copy | Копирование файла/директории в хранилище
*TimewebCloudApi.S3Api* | [**createFolderInStorage**](docs/S3Api.md#createFolderInStorage) | **POST** /api/v1/storages/buckets/{bucket_id}/object-manager/mkdir | Создание директории в хранилище
*TimewebCloudApi.S3Api* | [**createStorage**](docs/S3Api.md#createStorage) | **POST** /api/v1/storages/buckets | Создание хранилища
*TimewebCloudApi.S3Api* | [**deleteStorage**](docs/S3Api.md#deleteStorage) | **DELETE** /api/v1/storages/buckets/{bucket_id} | Удаление хранилища на аккаунте
*TimewebCloudApi.S3Api* | [**deleteStorageFile**](docs/S3Api.md#deleteStorageFile) | **DELETE** /api/v1/storages/buckets/{bucket_id}/object-manager/remove | Удаление файла/директории в хранилище
*TimewebCloudApi.S3Api* | [**deleteStorageSubdomains**](docs/S3Api.md#deleteStorageSubdomains) | **DELETE** /api/v1/storages/buckets/{bucket_id}/subdomains | Удаление поддоменов хранилища
*TimewebCloudApi.S3Api* | [**getStorageFilesList**](docs/S3Api.md#getStorageFilesList) | **GET** /api/v1/storages/buckets/{bucket_id}/object-manager/list | Получение списка файлов в хранилище по префиксу
*TimewebCloudApi.S3Api* | [**getStorageSubdomains**](docs/S3Api.md#getStorageSubdomains) | **GET** /api/v1/storages/buckets/{bucket_id}/subdomains | Получение списка поддоменов хранилища
*TimewebCloudApi.S3Api* | [**getStorageTransferStatus**](docs/S3Api.md#getStorageTransferStatus) | **GET** /api/v1/storages/buckets/{bucket_id}/transfer-status | Получение статуса переноса хранилища от стороннего S3 в Timeweb Cloud
*TimewebCloudApi.S3Api* | [**getStorageUsers**](docs/S3Api.md#getStorageUsers) | **GET** /api/v1/storages/users | Получение списка пользователей хранилищ аккаунта
*TimewebCloudApi.S3Api* | [**getStorages**](docs/S3Api.md#getStorages) | **GET** /api/v1/storages/buckets | Получение списка хранилищ аккаунта
*TimewebCloudApi.S3Api* | [**getStoragesPresets**](docs/S3Api.md#getStoragesPresets) | **GET** /api/v1/presets/storages | Получение списка тарифов для хранилищ
*TimewebCloudApi.S3Api* | [**renameStorageFile**](docs/S3Api.md#renameStorageFile) | **POST** /api/v1/storages/buckets/{bucket_id}/object-manager/rename | Переименование файла/директории в хранилище
*TimewebCloudApi.S3Api* | [**transferStorage**](docs/S3Api.md#transferStorage) | **POST** /api/v1/storages/transfer | Перенос хранилища от стороннего провайдера S3 в Timeweb Cloud
*TimewebCloudApi.S3Api* | [**updateStorage**](docs/S3Api.md#updateStorage) | **PATCH** /api/v1/storages/buckets/{bucket_id} | Изменение хранилища на аккаунте
*TimewebCloudApi.S3Api* | [**updateStorageUser**](docs/S3Api.md#updateStorageUser) | **PATCH** /api/v1/storages/users/{user_id} | Изменение пароля пользователя-администратора хранилища
*TimewebCloudApi.S3Api* | [**uploadFileToStorage**](docs/S3Api.md#uploadFileToStorage) | **POST** /api/v1/storages/buckets/{bucket_id}/object-manager/upload | Загрузка файлов в хранилище
*TimewebCloudApi.SSHApi* | [**addKeyToServer**](docs/SSHApi.md#addKeyToServer) | **POST** /api/v1/servers/{server_id}/ssh-keys | Добавление SSH-ключей на сервер
*TimewebCloudApi.SSHApi* | [**createKey**](docs/SSHApi.md#createKey) | **POST** /api/v1/ssh-keys | Создание SSH-ключа
*TimewebCloudApi.SSHApi* | [**deleteKey**](docs/SSHApi.md#deleteKey) | **DELETE** /api/v1/ssh-keys/{ssh_key_id} | Удаление SSH-ключа по уникальному идентификатору
*TimewebCloudApi.SSHApi* | [**deleteKeyFromServer**](docs/SSHApi.md#deleteKeyFromServer) | **DELETE** /api/v1/servers/{server_id}/ssh-keys/{ssh_key_id} | Удаление SSH-ключей с сервера
*TimewebCloudApi.SSHApi* | [**getKey**](docs/SSHApi.md#getKey) | **GET** /api/v1/ssh-keys/{ssh_key_id} | Получение SSH-ключа по уникальному идентификатору
*TimewebCloudApi.SSHApi* | [**getKeys**](docs/SSHApi.md#getKeys) | **GET** /api/v1/ssh-keys | Получение списка SSH-ключей
*TimewebCloudApi.SSHApi* | [**updateKey**](docs/SSHApi.md#updateKey) | **PATCH** /api/v1/ssh-keys/{ssh_key_id} | Изменение SSH-ключа по уникальному идентификатору
*TimewebCloudApi.ServersApi* | [**addServerIP**](docs/ServersApi.md#addServerIP) | **POST** /api/v1/servers/{server_id}/ips | Добавление IP-адреса сервера
*TimewebCloudApi.ServersApi* | [**cloneServer**](docs/ServersApi.md#cloneServer) | **POST** /api/v1/servers/{server_id}/clone | Клонирование сервера
*TimewebCloudApi.ServersApi* | [**createServer**](docs/ServersApi.md#createServer) | **POST** /api/v1/servers | Создание сервера
*TimewebCloudApi.ServersApi* | [**createServerDisk**](docs/ServersApi.md#createServerDisk) | **POST** /api/v1/servers/{server_id}/disks | Создание диска сервера
*TimewebCloudApi.ServersApi* | [**createServerDiskBackup**](docs/ServersApi.md#createServerDiskBackup) | **POST** /api/v1/servers/{server_id}/disks/{disk_id}/backups | Создание бэкапа диска сервера
*TimewebCloudApi.ServersApi* | [**deleteServer**](docs/ServersApi.md#deleteServer) | **DELETE** /api/v1/servers/{server_id} | Удаление сервера
*TimewebCloudApi.ServersApi* | [**deleteServerDisk**](docs/ServersApi.md#deleteServerDisk) | **DELETE** /api/v1/servers/{server_id}/disks/{disk_id} | Удаление диска сервера
*TimewebCloudApi.ServersApi* | [**deleteServerDiskBackup**](docs/ServersApi.md#deleteServerDiskBackup) | **DELETE** /api/v1/servers/{server_id}/disks/{disk_id}/backups/{backup_id} | Удаление бэкапа диска сервера
*TimewebCloudApi.ServersApi* | [**deleteServerIP**](docs/ServersApi.md#deleteServerIP) | **DELETE** /api/v1/servers/{server_id}/ips | Удаление IP-адреса сервера
*TimewebCloudApi.ServersApi* | [**getConfigurators**](docs/ServersApi.md#getConfigurators) | **GET** /api/v1/configurator/servers | Получение списка конфигураторов серверов
*TimewebCloudApi.ServersApi* | [**getOsList**](docs/ServersApi.md#getOsList) | **GET** /api/v1/os/servers | Получение списка операционных систем
*TimewebCloudApi.ServersApi* | [**getServer**](docs/ServersApi.md#getServer) | **GET** /api/v1/servers/{server_id} | Получение сервера
*TimewebCloudApi.ServersApi* | [**getServerDisk**](docs/ServersApi.md#getServerDisk) | **GET** /api/v1/servers/{server_id}/disks/{disk_id} | Получение диска сервера
*TimewebCloudApi.ServersApi* | [**getServerDiskAutoBackupSettings**](docs/ServersApi.md#getServerDiskAutoBackupSettings) | **GET** /api/v1/servers/{server_id}/disks/{disk_id}/auto-backups | Получить настройки автобэкапов диска сервера
*TimewebCloudApi.ServersApi* | [**getServerDiskBackup**](docs/ServersApi.md#getServerDiskBackup) | **GET** /api/v1/servers/{server_id}/disks/{disk_id}/backups/{backup_id} | Получение бэкапа диска сервера
*TimewebCloudApi.ServersApi* | [**getServerDiskBackups**](docs/ServersApi.md#getServerDiskBackups) | **GET** /api/v1/servers/{server_id}/disks/{disk_id}/backups | Получение списка бэкапов диска сервера
*TimewebCloudApi.ServersApi* | [**getServerDisks**](docs/ServersApi.md#getServerDisks) | **GET** /api/v1/servers/{server_id}/disks | Получение списка дисков сервера
*TimewebCloudApi.ServersApi* | [**getServerIPs**](docs/ServersApi.md#getServerIPs) | **GET** /api/v1/servers/{server_id}/ips | Получение списка IP-адресов сервера
*TimewebCloudApi.ServersApi* | [**getServerLogs**](docs/ServersApi.md#getServerLogs) | **GET** /api/v1/servers/{server_id}/logs | Получение списка логов сервера
*TimewebCloudApi.ServersApi* | [**getServerStatistics**](docs/ServersApi.md#getServerStatistics) | **GET** /api/v1/servers/{server_id}/statistics | Получение статистики сервера
*TimewebCloudApi.ServersApi* | [**getServers**](docs/ServersApi.md#getServers) | **GET** /api/v1/servers | Получение списка серверов
*TimewebCloudApi.ServersApi* | [**getServersPresets**](docs/ServersApi.md#getServersPresets) | **GET** /api/v1/presets/servers | Получение списка тарифов серверов
*TimewebCloudApi.ServersApi* | [**getSoftware**](docs/ServersApi.md#getSoftware) | **GET** /api/v1/software/servers | Получение списка ПО из маркетплейса
*TimewebCloudApi.ServersApi* | [**hardShutdownServer**](docs/ServersApi.md#hardShutdownServer) | **POST** /api/v1/servers/{server_id}/hard-shutdown | Принудительное выключение сервера
*TimewebCloudApi.ServersApi* | [**imageUnmountAndServerReload**](docs/ServersApi.md#imageUnmountAndServerReload) | **POST** /api/v1/servers/{server_id}/image-unmount | Отмонтирование ISO образа и перезагрузка сервера
*TimewebCloudApi.ServersApi* | [**installServer**](docs/ServersApi.md#installServer) | **POST** /api/v1/servers/{server_id}/install | Установка сервера
*TimewebCloudApi.ServersApi* | [**performActionOnBackup**](docs/ServersApi.md#performActionOnBackup) | **POST** /api/v1/servers/{server_id}/disks/{disk_id}/backups/{backup_id}/action | Выполнение действия над бэкапом диска сервера
*TimewebCloudApi.ServersApi* | [**performActionOnServer**](docs/ServersApi.md#performActionOnServer) | **POST** /api/v1/servers/{server_id}/action | Выполнение действия над сервером
*TimewebCloudApi.ServersApi* | [**rebootServer**](docs/ServersApi.md#rebootServer) | **POST** /api/v1/servers/{server_id}/reboot | Перезагрузка сервера
*TimewebCloudApi.ServersApi* | [**resetServerPassword**](docs/ServersApi.md#resetServerPassword) | **POST** /api/v1/servers/{server_id}/reset-password | Сброс пароля сервера
*TimewebCloudApi.ServersApi* | [**shutdownServer**](docs/ServersApi.md#shutdownServer) | **POST** /api/v1/servers/{server_id}/shutdown | Выключение сервера
*TimewebCloudApi.ServersApi* | [**startServer**](docs/ServersApi.md#startServer) | **POST** /api/v1/servers/{server_id}/start | Запуск сервера
*TimewebCloudApi.ServersApi* | [**updateServer**](docs/ServersApi.md#updateServer) | **PATCH** /api/v1/servers/{server_id} | Изменение сервера
*TimewebCloudApi.ServersApi* | [**updateServerDisk**](docs/ServersApi.md#updateServerDisk) | **PATCH** /api/v1/servers/{server_id}/disks/{disk_id} | Изменение параметров диска сервера
*TimewebCloudApi.ServersApi* | [**updateServerDiskAutoBackupSettings**](docs/ServersApi.md#updateServerDiskAutoBackupSettings) | **PATCH** /api/v1/servers/{server_id}/disks/{disk_id}/auto-backups | Изменение настроек автобэкапов диска сервера
*TimewebCloudApi.ServersApi* | [**updateServerDiskBackup**](docs/ServersApi.md#updateServerDiskBackup) | **PATCH** /api/v1/servers/{server_id}/disks/{disk_id}/backups/{backup_id} | Изменение бэкапа диска сервера
*TimewebCloudApi.ServersApi* | [**updateServerIP**](docs/ServersApi.md#updateServerIP) | **PATCH** /api/v1/servers/{server_id}/ips | Изменение IP-адреса сервера
*TimewebCloudApi.ServersApi* | [**updateServerNAT**](docs/ServersApi.md#updateServerNAT) | **PATCH** /api/v1/servers/{server_id}/local-networks/nat-mode | Изменение правил маршрутизации трафика сервера (NAT)
*TimewebCloudApi.ServersApi* | [**updateServerOSBootMode**](docs/ServersApi.md#updateServerOSBootMode) | **POST** /api/v1/servers/{server_id}/boot-mode | Выбор типа загрузки операционной системы сервера
*TimewebCloudApi.VPCApi* | [**createVPC**](docs/VPCApi.md#createVPC) | **POST** /api/v2/vpcs | Создание VPC
*TimewebCloudApi.VPCApi* | [**deleteVPC**](docs/VPCApi.md#deleteVPC) | **DELETE** /api/v1/vpcs/{vpc_id} | Удаление VPC по идентификатору сети
*TimewebCloudApi.VPCApi* | [**getVPC**](docs/VPCApi.md#getVPC) | **GET** /api/v2/vpcs/{vpc_id} | Получение VPC
*TimewebCloudApi.VPCApi* | [**getVPCPorts**](docs/VPCApi.md#getVPCPorts) | **GET** /api/v1/vpcs/{vpc_id}/ports | Получение списка портов для VPC
*TimewebCloudApi.VPCApi* | [**getVPCServices**](docs/VPCApi.md#getVPCServices) | **GET** /api/v2/vpcs/{vpc_id}/services | Получение списка сервисов в VPC
*TimewebCloudApi.VPCApi* | [**getVPCs**](docs/VPCApi.md#getVPCs) | **GET** /api/v2/vpcs | Получение списка VPCs
*TimewebCloudApi.VPCApi* | [**updateVPCs**](docs/VPCApi.md#updateVPCs) | **PATCH** /api/v2/vpcs/{vpc_id} | Изменение VPC по идентификатору сети


## Documentation for Models

 - [TimewebCloudApi.AddBalancerToProject200Response](docs/AddBalancerToProject200Response.md)
 - [TimewebCloudApi.AddBalancerToProjectRequest](docs/AddBalancerToProjectRequest.md)
 - [TimewebCloudApi.AddClusterToProjectRequest](docs/AddClusterToProjectRequest.md)
 - [TimewebCloudApi.AddCountries](docs/AddCountries.md)
 - [TimewebCloudApi.AddCountriesToAllowedList201Response](docs/AddCountriesToAllowedList201Response.md)
 - [TimewebCloudApi.AddCountriesToAllowedListRequest](docs/AddCountriesToAllowedListRequest.md)
 - [TimewebCloudApi.AddDatabaseToProjectRequest](docs/AddDatabaseToProjectRequest.md)
 - [TimewebCloudApi.AddDedicatedServerToProjectRequest](docs/AddDedicatedServerToProjectRequest.md)
 - [TimewebCloudApi.AddIPsToAllowedList201Response](docs/AddIPsToAllowedList201Response.md)
 - [TimewebCloudApi.AddIPsToAllowedListRequest](docs/AddIPsToAllowedListRequest.md)
 - [TimewebCloudApi.AddIPsToBalancerRequest](docs/AddIPsToBalancerRequest.md)
 - [TimewebCloudApi.AddIps](docs/AddIps.md)
 - [TimewebCloudApi.AddKeyToServerRequest](docs/AddKeyToServerRequest.md)
 - [TimewebCloudApi.AddServerIP201Response](docs/AddServerIP201Response.md)
 - [TimewebCloudApi.AddServerIPRequest](docs/AddServerIPRequest.md)
 - [TimewebCloudApi.AddServerToProjectRequest](docs/AddServerToProjectRequest.md)
 - [TimewebCloudApi.AddStorageSubdomainCertificateRequest](docs/AddStorageSubdomainCertificateRequest.md)
 - [TimewebCloudApi.AddStorageSubdomains200Response](docs/AddStorageSubdomains200Response.md)
 - [TimewebCloudApi.AddStorageSubdomainsRequest](docs/AddStorageSubdomainsRequest.md)
 - [TimewebCloudApi.AddStorageToProjectRequest](docs/AddStorageToProjectRequest.md)
 - [TimewebCloudApi.AddSubdomain201Response](docs/AddSubdomain201Response.md)
 - [TimewebCloudApi.AddedSubdomain](docs/AddedSubdomain.md)
 - [TimewebCloudApi.ApiKey](docs/ApiKey.md)
 - [TimewebCloudApi.AutoBackup](docs/AutoBackup.md)
 - [TimewebCloudApi.AutoReplyIsDisabled](docs/AutoReplyIsDisabled.md)
 - [TimewebCloudApi.AutoReplyIsEnabled](docs/AutoReplyIsEnabled.md)
 - [TimewebCloudApi.AvailabilityZone](docs/AvailabilityZone.md)
 - [TimewebCloudApi.Backup](docs/Backup.md)
 - [TimewebCloudApi.Balancer](docs/Balancer.md)
 - [TimewebCloudApi.BaseError](docs/BaseError.md)
 - [TimewebCloudApi.BindFloatingIp](docs/BindFloatingIp.md)
 - [TimewebCloudApi.Bonus](docs/Bonus.md)
 - [TimewebCloudApi.Bucket](docs/Bucket.md)
 - [TimewebCloudApi.BucketDiskStats](docs/BucketDiskStats.md)
 - [TimewebCloudApi.BucketUser](docs/BucketUser.md)
 - [TimewebCloudApi.CheckDomain200Response](docs/CheckDomain200Response.md)
 - [TimewebCloudApi.ClusterEdit](docs/ClusterEdit.md)
 - [TimewebCloudApi.ClusterIn](docs/ClusterIn.md)
 - [TimewebCloudApi.ClusterOut](docs/ClusterOut.md)
 - [TimewebCloudApi.ClusterResponse](docs/ClusterResponse.md)
 - [TimewebCloudApi.Clusterk8s](docs/Clusterk8s.md)
 - [TimewebCloudApi.ClustersResponse](docs/ClustersResponse.md)
 - [TimewebCloudApi.ConfigParameters](docs/ConfigParameters.md)
 - [TimewebCloudApi.CopyStorageFileRequest](docs/CopyStorageFileRequest.md)
 - [TimewebCloudApi.CreateAdmin](docs/CreateAdmin.md)
 - [TimewebCloudApi.CreateApiKey](docs/CreateApiKey.md)
 - [TimewebCloudApi.CreateBalancer](docs/CreateBalancer.md)
 - [TimewebCloudApi.CreateBalancer200Response](docs/CreateBalancer200Response.md)
 - [TimewebCloudApi.CreateBalancerRule200Response](docs/CreateBalancerRule200Response.md)
 - [TimewebCloudApi.CreateCluster](docs/CreateCluster.md)
 - [TimewebCloudApi.CreateClusterAdmin](docs/CreateClusterAdmin.md)
 - [TimewebCloudApi.CreateClusterInstance](docs/CreateClusterInstance.md)
 - [TimewebCloudApi.CreateDatabase201Response](docs/CreateDatabase201Response.md)
 - [TimewebCloudApi.CreateDatabaseBackup201Response](docs/CreateDatabaseBackup201Response.md)
 - [TimewebCloudApi.CreateDatabaseBackup409Response](docs/CreateDatabaseBackup409Response.md)
 - [TimewebCloudApi.CreateDatabaseCluster201Response](docs/CreateDatabaseCluster201Response.md)
 - [TimewebCloudApi.CreateDatabaseInstance201Response](docs/CreateDatabaseInstance201Response.md)
 - [TimewebCloudApi.CreateDatabaseUser201Response](docs/CreateDatabaseUser201Response.md)
 - [TimewebCloudApi.CreateDb](docs/CreateDb.md)
 - [TimewebCloudApi.CreateDbAutoBackups](docs/CreateDbAutoBackups.md)
 - [TimewebCloudApi.CreateDedicatedServer](docs/CreateDedicatedServer.md)
 - [TimewebCloudApi.CreateDedicatedServer201Response](docs/CreateDedicatedServer201Response.md)
 - [TimewebCloudApi.CreateDns](docs/CreateDns.md)
 - [TimewebCloudApi.CreateDomainDNSRecord201Response](docs/CreateDomainDNSRecord201Response.md)
 - [TimewebCloudApi.CreateDomainMailbox201Response](docs/CreateDomainMailbox201Response.md)
 - [TimewebCloudApi.CreateDomainMailboxRequest](docs/CreateDomainMailboxRequest.md)
 - [TimewebCloudApi.CreateDomainRequest201Response](docs/CreateDomainRequest201Response.md)
 - [TimewebCloudApi.CreateFloatingIp](docs/CreateFloatingIp.md)
 - [TimewebCloudApi.CreateFloatingIp201Response](docs/CreateFloatingIp201Response.md)
 - [TimewebCloudApi.CreateFolderInStorageRequest](docs/CreateFolderInStorageRequest.md)
 - [TimewebCloudApi.CreateInstance](docs/CreateInstance.md)
 - [TimewebCloudApi.CreateKey201Response](docs/CreateKey201Response.md)
 - [TimewebCloudApi.CreateKeyRequest](docs/CreateKeyRequest.md)
 - [TimewebCloudApi.CreateProject](docs/CreateProject.md)
 - [TimewebCloudApi.CreateProject201Response](docs/CreateProject201Response.md)
 - [TimewebCloudApi.CreateRule](docs/CreateRule.md)
 - [TimewebCloudApi.CreateServer](docs/CreateServer.md)
 - [TimewebCloudApi.CreateServer201Response](docs/CreateServer201Response.md)
 - [TimewebCloudApi.CreateServerConfiguration](docs/CreateServerConfiguration.md)
 - [TimewebCloudApi.CreateServerDisk201Response](docs/CreateServerDisk201Response.md)
 - [TimewebCloudApi.CreateServerDiskBackup201Response](docs/CreateServerDiskBackup201Response.md)
 - [TimewebCloudApi.CreateServerDiskBackupRequest](docs/CreateServerDiskBackupRequest.md)
 - [TimewebCloudApi.CreateServerDiskRequest](docs/CreateServerDiskRequest.md)
 - [TimewebCloudApi.CreateStorage201Response](docs/CreateStorage201Response.md)
 - [TimewebCloudApi.CreateStorageRequest](docs/CreateStorageRequest.md)
 - [TimewebCloudApi.CreateToken201Response](docs/CreateToken201Response.md)
 - [TimewebCloudApi.CreateVPC201Response](docs/CreateVPC201Response.md)
 - [TimewebCloudApi.CreateVpc](docs/CreateVpc.md)
 - [TimewebCloudApi.CreatedApiKey](docs/CreatedApiKey.md)
 - [TimewebCloudApi.DatabaseAdmin](docs/DatabaseAdmin.md)
 - [TimewebCloudApi.DatabaseAdminInstancesInner](docs/DatabaseAdminInstancesInner.md)
 - [TimewebCloudApi.DatabaseCluster](docs/DatabaseCluster.md)
 - [TimewebCloudApi.DatabaseClusterDiskStats](docs/DatabaseClusterDiskStats.md)
 - [TimewebCloudApi.DatabaseClusterNetworksInner](docs/DatabaseClusterNetworksInner.md)
 - [TimewebCloudApi.DatabaseClusterNetworksInnerIpsInner](docs/DatabaseClusterNetworksInnerIpsInner.md)
 - [TimewebCloudApi.DatabaseInstance](docs/DatabaseInstance.md)
 - [TimewebCloudApi.DatabaseType](docs/DatabaseType.md)
 - [TimewebCloudApi.Db](docs/Db.md)
 - [TimewebCloudApi.DbDiskStats](docs/DbDiskStats.md)
 - [TimewebCloudApi.DbType](docs/DbType.md)
 - [TimewebCloudApi.DedicatedServer](docs/DedicatedServer.md)
 - [TimewebCloudApi.DedicatedServerAdditionalService](docs/DedicatedServerAdditionalService.md)
 - [TimewebCloudApi.DedicatedServerPreset](docs/DedicatedServerPreset.md)
 - [TimewebCloudApi.DedicatedServerPresetCpu](docs/DedicatedServerPresetCpu.md)
 - [TimewebCloudApi.DedicatedServerPresetDisk](docs/DedicatedServerPresetDisk.md)
 - [TimewebCloudApi.DedicatedServerPresetMemory](docs/DedicatedServerPresetMemory.md)
 - [TimewebCloudApi.DeleteBalancer200Response](docs/DeleteBalancer200Response.md)
 - [TimewebCloudApi.DeleteCluster200Response](docs/DeleteCluster200Response.md)
 - [TimewebCloudApi.DeleteCountriesFromAllowedList200Response](docs/DeleteCountriesFromAllowedList200Response.md)
 - [TimewebCloudApi.DeleteCountriesFromAllowedListRequest](docs/DeleteCountriesFromAllowedListRequest.md)
 - [TimewebCloudApi.DeleteDatabase200Response](docs/DeleteDatabase200Response.md)
 - [TimewebCloudApi.DeleteDatabaseCluster200Response](docs/DeleteDatabaseCluster200Response.md)
 - [TimewebCloudApi.DeleteIPsFromAllowedList200Response](docs/DeleteIPsFromAllowedList200Response.md)
 - [TimewebCloudApi.DeleteIPsFromAllowedListRequest](docs/DeleteIPsFromAllowedListRequest.md)
 - [TimewebCloudApi.DeleteServer200Response](docs/DeleteServer200Response.md)
 - [TimewebCloudApi.DeleteServerIPRequest](docs/DeleteServerIPRequest.md)
 - [TimewebCloudApi.DeleteServiceResponse](docs/DeleteServiceResponse.md)
 - [TimewebCloudApi.DeleteStorage200Response](docs/DeleteStorage200Response.md)
 - [TimewebCloudApi.DeleteStorageFileRequest](docs/DeleteStorageFileRequest.md)
 - [TimewebCloudApi.DnsRecord](docs/DnsRecord.md)
 - [TimewebCloudApi.DnsRecordData](docs/DnsRecordData.md)
 - [TimewebCloudApi.Domain](docs/Domain.md)
 - [TimewebCloudApi.DomainAllowedBuyPeriodsInner](docs/DomainAllowedBuyPeriodsInner.md)
 - [TimewebCloudApi.DomainInfo](docs/DomainInfo.md)
 - [TimewebCloudApi.DomainNameServer](docs/DomainNameServer.md)
 - [TimewebCloudApi.DomainNameServerItemsInner](docs/DomainNameServerItemsInner.md)
 - [TimewebCloudApi.DomainPaymentPeriod](docs/DomainPaymentPeriod.md)
 - [TimewebCloudApi.DomainPrimeType](docs/DomainPrimeType.md)
 - [TimewebCloudApi.DomainProlong](docs/DomainProlong.md)
 - [TimewebCloudApi.DomainRegister](docs/DomainRegister.md)
 - [TimewebCloudApi.DomainRequest](docs/DomainRequest.md)
 - [TimewebCloudApi.DomainTransfer](docs/DomainTransfer.md)
 - [TimewebCloudApi.EditApiKey](docs/EditApiKey.md)
 - [TimewebCloudApi.Finances](docs/Finances.md)
 - [TimewebCloudApi.FirewallGroupInAPI](docs/FirewallGroupInAPI.md)
 - [TimewebCloudApi.FirewallGroupOutAPI](docs/FirewallGroupOutAPI.md)
 - [TimewebCloudApi.FirewallGroupOutResponse](docs/FirewallGroupOutResponse.md)
 - [TimewebCloudApi.FirewallGroupResourceOutAPI](docs/FirewallGroupResourceOutAPI.md)
 - [TimewebCloudApi.FirewallGroupResourceOutResponse](docs/FirewallGroupResourceOutResponse.md)
 - [TimewebCloudApi.FirewallGroupResourcesOutResponse](docs/FirewallGroupResourcesOutResponse.md)
 - [TimewebCloudApi.FirewallGroupsOutResponse](docs/FirewallGroupsOutResponse.md)
 - [TimewebCloudApi.FirewallRuleDirection](docs/FirewallRuleDirection.md)
 - [TimewebCloudApi.FirewallRuleInAPI](docs/FirewallRuleInAPI.md)
 - [TimewebCloudApi.FirewallRuleOutAPI](docs/FirewallRuleOutAPI.md)
 - [TimewebCloudApi.FirewallRuleOutResponse](docs/FirewallRuleOutResponse.md)
 - [TimewebCloudApi.FirewallRuleProtocol](docs/FirewallRuleProtocol.md)
 - [TimewebCloudApi.FirewallRulesOutResponse](docs/FirewallRulesOutResponse.md)
 - [TimewebCloudApi.FloatingIp](docs/FloatingIp.md)
 - [TimewebCloudApi.ForwardingIncomingIsDisabled](docs/ForwardingIncomingIsDisabled.md)
 - [TimewebCloudApi.ForwardingIncomingIsEnabled](docs/ForwardingIncomingIsEnabled.md)
 - [TimewebCloudApi.ForwardingOutgoingIsDisabled](docs/ForwardingOutgoingIsDisabled.md)
 - [TimewebCloudApi.ForwardingOutgoingIsEnabled](docs/ForwardingOutgoingIsEnabled.md)
 - [TimewebCloudApi.Free](docs/Free.md)
 - [TimewebCloudApi.GetAccountStatus200Response](docs/GetAccountStatus200Response.md)
 - [TimewebCloudApi.GetAllProjectResources200Response](docs/GetAllProjectResources200Response.md)
 - [TimewebCloudApi.GetAuthAccessSettings200Response](docs/GetAuthAccessSettings200Response.md)
 - [TimewebCloudApi.GetAuthAccessSettings200ResponseWhiteList](docs/GetAuthAccessSettings200ResponseWhiteList.md)
 - [TimewebCloudApi.GetBalancerIPs200Response](docs/GetBalancerIPs200Response.md)
 - [TimewebCloudApi.GetBalancerRules200Response](docs/GetBalancerRules200Response.md)
 - [TimewebCloudApi.GetBalancers200Response](docs/GetBalancers200Response.md)
 - [TimewebCloudApi.GetBalancersPresets200Response](docs/GetBalancersPresets200Response.md)
 - [TimewebCloudApi.GetConfigurators200Response](docs/GetConfigurators200Response.md)
 - [TimewebCloudApi.GetCountries200Response](docs/GetCountries200Response.md)
 - [TimewebCloudApi.GetDatabaseAutoBackupsSettings200Response](docs/GetDatabaseAutoBackupsSettings200Response.md)
 - [TimewebCloudApi.GetDatabaseBackups200Response](docs/GetDatabaseBackups200Response.md)
 - [TimewebCloudApi.GetDatabaseClusterTypes200Response](docs/GetDatabaseClusterTypes200Response.md)
 - [TimewebCloudApi.GetDatabaseClusters200Response](docs/GetDatabaseClusters200Response.md)
 - [TimewebCloudApi.GetDatabaseInstances200Response](docs/GetDatabaseInstances200Response.md)
 - [TimewebCloudApi.GetDatabaseUsers200Response](docs/GetDatabaseUsers200Response.md)
 - [TimewebCloudApi.GetDatabases200Response](docs/GetDatabases200Response.md)
 - [TimewebCloudApi.GetDatabasesPresets200Response](docs/GetDatabasesPresets200Response.md)
 - [TimewebCloudApi.GetDedicatedServerPresetAdditionalServices200Response](docs/GetDedicatedServerPresetAdditionalServices200Response.md)
 - [TimewebCloudApi.GetDedicatedServers200Response](docs/GetDedicatedServers200Response.md)
 - [TimewebCloudApi.GetDedicatedServersPresets200Response](docs/GetDedicatedServersPresets200Response.md)
 - [TimewebCloudApi.GetDomain200Response](docs/GetDomain200Response.md)
 - [TimewebCloudApi.GetDomainDNSRecords200Response](docs/GetDomainDNSRecords200Response.md)
 - [TimewebCloudApi.GetDomainMailInfo200Response](docs/GetDomainMailInfo200Response.md)
 - [TimewebCloudApi.GetDomainNameServers200Response](docs/GetDomainNameServers200Response.md)
 - [TimewebCloudApi.GetDomainRequests200Response](docs/GetDomainRequests200Response.md)
 - [TimewebCloudApi.GetDomains200Response](docs/GetDomains200Response.md)
 - [TimewebCloudApi.GetFinances200Response](docs/GetFinances200Response.md)
 - [TimewebCloudApi.GetFinances400Response](docs/GetFinances400Response.md)
 - [TimewebCloudApi.GetFinances401Response](docs/GetFinances401Response.md)
 - [TimewebCloudApi.GetFinances403Response](docs/GetFinances403Response.md)
 - [TimewebCloudApi.GetFinances404Response](docs/GetFinances404Response.md)
 - [TimewebCloudApi.GetFinances429Response](docs/GetFinances429Response.md)
 - [TimewebCloudApi.GetFinances500Response](docs/GetFinances500Response.md)
 - [TimewebCloudApi.GetFloatingIps200Response](docs/GetFloatingIps200Response.md)
 - [TimewebCloudApi.GetKey200Response](docs/GetKey200Response.md)
 - [TimewebCloudApi.GetKeys200Response](docs/GetKeys200Response.md)
 - [TimewebCloudApi.GetLocations200Response](docs/GetLocations200Response.md)
 - [TimewebCloudApi.GetMailQuota200Response](docs/GetMailQuota200Response.md)
 - [TimewebCloudApi.GetMailboxes200Response](docs/GetMailboxes200Response.md)
 - [TimewebCloudApi.GetNotificationSettings200Response](docs/GetNotificationSettings200Response.md)
 - [TimewebCloudApi.GetOsList200Response](docs/GetOsList200Response.md)
 - [TimewebCloudApi.GetProjectBalancers200Response](docs/GetProjectBalancers200Response.md)
 - [TimewebCloudApi.GetProjectClusters200Response](docs/GetProjectClusters200Response.md)
 - [TimewebCloudApi.GetProjectDatabases200Response](docs/GetProjectDatabases200Response.md)
 - [TimewebCloudApi.GetProjectDedicatedServers200Response](docs/GetProjectDedicatedServers200Response.md)
 - [TimewebCloudApi.GetProjectServers200Response](docs/GetProjectServers200Response.md)
 - [TimewebCloudApi.GetProjectStorages200Response](docs/GetProjectStorages200Response.md)
 - [TimewebCloudApi.GetProjects200Response](docs/GetProjects200Response.md)
 - [TimewebCloudApi.GetServerDiskAutoBackupSettings200Response](docs/GetServerDiskAutoBackupSettings200Response.md)
 - [TimewebCloudApi.GetServerDiskBackup200Response](docs/GetServerDiskBackup200Response.md)
 - [TimewebCloudApi.GetServerDiskBackups200Response](docs/GetServerDiskBackups200Response.md)
 - [TimewebCloudApi.GetServerDisks200Response](docs/GetServerDisks200Response.md)
 - [TimewebCloudApi.GetServerIPs200Response](docs/GetServerIPs200Response.md)
 - [TimewebCloudApi.GetServerLogs200Response](docs/GetServerLogs200Response.md)
 - [TimewebCloudApi.GetServerStatistics200Response](docs/GetServerStatistics200Response.md)
 - [TimewebCloudApi.GetServerStatistics200ResponseCpuInner](docs/GetServerStatistics200ResponseCpuInner.md)
 - [TimewebCloudApi.GetServerStatistics200ResponseDiskInner](docs/GetServerStatistics200ResponseDiskInner.md)
 - [TimewebCloudApi.GetServerStatistics200ResponseNetworkTrafficInner](docs/GetServerStatistics200ResponseNetworkTrafficInner.md)
 - [TimewebCloudApi.GetServerStatistics200ResponseRamInner](docs/GetServerStatistics200ResponseRamInner.md)
 - [TimewebCloudApi.GetServers200Response](docs/GetServers200Response.md)
 - [TimewebCloudApi.GetServersPresets200Response](docs/GetServersPresets200Response.md)
 - [TimewebCloudApi.GetSoftware200Response](docs/GetSoftware200Response.md)
 - [TimewebCloudApi.GetStorageFilesList200Response](docs/GetStorageFilesList200Response.md)
 - [TimewebCloudApi.GetStorageSubdomains200Response](docs/GetStorageSubdomains200Response.md)
 - [TimewebCloudApi.GetStorageTransferStatus200Response](docs/GetStorageTransferStatus200Response.md)
 - [TimewebCloudApi.GetStorageUsers200Response](docs/GetStorageUsers200Response.md)
 - [TimewebCloudApi.GetStoragesPresets200Response](docs/GetStoragesPresets200Response.md)
 - [TimewebCloudApi.GetTLD200Response](docs/GetTLD200Response.md)
 - [TimewebCloudApi.GetTLDs200Response](docs/GetTLDs200Response.md)
 - [TimewebCloudApi.GetTokens200Response](docs/GetTokens200Response.md)
 - [TimewebCloudApi.GetVPCPorts200Response](docs/GetVPCPorts200Response.md)
 - [TimewebCloudApi.GetVPCServices200Response](docs/GetVPCServices200Response.md)
 - [TimewebCloudApi.GetVPCs200Response](docs/GetVPCs200Response.md)
 - [TimewebCloudApi.ImageDownloadAPI](docs/ImageDownloadAPI.md)
 - [TimewebCloudApi.ImageDownloadResponse](docs/ImageDownloadResponse.md)
 - [TimewebCloudApi.ImageDownloadsResponse](docs/ImageDownloadsResponse.md)
 - [TimewebCloudApi.ImageInAPI](docs/ImageInAPI.md)
 - [TimewebCloudApi.ImageOutAPI](docs/ImageOutAPI.md)
 - [TimewebCloudApi.ImageOutResponse](docs/ImageOutResponse.md)
 - [TimewebCloudApi.ImageStatus](docs/ImageStatus.md)
 - [TimewebCloudApi.ImageUpdateAPI](docs/ImageUpdateAPI.md)
 - [TimewebCloudApi.ImageUrlAuth](docs/ImageUrlAuth.md)
 - [TimewebCloudApi.ImageUrlIn](docs/ImageUrlIn.md)
 - [TimewebCloudApi.ImagesOutResponse](docs/ImagesOutResponse.md)
 - [TimewebCloudApi.Invoice](docs/Invoice.md)
 - [TimewebCloudApi.K8SVersionsResponse](docs/K8SVersionsResponse.md)
 - [TimewebCloudApi.Location](docs/Location.md)
 - [TimewebCloudApi.LocationDto](docs/LocationDto.md)
 - [TimewebCloudApi.Mailbox](docs/Mailbox.md)
 - [TimewebCloudApi.MailboxAutoReply](docs/MailboxAutoReply.md)
 - [TimewebCloudApi.MailboxForwardingIncoming](docs/MailboxForwardingIncoming.md)
 - [TimewebCloudApi.MailboxForwardingOutgoing](docs/MailboxForwardingOutgoing.md)
 - [TimewebCloudApi.MailboxSpamFilter](docs/MailboxSpamFilter.md)
 - [TimewebCloudApi.MasterPresetOutApi](docs/MasterPresetOutApi.md)
 - [TimewebCloudApi.Meta](docs/Meta.md)
 - [TimewebCloudApi.Network](docs/Network.md)
 - [TimewebCloudApi.NetworkDriversResponse](docs/NetworkDriversResponse.md)
 - [TimewebCloudApi.NodeCount](docs/NodeCount.md)
 - [TimewebCloudApi.NodeGroupIn](docs/NodeGroupIn.md)
 - [TimewebCloudApi.NodeGroupOut](docs/NodeGroupOut.md)
 - [TimewebCloudApi.NodeGroupResponse](docs/NodeGroupResponse.md)
 - [TimewebCloudApi.NodeGroupsResponse](docs/NodeGroupsResponse.md)
 - [TimewebCloudApi.NodeOut](docs/NodeOut.md)
 - [TimewebCloudApi.NodesResponse](docs/NodesResponse.md)
 - [TimewebCloudApi.NotificationSetting](docs/NotificationSetting.md)
 - [TimewebCloudApi.NotificationSettingChannel](docs/NotificationSettingChannel.md)
 - [TimewebCloudApi.NotificationSettingChannels](docs/NotificationSettingChannels.md)
 - [TimewebCloudApi.NotificationSettingType](docs/NotificationSettingType.md)
 - [TimewebCloudApi.OS](docs/OS.md)
 - [TimewebCloudApi.PerformActionOnBackupRequest](docs/PerformActionOnBackupRequest.md)
 - [TimewebCloudApi.PerformActionOnServerRequest](docs/PerformActionOnServerRequest.md)
 - [TimewebCloudApi.Policy](docs/Policy.md)
 - [TimewebCloudApi.PresetsBalancer](docs/PresetsBalancer.md)
 - [TimewebCloudApi.PresetsDbs](docs/PresetsDbs.md)
 - [TimewebCloudApi.PresetsResponse](docs/PresetsResponse.md)
 - [TimewebCloudApi.PresetsStorage](docs/PresetsStorage.md)
 - [TimewebCloudApi.Project](docs/Project.md)
 - [TimewebCloudApi.ProjectResource](docs/ProjectResource.md)
 - [TimewebCloudApi.Quota](docs/Quota.md)
 - [TimewebCloudApi.RefreshApiKey](docs/RefreshApiKey.md)
 - [TimewebCloudApi.RemoveCountries](docs/RemoveCountries.md)
 - [TimewebCloudApi.RemoveIps](docs/RemoveIps.md)
 - [TimewebCloudApi.RenameStorageFileRequest](docs/RenameStorageFileRequest.md)
 - [TimewebCloudApi.Resource](docs/Resource.md)
 - [TimewebCloudApi.ResourceTransfer](docs/ResourceTransfer.md)
 - [TimewebCloudApi.ResourceType](docs/ResourceType.md)
 - [TimewebCloudApi.Resources](docs/Resources.md)
 - [TimewebCloudApi.ResourcesResponse](docs/ResourcesResponse.md)
 - [TimewebCloudApi.Rule](docs/Rule.md)
 - [TimewebCloudApi.S3Object](docs/S3Object.md)
 - [TimewebCloudApi.S3ObjectOwner](docs/S3ObjectOwner.md)
 - [TimewebCloudApi.S3Subdomain](docs/S3Subdomain.md)
 - [TimewebCloudApi.SchemasBaseError](docs/SchemasBaseError.md)
 - [TimewebCloudApi.ServerBackup](docs/ServerBackup.md)
 - [TimewebCloudApi.ServerDisk](docs/ServerDisk.md)
 - [TimewebCloudApi.ServerIp](docs/ServerIp.md)
 - [TimewebCloudApi.ServerLog](docs/ServerLog.md)
 - [TimewebCloudApi.ServersConfigurator](docs/ServersConfigurator.md)
 - [TimewebCloudApi.ServersConfiguratorRequirements](docs/ServersConfiguratorRequirements.md)
 - [TimewebCloudApi.ServersOs](docs/ServersOs.md)
 - [TimewebCloudApi.ServersOsRequirements](docs/ServersOsRequirements.md)
 - [TimewebCloudApi.ServersPreset](docs/ServersPreset.md)
 - [TimewebCloudApi.ServersSoftware](docs/ServersSoftware.md)
 - [TimewebCloudApi.ServersSoftwareRequirements](docs/ServersSoftwareRequirements.md)
 - [TimewebCloudApi.SettingCondition](docs/SettingCondition.md)
 - [TimewebCloudApi.SpamFilterIsDisabled](docs/SpamFilterIsDisabled.md)
 - [TimewebCloudApi.SpamFilterIsEnabled](docs/SpamFilterIsEnabled.md)
 - [TimewebCloudApi.SshKey](docs/SshKey.md)
 - [TimewebCloudApi.SshKeyUsedByInner](docs/SshKeyUsedByInner.md)
 - [TimewebCloudApi.Status](docs/Status.md)
 - [TimewebCloudApi.StatusCompanyInfo](docs/StatusCompanyInfo.md)
 - [TimewebCloudApi.Subdomain](docs/Subdomain.md)
 - [TimewebCloudApi.TopLevelDomain](docs/TopLevelDomain.md)
 - [TimewebCloudApi.TopLevelDomainAllowedBuyPeriodsInner](docs/TopLevelDomainAllowedBuyPeriodsInner.md)
 - [TimewebCloudApi.TransferStatus](docs/TransferStatus.md)
 - [TimewebCloudApi.TransferStatusErrorsInner](docs/TransferStatusErrorsInner.md)
 - [TimewebCloudApi.TransferStorageRequest](docs/TransferStorageRequest.md)
 - [TimewebCloudApi.URLType](docs/URLType.md)
 - [TimewebCloudApi.UpdateAdmin](docs/UpdateAdmin.md)
 - [TimewebCloudApi.UpdateAuthRestrictionsByCountriesRequest](docs/UpdateAuthRestrictionsByCountriesRequest.md)
 - [TimewebCloudApi.UpdateBalancer](docs/UpdateBalancer.md)
 - [TimewebCloudApi.UpdateCluster](docs/UpdateCluster.md)
 - [TimewebCloudApi.UpdateDb](docs/UpdateDb.md)
 - [TimewebCloudApi.UpdateDedicatedServerRequest](docs/UpdateDedicatedServerRequest.md)
 - [TimewebCloudApi.UpdateDomain](docs/UpdateDomain.md)
 - [TimewebCloudApi.UpdateDomainAutoProlongation200Response](docs/UpdateDomainAutoProlongation200Response.md)
 - [TimewebCloudApi.UpdateDomainMailInfoRequest](docs/UpdateDomainMailInfoRequest.md)
 - [TimewebCloudApi.UpdateDomainNameServers](docs/UpdateDomainNameServers.md)
 - [TimewebCloudApi.UpdateDomainNameServersNameServersInner](docs/UpdateDomainNameServersNameServersInner.md)
 - [TimewebCloudApi.UpdateFloatingIp](docs/UpdateFloatingIp.md)
 - [TimewebCloudApi.UpdateInstance](docs/UpdateInstance.md)
 - [TimewebCloudApi.UpdateKeyRequest](docs/UpdateKeyRequest.md)
 - [TimewebCloudApi.UpdateMailQuotaRequest](docs/UpdateMailQuotaRequest.md)
 - [TimewebCloudApi.UpdateMailbox](docs/UpdateMailbox.md)
 - [TimewebCloudApi.UpdateNotificationSettingsRequest](docs/UpdateNotificationSettingsRequest.md)
 - [TimewebCloudApi.UpdateNotificationSettingsRequestSettingsInner](docs/UpdateNotificationSettingsRequestSettingsInner.md)
 - [TimewebCloudApi.UpdateNotificationSettingsRequestSettingsInnerChannels](docs/UpdateNotificationSettingsRequestSettingsInnerChannels.md)
 - [TimewebCloudApi.UpdateProject](docs/UpdateProject.md)
 - [TimewebCloudApi.UpdateRule](docs/UpdateRule.md)
 - [TimewebCloudApi.UpdateServer](docs/UpdateServer.md)
 - [TimewebCloudApi.UpdateServerConfigurator](docs/UpdateServerConfigurator.md)
 - [TimewebCloudApi.UpdateServerDiskBackupRequest](docs/UpdateServerDiskBackupRequest.md)
 - [TimewebCloudApi.UpdateServerDiskRequest](docs/UpdateServerDiskRequest.md)
 - [TimewebCloudApi.UpdateServerIPRequest](docs/UpdateServerIPRequest.md)
 - [TimewebCloudApi.UpdateServerNATRequest](docs/UpdateServerNATRequest.md)
 - [TimewebCloudApi.UpdateServerOSBootModeRequest](docs/UpdateServerOSBootModeRequest.md)
 - [TimewebCloudApi.UpdateStorageRequest](docs/UpdateStorageRequest.md)
 - [TimewebCloudApi.UpdateStorageUser200Response](docs/UpdateStorageUser200Response.md)
 - [TimewebCloudApi.UpdateStorageUserRequest](docs/UpdateStorageUserRequest.md)
 - [TimewebCloudApi.UpdateToken200Response](docs/UpdateToken200Response.md)
 - [TimewebCloudApi.UpdateVpc](docs/UpdateVpc.md)
 - [TimewebCloudApi.UploadSuccessful](docs/UploadSuccessful.md)
 - [TimewebCloudApi.UploadSuccessfulResponse](docs/UploadSuccessfulResponse.md)
 - [TimewebCloudApi.UrlStatus](docs/UrlStatus.md)
 - [TimewebCloudApi.Use](docs/Use.md)
 - [TimewebCloudApi.Vds](docs/Vds.md)
 - [TimewebCloudApi.VdsDisksInner](docs/VdsDisksInner.md)
 - [TimewebCloudApi.VdsImage](docs/VdsImage.md)
 - [TimewebCloudApi.VdsNetworksInner](docs/VdsNetworksInner.md)
 - [TimewebCloudApi.VdsNetworksInnerIpsInner](docs/VdsNetworksInnerIpsInner.md)
 - [TimewebCloudApi.VdsOs](docs/VdsOs.md)
 - [TimewebCloudApi.VdsSoftware](docs/VdsSoftware.md)
 - [TimewebCloudApi.Vpc](docs/Vpc.md)
 - [TimewebCloudApi.VpcPort](docs/VpcPort.md)
 - [TimewebCloudApi.VpcPortService](docs/VpcPortService.md)
 - [TimewebCloudApi.VpcService](docs/VpcService.md)
 - [TimewebCloudApi.WorkerPresetOutApi](docs/WorkerPresetOutApi.md)


## Documentation for Authorization


Authentication schemes defined for the API:
### Bearer

- **Type**: Bearer authentication (JWT)

