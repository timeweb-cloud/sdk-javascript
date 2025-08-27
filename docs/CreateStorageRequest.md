# TimewebCloudApi.CreateStorageRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **String** | Название хранилища. | 
**description** | **String** | Комментарий к хранилищу. | [optional] 
**type** | **String** | Тип хранилища. | 
**presetId** | **Number** | ID тарифа. Нельзя передавать вместе с &#x60;configurator&#x60;. | [optional] 
**configurator** | [**CreateStorageRequestConfigurator**](CreateStorageRequestConfigurator.md) |  | [optional] 
**projectId** | **Number** | ID проекта. | [optional] 



## Enum: TypeEnum


* `private` (value: `"private"`)

* `public` (value: `"public"`)




