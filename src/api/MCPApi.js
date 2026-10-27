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
import AuthorizeUrl from '../model/AuthorizeUrl';
import ConnectAgentTool from '../model/ConnectAgentTool';
import CreateAgentTool201Response from '../model/CreateAgentTool201Response';
import CreateTool from '../model/CreateTool';
import GetAccountStatus403Response from '../model/GetAccountStatus403Response';
import GetAgentToolTemplatePrices200Response from '../model/GetAgentToolTemplatePrices200Response';
import GetAgentToolTemplates200Response from '../model/GetAgentToolTemplates200Response';
import GetAgentTools200Response from '../model/GetAgentTools200Response';
import GetAgentToolsByAgent200Response from '../model/GetAgentToolsByAgent200Response';
import GetFinances400Response from '../model/GetFinances400Response';
import GetFinances401Response from '../model/GetFinances401Response';
import GetFinances429Response from '../model/GetFinances429Response';
import GetFinances500Response from '../model/GetFinances500Response';
import GetImage404Response from '../model/GetImage404Response';
import InstallTool from '../model/InstallTool';
import JsonRpcErrorResponse from '../model/JsonRpcErrorResponse';
import JsonRpcRequest from '../model/JsonRpcRequest';
import JsonRpcResultResponse from '../model/JsonRpcResultResponse';
import UpdateAgentTool from '../model/UpdateAgentTool';
import UpdateTool from '../model/UpdateTool';

/**
* MCP service.
* @module api/MCPApi
* @version 1.0.0
*/
export default class MCPApi {

