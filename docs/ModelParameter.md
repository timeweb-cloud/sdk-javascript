# TimewebCloudApi.ModelParameter

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**code** | **String** | Код характеристики — ключ в &#x60;parameter_values&#x60; модели | 
**name** | **String** | Название характеристики | [optional] 
**description** | **String** | Описание характеристики | [optional] 
**type** | **String** | Тип значения | 
**unit** | **String** | Единица измерения (&#x60;tokens&#x60;, &#x60;tokens_per_second&#x60;, &#x60;currency_per_million&#x60;, ...). &#x60;null&#x60;, если нет | 
**group** | **String** | Группа характеристик: &#x60;pricing&#x60;, &#x60;quality&#x60;, &#x60;performance&#x60;, &#x60;capabilities&#x60;, &#x60;limits&#x60;, &#x60;meta&#x60; | 
**sortOrder** | **Number** | Порядок отображения | 
**comparisonDirection** | **String** | Какое значение лучше при сравнении моделей | 
**format** | **String** | Подсказка для отображения значения. &#x60;currency_per_million_tokens&#x60; — значение в &#x60;parameter_values&#x60; указано за 1 токен, показывать его удобно за 1 млн токенов | 



## Enum: TypeEnum


* `number` (value: `"number"`)

* `boolean` (value: `"boolean"`)

* `string` (value: `"string"`)

* `array` (value: `"array"`)





## Enum: ComparisonDirectionEnum


* `higher_is_better` (value: `"higher_is_better"`)

* `lower_is_better` (value: `"lower_is_better"`)

* `none` (value: `"none"`)





## Enum: FormatEnum


* `currency_per_million_tokens` (value: `"currency_per_million_tokens"`)

* `currency_per_image` (value: `"currency_per_image"`)

* `tokens` (value: `"tokens"`)

* `tokens_per_second` (value: `"tokens_per_second"`)

* `seconds` (value: `"seconds"`)

* `number` (value: `"number"`)

* `boolean` (value: `"boolean"`)

* `string` (value: `"string"`)

* `array` (value: `"array"`)

* `date` (value: `"date"`)




