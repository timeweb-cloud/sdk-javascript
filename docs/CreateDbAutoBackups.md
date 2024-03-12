# TimewebCloudApi.CreateDbAutoBackups

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**copyCount** | **Number** | Количество копий для хранения. Минимальное количество &#x60;1&#x60;, максимальное &#x60;99&#x60; | 
**creationStartAt** | **Date** | Дата начала создания первого автобэкапа. Значение в формате &#x60;ISO8601&#x60;. Время не учитывается. | 
**interval** | **String** | Периодичность создания автобэкапов | 
**dayOfWeek** | **Number** | День недели, в который будут создаваться автобэкапы. Работает только со значением &#x60;interval&#x60;: &#x60;week&#x60;. Доступные значение от &#x60;1 &#x60;до &#x60;7&#x60;. | 



## Enum: IntervalEnum


* `day` (value: `"day"`)

* `week` (value: `"week"`)

* `month` (value: `"month"`)




