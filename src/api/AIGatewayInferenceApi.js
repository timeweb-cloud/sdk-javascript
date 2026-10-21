/**
 * Timeweb Cloud API
 * # Введение API Timeweb Cloud позволяет вам управлять ресурсами в облаке программным способом с использованием обычных HTTP-запросов.  Множество функций, которые доступны в панели управления Timeweb Cloud, также доступны через API, что позволяет вам автоматизировать ваши собственные сценарии.  В этой документации сперва будет описан общий дизайн и принципы работы API, а после этого конкретные конечные точки. Также будут приведены примеры запросов к ним.   ## Запросы Запросы должны выполняться по протоколу `HTTPS`, чтобы гарантировать шифрование транзакций. Поддерживаются следующие методы запроса: |Метод|Применение| |--- |--- | |GET|Извлекает данные о коллекциях и отдельных ресурсах.| |POST|Для коллекций создает новый ресурс этого типа. Также используется для выполнения действий с конкретным ресурсом.| |PUT|Обновляет существующий ресурс.| |PATCH|Некоторые ресурсы поддерживают частичное обновление, то есть обновление только части атрибутов ресурса, в этом случае вместо метода PUT будет использован PATCH.| |DELETE|Удаляет ресурс.|  Методы `POST`, `PUT` и `PATCH` могут включать объект в тело запроса с типом содержимого `application/json`.  ### Параметры в запросах Некоторые коллекции поддерживают пагинацию, поиск или сортировку в запросах. В параметрах запроса требуется передать: - `limit` — обозначает количество записей, которое необходимо вернуть  - `offset` — указывает на смещение, относительно начала списка  - `search` — позволяет указать набор символов для поиска  - `sort` — можно задать правило сортировки коллекции  ## Ответы Запросы вернут один из следующих кодов состояния ответа HTTP:  |Статус|Описание| |--- |--- | |200 OK|Действие с ресурсом было выполнено успешно.| |201 Created|Ресурс был успешно создан. При этом ресурс может быть как уже готовым к использованию, так и находиться в процессе запуска.| |204 No Content|Действие с ресурсом было выполнено успешно, и ответ не содержит дополнительной информации в теле.| |400 Bad Request|Был отправлен неверный запрос, например, в нем отсутствуют обязательные параметры и т. д. Тело ответа будет содержать дополнительную информацию об ошибке.| |401 Unauthorized|Ошибка аутентификации.| |403 Forbidden|Аутентификация прошла успешно, но недостаточно прав для выполнения действия.| |404 Not Found|Запрашиваемый ресурс не найден.| |409 Conflict|Запрос конфликтует с текущим состоянием.| |423 Locked|Ресурс из запроса заблокирован от применения к нему указанного метода.| |429 Too Many Requests|Был достигнут лимит по количеству запросов в единицу времени.| |500 Internal Server Error|При выполнении запроса произошла какая-то внутренняя ошибка. Чтобы решить эту проблему, лучше всего создать тикет в панели управления.|  ### Структура успешного ответа Все конечные точки будут возвращать данные в формате `JSON`. Ответы на `GET`-запросы будут иметь на верхнем уровне следующую структуру атрибутов:  |Название поля|Тип|Описание| |--- |--- |--- | |[entity_name]|object, object[], string[], number[], boolean|Динамическое поле, которое будет меняться в зависимости от запрашиваемого ресурса и будет содержать все атрибуты, необходимые для описания этого ресурса. Например, при запросе списка баз данных будет возвращаться поле `dbs`, а при запросе конкретного облачного сервера `server`. Для некоторых конечных точек в ответе может возвращаться сразу несколько ресурсов.| |meta|object|Опционально. Объект, который содержит вспомогательную информацию о ресурсе. Чаще всего будет встречаться при запросе коллекций и содержать поле `total`, которое будет указывать на количество элементов в коллекции.| |response_id|string|Опционально. В большинстве случаев в ответе будет содержаться ID ответа в формате UUIDv4, который однозначно указывает на ваш запрос внутри нашей системы. Если вам потребуется задать вопрос нашей поддержке, приложите к вопросу этот ID— так мы сможем найти ответ на него намного быстрее. Также вы можете использовать этот ID, чтобы убедиться, что это новый ответ на запрос и результат не был получен из кэша.|  Пример запроса на получение списка SSH-ключей: ```     HTTP/2.0 200 OK     {       \"ssh_keys\":[           {             \"body\":\"ssh-rsa AAAAB3NzaC1sdfghjkOAsBwWhs= example@device.local\",             \"created_at\":\"2021-09-15T19:52:27Z\",             \"expired_at\":null,             \"id\":5297,             \"is_default\":false,             \"name\":\"example@device.local\",             \"used_at\":null,             \"used_by\":[]           }       ],       \"meta\":{           \"total\":1       },       \"response_id\":\"94608d15-8672-4eed-8ab6-28bd6fa3cdf7\"     } ```  ### Структура ответа с ошибкой |Название поля|Тип|Описание| |--- |--- |--- | |status_code|number|Короткий числовой идентификатор ошибки.| |error_code|string|Короткий текстовый идентификатор ошибки, который уточняет числовой идентификатор и удобен для программной обработки. Самый простой пример — это код `not_found` для ошибки 404.| |message|string, string[]|Опционально. В большинстве случаев в ответе будет содержаться человекочитаемое подробное описание ошибки или ошибок, которые помогут понять, что нужно исправить.| |response_id|string|Опционально. В большинстве случае в ответе будет содержаться ID ответа в формате UUIDv4, который однозначно указывает на ваш запрос внутри нашей системы. Если вам потребуется задать вопрос нашей поддержке, приложите к вопросу этот ID — так мы сможем найти ответ на него намного быстрее.|  Пример: ```     HTTP/2.0 403 Forbidden     {       \"status_code\": 403,       \"error_code\":  \"forbidden\",       \"message\":     \"You do not have access for the attempted action\",       \"response_id\": \"94608d15-8672-4eed-8ab6-28bd6fa3cdf7\"     } ```  ## Статусы ресурсов Важно учесть, что при создании большинства ресурсов внутри платформы вам будет сразу возвращен ответ от сервера со статусом `200 OK` или `201 Created` и ID созданного ресурса в теле ответа, но при этом этот ресурс может быть ещё в *состоянии запуска*.  Для того чтобы понять, в каком состоянии сейчас находится ваш ресурс, мы добавили поле `status` в ответ на получение информации о ресурсе.  Список статусов будет отличаться в зависимости от типа ресурса. Увидеть поддерживаемый список статусов вы сможете в описании каждого конкретного ресурса.     ## Ограничение скорости запросов (Rate Limiting) Чтобы обеспечить стабильность для всех пользователей, Timeweb Cloud защищает API от всплесков входящего трафика, анализируя количество запросов c каждого аккаунта к каждой конечной точке.  Если ваше приложение отправляет более 20 запросов в секунду на одну конечную точку, то для этого запроса API может вернуть код состояния HTTP `429 Too Many Requests`.   ## Аутентификация Доступ к API осуществляется с помощью JWT-токена. Токенами можно управлять внутри панели управления Timeweb Cloud в разделе *API и Terraform*.  Токен необходимо передавать в заголовке каждого запроса в формате: ```   Authorization: Bearer $TIMEWEB_CLOUD_TOKEN ```  ## Формат примеров API Примеры в этой документации описаны с помощью `curl`, HTTP-клиента командной строки. На компьютерах `Linux` и `macOS` обычно по умолчанию установлен `curl`, и он доступен для загрузки на всех популярных платформах, включая `Windows`.  Каждый пример разделен на несколько строк символом `\\`, который совместим с `bash`. Типичный пример выглядит так: ```   curl -X PATCH      -H \"Content-Type: application/json\"      -H \"Authorization: Bearer $TIMEWEB_CLOUD_TOKEN\"      -d '{\"name\":\"Cute Corvus\",\"comment\":\"Development Server\"}'      \"https://api.timeweb.cloud/api/v1/dedicated/1051\" ``` - Параметр `-X` задает метод запроса. Для согласованности метод будет указан во всех примерах, даже если он явно не требуется для методов `GET`. - Строки `-H` задают требуемые HTTP-заголовки. - Примеры, для которых требуется объект JSON в теле запроса, передают требуемые данные через параметр `-d`.  Чтобы использовать приведенные примеры, не подставляя каждый раз в них свой токен, вы можете добавить токен один раз в переменные окружения в вашей консоли. Например, на `Linux` это можно сделать с помощью команды:  ``` TIMEWEB_CLOUD_TOKEN=\"token\" ```  После этого токен будет автоматически подставляться в ваши запросы.  Обратите внимание, что все значения в этой документации являются примерами. Не полагайтесь на IDы операционных систем, тарифов и т.д., используемые в примерах. Используйте соответствующую конечную точку для получения значений перед созданием ресурсов.   ## Версионирование API построено согласно принципам [семантического версионирования](https://semver.org/lang/ru). Это значит, что мы гарантируем обратную совместимость всех изменений в пределах одной мажорной версии.  Мажорная версия каждой конечной точки обозначается в пути запроса, например, запрос `/api/v1/servers` указывает, что этот метод имеет версию 1.
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: info@timeweb.cloud
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */


