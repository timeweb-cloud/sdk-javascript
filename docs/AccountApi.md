# TimewebCloudApi.AccountApi

All URIs are relative to *https://api.timeweb.cloud*

Method | HTTP request | Description
------------- | ------------- | -------------
[**addCountriesToAllowedList**](AccountApi.md#addCountriesToAllowedList) | **POST** /api/v1/auth/access/countries | Добавление стран в список разрешенных
[**addIPsToAllowedList**](AccountApi.md#addIPsToAllowedList) | **POST** /api/v1/auth/access/ips | Добавление IP-адресов в список разрешенных
[**deleteCountriesFromAllowedList**](AccountApi.md#deleteCountriesFromAllowedList) | **DELETE** /api/v1/auth/access/countries | Удаление стран из списка разрешенных
[**deleteIPsFromAllowedList**](AccountApi.md#deleteIPsFromAllowedList) | **DELETE** /api/v1/auth/access/ips | Удаление IP-адресов из списка разрешенных
[**getAccountStatus**](AccountApi.md#getAccountStatus) | **GET** /api/v1/account/status | Получение статуса аккаунта
[**getAuthAccessSettings**](AccountApi.md#getAuthAccessSettings) | **GET** /api/v1/auth/access | Получить информацию о ограничениях авторизации пользователя
[**getCountries**](AccountApi.md#getCountries) | **GET** /api/v1/auth/access/countries | Получение списка стран
[**getNotificationSettings**](AccountApi.md#getNotificationSettings) | **GET** /api/v1/account/notification-settings | Получение настроек уведомлений аккаунта
[**updateAuthRestrictionsByCountries**](AccountApi.md#updateAuthRestrictionsByCountries) | **POST** /api/v1/auth/access/countries/enabled | Включение/отключение ограничений по стране
[**updateAuthRestrictionsByIP**](AccountApi.md#updateAuthRestrictionsByIP) | **POST** /api/v1/auth/access/ips/enabled | Включение/отключение ограничений по IP-адресу
[**updateNotificationSettings**](AccountApi.md#updateNotificationSettings) | **PATCH** /api/v1/account/notification-settings | Изменение настроек уведомлений аккаунта



## addCountriesToAllowedList

> AddCountriesToAllowedList201Response addCountriesToAllowedList(addCountriesToAllowedListRequest)

Добавление стран в список разрешенных

Чтобы добавить страны в список разрешенных, отправьте POST-запрос в &#x60;api/v1/access/countries&#x60;, передав в теле запроса параметр &#x60;countries&#x60; со списком стран.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AccountApi();
let addCountriesToAllowedListRequest = new TimewebCloudApi.AddCountriesToAllowedListRequest(); // AddCountriesToAllowedListRequest | 
apiInstance.addCountriesToAllowedList(addCountriesToAllowedListRequest, (error, data, response) => {
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
 **addCountriesToAllowedListRequest** | [**AddCountriesToAllowedListRequest**](AddCountriesToAllowedListRequest.md)|  | 

### Return type

[**AddCountriesToAllowedList201Response**](AddCountriesToAllowedList201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## addIPsToAllowedList

> AddIPsToAllowedList201Response addIPsToAllowedList(addIPsToAllowedListRequest)

Добавление IP-адресов в список разрешенных

Чтобы добавить IP-адреса в список разрешенных, отправьте POST-запрос в &#x60;api/v1/access/ips&#x60;, передав в теле запроса параметр &#x60;ips&#x60; со списком IP-адресов.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AccountApi();
let addIPsToAllowedListRequest = new TimewebCloudApi.AddIPsToAllowedListRequest(); // AddIPsToAllowedListRequest | 
apiInstance.addIPsToAllowedList(addIPsToAllowedListRequest, (error, data, response) => {
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
 **addIPsToAllowedListRequest** | [**AddIPsToAllowedListRequest**](AddIPsToAllowedListRequest.md)|  | 

### Return type

[**AddIPsToAllowedList201Response**](AddIPsToAllowedList201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deleteCountriesFromAllowedList

> DeleteCountriesFromAllowedList200Response deleteCountriesFromAllowedList(deleteCountriesFromAllowedListRequest)

Удаление стран из списка разрешенных

Чтобы удалить страны из списка разрешенных, отправьте DELETE-запрос в &#x60;api/v1/access/countries&#x60;, передав в теле запроса параметр &#x60;countries&#x60; со списком стран.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AccountApi();
let deleteCountriesFromAllowedListRequest = new TimewebCloudApi.DeleteCountriesFromAllowedListRequest(); // DeleteCountriesFromAllowedListRequest | 
apiInstance.deleteCountriesFromAllowedList(deleteCountriesFromAllowedListRequest, (error, data, response) => {
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
 **deleteCountriesFromAllowedListRequest** | [**DeleteCountriesFromAllowedListRequest**](DeleteCountriesFromAllowedListRequest.md)|  | 

### Return type

[**DeleteCountriesFromAllowedList200Response**](DeleteCountriesFromAllowedList200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deleteIPsFromAllowedList

> DeleteIPsFromAllowedList200Response deleteIPsFromAllowedList(deleteIPsFromAllowedListRequest)

Удаление IP-адресов из списка разрешенных

Чтобы удалить IP-адреса из списка разрешенных, отправьте DELETE-запрос в &#x60;api/v1/access/ips&#x60;, передав в теле запроса параметр &#x60;ips&#x60; со списком IP-адресов.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AccountApi();
let deleteIPsFromAllowedListRequest = new TimewebCloudApi.DeleteIPsFromAllowedListRequest(); // DeleteIPsFromAllowedListRequest | 
apiInstance.deleteIPsFromAllowedList(deleteIPsFromAllowedListRequest, (error, data, response) => {
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
 **deleteIPsFromAllowedListRequest** | [**DeleteIPsFromAllowedListRequest**](DeleteIPsFromAllowedListRequest.md)|  | 

### Return type

[**DeleteIPsFromAllowedList200Response**](DeleteIPsFromAllowedList200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## getAccountStatus

> GetAccountStatus200Response getAccountStatus()

Получение статуса аккаунта

Чтобы получить статус аккаунта, отправьте GET-запрос на &#x60;/api/v1/account/status&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AccountApi();
apiInstance.getAccountStatus((error, data, response) => {
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

[**GetAccountStatus200Response**](GetAccountStatus200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getAuthAccessSettings

> GetAuthAccessSettings200Response getAuthAccessSettings()

Получить информацию о ограничениях авторизации пользователя

Чтобы получить информацию о ограничениях авторизации пользователя, отправьте GET-запрос на &#x60;/api/v1/auth/access&#x60;.   Тело ответа будет представлять собой объект JSON с ключами &#x60;is_ip_restrictions_enabled&#x60;, &#x60;is_country_restrictions_enabled&#x60; и &#x60;white_list&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AccountApi();
apiInstance.getAuthAccessSettings((error, data, response) => {
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

[**GetAuthAccessSettings200Response**](GetAuthAccessSettings200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getCountries

> GetCountries200Response getCountries()

Получение списка стран

Чтобы получить список стран, отправьте GET-запрос на &#x60;/api/v1/auth/access/countries&#x60;.   Тело ответа будет представлять собой объект JSON с ключом &#x60;countries&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AccountApi();
apiInstance.getCountries((error, data, response) => {
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

[**GetCountries200Response**](GetCountries200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getNotificationSettings

> GetNotificationSettings200Response getNotificationSettings()

Получение настроек уведомлений аккаунта

Чтобы получить статус аккаунта, отправьте GET запрос на &#x60;/api/v1/account/notification-settings&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AccountApi();
apiInstance.getNotificationSettings((error, data, response) => {
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

[**GetNotificationSettings200Response**](GetNotificationSettings200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## updateAuthRestrictionsByCountries

> updateAuthRestrictionsByCountries(updateAuthRestrictionsByCountriesRequest)

Включение/отключение ограничений по стране

Чтобы включить/отключить ограничения по стране, отправьте POST-запрос в &#x60;api/v1/access/countries/enabled&#x60;, передав в теле запроса параметр &#x60;is_enabled&#x60;

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AccountApi();
let updateAuthRestrictionsByCountriesRequest = new TimewebCloudApi.UpdateAuthRestrictionsByCountriesRequest(); // UpdateAuthRestrictionsByCountriesRequest | 
apiInstance.updateAuthRestrictionsByCountries(updateAuthRestrictionsByCountriesRequest, (error, data, response) => {
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
 **updateAuthRestrictionsByCountriesRequest** | [**UpdateAuthRestrictionsByCountriesRequest**](UpdateAuthRestrictionsByCountriesRequest.md)|  | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## updateAuthRestrictionsByIP

> updateAuthRestrictionsByIP(updateAuthRestrictionsByCountriesRequest)

Включение/отключение ограничений по IP-адресу

Чтобы включить/отключить ограничения по IP-адресу, отправьте POST-запрос в &#x60;api/v1/access/ips/enabled&#x60;, передав в теле запроса параметр &#x60;is_enabled&#x60;

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AccountApi();
let updateAuthRestrictionsByCountriesRequest = new TimewebCloudApi.UpdateAuthRestrictionsByCountriesRequest(); // UpdateAuthRestrictionsByCountriesRequest | 
apiInstance.updateAuthRestrictionsByIP(updateAuthRestrictionsByCountriesRequest, (error, data, response) => {
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
 **updateAuthRestrictionsByCountriesRequest** | [**UpdateAuthRestrictionsByCountriesRequest**](UpdateAuthRestrictionsByCountriesRequest.md)|  | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## updateNotificationSettings

> GetNotificationSettings200Response updateNotificationSettings(updateNotificationSettingsRequest)

Изменение настроек уведомлений аккаунта

Чтобы изменить настройки уведомлений аккаунта, отправьте PATCH запрос на &#x60;/api/v1/account/notification-settings&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AccountApi();
let updateNotificationSettingsRequest = new TimewebCloudApi.UpdateNotificationSettingsRequest(); // UpdateNotificationSettingsRequest | 
apiInstance.updateNotificationSettings(updateNotificationSettingsRequest, (error, data, response) => {
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
 **updateNotificationSettingsRequest** | [**UpdateNotificationSettingsRequest**](UpdateNotificationSettingsRequest.md)|  | 

### Return type

[**GetNotificationSettings200Response**](GetNotificationSettings200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