    /**
    * Constructs a new MCPApi. 
    * @alias module:api/MCPApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }


    /**
     * Callback function to receive the result of the connectAgentToolToAgent operation.
     * @callback module:api/MCPApi~connectAgentToolToAgentCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Подключение MCP-инструмента к агенту
     * Чтобы подключить MCP-инструмент к агенту, отправьте POST-запрос на `/api/v1/cloud-ai/agents/{agent_id}/tools`.  В `allowed_methods` перечислите методы, которые агенту разрешено вызывать. Подходят только имена из `methods[].name` инструмента, иначе вернётся 400 с `error_code` `invalid_methods_provided`. Повторно подключить уже подключённый инструмент нельзя. Чтобы изменить список методов, используйте PUT-запрос.
     * @param {Number} agentId ID агента
     * @param {module:model/ConnectAgentTool} connectAgentTool 
     * @param {module:api/MCPApi~connectAgentToolToAgentCallback} callback The callback function, accepting three arguments: error, data, response
     */
    connectAgentToolToAgent(agentId, connectAgentTool, callback) {
      let postBody = connectAgentTool;
      // verify the required parameter 'agentId' is set
      if (agentId === undefined || agentId === null) {
        throw new Error("Missing the required parameter 'agentId' when calling connectAgentToolToAgent");
      }
      // verify the required parameter 'connectAgentTool' is set
      if (connectAgentTool === undefined || connectAgentTool === null) {
        throw new Error("Missing the required parameter 'connectAgentTool' when calling connectAgentToolToAgent");
      }

      let pathParams = {
        'agent_id': agentId
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
        '/api/v1/cloud-ai/agents/{agent_id}/tools', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the createAgentTool operation.
     * @callback module:api/MCPApi~createAgentToolCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateAgentTool201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Подключение собственного MCP-сервера
     * Чтобы подключить собственный MCP-сервер, отправьте POST-запрос на `/api/v1/cloud-ai/tools`.  Платформа сразу подключается к серверу и сохраняет список его методов. Если сервер недоступен или отвечает ошибкой, инструмент не создаётся: вернётся 400 с `error_code` `invalid_methods_provided`. Адреса частных сетей и localhost отклоняются с ошибкой 400.  Для `auth_data.type = oauth2` подключение к серверу при создании не проверяется. Инструмент создаётся в статусе `pending_auth` с пустым списком методов, а методы загружаются после авторизации пользователя: см. «Получение ссылки на OAuth2-авторизацию инструмента». Если не удалось определить адреса авторизации или зарегистрировать клиента, вернётся 401 с `error_code` `tool_authentication_failed`.  Чтобы агент мог пользоваться инструментом, подключите его к агенту.
     * @param {module:model/CreateTool} createTool 
     * @param {module:api/MCPApi~createAgentToolCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateAgentTool201Response}
     */
    createAgentTool(createTool, callback) {
      let postBody = createTool;
      // verify the required parameter 'createTool' is set
      if (createTool === undefined || createTool === null) {
        throw new Error("Missing the required parameter 'createTool' when calling createAgentTool");
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
      let returnType = CreateAgentTool201Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/tools', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteAgentTool operation.
     * @callback module:api/MCPApi~deleteAgentToolCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Удаление MCP-инструмента
     * Чтобы удалить MCP-инструмент, отправьте DELETE-запрос на `/api/v1/cloud-ai/tools/{id}`.  Инструмент автоматически отключается от всех агентов.
     * @param {Number} id ID инструмента
     * @param {module:api/MCPApi~deleteAgentToolCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteAgentTool(id, callback) {
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling deleteAgentTool");
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
      let returnType = null;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/tools/{id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteMcpSearchSession operation.
     * @callback module:api/MCPApi~deleteMcpSearchSessionCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Завершение сессии сервера MCP с поиском инструментов
     * Чтобы завершить сессию сервера MCP `timeweb-cloud-mcp-search`, отправьте DELETE-запрос на `/api/v1/mcp/search`.  Сервер не хранит сессий (не выдаёт `Mcp-Session-Id`), поэтому завершать нечего: ответ всегда 200 без тела.
     * @param {module:api/MCPApi~deleteMcpSearchSessionCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteMcpSearchSession(opts, callback) {
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

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = null;
      let basePaths = ['https://api.timeweb.cloud'];
      let basePath = basePaths[0]; // by default use the first one in "servers" defined in OpenAPI
      if (typeof opts['_base_path_index'] !== 'undefined') {
        if (opts['_base_path_index']  >= basePaths.length || opts['_base_path_index'] <  0) {
          throw new Error("Invalid index " + opts['_base_path_index'] + " when selecting the host settings. Must be less than " + basePaths.length);
        }
        basePath = basePaths[opts['_base_path_index']];
      }

      return this.apiClient.callApi(
        '/api/v1/mcp/search', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, basePath, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteMcpSession operation.
     * @callback module:api/MCPApi~deleteMcpSessionCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Завершение сессии сервера MCP
     * Чтобы завершить сессию сервера MCP `timeweb-cloud-mcp`, отправьте DELETE-запрос на `/api/v1/mcp`.  Сервер не хранит сессий (не выдаёт `Mcp-Session-Id`), поэтому завершать нечего: ответ всегда 200 без тела.
     * @param {module:api/MCPApi~deleteMcpSessionCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteMcpSession(opts, callback) {
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

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = null;
      let basePaths = ['https://api.timeweb.cloud'];
      let basePath = basePaths[0]; // by default use the first one in "servers" defined in OpenAPI
      if (typeof opts['_base_path_index'] !== 'undefined') {
        if (opts['_base_path_index']  >= basePaths.length || opts['_base_path_index'] <  0) {
          throw new Error("Invalid index " + opts['_base_path_index'] + " when selecting the host settings. Must be less than " + basePaths.length);
        }
        basePath = basePaths[opts['_base_path_index']];
      }

      return this.apiClient.callApi(
        '/api/v1/mcp', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, basePath, callback
      );
    }

    /**
     * Callback function to receive the result of the disconnectAgentToolFromAgent operation.
     * @callback module:api/MCPApi~disconnectAgentToolFromAgentCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Отключение MCP-инструмента от агента
     * Чтобы отключить MCP-инструмент от агента, отправьте DELETE-запрос на `/api/v1/cloud-ai/agents/{agent_id}/tools/{tool_id}`.  Сам инструмент остаётся в аккаунте и у других агентов.
     * @param {Number} agentId ID агента
     * @param {Number} toolId ID инструмента
     * @param {module:api/MCPApi~disconnectAgentToolFromAgentCallback} callback The callback function, accepting three arguments: error, data, response
     */
    disconnectAgentToolFromAgent(agentId, toolId, callback) {
      let postBody = null;
      // verify the required parameter 'agentId' is set
      if (agentId === undefined || agentId === null) {
        throw new Error("Missing the required parameter 'agentId' when calling disconnectAgentToolFromAgent");
      }
      // verify the required parameter 'toolId' is set
      if (toolId === undefined || toolId === null) {
        throw new Error("Missing the required parameter 'toolId' when calling disconnectAgentToolFromAgent");
      }

      let pathParams = {
        'agent_id': agentId,
        'tool_id': toolId
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
        '/api/v1/cloud-ai/agents/{agent_id}/tools/{tool_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getAgentTool operation.
     * @callback module:api/MCPApi~getAgentToolCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateAgentTool201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение MCP-инструмента
     * Чтобы получить MCP-инструмент, отправьте GET-запрос на `/api/v1/cloud-ai/tools/{id}`.  По полю `status` можно отследить завершение OAuth2-авторизации: после неё статус меняется с `pending_auth` на `active`.
     * @param {Number} id ID инструмента
     * @param {module:api/MCPApi~getAgentToolCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateAgentTool201Response}
     */
    getAgentTool(id, callback) {
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling getAgentTool");
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
      let returnType = CreateAgentTool201Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/tools/{id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getAgentToolOAuth2AuthorizeUrl operation.
     * @callback module:api/MCPApi~getAgentToolOAuth2AuthorizeUrlCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AuthorizeUrl} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение ссылки на OAuth2-авторизацию инструмента
     * Чтобы получить ссылку на OAuth2-авторизацию MCP-инструмента, отправьте GET-запрос на `/api/v1/cloud-ai/tools/oauth2/authorize-url/{tool_id}`.  Откройте `authorize_url` в браузере пользователя. Ссылка действует 30 минут. После входа и согласия провайдер вернёт пользователя на адрес возврата платформы `https://api.timeweb.cloud/api/v1/cloud-ai/oauth2/callback`. Платформа обменяет код на токены, переведёт инструмент в статус `active` и загрузит список методов.  Чтобы узнать результат, запрашивайте инструмент, пока его статус не сменится с `pending_auth` на `active`. Этим же запросом можно повторно авторизовать уже активный инструмент.
     * @param {Number} toolId ID инструмента
     * @param {Object} opts Optional parameters
     * @param {String} [redirectUrl] Куда вернуть пользователя после авторизации. Принимаются только адреса на доменах `timeweb.cloud` и `timeweb.net` и их поддоменах; другие адреса молча игнорируются. После успешной авторизации к адресу добавляются `oauth_success=true&tool_id=<id>`, после ошибки — `oauth_error=<текст>&tool_id=<id>`. Без параметра страница возврата показывает результат в виде JSON.
     * @param {module:api/MCPApi~getAgentToolOAuth2AuthorizeUrlCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/AuthorizeUrl}
     */
    getAgentToolOAuth2AuthorizeUrl(toolId, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'toolId' is set
      if (toolId === undefined || toolId === null) {
        throw new Error("Missing the required parameter 'toolId' when calling getAgentToolOAuth2AuthorizeUrl");
      }

      let pathParams = {
        'tool_id': toolId
      };
      let queryParams = {
        'redirect_url': opts['redirectUrl']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = AuthorizeUrl;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/tools/oauth2/authorize-url/{tool_id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getAgentToolTemplatePrices operation.
     * @callback module:api/MCPApi~getAgentToolTemplatePricesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetAgentToolTemplatePrices200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение цен системных инструментов
     * Чтобы получить цены системных инструментов платформы, например веб-поиска, отправьте GET-запрос на `/api/v1/cloud-ai/tools/templates/prices`.
     * @param {Object} opts Optional parameters
     * @param {module:model/String} [locale = 'ru')] Валюта цены: `ru` — в рублях, `en` — в долларах США. По умолчанию `ru`.
     * @param {module:api/MCPApi~getAgentToolTemplatePricesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetAgentToolTemplatePrices200Response}
     */
    getAgentToolTemplatePrices(opts, callback) {
      opts = opts || {};
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
        'locale': opts['locale']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = GetAgentToolTemplatePrices200Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/tools/templates/prices', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getAgentToolTemplates operation.
     * @callback module:api/MCPApi~getAgentToolTemplatesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetAgentToolTemplates200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение шаблонов MCP-инструментов из маркетплейса
     * Чтобы получить готовые интеграции маркетплейса, отправьте GET-запрос на `/api/v1/cloud-ai/tools/templates/marketplace`.  Сначала идут самые популярные шаблоны. Поле `config_schema` описывает, что нужно передать в `config_values` при установке.
     * @param {module:api/MCPApi~getAgentToolTemplatesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetAgentToolTemplates200Response}
     */
    getAgentToolTemplates(callback) {
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
      let returnType = GetAgentToolTemplates200Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/tools/templates/marketplace', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getAgentTools operation.
     * @callback module:api/MCPApi~getAgentToolsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetAgentTools200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка MCP-инструментов
     * Чтобы получить список MCP-инструментов аккаунта, отправьте GET-запрос на `/api/v1/cloud-ai/tools`.  В списке есть и собственные MCP-серверы, и инструменты, установленные из маркетплейса. Сначала идут новые. Удалённые инструменты не возвращаются. Секреты в `auth_data` заменены на `********`.
     * @param {module:api/MCPApi~getAgentToolsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetAgentTools200Response}
     */
    getAgentTools(callback) {
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
      let returnType = GetAgentTools200Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/tools', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getAgentToolsByAgent operation.
     * @callback module:api/MCPApi~getAgentToolsByAgentCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetAgentToolsByAgent200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение MCP-инструментов агента
     * Чтобы получить MCP-инструменты, подключённые к агенту, отправьте GET-запрос на `/api/v1/cloud-ai/agents/{agent_id}/tools`.  В ответе — инструменты целиком, в том же виде, что и в списке инструментов аккаунта. Списка разрешённых агенту методов в ответе нет.
     * @param {Number} agentId ID агента
     * @param {module:api/MCPApi~getAgentToolsByAgentCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetAgentToolsByAgent200Response}
     */
    getAgentToolsByAgent(agentId, callback) {
      let postBody = null;
      // verify the required parameter 'agentId' is set
      if (agentId === undefined || agentId === null) {
        throw new Error("Missing the required parameter 'agentId' when calling getAgentToolsByAgent");
      }

      let pathParams = {
        'agent_id': agentId
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
      let returnType = GetAgentToolsByAgent200Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/agents/{agent_id}/tools', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the installAgentToolFromTemplate operation.
     * @callback module:api/MCPApi~installAgentToolFromTemplateCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateAgentTool201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Установка MCP-инструмента из маркетплейса
     * Чтобы установить MCP-инструмент из шаблона маркетплейса, отправьте POST-запрос на `/api/v1/cloud-ai/tools/install`.  Значения полей из `config_schema` шаблона передайте в `config_values`. Платформа соберёт из них заголовки авторизации, подключится к MCP-серверу и сохранит список методов. Если у шаблона есть `config_schema`, поле `auth_data` не используется. Если подключиться к серверу не удалось, вернётся 400 с `error_code` `invalid_methods_provided`.  Один шаблон можно установить несколько раз, например с разными ключами.
     * @param {module:model/InstallTool} installTool 
     * @param {module:api/MCPApi~installAgentToolFromTemplateCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateAgentTool201Response}
     */
    installAgentToolFromTemplate(installTool, callback) {
      let postBody = installTool;
      // verify the required parameter 'installTool' is set
      if (installTool === undefined || installTool === null) {
        throw new Error("Missing the required parameter 'installTool' when calling installAgentToolFromTemplate");
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
      let returnType = CreateAgentTool201Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/tools/install', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the openMcpSearchStream operation.
     * @callback module:api/MCPApi~openMcpSearchStreamCallback
     * @param {String} error Error message, if any.
     * @param {String} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Открытие потока событий сервера MCP с поиском инструментов
     * Чтобы открыть поток сообщений, которые сервер MCP `timeweb-cloud-mcp-search` отправляет по своей инициативе, отправьте GET-запрос на `/api/v1/mcp/search`.  Сервер не отправляет сообщений по своей инициативе, поэтому поток не содержит событий и остаётся открытым, пока его не закроет шлюз. Через шлюз заголовки ответа на этот запрос могут долго не приходить. Открывать поток не нужно: работайте с сервером только POST-запросами — если клиент позволяет выбрать режим, отключите в нём GET-поток.
     * @param {String} accept Должен содержать `text/event-stream`, иначе сервер ответит 406
     * @param {Object} opts Optional parameters
     * @param {module:model/String} [mCPProtocolVersion] Версия протокола, согласованная в `initialize`. Неподдерживаемое значение — ответ 400
     * @param {module:api/MCPApi~openMcpSearchStreamCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link String}
     */
    openMcpSearchStream(accept, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'accept' is set
      if (accept === undefined || accept === null) {
        throw new Error("Missing the required parameter 'accept' when calling openMcpSearchStream");
      }

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
        'Accept': accept,
        'MCP-Protocol-Version': opts['mCPProtocolVersion']
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['text/event-stream', 'application/json'];
      let returnType = 'String';
      let basePaths = ['https://api.timeweb.cloud'];
      let basePath = basePaths[0]; // by default use the first one in "servers" defined in OpenAPI
      if (typeof opts['_base_path_index'] !== 'undefined') {
        if (opts['_base_path_index']  >= basePaths.length || opts['_base_path_index'] <  0) {
          throw new Error("Invalid index " + opts['_base_path_index'] + " when selecting the host settings. Must be less than " + basePaths.length);
        }
        basePath = basePaths[opts['_base_path_index']];
      }

      return this.apiClient.callApi(
        '/api/v1/mcp/search', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, basePath, callback
      );
    }

    /**
     * Callback function to receive the result of the openMcpStream operation.
     * @callback module:api/MCPApi~openMcpStreamCallback
     * @param {String} error Error message, if any.
     * @param {String} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Открытие потока событий сервера MCP
     * Чтобы открыть поток сообщений, которые сервер MCP `timeweb-cloud-mcp` отправляет по своей инициативе, отправьте GET-запрос на `/api/v1/mcp`.  Сервер не отправляет сообщений по своей инициативе, поэтому поток не содержит событий и остаётся открытым, пока его не закроет шлюз. Через шлюз заголовки ответа на этот запрос могут долго не приходить. Открывать поток не нужно: работайте с сервером только POST-запросами — если клиент позволяет выбрать режим, отключите в нём GET-поток.
     * @param {String} accept Должен содержать `text/event-stream`, иначе сервер ответит 406
     * @param {Object} opts Optional parameters
     * @param {module:model/String} [mCPProtocolVersion] Версия протокола, согласованная в `initialize`. Неподдерживаемое значение — ответ 400
     * @param {module:api/MCPApi~openMcpStreamCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link String}
     */
    openMcpStream(accept, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'accept' is set
      if (accept === undefined || accept === null) {
        throw new Error("Missing the required parameter 'accept' when calling openMcpStream");
      }

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
        'Accept': accept,
        'MCP-Protocol-Version': opts['mCPProtocolVersion']
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['text/event-stream', 'application/json'];
      let returnType = 'String';
      let basePaths = ['https://api.timeweb.cloud'];
      let basePath = basePaths[0]; // by default use the first one in "servers" defined in OpenAPI
      if (typeof opts['_base_path_index'] !== 'undefined') {
        if (opts['_base_path_index']  >= basePaths.length || opts['_base_path_index'] <  0) {
          throw new Error("Invalid index " + opts['_base_path_index'] + " when selecting the host settings. Must be less than " + basePaths.length);
        }
        basePath = basePaths[opts['_base_path_index']];
      }

      return this.apiClient.callApi(
        '/api/v1/mcp', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, basePath, callback
      );
    }

    /**
     * Callback function to receive the result of the refreshAgentToolMethods operation.
     * @callback module:api/MCPApi~refreshAgentToolMethodsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateAgentTool201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Обновление списка методов MCP-инструмента
     * Чтобы заново получить список методов с MCP-сервера, отправьте POST-запрос на `/api/v1/cloud-ai/tools/{id}/refresh-methods`.  Список `methods` заменяется полученным с сервера, а методы, которых больше нет, убираются из разрешённых у всех агентов. Если обновление прошло успешно, инструмент переходит в статус `active`. Если сервер недоступен, инструмент переходит в статус `error` с причиной в `status_info`, а запрос возвращает 400 с `error_code` `invalid_methods_provided`.
     * @param {Number} id ID инструмента
     * @param {module:api/MCPApi~refreshAgentToolMethodsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateAgentTool201Response}
     */
    refreshAgentToolMethods(id, callback) {
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling refreshAgentToolMethods");
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
      let returnType = CreateAgentTool201Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/tools/{id}/refresh-methods', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the sendMcpMessage operation.
     * @callback module:api/MCPApi~sendMcpMessageCallback
     * @param {String} error Error message, if any.
     * @param {module:model/JsonRpcResultResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Отправка JSON-RPC-сообщения серверу MCP
     * Чтобы отправить запрос или уведомление серверу MCP `timeweb-cloud-mcp`, отправьте POST-запрос на `/api/v1/mcp` с сообщением JSON-RPC 2.0 в теле.  Через этот метод идут все запросы MCP: `initialize`, `tools/list` (все инструменты сразу), `tools/call`, `resources/list`, `resources/read`, `ping`. Ответ на запрос приходит потоком `text/event-stream` с одним событием `message`, уведомление принимается с кодом 202 без тела. Изменяющие инструменты выполняются в два вызова с `confirm_token` — см. описание раздела.  Заголовки `x-tool-access` и `x-allowed-tools` здесь не действуют — используйте `/api/v1/mcp/search`.
     * @param {String} accept Должен содержать и `application/json`, и `text/event-stream`, иначе сервер ответит 406
     * @param {module:model/JsonRpcRequest} jsonRpcRequest 
     * @param {Object} opts Optional parameters
     * @param {module:model/String} [mCPProtocolVersion] Версия протокола, согласованная в `initialize`. Неподдерживаемое значение — ответ 400
     * @param {module:model/String} [xMcpConfirmationUi] Как `request_user_confirmation` спрашивает пользователя. `text` (по умолчанию) — пользователь отвечает в чате, на `/api/v1/mcp` инструмент в этом режиме не выводится. `buttons` — инструмент возвращает `ui_action` с кнопками для клиентов, которые умеют их показывать. Регистр не важен, другие значения игнорируются
     * @param {module:api/MCPApi~sendMcpMessageCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/JsonRpcResultResponse}
     */
    sendMcpMessage(accept, jsonRpcRequest, opts, callback) {
      opts = opts || {};
      let postBody = jsonRpcRequest;
      // verify the required parameter 'accept' is set
      if (accept === undefined || accept === null) {
        throw new Error("Missing the required parameter 'accept' when calling sendMcpMessage");
      }
      // verify the required parameter 'jsonRpcRequest' is set
      if (jsonRpcRequest === undefined || jsonRpcRequest === null) {
        throw new Error("Missing the required parameter 'jsonRpcRequest' when calling sendMcpMessage");
      }

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
        'Accept': accept,
        'MCP-Protocol-Version': opts['mCPProtocolVersion'],
        'x-mcp-confirmation-ui': opts['xMcpConfirmationUi']
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = ['application/json'];
      let accepts = ['text/event-stream', 'application/json'];
      let returnType = JsonRpcResultResponse;
      let basePaths = ['https://api.timeweb.cloud'];
      let basePath = basePaths[0]; // by default use the first one in "servers" defined in OpenAPI
      if (typeof opts['_base_path_index'] !== 'undefined') {
        if (opts['_base_path_index']  >= basePaths.length || opts['_base_path_index'] <  0) {
          throw new Error("Invalid index " + opts['_base_path_index'] + " when selecting the host settings. Must be less than " + basePaths.length);
        }
        basePath = basePaths[opts['_base_path_index']];
      }

      return this.apiClient.callApi(
        '/api/v1/mcp', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, basePath, callback
      );
    }

    /**
     * Callback function to receive the result of the sendMcpSearchMessage operation.
     * @callback module:api/MCPApi~sendMcpSearchMessageCallback
     * @param {String} error Error message, if any.
     * @param {module:model/JsonRpcResultResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Отправка JSON-RPC-сообщения серверу MCP с поиском инструментов
     * Чтобы отправить запрос или уведомление серверу MCP `timeweb-cloud-mcp-search`, отправьте POST-запрос на `/api/v1/mcp/search` с сообщением JSON-RPC 2.0 в теле.  `tools/list` возвращает четыре инструмента: `search_tools`, `get_tool_definition`, `execute_tool` и `request_user_confirmation`. Все операции облака находятся через `search_tools` и выполняются через `execute_tool`; изменяющие операции — в два вызова `execute_tool` с `confirm_token` внутри `arguments`.  Доступ модели можно сузить заголовками `x-tool-access` и `x-allowed-tools`. Недопустимое значение `x-tool-access` — ответ 400 с ошибкой `-32600`.
     * @param {String} accept Должен содержать и `application/json`, и `text/event-stream`, иначе сервер ответит 406
     * @param {module:model/JsonRpcRequest} jsonRpcRequest 
     * @param {Object} opts Optional parameters
     * @param {module:model/String} [mCPProtocolVersion] Версия протокола, согласованная в `initialize`. Неподдерживаемое значение — ответ 400
     * @param {module:model/String} [xToolAccess] Только операции чтения: поиск и определения пропускают изменяющие инструменты, а `execute_tool` отказывает с `tool_not_allowed`. Единственное допустимое значение — `read-only` (регистр не важен); любое другое, в том числе пустое, — ответ 400 с ошибкой `-32600`
     * @param {String} [xAllowedTools] Имена разрешённых операций через запятую — все остальные недоступны. Неизвестные имена игнорируются, пустое значение не разрешает ничего. Вместе с `x-tool-access` операция должна пройти оба ограничения
     * @param {module:model/String} [xMcpConfirmationUi] Как `request_user_confirmation` спрашивает пользователя. `text` (по умолчанию) — пользователь отвечает в чате, на `/api/v1/mcp` инструмент в этом режиме не выводится. `buttons` — инструмент возвращает `ui_action` с кнопками для клиентов, которые умеют их показывать. Регистр не важен, другие значения игнорируются
     * @param {module:api/MCPApi~sendMcpSearchMessageCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/JsonRpcResultResponse}
     */
    sendMcpSearchMessage(accept, jsonRpcRequest, opts, callback) {
      opts = opts || {};
      let postBody = jsonRpcRequest;
      // verify the required parameter 'accept' is set
      if (accept === undefined || accept === null) {
        throw new Error("Missing the required parameter 'accept' when calling sendMcpSearchMessage");
      }
      // verify the required parameter 'jsonRpcRequest' is set
      if (jsonRpcRequest === undefined || jsonRpcRequest === null) {
        throw new Error("Missing the required parameter 'jsonRpcRequest' when calling sendMcpSearchMessage");
      }

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
        'Accept': accept,
        'MCP-Protocol-Version': opts['mCPProtocolVersion'],
        'x-tool-access': opts['xToolAccess'],
        'x-allowed-tools': opts['xAllowedTools'],
        'x-mcp-confirmation-ui': opts['xMcpConfirmationUi']
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = ['application/json'];
      let accepts = ['text/event-stream', 'application/json'];
      let returnType = JsonRpcResultResponse;
      let basePaths = ['https://api.timeweb.cloud'];
      let basePath = basePaths[0]; // by default use the first one in "servers" defined in OpenAPI
      if (typeof opts['_base_path_index'] !== 'undefined') {
        if (opts['_base_path_index']  >= basePaths.length || opts['_base_path_index'] <  0) {
          throw new Error("Invalid index " + opts['_base_path_index'] + " when selecting the host settings. Must be less than " + basePaths.length);
        }
        basePath = basePaths[opts['_base_path_index']];
      }

      return this.apiClient.callApi(
        '/api/v1/mcp/search', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, basePath, callback
      );
    }

    /**
     * Callback function to receive the result of the updateAgentTool operation.
     * @callback module:api/MCPApi~updateAgentToolCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateAgentTool201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Изменение MCP-инструмента
     * Чтобы изменить MCP-инструмент, отправьте PUT-запрос на `/api/v1/cloud-ai/tools/{id}`, передав только изменяемые поля.  Если передать в `auth_data` секрет `********` из ответа API, сохранённый секрет не изменится. Изменение адреса или авторизации не обновляет список методов: после него вызовите обновление методов. Статус `inactive` выключает инструмент у всех агентов, к которым он подключён.
     * @param {Number} id ID инструмента
     * @param {module:model/UpdateTool} updateTool 
     * @param {module:api/MCPApi~updateAgentToolCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateAgentTool201Response}
     */
    updateAgentTool(id, updateTool, callback) {
      let postBody = updateTool;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling updateAgentTool");
      }
      // verify the required parameter 'updateTool' is set
      if (updateTool === undefined || updateTool === null) {
        throw new Error("Missing the required parameter 'updateTool' when calling updateAgentTool");
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
      let returnType = CreateAgentTool201Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/tools/{id}', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the updateAgentToolConnection operation.
     * @callback module:api/MCPApi~updateAgentToolConnectionCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Изменение разрешённых методов MCP-инструмента у агента
     * Чтобы изменить список методов, которые агенту разрешено вызывать, отправьте PUT-запрос на `/api/v1/cloud-ai/agents/{agent_id}/tools/{tool_id}`.  Список заменяется целиком. Подходят только имена из `methods[].name` инструмента, иначе вернётся 400 с `error_code` `invalid_methods_provided`. Если инструмент не подключён к агенту, вернётся 404 с `error_code` `agent-tool_link_not_found`.
     * @param {Number} agentId ID агента
     * @param {Number} toolId ID инструмента
     * @param {module:model/UpdateAgentTool} updateAgentTool 
     * @param {module:api/MCPApi~updateAgentToolConnectionCallback} callback The callback function, accepting three arguments: error, data, response
     */
    updateAgentToolConnection(agentId, toolId, updateAgentTool, callback) {
      let postBody = updateAgentTool;
      // verify the required parameter 'agentId' is set
      if (agentId === undefined || agentId === null) {
        throw new Error("Missing the required parameter 'agentId' when calling updateAgentToolConnection");
      }
      // verify the required parameter 'toolId' is set
      if (toolId === undefined || toolId === null) {
        throw new Error("Missing the required parameter 'toolId' when calling updateAgentToolConnection");
      }
      // verify the required parameter 'updateAgentTool' is set
      if (updateAgentTool === undefined || updateAgentTool === null) {
        throw new Error("Missing the required parameter 'updateAgentTool' when calling updateAgentToolConnection");
      }

      let pathParams = {
        'agent_id': agentId,
        'tool_id': toolId
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
        '/api/v1/cloud-ai/agents/{agent_id}/tools/{tool_id}', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}
