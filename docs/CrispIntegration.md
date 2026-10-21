# TimewebCloudApi.CrispIntegration

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **String** | ID интеграции | 
**accountId** | **String** | Логин аккаунта, которому принадлежит интеграция | 
**agentId** | **Number** | ID агента | 
**websiteId** | **String** | Website ID сайта в Crisp | 
**webhookSecret** | **String** | Секрет вебхука — последний сегмент адреса вебхука, который нужно добавить в Crisp: &#x60;https://api.timeweb.cloud/api/v1/crisp/{website_id}/webhook/{webhook_secret}&#x60; | 
**status** | **String** | Статус интеграции: &#x60;pending&#x60; — ожидает подключения, &#x60;active&#x60; — работает, &#x60;error&#x60; — ошибка подключения | 
**createdAt** | **Date** | Дата и время создания | 
**updatedAt** | **Date** | Дата и время последнего обновления | 



## Enum: StatusEnum


* `pending` (value: `"pending"`)

* `active` (value: `"active"`)

* `error` (value: `"error"`)




