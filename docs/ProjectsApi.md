# TimewebCloudApi.ProjectsApi

All URIs are relative to *https://api.timeweb.cloud*

Method | HTTP request | Description
------------- | ------------- | -------------
[**addBalancerToProject**](ProjectsApi.md#addBalancerToProject) | **POST** /api/v1/projects/{project_id}/resources/balancers | Добавление балансировщика в проект
[**addClusterToProject**](ProjectsApi.md#addClusterToProject) | **POST** /api/v1/projects/{project_id}/resources/clusters | Добавление кластера в проект
[**addDatabaseToProject**](ProjectsApi.md#addDatabaseToProject) | **POST** /api/v1/projects/{project_id}/resources/databases | Добавление базы данных в проект
[**addDedicatedServerToProject**](ProjectsApi.md#addDedicatedServerToProject) | **POST** /api/v1/projects/{project_id}/resources/dedicated | Добавление выделенного сервера в проект
[**addServerToProject**](ProjectsApi.md#addServerToProject) | **POST** /api/v1/projects/{project_id}/resources/servers | Добавление сервера в проект
[**addStorageToProject**](ProjectsApi.md#addStorageToProject) | **POST** /api/v1/projects/{project_id}/resources/buckets | Добавление хранилища в проект
[**createProject**](ProjectsApi.md#createProject) | **POST** /api/v1/projects | Создание проекта
[**deleteProject**](ProjectsApi.md#deleteProject) | **DELETE** /api/v1/projects/{project_id} | Удаление проекта
[**getAccountBalancers**](ProjectsApi.md#getAccountBalancers) | **GET** /api/v1/projects/resources/balancers | Получение списка всех балансировщиков на аккаунте
[**getAccountClusters**](ProjectsApi.md#getAccountClusters) | **GET** /api/v1/projects/resources/clusters | Получение списка всех кластеров на аккаунте
[**getAccountDatabases**](ProjectsApi.md#getAccountDatabases) | **GET** /api/v1/projects/resources/databases | Получение списка всех баз данных на аккаунте
[**getAccountDedicatedServers**](ProjectsApi.md#getAccountDedicatedServers) | **GET** /api/v1/projects/resources/dedicated | Получение списка всех выделенных серверов на аккаунте
[**getAccountServers**](ProjectsApi.md#getAccountServers) | **GET** /api/v1/projects/resources/servers | Получение списка всех серверов на аккаунте
[**getAccountStorages**](ProjectsApi.md#getAccountStorages) | **GET** /api/v1/projects/resources/buckets | Получение списка всех хранилищ на аккаунте
[**getAllProjectResources**](ProjectsApi.md#getAllProjectResources) | **GET** /api/v1/projects/{project_id}/resources | Получение всех ресурсов проекта
[**getProject**](ProjectsApi.md#getProject) | **GET** /api/v1/projects/{project_id} | Получение проекта по ID
[**getProjectBalancers**](ProjectsApi.md#getProjectBalancers) | **GET** /api/v1/projects/{project_id}/resources/balancers | Получение списка балансировщиков проекта
[**getProjectClusters**](ProjectsApi.md#getProjectClusters) | **GET** /api/v1/projects/{project_id}/resources/clusters | Получение списка кластеров проекта
[**getProjectDatabases**](ProjectsApi.md#getProjectDatabases) | **GET** /api/v1/projects/{project_id}/resources/databases | Получение списка баз данных проекта
[**getProjectDedicatedServers**](ProjectsApi.md#getProjectDedicatedServers) | **GET** /api/v1/projects/{project_id}/resources/dedicated | Получение списка выделенных серверов проекта
[**getProjectServers**](ProjectsApi.md#getProjectServers) | **GET** /api/v1/projects/{project_id}/resources/servers | Получение списка серверов проекта
[**getProjectStorages**](ProjectsApi.md#getProjectStorages) | **GET** /api/v1/projects/{project_id}/resources/buckets | Получение списка хранилищ проекта
[**getProjects**](ProjectsApi.md#getProjects) | **GET** /api/v1/projects | Получение списка проектов
[**transferResourceToAnotherProject**](ProjectsApi.md#transferResourceToAnotherProject) | **PUT** /api/v1/projects/{project_id}/resources/transfer | Перенести ресурс в другой проект
[**updateProject**](ProjectsApi.md#updateProject) | **PUT** /api/v1/projects/{project_id} | Изменение проекта



## addBalancerToProject

> AddBalancerToProject200Response addBalancerToProject(projectId, addBalancerToProjectRequest)

Добавление балансировщика в проект

Чтобы добавить балансировщик в проект, отправьте POST-запрос на &#x60;/api/v1/projects/{project_id}/resources/balancers&#x60;, задав необходимые атрибуты.  Балансировщик будет добавлен в указанный проект. Тело ответа будет содержать объект JSON с информацией о добавленном балансировщике.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ProjectsApi();
let projectId = 99; // Number | ID проекта.
let addBalancerToProjectRequest = new TimewebCloudApi.AddBalancerToProjectRequest(); // AddBalancerToProjectRequest | 
apiInstance.addBalancerToProject(projectId, addBalancerToProjectRequest, (error, data, response) => {
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
 **projectId** | **Number**| ID проекта. | 
 **addBalancerToProjectRequest** | [**AddBalancerToProjectRequest**](AddBalancerToProjectRequest.md)|  | 

### Return type

[**AddBalancerToProject200Response**](AddBalancerToProject200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## addClusterToProject

> AddBalancerToProject200Response addClusterToProject(projectId, addClusterToProjectRequest)

Добавление кластера в проект

Чтобы добавить кластер в проект, отправьте POST-запрос на &#x60;/api/v1/projects/{project_id}/resources/clusters&#x60;, задав необходимые атрибуты.  Кластер будет добавлен в указанный проект. Тело ответа будет содержать объект JSON с информацией о добавленном кластере.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ProjectsApi();
let projectId = 99; // Number | ID проекта.
let addClusterToProjectRequest = new TimewebCloudApi.AddClusterToProjectRequest(); // AddClusterToProjectRequest | 
apiInstance.addClusterToProject(projectId, addClusterToProjectRequest, (error, data, response) => {
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
 **projectId** | **Number**| ID проекта. | 
 **addClusterToProjectRequest** | [**AddClusterToProjectRequest**](AddClusterToProjectRequest.md)|  | 

### Return type

[**AddBalancerToProject200Response**](AddBalancerToProject200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## addDatabaseToProject

> AddBalancerToProject200Response addDatabaseToProject(projectId, addDatabaseToProjectRequest)

Добавление базы данных в проект

Чтобы добавить базу данных в проект, отправьте POST-запрос на &#x60;/api/v1/projects/{project_id}/resources/databases&#x60;, задав необходимые атрибуты.  База данных будет добавлена в указанный проект. Тело ответа будет содержать объект JSON с информацией о добавленной базе данных.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ProjectsApi();
let projectId = 99; // Number | ID проекта.
let addDatabaseToProjectRequest = new TimewebCloudApi.AddDatabaseToProjectRequest(); // AddDatabaseToProjectRequest | 
apiInstance.addDatabaseToProject(projectId, addDatabaseToProjectRequest, (error, data, response) => {
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
 **projectId** | **Number**| ID проекта. | 
 **addDatabaseToProjectRequest** | [**AddDatabaseToProjectRequest**](AddDatabaseToProjectRequest.md)|  | 

### Return type

[**AddBalancerToProject200Response**](AddBalancerToProject200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## addDedicatedServerToProject

> AddBalancerToProject200Response addDedicatedServerToProject(projectId, addDedicatedServerToProjectRequest)

Добавление выделенного сервера в проект

Чтобы добавить выделенный сервер в проект, отправьте POST-запрос на &#x60;/api/v1/projects/{project_id}/resources/dedicated&#x60;, задав необходимые атрибуты.  Выделенный сервер будет добавлен в указанный проект. Тело ответа будет содержать объект JSON с информацией о добавленном выделенном сервере.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ProjectsApi();
let projectId = 99; // Number | ID проекта.
let addDedicatedServerToProjectRequest = new TimewebCloudApi.AddDedicatedServerToProjectRequest(); // AddDedicatedServerToProjectRequest | 
apiInstance.addDedicatedServerToProject(projectId, addDedicatedServerToProjectRequest, (error, data, response) => {
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
 **projectId** | **Number**| ID проекта. | 
 **addDedicatedServerToProjectRequest** | [**AddDedicatedServerToProjectRequest**](AddDedicatedServerToProjectRequest.md)|  | 

### Return type

[**AddBalancerToProject200Response**](AddBalancerToProject200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## addServerToProject

> AddBalancerToProject200Response addServerToProject(projectId, addServerToProjectRequest)

Добавление сервера в проект

Чтобы добавить сервер в проект, отправьте POST-запрос на &#x60;/api/v1/projects/{project_id}/resources/servers&#x60;, задав необходимые атрибуты.  Сервер будет добавлен в указанный проект. Тело ответа будет содержать объект JSON с информацией о добавленном сервере.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ProjectsApi();
let projectId = 99; // Number | ID проекта.
let addServerToProjectRequest = new TimewebCloudApi.AddServerToProjectRequest(); // AddServerToProjectRequest | 
apiInstance.addServerToProject(projectId, addServerToProjectRequest, (error, data, response) => {
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
 **projectId** | **Number**| ID проекта. | 
 **addServerToProjectRequest** | [**AddServerToProjectRequest**](AddServerToProjectRequest.md)|  | 

### Return type

[**AddBalancerToProject200Response**](AddBalancerToProject200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## addStorageToProject

> AddBalancerToProject200Response addStorageToProject(projectId, addStorageToProjectRequest)

Добавление хранилища в проект

Чтобы добавить хранилище в проект, отправьте POST-запрос на &#x60;/api/v1/projects/{project_id}/resources/buckets&#x60;, задав необходимые атрибуты.  Хранилище будет добавлено в указанный проект. Тело ответа будет содержать объект JSON с информацией о добавленном хранилище.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ProjectsApi();
let projectId = 99; // Number | ID проекта.
let addStorageToProjectRequest = new TimewebCloudApi.AddStorageToProjectRequest(); // AddStorageToProjectRequest | 
apiInstance.addStorageToProject(projectId, addStorageToProjectRequest, (error, data, response) => {
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
 **projectId** | **Number**| ID проекта. | 
 **addStorageToProjectRequest** | [**AddStorageToProjectRequest**](AddStorageToProjectRequest.md)|  | 

### Return type

[**AddBalancerToProject200Response**](AddBalancerToProject200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## createProject

> CreateProject201Response createProject(createProject)

Создание проекта

Чтобы создать проект, отправьте POST-запрос в &#x60;api/v1/projects&#x60;, задав необходимые атрибуты.  Проект будет создан с использованием предоставленной информации. Тело ответа будет содержать объект JSON с информацией о созданном проекте.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ProjectsApi();
let createProject = new TimewebCloudApi.CreateProject(); // CreateProject | 
apiInstance.createProject(createProject, (error, data, response) => {
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
 **createProject** | [**CreateProject**](CreateProject.md)|  | 

### Return type

[**CreateProject201Response**](CreateProject201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deleteProject

> deleteProject(projectId)

Удаление проекта

Чтобы удалить проект, отправьте запрос DELETE в &#x60;api/v1/projects/{project_id}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ProjectsApi();
let projectId = 99; // Number | ID проекта.
apiInstance.deleteProject(projectId, (error, data, response) => {
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
 **projectId** | **Number**| ID проекта. | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getAccountBalancers

> GetProjectBalancers200Response getAccountBalancers()

Получение списка всех балансировщиков на аккаунте

Чтобы получить список всех балансировщиков на аккаунте, отправьте GET-запрос на &#x60;/api/v1/projects/resources/balancers&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ProjectsApi();
apiInstance.getAccountBalancers((error, data, response) => {
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

[**GetProjectBalancers200Response**](GetProjectBalancers200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getAccountClusters

> GetProjectClusters200Response getAccountClusters()

Получение списка всех кластеров на аккаунте

Чтобы получить список всех кластеров на аккаунте, отправьте GET-запрос на &#x60;/api/v1/projects/resources/clusters&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ProjectsApi();
apiInstance.getAccountClusters((error, data, response) => {
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

[**GetProjectClusters200Response**](GetProjectClusters200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getAccountDatabases

> GetProjectDatabases200Response getAccountDatabases()

Получение списка всех баз данных на аккаунте

Чтобы получить список всех баз данных на аккаунте, отправьте GET-запрос на &#x60;/api/v1/projects/resources/databases&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ProjectsApi();
apiInstance.getAccountDatabases((error, data, response) => {
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

[**GetProjectDatabases200Response**](GetProjectDatabases200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getAccountDedicatedServers

> GetProjectDedicatedServers200Response getAccountDedicatedServers()

Получение списка всех выделенных серверов на аккаунте

Чтобы получить список всех выделенных серверов на аккаунте, отправьте GET-запрос на &#x60;/api/v1/projects/resources/dedicated&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ProjectsApi();
apiInstance.getAccountDedicatedServers((error, data, response) => {
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

[**GetProjectDedicatedServers200Response**](GetProjectDedicatedServers200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getAccountServers

> GetProjectServers200Response getAccountServers()

Получение списка всех серверов на аккаунте

Чтобы получить список всех серверов на аккаунте, отправьте GET-запрос на &#x60;/api/v1/projects/resources/servers&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ProjectsApi();
apiInstance.getAccountServers((error, data, response) => {
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

[**GetProjectServers200Response**](GetProjectServers200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getAccountStorages

> GetProjectStorages200Response getAccountStorages()

Получение списка всех хранилищ на аккаунте

Чтобы получить список всех хранилищ на аккаунте, отправьте GET-запрос на &#x60;/api/v1/projects/resources/buckets&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ProjectsApi();
apiInstance.getAccountStorages((error, data, response) => {
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

[**GetProjectStorages200Response**](GetProjectStorages200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getAllProjectResources

> GetAllProjectResources200Response getAllProjectResources(projectId)

Получение всех ресурсов проекта

Чтобы получить все ресурсы проекта, отправьте GET-запрос на &#x60;/api/v1/projects/{project_id}/resources&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ProjectsApi();
let projectId = 99; // Number | ID проекта.
apiInstance.getAllProjectResources(projectId, (error, data, response) => {
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
 **projectId** | **Number**| ID проекта. | 

### Return type

[**GetAllProjectResources200Response**](GetAllProjectResources200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getProject

> CreateProject201Response getProject(projectId)

Получение проекта по ID

Чтобы получить проект по ID, отправьте GET-запрос на &#x60;/api/v1/projects/{project_id}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ProjectsApi();
let projectId = 99; // Number | ID проекта.
apiInstance.getProject(projectId, (error, data, response) => {
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
 **projectId** | **Number**| ID проекта. | 

### Return type

[**CreateProject201Response**](CreateProject201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getProjectBalancers

> GetProjectBalancers200Response getProjectBalancers(projectId)

Получение списка балансировщиков проекта

Чтобы получить список балансировщиков проекта, отправьте GET-запрос на &#x60;/api/v1/projects/{project_id}/resources/balancers&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ProjectsApi();
let projectId = 99; // Number | ID проекта.
apiInstance.getProjectBalancers(projectId, (error, data, response) => {
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
 **projectId** | **Number**| ID проекта. | 

### Return type

[**GetProjectBalancers200Response**](GetProjectBalancers200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getProjectClusters

> GetProjectClusters200Response getProjectClusters(projectId)

Получение списка кластеров проекта

Чтобы получить список кластеров проекта, отправьте GET-запрос на &#x60;/api/v1/projects/{project_id}/resources/clusters&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ProjectsApi();
let projectId = 99; // Number | ID проекта.
apiInstance.getProjectClusters(projectId, (error, data, response) => {
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
 **projectId** | **Number**| ID проекта. | 

### Return type

[**GetProjectClusters200Response**](GetProjectClusters200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getProjectDatabases

> GetProjectDatabases200Response getProjectDatabases(projectId)

Получение списка баз данных проекта

Чтобы получить список баз данных проекта, отправьте GET-запрос на &#x60;/api/v1/projects/{project_id}/resources/databases&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ProjectsApi();
let projectId = 99; // Number | ID проекта.
apiInstance.getProjectDatabases(projectId, (error, data, response) => {
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
 **projectId** | **Number**| ID проекта. | 

### Return type

[**GetProjectDatabases200Response**](GetProjectDatabases200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getProjectDedicatedServers

> GetProjectDedicatedServers200Response getProjectDedicatedServers(projectId)

Получение списка выделенных серверов проекта

Чтобы получить список выделенных серверов проекта, отправьте GET-запрос на &#x60;/api/v1/projects/{project_id}/resources/dedicated&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ProjectsApi();
let projectId = 99; // Number | ID проекта.
apiInstance.getProjectDedicatedServers(projectId, (error, data, response) => {
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
 **projectId** | **Number**| ID проекта. | 

### Return type

[**GetProjectDedicatedServers200Response**](GetProjectDedicatedServers200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getProjectServers

> GetProjectServers200Response getProjectServers(projectId)

Получение списка серверов проекта

Чтобы получить список серверов проекта, отправьте GET-запрос на &#x60;/api/v1/projects/{project_id}/resources/servers&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ProjectsApi();
let projectId = 99; // Number | ID проекта.
apiInstance.getProjectServers(projectId, (error, data, response) => {
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
 **projectId** | **Number**| ID проекта. | 

### Return type

[**GetProjectServers200Response**](GetProjectServers200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getProjectStorages

> GetProjectStorages200Response getProjectStorages(projectId)

Получение списка хранилищ проекта

Чтобы получить список хранилищ проекта, отправьте GET-запрос на &#x60;/api/v1/projects/{project_id}/resources/buckets&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ProjectsApi();
let projectId = 99; // Number | ID проекта.
apiInstance.getProjectStorages(projectId, (error, data, response) => {
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
 **projectId** | **Number**| ID проекта. | 

### Return type

[**GetProjectStorages200Response**](GetProjectStorages200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getProjects

> GetProjects200Response getProjects()

Получение списка проектов

Чтобы получить список всех проектов на вашем аккаунте, отправьте GET-запрос на &#x60;/api/v1/projects&#x60;.   Тело ответа будет представлять собой объект JSON с ключом &#x60;projects&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ProjectsApi();
apiInstance.getProjects((error, data, response) => {
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

[**GetProjects200Response**](GetProjects200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## transferResourceToAnotherProject

> AddBalancerToProject200Response transferResourceToAnotherProject(projectId, resourceTransfer)

Перенести ресурс в другой проект

Чтобы перенести ресурс в другой проект, отправьте запрос PUT в &#x60;api/v1/projects/{project_id}/resources/transfer&#x60;. 

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ProjectsApi();
let projectId = 99; // Number | ID проекта.
let resourceTransfer = new TimewebCloudApi.ResourceTransfer(); // ResourceTransfer | 
apiInstance.transferResourceToAnotherProject(projectId, resourceTransfer, (error, data, response) => {
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
 **projectId** | **Number**| ID проекта. | 
 **resourceTransfer** | [**ResourceTransfer**](ResourceTransfer.md)|  | 

### Return type

[**AddBalancerToProject200Response**](AddBalancerToProject200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## updateProject

> CreateProject201Response updateProject(projectId, updateProject)

Изменение проекта

Чтобы изменить проект, отправьте запрос PUT в &#x60;api/v1/projects/{project_id}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ProjectsApi();
let projectId = 99; // Number | ID проекта.
let updateProject = new TimewebCloudApi.UpdateProject(); // UpdateProject | 
apiInstance.updateProject(projectId, updateProject, (error, data, response) => {
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
 **projectId** | **Number**| ID проекта. | 
 **updateProject** | [**UpdateProject**](UpdateProject.md)|  | 

### Return type

[**CreateProject201Response**](CreateProject201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

