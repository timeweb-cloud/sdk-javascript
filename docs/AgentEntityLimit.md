# TimewebCloudApi.AgentEntityLimit

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **String** | ID лимита | 
**aiKeyId** | **String** | ID служебного ключа агента, на котором учитывается лимит | 
**entityType** | **String** | Тип сущности — всегда &#x60;agent&#x60; | 
**entityId** | **String** | ID агента | 
**limitType** | **String** | Период лимита | 
**modelId** | **Number** | ID модели, на запросы к которой действует лимит. &#x60;null&#x60; — лимит на все модели агента. | 
**limit** | **Number** | Лимит в токенах за период. Не действует, если задан &#x60;money_limit&#x60;. &#x60;0&#x60; — запрещены все запросы. | 
**moneyLimit** | **Number** | Лимит расходов за период в валюте аккаунта; &#x60;null&#x60; — не задан, действует &#x60;limit&#x60; | 
**usage** | **Number** | Израсходовано токенов в текущем периоде | 
**moneyUsage** | **Number** | Израсходовано денег в текущем периоде (полная стоимость запросов до бонусов) | 
**createdAt** | **Date** | Дата создания лимита | 
**expireAt** | **Date** | Окончание текущего периода — после него расход обнуляется | 



## Enum: LimitTypeEnum


* `hour` (value: `"hour"`)

* `day` (value: `"day"`)

* `week` (value: `"week"`)

* `month` (value: `"month"`)




