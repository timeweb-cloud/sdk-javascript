# TimewebCloudApi.Db

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** | Уникальный идентификатор для каждого экземпляра базы данных. Автоматически генерируется при создании. | 
**createdAt** | **String** | Значение времени, указанное в комбинированном формате даты и времени ISO8601, которое представляет, когда была создана база данных. | 
**accountId** | **String** | Идентификатор пользователя | 
**login** | **String** | Логин для подключения к базе данных. | 
**location** | **String** | Локация сервера. | [optional] 
**password** | **String** | Пароль для подключения к базе данных. | 
**name** | **String** | Название базы данных. | 
**host** | **String** | Хост. | 
**type** | **String** | Тип базы данных. | 
**hashType** | **String** | Тип хеширования базы данных (mysql5 | mysql | postgres). | 
**port** | **Number** | Порт | 
**ip** | **String** | IP-адрес сетевого интерфейса IPv4. | 
**localIp** | **String** | IP-адрес локального сетевого интерфейса IPv4. | 
**status** | **String** | Текущий статус базы данных. | 
**presetId** | **Number** | Идентификатор тарифа. | 
**diskStats** | [**DbDiskStats**](DbDiskStats.md) |  | 
**configParameters** | [**ConfigParameters**](ConfigParameters.md) |  | 
**isOnlyLocalIpAccess** | **Boolean** | Это логическое значение, которое показывает, доступна ли база данных только по локальному IP адресу. | 



## Enum: LocationEnum


* `ru-1` (value: `"ru-1"`)

* `ru-2` (value: `"ru-2"`)

* `pl-1` (value: `"pl-1"`)

* `kz-1` (value: `"kz-1"`)





## Enum: TypeEnum


* `mysql` (value: `"mysql"`)

* `mysql5` (value: `"mysql5"`)

* `postgres` (value: `"postgres"`)

* `redis` (value: `"redis"`)

* `mongodb` (value: `"mongodb"`)





## Enum: HashTypeEnum


* `caching_sha2` (value: `"caching_sha2"`)

* `mysql_native` (value: `"mysql_native"`)

* `null` (value: `"null"`)





## Enum: StatusEnum


* `started` (value: `"started"`)

* `starting` (value: `"starting"`)

* `stoped` (value: `"stoped"`)

* `no_paid` (value: `"no_paid"`)




