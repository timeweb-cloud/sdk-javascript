# TimewebCloudApi.CreateKnowledgebase

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **String** | Название базы знаний | 
**description** | **String** | Описание базы знаний | [optional] 
**dbaasPresetId** | **Number** | ID тарифа кластера OpenSearch, который будет создан для базы знаний. Список тарифов баз данных — &#x60;GET /api/v2/presets/dbs&#x60; | 
**networkId** | **String** | ID приватной сети (VPC), в которой будет создан кластер | 
**tokenPackageId** | **Number** | ID пакета токенов подписки. Подходят только базовые пакеты (&#x60;package_type: base&#x60;) из &#x60;GET /api/v1/cloud-ai/token-packages/knowledge-bases&#x60; | 
**projectId** | **Number** | ID проекта, в который нужно добавить базу знаний | [optional] 


