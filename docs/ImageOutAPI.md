# TimewebCloudApi.ImageOutAPI

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **String** | Идентификатор образа | 
**status** | [**ImageStatus**](ImageStatus.md) |  | 
**createdAt** | **Date** | Дата и время создания | 
**deletedAt** | **Date** | Дата и время удаления | 
**size** | **Number** | Размер в мегабайтах | 
**name** | **String** | Имя образа | 
**description** | **String** | Описание образа | 
**diskId** | **Number** | Идентификатор связанного с образом диска | 
**location** | **String** | Локация, в которой создан образ | [optional] 
**os** | [**OS**](OS.md) |  | 
**progress** | **Number** | Процент создания образа | 
**isCustom** | **Boolean** | Признак указывающий на то является ли образ кастомным | 


