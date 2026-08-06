# TimewebCloudApi.DatabaseConfigurator

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** | ID конфигуратора. Передаётся при создании кластера в поле &#x60;configurator_id&#x60;. | 
**diskType** | **String** | Тип диска. | 
**cpuFrequency** | **String** | Частота процессора (в ГГц). | 
**isAllowedLocalNetwork** | **Boolean** | Есть возможность подключения локальной сети. | 
**location** | **String** | Географическое расположение конфигуратора. | 
**requirements** | [**DatabaseConfiguratorRequirements**](DatabaseConfiguratorRequirements.md) |  | 
**prices** | [**DatabaseConfiguratorPrices**](DatabaseConfiguratorPrices.md) |  | [optional] 
**tags** | **[String]** | Теги конфигуратора, в том числе тег группы, в пределах которой доступна смена конфигурации кластера. | 



## Enum: DiskTypeEnum


* `ssd` (value: `"ssd"`)

* `nvme` (value: `"nvme"`)

* `hdd` (value: `"hdd"`)





## Enum: LocationEnum


* `ru-1` (value: `"ru-1"`)

* `ru-3` (value: `"ru-3"`)

* `pl-1` (value: `"pl-1"`)

* `nl-1` (value: `"nl-1"`)

* `de-1` (value: `"de-1"`)

* `us-2` (value: `"us-2"`)

* `us-3` (value: `"us-3"`)




