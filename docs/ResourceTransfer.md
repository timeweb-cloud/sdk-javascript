# TimewebCloudApi.ResourceTransfer

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**toProject** | **Number** | Идентификатор проекта, куда переносится ресурс. | 
**resourceId** | **Number** | Идентификатор перемещаемого ресурса (сервера, хранилища, кластера, балансировщика, базы данных или выделенного сервера). | 
**resourceType** | **String** | Тип перемещаемого ресурса. | 



## Enum: ResourceTypeEnum


* `server` (value: `"server"`)

* `balancer` (value: `"balancer"`)

* `database` (value: `"database"`)

* `kubernetes` (value: `"kubernetes"`)

* `storage` (value: `"storage"`)

* `dedicated` (value: `"dedicated"`)




