# TimewebCloudApi.VPCApi

All URIs are relative to *https://api.timeweb.cloud*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createVPC**](VPCApi.md#createVPC) | **POST** /api/v2/vpcs | Создание VPC
[**deleteVPC**](VPCApi.md#deleteVPC) | **DELETE** /api/v1/vpcs/{vpc_id} | Удаление VPC по идентификатору сети
[**getVPC**](VPCApi.md#getVPC) | **GET** /api/v2/vpcs/{vpc_id} | Получение VPC
[**getVPCPorts**](VPCApi.md#getVPCPorts) | **GET** /api/v1/vpcs/{vpc_id}/ports | Получение списка портов для VPC
[**getVPCServices**](VPCApi.md#getVPCServices) | **GET** /api/v2/vpcs/{vpc_id}/services | Получение списка сервисов в VPC
[**getVPCs**](VPCApi.md#getVPCs) | **GET** /api/v2/vpcs | Получение списка VPCs
[**updateVPCs**](VPCApi.md#updateVPCs) | **PATCH** /api/v2/vpcs/{vpc_id} | Изменение VPC по идентификатору сети



## createVPC

> CreateVPC201Response createVPC(createVpc)

Создание VPC

Чтобы создать создать VPC, отправьте POST-запрос в &#x60;/api/v2/vpcs&#x60;, задав необходимые атрибуты.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.VPCApi();
let createVpc = new TimewebCloudApi.CreateVpc(); // CreateVpc | 
apiInstance.createVPC(createVpc, (error, data, response) => {
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
 **createVpc** | [**CreateVpc**](CreateVpc.md)|  | 

### Return type

[**CreateVPC201Response**](CreateVPC201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deleteVPC

> DeleteVPC204Response deleteVPC(vpcId)

Удаление VPC по идентификатору сети

Чтобы удалить VPC, отправьте DELETE-запрос на &#x60;/api/v1/vpcs/{vpc_id}&#x60;

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.VPCApi();
let vpcId = network-1234567890; // String | Идентификатор сети
apiInstance.deleteVPC(vpcId, (error, data, response) => {
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
 **vpcId** | **String**| Идентификатор сети | 

### Return type

[**DeleteVPC204Response**](DeleteVPC204Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getVPC

> CreateVPC201Response getVPC(vpcId)

Получение VPC

Чтобы отобразить информацию об отдельном VPC, отправьте запрос GET на &#x60;api/v2/vpcs/{vpc_id}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.VPCApi();
let vpcId = network-1234567890; // String | Идентификатор сети
apiInstance.getVPC(vpcId, (error, data, response) => {
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
 **vpcId** | **String**| Идентификатор сети | 

### Return type

[**CreateVPC201Response**](CreateVPC201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getVPCPorts

> GetVPCPorts200Response getVPCPorts(vpcId)

Получение списка портов для VPC

Чтобы получить список портов для VPC, отправьте GET-запрос на &#x60;/api/v1/vpcs/{vpc_id}/ports&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.VPCApi();
let vpcId = network-1234567890; // String | Идентификатор сети
apiInstance.getVPCPorts(vpcId, (error, data, response) => {
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
 **vpcId** | **String**| Идентификатор сети | 

### Return type

[**GetVPCPorts200Response**](GetVPCPorts200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getVPCServices

> GetVPCServices200Response getVPCServices(vpcId)

Получение списка сервисов в VPC

Чтобы получить список сервисов, отправьте GET-запрос на &#x60;/api/v2/vpcs/{vpc_id}/services&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.VPCApi();
let vpcId = network-1234567890; // String | Идентификатор сети
apiInstance.getVPCServices(vpcId, (error, data, response) => {
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
 **vpcId** | **String**| Идентификатор сети | 

### Return type

[**GetVPCServices200Response**](GetVPCServices200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getVPCs

> GetVPCs200Response getVPCs()

Получение списка VPCs

Чтобы получить список VPCs, отправьте GET-запрос на &#x60;/api/v2/vpcs&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.VPCApi();
apiInstance.getVPCs((error, data, response) => {
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

[**GetVPCs200Response**](GetVPCs200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## updateVPCs

> CreateVPC201Response updateVPCs(vpcId, updateVpc)

Изменение VPC по идентификатору сети

Чтобы изменить VPC, отправьте PATCH-запрос на &#x60;/api/v2/vpcs/{vpc_id}&#x60;

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.VPCApi();
let vpcId = network-1234567890; // String | Идентификатор сети
let updateVpc = new TimewebCloudApi.UpdateVpc(); // UpdateVpc | 
apiInstance.updateVPCs(vpcId, updateVpc, (error, data, response) => {
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
 **vpcId** | **String**| Идентификатор сети | 
 **updateVpc** | [**UpdateVpc**](UpdateVpc.md)|  | 

### Return type

[**CreateVPC201Response**](CreateVPC201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

