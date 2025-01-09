# TimewebCloudApi.ImagesApi

All URIs are relative to *https://api.timeweb.cloud*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createImage**](ImagesApi.md#createImage) | **POST** /api/v1/images | Создание образа
[**createImageDownloadUrl**](ImagesApi.md#createImageDownloadUrl) | **POST** /api/v1/images/{image_id}/download-url | Создание ссылки на скачивание образа
[**deleteImage**](ImagesApi.md#deleteImage) | **DELETE** /api/v1/images/{image_id} | Удаление образа
[**deleteImageDownloadURL**](ImagesApi.md#deleteImageDownloadURL) | **DELETE** /api/v1/images/{image_id}/download-url/{image_url_id} | Удаление ссылки на образ
[**getImage**](ImagesApi.md#getImage) | **GET** /api/v1/images/{image_id} | Получение информации о образе
[**getImageDownloadURL**](ImagesApi.md#getImageDownloadURL) | **GET** /api/v1/images/{image_id}/download-url/{image_url_id} | Получение информации о ссылке на скачивание образа
[**getImageDownloadURLs**](ImagesApi.md#getImageDownloadURLs) | **GET** /api/v1/images/{image_id}/download-url | Получение информации о ссылках на скачивание образов
[**getImages**](ImagesApi.md#getImages) | **GET** /api/v1/images | Получение списка образов
[**updateImage**](ImagesApi.md#updateImage) | **PATCH** /api/v1/images/{image_id} | Обновление информации о образе
[**uploadImage**](ImagesApi.md#uploadImage) | **POST** /api/v1/images/{image_id} | Загрузка образа



## createImage

> ImageOutResponse createImage(imageInAPI)

Создание образа

Чтобы создать образ, отправьте POST запрос в &#x60;/api/v1/images&#x60;, задав необходимые атрибуты.   Для загрузки собственного образа вам нужно отправить параметры &#x60;location&#x60;, &#x60;os&#x60; и не указывать &#x60;disk_id&#x60;. Поддерживается два способа загрузки:  1. По ссылке. Для этого укажите &#x60;upload_url&#x60; с ссылкой на загрузку образа 2. Из файла. Для этого воспользуйтесь методом POST &#x60;/api/v1/images/{image_id}&#x60; Образ будет создан с использованием предоставленной информации.    Тело ответа будет содержать объект JSON с информацией о созданном образе.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ImagesApi();
let imageInAPI = new TimewebCloudApi.ImageInAPI(); // ImageInAPI | 
apiInstance.createImage(imageInAPI, (error, data, response) => {
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
 **imageInAPI** | [**ImageInAPI**](ImageInAPI.md)|  | 

### Return type

[**ImageOutResponse**](ImageOutResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## createImageDownloadUrl

> ImageDownloadResponse createImageDownloadUrl(imageId, imageUrlIn)

Создание ссылки на скачивание образа

Чтобы создать ссылку на скачивание образа, отправьте запрос POST в &#x60;/api/v1/images/{image_id}/download-url&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ImagesApi();
let imageId = "imageId_example"; // String | ID образа.
let imageUrlIn = new TimewebCloudApi.ImageUrlIn(); // ImageUrlIn | 
apiInstance.createImageDownloadUrl(imageId, imageUrlIn, (error, data, response) => {
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
 **imageId** | **String**| ID образа. | 
 **imageUrlIn** | [**ImageUrlIn**](ImageUrlIn.md)|  | 

### Return type

[**ImageDownloadResponse**](ImageDownloadResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deleteImage

> deleteImage(imageId)

Удаление образа

Чтобы удалить образ, отправьте запрос DELETE в &#x60;/api/v1/images/{image_id}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ImagesApi();
let imageId = "imageId_example"; // String | ID образа.
apiInstance.deleteImage(imageId, (error, data, response) => {
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
 **imageId** | **String**| ID образа. | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## deleteImageDownloadURL

> deleteImageDownloadURL(imageId, imageUrlId)

Удаление ссылки на образ

Чтобы удалить ссылку на образ, отправьте DELETE запрос в &#x60;/api/v1/images/{image_id}/download-url/{image_url_id}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ImagesApi();
let imageId = "imageId_example"; // String | ID образа.
let imageUrlId = "imageUrlId_example"; // String | ID ссылки.
apiInstance.deleteImageDownloadURL(imageId, imageUrlId, (error, data, response) => {
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
 **imageId** | **String**| ID образа. | 
 **imageUrlId** | **String**| ID ссылки. | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getImage

> ImageOutResponse getImage(imageId)

Получение информации о образе

Чтобы получить образ, отправьте запрос GET в &#x60;/api/v1/images/{image_id}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ImagesApi();
let imageId = "imageId_example"; // String | ID образа.
apiInstance.getImage(imageId, (error, data, response) => {
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
 **imageId** | **String**| ID образа. | 

### Return type

[**ImageOutResponse**](ImageOutResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getImageDownloadURL

> ImageDownloadResponse getImageDownloadURL(imageId, imageUrlId)

Получение информации о ссылке на скачивание образа

Чтобы получить информацию о ссылке на скачивание образа, отправьте запрос GET в &#x60;/api/v1/images/{image_id}/download-url/{image_url_id}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ImagesApi();
let imageId = "imageId_example"; // String | ID образа.
let imageUrlId = "imageUrlId_example"; // String | ID ссылки.
apiInstance.getImageDownloadURL(imageId, imageUrlId, (error, data, response) => {
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
 **imageId** | **String**| ID образа. | 
 **imageUrlId** | **String**| ID ссылки. | 

### Return type

[**ImageDownloadResponse**](ImageDownloadResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getImageDownloadURLs

> ImageDownloadsResponse getImageDownloadURLs(imageId, opts)

Получение информации о ссылках на скачивание образов

Чтобы получить информацию о ссылках на скачивание образов, отправьте запрос GET в &#x60;/api/v1/images/{image_id}/download-url&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ImagesApi();
let imageId = "imageId_example"; // String | ID образа.
let opts = {
  'limit': 100, // Number | 
  'offset': 0 // Number | 
};
apiInstance.getImageDownloadURLs(imageId, opts, (error, data, response) => {
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
 **imageId** | **String**| ID образа. | 
 **limit** | **Number**|  | [optional] [default to 100]
 **offset** | **Number**|  | [optional] [default to 0]

### Return type

[**ImageDownloadsResponse**](ImageDownloadsResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getImages

> ImagesOutResponse getImages(opts)

Получение списка образов

Чтобы получить список образов, отправьте GET запрос на &#x60;/api/v1/images&#x60;

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ImagesApi();
let opts = {
  'limit': 100, // Number | 
  'offset': 0 // Number | 
};
apiInstance.getImages(opts, (error, data, response) => {
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
 **limit** | **Number**|  | [optional] [default to 100]
 **offset** | **Number**|  | [optional] [default to 0]

### Return type

[**ImagesOutResponse**](ImagesOutResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## updateImage

> ImageOutResponse updateImage(imageId, imageUpdateAPI)

Обновление информации о образе

Чтобы обновить только определенные атрибуты образа, отправьте запрос PATCH в &#x60;/api/v1/images/{image_id}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ImagesApi();
let imageId = "imageId_example"; // String | ID образа.
let imageUpdateAPI = new TimewebCloudApi.ImageUpdateAPI(); // ImageUpdateAPI | 
apiInstance.updateImage(imageId, imageUpdateAPI, (error, data, response) => {
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
 **imageId** | **String**| ID образа. | 
 **imageUpdateAPI** | [**ImageUpdateAPI**](ImageUpdateAPI.md)|  | 

### Return type

[**ImageOutResponse**](ImageOutResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## uploadImage

> UploadSuccessfulResponse uploadImage(imageId, opts)

Загрузка образа

Чтобы загрузить свой образ, отправьте POST запрос в &#x60;/api/v1/images/{image_id}&#x60;, отправив файл как &#x60;multipart/form-data&#x60;, указав имя файла в заголовке &#x60;Content-Disposition&#x60;.   Перед загрузкой, нужно создать образ используя POST &#x60;/api/v1/images&#x60;, указав параметры &#x60;location&#x60;, &#x60;os&#x60;   Тело ответа будет содержать объект JSON с информацией о загруженном образе.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ImagesApi();
let imageId = "imageId_example"; // String | 
let opts = {
  'contentDisposition': "contentDisposition_example" // String | 
};
apiInstance.uploadImage(imageId, opts, (error, data, response) => {
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
 **imageId** | **String**|  | 
 **contentDisposition** | **String**|  | [optional] 

### Return type

[**UploadSuccessfulResponse**](UploadSuccessfulResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

