# TimewebCloudApi.Certificate

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** | ID сертификата. Указывается в поле &#x60;config.security.certificate_id&#x60; при привязке сертификата к ресурсу. | 
**type** | **String** | Тип сертификата. - &#x60;lets_encrypt&#x60; — сертификат, выпущенный через Let&#39;s Encrypt; - &#x60;uploaded&#x60; — сертификат, загруженный вами. | 
**cn** | **String** | Основное доменное имя сертификата. | 
**domains** | **[String]** | Все доменные имена сертификата, включая указанные в SAN. | 
**issuedAt** | **Date** | Дата выпуска сертификата. | 
**expiresAt** | **Date** | Дата окончания действия сертификата. | 



## Enum: TypeEnum


* `lets_encrypt` (value: `"lets_encrypt"`)

* `uploaded` (value: `"uploaded"`)




