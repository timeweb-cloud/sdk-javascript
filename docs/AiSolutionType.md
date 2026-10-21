# TimewebCloudApi.AiSolutionType

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**type** | **String** | Тип решения | 
**name** | **String** | Название решения | 
**description** | **String** | Описание решения в HTML | 
**osIds** | **[Number]** | ID операционной системы, на которой работает решение (один элемент). Пустой массив, если этой ОС нет в каталоге ОС аккаунта | 
**installations** | **Number** | Количество установок. Всегда &#x60;0&#x60;, оставлено для обратной совместимости | 
**requirements** | [**AiSolutionTypeRequirements**](AiSolutionTypeRequirements.md) |  | [optional] 



## Enum: TypeEnum


* `openclaw` (value: `"openclaw"`)




