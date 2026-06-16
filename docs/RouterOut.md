# TimewebCloudApi.RouterOut

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **String** | ID роутера | 
**accountId** | **String** | ID аккаунта | 
**avatarLink** | **String** | Ссылка на аватар роутера | 
**name** | **String** | Имя роутера | 
**comment** | **String** | Описание роутера | 
**status** | **String** | Статус роутера | 
**zone** | **String** | Зона доступности | 
**ips** | [**[RouterOutIpsInner]**](RouterOutIpsInner.md) | IP-адреса | 
**presetId** | **Number** | ID тарифа | 
**preset** | [**RouterPreset**](RouterPreset.md) |  | 
**nodes** | [**[RouterOutNodesInner]**](RouterOutNodesInner.md) | Ноды | 
**networks** | [**[RouterNetworkMeta]**](RouterNetworkMeta.md) | Сети | 
**createdAt** | **Date** | Дата и время создания роутера в формате ISO8601 | 
**projectId** | **Number** | ID проекта | [optional] 
**parentServices** | [**[RouterOutParentServicesInner]**](RouterOutParentServicesInner.md) | Родительские сервисы | 


