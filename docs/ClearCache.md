# TimewebCloudApi.ClearCache

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**purgeType** | **String** | Тип очистки. - &#x60;full&#x60; — очистить весь кэш ресурса; - &#x60;partial&#x60; — очистить кэш только по путям из &#x60;paths&#x60;. | 
**paths** | **[String]** | Список путей к файлам, кэш которых нужно очистить. Обязателен при &#x60;purge_type&#x60; &#x3D; &#x60;partial&#x60;. | [optional] 



## Enum: PurgeTypeEnum


* `full` (value: `"full"`)

* `partial` (value: `"partial"`)




