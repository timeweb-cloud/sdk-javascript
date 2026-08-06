# TimewebCloudApi.DatabaseClusterReplicaListInner

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** | ID реплики. | 
**dbId** | **Number** | ID кластера базы данных, которому принадлежит реплика. | 
**status** | **String** | Текущий статус реплики. | 
**localIp** | **String** | Адрес реплики в локальной сети. | 
**disk** | [**DatabaseClusterReplicaListInnerDisk**](DatabaseClusterReplicaListInnerDisk.md) |  | [optional] 



## Enum: StatusEnum


* `started` (value: `"started"`)

* `starting` (value: `"starting"`)

* `stopped` (value: `"stopped"`)

* `no_paid` (value: `"no_paid"`)

* `lan_transfer` (value: `"lan_transfer"`)

* `error` (value: `"error"`)

* `blocked` (value: `"blocked"`)

* `backup_recovery` (value: `"backup_recovery"`)

* `transfer` (value: `"transfer"`)

* `rebooting` (value: `"rebooting"`)

* `turning_off` (value: `"turning_off"`)

* `turning_on` (value: `"turning_on"`)

* `read_only` (value: `"read_only"`)

* `user_transfer` (value: `"user_transfer"`)




