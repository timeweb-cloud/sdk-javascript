# TimewebCloudApi.FloatingIPApi

All URIs are relative to *https://api.timeweb.cloud*

Method | HTTP request | Description
------------- | ------------- | -------------
[**bindFloatingIp**](FloatingIPApi.md#bindFloatingIp) | **POST** /api/v1/floating-ips/{floating_ip_id}/bind | Привязать IP к сервису
[**createFloatingIp**](FloatingIPApi.md#createFloatingIp) | **POST** /api/v1/floating-ips | Создание плавающего IP
[**deleteFloatingIP**](FloatingIPApi.md#deleteFloatingIP) | **DELETE** /api/v1/floating-ips/{floating_ip_id} | Удаление плавающего IP по ID
[**getFloatingIp**](FloatingIPApi.md#getFloatingIp) | **GET** /api/v1/floating-ips/{floating_ip_id} | Получение плавающего IP
[**getFloatingIps**](FloatingIPApi.md#getFloatingIps) | **GET** /api/v1/floating-ips | Получение списка плавающих IP
[**unbindFloatingIp**](FloatingIPApi.md#unbindFloatingIp) | **POST** /api/v1/floating-ips/{floating_ip_id}/unbind | Отвязать IP от сервиса
[**updateFloatingIP**](FloatingIPApi.md#updateFloatingIP) | **PATCH** /api/v1/floating-ips/{floating_ip_id} | Изменение плавающего IP по ID



## bindFloatingIp

> bindFloatingIp(floatingIpId, bindFloatingIp)

Привязать IP к сервису

Чтобы привязать IP к сервису, отправьте POST-запрос на &#x60;/api/v1/floating-ips/{floating_ip_id}/bind&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.FloatingIPApi();
let floatingIpId = 87fa289f-1513-4c4d-8d49-5707f411f14b; // String | ID плавающего IP
let bindFloatingIp = new TimewebCloudApi.BindFloatingIp(); // BindFloatingIp | 
apiInstance.bindFloatingIp(floatingIpId, bindFloatingIp, (error, data, response) => {
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
 **floatingIpId** | **String**| ID плавающего IP | 
 **bindFloatingIp** | [**BindFloatingIp**](BindFloatingIp.md)|  | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## createFloatingIp

> CreateFloatingIp201Response createFloatingIp(createFloatingIp)

Создание плавающего IP

Чтобы создать создать плавающий IP, отправьте POST-запрос в &#x60;/api/v1/floating-ips&#x60;, задав необходимые атрибуты.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.FloatingIPApi();
let createFloatingIp = new TimewebCloudApi.CreateFloatingIp(); // CreateFloatingIp | 
apiInstance.createFloatingIp(createFloatingIp, (error, data, response) => {
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
 **createFloatingIp** | [**CreateFloatingIp**](CreateFloatingIp.md)|  | 

### Return type

[**CreateFloatingIp201Response**](CreateFloatingIp201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deleteFloatingIP

> deleteFloatingIP(floatingIpId)

Удаление плавающего IP по ID

Чтобы удалить плавающий IP, отправьте DELETE-запрос на &#x60;/api/v1/floating-ips/{floating_ip_id}&#x60;

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.FloatingIPApi();
let floatingIpId = 87fa289f-1513-4c4d-8d49-5707f411f14b; // String | ID плавающего IP
apiInstance.deleteFloatingIP(floatingIpId, (error, data, response) => {
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
 **floatingIpId** | **String**| ID плавающего IP | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getFloatingIp

> CreateFloatingIp201Response getFloatingIp(floatingIpId)

Получение плавающего IP

Чтобы отобразить информацию об отдельном плавающем IP, отправьте запрос GET на &#x60;api/v1/floating-ips/{floating_ip_id}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.FloatingIPApi();
let floatingIpId = 87fa289f-1513-4c4d-8d49-5707f411f14b; // String | ID плавающего IP
apiInstance.getFloatingIp(floatingIpId, (error, data, response) => {
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
 **floatingIpId** | **String**| ID плавающего IP | 

### Return type

[**CreateFloatingIp201Response**](CreateFloatingIp201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getFloatingIps

> GetFloatingIps200Response getFloatingIps()

Получение списка плавающих IP

Чтобы получить список плавающих IP, отправьте GET-запрос на &#x60;/api/v1/floating-ips&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.FloatingIPApi();
apiInstance.getFloatingIps((error, data, response) => {
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

[**GetFloatingIps200Response**](GetFloatingIps200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## unbindFloatingIp

> unbindFloatingIp(floatingIpId)

Отвязать IP от сервиса

Чтобы отвязать IP от сервиса, отправьте POST-запрос на &#x60;/api/v1/floating-ips/{floating_ip_id}/unbind&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.FloatingIPApi();
let floatingIpId = 87fa289f-1513-4c4d-8d49-5707f411f14b; // String | ID плавающего IP
apiInstance.unbindFloatingIp(floatingIpId, (error, data, response) => {
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
 **floatingIpId** | **String**| ID плавающего IP | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## updateFloatingIP

> CreateFloatingIp201Response updateFloatingIP(floatingIpId, updateFloatingIp)

Изменение плавающего IP по ID

Чтобы изменить плавающий IP, отправьте PATCH-запрос на &#x60;/api/v1/floating-ips/{floating_ip_id}&#x60;

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.FloatingIPApi();
let floatingIpId = 87fa289f-1513-4c4d-8d49-5707f411f14b; // String | ID плавающего IP
let updateFloatingIp = new TimewebCloudApi.UpdateFloatingIp(); // UpdateFloatingIp | 
apiInstance.updateFloatingIP(floatingIpId, updateFloatingIp, (error, data, response) => {
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
 **floatingIpId** | **String**| ID плавающего IP | 
 **updateFloatingIp** | [**UpdateFloatingIp**](UpdateFloatingIp.md)|  | 

### Return type

[**CreateFloatingIp201Response**](CreateFloatingIp201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

