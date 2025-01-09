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
import AddIPsToBalancerRequest from '../model/AddIPsToBalancerRequest';
import CreateBalancer from '../model/CreateBalancer';
import CreateBalancer200Response from '../model/CreateBalancer200Response';
import CreateBalancerRule200Response from '../model/CreateBalancerRule200Response';
import CreateRule from '../model/CreateRule';
import DeleteBalancer200Response from '../model/DeleteBalancer200Response';
import GetBalancerIPs200Response from '../model/GetBalancerIPs200Response';
import GetBalancerRules200Response from '../model/GetBalancerRules200Response';
import GetBalancers200Response from '../model/GetBalancers200Response';
import GetBalancersPresets200Response from '../model/GetBalancersPresets200Response';
import GetFinances400Response from '../model/GetFinances400Response';
import GetFinances401Response from '../model/GetFinances401Response';
import GetFinances403Response from '../model/GetFinances403Response';
import GetFinances429Response from '../model/GetFinances429Response';
import GetFinances500Response from '../model/GetFinances500Response';
import GetImage404Response from '../model/GetImage404Response';
import UpdateBalancer from '../model/UpdateBalancer';
import UpdateRule from '../model/UpdateRule';

/**
* Balancers service.
* @module api/BalancersApi
* @version 1.0.0
*/
export default class BalancersApi {

