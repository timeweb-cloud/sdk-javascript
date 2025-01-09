# TimewebCloudApi.SSHApi

All URIs are relative to *https://api.timeweb.cloud*

Method | HTTP request | Description
------------- | ------------- | -------------
[**addKeyToServer**](SSHApi.md#addKeyToServer) | **POST** /api/v1/servers/{server_id}/ssh-keys | Добавление SSH-ключей на сервер
[**createKey**](SSHApi.md#createKey) | **POST** /api/v1/ssh-keys | Создание SSH-ключа
[**deleteKey**](SSHApi.md#deleteKey) | **DELETE** /api/v1/ssh-keys/{ssh_key_id} | Удаление SSH-ключа по уникальному идентификатору
[**deleteKeyFromServer**](SSHApi.md#deleteKeyFromServer) | **DELETE** /api/v1/servers/{server_id}/ssh-keys/{ssh_key_id} | Удаление SSH-ключей с сервера
[**getKey**](SSHApi.md#getKey) | **GET** /api/v1/ssh-keys/{ssh_key_id} | Получение SSH-ключа по уникальному идентификатору
[**getKeys**](SSHApi.md#getKeys) | **GET** /api/v1/ssh-keys | Получение списка SSH-ключей
[**updateKey**](SSHApi.md#updateKey) | **PATCH** /api/v1/ssh-keys/{ssh_key_id} | Изменение SSH-ключа по уникальному идентификатору



## addKeyToServer

> addKeyToServer(serverId, addKeyToServerRequest)

Добавление SSH-ключей на сервер

Чтобы добавить SSH-ключи на сервер, отправьте POST-запрос на &#x60;/api/v1/servers/{server_id}/ssh-keys&#x60;

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.SSHApi();
let serverId = 1051; // Number | ID облачного сервера.
let addKeyToServerRequest = new TimewebCloudApi.AddKeyToServerRequest(); // AddKeyToServerRequest | 
apiInstance.addKeyToServer(serverId, addKeyToServerRequest, (error, data, response) => {
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
 **serverId** | **Number**| ID облачного сервера. | 
 **addKeyToServerRequest** | [**AddKeyToServerRequest**](AddKeyToServerRequest.md)|  | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## createKey

> CreateKey201Response createKey(createKeyRequest)

Создание SSH-ключа

Чтобы создать создать SSH-ключ, отправьте POST-запрос в &#x60;/api/v1/ssh-keys&#x60;, задав необходимые атрибуты.  

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.SSHApi();
let createKeyRequest = new TimewebCloudApi.CreateKeyRequest(); // CreateKeyRequest | 
apiInstance.createKey(createKeyRequest, (error, data, response) => {
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
 **createKeyRequest** | [**CreateKeyRequest**](CreateKeyRequest.md)|  | 

### Return type

[**CreateKey201Response**](CreateKey201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deleteKey

> deleteKey(sshKeyId)

Удаление SSH-ключа по уникальному идентификатору

Чтобы удалить SSH-ключ, отправьте DELETE-запрос на &#x60;/api/v1/ssh-keys/{ssh_key_id}&#x60;

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.SSHApi();
let sshKeyId = 1051; // Number | ID SSH-ключа
apiInstance.deleteKey(sshKeyId, (error, data, response) => {
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
 **sshKeyId** | **Number**| ID SSH-ключа | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## deleteKeyFromServer

> deleteKeyFromServer(serverId, sshKeyId)

Удаление SSH-ключей с сервера

Чтобы удалить SSH-ключ с сервера, отправьте DELETE-запрос на &#x60;/api/v1/servers/{server_id}/ssh-keys/{ssh_key_id}&#x60;

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.SSHApi();
let serverId = 1051; // Number | ID облачного сервера.
let sshKeyId = 1051; // Number | ID SSH-ключа
apiInstance.deleteKeyFromServer(serverId, sshKeyId, (error, data, response) => {
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
 **serverId** | **Number**| ID облачного сервера. | 
 **sshKeyId** | **Number**| ID SSH-ключа | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getKey

> GetKey200Response getKey(sshKeyId)

Получение SSH-ключа по уникальному идентификатору

Чтобы получить SSH-ключ, отправьте GET-запрос на &#x60;/api/v1/ssh-keys/{ssh_key_id}&#x60;

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.SSHApi();
let sshKeyId = 1051; // Number | ID SSH-ключа
apiInstance.getKey(sshKeyId, (error, data, response) => {
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
 **sshKeyId** | **Number**| ID SSH-ключа | 

### Return type

[**GetKey200Response**](GetKey200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getKeys

> GetKeys200Response getKeys()

Получение списка SSH-ключей

Чтобы получить список SSH-ключей, отправьте GET-запрос на &#x60;/api/v1/ssh-keys&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.SSHApi();
apiInstance.getKeys((error, data, response) => {
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

[**GetKeys200Response**](GetKeys200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## updateKey

> GetKey200Response updateKey(sshKeyId, updateKeyRequest)

Изменение SSH-ключа по уникальному идентификатору

Чтобы изменить SSH-ключ, отправьте PATCH-запрос на &#x60;/api/v1/ssh-keys/{ssh_key_id}&#x60;

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.SSHApi();
let sshKeyId = 1051; // Number | ID SSH-ключа
let updateKeyRequest = new TimewebCloudApi.UpdateKeyRequest(); // UpdateKeyRequest | 
apiInstance.updateKey(sshKeyId, updateKeyRequest, (error, data, response) => {
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
 **sshKeyId** | **Number**| ID SSH-ключа | 
 **updateKeyRequest** | [**UpdateKeyRequest**](UpdateKeyRequest.md)|  | 

### Return type

[**GetKey200Response**](GetKey200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

