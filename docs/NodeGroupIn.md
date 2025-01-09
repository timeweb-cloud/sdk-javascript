# TimewebCloudApi.NodeGroupIn

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **String** | Название группы | 
**presetId** | **Number** | ID тарифа воркер-ноды. Нельзя передавать вместе с &#x60;configuration&#x60;. Локация воркер-нод должна совпадать с локацией кластера | [optional] 
**configuration** | [**NodeGroupInConfiguration**](NodeGroupInConfiguration.md) |  | [optional] 
**nodeCount** | **Number** | Количество нод в группе | 
**labels** | [**[SetLabels]**](SetLabels.md) | Лейблы для группы нод | [optional] 
**isAutoscaling** | **Boolean** | Автомасштабирование. Автоматическое увеличение и уменьшение количества нод в группе в зависимости от текущей нагрузки | [optional] 
**minSize** | **Number** | Минимальное количество нод. Передавать в связке с параметрами &#x60;is_autoscaling&#x60; и &#x60;max_size&#x60; | [optional] 
**maxSize** | **Number** | Максимальное количество нод. Передавать в связке с параметрами &#x60;is_autoscaling&#x60; и &#x60;min_size&#x60;. Максимальное количество нод ограничено тарифом кластера | [optional] 


