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
import AddTokenPackage from '../model/AddTokenPackage';
import ChangeAgentModel from '../model/ChangeAgentModel';
import CreateAgent from '../model/CreateAgent';
import CreateAgent201Response from '../model/CreateAgent201Response';
import CreateAgentEntityLimit from '../model/CreateAgentEntityLimit';
import CreateAgentEntityLimit201Response from '../model/CreateAgentEntityLimit201Response';
import CreateAgentV2 from '../model/CreateAgentV2';
import DeleteAgent from '../model/DeleteAgent';
import ExportAgentChatsCsv200Response from '../model/ExportAgentChatsCsv200Response';
import GetAccountStatus403Response from '../model/GetAccountStatus403Response';
import GetAgentChatList200Response from '../model/GetAgentChatList200Response';
import GetAgentChatMessages200Response from '../model/GetAgentChatMessages200Response';
import GetAgentEntityLimits200Response from '../model/GetAgentEntityLimits200Response';
import GetAgentStatistics200Response from '../model/GetAgentStatistics200Response';
import GetAgentV3200Response from '../model/GetAgentV3200Response';
import GetAgents200Response from '../model/GetAgents200Response';
import GetAgentsV3200Response from '../model/GetAgentsV3200Response';
import GetFinances400Response from '../model/GetFinances400Response';
import GetFinances401Response from '../model/GetFinances401Response';
import GetFinances429Response from '../model/GetFinances429Response';
import GetFinances500Response from '../model/GetFinances500Response';
import GetImage404Response from '../model/GetImage404Response';
import SyncAgentEntityLimits from '../model/SyncAgentEntityLimits';
import UpdateAgent from '../model/UpdateAgent';
import UpdateAgentEntityLimit from '../model/UpdateAgentEntityLimit';
import UpdateDatabaseInstance409Response from '../model/UpdateDatabaseInstance409Response';

/**
* AIAgents service.
* @module api/AIAgentsApi
* @version 1.0.0
*/
export default class AIAgentsApi {

