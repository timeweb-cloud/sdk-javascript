# TimewebCloudApi.DatabasesApi

All URIs are relative to *https://api.timeweb.cloud*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createDatabase**](DatabasesApi.md#createDatabase) | **POST** /api/v1/dbs | Создание базы данных
[**createDatabaseBackup**](DatabasesApi.md#createDatabaseBackup) | **POST** /api/v1/dbs/{db_id}/backups | Создание бэкапа базы данных
[**createDatabaseCluster**](DatabasesApi.md#createDatabaseCluster) | **POST** /api/v1/databases | Создание кластера базы данных
[**createDatabaseInstance**](DatabasesApi.md#createDatabaseInstance) | **POST** /api/v1/databases/{db_cluster_id}/instances | Создание инстанса базы данных
[**createDatabaseUser**](DatabasesApi.md#createDatabaseUser) | **POST** /api/v1/databases/{db_cluster_id}/admins | Создание пользователя базы данных
[**deleteDatabase**](DatabasesApi.md#deleteDatabase) | **DELETE** /api/v1/dbs/{db_id} | Удаление базы данных
[**deleteDatabaseBackup**](DatabasesApi.md#deleteDatabaseBackup) | **DELETE** /api/v1/dbs/{db_id}/backups/{backup_id} | Удаление бэкапа базы данных
[**deleteDatabaseCluster**](DatabasesApi.md#deleteDatabaseCluster) | **DELETE** /api/v1/databases/{db_cluster_id} | Удаление кластера базы данных
[**deleteDatabaseInstance**](DatabasesApi.md#deleteDatabaseInstance) | **DELETE** /api/v1/databases/{db_cluster_id}/instances/{instance_id} | Удаление инстанса базы данных
[**deleteDatabaseUser**](DatabasesApi.md#deleteDatabaseUser) | **DELETE** /api/v1/databases/{db_cluster_id}/admins/{admin_id} | Удаление пользователя базы данных
[**getDatabase**](DatabasesApi.md#getDatabase) | **GET** /api/v1/dbs/{db_id} | Получение базы данных
[**getDatabaseAutoBackupsSettings**](DatabasesApi.md#getDatabaseAutoBackupsSettings) | **GET** /api/v1/dbs/{db_id}/auto-backups | Получение настроек автобэкапов базы данных
[**getDatabaseBackup**](DatabasesApi.md#getDatabaseBackup) | **GET** /api/v1/dbs/{db_id}/backups/{backup_id} | Получение бэкапа базы данных
[**getDatabaseBackups**](DatabasesApi.md#getDatabaseBackups) | **GET** /api/v1/dbs/{db_id}/backups | Список бэкапов базы данных
[**getDatabaseCluster**](DatabasesApi.md#getDatabaseCluster) | **GET** /api/v1/databases/{db_cluster_id} | Получение кластера базы данных
[**getDatabaseClusterTypes**](DatabasesApi.md#getDatabaseClusterTypes) | **GET** /api/v1/database-types | Получение списка типов кластеров баз данных
[**getDatabaseClusters**](DatabasesApi.md#getDatabaseClusters) | **GET** /api/v1/databases | Получение списка кластеров баз данных
[**getDatabaseInstance**](DatabasesApi.md#getDatabaseInstance) | **GET** /api/v1/databases/{db_cluster_id}/instances/{instance_id} | Получение инстанса базы данных
[**getDatabaseInstances**](DatabasesApi.md#getDatabaseInstances) | **GET** /api/v1/databases/{db_cluster_id}/instances | Получение списка инстансов баз данных
[**getDatabaseParameters**](DatabasesApi.md#getDatabaseParameters) | **GET** /api/v1/dbs/parameters | Получение списка параметров баз данных
[**getDatabaseUser**](DatabasesApi.md#getDatabaseUser) | **GET** /api/v1/databases/{db_cluster_id}/admins/{admin_id} | Получение пользователя базы данных
[**getDatabaseUsers**](DatabasesApi.md#getDatabaseUsers) | **GET** /api/v1/databases/{db_cluster_id}/admins | Получение списка пользователей базы данных
[**getDatabases**](DatabasesApi.md#getDatabases) | **GET** /api/v1/dbs | Получение списка всех баз данных
[**getDatabasesPresets**](DatabasesApi.md#getDatabasesPresets) | **GET** /api/v1/presets/dbs | Получение списка тарифов для баз данных
[**restoreDatabaseFromBackup**](DatabasesApi.md#restoreDatabaseFromBackup) | **PUT** /api/v1/dbs/{db_id}/backups/{backup_id} | Восстановление базы данных из бэкапа
[**updateDatabase**](DatabasesApi.md#updateDatabase) | **PATCH** /api/v1/dbs/{db_id} | Обновление базы данных
[**updateDatabaseAutoBackupsSettings**](DatabasesApi.md#updateDatabaseAutoBackupsSettings) | **PATCH** /api/v1/dbs/{db_id}/auto-backups | Изменение настроек автобэкапов базы данных
[**updateDatabaseCluster**](DatabasesApi.md#updateDatabaseCluster) | **PATCH** /api/v1/databases/{db_cluster_id} | Изменение кластера базы данных
[**updateDatabaseInstance**](DatabasesApi.md#updateDatabaseInstance) | **PATCH** /api/v1/databases/{db_cluster_id}/instances/{instance_id} | Изменение инстанса базы данных
[**updateDatabaseUser**](DatabasesApi.md#updateDatabaseUser) | **PATCH** /api/v1/databases/{db_cluster_id}/admins/{admin_id} | Изменение пользователя базы данных



## createDatabase

> CreateDatabase201Response createDatabase(createDb)

Создание базы данных

Чтобы создать базу данных на вашем аккаунте, отправьте POST-запрос на &#x60;/api/v1/dbs&#x60;, задав необходимые атрибуты.  База данных будет создана с использованием предоставленной информации. Тело ответа будет содержать объект JSON с информацией о созданной базе данных.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DatabasesApi();
let createDb = new TimewebCloudApi.CreateDb(); // CreateDb | 
apiInstance.createDatabase(createDb, (error, data, response) => {
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
 **createDb** | [**CreateDb**](CreateDb.md)|  | 

### Return type

[**CreateDatabase201Response**](CreateDatabase201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## createDatabaseBackup

> CreateDatabaseBackup201Response createDatabaseBackup(dbId)

Создание бэкапа базы данных

Чтобы создать бэкап базы данных, отправьте запрос POST в &#x60;api/v1/dbs/{db_id}/backups&#x60;. 

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DatabasesApi();
let dbId = 56; // Number | ID базы данных
apiInstance.createDatabaseBackup(dbId, (error, data, response) => {
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
 **dbId** | **Number**| ID базы данных | 

### Return type

[**CreateDatabaseBackup201Response**](CreateDatabaseBackup201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## createDatabaseCluster

> CreateDatabaseCluster201Response createDatabaseCluster(createCluster)

Создание кластера базы данных

Чтобы создать кластер базы данных на вашем аккаунте, отправьте POST-запрос на &#x60;/api/v1/databases&#x60;.   Вместе с кластером будет создан один инстанс базы данных и один пользователь.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DatabasesApi();
let createCluster = new TimewebCloudApi.CreateCluster(); // CreateCluster | 
apiInstance.createDatabaseCluster(createCluster, (error, data, response) => {
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
 **createCluster** | [**CreateCluster**](CreateCluster.md)|  | 

### Return type

[**CreateDatabaseCluster201Response**](CreateDatabaseCluster201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## createDatabaseInstance

> CreateDatabaseInstance201Response createDatabaseInstance(dbClusterId, createInstance)

Создание инстанса базы данных

Чтобы создать инстанс базы данных, отправьте POST-запрос на &#x60;/api/v1/databases/{db_cluster_id}/instances&#x60;.\\    Существующие пользователи не будут иметь доступа к новой базе данных после создания. Вы можете изменить привилегии для пользователя через &lt;a href&#x3D;&#39;#tag/Bazy-dannyh/operation/updateDatabaseUser&#39;&gt;метод изменения пользователя&lt;/a&gt; 

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DatabasesApi();
let dbClusterId = 56; // Number | ID кластера базы данных
let createInstance = new TimewebCloudApi.CreateInstance(); // CreateInstance | 
apiInstance.createDatabaseInstance(dbClusterId, createInstance, (error, data, response) => {
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
 **dbClusterId** | **Number**| ID кластера базы данных | 
 **createInstance** | [**CreateInstance**](CreateInstance.md)|  | 

### Return type

[**CreateDatabaseInstance201Response**](CreateDatabaseInstance201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## createDatabaseUser

> CreateDatabaseUser201Response createDatabaseUser(dbClusterId, createAdmin)

Создание пользователя базы данных

Чтобы создать пользователя базы данных, отправьте POST-запрос на &#x60;/api/v1/databases/{db_cluster_id}/admins&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DatabasesApi();
let dbClusterId = 56; // Number | ID кластера базы данных
let createAdmin = new TimewebCloudApi.CreateAdmin(); // CreateAdmin | 
apiInstance.createDatabaseUser(dbClusterId, createAdmin, (error, data, response) => {
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
 **dbClusterId** | **Number**| ID кластера базы данных | 
 **createAdmin** | [**CreateAdmin**](CreateAdmin.md)|  | 

### Return type

[**CreateDatabaseUser201Response**](CreateDatabaseUser201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deleteDatabase

> DeleteDatabase200Response deleteDatabase(dbId, opts)

Удаление базы данных

Чтобы удалить базу данных, отправьте запрос DELETE в &#x60;api/v1/dbs/{db_id}&#x60;. 

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DatabasesApi();
let dbId = 56; // Number | ID базы данных
let opts = {
  'hash': 15095f25-aac3-4d60-a788-96cb5136f186, // String | Хеш, который совместно с кодом авторизации надо отправить для удаления, если включено подтверждение удаления сервисов через Телеграм.
  'code': 0000 // String | Код подтверждения, который придет к вам в Телеграм, после запроса удаления, если включено подтверждение удаления сервисов.  При помощи API токена сервисы можно удалять без подтверждения, если параметр токена `is_able_to_delete` установлен в значение `true`
};
apiInstance.deleteDatabase(dbId, opts, (error, data, response) => {
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
 **dbId** | **Number**| ID базы данных | 
 **hash** | **String**| Хеш, который совместно с кодом авторизации надо отправить для удаления, если включено подтверждение удаления сервисов через Телеграм. | [optional] 
 **code** | **String**| Код подтверждения, который придет к вам в Телеграм, после запроса удаления, если включено подтверждение удаления сервисов.  При помощи API токена сервисы можно удалять без подтверждения, если параметр токена &#x60;is_able_to_delete&#x60; установлен в значение &#x60;true&#x60; | [optional] 

### Return type

[**DeleteDatabase200Response**](DeleteDatabase200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## deleteDatabaseBackup

> deleteDatabaseBackup(dbId, backupId)

Удаление бэкапа базы данных

Чтобы удалить бэкап базы данных, отправьте запрос DELETE в &#x60;api/v1/dbs/{db_id}/backups/{backup_id}&#x60;. 

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DatabasesApi();
let dbId = 56; // Number | ID базы данных
let backupId = 56; // Number | ID резервной копии
apiInstance.deleteDatabaseBackup(dbId, backupId, (error, data, response) => {
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
 **dbId** | **Number**| ID базы данных | 
 **backupId** | **Number**| ID резервной копии | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## deleteDatabaseCluster

> DeleteDatabaseCluster200Response deleteDatabaseCluster(dbClusterId, opts)

Удаление кластера базы данных

Чтобы удалить кластер базы данных, отправьте DELETE-запрос на &#x60;/api/v1/databases/{db_cluster_id}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DatabasesApi();
let dbClusterId = 56; // Number | ID кластера базы данных
let opts = {
  'hash': 15095f25-aac3-4d60-a788-96cb5136f186, // String | Хеш, который совместно с кодом авторизации надо отправить для удаления, если включено подтверждение удаления сервисов через Телеграм.
  'code': 0000 // String | Код подтверждения, который придет к вам в Телеграм, после запроса удаления, если включено подтверждение удаления сервисов.  При помощи API токена сервисы можно удалять без подтверждения, если параметр токена `is_able_to_delete` установлен в значение `true`
};
apiInstance.deleteDatabaseCluster(dbClusterId, opts, (error, data, response) => {
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
 **dbClusterId** | **Number**| ID кластера базы данных | 
 **hash** | **String**| Хеш, который совместно с кодом авторизации надо отправить для удаления, если включено подтверждение удаления сервисов через Телеграм. | [optional] 
 **code** | **String**| Код подтверждения, который придет к вам в Телеграм, после запроса удаления, если включено подтверждение удаления сервисов.  При помощи API токена сервисы можно удалять без подтверждения, если параметр токена &#x60;is_able_to_delete&#x60; установлен в значение &#x60;true&#x60; | [optional] 

### Return type

[**DeleteDatabaseCluster200Response**](DeleteDatabaseCluster200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## deleteDatabaseInstance

> deleteDatabaseInstance(dbClusterId, instanceId)

Удаление инстанса базы данных

Чтобы удалить инстанс базы данных, отправьте DELETE-запрос на &#x60;/api/v1/databases/{db_cluster_id}/instances/{instance_id}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DatabasesApi();
let dbClusterId = 56; // Number | ID кластера базы данных
let instanceId = 56; // Number | ID инстанса базы данных
apiInstance.deleteDatabaseInstance(dbClusterId, instanceId, (error, data, response) => {
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
 **dbClusterId** | **Number**| ID кластера базы данных | 
 **instanceId** | **Number**| ID инстанса базы данных | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## deleteDatabaseUser

> deleteDatabaseUser(dbClusterId, adminId)

Удаление пользователя базы данных

Чтобы удалить пользователя базы данных на вашем аккаунте, отправьте DELETE-запрос на &#x60;/api/v1/databases/{db_cluster_id}/admins/{admin_id}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DatabasesApi();
let dbClusterId = 56; // Number | ID кластера базы данных
let adminId = 56; // Number | ID пользователя базы данных
apiInstance.deleteDatabaseUser(dbClusterId, adminId, (error, data, response) => {
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
 **dbClusterId** | **Number**| ID кластера базы данных | 
 **adminId** | **Number**| ID пользователя базы данных | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getDatabase

> CreateDatabase201Response getDatabase(dbId)

Получение базы данных

Чтобы отобразить информацию об отдельной базе данных, отправьте запрос GET на &#x60;api/v1/dbs/{db_id}&#x60;. 

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DatabasesApi();
let dbId = 56; // Number | ID базы данных
apiInstance.getDatabase(dbId, (error, data, response) => {
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
 **dbId** | **Number**| ID базы данных | 

### Return type

[**CreateDatabase201Response**](CreateDatabase201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getDatabaseAutoBackupsSettings

> GetDatabaseAutoBackupsSettings200Response getDatabaseAutoBackupsSettings(dbId)

Получение настроек автобэкапов базы данных

Чтобы получить список настроек автобэкапов базы данных, отправьте запрос GET в &#x60;api/v1/dbs/{db_id}/auto-backups&#x60;

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DatabasesApi();
let dbId = 56; // Number | ID базы данных
apiInstance.getDatabaseAutoBackupsSettings(dbId, (error, data, response) => {
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
 **dbId** | **Number**| ID базы данных | 

### Return type

[**GetDatabaseAutoBackupsSettings200Response**](GetDatabaseAutoBackupsSettings200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getDatabaseBackup

> CreateDatabaseBackup201Response getDatabaseBackup(dbId, backupId)

Получение бэкапа базы данных

Чтобы получить бэкап базы данных, отправьте запрос GET в &#x60;api/v1/dbs/{db_id}/backups/{backup_id}&#x60;. 

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DatabasesApi();
let dbId = 56; // Number | ID базы данных
let backupId = 56; // Number | ID резервной копии
apiInstance.getDatabaseBackup(dbId, backupId, (error, data, response) => {
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
 **dbId** | **Number**| ID базы данных | 
 **backupId** | **Number**| ID резервной копии | 

### Return type

[**CreateDatabaseBackup201Response**](CreateDatabaseBackup201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getDatabaseBackups

> GetDatabaseBackups200Response getDatabaseBackups(dbId, opts)

Список бэкапов базы данных

Чтобы получить список бэкапов базы данных, отправьте запрос GET в &#x60;api/v1/dbs/{db_id}/backups&#x60;. 

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DatabasesApi();
let dbId = 56; // Number | ID базы данных
let opts = {
  'limit': 100, // Number | Обозначает количество записей, которое необходимо вернуть.
  'offset': 0 // Number | Указывает на смещение относительно начала списка.
};
apiInstance.getDatabaseBackups(dbId, opts, (error, data, response) => {
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
 **dbId** | **Number**| ID базы данных | 
 **limit** | **Number**| Обозначает количество записей, которое необходимо вернуть. | [optional] [default to 100]
 **offset** | **Number**| Указывает на смещение относительно начала списка. | [optional] [default to 0]

### Return type

[**GetDatabaseBackups200Response**](GetDatabaseBackups200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getDatabaseCluster

> CreateDatabaseCluster201Response getDatabaseCluster(dbClusterId)

Получение кластера базы данных

Чтобы получить кластер базы данных на вашем аккаунте, отправьте GET-запрос на &#x60;/api/v1/databases/{db_cluster_id}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DatabasesApi();
let dbClusterId = 56; // Number | ID кластера базы данных
apiInstance.getDatabaseCluster(dbClusterId, (error, data, response) => {
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
 **dbClusterId** | **Number**| ID кластера базы данных | 

### Return type

[**CreateDatabaseCluster201Response**](CreateDatabaseCluster201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getDatabaseClusterTypes

> GetDatabaseClusterTypes200Response getDatabaseClusterTypes()

Получение списка типов кластеров баз данных

Чтобы получить список типов баз данных на вашем аккаунте, отправьте GET-запрос на &#x60;/api/v1/database-types&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DatabasesApi();
apiInstance.getDatabaseClusterTypes((error, data, response) => {
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

[**GetDatabaseClusterTypes200Response**](GetDatabaseClusterTypes200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getDatabaseClusters

> GetDatabaseClusters200Response getDatabaseClusters(opts)

Получение списка кластеров баз данных

Чтобы получить список кластеров баз данных, отправьте GET-запрос на &#x60;/api/v1/databases&#x60;.   Тело ответа будет представлять собой объект JSON с ключом &#x60;dbs&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DatabasesApi();
let opts = {
  'limit': 100, // Number | Обозначает количество записей, которое необходимо вернуть.
  'offset': 0 // Number | Указывает на смещение относительно начала списка.
};
apiInstance.getDatabaseClusters(opts, (error, data, response) => {
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
 **limit** | **Number**| Обозначает количество записей, которое необходимо вернуть. | [optional] [default to 100]
 **offset** | **Number**| Указывает на смещение относительно начала списка. | [optional] [default to 0]

### Return type

[**GetDatabaseClusters200Response**](GetDatabaseClusters200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getDatabaseInstance

> CreateDatabaseInstance201Response getDatabaseInstance(dbClusterId, instanceId)

Получение инстанса базы данных

Чтобы получить инстанс базы данных, отправьте GET-запрос на &#x60;/api/v1/databases/{db_cluster_id}/instances/{instance_id}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DatabasesApi();
let dbClusterId = 56; // Number | ID кластера базы данных
let instanceId = 56; // Number | ID инстанса базы данных
apiInstance.getDatabaseInstance(dbClusterId, instanceId, (error, data, response) => {
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
 **dbClusterId** | **Number**| ID кластера базы данных | 
 **instanceId** | **Number**| ID инстанса базы данных | 

### Return type

[**CreateDatabaseInstance201Response**](CreateDatabaseInstance201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getDatabaseInstances

> GetDatabaseInstances200Response getDatabaseInstances(dbClusterId)

Получение списка инстансов баз данных

Чтобы получить список баз данных на вашем аккаунте, отправьте GET-запрос на &#x60;/api/v1/databases/{db_cluster_id}/instances&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DatabasesApi();
let dbClusterId = 56; // Number | ID кластера базы данных
apiInstance.getDatabaseInstances(dbClusterId, (error, data, response) => {
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
 **dbClusterId** | **Number**| ID кластера базы данных | 

### Return type

[**GetDatabaseInstances200Response**](GetDatabaseInstances200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getDatabaseParameters

> {String: [String]} getDatabaseParameters()

Получение списка параметров баз данных

Чтобы получить список параметров баз данных, отправьте GET-запрос на &#x60;/api/v1/dbs/parameters&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DatabasesApi();
apiInstance.getDatabaseParameters((error, data, response) => {
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

**{String: [String]}**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getDatabaseUser

> CreateDatabaseUser201Response getDatabaseUser(dbClusterId, adminId)

Получение пользователя базы данных

Чтобы получить пользователя базы данных на вашем аккаунте, отправьте GET-запрос на &#x60;/api/v1/databases/{db_cluster_id}/admins/{admin_id}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DatabasesApi();
let dbClusterId = 56; // Number | ID кластера базы данных
let adminId = 56; // Number | ID пользователя базы данных
apiInstance.getDatabaseUser(dbClusterId, adminId, (error, data, response) => {
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
 **dbClusterId** | **Number**| ID кластера базы данных | 
 **adminId** | **Number**| ID пользователя базы данных | 

### Return type

[**CreateDatabaseUser201Response**](CreateDatabaseUser201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getDatabaseUsers

> GetDatabaseUsers200Response getDatabaseUsers(dbClusterId)

Получение списка пользователей базы данных

Чтобы получить список пользователей базы данных на вашем аккаунте, отправьте GET-запрос на &#x60;/api/v1/databases/{db_cluster_id}/admins&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DatabasesApi();
let dbClusterId = 56; // Number | ID кластера базы данных
apiInstance.getDatabaseUsers(dbClusterId, (error, data, response) => {
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
 **dbClusterId** | **Number**| ID кластера базы данных | 

### Return type

[**GetDatabaseUsers200Response**](GetDatabaseUsers200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getDatabases

> GetDatabases200Response getDatabases(opts)

Получение списка всех баз данных

Чтобы получить список всех баз данных на вашем аккаунте, отправьте GET-запрос на &#x60;/api/v1/dbs&#x60;.   Тело ответа будет представлять собой объект JSON с ключом &#x60;dbs&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DatabasesApi();
let opts = {
  'limit': 100, // Number | Обозначает количество записей, которое необходимо вернуть.
  'offset': 0 // Number | Указывает на смещение относительно начала списка.
};
apiInstance.getDatabases(opts, (error, data, response) => {
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
 **limit** | **Number**| Обозначает количество записей, которое необходимо вернуть. | [optional] [default to 100]
 **offset** | **Number**| Указывает на смещение относительно начала списка. | [optional] [default to 0]

### Return type

[**GetDatabases200Response**](GetDatabases200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getDatabasesPresets

> GetDatabasesPresets200Response getDatabasesPresets()

Получение списка тарифов для баз данных

Чтобы получить список тарифов для баз данных, отправьте GET-запрос на &#x60;/api/v1/presets/dbs&#x60;.   Тело ответа будет представлять собой объект JSON с ключом &#x60;databases_presets&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DatabasesApi();
apiInstance.getDatabasesPresets((error, data, response) => {
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

[**GetDatabasesPresets200Response**](GetDatabasesPresets200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## restoreDatabaseFromBackup

> restoreDatabaseFromBackup(dbId, backupId)

Восстановление базы данных из бэкапа

Чтобы восстановить базу данных из бэкапа, отправьте запрос PUT в &#x60;api/v1/dbs/{db_id}/backups/{backup_id}&#x60;. 

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DatabasesApi();
let dbId = 56; // Number | ID базы данных
let backupId = 56; // Number | ID резервной копии
apiInstance.restoreDatabaseFromBackup(dbId, backupId, (error, data, response) => {
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
 **dbId** | **Number**| ID базы данных | 
 **backupId** | **Number**| ID резервной копии | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## updateDatabase

> CreateDatabase201Response updateDatabase(dbId, updateDb)

Обновление базы данных

Чтобы обновить только определенные атрибуты базы данных, отправьте запрос PATCH в &#x60;api/v1/dbs/{db_id}&#x60;. 

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DatabasesApi();
let dbId = 56; // Number | ID базы данных
let updateDb = new TimewebCloudApi.UpdateDb(); // UpdateDb | 
apiInstance.updateDatabase(dbId, updateDb, (error, data, response) => {
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
 **dbId** | **Number**| ID базы данных | 
 **updateDb** | [**UpdateDb**](UpdateDb.md)|  | 

### Return type

[**CreateDatabase201Response**](CreateDatabase201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## updateDatabaseAutoBackupsSettings

> GetDatabaseAutoBackupsSettings200Response updateDatabaseAutoBackupsSettings(dbId, opts)

Изменение настроек автобэкапов базы данных

Чтобы изменить список настроек автобэкапов базы данных, отправьте запрос PATCH в &#x60;api/v1/dbs/{db_id}/auto-backups&#x60;

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DatabasesApi();
let dbId = 56; // Number | ID базы данных
let opts = {
  'autoBackup': new TimewebCloudApi.AutoBackup() // AutoBackup | При значении `is_enabled`: `true`, поля `copy_count`, `creation_start_at`, `interval` являются обязательными
};
apiInstance.updateDatabaseAutoBackupsSettings(dbId, opts, (error, data, response) => {
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
 **dbId** | **Number**| ID базы данных | 
 **autoBackup** | [**AutoBackup**](AutoBackup.md)| При значении &#x60;is_enabled&#x60;: &#x60;true&#x60;, поля &#x60;copy_count&#x60;, &#x60;creation_start_at&#x60;, &#x60;interval&#x60; являются обязательными | [optional] 

### Return type

[**GetDatabaseAutoBackupsSettings200Response**](GetDatabaseAutoBackupsSettings200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## updateDatabaseCluster

> CreateDatabaseCluster201Response updateDatabaseCluster(dbClusterId, updateCluster)

Изменение кластера базы данных

Чтобы изменить кластер базы данных на вашем аккаунте, отправьте PATCH-запрос на &#x60;/api/v1/databases/{db_cluster_id}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DatabasesApi();
let dbClusterId = 56; // Number | ID кластера базы данных
let updateCluster = new TimewebCloudApi.UpdateCluster(); // UpdateCluster | 
apiInstance.updateDatabaseCluster(dbClusterId, updateCluster, (error, data, response) => {
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
 **dbClusterId** | **Number**| ID кластера базы данных | 
 **updateCluster** | [**UpdateCluster**](UpdateCluster.md)|  | 

### Return type

[**CreateDatabaseCluster201Response**](CreateDatabaseCluster201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## updateDatabaseInstance

> CreateDatabaseInstance201Response updateDatabaseInstance(dbClusterId, updateInstance)

Изменение инстанса базы данных

Чтобы изменить инстанс базы данных, отправьте PATCH-запрос на &#x60;/api/v1/databases/{db_cluster_id}/instances/{instance_id}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DatabasesApi();
let dbClusterId = 56; // Number | ID кластера базы данных
let updateInstance = new TimewebCloudApi.UpdateInstance(); // UpdateInstance | 
apiInstance.updateDatabaseInstance(dbClusterId, updateInstance, (error, data, response) => {
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
 **dbClusterId** | **Number**| ID кластера базы данных | 
 **updateInstance** | [**UpdateInstance**](UpdateInstance.md)|  | 

### Return type

[**CreateDatabaseInstance201Response**](CreateDatabaseInstance201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## updateDatabaseUser

> CreateDatabaseUser201Response updateDatabaseUser(dbClusterId, adminId, updateAdmin)

Изменение пользователя базы данных

Чтобы изменить пользователя базы данных на вашем аккаунте, отправьте PATCH-запрос на &#x60;/api/v1/databases/{db_cluster_id}/admins/{admin_id}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DatabasesApi();
let dbClusterId = 56; // Number | ID кластера базы данных
let adminId = 56; // Number | ID пользователя базы данных
let updateAdmin = new TimewebCloudApi.UpdateAdmin(); // UpdateAdmin | 
apiInstance.updateDatabaseUser(dbClusterId, adminId, updateAdmin, (error, data, response) => {
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
 **dbClusterId** | **Number**| ID кластера базы данных | 
 **adminId** | **Number**| ID пользователя базы данных | 
 **updateAdmin** | [**UpdateAdmin**](UpdateAdmin.md)|  | 

### Return type

[**CreateDatabaseUser201Response**](CreateDatabaseUser201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

