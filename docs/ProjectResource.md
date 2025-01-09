# TimewebCloudApi.ProjectResource

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** | ID для каждого ресурса проекта. Автоматически генерируется при создании. | 
**createdAt** | **String** | Значение времени, указанное в комбинированном формате даты и времени ISO8601, которое представляет, когда был создан ресурс. | 
**resourceId** | **Number** | ID ресурса проекта (сервера, хранилища, кластера, балансировщика, базы данных или выделенного сервера). | 
**project** | [**Project**](Project.md) |  | 
**type** | **String** | Тип ресурса проекта | 



## Enum: TypeEnum


* `server` (value: `"server"`)

* `balancer` (value: `"balancer"`)

* `database` (value: `"database"`)

* `kubernetes` (value: `"kubernetes"`)

* `storage` (value: `"storage"`)

* `dedicated` (value: `"dedicated"`)




