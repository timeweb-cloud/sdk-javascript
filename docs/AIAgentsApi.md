# TimewebCloudApi.AIAgentsApi

All URIs are relative to *https://api.timeweb.cloud*

Method | HTTP request | Description
------------- | ------------- | -------------
[**addAdditionalTokenPackage**](AIAgentsApi.md#addAdditionalTokenPackage) | **POST** /api/v1/cloud-ai/agents/{id}/add-additional-token-package | Добавление дополнительного пакета токенов
[**changeAgentModel**](AIAgentsApi.md#changeAgentModel) | **PATCH** /api/v1/cloud-ai/agents/{id}/model | Смена модели AI агента
[**createAgent**](AIAgentsApi.md#createAgent) | **POST** /api/v1/cloud-ai/agents | Создание AI агента
[**createAgentEntityLimit**](AIAgentsApi.md#createAgentEntityLimit) | **POST** /api/v1/cloud-ai/agents/{id}/entity-limits | Создание лимита агента
[**createAgentV2**](AIAgentsApi.md#createAgentV2) | **POST** /api/v2/cloud-ai/agents | Создание AI агента
[**deleteAgent**](AIAgentsApi.md#deleteAgent) | **DELETE** /api/v1/cloud-ai/agents/{id} | Удаление AI агента
[**deleteAgentEntityLimit**](AIAgentsApi.md#deleteAgentEntityLimit) | **DELETE** /api/v1/cloud-ai/agents/{id}/entity-limits/{limit_id} | Удаление лимита агента
[**exportAgentChatsCsv**](AIAgentsApi.md#exportAgentChatsCsv) | **GET** /api/v1/cloud-ai/agents/{id}/chats/docs | Выгрузка чатов агента в CSV
[**getAgent**](AIAgentsApi.md#getAgent) | **GET** /api/v1/cloud-ai/agents/{id} | Получение AI агента
[**getAgentChatList**](AIAgentsApi.md#getAgentChatList) | **GET** /api/v1/cloud-ai/agents/{id}/chat-list | Получение списка чатов агента
[**getAgentChatMessages**](AIAgentsApi.md#getAgentChatMessages) | **GET** /api/v1/cloud-ai/agents/{id}/chat-list/{chat_id}/messages | Получение сообщений чата агента
[**getAgentEntityLimit**](AIAgentsApi.md#getAgentEntityLimit) | **GET** /api/v1/cloud-ai/agents/{id}/entity-limits/{limit_id} | Получение лимита агента
[**getAgentEntityLimits**](AIAgentsApi.md#getAgentEntityLimits) | **GET** /api/v1/cloud-ai/agents/{id}/entity-limits | Получение лимитов агента
[**getAgentStatistics**](AIAgentsApi.md#getAgentStatistics) | **GET** /api/v1/cloud-ai/agents/{id}/statistic | Получение статистики использования токенов агента
[**getAgentV3**](AIAgentsApi.md#getAgentV3) | **GET** /api/v3/cloud-ai/agents/{id} | Получение AI агента (v3)
[**getAgents**](AIAgentsApi.md#getAgents) | **GET** /api/v1/cloud-ai/agents | Получение списка AI агентов
[**getAgentsV3**](AIAgentsApi.md#getAgentsV3) | **GET** /api/v3/cloud-ai/agents | Получение списка AI агентов (v3)
[**syncAgentEntityLimits**](AIAgentsApi.md#syncAgentEntityLimits) | **PUT** /api/v1/cloud-ai/agents/{id}/entity-limits/sync | Синхронизация лимитов агента за период
[**updateAgent**](AIAgentsApi.md#updateAgent) | **PATCH** /api/v1/cloud-ai/agents/{id} | Обновление AI агента
[**updateAgentEntityLimit**](AIAgentsApi.md#updateAgentEntityLimit) | **PATCH** /api/v1/cloud-ai/agents/{id}/entity-limits/{limit_id} | Изменение лимита агента



## addAdditionalTokenPackage

> addAdditionalTokenPackage(id, opts)

Добавление дополнительного пакета токенов

Чтобы докупить дополнительные пакеты токенов для AI агента, отправьте POST-запрос на &#x60;/api/v1/cloud-ai/agents/{id}/add-additional-token-package&#x60;.  Метод относится к устаревшей схеме оплаты пакетами токенов и работает только для агентов с пакетом (&#x60;token_package_id&#x60; в ответе агента). Для агентов с поресурсной оплатой вернётся 400 &#x60;per-resource_agents_do_not_support_additional_token_packages&#x60;. Стоимость (цена дополнительного пакета модели агента × &#x60;count&#x60;) сразу списывается с баланса; при нехватке средств — 400 &#x60;insufficient_balance&#x60;, если подписка агента истекла — 400 &#x60;subscription_expired&#x60;. После покупки заблокированный агент разблокируется.  Для токенов дополнительных пользователей аккаунта нужна роль &#x60;ai:write&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AIAgentsApi();
let id = 1; // Number | ID агента
let opts = {
  'addTokenPackage': new TimewebCloudApi.AddTokenPackage() // AddTokenPackage | 
};
apiInstance.addAdditionalTokenPackage(id, opts, (error, data, response) => {
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
 **id** | **Number**| ID агента | 
 **addTokenPackage** | [**AddTokenPackage**](AddTokenPackage.md)|  | [optional] 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## changeAgentModel

> CreateAgent201Response changeAgentModel(id, changeAgentModel)

Смена модели AI агента

Чтобы сменить основную модель AI агента, отправьте PATCH-запрос на &#x60;/api/v1/cloud-ai/agents/{id}/model&#x60;.  Параметры модели из &#x60;settings.model&#x60;, которые новая модель не поддерживает, отбрасываются. Смена модели доступна только агентам с поресурсной оплатой (для агента с пакетом токенов — 400 &#x60;model_change_is_allowed_only_for_per-resource_account_and_agent&#x60;). Если модель не найдена или недоступна — 404 &#x60;model_not_found&#x60;.  Для токенов дополнительных пользователей аккаунта нужна роль &#x60;ai:write&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AIAgentsApi();
let id = 1; // Number | ID агента
let changeAgentModel = new TimewebCloudApi.ChangeAgentModel(); // ChangeAgentModel | 
apiInstance.changeAgentModel(id, changeAgentModel, (error, data, response) => {
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
 **id** | **Number**| ID агента | 
 **changeAgentModel** | [**ChangeAgentModel**](ChangeAgentModel.md)|  | 

### Return type

[**CreateAgent201Response**](CreateAgent201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## createAgent

> CreateAgent201Response createAgent(createAgent)

Создание AI агента

Чтобы создать AI агента, отправьте POST-запрос на &#x60;/api/v1/cloud-ai/agents&#x60;, задав необходимые атрибуты.  Метод устарел — используйте &#x60;POST /api/v2/cloud-ai/agents&#x60;. Поле &#x60;token_package_id&#x60; обязательно, но не учитывается: агент всегда создаётся с поресурсной оплатой (оплачиваются фактические запросы к модели).  Для токенов дополнительных пользователей аккаунта нужна роль &#x60;ai:write&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AIAgentsApi();
let createAgent = new TimewebCloudApi.CreateAgent(); // CreateAgent | 
apiInstance.createAgent(createAgent, (error, data, response) => {
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
 **createAgent** | [**CreateAgent**](CreateAgent.md)|  | 

### Return type

[**CreateAgent201Response**](CreateAgent201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## createAgentEntityLimit

> CreateAgentEntityLimit201Response createAgentEntityLimit(id, createAgentEntityLimit)

Создание лимита агента

Чтобы создать лимит AI агента, отправьте POST-запрос на &#x60;/api/v1/cloud-ai/agents/{id}/entity-limits&#x60;.  Лимиты агента ограничивают расход на его запросы за период (&#x60;hour&#x60;, &#x60;day&#x60;, &#x60;week&#x60;, &#x60;month&#x60;) — в токенах (&#x60;limit&#x60;) или в деньгах (&#x60;money_limit&#x60;, приоритетнее). Лимит действует на все модели агента (&#x60;model_id&#x60; &#x3D; &#x60;null&#x60;) или на одну модель. При достижении лимита запросы к агенту отклоняются до конца периода.  Нужно передать &#x60;limit&#x60; или &#x60;money_limit&#x60; (иначе — 400 &#x60;entity_keys_limit_value_required&#x60;). Если лимит с тем же периодом и моделью уже есть — 409 &#x60;entity_keys_limit_already_exists&#x60; (измените его или используйте синхронизацию).  Для токенов дополнительных пользователей аккаунта нужна роль &#x60;ai:write&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AIAgentsApi();
let id = 1; // Number | ID агента
let createAgentEntityLimit = new TimewebCloudApi.CreateAgentEntityLimit(); // CreateAgentEntityLimit | 
apiInstance.createAgentEntityLimit(id, createAgentEntityLimit, (error, data, response) => {
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
 **id** | **Number**| ID агента | 
 **createAgentEntityLimit** | [**CreateAgentEntityLimit**](CreateAgentEntityLimit.md)|  | 

### Return type

[**CreateAgentEntityLimit201Response**](CreateAgentEntityLimit201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## createAgentV2

> CreateAgent201Response createAgentV2(createAgentV2)

Создание AI агента

Чтобы создать AI агента, отправьте POST-запрос на &#x60;/api/v2/cloud-ai/agents&#x60;, задав необходимые атрибуты.  Агент создаётся с поресурсной оплатой: оплачиваются фактические запросы к модели. Если не переданы настройки виджета, подставляются значения по умолчанию. Дневной лимит расходов можно задать сразу полем &#x60;money_limit&#x60;, остальные лимиты — через лимиты агента (&#x60;/api/v1/cloud-ai/agents/{id}/entity-limits&#x60;).  Если модель не найдена или недоступна, вернётся 404 &#x60;model_not_found&#x60;; если модель не поддерживается — 400 &#x60;model_not_supported&#x60;; недопустимые параметры модели в &#x60;settings.model&#x60; — 400.  Вызывать созданного агента из своих приложений можно через OpenAI-совместимое API по его &#x60;access_id&#x60; — см. [документацию](https://agent.timeweb.cloud/docs).  Для токенов дополнительных пользователей аккаунта нужна роль &#x60;ai:write&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AIAgentsApi();
let createAgentV2 = new TimewebCloudApi.CreateAgentV2(); // CreateAgentV2 | 
apiInstance.createAgentV2(createAgentV2, (error, data, response) => {
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
 **createAgentV2** | [**CreateAgentV2**](CreateAgentV2.md)|  | 

### Return type

[**CreateAgent201Response**](CreateAgent201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deleteAgent

> deleteAgent(id, opts)

Удаление AI агента

Чтобы удалить AI агента, отправьте DELETE-запрос на &#x60;/api/v1/cloud-ai/agents/{id}&#x60;.  Вместе с агентом отключаются его базы знаний, навыки и интеграции (Telegram, MAX, Jivo, Crisp). В теле запроса можно необязательно указать причину удаления.  Для токенов дополнительных пользователей аккаунта нужна роль &#x60;ai:write&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AIAgentsApi();
let id = 1; // Number | ID агента
let opts = {
  'deleteAgent': new TimewebCloudApi.DeleteAgent() // DeleteAgent | 
};
apiInstance.deleteAgent(id, opts, (error, data, response) => {
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
 **id** | **Number**| ID агента | 
 **deleteAgent** | [**DeleteAgent**](DeleteAgent.md)|  | [optional] 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deleteAgentEntityLimit

> deleteAgentEntityLimit(id, limitId)

Удаление лимита агента

Чтобы удалить лимит AI агента, отправьте DELETE-запрос на &#x60;/api/v1/cloud-ai/agents/{id}/entity-limits/{limit_id}&#x60;.  Для токенов дополнительных пользователей аккаунта нужна роль &#x60;ai:write&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AIAgentsApi();
let id = 1; // Number | ID агента
let limitId = 550e8400-e29b-41d4-a716-446655440000; // String | ID лимита агента
apiInstance.deleteAgentEntityLimit(id, limitId, (error, data, response) => {
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
 **id** | **Number**| ID агента | 
 **limitId** | **String**| ID лимита агента | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## exportAgentChatsCsv

> ExportAgentChatsCsv200Response exportAgentChatsCsv(id, opts)

Выгрузка чатов агента в CSV

Чтобы выгрузить чаты AI агента в формате CSV, отправьте GET-запрос на &#x60;/api/v1/cloud-ai/agents/{id}/chats/docs&#x60;.  CSV возвращается строкой в поле &#x60;chats_csv.csv&#x60; тела JSON. &#x60;limit&#x60; и &#x60;offset&#x60; применяются к сообщениям, а не к чатам. Если передан &#x60;from&#x60;, выгружаются сообщения от &#x60;from&#x60; до &#x60;to&#x60; (по умолчанию — до текущего момента). Чаты внешнего чата не выгружаются.  Для токенов дополнительных пользователей аккаунта нужна роль &#x60;ai:read&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AIAgentsApi();
let id = 1; // Number | ID агента
let opts = {
  'offset': 0, // Number | Смещение относительно начала списка
  'limit': 100, // Number | Количество сообщений в ответе
  'order': desc, // String | Сортировка по дате сообщения
  'from': 2026-10-01T00:00Z, // Date | Начало периода (дата и время в формате ISO 8601)
  'to': 2026-10-20T23:59:59.999Z, // Date | Конец периода (дата и время в формате ISO 8601)
  'locale': ru // String | Язык заголовков и значений CSV
};
apiInstance.exportAgentChatsCsv(id, opts, (error, data, response) => {
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
 **id** | **Number**| ID агента | 
 **offset** | **Number**| Смещение относительно начала списка | [optional] [default to 0]
 **limit** | **Number**| Количество сообщений в ответе | [optional] [default to 100]
 **order** | **String**| Сортировка по дате сообщения | [optional] [default to &#39;desc&#39;]
 **from** | **Date**| Начало периода (дата и время в формате ISO 8601) | [optional] 
 **to** | **Date**| Конец периода (дата и время в формате ISO 8601) | [optional] 
 **locale** | **String**| Язык заголовков и значений CSV | [optional] [default to &#39;ru&#39;]

### Return type

[**ExportAgentChatsCsv200Response**](ExportAgentChatsCsv200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getAgent

> CreateAgent201Response getAgent(id)

Получение AI агента

Чтобы получить информацию об AI агенте, отправьте GET-запрос на &#x60;/api/v1/cloud-ai/agents/{id}&#x60;.  Для токенов дополнительных пользователей аккаунта нужна роль &#x60;ai:read&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AIAgentsApi();
let id = 1; // Number | ID агента
apiInstance.getAgent(id, (error, data, response) => {
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
 **id** | **Number**| ID агента | 

### Return type

[**CreateAgent201Response**](CreateAgent201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getAgentChatList

> GetAgentChatList200Response getAgentChatList(id, opts)

Получение списка чатов агента

Чтобы получить список чатов (диалогов) AI агента, отправьте GET-запрос на &#x60;/api/v1/cloud-ai/agents/{id}/chat-list&#x60;.  Для каждого чата возвращаются первое сообщение пользователя, количество оценок и среднее время ответа. Чаты внешнего чата сюда не входят. Фильтр по периоду применяется, только если переданы оба параметра &#x60;from&#x60; и &#x60;to&#x60;. В &#x60;meta.metrics&#x60; — сводка по чатам для фильтров.  Для токенов дополнительных пользователей аккаунта нужна роль &#x60;ai:read&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AIAgentsApi();
let id = 1; // Number | ID агента
let opts = {
  'offset': 0, // Number | Смещение относительно начала списка
  'limit': 100, // Number | Количество чатов в ответе
  'order': asc, // String | Сортировка по дате первого сообщения
  'from': 2026-10-01T00:00Z, // Date | Начало периода (дата и время в формате ISO 8601)
  'to': 2026-10-20T23:59:59.999Z, // Date | Конец периода (дата и время в формате ISO 8601)
  'reactionType': likes, // String | Фильтр по оценкам: `likes` — есть положительная, `dislikes` — есть отрицательная, `with` — есть любая, `none` — без оценок
  'responseTimeRanges': ["1-5","15-"] // [String] | Фильтр по среднему времени ответа в секундах: диапазоны `мин-макс` или `мин-` («от мин и больше»). Можно передать несколько диапазонов — они объединяются по ИЛИ.
};
apiInstance.getAgentChatList(id, opts, (error, data, response) => {
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
 **id** | **Number**| ID агента | 
 **offset** | **Number**| Смещение относительно начала списка | [optional] [default to 0]
 **limit** | **Number**| Количество чатов в ответе | [optional] [default to 100]
 **order** | **String**| Сортировка по дате первого сообщения | [optional] [default to &#39;asc&#39;]
 **from** | **Date**| Начало периода (дата и время в формате ISO 8601) | [optional] 
 **to** | **Date**| Конец периода (дата и время в формате ISO 8601) | [optional] 
 **reactionType** | **String**| Фильтр по оценкам: &#x60;likes&#x60; — есть положительная, &#x60;dislikes&#x60; — есть отрицательная, &#x60;with&#x60; — есть любая, &#x60;none&#x60; — без оценок | [optional] 
 **responseTimeRanges** | [**[String]**](String.md)| Фильтр по среднему времени ответа в секундах: диапазоны &#x60;мин-макс&#x60; или &#x60;мин-&#x60; («от мин и больше»). Можно передать несколько диапазонов — они объединяются по ИЛИ. | [optional] 

### Return type

[**GetAgentChatList200Response**](GetAgentChatList200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getAgentChatMessages

> GetAgentChatMessages200Response getAgentChatMessages(id, chatId, opts)

Получение сообщений чата агента

Чтобы получить сообщения чата AI агента, отправьте GET-запрос на &#x60;/api/v1/cloud-ai/agents/{id}/chat-list/{chat_id}/messages&#x60;.  Возвращаются сообщения пользователя и ответы агента. Фильтр по периоду применяется, только если переданы оба параметра &#x60;from&#x60; и &#x60;to&#x60;.  Для токенов дополнительных пользователей аккаунта нужна роль &#x60;ai:read&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AIAgentsApi();
let id = 1; // Number | ID агента
let chatId = ai-agent-1-0b1c2d3e-4f50-4a6b-8c7d-9e0f1a2b3c4d; // String | ID чата (диалога) из поля `id` списка чатов агента
let opts = {
  'offset': 0, // Number | Смещение относительно начала списка
  'limit': 100, // Number | Количество сообщений в ответе
  'order': desc, // String | Сортировка по дате сообщения
  'from': 2026-10-01T00:00Z, // Date | Начало периода (дата и время в формате ISO 8601)
  'to': 2026-10-20T23:59:59.999Z // Date | Конец периода (дата и время в формате ISO 8601)
};
apiInstance.getAgentChatMessages(id, chatId, opts, (error, data, response) => {
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
 **id** | **Number**| ID агента | 
 **chatId** | **String**| ID чата (диалога) из поля &#x60;id&#x60; списка чатов агента | 
 **offset** | **Number**| Смещение относительно начала списка | [optional] [default to 0]
 **limit** | **Number**| Количество сообщений в ответе | [optional] [default to 100]
 **order** | **String**| Сортировка по дате сообщения | [optional] [default to &#39;desc&#39;]
 **from** | **Date**| Начало периода (дата и время в формате ISO 8601) | [optional] 
 **to** | **Date**| Конец периода (дата и время в формате ISO 8601) | [optional] 

### Return type

[**GetAgentChatMessages200Response**](GetAgentChatMessages200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getAgentEntityLimit

> CreateAgentEntityLimit201Response getAgentEntityLimit(id, limitId)

Получение лимита агента

Чтобы получить лимит AI агента, отправьте GET-запрос на &#x60;/api/v1/cloud-ai/agents/{id}/entity-limits/{limit_id}&#x60;.  Для токенов дополнительных пользователей аккаунта нужна роль &#x60;ai:read&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AIAgentsApi();
let id = 1; // Number | ID агента
let limitId = 550e8400-e29b-41d4-a716-446655440000; // String | ID лимита агента
apiInstance.getAgentEntityLimit(id, limitId, (error, data, response) => {
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
 **id** | **Number**| ID агента | 
 **limitId** | **String**| ID лимита агента | 

### Return type

[**CreateAgentEntityLimit201Response**](CreateAgentEntityLimit201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getAgentEntityLimits

> GetAgentEntityLimits200Response getAgentEntityLimits(id, opts)

Получение лимитов агента

Чтобы получить лимиты AI агента, отправьте GET-запрос на &#x60;/api/v1/cloud-ai/agents/{id}/entity-limits&#x60;.  Лимиты агента ограничивают расход на его запросы за период (&#x60;hour&#x60;, &#x60;day&#x60;, &#x60;week&#x60;, &#x60;month&#x60;) — в токенах (&#x60;limit&#x60;) или в деньгах (&#x60;money_limit&#x60;, приоритетнее). Лимит действует на все модели агента (&#x60;model_id&#x60; &#x3D; &#x60;null&#x60;) или на одну модель. При достижении лимита запросы к агенту отклоняются до конца периода.  Для токенов дополнительных пользователей аккаунта нужна роль &#x60;ai:read&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AIAgentsApi();
let id = 1; // Number | ID агента
let opts = {
  'limitType': day // String | Фильтр по периоду лимита
};
apiInstance.getAgentEntityLimits(id, opts, (error, data, response) => {
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
 **id** | **Number**| ID агента | 
 **limitType** | **String**| Фильтр по периоду лимита | [optional] 

### Return type

[**GetAgentEntityLimits200Response**](GetAgentEntityLimits200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getAgentStatistics

> GetAgentStatistics200Response getAgentStatistics(id, opts)

Получение статистики использования токенов агента

Чтобы получить статистику использования токенов AI агента, отправьте GET-запрос на &#x60;/api/v1/cloud-ai/agents/{id}/statistic&#x60;.  Статистика разбита на интервалы длиной &#x60;interval&#x60; минут: для каждого интервала возвращается по точке на каждую модель, к которой были запросы за период, а для интервалов без запросов — одна нулевая точка без &#x60;model_name&#x60;. По умолчанию возвращаются последние 24 часа.  Для токенов дополнительных пользователей аккаунта нужна роль &#x60;ai:read&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AIAgentsApi();
let id = 1; // Number | ID агента
let opts = {
  'startTime': 2026-10-19T00:00Z, // Date | Начало периода (ISO 8601). По умолчанию — за 24 часа до `endTime`.
  'endTime': 2026-10-20T00:00Z, // Date | Конец периода (ISO 8601). По умолчанию — текущий момент.
  'interval': 60 // Number | Длина интервала агрегации в минутах
};
apiInstance.getAgentStatistics(id, opts, (error, data, response) => {
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
 **id** | **Number**| ID агента | 
 **startTime** | **Date**| Начало периода (ISO 8601). По умолчанию — за 24 часа до &#x60;endTime&#x60;. | [optional] 
 **endTime** | **Date**| Конец периода (ISO 8601). По умолчанию — текущий момент. | [optional] 
 **interval** | **Number**| Длина интервала агрегации в минутах | [optional] [default to 60]

### Return type

[**GetAgentStatistics200Response**](GetAgentStatistics200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getAgentV3

> GetAgentV3200Response getAgentV3(id)

Получение AI агента (v3)

Чтобы получить информацию об AI агенте, отправьте GET-запрос на &#x60;/api/v3/cloud-ai/agents/{id}&#x60;.  Отличается от &#x60;/api/v1/cloud-ai/agents/{id}&#x60; тем, что вместо &#x60;knowledge_bases_ids&#x60; возвращает &#x60;knowledge_bases&#x60; — подключённые базы знаний с режимом поиска.  Для токенов дополнительных пользователей аккаунта нужна роль &#x60;ai:read&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AIAgentsApi();
let id = 1; // Number | ID агента
apiInstance.getAgentV3(id, (error, data, response) => {
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
 **id** | **Number**| ID агента | 

### Return type

[**GetAgentV3200Response**](GetAgentV3200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getAgents

> GetAgents200Response getAgents()

Получение списка AI агентов

Чтобы получить список AI агентов, отправьте GET-запрос на &#x60;/api/v1/cloud-ai/agents&#x60;.  Возвращаются все агенты аккаунта (без пагинации), включая приостановленных и заблокированных. Тело ответа будет представлять собой объект JSON с ключами &#x60;agents&#x60; и &#x60;meta&#x60;. Подключённые базы знаний вместе с режимом поиска возвращает метод &#x60;/api/v3/cloud-ai/agents&#x60;.  Для токенов дополнительных пользователей аккаунта нужна роль &#x60;ai:read&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AIAgentsApi();
apiInstance.getAgents((error, data, response) => {
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

[**GetAgents200Response**](GetAgents200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getAgentsV3

> GetAgentsV3200Response getAgentsV3()

Получение списка AI агентов (v3)

Чтобы получить список AI агентов, отправьте GET-запрос на &#x60;/api/v3/cloud-ai/agents&#x60;.  Отличается от &#x60;/api/v1/cloud-ai/agents&#x60; тем, что вместо &#x60;knowledge_bases_ids&#x60; возвращает &#x60;knowledge_bases&#x60; — подключённые базы знаний с режимом поиска.  Для токенов дополнительных пользователей аккаунта нужна роль &#x60;ai:read&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AIAgentsApi();
apiInstance.getAgentsV3((error, data, response) => {
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

[**GetAgentsV3200Response**](GetAgentsV3200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## syncAgentEntityLimits

> GetAgentEntityLimits200Response syncAgentEntityLimits(id, syncAgentEntityLimits)

Синхронизация лимитов агента за период

Чтобы задать полный набор лимитов AI агента за период, отправьте PUT-запрос на &#x60;/api/v1/cloud-ai/agents/{id}/entity-limits/sync&#x60;.  Лимиты из запроса создаются или обновляются (сопоставление по &#x60;model_id&#x60;), а лимиты этого периода, которых нет в запросе, удаляются. Лимиты других периодов не затрагиваются. В ответе — актуальные лимиты периода. Если лимиты одновременно изменил другой запрос, вернётся 409 &#x60;entity_keys_limits_sync_conflict&#x60; — повторите запрос.  Для токенов дополнительных пользователей аккаунта нужна роль &#x60;ai:write&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AIAgentsApi();
let id = 1; // Number | ID агента
let syncAgentEntityLimits = new TimewebCloudApi.SyncAgentEntityLimits(); // SyncAgentEntityLimits | 
apiInstance.syncAgentEntityLimits(id, syncAgentEntityLimits, (error, data, response) => {
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
 **id** | **Number**| ID агента | 
 **syncAgentEntityLimits** | [**SyncAgentEntityLimits**](SyncAgentEntityLimits.md)|  | 

### Return type

[**GetAgentEntityLimits200Response**](GetAgentEntityLimits200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## updateAgent

> CreateAgent201Response updateAgent(id, updateAgent)

Обновление AI агента

Чтобы обновить AI агента, отправьте PATCH-запрос на &#x60;/api/v1/cloud-ai/agents/{id}&#x60;, передав изменяемые поля.  Особенности: - &#x60;settings&#x60; заменяются целиком (кроме &#x60;web_search_allowed_sites&#x60;, &#x60;additional_models&#x60; и &#x60;memory_enabled&#x60;, которые сохраняются, если не переданы) — передавайте полный объект настроек, включая &#x60;widget&#x60;; - основную модель меняет отдельный метод &#x60;PATCH /api/v1/cloud-ai/agents/{id}/model&#x60;; - поле &#x60;token_limit&#x60; больше не поддерживается: запрос с ним отклоняется с кодом 410 — лимиты задаются через &#x60;/api/v1/cloud-ai/agents/{id}/entity-limits&#x60;; - ошибки привязки &#x60;ai_gateway_key_id&#x60;: 400 &#x60;ai_gateway_key_not_found&#x60;, &#x60;agent_is_already_migrated_to_another_ai_gateway_key&#x60;, &#x60;agent_is_not_eligible_for_ai_gateway_migration&#x60;; 503 — проверку временно не удалось выполнить; - изменить статус заблокированного или удалённого агента нельзя (400 &#x60;agent_can&#39;t_change_status&#x60;).  Для токенов дополнительных пользователей аккаунта нужна роль &#x60;ai:write&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AIAgentsApi();
let id = 1; // Number | ID агента
let updateAgent = new TimewebCloudApi.UpdateAgent(); // UpdateAgent | 
apiInstance.updateAgent(id, updateAgent, (error, data, response) => {
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
 **id** | **Number**| ID агента | 
 **updateAgent** | [**UpdateAgent**](UpdateAgent.md)|  | 

### Return type

[**CreateAgent201Response**](CreateAgent201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## updateAgentEntityLimit

> CreateAgentEntityLimit201Response updateAgentEntityLimit(id, limitId, updateAgentEntityLimit)

Изменение лимита агента

Чтобы изменить значение лимита AI агента, отправьте PATCH-запрос на &#x60;/api/v1/cloud-ai/agents/{id}/entity-limits/{limit_id}&#x60;.  Непереданные поля не меняются. Снять денежный лимит (&#x60;money_limit&#x60;: &#x60;null&#x60;) можно только вместе с передачей &#x60;limit&#x60;.  Для токенов дополнительных пользователей аккаунта нужна роль &#x60;ai:write&#x60;.

### Example

```javascript
import TimewebCloudApi from 'timeweb_cloud_api';
let defaultClient = TimewebCloudApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new TimewebCloudApi.AIAgentsApi();
let id = 1; // Number | ID агента
let limitId = 550e8400-e29b-41d4-a716-446655440000; // String | ID лимита агента
let updateAgentEntityLimit = new TimewebCloudApi.UpdateAgentEntityLimit(); // UpdateAgentEntityLimit | 
apiInstance.updateAgentEntityLimit(id, limitId, updateAgentEntityLimit, (error, data, response) => {
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
 **id** | **Number**| ID агента | 
 **limitId** | **String**| ID лимита агента | 
 **updateAgentEntityLimit** | [**UpdateAgentEntityLimit**](UpdateAgentEntityLimit.md)|  | 

### Return type

[**CreateAgentEntityLimit201Response**](CreateAgentEntityLimit201Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

