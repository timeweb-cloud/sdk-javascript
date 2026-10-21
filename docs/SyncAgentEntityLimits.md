# TimewebCloudApi.SyncAgentEntityLimits

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**limitType** | **String** | Период лимита | 
**limits** | [**[SyncAgentEntityLimitsLimitsInner]**](SyncAgentEntityLimitsLimitsInner.md) | Лимиты за период — по одному на модель (&#x60;model_id&#x60; не должен повторяться). Лимиты этого периода, которых нет в списке, удаляются; пустой массив удаляет все лимиты периода. | 



## Enum: LimitTypeEnum


* `hour` (value: `"hour"`)

* `day` (value: `"day"`)

* `week` (value: `"week"`)

* `month` (value: `"month"`)




