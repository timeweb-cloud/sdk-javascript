# TimewebCloudApi.CreateDedicatedServer

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**planId** | **Number** | ID списка дополнительных услуг выделенного сервера. | 
**presetId** | **Number** | ID тарифа выделенного сервера. | 
**osId** | **Number** | ID операционной системы, которая будет установлена на выделенный сервер. | [optional] 
**cpId** | **Number** | ID панели управления, которая будет установлена на выделенный сервер. | [optional] 
**bandwidthId** | **Number** | ID интернет-канала, который будет установлен на выделенный сервер. | [optional] 
**networkDriveId** | **Number** | ID сетевого диска, который будет установлен на выделенный сервер. | [optional] 
**additionalIpAddrId** | **Number** | ID дополнительного IP-адреса, который будет установлен на выделенный сервер. | [optional] 
**paymentPeriod** | **String** | Период оплаты. | 
**name** | **String** | Удобочитаемое имя выделенного сервера. Максимальная длина — 255 символов, имя должно быть уникальным. | 
**comment** | **String** | Комментарий к выделенному серверу. Максимальная длина — 255 символов. | [optional] 



## Enum: PaymentPeriodEnum


* `P1M` (value: `"P1M"`)

* `P3M` (value: `"P3M"`)

* `P6M` (value: `"P6M"`)

* `P1Y` (value: `"P1Y"`)




