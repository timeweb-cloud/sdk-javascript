# TimewebCloudApi.ContainerRegistryApi

All URIs are relative to *https://api.timeweb.cloud*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createRegistry**](ContainerRegistryApi.md#createRegistry) | **POST** /api/v1/container-registry | Создание реестра
[**deleteRegistry**](ContainerRegistryApi.md#deleteRegistry) | **DELETE** /api/v1/container-registry/{registry_id} | Удаление реестра
[**getRegistries**](ContainerRegistryApi.md#getRegistries) | **GET** /api/v1/container-registry | Получение списка реестров контейнеров
[**getRegistry**](ContainerRegistryApi.md#getRegistry) | **GET** /api/v1/container-registry/{registry_id} | Получение информации о реестре
[**getRegistryPresets**](ContainerRegistryApi.md#getRegistryPresets) | **GET** /api/v1/container-registry/presets | Получение списка тарифов
[**getRegistryRepositories**](ContainerRegistryApi.md#getRegistryRepositories) | **GET** /api/v1/container-registry/{registry_id}/repositories | Получение списка репозиториев
[**updateRegistry**](ContainerRegistryApi.md#updateRegistry) | **PATCH** /api/v1/container-registry/{registry_id} | Обновление информации о реестре



## createRegistry

> RegistryResponse createRegistry(registryIn)

Создание реестра

Чтобы создать реестр, отправьте POST-запрос на &#x60;/api/v1/container-registry&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ContainerRegistryApi();
let registryIn = new TimewebCloudApi.RegistryIn(); // RegistryIn | 
apiInstance.createRegistry(registryIn, (error, data, response) => {
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
 **registryIn** | [**RegistryIn**](RegistryIn.md)|  | 

### Return type

[**RegistryResponse**](RegistryResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deleteRegistry

> deleteRegistry(registryId)

Удаление реестра

Чтобы удалить реестр, отправьте DELETE-запрос в &#x60;/api/v1/container-registry/{registry_id}&#x60;

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ContainerRegistryApi();
let registryId = 56; // Number | ID реестра
apiInstance.deleteRegistry(registryId, (error, data, response) => {
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
 **registryId** | **Number**| ID реестра | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getRegistries

> RegistriesResponse getRegistries()

Получение списка реестров контейнеров

Чтобы получить список реестров, отправьте GET-запрос на &#x60;/api/v1/container-registry&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ContainerRegistryApi();
apiInstance.getRegistries((error, data, response) => {
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

[**RegistriesResponse**](RegistriesResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getRegistry

> RegistryResponse getRegistry(registryId)

Получение информации о реестре

Чтобы получить информацию о реестре, отправьте GET-запрос в &#x60;/api/v1/container-registry/{registry_id}&#x60;

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ContainerRegistryApi();
let registryId = 56; // Number | ID реестра
apiInstance.getRegistry(registryId, (error, data, response) => {
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
 **registryId** | **Number**| ID реестра | 

### Return type

[**RegistryResponse**](RegistryResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getRegistryPresets

> SchemasPresetsResponse getRegistryPresets()

Получение списка тарифов

Чтобы получить список тарифов, отправьте GET-запрос в &#x60;/api/v1/container-registry/presets&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ContainerRegistryApi();
apiInstance.getRegistryPresets((error, data, response) => {
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

[**SchemasPresetsResponse**](SchemasPresetsResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getRegistryRepositories

> RepositoriesResponse getRegistryRepositories(registryId)

Получение списка репозиториев

Чтобы получить список репозиториев, отправьте GET-запрос в &#x60;/api/v1/container-registry/{registry_id}/repositories&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ContainerRegistryApi();
let registryId = 56; // Number | ID реестра
apiInstance.getRegistryRepositories(registryId, (error, data, response) => {
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
 **registryId** | **Number**| ID реестра | 

### Return type

[**RepositoriesResponse**](RepositoriesResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## updateRegistry

> RegistryResponse updateRegistry(registryId, registryEdit)

Обновление информации о реестре

Чтобы обновить информацию о реестре, отправьте PATCH-запрос в &#x60;/api/v1/container-registry/{registry_id}&#x60;

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ContainerRegistryApi();
let registryId = 56; // Number | ID реестра
let registryEdit = new TimewebCloudApi.RegistryEdit(); // RegistryEdit | 
apiInstance.updateRegistry(registryId, registryEdit, (error, data, response) => {
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
 **registryId** | **Number**| ID реестра | 
 **registryEdit** | [**RegistryEdit**](RegistryEdit.md)|  | 

### Return type

[**RegistryResponse**](RegistryResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

