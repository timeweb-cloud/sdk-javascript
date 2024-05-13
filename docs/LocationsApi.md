# TimewebCloudApi.LocationsApi

All URIs are relative to *https://api.timeweb.cloud*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getLocations**](LocationsApi.md#getLocations) | **GET** /api/v2/locations | Получение списка локаций



## getLocations

> GetLocations200Response getLocations()

Получение списка локаций

Чтобы получить список локаций, отправьте GET-запрос на &#x60;/api/v2/locations&#x60;.   Тело ответа будет представлять собой объект JSON с ключом &#x60;locations&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.LocationsApi();
apiInstance.getLocations((error, data, response) => {
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

[**GetLocations200Response**](GetLocations200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