    /**
    * Constructs a new AIAgentsApi. 
    * @alias module:api/AIAgentsApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }


    /**
     * Callback function to receive the result of the addAdditionalTokenPackage operation.
     * @callback module:api/AIAgentsApi~addAdditionalTokenPackageCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Добавление дополнительного пакета токенов
     * Чтобы докупить дополнительные пакеты токенов для AI агента, отправьте POST-запрос на `/api/v1/cloud-ai/agents/{id}/add-additional-token-package`.  Метод относится к устаревшей схеме оплаты пакетами токенов и работает только для агентов с пакетом (`token_package_id` в ответе агента). Для агентов с поресурсной оплатой вернётся 400 `per-resource_agents_do_not_support_additional_token_packages`. Стоимость (цена дополнительного пакета модели агента × `count`) сразу списывается с баланса; при нехватке средств — 400 `insufficient_balance`, если подписка агента истекла — 400 `subscription_expired`. После покупки заблокированный агент разблокируется.  Для токенов дополнительных пользователей аккаунта нужна роль `ai:write`.
     * @param {Number} id ID агента
     * @param {Object} opts Optional parameters
     * @param {module:model/AddTokenPackage} [addTokenPackage] 
     * @param {module:api/AIAgentsApi~addAdditionalTokenPackageCallback} callback The callback function, accepting three arguments: error, data, response
     */
    addAdditionalTokenPackage(id, opts, callback) {
      opts = opts || {};
      let postBody = opts['addTokenPackage'];
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling addAdditionalTokenPackage");
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
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = null;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/agents/{id}/add-additional-token-package', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the changeAgentModel operation.
     * @callback module:api/AIAgentsApi~changeAgentModelCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateAgent201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Смена модели AI агента
     * Чтобы сменить основную модель AI агента, отправьте PATCH-запрос на `/api/v1/cloud-ai/agents/{id}/model`.  Параметры модели из `settings.model`, которые новая модель не поддерживает, отбрасываются. Смена модели доступна только агентам с поресурсной оплатой (для агента с пакетом токенов — 400 `model_change_is_allowed_only_for_per-resource_account_and_agent`). Если модель не найдена или недоступна — 404 `model_not_found`.  Для токенов дополнительных пользователей аккаунта нужна роль `ai:write`.
     * @param {Number} id ID агента
     * @param {module:model/ChangeAgentModel} changeAgentModel 
     * @param {module:api/AIAgentsApi~changeAgentModelCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateAgent201Response}
     */
    changeAgentModel(id, changeAgentModel, callback) {
      let postBody = changeAgentModel;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling changeAgentModel");
      }
      // verify the required parameter 'changeAgentModel' is set
      if (changeAgentModel === undefined || changeAgentModel === null) {
        throw new Error("Missing the required parameter 'changeAgentModel' when calling changeAgentModel");
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
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = CreateAgent201Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/agents/{id}/model', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the createAgent operation.
     * @callback module:api/AIAgentsApi~createAgentCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateAgent201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Создание AI агента
     * Чтобы создать AI агента, отправьте POST-запрос на `/api/v1/cloud-ai/agents`, задав необходимые атрибуты.  Метод устарел — используйте `POST /api/v2/cloud-ai/agents`. Поле `token_package_id` обязательно, но не учитывается: агент всегда создаётся с поресурсной оплатой (оплачиваются фактические запросы к модели).  Для токенов дополнительных пользователей аккаунта нужна роль `ai:write`.
     * @param {module:model/CreateAgent} createAgent 
     * @param {module:api/AIAgentsApi~createAgentCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateAgent201Response}
     */
    createAgent(createAgent, callback) {
      let postBody = createAgent;
      // verify the required parameter 'createAgent' is set
      if (createAgent === undefined || createAgent === null) {
        throw new Error("Missing the required parameter 'createAgent' when calling createAgent");
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
      let returnType = CreateAgent201Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/agents', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the createAgentEntityLimit operation.
     * @callback module:api/AIAgentsApi~createAgentEntityLimitCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateAgentEntityLimit201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Создание лимита агента
     * Чтобы создать лимит AI агента, отправьте POST-запрос на `/api/v1/cloud-ai/agents/{id}/entity-limits`.  Лимиты агента ограничивают расход на его запросы за период (`hour`, `day`, `week`, `month`) — в токенах (`limit`) или в деньгах (`money_limit`, приоритетнее). Лимит действует на все модели агента (`model_id` = `null`) или на одну модель. При достижении лимита запросы к агенту отклоняются до конца периода.  Нужно передать `limit` или `money_limit` (иначе — 400 `entity_keys_limit_value_required`). Если лимит с тем же периодом и моделью уже есть — 409 `entity_keys_limit_already_exists` (измените его или используйте синхронизацию).  Для токенов дополнительных пользователей аккаунта нужна роль `ai:write`.
     * @param {Number} id ID агента
     * @param {module:model/CreateAgentEntityLimit} createAgentEntityLimit 
     * @param {module:api/AIAgentsApi~createAgentEntityLimitCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateAgentEntityLimit201Response}
     */
    createAgentEntityLimit(id, createAgentEntityLimit, callback) {
      let postBody = createAgentEntityLimit;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling createAgentEntityLimit");
      }
      // verify the required parameter 'createAgentEntityLimit' is set
      if (createAgentEntityLimit === undefined || createAgentEntityLimit === null) {
        throw new Error("Missing the required parameter 'createAgentEntityLimit' when calling createAgentEntityLimit");
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
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = CreateAgentEntityLimit201Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/agents/{id}/entity-limits', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the createAgentV2 operation.
     * @callback module:api/AIAgentsApi~createAgentV2Callback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateAgent201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Создание AI агента
     * Чтобы создать AI агента, отправьте POST-запрос на `/api/v2/cloud-ai/agents`, задав необходимые атрибуты.  Агент создаётся с поресурсной оплатой: оплачиваются фактические запросы к модели. Если не переданы настройки виджета, подставляются значения по умолчанию. Дневной лимит расходов можно задать сразу полем `money_limit`, остальные лимиты — через лимиты агента (`/api/v1/cloud-ai/agents/{id}/entity-limits`).  Если модель не найдена или недоступна, вернётся 404 `model_not_found`; если модель не поддерживается — 400 `model_not_supported`; недопустимые параметры модели в `settings.model` — 400.  Вызывать созданного агента из своих приложений можно через OpenAI-совместимое API по его `access_id` — см. [документацию](https://agent.timeweb.cloud/docs).  Для токенов дополнительных пользователей аккаунта нужна роль `ai:write`.
     * @param {module:model/CreateAgentV2} createAgentV2 
     * @param {module:api/AIAgentsApi~createAgentV2Callback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateAgent201Response}
     */
    createAgentV2(createAgentV2, callback) {
      let postBody = createAgentV2;
      // verify the required parameter 'createAgentV2' is set
      if (createAgentV2 === undefined || createAgentV2 === null) {
        throw new Error("Missing the required parameter 'createAgentV2' when calling createAgentV2");
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
      let returnType = CreateAgent201Response;
      return this.apiClient.callApi(
        '/api/v2/cloud-ai/agents', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteAgent operation.
     * @callback module:api/AIAgentsApi~deleteAgentCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Удаление AI агента
     * Чтобы удалить AI агента, отправьте DELETE-запрос на `/api/v1/cloud-ai/agents/{id}`.  Вместе с агентом отключаются его базы знаний, навыки и интеграции (Telegram, MAX, Jivo, Crisp). В теле запроса можно необязательно указать причину удаления.  Для токенов дополнительных пользователей аккаунта нужна роль `ai:write`.
     * @param {Number} id ID агента
     * @param {Object} opts Optional parameters
     * @param {module:model/DeleteAgent} [deleteAgent] 
     * @param {module:api/AIAgentsApi~deleteAgentCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteAgent(id, opts, callback) {
      opts = opts || {};
      let postBody = opts['deleteAgent'];
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling deleteAgent");
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
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = null;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/agents/{id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteAgentEntityLimit operation.
     * @callback module:api/AIAgentsApi~deleteAgentEntityLimitCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Удаление лимита агента
     * Чтобы удалить лимит AI агента, отправьте DELETE-запрос на `/api/v1/cloud-ai/agents/{id}/entity-limits/{limit_id}`.  Для токенов дополнительных пользователей аккаунта нужна роль `ai:write`.
     * @param {Number} id ID агента
     * @param {String} limitId ID лимита агента
     * @param {module:api/AIAgentsApi~deleteAgentEntityLimitCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteAgentEntityLimit(id, limitId, callback) {
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling deleteAgentEntityLimit");
      }
      // verify the required parameter 'limitId' is set
      if (limitId === undefined || limitId === null) {
        throw new Error("Missing the required parameter 'limitId' when calling deleteAgentEntityLimit");
      }

      let pathParams = {
        'id': id,
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
        '/api/v1/cloud-ai/agents/{id}/entity-limits/{limit_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the exportAgentChatsCsv operation.
     * @callback module:api/AIAgentsApi~exportAgentChatsCsvCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ExportAgentChatsCsv200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Выгрузка чатов агента в CSV
     * Чтобы выгрузить чаты AI агента в формате CSV, отправьте GET-запрос на `/api/v1/cloud-ai/agents/{id}/chats/docs`.  CSV возвращается строкой в поле `chats_csv.csv` тела JSON. `limit` и `offset` применяются к сообщениям, а не к чатам. Если передан `from`, выгружаются сообщения от `from` до `to` (по умолчанию — до текущего момента). Чаты внешнего чата не выгружаются.  Для токенов дополнительных пользователей аккаунта нужна роль `ai:read`.
     * @param {Number} id ID агента
     * @param {Object} opts Optional parameters
     * @param {Number} [offset = 0)] Смещение относительно начала списка
     * @param {Number} [limit = 100)] Количество сообщений в ответе
     * @param {module:model/String} [order = 'desc')] Сортировка по дате сообщения
     * @param {Date} [from] Начало периода (дата и время в формате ISO 8601)
     * @param {Date} [to] Конец периода (дата и время в формате ISO 8601)
     * @param {module:model/String} [locale = 'ru')] Язык заголовков и значений CSV
     * @param {module:api/AIAgentsApi~exportAgentChatsCsvCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ExportAgentChatsCsv200Response}
     */
    exportAgentChatsCsv(id, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling exportAgentChatsCsv");
      }

      let pathParams = {
        'id': id
      };
      let queryParams = {
        'offset': opts['offset'],
        'limit': opts['limit'],
        'order': opts['order'],
        'from': opts['from'],
        'to': opts['to'],
        'locale': opts['locale']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = ExportAgentChatsCsv200Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/agents/{id}/chats/docs', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getAgent operation.
     * @callback module:api/AIAgentsApi~getAgentCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateAgent201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение AI агента
     * Чтобы получить информацию об AI агенте, отправьте GET-запрос на `/api/v1/cloud-ai/agents/{id}`.  Для токенов дополнительных пользователей аккаунта нужна роль `ai:read`.
     * @param {Number} id ID агента
     * @param {module:api/AIAgentsApi~getAgentCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateAgent201Response}
     */
    getAgent(id, callback) {
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling getAgent");
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
      let returnType = CreateAgent201Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/agents/{id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getAgentChatList operation.
     * @callback module:api/AIAgentsApi~getAgentChatListCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetAgentChatList200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка чатов агента
     * Чтобы получить список чатов (диалогов) AI агента, отправьте GET-запрос на `/api/v1/cloud-ai/agents/{id}/chat-list`.  Для каждого чата возвращаются первое сообщение пользователя, количество оценок и среднее время ответа. Чаты внешнего чата сюда не входят. Фильтр по периоду применяется, только если переданы оба параметра `from` и `to`. В `meta.metrics` — сводка по чатам для фильтров.  Для токенов дополнительных пользователей аккаунта нужна роль `ai:read`.
     * @param {Number} id ID агента
     * @param {Object} opts Optional parameters
     * @param {Number} [offset = 0)] Смещение относительно начала списка
     * @param {Number} [limit = 100)] Количество чатов в ответе
     * @param {module:model/String} [order = 'asc')] Сортировка по дате первого сообщения
     * @param {Date} [from] Начало периода (дата и время в формате ISO 8601)
     * @param {Date} [to] Конец периода (дата и время в формате ISO 8601)
     * @param {module:model/String} [reactionType] Фильтр по оценкам: `likes` — есть положительная, `dislikes` — есть отрицательная, `with` — есть любая, `none` — без оценок
     * @param {Array.<String>} [responseTimeRanges] Фильтр по среднему времени ответа в секундах: диапазоны `мин-макс` или `мин-` («от мин и больше»). Можно передать несколько диапазонов — они объединяются по ИЛИ.
     * @param {module:api/AIAgentsApi~getAgentChatListCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetAgentChatList200Response}
     */
    getAgentChatList(id, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling getAgentChatList");
      }

      let pathParams = {
        'id': id
      };
      let queryParams = {
        'offset': opts['offset'],
        'limit': opts['limit'],
        'order': opts['order'],
        'from': opts['from'],
        'to': opts['to'],
        'reaction_type': opts['reactionType'],
        'response_time_ranges': this.apiClient.buildCollectionParam(opts['responseTimeRanges'], 'multi')
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = GetAgentChatList200Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/agents/{id}/chat-list', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getAgentChatMessages operation.
     * @callback module:api/AIAgentsApi~getAgentChatMessagesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetAgentChatMessages200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение сообщений чата агента
     * Чтобы получить сообщения чата AI агента, отправьте GET-запрос на `/api/v1/cloud-ai/agents/{id}/chat-list/{chat_id}/messages`.  Возвращаются сообщения пользователя и ответы агента. Фильтр по периоду применяется, только если переданы оба параметра `from` и `to`.  Для токенов дополнительных пользователей аккаунта нужна роль `ai:read`.
     * @param {Number} id ID агента
     * @param {String} chatId ID чата (диалога) из поля `id` списка чатов агента
     * @param {Object} opts Optional parameters
     * @param {Number} [offset = 0)] Смещение относительно начала списка
     * @param {Number} [limit = 100)] Количество сообщений в ответе
     * @param {module:model/String} [order = 'desc')] Сортировка по дате сообщения
     * @param {Date} [from] Начало периода (дата и время в формате ISO 8601)
     * @param {Date} [to] Конец периода (дата и время в формате ISO 8601)
     * @param {module:api/AIAgentsApi~getAgentChatMessagesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetAgentChatMessages200Response}
     */
    getAgentChatMessages(id, chatId, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling getAgentChatMessages");
      }
      // verify the required parameter 'chatId' is set
      if (chatId === undefined || chatId === null) {
        throw new Error("Missing the required parameter 'chatId' when calling getAgentChatMessages");
      }

      let pathParams = {
        'id': id,
        'chat_id': chatId
      };
      let queryParams = {
        'offset': opts['offset'],
        'limit': opts['limit'],
        'order': opts['order'],
        'from': opts['from'],
        'to': opts['to']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = GetAgentChatMessages200Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/agents/{id}/chat-list/{chat_id}/messages', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getAgentEntityLimit operation.
     * @callback module:api/AIAgentsApi~getAgentEntityLimitCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateAgentEntityLimit201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение лимита агента
     * Чтобы получить лимит AI агента, отправьте GET-запрос на `/api/v1/cloud-ai/agents/{id}/entity-limits/{limit_id}`.  Для токенов дополнительных пользователей аккаунта нужна роль `ai:read`.
     * @param {Number} id ID агента
     * @param {String} limitId ID лимита агента
     * @param {module:api/AIAgentsApi~getAgentEntityLimitCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateAgentEntityLimit201Response}
     */
    getAgentEntityLimit(id, limitId, callback) {
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling getAgentEntityLimit");
      }
      // verify the required parameter 'limitId' is set
      if (limitId === undefined || limitId === null) {
        throw new Error("Missing the required parameter 'limitId' when calling getAgentEntityLimit");
      }

      let pathParams = {
        'id': id,
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
      let returnType = CreateAgentEntityLimit201Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/agents/{id}/entity-limits/{limit_id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getAgentEntityLimits operation.
     * @callback module:api/AIAgentsApi~getAgentEntityLimitsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetAgentEntityLimits200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение лимитов агента
     * Чтобы получить лимиты AI агента, отправьте GET-запрос на `/api/v1/cloud-ai/agents/{id}/entity-limits`.  Лимиты агента ограничивают расход на его запросы за период (`hour`, `day`, `week`, `month`) — в токенах (`limit`) или в деньгах (`money_limit`, приоритетнее). Лимит действует на все модели агента (`model_id` = `null`) или на одну модель. При достижении лимита запросы к агенту отклоняются до конца периода.  Для токенов дополнительных пользователей аккаунта нужна роль `ai:read`.
     * @param {Number} id ID агента
     * @param {Object} opts Optional parameters
     * @param {module:model/String} [limitType] Фильтр по периоду лимита
     * @param {module:api/AIAgentsApi~getAgentEntityLimitsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetAgentEntityLimits200Response}
     */
    getAgentEntityLimits(id, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling getAgentEntityLimits");
      }

      let pathParams = {
        'id': id
      };
      let queryParams = {
        'limit_type': opts['limitType']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = GetAgentEntityLimits200Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/agents/{id}/entity-limits', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getAgentStatistics operation.
     * @callback module:api/AIAgentsApi~getAgentStatisticsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetAgentStatistics200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение статистики использования токенов агента
     * Чтобы получить статистику использования токенов AI агента, отправьте GET-запрос на `/api/v1/cloud-ai/agents/{id}/statistic`.  Статистика разбита на интервалы длиной `interval` минут: для каждого интервала возвращается по точке на каждую модель, к которой были запросы за период, а для интервалов без запросов — одна нулевая точка без `model_name`. По умолчанию возвращаются последние 24 часа.  Для токенов дополнительных пользователей аккаунта нужна роль `ai:read`.
     * @param {Number} id ID агента
     * @param {Object} opts Optional parameters
     * @param {Date} [startTime] Начало периода (ISO 8601). По умолчанию — за 24 часа до `endTime`.
     * @param {Date} [endTime] Конец периода (ISO 8601). По умолчанию — текущий момент.
     * @param {Number} [interval = 60)] Длина интервала агрегации в минутах
     * @param {module:api/AIAgentsApi~getAgentStatisticsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetAgentStatistics200Response}
     */
    getAgentStatistics(id, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling getAgentStatistics");
      }

      let pathParams = {
        'id': id
      };
      let queryParams = {
        'startTime': opts['startTime'],
        'endTime': opts['endTime'],
        'interval': opts['interval']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = GetAgentStatistics200Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/agents/{id}/statistic', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getAgentV3 operation.
     * @callback module:api/AIAgentsApi~getAgentV3Callback
     * @param {String} error Error message, if any.
     * @param {module:model/GetAgentV3200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение AI агента (v3)
     * Чтобы получить информацию об AI агенте, отправьте GET-запрос на `/api/v3/cloud-ai/agents/{id}`.  Отличается от `/api/v1/cloud-ai/agents/{id}` тем, что вместо `knowledge_bases_ids` возвращает `knowledge_bases` — подключённые базы знаний с режимом поиска.  Для токенов дополнительных пользователей аккаунта нужна роль `ai:read`.
     * @param {Number} id ID агента
     * @param {module:api/AIAgentsApi~getAgentV3Callback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetAgentV3200Response}
     */
    getAgentV3(id, callback) {
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling getAgentV3");
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
      let returnType = GetAgentV3200Response;
      return this.apiClient.callApi(
        '/api/v3/cloud-ai/agents/{id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getAgents operation.
     * @callback module:api/AIAgentsApi~getAgentsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetAgents200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка AI агентов
     * Чтобы получить список AI агентов, отправьте GET-запрос на `/api/v1/cloud-ai/agents`.  Возвращаются все агенты аккаунта (без пагинации), включая приостановленных и заблокированных. Тело ответа будет представлять собой объект JSON с ключами `agents` и `meta`. Подключённые базы знаний вместе с режимом поиска возвращает метод `/api/v3/cloud-ai/agents`.  Для токенов дополнительных пользователей аккаунта нужна роль `ai:read`.
     * @param {module:api/AIAgentsApi~getAgentsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetAgents200Response}
     */
    getAgents(callback) {
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
      let returnType = GetAgents200Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/agents', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getAgentsV3 operation.
     * @callback module:api/AIAgentsApi~getAgentsV3Callback
     * @param {String} error Error message, if any.
     * @param {module:model/GetAgentsV3200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка AI агентов (v3)
     * Чтобы получить список AI агентов, отправьте GET-запрос на `/api/v3/cloud-ai/agents`.  Отличается от `/api/v1/cloud-ai/agents` тем, что вместо `knowledge_bases_ids` возвращает `knowledge_bases` — подключённые базы знаний с режимом поиска.  Для токенов дополнительных пользователей аккаунта нужна роль `ai:read`.
     * @param {module:api/AIAgentsApi~getAgentsV3Callback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetAgentsV3200Response}
     */
    getAgentsV3(callback) {
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
      let returnType = GetAgentsV3200Response;
      return this.apiClient.callApi(
        '/api/v3/cloud-ai/agents', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the syncAgentEntityLimits operation.
     * @callback module:api/AIAgentsApi~syncAgentEntityLimitsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetAgentEntityLimits200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Синхронизация лимитов агента за период
     * Чтобы задать полный набор лимитов AI агента за период, отправьте PUT-запрос на `/api/v1/cloud-ai/agents/{id}/entity-limits/sync`.  Лимиты из запроса создаются или обновляются (сопоставление по `model_id`), а лимиты этого периода, которых нет в запросе, удаляются. Лимиты других периодов не затрагиваются. В ответе — актуальные лимиты периода. Если лимиты одновременно изменил другой запрос, вернётся 409 `entity_keys_limits_sync_conflict` — повторите запрос.  Для токенов дополнительных пользователей аккаунта нужна роль `ai:write`.
     * @param {Number} id ID агента
     * @param {module:model/SyncAgentEntityLimits} syncAgentEntityLimits 
     * @param {module:api/AIAgentsApi~syncAgentEntityLimitsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetAgentEntityLimits200Response}
     */
    syncAgentEntityLimits(id, syncAgentEntityLimits, callback) {
      let postBody = syncAgentEntityLimits;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling syncAgentEntityLimits");
      }
      // verify the required parameter 'syncAgentEntityLimits' is set
      if (syncAgentEntityLimits === undefined || syncAgentEntityLimits === null) {
        throw new Error("Missing the required parameter 'syncAgentEntityLimits' when calling syncAgentEntityLimits");
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
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = GetAgentEntityLimits200Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/agents/{id}/entity-limits/sync', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the updateAgent operation.
     * @callback module:api/AIAgentsApi~updateAgentCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateAgent201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Обновление AI агента
     * Чтобы обновить AI агента, отправьте PATCH-запрос на `/api/v1/cloud-ai/agents/{id}`, передав изменяемые поля.  Особенности: - `settings` заменяются целиком (кроме `web_search_allowed_sites`, `additional_models` и `memory_enabled`, которые сохраняются, если не переданы) — передавайте полный объект настроек, включая `widget`; - основную модель меняет отдельный метод `PATCH /api/v1/cloud-ai/agents/{id}/model`; - поле `token_limit` больше не поддерживается: запрос с ним отклоняется с кодом 410 — лимиты задаются через `/api/v1/cloud-ai/agents/{id}/entity-limits`; - ошибки привязки `ai_gateway_key_id`: 400 `ai_gateway_key_not_found`, `agent_is_already_migrated_to_another_ai_gateway_key`, `agent_is_not_eligible_for_ai_gateway_migration`; 503 — проверку временно не удалось выполнить; - изменить статус заблокированного или удалённого агента нельзя (400 `agent_can't_change_status`).  Для токенов дополнительных пользователей аккаунта нужна роль `ai:write`.
     * @param {Number} id ID агента
     * @param {module:model/UpdateAgent} updateAgent 
     * @param {module:api/AIAgentsApi~updateAgentCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateAgent201Response}
     */
    updateAgent(id, updateAgent, callback) {
      let postBody = updateAgent;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling updateAgent");
      }
      // verify the required parameter 'updateAgent' is set
      if (updateAgent === undefined || updateAgent === null) {
        throw new Error("Missing the required parameter 'updateAgent' when calling updateAgent");
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
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = CreateAgent201Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/agents/{id}', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the updateAgentEntityLimit operation.
     * @callback module:api/AIAgentsApi~updateAgentEntityLimitCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateAgentEntityLimit201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Изменение лимита агента
     * Чтобы изменить значение лимита AI агента, отправьте PATCH-запрос на `/api/v1/cloud-ai/agents/{id}/entity-limits/{limit_id}`.  Непереданные поля не меняются. Снять денежный лимит (`money_limit`: `null`) можно только вместе с передачей `limit`.  Для токенов дополнительных пользователей аккаунта нужна роль `ai:write`.
     * @param {Number} id ID агента
     * @param {String} limitId ID лимита агента
     * @param {module:model/UpdateAgentEntityLimit} updateAgentEntityLimit 
     * @param {module:api/AIAgentsApi~updateAgentEntityLimitCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateAgentEntityLimit201Response}
     */
    updateAgentEntityLimit(id, limitId, updateAgentEntityLimit, callback) {
      let postBody = updateAgentEntityLimit;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling updateAgentEntityLimit");
      }
      // verify the required parameter 'limitId' is set
      if (limitId === undefined || limitId === null) {
        throw new Error("Missing the required parameter 'limitId' when calling updateAgentEntityLimit");
      }
      // verify the required parameter 'updateAgentEntityLimit' is set
      if (updateAgentEntityLimit === undefined || updateAgentEntityLimit === null) {
        throw new Error("Missing the required parameter 'updateAgentEntityLimit' when calling updateAgentEntityLimit");
      }

      let pathParams = {
        'id': id,
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
      let returnType = CreateAgentEntityLimit201Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/agents/{id}/entity-limits/{limit_id}', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}
