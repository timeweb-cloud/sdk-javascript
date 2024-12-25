# TimewebCloudApi.NetworkDrive

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **String** | Идентификатор сетевого диска. | 
**name** | **String** | Название сетевого диска. | 
**comment** | **String** | Комментарий | 
**size** | **Number** | Размер диска в Гб | 
**serviceList** | [**[NetworkDriveServiceListInner]**](NetworkDriveServiceListInner.md) | Список сервисов к которым подключен диск. | 
**location** | **String** | Локация сетевого диска. | 
**status** | **String** | Статус сетевого диска. | 
**availabilityZone** | [**AvailabilityZone**](AvailabilityZone.md) |  | 
**type** | **String** | Тип сетевого диска. | 
**presetId** | **Number** | Идентификатор тарифа. | 



## Enum: LocationEnum


* `ru-1` (value: `"ru-1"`)





## Enum: StatusEnum


* `new` (value: `"new"`)

* `created` (value: `"created"`)

* `failed` (value: `"failed"`)





## Enum: TypeEnum


* `nvme` (value: `"nvme"`)

* `hdd` (value: `"hdd"`)




