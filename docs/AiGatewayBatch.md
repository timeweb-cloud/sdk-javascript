# TimewebCloudApi.AiGatewayBatch

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **String** | ID батча | [optional] 
**object** | **String** | Тип объекта | [optional] 
**endpoint** | **String** | Эндпоинт запросов батча | [optional] 
**model** | **String** | Модель батча. На этапе &#x60;validating&#x60; может быть &#x60;null&#x60; | [optional] 
**inputFileId** | **String** | ID входного файла | [optional] 
**outputFileId** | **String** | ID файла результатов — когда батч выполнен | [optional] 
**errorFileId** | **String** | ID файла с ошибками отдельных запросов, если они были | [optional] 
**completionWindow** | **String** | Срок выполнения | [optional] 
**status** | **String** | Статус батча. &#x60;cancelling&#x60; — отмена выполняется, может занять несколько минут | [optional] 
**createdAt** | **Number** | Время создания, Unix-время в секундах | [optional] 
**completedAt** | **Number** | Время завершения, Unix-время в секундах | [optional] 
**expiresAt** | **Number** | Крайний срок выполнения, Unix-время в секундах | [optional] 
**requestCounts** | [**AiGatewayBatchRequestCounts**](AiGatewayBatchRequestCounts.md) |  | [optional] 
**metadata** | **{String: Object}** | Метки батча из запроса | [optional] 
**usage** | **{String: Object}** | Расход токенов батча | [optional] 



## Enum: ObjectEnum


* `batch` (value: `"batch"`)





## Enum: StatusEnum


* `validating` (value: `"validating"`)

* `failed` (value: `"failed"`)

* `in_progress` (value: `"in_progress"`)

* `finalizing` (value: `"finalizing"`)

* `completed` (value: `"completed"`)

* `expired` (value: `"expired"`)

* `cancelling` (value: `"cancelling"`)

* `cancelled` (value: `"cancelled"`)




