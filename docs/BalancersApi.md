# TimewebCloudApi.BalancersApi

All URIs are relative to *https://api.timeweb.cloud*

Method | HTTP request | Description
------------- | ------------- | -------------
[**addIPsToBalancer**](BalancersApi.md#addIPsToBalancer) | **POST** /api/v1/balancers/{balancer_id}/ips | Добавление IP-адресов к балансировщику
[**createBalancer**](BalancersApi.md#createBalancer) | **POST** /api/v1/balancers | Создание бaлансировщика
[**createBalancerRule**](BalancersApi.md#createBalancerRule) | **POST** /api/v1/balancers/{balancer_id}/rules | Создание правила для балансировщика
[**deleteBalancer**](BalancersApi.md#deleteBalancer) | **DELETE** /api/v1/balancers/{balancer_id} | Удаление балансировщика
[**deleteBalancerRule**](BalancersApi.md#deleteBalancerRule) | **DELETE** /api/v1/balancers/{balancer_id}/rules/{rule_id} | Удаление правила для балансировщика
[**deleteIPsFromBalancer**](BalancersApi.md#deleteIPsFromBalancer) | **DELETE** /api/v1/balancers/{balancer_id}/ips | Удаление IP-адресов из балансировщика
[**getBalancer**](BalancersApi.md#getBalancer) | **GET** /api/v1/balancers/{balancer_id} | Получение бaлансировщика
[**getBalancerIPs**](BalancersApi.md#getBalancerIPs) | **GET** /api/v1/balancers/{balancer_id}/ips | Получение списка IP-адресов балансировщика
[**getBalancerRules**](BalancersApi.md#getBalancerRules) | **GET** /api/v1/balancers/{balancer_id}/rules | Получение правил балансировщика
[**getBalancers**](BalancersApi.md#getBalancers) | **GET** /api/v1/balancers | Получение списка всех бaлансировщиков
[**getBalancersPresets**](BalancersApi.md#getBalancersPresets) | **GET** /api/v1/presets/balancers | Получение списка тарифов для балансировщика
[**updateBalancer**](BalancersApi.md#updateBalancer) | **PATCH** /api/v1/balancers/{balancer_id} | Обновление балансировщика
[**updateBalancerRule**](BalancersApi.md#updateBalancerRule) | **PATCH** /api/v1/balancers/{balancer_id}/rules/{rule_id} | Обновление правила для балансировщика



## addIPsToBalancer

> addIPsToBalancer(balancerId, addIPsToBalancerRequest)

Добавление IP-адресов к балансировщику

Чтобы добавить &#x60;IP&#x60;-адреса к балансировщику, отправьте запрос POST в &#x60;api/v1/balancers/{balancer_id}/ips&#x60;. 

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.BalancersApi();
let balancerId = 56; // Number | ID балансировщика
let addIPsToBalancerRequest = new TimewebCloudApi.AddIPsToBalancerRequest(); // AddIPsToBalancerRequest | 
apiInstance.addIPsToBalancer(balancerId, addIPsToBalancerRequest, (error, data, response) => {
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
 **balancerId** | **Number**| ID балансировщика | 
 **addIPsToBalancerRequest** | [**AddIPsToBalancerRequest**](AddIPsToBalancerRequest.md)|  | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## createBalancer

> CreateBalancer200Response createBalancer(createBalancer)

Создание бaлансировщика

Чтобы создать бaлансировщик на вашем аккаунте, отправьте POST-запрос на &#x60;/api/v1/balancers&#x60;, задав необходимые атрибуты.  Балансировщик будет создан с использованием предоставленной информации. Тело ответа будет содержать объект JSON с информацией о созданном балансировщике.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.BalancersApi();
let createBalancer = new TimewebCloudApi.CreateBalancer(); // CreateBalancer | 
apiInstance.createBalancer(createBalancer, (error, data, response) => {
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
 **createBalancer** | [**CreateBalancer**](CreateBalancer.md)|  | 

### Return type

[**CreateBalancer200Response**](CreateBalancer200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## createBalancerRule

> CreateBalancerRule200Response createBalancerRule(balancerId, createRule)

Создание правила для балансировщика

Чтобы создать правило для балансировщика, отправьте запрос POST в &#x60;api/v1/balancers/{balancer_id}/rules&#x60;. 

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.BalancersApi();
let balancerId = 56; // Number | ID балансировщика
let createRule = new TimewebCloudApi.CreateRule(); // CreateRule | 
apiInstance.createBalancerRule(balancerId, createRule, (error, data, response) => {
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
 **balancerId** | **Number**| ID балансировщика | 
 **createRule** | [**CreateRule**](CreateRule.md)|  | 

### Return type

[**CreateBalancerRule200Response**](CreateBalancerRule200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deleteBalancer

> DeleteBalancer200Response deleteBalancer(balancerId, opts)

Удаление балансировщика

Чтобы удалить балансировщик, отправьте запрос DELETE в &#x60;api/v1/balancers/{balancer_id}&#x60;. 

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.BalancersApi();
let balancerId = 56; // Number | ID балансировщика
let opts = {
  'hash': 15095f25-aac3-4d60-a788-96cb5136f186, // String | Хеш, который совместно с кодом авторизации надо отправить для удаления, если включено подтверждение удаления сервисов через Телеграм.
  'code': 0000 // String | Код подтверждения, который придет к вам в Телеграм, после запроса удаления, если включено подтверждение удаления сервисов.  При помощи API токена сервисы можно удалять без подтверждения, если параметр токена `is_able_to_delete` установлен в значение `true`
};
apiInstance.deleteBalancer(balancerId, opts, (error, data, response) => {
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
 **balancerId** | **Number**| ID балансировщика | 
 **hash** | **String**| Хеш, который совместно с кодом авторизации надо отправить для удаления, если включено подтверждение удаления сервисов через Телеграм. | [optional] 
 **code** | **String**| Код подтверждения, который придет к вам в Телеграм, после запроса удаления, если включено подтверждение удаления сервисов.  При помощи API токена сервисы можно удалять без подтверждения, если параметр токена &#x60;is_able_to_delete&#x60; установлен в значение &#x60;true&#x60; | [optional] 

### Return type

[**DeleteBalancer200Response**](DeleteBalancer200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## deleteBalancerRule

> deleteBalancerRule(balancerId, ruleId)

Удаление правила для балансировщика

Чтобы удалить правило для балансировщика, отправьте запрос DELETE в &#x60;api/v1/balancers/{balancer_id}/rules/{rule_id}&#x60;. 

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.BalancersApi();
let balancerId = 56; // Number | ID балансировщика
let ruleId = 56; // Number | ID правила для балансировщика
apiInstance.deleteBalancerRule(balancerId, ruleId, (error, data, response) => {
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
 **balancerId** | **Number**| ID балансировщика | 
 **ruleId** | **Number**| ID правила для балансировщика | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## deleteIPsFromBalancer

> deleteIPsFromBalancer(balancerId, addIPsToBalancerRequest)

Удаление IP-адресов из балансировщика

Чтобы удалить &#x60;IP&#x60;-адреса из балансировщика, отправьте запрос DELETE в &#x60;api/v1/balancers/{balancer_id}/ips&#x60;. 

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.BalancersApi();
let balancerId = 56; // Number | ID балансировщика
let addIPsToBalancerRequest = new TimewebCloudApi.AddIPsToBalancerRequest(); // AddIPsToBalancerRequest | 
apiInstance.deleteIPsFromBalancer(balancerId, addIPsToBalancerRequest, (error, data, response) => {
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
 **balancerId** | **Number**| ID балансировщика | 
 **addIPsToBalancerRequest** | [**AddIPsToBalancerRequest**](AddIPsToBalancerRequest.md)|  | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## getBalancer

> CreateBalancer200Response getBalancer(balancerId)

Получение бaлансировщика

Чтобы отобразить информацию об отдельном балансировщике, отправьте запрос GET на &#x60;api/v1/balancers/{balancer_id}&#x60;. 

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.BalancersApi();
let balancerId = 56; // Number | ID балансировщика
apiInstance.getBalancer(balancerId, (error, data, response) => {
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
 **balancerId** | **Number**| ID балансировщика | 

### Return type

[**CreateBalancer200Response**](CreateBalancer200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getBalancerIPs

> GetBalancerIPs200Response getBalancerIPs(balancerId)

Получение списка IP-адресов балансировщика

Чтобы добавить &#x60;IP&#x60;-адреса к балансировщику, отправьте запрос GET в &#x60;api/v1/balancers/{balancer_id}/ips&#x60;. 

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.BalancersApi();
let balancerId = 56; // Number | ID балансировщика
apiInstance.getBalancerIPs(balancerId, (error, data, response) => {
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
 **balancerId** | **Number**| ID балансировщика | 

### Return type

[**GetBalancerIPs200Response**](GetBalancerIPs200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getBalancerRules

> GetBalancerRules200Response getBalancerRules(balancerId)

Получение правил балансировщика

Чтобы получить правила балансировщика, отправьте запрос GET в &#x60;api/v1/balancers/{balancer_id}/rules&#x60;. 

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.BalancersApi();
let balancerId = 56; // Number | ID балансировщика
apiInstance.getBalancerRules(balancerId, (error, data, response) => {
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
 **balancerId** | **Number**| ID балансировщика | 

### Return type

[**GetBalancerRules200Response**](GetBalancerRules200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getBalancers

> GetBalancers200Response getBalancers(opts)

Получение списка всех бaлансировщиков

Чтобы получить список всех бaлансировщиков на вашем аккаунте, отправьте GET-запрос на &#x60;/api/v1/balancers&#x60;.   Тело ответа будет представлять собой объект JSON с ключом &#x60;balancers&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.BalancersApi();
let opts = {
  'limit': 100, // Number | Обозначает количество записей, которое необходимо вернуть.
  'offset': 0 // Number | Указывает на смещение относительно начала списка.
};
apiInstance.getBalancers(opts, (error, data, response) => {
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
 **limit** | **Number**| Обозначает количество записей, которое необходимо вернуть. | [optional] [default to 100]
 **offset** | **Number**| Указывает на смещение относительно начала списка. | [optional] [default to 0]

### Return type

[**GetBalancers200Response**](GetBalancers200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getBalancersPresets

> GetBalancersPresets200Response getBalancersPresets()

Получение списка тарифов для балансировщика

Чтобы получить список тарифов для балансировщика, отправьте GET-запрос на &#x60;/api/v1/presets/balancers&#x60;.   Тело ответа будет представлять собой объект JSON с ключом &#x60;balancers_presets&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.BalancersApi();
apiInstance.getBalancersPresets((error, data, response) => {
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

[**GetBalancersPresets200Response**](GetBalancersPresets200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## updateBalancer

> CreateBalancer200Response updateBalancer(balancerId, updateBalancer)

Обновление балансировщика

Чтобы обновить только определенные атрибуты балансировщика, отправьте запрос PATCH в &#x60;api/v1/balancers/{balancer_id}&#x60;. 

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.BalancersApi();
let balancerId = 56; // Number | ID балансировщика
let updateBalancer = new TimewebCloudApi.UpdateBalancer(); // UpdateBalancer | 
apiInstance.updateBalancer(balancerId, updateBalancer, (error, data, response) => {
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
 **balancerId** | **Number**| ID балансировщика | 
 **updateBalancer** | [**UpdateBalancer**](UpdateBalancer.md)|  | 

### Return type

[**CreateBalancer200Response**](CreateBalancer200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## updateBalancerRule

> CreateBalancerRule200Response updateBalancerRule(balancerId, ruleId, updateRule)

Обновление правила для балансировщика

Чтобы обновить правило для балансировщика, отправьте запрос PATCH в &#x60;api/v1/balancers/{balancer_id}/rules/{rule_id}&#x60;. 

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.BalancersApi();
let balancerId = 56; // Number | ID балансировщика
let ruleId = 56; // Number | ID правила для балансировщика
let updateRule = new TimewebCloudApi.UpdateRule(); // UpdateRule | 
apiInstance.updateBalancerRule(balancerId, ruleId, updateRule, (error, data, response) => {
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
 **balancerId** | **Number**| ID балансировщика | 
 **ruleId** | **Number**| ID правила для балансировщика | 
 **updateRule** | [**UpdateRule**](UpdateRule.md)|  | 

### Return type

[**CreateBalancerRule200Response**](CreateBalancerRule200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

