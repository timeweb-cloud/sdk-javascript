# TimewebCloudApi.ServersApi

All URIs are relative to *https://api.timeweb.cloud*

Method | HTTP request | Description
------------- | ------------- | -------------
[**addServerIP**](ServersApi.md#addServerIP) | **POST** /api/v1/servers/{server_id}/ips | Добавление IP-адреса сервера
[**cloneServer**](ServersApi.md#cloneServer) | **POST** /api/v1/servers/{server_id}/clone | Клонирование сервера
[**createServer**](ServersApi.md#createServer) | **POST** /api/v1/servers | Создание сервера
[**createServerDisk**](ServersApi.md#createServerDisk) | **POST** /api/v1/servers/{server_id}/disks | Создание диска сервера
[**createServerDiskBackup**](ServersApi.md#createServerDiskBackup) | **POST** /api/v1/servers/{server_id}/disks/{disk_id}/backups | Создание бэкапа диска сервера
[**deleteServer**](ServersApi.md#deleteServer) | **DELETE** /api/v1/servers/{server_id} | Удаление сервера
[**deleteServerDisk**](ServersApi.md#deleteServerDisk) | **DELETE** /api/v1/servers/{server_id}/disks/{disk_id} | Удаление диска сервера
[**deleteServerDiskBackup**](ServersApi.md#deleteServerDiskBackup) | **DELETE** /api/v1/servers/{server_id}/disks/{disk_id}/backups/{backup_id} | Удаление бэкапа диска сервера
[**deleteServerIP**](ServersApi.md#deleteServerIP) | **DELETE** /api/v1/servers/{server_id}/ips | Удаление IP-адреса сервера
[**getConfigurators**](ServersApi.md#getConfigurators) | **GET** /api/v1/configurator/servers | Получение списка конфигураторов серверов
[**getOsList**](ServersApi.md#getOsList) | **GET** /api/v1/os/servers | Получение списка операционных систем
[**getServer**](ServersApi.md#getServer) | **GET** /api/v1/servers/{server_id} | Получение сервера
[**getServerDisk**](ServersApi.md#getServerDisk) | **GET** /api/v1/servers/{server_id}/disks/{disk_id} | Получение диска сервера
[**getServerDiskAutoBackupSettings**](ServersApi.md#getServerDiskAutoBackupSettings) | **GET** /api/v1/servers/{server_id}/disks/{disk_id}/auto-backups | Получить настройки автобэкапов диска сервера
[**getServerDiskBackup**](ServersApi.md#getServerDiskBackup) | **GET** /api/v1/servers/{server_id}/disks/{disk_id}/backups/{backup_id} | Получение бэкапа диска сервера
[**getServerDiskBackups**](ServersApi.md#getServerDiskBackups) | **GET** /api/v1/servers/{server_id}/disks/{disk_id}/backups | Получение списка бэкапов диска сервера
[**getServerDisks**](ServersApi.md#getServerDisks) | **GET** /api/v1/servers/{server_id}/disks | Получение списка дисков сервера
[**getServerIPs**](ServersApi.md#getServerIPs) | **GET** /api/v1/servers/{server_id}/ips | Получение списка IP-адресов сервера
[**getServerLogs**](ServersApi.md#getServerLogs) | **GET** /api/v1/servers/{server_id}/logs | Получение списка логов сервера
[**getServerStatistics**](ServersApi.md#getServerStatistics) | **GET** /api/v1/servers/{server_id}/statistics | Получение статистики сервера
[**getServers**](ServersApi.md#getServers) | **GET** /api/v1/servers | Получение списка серверов
[**getServersPresets**](ServersApi.md#getServersPresets) | **GET** /api/v1/presets/servers | Получение списка тарифов серверов
[**getSoftware**](ServersApi.md#getSoftware) | **GET** /api/v1/software/servers | Получение списка ПО из маркетплейса
[**hardShutdownServer**](ServersApi.md#hardShutdownServer) | **POST** /api/v1/servers/{server_id}/hard-shutdown | Принудительное выключение сервера
[**imageUnmountAndServerReload**](ServersApi.md#imageUnmountAndServerReload) | **POST** /api/v1/servers/{server_id}/image-unmount | Отмонтирование ISO образа и перезагрузка сервера
[**performActionOnBackup**](ServersApi.md#performActionOnBackup) | **POST** /api/v1/servers/{server_id}/disks/{disk_id}/backups/{backup_id}/action | Выполнение действия над бэкапом диска сервера
[**performActionOnServer**](ServersApi.md#performActionOnServer) | **POST** /api/v1/servers/{server_id}/action | Выполнение действия над сервером
[**rebootServer**](ServersApi.md#rebootServer) | **POST** /api/v1/servers/{server_id}/reboot | Перезагрузка сервера
[**resetServerPassword**](ServersApi.md#resetServerPassword) | **POST** /api/v1/servers/{server_id}/reset-password | Сброс пароля сервера
[**shutdownServer**](ServersApi.md#shutdownServer) | **POST** /api/v1/servers/{server_id}/shutdown | Выключение сервера
[**startServer**](ServersApi.md#startServer) | **POST** /api/v1/servers/{server_id}/start | Запуск сервера
[**updateServer**](ServersApi.md#updateServer) | **PATCH** /api/v1/servers/{server_id} | Изменение сервера
[**updateServerDisk**](ServersApi.md#updateServerDisk) | **PATCH** /api/v1/servers/{server_id}/disks/{disk_id} | Изменение параметров диска сервера
[**updateServerDiskAutoBackupSettings**](ServersApi.md#updateServerDiskAutoBackupSettings) | **PATCH** /api/v1/servers/{server_id}/disks/{disk_id}/auto-backups | Изменение настроек автобэкапов диска сервера
[**updateServerDiskBackup**](ServersApi.md#updateServerDiskBackup) | **PATCH** /api/v1/servers/{server_id}/disks/{disk_id}/backups/{backup_id} | Изменение бэкапа диска сервера
[**updateServerIP**](ServersApi.md#updateServerIP) | **PATCH** /api/v1/servers/{server_id}/ips | Изменение IP-адреса сервера
[**updateServerNAT**](ServersApi.md#updateServerNAT) | **PATCH** /api/v1/servers/{server_id}/local-networks/nat-mode | Изменение правил маршрутизации трафика сервера (NAT)
[**updateServerOSBootMode**](ServersApi.md#updateServerOSBootMode) | **POST** /api/v1/servers/{server_id}/boot-mode | Выбор типа загрузки операционной системы сервера



## addServerIP

> AddServerIP201Response addServerIP(serverId, addServerIPRequest)

Добавление IP-адреса сервера

Чтобы добавить IP-адрес сервера, отправьте POST-запрос на &#x60;/api/v1/servers/{server_id}/ips&#x60;. \\  На данный момент IPv6 доступны только для серверов с локацией &#x60;ru-1&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ServersApi();
let serverId = 1051; // Number | Уникальный идентификатор облачного сервера.
let addServerIPRequest = new TimewebCloudApi.AddServerIPRequest(); // AddServerIPRequest | 
apiInstance.addServerIP(serverId, addServerIPRequest, (error, data, response) => {
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
 **serverId** | **Number**| Уникальный идентификатор облачного сервера. | 
 **addServerIPRequest** | [**AddServerIPRequest**](AddServerIPRequest.md)|  | 

### Return type

[**AddServerIP201Response**](AddServerIP201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## cloneServer

> CreateServer201Response cloneServer(serverId)

Клонирование сервера

Чтобы клонировать сервер, отправьте POST-запрос на &#x60;/api/v1/servers/{server_id}/clone&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ServersApi();
let serverId = 1051; // Number | Уникальный идентификатор облачного сервера.
apiInstance.cloneServer(serverId, (error, data, response) => {
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
 **serverId** | **Number**| Уникальный идентификатор облачного сервера. | 

### Return type

[**CreateServer201Response**](CreateServer201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## createServer

> CreateServer201Response createServer(createServer)

Создание сервера

Чтобы создать сервер, отправьте POST-запрос в &#x60;api/v1/servers&#x60;, задав необходимые атрибуты. Обязательно должен присутствовать один из параметров &#x60;configuration&#x60; или &#x60;preset_id&#x60;, а также &#x60;image_id&#x60; или &#x60;os_id&#x60;.  Cервер будет создан с использованием предоставленной информации. Тело ответа будет содержать объект JSON с информацией о созданном сервере.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ServersApi();
let createServer = new TimewebCloudApi.CreateServer(); // CreateServer | 
apiInstance.createServer(createServer, (error, data, response) => {
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
 **createServer** | [**CreateServer**](CreateServer.md)|  | 

### Return type

[**CreateServer201Response**](CreateServer201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## createServerDisk

> CreateServerDisk201Response createServerDisk(serverId, opts)

Создание диска сервера

Чтобы создать диск сервера, отправьте POST-запрос на &#x60;/api/v1/servers/{server_id}/disks&#x60;. Системный диск создать нельзя.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ServersApi();
let serverId = 1051; // Number | Уникальный идентификатор облачного сервера.
let opts = {
  'createServerDiskRequest': new TimewebCloudApi.CreateServerDiskRequest() // CreateServerDiskRequest | 
};
apiInstance.createServerDisk(serverId, opts, (error, data, response) => {
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
 **serverId** | **Number**| Уникальный идентификатор облачного сервера. | 
 **createServerDiskRequest** | [**CreateServerDiskRequest**](CreateServerDiskRequest.md)|  | [optional] 

### Return type

[**CreateServerDisk201Response**](CreateServerDisk201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## createServerDiskBackup

> CreateServerDiskBackup201Response createServerDiskBackup(serverId, diskId, opts)

Создание бэкапа диска сервера

Чтобы создать бэкап диска сервера, отправьте POST-запрос на &#x60;/api/v1/servers/{server_id}/disks/{disk_id}/backups&#x60;.   Тело ответа будет представлять собой объект JSON с ключом &#x60;backup&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ServersApi();
let serverId = 1051; // Number | Уникальный идентификатор облачного сервера.
let diskId = 1051; // Number | Уникальный идентификатор диска сервера.
let opts = {
  'createServerDiskBackupRequest': new TimewebCloudApi.CreateServerDiskBackupRequest() // CreateServerDiskBackupRequest | 
};
apiInstance.createServerDiskBackup(serverId, diskId, opts, (error, data, response) => {
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
 **serverId** | **Number**| Уникальный идентификатор облачного сервера. | 
 **diskId** | **Number**| Уникальный идентификатор диска сервера. | 
 **createServerDiskBackupRequest** | [**CreateServerDiskBackupRequest**](CreateServerDiskBackupRequest.md)|  | [optional] 

### Return type

[**CreateServerDiskBackup201Response**](CreateServerDiskBackup201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deleteServer

> DeleteServer200Response deleteServer(serverId, opts)

Удаление сервера

Чтобы удалить сервер, отправьте запрос DELETE в &#x60;/api/v1/servers/{server_id}&#x60;.\\  Обратите внимание, если на аккаунте включено удаление серверов по смс, то вернется ошибка 423.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ServersApi();
let serverId = 1051; // Number | Уникальный идентификатор облачного сервера.
let opts = {
  'hash': 15095f25-aac3-4d60-a788-96cb5136f186, // String | Хеш, который совместно с кодом авторизации надо отправить для удаления, если включено подтверждение удаления сервисов через Телеграм.
  'code': 0000 // String | Код подтверждения, который придет к вам в Телеграм, после запроса удаления, если включено подтверждение удаления сервисов.  При помощи API токена сервисы можно удалять без подтверждения, если параметр токена `is_able_to_delete` установлен в значение `true`
};
apiInstance.deleteServer(serverId, opts, (error, data, response) => {
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
 **serverId** | **Number**| Уникальный идентификатор облачного сервера. | 
 **hash** | **String**| Хеш, который совместно с кодом авторизации надо отправить для удаления, если включено подтверждение удаления сервисов через Телеграм. | [optional] 
 **code** | **String**| Код подтверждения, который придет к вам в Телеграм, после запроса удаления, если включено подтверждение удаления сервисов.  При помощи API токена сервисы можно удалять без подтверждения, если параметр токена &#x60;is_able_to_delete&#x60; установлен в значение &#x60;true&#x60; | [optional] 

### Return type

[**DeleteServer200Response**](DeleteServer200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## deleteServerDisk

> deleteServerDisk(serverId, diskId)

Удаление диска сервера

Чтобы удалить диск сервера, отправьте DELETE-запрос на &#x60;/api/v1/servers/{server_id}/disks/{disk_id}&#x60;. Нельзя удалять системный диск.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ServersApi();
let serverId = 1051; // Number | Уникальный идентификатор облачного сервера.
let diskId = 1051; // Number | Уникальный идентификатор диска сервера.
apiInstance.deleteServerDisk(serverId, diskId, (error, data, response) => {
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
 **serverId** | **Number**| Уникальный идентификатор облачного сервера. | 
 **diskId** | **Number**| Уникальный идентификатор диска сервера. | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## deleteServerDiskBackup

> deleteServerDiskBackup(serverId, diskId, backupId)

Удаление бэкапа диска сервера

Чтобы удалить бэкап диска сервера, отправьте DELETE-запрос на &#x60;/api/v1/servers/{server_id}/disks/{disk_id}/backups/{backup_id}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ServersApi();
let serverId = 1051; // Number | Уникальный идентификатор облачного сервера.
let diskId = 1051; // Number | Уникальный идентификатор диска сервера.
let backupId = 1051; // Number | Уникальный идентификатор бэкапа сервера.
apiInstance.deleteServerDiskBackup(serverId, diskId, backupId, (error, data, response) => {
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
 **serverId** | **Number**| Уникальный идентификатор облачного сервера. | 
 **diskId** | **Number**| Уникальный идентификатор диска сервера. | 
 **backupId** | **Number**| Уникальный идентификатор бэкапа сервера. | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## deleteServerIP

> deleteServerIP(serverId, deleteServerIPRequest)

Удаление IP-адреса сервера

Чтобы удалить IP-адрес сервера, отправьте DELETE-запрос на &#x60;/api/v1/servers/{server_id}/ips&#x60;. Нельзя удалить основной IP-адрес

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ServersApi();
let serverId = 1051; // Number | Уникальный идентификатор облачного сервера.
let deleteServerIPRequest = new TimewebCloudApi.DeleteServerIPRequest(); // DeleteServerIPRequest | 
apiInstance.deleteServerIP(serverId, deleteServerIPRequest, (error, data, response) => {
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
 **serverId** | **Number**| Уникальный идентификатор облачного сервера. | 
 **deleteServerIPRequest** | [**DeleteServerIPRequest**](DeleteServerIPRequest.md)|  | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## getConfigurators

> GetConfigurators200Response getConfigurators()

Получение списка конфигураторов серверов

Чтобы получить список всех конфигураторов серверов, отправьте GET-запрос на &#x60;/api/v1/configurator/servers&#x60;.   Тело ответа будет представлять собой объект JSON с ключом &#x60;server_configurators&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ServersApi();
apiInstance.getConfigurators((error, data, response) => {
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

[**GetConfigurators200Response**](GetConfigurators200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getOsList

> GetOsList200Response getOsList()

Получение списка операционных систем

Чтобы получить список всех операционных систем, отправьте GET-запрос на &#x60;/api/v1/os/servers&#x60;.   Тело ответа будет представлять собой объект JSON с ключом &#x60;servers_os&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ServersApi();
apiInstance.getOsList((error, data, response) => {
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

[**GetOsList200Response**](GetOsList200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getServer

> CreateServer201Response getServer(serverId)

Получение сервера

Чтобы получить сервер, отправьте запрос GET в &#x60;/api/v1/servers/{server_id}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ServersApi();
let serverId = 1051; // Number | Уникальный идентификатор облачного сервера.
apiInstance.getServer(serverId, (error, data, response) => {
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
 **serverId** | **Number**| Уникальный идентификатор облачного сервера. | 

### Return type

[**CreateServer201Response**](CreateServer201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getServerDisk

> CreateServerDisk201Response getServerDisk(serverId, diskId)

Получение диска сервера

Чтобы получить диск сервера, отправьте GET-запрос на &#x60;/api/v1/servers/{server_id}/disks/{disk_id}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ServersApi();
let serverId = 1051; // Number | Уникальный идентификатор облачного сервера.
let diskId = 1051; // Number | Уникальный идентификатор диска сервера.
apiInstance.getServerDisk(serverId, diskId, (error, data, response) => {
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
 **serverId** | **Number**| Уникальный идентификатор облачного сервера. | 
 **diskId** | **Number**| Уникальный идентификатор диска сервера. | 

### Return type

[**CreateServerDisk201Response**](CreateServerDisk201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getServerDiskAutoBackupSettings

> GetServerDiskAutoBackupSettings200Response getServerDiskAutoBackupSettings(serverId, diskId)

Получить настройки автобэкапов диска сервера

Чтобы полученить настройки автобэкапов диска сервера, отправьте GET-запрос на &#x60;/api/v1/servers/{server_id}/disks/{disk_id}/auto-backups&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ServersApi();
let serverId = 1051; // Number | Уникальный идентификатор облачного сервера.
let diskId = 1051; // Number | Уникальный идентификатор диска сервера.
apiInstance.getServerDiskAutoBackupSettings(serverId, diskId, (error, data, response) => {
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
 **serverId** | **Number**| Уникальный идентификатор облачного сервера. | 
 **diskId** | **Number**| Уникальный идентификатор диска сервера. | 

### Return type

[**GetServerDiskAutoBackupSettings200Response**](GetServerDiskAutoBackupSettings200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getServerDiskBackup

> GetServerDiskBackup200Response getServerDiskBackup(serverId, diskId, backupId)

Получение бэкапа диска сервера

Чтобы получить бэкап диска сервера, отправьте GET-запрос на &#x60;/api/v1/servers/{server_id}/disks/{disk_id}/backups/{backup_id}&#x60;.   Тело ответа будет представлять собой объект JSON с ключом &#x60;backup&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ServersApi();
let serverId = 1051; // Number | Уникальный идентификатор облачного сервера.
let diskId = 1051; // Number | Уникальный идентификатор диска сервера.
let backupId = 1051; // Number | Уникальный идентификатор бэкапа сервера.
apiInstance.getServerDiskBackup(serverId, diskId, backupId, (error, data, response) => {
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
 **serverId** | **Number**| Уникальный идентификатор облачного сервера. | 
 **diskId** | **Number**| Уникальный идентификатор диска сервера. | 
 **backupId** | **Number**| Уникальный идентификатор бэкапа сервера. | 

### Return type

[**GetServerDiskBackup200Response**](GetServerDiskBackup200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getServerDiskBackups

> GetServerDiskBackups200Response getServerDiskBackups(serverId, diskId)

Получение списка бэкапов диска сервера

Чтобы получить список бэкапов диска сервера, отправьте GET-запрос на &#x60;/api/v1/servers/{server_id}/disks/{disk_id}/backups&#x60;.   Тело ответа будет представлять собой объект JSON с ключом &#x60;backups&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ServersApi();
let serverId = 1051; // Number | Уникальный идентификатор облачного сервера.
let diskId = 1051; // Number | Уникальный идентификатор диска сервера.
apiInstance.getServerDiskBackups(serverId, diskId, (error, data, response) => {
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
 **serverId** | **Number**| Уникальный идентификатор облачного сервера. | 
 **diskId** | **Number**| Уникальный идентификатор диска сервера. | 

### Return type

[**GetServerDiskBackups200Response**](GetServerDiskBackups200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getServerDisks

> GetServerDisks200Response getServerDisks(serverId)

Получение списка дисков сервера

Чтобы получить список дисков сервера, отправьте GET-запрос на &#x60;/api/v1/servers/{server_id}/disks&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ServersApi();
let serverId = 1051; // Number | Уникальный идентификатор облачного сервера.
apiInstance.getServerDisks(serverId, (error, data, response) => {
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
 **serverId** | **Number**| Уникальный идентификатор облачного сервера. | 

### Return type

[**GetServerDisks200Response**](GetServerDisks200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getServerIPs

> GetServerIPs200Response getServerIPs(serverId)

Получение списка IP-адресов сервера

Чтобы получить список IP-адресов сервера, отправьте GET-запрос на &#x60;/api/v1/servers/{server_id}/ips&#x60;. \\  На данный момент IPv6 доступны только для локации &#x60;ru-1&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ServersApi();
let serverId = 1051; // Number | Уникальный идентификатор облачного сервера.
apiInstance.getServerIPs(serverId, (error, data, response) => {
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
 **serverId** | **Number**| Уникальный идентификатор облачного сервера. | 

### Return type

[**GetServerIPs200Response**](GetServerIPs200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getServerLogs

> GetServerLogs200Response getServerLogs(serverId, opts)

Получение списка логов сервера

Чтобы получить список логов сервера, отправьте GET-запрос на &#x60;/api/v1/servers/{server_id}/logs&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ServersApi();
let serverId = 1051; // Number | Уникальный идентификатор облачного сервера.
let opts = {
  'limit': 100, // Number | Обозначает количество записей, которое необходимо вернуть.
  'offset': 0, // Number | Указывает на смещение относительно начала списка.
  'order': "'asc'" // String | Сортировка элементов по дате
};
apiInstance.getServerLogs(serverId, opts, (error, data, response) => {
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
 **serverId** | **Number**| Уникальный идентификатор облачного сервера. | 
 **limit** | **Number**| Обозначает количество записей, которое необходимо вернуть. | [optional] [default to 100]
 **offset** | **Number**| Указывает на смещение относительно начала списка. | [optional] [default to 0]
 **order** | **String**| Сортировка элементов по дате | [optional] [default to &#39;asc&#39;]

### Return type

[**GetServerLogs200Response**](GetServerLogs200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getServerStatistics

> GetServerStatistics200Response getServerStatistics(serverId, dateFrom, dateTo)

Получение статистики сервера

Чтобы получить статистику сервера, отправьте GET-запрос на &#x60;/api/v1/servers/{server_id}/statistics&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ServersApi();
let serverId = 1051; // Number | Уникальный идентификатор облачного сервера.
let dateFrom = "dateFrom_example"; // String | Дата начала сбора статистики. Строка в формате ISO 8061, закодированная в ASCII, пример: `2023-05-25%202023-05-25T14%3A35%3A38`
let dateTo = "dateTo_example"; // String | Дата окончания сбора статистики. Строка в формате ISO 8061, закодированная в ASCII, пример: `2023-05-26%202023-05-25T14%3A35%3A38`
apiInstance.getServerStatistics(serverId, dateFrom, dateTo, (error, data, response) => {
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
 **serverId** | **Number**| Уникальный идентификатор облачного сервера. | 
 **dateFrom** | **String**| Дата начала сбора статистики. Строка в формате ISO 8061, закодированная в ASCII, пример: &#x60;2023-05-25%202023-05-25T14%3A35%3A38&#x60; | 
 **dateTo** | **String**| Дата окончания сбора статистики. Строка в формате ISO 8061, закодированная в ASCII, пример: &#x60;2023-05-26%202023-05-25T14%3A35%3A38&#x60; | 

### Return type

[**GetServerStatistics200Response**](GetServerStatistics200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getServers

> GetServers200Response getServers(opts)

Получение списка серверов

Чтобы получить список серверов, отправьте GET-запрос на &#x60;/api/v1/servers&#x60;.   Тело ответа будет представлять собой объект JSON с ключом &#x60;servers&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ServersApi();
let opts = {
  'limit': 100, // Number | Обозначает количество записей, которое необходимо вернуть.
  'offset': 0 // Number | Указывает на смещение относительно начала списка.
};
apiInstance.getServers(opts, (error, data, response) => {
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

[**GetServers200Response**](GetServers200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getServersPresets

> GetServersPresets200Response getServersPresets()

Получение списка тарифов серверов

Чтобы получить список всех тарифов серверов, отправьте GET-запрос на &#x60;/api/v1/presets/servers&#x60;.   Тело ответа будет представлять собой объект JSON с ключом &#x60;server_presets&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ServersApi();
apiInstance.getServersPresets((error, data, response) => {
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

[**GetServersPresets200Response**](GetServersPresets200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getSoftware

> GetSoftware200Response getSoftware()

Получение списка ПО из маркетплейса

Чтобы получить список ПО из маркетплейса, отправьте GET-запрос на &#x60;/api/v1/software/servers&#x60;.   Тело ответа будет представлять собой объект JSON с ключом &#x60;servers_software&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ServersApi();
apiInstance.getSoftware((error, data, response) => {
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

[**GetSoftware200Response**](GetSoftware200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## hardShutdownServer

> hardShutdownServer(serverId)

Принудительное выключение сервера

Чтобы выполнить принудительное выключение сервера, отправьте POST-запрос на &#x60;/api/v1/servers/{server_id}/hard-shutdown&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ServersApi();
let serverId = 1051; // Number | Уникальный идентификатор облачного сервера.
apiInstance.hardShutdownServer(serverId, (error, data, response) => {
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
 **serverId** | **Number**| Уникальный идентификатор облачного сервера. | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## imageUnmountAndServerReload

> imageUnmountAndServerReload(serverId)

Отмонтирование ISO образа и перезагрузка сервера

Чтобы отмонтировать ISO образ и перезагрузить сервер, отправьте POST-запрос на &#x60;/api/v1/servers/{server_id}/image-unmount&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ServersApi();
let serverId = 1051; // Number | Уникальный идентификатор облачного сервера.
apiInstance.imageUnmountAndServerReload(serverId, (error, data, response) => {
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
 **serverId** | **Number**| Уникальный идентификатор облачного сервера. | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## performActionOnBackup

> performActionOnBackup(serverId, diskId, backupId, opts)

Выполнение действия над бэкапом диска сервера

Чтобы выполнить действие над бэкапом диска сервера, отправьте POST-запрос на &#x60;/api/v1/servers/{server_id}/disks/{disk_id}/backups/{backup_id}/action&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ServersApi();
let serverId = 1051; // Number | Уникальный идентификатор облачного сервера.
let diskId = 1051; // Number | Уникальный идентификатор диска сервера.
let backupId = 1051; // Number | Уникальный идентификатор бэкапа сервера.
let opts = {
  'performActionOnBackupRequest': new TimewebCloudApi.PerformActionOnBackupRequest() // PerformActionOnBackupRequest | 
};
apiInstance.performActionOnBackup(serverId, diskId, backupId, opts, (error, data, response) => {
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
 **serverId** | **Number**| Уникальный идентификатор облачного сервера. | 
 **diskId** | **Number**| Уникальный идентификатор диска сервера. | 
 **backupId** | **Number**| Уникальный идентификатор бэкапа сервера. | 
 **performActionOnBackupRequest** | [**PerformActionOnBackupRequest**](PerformActionOnBackupRequest.md)|  | [optional] 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## performActionOnServer

> performActionOnServer(serverId, opts)

Выполнение действия над сервером

Чтобы выполнить действие над сервером, отправьте POST-запрос на &#x60;/api/v1/servers/{server_id}/action&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ServersApi();
let serverId = 1051; // Number | Уникальный идентификатор облачного сервера.
let opts = {
  'performActionOnServerRequest': new TimewebCloudApi.PerformActionOnServerRequest() // PerformActionOnServerRequest | 
};
apiInstance.performActionOnServer(serverId, opts, (error, data, response) => {
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
 **serverId** | **Number**| Уникальный идентификатор облачного сервера. | 
 **performActionOnServerRequest** | [**PerformActionOnServerRequest**](PerformActionOnServerRequest.md)|  | [optional] 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## rebootServer

> rebootServer(serverId)

Перезагрузка сервера

Чтобы перезагрузить сервер, отправьте POST-запрос на &#x60;/api/v1/servers/{server_id}/reboot&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ServersApi();
let serverId = 1051; // Number | Уникальный идентификатор облачного сервера.
apiInstance.rebootServer(serverId, (error, data, response) => {
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
 **serverId** | **Number**| Уникальный идентификатор облачного сервера. | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## resetServerPassword

> resetServerPassword(serverId)

Сброс пароля сервера

Чтобы сбросить пароль сервера, отправьте POST-запрос на &#x60;/api/v1/servers/{server_id}/reset-password&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ServersApi();
let serverId = 1051; // Number | Уникальный идентификатор облачного сервера.
apiInstance.resetServerPassword(serverId, (error, data, response) => {
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
 **serverId** | **Number**| Уникальный идентификатор облачного сервера. | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## shutdownServer

> shutdownServer(serverId)

Выключение сервера

Чтобы выключить сервер, отправьте POST-запрос на &#x60;/api/v1/servers/{server_id}/shutdown&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ServersApi();
let serverId = 1051; // Number | Уникальный идентификатор облачного сервера.
apiInstance.shutdownServer(serverId, (error, data, response) => {
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
 **serverId** | **Number**| Уникальный идентификатор облачного сервера. | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## startServer

> startServer(serverId)

Запуск сервера

Чтобы запустить сервер, отправьте POST-запрос на &#x60;/api/v1/servers/{server_id}/start&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ServersApi();
let serverId = 1051; // Number | Уникальный идентификатор облачного сервера.
apiInstance.startServer(serverId, (error, data, response) => {
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
 **serverId** | **Number**| Уникальный идентификатор облачного сервера. | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## updateServer

> CreateServer201Response updateServer(serverId, updateServer)

Изменение сервера

Чтобы обновить только определенные атрибуты сервера, отправьте запрос PATCH в &#x60;/api/v1/servers/{server_id}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ServersApi();
let serverId = 1051; // Number | Уникальный идентификатор облачного сервера.
let updateServer = new TimewebCloudApi.UpdateServer(); // UpdateServer | 
apiInstance.updateServer(serverId, updateServer, (error, data, response) => {
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
 **serverId** | **Number**| Уникальный идентификатор облачного сервера. | 
 **updateServer** | [**UpdateServer**](UpdateServer.md)|  | 

### Return type

[**CreateServer201Response**](CreateServer201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## updateServerDisk

> CreateServerDisk201Response updateServerDisk(serverId, diskId, opts)

Изменение параметров диска сервера

Чтобы изменить параметры диска сервера, отправьте PATCH-запрос на &#x60;/api/v1/servers/{server_id}/disks/{disk_id}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ServersApi();
let serverId = 1051; // Number | Уникальный идентификатор облачного сервера.
let diskId = 1051; // Number | Уникальный идентификатор диска сервера.
let opts = {
  'updateServerDiskRequest': new TimewebCloudApi.UpdateServerDiskRequest() // UpdateServerDiskRequest | 
};
apiInstance.updateServerDisk(serverId, diskId, opts, (error, data, response) => {
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
 **serverId** | **Number**| Уникальный идентификатор облачного сервера. | 
 **diskId** | **Number**| Уникальный идентификатор диска сервера. | 
 **updateServerDiskRequest** | [**UpdateServerDiskRequest**](UpdateServerDiskRequest.md)|  | [optional] 

### Return type

[**CreateServerDisk201Response**](CreateServerDisk201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## updateServerDiskAutoBackupSettings

> GetServerDiskAutoBackupSettings200Response updateServerDiskAutoBackupSettings(serverId, diskId, opts)

Изменение настроек автобэкапов диска сервера

Чтобы изменить настройки автобэкапов диска сервера, отправьте PATCH-запрос на &#x60;/api/v1/servers/{server_id}/disks/{disk_id}/auto-backups&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ServersApi();
let serverId = 1051; // Number | Уникальный идентификатор облачного сервера.
let diskId = 1051; // Number | Уникальный идентификатор диска сервера.
let opts = {
  'autoBackup': new TimewebCloudApi.AutoBackup() // AutoBackup | При значении `is_enabled`: `true`, поля `copy_count`, `creation_start_at`, `interval` являются обязательными
};
apiInstance.updateServerDiskAutoBackupSettings(serverId, diskId, opts, (error, data, response) => {
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
 **serverId** | **Number**| Уникальный идентификатор облачного сервера. | 
 **diskId** | **Number**| Уникальный идентификатор диска сервера. | 
 **autoBackup** | [**AutoBackup**](AutoBackup.md)| При значении &#x60;is_enabled&#x60;: &#x60;true&#x60;, поля &#x60;copy_count&#x60;, &#x60;creation_start_at&#x60;, &#x60;interval&#x60; являются обязательными | [optional] 

### Return type

[**GetServerDiskAutoBackupSettings200Response**](GetServerDiskAutoBackupSettings200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## updateServerDiskBackup

> GetServerDiskBackup200Response updateServerDiskBackup(serverId, diskId, backupId, opts)

Изменение бэкапа диска сервера

Чтобы изменить бэкап диска сервера, отправьте PATCH-запрос на &#x60;/api/v1/servers/{server_id}/disks/{disk_id}/backups/{backup_id}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ServersApi();
let serverId = 1051; // Number | Уникальный идентификатор облачного сервера.
let diskId = 1051; // Number | Уникальный идентификатор диска сервера.
let backupId = 1051; // Number | Уникальный идентификатор бэкапа сервера.
let opts = {
  'updateServerDiskBackupRequest': new TimewebCloudApi.UpdateServerDiskBackupRequest() // UpdateServerDiskBackupRequest | 
};
apiInstance.updateServerDiskBackup(serverId, diskId, backupId, opts, (error, data, response) => {
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
 **serverId** | **Number**| Уникальный идентификатор облачного сервера. | 
 **diskId** | **Number**| Уникальный идентификатор диска сервера. | 
 **backupId** | **Number**| Уникальный идентификатор бэкапа сервера. | 
 **updateServerDiskBackupRequest** | [**UpdateServerDiskBackupRequest**](UpdateServerDiskBackupRequest.md)|  | [optional] 

### Return type

[**GetServerDiskBackup200Response**](GetServerDiskBackup200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## updateServerIP

> AddServerIP201Response updateServerIP(serverId, updateServerIPRequest)

Изменение IP-адреса сервера

Чтобы изменить IP-адрес сервера, отправьте POST-запрос на &#x60;/api/v1/servers/{server_id}/ips&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ServersApi();
let serverId = 1051; // Number | Уникальный идентификатор облачного сервера.
let updateServerIPRequest = new TimewebCloudApi.UpdateServerIPRequest(); // UpdateServerIPRequest | 
apiInstance.updateServerIP(serverId, updateServerIPRequest, (error, data, response) => {
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
 **serverId** | **Number**| Уникальный идентификатор облачного сервера. | 
 **updateServerIPRequest** | [**UpdateServerIPRequest**](UpdateServerIPRequest.md)|  | 

### Return type

[**AddServerIP201Response**](AddServerIP201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## updateServerNAT

> updateServerNAT(serverId, opts)

Изменение правил маршрутизации трафика сервера (NAT)

Чтобы измененить правила маршрутизации трафика сервера (NAT), отправьте PATCH-запрос на &#x60;/api/v1/servers/{server_id}/local-networks/nat-mode&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ServersApi();
let serverId = 1051; // Number | Уникальный идентификатор облачного сервера.
let opts = {
  'updateServerNATRequest': new TimewebCloudApi.UpdateServerNATRequest() // UpdateServerNATRequest | 
};
apiInstance.updateServerNAT(serverId, opts, (error, data, response) => {
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
 **serverId** | **Number**| Уникальный идентификатор облачного сервера. | 
 **updateServerNATRequest** | [**UpdateServerNATRequest**](UpdateServerNATRequest.md)|  | [optional] 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## updateServerOSBootMode

> updateServerOSBootMode(serverId, opts)

Выбор типа загрузки операционной системы сервера

Чтобы изменить тип загрузки операционной системы сервера, отправьте POST-запрос на &#x60;/api/v1/servers/{server_id}/boot-mode&#x60;. \\  После смены типа загрузки сервер будет перезапущен.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.ServersApi();
let serverId = 1051; // Number | Уникальный идентификатор облачного сервера.
let opts = {
  'updateServerOSBootModeRequest': new TimewebCloudApi.UpdateServerOSBootModeRequest() // UpdateServerOSBootModeRequest | 
};
apiInstance.updateServerOSBootMode(serverId, opts, (error, data, response) => {
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
 **serverId** | **Number**| Уникальный идентификатор облачного сервера. | 
 **updateServerOSBootModeRequest** | [**UpdateServerOSBootModeRequest**](UpdateServerOSBootModeRequest.md)|  | [optional] 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

