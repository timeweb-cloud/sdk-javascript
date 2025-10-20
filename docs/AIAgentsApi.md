# TimewebCloudApi.AIAgentsApi

All URIs are relative to *https://api.timeweb.cloud*

Method | HTTP request | Description
------------- | ------------- | -------------
[**addAdditionalTokenPackage**](AIAgentsApi.md#addAdditionalTokenPackage) | **POST** /api/v1/cloud-ai/agents/{id}/add-additional-token-package | Добавление дополнительного пакета токенов
[**createAgent**](AIAgentsApi.md#createAgent) | **POST** /api/v1/cloud-ai/agents | Создание AI агента
[**deleteAgent**](AIAgentsApi.md#deleteAgent) | **DELETE** /api/v1/cloud-ai/agents/{id} | Удаление AI агента
[**getAgent**](AIAgentsApi.md#getAgent) | **GET** /api/v1/cloud-ai/agents/{id} | Получение AI агента
[**getAgentStatistics**](AIAgentsApi.md#getAgentStatistics) | **GET** /api/v1/cloud-ai/agents/{id}/statistic | Получение статистики использования токенов агента
[**getAgents**](AIAgentsApi.md#getAgents) | **GET** /api/v1/cloud-ai/agents | Получение списка AI агентов
[**updateAgent**](AIAgentsApi.md#updateAgent) | **PATCH** /api/v1/cloud-ai/agents/{id} | Обновление AI агента



## addAdditionalTokenPackage

> addAdditionalTokenPackage(id, opts)

Добавление дополнительного пакета токенов

Чтобы добавить дополнительный пакет токенов для AI агента, отправьте POST-запрос на &#x60;/api/v1/cloud-ai/agents/{id}/add-additional-token-package&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AIAgentsApi();
let id = 1; // Number | ID агента
let opts = {
  'addTokenPackage': new TimewebCloudApi.AddTokenPackage() // AddTokenPackage | 
};
apiInstance.addAdditionalTokenPackage(id, opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **Number**| ID агента | 
 **addTokenPackage** | [**AddTokenPackage**](AddTokenPackage.md)|  | [optional] 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## createAgent

> CreateAgent201Response createAgent(createAgent)

Создание AI агента

Чтобы создать AI агента, отправьте POST-запрос на &#x60;/api/v1/cloud-ai/agents&#x60;, задав необходимые атрибуты.  Агент будет создан с использованием предоставленной информации. Тело ответа будет содержать объект JSON с информацией о созданном агенте.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AIAgentsApi();
let createAgent = new TimewebCloudApi.CreateAgent(); // CreateAgent | 
apiInstance.createAgent(createAgent, (error, data, response) => {
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
 **createAgent** | [**CreateAgent**](CreateAgent.md)|  | 

### Return type

[**CreateAgent201Response**](CreateAgent201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deleteAgent

> deleteAgent(id)

Удаление AI агента

Чтобы удалить AI агента, отправьте DELETE-запрос на &#x60;/api/v1/cloud-ai/agents/{id}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AIAgentsApi();
let id = 1; // Number | ID агента
apiInstance.deleteAgent(id, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **Number**| ID агента | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getAgent

> CreateAgent201Response getAgent(id)

Получение AI агента

Чтобы получить информацию об AI агенте, отправьте GET-запрос на &#x60;/api/v1/cloud-ai/agents/{id}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AIAgentsApi();
let id = 1; // Number | ID агента
apiInstance.getAgent(id, (error, data, response) => {
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
 **id** | **Number**| ID агента | 

### Return type

[**CreateAgent201Response**](CreateAgent201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getAgentStatistics

> GetAgentStatistics200Response getAgentStatistics(id, opts)

Получение статистики использования токенов агента

Чтобы получить статистику использования токенов AI агента, отправьте GET-запрос на &#x60;/api/v1/cloud-ai/agents/{id}/statistic&#x60;.  Можно указать временной диапазон и интервал агрегации.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AIAgentsApi();
let id = 1; // Number | ID агента
let opts = {
  'startTime': 2024-10-01T00:00Z, // Date | Начало временного диапазона (ISO 8601)
  'endTime': 2024-10-16T23:59:59.999Z, // Date | Конец временного диапазона (ISO 8601)
  'interval': 60 // Number | Интервал в минутах (по умолчанию 60)
};
apiInstance.getAgentStatistics(id, opts, (error, data, response) => {
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
 **id** | **Number**| ID агента | 
 **startTime** | **Date**| Начало временного диапазона (ISO 8601) | [optional] 
 **endTime** | **Date**| Конец временного диапазона (ISO 8601) | [optional] 
 **interval** | **Number**| Интервал в минутах (по умолчанию 60) | [optional] [default to 60]

### Return type

[**GetAgentStatistics200Response**](GetAgentStatistics200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getAgents

> GetAgents200Response getAgents()

Получение списка AI агентов

Чтобы получить список AI агентов, отправьте GET-запрос на &#x60;/api/v1/cloud-ai/agents&#x60;.  Тело ответа будет представлять собой объект JSON с ключом &#x60;agents&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AIAgentsApi();
apiInstance.getAgents((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**GetAgents200Response**](GetAgents200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## updateAgent

> CreateAgent201Response updateAgent(id, updateAgent)

Обновление AI агента

Чтобы обновить AI агента, отправьте PATCH-запрос на &#x60;/api/v1/cloud-ai/agents/{id}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AIAgentsApi();
let id = 1; // Number | ID агента
let updateAgent = new TimewebCloudApi.UpdateAgent(); // UpdateAgent | 
apiInstance.updateAgent(id, updateAgent, (error, data, response) => {
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
 **id** | **Number**| ID агента | 
 **updateAgent** | [**UpdateAgent**](UpdateAgent.md)|  | 

### Return type

[**CreateAgent201Response**](CreateAgent201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

