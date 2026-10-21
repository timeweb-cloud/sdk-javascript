# TimewebCloudApi.AIGatewayInferenceApi

All URIs are relative to *https://api.timeweb.cloud*

Method | HTTP request | Description
------------- | ------------- | -------------
[**cancelAiGatewayBatch**](AIGatewayInferenceApi.md#cancelAiGatewayBatch) | **POST** /v1/batches/{batch_id}/cancel | Отмена батча
[**cancelAiGatewayResponse**](AIGatewayInferenceApi.md#cancelAiGatewayResponse) | **POST** /v1/responses/{response_id}/cancel | Отмена фонового ответа (Responses API)
[**createAiGatewayBatch**](AIGatewayInferenceApi.md#createAiGatewayBatch) | **POST** /v1/batches | Создание батча
[**createAiGatewayChatCompletion**](AIGatewayInferenceApi.md#createAiGatewayChatCompletion) | **POST** /v1/chat/completions | Генерация ответа в диалоге (Chat Completions)
[**createAiGatewayCompletion**](AIGatewayInferenceApi.md#createAiGatewayCompletion) | **POST** /v1/completions | Продолжение текста (Completions)
[**createAiGatewayEmbedding**](AIGatewayInferenceApi.md#createAiGatewayEmbedding) | **POST** /v1/embeddings | Получение эмбеддингов
[**createAiGatewayImage**](AIGatewayInferenceApi.md#createAiGatewayImage) | **POST** /v1/images/generations | Генерация изображений
[**createAiGatewayImageEdit**](AIGatewayInferenceApi.md#createAiGatewayImageEdit) | **POST** /v1/images/edits | Редактирование изображений
[**createAiGatewayResponse**](AIGatewayInferenceApi.md#createAiGatewayResponse) | **POST** /v1/responses | Создание ответа (Responses API)
[**createAiGatewaySpeech**](AIGatewayInferenceApi.md#createAiGatewaySpeech) | **POST** /v1/audio/speech | Синтез речи
[**createAiGatewayTranscription**](AIGatewayInferenceApi.md#createAiGatewayTranscription) | **POST** /v1/audio/transcriptions | Распознавание речи
[**deleteAiGatewayFile**](AIGatewayInferenceApi.md#deleteAiGatewayFile) | **DELETE** /v1/files/{file_id} | Удаление файла
[**deleteAiGatewayResponse**](AIGatewayInferenceApi.md#deleteAiGatewayResponse) | **DELETE** /v1/responses/{response_id} | Удаление ответа (Responses API)
[**downloadAiGatewayFileContent**](AIGatewayInferenceApi.md#downloadAiGatewayFileContent) | **GET** /v1/files/{file_id}/content | Скачивание файла
[**getAiGatewayBatch**](AIGatewayInferenceApi.md#getAiGatewayBatch) | **GET** /v1/batches/{batch_id} | Получение батча
[**getAiGatewayBatches**](AIGatewayInferenceApi.md#getAiGatewayBatches) | **GET** /v1/batches | Получение списка батчей
[**getAiGatewayFile**](AIGatewayInferenceApi.md#getAiGatewayFile) | **GET** /v1/files/{file_id} | Получение информации о файле
[**getAiGatewayModels**](AIGatewayInferenceApi.md#getAiGatewayModels) | **GET** /v1/models | Получение списка моделей AI Gateway
[**getAiGatewayResponse**](AIGatewayInferenceApi.md#getAiGatewayResponse) | **GET** /v1/responses/{response_id} | Получение ответа (Responses API)
[**uploadAiGatewayFile**](AIGatewayInferenceApi.md#uploadAiGatewayFile) | **POST** /v1/files | Загрузка файла



## cancelAiGatewayBatch

> AiGatewayBatch cancelAiGatewayBatch(batchId)

Отмена батча

Чтобы отменить батч, отправьте POST-запрос на &#x60;/v1/batches/{batch_id}/cancel&#x60;.  Батч переходит в статус &#x60;cancelling&#x60;, отмена выполняется асинхронно и может занять несколько минут; итоговый статус &#x60;cancelled&#x60; проверяйте через &#x60;GET /v1/batches/{batch_id}&#x60;. Пока отмена не завершилась, входной файл батча удалить нельзя.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer access token for authorization: AiGatewayKey
let AiGatewayKey = defaultClient.authentications['AiGatewayKey'];
AiGatewayKey.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AIGatewayInferenceApi();
let batchId = batch_abc123; // String | ID батча
apiInstance.cancelAiGatewayBatch(batchId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **batchId** | **String**| ID батча | 

### Return type

[**AiGatewayBatch**](AiGatewayBatch.md)

### Authorization

[AiGatewayKey](../README.md#AiGatewayKey)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## cancelAiGatewayResponse

> AiGatewayResponse cancelAiGatewayResponse(responseId)

Отмена фонового ответа (Responses API)

Чтобы отменить ответ, запущенный с &#x60;\&quot;background\&quot;: true&#x60;, отправьте POST-запрос на &#x60;/v1/responses/{response_id}/cancel&#x60;.  Отмена может завершиться не сразу: итоговый статус &#x60;cancelled&#x60; проверяйте через &#x60;GET /v1/responses/{response_id}&#x60;. Ответ, созданный без &#x60;background&#x60;, отменить нельзя — вернётся ошибка 400. Неизвестный &#x60;response_id&#x60; также возвращает 400.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer access token for authorization: AiGatewayKey
let AiGatewayKey = defaultClient.authentications['AiGatewayKey'];
AiGatewayKey.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AIGatewayInferenceApi();
let responseId = resp_abc123; // String | ID ответа Responses API
apiInstance.cancelAiGatewayResponse(responseId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **responseId** | **String**| ID ответа Responses API | 

### Return type

[**AiGatewayResponse**](AiGatewayResponse.md)

### Authorization

[AiGatewayKey](../README.md#AiGatewayKey)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## createAiGatewayBatch

> AiGatewayBatch createAiGatewayBatch(aiGatewayBatchCreateRequest)

Создание батча

Чтобы запустить асинхронную обработку входного файла, загруженного с &#x60;purpose&#x3D;batch&#x60;, отправьте POST-запрос на &#x60;/v1/batches&#x60;.  При создании батча его оценочная стоимость резервируется на балансе, фактическая стоимость списывается по цене Batch API после выполнения. Модели, эндпоинты и коэффициенты цены Batch API — в поле &#x60;batch&#x60; каталога моделей (&#x60;GET https://api.timeweb.cloud/api/v3/cloud-ai/models&#x60;). Batch API доступен только для ключей AI Gateway.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer access token for authorization: AiGatewayKey
let AiGatewayKey = defaultClient.authentications['AiGatewayKey'];
AiGatewayKey.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AIGatewayInferenceApi();
let aiGatewayBatchCreateRequest = new TimewebCloudApi.AiGatewayBatchCreateRequest(); // AiGatewayBatchCreateRequest | 
apiInstance.createAiGatewayBatch(aiGatewayBatchCreateRequest, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **aiGatewayBatchCreateRequest** | [**AiGatewayBatchCreateRequest**](AiGatewayBatchCreateRequest.md)|  | 

### Return type

[**AiGatewayBatch**](AiGatewayBatch.md)

### Authorization

[AiGatewayKey](../README.md#AiGatewayKey)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## createAiGatewayChatCompletion

> AiGatewayChatCompletion createAiGatewayChatCompletion(requestBody)

Генерация ответа в диалоге (Chat Completions)

Чтобы получить следующий ответ модели в диалоге, отправьте POST-запрос на &#x60;/v1/chat/completions&#x60;.  Запрос не хранит состояние: передавайте всю историю диалога в &#x60;messages&#x60;. Поддерживаются вызов функций (&#x60;tools&#x60;), структурированный ответ (&#x60;response_format&#x60;) и изображения во входных сообщениях (для моделей с поддержкой зрения).  С &#x60;\&quot;stream\&quot;: true&#x60; ответ приходит потоком Server-Sent Events: события &#x60;chat.completion.chunk&#x60; в строках &#x60;data:&#x60;, в конце — &#x60;data: [DONE]&#x60;. С &#x60;\&quot;stream_options\&quot;: {\&quot;include_usage\&quot;: true}&#x60; последний чанк содержит расход токенов.  Если у ключа настроены запасные модели и запрошенная модель не ответила, запрос повторяется на запасных. Заголовок ответа &#x60;x-timeweb-attempted-fallbacks&#x60; показывает, сколько запасных моделей было опробовано.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer access token for authorization: AiGatewayKey
let AiGatewayKey = defaultClient.authentications['AiGatewayKey'];
AiGatewayKey.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AIGatewayInferenceApi();
let requestBody = {key: null}; // {String: Object} | 
apiInstance.createAiGatewayChatCompletion(requestBody, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **requestBody** | [**{String: Object}**](Object.md)|  | 

### Return type

[**AiGatewayChatCompletion**](AiGatewayChatCompletion.md)

### Authorization

[AiGatewayKey](../README.md#AiGatewayKey)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json, text/event-stream


## createAiGatewayCompletion

> AiGatewayCompletion createAiGatewayCompletion(requestBody)

Продолжение текста (Completions)

Чтобы получить продолжение текста &#x60;prompt&#x60;, отправьте POST-запрос на &#x60;/v1/completions&#x60;.  Это устаревший API OpenAI — для новых интеграций используйте &#x60;/v1/chat/completions&#x60;. С &#x60;\&quot;stream\&quot;: true&#x60; ответ приходит потоком Server-Sent Events и заканчивается &#x60;data: [DONE]&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer access token for authorization: AiGatewayKey
let AiGatewayKey = defaultClient.authentications['AiGatewayKey'];
AiGatewayKey.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AIGatewayInferenceApi();
let requestBody = {key: null}; // {String: Object} | 
apiInstance.createAiGatewayCompletion(requestBody, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **requestBody** | [**{String: Object}**](Object.md)|  | 

### Return type

[**AiGatewayCompletion**](AiGatewayCompletion.md)

### Authorization

[AiGatewayKey](../README.md#AiGatewayKey)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json, text/event-stream


## createAiGatewayEmbedding

> AiGatewayEmbeddingList createAiGatewayEmbedding(requestBody)

Получение эмбеддингов

Чтобы получить векторные представления текстов, отправьте POST-запрос на &#x60;/v1/embeddings&#x60;.  Используйте модель с &#x60;mode: embedding&#x60; из &#x60;GET /v1/models&#x60;. Эмбеддинги возвращаются в порядке входных текстов.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer access token for authorization: AiGatewayKey
let AiGatewayKey = defaultClient.authentications['AiGatewayKey'];
AiGatewayKey.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AIGatewayInferenceApi();
let requestBody = {key: null}; // {String: Object} | 
apiInstance.createAiGatewayEmbedding(requestBody, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **requestBody** | [**{String: Object}**](Object.md)|  | 

### Return type

[**AiGatewayEmbeddingList**](AiGatewayEmbeddingList.md)

### Authorization

[AiGatewayKey](../README.md#AiGatewayKey)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## createAiGatewayImage

> AiGatewayImagesResponse createAiGatewayImage(requestBody)

Генерация изображений

Чтобы сгенерировать изображения по текстовому описанию, отправьте POST-запрос на &#x60;/v1/images/generations&#x60;.  Используйте модель с &#x60;mode: image_generation&#x60; из &#x60;GET /v1/models&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer access token for authorization: AiGatewayKey
let AiGatewayKey = defaultClient.authentications['AiGatewayKey'];
AiGatewayKey.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AIGatewayInferenceApi();
let requestBody = {key: null}; // {String: Object} | 
apiInstance.createAiGatewayImage(requestBody, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **requestBody** | [**{String: Object}**](Object.md)|  | 

### Return type

[**AiGatewayImagesResponse**](AiGatewayImagesResponse.md)

### Authorization

[AiGatewayKey](../README.md#AiGatewayKey)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## createAiGatewayImageEdit

> AiGatewayImagesResponse createAiGatewayImageEdit(model, image, prompt, opts)

Редактирование изображений

Чтобы изменить или дополнить изображения по описанию, отправьте POST-запрос на &#x60;/v1/images/edits&#x60; (multipart/form-data).  Доступно для моделей GPT Image (&#x60;openai/gpt-image-*&#x60;) и FLUX.2 (&#x60;black_forest_labs/flux-2-*&#x60;). Для других моделей, в том числе неизвестных, возвращается ошибка 405.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer access token for authorization: AiGatewayKey
let AiGatewayKey = defaultClient.authentications['AiGatewayKey'];
AiGatewayKey.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AIGatewayInferenceApi();
let model = "model_example"; // String | ID модели: GPT Image (`openai/gpt-image-*`) или FLUX.2 (`black_forest_labs/flux-2-*`)
let image = "/path/to/file"; // File | Исходное изображение или несколько файлов в поле `image[]`
let prompt = "prompt_example"; // String | Что изменить
let opts = {
  'mask': "/path/to/file", // File | Маска: прозрачные области будут изменены
  'n': 1, // Number | Количество изображений
  'size': "size_example", // String | Размер изображения
  'quality': "quality_example" // String | Качество изображения
};
apiInstance.createAiGatewayImageEdit(model, image, prompt, opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **model** | **String**| ID модели: GPT Image (&#x60;openai/gpt-image-*&#x60;) или FLUX.2 (&#x60;black_forest_labs/flux-2-*&#x60;) | 
 **image** | **File**| Исходное изображение или несколько файлов в поле &#x60;image[]&#x60; | 
 **prompt** | **String**| Что изменить | 
 **mask** | **File**| Маска: прозрачные области будут изменены | [optional] 
 **n** | **Number**| Количество изображений | [optional] [default to 1]
 **size** | **String**| Размер изображения | [optional] 
 **quality** | **String**| Качество изображения | [optional] 

### Return type

[**AiGatewayImagesResponse**](AiGatewayImagesResponse.md)

### Authorization

[AiGatewayKey](../README.md#AiGatewayKey)

### HTTP request headers

- **Content-Type**: multipart/form-data
- **Accept**: application/json


## createAiGatewayResponse

> AiGatewayResponse createAiGatewayResponse(requestBody)

Создание ответа (Responses API)

Чтобы получить ответ модели через OpenAI Responses API, отправьте POST-запрос на &#x60;/v1/responses&#x60;.  Диалог можно продолжить по &#x60;previous_response_id&#x60;, долгие запросы — выполнить в фоне с &#x60;\&quot;background\&quot;: true&#x60; и получать результат через &#x60;GET /v1/responses/{response_id}&#x60;.  С &#x60;\&quot;stream\&quot;: true&#x60; ответ приходит потоком типизированных событий Server-Sent Events (&#x60;response.created&#x60;, &#x60;response.output_text.delta&#x60;, &#x60;response.completed&#x60; и др.), в конце потока — &#x60;data: [DONE]&#x60;.  Если у ключа настроены запасные модели и запрошенная модель не ответила, запрос повторяется на запасных (заголовок &#x60;x-timeweb-attempted-fallbacks&#x60;).

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer access token for authorization: AiGatewayKey
let AiGatewayKey = defaultClient.authentications['AiGatewayKey'];
AiGatewayKey.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AIGatewayInferenceApi();
let requestBody = {key: null}; // {String: Object} | 
apiInstance.createAiGatewayResponse(requestBody, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **requestBody** | [**{String: Object}**](Object.md)|  | 

### Return type

[**AiGatewayResponse**](AiGatewayResponse.md)

### Authorization

[AiGatewayKey](../README.md#AiGatewayKey)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json, text/event-stream


## createAiGatewaySpeech

> File createAiGatewaySpeech(requestBody)

Синтез речи

Чтобы озвучить текст, отправьте POST-запрос на &#x60;/v1/audio/speech&#x60;.  Используйте модель с &#x60;mode: audio_speech&#x60; из &#x60;GET /v1/models&#x60;. Ответ — аудиофайл в формате &#x60;response_format&#x60; (по умолчанию &#x60;mp3&#x60;).

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer access token for authorization: AiGatewayKey
let AiGatewayKey = defaultClient.authentications['AiGatewayKey'];
AiGatewayKey.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AIGatewayInferenceApi();
let requestBody = {key: null}; // {String: Object} | 
apiInstance.createAiGatewaySpeech(requestBody, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **requestBody** | [**{String: Object}**](Object.md)|  | 

### Return type

**File**

### Authorization

[AiGatewayKey](../README.md#AiGatewayKey)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: audio/mpeg, audio/wav, application/json


## createAiGatewayTranscription

> AiGatewayTranscription createAiGatewayTranscription(file, model, opts)

Распознавание речи

Чтобы распознать речь в аудиофайле, отправьте POST-запрос на &#x60;/v1/audio/transcriptions&#x60; (multipart/form-data).  Доступно для моделей распознавания речи &#x60;*-transcribe&#x60; (например, &#x60;openai/gpt-4o-mini-transcribe&#x60;). Для других моделей, в том числе неизвестных, возвращается ошибка 405. Ответ возвращается в JSON.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer access token for authorization: AiGatewayKey
let AiGatewayKey = defaultClient.authentications['AiGatewayKey'];
AiGatewayKey.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AIGatewayInferenceApi();
let file = "/path/to/file"; // File | Аудиофайл
let model = "model_example"; // String | ID модели распознавания речи (`*-transcribe`)
let opts = {
  'language': "language_example", // String | Язык аудио в формате ISO-639-1
  'prompt': "prompt_example", // String | Подсказка для распознавания: термины, имена, стиль
  'responseFormat': "responseFormat_example", // String | Формат ответа
  'temperature': 3.4 // Number | Температура выборки
};
apiInstance.createAiGatewayTranscription(file, model, opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **file** | **File**| Аудиофайл | 
 **model** | **String**| ID модели распознавания речи (&#x60;*-transcribe&#x60;) | 
 **language** | **String**| Язык аудио в формате ISO-639-1 | [optional] 
 **prompt** | **String**| Подсказка для распознавания: термины, имена, стиль | [optional] 
 **responseFormat** | **String**| Формат ответа | [optional] 
 **temperature** | **Number**| Температура выборки | [optional] 

### Return type

[**AiGatewayTranscription**](AiGatewayTranscription.md)

### Authorization

[AiGatewayKey](../README.md#AiGatewayKey)

### HTTP request headers

- **Content-Type**: multipart/form-data
- **Accept**: application/json


## deleteAiGatewayFile

> AiGatewayFileDeleted deleteAiGatewayFile(fileId)

Удаление файла

Чтобы удалить файл, отправьте DELETE-запрос на &#x60;/v1/files/{file_id}&#x60;.  Входной файл батча, который ещё выполняется или отменяется, и результаты батча, расход которого ещё не списан, удалить нельзя — вернётся ошибка 409.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer access token for authorization: AiGatewayKey
let AiGatewayKey = defaultClient.authentications['AiGatewayKey'];
AiGatewayKey.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AIGatewayInferenceApi();
let fileId = file-abc123; // String | ID файла
apiInstance.deleteAiGatewayFile(fileId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **fileId** | **String**| ID файла | 

### Return type

[**AiGatewayFileDeleted**](AiGatewayFileDeleted.md)

### Authorization

[AiGatewayKey](../README.md#AiGatewayKey)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## deleteAiGatewayResponse

> AiGatewayResponseDeleted deleteAiGatewayResponse(responseId)

Удаление ответа (Responses API)

Чтобы удалить сохранённый ответ, отправьте DELETE-запрос на &#x60;/v1/responses/{response_id}&#x60;.  Неизвестный или уже удалённый &#x60;response_id&#x60; возвращает ошибку 400.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer access token for authorization: AiGatewayKey
let AiGatewayKey = defaultClient.authentications['AiGatewayKey'];
AiGatewayKey.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AIGatewayInferenceApi();
let responseId = resp_abc123; // String | ID ответа Responses API
apiInstance.deleteAiGatewayResponse(responseId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **responseId** | **String**| ID ответа Responses API | 

### Return type

[**AiGatewayResponseDeleted**](AiGatewayResponseDeleted.md)

### Authorization

[AiGatewayKey](../README.md#AiGatewayKey)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## downloadAiGatewayFileContent

> File downloadAiGatewayFileContent(fileId)

Скачивание файла

Чтобы скачать содержимое файла — например, результаты выполненного батча (&#x60;output_file_id&#x60;), — отправьте GET-запрос на &#x60;/v1/files/{file_id}/content&#x60;.  Перед скачиванием результатов получите батч через &#x60;GET /v1/batches/{batch_id}&#x60; и убедитесь, что он в статусе &#x60;completed&#x60;. Файлы с &#x60;purpose&#x3D;user_data&#x60; скачать нельзя — вернётся ошибка 400.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer access token for authorization: AiGatewayKey
let AiGatewayKey = defaultClient.authentications['AiGatewayKey'];
AiGatewayKey.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AIGatewayInferenceApi();
let fileId = file-abc123; // String | ID файла
apiInstance.downloadAiGatewayFileContent(fileId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **fileId** | **String**| ID файла | 

### Return type

**File**

### Authorization

[AiGatewayKey](../README.md#AiGatewayKey)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/octet-stream, application/json


## getAiGatewayBatch

> AiGatewayBatch getAiGatewayBatch(batchId)

Получение батча

Чтобы получить статус батча, отправьте GET-запрос на &#x60;/v1/batches/{batch_id}&#x60;.  Когда статус станет &#x60;completed&#x60;, скачайте результаты по &#x60;output_file_id&#x60; через &#x60;GET /v1/files/{file_id}/content&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer access token for authorization: AiGatewayKey
let AiGatewayKey = defaultClient.authentications['AiGatewayKey'];
AiGatewayKey.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AIGatewayInferenceApi();
let batchId = batch_abc123; // String | ID батча
apiInstance.getAiGatewayBatch(batchId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **batchId** | **String**| ID батча | 

### Return type

[**AiGatewayBatch**](AiGatewayBatch.md)

### Authorization

[AiGatewayKey](../README.md#AiGatewayKey)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getAiGatewayBatches

> AiGatewayBatchList getAiGatewayBatches(opts)

Получение списка батчей

Чтобы получить список батчей, отправьте GET-запрос на &#x60;/v1/batches&#x60;.  Для следующей страницы передайте в &#x60;after&#x60; значение &#x60;last_id&#x60;, пока &#x60;has_more&#x60; равно &#x60;true&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer access token for authorization: AiGatewayKey
let AiGatewayKey = defaultClient.authentications['AiGatewayKey'];
AiGatewayKey.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AIGatewayInferenceApi();
let opts = {
  'limit': 20, // Number | Количество батчей на странице
  'after': batch_abc123 // String | Вернуть батчи после батча с этим ID (значение `last_id` предыдущей страницы)
};
apiInstance.getAiGatewayBatches(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **limit** | **Number**| Количество батчей на странице | [optional] 
 **after** | **String**| Вернуть батчи после батча с этим ID (значение &#x60;last_id&#x60; предыдущей страницы) | [optional] 

### Return type

[**AiGatewayBatchList**](AiGatewayBatchList.md)

### Authorization

[AiGatewayKey](../README.md#AiGatewayKey)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getAiGatewayFile

> AiGatewayFile getAiGatewayFile(fileId)

Получение информации о файле

Чтобы получить информацию о загруженном файле, отправьте GET-запрос на &#x60;/v1/files/{file_id}&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer access token for authorization: AiGatewayKey
let AiGatewayKey = defaultClient.authentications['AiGatewayKey'];
AiGatewayKey.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AIGatewayInferenceApi();
let fileId = file-abc123; // String | ID файла
apiInstance.getAiGatewayFile(fileId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **fileId** | **String**| ID файла | 

### Return type

[**AiGatewayFile**](AiGatewayFile.md)

### Authorization

[AiGatewayKey](../README.md#AiGatewayKey)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getAiGatewayModels

> AiGatewayModelList getAiGatewayModels()

Получение списка моделей AI Gateway

Чтобы получить список моделей, доступных ключу, отправьте GET-запрос на &#x60;/v1/models&#x60;.  Поле &#x60;mode&#x60; показывает назначение модели. В списке могут оставаться модели, снятые с обслуживания: запросы к ним возвращают ошибку 410. Актуальный статус, цены и возможности моделей — в каталоге &#x60;GET https://api.timeweb.cloud/api/v3/cloud-ai/models&#x60; (снятые модели — &#x60;is_stopped: true&#x60;).

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer access token for authorization: AiGatewayKey
let AiGatewayKey = defaultClient.authentications['AiGatewayKey'];
AiGatewayKey.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AIGatewayInferenceApi();
apiInstance.getAiGatewayModels((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**AiGatewayModelList**](AiGatewayModelList.md)

### Authorization

[AiGatewayKey](../README.md#AiGatewayKey)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getAiGatewayResponse

> AiGatewayResponse getAiGatewayResponse(responseId)

Получение ответа (Responses API)

Чтобы получить сохранённый ответ — например, дождаться завершения фонового ответа, — отправьте GET-запрос на &#x60;/v1/responses/{response_id}&#x60;.  Неизвестный или удалённый &#x60;response_id&#x60; возвращает ошибку 400.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer access token for authorization: AiGatewayKey
let AiGatewayKey = defaultClient.authentications['AiGatewayKey'];
AiGatewayKey.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AIGatewayInferenceApi();
let responseId = resp_abc123; // String | ID ответа Responses API
apiInstance.getAiGatewayResponse(responseId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **responseId** | **String**| ID ответа Responses API | 

### Return type

[**AiGatewayResponse**](AiGatewayResponse.md)

### Authorization

[AiGatewayKey](../README.md#AiGatewayKey)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## uploadAiGatewayFile

> AiGatewayFile uploadAiGatewayFile(file, purpose, opts)

Загрузка файла

Чтобы загрузить файл, отправьте POST-запрос на &#x60;/v1/files&#x60; (multipart/form-data).  Файл загружается для конкретной модели, поэтому &#x60;model&#x60; (или &#x60;target_model_names&#x60;) обязателен: - &#x60;purpose&#x3D;batch&#x60; — входной JSONL-файл Batch API. Все строки должны обращаться к одной модели — той, что указана в &#x60;model&#x60;, иначе вернётся 400. Размер — до 50 МБ и до 50 000 запросов; - &#x60;user_data&#x60; и другие назначения OpenAI — файлы, на которые можно сослаться по &#x60;file_id&#x60; в сообщениях.  Загрузка бесплатна. Сохраняйте &#x60;id&#x60; загруженных файлов: получить список файлов нельзя (&#x60;GET /v1/files&#x60; возвращает 405).

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer access token for authorization: AiGatewayKey
let AiGatewayKey = defaultClient.authentications['AiGatewayKey'];
AiGatewayKey.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AIGatewayInferenceApi();
let file = "/path/to/file"; // File | Файл. Для Batch API — JSONL, по одному запросу в строке
let purpose = "purpose_example"; // String | Назначение: `batch` — входной файл Batch API, `user_data` и другие назначения OpenAI — файлы для передачи модели
let opts = {
  'model': "model_example", // String | Модель, для которой загружается файл. Обязателен, если не передан `target_model_names`
  'targetModelNames': "targetModelNames_example" // String | Список моделей через запятую — вместо `model`
};
apiInstance.uploadAiGatewayFile(file, purpose, opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **file** | **File**| Файл. Для Batch API — JSONL, по одному запросу в строке | 
 **purpose** | **String**| Назначение: &#x60;batch&#x60; — входной файл Batch API, &#x60;user_data&#x60; и другие назначения OpenAI — файлы для передачи модели | 
 **model** | **String**| Модель, для которой загружается файл. Обязателен, если не передан &#x60;target_model_names&#x60; | [optional] 
 **targetModelNames** | **String**| Список моделей через запятую — вместо &#x60;model&#x60; | [optional] 

### Return type

[**AiGatewayFile**](AiGatewayFile.md)

### Authorization

[AiGatewayKey](../README.md#AiGatewayKey)

### HTTP request headers

- **Content-Type**: multipart/form-data
- **Accept**: application/json

