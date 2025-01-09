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
**port** | **Number** | Порт | 
**status** | **String** | Текущий статус кластера базы данных. | 
**presetId** | **Number** | ID тарифа. | 
**diskStats** | [**DatabaseClusterDiskStats**](DatabaseClusterDiskStats.md) |  | 
**configParameters** | [**ConfigParameters**](ConfigParameters.md) |  | 
**isEnabledPublicNetwork** | **Boolean** | Доступность публичного IP-адреса | 



## Enum: LocationEnum


* `ru-1` (value: `"ru-1"`)

* `ru-2` (value: `"ru-2"`)

* `pl-1` (value: `"pl-1"`)

* `kz-1` (value: `"kz-1"`)





## Enum: HashTypeEnum


* `caching_sha2` (value: `"caching_sha2"`)

* `mysql_native` (value: `"mysql_native"`)

* `null` (value: `"null"`)





## Enum: StatusEnum


* `started` (value: `"started"`)

* `starting` (value: `"starting"`)

* `stopped` (value: `"stopped"`)

* `no_paid` (value: `"no_paid"`)




