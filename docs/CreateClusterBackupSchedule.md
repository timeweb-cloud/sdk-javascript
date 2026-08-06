# TimewebCloudApi.CreateClusterBackupSchedule

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**copyCount** | **Number** | Количество хранимых резервных копий. | [optional] 
**interval** | **String** | Периодичность создания резервных копий. | [optional] 
**dayOfWeek** | **Number** | День недели (от 1 до 7) для создания резервной копии. Учитывается только при &#x60;interval: week&#x60;. | [optional] 
**dayOfMonth** | **Number** | День месяца (от 1 до 28) для создания резервной копии. Учитывается только при &#x60;interval: month&#x60;. | [optional] 



## Enum: IntervalEnum


* `day` (value: `"day"`)

* `week` (value: `"week"`)

* `month` (value: `"month"`)




