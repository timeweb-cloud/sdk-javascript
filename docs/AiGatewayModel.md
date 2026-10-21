# TimewebCloudApi.AiGatewayModel

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **String** | ID модели — передавайте его в поле &#x60;model&#x60; | [optional] 
**object** | **String** | Тип объекта | [optional] 
**created** | **Number** | Время добавления, Unix-время в секундах | [optional] 
**ownedBy** | **String** | Владелец модели | [optional] 
**mode** | **String** | Назначение модели: &#x60;chat&#x60;, &#x60;responses&#x60;, &#x60;embedding&#x60;, &#x60;image_generation&#x60;, &#x60;audio_speech&#x60;, &#x60;audio_transcription&#x60; и др. У части моделей не задано | [optional] 
**maxInputTokens** | **Number** | Контекстное окно, если известно | [optional] 
**maxOutputTokens** | **Number** | Максимум выходных токенов, если известно | [optional] 



## Enum: ObjectEnum


* `model` (value: `"model"`)




