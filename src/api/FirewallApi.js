/**
 * Timeweb Cloud API
 * # Введение API Timeweb Cloud позволяет вам управлять ресурсами в облаке программным способом с использованием обычных HTTP-запросов.  Множество функций, которые доступны в панели управления Timeweb Cloud, также доступны через API, что позволяет вам автоматизировать ваши собственные сценарии.  В этой документации сперва будет описан общий дизайн и принципы работы API, а после этого конкретные конечные точки. Также будут приведены примеры запросов к ним.   ## Запросы Запросы должны выполняться по протоколу `HTTPS`, чтобы гарантировать шифрование транзакций. Поддерживаются следующие методы запроса: |Метод|Применение| |--- |--- | |GET|Извлекает данные о коллекциях и отдельных ресурсах.| |POST|Для коллекций создает новый ресурс этого типа. Также используется для выполнения действий с конкретным ресурсом.| |PUT|Обновляет существующий ресурс.| |PATCH|Некоторые ресурсы поддерживают частичное обновление, то есть обновление только части атрибутов ресурса, в этом случае вместо метода PUT будет использован PATCH.| |DELETE|Удаляет ресурс.|  Методы `POST`, `PUT` и `PATCH` могут включать объект в тело запроса с типом содержимого `application/json`.  ### Параметры в запросах Некоторые коллекции поддерживают пагинацию, поиск или сортировку в запросах. В параметрах запроса требуется передать: - `limit` — обозначает количество записей, которое необходимо вернуть  - `offset` — указывает на смещение, относительно начала списка  - `search` — позволяет указать набор символов для поиска  - `sort` — можно задать правило сортировки коллекции  ## Ответы Запросы вернут один из следующих кодов состояния ответа HTTP:  |Статус|Описание| |--- |--- | |200 OK|Действие с ресурсом было выполнено успешно.| |201 Created|Ресурс был успешно создан. При этом ресурс может быть как уже готовым к использованию, так и находиться в процессе запуска.| |204 No Content|Действие с ресурсом было выполнено успешно, и ответ не содержит дополнительной информации в теле.| |400 Bad Request|Был отправлен неверный запрос, например, в нем отсутствуют обязательные параметры и т. д. Тело ответа будет содержать дополнительную информацию об ошибке.| |401 Unauthorized|Ошибка аутентификации.| |403 Forbidden|Аутентификация прошла успешно, но недостаточно прав для выполнения действия.| |404 Not Found|Запрашиваемый ресурс не найден.| |409 Conflict|Запрос конфликтует с текущим состоянием.| |423 Locked|Ресурс из запроса заблокирован от применения к нему указанного метода.| |429 Too Many Requests|Был достигнут лимит по количеству запросов в единицу времени.| |500 Internal Server Error|При выполнении запроса произошла какая-то внутренняя ошибка. Чтобы решить эту проблему, лучше всего создать тикет в панели управления.|  ### Структура успешного ответа Все конечные точки будут возвращать данные в формате `JSON`. Ответы на `GET`-запросы будут иметь на верхнем уровне следующую структуру атрибутов:  |Название поля|Тип|Описание| |--- |--- |--- | |[entity_name]|object, object[], string[], number[], boolean|Динамическое поле, которое будет меняться в зависимости от запрашиваемого ресурса и будет содержать все атрибуты, необходимые для описания этого ресурса. Например, при запросе списка баз данных будет возвращаться поле `dbs`, а при запросе конкретного облачного сервера `server`. Для некоторых конечных точек в ответе может возвращаться сразу несколько ресурсов.| |meta|object|Опционально. Объект, который содержит вспомогательную информацию о ресурсе. Чаще всего будет встречаться при запросе коллекций и содержать поле `total`, которое будет указывать на количество элементов в коллекции.| |response_id|string|Опционально. В большинстве случаев в ответе будет содержаться уникальный идентификатор ответа в формате UUIDv4, который однозначно указывает на ваш запрос внутри нашей системы. Если вам потребуется задать вопрос нашей поддержке, приложите к вопросу этот идентификатор — так мы сможем найти ответ на него намного быстрее. Также вы можете использовать этот идентификатор, чтобы убедиться, что это новый ответ на запрос и результат не был получен из кэша.|  Пример запроса на получение списка SSH-ключей: ```     HTTP/2.0 200 OK     {       \"ssh_keys\":[           {             \"body\":\"ssh-rsa AAAAB3NzaC1sdfghjkOAsBwWhs= example@device.local\",             \"created_at\":\"2021-09-15T19:52:27Z\",             \"expired_at\":null,             \"id\":5297,             \"is_default\":false,             \"name\":\"example@device.local\",             \"used_at\":null,             \"used_by\":[]           }       ],       \"meta\":{           \"total\":1       },       \"response_id\":\"94608d15-8672-4eed-8ab6-28bd6fa3cdf7\"     } ```  ### Структура ответа с ошибкой |Название поля|Тип|Описание| |--- |--- |--- | |status_code|number|Короткий числовой идентификатор ошибки.| |error_code|string|Короткий текстовый идентификатор ошибки, который уточняет числовой идентификатор и удобен для программной обработки. Самый простой пример — это код `not_found` для ошибки 404.| |message|string, string[]|Опционально. В большинстве случаев в ответе будет содержаться человекочитаемое подробное описание ошибки или ошибок, которые помогут понять, что нужно исправить.| |response_id|string|Опционально. В большинстве случае в ответе будет содержаться уникальный идентификатор ответа в формате UUIDv4, который однозначно указывает на ваш запрос внутри нашей системы. Если вам потребуется задать вопрос нашей поддержке, приложите к вопросу этот идентификатор — так мы сможем найти ответ на него намного быстрее.|  Пример: ```     HTTP/2.0 403 Forbidden     {       \"status_code\": 403,       \"error_code\":  \"forbidden\",       \"message\":     \"You do not have access for the attempted action\",       \"response_id\": \"94608d15-8672-4eed-8ab6-28bd6fa3cdf7\"     } ```  ## Статусы ресурсов Важно учесть, что при создании большинства ресурсов внутри платформы вам будет сразу возвращен ответ от сервера со статусом `200 OK` или `201 Created` и идентификатором созданного ресурса в теле ответа, но при этом этот ресурс может быть ещё в *состоянии запуска*.  Для того чтобы понять, в каком состоянии сейчас находится ваш ресурс, мы добавили поле `status` в ответ на получение информации о ресурсе.  Список статусов будет отличаться в зависимости от типа ресурса. Увидеть поддерживаемый список статусов вы сможете в описании каждого конкретного ресурса.     ## Ограничение скорости запросов (Rate Limiting) Чтобы обеспечить стабильность для всех пользователей, Timeweb Cloud защищает API от всплесков входящего трафика, анализируя количество запросов c каждого аккаунта к каждой конечной точке.  Если ваше приложение отправляет более 20 запросов в секунду на одну конечную точку, то для этого запроса API может вернуть код состояния HTTP `429 Too Many Requests`.   ## Аутентификация Доступ к API осуществляется с помощью JWT-токена. Токенами можно управлять внутри панели управления Timeweb Cloud в разделе *API и Terraform*.  Токен необходимо передавать в заголовке каждого запроса в формате: ```   Authorization: Bearer $TIMEWEB_CLOUD_TOKEN ```  ## Формат примеров API Примеры в этой документации описаны с помощью `curl`, HTTP-клиента командной строки. На компьютерах `Linux` и `macOS` обычно по умолчанию установлен `curl`, и он доступен для загрузки на всех популярных платформах, включая `Windows`.  Каждый пример разделен на несколько строк символом `\\`, который совместим с `bash`. Типичный пример выглядит так: ```   curl -X PATCH      -H \"Content-Type: application/json\"      -H \"Authorization: Bearer $TIMEWEB_CLOUD_TOKEN\"      -d '{\"name\":\"Cute Corvus\",\"comment\":\"Development Server\"}'      \"https://api.timeweb.cloud/api/v1/dedicated/1051\" ``` - Параметр `-X` задает метод запроса. Для согласованности метод будет указан во всех примерах, даже если он явно не требуется для методов `GET`. - Строки `-H` задают требуемые HTTP-заголовки. - Примеры, для которых требуется объект JSON в теле запроса, передают требуемые данные через параметр `-d`.  Чтобы использовать приведенные примеры, не подставляя каждый раз в них свой токен, вы можете добавить токен один раз в переменные окружения в вашей консоли. Например, на `Linux` это можно сделать с помощью команды:  ``` TIMEWEB_CLOUD_TOKEN=\"token\" ```  После этого токен будет автоматически подставляться в ваши запросы.  Обратите внимание, что все значения в этой документации являются примерами. Не полагайтесь на идентификаторы операционных систем, тарифов и т.д., используемые в примерах. Используйте соответствующую конечную точку для получения значений перед созданием ресурсов.   ## Версионирование API построено согласно принципам [семантического версионирования](https://semver.org/lang/ru). Это значит, что мы гарантируем обратную совместимость всех изменений в пределах одной мажорной версии.  Мажорная версия каждой конечной точки обозначается в пути запроса, например, запрос `/api/v1/servers` указывает, что этот метод имеет версию 1.
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
import FirewallGroupInAPI from '../model/FirewallGroupInAPI';
import FirewallGroupOutResponse from '../model/FirewallGroupOutResponse';
import FirewallGroupResourceOutResponse from '../model/FirewallGroupResourceOutResponse';
import FirewallGroupResourcesOutResponse from '../model/FirewallGroupResourcesOutResponse';
import FirewallGroupsOutResponse from '../model/FirewallGroupsOutResponse';
import FirewallRuleInAPI from '../model/FirewallRuleInAPI';
import FirewallRuleOutResponse from '../model/FirewallRuleOutResponse';
import FirewallRulesOutResponse from '../model/FirewallRulesOutResponse';
import GetFinances400Response from '../model/GetFinances400Response';
import GetFinances401Response from '../model/GetFinances401Response';
import GetFinances429Response from '../model/GetFinances429Response';
import GetFinances500Response from '../model/GetFinances500Response';
import GetImage404Response from '../model/GetImage404Response';
import ResourceType from '../model/ResourceType';

/**
* Firewall service.
* @module api/FirewallApi
* @version 1.0.0
*/
export default class FirewallApi {

