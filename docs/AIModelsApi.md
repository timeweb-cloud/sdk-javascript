# TimewebCloudApi.AIModelsApi

All URIs are relative to *https://api.timeweb.cloud*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getAgentsTokenPackages**](AIModelsApi.md#getAgentsTokenPackages) | **GET** /api/v1/cloud-ai/token-packages/agents | Получение списка пакетов токенов для агентов
[**getKnowledgebasesTokenPackages**](AIModelsApi.md#getKnowledgebasesTokenPackages) | **GET** /api/v1/cloud-ai/token-packages/knowledge-bases | Получение списка пакетов токенов для баз знаний
[**getModels**](AIModelsApi.md#getModels) | **GET** /api/v1/cloud-ai/models | Получение списка моделей



## getAgentsTokenPackages

> GetAgentsTokenPackages200Response getAgentsTokenPackages()

Получение списка пакетов токенов для агентов

Чтобы получить список доступных пакетов токенов для AI агентов, отправьте GET-запрос на &#x60;/api/v1/cloud-ai/token-packages/agents&#x60;.  Тело ответа будет представлять собой объект JSON с ключом &#x60;token_packages&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AIModelsApi();
apiInstance.getAgentsTokenPackages((error, data, response) => {
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

[**GetAgentsTokenPackages200Response**](GetAgentsTokenPackages200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getKnowledgebasesTokenPackages

> GetAgentsTokenPackages200Response getKnowledgebasesTokenPackages()

Получение списка пакетов токенов для баз знаний

Чтобы получить список доступных пакетов токенов для баз знаний, отправьте GET-запрос на &#x60;/api/v1/cloud-ai/token-packages/knowledge-bases&#x60;.  Тело ответа будет представлять собой объект JSON с ключом &#x60;token_packages&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AIModelsApi();
apiInstance.getKnowledgebasesTokenPackages((error, data, response) => {
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

[**GetAgentsTokenPackages200Response**](GetAgentsTokenPackages200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getModels

> GetModels200Response getModels()

Получение списка моделей

Чтобы получить список доступных AI моделей, отправьте GET-запрос на &#x60;/api/v1/cloud-ai/models&#x60;.  Тело ответа будет представлять собой объект JSON с ключом &#x60;models&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AIModelsApi();
apiInstance.getModels((error, data, response) => {
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

[**GetModels200Response**](GetModels200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

