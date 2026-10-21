# TimewebCloudApi.MCPApi

All URIs are relative to *https://api.timeweb.cloud*

Method | HTTP request | Description
------------- | ------------- | -------------
[**deleteMcpSearchSession**](MCPApi.md#deleteMcpSearchSession) | **DELETE** /api/v1/mcp/search | Завершение сессии сервера MCP с поиском инструментов
[**deleteMcpSession**](MCPApi.md#deleteMcpSession) | **DELETE** /api/v1/mcp | Завершение сессии сервера MCP
[**openMcpSearchStream**](MCPApi.md#openMcpSearchStream) | **GET** /api/v1/mcp/search | Открытие потока событий сервера MCP с поиском инструментов
[**openMcpStream**](MCPApi.md#openMcpStream) | **GET** /api/v1/mcp | Открытие потока событий сервера MCP
[**sendMcpMessage**](MCPApi.md#sendMcpMessage) | **POST** /api/v1/mcp | Отправка JSON-RPC-сообщения серверу MCP
[**sendMcpSearchMessage**](MCPApi.md#sendMcpSearchMessage) | **POST** /api/v1/mcp/search | Отправка JSON-RPC-сообщения серверу MCP с поиском инструментов



## deleteMcpSearchSession

> deleteMcpSearchSession()

Завершение сессии сервера MCP с поиском инструментов

Чтобы завершить сессию сервера MCP &#x60;timeweb-cloud-mcp-search&#x60;, отправьте DELETE-запрос на &#x60;/api/v1/mcp/search&#x60;.  Сервер не хранит сессий (не выдаёт &#x60;Mcp-Session-Id&#x60;), поэтому завершать нечего: ответ всегда 200 без тела.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.MCPApi();
apiInstance.deleteMcpSearchSession((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## deleteMcpSession

> deleteMcpSession()

Завершение сессии сервера MCP

Чтобы завершить сессию сервера MCP &#x60;timeweb-cloud-mcp&#x60;, отправьте DELETE-запрос на &#x60;/api/v1/mcp&#x60;.  Сервер не хранит сессий (не выдаёт &#x60;Mcp-Session-Id&#x60;), поэтому завершать нечего: ответ всегда 200 без тела.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.MCPApi();
apiInstance.deleteMcpSession((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## openMcpSearchStream

> String openMcpSearchStream(accept, opts)

Открытие потока событий сервера MCP с поиском инструментов

Чтобы открыть поток сообщений, которые сервер MCP &#x60;timeweb-cloud-mcp-search&#x60; отправляет по своей инициативе, отправьте GET-запрос на &#x60;/api/v1/mcp/search&#x60;.  Сервер не отправляет сообщений по своей инициативе, поэтому поток не содержит событий и остаётся открытым, пока его не закроет шлюз. Через шлюз заголовки ответа на этот запрос могут долго не приходить. Открывать поток не нужно: работайте с сервером только POST-запросами — если клиент позволяет выбрать режим, отключите в нём GET-поток.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.MCPApi();
let accept = text/event-stream; // String | Должен содержать `text/event-stream`, иначе сервер ответит 406
let opts = {
  'mCPProtocolVersion': 2025-06-18 // String | Версия протокола, согласованная в `initialize`. Неподдерживаемое значение — ответ 400
};
apiInstance.openMcpSearchStream(accept, opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **accept** | **String**| Должен содержать &#x60;text/event-stream&#x60;, иначе сервер ответит 406 | 
 **mCPProtocolVersion** | **String**| Версия протокола, согласованная в &#x60;initialize&#x60;. Неподдерживаемое значение — ответ 400 | [optional] 

### Return type

**String**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/event-stream, application/json


## openMcpStream

> String openMcpStream(accept, opts)

Открытие потока событий сервера MCP

Чтобы открыть поток сообщений, которые сервер MCP &#x60;timeweb-cloud-mcp&#x60; отправляет по своей инициативе, отправьте GET-запрос на &#x60;/api/v1/mcp&#x60;.  Сервер не отправляет сообщений по своей инициативе, поэтому поток не содержит событий и остаётся открытым, пока его не закроет шлюз. Через шлюз заголовки ответа на этот запрос могут долго не приходить. Открывать поток не нужно: работайте с сервером только POST-запросами — если клиент позволяет выбрать режим, отключите в нём GET-поток.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.MCPApi();
let accept = text/event-stream; // String | Должен содержать `text/event-stream`, иначе сервер ответит 406
let opts = {
  'mCPProtocolVersion': 2025-06-18 // String | Версия протокола, согласованная в `initialize`. Неподдерживаемое значение — ответ 400
};
apiInstance.openMcpStream(accept, opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **accept** | **String**| Должен содержать &#x60;text/event-stream&#x60;, иначе сервер ответит 406 | 
 **mCPProtocolVersion** | **String**| Версия протокола, согласованная в &#x60;initialize&#x60;. Неподдерживаемое значение — ответ 400 | [optional] 

### Return type

**String**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/event-stream, application/json


## sendMcpMessage

> JsonRpcResultResponse sendMcpMessage(accept, jsonRpcRequest, opts)

Отправка JSON-RPC-сообщения серверу MCP

Чтобы отправить запрос или уведомление серверу MCP &#x60;timeweb-cloud-mcp&#x60;, отправьте POST-запрос на &#x60;/api/v1/mcp&#x60; с сообщением JSON-RPC 2.0 в теле.  Через этот метод идут все запросы MCP: &#x60;initialize&#x60;, &#x60;tools/list&#x60; (все инструменты сразу), &#x60;tools/call&#x60;, &#x60;resources/list&#x60;, &#x60;resources/read&#x60;, &#x60;ping&#x60;. Ответ на запрос приходит потоком &#x60;text/event-stream&#x60; с одним событием &#x60;message&#x60;, уведомление принимается с кодом 202 без тела. Изменяющие инструменты выполняются в два вызова с &#x60;confirm_token&#x60; — см. описание раздела.  Заголовки &#x60;x-tool-access&#x60; и &#x60;x-allowed-tools&#x60; здесь не действуют — используйте &#x60;/api/v1/mcp/search&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.MCPApi();
let accept = application/json, text/event-stream; // String | Должен содержать и `application/json`, и `text/event-stream`, иначе сервер ответит 406
let jsonRpcRequest = {"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-06-18","capabilities":{},"clientInfo":{"name":"my-agent","version":"1.0.0"}}}; // JsonRpcRequest | 
let opts = {
  'mCPProtocolVersion': 2025-06-18, // String | Версия протокола, согласованная в `initialize`. Неподдерживаемое значение — ответ 400
  'xMcpConfirmationUi': text // String | Как `request_user_confirmation` спрашивает пользователя. `text` (по умолчанию) — пользователь отвечает в чате, на `/api/v1/mcp` инструмент в этом режиме не выводится. `buttons` — инструмент возвращает `ui_action` с кнопками для клиентов, которые умеют их показывать. Регистр не важен, другие значения игнорируются
};
apiInstance.sendMcpMessage(accept, jsonRpcRequest, opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **accept** | **String**| Должен содержать и &#x60;application/json&#x60;, и &#x60;text/event-stream&#x60;, иначе сервер ответит 406 | 
 **jsonRpcRequest** | [**JsonRpcRequest**](JsonRpcRequest.md)|  | 
 **mCPProtocolVersion** | **String**| Версия протокола, согласованная в &#x60;initialize&#x60;. Неподдерживаемое значение — ответ 400 | [optional] 
 **xMcpConfirmationUi** | **String**| Как &#x60;request_user_confirmation&#x60; спрашивает пользователя. &#x60;text&#x60; (по умолчанию) — пользователь отвечает в чате, на &#x60;/api/v1/mcp&#x60; инструмент в этом режиме не выводится. &#x60;buttons&#x60; — инструмент возвращает &#x60;ui_action&#x60; с кнопками для клиентов, которые умеют их показывать. Регистр не важен, другие значения игнорируются | [optional] 

### Return type

[**JsonRpcResultResponse**](JsonRpcResultResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/event-stream, application/json


## sendMcpSearchMessage

> JsonRpcResultResponse sendMcpSearchMessage(accept, jsonRpcRequest, opts)

Отправка JSON-RPC-сообщения серверу MCP с поиском инструментов

Чтобы отправить запрос или уведомление серверу MCP &#x60;timeweb-cloud-mcp-search&#x60;, отправьте POST-запрос на &#x60;/api/v1/mcp/search&#x60; с сообщением JSON-RPC 2.0 в теле.  &#x60;tools/list&#x60; возвращает четыре инструмента: &#x60;search_tools&#x60;, &#x60;get_tool_definition&#x60;, &#x60;execute_tool&#x60; и &#x60;request_user_confirmation&#x60;. Все операции облака находятся через &#x60;search_tools&#x60; и выполняются через &#x60;execute_tool&#x60;; изменяющие операции — в два вызова &#x60;execute_tool&#x60; с &#x60;confirm_token&#x60; внутри &#x60;arguments&#x60;.  Доступ модели можно сузить заголовками &#x60;x-tool-access&#x60; и &#x60;x-allowed-tools&#x60;. Недопустимое значение &#x60;x-tool-access&#x60; — ответ 400 с ошибкой &#x60;-32600&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.MCPApi();
let accept = application/json, text/event-stream; // String | Должен содержать и `application/json`, и `text/event-stream`, иначе сервер ответит 406
let jsonRpcRequest = {"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-06-18","capabilities":{},"clientInfo":{"name":"my-agent","version":"1.0.0"}}}; // JsonRpcRequest | 
let opts = {
  'mCPProtocolVersion': 2025-06-18, // String | Версия протокола, согласованная в `initialize`. Неподдерживаемое значение — ответ 400
  'xToolAccess': read-only, // String | Только операции чтения: поиск и определения пропускают изменяющие инструменты, а `execute_tool` отказывает с `tool_not_allowed`. Единственное допустимое значение — `read-only` (регистр не важен); любое другое, в том числе пустое, — ответ 400 с ошибкой `-32600`
  'xAllowedTools': list_servers,get_server,server_action, // String | Имена разрешённых операций через запятую — все остальные недоступны. Неизвестные имена игнорируются, пустое значение не разрешает ничего. Вместе с `x-tool-access` операция должна пройти оба ограничения
  'xMcpConfirmationUi': text // String | Как `request_user_confirmation` спрашивает пользователя. `text` (по умолчанию) — пользователь отвечает в чате, на `/api/v1/mcp` инструмент в этом режиме не выводится. `buttons` — инструмент возвращает `ui_action` с кнопками для клиентов, которые умеют их показывать. Регистр не важен, другие значения игнорируются
};
apiInstance.sendMcpSearchMessage(accept, jsonRpcRequest, opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **accept** | **String**| Должен содержать и &#x60;application/json&#x60;, и &#x60;text/event-stream&#x60;, иначе сервер ответит 406 | 
 **jsonRpcRequest** | [**JsonRpcRequest**](JsonRpcRequest.md)|  | 
 **mCPProtocolVersion** | **String**| Версия протокола, согласованная в &#x60;initialize&#x60;. Неподдерживаемое значение — ответ 400 | [optional] 
 **xToolAccess** | **String**| Только операции чтения: поиск и определения пропускают изменяющие инструменты, а &#x60;execute_tool&#x60; отказывает с &#x60;tool_not_allowed&#x60;. Единственное допустимое значение — &#x60;read-only&#x60; (регистр не важен); любое другое, в том числе пустое, — ответ 400 с ошибкой &#x60;-32600&#x60; | [optional] 
 **xAllowedTools** | **String**| Имена разрешённых операций через запятую — все остальные недоступны. Неизвестные имена игнорируются, пустое значение не разрешает ничего. Вместе с &#x60;x-tool-access&#x60; операция должна пройти оба ограничения | [optional] 
 **xMcpConfirmationUi** | **String**| Как &#x60;request_user_confirmation&#x60; спрашивает пользователя. &#x60;text&#x60; (по умолчанию) — пользователь отвечает в чате, на &#x60;/api/v1/mcp&#x60; инструмент в этом режиме не выводится. &#x60;buttons&#x60; — инструмент возвращает &#x60;ui_action&#x60; с кнопками для клиентов, которые умеют их показывать. Регистр не важен, другие значения игнорируются | [optional] 

### Return type

[**JsonRpcResultResponse**](JsonRpcResultResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/event-stream, application/json

