# TimewebCloudApi.APIKeysApi

All URIs are relative to *https://api.timeweb.cloud*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createToken**](APIKeysApi.md#createToken) | **POST** /api/v1/auth/api-keys | Создание токена
[**deleteToken**](APIKeysApi.md#deleteToken) | **DELETE** /api/v1/auth/api-keys/{token_id} | Удалить токен
[**getTokens**](APIKeysApi.md#getTokens) | **GET** /api/v1/auth/api-keys | Получение списка выпущенных токенов
[**reissueToken**](APIKeysApi.md#reissueToken) | **PUT** /api/v1/auth/api-keys/{token_id} | Перевыпустить токен
[**updateToken**](APIKeysApi.md#updateToken) | **PATCH** /api/v1/auth/api-keys/{token_id} | Изменить токен



## createToken

> CreateToken201Response createToken(createApiKey)

Создание токена

Чтобы создать токен, отправьте POST-запрос на &#x60;/api/v1/auth/api-keys&#x60;, задав необходимые атрибуты.  Токен будет создан с использованием предоставленной информации. Тело ответа будет содержать объект JSON с информацией о созданном токене.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.APIKeysApi();
let createApiKey = new TimewebCloudApi.CreateApiKey(); // CreateApiKey | 
apiInstance.createToken(createApiKey, (error, data, response) => {
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
 **createApiKey** | [**CreateApiKey**](CreateApiKey.md)|  | 

### Return type

[**CreateToken201Response**](CreateToken201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deleteToken

> deleteToken(tokenId)

Удалить токен

Чтобы удалить токен, отправьте DELETE-запрос на &#x60;/api/v1/auth/api-keys/{token_id}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.APIKeysApi();
let tokenId = "tokenId_example"; // String | Идентификатор токена
apiInstance.deleteToken(tokenId, (error, data, response) => {
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
 **tokenId** | **String**| Идентификатор токена | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getTokens

> GetTokens200Response getTokens()

Получение списка выпущенных токенов

Чтобы получить список выпущенных токенов, отправьте GET-запрос на &#x60;/api/v1/auth/api-keys&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.APIKeysApi();
apiInstance.getTokens((error, data, response) => {
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

[**GetTokens200Response**](GetTokens200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## reissueToken

> CreateToken201Response reissueToken(tokenId, refreshApiKey)

Перевыпустить токен

Чтобы перевыпустить токен, отправьте PUT-запрос на &#x60;/api/v1/auth/api-keys/{token_id}&#x60;, задав необходимые атрибуты.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.APIKeysApi();
let tokenId = "tokenId_example"; // String | Идентификатор токена
let refreshApiKey = new TimewebCloudApi.RefreshApiKey(); // RefreshApiKey | 
apiInstance.reissueToken(tokenId, refreshApiKey, (error, data, response) => {
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
 **tokenId** | **String**| Идентификатор токена | 
 **refreshApiKey** | [**RefreshApiKey**](RefreshApiKey.md)|  | 

### Return type

[**CreateToken201Response**](CreateToken201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## updateToken

> UpdateToken200Response updateToken(tokenId, editApiKey)

Изменить токен

Чтобы изменить токен, отправьте PATCH-запрос на &#x60;/api/v1/auth/api-keys/{token_id}&#x60;, задав необходимые атрибуты.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.APIKeysApi();
let tokenId = "tokenId_example"; // String | Идентификатор токена
let editApiKey = new TimewebCloudApi.EditApiKey(); // EditApiKey | 
apiInstance.updateToken(tokenId, editApiKey, (error, data, response) => {
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
 **tokenId** | **String**| Идентификатор токена | 
 **editApiKey** | [**EditApiKey**](EditApiKey.md)|  | 

### Return type

[**UpdateToken200Response**](UpdateToken200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

