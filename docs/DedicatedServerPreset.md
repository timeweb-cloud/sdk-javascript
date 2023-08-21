# TimewebCloudApi.DedicatedServerPreset

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** | Уникальный идентификатор тарифа выделенного сервера. | 
**description** | **String** | Описание характеристик тарифа выделенного сервера. | 
**isIpmiEnabled** | **Boolean** | Это логическое значение, которое показывает, доступен ли IPMI у данного тарифа. | 
**cpu** | [**DedicatedServerPresetCpu**](DedicatedServerPresetCpu.md) |  | 
**disk** | [**DedicatedServerPresetDisk**](DedicatedServerPresetDisk.md) |  | 
**price** | **Number** | Стоимость тарифа выделенного сервера | [optional] 
**memory** | [**DedicatedServerPresetMemory**](DedicatedServerPresetMemory.md) |  | 
**location** | **String** | Локация. | 



## Enum: LocationEnum


* `ru-1` (value: `"ru-1"`)

* `ru-2` (value: `"ru-2"`)

* `kz-1` (value: `"kz-1"`)

* `pl-1` (value: `"pl-1"`)




