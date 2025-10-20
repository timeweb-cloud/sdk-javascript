# TimewebCloudApi.Knowledgebase

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** | Уникальный идентификатор базы знаний | 
**name** | **String** | Название базы знаний | 
**description** | **String** | Описание базы знаний | [optional] 
**dbaasId** | **Number** | ID базы данных opensearch | 
**status** | **String** | Статус базы знаний | 
**lastSync** | **Date** | Дата последней синхронизации | [optional] 
**totalTokens** | **Number** | Всего токенов выделено | 
**usedTokens** | **Number** | Использовано токенов | 
**remainingTokens** | **Number** | Осталось токенов | 
**tokenPackageId** | **Number** | ID пакета токенов | 
**subscriptionRenewalDate** | **Date** | Дата обновления подписки | 
**documents** | [**[Document]**](Document.md) | Документы в базе знаний | 
**agentsIds** | **[Number]** | ID агентов, связанных с базой знаний | 
**createdAt** | **Date** | Дата создания базы знаний | 



## Enum: StatusEnum


* `active` (value: `"active"`)

* `blocked` (value: `"blocked"`)

* `creating` (value: `"creating"`)

* `deleted` (value: `"deleted"`)




