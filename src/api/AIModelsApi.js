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
import GetAccountStatus403Response from '../model/GetAccountStatus403Response';
import GetAgentsTokenPackages200Response from '../model/GetAgentsTokenPackages200Response';
import GetAiModelParameters200Response from '../model/GetAiModelParameters200Response';
import GetAiModelTokenPackages200Response from '../model/GetAiModelTokenPackages200Response';
import GetAiProvider200Response from '../model/GetAiProvider200Response';
import GetAiProviders200Response from '../model/GetAiProviders200Response';
import GetFinances400Response from '../model/GetFinances400Response';
import GetFinances401Response from '../model/GetFinances401Response';
import GetFinances429Response from '../model/GetFinances429Response';
import GetFinances500Response from '../model/GetFinances500Response';
import GetKnowledgebasesTokenPackages200Response from '../model/GetKnowledgebasesTokenPackages200Response';
import GetModels200Response from '../model/GetModels200Response';
import GetModelsV3200Response from '../model/GetModelsV3200Response';

/**
* AIModels service.
* @module api/AIModelsApi
* @version 1.0.0
*/
export default class AIModelsApi {

    /**
    * Constructs a new AIModelsApi. 
    * @alias module:api/AIModelsApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }


    /**
     * Callback function to receive the result of the getAgentsTokenPackages operation.
     * @callback module:api/AIModelsApi~getAgentsTokenPackagesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetAgentsTokenPackages200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка пакетов токенов для агентов
     * Метод устарел.  Чтобы получить список пакетов токенов для AI агентов всех моделей, отправьте GET-запрос на `/api/v1/cloud-ai/token-packages/agents`.  Тело ответа будет представлять собой объект JSON с ключами `token_packages` и `meta`.
     * @param {module:api/AIModelsApi~getAgentsTokenPackagesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetAgentsTokenPackages200Response}
     */
    getAgentsTokenPackages(callback) {
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
      let returnType = GetAgentsTokenPackages200Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/token-packages/agents', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getAiModelParameters operation.
     * @callback module:api/AIModelsApi~getAiModelParametersCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetAiModelParameters200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение справочника характеристик моделей
     * Чтобы получить справочник характеристик, которые возвращаются в `parameter_values` моделей, отправьте GET-запрос на `/api/v3/cloud-ai/model-parameters`.  Справочник описывает название, тип, единицу измерения и направление сравнения каждой характеристики. Цены кэша (`cost_cache_read`, `cost_cache_write`) в справочник не входят.  Тело ответа будет представлять собой объект JSON с ключами `model_parameters` и `meta`.
     * @param {module:api/AIModelsApi~getAiModelParametersCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetAiModelParameters200Response}
     */
    getAiModelParameters(callback) {
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
      let returnType = GetAiModelParameters200Response;
      return this.apiClient.callApi(
        '/api/v3/cloud-ai/model-parameters', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getAiModelTokenPackages operation.
     * @callback module:api/AIModelsApi~getAiModelTokenPackagesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetAiModelTokenPackages200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение пакетов токенов модели
     * Чтобы получить пакеты токенов, доступные для AI модели, отправьте GET-запрос на `/api/v1/cloud-ai/models/{id}/token-packages`.  Тело ответа будет представлять собой объект JSON с ключами `token_packages` и `meta`.
     * @param {Number} id ID модели
     * @param {module:api/AIModelsApi~getAiModelTokenPackagesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetAiModelTokenPackages200Response}
     */
    getAiModelTokenPackages(id, callback) {
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling getAiModelTokenPackages");
      }

      let pathParams = {
        'id': id
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
      let returnType = GetAiModelTokenPackages200Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/models/{id}/token-packages', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getAiProvider operation.
     * @callback module:api/AIModelsApi~getAiProviderCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetAiProvider200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение провайдера моделей
     * Чтобы получить информацию о провайдере AI моделей, отправьте GET-запрос на `/api/v1/cloud-ai/providers/{id}`.  Тело ответа будет представлять собой объект JSON с ключом `provider`.
     * @param {Number} id ID провайдера
     * @param {module:api/AIModelsApi~getAiProviderCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetAiProvider200Response}
     */
    getAiProvider(id, callback) {
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling getAiProvider");
      }

      let pathParams = {
        'id': id
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
      let returnType = GetAiProvider200Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/providers/{id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getAiProviders operation.
     * @callback module:api/AIModelsApi~getAiProvidersCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetAiProviders200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка провайдеров моделей
     * Чтобы получить список провайдеров AI моделей, отправьте GET-запрос на `/api/v1/cloud-ai/providers`.  Провайдер модели — поле `provider_id` модели.  Тело ответа будет представлять собой объект JSON с ключами `providers` и `meta`.
     * @param {module:api/AIModelsApi~getAiProvidersCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetAiProviders200Response}
     */
    getAiProviders(callback) {
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
      let returnType = GetAiProviders200Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/providers', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getKnowledgebasesTokenPackages operation.
     * @callback module:api/AIModelsApi~getKnowledgebasesTokenPackagesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetKnowledgebasesTokenPackages200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка пакетов токенов для баз знаний
     * Чтобы получить список пакетов токенов для баз знаний, отправьте GET-запрос на `/api/v1/cloud-ai/token-packages/knowledge-bases`.  Базовый пакет (`package_type: base`) указывается при создании базы знаний, дополнительный (`package_type: additional`) покупается через `POST /api/v1/cloud-ai/knowledge-bases/{id}/add-additional-token-package`.  Тело ответа будет представлять собой объект JSON с ключами `token_packages` и `meta`.
     * @param {module:api/AIModelsApi~getKnowledgebasesTokenPackagesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetKnowledgebasesTokenPackages200Response}
     */
    getKnowledgebasesTokenPackages(callback) {
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
      let returnType = GetKnowledgebasesTokenPackages200Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/token-packages/knowledge-bases', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getModels operation.
     * @callback module:api/AIModelsApi~getModelsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetModels200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка моделей (v1)
     * Метод устарел — используйте `GET /api/v3/cloud-ai/models`.  Чтобы получить список AI моделей, отправьте GET-запрос на `/api/v1/cloud-ai/models`.  Тело ответа будет представлять собой объект JSON с ключами `models` и `meta`.
     * @param {module:api/AIModelsApi~getModelsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetModels200Response}
     */
    getModels(callback) {
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
      let returnType = GetModels200Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/models', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getModelsV3 operation.
     * @callback module:api/AIModelsApi~getModelsV3Callback
     * @param {String} error Error message, if any.
     * @param {module:model/GetModelsV3200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка моделей
     * Чтобы получить список AI моделей с ценами и характеристиками, отправьте GET-запрос на `/api/v3/cloud-ai/models`.  Цены и характеристики (контекст, модальности, индексы качества) возвращаются в словаре `parameter_values`, их названия и единицы — в справочнике `GET /api/v3/cloud-ai/model-parameters`. В списке есть и устаревшие модели — проверяйте `is_deprecated` и `is_stopped`.  Тело ответа будет представлять собой объект JSON с ключами `models` и `meta`.
     * @param {module:api/AIModelsApi~getModelsV3Callback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetModelsV3200Response}
     */
    getModelsV3(callback) {
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
      let returnType = GetModelsV3200Response;
      return this.apiClient.callApi(
        '/api/v3/cloud-ai/models', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}
