# TimewebCloudApi.HttpResource

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** | ID CDN-ресурса. Генерируется автоматически при создании. | 
**name** | **String** | Название CDN-ресурса. | 
**description** | **String** | Описание CDN-ресурса. | [optional] 
**source** | **String** | Источник контента: имя S3-бакета, если ресурс создан поверх хранилища, либо хост origin-сервера. | 
**trafficUsage** | [**TrafficUsage**](TrafficUsage.md) |  | 
**status** | **String** | Статус CDN-ресурса. - &#x60;created&#x60; — ресурс создан и раздает контент; - &#x60;processing&#x60; — конфигурация применяется на стороне CDN; - &#x60;stopped&#x60; — раздача приостановлена; - &#x60;failed&#x60; — настройка ресурса завершилась с ошибкой; - &#x60;no_paid&#x60; — ресурс не оплачен; - &#x60;blocked&#x60; — ресурс заблокирован; - &#x60;traffic_limit_exceeded&#x60; — раздача остановлена автоматически из-за достижения лимита трафика &#x60;traffic_limit_bytes&#x60;. | 
**cdnDomain** | **String** | Технический домен, выданный ресурсу. Доступен сразу после создания и всегда остается в списке доменов ресурса. | 
**presetId** | **Number** | ID тарифа CDN. Список доступных тарифов можно получить в &#x60;/api/v1/cdn/presets&#x60;. | 
**projectId** | **Number** | ID проекта, к которому привязан ресурс. | [optional] 
**avatarLink** | **String** | Ссылка на аватар ресурса. | [optional] 
**storageId** | **Number** | ID S3-хранилища, которое используется в качестве источника контента. &#x60;null&#x60;, если источником является origin-сервер. | [optional] 
**trafficLimitBytes** | **Number** | Лимит исходящего трафика на расчетный месяц, в байтах. При достижении лимита раздача останавливается, а ресурс переходит в статус &#x60;traffic_limit_exceeded&#x60;. &#x60;null&#x60; — лимит не задан. | [optional] 



## Enum: StatusEnum


* `created` (value: `"created"`)

* `processing` (value: `"processing"`)

* `stopped` (value: `"stopped"`)

* `failed` (value: `"failed"`)

* `no_paid` (value: `"no_paid"`)

* `blocked` (value: `"blocked"`)

* `traffic_limit_exceeded` (value: `"traffic_limit_exceeded"`)




