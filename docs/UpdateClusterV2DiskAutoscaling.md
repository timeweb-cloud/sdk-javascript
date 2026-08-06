# TimewebCloudApi.UpdateClusterV2DiskAutoscaling

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**isEnabled** | **Boolean** | Включить автоматическое расширение диска. | 
**stepSize** | **Number** | Шаг расширения диска (в Мб). Значение должно быть кратно 5120, минимум — 5120, максимум — 102400. | [optional] 
**thresholdPercent** | **Number** | Порог заполнения диска (в процентах), при достижении которого диск расширяется. | [optional] 



## Enum: ThresholdPercentEnum


* `80` (value: `80`)

* `90` (value: `90`)

* `95` (value: `95`)




