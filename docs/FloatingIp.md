# TimewebCloudApi.FloatingIp

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **String** | Идентификатор IP. | 
**ip** | **String** | IP-адрес | 
**isDdosGuard** | **Boolean** | Это логическое значение, которое показывает, включена ли защита от DDoS. | 
**availabilityZone** | [**AvailabilityZone**](AvailabilityZone.md) |  | 
**resourceType** | **String** | Тип ресурса. | 
**resourceId** | **Number** | Id ресурса. | 
**comment** | **String** | Комментарий | 
**ptr** | **String** | Запись имени узла. | 



## Enum: ResourceTypeEnum


* `server` (value: `"server"`)

* `balancer` (value: `"balancer"`)

* `database` (value: `"database"`)

* `network` (value: `"network"`)




