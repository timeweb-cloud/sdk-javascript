# TimewebCloudApi.ToolTemplate

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** | ID шаблона. Передаётся в &#x60;template_id&#x60; при установке | 
**name** | **String** | Название | 
**key** | **String** | Уникальный ключ шаблона | [optional] 
**description** | **String** | Описание | 
**type** | **String** | Тип инструмента | 
**version** | **String** | Версия шаблона | 
**isApproved** | **Number** | Шаблон одобрен для маркетплейса: &#x60;1&#x60; — да, &#x60;0&#x60; — нет | 
**authorAccountId** | **String** | Автор шаблона. &#x60;null&#x60; — шаблон Timeweb Cloud | [optional] 
**isSystem** | **Number** | Системный шаблон платформы: &#x60;1&#x60; — да, &#x60;0&#x60; — нет | 
**installCount** | **Number** | Сколько раз шаблон установлен | 
**category** | **String** | Категория шаблона | [optional] 
**configSchema** | [**ToolTemplateConfigSchema**](ToolTemplateConfigSchema.md) |  | [optional] 
**authType** | **String** | Способ авторизации на MCP-сервере | 
**deploymentType** | **String** | Где работает MCP-сервер: &#x60;managed&#x60; — на стороне Timeweb Cloud, &#x60;external&#x60; — у стороннего сервиса | 
**createdAt** | **Date** | Дата и время создания | 
**updatedAt** | **Date** | Дата и время последнего изменения | 



## Enum: TypeEnum


* `MCP` (value: `"MCP"`)





## Enum: IsApprovedEnum


* `0` (value: `0`)

* `1` (value: `1`)





## Enum: IsSystemEnum


* `0` (value: `0`)

* `1` (value: `1`)





## Enum: CategoryEnum


* `search` (value: `"search"`)

* `null` (value: `"null"`)





## Enum: DeploymentTypeEnum


* `managed` (value: `"managed"`)

* `external` (value: `"external"`)




