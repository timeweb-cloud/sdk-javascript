# TimewebCloudApi.S3Backup

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **String** | ID резервной копии в формате UUID. | 
**name** | **String** | Название резервной копии. В текущей реализации всегда совпадает со значением &#x60;id&#x60;. | 
**status** | **String** | Статус резервной копии: &#x60;running&#x60; — копия создаётся, &#x60;success&#x60; — копия создана, &#x60;failed&#x60; — создать копию не удалось. Восстановить кластер можно только из копии со статусом &#x60;success&#x60;. | 
**size** | **Number** | Размер резервной копии в байтах. | 
**progress** | **Number** | Прогресс создания резервной копии, от 0 до 100. | 
**type** | **String** | Тип резервной копии: &#x60;manual&#x60; — копия создана вручную, &#x60;auto&#x60; — копия создана по расписанию. | 
**comment** | **String** | Комментарий к резервной копии. Если комментарий не задавался, возвращается &#x60;null&#x60;. | [optional] 
**createdAt** | **Date** | Дата и время создания резервной копии. | 



## Enum: StatusEnum


* `running` (value: `"running"`)

* `success` (value: `"success"`)

* `failed` (value: `"failed"`)





## Enum: TypeEnum


* `manual` (value: `"manual"`)

* `auto` (value: `"auto"`)




