# TimewebCloudApi.CreateHttpResource

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **String** | Название CDN-ресурса. | 
**presetId** | **Number** | ID тарифа CDN. Список доступных тарифов можно получить в &#x60;/api/v1/cdn/presets&#x60;. | 
**description** | **String** | Описание CDN-ресурса. | [optional] 
**storageId** | **Number** | ID S3-хранилища, которое будет источником контента. Нельзя передавать вместе с &#x60;server&#x60;. | [optional] 
**server** | [**OriginServer**](OriginServer.md) |  | [optional] 
**useHttps** | **Boolean** | Обращаться к источнику контента по HTTPS. | [optional] 
**deliveryDomain** | **String** | Собственный домен, с которого будет раздаваться контент. Домен добавляется к техническому домену ресурса, для его работы нужно направить CNAME-запись на &#x60;cdn_domain&#x60;. | [optional] 
**projectId** | **Number** | ID проекта, в который нужно поместить ресурс. Если не указан, ресурс попадет в проект по умолчанию. | [optional] 
**trafficLimitBytes** | **Number** | Лимит исходящего трафика на расчетный месяц, в байтах. При достижении лимита раздача останавливается автоматически. | [optional] 


