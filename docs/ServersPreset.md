# TimewebCloudApi.ServersPreset

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** | ID тарифа сервера. | 
**location** | **String** | Локация сервера. | 
**price** | **Number** | Стоимость в рублях. | 
**cpu** | **Number** | Количество ядер процессора. | 
**cpuFrequency** | **String** | Частота процессора. | 
**ram** | **Number** | Количество (в Мб) оперативной памяти. | 
**disk** | **Number** | Размер диска (в Мб). | 
**diskType** | **String** | Тип диска. | 
**bandwidth** | **Number** | Пропускная способность тарифа. | 
**description** | **String** | Описание тарифа. | 
**descriptionShort** | **String** | Короткое описание тарифа. | 
**isAllowedLocalNetwork** | **Boolean** | Есть возможность подключения локальной сети | 
**tags** | **[String]** | Список тегов тарифа. | 



## Enum: LocationEnum


* `ru-1` (value: `"ru-1"`)

* `pl-1` (value: `"pl-1"`)

* `kz-1` (value: `"kz-1"`)





## Enum: DiskTypeEnum


* `ssd` (value: `"ssd"`)

* `nvme` (value: `"nvme"`)

* `hdd` (value: `"hdd"`)




