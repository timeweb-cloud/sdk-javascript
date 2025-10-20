# TimewebCloudApi.DocumentStatusInfo

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**type** | **String** | Тип статуса документа | 
**timestamp** | **Date** | Время записи информации (ISO string) | 
**errorCode** | **String** | Код ошибки (только для type: &#39;error&#39;) | [optional] 
**details** | [**DocumentStatusInfoDetails**](DocumentStatusInfoDetails.md) |  | [optional] 



## Enum: TypeEnum


* `new` (value: `"new"`)

* `indexing` (value: `"indexing"`)

* `indexed` (value: `"indexed"`)

* `error` (value: `"error"`)





## Enum: ErrorCodeEnum


* `INSUFFICIENT_TOKENS` (value: `"INSUFFICIENT_TOKENS"`)

* `CRITICAL_BALANCE` (value: `"CRITICAL_BALANCE"`)

* `NEGATIVE_BALANCE` (value: `"NEGATIVE_BALANCE"`)

* `INDEXING_ERROR` (value: `"INDEXING_ERROR"`)




