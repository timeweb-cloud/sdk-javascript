# TimewebCloudApi.CreateTool

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **String** | Название инструмента | 
**description** | **String** | Описание инструмента | [optional] 
**type** | **String** | Тип инструмента. Поддерживается только &#x60;MCP&#x60; | 
**protocol** | **String** | Транспорт MCP: &#x60;http&#x60; — Streamable HTTP, &#x60;sse&#x60; — Server-Sent Events | 
**url** | **String** | Адрес MCP-сервера. Сервер должен быть доступен из интернета | 
**authData** | [**ToolAuthData**](ToolAuthData.md) |  | [optional] 



## Enum: TypeEnum


* `MCP` (value: `"MCP"`)





## Enum: ProtocolEnum


* `http` (value: `"http"`)

* `sse` (value: `"sse"`)




