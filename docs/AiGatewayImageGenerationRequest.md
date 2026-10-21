# TimewebCloudApi.AiGatewayImageGenerationRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**model** | **String** | ID модели генерации изображений (&#x60;mode: image_generation&#x60; в &#x60;GET /v1/models&#x60;) | 
**prompt** | **String** | Описание изображения | 
**n** | **Number** | Количество изображений | [optional] [default to 1]
**size** | **String** | Размер изображения | [optional] 
**quality** | **String** | Качество изображения | [optional] 
**responseFormat** | **String** | Формат изображения в ответе. Поддерживается не всеми моделями | [optional] 
**outputFormat** | **String** | Формат файла изображения | [optional] 



## Enum: ResponseFormatEnum


* `url` (value: `"url"`)

* `b64_json` (value: `"b64_json"`)




