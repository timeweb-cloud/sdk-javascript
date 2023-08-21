# TimewebCloudApi.Backup

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** | Идентификатор резервной копии. | 
**name** | **String** | Название резервной копии. | 
**comment** | **String** | Комментарий. | 
**createdAt** | **Date** | Дата создания. | 
**status** | **String** | Статус бэкапа. | 
**size** | **Number** | Размер резервной копии (Мб). | 
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




