# TimewebCloudApi.AiGatewayEmbeddingRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**model** | **String** | ID модели эмбеддингов (&#x60;mode: embedding&#x60; в &#x60;GET /v1/models&#x60;) | 
**input** | **String** | Текст или список текстов | 
**dimensions** | **Number** | Размерность вектора — для моделей, которые её поддерживают | [optional] 
**encodingFormat** | **String** | Формат векторов | [optional] [default to &#39;float&#39;]



## Enum: EncodingFormatEnum


* `float` (value: `"float"`)

* `base64` (value: `"base64"`)




