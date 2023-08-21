# TimewebCloudApi.DedicatedServersApi

All URIs are relative to *https://api.timeweb.cloud*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createDedicatedServer**](DedicatedServersApi.md#createDedicatedServer) | **POST** /api/v1/dedicated-servers | Создание выделенного сервера
[**deleteDedicatedServer**](DedicatedServersApi.md#deleteDedicatedServer) | **DELETE** /api/v1/dedicated-servers/{dedicated_id} | Удаление выделенного сервера
[**getDedicatedServer**](DedicatedServersApi.md#getDedicatedServer) | **GET** /api/v1/dedicated-servers/{dedicated_id} | Получение выделенного сервера
[**getDedicatedServerPresetAdditionalServices**](DedicatedServersApi.md#getDedicatedServerPresetAdditionalServices) | **GET** /api/v1/presets/dedicated-servers/{preset_id}/additional-services | Получение дополнительных услуг для выделенного сервера
[**getDedicatedServers**](DedicatedServersApi.md#getDedicatedServers) | **GET** /api/v1/dedicated-servers | Получение списка выделенных серверов
[**getDedicatedServersPresets**](DedicatedServersApi.md#getDedicatedServersPresets) | **GET** /api/v1/presets/dedicated-servers | Получение списка тарифов для выделенного сервера
[**updateDedicatedServer**](DedicatedServersApi.md#updateDedicatedServer) | **PATCH** /api/v1/dedicated-servers/{dedicated_id} | Обновление выделенного сервера



## createDedicatedServer

> CreateDedicatedServer201Response createDedicatedServer(createDedicatedServer)

Создание выделенного сервера

Чтобы создать выделенный сервер, отправьте POST-запрос в &#x60;api/v1/dedicated-servers&#x60;, задав необходимые атрибуты.  Выделенный сервер будет создан с использованием предоставленной информации. Тело ответа будет содержать объект JSON с информацией о созданном выделенном сервере.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DedicatedServersApi();
let createDedicatedServer = new TimewebCloudApi.CreateDedicatedServer(); // CreateDedicatedServer | 
apiInstance.createDedicatedServer(createDedicatedServer, (error, data, response) => {
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
 **createDedicatedServer** | [**CreateDedicatedServer**](CreateDedicatedServer.md)|  | 

### Return type

[**CreateDedicatedServer201Response**](CreateDedicatedServer201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deleteDedicatedServer

> deleteDedicatedServer(dedicatedId)

Удаление выделенного сервера

Чтобы удалить выделенный сервер, отправьте запрос DELETE в &#x60;api/v1/dedicated-servers/{dedicated_id}&#x60;. 

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DedicatedServersApi();
let dedicatedId = 1051; // Number | Уникальный идентификатор выделенного сервера.
apiInstance.deleteDedicatedServer(dedicatedId, (error, data, response) => {
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
 **dedicatedId** | **Number**| Уникальный идентификатор выделенного сервера. | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getDedicatedServer

> CreateDedicatedServer201Response getDedicatedServer(dedicatedId)

Получение выделенного сервера

Чтобы отобразить информацию об отдельном выделенном сервере, отправьте запрос GET на &#x60;api/v1/dedicated-servers/{dedicated_id}&#x60;. 

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DedicatedServersApi();
let dedicatedId = 1051; // Number | Уникальный идентификатор выделенного сервера.
apiInstance.getDedicatedServer(dedicatedId, (error, data, response) => {
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
 **dedicatedId** | **Number**| Уникальный идентификатор выделенного сервера. | 

### Return type

[**CreateDedicatedServer201Response**](CreateDedicatedServer201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getDedicatedServerPresetAdditionalServices

> GetDedicatedServerPresetAdditionalServices200Response getDedicatedServerPresetAdditionalServices(presetId)

Получение дополнительных услуг для выделенного сервера

Чтобы получить список всех дополнительных услуг для выделенных серверов, отправьте GET-запрос на &#x60;/api/v1/presets/dedicated-servers/{preset_id}/additional-services&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DedicatedServersApi();
let presetId = 1051; // Number | Уникальный идентификатор тарифа выделенного сервера.
apiInstance.getDedicatedServerPresetAdditionalServices(presetId, (error, data, response) => {
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
 **presetId** | **Number**| Уникальный идентификатор тарифа выделенного сервера. | 

### Return type

[**GetDedicatedServerPresetAdditionalServices200Response**](GetDedicatedServerPresetAdditionalServices200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getDedicatedServers

> GetDedicatedServers200Response getDedicatedServers()

Получение списка выделенных серверов

Чтобы получить список всех выделенных серверов на вашем аккаунте, отправьте GET-запрос на &#x60;/api/v1/dedicated-servers&#x60;.   Тело ответа будет представлять собой объект JSON с ключом &#x60;dedicated_servers&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DedicatedServersApi();
apiInstance.getDedicatedServers((error, data, response) => {
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

[**GetDedicatedServers200Response**](GetDedicatedServers200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getDedicatedServersPresets

> GetDedicatedServersPresets200Response getDedicatedServersPresets(opts)

Получение списка тарифов для выделенного сервера

Чтобы получить список всех тарифов выделенных серверов, отправьте GET-запрос на &#x60;/api/v1/presets/dedicated-servers&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DedicatedServersApi();
let opts = {
  'location': "location_example" // String | Получение тарифов определенной локации.
};
apiInstance.getDedicatedServersPresets(opts, (error, data, response) => {
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
 **location** | **String**| Получение тарифов определенной локации. | [optional] 

### Return type

[**GetDedicatedServersPresets200Response**](GetDedicatedServersPresets200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## updateDedicatedServer

> CreateDedicatedServer201Response updateDedicatedServer(dedicatedId, opts)

Обновление выделенного сервера

Чтобы обновить только определенные атрибуты выделенного сервера, отправьте запрос PATCH в &#x60;api/v1/dedicated-servers/{dedicated_id}&#x60;. 

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DedicatedServersApi();
let dedicatedId = 1051; // Number | Уникальный идентификатор выделенного сервера.
let opts = {
  'updateDedicatedServerRequest': new TimewebCloudApi.UpdateDedicatedServerRequest() // UpdateDedicatedServerRequest | 
};
apiInstance.updateDedicatedServer(dedicatedId, opts, (error, data, response) => {
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
 **dedicatedId** | **Number**| Уникальный идентификатор выделенного сервера. | 
 **updateDedicatedServerRequest** | [**UpdateDedicatedServerRequest**](UpdateDedicatedServerRequest.md)|  | [optional] 

### Return type

[**CreateDedicatedServer201Response**](CreateDedicatedServer201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

