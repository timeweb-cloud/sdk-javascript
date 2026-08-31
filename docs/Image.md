# TimewebCloudApi.Image

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **String** | ID образа. | 
**status** | [**ImageStatus**](ImageStatus.md) |  | 
**createdAt** | **String** | Значение времени, указанное в комбинированном формате даты и времени ISO8601, которое представляет, когда был создан образ. | 
**deletedAt** | **String** | Значение времени, указанное в комбинированном формате даты и времени ISO8601, которое представляет, когда был удален образ. | 
**size** | **Number** | Размер физического диска в мегабайтах. | 
**virtualSize** | **Number** | Размер виртуального диска в мегабайтах. | 
**name** | **String** | Имя образа. | 
**description** | **String** | Описание образа. | 
**diskId** | **Number** | ID связанного с образом диска. | 
**location** | [**Location**](Location.md) |  | 
**os** | [**OS**](OS.md) |  | 
**progress** | **Number** | Процент создания образа. | 
**isCustom** | **Boolean** | Логическое значение, которое показывает, является ли образ кастомным. | 
**type** | **String** | Тип образа. | 



## Enum: TypeEnum


* `qcow2` (value: `"qcow2"`)

* `iso` (value: `"iso"`)




