# TimewebCloudApi.UpdateAutoBackup

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**isEnabled** | **Boolean** | Включено ли автобэкапирование | 
**copyCount** | **Number** | Количество копий для хранения. Минимальное количество &#x60;1&#x60;, максимальное &#x60;99&#x60;. Обязательно при &#x60;is_enabled&#x60;: &#x60;true&#x60;. | [optional] 
**creationStartAt** | **Date** | Дата начала создания первого автобэкапа. Значение в формате &#x60;ISO8601&#x60;. Время не учитывается. Обязательно при &#x60;is_enabled&#x60;: &#x60;true&#x60;. | [optional] 
**interval** | **String** | Периодичность создания автобэкапов. Обязательно при &#x60;is_enabled&#x60;: &#x60;true&#x60;. | [optional] 
**dayOfWeek** | **Number** | День недели, в который будут создаваться автобэкапы. Доступные значения от &#x60;1&#x60; до &#x60;7&#x60;. Обязательно при &#x60;is_enabled&#x60;: &#x60;true&#x60; при любой периодичности, но на расписание влияет только при значении &#x60;interval&#x60;: &#x60;week&#x60;. | [optional] 



## Enum: IntervalEnum


* `day` (value: `"day"`)

* `week` (value: `"week"`)

* `month` (value: `"month"`)




