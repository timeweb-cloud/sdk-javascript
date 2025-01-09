# TimewebCloudApi.S3Subdomain

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** | ID поддомена. | 
**subdomain** | **String** | Поддомен. | 
**certReleased** | **Date** | Значение времени, указанное в комбинированном формате даты и времени ISO8601, которое представляет, когда был выдан SSL сертификат. | 
**tries** | **Number** | Количество попыток перевыпустить SSL сертификат. | 
**status** | **String** | Поддомен. | 



## Enum: StatusEnum


* `released` (value: `"ssl_released"`)

* `not_requested` (value: `"ssl_not_requested"`)

* `re_release_error` (value: `"ssl_re_release_error"`)




