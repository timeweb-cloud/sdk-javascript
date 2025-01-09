# TimewebCloudApi.CreateCluster

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **String** | Название кластера базы данных. | 
**type** | [**DbType**](DbType.md) |  | 
**admin** | [**CreateClusterAdmin**](CreateClusterAdmin.md) |  | [optional] 
**instance** | [**CreateClusterInstance**](CreateClusterInstance.md) |  | [optional] 
**hashType** | **String** | Тип хеширования базы данных (mysql5 | mysql | postgres). | [optional] 
**presetId** | **Number** | ID тарифа. | 
**configParameters** | [**ConfigParameters**](ConfigParameters.md) |  | [optional] 
**network** | [**Network**](Network.md) |  | [optional] 
**description** | **String** | Описание кластера базы данных | [optional] 
**availabilityZone** | [**AvailabilityZone**](AvailabilityZone.md) |  | [optional] 
**autoBackups** | [**CreateDbAutoBackups**](CreateDbAutoBackups.md) |  | [optional] 



## Enum: HashTypeEnum


* `caching_sha2` (value: `"caching_sha2"`)

* `mysql_native` (value: `"mysql_native"`)




