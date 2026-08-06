# TimewebCloudApi.CreateCluster

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **String** | Название кластера базы данных. | 
**type** | [**DbType**](DbType.md) |  | 
**admin** | [**CreateClusterAdmin**](CreateClusterAdmin.md) |  | [optional] 
**instance** | [**CreateClusterInstance**](CreateClusterInstance.md) |  | [optional] 
**hashType** | **String** | Тип хеширования базы данных (mysql | postgres). | [optional] 
**presetId** | **Number** | ID тарифа. Нельзя передавать вместе с &#x60;configuration&#x60; | [optional] 
**configuration** | [**CreateClusterConfiguration**](CreateClusterConfiguration.md) |  | [optional] 
**projectId** | **Number** | ID проекта. | [optional] 
**configParameters** | [**Mysql**](Mysql.md) |  | [optional] 
**replication** | [**DbReplication**](DbReplication.md) |  | [optional] 
**network** | [**Network**](Network.md) |  | [optional] 
**isPublicIpv6** | **Boolean** | Использование IPv6 адреса. | [optional] 
**description** | **String** | Описание кластера базы данных | [optional] 
**availabilityZone** | [**AvailabilityZone**](AvailabilityZone.md) |  | [optional] 
**autoBackups** | [**CreateDbAutoBackups**](CreateDbAutoBackups.md) |  | [optional] 
**backupSchedule** | [**CreateClusterBackupSchedule**](CreateClusterBackupSchedule.md) |  | [optional] 
**maintenanceSlot** | [**CreateClusterMaintenanceSlot**](CreateClusterMaintenanceSlot.md) |  | [optional] 
**diskAutoscaling** | [**CreateClusterDiskAutoscaling**](CreateClusterDiskAutoscaling.md) |  | [optional] 



## Enum: HashTypeEnum


* `caching_sha2` (value: `"caching_sha2"`)

* `mysql_native` (value: `"mysql_native"`)




