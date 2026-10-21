# TimewebCloudApi.JivoIntegration

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **String** | ID интеграции | 
**accountId** | **String** | Логин аккаунта, которому принадлежит интеграция | 
**agentId** | **Number** | ID агента | 
**accessId** | **String** | Access ID агента. Это токен бота для Jivo и последний сегмент адреса, на который Jivo отправляет события | 
**status** | **String** | Статус интеграции: &#x60;pending&#x60; — ожидает подключения, &#x60;active&#x60; — работает, &#x60;error&#x60; — ошибка подключения | 
**createdAt** | **Date** | Дата и время создания | 
**updatedAt** | **Date** | Дата и время последнего обновления | 



## Enum: StatusEnum


* `pending` (value: `"pending"`)

* `active` (value: `"active"`)

* `error` (value: `"error"`)




