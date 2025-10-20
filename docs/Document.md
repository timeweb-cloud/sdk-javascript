# TimewebCloudApi.Document

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** | Уникальный идентификатор документа | 
**name** | **String** | Название документа | 
**size** | **Number** | Размер документа в байтах | 
**status** | **String** | Статус индексации документа | 
**indexingVersion** | **String** | Версия индексации | [optional] 
**statusInfo** | [**DocumentStatusInfo**](DocumentStatusInfo.md) |  | [optional] 
**createdAt** | **Date** | Дата создания документа | 
**updatedAt** | **Date** | Дата обновления документа | 



## Enum: StatusEnum


* `new` (value: `"new"`)

* `indexed` (value: `"indexed"`)

* `indexing` (value: `"indexing"`)

* `error` (value: `"error"`)




