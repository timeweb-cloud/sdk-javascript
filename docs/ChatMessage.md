# TimewebCloudApi.ChatMessage

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** | ID сообщения | 
**messageId** | **String** | Строковый идентификатор сообщения. Есть не у всех сообщений. | [optional] 
**role** | **String** | Автор сообщения | 
**createdAt** | **Date** | Дата создания сообщения | 
**text** | **String** | Текст сообщения | 
**isGood** | **Boolean** | Оценка ответа: &#x60;true&#x60; — понравился, &#x60;false&#x60; — не понравился, &#x60;null&#x60; — без оценки | 
**uptimeMs** | **Number** | Время до начала ответа агента в миллисекундах (для ответов агента) | 
**file** | [**ChatMessageFile**](ChatMessageFile.md) |  | 



## Enum: RoleEnum


* `user` (value: `"user"`)

* `assistant` (value: `"assistant"`)

* `system` (value: `"system"`)




