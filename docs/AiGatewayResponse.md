# TimewebCloudApi.AiGatewayResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **String** | ID ответа. Передавайте его как есть в остальные запросы &#x60;/v1/responses&#x60; | [optional] 
**object** | **String** | Тип объекта | [optional] 
**createdAt** | **Number** | Время создания, Unix-время в секундах | [optional] 
**status** | **String** | Статус ответа: &#x60;queued&#x60;, &#x60;in_progress&#x60;, &#x60;completed&#x60;, &#x60;incomplete&#x60; (достигнут лимит выходных токенов), &#x60;failed&#x60;, &#x60;cancelling&#x60; (отмена выполняется), &#x60;cancelled&#x60; | [optional] 
**model** | **String** | Модель, которая ответила | [optional] 
**output** | **[{String: Object}]** | Выходные элементы: сообщения, вызовы функций, рассуждения | [optional] 
**incompleteDetails** | [**AiGatewayResponseIncompleteDetails**](AiGatewayResponseIncompleteDetails.md) |  | [optional] 
**usage** | [**AiGatewayResponseUsage**](AiGatewayResponseUsage.md) |  | [optional] 



## Enum: ObjectEnum


* `response` (value: `"response"`)




