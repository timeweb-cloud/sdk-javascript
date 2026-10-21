# TimewebCloudApi.CreateAgentV2

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **String** | Название агента | 
**description** | **String** | Описание агента | [optional] 
**accessType** | **String** | Тип доступа: &#x60;public&#x60; — агент отвечает анонимным посетителям сайта через виджет; &#x60;private&#x60; — только по токену аккаунта. | 
**modelId** | **Number** | ID основной модели агента | 
**settings** | [**AgentSettings**](AgentSettings.md) |  | 
**projectId** | **Number** | ID проекта, в который нужно добавить агента. По умолчанию — проект по умолчанию. | [optional] 
**isWebSearchEnabled** | **Boolean** | Включить веб-поиск | [optional] [default to false]
**moneyLimit** | **Number** | Дневной лимит расходов агента в валюте аккаунта. &#x60;0&#x60; или не передан — без лимита. Создаётся как лимит агента с периодом &#x60;day&#x60;; изменить его можно через лимиты агента. | [optional] 
**tokenLimit** | **Number** | Устарело: дневной лимит агента в токенах. &#x60;0&#x60; или не передан — без лимита. Не учитывается, если передан &#x60;money_limit&#x60;. | [optional] 
**tokenPackageId** | **Number** | Устарело и не учитывается: агент всегда создаётся с поресурсной оплатой. | [optional] 
**additionalModelIds** | **[Number]** | ID дополнительных моделей агента (например, для генерации изображений). Список заменяет текущий целиком. | [optional] 
**additionalModels** | [**[AgentAdditionalModel]**](AgentAdditionalModel.md) | Дополнительные модели вместе с настройками (для моделей генерации изображений — &#x60;width&#x60;/&#x60;height&#x60;). Если переданы и &#x60;additional_models&#x60;, и &#x60;additional_model_ids&#x60;, используется &#x60;additional_models&#x60;. | [optional] 
**skillIds** | **[Number]** | ID навыков, которые нужно подключить к агенту сразу после создания (текущие версии навыков). Неизвестные ID пропускаются; ошибка подключения навыков не отменяет создание агента. | [optional] 



## Enum: AccessTypeEnum


* `public` (value: `"public"`)

* `private` (value: `"private"`)




