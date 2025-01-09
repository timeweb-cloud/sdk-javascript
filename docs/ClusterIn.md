# TimewebCloudApi.ClusterIn

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **String** | Название кластера | 
**description** | **String** | Описание кластера | [optional] 
**k8sVersion** | **String** | Версия Kubernetes | 
**availabilityZone** | **String** | Зона доступности | [optional] 
**networkDriver** | **String** | Тип используемого сетевого драйвера в кластере | 
**isIngress** | **Boolean** | Логическое значение, которое показывает, использовать ли Ingress в кластере | [optional] 
**isK8sDashboard** | **Boolean** | Логическое значение, которое показывает, использовать ли Kubernetes Dashboard в кластере | [optional] 
**presetId** | **Number** | ID тарифа мастер-ноды | 
**workerGroups** | [**[NodeGroupIn]**](NodeGroupIn.md) | Группы воркеров в кластере | [optional] 
**networkId** | **String** | ID приватной сети | [optional] 
**projectId** | **Number** | ID проекта | [optional] 



## Enum: AvailabilityZoneEnum


* `spb-3` (value: `"spb-3"`)

* `msk-1` (value: `"msk-1"`)

* `ams-1` (value: `"ams-1"`)





## Enum: NetworkDriverEnum


* `kuberouter` (value: `"kuberouter"`)

* `calico` (value: `"calico"`)

* `flannel` (value: `"flannel"`)

* `cilium` (value: `"cilium"`)




