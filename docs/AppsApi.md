# TimewebCloudApi.AppsApi

All URIs are relative to *https://api.timeweb.cloud*

Method | HTTP request | Description
------------- | ------------- | -------------
[**addProvider**](AppsApi.md#addProvider) | **POST** /api/v1/vcs-provider | Привязка vcs провайдера
[**createApp**](AppsApi.md#createApp) | **POST** /api/v1/apps | Создание приложения
[**createDeploy**](AppsApi.md#createDeploy) | **POST** /api/v1/apps/{app_id}/deploy | Запуск деплоя приложения
[**deleteApp**](AppsApi.md#deleteApp) | **DELETE** /api/v1/apps/{app_id} | Удаление приложения
[**deleteProvider**](AppsApi.md#deleteProvider) | **DELETE** /api/v1/vcs-provider/{provider_id} | Отвязка vcs провайдера от аккаунта
[**deployAction**](AppsApi.md#deployAction) | **POST** /api/v1/apps/{app_id}/deploy/{deploy_id}/stop | Остановка деплоя приложения
[**getApp**](AppsApi.md#getApp) | **GET** /api/v1/apps/{app_id} | Получение приложения по id
[**getAppDeploys**](AppsApi.md#getAppDeploys) | **GET** /api/v1/apps/{app_id}/deploys | Получение списка деплоев приложения
[**getAppLogs**](AppsApi.md#getAppLogs) | **GET** /api/v1/apps/{app_id}/logs | Получение логов приложения
[**getAppStatistics**](AppsApi.md#getAppStatistics) | **GET** /api/v1/apps/{app_id}/statistics | Получение статистики приложения
[**getApps**](AppsApi.md#getApps) | **GET** /api/v1/apps | Получение списка приложений
[**getAppsPresets**](AppsApi.md#getAppsPresets) | **GET** /api/v1/presets/apps | Получение списка доступных тарифов для приложения
[**getBranches**](AppsApi.md#getBranches) | **GET** /api/v1/vcs-provider/{provider_id}/repository/{repository_id} | Получение списка веток репозитория
[**getCommits**](AppsApi.md#getCommits) | **GET** /api/v1/vcs-provider/{provider_id}/repository/{repository_id}/branch | Получение списка коммитов ветки репозитория
[**getDeployLogs**](AppsApi.md#getDeployLogs) | **GET** /api/v1/apps/{app_id}/deploy/{deploy_id}/logs | Получение логов деплоя приложения
[**getDeploySettings**](AppsApi.md#getDeploySettings) | **GET** /api/v1/deploy-settings/apps | Получение списка дефолтных настроек деплоя для приложения
[**getFrameworks**](AppsApi.md#getFrameworks) | **GET** /api/v1/frameworks/apps | Получение списка доступных фреймворков для приложения
[**getProviders**](AppsApi.md#getProviders) | **GET** /api/v1/vcs-provider | Получение списка vcs провайдеров
[**getRepositories**](AppsApi.md#getRepositories) | **GET** /api/v1/vcs-provider/{provider_id} | Получение списка репозиториев vcs провайдера
[**updateAppSettings**](AppsApi.md#updateAppSettings) | **PATCH** /api/v1/apps/{app_id} | Изменение настроек приложения
[**updateAppState**](AppsApi.md#updateAppState) | **PATCH** /api/v1/apps/{app_id}/action/{action} | Изменение состояния приложения



## addProvider

> AddProvider201Response addProvider(addGithub)

Привязка vcs провайдера

Чтобы привязать аккаунт провайдера отправьте POST-запрос в &#x60;/api/v1/vcs-provider&#x60;, задав необходимые атрибуты.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AppsApi();
let addGithub = new TimewebCloudApi.AddGithub(); // AddGithub | 
apiInstance.addProvider(addGithub, (error, data, response) => {
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
 **addGithub** | [**AddGithub**](AddGithub.md)|  | 

### Return type

[**AddProvider201Response**](AddProvider201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## createApp

> CreateApp201Response createApp(createApp)

Создание приложения

Чтобы создать приложение, отправьте POST-запрос в &#x60;/api/v1/apps&#x60;, задав необходимые атрибуты.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AppsApi();
let createApp = new TimewebCloudApi.CreateApp(); // CreateApp | 
apiInstance.createApp(createApp, (error, data, response) => {
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
 **createApp** | [**CreateApp**](CreateApp.md)|  | 

### Return type

[**CreateApp201Response**](CreateApp201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## createDeploy

> CreateDeploy201Response createDeploy(appId, createDeployRequest)

Запуск деплоя приложения

Чтобы запустить деплой приложения, отправьте POST-запрос в &#x60;/api/v1/apps/{app_id}/deploy&#x60;, задав необходимые атрибуты.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AppsApi();
let appId = "appId_example"; // String | 
let createDeployRequest = new TimewebCloudApi.CreateDeployRequest(); // CreateDeployRequest | 
apiInstance.createDeploy(appId, createDeployRequest, (error, data, response) => {
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
 **appId** | **String**|  | 
 **createDeployRequest** | [**CreateDeployRequest**](CreateDeployRequest.md)|  | 

### Return type

[**CreateDeploy201Response**](CreateDeploy201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deleteApp

> deleteApp(appId)

Удаление приложения

Чтобы удалить приложение, отправьте DELETE-запрос в &#x60;/api/v1/apps/{app_id}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AppsApi();
let appId = "appId_example"; // String | 
apiInstance.deleteApp(appId, (error, data, response) => {
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
 **appId** | **String**|  | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## deleteProvider

> deleteProvider(providerId)

Отвязка vcs провайдера от аккаунта

Чтобы отвязать vcs провайдера от аккаунта, отправьте DELETE-запрос в &#x60;/api/v1/vcs-provider/{provider_id}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AppsApi();
let providerId = "providerId_example"; // String | 
apiInstance.deleteProvider(providerId, (error, data, response) => {
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
 **providerId** | **String**|  | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## deployAction

> CreateDeploy201Response deployAction(appId, deployId)

Остановка деплоя приложения

Чтобы остановить деплой приложения, отправьте POST-запрос в &#x60;api/v1/apps/{app_id}/deploy/{deploy_id}/stop&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AppsApi();
let appId = "appId_example"; // String | 
let deployId = "deployId_example"; // String | 
apiInstance.deployAction(appId, deployId, (error, data, response) => {
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
 **appId** | **String**|  | 
 **deployId** | **String**|  | 

### Return type

[**CreateDeploy201Response**](CreateDeploy201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getApp

> CreateApp201Response getApp(appId)

Получение приложения по id

Чтобы получить приложение по id, отправьте GET-запрос на &#x60;/api/v1/apps/{app_id}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AppsApi();
let appId = "appId_example"; // String | 
apiInstance.getApp(appId, (error, data, response) => {
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
 **appId** | **String**|  | 

### Return type

[**CreateApp201Response**](CreateApp201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getAppDeploys

> GetAppDeploys200Response getAppDeploys(appId, opts)

Получение списка деплоев приложения

Чтобы получить список деплоев приложения, отправьте GET-запрос на &#x60;/api/v1/apps/{app_id}/deploys&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AppsApi();
let appId = "appId_example"; // String | 
let opts = {
  'limit': 5, // Number | Обозначает количество записей, которое необходимо вернуть.
  'offset': 0 // Number | Указывает на смещение относительно начала списка.
};
apiInstance.getAppDeploys(appId, opts, (error, data, response) => {
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
 **appId** | **String**|  | 
 **limit** | **Number**| Обозначает количество записей, которое необходимо вернуть. | [optional] [default to 5]
 **offset** | **Number**| Указывает на смещение относительно начала списка. | [optional] [default to 0]

### Return type

[**GetAppDeploys200Response**](GetAppDeploys200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getAppLogs

> GetAppLogs200Response getAppLogs(appId)

Получение логов приложения

Чтобы получить логи приложения, отправьте GET-запрос на &#x60;/api/v1/apps/{app_id}/logs&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AppsApi();
let appId = "appId_example"; // String | 
apiInstance.getAppLogs(appId, (error, data, response) => {
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
 **appId** | **String**|  | 

### Return type

[**GetAppLogs200Response**](GetAppLogs200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getAppStatistics

> GetServerStatistics200Response getAppStatistics(appId, dateFrom, dateTo)

Получение статистики приложения

Чтобы получить статистику сервера, отправьте GET-запрос на &#x60;/api/v1/apps/{app_id}/statistics&#x60;. Метод поддерживает только приложения &#x60;type: backend&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AppsApi();
let appId = "appId_example"; // String | 
let dateFrom = "dateFrom_example"; // String | Дата начала сбора статистики. Строка в формате ISO 8061, закодированная в ASCII, пример: `2023-05-25%202023-05-25T14%3A35%3A38`
let dateTo = "dateTo_example"; // String | Дата окончания сбора статистики. Строка в формате ISO 8061, закодированная в ASCII, пример: `2023-05-26%202023-05-25T14%3A35%3A38`
apiInstance.getAppStatistics(appId, dateFrom, dateTo, (error, data, response) => {
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
 **appId** | **String**|  | 
 **dateFrom** | **String**| Дата начала сбора статистики. Строка в формате ISO 8061, закодированная в ASCII, пример: &#x60;2023-05-25%202023-05-25T14%3A35%3A38&#x60; | 
 **dateTo** | **String**| Дата окончания сбора статистики. Строка в формате ISO 8061, закодированная в ASCII, пример: &#x60;2023-05-26%202023-05-25T14%3A35%3A38&#x60; | 

### Return type

[**GetServerStatistics200Response**](GetServerStatistics200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getApps

> GetApps200Response getApps()

Получение списка приложений

Чтобы получить список приложений, отправьте GET-запрос на &#x60;/api/v1/apps&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AppsApi();
apiInstance.getApps((error, data, response) => {
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

[**GetApps200Response**](GetApps200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getAppsPresets

> AppsPresets getAppsPresets(appId)

Получение списка доступных тарифов для приложения

Чтобы получить список доступных тарифов, отправьте GET-запрос на &#x60;/api/v1/presets/apps&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AppsApi();
let appId = "appId_example"; // String | 
apiInstance.getAppsPresets(appId, (error, data, response) => {
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
 **appId** | **String**|  | 

### Return type

[**AppsPresets**](AppsPresets.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getBranches

> GetBranches200Response getBranches(providerId, repositoryId)

Получение списка веток репозитория

Чтобы получить список веток репозитория, отправьте GET-запрос на &#x60;/api/v1/vcs-provider/{provider_id}/repository/{repository_id}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AppsApi();
let providerId = "providerId_example"; // String | 
let repositoryId = "repositoryId_example"; // String | 
apiInstance.getBranches(providerId, repositoryId, (error, data, response) => {
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
 **providerId** | **String**|  | 
 **repositoryId** | **String**|  | 

### Return type

[**GetBranches200Response**](GetBranches200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getCommits

> GetCommits200Response getCommits(accountId, providerId, repositoryId, name)

Получение списка коммитов ветки репозитория

Чтобы получить список коммитов ветки репозитория, отправьте GET-запрос на &#x60;/api/v1/vcs-provider/{provider_id}/repository/{repository_id}/branch&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AppsApi();
let accountId = "accountId_example"; // String | 
let providerId = "providerId_example"; // String | 
let repositoryId = "repositoryId_example"; // String | 
let name = "name_example"; // String | Название ветки
apiInstance.getCommits(accountId, providerId, repositoryId, name, (error, data, response) => {
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
 **accountId** | **String**|  | 
 **providerId** | **String**|  | 
 **repositoryId** | **String**|  | 
 **name** | **String**| Название ветки | 

### Return type

[**GetCommits200Response**](GetCommits200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getDeployLogs

> GetDeployLogs200Response getDeployLogs(appId, deployId, opts)

Получение логов деплоя приложения

Чтобы получить информацию о деплое, отправьте GET-запрос на &#x60;api/v1/apps/{app_id}/deploy/{deploy_id}/logs&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AppsApi();
let appId = "appId_example"; // String | 
let deployId = "deployId_example"; // String | 
let opts = {
  'debug': true // Boolean | Управляет выводом логов деплоя
};
apiInstance.getDeployLogs(appId, deployId, opts, (error, data, response) => {
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
 **appId** | **String**|  | 
 **deployId** | **String**|  | 
 **debug** | **Boolean**| Управляет выводом логов деплоя | [optional] 

### Return type

[**GetDeployLogs200Response**](GetDeployLogs200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getDeploySettings

> GetDeploySettings200Response getDeploySettings(appId)

Получение списка дефолтных настроек деплоя для приложения

Чтобы получить список настроек деплоя, отправьте GET-запрос на &#x60;/api/v1/deploy-settings/apps&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AppsApi();
let appId = "appId_example"; // String | 
apiInstance.getDeploySettings(appId, (error, data, response) => {
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
 **appId** | **String**|  | 

### Return type

[**GetDeploySettings200Response**](GetDeploySettings200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getFrameworks

> AvailableFrameworks getFrameworks(appId)

Получение списка доступных фреймворков для приложения

Чтобы получить список доступных фреймворков, отправьте GET-запрос на &#x60;/api/v1/frameworks/apps&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AppsApi();
let appId = "appId_example"; // String | 
apiInstance.getFrameworks(appId, (error, data, response) => {
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
 **appId** | **String**|  | 

### Return type

[**AvailableFrameworks**](AvailableFrameworks.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getProviders

> GetProviders200Response getProviders()

Получение списка vcs провайдеров

Чтобы получить список vcs провайдеров, отправьте GET-запрос на &#x60;/api/v1/vcs-provider&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AppsApi();
apiInstance.getProviders((error, data, response) => {
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

[**GetProviders200Response**](GetProviders200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getRepositories

> GetRepositories200Response getRepositories(providerId)

Получение списка репозиториев vcs провайдера

Чтобы получить список репозиториев vcs провайдера, отправьте GET-запрос на &#x60;/api/v1/vcs-provider/{provider_id}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AppsApi();
let providerId = "providerId_example"; // String | 
apiInstance.getRepositories(providerId, (error, data, response) => {
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
 **providerId** | **String**|  | 

### Return type

[**GetRepositories200Response**](GetRepositories200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## updateAppSettings

> UpdateAppSettings200Response updateAppSettings(appId, updeteSettings)

Изменение настроек приложения

Чтобы изменить настройки приложения отправьте PATCH-запрос в &#x60;/api/v1/apps/{app_id}&#x60;, задав необходимые атрибуты.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AppsApi();
let appId = "appId_example"; // String | 
let updeteSettings = new TimewebCloudApi.UpdeteSettings(); // UpdeteSettings | 
apiInstance.updateAppSettings(appId, updeteSettings, (error, data, response) => {
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
 **appId** | **String**|  | 
 **updeteSettings** | [**UpdeteSettings**](UpdeteSettings.md)|  | 

### Return type

[**UpdateAppSettings200Response**](UpdateAppSettings200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## updateAppState

> updateAppState(appId, action)

Изменение состояния приложения

Чтобы изменить состояние приложения отправьте PATCH-запрос в &#x60;/api/v1/apps/{app_id}/action/{action}&#x60;, задав необходимые атрибуты.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AppsApi();
let appId = "appId_example"; // String | 
let action = "action_example"; // String | 
apiInstance.updateAppState(appId, action, (error, data, response) => {
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
 **appId** | **String**|  | 
 **action** | **String**|  | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

