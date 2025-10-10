# TimewebCloudApi.CreateBalancerCertificates

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**type** | **String** | Тип сертификата. | [optional] 
**fqdn** | **String** | Полное имя домена. | [optional] 
**certData** | **String** | Данные сертификата. Нужны только для типа custom. | [optional] 
**keyData** | **String** | Данные ключа. Нужны только для типа custom. | [optional] 



## Enum: TypeEnum


* `lets_encrypt` (value: `"lets_encrypt"`)

* `custom` (value: `"custom"`)




