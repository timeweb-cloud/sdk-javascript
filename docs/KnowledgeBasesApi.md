# TimewebCloudApi.KnowledgeBasesApi

All URIs are relative to *https://api.timeweb.cloud*

Method | HTTP request | Description
------------- | ------------- | -------------
[**addAdditionalTokenPackageToKnowledgebase**](KnowledgeBasesApi.md#addAdditionalTokenPackageToKnowledgebase) | **POST** /api/v1/cloud-ai/knowledge-bases/{id}/add-additional-token-package | Покупка дополнительных пакетов токенов
[**createKnowledgebase**](KnowledgeBasesApi.md#createKnowledgebase) | **POST** /api/v1/cloud-ai/knowledge-bases | Создание базы знаний
[**createKnowledgebaseDocument**](KnowledgeBasesApi.md#createKnowledgebaseDocument) | **POST** /api/v1/cloud-ai/knowledge-bases/{id}/documents | Добавление документа по ссылке
[**deleteDocument**](KnowledgeBasesApi.md#deleteDocument) | **DELETE** /api/v1/cloud-ai/knowledge-bases/{id}/documents/{document_id} | Удаление документа из базы знаний
[**deleteKnowledgebase**](KnowledgeBasesApi.md#deleteKnowledgebase) | **DELETE** /api/v1/cloud-ai/knowledge-bases/{id} | Удаление базы знаний
[**downloadDocument**](KnowledgeBasesApi.md#downloadDocument) | **GET** /api/v1/cloud-ai/knowledge-bases/{id}/documents/{document_id}/download | Скачивание файла документа
[**getKnowledgebase**](KnowledgeBasesApi.md#getKnowledgebase) | **GET** /api/v1/cloud-ai/knowledge-bases/{id} | Получение базы знаний со списком документов
[**getKnowledgebaseDocumentsV2**](KnowledgeBasesApi.md#getKnowledgebaseDocumentsV2) | **GET** /api/v2/cloud-ai/knowledge-bases/{id}/documents | Получение списка документов базы знаний
[**getKnowledgebaseV3**](KnowledgeBasesApi.md#getKnowledgebaseV3) | **GET** /api/v3/cloud-ai/knowledge-bases/{id} | Получение базы знаний
[**getKnowledgebases**](KnowledgeBasesApi.md#getKnowledgebases) | **GET** /api/v1/cloud-ai/knowledge-bases | Получение списка баз знаний (v1)
[**getKnowledgebasesV2**](KnowledgeBasesApi.md#getKnowledgebasesV2) | **GET** /api/v2/cloud-ai/knowledge-bases | Получение списка баз знаний (v2)
[**getKnowledgebasesV3**](KnowledgeBasesApi.md#getKnowledgebasesV3) | **GET** /api/v3/cloud-ai/knowledge-bases | Получение списка баз знаний
[**linkKnowledgebaseToAgent**](KnowledgeBasesApi.md#linkKnowledgebaseToAgent) | **POST** /api/v1/cloud-ai/knowledge-bases/{id}/link/{agent_id} | Привязка базы знаний к агенту
[**reindexDocument**](KnowledgeBasesApi.md#reindexDocument) | **POST** /api/v1/cloud-ai/knowledge-bases/{id}/documents/{document_id}/reindex | Переиндексация документа
[**unlinkKnowledgebaseFromAgent**](KnowledgeBasesApi.md#unlinkKnowledgebaseFromAgent) | **DELETE** /api/v1/cloud-ai/knowledge-bases/{id}/link/{agent_id} | Отвязка базы знаний от агента
[**updateKnowledgebase**](KnowledgeBasesApi.md#updateKnowledgebase) | **PATCH** /api/v1/cloud-ai/knowledge-bases/{id} | Изменение базы знаний
[**updateKnowledgebaseAgentLink**](KnowledgeBasesApi.md#updateKnowledgebaseAgentLink) | **PATCH** /api/v1/cloud-ai/knowledge-bases/{id}/link/{agent_id} | Изменение режима поиска по базе знаний для агента
[**updateKnowledgebaseDocument**](KnowledgeBasesApi.md#updateKnowledgebaseDocument) | **PATCH** /api/v1/cloud-ai/knowledge-bases/{id}/documents/{document_id} | Изменение документа
[**uploadFilesToKnowledgebase**](KnowledgeBasesApi.md#uploadFilesToKnowledgebase) | **POST** /api/v1/cloud-ai/knowledge-bases/{id}/upload | Загрузка файлов в базу знаний



## addAdditionalTokenPackageToKnowledgebase

> addAdditionalTokenPackageToKnowledgebase(id, opts)

Покупка дополнительных пакетов токенов

Чтобы докупить токены для базы знаний, отправьте POST-запрос на &#x60;/api/v1/cloud-ai/knowledge-bases/{id}/add-additional-token-package&#x60;.  Покупается дополнительный пакет (&#x60;package_type: additional&#x60;) из &#x60;GET /api/v1/cloud-ai/token-packages/knowledge-bases&#x60; в количестве &#x60;count&#x60;. Стоимость списывается с баланса, токены добавляются к текущему периоду подписки, заблокированная база знаний разблокируется.  Возможные ошибки: - &#x60;400 insufficient_balance&#x60; — на балансе недостаточно средств - &#x60;400 subscription_expired&#x60; — база знаний заблокирована и дата продления подписки прошла: продлите подписку в панели управления - &#x60;404 additional_token_package_not_found&#x60; — дополнительный пакет недоступен

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
  'knowledgebaseAddTokenPackage': new TimewebCloudApi.KnowledgebaseAddTokenPackage() // KnowledgebaseAddTokenPackage | 
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
 **knowledgebaseAddTokenPackage** | [**KnowledgebaseAddTokenPackage**](KnowledgebaseAddTokenPackage.md)|  | [optional] 

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

Чтобы создать базу знаний, отправьте POST-запрос на &#x60;/api/v1/cloud-ai/knowledge-bases&#x60;, задав необходимые атрибуты.  Для базы знаний в вашем аккаунте создаётся кластер базы данных OpenSearch по выбранному тарифу в указанной приватной сети, а с баланса сразу списывается стоимость пакета токенов. Подписка продлевается автоматически раз в период пакета.  Пока кластер создаётся, база знаний находится в статусе &#x60;creating&#x60;; документы, добавленные в это время, будут проиндексированы после перехода в &#x60;active&#x60;.  Возможные ошибки: - &#x60;404 token_package_not_found&#x60; — пакет токенов не найден или недоступен - &#x60;400 invalid_token_package_type&#x60; — пакет не является базовым пакетом для баз знаний - &#x60;400 insufficient_balance&#x60; — на балансе недостаточно средств для оплаты пакета  Тело ответа будет представлять собой объект JSON с ключом &#x60;knowledge_base&#x60;.

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


## createKnowledgebaseDocument

> CreateKnowledgebaseDocument201Response createKnowledgebaseDocument(id, createDocument)

Добавление документа по ссылке

Чтобы добавить в базу знаний документ по ссылке, отправьте POST-запрос на &#x60;/api/v1/cloud-ai/knowledge-bases/{id}/documents&#x60;.  Перед добавлением выполняется HEAD-запрос к &#x60;url&#x60;: адрес должен быть публично доступен, а ответ — содержать заголовок &#x60;Content-Type&#x60; одного из поддерживаемых форматов (текст, Markdown, HTML, XML, CSV, PDF, DOC, DOCX, XLS, XLSX; JSON не поддерживается). Документ сразу ставится в очередь на индексацию. Чтобы содержимое по ссылке переиндексировалось автоматически, задайте &#x60;indexing_schedule&#x60;.  Возможные ошибки: - &#x60;400 url_is_not_accessible&#x60; — адрес недоступен или вернул ошибку - &#x60;400 unsupported_file_type&#x60; — неподдерживаемый &#x60;Content-Type&#x60;  Тело ответа будет представлять собой объект JSON с ключом &#x60;document&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.KnowledgeBasesApi();
let id = 1; // Number | ID базы знаний
let createDocument = new TimewebCloudApi.CreateDocument(); // CreateDocument | 
apiInstance.createKnowledgebaseDocument(id, createDocument, (error, data, response) => {
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
 **createDocument** | [**CreateDocument**](CreateDocument.md)|  | 

### Return type

[**CreateKnowledgebaseDocument201Response**](CreateKnowledgebaseDocument201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deleteDocument

> deleteDocument(id, documentId)

Удаление документа из базы знаний

Чтобы удалить документ из базы знаний, отправьте DELETE-запрос на &#x60;/api/v1/cloud-ai/knowledge-bases/{id}/documents/{document_id}&#x60;.  Документ удаляется вместе с его фрагментами в поисковом индексе.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.KnowledgeBasesApi();
let id = 1; // Number | ID базы знаний
let documentId = 286071; // Number | ID документа
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

Чтобы удалить базу знаний, отправьте DELETE-запрос на &#x60;/api/v1/cloud-ai/knowledge-bases/{id}&#x60;.  База знаний отвязывается от всех агентов, её кластер базы данных OpenSearch удаляется, подписка закрывается.

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

Скачивание файла документа

Чтобы скачать загруженный файл документа, отправьте GET-запрос на &#x60;/api/v1/cloud-ai/knowledge-bases/{id}/documents/{document_id}/download&#x60;.  Доступно только для документов типа &#x60;file&#x60;. Файл возвращается потоком с исходным MIME-типом в заголовке &#x60;Content-Type&#x60; и именем в &#x60;Content-Disposition&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.KnowledgeBasesApi();
let id = 1; // Number | ID базы знаний
let documentId = 286071; // Number | ID документа
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

Получение базы знаний со списком документов

Чтобы получить информацию о базе знаний вместе со всеми её документами, отправьте GET-запрос на &#x60;/api/v1/cloud-ai/knowledge-bases/{id}&#x60;.  Тело ответа будет представлять собой объект JSON с ключом &#x60;knowledge_base&#x60;.

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


## getKnowledgebaseDocumentsV2

> GetKnowledgebaseDocumentsV2200Response getKnowledgebaseDocumentsV2(id, opts)

Получение списка документов базы знаний

Чтобы получить список документов базы знаний с пагинацией, отправьте GET-запрос на &#x60;/api/v2/cloud-ai/knowledge-bases/{id}/documents&#x60;.  Некорректные значения параметров пагинации и сортировки не приводят к ошибке — вместо них применяются значения по умолчанию.  Тело ответа будет представлять собой объект JSON с ключами &#x60;knowledgebase_documents&#x60; и &#x60;meta&#x60;.

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
  'limit': 20, // Number | Количество документов на странице. Значения больше 100 уменьшаются до 100
  'offset': 0, // Number | Количество документов, которые нужно пропустить
  'sortBy': name, // String | Поле сортировки. `indexing_timestamp` — время последнего изменения документа
  'sortOrder': ASC, // String | Порядок сортировки
  'search': faq // String | Фильтр по подстроке в названии документа
};
apiInstance.getKnowledgebaseDocumentsV2(id, opts, (error, data, response) => {
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
 **limit** | **Number**| Количество документов на странице. Значения больше 100 уменьшаются до 100 | [optional] [default to 10]
 **offset** | **Number**| Количество документов, которые нужно пропустить | [optional] [default to 0]
 **sortBy** | **String**| Поле сортировки. &#x60;indexing_timestamp&#x60; — время последнего изменения документа | [optional] [default to &#39;indexing_timestamp&#39;]
 **sortOrder** | **String**| Порядок сортировки | [optional] [default to &#39;DESC&#39;]
 **search** | **String**| Фильтр по подстроке в названии документа | [optional] 

### Return type

[**GetKnowledgebaseDocumentsV2200Response**](GetKnowledgebaseDocumentsV2200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getKnowledgebaseV3

> GetKnowledgebaseV3200Response getKnowledgebaseV3(id)

Получение базы знаний

Чтобы получить информацию о базе знаний, отправьте GET-запрос на &#x60;/api/v3/cloud-ai/knowledge-bases/{id}&#x60;.  Тело ответа будет представлять собой объект JSON с ключом &#x60;knowledge_base&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.KnowledgeBasesApi();
let id = 1; // Number | ID базы знаний
apiInstance.getKnowledgebaseV3(id, (error, data, response) => {
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

[**GetKnowledgebaseV3200Response**](GetKnowledgebaseV3200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getKnowledgebases

> GetKnowledgebases200Response getKnowledgebases()

Получение списка баз знаний (v1)

Метод устарел — используйте &#x60;GET /api/v3/cloud-ai/knowledge-bases&#x60;.  Чтобы получить список баз знаний вместе со всеми их документами, отправьте GET-запрос на &#x60;/api/v1/cloud-ai/knowledge-bases&#x60;.  Тело ответа будет представлять собой объект JSON с ключами &#x60;knowledge_bases&#x60; и &#x60;meta&#x60;.

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


## getKnowledgebasesV2

> GetKnowledgebasesV2200Response getKnowledgebasesV2()

Получение списка баз знаний (v2)

Чтобы получить список баз знаний, отправьте GET-запрос на &#x60;/api/v2/cloud-ai/knowledge-bases&#x60;.  Вместо списка документов возвращается их количество, привязанные агенты — списком ID. Режим поиска для каждого агента возвращает &#x60;GET /api/v3/cloud-ai/knowledge-bases&#x60;.  Тело ответа будет представлять собой объект JSON с ключами &#x60;knowledge_bases&#x60; и &#x60;meta&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.KnowledgeBasesApi();
apiInstance.getKnowledgebasesV2((error, data, response) => {
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

[**GetKnowledgebasesV2200Response**](GetKnowledgebasesV2200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getKnowledgebasesV3

> GetKnowledgebasesV3200Response getKnowledgebasesV3()

Получение списка баз знаний

Чтобы получить список баз знаний, отправьте GET-запрос на &#x60;/api/v3/cloud-ai/knowledge-bases&#x60;.  Ответ содержит количество документов и привязанных агентов с режимом поиска. Документы базы знаний запрашивайте отдельно — &#x60;GET /api/v2/cloud-ai/knowledge-bases/{id}/documents&#x60;.  Тело ответа будет представлять собой объект JSON с ключами &#x60;knowledge_bases&#x60; и &#x60;meta&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.KnowledgeBasesApi();
apiInstance.getKnowledgebasesV3((error, data, response) => {
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

[**GetKnowledgebasesV3200Response**](GetKnowledgebasesV3200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## linkKnowledgebaseToAgent

> linkKnowledgebaseToAgent(id, agentId, opts)

Привязка базы знаний к агенту

Чтобы привязать базу знаний к AI агенту, отправьте POST-запрос на &#x60;/api/v1/cloud-ai/knowledge-bases/{id}/link/{agent_id}&#x60;.  Тело запроса необязательно: в нём можно выбрать режим поиска &#x60;retrievalMode&#x60; (по умолчанию &#x60;agentic&#x60;). Изменить режим для существующей привязки можно запросом PATCH на тот же адрес.  Возможные ошибки: &#x60;404 knowledgebase_not_found&#x60;, &#x60;404 agent_not_found&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.KnowledgeBasesApi();
let id = 1; // Number | ID базы знаний
let agentId = 101; // Number | ID AI агента
let opts = {
  'linkKnowledgebase': new TimewebCloudApi.LinkKnowledgebase() // LinkKnowledgebase | 
};
apiInstance.linkKnowledgebaseToAgent(id, agentId, opts, (error, data, response) => {
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
 **agentId** | **Number**| ID AI агента | 
 **linkKnowledgebase** | [**LinkKnowledgebase**](LinkKnowledgebase.md)|  | [optional] 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## reindexDocument

> reindexDocument(id, documentId)

Переиндексация документа

Чтобы переиндексировать документ, отправьте POST-запрос на &#x60;/api/v1/cloud-ai/knowledge-bases/{id}/documents/{document_id}/reindex&#x60;.  Документ ставится в очередь на индексацию; следите за полем &#x60;status&#x60; документа. Для документа по ссылке содержимое скачивается заново. Если база знаний не в статусе &#x60;active&#x60;, документ будет проиндексирован после активации.  Возможные ошибки: &#x60;404 knowledgebase_not_found&#x60;, &#x60;404 document_not_found&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.KnowledgeBasesApi();
let id = 1; // Number | ID базы знаний
let documentId = 286071; // Number | ID документа
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

Чтобы отвязать базу знаний от AI агента, отправьте DELETE-запрос на &#x60;/api/v1/cloud-ai/knowledge-bases/{id}/link/{agent_id}&#x60;.  Возможные ошибки: &#x60;404 knowledgebase_not_found&#x60;, &#x60;404 agent_not_found&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.KnowledgeBasesApi();
let id = 1; // Number | ID базы знаний
let agentId = 101; // Number | ID AI агента
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
 **agentId** | **Number**| ID AI агента | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## updateKnowledgebase

> CreateKnowledgebase201Response updateKnowledgebase(id, updateKnowledgebase)

Изменение базы знаний

Чтобы изменить название или описание базы знаний, отправьте PATCH-запрос на &#x60;/api/v1/cloud-ai/knowledge-bases/{id}&#x60;.  Тело ответа будет представлять собой объект JSON с ключом &#x60;knowledge_base&#x60;.

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


## updateKnowledgebaseAgentLink

> updateKnowledgebaseAgentLink(id, agentId, opts)

Изменение режима поиска по базе знаний для агента

Чтобы изменить режим поиска по привязанной базе знаний для AI агента, отправьте PATCH-запрос на &#x60;/api/v1/cloud-ai/knowledge-bases/{id}/link/{agent_id}&#x60;.  Если &#x60;retrievalMode&#x60; не передан, устанавливается &#x60;agentic&#x60;. Если база знаний не привязана к агенту, запрос ничего не меняет и также возвращает &#x60;204&#x60;.  Возможные ошибки: &#x60;404 knowledgebase_not_found&#x60;, &#x60;404 agent_not_found&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.KnowledgeBasesApi();
let id = 1; // Number | ID базы знаний
let agentId = 101; // Number | ID AI агента
let opts = {
  'linkKnowledgebase': new TimewebCloudApi.LinkKnowledgebase() // LinkKnowledgebase | 
};
apiInstance.updateKnowledgebaseAgentLink(id, agentId, opts, (error, data, response) => {
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
 **agentId** | **Number**| ID AI агента | 
 **linkKnowledgebase** | [**LinkKnowledgebase**](LinkKnowledgebase.md)|  | [optional] 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## updateKnowledgebaseDocument

> CreateKnowledgebaseDocument201Response updateKnowledgebaseDocument(id, documentId, updateDocument)

Изменение документа

Чтобы изменить документ базы знаний, отправьте PATCH-запрос на &#x60;/api/v1/cloud-ai/knowledge-bases/{id}/documents/{document_id}&#x60;.  Можно изменить название, расписание переиндексации и — только для документов типа &#x60;link&#x60; — адрес. После смены адреса документ переиндексируется; изменение названия и расписания переиндексацию не запускает. Новый адрес проверяется так же, как при добавлении документа.  Тело ответа будет представлять собой объект JSON с ключом &#x60;document&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.KnowledgeBasesApi();
let id = 1; // Number | ID базы знаний
let documentId = 286071; // Number | ID документа
let updateDocument = new TimewebCloudApi.UpdateDocument(); // UpdateDocument | 
apiInstance.updateKnowledgebaseDocument(id, documentId, updateDocument, (error, data, response) => {
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
 **updateDocument** | [**UpdateDocument**](UpdateDocument.md)|  | 

### Return type

[**CreateKnowledgebaseDocument201Response**](CreateKnowledgebaseDocument201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## uploadFilesToKnowledgebase

> UploadResult uploadFilesToKnowledgebase(id, files)

Загрузка файлов в базу знаний

Чтобы загрузить файлы в базу знаний, отправьте POST-запрос на &#x60;/api/v1/cloud-ai/knowledge-bases/{id}/upload&#x60; с файлами в поле &#x60;files&#x60; формата &#x60;multipart/form-data&#x60;. Для каждого файла создаётся документ типа &#x60;file&#x60;, после загрузки документы ставятся в очередь на индексацию (если база знаний в статусе &#x60;active&#x60;; иначе — после активации).  Поддерживаемые форматы: TXT, Markdown (&#x60;md&#x60;, &#x60;markdown&#x60;), HTML (&#x60;html&#x60;, &#x60;htm&#x60;), XML, CSV, PDF, DOC, DOCX, XLS, XLSX, а также другие файлы с MIME-типом &#x60;text/_*&#x60;. JSON (&#x60;json&#x60;, &#x60;jsonl&#x60;, &#x60;ndjson&#x60;) не поддерживается. Размер одного файла — не более 50 МБ.  Если хотя бы один файл неподдерживаемого формата, запрос завершается ошибкой.  Тело ответа будет представлять собой объект JSON с ключами &#x60;uploadedFiles&#x60; и &#x60;documents&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.KnowledgeBasesApi();
let id = 1; // Number | ID базы знаний
let files = ["null"]; // [File] | Файлы для загрузки
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
 **files** | **[File]**| Файлы для загрузки | 

### Return type

[**UploadResult**](UploadResult.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: multipart/form-data
- **Accept**: application/json

