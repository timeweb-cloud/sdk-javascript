# TimewebCloudApi.DomainsApi

All URIs are relative to *https://api.timeweb.cloud*

Method | HTTP request | Description
------------- | ------------- | -------------
[**addDomain**](DomainsApi.md#addDomain) | **POST** /api/v1/add-domain/{fqdn} | Добавление домена на аккаунт
[**addSubdomain**](DomainsApi.md#addSubdomain) | **POST** /api/v1/domains/{fqdn}/subdomains/{subdomain_fqdn} | Добавление поддомена
[**checkDomain**](DomainsApi.md#checkDomain) | **GET** /api/v1/check-domain/{fqdn} | Проверить, доступен ли домен для регистрации
[**createDomainDNSRecord**](DomainsApi.md#createDomainDNSRecord) | **POST** /api/v1/domains/{fqdn}/dns-records | Добавить информацию о DNS-записи для домена или поддомена
[**createDomainDNSRecordV2**](DomainsApi.md#createDomainDNSRecordV2) | **POST** /api/v2/domains/{fqdn}/dns-records | Добавить информацию о DNS-записи для домена или поддомена
[**createDomainRequest**](DomainsApi.md#createDomainRequest) | **POST** /api/v1/domains-requests | Создание заявки на регистрацию/продление/трансфер домена
[**deleteDomain**](DomainsApi.md#deleteDomain) | **DELETE** /api/v1/domains/{fqdn} | Удаление домена
[**deleteDomainDNSRecord**](DomainsApi.md#deleteDomainDNSRecord) | **DELETE** /api/v1/domains/{fqdn}/dns-records/{record_id} | Удалить информацию о DNS-записи для домена или поддомена
[**deleteDomainDNSRecordV2**](DomainsApi.md#deleteDomainDNSRecordV2) | **DELETE** /api/v2/domains/{fqdn}/dns-records/{record_id} | Удалить информацию о DNS-записи для домена или поддомена
[**deleteSubdomain**](DomainsApi.md#deleteSubdomain) | **DELETE** /api/v1/domains/{fqdn}/subdomains/{subdomain_fqdn} | Удаление поддомена
[**getDomain**](DomainsApi.md#getDomain) | **GET** /api/v1/domains/{fqdn} | Получение информации о домене
[**getDomainDNSRecords**](DomainsApi.md#getDomainDNSRecords) | **GET** /api/v1/domains/{fqdn}/dns-records | Получить информацию обо всех пользовательских DNS-записях домена или поддомена
[**getDomainDefaultDNSRecords**](DomainsApi.md#getDomainDefaultDNSRecords) | **GET** /api/v1/domains/{fqdn}/default-dns-records | Получить информацию обо всех DNS-записях по умолчанию домена или поддомена
[**getDomainNameServers**](DomainsApi.md#getDomainNameServers) | **GET** /api/v1/domains/{fqdn}/name-servers | Получение списка name-серверов домена
[**getDomainRequest**](DomainsApi.md#getDomainRequest) | **GET** /api/v1/domains-requests/{request_id} | Получение заявки на регистрацию/продление/трансфер домена
[**getDomainRequests**](DomainsApi.md#getDomainRequests) | **GET** /api/v1/domains-requests | Получение списка заявок на регистрацию/продление/трансфер домена
[**getDomains**](DomainsApi.md#getDomains) | **GET** /api/v1/domains | Получение списка всех доменов
[**getTLD**](DomainsApi.md#getTLD) | **GET** /api/v1/tlds/{tld_id} | Получить информацию о доменной зоне по ID
[**getTLDs**](DomainsApi.md#getTLDs) | **GET** /api/v1/tlds | Получить информацию о доменных зонах
[**updateDomainAutoProlongation**](DomainsApi.md#updateDomainAutoProlongation) | **PATCH** /api/v1/domains/{fqdn} | Включение/выключение автопродления домена
[**updateDomainDNSRecord**](DomainsApi.md#updateDomainDNSRecord) | **PATCH** /api/v1/domains/{fqdn}/dns-records/{record_id} | Обновить информацию о DNS-записи домена или поддомена
[**updateDomainDNSRecordV2**](DomainsApi.md#updateDomainDNSRecordV2) | **PATCH** /api/v2/domains/{fqdn}/dns-records/{record_id} | Обновить информацию о DNS-записи домена или поддомена
[**updateDomainNameServers**](DomainsApi.md#updateDomainNameServers) | **PUT** /api/v1/domains/{fqdn}/name-servers | Изменение name-серверов домена
[**updateDomainRequest**](DomainsApi.md#updateDomainRequest) | **PATCH** /api/v1/domains-requests/{request_id} | Оплата/обновление заявки на регистрацию/продление/трансфер домена



## addDomain

> addDomain(fqdn)

Добавление домена на аккаунт

Чтобы добавить домен на свой аккаунт, отправьте запрос POST на &#x60;/api/v1/add-domain/{fqdn}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DomainsApi();
let fqdn = somedomain.ru; // String | Полное имя домена.
apiInstance.addDomain(fqdn, (error, data, response) => {
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
 **fqdn** | **String**| Полное имя домена. | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## addSubdomain

> AddSubdomain201Response addSubdomain(fqdn, subdomainFqdn)

Добавление поддомена

Чтобы добавить поддомен, отправьте запрос POST на &#x60;/api/v1/domains/{fqdn}/subdomains/{subdomain_fqdn}&#x60;, задав необходимые атрибуты.  Поддомен будет добавлен с использованием предоставленной информации. Тело ответа будет содержать объект JSON с информацией о добавленном поддомене.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DomainsApi();
let fqdn = somedomain.ru; // String | Полное имя домена.
let subdomainFqdn = sub.somedomain.ru; // String | Полное имя поддомена.
apiInstance.addSubdomain(fqdn, subdomainFqdn, (error, data, response) => {
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
 **fqdn** | **String**| Полное имя домена. | 
 **subdomainFqdn** | **String**| Полное имя поддомена. | 

### Return type

[**AddSubdomain201Response**](AddSubdomain201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## checkDomain

> CheckDomain200Response checkDomain(fqdn)

Проверить, доступен ли домен для регистрации

Чтобы проверить, доступен ли домен для регистрации, отправьте запрос GET на &#x60;/api/v1/check-domain/{fqdn}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DomainsApi();
let fqdn = somedomain.ru; // String | Полное имя домена.
apiInstance.checkDomain(fqdn, (error, data, response) => {
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
 **fqdn** | **String**| Полное имя домена. | 

### Return type

[**CheckDomain200Response**](CheckDomain200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## createDomainDNSRecord

> CreateDomainDNSRecord201Response createDomainDNSRecord(fqdn, createDns)

Добавить информацию о DNS-записи для домена или поддомена

Чтобы добавить информацию о DNS-записи для домена или поддомена, отправьте запрос POST на &#x60;/api/v1/domains/{fqdn}/dns-records&#x60;, задав необходимые атрибуты.  DNS-запись будет добавлена с использованием предоставленной информации. Тело ответа будет содержать объект JSON с информацией о добавленной DNS-записи.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DomainsApi();
let fqdn = somedomain.ru; // String | Полное имя домена или поддомена.
let createDns = new TimewebCloudApi.CreateDns(); // CreateDns | 
apiInstance.createDomainDNSRecord(fqdn, createDns, (error, data, response) => {
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
 **fqdn** | **String**| Полное имя домена или поддомена. | 
 **createDns** | [**CreateDns**](CreateDns.md)|  | 

### Return type

[**CreateDomainDNSRecord201Response**](CreateDomainDNSRecord201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## createDomainDNSRecordV2

> CreateDomainDNSRecordV2201Response createDomainDNSRecordV2(fqdn, createDnsV2)

Добавить информацию о DNS-записи для домена или поддомена

Чтобы добавить информацию о DNS-записи для домена или поддомена, отправьте запрос POST на &#x60;/api/v2/domains/{fqdn}/dns-records&#x60;, задав необходимые атрибуты.  DNS-запись будет добавлена с использованием предоставленной информации. Тело ответа будет содержать объект JSON с информацией о добавленной DNS-записи.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DomainsApi();
let fqdn = somedomain.ru; // String | Полное имя домена или поддомена. Для создания записи на основном домене передайте имя домена (например, `somedomain.ru`). Для создания записи на поддомене передайте полное доменное имя включая поддомен (например, `sub.somedomain.ru`).
let createDnsV2 = new TimewebCloudApi.CreateDnsV2(); // CreateDnsV2 | 
apiInstance.createDomainDNSRecordV2(fqdn, createDnsV2, (error, data, response) => {
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
 **fqdn** | **String**| Полное имя домена или поддомена. Для создания записи на основном домене передайте имя домена (например, &#x60;somedomain.ru&#x60;). Для создания записи на поддомене передайте полное доменное имя включая поддомен (например, &#x60;sub.somedomain.ru&#x60;). | 
 **createDnsV2** | [**CreateDnsV2**](CreateDnsV2.md)|  | 

### Return type

[**CreateDomainDNSRecordV2201Response**](CreateDomainDNSRecordV2201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## createDomainRequest

> CreateDomainRequest201Response createDomainRequest(domainRegister)

Создание заявки на регистрацию/продление/трансфер домена

Чтобы создать заявку на регистрацию/продление/трансфер домена, отправьте POST-запрос в &#x60;api/v1/domains-requests&#x60;, задав необходимые атрибуты.  Заявка будет создана с использованием предоставленной информации. Тело ответа будет содержать объект JSON с информацией о созданной заявке.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DomainsApi();
let domainRegister = new TimewebCloudApi.DomainRegister(); // DomainRegister | 
apiInstance.createDomainRequest(domainRegister, (error, data, response) => {
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
 **domainRegister** | [**DomainRegister**](DomainRegister.md)|  | 

### Return type

[**CreateDomainRequest201Response**](CreateDomainRequest201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deleteDomain

> deleteDomain(fqdn)

Удаление домена

Чтобы удалить домен, отправьте запрос DELETE на &#x60;/api/v1/domains/{fqdn}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DomainsApi();
let fqdn = somedomain.ru; // String | Полное имя домена.
apiInstance.deleteDomain(fqdn, (error, data, response) => {
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
 **fqdn** | **String**| Полное имя домена. | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## deleteDomainDNSRecord

> deleteDomainDNSRecord(fqdn, recordId)

Удалить информацию о DNS-записи для домена или поддомена

Чтобы удалить информацию о DNS-записи для домена или поддомена, отправьте запрос DELETE на &#x60;/api/v1/domains/{fqdn}/dns-records/{record_id}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DomainsApi();
let fqdn = somedomain.ru; // String | Полное имя домена или поддомена.
let recordId = 123; // Number | ID DNS-записи домена или поддомена.
apiInstance.deleteDomainDNSRecord(fqdn, recordId, (error, data, response) => {
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
 **fqdn** | **String**| Полное имя домена или поддомена. | 
 **recordId** | **Number**| ID DNS-записи домена или поддомена. | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## deleteDomainDNSRecordV2

> deleteDomainDNSRecordV2(fqdn, recordId)

Удалить информацию о DNS-записи для домена или поддомена

Чтобы удалить информацию о DNS-записи для домена или поддомена, отправьте запрос DELETE на &#x60;/api/v2/domains/{fqdn}/dns-records/{record_id}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DomainsApi();
let fqdn = somedomain.ru; // String | Полное имя домена или поддомена. Для создания записи на основном домене передайте имя домена (например, `somedomain.ru`). Для создания записи на поддомене передайте полное доменное имя включая поддомен (например, `sub.somedomain.ru`).
let recordId = 123; // Number | ID DNS-записи домена или поддомена.
apiInstance.deleteDomainDNSRecordV2(fqdn, recordId, (error, data, response) => {
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
 **fqdn** | **String**| Полное имя домена или поддомена. Для создания записи на основном домене передайте имя домена (например, &#x60;somedomain.ru&#x60;). Для создания записи на поддомене передайте полное доменное имя включая поддомен (например, &#x60;sub.somedomain.ru&#x60;). | 
 **recordId** | **Number**| ID DNS-записи домена или поддомена. | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## deleteSubdomain

> deleteSubdomain(fqdn, subdomainFqdn)

Удаление поддомена

Чтобы удалить поддомен, отправьте запрос DELETE на &#x60;/api/v1/domains/{fqdn}/subdomains/{subdomain_fqdn}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DomainsApi();
let fqdn = somedomain.ru; // String | Полное имя домена.
let subdomainFqdn = sub.somedomain.ru; // String | Полное имя поддомена.
apiInstance.deleteSubdomain(fqdn, subdomainFqdn, (error, data, response) => {
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
 **fqdn** | **String**| Полное имя домена. | 
 **subdomainFqdn** | **String**| Полное имя поддомена. | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getDomain

> GetDomain200Response getDomain(fqdn)

Получение информации о домене

Чтобы отобразить информацию об отдельном домене, отправьте запрос GET на &#x60;/api/v1/domains/{fqdn}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DomainsApi();
let fqdn = somedomain.ru; // String | Полное имя домена.
apiInstance.getDomain(fqdn, (error, data, response) => {
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
 **fqdn** | **String**| Полное имя домена. | 

### Return type

[**GetDomain200Response**](GetDomain200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getDomainDNSRecords

> GetDomainDNSRecords200Response getDomainDNSRecords(fqdn, opts)

Получить информацию обо всех пользовательских DNS-записях домена или поддомена

Чтобы получить информацию обо всех пользовательских DNS-записях домена или поддомена, отправьте запрос GET на &#x60;/api/v1/domains/{fqdn}/dns-records&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DomainsApi();
let fqdn = somedomain.ru; // String | Полное имя домена или поддомена.
let opts = {
  'limit': 100, // Number | Обозначает количество записей, которое необходимо вернуть.
  'offset': 0 // Number | Указывает на смещение относительно начала списка.
};
apiInstance.getDomainDNSRecords(fqdn, opts, (error, data, response) => {
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
 **fqdn** | **String**| Полное имя домена или поддомена. | 
 **limit** | **Number**| Обозначает количество записей, которое необходимо вернуть. | [optional] [default to 100]
 **offset** | **Number**| Указывает на смещение относительно начала списка. | [optional] [default to 0]

### Return type

[**GetDomainDNSRecords200Response**](GetDomainDNSRecords200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getDomainDefaultDNSRecords

> GetDomainDNSRecords200Response getDomainDefaultDNSRecords(fqdn, opts)

Получить информацию обо всех DNS-записях по умолчанию домена или поддомена

Чтобы получить информацию обо всех DNS-записях по умолчанию домена или поддомена, отправьте запрос GET на &#x60;/api/v1/domains/{fqdn}/default-dns-records&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DomainsApi();
let fqdn = somedomain.ru; // String | Полное имя домена или поддомена.
let opts = {
  'limit': 100, // Number | Обозначает количество записей, которое необходимо вернуть.
  'offset': 0 // Number | Указывает на смещение относительно начала списка.
};
apiInstance.getDomainDefaultDNSRecords(fqdn, opts, (error, data, response) => {
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
 **fqdn** | **String**| Полное имя домена или поддомена. | 
 **limit** | **Number**| Обозначает количество записей, которое необходимо вернуть. | [optional] [default to 100]
 **offset** | **Number**| Указывает на смещение относительно начала списка. | [optional] [default to 0]

### Return type

[**GetDomainDNSRecords200Response**](GetDomainDNSRecords200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getDomainNameServers

> GetDomainNameServers200Response getDomainNameServers(fqdn)

Получение списка name-серверов домена

Чтобы получить список name-серверов домена, отправьте запрос GET на &#x60;/api/v1/domains/{fqdn}/name-servers&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DomainsApi();
let fqdn = somedomain.ru; // String | Полное имя домена.
apiInstance.getDomainNameServers(fqdn, (error, data, response) => {
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
 **fqdn** | **String**| Полное имя домена. | 

### Return type

[**GetDomainNameServers200Response**](GetDomainNameServers200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getDomainRequest

> CreateDomainRequest201Response getDomainRequest(requestId)

Получение заявки на регистрацию/продление/трансфер домена

Чтобы получить заявку на регистрацию/продление/трансфер домена, отправьте запрос GET на &#x60;/api/v1/domains-requests/{request_id}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DomainsApi();
let requestId = 123; // Number | ID заявки на регистрацию/продление/трансфер домена.
apiInstance.getDomainRequest(requestId, (error, data, response) => {
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
 **requestId** | **Number**| ID заявки на регистрацию/продление/трансфер домена. | 

### Return type

[**CreateDomainRequest201Response**](CreateDomainRequest201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getDomainRequests

> GetDomainRequests200Response getDomainRequests(opts)

Получение списка заявок на регистрацию/продление/трансфер домена

Чтобы получить список заявок на регистрацию/продление/трансфер домена, отправьте запрос GET на &#x60;/api/v1/domains-requests&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DomainsApi();
let opts = {
  'personId': 123 // Number | ID администратора, на которого зарегистрирован домен.
};
apiInstance.getDomainRequests(opts, (error, data, response) => {
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
 **personId** | **Number**| ID администратора, на которого зарегистрирован домен. | [optional] 

### Return type

[**GetDomainRequests200Response**](GetDomainRequests200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getDomains

> GetDomains200Response getDomains(opts)

Получение списка всех доменов

Чтобы получить список всех доменов на вашем аккаунте, отправьте GET-запрос на &#x60;/api/v1/domains&#x60;.   Тело ответа будет представлять собой объект JSON с ключом &#x60;domains&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DomainsApi();
let opts = {
  'limit': 100, // Number | Обозначает количество записей, которое необходимо вернуть.
  'offset': 0, // Number | Указывает на смещение относительно начала списка.
  'idnName': xn--e1afmkfd.xn--p1ai, // String | Интернационализированное доменное имя.
  'linkedIp': 192.168.1.1, // String | Привязанный к домену IP-адрес.
  'order': asc, // String | Порядок доменов.
  'sort': idn_name // String | Сортировка доменов.
};
apiInstance.getDomains(opts, (error, data, response) => {
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
 **idnName** | **String**| Интернационализированное доменное имя. | [optional] 
 **linkedIp** | **String**| Привязанный к домену IP-адрес. | [optional] 
 **order** | **String**| Порядок доменов. | [optional] 
 **sort** | **String**| Сортировка доменов. | [optional] 

### Return type

[**GetDomains200Response**](GetDomains200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getTLD

> GetTLD200Response getTLD(tldId)

Получить информацию о доменной зоне по ID

Чтобы получить информацию о доменной зоне по ID, отправьте запрос GET на &#x60;/api/v1/tlds/{tld_id}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DomainsApi();
let tldId = 123; // Number | ID доменной зоны.
apiInstance.getTLD(tldId, (error, data, response) => {
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
 **tldId** | **Number**| ID доменной зоны. | 

### Return type

[**GetTLD200Response**](GetTLD200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getTLDs

> GetTLDs200Response getTLDs(opts)

Получить информацию о доменных зонах

Чтобы получить информацию о доменных зонах, отправьте запрос GET на &#x60;/api/v1/tlds&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DomainsApi();
let opts = {
  'isPublished': true, // Boolean | Это логическое значение, которое показывает, опубликована ли доменная зона.
  'isRegistered': true // Boolean | Это логическое значение, которое показывает, зарегистрирована ли доменная зона.
};
apiInstance.getTLDs(opts, (error, data, response) => {
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
 **isPublished** | **Boolean**| Это логическое значение, которое показывает, опубликована ли доменная зона. | [optional] 
 **isRegistered** | **Boolean**| Это логическое значение, которое показывает, зарегистрирована ли доменная зона. | [optional] 

### Return type

[**GetTLDs200Response**](GetTLDs200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## updateDomainAutoProlongation

> UpdateDomainAutoProlongation200Response updateDomainAutoProlongation(fqdn, updateDomain)

Включение/выключение автопродления домена

Чтобы включить/выключить автопродление домена, отправьте запрос PATCH на &#x60;/api/v1/domains/{fqdn}&#x60;, передав в теле запроса параметр &#x60;is_autoprolong_enabled&#x60;

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DomainsApi();
let fqdn = somedomain.ru; // String | Полное имя домена.
let updateDomain = new TimewebCloudApi.UpdateDomain(); // UpdateDomain | 
apiInstance.updateDomainAutoProlongation(fqdn, updateDomain, (error, data, response) => {
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
 **fqdn** | **String**| Полное имя домена. | 
 **updateDomain** | [**UpdateDomain**](UpdateDomain.md)|  | 

### Return type

[**UpdateDomainAutoProlongation200Response**](UpdateDomainAutoProlongation200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## updateDomainDNSRecord

> CreateDomainDNSRecord201Response updateDomainDNSRecord(fqdn, recordId, createDns)

Обновить информацию о DNS-записи домена или поддомена

Чтобы обновить информацию о DNS-записи для домена или поддомена, отправьте запрос PATCH на &#x60;/api/v1/domains/{fqdn}/dns-records/{record_id}&#x60;, задав необходимые атрибуты.  DNS-запись будет обновлена с использованием предоставленной информации. Тело ответа будет содержать объект JSON с информацией об добавленной DNS-записи.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DomainsApi();
let fqdn = somedomain.ru; // String | Полное имя домена или поддомена.
let recordId = 123; // Number | ID DNS-записи домена или поддомена.
let createDns = new TimewebCloudApi.CreateDns(); // CreateDns | 
apiInstance.updateDomainDNSRecord(fqdn, recordId, createDns, (error, data, response) => {
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
 **fqdn** | **String**| Полное имя домена или поддомена. | 
 **recordId** | **Number**| ID DNS-записи домена или поддомена. | 
 **createDns** | [**CreateDns**](CreateDns.md)|  | 

### Return type

[**CreateDomainDNSRecord201Response**](CreateDomainDNSRecord201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## updateDomainDNSRecordV2

> CreateDomainDNSRecordV2201Response updateDomainDNSRecordV2(fqdn, recordId, createDnsV2)

Обновить информацию о DNS-записи домена или поддомена

Чтобы обновить информацию о DNS-записи для домена или поддомена, отправьте запрос PATCH на &#x60;/api/v2/domains/{fqdn}/dns-records/{record_id}&#x60;, задав необходимые атрибуты.  DNS-запись будет обновлена с использованием предоставленной информации. Тело ответа будет содержать объект JSON с информацией об обновленной DNS-записи.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DomainsApi();
let fqdn = somedomain.ru; // String | Полное имя домена или поддомена. Для создания записи на основном домене передайте имя домена (например, `somedomain.ru`). Для создания записи на поддомене передайте полное доменное имя включая поддомен (например, `sub.somedomain.ru`).
let recordId = 123; // Number | ID DNS-записи домена или поддомена.
let createDnsV2 = new TimewebCloudApi.CreateDnsV2(); // CreateDnsV2 | 
apiInstance.updateDomainDNSRecordV2(fqdn, recordId, createDnsV2, (error, data, response) => {
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
 **fqdn** | **String**| Полное имя домена или поддомена. Для создания записи на основном домене передайте имя домена (например, &#x60;somedomain.ru&#x60;). Для создания записи на поддомене передайте полное доменное имя включая поддомен (например, &#x60;sub.somedomain.ru&#x60;). | 
 **recordId** | **Number**| ID DNS-записи домена или поддомена. | 
 **createDnsV2** | [**CreateDnsV2**](CreateDnsV2.md)|  | 

### Return type

[**CreateDomainDNSRecordV2201Response**](CreateDomainDNSRecordV2201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## updateDomainNameServers

> GetDomainNameServers200Response updateDomainNameServers(fqdn, updateDomainNameServers)

Изменение name-серверов домена

Чтобы изменить name-серверы домена, отправьте запрос PUT на &#x60;/api/v1/domains/{fqdn}/name-servers&#x60;, задав необходимые атрибуты.  Name-серверы будут изменены с использованием предоставленной информации. Тело ответа будет содержать объект JSON с информацией о name-серверах домена.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DomainsApi();
let fqdn = somedomain.ru; // String | Полное имя домена.
let updateDomainNameServers = new TimewebCloudApi.UpdateDomainNameServers(); // UpdateDomainNameServers | 
apiInstance.updateDomainNameServers(fqdn, updateDomainNameServers, (error, data, response) => {
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
 **fqdn** | **String**| Полное имя домена. | 
 **updateDomainNameServers** | [**UpdateDomainNameServers**](UpdateDomainNameServers.md)|  | 

### Return type

[**GetDomainNameServers200Response**](GetDomainNameServers200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## updateDomainRequest

> CreateDomainRequest201Response updateDomainRequest(requestId, use)

Оплата/обновление заявки на регистрацию/продление/трансфер домена

Чтобы оплатить/обновить заявку на регистрацию/продление/трансфер домена, отправьте запрос PATCH на &#x60;/api/v1/domains-requests/{request_id}&#x60;, задав необходимые атрибуты.  Заявка будет обновлена с использованием предоставленной информации. Тело ответа будет содержать объект JSON с информацией о обновленной заявке.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.DomainsApi();
let requestId = 123; // Number | ID заявки на регистрацию/продление/трансфер домена.
let use = new TimewebCloudApi.Use(); // Use | 
apiInstance.updateDomainRequest(requestId, use, (error, data, response) => {
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
 **requestId** | **Number**| ID заявки на регистрацию/продление/трансфер домена. | 
 **use** | [**Use**](Use.md)|  | 

### Return type

[**CreateDomainRequest201Response**](CreateDomainRequest201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

