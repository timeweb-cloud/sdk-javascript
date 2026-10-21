# TimewebCloudApi.AISolutionsApi

All URIs are relative to *https://api.timeweb.cloud*

Method | HTTP request | Description
------------- | ------------- | -------------
[**addAiSolutionTelegramBot**](AISolutionsApi.md#addAiSolutionTelegramBot) | **POST** /api/v1/cloud-ai/solutions/{solution_id}/telegram/bots | Подключение Telegram-бота к AI-решению
[**approveAiSolutionTelegramPairing**](AISolutionsApi.md#approveAiSolutionTelegramPairing) | **POST** /api/v1/cloud-ai/solutions/{solution_id}/telegram/bots/{account_key}/pairing/approve | Подтверждение владельца Telegram-бота AI-решения
[**createAiSolution**](AISolutionsApi.md#createAiSolution) | **POST** /api/v1/cloud-ai/solutions | Создание AI-решения
[**deleteAiSolution**](AISolutionsApi.md#deleteAiSolution) | **DELETE** /api/v1/cloud-ai/solutions/{solution_id} | Удаление AI-решения
[**getAiSolution**](AISolutionsApi.md#getAiSolution) | **GET** /api/v1/cloud-ai/solutions/{solution_id} | Получение AI-решения
[**getAiSolutionChatFullHistory**](AISolutionsApi.md#getAiSolutionChatFullHistory) | **GET** /api/v1/cloud-ai/solutions/{solution_id}/chat/history | Получение всей истории чата AI-решения
[**getAiSolutionChatHistory**](AISolutionsApi.md#getAiSolutionChatHistory) | **GET** /api/v1/cloud-ai/solutions/{solution_id}/chat/conversations/{conversation_id}/messages | Получение истории разговора AI-решения
[**getAiSolutionChatStatus**](AISolutionsApi.md#getAiSolutionChatStatus) | **GET** /api/v1/cloud-ai/solutions/{solution_id}/chat/status | Получение статуса чата AI-решения
[**getAiSolutionMainChatHistory**](AISolutionsApi.md#getAiSolutionMainChatHistory) | **GET** /api/v1/cloud-ai/solutions/{solution_id}/chat/messages | Получение истории основного разговора AI-решения
[**listAiSolutionConversations**](AISolutionsApi.md#listAiSolutionConversations) | **GET** /api/v1/cloud-ai/solutions/{solution_id}/chat/conversations | Получение списка разговоров AI-решения
[**listAiSolutionTelegramBots**](AISolutionsApi.md#listAiSolutionTelegramBots) | **GET** /api/v1/cloud-ai/solutions/{solution_id}/telegram/bots | Получение списка Telegram-ботов AI-решения
[**listAiSolutionTypes**](AISolutionsApi.md#listAiSolutionTypes) | **GET** /api/v1/cloud-ai/solutions/types | Получение списка типов AI-решений
[**listAiSolutions**](AISolutionsApi.md#listAiSolutions) | **GET** /api/v1/cloud-ai/solutions | Получение списка AI-решений
[**regenerateAiSolutionAiKey**](AISolutionsApi.md#regenerateAiSolutionAiKey) | **POST** /api/v1/cloud-ai/solutions/{solution_id}/ai-key/regenerate | Перевыпуск ключа AI Gateway решения
[**removeAiSolutionTelegramBot**](AISolutionsApi.md#removeAiSolutionTelegramBot) | **DELETE** /api/v1/cloud-ai/solutions/{solution_id}/telegram/bots/{account_key} | Отключение Telegram-бота от AI-решения
[**resetAiSolutionChat**](AISolutionsApi.md#resetAiSolutionChat) | **POST** /api/v1/cloud-ai/solutions/{solution_id}/chat/reset | Сброс контекста разговора AI-решения
[**sendAiSolutionMessage**](AISolutionsApi.md#sendAiSolutionMessage) | **POST** /api/v1/cloud-ai/solutions/{solution_id}/chat/messages | Отправка сообщения агенту AI-решения
[**shutdownAiSolution**](AISolutionsApi.md#shutdownAiSolution) | **POST** /api/v1/cloud-ai/solutions/{solution_id}/shutdown | Выключение AI-решения
[**startAiSolution**](AISolutionsApi.md#startAiSolution) | **POST** /api/v1/cloud-ai/solutions/{solution_id}/start | Запуск AI-решения
[**stopAiSolutionChat**](AISolutionsApi.md#stopAiSolutionChat) | **POST** /api/v1/cloud-ai/solutions/{solution_id}/chat/stop | Остановка хода агента AI-решения
[**streamAiSolutionChat**](AISolutionsApi.md#streamAiSolutionChat) | **POST** /api/v1/cloud-ai/solutions/{solution_id}/chat/stream | Отправка сообщения агенту AI-решения с потоковым ответом
[**updateAiSolution**](AISolutionsApi.md#updateAiSolution) | **PATCH** /api/v1/cloud-ai/solutions/{solution_id} | Изменение AI-решения



## addAiSolutionTelegramBot

> AddAiSolutionTelegramBot201Response addAiSolutionTelegramBot(solutionId, connectTelegram)

Подключение Telegram-бота к AI-решению

Чтобы подключить Telegram-бота к решению, отправьте POST-запрос на &#x60;/api/v1/cloud-ai/solutions/{solution_id}/telegram/bots&#x60;.  Принимает токен бота от @BotFather, проверяет его в Telegram и настраивает бота на сервере решения. Владелец подтверждается кодом: пока он не подтверждён, бот никому не отвечает. Напишите боту в личные сообщения, получите в ответ код и передайте его в метод подтверждения владельца.  К решению можно подключить только одного бота: повторный запрос для того же бота обновляет его токен, для другого бота — возвращает 409 &#x60;ai_solution_already_has_a_connected_telegram_bot&#x60;. Если Telegram отклонил токен, ответ — 400 &#x60;ai_solution_telegram_token_is_invalid&#x60;.  Перед вызовом убедитесь, что чат готов (&#x60;ready: true&#x60; в методе получения статуса чата): пока сервер решения разворачивается или выключен, запрос завершается ошибкой.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AISolutionsApi();
let solutionId = 15; // Number | ID AI-решения
let connectTelegram = new TimewebCloudApi.ConnectTelegram(); // ConnectTelegram | 
apiInstance.addAiSolutionTelegramBot(solutionId, connectTelegram, (error, data, response) => {
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
 **solutionId** | **Number**| ID AI-решения | 
 **connectTelegram** | [**ConnectTelegram**](ConnectTelegram.md)|  | 

### Return type

[**AddAiSolutionTelegramBot201Response**](AddAiSolutionTelegramBot201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## approveAiSolutionTelegramPairing

> approveAiSolutionTelegramPairing(solutionId, accountKey, approveTelegramPairing)

Подтверждение владельца Telegram-бота AI-решения

Чтобы подтвердить владельца Telegram-бота, отправьте POST-запрос на &#x60;/api/v1/cloud-ai/solutions/{solution_id}/telegram/bots/{account_key}/pairing/approve&#x60;.  Передайте код, который бот прислал в личные сообщения в ответ на первое сообщение. После подтверждения агент отвечает этому пользователю Telegram в боте, а бот переходит в состояние &#x60;connected&#x60;. Владелец привязывается к конкретному боту. Повторный запрос с кодом, уже подтверждённым в последние 15 минут, считается успешным. Некорректный &#x60;account_key&#x60; — ответ 400 &#x60;ai_solution_telegram_token_is_invalid&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AISolutionsApi();
let solutionId = 15; // Number | ID AI-решения
let accountKey = b123456789; // String | ID Telegram-бота в решении (`account_key` из списка ботов) в формате `b<число>`, например `b123456789`
let approveTelegramPairing = new TimewebCloudApi.ApproveTelegramPairing(); // ApproveTelegramPairing | 
apiInstance.approveAiSolutionTelegramPairing(solutionId, accountKey, approveTelegramPairing, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **solutionId** | **Number**| ID AI-решения | 
 **accountKey** | **String**| ID Telegram-бота в решении (&#x60;account_key&#x60; из списка ботов) в формате &#x60;b&lt;число&gt;&#x60;, например &#x60;b123456789&#x60; | 
 **approveTelegramPairing** | [**ApproveTelegramPairing**](ApproveTelegramPairing.md)|  | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## createAiSolution

> CreateAiSolution201Response createAiSolution(createAiSolution)

Создание AI-решения

Чтобы создать AI-решение, отправьте POST-запрос на &#x60;/api/v1/cloud-ai/solutions&#x60;.  Выпускает для решения ключ AI Gateway и создаёт облачный сервер из образа решения; агент на сервере настраивается на выбранную модель через этот ключ. Сервер тарифицируется по выбранному тарифу, обращения к модели — через ключ AI Gateway.  Решение возвращается в статусе &#x60;creating&#x60;: развёртывание сервера и настройка агента занимают несколько минут. Дождитесь статуса &#x60;active&#x60;, а затем &#x60;ready: true&#x60; в методе получения статуса чата.  Тариф (&#x60;preset_id&#x60;) должен быть из той же локации, что и зона доступности (&#x60;availability_zone&#x60; или зона по умолчанию для региона аккаунта), иначе — 400 &#x60;invalid_location_zone&#x60;. Соответствие тарифа &#x60;requirements&#x60; типа решения при создании не проверяется — выбирайте тариф не ниже требований сами. Ответ 409 &#x60;no_free_node&#x60; означает, что в выбранной зоне сейчас нет свободных ресурсов под этот тариф — выберите другой тариф или зону. Неподходящая или устаревшая модель — 404 &#x60;model_not_found&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AISolutionsApi();
let createAiSolution = new TimewebCloudApi.CreateAiSolution(); // CreateAiSolution | 
apiInstance.createAiSolution(createAiSolution, (error, data, response) => {
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
 **createAiSolution** | [**CreateAiSolution**](CreateAiSolution.md)|  | 

### Return type

[**CreateAiSolution201Response**](CreateAiSolution201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deleteAiSolution

> deleteAiSolution(solutionId)

Удаление AI-решения

Чтобы удалить AI-решение, отправьте DELETE-запрос на &#x60;/api/v1/cloud-ai/solutions/{solution_id}&#x60;.  Решение удаляется вместе с сервером и ключом AI Gateway. Действие необратимо: решение и история его чата становятся недоступны.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AISolutionsApi();
let solutionId = 15; // Number | ID AI-решения
apiInstance.deleteAiSolution(solutionId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **solutionId** | **Number**| ID AI-решения | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getAiSolution

> CreateAiSolution201Response getAiSolution(solutionId)

Получение AI-решения

Чтобы получить AI-решение, отправьте GET-запрос на &#x60;/api/v1/cloud-ai/solutions/{solution_id}&#x60;.  Статус решения выводится из текущего состояния его сервера. Тело ответа будет представлять собой объект JSON с ключом &#x60;ai_solution&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AISolutionsApi();
let solutionId = 15; // Number | ID AI-решения
apiInstance.getAiSolution(solutionId, (error, data, response) => {
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
 **solutionId** | **Number**| ID AI-решения | 

### Return type

[**CreateAiSolution201Response**](CreateAiSolution201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getAiSolutionChatFullHistory

> GetAiSolutionMainChatHistory200Response getAiSolutionChatFullHistory(solutionId, opts)

Получение всей истории чата AI-решения

Чтобы получить сообщения всех разговоров решения, отправьте GET-запрос на &#x60;/api/v1/cloud-ai/solutions/{solution_id}/chat/history&#x60;.  В отличие от &#x60;chat/messages&#x60; (только основной разговор) и &#x60;chat/conversations/{conversation_id}/messages&#x60; (конкретный разговор), возвращает сообщения из всех разговоров сразу. Сообщения отсортированы по дате создания от новых к старым. Тело ответа будет представлять собой объект JSON с ключами &#x60;ai_solution_chat_messages&#x60; и &#x60;meta&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AISolutionsApi();
let solutionId = 15; // Number | ID AI-решения
let opts = {
  'limit': 100, // Number | Количество сообщений на странице, от 1 до 10 000
  'offset': 0 // Number | Количество сообщений, которые нужно пропустить
};
apiInstance.getAiSolutionChatFullHistory(solutionId, opts, (error, data, response) => {
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
 **solutionId** | **Number**| ID AI-решения | 
 **limit** | **Number**| Количество сообщений на странице, от 1 до 10 000 | [optional] [default to 100]
 **offset** | **Number**| Количество сообщений, которые нужно пропустить | [optional] [default to 0]

### Return type

[**GetAiSolutionMainChatHistory200Response**](GetAiSolutionMainChatHistory200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getAiSolutionChatHistory

> GetAiSolutionMainChatHistory200Response getAiSolutionChatHistory(solutionId, conversationId, opts)

Получение истории разговора AI-решения

Чтобы получить историю разговора, отправьте GET-запрос на &#x60;/api/v1/cloud-ai/solutions/{solution_id}/chat/conversations/{conversation_id}/messages&#x60;.  Сообщения отсортированы по дате создания от новых к старым: первая страница — последние сообщения разговора. Для несуществующего разговора возвращается пустой список. Тело ответа будет представлять собой объект JSON с ключами &#x60;ai_solution_chat_messages&#x60; и &#x60;meta&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AISolutionsApi();
let solutionId = 15; // Number | ID AI-решения
let conversationId = solution-15; // String | ID разговора. У основного разговора решения — `solution-<solution_id>`
let opts = {
  'limit': 100, // Number | Количество сообщений на странице, от 1 до 10 000
  'offset': 0 // Number | Количество сообщений, которые нужно пропустить
};
apiInstance.getAiSolutionChatHistory(solutionId, conversationId, opts, (error, data, response) => {
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
 **solutionId** | **Number**| ID AI-решения | 
 **conversationId** | **String**| ID разговора. У основного разговора решения — &#x60;solution-&lt;solution_id&gt;&#x60; | 
 **limit** | **Number**| Количество сообщений на странице, от 1 до 10 000 | [optional] [default to 100]
 **offset** | **Number**| Количество сообщений, которые нужно пропустить | [optional] [default to 0]

### Return type

[**GetAiSolutionMainChatHistory200Response**](GetAiSolutionMainChatHistory200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getAiSolutionChatStatus

> GetAiSolutionChatStatus200Response getAiSolutionChatStatus(solutionId)

Получение статуса чата AI-решения

Чтобы узнать, готов ли агент решения принимать сообщения, отправьте GET-запрос на &#x60;/api/v1/cloud-ai/solutions/{solution_id}/chat/status&#x60;.  Готовность чата отличается от статуса решения: тот выводится из состояния сервера, а сервер включается задолго до того, как будет установлено и настроено ПО агента. После создания или запуска решения опрашивайте этот метод, пока &#x60;ready&#x60; не станет &#x60;true&#x60;. Тело ответа будет представлять собой объект JSON с ключом &#x60;ai_solution_chat_status&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AISolutionsApi();
let solutionId = 15; // Number | ID AI-решения
apiInstance.getAiSolutionChatStatus(solutionId, (error, data, response) => {
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
 **solutionId** | **Number**| ID AI-решения | 

### Return type

[**GetAiSolutionChatStatus200Response**](GetAiSolutionChatStatus200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getAiSolutionMainChatHistory

> GetAiSolutionMainChatHistory200Response getAiSolutionMainChatHistory(solutionId, opts)

Получение истории основного разговора AI-решения

Чтобы получить историю основного разговора решения, отправьте GET-запрос на &#x60;/api/v1/cloud-ai/solutions/{solution_id}/chat/messages&#x60;.  ID основного разговора знать не нужно; для других разговоров используйте метод с явным &#x60;conversation_id&#x60;. Сообщения отсортированы по дате создания от новых к старым: первая страница — последние сообщения. Тело ответа будет представлять собой объект JSON с ключами &#x60;ai_solution_chat_messages&#x60; и &#x60;meta&#x60; (&#x60;meta.total&#x60; — общее количество сообщений).

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AISolutionsApi();
let solutionId = 15; // Number | ID AI-решения
let opts = {
  'limit': 100, // Number | Количество сообщений на странице, от 1 до 10 000
  'offset': 0 // Number | Количество сообщений, которые нужно пропустить
};
apiInstance.getAiSolutionMainChatHistory(solutionId, opts, (error, data, response) => {
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
 **solutionId** | **Number**| ID AI-решения | 
 **limit** | **Number**| Количество сообщений на странице, от 1 до 10 000 | [optional] [default to 100]
 **offset** | **Number**| Количество сообщений, которые нужно пропустить | [optional] [default to 0]

### Return type

[**GetAiSolutionMainChatHistory200Response**](GetAiSolutionMainChatHistory200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## listAiSolutionConversations

> ListAiSolutionConversations200Response listAiSolutionConversations(solutionId)

Получение списка разговоров AI-решения

Чтобы получить список разговоров с агентом решения, отправьте GET-запрос на &#x60;/api/v1/cloud-ai/solutions/{solution_id}/chat/conversations&#x60;.  Возвращает все разговоры решения, в которых есть сообщения, включая основной, отсортированные по дате последнего сообщения от новых к старым. Тело ответа будет представлять собой объект JSON с ключами &#x60;ai_solution_conversations&#x60; и &#x60;meta&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AISolutionsApi();
let solutionId = 15; // Number | ID AI-решения
apiInstance.listAiSolutionConversations(solutionId, (error, data, response) => {
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
 **solutionId** | **Number**| ID AI-решения | 

### Return type

[**ListAiSolutionConversations200Response**](ListAiSolutionConversations200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## listAiSolutionTelegramBots

> ListAiSolutionTelegramBots200Response listAiSolutionTelegramBots(solutionId)

Получение списка Telegram-ботов AI-решения

Чтобы получить список Telegram-ботов решения, отправьте GET-запрос на &#x60;/api/v1/cloud-ai/solutions/{solution_id}/telegram/bots&#x60;.  Возвращает подключённых к решению ботов и состояние их подтверждения. Список читается с сервера решения. Тело ответа будет представлять собой объект JSON с ключами &#x60;ai_solution_telegram_bots&#x60; и &#x60;meta&#x60;.  Перед вызовом убедитесь, что чат готов (&#x60;ready: true&#x60; в методе получения статуса чата): пока сервер решения разворачивается или выключен, запрос завершается ошибкой.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AISolutionsApi();
let solutionId = 15; // Number | ID AI-решения
apiInstance.listAiSolutionTelegramBots(solutionId, (error, data, response) => {
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
 **solutionId** | **Number**| ID AI-решения | 

### Return type

[**ListAiSolutionTelegramBots200Response**](ListAiSolutionTelegramBots200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## listAiSolutionTypes

> ListAiSolutionTypes200Response listAiSolutionTypes()

Получение списка типов AI-решений

Чтобы получить список типов AI-решений, отправьте GET-запрос на &#x60;/api/v1/cloud-ai/solutions/types&#x60;.  Возвращает каталог готовых решений, которые можно развернуть на облачном сервере, с минимальными требованиями к конфигурации сервера (&#x60;requirements&#x60;). Тело ответа будет представлять собой объект JSON с ключами &#x60;ai_solution_types&#x60; и &#x60;meta&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AISolutionsApi();
apiInstance.listAiSolutionTypes((error, data, response) => {
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

[**ListAiSolutionTypes200Response**](ListAiSolutionTypes200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## listAiSolutions

> ListAiSolutions200Response listAiSolutions()

Получение списка AI-решений

Чтобы получить список AI-решений аккаунта, отправьте GET-запрос на &#x60;/api/v1/cloud-ai/solutions&#x60;.  Возвращает все решения аккаунта, кроме удалённых. Статус каждого решения выводится из текущего состояния его сервера. Тело ответа будет представлять собой объект JSON с ключами &#x60;ai_solutions&#x60; и &#x60;meta&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AISolutionsApi();
apiInstance.listAiSolutions((error, data, response) => {
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

[**ListAiSolutions200Response**](ListAiSolutions200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## regenerateAiSolutionAiKey

> RegenerateAiSolutionAiKey200Response regenerateAiSolutionAiKey(solutionId)

Перевыпуск ключа AI Gateway решения

Чтобы перевыпустить ключ AI Gateway решения, отправьте POST-запрос на &#x60;/api/v1/cloud-ai/solutions/{solution_id}/ai-key/regenerate&#x60;.  Единственный способ сменить этот ключ: он выпущен платформой для решения и в разделе AI Gateway доступен только для чтения. Новый ключ сразу записывается в конфигурацию агента на сервере решения, старый перестаёт работать немедленно. Сервер должен быть включён и полностью развёрнут — это проверяется до перевыпуска, потому что отменить его нельзя. Если записать новый ключ на сервер не удалось, повторите запрос.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AISolutionsApi();
let solutionId = 15; // Number | ID AI-решения
apiInstance.regenerateAiSolutionAiKey(solutionId, (error, data, response) => {
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
 **solutionId** | **Number**| ID AI-решения | 

### Return type

[**RegenerateAiSolutionAiKey200Response**](RegenerateAiSolutionAiKey200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## removeAiSolutionTelegramBot

> removeAiSolutionTelegramBot(solutionId, accountKey)

Отключение Telegram-бота от AI-решения

Чтобы отключить Telegram-бота от решения, отправьте DELETE-запрос на &#x60;/api/v1/cloud-ai/solutions/{solution_id}/telegram/bots/{account_key}&#x60;.  Удаляет бота из конфигурации сервера решения: агент перестаёт отвечать в этом боте. Если бот не подключён, запрос всё равно возвращает 204. Некорректный &#x60;account_key&#x60; — ответ 400 &#x60;ai_solution_telegram_token_is_invalid&#x60;.  Перед вызовом убедитесь, что чат готов (&#x60;ready: true&#x60; в методе получения статуса чата): пока сервер решения разворачивается или выключен, запрос завершается ошибкой.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AISolutionsApi();
let solutionId = 15; // Number | ID AI-решения
let accountKey = b123456789; // String | ID Telegram-бота в решении (`account_key` из списка ботов) в формате `b<число>`, например `b123456789`
apiInstance.removeAiSolutionTelegramBot(solutionId, accountKey, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **solutionId** | **Number**| ID AI-решения | 
 **accountKey** | **String**| ID Telegram-бота в решении (&#x60;account_key&#x60; из списка ботов) в формате &#x60;b&lt;число&gt;&#x60;, например &#x60;b123456789&#x60; | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## resetAiSolutionChat

> ResetAiSolutionChat200Response resetAiSolutionChat(solutionId, opts)

Сброс контекста разговора AI-решения

Чтобы сбросить контекст разговора, отправьте POST-запрос на &#x60;/api/v1/cloud-ai/solutions/{solution_id}/chat/reset&#x60;.  Контекст сбрасывается на месте: разговор сохраняет &#x60;conversation_id&#x60;, но агент больше не видит предыдущих сообщений. Без &#x60;conversation_id&#x60; сбрасывается основной разговор решения. В историю добавляется служебное сообщение с ролью &#x60;context-reset&#x60;, отмечающее границу текущего контекста, — оно и возвращается в ответе (с ключом &#x60;ai_solution_chat_message&#x60;). Отметка добавляется и для разговора, в котором ещё не было сообщений.  Перед вызовом убедитесь, что чат готов (&#x60;ready: true&#x60; в методе получения статуса чата): пока сервер решения разворачивается или выключен, запрос завершается ошибкой.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AISolutionsApi();
let solutionId = 15; // Number | ID AI-решения
let opts = {
  'resetAiSolutionChat': new TimewebCloudApi.ResetAiSolutionChat() // ResetAiSolutionChat | 
};
apiInstance.resetAiSolutionChat(solutionId, opts, (error, data, response) => {
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
 **solutionId** | **Number**| ID AI-решения | 
 **resetAiSolutionChat** | [**ResetAiSolutionChat**](ResetAiSolutionChat.md)|  | [optional] 

### Return type

[**ResetAiSolutionChat200Response**](ResetAiSolutionChat200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## sendAiSolutionMessage

> SendAiSolutionMessage200Response sendAiSolutionMessage(solutionId, sendAiSolutionMessage)

Отправка сообщения агенту AI-решения

Чтобы отправить сообщение агенту решения, отправьте POST-запрос на &#x60;/api/v1/cloud-ai/solutions/{solution_id}/chat/messages&#x60;.  Ответ возвращается целиком после завершения хода агента (ожидание — до 3 минут). Без &#x60;conversation_id&#x60; сообщение уходит в основной разговор решения; новый разговор начинается только при явной передаче нового ID. Без &#x60;message&#x60; агент сам здоровается — так можно показать первую реплику чата. Чтобы получать ответ по мере генерации, используйте потоковый метод.  Перед вызовом убедитесь, что чат готов (&#x60;ready: true&#x60; в методе получения статуса чата): пока сервер решения разворачивается или выключен, запрос завершается ошибкой.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AISolutionsApi();
let solutionId = 15; // Number | ID AI-решения
let sendAiSolutionMessage = new TimewebCloudApi.SendAiSolutionMessage(); // SendAiSolutionMessage | 
apiInstance.sendAiSolutionMessage(solutionId, sendAiSolutionMessage, (error, data, response) => {
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
 **solutionId** | **Number**| ID AI-решения | 
 **sendAiSolutionMessage** | [**SendAiSolutionMessage**](SendAiSolutionMessage.md)|  | 

### Return type

[**SendAiSolutionMessage200Response**](SendAiSolutionMessage200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## shutdownAiSolution

> shutdownAiSolution(solutionId)

Выключение AI-решения

Чтобы выключить AI-решение, отправьте POST-запрос на &#x60;/api/v1/cloud-ai/solutions/{solution_id}/shutdown&#x60;.  Выключает сервер решения. Действие асинхронное: следите за результатом по статусу решения (обычно 1–2 минуты до &#x60;stopped&#x60;). Пока сервер выключен, чат недоступен, а сервер продолжает тарифицироваться. Выключение уже выключенного решения возвращает 204. Пока над сервером выполняется другое действие, ответ — 409 &#x60;ai_solution_is_busy&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AISolutionsApi();
let solutionId = 15; // Number | ID AI-решения
apiInstance.shutdownAiSolution(solutionId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **solutionId** | **Number**| ID AI-решения | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## startAiSolution

> startAiSolution(solutionId)

Запуск AI-решения

Чтобы запустить AI-решение, отправьте POST-запрос на &#x60;/api/v1/cloud-ai/solutions/{solution_id}/start&#x60;.  Включает сервер решения. Действие асинхронное: следите за результатом по статусу решения, а готовность агента проверяйте методом получения статуса чата. Пока над сервером выполняется действие, запуск и выключение возвращают 409 &#x60;ai_solution_is_busy&#x60;.  Не вызывайте метод для работающего решения: запрос будет принят (204) и запустит действие над сервером, а решение на несколько минут станет занятым.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AISolutionsApi();
let solutionId = 15; // Number | ID AI-решения
apiInstance.startAiSolution(solutionId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **solutionId** | **Number**| ID AI-решения | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## stopAiSolutionChat

> stopAiSolutionChat(solutionId, opts)

Остановка хода агента AI-решения

Чтобы остановить текущий ход агента, отправьте POST-запрос на &#x60;/api/v1/cloud-ai/solutions/{solution_id}/chat/stop&#x60;.  Прерывает генерацию ответа — например, если ответ зациклился или тратит слишком много токенов. Без &#x60;conversation_id&#x60; останавливается текущий ход основного разговора решения. Ход прерывается на стороне агента: закрыть соединение недостаточно, потому что принятый агентом ход продолжает выполняться независимо от клиента. Если хода нет, запрос всё равно возвращает 204.  Перед вызовом убедитесь, что чат готов (&#x60;ready: true&#x60; в методе получения статуса чата): пока сервер решения разворачивается или выключен, запрос завершается ошибкой.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AISolutionsApi();
let solutionId = 15; // Number | ID AI-решения
let opts = {
  'stopAiSolutionChat': new TimewebCloudApi.StopAiSolutionChat() // StopAiSolutionChat | 
};
apiInstance.stopAiSolutionChat(solutionId, opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **solutionId** | **Number**| ID AI-решения | 
 **stopAiSolutionChat** | [**StopAiSolutionChat**](StopAiSolutionChat.md)|  | [optional] 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## streamAiSolutionChat

> String streamAiSolutionChat(solutionId, sendAiSolutionMessage)

Отправка сообщения агенту AI-решения с потоковым ответом

Чтобы отправить сообщение агенту решения и получать ответ потоком, отправьте POST-запрос на &#x60;https://agent.timeweb.cloud/api/v1/cloud-ai/solutions/{solution_id}/chat/stream&#x60;.  Метод работает на &#x60;https://agent.timeweb.cloud&#x60;, а не на &#x60;https://api.timeweb.cloud&#x60;: шлюз публичного API накапливает ответ целиком и не может передавать его по частям. Авторизация та же — API-токен в заголовке &#x60;Authorization&#x60;; токену с ограниченными правами нужен доступ на запись к AI-сервисам. Тело запроса такое же, как у метода отправки сообщения.  Ответ — &#x60;text/event-stream&#x60;: каждое событие приходит как &#x60;event: &lt;тип&gt;&#x60; и &#x60;data: &lt;JSON&gt;&#x60;. Отправка сообщения и подписка на ответ — один запрос, поэтому начало ответа не теряется. Строки, начинающиеся с &#x60;:&#x60;, — комментарии для поддержания соединения (каждые 15 секунд), их нужно игнорировать. ID разговора возвращается в заголовке ответа &#x60;X-Conversation-Id&#x60;.  Типы событий: - &#x60;subscribed&#x60; &#x60;{}&#x60; — ход принят; - &#x60;delta&#x60; &#x60;{text, seq, runId}&#x60; — очередной фрагмент ответа; - &#x60;tool&#x60; &#x60;{name, target, phase, status, seq, runId}&#x60; — агент использует инструмент; - &#x60;message&#x60; &#x60;{text, seq, id, stopReason}&#x60; — финальный ответ целиком, всегда после последнего &#x60;delta&#x60;; - &#x60;done&#x60; &#x60;{phase, seq, runId}&#x60; — ход завершён; - &#x60;error&#x60; &#x60;{reason, message, budget?}&#x60; — ход не удался. &#x60;reason&#x60;: &#x60;empty_reply&#x60; — агент не выдал текста; &#x60;stream_failed&#x60; — поток прервался; &#x60;agent_failed&#x60; — ход упал на стороне агента при исправном соединении, повтор имеет смысл; &#x60;budget_exceeded&#x60; — исчерпан лимит расходов ключа AI Gateway решения, в &#x60;budget&#x60; &#x60;{max, spent, resetAt}&#x60; — цифры лимита, если они известны. &#x60;error&#x60; всегда последнее событие потока и может прийти после &#x60;done&#x60; (например, с &#x60;empty_reply&#x60;).  Ошибки, возникшие до начала потока (решение не найдено, некорректный запрос, нет доступа), возвращаются обычным JSON-ответом с соответствующим HTTP-статусом. Если сервер решения выключен или недоступен, поток может открыться и сразу завершиться событием &#x60;error&#x60; с &#x60;reason: stream_failed&#x60; — проверяйте готовность чата заранее методом получения статуса чата.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AISolutionsApi();
let solutionId = 15; // Number | ID AI-решения
let sendAiSolutionMessage = new TimewebCloudApi.SendAiSolutionMessage(); // SendAiSolutionMessage | 
apiInstance.streamAiSolutionChat(solutionId, sendAiSolutionMessage, (error, data, response) => {
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
 **solutionId** | **Number**| ID AI-решения | 
 **sendAiSolutionMessage** | [**SendAiSolutionMessage**](SendAiSolutionMessage.md)|  | 

### Return type

**String**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/event-stream, application/json


## updateAiSolution

> CreateAiSolution201Response updateAiSolution(solutionId, updateAiSolution)

Изменение AI-решения

Чтобы изменить AI-решение, отправьте PATCH-запрос на &#x60;/api/v1/cloud-ai/solutions/{solution_id}&#x60;.  Меняются только переданные поля; &#x60;description: null&#x60; очищает описание. Смена модели переписывает конфигурацию агента на сервере решения и перезапускает агента, поэтому сервер должен быть включён и полностью развёрнут — иначе запрос завершится ошибкой и ничего не изменится. Смена только названия или описания сервер не затрагивает. Неподходящая модель — 404 &#x60;model_not_found&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AISolutionsApi();
let solutionId = 15; // Number | ID AI-решения
let updateAiSolution = new TimewebCloudApi.UpdateAiSolution(); // UpdateAiSolution | 
apiInstance.updateAiSolution(solutionId, updateAiSolution, (error, data, response) => {
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
 **solutionId** | **Number**| ID AI-решения | 
 **updateAiSolution** | [**UpdateAiSolution**](UpdateAiSolution.md)|  | 

### Return type

[**CreateAiSolution201Response**](CreateAiSolution201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

