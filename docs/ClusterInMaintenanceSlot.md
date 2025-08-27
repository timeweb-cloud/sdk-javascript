# TimewebCloudApi.ClusterInMaintenanceSlot

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**type** | **String** | В любое время или в заданное время. При значении &#x60;fixed_time&#x60; поля &#x60;from&#x60; и &#x60;to&#x60; являются обязательными. Минимально допустимый временной интервал — 3 часа. Время задается в часовом поясе UTC. | 
**from** | **String** | Интервал времени с. Время должно быть в формате HH:MM (24 часа) | [optional] 
**to** | **String** | Интервал времени до. Время должно быть в формате HH:MM (24 часа) | [optional] 



## Enum: TypeEnum


* `any_time` (value: `"any_time"`)

* `fixed_time` (value: `"fixed_time"`)




