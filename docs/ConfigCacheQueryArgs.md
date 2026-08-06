# TimewebCloudApi.ConfigCacheQueryArgs

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**mode** | **String** | Режим учета query-параметров. - &#x60;all&#x60; — учитывать все параметры; - &#x60;whitelist&#x60; — учитывать только параметры из &#x60;list&#x60;; - &#x60;blacklist&#x60; — учитывать все параметры, кроме перечисленных в &#x60;list&#x60;. | 
**list** | **[String]** | Список query-параметров для режимов &#x60;whitelist&#x60; и &#x60;blacklist&#x60;. | [optional] 



## Enum: ModeEnum


* `all` (value: `"all"`)

* `whitelist` (value: `"whitelist"`)

* `blacklist` (value: `"blacklist"`)




