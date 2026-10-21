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
import CreateAiKey from '../model/CreateAiKey';
import CreateAiKey201Response from '../model/CreateAiKey201Response';
import CreateAiKeyLimit from '../model/CreateAiKeyLimit';
import CreateAiKeyLimit201Response from '../model/CreateAiKeyLimit201Response';
import GetAccountStatus403Response from '../model/GetAccountStatus403Response';
import GetAiKeyCallsStatistic200Response from '../model/GetAiKeyCallsStatistic200Response';
import GetAiKeyLimits200Response from '../model/GetAiKeyLimits200Response';
import GetAiKeyModelsStatistic200Response from '../model/GetAiKeyModelsStatistic200Response';
import GetAiKeyTokenUsageStatistic200Response from '../model/GetAiKeyTokenUsageStatistic200Response';
import GetAiKeys200Response from '../model/GetAiKeys200Response';
import GetFinances400Response from '../model/GetFinances400Response';
import GetFinances401Response from '../model/GetFinances401Response';
import GetFinances429Response from '../model/GetFinances429Response';
import GetFinances500Response from '../model/GetFinances500Response';
import GetImage404Response from '../model/GetImage404Response';
import SyncAiKeyLimits from '../model/SyncAiKeyLimits';
import UpdateAiKey from '../model/UpdateAiKey';
import UpdateAiKey200Response from '../model/UpdateAiKey200Response';
import UpdateAiKeyLimit from '../model/UpdateAiKeyLimit';
import UpdateDatabaseInstance409Response from '../model/UpdateDatabaseInstance409Response';

/**
* AIGateway service.
* @module api/AIGatewayApi
* @version 1.0.0
*/
export default class AIGatewayApi {

