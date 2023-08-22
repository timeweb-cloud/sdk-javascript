# TimewebCloudApi.FirewallApi

All URIs are relative to *https://api.timeweb.cloud*

Method | HTTP request | Description
------------- | ------------- | -------------
[**addResourceToGroup**](FirewallApi.md#addResourceToGroup) | **POST** /api/v1/firewall/groups/{group_id}/resources/{resource_id} | Линковка ресурса в firewall group
[**createGroup**](FirewallApi.md#createGroup) | **POST** /api/v1/firewall/groups | Создание группы правил
[**createGroupRule**](FirewallApi.md#createGroupRule) | **POST** /api/v1/firewall/groups/{group_id}/rules | Создание firewall правила
[**deleteGroup**](FirewallApi.md#deleteGroup) | **DELETE** /api/v1/firewall/groups/{group_id} | Удаление группы правил
[**deleteGroupRule**](FirewallApi.md#deleteGroupRule) | **DELETE** /api/v1/firewall/groups/{group_id}/rules/{rule_id} | Удаление firewall правила
[**deleteResourceFromGroup**](FirewallApi.md#deleteResourceFromGroup) | **DELETE** /api/v1/firewall/groups/{group_id}/resources/{resource_id} | Отлинковка ресурса из firewall group
[**getGroup**](FirewallApi.md#getGroup) | **GET** /api/v1/firewall/groups/{group_id} | Получение информации о группе правил
[**getGroupResources**](FirewallApi.md#getGroupResources) | **GET** /api/v1/firewall/groups/{group_id}/resources | Получение слинкованных ресурсов
[**getGroupRule**](FirewallApi.md#getGroupRule) | **GET** /api/v1/firewall/groups/{group_id}/rules/{rule_id} | Получение информации о правиле
[**getGroupRules**](FirewallApi.md#getGroupRules) | **GET** /api/v1/firewall/groups/{group_id}/rules | Получение списка правил
[**getGroups**](FirewallApi.md#getGroups) | **GET** /api/v1/firewall/groups | Получение групп правил
[**getRulesForResource**](FirewallApi.md#getRulesForResource) | **GET** /api/v1/firewall/service/{resource_type}/{resource_id} | Получение групп правил для ресурса
[**updateGroup**](FirewallApi.md#updateGroup) | **PATCH** /api/v1/firewall/groups/{group_id} | Обновление группы правил
[**updateGroupRule**](FirewallApi.md#updateGroupRule) | **PATCH** /api/v1/firewall/groups/{group_id}/rules/{rule_id} | Обновление firewall правила



## addResourceToGroup

> FirewallGroupResourceOutResponse addResourceToGroup(groupId, resourceId, opts)

Линковка ресурса в firewall group

Чтобы слинковать ресурс с группой правил, отправьте POST запрос на &#x60;/api/v1/firewall/groups/{group_id}/resources/{resource_id}&#x60;

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.FirewallApi();
let groupId = "groupId_example"; // String | Идентификатор группы правил
let resourceId = "resourceId_example"; // String | Идентификатор ресурса
let opts = {
  'resourceType': new TimewebCloudApi.ResourceType() // ResourceType | 
};
apiInstance.addResourceToGroup(groupId, resourceId, opts, (error, data, response) => {
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
 **groupId** | **String**| Идентификатор группы правил | 
 **resourceId** | **String**| Идентификатор ресурса | 
 **resourceType** | [**ResourceType**](.md)|  | [optional] 

### Return type

[**FirewallGroupResourceOutResponse**](FirewallGroupResourceOutResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## createGroup

> FirewallGroupOutResponse createGroup(firewallGroupInAPI)

Создание группы правил

Чтобы создать группу правил, отправьте POST запрос на &#x60;/api/v1/firewall/groups&#x60;

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.FirewallApi();
let firewallGroupInAPI = new TimewebCloudApi.FirewallGroupInAPI(); // FirewallGroupInAPI | 
apiInstance.createGroup(firewallGroupInAPI, (error, data, response) => {
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
 **firewallGroupInAPI** | [**FirewallGroupInAPI**](FirewallGroupInAPI.md)|  | 

### Return type

[**FirewallGroupOutResponse**](FirewallGroupOutResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## createGroupRule

> FirewallRuleOutResponse createGroupRule(groupId, firewallRuleInAPI)

Создание firewall правила

Чтобы создать правило в группе, отправьте POST запрос на &#x60;/api/v1/firewall/groups/{group_id}/rules&#x60;

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.FirewallApi();
let groupId = "groupId_example"; // String | Идентификатор группы правил
let firewallRuleInAPI = new TimewebCloudApi.FirewallRuleInAPI(); // FirewallRuleInAPI | 
apiInstance.createGroupRule(groupId, firewallRuleInAPI, (error, data, response) => {
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
 **groupId** | **String**| Идентификатор группы правил | 
 **firewallRuleInAPI** | [**FirewallRuleInAPI**](FirewallRuleInAPI.md)|  | 

### Return type

[**FirewallRuleOutResponse**](FirewallRuleOutResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deleteGroup

> deleteGroup(groupId)

Удаление группы правил

Чтобы удалить группу правил, отправьте DELETE запрос на &#x60;/api/v1/firewall/groups/{group_id}&#x60;

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.FirewallApi();
let groupId = "groupId_example"; // String | Идентификатор группы правил
apiInstance.deleteGroup(groupId, (error, data, response) => {
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
 **groupId** | **String**| Идентификатор группы правил | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## deleteGroupRule

> deleteGroupRule(groupId, ruleId)

Удаление firewall правила

Чтобы удалить правило, отправьте DELETE запрос на &#x60;/api/v1/firewall/groups/{group_id}/rules/{rule_id}&#x60;

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.FirewallApi();
let groupId = "groupId_example"; // String | Идентификатор группы правил
let ruleId = "ruleId_example"; // String | Идентификатор правила
apiInstance.deleteGroupRule(groupId, ruleId, (error, data, response) => {
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
 **groupId** | **String**| Идентификатор группы правил | 
 **ruleId** | **String**| Идентификатор правила | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## deleteResourceFromGroup

> deleteResourceFromGroup(groupId, resourceId, opts)

Отлинковка ресурса из firewall group

Чтобы отлинковать ресурс от группы правил, отправьте DELETE запрос на &#x60;/api/v1/firewall/groups/{group_id}/resources/{resource_id}&#x60;

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.FirewallApi();
let groupId = "groupId_example"; // String | Идентификатор группы правил
let resourceId = "resourceId_example"; // String | Идентификатор ресурса
let opts = {
  'resourceType': new TimewebCloudApi.ResourceType() // ResourceType | 
};
apiInstance.deleteResourceFromGroup(groupId, resourceId, opts, (error, data, response) => {
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
 **groupId** | **String**| Идентификатор группы правил | 
 **resourceId** | **String**| Идентификатор ресурса | 
 **resourceType** | [**ResourceType**](.md)|  | [optional] 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getGroup

> FirewallGroupOutResponse getGroup(groupId)

Получение информации о группе правил

Чтобы получить информацию о группе правил, отправьте GET запрос на &#x60;/api/v1/firewall/groups/{group_id}&#x60;

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.FirewallApi();
let groupId = "groupId_example"; // String | Идентификатор группы правил
apiInstance.getGroup(groupId, (error, data, response) => {
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
 **groupId** | **String**| Идентификатор группы правил | 

### Return type

[**FirewallGroupOutResponse**](FirewallGroupOutResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getGroupResources

> FirewallGroupResourcesOutResponse getGroupResources(groupId, opts)

Получение слинкованных ресурсов

Чтобы получить слинкованных ресурсов для группы правил, отправьте GET запрос на &#x60;/api/v1/firewall/groups/{group_id}/resources&#x60;

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.FirewallApi();
let groupId = "groupId_example"; // String | Идентификатор группы правил
let opts = {
  'limit': 100, // Number | Обозначает количество записей, которое необходимо вернуть.
  'offset': 0 // Number | Указывает на смещение относительно начала списка.
};
apiInstance.getGroupResources(groupId, opts, (error, data, response) => {
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
 **groupId** | **String**| Идентификатор группы правил | 
 **limit** | **Number**| Обозначает количество записей, которое необходимо вернуть. | [optional] [default to 100]
 **offset** | **Number**| Указывает на смещение относительно начала списка. | [optional] [default to 0]

### Return type

[**FirewallGroupResourcesOutResponse**](FirewallGroupResourcesOutResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getGroupRule

> FirewallRuleOutResponse getGroupRule(ruleId, groupId)

Получение информации о правиле

Чтобы получить инфомрацию о правиле, отправьте GET запрос на &#x60;/api/v1/firewall/groups/{group_id}/rules/{rule_id}&#x60;

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.FirewallApi();
let ruleId = "ruleId_example"; // String | Идентификатор правила
let groupId = "groupId_example"; // String | Идентификатор группы правил
apiInstance.getGroupRule(ruleId, groupId, (error, data, response) => {
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
 **ruleId** | **String**| Идентификатор правила | 
 **groupId** | **String**| Идентификатор группы правил | 

### Return type

[**FirewallRuleOutResponse**](FirewallRuleOutResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getGroupRules

> FirewallRulesOutResponse getGroupRules(groupId, opts)

Получение списка правил

Чтобы получить список правил в группе, отправьте GET запрос на &#x60;/api/v1/firewall/groups/{group_id}/rules&#x60;

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.FirewallApi();
let groupId = "groupId_example"; // String | Идентификатор группы правил
let opts = {
  'limit': 100, // Number | Обозначает количество записей, которое необходимо вернуть.
  'offset': 0 // Number | Указывает на смещение относительно начала списка.
};
apiInstance.getGroupRules(groupId, opts, (error, data, response) => {
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
 **groupId** | **String**| Идентификатор группы правил | 
 **limit** | **Number**| Обозначает количество записей, которое необходимо вернуть. | [optional] [default to 100]
 **offset** | **Number**| Указывает на смещение относительно начала списка. | [optional] [default to 0]

### Return type

[**FirewallRulesOutResponse**](FirewallRulesOutResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getGroups

> FirewallGroupsOutResponse getGroups(opts)

Получение групп правил

Чтобы получить групп правил для аккаунта, отправьте GET запрос на &#x60;/api/v1/firewall/groups&#x60;

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.FirewallApi();
let opts = {
  'limit': 100, // Number | Обозначает количество записей, которое необходимо вернуть.
  'offset': 0 // Number | Указывает на смещение относительно начала списка.
};
apiInstance.getGroups(opts, (error, data, response) => {
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

[**FirewallGroupsOutResponse**](FirewallGroupsOutResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getRulesForResource

> FirewallGroupsOutResponse getRulesForResource(resourceId, resourceType, opts)

Получение групп правил для ресурса

Чтобы получить список групп правил, с которыми слинкован ресурс, отправьте GET запрос на &#x60;/api/v1/firewall/service/{resource_type}/{resource_id}&#x60;

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.FirewallApi();
let resourceId = "resourceId_example"; // String | Идентификатор ресурса
let resourceType = new TimewebCloudApi.ResourceType(); // ResourceType | 
let opts = {
  'limit': 100, // Number | Обозначает количество записей, которое необходимо вернуть.
  'offset': 0 // Number | Указывает на смещение относительно начала списка.
};
apiInstance.getRulesForResource(resourceId, resourceType, opts, (error, data, response) => {
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
 **resourceId** | **String**| Идентификатор ресурса | 
 **resourceType** | [**ResourceType**](.md)|  | 
 **limit** | **Number**| Обозначает количество записей, которое необходимо вернуть. | [optional] [default to 100]
 **offset** | **Number**| Указывает на смещение относительно начала списка. | [optional] [default to 0]

### Return type

[**FirewallGroupsOutResponse**](FirewallGroupsOutResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## updateGroup

> FirewallGroupOutResponse updateGroup(groupId, firewallGroupInAPI)

Обновление группы правил

Чтобы изменить группу правил, отправьте PATCH запрос на &#x60;/api/v1/firewall/groups/{group_id}&#x60;

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.FirewallApi();
let groupId = "groupId_example"; // String | Идентификатор группы правил
let firewallGroupInAPI = new TimewebCloudApi.FirewallGroupInAPI(); // FirewallGroupInAPI | 
apiInstance.updateGroup(groupId, firewallGroupInAPI, (error, data, response) => {
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
 **groupId** | **String**| Идентификатор группы правил | 
 **firewallGroupInAPI** | [**FirewallGroupInAPI**](FirewallGroupInAPI.md)|  | 

### Return type

[**FirewallGroupOutResponse**](FirewallGroupOutResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## updateGroupRule

> FirewallRuleOutResponse updateGroupRule(groupId, ruleId, firewallRuleInAPI)

Обновление firewall правила

Чтобы изменить правило, отправьте PATCH запрос на &#x60;/api/v1/firewall/groups/{group_id}/rules/{rule_id}&#x60;

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.FirewallApi();
let groupId = "groupId_example"; // String | Идентификатор группы правил
let ruleId = "ruleId_example"; // String | Идентификатор правила
let firewallRuleInAPI = new TimewebCloudApi.FirewallRuleInAPI(); // FirewallRuleInAPI | 
apiInstance.updateGroupRule(groupId, ruleId, firewallRuleInAPI, (error, data, response) => {
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
 **groupId** | **String**| Идентификатор группы правил | 
 **ruleId** | **String**| Идентификатор правила | 
 **firewallRuleInAPI** | [**FirewallRuleInAPI**](FirewallRuleInAPI.md)|  | 

### Return type

[**FirewallRuleOutResponse**](FirewallRuleOutResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

