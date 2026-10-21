# TimewebCloudApi.Tool

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** | ID инструмента | 
**accountId** | **String** | Логин аккаунта-владельца | 
**templateId** | **Number** | ID шаблона маркетплейса, из которого установлен инструмент. &#x60;null&#x60; — собственный MCP-сервер | 
**key** | **String** | Ключ шаблона маркетплейса. Сейчас в ответах не возвращается | [optional] 
**name** | **String** | Название инструмента | 
**description** | **String** | Описание инструмента | 
**type** | **String** | Тип инструмента. У инструментов из шаблонов может быть &#x60;null&#x60; | 
**protocol** | **String** | Транспорт MCP: &#x60;http&#x60; — Streamable HTTP, &#x60;sse&#x60; — Server-Sent Events. У инструментов из шаблонов всегда &#x60;null&#x60; | 
**url** | **String** | Адрес MCP-сервера. У инструментов из шаблонов всегда &#x60;null&#x60; | 
**methods** | [**[ToolMethod]**](ToolMethod.md) | Методы MCP-сервера. &#x60;null&#x60; или пустой массив — методы ещё не получены, например до завершения OAuth2-авторизации | 
**authData** | [**ToolAuthData**](ToolAuthData.md) |  | 
**status** | **String** | Статус инструмента: &#x60;active&#x60; — работает, &#x60;inactive&#x60; — выключен вручную, &#x60;pending_auth&#x60; — ожидает OAuth2-авторизации, &#x60;error&#x60; — последнее обновление методов завершилось ошибкой (причина в &#x60;status_info&#x60;). Агент вызывает только инструменты в статусе &#x60;active&#x60; | 
**statusInfo** | **String** | Причина статуса &#x60;error&#x60; | 
**createdAt** | **Date** | Дата и время создания | 
**updatedAt** | **Date** | Дата и время последнего изменения | 



## Enum: TypeEnum


* `MCP` (value: `"MCP"`)

* `null` (value: `"null"`)





## Enum: ProtocolEnum


* `http` (value: `"http"`)

* `sse` (value: `"sse"`)

* `null` (value: `"null"`)





## Enum: StatusEnum


* `active` (value: `"active"`)

* `inactive` (value: `"inactive"`)

* `pending_auth` (value: `"pending_auth"`)

* `error` (value: `"error"`)




