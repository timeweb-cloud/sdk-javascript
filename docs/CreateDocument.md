# TimewebCloudApi.CreateDocument

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **String** | Название документа | 
**type** | **String** | Тип документа. Поддерживается только &#x60;link&#x60;; файлы загружайте через &#x60;POST /api/v1/cloud-ai/knowledge-bases/{id}/upload&#x60; | 
**url** | **String** | Публично доступный HTTP(S)-адрес документа | 
**indexingSchedule** | [**IndexingSchedule**](IndexingSchedule.md) |  | [optional] 



## Enum: TypeEnum


* `link` (value: `"link"`)




