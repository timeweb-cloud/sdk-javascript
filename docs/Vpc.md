# TimewebCloudApi.Vpc

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **String** | ID сети. | 
**name** | **String** | Имя сети. | 
**subnetV4** | **String** | Маска подсети. | 
**location** | **String** | Локация сети. | 
**createdAt** | **Date** | Дата создания сети. | 
**description** | **String** | Описание. | 
**availabilityZone** | [**AvailabilityZone**](AvailabilityZone.md) |  | 
**publicIp** | **String** | Публичный IP-адрес сети. | 
**type** | **String** | Тип сети. | 



## Enum: LocationEnum


* `ru-1` (value: `"ru-1"`)

* `ru-2` (value: `"ru-2"`)

* `pl-1` (value: `"pl-1"`)

* `nl-1` (value: `"nl-1"`)





## Enum: TypeEnum


* `bgp` (value: `"bgp"`)

* `ovn` (value: `"ovn"`)




