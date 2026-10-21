# TimewebCloudApi.AiGatewayChatCompletionRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**model** | **String** | ID модели из &#x60;GET /v1/models&#x60; | 
**messages** | [**[AiGatewayChatMessage]**](AiGatewayChatMessage.md) | История диалога целиком | 
**stream** | **Boolean** | Отправлять ответ потоком Server-Sent Events (&#x60;text/event-stream&#x60;) | [optional] [default to false]
**streamOptions** | [**AiGatewayChatCompletionRequestStreamOptions**](AiGatewayChatCompletionRequestStreamOptions.md) |  | [optional] 
**maxCompletionTokens** | **Number** | Максимум выходных токенов, включая рассуждения | [optional] 
**maxTokens** | **Number** | Устаревший синоним &#x60;max_completion_tokens&#x60; | [optional] 
**temperature** | **Number** | Температура выборки | [optional] 
**topP** | **Number** | Порог nucleus sampling | [optional] 
**n** | **Number** | Количество вариантов ответа | [optional] [default to 1]
**stop** | **String** | Строка или список строк, на которых генерация останавливается | [optional] 
**tools** | **[{String: Object}]** | Функции, которые может вызвать модель | [optional] 
**toolChoice** | **String** | Режим вызова функций: &#x60;none&#x60;, &#x60;auto&#x60;, &#x60;required&#x60; или объект с конкретной функцией | [optional] 
**responseFormat** | **{String: Object}** | Формат ответа: &#x60;{\&quot;type\&quot;: \&quot;json_object\&quot;}&#x60; или &#x60;{\&quot;type\&quot;: \&quot;json_schema\&quot;, \&quot;json_schema\&quot;: {...}}&#x60; | [optional] 
**reasoningEffort** | **String** | Уровень рассуждений для моделей с рассуждениями, например &#x60;low&#x60;, &#x60;high&#x60; | [optional] 
**user** | **String** | Идентификатор вашего конечного пользователя | [optional] 



## Enum: ToolChoiceEnum


* `none` (value: `"none"`)

* `auto` (value: `"auto"`)

* `required` (value: `"required"`)




