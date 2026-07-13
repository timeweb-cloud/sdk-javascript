# TimewebCloudApi.RestorePoint

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** | ID снапшота. | 
**createdAt** | **Date** | Дата и время создания снапшота в формате ISO 8601. | 
**expiredAt** | **Date** | Дата и время истечения снапшота в формате ISO 8601. | 
**status** | **String** | Статус снапшота.  - &#x60;creating&#x60; — создаётся; - &#x60;created&#x60; — создан; - &#x60;committed&#x60; — зафиксирован; - &#x60;rolled_back&#x60; — откачен; - &#x60;error&#x60; — ошибка; - &#x60;deleted&#x60; — удалён. | 
**vdsId** | **Number** | ID облачного сервера (VDS), к которому относится снапшот. | 
**accountId** | **String** | ID аккаунта-владельца снапшота. | 



## Enum: StatusEnum


* `creating` (value: `"creating"`)

* `created` (value: `"created"`)

* `committed` (value: `"committed"`)

* `rolled_back` (value: `"rolled_back"`)

* `error` (value: `"error"`)

* `deleted` (value: `"deleted"`)




