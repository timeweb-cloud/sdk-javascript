# TimewebCloudApi.CreateAgent

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
**tokenPackageId** | **Number** | ID пакета токенов. Обязателен для совместимости, но не учитывается: агент всегда создаётся с поресурсной оплатой. | 



## Enum: AccessTypeEnum


* `public` (value: `"public"`)

* `private` (value: `"private"`)




