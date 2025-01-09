# TimewebCloudApi.S3Api

All URIs are relative to *https://api.timeweb.cloud*

Method | HTTP request | Description
------------- | ------------- | -------------
[**addStorageSubdomainCertificate**](S3Api.md#addStorageSubdomainCertificate) | **POST** /api/v1/storages/certificates/generate | Добавление сертификата для поддомена хранилища
[**addStorageSubdomains**](S3Api.md#addStorageSubdomains) | **POST** /api/v1/storages/buckets/{bucket_id}/subdomains | Добавление поддоменов для хранилища
[**copyStorageFile**](S3Api.md#copyStorageFile) | **POST** /api/v1/storages/buckets/{bucket_id}/object-manager/copy | Копирование файла/директории в хранилище
[**createFolderInStorage**](S3Api.md#createFolderInStorage) | **POST** /api/v1/storages/buckets/{bucket_id}/object-manager/mkdir | Создание директории в хранилище
[**createStorage**](S3Api.md#createStorage) | **POST** /api/v1/storages/buckets | Создание хранилища
[**deleteStorage**](S3Api.md#deleteStorage) | **DELETE** /api/v1/storages/buckets/{bucket_id} | Удаление хранилища на аккаунте
[**deleteStorageFile**](S3Api.md#deleteStorageFile) | **DELETE** /api/v1/storages/buckets/{bucket_id}/object-manager/remove | Удаление файла/директории в хранилище
[**deleteStorageSubdomains**](S3Api.md#deleteStorageSubdomains) | **DELETE** /api/v1/storages/buckets/{bucket_id}/subdomains | Удаление поддоменов хранилища
[**getStorageFilesList**](S3Api.md#getStorageFilesList) | **GET** /api/v1/storages/buckets/{bucket_id}/object-manager/list | Получение списка файлов в хранилище по префиксу
[**getStorageSubdomains**](S3Api.md#getStorageSubdomains) | **GET** /api/v1/storages/buckets/{bucket_id}/subdomains | Получение списка поддоменов хранилища
[**getStorageTransferStatus**](S3Api.md#getStorageTransferStatus) | **GET** /api/v1/storages/buckets/{bucket_id}/transfer-status | Получение статуса переноса хранилища от стороннего S3 в Timeweb Cloud
[**getStorageUsers**](S3Api.md#getStorageUsers) | **GET** /api/v1/storages/users | Получение списка пользователей хранилищ аккаунта
[**getStorages**](S3Api.md#getStorages) | **GET** /api/v1/storages/buckets | Получение списка хранилищ аккаунта
[**getStoragesPresets**](S3Api.md#getStoragesPresets) | **GET** /api/v1/presets/storages | Получение списка тарифов для хранилищ
[**renameStorageFile**](S3Api.md#renameStorageFile) | **POST** /api/v1/storages/buckets/{bucket_id}/object-manager/rename | Переименование файла/директории в хранилище
[**transferStorage**](S3Api.md#transferStorage) | **POST** /api/v1/storages/transfer | Перенос хранилища от стороннего провайдера S3 в Timeweb Cloud
[**updateStorage**](S3Api.md#updateStorage) | **PATCH** /api/v1/storages/buckets/{bucket_id} | Изменение хранилища на аккаунте
[**updateStorageUser**](S3Api.md#updateStorageUser) | **PATCH** /api/v1/storages/users/{user_id} | Изменение пароля пользователя-администратора хранилища
[**uploadFileToStorage**](S3Api.md#uploadFileToStorage) | **POST** /api/v1/storages/buckets/{bucket_id}/object-manager/upload | Загрузка файлов в хранилище



## addStorageSubdomainCertificate

> addStorageSubdomainCertificate(addStorageSubdomainCertificateRequest)

Добавление сертификата для поддомена хранилища

Чтобы добавить сертификат для поддомена хранилища, отправьте POST-запрос на &#x60;/api/v1/storages/certificates/generate&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.S3Api();
let addStorageSubdomainCertificateRequest = new TimewebCloudApi.AddStorageSubdomainCertificateRequest(); // AddStorageSubdomainCertificateRequest | 
apiInstance.addStorageSubdomainCertificate(addStorageSubdomainCertificateRequest, (error, data, response) => {
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
 **addStorageSubdomainCertificateRequest** | [**AddStorageSubdomainCertificateRequest**](AddStorageSubdomainCertificateRequest.md)|  | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## addStorageSubdomains

> AddStorageSubdomains200Response addStorageSubdomains(bucketId, addStorageSubdomainsRequest)

Добавление поддоменов для хранилища

Чтобы добавить поддомены для хранилища, отправьте POST-запрос на &#x60;/api/v1/storages/buckets/{bucket_id}/subdomains&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.S3Api();
let bucketId = 1051; // Number | ID хранилища.
let addStorageSubdomainsRequest = new TimewebCloudApi.AddStorageSubdomainsRequest(); // AddStorageSubdomainsRequest | 
apiInstance.addStorageSubdomains(bucketId, addStorageSubdomainsRequest, (error, data, response) => {
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
 **bucketId** | **Number**| ID хранилища. | 
 **addStorageSubdomainsRequest** | [**AddStorageSubdomainsRequest**](AddStorageSubdomainsRequest.md)|  | 

### Return type

[**AddStorageSubdomains200Response**](AddStorageSubdomains200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## copyStorageFile

> copyStorageFile(bucketId, copyStorageFileRequest)

Копирование файла/директории в хранилище

Чтобы скопировать файла или директорию с вложениями, отправьте POST-запрос на &#x60;/api/v1/storages/buckets/{bucket_id}/object-manager/copy&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.S3Api();
let bucketId = 1051; // Number | ID хранилища.
let copyStorageFileRequest = new TimewebCloudApi.CopyStorageFileRequest(); // CopyStorageFileRequest | 
apiInstance.copyStorageFile(bucketId, copyStorageFileRequest, (error, data, response) => {
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
 **bucketId** | **Number**| ID хранилища. | 
 **copyStorageFileRequest** | [**CopyStorageFileRequest**](CopyStorageFileRequest.md)|  | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## createFolderInStorage

> createFolderInStorage(bucketId, createFolderInStorageRequest)

Создание директории в хранилище

Чтобы создать директорию в хранилище, отправьте POST-запрос на &#x60;/api/v1/storages/buckets/{bucket_id}/object-manager/mkdir&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.S3Api();
let bucketId = 1051; // Number | ID хранилища.
let createFolderInStorageRequest = new TimewebCloudApi.CreateFolderInStorageRequest(); // CreateFolderInStorageRequest | 
apiInstance.createFolderInStorage(bucketId, createFolderInStorageRequest, (error, data, response) => {
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
 **bucketId** | **Number**| ID хранилища. | 
 **createFolderInStorageRequest** | [**CreateFolderInStorageRequest**](CreateFolderInStorageRequest.md)|  | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## createStorage

> CreateStorage201Response createStorage(createStorageRequest)

Создание хранилища

Чтобы создать хранилище, отправьте POST-запрос на &#x60;/api/v1/storages/buckets&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.S3Api();
let createStorageRequest = new TimewebCloudApi.CreateStorageRequest(); // CreateStorageRequest | 
apiInstance.createStorage(createStorageRequest, (error, data, response) => {
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
 **createStorageRequest** | [**CreateStorageRequest**](CreateStorageRequest.md)|  | 

### Return type

[**CreateStorage201Response**](CreateStorage201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deleteStorage

> DeleteStorage200Response deleteStorage(bucketId, opts)

Удаление хранилища на аккаунте

Чтобы удалить хранилище, отправьте DELETE-запрос на &#x60;/api/v1/storages/buckets/{bucket_id}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.S3Api();
let bucketId = 1051; // Number | ID хранилища.
let opts = {
  'hash': 15095f25-aac3-4d60-a788-96cb5136f186, // String | Хеш, который совместно с кодом авторизации надо отправить для удаления, если включено подтверждение удаления сервисов через Телеграм.
  'code': 0000 // String | Код подтверждения, который придет к вам в Телеграм, после запроса удаления, если включено подтверждение удаления сервисов.  При помощи API токена сервисы можно удалять без подтверждения, если параметр токена `is_able_to_delete` установлен в значение `true`
};
apiInstance.deleteStorage(bucketId, opts, (error, data, response) => {
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
 **bucketId** | **Number**| ID хранилища. | 
 **hash** | **String**| Хеш, который совместно с кодом авторизации надо отправить для удаления, если включено подтверждение удаления сервисов через Телеграм. | [optional] 
 **code** | **String**| Код подтверждения, который придет к вам в Телеграм, после запроса удаления, если включено подтверждение удаления сервисов.  При помощи API токена сервисы можно удалять без подтверждения, если параметр токена &#x60;is_able_to_delete&#x60; установлен в значение &#x60;true&#x60; | [optional] 

### Return type

[**DeleteStorage200Response**](DeleteStorage200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## deleteStorageFile

> deleteStorageFile(bucketId, deleteStorageFileRequest, opts)

Удаление файла/директории в хранилище

Чтобы удалить файл или директорию с вложениями, отправьте DELETE-запрос на &#x60;/api/v1/storages/buckets/{bucket_id}/object-manager/remove&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.S3Api();
let bucketId = 1051; // Number | ID хранилища.
let deleteStorageFileRequest = new TimewebCloudApi.DeleteStorageFileRequest(); // DeleteStorageFileRequest | 
let opts = {
  'isMultipart': true // Boolean | Это логическое значение, которое используется для обозначения multipart-загрузки.
};
apiInstance.deleteStorageFile(bucketId, deleteStorageFileRequest, opts, (error, data, response) => {
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
 **bucketId** | **Number**| ID хранилища. | 
 **deleteStorageFileRequest** | [**DeleteStorageFileRequest**](DeleteStorageFileRequest.md)|  | 
 **isMultipart** | **Boolean**| Это логическое значение, которое используется для обозначения multipart-загрузки. | [optional] 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deleteStorageSubdomains

> AddStorageSubdomains200Response deleteStorageSubdomains(bucketId, addStorageSubdomainsRequest)

Удаление поддоменов хранилища

Чтобы удалить поддомены хранилища, отправьте DELETE-запрос на &#x60;/api/v1/storages/buckets/{bucket_id}/subdomains&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.S3Api();
let bucketId = 1051; // Number | ID хранилища.
let addStorageSubdomainsRequest = new TimewebCloudApi.AddStorageSubdomainsRequest(); // AddStorageSubdomainsRequest | 
apiInstance.deleteStorageSubdomains(bucketId, addStorageSubdomainsRequest, (error, data, response) => {
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
 **bucketId** | **Number**| ID хранилища. | 
 **addStorageSubdomainsRequest** | [**AddStorageSubdomainsRequest**](AddStorageSubdomainsRequest.md)|  | 

### Return type

[**AddStorageSubdomains200Response**](AddStorageSubdomains200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## getStorageFilesList

> GetStorageFilesList200Response getStorageFilesList(bucketId, opts)

Получение списка файлов в хранилище по префиксу

Чтобы получить список файлов в хранилище по префиксу, отправьте GET-запрос на &#x60;/api/v1/storages/buckets/{bucket_id}/object-manager/list&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.S3Api();
let bucketId = 1051; // Number | ID хранилища.
let opts = {
  'prefix': example, // String | Префикс для поиска файла.
  'isMultipart': true // Boolean | Это логическое значение, которое используется для обозначения multipart-загрузки.
};
apiInstance.getStorageFilesList(bucketId, opts, (error, data, response) => {
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
 **bucketId** | **Number**| ID хранилища. | 
 **prefix** | **String**| Префикс для поиска файла. | [optional] 
 **isMultipart** | **Boolean**| Это логическое значение, которое используется для обозначения multipart-загрузки. | [optional] 

### Return type

[**GetStorageFilesList200Response**](GetStorageFilesList200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getStorageSubdomains

> GetStorageSubdomains200Response getStorageSubdomains(bucketId)

Получение списка поддоменов хранилища

Чтобы получить список поддоменов хранилища, отправьте GET-запрос на &#x60;/api/v1/storages/buckets/{bucket_id}/subdomains&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.S3Api();
let bucketId = 1051; // Number | ID хранилища.
apiInstance.getStorageSubdomains(bucketId, (error, data, response) => {
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
 **bucketId** | **Number**| ID хранилища. | 

### Return type

[**GetStorageSubdomains200Response**](GetStorageSubdomains200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getStorageTransferStatus

> GetStorageTransferStatus200Response getStorageTransferStatus(bucketId)

Получение статуса переноса хранилища от стороннего S3 в Timeweb Cloud

Чтобы получить статус переноса хранилища от стороннего S3 в Timeweb Cloud, отправьте GET-запрос на &#x60;/api/v1/storages/buckets/{bucket_id}/transfer-status&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.S3Api();
let bucketId = 1051; // Number | ID хранилища.
apiInstance.getStorageTransferStatus(bucketId, (error, data, response) => {
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
 **bucketId** | **Number**| ID хранилища. | 

### Return type

[**GetStorageTransferStatus200Response**](GetStorageTransferStatus200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getStorageUsers

> GetStorageUsers200Response getStorageUsers()

Получение списка пользователей хранилищ аккаунта

Чтобы получить список пользователей хранилищ аккаунта, отправьте GET-запрос на &#x60;/api/v1/storages/users&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.S3Api();
apiInstance.getStorageUsers((error, data, response) => {
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

[**GetStorageUsers200Response**](GetStorageUsers200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getStorages

> GetProjectStorages200Response getStorages()

Получение списка хранилищ аккаунта

Чтобы получить список хранилищ аккаунта, отправьте GET-запрос на &#x60;/api/v1/storages/buckets&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.S3Api();
apiInstance.getStorages((error, data, response) => {
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


## getStoragesPresets

> GetStoragesPresets200Response getStoragesPresets()

Получение списка тарифов для хранилищ

Чтобы получить список тарифов для хранилищ, отправьте GET-запрос на &#x60;/api/v1/presets/storages&#x60;.   Тело ответа будет представлять собой объект JSON с ключом &#x60;storages_presets&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.S3Api();
apiInstance.getStoragesPresets((error, data, response) => {
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

[**GetStoragesPresets200Response**](GetStoragesPresets200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## renameStorageFile

> renameStorageFile(bucketId, renameStorageFileRequest)

Переименование файла/директории в хранилище

Чтобы переименовать файл/директорию в хранилище, отправьте POST-запрос на &#x60;/api/v1/storages/buckets/{bucket_id}/object-manager/rename&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.S3Api();
let bucketId = 1051; // Number | ID хранилища.
let renameStorageFileRequest = new TimewebCloudApi.RenameStorageFileRequest(); // RenameStorageFileRequest | 
apiInstance.renameStorageFile(bucketId, renameStorageFileRequest, (error, data, response) => {
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
 **bucketId** | **Number**| ID хранилища. | 
 **renameStorageFileRequest** | [**RenameStorageFileRequest**](RenameStorageFileRequest.md)|  | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## transferStorage

> transferStorage(transferStorageRequest)

Перенос хранилища от стороннего провайдера S3 в Timeweb Cloud

Чтобы перенести хранилище от стороннего провайдера S3 в Timeweb Cloud, отправьте POST-запрос на &#x60;/api/v1/storages/transfer&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.S3Api();
let transferStorageRequest = new TimewebCloudApi.TransferStorageRequest(); // TransferStorageRequest | 
apiInstance.transferStorage(transferStorageRequest, (error, data, response) => {
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
 **transferStorageRequest** | [**TransferStorageRequest**](TransferStorageRequest.md)|  | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## updateStorage

> CreateStorage201Response updateStorage(bucketId, updateStorageRequest)

Изменение хранилища на аккаунте

Чтобы изменить хранилище, отправьте PATCH-запрос на &#x60;/api/v1/storages/buckets/{bucket_id}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.S3Api();
let bucketId = 1051; // Number | ID хранилища.
let updateStorageRequest = new TimewebCloudApi.UpdateStorageRequest(); // UpdateStorageRequest | 
apiInstance.updateStorage(bucketId, updateStorageRequest, (error, data, response) => {
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
 **bucketId** | **Number**| ID хранилища. | 
 **updateStorageRequest** | [**UpdateStorageRequest**](UpdateStorageRequest.md)|  | 

### Return type

[**CreateStorage201Response**](CreateStorage201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## updateStorageUser

> UpdateStorageUser200Response updateStorageUser(userId, updateStorageUserRequest)

Изменение пароля пользователя-администратора хранилища

Чтобы изменить пароль пользователя-администратора хранилища, отправьте POST-запрос на &#x60;/api/v1/storages/users/{user_id}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.S3Api();
let userId = 1051; // Number | ID пользователя хранилища.
let updateStorageUserRequest = new TimewebCloudApi.UpdateStorageUserRequest(); // UpdateStorageUserRequest | 
apiInstance.updateStorageUser(userId, updateStorageUserRequest, (error, data, response) => {
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
 **userId** | **Number**| ID пользователя хранилища. | 
 **updateStorageUserRequest** | [**UpdateStorageUserRequest**](UpdateStorageUserRequest.md)|  | 

### Return type

[**UpdateStorageUser200Response**](UpdateStorageUser200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## uploadFileToStorage

> uploadFileToStorage(bucketId, files, opts)

Загрузка файлов в хранилище

Чтобы загрузить файлы в хранилище, отправьте POST-запрос на &#x60;/api/v1/storages/buckets/{bucket_id}/object-manager/upload&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.S3Api();
let bucketId = 1051; // Number | ID хранилища.
let files = ["null"]; // [File] | 
let opts = {
  'path': test1/tes2 // String | Путь до директории в хранилище
};
apiInstance.uploadFileToStorage(bucketId, files, opts, (error, data, response) => {
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
 **bucketId** | **Number**| ID хранилища. | 
 **files** | **[File]**|  | 
 **path** | **String**| Путь до директории в хранилище | [optional] 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: multipart/form-data
- **Accept**: application/json

