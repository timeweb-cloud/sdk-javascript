# TimewebCloudApi.KubernetesApi

All URIs are relative to *https://api.timeweb.cloud*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createCluster**](KubernetesApi.md#createCluster) | **POST** /api/v1/k8s/clusters | Создание кластера
[**createClusterNodeGroup**](KubernetesApi.md#createClusterNodeGroup) | **POST** /api/v1/k8s/clusters/{cluster_id}/groups | Создание группы нод
[**deleteCluster**](KubernetesApi.md#deleteCluster) | **DELETE** /api/v1/k8s/clusters/{cluster_id} | Удаление кластера
[**deleteClusterNode**](KubernetesApi.md#deleteClusterNode) | **DELETE** /api/v1/k8s/clusters/{cluster_id}/nodes/{node_id} | Удаление ноды
[**deleteClusterNodeGroup**](KubernetesApi.md#deleteClusterNodeGroup) | **DELETE** /api/v1/k8s/clusters/{cluster_id}/groups/{group_id} | Удаление группы нод
[**getCluster**](KubernetesApi.md#getCluster) | **GET** /api/v1/k8s/clusters/{cluster_id} | Получение информации о кластере
[**getClusterKubeconfig**](KubernetesApi.md#getClusterKubeconfig) | **GET** /api/v1/k8s/clusters/{cluster_id}/kubeconfig | Получение файла kubeconfig
[**getClusterNodeGroup**](KubernetesApi.md#getClusterNodeGroup) | **GET** /api/v1/k8s/clusters/{cluster_id}/groups/{group_id} | Получение информации о группе нод
[**getClusterNodeGroups**](KubernetesApi.md#getClusterNodeGroups) | **GET** /api/v1/k8s/clusters/{cluster_id}/groups | Получение групп нод кластера
[**getClusterNodes**](KubernetesApi.md#getClusterNodes) | **GET** /api/v1/k8s/clusters/{cluster_id}/nodes | Получение списка нод
[**getClusterNodesFromGroup**](KubernetesApi.md#getClusterNodesFromGroup) | **GET** /api/v1/k8s/clusters/{cluster_id}/groups/{group_id}/nodes | Получение списка нод, принадлежащих группе
[**getClusterResources**](KubernetesApi.md#getClusterResources) | **GET** /api/v1/k8s/clusters/{cluster_id}/resources | Получение ресурсов кластера
[**getClusters**](KubernetesApi.md#getClusters) | **GET** /api/v1/k8s/clusters | Получение списка кластеров
[**getK8SNetworkDrivers**](KubernetesApi.md#getK8SNetworkDrivers) | **GET** /api/v1/k8s/network_drivers | Получение списка сетевых драйверов k8s
[**getK8SVersions**](KubernetesApi.md#getK8SVersions) | **GET** /api/v1/k8s/k8s_versions | Получение списка версий k8s
[**getKubernetesPresets**](KubernetesApi.md#getKubernetesPresets) | **GET** /api/v1/presets/k8s | Получение списка тарифов
[**increaseCountOfNodesInGroup**](KubernetesApi.md#increaseCountOfNodesInGroup) | **POST** /api/v1/k8s/clusters/{cluster_id}/groups/{group_id}/nodes | Увеличение количества нод в группе на указанное количество
[**reduceCountOfNodesInGroup**](KubernetesApi.md#reduceCountOfNodesInGroup) | **DELETE** /api/v1/k8s/clusters/{cluster_id}/groups/{group_id}/nodes | Уменьшение количества нод в группе на указанное количество
[**updateCluster**](KubernetesApi.md#updateCluster) | **PATCH** /api/v1/k8s/clusters/{cluster_id} | Обновление информации о кластере



## createCluster

> ClusterResponse createCluster(clusterIn)

Создание кластера

Чтобы создать кластер, отправьте POST-запрос на &#x60;/api/v1/k8s/clusters&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.KubernetesApi();
let clusterIn = new TimewebCloudApi.ClusterIn(); // ClusterIn | 
apiInstance.createCluster(clusterIn, (error, data, response) => {
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
 **clusterIn** | [**ClusterIn**](ClusterIn.md)|  | 

### Return type

[**ClusterResponse**](ClusterResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## createClusterNodeGroup

> NodeGroupResponse createClusterNodeGroup(clusterId, nodeGroupIn)

Создание группы нод

Чтобы создать группу нод кластера, отправьте POST-запрос в &#x60;/api/v1/k8s/clusters/{cluster_id}/groups&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.KubernetesApi();
let clusterId = 56; // Number | Уникальный идентификатор кластера
let nodeGroupIn = new TimewebCloudApi.NodeGroupIn(); // NodeGroupIn | 
apiInstance.createClusterNodeGroup(clusterId, nodeGroupIn, (error, data, response) => {
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
 **clusterId** | **Number**| Уникальный идентификатор кластера | 
 **nodeGroupIn** | [**NodeGroupIn**](NodeGroupIn.md)|  | 

### Return type

[**NodeGroupResponse**](NodeGroupResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deleteCluster

> DeleteCluster200Response deleteCluster(clusterId, opts)

Удаление кластера

Чтобы удалить кластер, отправьте DELETE-запрос в &#x60;/api/v1/k8s/clusters/{cluster_id}&#x60;

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.KubernetesApi();
let clusterId = 56; // Number | Уникальный идентификатор кластера
let opts = {
  'hash': 15095f25-aac3-4d60-a788-96cb5136f186, // String | Хеш, который совместно с кодом авторизации надо отправить для удаления, если включено подтверждение удаления сервисов через Телеграм.
  'code': 0000 // String | Код подтверждения, который придет к вам в Телеграм, после запроса удаления, если включено подтверждение удаления сервисов.  При помощи API токена сервисы можно удалять без подтверждения, если параметр токена `is_able_to_delete` установлен в значение `true`
};
apiInstance.deleteCluster(clusterId, opts, (error, data, response) => {
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
 **clusterId** | **Number**| Уникальный идентификатор кластера | 
 **hash** | **String**| Хеш, который совместно с кодом авторизации надо отправить для удаления, если включено подтверждение удаления сервисов через Телеграм. | [optional] 
 **code** | **String**| Код подтверждения, который придет к вам в Телеграм, после запроса удаления, если включено подтверждение удаления сервисов.  При помощи API токена сервисы можно удалять без подтверждения, если параметр токена &#x60;is_able_to_delete&#x60; установлен в значение &#x60;true&#x60; | [optional] 

### Return type

[**DeleteCluster200Response**](DeleteCluster200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## deleteClusterNode

> deleteClusterNode(clusterId, nodeId)

Удаление ноды

Чтобы удалить ноду, отправьте DELETE-запрос в &#x60;/api/v1/k8s/clusters/{cluster_id}/nodes/{node_id}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.KubernetesApi();
let clusterId = 56; // Number | Уникальный идентификатор кластера
let nodeId = 56; // Number | Уникальный идентификатор группы нод
apiInstance.deleteClusterNode(clusterId, nodeId, (error, data, response) => {
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
 **clusterId** | **Number**| Уникальный идентификатор кластера | 
 **nodeId** | **Number**| Уникальный идентификатор группы нод | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## deleteClusterNodeGroup

> deleteClusterNodeGroup(clusterId, groupId)

Удаление группы нод

Чтобы удалить группу нод, отправьте DELETE-запрос в &#x60;/api/v1/k8s/clusters/{cluster_id}/groups/{group_id}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.KubernetesApi();
let clusterId = 56; // Number | Уникальный идентификатор кластера
let groupId = 56; // Number | Уникальный идентификатор группы
apiInstance.deleteClusterNodeGroup(clusterId, groupId, (error, data, response) => {
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
 **clusterId** | **Number**| Уникальный идентификатор кластера | 
 **groupId** | **Number**| Уникальный идентификатор группы | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getCluster

> ClusterResponse getCluster(clusterId)

Получение информации о кластере

Чтобы получить информацию о кластере, отправьте GET-запрос в &#x60;/api/v1/k8s/clusters/{cluster_id}&#x60;

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.KubernetesApi();
let clusterId = 56; // Number | Уникальный идентификатор кластера
apiInstance.getCluster(clusterId, (error, data, response) => {
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
 **clusterId** | **Number**| Уникальный идентификатор кластера | 

### Return type

[**ClusterResponse**](ClusterResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getClusterKubeconfig

> String getClusterKubeconfig(clusterId)

Получение файла kubeconfig

Чтобы получить файл kubeconfig, отправьте GET-запрос в &#x60;/api/v1/k8s/clusters/{cluster_id}/kubeconfig&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.KubernetesApi();
let clusterId = 56; // Number | Уникальный идентификатор кластера
apiInstance.getClusterKubeconfig(clusterId, (error, data, response) => {
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
 **clusterId** | **Number**| Уникальный идентификатор кластера | 

### Return type

**String**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/yaml, application/json


## getClusterNodeGroup

> NodeGroupResponse getClusterNodeGroup(clusterId, groupId)

Получение информации о группе нод

Чтобы получить информацию о группе нод, отправьте GET-запрос в &#x60;/api/v1/k8s/clusters/{cluster_id}/groups/{group_id}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.KubernetesApi();
let clusterId = 56; // Number | Уникальный идентификатор кластера
let groupId = 56; // Number | Уникальный идентификатор группы
apiInstance.getClusterNodeGroup(clusterId, groupId, (error, data, response) => {
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
 **clusterId** | **Number**| Уникальный идентификатор кластера | 
 **groupId** | **Number**| Уникальный идентификатор группы | 

### Return type

[**NodeGroupResponse**](NodeGroupResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getClusterNodeGroups

> NodeGroupsResponse getClusterNodeGroups(clusterId)

Получение групп нод кластера

Чтобы получить группы нод кластера, отправьте GET-запрос в &#x60;/api/v1/k8s/clusters/{cluster_id}/groups&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.KubernetesApi();
let clusterId = 56; // Number | Уникальный идентификатор кластера
apiInstance.getClusterNodeGroups(clusterId, (error, data, response) => {
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
 **clusterId** | **Number**| Уникальный идентификатор кластера | 

### Return type

[**NodeGroupsResponse**](NodeGroupsResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getClusterNodes

> NodesResponse getClusterNodes(clusterId)

Получение списка нод

Чтобы получить список нод, отправьте GET-запрос в &#x60;/api/v1/k8s/clusters/{cluster_id}/nodes&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.KubernetesApi();
let clusterId = 56; // Number | Уникальный идентификатор кластера
apiInstance.getClusterNodes(clusterId, (error, data, response) => {
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
 **clusterId** | **Number**| Уникальный идентификатор кластера | 

### Return type

[**NodesResponse**](NodesResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getClusterNodesFromGroup

> NodesResponse getClusterNodesFromGroup(clusterId, groupId, opts)

Получение списка нод, принадлежащих группе

Чтобы получить список нод принадлежащих группе, отправьте GET-запрос в &#x60;/api/v1/k8s/clusters/{cluster_id}/groups/{group_id}/nodes&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.KubernetesApi();
let clusterId = 56; // Number | Уникальный идентификатор кластера
let groupId = 56; // Number | Уникальный идентификатор группы
let opts = {
  'limit': 100, // Number | Обозначает количество записей, которое необходимо вернуть.
  'offset': 0 // Number | Указывает на смещение, относительно начала списка.
};
apiInstance.getClusterNodesFromGroup(clusterId, groupId, opts, (error, data, response) => {
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
 **clusterId** | **Number**| Уникальный идентификатор кластера | 
 **groupId** | **Number**| Уникальный идентификатор группы | 
 **limit** | **Number**| Обозначает количество записей, которое необходимо вернуть. | [optional] [default to 100]
 **offset** | **Number**| Указывает на смещение, относительно начала списка. | [optional] [default to 0]

### Return type

[**NodesResponse**](NodesResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getClusterResources

> ResourcesResponse getClusterResources(clusterId)

Получение ресурсов кластера

Чтобы получить ресурсы кластера, отправьте GET-запрос в &#x60;/api/v1/k8s/clusters/{cluster_id}/resources&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.KubernetesApi();
let clusterId = 56; // Number | Уникальный идентификатор кластера
apiInstance.getClusterResources(clusterId, (error, data, response) => {
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
 **clusterId** | **Number**| Уникальный идентификатор кластера | 

### Return type

[**ResourcesResponse**](ResourcesResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getClusters

> ClustersResponse getClusters(opts)

Получение списка кластеров

Чтобы получить список кластеров, отправьте GET-запрос на &#x60;/api/v1/k8s/clusters&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.KubernetesApi();
let opts = {
  'limit': 100, // Number | Обозначает количество записей, которое необходимо вернуть.
  'offset': 0 // Number | Указывает на смещение относительно начала списка.
};
apiInstance.getClusters(opts, (error, data, response) => {
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

[**ClustersResponse**](ClustersResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getK8SNetworkDrivers

> NetworkDriversResponse getK8SNetworkDrivers()

Получение списка сетевых драйверов k8s

Чтобы получить список сетевых драйверов k8s, отправьте GET-запрос в &#x60;/api/v1/k8s/network_drivers&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.KubernetesApi();
apiInstance.getK8SNetworkDrivers((error, data, response) => {
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

[**NetworkDriversResponse**](NetworkDriversResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getK8SVersions

> K8SVersionsResponse getK8SVersions()

Получение списка версий k8s

Чтобы получить список версий k8s, отправьте GET-запрос в &#x60;/api/v1/k8s/k8s_versions&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.KubernetesApi();
apiInstance.getK8SVersions((error, data, response) => {
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

[**K8SVersionsResponse**](K8SVersionsResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getKubernetesPresets

> PresetsResponse getKubernetesPresets()

Получение списка тарифов

Чтобы получить список тарифов, отправьте GET-запрос в &#x60;/api/v1/presets/k8s&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.KubernetesApi();
apiInstance.getKubernetesPresets((error, data, response) => {
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

[**PresetsResponse**](PresetsResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## increaseCountOfNodesInGroup

> NodesResponse increaseCountOfNodesInGroup(clusterId, groupId, nodeCount)

Увеличение количества нод в группе на указанное количество

Чтобы увеличить количество нод в группе на указанное значение, отправьте POST-запрос на &#x60;/api/v1/k8s/clusters/{cluster_id}/groups/{group_id}/nodes&#x60;

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.KubernetesApi();
let clusterId = 56; // Number | Уникальный идентификатор кластера
let groupId = 56; // Number | Уникальный идентификатор группы
let nodeCount = new TimewebCloudApi.NodeCount(); // NodeCount | 
apiInstance.increaseCountOfNodesInGroup(clusterId, groupId, nodeCount, (error, data, response) => {
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
 **clusterId** | **Number**| Уникальный идентификатор кластера | 
 **groupId** | **Number**| Уникальный идентификатор группы | 
 **nodeCount** | [**NodeCount**](NodeCount.md)|  | 

### Return type

[**NodesResponse**](NodesResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## reduceCountOfNodesInGroup

> reduceCountOfNodesInGroup(clusterId, groupId, nodeCount)

Уменьшение количества нод в группе на указанное количество

Чтобы уменьшить количество нод в группе на указанное значение, отправьте DELETE-запрос в &#x60;/api/v1/k8s/clusters/{cluster_id}/groups/{group_id}/nodes&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.KubernetesApi();
let clusterId = 56; // Number | Уникальный идентификатор кластера
let groupId = 56; // Number | Уникальный идентификатор группы
let nodeCount = new TimewebCloudApi.NodeCount(); // NodeCount | 
apiInstance.reduceCountOfNodesInGroup(clusterId, groupId, nodeCount, (error, data, response) => {
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
 **clusterId** | **Number**| Уникальный идентификатор кластера | 
 **groupId** | **Number**| Уникальный идентификатор группы | 
 **nodeCount** | [**NodeCount**](NodeCount.md)|  | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## updateCluster

> ClusterResponse updateCluster(clusterId, clusterEdit)

Обновление информации о кластере

Чтобы обновить информацию о кластере, отправьте PATCH-запрос в &#x60;/api/v1/k8s/clusters/{cluster_id}&#x60;

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.KubernetesApi();
let clusterId = 56; // Number | Уникальный идентификатор кластера
let clusterEdit = new TimewebCloudApi.ClusterEdit(); // ClusterEdit | 
apiInstance.updateCluster(clusterId, clusterEdit, (error, data, response) => {
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
 **clusterId** | **Number**| Уникальный идентификатор кластера | 
 **clusterEdit** | [**ClusterEdit**](ClusterEdit.md)|  | 

### Return type

[**ClusterResponse**](ClusterResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

