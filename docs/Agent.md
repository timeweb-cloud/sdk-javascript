# TimewebCloudApi.Agent

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** | Уникальный идентификатор агента | 
**name** | **String** | Название агента | 
**description** | **String** | Описание агента | 
**modelId** | **Number** | ID модели | 
**providerId** | **Number** | ID провайдера | 
**settings** | [**AgentSettings**](AgentSettings.md) |  | 
**status** | **String** | Статус агента | 
**accessType** | **String** | Тип доступа к агенту | 
**totalTokens** | **Number** | Всего токенов выделено агенту | 
**usedTokens** | **Number** | Использовано токенов | 
**remainingTokens** | **Number** | Осталось токенов | 
**tokenPackageId** | **Number** | ID пакета токенов | 
**subscriptionRenewalDate** | **Date** | Дата обновления подписки | 
**knowledgeBasesIds** | **[Number]** | ID баз знаний, связанных с агентом | 
**accessId** | **Number** | ID доступа | 
**createdAt** | **Date** | Дата создания агента | 



## Enum: StatusEnum


* `active` (value: `"active"`)

* `blocked` (value: `"blocked"`)

* `deleted` (value: `"deleted"`)

* `suspended` (value: `"suspended"`)





## Enum: AccessTypeEnum


* `public` (value: `"public"`)

* `private` (value: `"private"`)




