# TimewebCloudApi.DatabaseCluster

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** | ID для каждого экземпляра базы данных. Автоматически генерируется при создании. | 
**createdAt** | **String** | Значение времени, указанное в комбинированном формате даты и времени ISO8601, которое представляет, когда была создана база данных. | 
**location** | **String** | Локация сервера. | 
**name** | **String** | Название кластера базы данных. | 
**networks** | [**[DatabaseClusterNetworksInner]**](DatabaseClusterNetworksInner.md) | Список сетей кластера базы данных. | 
**type** | [**DbType**](DbType.md) |  | 
**hashType** | **String** | Тип хеширования кластера базы данных (mysql5 | mysql | postgres). | 
**avatarLink** | **String** | Ссылка на аватар для базы данных. | 
**port** | **Number** | Порт | 
**status** | **String** | Текущий статус кластера базы данных. | 
**presetId** | **Number** | ID тарифа. | 
**disk** | [**DatabaseClusterDisk**](DatabaseClusterDisk.md) |  | [optional] 
**configParameters** | [**ConfigParameters**](ConfigParameters.md) |  | 
**isEnabledPublicNetwork** | **Boolean** | Доступность публичного IP-адреса | 



## Enum: LocationEnum


* `ru-1` (value: `"ru-1"`)

* `ru-3` (value: `"ru-3"`)

* `nl-1` (value: `"nl-1"`)

* `de-1` (value: `"de-1"`)





## Enum: HashTypeEnum


* `caching_sha2` (value: `"caching_sha2"`)

* `mysql_native` (value: `"mysql_native"`)

* `null` (value: `"null"`)





## Enum: StatusEnum


* `started` (value: `"started"`)

* `starting` (value: `"starting"`)

* `stopped` (value: `"stopped"`)

* `no_paid` (value: `"no_paid"`)

* `lan_transfer` (value: `"lan_transfer"`)

* `error` (value: `"error"`)

* `blocked` (value: `"blocked"`)

* `backup_recovery` (value: `"backup_recovery"`)

* `rebooting` (value: `"rebooting"`)

* `turning_off` (value: `"turning_off"`)

* `turning_on` (value: `"turning_on"`)




