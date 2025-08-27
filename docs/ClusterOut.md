# TimewebCloudApi.ClusterOut

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** | ID кластера | 
**name** | **String** | Название | 
**createdAt** | **Date** | Дата и время создания кластера в формате ISO8601 | 
**status** | **String** | Статус | 
**description** | **String** | Описание | 
**k8sVersion** | **String** | Версия Kubernetes | 
**networkDriver** | **String** | Используемый сетевой драйвер | 
**avatarLink** | **String** | Ссылка на аватар кластера. | 
**ingress** | **Boolean** | Логическое значение, показывающее, включен ли Ingress | 
**presetId** | **Number** | ID тарифа мастер-ноды | 
**cpu** | **Number** | Общее количество ядер | [optional] [default to 0]
**ram** | **Number** | Общее количество памяти | [optional] [default to 0]
**disk** | **Number** | Общее дисковое пространство | [optional] [default to 0]
**availabilityZone** | **String** | Зона доступности | [optional] 
**projectId** | **Number** | ID проекта | [optional] 



## Enum: NetworkDriverEnum


* `kuberouter` (value: `"kuberouter"`)

* `calico` (value: `"calico"`)

* `flannel` (value: `"flannel"`)

* `cilium` (value: `"cilium"`)





## Enum: AvailabilityZoneEnum


* `spb-3` (value: `"spb-3"`)

* `msk-1` (value: `"msk-1"`)

* `ams-1` (value: `"ams-1"`)

* `fra-1` (value: `"fra-1"`)