    /**
    * Constructs a new FirewallApi. 
    * @alias module:api/FirewallApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }


    /**
     * Callback function to receive the result of the addResourceToGroup operation.
     * @callback module:api/FirewallApi~addResourceToGroupCallback
     * @param {String} error Error message, if any.
     * @param {module:model/FirewallGroupResourceOutResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Линковка ресурса в firewall group
     * Чтобы слинковать ресурс с группой правил, отправьте POST запрос на `/api/v1/firewall/groups/{group_id}/resources/{resource_id}`
     * @param {String} groupId Идентификатор группы правил
     * @param {String} resourceId Идентификатор ресурса
     * @param {Object} opts Optional parameters
     * @param {module:model/ResourceType} [resourceType] 
     * @param {module:api/FirewallApi~addResourceToGroupCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/FirewallGroupResourceOutResponse}
     */
    addResourceToGroup(groupId, resourceId, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'groupId' is set
      if (groupId === undefined || groupId === null) {
        throw new Error("Missing the required parameter 'groupId' when calling addResourceToGroup");
      }
      // verify the required parameter 'resourceId' is set
      if (resourceId === undefined || resourceId === null) {
        throw new Error("Missing the required parameter 'resourceId' when calling addResourceToGroup");
      }

      let pathParams = {
        'group_id': groupId,
        'resource_id': resourceId
      };
      let queryParams = {
        'resource_type': opts['resourceType']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = FirewallGroupResourceOutResponse;
      return this.apiClient.callApi(
        '/api/v1/firewall/groups/{group_id}/resources/{resource_id}', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the createGroup operation.
     * @callback module:api/FirewallApi~createGroupCallback
     * @param {String} error Error message, if any.
     * @param {module:model/FirewallGroupOutResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Создание группы правил
     * Чтобы создать группу правил, отправьте POST запрос на `/api/v1/firewall/groups`
     * @param {module:model/FirewallGroupInAPI} firewallGroupInAPI 
     * @param {Object} opts Optional parameters
     * @param {module:model/String} [policy] Тип группы правил
     * @param {module:api/FirewallApi~createGroupCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/FirewallGroupOutResponse}
     */
    createGroup(firewallGroupInAPI, opts, callback) {
      opts = opts || {};
      let postBody = firewallGroupInAPI;
      // verify the required parameter 'firewallGroupInAPI' is set
      if (firewallGroupInAPI === undefined || firewallGroupInAPI === null) {
        throw new Error("Missing the required parameter 'firewallGroupInAPI' when calling createGroup");
      }

      let pathParams = {
      };
      let queryParams = {
        'policy': opts['policy']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = FirewallGroupOutResponse;
      return this.apiClient.callApi(
        '/api/v1/firewall/groups', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the createGroupRule operation.
     * @callback module:api/FirewallApi~createGroupRuleCallback
     * @param {String} error Error message, if any.
     * @param {module:model/FirewallRuleOutResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Создание firewall правила
     * Чтобы создать правило в группе, отправьте POST запрос на `/api/v1/firewall/groups/{group_id}/rules`
     * @param {String} groupId Идентификатор группы правил
     * @param {module:model/FirewallRuleInAPI} firewallRuleInAPI 
     * @param {module:api/FirewallApi~createGroupRuleCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/FirewallRuleOutResponse}
     */
    createGroupRule(groupId, firewallRuleInAPI, callback) {
      let postBody = firewallRuleInAPI;
      // verify the required parameter 'groupId' is set
      if (groupId === undefined || groupId === null) {
        throw new Error("Missing the required parameter 'groupId' when calling createGroupRule");
      }
      // verify the required parameter 'firewallRuleInAPI' is set
      if (firewallRuleInAPI === undefined || firewallRuleInAPI === null) {
        throw new Error("Missing the required parameter 'firewallRuleInAPI' when calling createGroupRule");
      }

      let pathParams = {
        'group_id': groupId
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
      let returnType = FirewallRuleOutResponse;
      return this.apiClient.callApi(
        '/api/v1/firewall/groups/{group_id}/rules', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteGroup operation.
     * @callback module:api/FirewallApi~deleteGroupCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Удаление группы правил
     * Чтобы удалить группу правил, отправьте DELETE запрос на `/api/v1/firewall/groups/{group_id}`
     * @param {String} groupId Идентификатор группы правил
     * @param {module:api/FirewallApi~deleteGroupCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteGroup(groupId, callback) {
      let postBody = null;
      // verify the required parameter 'groupId' is set
      if (groupId === undefined || groupId === null) {
        throw new Error("Missing the required parameter 'groupId' when calling deleteGroup");
      }

      let pathParams = {
        'group_id': groupId
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
        '/api/v1/firewall/groups/{group_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteGroupRule operation.
     * @callback module:api/FirewallApi~deleteGroupRuleCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Удаление firewall правила
     * Чтобы удалить правило, отправьте DELETE запрос на `/api/v1/firewall/groups/{group_id}/rules/{rule_id}`
     * @param {String} groupId Идентификатор группы правил
     * @param {String} ruleId Идентификатор правила
     * @param {module:api/FirewallApi~deleteGroupRuleCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteGroupRule(groupId, ruleId, callback) {
      let postBody = null;
      // verify the required parameter 'groupId' is set
      if (groupId === undefined || groupId === null) {
        throw new Error("Missing the required parameter 'groupId' when calling deleteGroupRule");
      }
      // verify the required parameter 'ruleId' is set
      if (ruleId === undefined || ruleId === null) {
        throw new Error("Missing the required parameter 'ruleId' when calling deleteGroupRule");
      }

      let pathParams = {
        'group_id': groupId,
        'rule_id': ruleId
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
        '/api/v1/firewall/groups/{group_id}/rules/{rule_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteResourceFromGroup operation.
     * @callback module:api/FirewallApi~deleteResourceFromGroupCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Отлинковка ресурса из firewall group
     * Чтобы отлинковать ресурс от группы правил, отправьте DELETE запрос на `/api/v1/firewall/groups/{group_id}/resources/{resource_id}`
     * @param {String} groupId Идентификатор группы правил
     * @param {String} resourceId Идентификатор ресурса
     * @param {Object} opts Optional parameters
     * @param {module:model/ResourceType} [resourceType] 
     * @param {module:api/FirewallApi~deleteResourceFromGroupCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteResourceFromGroup(groupId, resourceId, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'groupId' is set
      if (groupId === undefined || groupId === null) {
        throw new Error("Missing the required parameter 'groupId' when calling deleteResourceFromGroup");
      }
      // verify the required parameter 'resourceId' is set
      if (resourceId === undefined || resourceId === null) {
        throw new Error("Missing the required parameter 'resourceId' when calling deleteResourceFromGroup");
      }

      let pathParams = {
        'group_id': groupId,
        'resource_id': resourceId
      };
      let queryParams = {
        'resource_type': opts['resourceType']
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
        '/api/v1/firewall/groups/{group_id}/resources/{resource_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getGroup operation.
     * @callback module:api/FirewallApi~getGroupCallback
     * @param {String} error Error message, if any.
     * @param {module:model/FirewallGroupOutResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение информации о группе правил
     * Чтобы получить информацию о группе правил, отправьте GET запрос на `/api/v1/firewall/groups/{group_id}`
     * @param {String} groupId Идентификатор группы правил
     * @param {module:api/FirewallApi~getGroupCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/FirewallGroupOutResponse}
     */
    getGroup(groupId, callback) {
      let postBody = null;
      // verify the required parameter 'groupId' is set
      if (groupId === undefined || groupId === null) {
        throw new Error("Missing the required parameter 'groupId' when calling getGroup");
      }

      let pathParams = {
        'group_id': groupId
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
      let returnType = FirewallGroupOutResponse;
      return this.apiClient.callApi(
        '/api/v1/firewall/groups/{group_id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getGroupResources operation.
     * @callback module:api/FirewallApi~getGroupResourcesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/FirewallGroupResourcesOutResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение слинкованных ресурсов
     * Чтобы получить слинкованных ресурсов для группы правил, отправьте GET запрос на `/api/v1/firewall/groups/{group_id}/resources`
     * @param {String} groupId Идентификатор группы правил
     * @param {Object} opts Optional parameters
     * @param {Number} [limit = 100)] Обозначает количество записей, которое необходимо вернуть.
     * @param {Number} [offset = 0)] Указывает на смещение относительно начала списка.
     * @param {module:api/FirewallApi~getGroupResourcesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/FirewallGroupResourcesOutResponse}
     */
    getGroupResources(groupId, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'groupId' is set
      if (groupId === undefined || groupId === null) {
        throw new Error("Missing the required parameter 'groupId' when calling getGroupResources");
      }

      let pathParams = {
        'group_id': groupId
      };
      let queryParams = {
        'limit': opts['limit'],
        'offset': opts['offset']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = FirewallGroupResourcesOutResponse;
      return this.apiClient.callApi(
        '/api/v1/firewall/groups/{group_id}/resources', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getGroupRule operation.
     * @callback module:api/FirewallApi~getGroupRuleCallback
     * @param {String} error Error message, if any.
     * @param {module:model/FirewallRuleOutResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение информации о правиле
     * Чтобы получить инфомрацию о правиле, отправьте GET запрос на `/api/v1/firewall/groups/{group_id}/rules/{rule_id}`
     * @param {String} ruleId Идентификатор правила
     * @param {String} groupId Идентификатор группы правил
     * @param {module:api/FirewallApi~getGroupRuleCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/FirewallRuleOutResponse}
     */
    getGroupRule(ruleId, groupId, callback) {
      let postBody = null;
      // verify the required parameter 'ruleId' is set
      if (ruleId === undefined || ruleId === null) {
        throw new Error("Missing the required parameter 'ruleId' when calling getGroupRule");
      }
      // verify the required parameter 'groupId' is set
      if (groupId === undefined || groupId === null) {
        throw new Error("Missing the required parameter 'groupId' when calling getGroupRule");
      }

      let pathParams = {
        'rule_id': ruleId,
        'group_id': groupId
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
      let returnType = FirewallRuleOutResponse;
      return this.apiClient.callApi(
        '/api/v1/firewall/groups/{group_id}/rules/{rule_id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getGroupRules operation.
     * @callback module:api/FirewallApi~getGroupRulesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/FirewallRulesOutResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка правил
     * Чтобы получить список правил в группе, отправьте GET запрос на `/api/v1/firewall/groups/{group_id}/rules`
     * @param {String} groupId Идентификатор группы правил
     * @param {Object} opts Optional parameters
     * @param {Number} [limit = 100)] Обозначает количество записей, которое необходимо вернуть.
     * @param {Number} [offset = 0)] Указывает на смещение относительно начала списка.
     * @param {module:api/FirewallApi~getGroupRulesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/FirewallRulesOutResponse}
     */
    getGroupRules(groupId, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'groupId' is set
      if (groupId === undefined || groupId === null) {
        throw new Error("Missing the required parameter 'groupId' when calling getGroupRules");
      }

      let pathParams = {
        'group_id': groupId
      };
      let queryParams = {
        'limit': opts['limit'],
        'offset': opts['offset']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = FirewallRulesOutResponse;
      return this.apiClient.callApi(
        '/api/v1/firewall/groups/{group_id}/rules', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getGroups operation.
     * @callback module:api/FirewallApi~getGroupsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/FirewallGroupsOutResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение групп правил
     * Чтобы получить групп правил для аккаунта, отправьте GET запрос на `/api/v1/firewall/groups`
     * @param {Object} opts Optional parameters
     * @param {Number} [limit = 100)] Обозначает количество записей, которое необходимо вернуть.
     * @param {Number} [offset = 0)] Указывает на смещение относительно начала списка.
     * @param {module:api/FirewallApi~getGroupsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/FirewallGroupsOutResponse}
     */
    getGroups(opts, callback) {
      opts = opts || {};
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
        'limit': opts['limit'],
        'offset': opts['offset']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = FirewallGroupsOutResponse;
      return this.apiClient.callApi(
        '/api/v1/firewall/groups', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getRulesForResource operation.
     * @callback module:api/FirewallApi~getRulesForResourceCallback
     * @param {String} error Error message, if any.
     * @param {module:model/FirewallGroupsOutResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение групп правил для ресурса
     * Чтобы получить список групп правил, с которыми слинкован ресурс, отправьте GET запрос на `/api/v1/firewall/service/{resource_type}/{resource_id}`
     * @param {String} resourceId Идентификатор ресурса
     * @param {module:model/ResourceType} resourceType 
     * @param {Object} opts Optional parameters
     * @param {Number} [limit = 100)] Обозначает количество записей, которое необходимо вернуть.
     * @param {Number} [offset = 0)] Указывает на смещение относительно начала списка.
     * @param {module:api/FirewallApi~getRulesForResourceCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/FirewallGroupsOutResponse}
     */
    getRulesForResource(resourceId, resourceType, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'resourceId' is set
      if (resourceId === undefined || resourceId === null) {
        throw new Error("Missing the required parameter 'resourceId' when calling getRulesForResource");
      }
      // verify the required parameter 'resourceType' is set
      if (resourceType === undefined || resourceType === null) {
        throw new Error("Missing the required parameter 'resourceType' when calling getRulesForResource");
      }

      let pathParams = {
        'resource_id': resourceId,
        'resource_type': resourceType
      };
      let queryParams = {
        'limit': opts['limit'],
        'offset': opts['offset']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = FirewallGroupsOutResponse;
      return this.apiClient.callApi(
        '/api/v1/firewall/service/{resource_type}/{resource_id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the updateGroup operation.
     * @callback module:api/FirewallApi~updateGroupCallback
     * @param {String} error Error message, if any.
     * @param {module:model/FirewallGroupOutResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Обновление группы правил
     * Чтобы изменить группу правил, отправьте PATCH запрос на `/api/v1/firewall/groups/{group_id}`
     * @param {String} groupId Идентификатор группы правил
     * @param {module:model/FirewallGroupInAPI} firewallGroupInAPI 
     * @param {module:api/FirewallApi~updateGroupCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/FirewallGroupOutResponse}
     */
    updateGroup(groupId, firewallGroupInAPI, callback) {
      let postBody = firewallGroupInAPI;
      // verify the required parameter 'groupId' is set
      if (groupId === undefined || groupId === null) {
        throw new Error("Missing the required parameter 'groupId' when calling updateGroup");
      }
      // verify the required parameter 'firewallGroupInAPI' is set
      if (firewallGroupInAPI === undefined || firewallGroupInAPI === null) {
        throw new Error("Missing the required parameter 'firewallGroupInAPI' when calling updateGroup");
      }

      let pathParams = {
        'group_id': groupId
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
      let returnType = FirewallGroupOutResponse;
      return this.apiClient.callApi(
        '/api/v1/firewall/groups/{group_id}', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the updateGroupRule operation.
     * @callback module:api/FirewallApi~updateGroupRuleCallback
     * @param {String} error Error message, if any.
     * @param {module:model/FirewallRuleOutResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Обновление firewall правила
     * Чтобы изменить правило, отправьте PATCH запрос на `/api/v1/firewall/groups/{group_id}/rules/{rule_id}`
     * @param {String} groupId Идентификатор группы правил
     * @param {String} ruleId Идентификатор правила
     * @param {module:model/FirewallRuleInAPI} firewallRuleInAPI 
     * @param {module:api/FirewallApi~updateGroupRuleCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/FirewallRuleOutResponse}
     */
    updateGroupRule(groupId, ruleId, firewallRuleInAPI, callback) {
      let postBody = firewallRuleInAPI;
      // verify the required parameter 'groupId' is set
      if (groupId === undefined || groupId === null) {
        throw new Error("Missing the required parameter 'groupId' when calling updateGroupRule");
      }
      // verify the required parameter 'ruleId' is set
      if (ruleId === undefined || ruleId === null) {
        throw new Error("Missing the required parameter 'ruleId' when calling updateGroupRule");
      }
      // verify the required parameter 'firewallRuleInAPI' is set
      if (firewallRuleInAPI === undefined || firewallRuleInAPI === null) {
        throw new Error("Missing the required parameter 'firewallRuleInAPI' when calling updateGroupRule");
      }

      let pathParams = {
        'group_id': groupId,
        'rule_id': ruleId
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
      let returnType = FirewallRuleOutResponse;
      return this.apiClient.callApi(
        '/api/v1/firewall/groups/{group_id}/rules/{rule_id}', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}
