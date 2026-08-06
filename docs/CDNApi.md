# TimewebCloudApi.CDNApi

All URIs are relative to *https://api.timeweb.cloud*

Method | HTTP request | Description
------------- | ------------- | -------------
[**addCdnCertificate**](CDNApi.md#addCdnCertificate) | **POST** /api/v1/cdn/certificates | Загрузка собственного сертификата CDN
[**archiveCdnCertificateTask**](CDNApi.md#archiveCdnCertificateTask) | **POST** /api/v1/cdn/certificates/tasks/{task_id}/archive | Архивация задачи на выпуск сертификата
[**clearCdnResourceCache**](CDNApi.md#clearCdnResourceCache) | **POST** /api/v1/cdn/http-resources/{resource_id}/clear-cache | Очистка кэша CDN-ресурса
[**createCdnResource**](CDNApi.md#createCdnResource) | **POST** /api/v1/cdn/http-resources | Создание CDN-ресурса
[**deleteCdnCertificate**](CDNApi.md#deleteCdnCertificate) | **DELETE** /api/v1/cdn/certificates/{certificate_id} | Удаление сертификата CDN
[**deleteCdnResource**](CDNApi.md#deleteCdnResource) | **DELETE** /api/v1/cdn/http-resources/{resource_id} | Удаление CDN-ресурса
[**getCdnCertificateTasks**](CDNApi.md#getCdnCertificateTasks) | **GET** /api/v1/cdn/certificates/tasks | Получение списка задач на выпуск сертификатов
[**getCdnCertificates**](CDNApi.md#getCdnCertificates) | **GET** /api/v1/cdn/certificates | Получение списка сертификатов CDN
[**getCdnOriginNodes**](CDNApi.md#getCdnOriginNodes) | **GET** /api/v1/cdn/nodes/origin | Получение списка подсетей узлов CDN
[**getCdnPresets**](CDNApi.md#getCdnPresets) | **GET** /api/v1/cdn/presets | Получение списка тарифов CDN
[**getCdnResource**](CDNApi.md#getCdnResource) | **GET** /api/v1/cdn/http-resources/{resource_id} | Получение CDN-ресурса
[**getCdnResourceConfiguration**](CDNApi.md#getCdnResourceConfiguration) | **GET** /api/v1/cdn/http-resources/{resource_id}/configuration | Получение конфигурации CDN-ресурса
[**getCdnResourceNodes**](CDNApi.md#getCdnResourceNodes) | **GET** /api/v1/cdn/nodes/http-resources/{resource_id} | Получение списка раздающих узлов CDN-ресурса
[**getCdnResourceStatistics**](CDNApi.md#getCdnResourceStatistics) | **GET** /api/v1/cdn/http-resources/{resource_id}/statistics | Получение статистики CDN-ресурса
[**getCdnResources**](CDNApi.md#getCdnResources) | **GET** /api/v1/cdn/http-resources | Получение списка CDN-ресурсов
[**issueCdnCertificate**](CDNApi.md#issueCdnCertificate) | **POST** /api/v1/cdn/certificates/issue | Выпуск сертификата Let&#39;s Encrypt для CDN-ресурса
[**preloadCdnResourceCache**](CDNApi.md#preloadCdnResourceCache) | **POST** /api/v1/cdn/http-resources/{resource_id}/preload-cache | Предварительная загрузка кэша CDN-ресурса
[**resumeCdnResource**](CDNApi.md#resumeCdnResource) | **POST** /api/v1/cdn/http-resources/{resource_id}/resume | Возобновление раздачи CDN-ресурса
[**suspendCdnResource**](CDNApi.md#suspendCdnResource) | **POST** /api/v1/cdn/http-resources/{resource_id}/suspend | Приостановка раздачи CDN-ресурса
[**updateCdnResource**](CDNApi.md#updateCdnResource) | **PATCH** /api/v1/cdn/http-resources/{resource_id} | Изменение CDN-ресурса



## addCdnCertificate

> addCdnCertificate(addCertificate)

Загрузка собственного сертификата CDN

Чтобы загрузить собственный SSL-сертификат, отправьте POST-запрос на &#x60;/api/v1/cdn/certificates&#x60;.  После загрузки сертификат появится в списке &#x60;/api/v1/cdn/certificates&#x60; — привязать его к ресурсу можно, передав его ID в поле &#x60;config.security.certificate_id&#x60; PATCH-запроса на &#x60;/api/v1/cdn/http-resources/{resource_id}&#x60;.  Если сертификат или приватный ключ не проходят проверку — например, истек срок действия или ключ не соответствует сертификату — вернется ошибка &#x60;422&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.CDNApi();
let addCertificate = new TimewebCloudApi.AddCertificate(); // AddCertificate | 
apiInstance.addCdnCertificate(addCertificate, (error, data, response) => {
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
 **addCertificate** | [**AddCertificate**](AddCertificate.md)|  | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## archiveCdnCertificateTask

> archiveCdnCertificateTask(taskId)

Архивация задачи на выпуск сертификата

Чтобы убрать из списка задачу на выпуск сертификата, отправьте POST-запрос на &#x60;/api/v1/cdn/certificates/tasks/{task_id}/archive&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.CDNApi();
let taskId = 42; // Number | ID задачи на выпуск сертификата
apiInstance.archiveCdnCertificateTask(taskId, (error, data, response) => {
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
 **taskId** | **Number**| ID задачи на выпуск сертификата | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## clearCdnResourceCache

> clearCdnResourceCache(resourceId, clearCache)

Очистка кэша CDN-ресурса

Чтобы очистить кэш на узлах CDN, отправьте POST-запрос на &#x60;/api/v1/cdn/http-resources/{resource_id}/clear-cache&#x60;.  При &#x60;purge_type&#x60; &#x3D; &#x60;full&#x60; очищается весь кэш ресурса, при &#x60;purge_type&#x60; &#x3D; &#x60;partial&#x60; — только файлы из списка &#x60;paths&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.CDNApi();
let resourceId = 1234; // Number | ID CDN-ресурса
let clearCache = new TimewebCloudApi.ClearCache(); // ClearCache | 
apiInstance.clearCdnResourceCache(resourceId, clearCache, (error, data, response) => {
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
 **resourceId** | **Number**| ID CDN-ресурса | 
 **clearCache** | [**ClearCache**](ClearCache.md)|  | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## createCdnResource

> CreateCdnResource201Response createCdnResource(createHttpResource)

Создание CDN-ресурса

Чтобы создать CDN-ресурс, отправьте POST-запрос на &#x60;/api/v1/cdn/http-resources&#x60;.  Источник контента задается ровно одним из полей: &#x60;storage_id&#x60; для S3-хранилища или &#x60;server&#x60; для произвольного origin-сервера. Если ни одно из них не передано, вернется ошибка &#x60;400&#x60;.  Сразу после создания ресурсу выдается технический домен &#x60;cdn_domain&#x60;, а сам ресурс какое-то время находится в статусе &#x60;processing&#x60;, пока конфигурация применяется на узлах CDN.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.CDNApi();
let createHttpResource = new TimewebCloudApi.CreateHttpResource(); // CreateHttpResource | 
apiInstance.createCdnResource(createHttpResource, (error, data, response) => {
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
 **createHttpResource** | [**CreateHttpResource**](CreateHttpResource.md)|  | 

### Return type

[**CreateCdnResource201Response**](CreateCdnResource201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deleteCdnCertificate

> deleteCdnCertificate(certificateId)

Удаление сертификата CDN

Чтобы удалить SSL-сертификат, отправьте DELETE-запрос на &#x60;/api/v1/cdn/certificates/{certificate_id}&#x60;.  Если сертификат привязан к CDN-ресурсу, вернется ошибка &#x60;409&#x60; — сначала отвяжите его, передав &#x60;config.security.certificate_id&#x60; &#x3D; &#x60;null&#x60; в PATCH-запросе на &#x60;/api/v1/cdn/http-resources/{resource_id}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.CDNApi();
let certificateId = 5678; // Number | ID сертификата
apiInstance.deleteCdnCertificate(certificateId, (error, data, response) => {
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
 **certificateId** | **Number**| ID сертификата | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## deleteCdnResource

> deleteCdnResource(resourceId)

Удаление CDN-ресурса

Чтобы удалить CDN-ресурс, отправьте DELETE-запрос на &#x60;/api/v1/cdn/http-resources/{resource_id}&#x60;. Вместе с ресурсом освобождается его технический домен, а привязанный сертификат отвязывается.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.CDNApi();
let resourceId = 1234; // Number | ID CDN-ресурса
apiInstance.deleteCdnResource(resourceId, (error, data, response) => {
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
 **resourceId** | **Number**| ID CDN-ресурса | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getCdnCertificateTasks

> GetCdnCertificateTasks200Response getCdnCertificateTasks(opts)

Получение списка задач на выпуск сертификатов

Чтобы получить список задач на выпуск сертификатов Let&#39;s Encrypt, отправьте GET-запрос на &#x60;/api/v1/cdn/certificates/tasks&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.CDNApi();
let opts = {
  'resourceId': 1234 // Number | Оставить в выдаче только задачи указанного CDN-ресурса.
};
apiInstance.getCdnCertificateTasks(opts, (error, data, response) => {
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
 **resourceId** | **Number**| Оставить в выдаче только задачи указанного CDN-ресурса. | [optional] 

### Return type

[**GetCdnCertificateTasks200Response**](GetCdnCertificateTasks200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getCdnCertificates

> GetCdnCertificates200Response getCdnCertificates(opts)

Получение списка сертификатов CDN

Чтобы получить список SSL-сертификатов, доступных для доменов CDN-ресурсов, отправьте GET-запрос на &#x60;/api/v1/cdn/certificates&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.CDNApi();
let opts = {
  'resourceId': 1234 // Number | Оставить в выдаче только сертификаты, подходящие для доменов указанного CDN-ресурса.
};
apiInstance.getCdnCertificates(opts, (error, data, response) => {
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
 **resourceId** | **Number**| Оставить в выдаче только сертификаты, подходящие для доменов указанного CDN-ресурса. | [optional] 

### Return type

[**GetCdnCertificates200Response**](GetCdnCertificates200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getCdnOriginNodes

> GetCdnOriginNodes200Response getCdnOriginNodes(opts)

Получение списка подсетей узлов CDN

Чтобы получить список IP-адресов и подсетей, с которых узлы CDN обращаются к источнику контента, отправьте GET-запрос на &#x60;/api/v1/cdn/nodes/origin&#x60;. Этот список удобно использовать, чтобы разрешить доступ к origin-серверу только для узлов CDN.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.CDNApi();
let opts = {
  'withExtraZones': true // Boolean | Добавить в выдачу узлы дополнительных зон раздачи.
};
apiInstance.getCdnOriginNodes(opts, (error, data, response) => {
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
 **withExtraZones** | **Boolean**| Добавить в выдачу узлы дополнительных зон раздачи. | [optional] [default to false]

### Return type

[**GetCdnOriginNodes200Response**](GetCdnOriginNodes200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getCdnPresets

> GetCdnPresets200Response getCdnPresets()

Получение списка тарифов CDN

Чтобы получить список доступных тарифов CDN, отправьте GET-запрос на &#x60;/api/v1/cdn/presets&#x60;. ID тарифа из этого списка указывается в поле &#x60;preset_id&#x60; при создании и изменении ресурса.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.CDNApi();
apiInstance.getCdnPresets((error, data, response) => {
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

[**GetCdnPresets200Response**](GetCdnPresets200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getCdnResource

> CreateCdnResource201Response getCdnResource(resourceId)

Получение CDN-ресурса

Чтобы получить информацию об отдельном CDN-ресурсе, отправьте GET-запрос на &#x60;/api/v1/cdn/http-resources/{resource_id}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.CDNApi();
let resourceId = 1234; // Number | ID CDN-ресурса
apiInstance.getCdnResource(resourceId, (error, data, response) => {
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
 **resourceId** | **Number**| ID CDN-ресурса | 

### Return type

[**CreateCdnResource201Response**](CreateCdnResource201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getCdnResourceConfiguration

> GetCdnResourceConfiguration200Response getCdnResourceConfiguration(resourceId)

Получение конфигурации CDN-ресурса

Чтобы получить текущую конфигурацию CDN-ресурса, отправьте GET-запрос на &#x60;/api/v1/cdn/http-resources/{resource_id}/configuration&#x60;.  Изменить конфигурацию можно в поле &#x60;config&#x60; PATCH-запроса на &#x60;/api/v1/cdn/http-resources/{resource_id}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.CDNApi();
let resourceId = 1234; // Number | ID CDN-ресурса
apiInstance.getCdnResourceConfiguration(resourceId, (error, data, response) => {
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
 **resourceId** | **Number**| ID CDN-ресурса | 

### Return type

[**GetCdnResourceConfiguration200Response**](GetCdnResourceConfiguration200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getCdnResourceNodes

> GetCdnResourceNodes200Response getCdnResourceNodes(resourceId, opts)

Получение списка раздающих узлов CDN-ресурса

Чтобы получить список узлов, которые раздают контент доменов ресурса, отправьте GET-запрос на &#x60;/api/v1/cdn/nodes/http-resources/{resource_id}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.CDNApi();
let resourceId = 1234; // Number | ID CDN-ресурса
let opts = {
  'withExtraZones': true, // Boolean | Добавить в выдачу узлы дополнительных зон раздачи.
  'country': ["RU","KZ"] // [String] | Оставить в выдаче только основные зоны раздачи в указанных странах. Коды стран в формате ISO 3166-1 alpha-2.
};
apiInstance.getCdnResourceNodes(resourceId, opts, (error, data, response) => {
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
 **resourceId** | **Number**| ID CDN-ресурса | 
 **withExtraZones** | **Boolean**| Добавить в выдачу узлы дополнительных зон раздачи. | [optional] [default to false]
 **country** | [**[String]**](String.md)| Оставить в выдаче только основные зоны раздачи в указанных странах. Коды стран в формате ISO 3166-1 alpha-2. | [optional] 

### Return type

[**GetCdnResourceNodes200Response**](GetCdnResourceNodes200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getCdnResourceStatistics

> GetCdnResourceStatistics200Response getCdnResourceStatistics(resourceId, opts)

Получение статистики CDN-ресурса

Чтобы получить статистику трафика и запросов CDN-ресурса, отправьте GET-запрос на &#x60;/api/v1/cdn/http-resources/{resource_id}/statistics&#x60;.  Данные возвращаются с разбивкой по часовым интервалам. Если период не указан, вернется статистика за последние 6 часов.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.CDNApi();
let resourceId = 1234; // Number | ID CDN-ресурса
let opts = {
  'from': 2026-04-16T00:00Z, // Date | Начало периода в формате ISO 8601. По умолчанию — 6 часов назад.
  'to': 2026-04-16T23:59:59Z // Date | Конец периода в формате ISO 8601. По умолчанию — текущий момент. Должен быть не раньше `from`.
};
apiInstance.getCdnResourceStatistics(resourceId, opts, (error, data, response) => {
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
 **resourceId** | **Number**| ID CDN-ресурса | 
 **from** | **Date**| Начало периода в формате ISO 8601. По умолчанию — 6 часов назад. | [optional] 
 **to** | **Date**| Конец периода в формате ISO 8601. По умолчанию — текущий момент. Должен быть не раньше &#x60;from&#x60;. | [optional] 

### Return type

[**GetCdnResourceStatistics200Response**](GetCdnResourceStatistics200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getCdnResources

> GetCdnResources200Response getCdnResources(opts)

Получение списка CDN-ресурсов

Чтобы получить список CDN-ресурсов, отправьте GET-запрос на &#x60;/api/v1/cdn/http-resources&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.CDNApi();
let opts = {
  'bucketId': 4210 // Number | Оставить в выдаче только ресурсы, источником контента которых является указанное S3-хранилище.
};
apiInstance.getCdnResources(opts, (error, data, response) => {
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
 **bucketId** | **Number**| Оставить в выдаче только ресурсы, источником контента которых является указанное S3-хранилище. | [optional] 

### Return type

[**GetCdnResources200Response**](GetCdnResources200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## issueCdnCertificate

> issueCdnCertificate(issueCertificate)

Выпуск сертификата Let&#39;s Encrypt для CDN-ресурса

Чтобы выпустить бесплатный сертификат Let&#39;s Encrypt для доменов CDN-ресурса, отправьте POST-запрос на &#x60;/api/v1/cdn/certificates/issue&#x60;.  Выпуск выполняется асинхронно: в ответ возвращается код &#x60;202&#x60;, а следить за ходом выпуска можно по списку задач &#x60;/api/v1/cdn/certificates/tasks&#x60;. Готовый сертификат привязывается к ресурсу автоматически.  Перед выпуском убедитесь, что домены ресурса указывают на его технический домен &#x60;cdn_domain&#x60; — иначе вернется ошибка &#x60;422&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.CDNApi();
let issueCertificate = new TimewebCloudApi.IssueCertificate(); // IssueCertificate | 
apiInstance.issueCdnCertificate(issueCertificate, (error, data, response) => {
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
 **issueCertificate** | [**IssueCertificate**](IssueCertificate.md)|  | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## preloadCdnResourceCache

> preloadCdnResourceCache(resourceId, preloadCache)

Предварительная загрузка кэша CDN-ресурса

Чтобы заранее загрузить файлы в кэш узлов CDN, не дожидаясь первого обращения пользователей, отправьте POST-запрос на &#x60;/api/v1/cdn/http-resources/{resource_id}/preload-cache&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.CDNApi();
let resourceId = 1234; // Number | ID CDN-ресурса
let preloadCache = new TimewebCloudApi.PreloadCache(); // PreloadCache | 
apiInstance.preloadCdnResourceCache(resourceId, preloadCache, (error, data, response) => {
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
 **resourceId** | **Number**| ID CDN-ресурса | 
 **preloadCache** | [**PreloadCache**](PreloadCache.md)|  | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## resumeCdnResource

> CreateCdnResource201Response resumeCdnResource(resourceId)

Возобновление раздачи CDN-ресурса

Чтобы возобновить раздачу контента после приостановки, отправьте POST-запрос на &#x60;/api/v1/cdn/http-resources/{resource_id}/resume&#x60;.  Если ресурс заблокирован, вернется ошибка &#x60;409&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.CDNApi();
let resourceId = 1234; // Number | ID CDN-ресурса
apiInstance.resumeCdnResource(resourceId, (error, data, response) => {
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
 **resourceId** | **Number**| ID CDN-ресурса | 

### Return type

[**CreateCdnResource201Response**](CreateCdnResource201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## suspendCdnResource

> CreateCdnResource201Response suspendCdnResource(resourceId)

Приостановка раздачи CDN-ресурса

Чтобы приостановить раздачу контента, отправьте POST-запрос на &#x60;/api/v1/cdn/http-resources/{resource_id}/suspend&#x60;. Ресурс перейдет в статус &#x60;stopped&#x60;, его настройки и домены сохранятся.  Если ресурс заблокирован, вернется ошибка &#x60;409&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.CDNApi();
let resourceId = 1234; // Number | ID CDN-ресурса
apiInstance.suspendCdnResource(resourceId, (error, data, response) => {
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
 **resourceId** | **Number**| ID CDN-ресурса | 

### Return type

[**CreateCdnResource201Response**](CreateCdnResource201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## updateCdnResource

> CreateCdnResource201Response updateCdnResource(resourceId, updateHttpResource)

Изменение CDN-ресурса

Чтобы изменить CDN-ресурс, отправьте PATCH-запрос на &#x60;/api/v1/cdn/http-resources/{resource_id}&#x60;.  Передавайте только те поля, которые нужно изменить: переданные значения накладываются на текущую конфигурацию, а непереданные остаются без изменений. Чтобы сбросить настройку, передайте в соответствующем поле &#x60;null&#x60;.  Поля &#x60;storage_id&#x60; и &#x60;config.origin.servers&#x60; нельзя передавать вместе — источник контента может быть только один.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.CDNApi();
let resourceId = 1234; // Number | ID CDN-ресурса
let updateHttpResource = new TimewebCloudApi.UpdateHttpResource(); // UpdateHttpResource | 
apiInstance.updateCdnResource(resourceId, updateHttpResource, (error, data, response) => {
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
 **resourceId** | **Number**| ID CDN-ресурса | 
 **updateHttpResource** | [**UpdateHttpResource**](UpdateHttpResource.md)|  | 

### Return type

[**CreateCdnResource201Response**](CreateCdnResource201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

