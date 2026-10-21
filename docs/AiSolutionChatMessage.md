# TimewebCloudApi.AiSolutionChatMessage

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**entryId** | **String** | ID сообщения | 
**conversationId** | **String** | ID разговора | 
**role** | **String** | Автор сообщения: &#x60;user&#x60;, &#x60;assistant&#x60; или &#x60;context-reset&#x60; — служебная отметка с пустым &#x60;content&#x60;, обозначающая место сброса контекста разговора | 
**content** | **String** | Текст сообщения | 
**createdAt** | **Date** | Дата и время сообщения | 



## Enum: RoleEnum


* `user` (value: `"user"`)

* `assistant` (value: `"assistant"`)

* `context-reset` (value: `"context-reset"`)




