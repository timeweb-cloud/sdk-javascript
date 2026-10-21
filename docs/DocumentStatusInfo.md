# TimewebCloudApi.DocumentStatusInfo

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**type** | **String** | Тип состояния, совпадает со статусом документа | 
**timestamp** | **Date** | Время, когда записано состояние | 
**errorCode** | **String** | Код ошибки, только для &#x60;type: error&#x60;: - &#x60;INSUFFICIENT_TOKENS&#x60; — недостаточно токенов для индексации - &#x60;CRITICAL_BALANCE&#x60; — критически низкий остаток токенов - &#x60;NEGATIVE_BALANCE&#x60; — отрицательный остаток токенов - &#x60;INDEXING_ERROR&#x60; — не удалось обработать документ | [optional] 
**stage** | **String** | Этап индексации, на котором произошла ошибка | [optional] 
**traceId** | **String** | Идентификатор операции индексации — укажите его при обращении в поддержку | [optional] 
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




