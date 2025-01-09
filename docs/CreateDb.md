# TimewebCloudApi.CreateDb

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**login** | **String** | Логин для подключения к базе данных. | [optional] 
**password** | **String** | Пароль для подключения к базе данных. | 
**name** | **String** | Название базы данных. | 
**type** | [**DbType**](DbType.md) |  | 
**hashType** | **String** | Тип хеширования базы данных (mysql5 | mysql | postgres). | [optional] 
**presetId** | **Number** | ID тарифа. | 
**configParameters** | [**ConfigParameters**](ConfigParameters.md) |  | [optional] 
**network** | [**Network**](Network.md) |  | [optional] 



## Enum: HashTypeEnum


* `caching_sha2` (value: `"caching_sha2"`)

* `mysql_native` (value: `"mysql_native"`)




