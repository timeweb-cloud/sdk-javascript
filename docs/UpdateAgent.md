# TimewebCloudApi.UpdateAgent

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **String** | Название агента | [optional] 
**description** | **String** | Описание агента | [optional] 
**accessType** | **String** | Тип доступа | [optional] 
**status** | **String** | Статус агента: &#x60;suspended&#x60; — приостановить, &#x60;active&#x60; — возобновить. Статус заблокированного или удалённого агента изменить нельзя. | [optional] 
**settings** | [**AgentSettings**](AgentSettings.md) |  | [optional] 
**projectId** | **Number** | Не используется: перенести агента в другой проект можно методами проектов. | [optional] 
**additionalModelIds** | **[Number]** | ID дополнительных моделей агента (например, для генерации изображений). Список заменяет текущий целиком. | [optional] 
**additionalModels** | [**[AgentAdditionalModel]**](AgentAdditionalModel.md) | Дополнительные модели вместе с настройками (для моделей генерации изображений — &#x60;width&#x60;/&#x60;height&#x60;). Если переданы и &#x60;additional_models&#x60;, и &#x60;additional_model_ids&#x60;, используется &#x60;additional_models&#x60;. | [optional] 
**isWebSearchEnabled** | **Boolean** | Включить или выключить веб-поиск | [optional] 
**aiGatewayKeyId** | **String** | ID ключа AI Gateway, к которому нужно привязать агента. Привязка доступна, только если в ответе агента &#x60;ai_gateway_key_id&#x60; равен &#x60;null&#x60; (агент без баз знаний, инструментов и интеграций, созданный до 9 октября 2026 года), и делается один раз. При первой привязке на аккаунт однократно начисляется временная скидка 10% на запросы через ключи AI Gateway. | [optional] 
**tokenPackageId** | **Number** | Новый пакет токенов. Только для агентов с пакетом токенов (устаревшая схема оплаты): пакет должен относиться к модели агента и быть не меньше текущего, его стоимость сразу списывается с баланса. | [optional] 



## Enum: AccessTypeEnum


* `public` (value: `"public"`)

* `private` (value: `"private"`)





## Enum: StatusEnum


* `active` (value: `"active"`)

* `suspended` (value: `"suspended"`)




