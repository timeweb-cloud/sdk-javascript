# TimewebCloudApi.Document

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** | ID документа | 
**name** | **String** | Название документа | 
**size** | **Number** | Размер в байтах. Для документа по ссылке — значение заголовка &#x60;Content-Length&#x60; на момент добавления, &#x60;0&#x60;, если сервер его не вернул | 
**status** | **String** | Статус индексации: - &#x60;new&#x60; — документ добавлен и ждёт индексации - &#x60;indexing&#x60; — индексируется - &#x60;indexed&#x60; — проиндексирован, используется в поиске - &#x60;error&#x60; — ошибка индексации, подробности в &#x60;status_info&#x60; | 
**type** | **String** | Тип документа: &#x60;file&#x60; — загруженный файл, &#x60;link&#x60; — документ по ссылке | 
**indexingSchedule** | [**IndexingSchedule**](IndexingSchedule.md) |  | 
**indexingVersion** | **String** | Версия индексации документа | 
**statusInfo** | [**DocumentStatusInfo**](DocumentStatusInfo.md) |  | 
**link** | **String** | URL документа. Только для документов типа &#x60;link&#x60; | [optional] 
**createdAt** | **Date** | Дата и время добавления документа | 
**updatedAt** | **Date** | Дата и время последнего изменения документа | 



## Enum: StatusEnum


* `new` (value: `"new"`)

* `indexing` (value: `"indexing"`)

* `indexed` (value: `"indexed"`)

* `error` (value: `"error"`)





## Enum: TypeEnum


* `file` (value: `"file"`)

* `link` (value: `"link"`)




