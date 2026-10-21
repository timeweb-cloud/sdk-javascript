# TimewebCloudApi.AiKeyTokenStatisticPoint

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**time** | **Date** | Начало интервала | 
**ingoingTokens** | **Number** | Входные токены (запрос) | 
**outgoingTokens** | **Number** | Выходные токены (ответ модели) | 
**cacheReadTokens** | **Number** | Входные токены, прочитанные из кэша | 
**cacheWriteTokens** | **Number** | Входные токены, записанные в кэш | 
**totalCost** | **Number** | Стоимость запросов за интервал с учётом скидок аккаунта, до списания бонусов, в валюте аккаунта. &#x60;null&#x60; — стоимость части запросов интервала определить не удалось | 


