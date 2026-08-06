# TimewebCloudApi.UpdateHttpResource

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **String** | Название CDN-ресурса. | [optional] 
**description** | **String** | Описание CDN-ресурса. | [optional] 
**presetId** | **Number** | ID тарифа CDN. Список доступных тарифов можно получить в &#x60;/api/v1/cdn/presets&#x60;. | [optional] 
**storageId** | **Number** | ID S3-хранилища, которое будет источником контента. Нельзя передавать вместе с &#x60;config.origin.servers&#x60;. | [optional] 
**trafficLimitBytes** | **Number** | Лимит исходящего трафика на расчетный месяц, в байтах. &#x60;null&#x60; — снять лимит. Если ресурс был остановлен по лимиту, при снятии или увеличении лимита раздача возобновится. | [optional] 
**config** | [**HttpResourceConfig**](HttpResourceConfig.md) |  | [optional] 