import ApiClient from "../ApiClient";
import AiGatewayBatch from '../model/AiGatewayBatch';
import AiGatewayBatchCreateRequest from '../model/AiGatewayBatchCreateRequest';
import AiGatewayBatchList from '../model/AiGatewayBatchList';
import AiGatewayChatCompletion from '../model/AiGatewayChatCompletion';
import AiGatewayChatCompletionChunk from '../model/AiGatewayChatCompletionChunk';
import AiGatewayChatCompletionRequest from '../model/AiGatewayChatCompletionRequest';
import AiGatewayCompletion from '../model/AiGatewayCompletion';
import AiGatewayCompletionRequest from '../model/AiGatewayCompletionRequest';
import AiGatewayEmbeddingList from '../model/AiGatewayEmbeddingList';
import AiGatewayEmbeddingRequest from '../model/AiGatewayEmbeddingRequest';
import AiGatewayError from '../model/AiGatewayError';
import AiGatewayFile from '../model/AiGatewayFile';
import AiGatewayFileDeleted from '../model/AiGatewayFileDeleted';
import AiGatewayImageGenerationRequest from '../model/AiGatewayImageGenerationRequest';
import AiGatewayImagesResponse from '../model/AiGatewayImagesResponse';
import AiGatewayModelList from '../model/AiGatewayModelList';
import AiGatewayResponse from '../model/AiGatewayResponse';
import AiGatewayResponseCreateRequest from '../model/AiGatewayResponseCreateRequest';
import AiGatewayResponseDeleted from '../model/AiGatewayResponseDeleted';
import AiGatewaySpeechRequest from '../model/AiGatewaySpeechRequest';
import AiGatewayTranscription from '../model/AiGatewayTranscription';
import AiGatewayValidationError from '../model/AiGatewayValidationError';

/**
* AIGatewayInference service.
* @module api/AIGatewayInferenceApi
* @version 1.0.0
*/
export default class AIGatewayInferenceApi {

