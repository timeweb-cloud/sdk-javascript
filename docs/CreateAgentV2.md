# TimewebCloudApi.CreateAgentV2

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **String** | Название агента | 
**description** | **String** | Описание агента | [optional] 
**accessType** | **String** | Тип доступа к агенту | 
**modelId** | **Number** | ID основной модели | 
**tokenLimit** | **Number** | Дневной лимит токенов для агента (0 — без лимита) | [optional] 
**settings** | [**AgentSettings**](AgentSettings.md) |  | 
**projectId** | **Number** | ID проекта | [optional] 
**additionalModelIds** | **[Number]** | Список ID дополнительных моделей агента | [optional] 
**isWebSearchEnabled** | **Boolean** | Признак использования веб-поиска агентом | [optional] 



## Enum: AccessTypeEnum


* `public` (value: `"public"`)

* `private` (value: `"private"`)




