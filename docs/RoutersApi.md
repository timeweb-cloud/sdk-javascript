# TimewebCloudApi.RoutersApi

All URIs are relative to *https://api.timeweb.cloud*

Method | HTTP request | Description
------------- | ------------- | -------------
[**addNetworks**](RoutersApi.md#addNetworks) | **POST** /api/v1/routers/{router_id}/networks | Подключение сетей к роутеру
[**createRouter**](RoutersApi.md#createRouter) | **POST** /api/v1/routers | Создание роутера
[**deleteDnat**](RoutersApi.md#deleteDnat) | **DELETE** /api/v1/routers/{router_id}/dnat-rules/{dnat_id} | Удаление правила проброса портов
[**deleteRouter**](RoutersApi.md#deleteRouter) | **DELETE** /api/v1/routers/{router_id} | Удаление роутера
[**deleteRouterNat**](RoutersApi.md#deleteRouterNat) | **DELETE** /api/v1/routers/{router_id}/networks/{network_name}/nat | Выключение NAT для сети
[**deleteRouterNetwork**](RoutersApi.md#deleteRouterNetwork) | **DELETE** /api/v1/routers/{router_id}/networks/{network_name} | Удаление сети из роутера
[**deleteStaticRoute**](RoutersApi.md#deleteStaticRoute) | **DELETE** /api/v1/routers/{router_id}/static-routes/{static_route_id} | Удаление статического маршрута
[**getAvailableStaticRoutes**](RoutersApi.md#getAvailableStaticRoutes) | **GET** /api/v1/routers/{router_id}/static-routes/available | Получение доступных подсетей для статических маршрутов
[**getDnat**](RoutersApi.md#getDnat) | **GET** /api/v1/routers/{router_id}/dnat-rules | Получение списка правил проброса портов
[**getDnatRule**](RoutersApi.md#getDnatRule) | **GET** /api/v1/routers/{router_id}/dnat-rules/{dnat_id} | Получение правила проброса портов
[**getNetworks**](RoutersApi.md#getNetworks) | **GET** /api/v1/routers/{router_id}/networks | Получение списка сетей роутера
[**getRouter**](RoutersApi.md#getRouter) | **GET** /api/v1/routers/{router_id} | Получение информации о роутере
[**getRouterAvailableNetworks**](RoutersApi.md#getRouterAvailableNetworks) | **GET** /api/v1/routers/networks/available | Получение списка доступных сетей
[**getRouterPresets**](RoutersApi.md#getRouterPresets) | **GET** /api/v1/presets/routers | Получение списка тарифов роутеров
[**getRouterStatistics**](RoutersApi.md#getRouterStatistics) | **GET** /api/v1/routers/{router_id}/statistics/{time_from}/{period}/{keys} | Получение статистики роутера
[**getRouters**](RoutersApi.md#getRouters) | **GET** /api/v1/routers | Получение списка роутеров
[**getStaticRoutes**](RoutersApi.md#getStaticRoutes) | **GET** /api/v1/routers/{router_id}/static-routes | Получение списка статических маршрутов
[**patchNetwork**](RoutersApi.md#patchNetwork) | **PATCH** /api/v1/routers/{router_id}/networks/{network_name} | Обновление информации о сети
[**patchNetworks**](RoutersApi.md#patchNetworks) | **PATCH** /api/v1/routers/{router_id}/networks | Обновление сетей роутера
[**postDnat**](RoutersApi.md#postDnat) | **POST** /api/v1/routers/{router_id}/dnat-rules | Добавление правила проброса портов
[**postStaticRoute**](RoutersApi.md#postStaticRoute) | **POST** /api/v1/routers/{router_id}/static-routes | Добавление статического маршрута
[**updateRouter**](RoutersApi.md#updateRouter) | **PATCH** /api/v1/routers/{router_id} | Обновление информации о роутере
[**updateRouterNat**](RoutersApi.md#updateRouterNat) | **PATCH** /api/v1/routers/{router_id}/networks/{network_name}/nat | Включение NAT для сети



## addNetworks

> NetworksResponse addNetworks(routerId, networkIn)

Подключение сетей к роутеру

Чтобы подключить сети к роутеру, отправьте POST-запрос на &#x60;/api/v1/routers/{router_id}/networks&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.RoutersApi();
let routerId = "routerId_example"; // String | ID роутера
let networkIn = new TimewebCloudApi.NetworkIn(); // NetworkIn | 
apiInstance.addNetworks(routerId, networkIn, (error, data, response) => {
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
 **routerId** | **String**| ID роутера | 
 **networkIn** | [**NetworkIn**](NetworkIn.md)|  | 

### Return type

[**NetworksResponse**](NetworksResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## createRouter

> RouterResponse createRouter(routerIn)

Создание роутера

Чтобы создать роутер, отправьте POST-запрос на &#x60;/api/v1/routers&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.RoutersApi();
let routerIn = new TimewebCloudApi.RouterIn(); // RouterIn | 
apiInstance.createRouter(routerIn, (error, data, response) => {
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
 **routerIn** | [**RouterIn**](RouterIn.md)|  | 

### Return type

[**RouterResponse**](RouterResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deleteDnat

> deleteDnat(routerId, dnatId)

Удаление правила проброса портов

Чтобы удалить правило проброса портов (DNAT), отправьте DELETE-запрос на &#x60;/api/v1/routers/{router_id}/dnat-rules/{dnat_id}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.RoutersApi();
let routerId = "routerId_example"; // String | ID роутера
let dnatId = "dnatId_example"; // String | ID правила
apiInstance.deleteDnat(routerId, dnatId, (error, data, response) => {
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
 **routerId** | **String**| ID роутера | 
 **dnatId** | **String**| ID правила | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## deleteRouter

> deleteRouter(routerId)

Удаление роутера

Чтобы удалить роутер, отправьте DELETE-запрос на &#x60;/api/v1/routers/{router_id}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.RoutersApi();
let routerId = "routerId_example"; // String | ID роутера
apiInstance.deleteRouter(routerId, (error, data, response) => {
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
 **routerId** | **String**| ID роутера | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## deleteRouterNat

> RouterResponse deleteRouterNat(routerId, networkName)

Выключение NAT для сети

Чтобы выключить NAT для сети роутера, отправьте DELETE-запрос на &#x60;/api/v1/routers/{router_id}/networks/{network_name}/nat&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.RoutersApi();
let routerId = "routerId_example"; // String | ID роутера
let networkName = "networkName_example"; // String | Имя сети
apiInstance.deleteRouterNat(routerId, networkName, (error, data, response) => {
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
 **routerId** | **String**| ID роутера | 
 **networkName** | **String**| Имя сети | 

### Return type

[**RouterResponse**](RouterResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## deleteRouterNetwork

> deleteRouterNetwork(routerId, networkName)

Удаление сети из роутера

Чтобы отключить сеть от роутера, отправьте DELETE-запрос на &#x60;/api/v1/routers/{router_id}/networks/{network_name}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.RoutersApi();
let routerId = "routerId_example"; // String | ID роутера
let networkName = "networkName_example"; // String | Имя сети
apiInstance.deleteRouterNetwork(routerId, networkName, (error, data, response) => {
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
 **routerId** | **String**| ID роутера | 
 **networkName** | **String**| Имя сети | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## deleteStaticRoute

> deleteStaticRoute(routerId, staticRouteId)

Удаление статического маршрута

Чтобы удалить статический маршрут, отправьте DELETE-запрос на &#x60;/api/v1/routers/{router_id}/static-routes/{static_route_id}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.RoutersApi();
let routerId = "routerId_example"; // String | ID роутера
let staticRouteId = "staticRouteId_example"; // String | ID статического маршрута
apiInstance.deleteStaticRoute(routerId, staticRouteId, (error, data, response) => {
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
 **routerId** | **String**| ID роутера | 
 **staticRouteId** | **String**| ID статического маршрута | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getAvailableStaticRoutes

> AvailableStaticRoutesResponse getAvailableStaticRoutes(routerId)

Получение доступных подсетей для статических маршрутов

Чтобы получить список подсетей, доступных для добавления статических маршрутов, отправьте GET-запрос на &#x60;/api/v1/routers/{router_id}/static-routes/available&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.RoutersApi();
let routerId = "routerId_example"; // String | ID роутера
apiInstance.getAvailableStaticRoutes(routerId, (error, data, response) => {
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
 **routerId** | **String**| ID роутера | 

### Return type

[**AvailableStaticRoutesResponse**](AvailableStaticRoutesResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getDnat

> DnatRulesResponse getDnat(routerId)

Получение списка правил проброса портов

Чтобы получить список правил проброса портов (DNAT), отправьте GET-запрос на &#x60;/api/v1/routers/{router_id}/dnat-rules&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.RoutersApi();
let routerId = "routerId_example"; // String | ID роутера
apiInstance.getDnat(routerId, (error, data, response) => {
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
 **routerId** | **String**| ID роутера | 

### Return type

[**DnatRulesResponse**](DnatRulesResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getDnatRule

> DnatRuleResponse getDnatRule(routerId, dnatId)

Получение правила проброса портов

Чтобы получить информацию о правиле проброса портов (DNAT), отправьте GET-запрос на &#x60;/api/v1/routers/{router_id}/dnat-rules/{dnat_id}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.RoutersApi();
let routerId = "routerId_example"; // String | ID роутера
let dnatId = "dnatId_example"; // String | ID правила
apiInstance.getDnatRule(routerId, dnatId, (error, data, response) => {
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
 **routerId** | **String**| ID роутера | 
 **dnatId** | **String**| ID правила | 

### Return type

[**DnatRuleResponse**](DnatRuleResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getNetworks

> NetworksResponse getNetworks(routerId)

Получение списка сетей роутера

Чтобы получить список сетей роутера, отправьте GET-запрос на &#x60;/api/v1/routers/{router_id}/networks&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.RoutersApi();
let routerId = "routerId_example"; // String | ID роутера
apiInstance.getNetworks(routerId, (error, data, response) => {
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
 **routerId** | **String**| ID роутера | 

### Return type

[**NetworksResponse**](NetworksResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getRouter

> RouterResponse getRouter(routerId)

Получение информации о роутере

Чтобы получить информацию о роутере, отправьте GET-запрос на &#x60;/api/v1/routers/{router_id}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.RoutersApi();
let routerId = "routerId_example"; // String | ID роутера
apiInstance.getRouter(routerId, (error, data, response) => {
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
 **routerId** | **String**| ID роутера | 

### Return type

[**RouterResponse**](RouterResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getRouterAvailableNetworks

> AvailableNetworksResponse getRouterAvailableNetworks()

Получение списка доступных сетей

Чтобы получить список локальных сетей, доступных для подключения к роутеру, отправьте GET-запрос на &#x60;/api/v1/routers/networks/available&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.RoutersApi();
apiInstance.getRouterAvailableNetworks((error, data, response) => {
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

[**AvailableNetworksResponse**](AvailableNetworksResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getRouterPresets

> RouterPresetsResponse getRouterPresets()

Получение списка тарифов роутеров

Чтобы получить список доступных тарифов роутеров, отправьте GET-запрос на &#x60;/api/v1/presets/routers&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.RoutersApi();
apiInstance.getRouterPresets((error, data, response) => {
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

[**RouterPresetsResponse**](RouterPresetsResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getRouterStatistics

> RouterStatisticsResponse getRouterStatistics(routerId, timeFrom, period, keys, opts)

Получение статистики роутера

Чтобы получить статистику роутера, отправьте GET-запрос на &#x60;/api/v1/routers/{router_id}/statistics/{time_from}/{period}/{keys}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.RoutersApi();
let routerId = "routerId_example"; // String | ID роутера
let timeFrom = "timeFrom_example"; // String | Начало периода
let period = "period_example"; // String | Период агрегации
let keys = "keys_example"; // String | Ключи метрик
let opts = {
  'nodeId': "nodeId_example" // String | ID ноды
};
apiInstance.getRouterStatistics(routerId, timeFrom, period, keys, opts, (error, data, response) => {
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
 **routerId** | **String**| ID роутера | 
 **timeFrom** | **String**| Начало периода | 
 **period** | **String**| Период агрегации | 
 **keys** | **String**| Ключи метрик | 
 **nodeId** | **String**| ID ноды | [optional] 

### Return type

[**RouterStatisticsResponse**](RouterStatisticsResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getRouters

> RoutersResponse getRouters()

Получение списка роутеров

Чтобы получить список роутеров, отправьте GET-запрос на &#x60;/api/v1/routers&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.RoutersApi();
apiInstance.getRouters((error, data, response) => {
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

[**RoutersResponse**](RoutersResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getStaticRoutes

> StaticRoutesResponse getStaticRoutes(routerId)

Получение списка статических маршрутов

Чтобы получить список статических маршрутов роутера, отправьте GET-запрос на &#x60;/api/v1/routers/{router_id}/static-routes&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.RoutersApi();
let routerId = "routerId_example"; // String | ID роутера
apiInstance.getStaticRoutes(routerId, (error, data, response) => {
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
 **routerId** | **String**| ID роутера | 

### Return type

[**StaticRoutesResponse**](StaticRoutesResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## patchNetwork

> NetworkResponse patchNetwork(routerId, networkName, networkEdit)

Обновление информации о сети

Чтобы включить или выключить DHCP в сети роутера, отправьте PATCH-запрос на &#x60;/api/v1/routers/{router_id}/networks/{network_name}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.RoutersApi();
let routerId = "routerId_example"; // String | ID роутера
let networkName = "networkName_example"; // String | Имя сети
let networkEdit = new TimewebCloudApi.NetworkEdit(); // NetworkEdit | 
apiInstance.patchNetwork(routerId, networkName, networkEdit, (error, data, response) => {
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
 **routerId** | **String**| ID роутера | 
 **networkName** | **String**| Имя сети | 
 **networkEdit** | [**NetworkEdit**](NetworkEdit.md)|  | 

### Return type

[**NetworkResponse**](NetworkResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## patchNetworks

> NetworksResponse patchNetworks(routerId, networkIn)

Обновление сетей роутера

Чтобы обновить набор сетей роутера, отправьте PATCH-запрос на &#x60;/api/v1/routers/{router_id}/networks&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.RoutersApi();
let routerId = "routerId_example"; // String | ID роутера
let networkIn = new TimewebCloudApi.NetworkIn(); // NetworkIn | 
apiInstance.patchNetworks(routerId, networkIn, (error, data, response) => {
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
 **routerId** | **String**| ID роутера | 
 **networkIn** | [**NetworkIn**](NetworkIn.md)|  | 

### Return type

[**NetworksResponse**](NetworksResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## postDnat

> DnatRuleResponse postDnat(routerId, dnatIn)

Добавление правила проброса портов

Чтобы добавить правило проброса портов (DNAT), отправьте POST-запрос на &#x60;/api/v1/routers/{router_id}/dnat-rules&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.RoutersApi();
let routerId = "routerId_example"; // String | ID роутера
let dnatIn = new TimewebCloudApi.DnatIn(); // DnatIn | 
apiInstance.postDnat(routerId, dnatIn, (error, data, response) => {
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
 **routerId** | **String**| ID роутера | 
 **dnatIn** | [**DnatIn**](DnatIn.md)|  | 

### Return type

[**DnatRuleResponse**](DnatRuleResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## postStaticRoute

> StaticRouteResponse postStaticRoute(routerId, staticRouteIn)

Добавление статического маршрута

Чтобы добавить статический маршрут, отправьте POST-запрос на &#x60;/api/v1/routers/{router_id}/static-routes&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.RoutersApi();
let routerId = "routerId_example"; // String | ID роутера
let staticRouteIn = new TimewebCloudApi.StaticRouteIn(); // StaticRouteIn | 
apiInstance.postStaticRoute(routerId, staticRouteIn, (error, data, response) => {
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
 **routerId** | **String**| ID роутера | 
 **staticRouteIn** | [**StaticRouteIn**](StaticRouteIn.md)|  | 

### Return type

[**StaticRouteResponse**](StaticRouteResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## updateRouter

> RouterResponse updateRouter(routerId, routerEdit)

Обновление информации о роутере

Чтобы обновить информацию о роутере, отправьте PATCH-запрос на &#x60;/api/v1/routers/{router_id}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.RoutersApi();
let routerId = "routerId_example"; // String | ID роутера
let routerEdit = new TimewebCloudApi.RouterEdit(); // RouterEdit | 
apiInstance.updateRouter(routerId, routerEdit, (error, data, response) => {
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
 **routerId** | **String**| ID роутера | 
 **routerEdit** | [**RouterEdit**](RouterEdit.md)|  | 

### Return type

[**RouterResponse**](RouterResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## updateRouterNat

> RouterResponse updateRouterNat(routerId, networkName, natIn)

Включение NAT для сети

Чтобы включить NAT для сети роутера, отправьте PATCH-запрос на &#x60;/api/v1/routers/{router_id}/networks/{network_name}/nat&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.RoutersApi();
let routerId = "routerId_example"; // String | ID роутера
let networkName = "networkName_example"; // String | Имя сети
let natIn = new TimewebCloudApi.NatIn(); // NatIn | 
apiInstance.updateRouterNat(routerId, networkName, natIn, (error, data, response) => {
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
 **routerId** | **String**| ID роутера | 
 **networkName** | **String**| Имя сети | 
 **natIn** | [**NatIn**](NatIn.md)|  | 

### Return type

[**RouterResponse**](RouterResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

