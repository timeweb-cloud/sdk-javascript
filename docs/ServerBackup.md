# TimewebCloudApi.ServerBackup

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** | Уникальный идентификатор бэкапа сервера. | 
**name** | **String** | Название бэкапа. | 
**comment** | **String** | Комментарий к бэкапу. | 
**createdAt** | **String** | Дата создания бэкапа. | 
**status** | **String** | Статус бэкапа. | 
**size** | **Number** | Размер бэкапа (в Мб). | 
**type** | **String** | Тип бэкапа. | 
**progress** | **Number** | Прогресс создания бэкапа. Значение будет меняться в статусе бэкапа &#x60;create&#x60; от 0 до 99, для остальных статусов всегда будет возвращаться 0. | 



## Enum: StatusEnum


* `precreate` (value: `"precreate"`)

* `delete` (value: `"delete"`)

* `shutdown` (value: `"shutdown"`)

* `recover` (value: `"recover"`)

* `create` (value: `"create"`)

* `fail` (value: `"fail"`)

* `done` (value: `"done"`)





## Enum: TypeEnum


* `manual` (value: `"manual"`)

* `auto` (value: `"auto"`)




