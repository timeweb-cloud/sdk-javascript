# TimewebCloudApi.CreateClusterMaintenanceSlot

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**type** | **String** | Режим обслуживания. | 
**from** | **String** | Начало периода обслуживания в формате &#x60;HH:mmZ&#x60; (UTC). Учитывается только при &#x60;type: fixed_time&#x60;. | [optional] 
**to** | **String** | Конец периода обслуживания в формате &#x60;HH:mmZ&#x60; (UTC). Учитывается только при &#x60;type: fixed_time&#x60;. | [optional] 



## Enum: TypeEnum


* `any_time` (value: `"any_time"`)

* `fixed_time` (value: `"fixed_time"`)




