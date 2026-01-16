# TimewebCloudApi.MailApi

All URIs are relative to *https://api.timeweb.cloud*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createDomainMailbox**](MailApi.md#createDomainMailbox) | **POST** /api/v1/mail/domains/{domain} | Создание почтового ящика
[**createDomainMailboxV2**](MailApi.md#createDomainMailboxV2) | **POST** /api/v2/mail/domains/{domain} | Создание почтового ящика
[**createMultipleDomainMailboxes**](MailApi.md#createMultipleDomainMailboxes) | **POST** /api/v1/mail/domains/{domain}/batch | Множественное создание почтовых ящиков
[**createMultipleDomainMailboxesV2**](MailApi.md#createMultipleDomainMailboxesV2) | **POST** /api/v2/mail/domains/{domain}/batch | Множественное создание почтовых ящиков
[**deleteMailbox**](MailApi.md#deleteMailbox) | **DELETE** /api/v1/mail/domains/{domain}/mailboxes/{mailbox} | Удаление почтового ящика
[**getAllMailboxesV2**](MailApi.md#getAllMailboxesV2) | **GET** /api/v2/mail | Получение списка всех почтовых ящиков аккаунта
[**getDomainMailInfo**](MailApi.md#getDomainMailInfo) | **GET** /api/v1/mail/domains/{domain}/info | Получение почтовой информации о домене
[**getDomainMailboxes**](MailApi.md#getDomainMailboxes) | **GET** /api/v1/mail/domains/{domain} | Получение списка почтовых ящиков домена
[**getMailbox**](MailApi.md#getMailbox) | **GET** /api/v1/mail/domains/{domain}/mailboxes/{mailbox} | Получение почтового ящика
[**getMailboxV2**](MailApi.md#getMailboxV2) | **GET** /api/v2/mail/domains/{domain}/mailboxes/{mailbox} | Получение почтового ящика
[**getMailboxes**](MailApi.md#getMailboxes) | **GET** /api/v1/mail | Получение списка почтовых ящиков аккаунта
[**updateDomainMailInfo**](MailApi.md#updateDomainMailInfo) | **PATCH** /api/v1/mail/domains/{domain}/info | Изменение почтовой информации о домене
[**updateMailbox**](MailApi.md#updateMailbox) | **PATCH** /api/v1/mail/domains/{domain}/mailboxes/{mailbox} | Изменение почтового ящика
[**updateMailboxV2**](MailApi.md#updateMailboxV2) | **PATCH** /api/v2/mail/domains/{domain}/mailboxes/{mailbox} | Изменение почтового ящика



## createDomainMailbox

> CreateDomainMailbox201Response createDomainMailbox(domain, createDomainMailboxRequest)

Создание почтового ящика

Чтобы создать почтовый ящик, отправьте POST-запрос на &#x60;/api/v1/mail/domains/{domain}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.MailApi();
let domain = somedomain.ru; // String | Полное имя домена
let createDomainMailboxRequest = new TimewebCloudApi.CreateDomainMailboxRequest(); // CreateDomainMailboxRequest | 
apiInstance.createDomainMailbox(domain, createDomainMailboxRequest, (error, data, response) => {
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
 **domain** | **String**| Полное имя домена | 
 **createDomainMailboxRequest** | [**CreateDomainMailboxRequest**](CreateDomainMailboxRequest.md)|  | 

### Return type

[**CreateDomainMailbox201Response**](CreateDomainMailbox201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## createDomainMailboxV2

> CreateDomainMailboxV2201Response createDomainMailboxV2(domain, createDomainMailboxV2Request)

Создание почтового ящика

Чтобы создать почтовый ящик, отправьте POST-запрос на &#x60;/api/v2/mail/domains/{domain}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.MailApi();
let domain = somedomain.ru; // String | Полное имя домена
let createDomainMailboxV2Request = new TimewebCloudApi.CreateDomainMailboxV2Request(); // CreateDomainMailboxV2Request | 
apiInstance.createDomainMailboxV2(domain, createDomainMailboxV2Request, (error, data, response) => {
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
 **domain** | **String**| Полное имя домена | 
 **createDomainMailboxV2Request** | [**CreateDomainMailboxV2Request**](CreateDomainMailboxV2Request.md)|  | 

### Return type

[**CreateDomainMailboxV2201Response**](CreateDomainMailboxV2201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## createMultipleDomainMailboxes

> CreateMultipleDomainMailboxes201Response createMultipleDomainMailboxes(domain, createMultipleDomainMailboxesRequest)

Множественное создание почтовых ящиков

Чтобы создать почтовый ящики, отправьте POST-запрос на &#x60;/api/v1/mail/domains/{domain}/batch&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.MailApi();
let domain = somedomain.ru; // String | Полное имя домена
let createMultipleDomainMailboxesRequest = new TimewebCloudApi.CreateMultipleDomainMailboxesRequest(); // CreateMultipleDomainMailboxesRequest | 
apiInstance.createMultipleDomainMailboxes(domain, createMultipleDomainMailboxesRequest, (error, data, response) => {
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
 **domain** | **String**| Полное имя домена | 
 **createMultipleDomainMailboxesRequest** | [**CreateMultipleDomainMailboxesRequest**](CreateMultipleDomainMailboxesRequest.md)|  | 

### Return type

[**CreateMultipleDomainMailboxes201Response**](CreateMultipleDomainMailboxes201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## createMultipleDomainMailboxesV2

> CreateMultipleDomainMailboxesV2201Response createMultipleDomainMailboxesV2(domain, createMultipleDomainMailboxesV2RequestInner)

Множественное создание почтовых ящиков

Чтобы создать несколько почтовых ящиков одновременно, отправьте POST-запрос на &#x60;/api/v2/mail/domains/{domain}/batch&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.MailApi();
let domain = somedomain.ru; // String | Полное имя домена
let createMultipleDomainMailboxesV2RequestInner = [new TimewebCloudApi.CreateMultipleDomainMailboxesV2RequestInner()]; // [CreateMultipleDomainMailboxesV2RequestInner] | 
apiInstance.createMultipleDomainMailboxesV2(domain, createMultipleDomainMailboxesV2RequestInner, (error, data, response) => {
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
 **domain** | **String**| Полное имя домена | 
 **createMultipleDomainMailboxesV2RequestInner** | [**[CreateMultipleDomainMailboxesV2RequestInner]**](CreateMultipleDomainMailboxesV2RequestInner.md)|  | 

### Return type

[**CreateMultipleDomainMailboxesV2201Response**](CreateMultipleDomainMailboxesV2201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deleteMailbox

> deleteMailbox(domain, mailbox)

Удаление почтового ящика

Чтобы удалить почтовый ящик, отправьте DELETE-запрос на &#x60;/api/v1/mail/domains/{domain}/mailboxes/{mailbox}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.MailApi();
let domain = somedomain.ru; // String | Полное имя домена
let mailbox = mailbox; // String | Название почтового ящика
apiInstance.deleteMailbox(domain, mailbox, (error, data, response) => {
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
 **domain** | **String**| Полное имя домена | 
 **mailbox** | **String**| Название почтового ящика | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getAllMailboxesV2

> GetAllMailboxesV2200Response getAllMailboxesV2(opts)

Получение списка всех почтовых ящиков аккаунта

Чтобы получить список всех почтовых ящиков, отправьте GET-запрос на &#x60;/api/v2/mail&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.MailApi();
let opts = {
  'limit': 100, // Number | Обозначает количество записей, которое необходимо вернуть.
  'offset': 0, // Number | Указывает на смещение относительно начала списка.
  'search': "search_example" // String | Поиск почтового ящика по названию
};
apiInstance.getAllMailboxesV2(opts, (error, data, response) => {
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
 **search** | **String**| Поиск почтового ящика по названию | [optional] 

### Return type

[**GetAllMailboxesV2200Response**](GetAllMailboxesV2200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getDomainMailInfo

> GetDomainMailInfo200Response getDomainMailInfo(domain)

Получение почтовой информации о домене

Чтобы получить почтовую информацию о домене, отправьте GET-запрос на &#x60;/api/v1/mail/domains/{domain}/info&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.MailApi();
let domain = somedomain.ru; // String | Полное имя домена
apiInstance.getDomainMailInfo(domain, (error, data, response) => {
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
 **domain** | **String**| Полное имя домена | 

### Return type

[**GetDomainMailInfo200Response**](GetDomainMailInfo200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getDomainMailboxes

> GetMailboxes200Response getDomainMailboxes(domain, opts)

Получение списка почтовых ящиков домена

Чтобы получить список почтовых ящиков домена, отправьте GET-запрос на &#x60;/api/v1/mail/domains/{domain}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.MailApi();
let domain = somedomain.ru; // String | Полное имя домена
let opts = {
  'limit': 100, // Number | Обозначает количество записей, которое необходимо вернуть.
  'offset': 0, // Number | Указывает на смещение относительно начала списка.
  'search': "search_example" // String | Поиск почтового ящика по названию
};
apiInstance.getDomainMailboxes(domain, opts, (error, data, response) => {
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
 **domain** | **String**| Полное имя домена | 
 **limit** | **Number**| Обозначает количество записей, которое необходимо вернуть. | [optional] [default to 100]
 **offset** | **Number**| Указывает на смещение относительно начала списка. | [optional] [default to 0]
 **search** | **String**| Поиск почтового ящика по названию | [optional] 

### Return type

[**GetMailboxes200Response**](GetMailboxes200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getMailbox

> CreateDomainMailbox201Response getMailbox(domain, mailbox)

Получение почтового ящика

Чтобы получить почтовый ящик, отправьте GET-запрос на &#x60;/api/v1/mail/domains/{domain}/mailboxes/{mailbox}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.MailApi();
let domain = somedomain.ru; // String | Полное имя домена
let mailbox = mailbox; // String | Название почтового ящика
apiInstance.getMailbox(domain, mailbox, (error, data, response) => {
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
 **domain** | **String**| Полное имя домена | 
 **mailbox** | **String**| Название почтового ящика | 

### Return type

[**CreateDomainMailbox201Response**](CreateDomainMailbox201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getMailboxV2

> CreateDomainMailboxV2201Response getMailboxV2(domain, mailbox)

Получение почтового ящика

Чтобы получить почтовый ящик, отправьте GET-запрос на &#x60;/api/v2/mail/domains/{domain}/mailboxes/{mailbox}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.MailApi();
let domain = somedomain.ru; // String | Полное имя домена
let mailbox = mailbox; // String | Название почтового ящика
apiInstance.getMailboxV2(domain, mailbox, (error, data, response) => {
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
 **domain** | **String**| Полное имя домена | 
 **mailbox** | **String**| Название почтового ящика | 

### Return type

[**CreateDomainMailboxV2201Response**](CreateDomainMailboxV2201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getMailboxes

> GetMailboxes200Response getMailboxes(opts)

Получение списка почтовых ящиков аккаунта

Чтобы получить список почтовых ящиков аккаунта, отправьте GET-запрос на &#x60;/api/v1/mail&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.MailApi();
let opts = {
  'limit': 100, // Number | Обозначает количество записей, которое необходимо вернуть.
  'offset': 0, // Number | Указывает на смещение относительно начала списка.
  'search': "search_example" // String | Поиск почтового ящика по названию
};
apiInstance.getMailboxes(opts, (error, data, response) => {
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
 **search** | **String**| Поиск почтового ящика по названию | [optional] 

### Return type

[**GetMailboxes200Response**](GetMailboxes200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## updateDomainMailInfo

> GetDomainMailInfo200Response updateDomainMailInfo(domain, updateDomainMailInfoRequest)

Изменение почтовой информации о домене

Чтобы изменить почтовую информацию о домене, отправьте PATCH-запрос на &#x60;/api/v1/mail/domains/{domain}/info&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.MailApi();
let domain = somedomain.ru; // String | Полное имя домена
let updateDomainMailInfoRequest = new TimewebCloudApi.UpdateDomainMailInfoRequest(); // UpdateDomainMailInfoRequest | 
apiInstance.updateDomainMailInfo(domain, updateDomainMailInfoRequest, (error, data, response) => {
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
 **domain** | **String**| Полное имя домена | 
 **updateDomainMailInfoRequest** | [**UpdateDomainMailInfoRequest**](UpdateDomainMailInfoRequest.md)|  | 

### Return type

[**GetDomainMailInfo200Response**](GetDomainMailInfo200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## updateMailbox

> CreateDomainMailbox201Response updateMailbox(domain, mailbox, updateMailbox)

Изменение почтового ящика

Чтобы изменить почтовый ящик, отправьте PATCH-запрос на &#x60;/api/v1/mail/domains/{domain}/mailboxes/{mailbox}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.MailApi();
let domain = somedomain.ru; // String | Полное имя домена
let mailbox = mailbox; // String | Название почтового ящика
let updateMailbox = new TimewebCloudApi.UpdateMailbox(); // UpdateMailbox | 
apiInstance.updateMailbox(domain, mailbox, updateMailbox, (error, data, response) => {
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
 **domain** | **String**| Полное имя домена | 
 **mailbox** | **String**| Название почтового ящика | 
 **updateMailbox** | [**UpdateMailbox**](UpdateMailbox.md)|  | 

### Return type

[**CreateDomainMailbox201Response**](CreateDomainMailbox201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## updateMailboxV2

> UpdateMailboxV2200Response updateMailboxV2(domain, mailbox, updateMailboxV2)

Изменение почтового ящика

Чтобы изменить почтовый ящик, отправьте PATCH-запрос на &#x60;/api/v2/mail/domains/{domain}/mailboxes/{mailbox}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.MailApi();
let domain = somedomain.ru; // String | Полное имя домена
let mailbox = mailbox; // String | Название почтового ящика
let updateMailboxV2 = new TimewebCloudApi.UpdateMailboxV2(); // UpdateMailboxV2 | 
apiInstance.updateMailboxV2(domain, mailbox, updateMailboxV2, (error, data, response) => {
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
 **domain** | **String**| Полное имя домена | 
 **mailbox** | **String**| Название почтового ящика | 
 **updateMailboxV2** | [**UpdateMailboxV2**](UpdateMailboxV2.md)|  | 

### Return type

[**UpdateMailboxV2200Response**](UpdateMailboxV2200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

