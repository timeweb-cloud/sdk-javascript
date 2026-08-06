# TimewebCloudApi.CertificateTask

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** | ID задачи на выпуск сертификата. | 
**status** | **String** | Статус выпуска сертификата. - &#x60;in_progress&#x60; — сертификат выпускается; - &#x60;success&#x60; — сертификат выпущен и привязан к ресурсу; - &#x60;failed&#x60; — выпустить сертификат не удалось. | 
**domains** | **[String]** | Доменные имена, для которых выпускается сертификат. | 
**resourceId** | **Number** | ID CDN-ресурса, для которого выпускается сертификат. | 



## Enum: StatusEnum


* `in_progress` (value: `"in_progress"`)

* `success` (value: `"success"`)

* `failed` (value: `"failed"`)




