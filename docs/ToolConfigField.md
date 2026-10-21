# TimewebCloudApi.ToolConfigField

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**key** | **String** | Ключ поля в &#x60;config_values&#x60; | 
**label** | **String** | Название поля для пользователя | 
**type** | **String** | Тип значения | 
**required** | **Boolean** | Поле обязательно | 
**description** | **String** | Подсказка к полю | [optional] 
**placeholder** | **String** | Пример значения | [optional] 
**headerName** | **String** | HTTP-заголовок, в котором значение передаётся MCP-серверу | [optional] 
**prefix** | **String** | Префикс, который добавляется перед значением в заголовке | [optional] 
**options** | **[String]** | Допустимые значения (для &#x60;select&#x60;) | [optional] 
**_default** | **String** | Значение по умолчанию | [optional] 



## Enum: TypeEnum


* `string` (value: `"string"`)

* `secret` (value: `"secret"`)

* `number` (value: `"number"`)

* `boolean` (value: `"boolean"`)

* `select` (value: `"select"`)




