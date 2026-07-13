# TimewebCloudApi.SnapshotsApi

All URIs are relative to *https://api.timeweb.cloud*

Method | HTTP request | Description
------------- | ------------- | -------------
[**commitRestorePoint**](SnapshotsApi.md#commitRestorePoint) | **POST** /api/v1/restore-points/{vds_id}/commit | Фиксация снапшота
[**createRestorePoint**](SnapshotsApi.md#createRestorePoint) | **POST** /api/v1/restore-points/{vds_id}/create | Создание снапшота
[**getRestorePoint**](SnapshotsApi.md#getRestorePoint) | **GET** /api/v1/restore-points/{vds_id} | Получение снапшота сервера
[**getRestorePoints**](SnapshotsApi.md#getRestorePoints) | **GET** /api/v1/restore-points | Получение списка снапшотов
[**rollbackRestorePoint**](SnapshotsApi.md#rollbackRestorePoint) | **POST** /api/v1/restore-points/{vds_id}/rollback | Откат к снапшоту



## commitRestorePoint

> commitRestorePoint(vdsId)

Фиксация снапшота

Чтобы зафиксировать (применить) снапшот облачного сервера (VDS), отправьте POST-запрос на &#x60;/api/v1/restore-points/{vds_id}/commit&#x60;.  Фиксация подтверждает текущее состояние сервера. Действие выполняется асинхронно, ответ не содержит тела.  Для выполнения действия сервер должен быть включён, иначе вернётся ошибка &#x60;403&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.SnapshotsApi();
let vdsId = 1051; // Number | ID облачного сервера (VDS).
apiInstance.commitRestorePoint(vdsId, (error, data, response) => {
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
 **vdsId** | **Number**| ID облачного сервера (VDS). | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## createRestorePoint

> GetRestorePoint200Response createRestorePoint(vdsId)

Создание снапшота

Чтобы создать снапшот облачного сервера (VDS), отправьте POST-запрос на &#x60;/api/v1/restore-points/{vds_id}/create&#x60;.  Тело ответа будет содержать объект JSON с ключом &#x60;restore_point&#x60; и информацией о созданном снапшоте. Сразу после создания снапшот может находиться в статусе &#x60;creating&#x60;.  Для создания снапшота сервер должен быть включён, иначе вернётся ошибка &#x60;403&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.SnapshotsApi();
let vdsId = 1051; // Number | ID облачного сервера (VDS).
apiInstance.createRestorePoint(vdsId, (error, data, response) => {
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
 **vdsId** | **Number**| ID облачного сервера (VDS). | 

### Return type

[**GetRestorePoint200Response**](GetRestorePoint200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getRestorePoint

> GetRestorePoint200Response getRestorePoint(vdsId)

Получение снапшота сервера

Чтобы получить снапшот облачного сервера (VDS), отправьте GET-запрос на &#x60;/api/v1/restore-points/{vds_id}&#x60;.  Тело ответа будет представлять собой объект JSON с ключом &#x60;restore_point&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.SnapshotsApi();
let vdsId = 1051; // Number | ID облачного сервера (VDS).
apiInstance.getRestorePoint(vdsId, (error, data, response) => {
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
 **vdsId** | **Number**| ID облачного сервера (VDS). | 

### Return type

[**GetRestorePoint200Response**](GetRestorePoint200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getRestorePoints

> GetRestorePoints200Response getRestorePoints()

Получение списка снапшотов

Чтобы получить список снапшотов аккаунта, отправьте GET-запрос на &#x60;/api/v1/restore-points&#x60;.  Тело ответа будет представлять собой объект JSON с ключом &#x60;restore_points&#x60;.  Снапшот — это снимок состояния облачного сервера (VDS), к которому можно вернуться. Каждому снапшоту соответствует один сервер.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.SnapshotsApi();
apiInstance.getRestorePoints((error, data, response) => {
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

[**GetRestorePoints200Response**](GetRestorePoints200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## rollbackRestorePoint

> rollbackRestorePoint(vdsId)

Откат к снапшоту

Чтобы откатить облачный сервер (VDS) к снапшоту, отправьте POST-запрос на &#x60;/api/v1/restore-points/{vds_id}/rollback&#x60;.  Откат возвращает сервер к состоянию, сохранённому в снапшоте. Действие выполняется асинхронно, ответ не содержит тела.  Для выполнения действия сервер должен быть включён, иначе вернётся ошибка &#x60;403&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.SnapshotsApi();
let vdsId = 1051; // Number | ID облачного сервера (VDS).
apiInstance.rollbackRestorePoint(vdsId, (error, data, response) => {
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
 **vdsId** | **Number**| ID облачного сервера (VDS). | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

