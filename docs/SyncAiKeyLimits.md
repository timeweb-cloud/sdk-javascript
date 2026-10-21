# TimewebCloudApi.SyncAiKeyLimits

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**limits** | [**[SyncAiKeyLimitsLimitsInner]**](SyncAiKeyLimitsLimitsInner.md) | Лимиты по моделям. &#x60;model_id&#x60; в списке не должны повторяться. Пустой список удаляет все лимиты периода | 
**limitType** | **String** | Период лимита: &#x60;hour&#x60; — час, &#x60;day&#x60; — сутки, &#x60;week&#x60; — 7 дней, &#x60;month&#x60; — 30 дней | 
**entityType** | **String** | Тип сущности. По умолчанию — тип ключа (лимиты на сам ключ) | [optional] 
**entityId** | **String** | ID сущности. Для лимитов на сам ключ не нужен | [optional] 



## Enum: LimitTypeEnum


* `hour` (value: `"hour"`)

* `day` (value: `"day"`)

* `week` (value: `"week"`)

* `month` (value: `"month"`)




