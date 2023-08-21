# TimewebCloudApi.CreateDb

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**login** | **String** | Логин для подключения к базе данных. | [optional] 
**password** | **String** | Пароль для подключения к базе данных. | 
**name** | **String** | Название базы данных. | 
**type** | **String** | Тип базы данных. | 
**hashType** | **String** | Тип хеширования базы данных (mysql5 | mysql | postgres). | [optional] 
**presetId** | **Number** | Идентификатор тарифа. | 
**configParameters** | [**ConfigParameters**](ConfigParameters.md) |  | [optional] 
**network** | [**Network**](Network.md) |  | [optional] 



## Enum: TypeEnum


* `mysql` (value: `"mysql"`)

* `mysql5` (value: `"mysql5"`)

* `postgres` (value: `"postgres"`)

* `redis` (value: `"redis"`)

* `mongodb` (value: `"mongodb"`)





## Enum: HashTypeEnum


* `caching_sha2` (value: `"caching_sha2"`)

* `mysql_native` (value: `"mysql_native"`)