    /**
    * Constructs a new AIGatewayInferenceApi. 
    * @alias module:api/AIGatewayInferenceApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }


    /**
     * Callback function to receive the result of the cancelAiGatewayBatch operation.
     * @callback module:api/AIGatewayInferenceApi~cancelAiGatewayBatchCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AiGatewayBatch} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Отмена батча
     * Чтобы отменить батч, отправьте POST-запрос на `/v1/batches/{batch_id}/cancel`.  Батч переходит в статус `cancelling`, отмена выполняется асинхронно и может занять несколько минут; итоговый статус `cancelled` проверяйте через `GET /v1/batches/{batch_id}`. Пока отмена не завершилась, входной файл батча удалить нельзя.
     * @param {String} batchId ID батча
     * @param {module:api/AIGatewayInferenceApi~cancelAiGatewayBatchCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/AiGatewayBatch}
     */
    cancelAiGatewayBatch(batchId, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'batchId' is set
      if (batchId === undefined || batchId === null) {
        throw new Error("Missing the required parameter 'batchId' when calling cancelAiGatewayBatch");
      }

      let pathParams = {
        'batch_id': batchId
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['AiGatewayKey'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = AiGatewayBatch;
      let basePaths = ['https://api.timeweb.ai'];
      let basePath = basePaths[0]; // by default use the first one in "servers" defined in OpenAPI
      if (typeof opts['_base_path_index'] !== 'undefined') {
        if (opts['_base_path_index']  >= basePaths.length || opts['_base_path_index'] <  0) {
          throw new Error("Invalid index " + opts['_base_path_index'] + " when selecting the host settings. Must be less than " + basePaths.length);
        }
        basePath = basePaths[opts['_base_path_index']];
      }

      return this.apiClient.callApi(
        '/v1/batches/{batch_id}/cancel', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, basePath, callback
      );
    }

    /**
     * Callback function to receive the result of the cancelAiGatewayResponse operation.
     * @callback module:api/AIGatewayInferenceApi~cancelAiGatewayResponseCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AiGatewayResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Отмена фонового ответа (Responses API)
     * Чтобы отменить ответ, запущенный с `\"background\": true`, отправьте POST-запрос на `/v1/responses/{response_id}/cancel`.  Отмена может завершиться не сразу: итоговый статус `cancelled` проверяйте через `GET /v1/responses/{response_id}`. Ответ, созданный без `background`, отменить нельзя — вернётся ошибка 400. Неизвестный `response_id` также возвращает 400.
     * @param {String} responseId ID ответа Responses API
     * @param {module:api/AIGatewayInferenceApi~cancelAiGatewayResponseCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/AiGatewayResponse}
     */
    cancelAiGatewayResponse(responseId, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'responseId' is set
      if (responseId === undefined || responseId === null) {
        throw new Error("Missing the required parameter 'responseId' when calling cancelAiGatewayResponse");
      }

      let pathParams = {
        'response_id': responseId
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['AiGatewayKey'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = AiGatewayResponse;
      let basePaths = ['https://api.timeweb.ai'];
      let basePath = basePaths[0]; // by default use the first one in "servers" defined in OpenAPI
      if (typeof opts['_base_path_index'] !== 'undefined') {
        if (opts['_base_path_index']  >= basePaths.length || opts['_base_path_index'] <  0) {
          throw new Error("Invalid index " + opts['_base_path_index'] + " when selecting the host settings. Must be less than " + basePaths.length);
        }
        basePath = basePaths[opts['_base_path_index']];
      }

      return this.apiClient.callApi(
        '/v1/responses/{response_id}/cancel', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, basePath, callback
      );
    }

    /**
     * Callback function to receive the result of the createAiGatewayBatch operation.
     * @callback module:api/AIGatewayInferenceApi~createAiGatewayBatchCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AiGatewayBatch} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Создание батча
     * Чтобы запустить асинхронную обработку входного файла, загруженного с `purpose=batch`, отправьте POST-запрос на `/v1/batches`.  При создании батча его оценочная стоимость резервируется на балансе, фактическая стоимость списывается по цене Batch API после выполнения. Модели, эндпоинты и коэффициенты цены Batch API — в поле `batch` каталога моделей (`GET https://api.timeweb.cloud/api/v3/cloud-ai/models`). Batch API доступен только для ключей AI Gateway.
     * @param {module:model/AiGatewayBatchCreateRequest} aiGatewayBatchCreateRequest 
     * @param {module:api/AIGatewayInferenceApi~createAiGatewayBatchCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/AiGatewayBatch}
     */
    createAiGatewayBatch(aiGatewayBatchCreateRequest, opts, callback) {
      opts = opts || {};
      let postBody = aiGatewayBatchCreateRequest;
      // verify the required parameter 'aiGatewayBatchCreateRequest' is set
      if (aiGatewayBatchCreateRequest === undefined || aiGatewayBatchCreateRequest === null) {
        throw new Error("Missing the required parameter 'aiGatewayBatchCreateRequest' when calling createAiGatewayBatch");
      }

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['AiGatewayKey'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = AiGatewayBatch;
      let basePaths = ['https://api.timeweb.ai'];
      let basePath = basePaths[0]; // by default use the first one in "servers" defined in OpenAPI
      if (typeof opts['_base_path_index'] !== 'undefined') {
        if (opts['_base_path_index']  >= basePaths.length || opts['_base_path_index'] <  0) {
          throw new Error("Invalid index " + opts['_base_path_index'] + " when selecting the host settings. Must be less than " + basePaths.length);
        }
        basePath = basePaths[opts['_base_path_index']];
      }

      return this.apiClient.callApi(
        '/v1/batches', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, basePath, callback
      );
    }

    /**
     * Callback function to receive the result of the createAiGatewayChatCompletion operation.
     * @callback module:api/AIGatewayInferenceApi~createAiGatewayChatCompletionCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AiGatewayChatCompletion} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Генерация ответа в диалоге (Chat Completions)
     * Чтобы получить следующий ответ модели в диалоге, отправьте POST-запрос на `/v1/chat/completions`.  Запрос не хранит состояние: передавайте всю историю диалога в `messages`. Поддерживаются вызов функций (`tools`), структурированный ответ (`response_format`) и изображения во входных сообщениях (для моделей с поддержкой зрения).  С `\"stream\": true` ответ приходит потоком Server-Sent Events: события `chat.completion.chunk` в строках `data:`, в конце — `data: [DONE]`. С `\"stream_options\": {\"include_usage\": true}` последний чанк содержит расход токенов.  Если у ключа настроены запасные модели и запрошенная модель не ответила, запрос повторяется на запасных. Заголовок ответа `x-timeweb-attempted-fallbacks` показывает, сколько запасных моделей было опробовано.
     * @param {Object.<String, {String: Object}>} requestBody 
     * @param {module:api/AIGatewayInferenceApi~createAiGatewayChatCompletionCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/AiGatewayChatCompletion}
     */
    createAiGatewayChatCompletion(requestBody, opts, callback) {
      opts = opts || {};
      let postBody = requestBody;
      // verify the required parameter 'requestBody' is set
      if (requestBody === undefined || requestBody === null) {
        throw new Error("Missing the required parameter 'requestBody' when calling createAiGatewayChatCompletion");
      }

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['AiGatewayKey'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json', 'text/event-stream'];
      let returnType = AiGatewayChatCompletion;
      let basePaths = ['https://api.timeweb.ai'];
      let basePath = basePaths[0]; // by default use the first one in "servers" defined in OpenAPI
      if (typeof opts['_base_path_index'] !== 'undefined') {
        if (opts['_base_path_index']  >= basePaths.length || opts['_base_path_index'] <  0) {
          throw new Error("Invalid index " + opts['_base_path_index'] + " when selecting the host settings. Must be less than " + basePaths.length);
        }
        basePath = basePaths[opts['_base_path_index']];
      }

      return this.apiClient.callApi(
        '/v1/chat/completions', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, basePath, callback
      );
    }

    /**
     * Callback function to receive the result of the createAiGatewayCompletion operation.
     * @callback module:api/AIGatewayInferenceApi~createAiGatewayCompletionCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AiGatewayCompletion} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Продолжение текста (Completions)
     * Чтобы получить продолжение текста `prompt`, отправьте POST-запрос на `/v1/completions`.  Это устаревший API OpenAI — для новых интеграций используйте `/v1/chat/completions`. С `\"stream\": true` ответ приходит потоком Server-Sent Events и заканчивается `data: [DONE]`.
     * @param {Object.<String, {String: Object}>} requestBody 
     * @param {module:api/AIGatewayInferenceApi~createAiGatewayCompletionCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/AiGatewayCompletion}
     */
    createAiGatewayCompletion(requestBody, opts, callback) {
      opts = opts || {};
      let postBody = requestBody;
      // verify the required parameter 'requestBody' is set
      if (requestBody === undefined || requestBody === null) {
        throw new Error("Missing the required parameter 'requestBody' when calling createAiGatewayCompletion");
      }

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['AiGatewayKey'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json', 'text/event-stream'];
      let returnType = AiGatewayCompletion;
      let basePaths = ['https://api.timeweb.ai'];
      let basePath = basePaths[0]; // by default use the first one in "servers" defined in OpenAPI
      if (typeof opts['_base_path_index'] !== 'undefined') {
        if (opts['_base_path_index']  >= basePaths.length || opts['_base_path_index'] <  0) {
          throw new Error("Invalid index " + opts['_base_path_index'] + " when selecting the host settings. Must be less than " + basePaths.length);
        }
        basePath = basePaths[opts['_base_path_index']];
      }

      return this.apiClient.callApi(
        '/v1/completions', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, basePath, callback
      );
    }

    /**
     * Callback function to receive the result of the createAiGatewayEmbedding operation.
     * @callback module:api/AIGatewayInferenceApi~createAiGatewayEmbeddingCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AiGatewayEmbeddingList} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение эмбеддингов
     * Чтобы получить векторные представления текстов, отправьте POST-запрос на `/v1/embeddings`.  Используйте модель с `mode: embedding` из `GET /v1/models`. Эмбеддинги возвращаются в порядке входных текстов.
     * @param {Object.<String, {String: Object}>} requestBody 
     * @param {module:api/AIGatewayInferenceApi~createAiGatewayEmbeddingCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/AiGatewayEmbeddingList}
     */
    createAiGatewayEmbedding(requestBody, opts, callback) {
      opts = opts || {};
      let postBody = requestBody;
      // verify the required parameter 'requestBody' is set
      if (requestBody === undefined || requestBody === null) {
        throw new Error("Missing the required parameter 'requestBody' when calling createAiGatewayEmbedding");
      }

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['AiGatewayKey'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = AiGatewayEmbeddingList;
      let basePaths = ['https://api.timeweb.ai'];
      let basePath = basePaths[0]; // by default use the first one in "servers" defined in OpenAPI
      if (typeof opts['_base_path_index'] !== 'undefined') {
        if (opts['_base_path_index']  >= basePaths.length || opts['_base_path_index'] <  0) {
          throw new Error("Invalid index " + opts['_base_path_index'] + " when selecting the host settings. Must be less than " + basePaths.length);
        }
        basePath = basePaths[opts['_base_path_index']];
      }

      return this.apiClient.callApi(
        '/v1/embeddings', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, basePath, callback
      );
    }

    /**
     * Callback function to receive the result of the createAiGatewayImage operation.
     * @callback module:api/AIGatewayInferenceApi~createAiGatewayImageCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AiGatewayImagesResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Генерация изображений
     * Чтобы сгенерировать изображения по текстовому описанию, отправьте POST-запрос на `/v1/images/generations`.  Используйте модель с `mode: image_generation` из `GET /v1/models`.
     * @param {Object.<String, {String: Object}>} requestBody 
     * @param {module:api/AIGatewayInferenceApi~createAiGatewayImageCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/AiGatewayImagesResponse}
     */
    createAiGatewayImage(requestBody, opts, callback) {
      opts = opts || {};
      let postBody = requestBody;
      // verify the required parameter 'requestBody' is set
      if (requestBody === undefined || requestBody === null) {
        throw new Error("Missing the required parameter 'requestBody' when calling createAiGatewayImage");
      }

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['AiGatewayKey'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = AiGatewayImagesResponse;
      let basePaths = ['https://api.timeweb.ai'];
      let basePath = basePaths[0]; // by default use the first one in "servers" defined in OpenAPI
      if (typeof opts['_base_path_index'] !== 'undefined') {
        if (opts['_base_path_index']  >= basePaths.length || opts['_base_path_index'] <  0) {
          throw new Error("Invalid index " + opts['_base_path_index'] + " when selecting the host settings. Must be less than " + basePaths.length);
        }
        basePath = basePaths[opts['_base_path_index']];
      }

      return this.apiClient.callApi(
        '/v1/images/generations', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, basePath, callback
      );
    }

    /**
     * Callback function to receive the result of the createAiGatewayImageEdit operation.
     * @callback module:api/AIGatewayInferenceApi~createAiGatewayImageEditCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AiGatewayImagesResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Редактирование изображений
     * Чтобы изменить или дополнить изображения по описанию, отправьте POST-запрос на `/v1/images/edits` (multipart/form-data).  Доступно для моделей GPT Image (`openai/gpt-image-*`) и FLUX.2 (`black_forest_labs/flux-2-*`). Для других моделей, в том числе неизвестных, возвращается ошибка 405.
     * @param {String} model ID модели: GPT Image (`openai/gpt-image-*`) или FLUX.2 (`black_forest_labs/flux-2-*`)
     * @param {File} image Исходное изображение или несколько файлов в поле `image[]`
     * @param {String} prompt Что изменить
     * @param {Object} opts Optional parameters
     * @param {File} [mask] Маска: прозрачные области будут изменены
     * @param {Number} [n = 1)] Количество изображений
     * @param {String} [size] Размер изображения
     * @param {String} [quality] Качество изображения
     * @param {module:api/AIGatewayInferenceApi~createAiGatewayImageEditCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/AiGatewayImagesResponse}
     */
    createAiGatewayImageEdit(model, image, prompt, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'model' is set
      if (model === undefined || model === null) {
        throw new Error("Missing the required parameter 'model' when calling createAiGatewayImageEdit");
      }
      // verify the required parameter 'image' is set
      if (image === undefined || image === null) {
        throw new Error("Missing the required parameter 'image' when calling createAiGatewayImageEdit");
      }
      // verify the required parameter 'prompt' is set
      if (prompt === undefined || prompt === null) {
        throw new Error("Missing the required parameter 'prompt' when calling createAiGatewayImageEdit");
      }

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
        'model': model,
        'image': image,
        'mask': opts['mask'],
        'prompt': prompt,
        'n': opts['n'],
        'size': opts['size'],
        'quality': opts['quality']
      };

      let authNames = ['AiGatewayKey'];
      let contentTypes = ['multipart/form-data'];
      let accepts = ['application/json'];
      let returnType = AiGatewayImagesResponse;
      let basePaths = ['https://api.timeweb.ai'];
      let basePath = basePaths[0]; // by default use the first one in "servers" defined in OpenAPI
      if (typeof opts['_base_path_index'] !== 'undefined') {
        if (opts['_base_path_index']  >= basePaths.length || opts['_base_path_index'] <  0) {
          throw new Error("Invalid index " + opts['_base_path_index'] + " when selecting the host settings. Must be less than " + basePaths.length);
        }
        basePath = basePaths[opts['_base_path_index']];
      }

      return this.apiClient.callApi(
        '/v1/images/edits', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, basePath, callback
      );
    }

    /**
     * Callback function to receive the result of the createAiGatewayResponse operation.
     * @callback module:api/AIGatewayInferenceApi~createAiGatewayResponseCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AiGatewayResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Создание ответа (Responses API)
     * Чтобы получить ответ модели через OpenAI Responses API, отправьте POST-запрос на `/v1/responses`.  Диалог можно продолжить по `previous_response_id`, долгие запросы — выполнить в фоне с `\"background\": true` и получать результат через `GET /v1/responses/{response_id}`.  С `\"stream\": true` ответ приходит потоком типизированных событий Server-Sent Events (`response.created`, `response.output_text.delta`, `response.completed` и др.), в конце потока — `data: [DONE]`.  Если у ключа настроены запасные модели и запрошенная модель не ответила, запрос повторяется на запасных (заголовок `x-timeweb-attempted-fallbacks`).
     * @param {Object.<String, {String: Object}>} requestBody 
     * @param {module:api/AIGatewayInferenceApi~createAiGatewayResponseCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/AiGatewayResponse}
     */
    createAiGatewayResponse(requestBody, opts, callback) {
      opts = opts || {};
      let postBody = requestBody;
      // verify the required parameter 'requestBody' is set
      if (requestBody === undefined || requestBody === null) {
        throw new Error("Missing the required parameter 'requestBody' when calling createAiGatewayResponse");
      }

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['AiGatewayKey'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json', 'text/event-stream'];
      let returnType = AiGatewayResponse;
      let basePaths = ['https://api.timeweb.ai'];
      let basePath = basePaths[0]; // by default use the first one in "servers" defined in OpenAPI
      if (typeof opts['_base_path_index'] !== 'undefined') {
        if (opts['_base_path_index']  >= basePaths.length || opts['_base_path_index'] <  0) {
          throw new Error("Invalid index " + opts['_base_path_index'] + " when selecting the host settings. Must be less than " + basePaths.length);
        }
        basePath = basePaths[opts['_base_path_index']];
      }

      return this.apiClient.callApi(
        '/v1/responses', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, basePath, callback
      );
    }

    /**
     * Callback function to receive the result of the createAiGatewaySpeech operation.
     * @callback module:api/AIGatewayInferenceApi~createAiGatewaySpeechCallback
     * @param {String} error Error message, if any.
     * @param {File} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Синтез речи
     * Чтобы озвучить текст, отправьте POST-запрос на `/v1/audio/speech`.  Используйте модель с `mode: audio_speech` из `GET /v1/models`. Ответ — аудиофайл в формате `response_format` (по умолчанию `mp3`).
     * @param {Object.<String, {String: Object}>} requestBody 
     * @param {module:api/AIGatewayInferenceApi~createAiGatewaySpeechCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link File}
     */
    createAiGatewaySpeech(requestBody, opts, callback) {
      opts = opts || {};
      let postBody = requestBody;
      // verify the required parameter 'requestBody' is set
      if (requestBody === undefined || requestBody === null) {
        throw new Error("Missing the required parameter 'requestBody' when calling createAiGatewaySpeech");
      }

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['AiGatewayKey'];
      let contentTypes = ['application/json'];
      let accepts = ['audio/mpeg', 'audio/wav', 'application/json'];
      let returnType = File;
      let basePaths = ['https://api.timeweb.ai'];
      let basePath = basePaths[0]; // by default use the first one in "servers" defined in OpenAPI
      if (typeof opts['_base_path_index'] !== 'undefined') {
        if (opts['_base_path_index']  >= basePaths.length || opts['_base_path_index'] <  0) {
          throw new Error("Invalid index " + opts['_base_path_index'] + " when selecting the host settings. Must be less than " + basePaths.length);
        }
        basePath = basePaths[opts['_base_path_index']];
      }

      return this.apiClient.callApi(
        '/v1/audio/speech', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, basePath, callback
      );
    }

    /**
     * Callback function to receive the result of the createAiGatewayTranscription operation.
     * @callback module:api/AIGatewayInferenceApi~createAiGatewayTranscriptionCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AiGatewayTranscription} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Распознавание речи
     * Чтобы распознать речь в аудиофайле, отправьте POST-запрос на `/v1/audio/transcriptions` (multipart/form-data).  Доступно для моделей распознавания речи `*-transcribe` (например, `openai/gpt-4o-mini-transcribe`). Для других моделей, в том числе неизвестных, возвращается ошибка 405. Ответ возвращается в JSON.
     * @param {File} file Аудиофайл
     * @param {String} model ID модели распознавания речи (`*-transcribe`)
     * @param {Object} opts Optional parameters
     * @param {String} [language] Язык аудио в формате ISO-639-1
     * @param {String} [prompt] Подсказка для распознавания: термины, имена, стиль
     * @param {String} [responseFormat] Формат ответа
     * @param {Number} [temperature] Температура выборки
     * @param {module:api/AIGatewayInferenceApi~createAiGatewayTranscriptionCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/AiGatewayTranscription}
     */
    createAiGatewayTranscription(file, model, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'file' is set
      if (file === undefined || file === null) {
        throw new Error("Missing the required parameter 'file' when calling createAiGatewayTranscription");
      }
      // verify the required parameter 'model' is set
      if (model === undefined || model === null) {
        throw new Error("Missing the required parameter 'model' when calling createAiGatewayTranscription");
      }

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
        'file': file,
        'model': model,
        'language': opts['language'],
        'prompt': opts['prompt'],
        'response_format': opts['responseFormat'],
        'temperature': opts['temperature']
      };

      let authNames = ['AiGatewayKey'];
      let contentTypes = ['multipart/form-data'];
      let accepts = ['application/json'];
      let returnType = AiGatewayTranscription;
      let basePaths = ['https://api.timeweb.ai'];
      let basePath = basePaths[0]; // by default use the first one in "servers" defined in OpenAPI
      if (typeof opts['_base_path_index'] !== 'undefined') {
        if (opts['_base_path_index']  >= basePaths.length || opts['_base_path_index'] <  0) {
          throw new Error("Invalid index " + opts['_base_path_index'] + " when selecting the host settings. Must be less than " + basePaths.length);
        }
        basePath = basePaths[opts['_base_path_index']];
      }

      return this.apiClient.callApi(
        '/v1/audio/transcriptions', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, basePath, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteAiGatewayFile operation.
     * @callback module:api/AIGatewayInferenceApi~deleteAiGatewayFileCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AiGatewayFileDeleted} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Удаление файла
     * Чтобы удалить файл, отправьте DELETE-запрос на `/v1/files/{file_id}`.  Входной файл батча, который ещё выполняется или отменяется, и результаты батча, расход которого ещё не списан, удалить нельзя — вернётся ошибка 409.
     * @param {String} fileId ID файла
     * @param {module:api/AIGatewayInferenceApi~deleteAiGatewayFileCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/AiGatewayFileDeleted}
     */
    deleteAiGatewayFile(fileId, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'fileId' is set
      if (fileId === undefined || fileId === null) {
        throw new Error("Missing the required parameter 'fileId' when calling deleteAiGatewayFile");
      }

      let pathParams = {
        'file_id': fileId
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['AiGatewayKey'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = AiGatewayFileDeleted;
      let basePaths = ['https://api.timeweb.ai'];
      let basePath = basePaths[0]; // by default use the first one in "servers" defined in OpenAPI
      if (typeof opts['_base_path_index'] !== 'undefined') {
        if (opts['_base_path_index']  >= basePaths.length || opts['_base_path_index'] <  0) {
          throw new Error("Invalid index " + opts['_base_path_index'] + " when selecting the host settings. Must be less than " + basePaths.length);
        }
        basePath = basePaths[opts['_base_path_index']];
      }

      return this.apiClient.callApi(
        '/v1/files/{file_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, basePath, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteAiGatewayResponse operation.
     * @callback module:api/AIGatewayInferenceApi~deleteAiGatewayResponseCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AiGatewayResponseDeleted} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Удаление ответа (Responses API)
     * Чтобы удалить сохранённый ответ, отправьте DELETE-запрос на `/v1/responses/{response_id}`.  Неизвестный или уже удалённый `response_id` возвращает ошибку 400.
     * @param {String} responseId ID ответа Responses API
     * @param {module:api/AIGatewayInferenceApi~deleteAiGatewayResponseCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/AiGatewayResponseDeleted}
     */
    deleteAiGatewayResponse(responseId, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'responseId' is set
      if (responseId === undefined || responseId === null) {
        throw new Error("Missing the required parameter 'responseId' when calling deleteAiGatewayResponse");
      }

      let pathParams = {
        'response_id': responseId
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['AiGatewayKey'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = AiGatewayResponseDeleted;
      let basePaths = ['https://api.timeweb.ai'];
      let basePath = basePaths[0]; // by default use the first one in "servers" defined in OpenAPI
      if (typeof opts['_base_path_index'] !== 'undefined') {
        if (opts['_base_path_index']  >= basePaths.length || opts['_base_path_index'] <  0) {
          throw new Error("Invalid index " + opts['_base_path_index'] + " when selecting the host settings. Must be less than " + basePaths.length);
        }
        basePath = basePaths[opts['_base_path_index']];
      }

      return this.apiClient.callApi(
        '/v1/responses/{response_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, basePath, callback
      );
    }

    /**
     * Callback function to receive the result of the downloadAiGatewayFileContent operation.
     * @callback module:api/AIGatewayInferenceApi~downloadAiGatewayFileContentCallback
     * @param {String} error Error message, if any.
     * @param {File} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Скачивание файла
     * Чтобы скачать содержимое файла — например, результаты выполненного батча (`output_file_id`), — отправьте GET-запрос на `/v1/files/{file_id}/content`.  Перед скачиванием результатов получите батч через `GET /v1/batches/{batch_id}` и убедитесь, что он в статусе `completed`. Файлы с `purpose=user_data` скачать нельзя — вернётся ошибка 400.
     * @param {String} fileId ID файла
     * @param {module:api/AIGatewayInferenceApi~downloadAiGatewayFileContentCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link File}
     */
    downloadAiGatewayFileContent(fileId, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'fileId' is set
      if (fileId === undefined || fileId === null) {
        throw new Error("Missing the required parameter 'fileId' when calling downloadAiGatewayFileContent");
      }

      let pathParams = {
        'file_id': fileId
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['AiGatewayKey'];
      let contentTypes = [];
      let accepts = ['application/octet-stream', 'application/json'];
      let returnType = File;
      let basePaths = ['https://api.timeweb.ai'];
      let basePath = basePaths[0]; // by default use the first one in "servers" defined in OpenAPI
      if (typeof opts['_base_path_index'] !== 'undefined') {
        if (opts['_base_path_index']  >= basePaths.length || opts['_base_path_index'] <  0) {
          throw new Error("Invalid index " + opts['_base_path_index'] + " when selecting the host settings. Must be less than " + basePaths.length);
        }
        basePath = basePaths[opts['_base_path_index']];
      }

      return this.apiClient.callApi(
        '/v1/files/{file_id}/content', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, basePath, callback
      );
    }

    /**
     * Callback function to receive the result of the getAiGatewayBatch operation.
     * @callback module:api/AIGatewayInferenceApi~getAiGatewayBatchCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AiGatewayBatch} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение батча
     * Чтобы получить статус батча, отправьте GET-запрос на `/v1/batches/{batch_id}`.  Когда статус станет `completed`, скачайте результаты по `output_file_id` через `GET /v1/files/{file_id}/content`.
     * @param {String} batchId ID батча
     * @param {module:api/AIGatewayInferenceApi~getAiGatewayBatchCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/AiGatewayBatch}
     */
    getAiGatewayBatch(batchId, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'batchId' is set
      if (batchId === undefined || batchId === null) {
        throw new Error("Missing the required parameter 'batchId' when calling getAiGatewayBatch");
      }

      let pathParams = {
        'batch_id': batchId
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['AiGatewayKey'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = AiGatewayBatch;
      let basePaths = ['https://api.timeweb.ai'];
      let basePath = basePaths[0]; // by default use the first one in "servers" defined in OpenAPI
      if (typeof opts['_base_path_index'] !== 'undefined') {
        if (opts['_base_path_index']  >= basePaths.length || opts['_base_path_index'] <  0) {
          throw new Error("Invalid index " + opts['_base_path_index'] + " when selecting the host settings. Must be less than " + basePaths.length);
        }
        basePath = basePaths[opts['_base_path_index']];
      }

      return this.apiClient.callApi(
        '/v1/batches/{batch_id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, basePath, callback
      );
    }

    /**
     * Callback function to receive the result of the getAiGatewayBatches operation.
     * @callback module:api/AIGatewayInferenceApi~getAiGatewayBatchesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AiGatewayBatchList} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка батчей
     * Чтобы получить список батчей, отправьте GET-запрос на `/v1/batches`.  Для следующей страницы передайте в `after` значение `last_id`, пока `has_more` равно `true`.
     * @param {Object} opts Optional parameters
     * @param {Number} [limit] Количество батчей на странице
     * @param {String} [after] Вернуть батчи после батча с этим ID (значение `last_id` предыдущей страницы)
     * @param {module:api/AIGatewayInferenceApi~getAiGatewayBatchesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/AiGatewayBatchList}
     */
    getAiGatewayBatches(opts, callback) {
      opts = opts || {};
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
        'limit': opts['limit'],
        'after': opts['after']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['AiGatewayKey'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = AiGatewayBatchList;
      let basePaths = ['https://api.timeweb.ai'];
      let basePath = basePaths[0]; // by default use the first one in "servers" defined in OpenAPI
      if (typeof opts['_base_path_index'] !== 'undefined') {
        if (opts['_base_path_index']  >= basePaths.length || opts['_base_path_index'] <  0) {
          throw new Error("Invalid index " + opts['_base_path_index'] + " when selecting the host settings. Must be less than " + basePaths.length);
        }
        basePath = basePaths[opts['_base_path_index']];
      }

      return this.apiClient.callApi(
        '/v1/batches', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, basePath, callback
      );
    }

    /**
     * Callback function to receive the result of the getAiGatewayFile operation.
     * @callback module:api/AIGatewayInferenceApi~getAiGatewayFileCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AiGatewayFile} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение информации о файле
     * Чтобы получить информацию о загруженном файле, отправьте GET-запрос на `/v1/files/{file_id}`.
     * @param {String} fileId ID файла
     * @param {module:api/AIGatewayInferenceApi~getAiGatewayFileCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/AiGatewayFile}
     */
    getAiGatewayFile(fileId, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'fileId' is set
      if (fileId === undefined || fileId === null) {
        throw new Error("Missing the required parameter 'fileId' when calling getAiGatewayFile");
      }

      let pathParams = {
        'file_id': fileId
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['AiGatewayKey'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = AiGatewayFile;
      let basePaths = ['https://api.timeweb.ai'];
      let basePath = basePaths[0]; // by default use the first one in "servers" defined in OpenAPI
      if (typeof opts['_base_path_index'] !== 'undefined') {
        if (opts['_base_path_index']  >= basePaths.length || opts['_base_path_index'] <  0) {
          throw new Error("Invalid index " + opts['_base_path_index'] + " when selecting the host settings. Must be less than " + basePaths.length);
        }
        basePath = basePaths[opts['_base_path_index']];
      }

      return this.apiClient.callApi(
        '/v1/files/{file_id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, basePath, callback
      );
    }

    /**
     * Callback function to receive the result of the getAiGatewayModels operation.
     * @callback module:api/AIGatewayInferenceApi~getAiGatewayModelsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AiGatewayModelList} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка моделей AI Gateway
     * Чтобы получить список моделей, доступных ключу, отправьте GET-запрос на `/v1/models`.  Поле `mode` показывает назначение модели. В списке могут оставаться модели, снятые с обслуживания: запросы к ним возвращают ошибку 410. Актуальный статус, цены и возможности моделей — в каталоге `GET https://api.timeweb.cloud/api/v3/cloud-ai/models` (снятые модели — `is_stopped: true`).
     * @param {module:api/AIGatewayInferenceApi~getAiGatewayModelsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/AiGatewayModelList}
     */
    getAiGatewayModels(opts, callback) {
      opts = opts || {};
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['AiGatewayKey'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = AiGatewayModelList;
      let basePaths = ['https://api.timeweb.ai'];
      let basePath = basePaths[0]; // by default use the first one in "servers" defined in OpenAPI
      if (typeof opts['_base_path_index'] !== 'undefined') {
        if (opts['_base_path_index']  >= basePaths.length || opts['_base_path_index'] <  0) {
          throw new Error("Invalid index " + opts['_base_path_index'] + " when selecting the host settings. Must be less than " + basePaths.length);
        }
        basePath = basePaths[opts['_base_path_index']];
      }

      return this.apiClient.callApi(
        '/v1/models', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, basePath, callback
      );
    }

    /**
     * Callback function to receive the result of the getAiGatewayResponse operation.
     * @callback module:api/AIGatewayInferenceApi~getAiGatewayResponseCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AiGatewayResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение ответа (Responses API)
     * Чтобы получить сохранённый ответ — например, дождаться завершения фонового ответа, — отправьте GET-запрос на `/v1/responses/{response_id}`.  Неизвестный или удалённый `response_id` возвращает ошибку 400.
     * @param {String} responseId ID ответа Responses API
     * @param {module:api/AIGatewayInferenceApi~getAiGatewayResponseCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/AiGatewayResponse}
     */
    getAiGatewayResponse(responseId, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'responseId' is set
      if (responseId === undefined || responseId === null) {
        throw new Error("Missing the required parameter 'responseId' when calling getAiGatewayResponse");
      }

      let pathParams = {
        'response_id': responseId
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['AiGatewayKey'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = AiGatewayResponse;
      let basePaths = ['https://api.timeweb.ai'];
      let basePath = basePaths[0]; // by default use the first one in "servers" defined in OpenAPI
      if (typeof opts['_base_path_index'] !== 'undefined') {
        if (opts['_base_path_index']  >= basePaths.length || opts['_base_path_index'] <  0) {
          throw new Error("Invalid index " + opts['_base_path_index'] + " when selecting the host settings. Must be less than " + basePaths.length);
        }
        basePath = basePaths[opts['_base_path_index']];
      }

      return this.apiClient.callApi(
        '/v1/responses/{response_id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, basePath, callback
      );
    }

    /**
     * Callback function to receive the result of the uploadAiGatewayFile operation.
     * @callback module:api/AIGatewayInferenceApi~uploadAiGatewayFileCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AiGatewayFile} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Загрузка файла
     * Чтобы загрузить файл, отправьте POST-запрос на `/v1/files` (multipart/form-data).  Файл загружается для конкретной модели, поэтому `model` (или `target_model_names`) обязателен: - `purpose=batch` — входной JSONL-файл Batch API. Все строки должны обращаться к одной модели — той, что указана в `model`, иначе вернётся 400. Размер — до 50 МБ и до 50 000 запросов; - `user_data` и другие назначения OpenAI — файлы, на которые можно сослаться по `file_id` в сообщениях.  Загрузка бесплатна. Сохраняйте `id` загруженных файлов: получить список файлов нельзя (`GET /v1/files` возвращает 405).
     * @param {File} file Файл. Для Batch API — JSONL, по одному запросу в строке
     * @param {String} purpose Назначение: `batch` — входной файл Batch API, `user_data` и другие назначения OpenAI — файлы для передачи модели
     * @param {Object} opts Optional parameters
     * @param {String} [model] Модель, для которой загружается файл. Обязателен, если не передан `target_model_names`
     * @param {String} [targetModelNames] Список моделей через запятую — вместо `model`
     * @param {module:api/AIGatewayInferenceApi~uploadAiGatewayFileCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/AiGatewayFile}
     */
    uploadAiGatewayFile(file, purpose, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'file' is set
      if (file === undefined || file === null) {
        throw new Error("Missing the required parameter 'file' when calling uploadAiGatewayFile");
      }
      // verify the required parameter 'purpose' is set
      if (purpose === undefined || purpose === null) {
        throw new Error("Missing the required parameter 'purpose' when calling uploadAiGatewayFile");
      }

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
        'file': file,
        'purpose': purpose,
        'model': opts['model'],
        'target_model_names': opts['targetModelNames']
      };

      let authNames = ['AiGatewayKey'];
      let contentTypes = ['multipart/form-data'];
      let accepts = ['application/json'];
      let returnType = AiGatewayFile;
      let basePaths = ['https://api.timeweb.ai'];
      let basePath = basePaths[0]; // by default use the first one in "servers" defined in OpenAPI
      if (typeof opts['_base_path_index'] !== 'undefined') {
        if (opts['_base_path_index']  >= basePaths.length || opts['_base_path_index'] <  0) {
          throw new Error("Invalid index " + opts['_base_path_index'] + " when selecting the host settings. Must be less than " + basePaths.length);
        }
        basePath = basePaths[opts['_base_path_index']];
      }

      return this.apiClient.callApi(
        '/v1/files', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, basePath, callback
      );
    }


}
