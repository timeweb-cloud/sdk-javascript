# TimewebCloudApi.AiGatewayBatchCreateRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**inputFileId** | **String** | ID файла, загруженного с &#x60;purpose&#x3D;batch&#x60; | 
**endpoint** | **String** | Эндпоинт запросов батча — должен совпадать с &#x60;url&#x60; каждой строки входного файла | 
**completionWindow** | **String** | Срок выполнения | 
**metadata** | **{String: String}** | Ваши метки батча: пары «строка — строка» | [optional] 



## Enum: EndpointEnum


* `chat/completions` (value: `"/v1/chat/completions"`)

* `embeddings` (value: `"/v1/embeddings"`)





## Enum: CompletionWindowEnum


* `24h` (value: `"24h"`)




