# TimewebCloudApi.AIModelsApi

All URIs are relative to *https://api.timeweb.cloud*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getAgentsTokenPackages**](AIModelsApi.md#getAgentsTokenPackages) | **GET** /api/v1/cloud-ai/token-packages/agents | Получение списка пакетов токенов для агентов
[**getAiModelParameters**](AIModelsApi.md#getAiModelParameters) | **GET** /api/v3/cloud-ai/model-parameters | Получение справочника характеристик моделей
[**getAiModelTokenPackages**](AIModelsApi.md#getAiModelTokenPackages) | **GET** /api/v1/cloud-ai/models/{id}/token-packages | Получение пакетов токенов модели
[**getAiProvider**](AIModelsApi.md#getAiProvider) | **GET** /api/v1/cloud-ai/providers/{id} | Получение провайдера моделей
[**getAiProviders**](AIModelsApi.md#getAiProviders) | **GET** /api/v1/cloud-ai/providers | Получение списка провайдеров моделей
[**getKnowledgebasesTokenPackages**](AIModelsApi.md#getKnowledgebasesTokenPackages) | **GET** /api/v1/cloud-ai/token-packages/knowledge-bases | Получение списка пакетов токенов для баз знаний
[**getModels**](AIModelsApi.md#getModels) | **GET** /api/v1/cloud-ai/models | Получение списка моделей (v1)
[**getModelsV3**](AIModelsApi.md#getModelsV3) | **GET** /api/v3/cloud-ai/models | Получение списка моделей



## getAgentsTokenPackages

> GetAgentsTokenPackages200Response getAgentsTokenPackages()

Получение списка пакетов токенов для агентов

Метод устарел.  Чтобы получить список пакетов токенов для AI агентов всех моделей, отправьте GET-запрос на &#x60;/api/v1/cloud-ai/token-packages/agents&#x60;.  Тело ответа будет представлять собой объект JSON с ключами &#x60;token_packages&#x60; и &#x60;meta&#x60;.

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


## getAiModelParameters

> GetAiModelParameters200Response getAiModelParameters()

Получение справочника характеристик моделей

Чтобы получить справочник характеристик, которые возвращаются в &#x60;parameter_values&#x60; моделей, отправьте GET-запрос на &#x60;/api/v3/cloud-ai/model-parameters&#x60;.  Справочник описывает название, тип, единицу измерения и направление сравнения каждой характеристики. Цены кэша (&#x60;cost_cache_read&#x60;, &#x60;cost_cache_write&#x60;) в справочник не входят.  Тело ответа будет представлять собой объект JSON с ключами &#x60;model_parameters&#x60; и &#x60;meta&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AIModelsApi();
apiInstance.getAiModelParameters((error, data, response) => {
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

[**GetAiModelParameters200Response**](GetAiModelParameters200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getAiModelTokenPackages

> GetAiModelTokenPackages200Response getAiModelTokenPackages(id)

Получение пакетов токенов модели

Чтобы получить пакеты токенов, доступные для AI модели, отправьте GET-запрос на &#x60;/api/v1/cloud-ai/models/{id}/token-packages&#x60;.  Тело ответа будет представлять собой объект JSON с ключами &#x60;token_packages&#x60; и &#x60;meta&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AIModelsApi();
let id = 17; // Number | ID модели
apiInstance.getAiModelTokenPackages(id, (error, data, response) => {
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
 **id** | **Number**| ID модели | 

### Return type

[**GetAiModelTokenPackages200Response**](GetAiModelTokenPackages200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getAiProvider

> GetAiProvider200Response getAiProvider(id)

Получение провайдера моделей

Чтобы получить информацию о провайдере AI моделей, отправьте GET-запрос на &#x60;/api/v1/cloud-ai/providers/{id}&#x60;.  Тело ответа будет представлять собой объект JSON с ключом &#x60;provider&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AIModelsApi();
let id = 1; // Number | ID провайдера
apiInstance.getAiProvider(id, (error, data, response) => {
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
 **id** | **Number**| ID провайдера | 

### Return type

[**GetAiProvider200Response**](GetAiProvider200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getAiProviders

> GetAiProviders200Response getAiProviders()

Получение списка провайдеров моделей

Чтобы получить список провайдеров AI моделей, отправьте GET-запрос на &#x60;/api/v1/cloud-ai/providers&#x60;.  Провайдер модели — поле &#x60;provider_id&#x60; модели.  Тело ответа будет представлять собой объект JSON с ключами &#x60;providers&#x60; и &#x60;meta&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AIModelsApi();
apiInstance.getAiProviders((error, data, response) => {
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

[**GetAiProviders200Response**](GetAiProviders200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getKnowledgebasesTokenPackages

> GetKnowledgebasesTokenPackages200Response getKnowledgebasesTokenPackages()

Получение списка пакетов токенов для баз знаний

Чтобы получить список пакетов токенов для баз знаний, отправьте GET-запрос на &#x60;/api/v1/cloud-ai/token-packages/knowledge-bases&#x60;.  Базовый пакет (&#x60;package_type: base&#x60;) указывается при создании базы знаний, дополнительный (&#x60;package_type: additional&#x60;) покупается через &#x60;POST /api/v1/cloud-ai/knowledge-bases/{id}/add-additional-token-package&#x60;.  Тело ответа будет представлять собой объект JSON с ключами &#x60;token_packages&#x60; и &#x60;meta&#x60;.

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

[**GetKnowledgebasesTokenPackages200Response**](GetKnowledgebasesTokenPackages200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getModels

> GetModels200Response getModels()

Получение списка моделей (v1)

Метод устарел — используйте &#x60;GET /api/v3/cloud-ai/models&#x60;.  Чтобы получить список AI моделей, отправьте GET-запрос на &#x60;/api/v1/cloud-ai/models&#x60;.  Тело ответа будет представлять собой объект JSON с ключами &#x60;models&#x60; и &#x60;meta&#x60;.

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


## getModelsV3

> GetModelsV3200Response getModelsV3()

Получение списка моделей

Чтобы получить список AI моделей с ценами и характеристиками, отправьте GET-запрос на &#x60;/api/v3/cloud-ai/models&#x60;.  Цены и характеристики (контекст, модальности, индексы качества) возвращаются в словаре &#x60;parameter_values&#x60;, их названия и единицы — в справочнике &#x60;GET /api/v3/cloud-ai/model-parameters&#x60;. В списке есть и устаревшие модели — проверяйте &#x60;is_deprecated&#x60; и &#x60;is_stopped&#x60;.  Тело ответа будет представлять собой объект JSON с ключами &#x60;models&#x60; и &#x60;meta&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AIModelsApi();
apiInstance.getModelsV3((error, data, response) => {
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

[**GetModelsV3200Response**](GetModelsV3200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

