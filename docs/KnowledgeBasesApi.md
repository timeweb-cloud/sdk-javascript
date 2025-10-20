# TimewebCloudApi.KnowledgeBasesApi

All URIs are relative to *https://api.timeweb.cloud*

Method | HTTP request | Description
------------- | ------------- | -------------
[**addAdditionalTokenPackageToKnowledgebase**](KnowledgeBasesApi.md#addAdditionalTokenPackageToKnowledgebase) | **POST** /api/v1/cloud-ai/knowledge-bases/{id}/add-additional-token-package | Добавление дополнительного пакета токенов
[**createKnowledgebase**](KnowledgeBasesApi.md#createKnowledgebase) | **POST** /api/v1/cloud-ai/knowledge-bases | Создание базы знаний
[**deleteDocument**](KnowledgeBasesApi.md#deleteDocument) | **DELETE** /api/v1/cloud-ai/knowledge-bases/{id}/documents/{document_id} | Удаление документа из базы знаний
[**deleteKnowledgebase**](KnowledgeBasesApi.md#deleteKnowledgebase) | **DELETE** /api/v1/cloud-ai/knowledge-bases/{id} | Удаление базы знаний
[**downloadDocument**](KnowledgeBasesApi.md#downloadDocument) | **GET** /api/v1/cloud-ai/knowledge-bases/{id}/documents/{document_id}/download | Скачивание документа из базы знаний
[**getKnowledgebase**](KnowledgeBasesApi.md#getKnowledgebase) | **GET** /api/v1/cloud-ai/knowledge-bases/{id} | Получение базы знаний
[**getKnowledgebaseStatistics**](KnowledgeBasesApi.md#getKnowledgebaseStatistics) | **GET** /api/v1/cloud-ai/knowledge-bases/{id}/statistic | Получение статистики использования токенов базы знаний
[**getKnowledgebases**](KnowledgeBasesApi.md#getKnowledgebases) | **GET** /api/v1/cloud-ai/knowledge-bases | Получение списка баз знаний
[**linkKnowledgebaseToAgent**](KnowledgeBasesApi.md#linkKnowledgebaseToAgent) | **POST** /api/v1/cloud-ai/knowledge-bases/{id}/link/{agent_id} | Привязка базы знаний к агенту
[**reindexDocument**](KnowledgeBasesApi.md#reindexDocument) | **POST** /api/v1/cloud-ai/knowledge-bases/{id}/documents/{document_id}/reindex | Переиндексация документа
[**unlinkKnowledgebaseFromAgent**](KnowledgeBasesApi.md#unlinkKnowledgebaseFromAgent) | **DELETE** /api/v1/cloud-ai/knowledge-bases/{id}/link/{agent_id} | Отвязка базы знаний от агента
[**updateKnowledgebase**](KnowledgeBasesApi.md#updateKnowledgebase) | **PATCH** /api/v1/cloud-ai/knowledge-bases/{id} | Обновление базы знаний
[**uploadFilesToKnowledgebase**](KnowledgeBasesApi.md#uploadFilesToKnowledgebase) | **POST** /api/v1/cloud-ai/knowledge-bases/{id}/upload | Загрузка файлов в базу знаний



## addAdditionalTokenPackageToKnowledgebase

> addAdditionalTokenPackageToKnowledgebase(id, opts)

Добавление дополнительного пакета токенов

Чтобы добавить дополнительный пакет токенов для базы знаний, отправьте POST-запрос на &#x60;/api/v1/cloud-ai/knowledge-bases/{id}/add-additional-token-package&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.KnowledgeBasesApi();
let id = 1; // Number | ID базы знаний
let opts = {
  'addTokenPackage': new TimewebCloudApi.AddTokenPackage() // AddTokenPackage | 
};
apiInstance.addAdditionalTokenPackageToKnowledgebase(id, opts, (error, data, response) => {
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
 **id** | **Number**| ID базы знаний | 
 **addTokenPackage** | [**AddTokenPackage**](AddTokenPackage.md)|  | [optional] 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## createKnowledgebase

> CreateKnowledgebase201Response createKnowledgebase(createKnowledgebase)

Создание базы знаний

Чтобы создать базу знаний, отправьте POST-запрос на &#x60;/api/v1/cloud-ai/knowledge-bases&#x60;, задав необходимые атрибуты.  База знаний будет создана с использованием предоставленной информации. Тело ответа будет содержать объект JSON с информацией о созданной базе знаний.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.KnowledgeBasesApi();
let createKnowledgebase = new TimewebCloudApi.CreateKnowledgebase(); // CreateKnowledgebase | 
apiInstance.createKnowledgebase(createKnowledgebase, (error, data, response) => {
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
 **createKnowledgebase** | [**CreateKnowledgebase**](CreateKnowledgebase.md)|  | 

### Return type

[**CreateKnowledgebase201Response**](CreateKnowledgebase201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deleteDocument

> deleteDocument(id, documentId)

Удаление документа из базы знаний

Чтобы удалить документ из базы знаний, отправьте DELETE-запрос на &#x60;/api/v1/cloud-ai/knowledge-bases/{id}/documents/{document_id}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.KnowledgeBasesApi();
let id = 1; // Number | ID базы знаний
let documentId = 1; // Number | ID документа
apiInstance.deleteDocument(id, documentId, (error, data, response) => {
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
 **id** | **Number**| ID базы знаний | 
 **documentId** | **Number**| ID документа | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## deleteKnowledgebase

> deleteKnowledgebase(id)

Удаление базы знаний

Чтобы удалить базу знаний, отправьте DELETE-запрос на &#x60;/api/v1/cloud-ai/knowledge-bases/{id}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.KnowledgeBasesApi();
let id = 1; // Number | ID базы знаний
apiInstance.deleteKnowledgebase(id, (error, data, response) => {
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
 **id** | **Number**| ID базы знаний | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## downloadDocument

> File downloadDocument(id, documentId)

Скачивание документа из базы знаний

Чтобы скачать документ из базы знаний, отправьте GET-запрос на &#x60;/api/v1/cloud-ai/knowledge-bases/{id}/documents/{document_id}/download&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.KnowledgeBasesApi();
let id = 1; // Number | ID базы знаний
let documentId = 1; // Number | ID документа
apiInstance.downloadDocument(id, documentId, (error, data, response) => {
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
 **id** | **Number**| ID базы знаний | 
 **documentId** | **Number**| ID документа | 

### Return type

**File**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/octet-stream, application/json


## getKnowledgebase

> CreateKnowledgebase201Response getKnowledgebase(id)

Получение базы знаний

Чтобы получить информацию о базе знаний, отправьте GET-запрос на &#x60;/api/v1/cloud-ai/knowledge-bases/{id}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.KnowledgeBasesApi();
let id = 1; // Number | ID базы знаний
apiInstance.getKnowledgebase(id, (error, data, response) => {
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
 **id** | **Number**| ID базы знаний | 

### Return type

[**CreateKnowledgebase201Response**](CreateKnowledgebase201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getKnowledgebaseStatistics

> GetKnowledgebaseStatistics200Response getKnowledgebaseStatistics(id, opts)

Получение статистики использования токенов базы знаний

Чтобы получить статистику использования токенов базы знаний, отправьте GET-запрос на &#x60;/api/v1/cloud-ai/knowledge-bases/{id}/statistic&#x60;.  Можно указать временной диапазон и интервал агрегации.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.KnowledgeBasesApi();
let id = 1; // Number | ID базы знаний
let opts = {
  'startTime': 2024-10-01T00:00Z, // Date | Начало временного диапазона (ISO 8601)
  'endTime': 2024-10-16T23:59:59.999Z, // Date | Конец временного диапазона (ISO 8601)
  'interval': 60 // Number | Интервал в минутах (по умолчанию 60)
};
apiInstance.getKnowledgebaseStatistics(id, opts, (error, data, response) => {
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
 **id** | **Number**| ID базы знаний | 
 **startTime** | **Date**| Начало временного диапазона (ISO 8601) | [optional] 
 **endTime** | **Date**| Конец временного диапазона (ISO 8601) | [optional] 
 **interval** | **Number**| Интервал в минутах (по умолчанию 60) | [optional] [default to 60]

### Return type

[**GetKnowledgebaseStatistics200Response**](GetKnowledgebaseStatistics200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getKnowledgebases

> GetKnowledgebases200Response getKnowledgebases()

Получение списка баз знаний

Чтобы получить список баз знаний, отправьте GET-запрос на &#x60;/api/v1/cloud-ai/knowledge-bases&#x60;.  Тело ответа будет представлять собой объект JSON с ключом &#x60;knowledgebases&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.KnowledgeBasesApi();
apiInstance.getKnowledgebases((error, data, response) => {
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

[**GetKnowledgebases200Response**](GetKnowledgebases200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## linkKnowledgebaseToAgent

> linkKnowledgebaseToAgent(id, agentId)

Привязка базы знаний к агенту

Чтобы привязать базу знаний к AI агенту, отправьте POST-запрос на &#x60;/api/v1/cloud-ai/knowledge-bases/{id}/link/{agent_id}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.KnowledgeBasesApi();
let id = 1; // Number | ID базы знаний
let agentId = 1; // Number | ID агента
apiInstance.linkKnowledgebaseToAgent(id, agentId, (error, data, response) => {
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
 **id** | **Number**| ID базы знаний | 
 **agentId** | **Number**| ID агента | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## reindexDocument

> reindexDocument(id, documentId)

Переиндексация документа

Чтобы переиндексировать документ в базе знаний, отправьте POST-запрос на &#x60;/api/v1/cloud-ai/knowledge-bases/{id}/documents/{document_id}/reindex&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.KnowledgeBasesApi();
let id = 1; // Number | ID базы знаний
let documentId = 1; // Number | ID документа
apiInstance.reindexDocument(id, documentId, (error, data, response) => {
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
 **id** | **Number**| ID базы знаний | 
 **documentId** | **Number**| ID документа | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## unlinkKnowledgebaseFromAgent

> unlinkKnowledgebaseFromAgent(id, agentId)

Отвязка базы знаний от агента

Чтобы отвязать базу знаний от AI агента, отправьте DELETE-запрос на &#x60;/api/v1/cloud-ai/knowledge-bases/{id}/link/{agent_id}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.KnowledgeBasesApi();
let id = 1; // Number | ID базы знаний
let agentId = 1; // Number | ID агента
apiInstance.unlinkKnowledgebaseFromAgent(id, agentId, (error, data, response) => {
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
 **id** | **Number**| ID базы знаний | 
 **agentId** | **Number**| ID агента | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## updateKnowledgebase

> CreateKnowledgebase201Response updateKnowledgebase(id, updateKnowledgebase)

Обновление базы знаний

Чтобы обновить базу знаний, отправьте PATCH-запрос на &#x60;/api/v1/cloud-ai/knowledge-bases/{id}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.KnowledgeBasesApi();
let id = 1; // Number | ID базы знаний
let updateKnowledgebase = new TimewebCloudApi.UpdateKnowledgebase(); // UpdateKnowledgebase | 
apiInstance.updateKnowledgebase(id, updateKnowledgebase, (error, data, response) => {
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
 **id** | **Number**| ID базы знаний | 
 **updateKnowledgebase** | [**UpdateKnowledgebase**](UpdateKnowledgebase.md)|  | 

### Return type

[**CreateKnowledgebase201Response**](CreateKnowledgebase201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## uploadFilesToKnowledgebase

> UploadFilesToKnowledgebase200Response uploadFilesToKnowledgebase(id, files)

Загрузка файлов в базу знаний

Чтобы загрузить файлы в базу знаний, отправьте POST-запрос на &#x60;/api/v1/cloud-ai/knowledge-bases/{id}/upload&#x60; с файлами в формате multipart/form-data.  Поддерживаемые форматы: CSV, XML, Markdown (md), HTML, TXT. JSON не поддерживается. Максимум 10 файлов, до 10 МБ каждый.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.KnowledgeBasesApi();
let id = 1; // Number | ID базы знаний
let files = ["null"]; // [File] | Файлы для загрузки (максимум 10 файлов, 10 МБ каждый)
apiInstance.uploadFilesToKnowledgebase(id, files, (error, data, response) => {
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
 **id** | **Number**| ID базы знаний | 
 **files** | **[File]**| Файлы для загрузки (максимум 10 файлов, 10 МБ каждый) | 

### Return type

[**UploadFilesToKnowledgebase200Response**](UploadFilesToKnowledgebase200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: multipart/form-data
- **Accept**: application/json

