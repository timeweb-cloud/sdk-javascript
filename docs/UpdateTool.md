# TimewebCloudApi.UpdateTool

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **String** | Название инструмента | [optional] 
**description** | **String** | Описание инструмента | [optional] 
**type** | **String** | Тип инструмента | [optional] 
**protocol** | **String** | Транспорт MCP | [optional] 
**url** | **String** | Адрес MCP-сервера. Список методов при смене адреса не обновляется — вызовите обновление методов | [optional] 
**authData** | [**ToolAuthData**](ToolAuthData.md) |  | [optional] 
**status** | **String** | Статус инструмента. Чтобы временно выключить инструмент у всех агентов, передайте &#x60;inactive&#x60;, чтобы включить — &#x60;active&#x60; | [optional] 



## Enum: TypeEnum


* `MCP` (value: `"MCP"`)





## Enum: ProtocolEnum


* `http` (value: `"http"`)

* `sse` (value: `"sse"`)





## Enum: StatusEnum


* `active` (value: `"active"`)

* `inactive` (value: `"inactive"`)

* `pending_auth` (value: `"pending_auth"`)