    /**
    * Constructs a new AIGatewayApi. 
    * @alias module:api/AIGatewayApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }


    /**
     * Callback function to receive the result of the createAiKey operation.
     * @callback module:api/AIGatewayApi~createAiKeyCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateAiKey201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Создание ключа AI Gateway
     * Чтобы создать ключ AI Gateway, отправьте POST-запрос на `/api/v1/cloud-ai/ai-keys`.  Значение ключа (`sk-...`) возвращается в поле `key` только в ответе на этот запрос — сохраните его. Если значение утеряно, перевыпустите ключ.  Если список `fallback_models` некорректен, вернётся 400 с `error_code` `fallback_chain_invalid` (больше двух моделей или повторы, правило — в `details.reason`) или `fallback_model_not_found` (модели нет среди действующих текстовых моделей, список — в `details.model_names`).
     * @param {module:model/CreateAiKey} createAiKey 
     * @param {module:api/AIGatewayApi~createAiKeyCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateAiKey201Response}
     */
    createAiKey(createAiKey, callback) {
      let postBody = createAiKey;
      // verify the required parameter 'createAiKey' is set
      if (createAiKey === undefined || createAiKey === null) {
        throw new Error("Missing the required parameter 'createAiKey' when calling createAiKey");
      }

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = CreateAiKey201Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/ai-keys', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the createAiKeyLimit operation.
     * @callback module:api/AIGatewayApi~createAiKeyLimitCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateAiKeyLimit201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Создание лимита ключа AI Gateway
     * Чтобы ограничить расход ключа AI Gateway, отправьте POST-запрос на `/api/v1/cloud-ai/ai-keys/{key_id}/entity-limits`.  Лимит задаётся в токенах (`limit`) или в деньгах (`money_limit`, приоритетнее) на период `limit_type` — для всех моделей или для одной (`model_id`). Когда лимит исчерпан, запросы ключа к AI Gateway API завершаются ошибкой 422 до начала следующего периода. Если от лимита осталась часть, максимальный размер ответа текстового запроса уменьшается так, чтобы уложиться в остаток.  На один период и одну модель (или на все модели) можно завести только один лимит — повторный вернёт 409 с `error_code` `entity_keys_limit_already_exists`. Если не передан ни `limit`, ни `money_limit`, вернётся 400 с `error_code` `entity_keys_limit_value_required`.
     * @param {String} keyId ID ключа AI Gateway (UUID)
     * @param {module:model/CreateAiKeyLimit} createAiKeyLimit 
     * @param {module:api/AIGatewayApi~createAiKeyLimitCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateAiKeyLimit201Response}
     */
    createAiKeyLimit(keyId, createAiKeyLimit, callback) {
      let postBody = createAiKeyLimit;
      // verify the required parameter 'keyId' is set
      if (keyId === undefined || keyId === null) {
        throw new Error("Missing the required parameter 'keyId' when calling createAiKeyLimit");
      }
      // verify the required parameter 'createAiKeyLimit' is set
      if (createAiKeyLimit === undefined || createAiKeyLimit === null) {
        throw new Error("Missing the required parameter 'createAiKeyLimit' when calling createAiKeyLimit");
      }

      let pathParams = {
        'key_id': keyId
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = CreateAiKeyLimit201Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/ai-keys/{key_id}/entity-limits', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteAiKey operation.
     * @callback module:api/AIGatewayApi~deleteAiKeyCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Удаление ключа AI Gateway
     * Чтобы удалить ключ AI Gateway, отправьте DELETE-запрос на `/api/v1/cloud-ai/ai-keys/{key_id}`.  После удаления запросы с этим ключом перестают приниматься. Ключи, которыми управляет платформа (`is_readonly: true`), удалить нельзя: вернётся 403 с `error_code` `ai_key_is_readonly`.
     * @param {String} keyId ID ключа AI Gateway (UUID)
     * @param {module:api/AIGatewayApi~deleteAiKeyCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteAiKey(keyId, callback) {
      let postBody = null;
      // verify the required parameter 'keyId' is set
      if (keyId === undefined || keyId === null) {
        throw new Error("Missing the required parameter 'keyId' when calling deleteAiKey");
      }

      let pathParams = {
        'key_id': keyId
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = null;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/ai-keys/{key_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteAiKeyLimit operation.
     * @callback module:api/AIGatewayApi~deleteAiKeyLimitCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Удаление лимита ключа AI Gateway
     * Чтобы удалить лимит ключа AI Gateway, отправьте DELETE-запрос на `/api/v1/cloud-ai/ai-keys/{key_id}/entity-limits/{limit_id}`.  Если лимит относится к другому ключу, вернётся 403.
     * @param {String} keyId ID ключа AI Gateway (UUID)
     * @param {String} limitId ID лимита (UUID)
     * @param {module:api/AIGatewayApi~deleteAiKeyLimitCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteAiKeyLimit(keyId, limitId, callback) {
      let postBody = null;
      // verify the required parameter 'keyId' is set
      if (keyId === undefined || keyId === null) {
        throw new Error("Missing the required parameter 'keyId' when calling deleteAiKeyLimit");
      }
      // verify the required parameter 'limitId' is set
      if (limitId === undefined || limitId === null) {
        throw new Error("Missing the required parameter 'limitId' when calling deleteAiKeyLimit");
      }

      let pathParams = {
        'key_id': keyId,
        'limit_id': limitId
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = null;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/ai-keys/{key_id}/entity-limits/{limit_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getAiKeyCallsStatistic operation.
     * @callback module:api/AIGatewayApi~getAiKeyCallsStatisticCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetAiKeyCallsStatistic200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение статистики запросов ключа AI Gateway
     * Чтобы получить количество запросов ключа по интервалам времени, отправьте GET-запрос на `/api/v1/cloud-ai/ai-keys/statistic/calls`.  Ключ задаётся параметрами `entity_id` (ID ключа) и `entity_type` (тип ключа). Если ключ не найден, вернётся 404. Период по умолчанию — последние 24 часа. Точки возвращаются для каждого интервала периода, включая интервалы без запросов.  Тело ответа будет представлять собой объект JSON с ключами `ai_key_calls_statistics` и `meta`.
     * @param {String} entityId ID ключа — поле `id` из списка ключей.
     * @param {module:model/String} entityType Тип ключа — поле `entity_type` из списка ключей: `aikey` — ключ, созданный пользователем, `k8s` — ключ кластера Kubernetes. Если тип не совпадает с типом ключа, вернётся 404.
     * @param {Object} opts Optional parameters
     * @param {String} [modelName] Фильтр по моделям: ID модели или несколько ID через запятую. Значение другого формата (например, с заглавными буквами) игнорируется — статистика возвращается по всем моделям.
     * @param {Date} [startTime] Начало периода в формате ISO 8601. По умолчанию — за 24 часа до `end_time`.
     * @param {Date} [endTime] Конец периода в формате ISO 8601. По умолчанию — текущий момент.
     * @param {Number} [interval = 60)] Шаг агрегации в минутах.
     * @param {module:api/AIGatewayApi~getAiKeyCallsStatisticCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetAiKeyCallsStatistic200Response}
     */
    getAiKeyCallsStatistic(entityId, entityType, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'entityId' is set
      if (entityId === undefined || entityId === null) {
        throw new Error("Missing the required parameter 'entityId' when calling getAiKeyCallsStatistic");
      }
      // verify the required parameter 'entityType' is set
      if (entityType === undefined || entityType === null) {
        throw new Error("Missing the required parameter 'entityType' when calling getAiKeyCallsStatistic");
      }

      let pathParams = {
      };
      let queryParams = {
        'entity_id': entityId,
        'entity_type': entityType,
        'model_name': opts['modelName'],
        'start_time': opts['startTime'],
        'end_time': opts['endTime'],
        'interval': opts['interval']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = GetAiKeyCallsStatistic200Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/ai-keys/statistic/calls', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getAiKeyLimit operation.
     * @callback module:api/AIGatewayApi~getAiKeyLimitCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateAiKeyLimit201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение лимита ключа AI Gateway
     * Чтобы получить лимит ключа AI Gateway, отправьте GET-запрос на `/api/v1/cloud-ai/ai-keys/{key_id}/entity-limits/{limit_id}`.  Если лимит относится к другому ключу, вернётся 403 с `error_code` `entity_keys_limit_forbidden`.
     * @param {String} keyId ID ключа AI Gateway (UUID)
     * @param {String} limitId ID лимита (UUID)
     * @param {module:api/AIGatewayApi~getAiKeyLimitCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateAiKeyLimit201Response}
     */
    getAiKeyLimit(keyId, limitId, callback) {
      let postBody = null;
      // verify the required parameter 'keyId' is set
      if (keyId === undefined || keyId === null) {
        throw new Error("Missing the required parameter 'keyId' when calling getAiKeyLimit");
      }
      // verify the required parameter 'limitId' is set
      if (limitId === undefined || limitId === null) {
        throw new Error("Missing the required parameter 'limitId' when calling getAiKeyLimit");
      }

      let pathParams = {
        'key_id': keyId,
        'limit_id': limitId
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = CreateAiKeyLimit201Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/ai-keys/{key_id}/entity-limits/{limit_id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getAiKeyLimits operation.
     * @callback module:api/AIGatewayApi~getAiKeyLimitsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetAiKeyLimits200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка лимитов ключа AI Gateway
     * Чтобы получить лимиты расхода ключа AI Gateway, отправьте GET-запрос на `/api/v1/cloud-ai/ai-keys/{key_id}/entity-limits`.  Тело ответа будет представлять собой объект JSON с ключами `ai_key_entity_limits` и `meta`.
     * @param {String} keyId ID ключа AI Gateway (UUID)
     * @param {Object} opts Optional parameters
     * @param {String} [entityType] Фильтр по типу сущности лимита (`entity_type`).
     * @param {module:model/String} [limitType] Фильтр по периоду лимита.
     * @param {module:api/AIGatewayApi~getAiKeyLimitsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetAiKeyLimits200Response}
     */
    getAiKeyLimits(keyId, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'keyId' is set
      if (keyId === undefined || keyId === null) {
        throw new Error("Missing the required parameter 'keyId' when calling getAiKeyLimits");
      }

      let pathParams = {
        'key_id': keyId
      };
      let queryParams = {
        'entity_type': opts['entityType'],
        'limit_type': opts['limitType']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = GetAiKeyLimits200Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/ai-keys/{key_id}/entity-limits', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getAiKeyModelsStatistic operation.
     * @callback module:api/AIGatewayApi~getAiKeyModelsStatisticCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetAiKeyModelsStatistic200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка моделей, использованных ключом AI Gateway
     * Чтобы получить список моделей, к которым обращался ключ за период, отправьте GET-запрос на `/api/v1/cloud-ai/ai-keys/statistic/models`.  Ключ задаётся параметрами `entity_id` (ID ключа) и `entity_type` (тип ключа). Если ключ не найден, вернётся 404. Период по умолчанию — последние 24 часа. Модели отсортированы по алфавиту.  Тело ответа будет представлять собой объект JSON с ключами `ai_key_models_statistics` и `meta`.
     * @param {String} entityId ID ключа — поле `id` из списка ключей.
     * @param {module:model/String} entityType Тип ключа — поле `entity_type` из списка ключей: `aikey` — ключ, созданный пользователем, `k8s` — ключ кластера Kubernetes. Если тип не совпадает с типом ключа, вернётся 404.
     * @param {Object} opts Optional parameters
     * @param {String} [modelName] Фильтр по моделям: ID модели или несколько ID через запятую. Значение другого формата (например, с заглавными буквами) игнорируется — статистика возвращается по всем моделям.
     * @param {Date} [startTime] Начало периода в формате ISO 8601. По умолчанию — за 24 часа до `end_time`.
     * @param {Date} [endTime] Конец периода в формате ISO 8601. По умолчанию — текущий момент.
     * @param {module:api/AIGatewayApi~getAiKeyModelsStatisticCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetAiKeyModelsStatistic200Response}
     */
    getAiKeyModelsStatistic(entityId, entityType, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'entityId' is set
      if (entityId === undefined || entityId === null) {
        throw new Error("Missing the required parameter 'entityId' when calling getAiKeyModelsStatistic");
      }
      // verify the required parameter 'entityType' is set
      if (entityType === undefined || entityType === null) {
        throw new Error("Missing the required parameter 'entityType' when calling getAiKeyModelsStatistic");
      }

      let pathParams = {
      };
      let queryParams = {
        'entity_id': entityId,
        'entity_type': entityType,
        'model_name': opts['modelName'],
        'start_time': opts['startTime'],
        'end_time': opts['endTime']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = GetAiKeyModelsStatistic200Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/ai-keys/statistic/models', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getAiKeyTokenUsageStatistic operation.
     * @callback module:api/AIGatewayApi~getAiKeyTokenUsageStatisticCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetAiKeyTokenUsageStatistic200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение статистики расхода токенов ключа AI Gateway
     * Чтобы получить расход токенов и стоимость запросов ключа по интервалам времени, отправьте GET-запрос на `/api/v1/cloud-ai/ai-keys/statistic/token-usage`.  Ключ задаётся параметрами `entity_id` (ID ключа) и `entity_type` (тип ключа). Если ключ не найден, вернётся 404. Период по умолчанию — последние 24 часа. Точки возвращаются для каждого интервала периода, включая интервалы без запросов.  Тело ответа будет представлять собой объект JSON с ключами `ai_key_token_statistics` и `meta`.
     * @param {String} entityId ID ключа — поле `id` из списка ключей.
     * @param {module:model/String} entityType Тип ключа — поле `entity_type` из списка ключей: `aikey` — ключ, созданный пользователем, `k8s` — ключ кластера Kubernetes. Если тип не совпадает с типом ключа, вернётся 404.
     * @param {Object} opts Optional parameters
     * @param {String} [modelName] Фильтр по моделям: ID модели или несколько ID через запятую. Значение другого формата (например, с заглавными буквами) игнорируется — статистика возвращается по всем моделям.
     * @param {Date} [startTime] Начало периода в формате ISO 8601. По умолчанию — за 24 часа до `end_time`.
     * @param {Date} [endTime] Конец периода в формате ISO 8601. По умолчанию — текущий момент.
     * @param {Number} [interval = 60)] Шаг агрегации в минутах.
     * @param {module:api/AIGatewayApi~getAiKeyTokenUsageStatisticCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetAiKeyTokenUsageStatistic200Response}
     */
    getAiKeyTokenUsageStatistic(entityId, entityType, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'entityId' is set
      if (entityId === undefined || entityId === null) {
        throw new Error("Missing the required parameter 'entityId' when calling getAiKeyTokenUsageStatistic");
      }
      // verify the required parameter 'entityType' is set
      if (entityType === undefined || entityType === null) {
        throw new Error("Missing the required parameter 'entityType' when calling getAiKeyTokenUsageStatistic");
      }

      let pathParams = {
      };
      let queryParams = {
        'entity_id': entityId,
        'entity_type': entityType,
        'model_name': opts['modelName'],
        'start_time': opts['startTime'],
        'end_time': opts['endTime'],
        'interval': opts['interval']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = GetAiKeyTokenUsageStatistic200Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/ai-keys/statistic/token-usage', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getAiKeys operation.
     * @callback module:api/AIGatewayApi~getAiKeysCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetAiKeys200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка ключей AI Gateway
     * Чтобы получить список ключей AI Gateway, отправьте GET-запрос на `/api/v1/cloud-ai/ai-keys`.  В списке — ключи, созданные пользователем, и ключи кластеров Kubernetes, выпущенные платформой. Значения ключей (`sk-...`) не возвращаются.  Тело ответа будет представлять собой объект JSON с ключами `ai_keys` и `meta`.
     * @param {module:api/AIGatewayApi~getAiKeysCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetAiKeys200Response}
     */
    getAiKeys(callback) {
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = GetAiKeys200Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/ai-keys', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the regenerateAiKey operation.
     * @callback module:api/AIGatewayApi~regenerateAiKeyCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateAiKey201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Перевыпуск ключа AI Gateway
     * Чтобы перевыпустить ключ AI Gateway, отправьте PUT-запрос на `/api/v1/cloud-ai/ai-keys/{key_id}/regenerate`.  Ключ получает новое значение, старое перестаёт действовать сразу. Название, лимиты, запасные модели и статистика сохраняются. Новое значение (`sk-...`) возвращается в поле `key` только в ответе на этот запрос — сохраните его. Поле `expires_at` в ответе не заполняется.  Ключи, которыми управляет платформа (`is_readonly: true`), перевыпустить нельзя: вернётся 403 с `error_code` `ai_key_is_readonly`.
     * @param {String} keyId ID ключа AI Gateway (UUID)
     * @param {module:api/AIGatewayApi~regenerateAiKeyCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateAiKey201Response}
     */
    regenerateAiKey(keyId, callback) {
      let postBody = null;
      // verify the required parameter 'keyId' is set
      if (keyId === undefined || keyId === null) {
        throw new Error("Missing the required parameter 'keyId' when calling regenerateAiKey");
      }

      let pathParams = {
        'key_id': keyId
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = CreateAiKey201Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/ai-keys/{key_id}/regenerate', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the syncAiKeyLimits operation.
     * @callback module:api/AIGatewayApi~syncAiKeyLimitsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetAiKeyLimits200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Синхронизация лимитов ключа AI Gateway
     * Чтобы задать все лимиты ключа AI Gateway на один период одним запросом, отправьте PUT-запрос на `/api/v1/cloud-ai/ai-keys/{key_id}/entity-limits/sync`.  Лимиты из `limits` создаются или обновляются (по `model_id`), а лимиты того же периода, которых нет в запросе, удаляются. Изменения применяются целиком или не применяются совсем.  Если в записи не задан ни `limit`, ни `money_limit` или `money_limit` снимается без `limit`, вернётся 400 с `error_code` `entity_keys_limit_value_required`. Если лимиты одновременно изменил другой запрос, вернётся 409 с `error_code` `entity_keys_limits_sync_conflict` — повторите запрос.  Тело ответа будет представлять собой объект JSON с ключами `ai_key_entity_limits` и `meta` — лимиты периода после синхронизации.
     * @param {String} keyId ID ключа AI Gateway (UUID)
     * @param {module:model/SyncAiKeyLimits} syncAiKeyLimits 
     * @param {module:api/AIGatewayApi~syncAiKeyLimitsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetAiKeyLimits200Response}
     */
    syncAiKeyLimits(keyId, syncAiKeyLimits, callback) {
      let postBody = syncAiKeyLimits;
      // verify the required parameter 'keyId' is set
      if (keyId === undefined || keyId === null) {
        throw new Error("Missing the required parameter 'keyId' when calling syncAiKeyLimits");
      }
      // verify the required parameter 'syncAiKeyLimits' is set
      if (syncAiKeyLimits === undefined || syncAiKeyLimits === null) {
        throw new Error("Missing the required parameter 'syncAiKeyLimits' when calling syncAiKeyLimits");
      }

      let pathParams = {
        'key_id': keyId
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = GetAiKeyLimits200Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/ai-keys/{key_id}/entity-limits/sync', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the updateAiKey operation.
     * @callback module:api/AIGatewayApi~updateAiKeyCallback
     * @param {String} error Error message, if any.
     * @param {module:model/UpdateAiKey200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Изменение ключа AI Gateway
     * Чтобы изменить ключ AI Gateway, отправьте PATCH-запрос на `/api/v1/cloud-ai/ai-keys/{key_id}`, передав изменяемые поля.  Ключи, которыми управляет платформа (`is_readonly: true` — ключи AI-решений и кластеров Kubernetes), изменить нельзя: вернётся 403 с `error_code` `ai_key_is_readonly`.  Ошибки в `fallback_models` — как при создании ключа (400). Поле `expires_at` в ответе этого запроса не заполняется — срок действия ключа смотрите в списке ключей.
     * @param {String} keyId ID ключа AI Gateway (UUID)
     * @param {module:model/UpdateAiKey} updateAiKey 
     * @param {module:api/AIGatewayApi~updateAiKeyCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/UpdateAiKey200Response}
     */
    updateAiKey(keyId, updateAiKey, callback) {
      let postBody = updateAiKey;
      // verify the required parameter 'keyId' is set
      if (keyId === undefined || keyId === null) {
        throw new Error("Missing the required parameter 'keyId' when calling updateAiKey");
      }
      // verify the required parameter 'updateAiKey' is set
      if (updateAiKey === undefined || updateAiKey === null) {
        throw new Error("Missing the required parameter 'updateAiKey' when calling updateAiKey");
      }

      let pathParams = {
        'key_id': keyId
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = UpdateAiKey200Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/ai-keys/{key_id}', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the updateAiKeyLimit operation.
     * @callback module:api/AIGatewayApi~updateAiKeyLimitCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateAiKeyLimit201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Изменение лимита ключа AI Gateway
     * Чтобы изменить лимит ключа AI Gateway, отправьте PATCH-запрос на `/api/v1/cloud-ai/ai-keys/{key_id}/entity-limits/{limit_id}`.  Не переданные поля не меняются. Если не передан ни `limit`, ни `money_limit` или `money_limit` снимается без `limit`, вернётся 400 с `error_code` `entity_keys_limit_value_required`. Если лимит относится к другому ключу, вернётся 403.
     * @param {String} keyId ID ключа AI Gateway (UUID)
     * @param {String} limitId ID лимита (UUID)
     * @param {module:model/UpdateAiKeyLimit} updateAiKeyLimit 
     * @param {module:api/AIGatewayApi~updateAiKeyLimitCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateAiKeyLimit201Response}
     */
    updateAiKeyLimit(keyId, limitId, updateAiKeyLimit, callback) {
      let postBody = updateAiKeyLimit;
      // verify the required parameter 'keyId' is set
      if (keyId === undefined || keyId === null) {
        throw new Error("Missing the required parameter 'keyId' when calling updateAiKeyLimit");
      }
      // verify the required parameter 'limitId' is set
      if (limitId === undefined || limitId === null) {
        throw new Error("Missing the required parameter 'limitId' when calling updateAiKeyLimit");
      }
      // verify the required parameter 'updateAiKeyLimit' is set
      if (updateAiKeyLimit === undefined || updateAiKeyLimit === null) {
        throw new Error("Missing the required parameter 'updateAiKeyLimit' when calling updateAiKeyLimit");
      }

      let pathParams = {
        'key_id': keyId,
        'limit_id': limitId
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = CreateAiKeyLimit201Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/ai-keys/{key_id}/entity-limits/{limit_id}', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}
