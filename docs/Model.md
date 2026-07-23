# TimewebCloudApi.Model

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** | Уникальный идентификатор модели | 
**providerId** | **Number** | ID провайдера, который предоставляет модель | 
**name** | **String** | Название модели | 
**publicName** | **String** | Публичное имя модели | 
**type** | **String** | Тип модели (llm - языковая модель, embedding - модель для эмбеддингов) | 
**isDeprecated** | **Boolean** | Признак, что модель устарела | 
**isStopped** | **Boolean** | Признак, что поддержка модели остановлена в системе | 
**deprecationDate** | **Date** | Дата депрекейта модели у провайдера | [optional] 
**isReasoning** | **Boolean** | Признак поддержки режима рассуждения | 
**version** | **String** | Версия модели | 
**paramsInfo** | [**ModelParamsInfo**](ModelParamsInfo.md) |  | [optional] 



## Enum: TypeEnum


* `llm` (value: `"llm"`)

* `embedding` (value: `"embedding"`)




