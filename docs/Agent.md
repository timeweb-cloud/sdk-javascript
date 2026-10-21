# TimewebCloudApi.Agent

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** | ID агента | 
**name** | **String** | Название агента | 
**description** | **String** | Описание агента | 
**projectId** | **Number** | ID проекта, в котором находится агент | [optional] 
**modelId** | **Number** | ID основной модели агента | 
**providerId** | **Number** | ID провайдера модели | 
**settings** | [**AgentSettings**](AgentSettings.md) |  | 
**status** | **String** | Статус агента: - &#x60;active&#x60; — работает; - &#x60;suspended&#x60; — приостановлен владельцем; - &#x60;blocked&#x60; — заблокирован (для агентов с пакетом токенов — закончились токены или подписка); - &#x60;deleted&#x60; — удалён. | 
**accessType** | **String** | Тип доступа: &#x60;public&#x60; — агент отвечает анонимным посетителям сайта через виджет; &#x60;private&#x60; — только по токену аккаунта. | 
**accessId** | **String** | Идентификатор доступа агента. Используется для вызова агента из своих приложений через OpenAI-совместимое API (см. https://agent.timeweb.cloud/docs) и для встраивания виджета. | 
**tokenLimit** | **Number** | Устарело. Дневной лимит агента в токенах без привязки к модели, если он задан; &#x60;0&#x60; — такого лимита нет. Лимиты в деньгах, по моделям и за другие периоды здесь не отражаются — используйте лимиты агента (&#x60;/api/v1/cloud-ai/agents/{id}/entity-limits&#x60;). | 
**totalTokens** | **Number** | Всего токенов в пакете. Только для агентов с пакетом токенов (устаревшая схема оплаты). | [optional] 
**usedTokens** | **Number** | Использовано токенов пакета. Для агентов с поресурсной оплатой — &#x60;null&#x60;. | 
**remainingTokens** | **Number** | Осталось токенов в пакете. Только для агентов с пакетом токенов. | [optional] 
**tokenPackageId** | **Number** | ID пакета токенов. Только для агентов с пакетом токенов; у агентов с поресурсной оплатой поле отсутствует. | [optional] 
**subscriptionRenewalDate** | **Date** | Дата продления подписки на пакет токенов. Только для агентов с пакетом токенов. | [optional] 
**autoBuyAdditionalTokens** | **Boolean** | Включена ли автоматическая докупка пакетов токенов | 
**tools** | [**[AgentToolsInner]**](AgentToolsInner.md) | Инструменты, подключённые к агенту | 
**additionalModelIds** | **[Number]** | ID дополнительных моделей агента | 
**additionalModels** | [**[AgentAdditionalModel]**](AgentAdditionalModel.md) | Дополнительные модели агента с настройками | 
**isWebSearchEnabled** | **Boolean** | Включён ли веб-поиск | 
**aiGatewayKeyId** | **String** | ID ключа AI Gateway, к которому привязан агент. &#x60;null&#x60; — агента можно привязать к ключу (см. обновление агента); поле отсутствует — привязка недоступна. | [optional] 
**createdAt** | **Date** | Дата создания агента | 
**knowledgeBasesIds** | **[Number]** | ID баз знаний, подключённых к агенту | 



## Enum: StatusEnum


* `active` (value: `"active"`)

* `blocked` (value: `"blocked"`)

* `deleted` (value: `"deleted"`)

* `suspended` (value: `"suspended"`)





## Enum: AccessTypeEnum


* `public` (value: `"public"`)

* `private` (value: `"private"`)




