# TimewebCloudApi.CreateCluster

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **String** | Название кластера базы данных. | 
**type** | **String** | Тип базы данных. | 
**admin** | [**CreateClusterAdmin**](CreateClusterAdmin.md) |  | [optional] 
**instance** | [**CreateClusterInstance**](CreateClusterInstance.md) |  | [optional] 
**hashType** | **String** | Тип хеширования базы данных (mysql5 | mysql | postgres). | [optional] 
**presetId** | **Number** | Идентификатор тарифа. | 
**configParameters** | [**ConfigParameters**](ConfigParameters.md) |  | [optional] 
**network** | [**Network**](Network.md) |  | [optional] 
**description** | **String** | Описание кластера базы данных | [optional] 



## Enum: TypeEnum


* `mysql` (value: `"mysql"`)

* `mysql5` (value: `"mysql5"`)

* `postgres` (value: `"postgres"`)

* `redis` (value: `"redis"`)

* `mongodb` (value: `"mongodb"`)





## Enum: HashTypeEnum


* `caching_sha2` (value: `"caching_sha2"`)

* `mysql_native` (value: `"mysql_native"`)




