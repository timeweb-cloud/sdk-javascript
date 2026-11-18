# TimewebCloudApi.ConfigSecurity

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**redirect** | **Boolean** | Перенаправлять запросы с HTTP на HTTPS. | [optional] 
**certificateId** | **Number** | ID SSL-сертификата, который используется для доменов ресурса. &#x60;null&#x60; — отвязать сертификат. | [optional] 
**sslProtocols** | **[String]** | Версии SSL/TLS, по которым CDN принимает HTTPS-подключения. &#x60;null&#x60; — принимать все версии. | [optional] 
**secureToken** | [**ConfigSecuritySecureToken**](ConfigSecuritySecureToken.md) |  | [optional] 



## Enum: [SslProtocolsEnum]


* `TLSv1` (value: `"TLSv1"`)

* `TLSv1.1` (value: `"TLSv1.1"`)

* `TLSv1.2` (value: `"TLSv1.2"`)

* `TLSv1.3` (value: `"TLSv1.3"`)

* `SSLv3` (value: `"SSLv3"`)




