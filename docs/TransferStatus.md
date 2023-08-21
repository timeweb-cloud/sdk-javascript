# TimewebCloudApi.TransferStatus

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**status** | **String** | Общий статус трансфера. | 
**tries** | **Number** | Количество попыток. | 
**totalCount** | **Number** | Общее количество затронутых объектов. | 
**totalSize** | **Number** | Общий размер затронутых объектов. | 
**uploadedCount** | **Number** | Количество перемещенных объектов. | 
**uploadedSize** | **Number** | Размер перемещенных объектов. | 
**errors** | [**[TransferStatusErrorsInner]**](TransferStatusErrorsInner.md) |  | 



## Enum: StatusEnum


* `started` (value: `"started"`)

* `suspended` (value: `"suspended"`)

* `failed` (value: `"failed"`)




