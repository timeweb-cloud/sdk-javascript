# TimewebCloudApi.AiGatewayChatMessage

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**role** | **String** | Роль автора сообщения | 
**content** | **String** | Текст сообщения или массив частей (&#x60;text&#x60;, &#x60;image_url&#x60;, &#x60;input_audio&#x60;, &#x60;file&#x60;) для моделей, которые их принимают | [optional] 
**name** | **String** | Имя автора сообщения | [optional] 
**toolCalls** | [**[AiGatewayToolCall]**](AiGatewayToolCall.md) | Вызовы функций (в сообщениях &#x60;assistant&#x60;) | [optional] 
**toolCallId** | **String** | ID вызова функции, на который отвечает сообщение (в сообщениях &#x60;tool&#x60;) | [optional] 



## Enum: RoleEnum


* `system` (value: `"system"`)

* `developer` (value: `"developer"`)

* `user` (value: `"user"`)

* `assistant` (value: `"assistant"`)

* `tool` (value: `"tool"`)




