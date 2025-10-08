# TimewebCloudApi.PaymentsApi

All URIs are relative to *https://api.timeweb.cloud*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getFinances**](PaymentsApi.md#getFinances) | **GET** /api/v1/account/finances | Получение платежной информации
[**getLinkCardPayment**](PaymentsApi.md#getLinkCardPayment) | **POST** /api/v1/account/payment-link | Получение ссылки на оплату
[**getServicePrices**](PaymentsApi.md#getServicePrices) | **GET** /api/v1/account/services/cost | Получение стоимости сервисов



## getFinances

> GetFinances200Response getFinances()

Получение платежной информации

Чтобы получить платежную информацию, отправьте GET-запрос на &#x60;/api/v1/account/finances&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.PaymentsApi();
apiInstance.getFinances((error, data, response) => {
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

[**GetFinances200Response**](GetFinances200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getLinkCardPayment

> GetLinkCardPayment200Response getLinkCardPayment(createPayment)

Получение ссылки на оплату

Чтобы получить ссылку на оплату, отправьте POST-запрос на &#x60;/api/v1/account/payment-link&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.PaymentsApi();
let createPayment = new TimewebCloudApi.CreatePayment(); // CreatePayment | 
apiInstance.getLinkCardPayment(createPayment, (error, data, response) => {
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
 **createPayment** | [**CreatePayment**](CreatePayment.md)|  | 

### Return type

[**GetLinkCardPayment200Response**](GetLinkCardPayment200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## getServicePrices

> GetServicePrices200Response getServicePrices()

Получение стоимости сервисов

Чтобы получить информацию о стоимости всех активных сервисов аккаунта, отправьте GET-запрос на &#x60;/api/v1/account/services/cost&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.PaymentsApi();
apiInstance.getServicePrices((error, data, response) => {
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

[**GetServicePrices200Response**](GetServicePrices200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

