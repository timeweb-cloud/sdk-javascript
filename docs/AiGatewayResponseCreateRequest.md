# TimewebCloudApi.AiGatewayResponseCreateRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**model** | **String** | ID модели из &#x60;GET /v1/models&#x60; | 
**input** | **String** | Текст или массив входных элементов (сообщения, результаты вызова функций и т. п.) | 
**instructions** | **String** | Системные инструкции | [optional] 
**previousResponseId** | **String** | ID сохранённого ответа, чтобы продолжить диалог | [optional] 
**stream** | **Boolean** | Отправлять ответ потоком типизированных событий Server-Sent Events | [optional] [default to false]
**background** | **Boolean** | Выполнить запрос в фоне: результат получайте через &#x60;GET /v1/responses/{response_id}&#x60; | [optional] 
**store** | **Boolean** | Сохранить ответ, чтобы получить его позже или продолжить диалог | [optional] 
**maxOutputTokens** | **Number** | Максимум выходных токенов | [optional] 
**tools** | **[{String: Object}]** | Инструменты, которые может вызвать модель | [optional] 
**reasoning** | [**AiGatewayResponseCreateRequestReasoning**](AiGatewayResponseCreateRequestReasoning.md) |  | [optional] 
**text** | **{String: Object}** | Настройки формата текста ответа | [optional] 
**temperature** | **Number** | Температура выборки | [optional] 


