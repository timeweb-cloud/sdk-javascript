# TimewebCloudApi.AiGatewayCompletionRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**model** | **String** | ID модели из &#x60;GET /v1/models&#x60; | 
**prompt** | **String** | Текст или список текстов для продолжения | 
**maxTokens** | **Number** | Максимум выходных токенов | [optional] 
**temperature** | **Number** | Температура выборки | [optional] 
**topP** | **Number** | Порог nucleus sampling | [optional] 
**stop** | **String** | Строка или список строк, на которых генерация останавливается | [optional] 
**stream** | **Boolean** | Отправлять ответ потоком Server-Sent Events (&#x60;text/event-stream&#x60;) | [optional] [default to false]
**streamOptions** | [**AiGatewayChatCompletionRequestStreamOptions**](AiGatewayChatCompletionRequestStreamOptions.md) |  | [optional] 


