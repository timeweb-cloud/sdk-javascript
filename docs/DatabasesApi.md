# TimewebCloudApi.DatabasesApi

All URIs are relative to *https://api.timeweb.cloud*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createDatabaseBackup**](DatabasesApi.md#createDatabaseBackup) | **POST** /api/v1/dbs/{db_id}/backups | Создание бэкапа базы данных
[**createDatabaseBackupDownloadUrl**](DatabasesApi.md#createDatabaseBackupDownloadUrl) | **POST** /api/v1/dbs/{db_id}/backups/{backup_id}/download-url | Получение ссылки для скачивания бэкапа базы данных
[**createDatabaseCluster**](DatabasesApi.md#createDatabaseCluster) | **POST** /api/v1/databases | Создание кластера базы данных
[**createDatabaseInstance**](DatabasesApi.md#createDatabaseInstance) | **POST** /api/v1/databases/{db_cluster_id}/instances | Создание инстанса базы данных
[**createDatabaseS3Backup**](DatabasesApi.md#createDatabaseS3Backup) | **POST** /api/v2/databases/{db_id}/backups | Создание S3-бэкапа базы данных
[**createDatabaseUser**](DatabasesApi.md#createDatabaseUser) | **POST** /api/v1/databases/{db_cluster_id}/admins | Создание пользователя базы данных
[**deleteDatabaseBackup**](DatabasesApi.md#deleteDatabaseBackup) | **DELETE** /api/v1/dbs/{db_id}/backups/{backup_id} | Удаление бэкапа базы данных
[**deleteDatabaseCluster**](DatabasesApi.md#deleteDatabaseCluster) | **DELETE** /api/v1/databases/{db_cluster_id} | Удаление кластера базы данных
[**deleteDatabaseInstance**](DatabasesApi.md#deleteDatabaseInstance) | **DELETE** /api/v1/databases/{db_cluster_id}/instances/{instance_id} | Удаление инстанса базы данных
[**deleteDatabaseS3Backup**](DatabasesApi.md#deleteDatabaseS3Backup) | **DELETE** /api/v2/databases/{db_id}/backups/{backup_id} | Удаление S3-бэкапа базы данных
[**deleteDatabaseUser**](DatabasesApi.md#deleteDatabaseUser) | **DELETE** /api/v1/databases/{db_cluster_id}/admins/{admin_id} | Удаление пользователя базы данных
[**getDatabaseAutoBackupsSettings**](DatabasesApi.md#getDatabaseAutoBackupsSettings) | **GET** /api/v1/dbs/{db_id}/auto-backups | Получение настроек автобэкапов базы данных
[**getDatabaseBackup**](DatabasesApi.md#getDatabaseBackup) | **GET** /api/v1/dbs/{db_id}/backups/{backup_id} | Получение бэкапа базы данных
[**getDatabaseBackups**](DatabasesApi.md#getDatabaseBackups) | **GET** /api/v1/dbs/{db_id}/backups | Список бэкапов базы данных
[**getDatabaseCluster**](DatabasesApi.md#getDatabaseCluster) | **GET** /api/v1/databases/{db_cluster_id} | Получение кластера базы данных
[**getDatabaseClusterReplicas**](DatabasesApi.md#getDatabaseClusterReplicas) | **GET** /api/v1/databases/{db_cluster_id}/replicas | Получение списка реплик кластера базы данных
[**getDatabaseClusterTypes**](DatabasesApi.md#getDatabaseClusterTypes) | **GET** /api/v1/database-types | Получение списка типов кластеров баз данных
[**getDatabaseClusters**](DatabasesApi.md#getDatabaseClusters) | **GET** /api/v1/databases | Получение списка кластеров баз данных
[**getDatabaseConfigurators**](DatabasesApi.md#getDatabaseConfigurators) | **GET** /api/v1/configurator/databases | Получение списка конфигураторов баз данных
[**getDatabaseDefaultParameters**](DatabasesApi.md#getDatabaseDefaultParameters) | **GET** /api/v1/dbs/default-parameters | Получение рекомендуемых значений параметров баз данных
[**getDatabaseInstance**](DatabasesApi.md#getDatabaseInstance) | **GET** /api/v1/databases/{db_cluster_id}/instances/{instance_id} | Получение инстанса базы данных
[**getDatabaseInstances**](DatabasesApi.md#getDatabaseInstances) | **GET** /api/v1/databases/{db_cluster_id}/instances | Получение списка инстансов баз данных
[**getDatabaseParameters**](DatabasesApi.md#getDatabaseParameters) | **GET** /api/v1/dbs/parameters | Получение списка параметров баз данных
[**getDatabasePreset**](DatabasesApi.md#getDatabasePreset) | **GET** /api/v2/dbs/presets/{preset_id} | Получение тарифа для базы данных
[**getDatabasePrivileges**](DatabasesApi.md#getDatabasePrivileges) | **GET** /api/v1/databases/{db_cluster_id}/privileges | Получение привилегий кластера базы данных
[**getDatabaseS3Backup**](DatabasesApi.md#getDatabaseS3Backup) | **GET** /api/v2/databases/{db_id}/backups/{backup_id} | Получение S3-бэкапа базы данных
[**getDatabaseS3Backups**](DatabasesApi.md#getDatabaseS3Backups) | **GET** /api/v2/databases/{db_id}/backups | Список S3-бэкапов базы данных
[**getDatabaseUser**](DatabasesApi.md#getDatabaseUser) | **GET** /api/v1/databases/{db_cluster_id}/admins/{admin_id} | Получение пользователя базы данных
[**getDatabaseUsers**](DatabasesApi.md#getDatabaseUsers) | **GET** /api/v1/databases/{db_cluster_id}/admins | Получение списка пользователей базы данных
[**getDatabasesPresets**](DatabasesApi.md#getDatabasesPresets) | **GET** /api/v2/presets/dbs | Получение списка тарифов для баз данных
[**performDatabaseClusterAction**](DatabasesApi.md#performDatabaseClusterAction) | **POST** /api/v1/databases/{db_cluster_id}/action | Выполнение действия над кластером базы данных
[**restoreDatabaseFromBackup**](DatabasesApi.md#restoreDatabaseFromBackup) | **PUT** /api/v1/dbs/{db_id}/backups/{backup_id} | Восстановление базы данных из бэкапа
[**restoreDatabaseFromS3Backup**](DatabasesApi.md#restoreDatabaseFromS3Backup) | **POST** /api/v2/databases/{db_id}/backups/{backup_id}/restore | Восстановление базы данных из S3-бэкапа
[**updateDatabaseAutoBackupsSettings**](DatabasesApi.md#updateDatabaseAutoBackupsSettings) | **PATCH** /api/v1/dbs/{db_id}/auto-backups | Изменение настроек автобэкапов базы данных
[**updateDatabaseBackup**](DatabasesApi.md#updateDatabaseBackup) | **PATCH** /api/v1/dbs/{db_id}/backups/{backup_id} | Изменение комментария к бэкапу базы данных
[**updateDatabaseCluster**](DatabasesApi.md#updateDatabaseCluster) | **PATCH** /api/v1/databases/{db_cluster_id} | Изменение кластера базы данных
[**updateDatabaseClusterV2**](DatabasesApi.md#updateDatabaseClusterV2) | **PATCH** /api/v2/databases/{db_cluster_id} | Изменение кластера базы данных (v2)
[**updateDatabaseInstance**](DatabasesApi.md#updateDatabaseInstance) | **PATCH** /api/v1/databases/{db_cluster_id}/instances/{instance_id} | Изменение инстанса базы данных
[**updateDatabaseS3Backup**](DatabasesApi.md#updateDatabaseS3Backup) | **PATCH** /api/v2/databases/{db_id}/backups/{backup_id} | Изменение комментария S3-бэкапа базы данных
[**updateDatabaseUser**](DatabasesApi.md#updateDatabaseUser) | **PATCH** /api/v1/databases/{db_cluster_id}/admins/{admin_id} | Изменение пользователя базы данных



## createDatabaseBackup

> CreateDatabaseBackup201Response createDatabaseBackup(dbId, opts)

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
let opts = {
  'dbsCreateBackup': new TimewebCloudApi.DbsCreateBackup() // DbsCreateBackup | 
};
apiInstance.createDatabaseBackup(dbId, opts, (error, data, response) => {
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
 **dbsCreateBackup** | [**DbsCreateBackup**](DbsCreateBackup.md)|  | [optional] 

### Return type

[**CreateDatabaseBackup201Response**](CreateDatabaseBackup201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## createDatabaseBackupDownloadUrl

> CreateDatabaseBackupDownloadUrl201Response createDatabaseBackupDownloadUrl(dbId, backupId, backupDownloadUrlRequest)

Получение ссылки для скачивания бэкапа базы данных

Чтобы получить ссылку для скачивания резервной копии базы данных, отправьте POST-запрос на &#x60;/api/v1/dbs/{db_id}/backups/{backup_id}/download-url&#x60;.   Скачивание резервных копий доступно не для всех кластеров. Если для вашего кластера оно недоступно, метод вернет ошибку со статусом &#x60;400&#x60;.   Тело ответа будет представлять собой объект JSON с ключом &#x60;backup_url&#x60;.

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
let backupDownloadUrlRequest = new TimewebCloudApi.BackupDownloadUrlRequest(); // BackupDownloadUrlRequest | 
apiInstance.createDatabaseBackupDownloadUrl(dbId, backupId, backupDownloadUrlRequest, (error, data, response) => {
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
 **backupDownloadUrlRequest** | [**BackupDownloadUrlRequest**](BackupDownloadUrlRequest.md)|  | 

### Return type

[**CreateDatabaseBackupDownloadUrl201Response**](CreateDatabaseBackupDownloadUrl201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## createDatabaseCluster

> CreateDatabaseCluster201Response createDatabaseCluster(createCluster)

Создание кластера базы данных

Чтобы создать кластер базы данных на вашем аккаунте, отправьте POST-запрос на &#x60;/api/v1/databases&#x60;.   Вместе с кластером будет создан один инстанс базы данных и один пользователь.   Размер кластера задается либо тарифом (&#x60;preset_id&#x60;), либо конфигуратором (&#x60;configuration&#x60;). Эти поля взаимоисключающие, но одно из них передать обязательно — запрос без обоих вернется с ошибкой.

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


## createDatabaseS3Backup

> CreateDatabaseS3Backup201Response createDatabaseS3Backup(dbId, opts)

Создание S3-бэкапа базы данных

Чтобы создать резервную копию кластера базы данных в объектном хранилище, отправьте POST-запрос на &#x60;/api/v2/databases/{db_id}/backups&#x60;.   Тело запроса необязательно: единственное поле &#x60;comment&#x60; можно не передавать. Тело ответа будет представлять собой объект JSON с ключом &#x60;backup&#x60;.   Копия создается асинхронно. Пока она создается, ее статус — &#x60;running&#x60;, и восстановиться из нее нельзя. Дождитесь статуса &#x60;success&#x60;, опрашивая &#x60;/api/v2/databases/{db_id}/backups/{backup_id}&#x60;.

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
  'createS3Backup': new TimewebCloudApi.CreateS3Backup() // CreateS3Backup | 
};
apiInstance.createDatabaseS3Backup(dbId, opts, (error, data, response) => {
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
 **createS3Backup** | [**CreateS3Backup**](CreateS3Backup.md)|  | [optional] 

### Return type

[**CreateDatabaseS3Backup201Response**](CreateDatabaseS3Backup201Response.md)

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

> DeleteDatabaseCluster200Response deleteDatabaseCluster(dbClusterId)

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
apiInstance.deleteDatabaseCluster(dbClusterId, (error, data, response) => {
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


## deleteDatabaseS3Backup

> deleteDatabaseS3Backup(dbId, backupId)

Удаление S3-бэкапа базы данных

Чтобы удалить резервную копию кластера базы данных из объектного хранилища, отправьте DELETE-запрос на &#x60;/api/v2/databases/{db_id}/backups/{backup_id}&#x60;.   Копия удаляется безвозвратно, тело ответа пустое. На резервные копии из &#x60;/api/v1/dbs/{db_id}/backups/{backup_id}&#x60; этот метод не действует — они удаляются отдельным запросом.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DatabasesApi();
let dbId = 56; // Number | ID базы данных
let backupId = "backupId_example"; // String | ID резервной копии в формате UUID
apiInstance.deleteDatabaseS3Backup(dbId, backupId, (error, data, response) => {
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
 **backupId** | **String**| ID резервной копии в формате UUID | 

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

> GetDatabaseBackup200Response getDatabaseBackup(dbId, backupId)

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

[**GetDatabaseBackup200Response**](GetDatabaseBackup200Response.md)

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


## getDatabaseClusterReplicas

> GetDatabaseClusterReplicas200Response getDatabaseClusterReplicas(dbClusterId)

Получение списка реплик кластера базы данных

Чтобы получить список реплик кластера базы данных, отправьте GET-запрос на &#x60;/api/v1/databases/{db_cluster_id}/replicas&#x60;.   Тело ответа будет представлять собой объект JSON с ключом &#x60;replicas&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DatabasesApi();
let dbClusterId = 56; // Number | ID кластера базы данных
apiInstance.getDatabaseClusterReplicas(dbClusterId, (error, data, response) => {
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

[**GetDatabaseClusterReplicas200Response**](GetDatabaseClusterReplicas200Response.md)

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


## getDatabaseConfigurators

> GetDatabaseConfigurators200Response getDatabaseConfigurators(opts)

Получение списка конфигураторов баз данных

Чтобы получить список конфигураторов баз данных, отправьте GET-запрос на &#x60;/api/v1/configurator/databases&#x60;.   Конфигуратор позволяет создать кластер с произвольным количеством ресурсов вместо готового тарифа: его ID передается при создании кластера в поле &#x60;configuration.configurator_id&#x60;, а допустимые значения ресурсов ограничены объектом &#x60;requirements&#x60;.   Тело ответа будет представлять собой объект JSON с ключом &#x60;database_configurators&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DatabasesApi();
let opts = {
  'clusterId': 56, // Number | ID кластера базы данных. Возвращает конфигураторы группы, в пределах которой доступна смена конфигурации этого кластера (сценарий изменения кластера).
  'withUnavailable': true // Boolean | Включить в ответ конфигураторы, недоступные к заказу из-за нехватки свободных ресурсов. Учитывается только при запросе без `cluster_id`.
};
apiInstance.getDatabaseConfigurators(opts, (error, data, response) => {
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
 **clusterId** | **Number**| ID кластера базы данных. Возвращает конфигураторы группы, в пределах которой доступна смена конфигурации этого кластера (сценарий изменения кластера). | [optional] 
 **withUnavailable** | **Boolean**| Включить в ответ конфигураторы, недоступные к заказу из-за нехватки свободных ресурсов. Учитывается только при запросе без &#x60;cluster_id&#x60;. | [optional] 

### Return type

[**GetDatabaseConfigurators200Response**](GetDatabaseConfigurators200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getDatabaseDefaultParameters

> GetDatabaseDefaultParameters200Response getDatabaseDefaultParameters(type, ram, opts)

Получение рекомендуемых значений параметров баз данных

Чтобы получить рекомендуемые значения параметров базы данных, отправьте GET-запрос на &#x60;/api/v1/dbs/default-parameters&#x60;.   Значения рассчитываются для указанного типа кластера, объема оперативной памяти и количества реплик — их можно передать при создании кластера в поле &#x60;config_parameters&#x60;. Список имен параметров, доступных для каждого типа кластера, возвращает &#x60;GET /api/v1/dbs/parameters&#x60;.   Тело ответа будет представлять собой объект JSON с ключом &#x60;config_params&#x60;. Рекомендуемые значения рассчитываются только для кластеров MySQL, PostgreSQL и Valkey — для остальных типов возвращается пустой объект.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DatabasesApi();
let type = postgres17; // String | Тип кластера базы данных.
let ram = 2048; // Number | Объём оперативной памяти кластера (в Мб).
let opts = {
  'replicaCount': 1 // Number | Количество нод (реплик) кластера.
};
apiInstance.getDatabaseDefaultParameters(type, ram, opts, (error, data, response) => {
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
 **type** | **String**| Тип кластера базы данных. | 
 **ram** | **Number**| Объём оперативной памяти кластера (в Мб). | 
 **replicaCount** | **Number**| Количество нод (реплик) кластера. | [optional] [default to 1]

### Return type

[**GetDatabaseDefaultParameters200Response**](GetDatabaseDefaultParameters200Response.md)

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

> DbParametersByType getDatabaseParameters()

Получение списка параметров баз данных

Чтобы получить список параметров баз данных, отправьте GET-запрос на &#x60;/api/v1/dbs/parameters&#x60;.   Ответ содержит только имена параметров, доступных для каждого типа кластера. Рекомендуемые значения этих параметров для конкретной конфигурации возвращает &#x60;GET /api/v1/dbs/default-parameters&#x60;.

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

[**DbParametersByType**](DbParametersByType.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getDatabasePreset

> GetDatabasePreset200Response getDatabasePreset(presetId)

Получение тарифа для базы данных

Чтобы получить тариф для базы данных, отправьте GET-запрос на &#x60;/api/v2/dbs/presets/{preset_id}&#x60;.   Тело ответа будет представлять собой объект JSON с ключом &#x60;databases_preset&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DatabasesApi();
let presetId = 56; // Number | ID тарифа
apiInstance.getDatabasePreset(presetId, (error, data, response) => {
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
 **presetId** | **Number**| ID тарифа | 

### Return type

[**GetDatabasePreset200Response**](GetDatabasePreset200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getDatabasePrivileges

> GetDatabasePrivileges200Response getDatabasePrivileges(dbClusterId)

Получение привилегий кластера базы данных

Чтобы получить список привилегий, которые можно выдать пользователям кластера базы данных, отправьте GET-запрос на &#x60;/api/v1/databases/{db_cluster_id}/privileges&#x60;.\\    Список зависит от типа СУБД кластера и определяется сервером автоматически: возвращаются только те привилегии, которые допустимы для этого кластера. Используйте его, чтобы заполнить поле &#x60;privileges&#x60; при &lt;a href&#x3D;&#39;#tag/Bazy-dannyh/operation/createDatabaseUser&#39;&gt;создании&lt;/a&gt; или &lt;a href&#x3D;&#39;#tag/Bazy-dannyh/operation/updateDatabaseUser&#39;&gt;изменении&lt;/a&gt; пользователя базы данных.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DatabasesApi();
let dbClusterId = 56; // Number | ID кластера базы данных
apiInstance.getDatabasePrivileges(dbClusterId, (error, data, response) => {
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

[**GetDatabasePrivileges200Response**](GetDatabasePrivileges200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getDatabaseS3Backup

> CreateDatabaseS3Backup201Response getDatabaseS3Backup(dbId, backupId)

Получение S3-бэкапа базы данных

Чтобы получить информацию о резервной копии кластера базы данных в объектном хранилище, отправьте GET-запрос на &#x60;/api/v2/databases/{db_id}/backups/{backup_id}&#x60;.   Тело ответа будет представлять собой объект JSON с ключом &#x60;backup&#x60;. Обратите внимание, что &#x60;backup_id&#x60; здесь — строка в формате UUID, а не число, как в &#x60;/api/v1/dbs/{db_id}/backups/{backup_id}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DatabasesApi();
let dbId = 56; // Number | ID базы данных
let backupId = "backupId_example"; // String | ID резервной копии в формате UUID
apiInstance.getDatabaseS3Backup(dbId, backupId, (error, data, response) => {
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
 **backupId** | **String**| ID резервной копии в формате UUID | 

### Return type

[**CreateDatabaseS3Backup201Response**](CreateDatabaseS3Backup201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getDatabaseS3Backups

> GetDatabaseS3Backups200Response getDatabaseS3Backups(dbId)

Список S3-бэкапов базы данных

Чтобы получить список резервных копий кластера базы данных в объектном хранилище, отправьте GET-запрос на &#x60;/api/v2/databases/{db_id}/backups&#x60;.   Тело ответа будет представлять собой объект JSON с ключом &#x60;backups&#x60;. Копии отсортированы по дате создания по убыванию — сначала самые свежие.   Резервное копирование в объектное хранилище доступно для кластеров MySQL и PostgreSQL. Идентификатор такой копии — строка в формате UUID; это отдельный от &#x60;/api/v1/dbs/{db_id}/backups&#x60; механизм, и идентификаторы копий между ними не взаимозаменяемы.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DatabasesApi();
let dbId = 56; // Number | ID базы данных
apiInstance.getDatabaseS3Backups(dbId, (error, data, response) => {
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

[**GetDatabaseS3Backups200Response**](GetDatabaseS3Backups200Response.md)

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


## getDatabasesPresets

> GetDatabasesPresets200Response getDatabasesPresets(opts)

Получение списка тарифов для баз данных

Чтобы получить список тарифов для баз данных, отправьте GET-запрос на &#x60;/api/v2/presets/dbs&#x60;.   Без параметров возвращаются тарифы, доступные к заказу — этот список используется при создании кластера. Если передать &#x60;cluster_id&#x60;, вернутся тарифы группы, в пределах которой можно сменить тариф указанного кластера.   Тело ответа будет представлять собой объект JSON с ключом &#x60;databases_presets&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DatabasesApi();
let opts = {
  'clusterId': 56, // Number | ID кластера базы данных. Возвращает тарифы группы, в пределах которой доступна смена тарифа этого кластера (сценарий изменения кластера).
  'withUnavailable': true // Boolean | Включить в ответ тарифы, недоступные к заказу из-за нехватки свободных ресурсов. Учитывается только при запросе без `cluster_id`: вместе с `cluster_id` фильтр по свободным ресурсам и так не применяется.
};
apiInstance.getDatabasesPresets(opts, (error, data, response) => {
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
 **clusterId** | **Number**| ID кластера базы данных. Возвращает тарифы группы, в пределах которой доступна смена тарифа этого кластера (сценарий изменения кластера). | [optional] 
 **withUnavailable** | **Boolean**| Включить в ответ тарифы, недоступные к заказу из-за нехватки свободных ресурсов. Учитывается только при запросе без &#x60;cluster_id&#x60;: вместе с &#x60;cluster_id&#x60; фильтр по свободным ресурсам и так не применяется. | [optional] 

### Return type

[**GetDatabasesPresets200Response**](GetDatabasesPresets200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## performDatabaseClusterAction

> performDatabaseClusterAction(dbClusterId, clusterAction)

Выполнение действия над кластером базы данных

Чтобы выполнить действие над кластером базы данных, отправьте POST-запрос на &#x60;/api/v1/databases/{db_cluster_id}/action&#x60;.   Доступные действия: &#x60;reboot&#x60; — перезагрузка кластера, &#x60;shutdown&#x60; — выключение кластера, &#x60;start&#x60; — включение кластера.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DatabasesApi();
let dbClusterId = 56; // Number | ID кластера базы данных
let clusterAction = new TimewebCloudApi.ClusterAction(); // ClusterAction | 
apiInstance.performDatabaseClusterAction(dbClusterId, clusterAction, (error, data, response) => {
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
 **clusterAction** | [**ClusterAction**](ClusterAction.md)|  | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
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


## restoreDatabaseFromS3Backup

> restoreDatabaseFromS3Backup(dbId, backupId)

Восстановление базы данных из S3-бэкапа

Чтобы восстановить кластер базы данных из резервной копии в объектном хранилище, отправьте POST-запрос на &#x60;/api/v2/databases/{db_id}/backups/{backup_id}/restore&#x60;.   Тела запроса нет, тело ответа пустое. Восстановиться можно только из копии со статусом &#x60;success&#x60;.   Сразу после запуска кластер переходит в статус &#x60;backup_recovery&#x60;. Пока восстановление не завершится, создание, изменение и удаление резервных копий, а также повторный запуск восстановления недоступны.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DatabasesApi();
let dbId = 56; // Number | ID базы данных
let backupId = "backupId_example"; // String | ID резервной копии в формате UUID
apiInstance.restoreDatabaseFromS3Backup(dbId, backupId, (error, data, response) => {
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
 **backupId** | **String**| ID резервной копии в формате UUID | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## updateDatabaseAutoBackupsSettings

> GetDatabaseAutoBackupsSettings200Response updateDatabaseAutoBackupsSettings(dbId, updateAutoBackup)

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
let updateAutoBackup = new TimewebCloudApi.UpdateAutoBackup(); // UpdateAutoBackup | При значении `is_enabled`: `true`, поля `copy_count`, `creation_start_at`, `interval` являются обязательными
apiInstance.updateDatabaseAutoBackupsSettings(dbId, updateAutoBackup, (error, data, response) => {
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
 **updateAutoBackup** | [**UpdateAutoBackup**](UpdateAutoBackup.md)| При значении &#x60;is_enabled&#x60;: &#x60;true&#x60;, поля &#x60;copy_count&#x60;, &#x60;creation_start_at&#x60;, &#x60;interval&#x60; являются обязательными | 

### Return type

[**GetDatabaseAutoBackupsSettings200Response**](GetDatabaseAutoBackupsSettings200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## updateDatabaseBackup

> GetDatabaseBackup200Response updateDatabaseBackup(dbId, backupId, dbsUpdateBackup)

Изменение комментария к бэкапу базы данных

Чтобы изменить комментарий к бэкапу базы данных, отправьте PATCH-запрос на &#x60;/api/v1/dbs/{db_id}/backups/{backup_id}&#x60;.  Тело ответа будет представлять собой объект JSON с ключом &#x60;backup&#x60;. 

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
let dbsUpdateBackup = new TimewebCloudApi.DbsUpdateBackup(); // DbsUpdateBackup | 
apiInstance.updateDatabaseBackup(dbId, backupId, dbsUpdateBackup, (error, data, response) => {
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
 **dbsUpdateBackup** | [**DbsUpdateBackup**](DbsUpdateBackup.md)|  | 

### Return type

[**GetDatabaseBackup200Response**](GetDatabaseBackup200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## updateDatabaseCluster

> UpdateDatabaseCluster200Response updateDatabaseCluster(dbClusterId, updateCluster)

Изменение кластера базы данных

Чтобы изменить кластер базы данных на вашем аккаунте, отправьте PATCH-запрос на &#x60;/api/v1/databases/{db_cluster_id}&#x60;.   Размер кластера задается либо тарифом (&#x60;preset_id&#x60;), либо конфигуратором (&#x60;configuration&#x60;) — эти поля взаимоисключающие.

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

[**UpdateDatabaseCluster200Response**](UpdateDatabaseCluster200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## updateDatabaseClusterV2

> UpdateDatabaseCluster200Response updateDatabaseClusterV2(dbClusterId, updateClusterV2)

Изменение кластера базы данных (v2)

Чтобы изменить кластер базы данных на вашем аккаунте, отправьте PATCH-запрос на &#x60;/api/v2/databases/{db_cluster_id}&#x60;.   В отличие от &#x60;/api/v1/databases/{db_cluster_id}&#x60;, эта версия дополнительно позволяет привязать плавающий IP-адрес (&#x60;floating_ip&#x60;).   Размер кластера задается либо тарифом (&#x60;preset_id&#x60;), либо конфигуратором (&#x60;configuration&#x60;) — эти поля взаимоисключающие.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DatabasesApi();
let dbClusterId = 56; // Number | ID кластера базы данных
let updateClusterV2 = new TimewebCloudApi.UpdateClusterV2(); // UpdateClusterV2 | 
apiInstance.updateDatabaseClusterV2(dbClusterId, updateClusterV2, (error, data, response) => {
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
 **updateClusterV2** | [**UpdateClusterV2**](UpdateClusterV2.md)|  | 

### Return type

[**UpdateDatabaseCluster200Response**](UpdateDatabaseCluster200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## updateDatabaseInstance

> CreateDatabaseInstance201Response updateDatabaseInstance(dbClusterId, instanceId, updateInstance)

Изменение инстанса базы данных

Чтобы изменить инстанс базы данных, отправьте PATCH-запрос на &#x60;/api/v1/databases/{db_cluster_id}/instances/{instance_id}&#x60;.   Изменить название базы данных (&#x60;name&#x60;) и ее владельца (&#x60;owner_id&#x60;) можно только в кластере PostgreSQL, а настройки топика (&#x60;config_parameters&#x60;) — только в кластере Kafka. Если один из этих трех параметров передан для неподходящего типа кластера, запрос вернется с ошибкой 409.   Расширения (&#x60;extensions&#x60;) применимы к кластерам PostgreSQL и RabbitMQ.

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
let updateInstance = new TimewebCloudApi.UpdateInstance(); // UpdateInstance | 
apiInstance.updateDatabaseInstance(dbClusterId, instanceId, updateInstance, (error, data, response) => {
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
 **updateInstance** | [**UpdateInstance**](UpdateInstance.md)|  | 

### Return type

[**CreateDatabaseInstance201Response**](CreateDatabaseInstance201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## updateDatabaseS3Backup

> CreateDatabaseS3Backup201Response updateDatabaseS3Backup(dbId, backupId, opts)

Изменение комментария S3-бэкапа базы данных

Чтобы изменить комментарий к резервной копии кластера базы данных, отправьте PATCH-запрос на &#x60;/api/v2/databases/{db_id}/backups/{backup_id}&#x60;.   Изменить можно только комментарий: других полей метод не принимает, сама резервная копия при этом не пересоздается. Тело ответа будет представлять собой объект JSON с ключом &#x60;backup&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DatabasesApi();
let dbId = 56; // Number | ID базы данных
let backupId = "backupId_example"; // String | ID резервной копии в формате UUID
let opts = {
  'updateS3Backup': new TimewebCloudApi.UpdateS3Backup() // UpdateS3Backup | 
};
apiInstance.updateDatabaseS3Backup(dbId, backupId, opts, (error, data, response) => {
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
 **backupId** | **String**| ID резервной копии в формате UUID | 
 **updateS3Backup** | [**UpdateS3Backup**](UpdateS3Backup.md)|  | [optional] 

### Return type

[**CreateDatabaseS3Backup201Response**](CreateDatabaseS3Backup201Response.md)

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

