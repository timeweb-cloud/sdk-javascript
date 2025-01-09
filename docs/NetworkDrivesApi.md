# TimewebCloudApi.NetworkDrivesApi

All URIs are relative to *https://api.timeweb.cloud*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createNetworkDrive**](NetworkDrivesApi.md#createNetworkDrive) | **POST** /api/v1/network-drives | Создание сетевого диска
[**deleteNetworkDrive**](NetworkDrivesApi.md#deleteNetworkDrive) | **DELETE** /api/v1/network-drives/{network_drive_id} | Удаление сетевого диска по идентификатору
[**getNetworkDrive**](NetworkDrivesApi.md#getNetworkDrive) | **GET** /api/v1/network-drives/{network_drive_id} | Получение сетевого диска
[**getNetworkDrives**](NetworkDrivesApi.md#getNetworkDrives) | **GET** /api/v1/network-drives | Получение списка cетевых дисков
[**getNetworkDrivesAvailableResources**](NetworkDrivesApi.md#getNetworkDrivesAvailableResources) | **GET** /api/v1/network-drives/available-resources | Получение списка сервисов доступных для подключения диска
[**getNetworkDrivesPresets**](NetworkDrivesApi.md#getNetworkDrivesPresets) | **GET** /api/v1/presets/network-drives | Получение списка доступных тарифов для сетевого диска
[**mountNetworkDrive**](NetworkDrivesApi.md#mountNetworkDrive) | **POST** /api/v1/network-drives/{network_drive_id}/bind | Подключить сетевой диск к сервису
[**unmountNetworkDrive**](NetworkDrivesApi.md#unmountNetworkDrive) | **POST** /api/v1/network-drives/{network_drive_id}/unbind | Отключить сетевой диск от сервиса
[**updateNetworkDrive**](NetworkDrivesApi.md#updateNetworkDrive) | **PATCH** /api/v1/network-drives/{network_drive_id} | Изменение сетевого диска по ID



## createNetworkDrive

> CreateNetworkDrive201Response createNetworkDrive(createNetworkDrive)

Создание сетевого диска

Чтобы создать создать сетевой диск, отправьте POST-запрос в &#x60;/api/v1/network-drives&#x60;, задав необходимые атрибуты.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.NetworkDrivesApi();
let createNetworkDrive = new TimewebCloudApi.CreateNetworkDrive(); // CreateNetworkDrive | 
apiInstance.createNetworkDrive(createNetworkDrive, (error, data, response) => {
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
 **createNetworkDrive** | [**CreateNetworkDrive**](CreateNetworkDrive.md)|  | 

### Return type

[**CreateNetworkDrive201Response**](CreateNetworkDrive201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deleteNetworkDrive

> deleteNetworkDrive(networkDriveId)

Удаление сетевого диска по идентификатору

Чтобы удалить сетевой диск, отправьте DELETE-запрос на &#x60;/api/v1/network-drives/{network_drive_id}&#x60;

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.NetworkDrivesApi();
let networkDriveId = 87fa289f-1513-4c4d-8d49-5707f411f14b; // String | ID сетевого диска
apiInstance.deleteNetworkDrive(networkDriveId, (error, data, response) => {
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
 **networkDriveId** | **String**| ID сетевого диска | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getNetworkDrive

> CreateNetworkDrive201Response getNetworkDrive(networkDriveId)

Получение сетевого диска

Чтобы отобразить информацию об отдельном сетевом диске, отправьте запрос GET на &#x60;api/v1/network-drives/{network_drive_id}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.NetworkDrivesApi();
let networkDriveId = 87fa289f-1513-4c4d-8d49-5707f411f14b; // String | ID сетевого диска
apiInstance.getNetworkDrive(networkDriveId, (error, data, response) => {
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
 **networkDriveId** | **String**| ID сетевого диска | 

### Return type

[**CreateNetworkDrive201Response**](CreateNetworkDrive201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getNetworkDrives

> GetNetworkDrives200Response getNetworkDrives()

Получение списка cетевых дисков

Чтобы получить список сетевых дисков, отправьте GET-запрос на &#x60;/api/v1/network-drives&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.NetworkDrivesApi();
apiInstance.getNetworkDrives((error, data, response) => {
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

[**GetNetworkDrives200Response**](GetNetworkDrives200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getNetworkDrivesAvailableResources

> GetNetworkDrivesAvailableResources200Response getNetworkDrivesAvailableResources()

Получение списка сервисов доступных для подключения диска

Чтобы получить список сервисов, отправьте GET-запрос на &#x60;/api/v1/network-drives/available-resources&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.NetworkDrivesApi();
apiInstance.getNetworkDrivesAvailableResources((error, data, response) => {
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

[**GetNetworkDrivesAvailableResources200Response**](GetNetworkDrivesAvailableResources200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getNetworkDrivesPresets

> GetNetworkDrivesPresets200Response getNetworkDrivesPresets()

Получение списка доступных тарифов для сетевого диска

Чтобы получить список тарифов, отправьте GET-запрос на &#x60;/api/v1/presets/network-drives&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.NetworkDrivesApi();
apiInstance.getNetworkDrivesPresets((error, data, response) => {
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

[**GetNetworkDrivesPresets200Response**](GetNetworkDrivesPresets200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## mountNetworkDrive

> mountNetworkDrive(networkDriveId, mountNetworkDrive)

Подключить сетевой диск к сервису

Чтобы подключить сетевой диск к сервису, отправьте POST-запрос на &#x60;/api/v1/network-drives/{network_drive_id}/mount&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.NetworkDrivesApi();
let networkDriveId = 87fa289f-1513-4c4d-8d49-5707f411f14b; // String | ID сетевого диска
let mountNetworkDrive = new TimewebCloudApi.MountNetworkDrive(); // MountNetworkDrive | 
apiInstance.mountNetworkDrive(networkDriveId, mountNetworkDrive, (error, data, response) => {
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
 **networkDriveId** | **String**| ID сетевого диска | 
 **mountNetworkDrive** | [**MountNetworkDrive**](MountNetworkDrive.md)|  | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## unmountNetworkDrive

> unmountNetworkDrive(networkDriveId)

Отключить сетевой диск от сервиса

Чтобы отключить сетевой диск от сервиса, отправьте POST-запрос на &#x60;/api/v1/network-drives/{network_drive_id}/unmount&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.NetworkDrivesApi();
let networkDriveId = 87fa289f-1513-4c4d-8d49-5707f411f14b; // String | ID сетевого диска
apiInstance.unmountNetworkDrive(networkDriveId, (error, data, response) => {
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
 **networkDriveId** | **String**| ID сетевого диска | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## updateNetworkDrive

> CreateNetworkDrive201Response updateNetworkDrive(networkDriveId, updateNetworkDrive)

Изменение сетевого диска по ID

Чтобы изменить сетевой диск, отправьте PATCH-запрос на &#x60;/api/v1/network-drives/{network_drive_id}&#x60;

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.NetworkDrivesApi();
let networkDriveId = 87fa289f-1513-4c4d-8d49-5707f411f14b; // String | ID сетевого диска
let updateNetworkDrive = new TimewebCloudApi.UpdateNetworkDrive(); // UpdateNetworkDrive | 
apiInstance.updateNetworkDrive(networkDriveId, updateNetworkDrive, (error, data, response) => {
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
 **networkDriveId** | **String**| ID сетевого диска | 
 **updateNetworkDrive** | [**UpdateNetworkDrive**](UpdateNetworkDrive.md)|  | 

### Return type

[**CreateNetworkDrive201Response**](CreateNetworkDrive201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

