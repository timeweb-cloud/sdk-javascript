# TimewebCloudApi.KnowledgebaseV2

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** | ID базы знаний | 
**name** | **String** | Название базы знаний | 
**description** | **String** | Описание базы знаний | 
**projectId** | **Number** | ID проекта, в котором находится база знаний. Поля нет, если проект не определён | [optional] 
**dbaasId** | **Number** | ID кластера базы данных OpenSearch, который создан для базы знаний в вашем аккаунте | 
**status** | **String** | Статус базы знаний: - &#x60;creating&#x60; — создаётся кластер базы данных, документы будут проиндексированы после перехода в &#x60;active&#x60; - &#x60;active&#x60; — база знаний работает - &#x60;blocked&#x60; — заблокирована: закончились токены или не удалось продлить подписку - &#x60;deleted&#x60; — удалена | 
**lastSync** | **Date** | Дата и время последней синхронизации. &#x60;null&#x60;, если синхронизации не было | 
**totalTokens** | **Number** | Количество токенов, доступных в текущем периоде подписки (пакет подписки и докупленные пакеты) | 
**usedTokens** | **Number** | Количество израсходованных токенов | 
**remainingTokens** | **Number** | Количество оставшихся токенов | 
**tokenPackageId** | **Number** | ID пакета токенов подписки базы знаний | 
**subscriptionRenewalDate** | **Date** | Дата следующего продления подписки (списания стоимости пакета токенов) | 
**documentsCount** | **Number** | Количество документов в базе знаний | 
**agentsIds** | **[Number]** | ID агентов, к которым привязана база знаний | 
**createdAt** | **Date** | Дата и время создания базы знаний | 



## Enum: StatusEnum


* `active` (value: `"active"`)

* `blocked` (value: `"blocked"`)

* `creating` (value: `"creating"`)

* `deleted` (value: `"deleted"`)




