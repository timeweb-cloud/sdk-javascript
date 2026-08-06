# TimewebCloudApi.UpdateCluster

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **String** | Название кластера базы данных. | [optional] 
**presetId** | **Number** | ID тарифа. Нельзя передавать вместе с &#x60;configuration&#x60; | [optional] 
**configuration** | [**UpdateClusterConfiguration**](UpdateClusterConfiguration.md) |  | [optional] 
**configParameters** | [**Mysql**](Mysql.md) |  | [optional] 
**hashType** | **String** | Тип хеширования базы данных (mysql | postgres). | [optional] 
**description** | **String** | Описание кластера базы данных | [optional] 
**isEnabledPublicNetwork** | **Boolean** | Доступность публичного IP-адреса | [optional] 
**isEnabledPublicIpv6** | **Boolean** | Использование публичного IPv6-адреса. | [optional] 
**isSecureConnectionEnable** | **Boolean** | Включить защищенное подключение к кластеру базы данных | [optional] 
**maintenanceSlot** | [**CreateClusterMaintenanceSlot**](CreateClusterMaintenanceSlot.md) |  | [optional] 
**diskAutoscaling** | [**CreateClusterDiskAutoscaling**](CreateClusterDiskAutoscaling.md) |  | [optional] 



## Enum: HashTypeEnum


* `caching_sha2` (value: `"caching_sha2"`)

* `mysql_native` (value: `"mysql_native"`)




