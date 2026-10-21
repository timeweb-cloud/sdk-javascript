# TimewebCloudApi.JsonRpcRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**jsonrpc** | **String** | Версия протокола JSON-RPC, всегда &#x60;2.0&#x60; | 
**id** | **String** | ID запроса, выбранный клиентом; ответ приходит с тем же ID | 
**method** | **String** | Метод MCP | 
**params** | [**InitializeParams**](InitializeParams.md) |  | [optional] 



## Enum: JsonrpcEnum


* `2.0` (value: `"2.0"`)





## Enum: MethodEnum


* `initialize` (value: `"initialize"`)

* `ping` (value: `"ping"`)

* `tools/list` (value: `"tools/list"`)

* `tools/call` (value: `"tools/call"`)

* `resources/list` (value: `"resources/list"`)

* `resources/read` (value: `"resources/read"`)




