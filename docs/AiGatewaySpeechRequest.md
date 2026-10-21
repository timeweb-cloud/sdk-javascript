# TimewebCloudApi.AiGatewaySpeechRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**model** | **String** | ID модели синтеза речи (&#x60;mode: audio_speech&#x60; в &#x60;GET /v1/models&#x60;) | 
**input** | **String** | Текст для озвучивания | 
**voice** | **String** | Голос | 
**instructions** | **String** | Инструкции к манере речи — для моделей, которые их поддерживают | [optional] 
**responseFormat** | **String** | Формат аудио, например &#x60;mp3&#x60;, &#x60;wav&#x60;, &#x60;opus&#x60;. По умолчанию — &#x60;mp3&#x60; | [optional] 
**speed** | **Number** | Скорость речи | [optional] 