    /**
    * Constructs a new BalancersApi. 
    * @alias module:api/BalancersApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }


    /**
     * Callback function to receive the result of the addIPsToBalancer operation.
     * @callback module:api/BalancersApi~addIPsToBalancerCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Добавление IP-адресов к балансировщику
     * Чтобы добавить `IP`-адреса к балансировщику, отправьте запрос POST в `api/v1/balancers/{balancer_id}/ips`. 
     * @param {Number} balancerId Идентификатор балансировщика
     * @param {module:model/AddIPsToBalancerRequest} addIPsToBalancerRequest 
     * @param {module:api/BalancersApi~addIPsToBalancerCallback} callback The callback function, accepting three arguments: error, data, response
     */
    addIPsToBalancer(balancerId, addIPsToBalancerRequest, callback) {
      let postBody = addIPsToBalancerRequest;
      // verify the required parameter 'balancerId' is set
      if (balancerId === undefined || balancerId === null) {
        throw new Error("Missing the required parameter 'balancerId' when calling addIPsToBalancer");
      }
      // verify the required parameter 'addIPsToBalancerRequest' is set
      if (addIPsToBalancerRequest === undefined || addIPsToBalancerRequest === null) {
        throw new Error("Missing the required parameter 'addIPsToBalancerRequest' when calling addIPsToBalancer");
      }

      let pathParams = {
        'balancer_id': balancerId
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
        '/api/v1/balancers/{balancer_id}/ips', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the createBalancer operation.
     * @callback module:api/BalancersApi~createBalancerCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateBalancer200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Создание бaлансировщика
     * Чтобы создать бaлансировщик на вашем аккаунте, отправьте POST-запрос на `/api/v1/balancers`, задав необходимые атрибуты.  Балансировщик будет создан с использованием предоставленной информации. Тело ответа будет содержать объект JSON с информацией о созданном балансировщике.
     * @param {module:model/CreateBalancer} createBalancer 
     * @param {module:api/BalancersApi~createBalancerCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateBalancer200Response}
     */
    createBalancer(createBalancer, callback) {
      let postBody = createBalancer;
      // verify the required parameter 'createBalancer' is set
      if (createBalancer === undefined || createBalancer === null) {
        throw new Error("Missing the required parameter 'createBalancer' when calling createBalancer");
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
      let returnType = CreateBalancer200Response;
      return this.apiClient.callApi(
        '/api/v1/balancers', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the createBalancerRule operation.
     * @callback module:api/BalancersApi~createBalancerRuleCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateBalancerRule200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Создание правила для балансировщика
     * Чтобы создать правило для балансировщика, отправьте запрос POST в `api/v1/balancers/{balancer_id}/rules`. 
     * @param {Number} balancerId Идентификатор балансировщика
     * @param {module:model/CreateRule} createRule 
     * @param {module:api/BalancersApi~createBalancerRuleCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateBalancerRule200Response}
     */
    createBalancerRule(balancerId, createRule, callback) {
      let postBody = createRule;
      // verify the required parameter 'balancerId' is set
      if (balancerId === undefined || balancerId === null) {
        throw new Error("Missing the required parameter 'balancerId' when calling createBalancerRule");
      }
      // verify the required parameter 'createRule' is set
      if (createRule === undefined || createRule === null) {
        throw new Error("Missing the required parameter 'createRule' when calling createBalancerRule");
      }

      let pathParams = {
        'balancer_id': balancerId
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
      let returnType = CreateBalancerRule200Response;
      return this.apiClient.callApi(
        '/api/v1/balancers/{balancer_id}/rules', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteBalancer operation.
     * @callback module:api/BalancersApi~deleteBalancerCallback
     * @param {String} error Error message, if any.
     * @param {module:model/DeleteBalancer200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Удаление балансировщика
     * Чтобы удалить балансировщик, отправьте запрос DELETE в `api/v1/balancers/{balancer_id}`. 
     * @param {Number} balancerId Идентификатор балансировщика
     * @param {Object} opts Optional parameters
     * @param {String} [hash] Хеш, который совместно с кодом авторизации надо отправить для удаления, если включено подтверждение удаления сервисов через Телеграм.
     * @param {String} [code] Код подтверждения, который придет к вам в Телеграм, после запроса удаления, если включено подтверждение удаления сервисов.  При помощи API токена сервисы можно удалять без подтверждения, если параметр токена `is_able_to_delete` установлен в значение `true`
     * @param {module:api/BalancersApi~deleteBalancerCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/DeleteBalancer200Response}
     */
    deleteBalancer(balancerId, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'balancerId' is set
      if (balancerId === undefined || balancerId === null) {
        throw new Error("Missing the required parameter 'balancerId' when calling deleteBalancer");
      }

      let pathParams = {
        'balancer_id': balancerId
      };
      let queryParams = {
        'hash': opts['hash'],
        'code': opts['code']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = DeleteBalancer200Response;
      return this.apiClient.callApi(
        '/api/v1/balancers/{balancer_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteBalancerRule operation.
     * @callback module:api/BalancersApi~deleteBalancerRuleCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Удаление правила для балансировщика
     * Чтобы удалить правило для балансировщика, отправьте запрос DELETE в `api/v1/balancers/{balancer_id}/rules/{rule_id}`. 
     * @param {Number} balancerId Идентификатор балансировщика
     * @param {Number} ruleId Идентификатор правила для балансировщика
     * @param {module:api/BalancersApi~deleteBalancerRuleCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteBalancerRule(balancerId, ruleId, callback) {
      let postBody = null;
      // verify the required parameter 'balancerId' is set
      if (balancerId === undefined || balancerId === null) {
        throw new Error("Missing the required parameter 'balancerId' when calling deleteBalancerRule");
      }
      // verify the required parameter 'ruleId' is set
      if (ruleId === undefined || ruleId === null) {
        throw new Error("Missing the required parameter 'ruleId' when calling deleteBalancerRule");
      }

      let pathParams = {
        'balancer_id': balancerId,
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
        '/api/v1/balancers/{balancer_id}/rules/{rule_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteIPsFromBalancer operation.
     * @callback module:api/BalancersApi~deleteIPsFromBalancerCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Удаление IP-адресов из балансировщика
     * Чтобы удалить `IP`-адреса из балансировщика, отправьте запрос DELETE в `api/v1/balancers/{balancer_id}/ips`. 
     * @param {Number} balancerId Идентификатор балансировщика
     * @param {module:model/AddIPsToBalancerRequest} addIPsToBalancerRequest 
     * @param {module:api/BalancersApi~deleteIPsFromBalancerCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteIPsFromBalancer(balancerId, addIPsToBalancerRequest, callback) {
      let postBody = addIPsToBalancerRequest;
      // verify the required parameter 'balancerId' is set
      if (balancerId === undefined || balancerId === null) {
        throw new Error("Missing the required parameter 'balancerId' when calling deleteIPsFromBalancer");
      }
      // verify the required parameter 'addIPsToBalancerRequest' is set
      if (addIPsToBalancerRequest === undefined || addIPsToBalancerRequest === null) {
        throw new Error("Missing the required parameter 'addIPsToBalancerRequest' when calling deleteIPsFromBalancer");
      }

      let pathParams = {
        'balancer_id': balancerId
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
        '/api/v1/balancers/{balancer_id}/ips', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getBalancer operation.
     * @callback module:api/BalancersApi~getBalancerCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateBalancer200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение бaлансировщика
     * Чтобы отобразить информацию об отдельном балансировщике, отправьте запрос GET на `api/v1/balancers/{balancer_id}`. 
     * @param {Number} balancerId Идентификатор балансировщика
     * @param {module:api/BalancersApi~getBalancerCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateBalancer200Response}
     */
    getBalancer(balancerId, callback) {
      let postBody = null;
      // verify the required parameter 'balancerId' is set
      if (balancerId === undefined || balancerId === null) {
        throw new Error("Missing the required parameter 'balancerId' when calling getBalancer");
      }

      let pathParams = {
        'balancer_id': balancerId
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
      let returnType = CreateBalancer200Response;
      return this.apiClient.callApi(
        '/api/v1/balancers/{balancer_id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getBalancerIPs operation.
     * @callback module:api/BalancersApi~getBalancerIPsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetBalancerIPs200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка IP-адресов балансировщика
     * Чтобы добавить `IP`-адреса к балансировщику, отправьте запрос GET в `api/v1/balancers/{balancer_id}/ips`. 
     * @param {Number} balancerId Идентификатор балансировщика
     * @param {module:api/BalancersApi~getBalancerIPsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetBalancerIPs200Response}
     */
    getBalancerIPs(balancerId, callback) {
      let postBody = null;
      // verify the required parameter 'balancerId' is set
      if (balancerId === undefined || balancerId === null) {
        throw new Error("Missing the required parameter 'balancerId' when calling getBalancerIPs");
      }

      let pathParams = {
        'balancer_id': balancerId
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
      let returnType = GetBalancerIPs200Response;
      return this.apiClient.callApi(
        '/api/v1/balancers/{balancer_id}/ips', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getBalancerRules operation.
     * @callback module:api/BalancersApi~getBalancerRulesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetBalancerRules200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение правил балансировщика
     * Чтобы получить правила балансировщика, отправьте запрос GET в `api/v1/balancers/{balancer_id}/rules`. 
     * @param {Number} balancerId Идентификатор балансировщика
     * @param {module:api/BalancersApi~getBalancerRulesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetBalancerRules200Response}
     */
    getBalancerRules(balancerId, callback) {
      let postBody = null;
      // verify the required parameter 'balancerId' is set
      if (balancerId === undefined || balancerId === null) {
        throw new Error("Missing the required parameter 'balancerId' when calling getBalancerRules");
      }

      let pathParams = {
        'balancer_id': balancerId
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
      let returnType = GetBalancerRules200Response;
      return this.apiClient.callApi(
        '/api/v1/balancers/{balancer_id}/rules', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getBalancers operation.
     * @callback module:api/BalancersApi~getBalancersCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetBalancers200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка всех бaлансировщиков
     * Чтобы получить список всех бaлансировщиков на вашем аккаунте, отправьте GET-запрос на `/api/v1/balancers`.   Тело ответа будет представлять собой объект JSON с ключом `balancers`.
     * @param {Object} opts Optional parameters
     * @param {Number} [limit = 100)] Обозначает количество записей, которое необходимо вернуть.
     * @param {Number} [offset = 0)] Указывает на смещение относительно начала списка.
     * @param {module:api/BalancersApi~getBalancersCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetBalancers200Response}
     */
    getBalancers(opts, callback) {
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
      let returnType = GetBalancers200Response;
      return this.apiClient.callApi(
        '/api/v1/balancers', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getBalancersPresets operation.
     * @callback module:api/BalancersApi~getBalancersPresetsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetBalancersPresets200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка тарифов для балансировщика
     * Чтобы получить список тарифов для балансировщика, отправьте GET-запрос на `/api/v1/presets/balancers`.   Тело ответа будет представлять собой объект JSON с ключом `balancers_presets`.
     * @param {module:api/BalancersApi~getBalancersPresetsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetBalancersPresets200Response}
     */
    getBalancersPresets(callback) {
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
      let returnType = GetBalancersPresets200Response;
      return this.apiClient.callApi(
        '/api/v1/presets/balancers', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the updateBalancer operation.
     * @callback module:api/BalancersApi~updateBalancerCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateBalancer200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Обновление балансировщика
     * Чтобы обновить только определенные атрибуты балансировщика, отправьте запрос PATCH в `api/v1/balancers/{balancer_id}`. 
     * @param {Number} balancerId Идентификатор балансировщика
     * @param {module:model/UpdateBalancer} updateBalancer 
     * @param {module:api/BalancersApi~updateBalancerCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateBalancer200Response}
     */
    updateBalancer(balancerId, updateBalancer, callback) {
      let postBody = updateBalancer;
      // verify the required parameter 'balancerId' is set
      if (balancerId === undefined || balancerId === null) {
        throw new Error("Missing the required parameter 'balancerId' when calling updateBalancer");
      }
      // verify the required parameter 'updateBalancer' is set
      if (updateBalancer === undefined || updateBalancer === null) {
        throw new Error("Missing the required parameter 'updateBalancer' when calling updateBalancer");
      }

      let pathParams = {
        'balancer_id': balancerId
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
      let returnType = CreateBalancer200Response;
      return this.apiClient.callApi(
        '/api/v1/balancers/{balancer_id}', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the updateBalancerRule operation.
     * @callback module:api/BalancersApi~updateBalancerRuleCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateBalancerRule200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Обновление правила для балансировщика
     * Чтобы обновить правило для балансировщика, отправьте запрос PATCH в `api/v1/balancers/{balancer_id}/rules/{rule_id}`. 
     * @param {Number} balancerId Идентификатор балансировщика
     * @param {Number} ruleId Идентификатор правила для балансировщика
     * @param {module:model/UpdateRule} updateRule 
     * @param {module:api/BalancersApi~updateBalancerRuleCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateBalancerRule200Response}
     */
    updateBalancerRule(balancerId, ruleId, updateRule, callback) {
      let postBody = updateRule;
      // verify the required parameter 'balancerId' is set
      if (balancerId === undefined || balancerId === null) {
        throw new Error("Missing the required parameter 'balancerId' when calling updateBalancerRule");
      }
      // verify the required parameter 'ruleId' is set
      if (ruleId === undefined || ruleId === null) {
        throw new Error("Missing the required parameter 'ruleId' when calling updateBalancerRule");
      }
      // verify the required parameter 'updateRule' is set
      if (updateRule === undefined || updateRule === null) {
        throw new Error("Missing the required parameter 'updateRule' when calling updateBalancerRule");
      }

      let pathParams = {
        'balancer_id': balancerId,
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
      let returnType = CreateBalancerRule200Response;
      return this.apiClient.callApi(
        '/api/v1/balancers/{balancer_id}/rules/{rule_id}', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}
