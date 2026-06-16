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
import AvailableNetworksResponse from '../model/AvailableNetworksResponse';
import AvailableStaticRoutesResponse from '../model/AvailableStaticRoutesResponse';
import DnatIn from '../model/DnatIn';
import DnatRuleResponse from '../model/DnatRuleResponse';
import DnatRulesResponse from '../model/DnatRulesResponse';
import GetAccountStatus403Response from '../model/GetAccountStatus403Response';
import GetFinances400Response from '../model/GetFinances400Response';
import GetFinances401Response from '../model/GetFinances401Response';
import GetFinances429Response from '../model/GetFinances429Response';
import GetFinances500Response from '../model/GetFinances500Response';
import GetImage404Response from '../model/GetImage404Response';
import NatIn from '../model/NatIn';
import NetworkEdit from '../model/NetworkEdit';
import NetworkIn from '../model/NetworkIn';
import NetworkResponse from '../model/NetworkResponse';
import NetworksResponse from '../model/NetworksResponse';
import RouterEdit from '../model/RouterEdit';
import RouterIn from '../model/RouterIn';
import RouterPresetsResponse from '../model/RouterPresetsResponse';
import RouterResponse from '../model/RouterResponse';
import RouterStatisticsResponse from '../model/RouterStatisticsResponse';
import RoutersResponse from '../model/RoutersResponse';
import StaticRouteIn from '../model/StaticRouteIn';
import StaticRouteResponse from '../model/StaticRouteResponse';
import StaticRoutesResponse from '../model/StaticRoutesResponse';

/**
* Routers service.
* @module api/RoutersApi
* @version 1.0.0
*/
export default class RoutersApi {

    /**
    * Constructs a new RoutersApi. 
    * @alias module:api/RoutersApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }


    /**
     * Callback function to receive the result of the addNetworks operation.
     * @callback module:api/RoutersApi~addNetworksCallback
     * @param {String} error Error message, if any.
     * @param {module:model/NetworksResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Подключение сетей к роутеру
     * Чтобы подключить сети к роутеру, отправьте POST-запрос на `/api/v1/routers/{router_id}/networks`.
     * @param {String} routerId ID роутера
     * @param {module:model/NetworkIn} networkIn 
     * @param {module:api/RoutersApi~addNetworksCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/NetworksResponse}
     */
    addNetworks(routerId, networkIn, callback) {
      let postBody = networkIn;
      // verify the required parameter 'routerId' is set
      if (routerId === undefined || routerId === null) {
        throw new Error("Missing the required parameter 'routerId' when calling addNetworks");
      }
      // verify the required parameter 'networkIn' is set
      if (networkIn === undefined || networkIn === null) {
        throw new Error("Missing the required parameter 'networkIn' when calling addNetworks");
      }

      let pathParams = {
        'router_id': routerId
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
      let returnType = NetworksResponse;
      return this.apiClient.callApi(
        '/api/v1/routers/{router_id}/networks', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the createRouter operation.
     * @callback module:api/RoutersApi~createRouterCallback
     * @param {String} error Error message, if any.
     * @param {module:model/RouterResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Создание роутера
     * Чтобы создать роутер, отправьте POST-запрос на `/api/v1/routers`.
     * @param {module:model/RouterIn} routerIn 
     * @param {module:api/RoutersApi~createRouterCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/RouterResponse}
     */
    createRouter(routerIn, callback) {
      let postBody = routerIn;
      // verify the required parameter 'routerIn' is set
      if (routerIn === undefined || routerIn === null) {
        throw new Error("Missing the required parameter 'routerIn' when calling createRouter");
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
      let returnType = RouterResponse;
      return this.apiClient.callApi(
        '/api/v1/routers', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteDnat operation.
     * @callback module:api/RoutersApi~deleteDnatCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Удаление правила проброса портов
     * Чтобы удалить правило проброса портов (DNAT), отправьте DELETE-запрос на `/api/v1/routers/{router_id}/dnat-rules/{dnat_id}`.
     * @param {String} routerId ID роутера
     * @param {String} dnatId ID правила
     * @param {module:api/RoutersApi~deleteDnatCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteDnat(routerId, dnatId, callback) {
      let postBody = null;
      // verify the required parameter 'routerId' is set
      if (routerId === undefined || routerId === null) {
        throw new Error("Missing the required parameter 'routerId' when calling deleteDnat");
      }
      // verify the required parameter 'dnatId' is set
      if (dnatId === undefined || dnatId === null) {
        throw new Error("Missing the required parameter 'dnatId' when calling deleteDnat");
      }

      let pathParams = {
        'router_id': routerId,
        'dnat_id': dnatId
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
        '/api/v1/routers/{router_id}/dnat-rules/{dnat_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteRouter operation.
     * @callback module:api/RoutersApi~deleteRouterCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Удаление роутера
     * Чтобы удалить роутер, отправьте DELETE-запрос на `/api/v1/routers/{router_id}`.
     * @param {String} routerId ID роутера
     * @param {module:api/RoutersApi~deleteRouterCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteRouter(routerId, callback) {
      let postBody = null;
      // verify the required parameter 'routerId' is set
      if (routerId === undefined || routerId === null) {
        throw new Error("Missing the required parameter 'routerId' when calling deleteRouter");
      }

      let pathParams = {
        'router_id': routerId
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
        '/api/v1/routers/{router_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteRouterNat operation.
     * @callback module:api/RoutersApi~deleteRouterNatCallback
     * @param {String} error Error message, if any.
     * @param {module:model/RouterResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Выключение NAT для сети
     * Чтобы выключить NAT для сети роутера, отправьте DELETE-запрос на `/api/v1/routers/{router_id}/networks/{network_name}/nat`.
     * @param {String} routerId ID роутера
     * @param {String} networkName Имя сети
     * @param {module:api/RoutersApi~deleteRouterNatCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/RouterResponse}
     */
    deleteRouterNat(routerId, networkName, callback) {
      let postBody = null;
      // verify the required parameter 'routerId' is set
      if (routerId === undefined || routerId === null) {
        throw new Error("Missing the required parameter 'routerId' when calling deleteRouterNat");
      }
      // verify the required parameter 'networkName' is set
      if (networkName === undefined || networkName === null) {
        throw new Error("Missing the required parameter 'networkName' when calling deleteRouterNat");
      }

      let pathParams = {
        'router_id': routerId,
        'network_name': networkName
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
      let returnType = RouterResponse;
      return this.apiClient.callApi(
        '/api/v1/routers/{router_id}/networks/{network_name}/nat', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteRouterNetwork operation.
     * @callback module:api/RoutersApi~deleteRouterNetworkCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Удаление сети из роутера
     * Чтобы отключить сеть от роутера, отправьте DELETE-запрос на `/api/v1/routers/{router_id}/networks/{network_name}`.
     * @param {String} routerId ID роутера
     * @param {String} networkName Имя сети
     * @param {module:api/RoutersApi~deleteRouterNetworkCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteRouterNetwork(routerId, networkName, callback) {
      let postBody = null;
      // verify the required parameter 'routerId' is set
      if (routerId === undefined || routerId === null) {
        throw new Error("Missing the required parameter 'routerId' when calling deleteRouterNetwork");
      }
      // verify the required parameter 'networkName' is set
      if (networkName === undefined || networkName === null) {
        throw new Error("Missing the required parameter 'networkName' when calling deleteRouterNetwork");
      }

      let pathParams = {
        'router_id': routerId,
        'network_name': networkName
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
        '/api/v1/routers/{router_id}/networks/{network_name}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteStaticRoute operation.
     * @callback module:api/RoutersApi~deleteStaticRouteCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Удаление статического маршрута
     * Чтобы удалить статический маршрут, отправьте DELETE-запрос на `/api/v1/routers/{router_id}/static-routes/{static_route_id}`.
     * @param {String} routerId ID роутера
     * @param {String} staticRouteId ID статического маршрута
     * @param {module:api/RoutersApi~deleteStaticRouteCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteStaticRoute(routerId, staticRouteId, callback) {
      let postBody = null;
      // verify the required parameter 'routerId' is set
      if (routerId === undefined || routerId === null) {
        throw new Error("Missing the required parameter 'routerId' when calling deleteStaticRoute");
      }
      // verify the required parameter 'staticRouteId' is set
      if (staticRouteId === undefined || staticRouteId === null) {
        throw new Error("Missing the required parameter 'staticRouteId' when calling deleteStaticRoute");
      }

      let pathParams = {
        'router_id': routerId,
        'static_route_id': staticRouteId
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
        '/api/v1/routers/{router_id}/static-routes/{static_route_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getAvailableStaticRoutes operation.
     * @callback module:api/RoutersApi~getAvailableStaticRoutesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AvailableStaticRoutesResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение доступных подсетей для статических маршрутов
     * Чтобы получить список подсетей, доступных для добавления статических маршрутов, отправьте GET-запрос на `/api/v1/routers/{router_id}/static-routes/available`.
     * @param {String} routerId ID роутера
     * @param {module:api/RoutersApi~getAvailableStaticRoutesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/AvailableStaticRoutesResponse}
     */
    getAvailableStaticRoutes(routerId, callback) {
      let postBody = null;
      // verify the required parameter 'routerId' is set
      if (routerId === undefined || routerId === null) {
        throw new Error("Missing the required parameter 'routerId' when calling getAvailableStaticRoutes");
      }

      let pathParams = {
        'router_id': routerId
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
      let returnType = AvailableStaticRoutesResponse;
      return this.apiClient.callApi(
        '/api/v1/routers/{router_id}/static-routes/available', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getDnat operation.
     * @callback module:api/RoutersApi~getDnatCallback
     * @param {String} error Error message, if any.
     * @param {module:model/DnatRulesResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка правил проброса портов
     * Чтобы получить список правил проброса портов (DNAT), отправьте GET-запрос на `/api/v1/routers/{router_id}/dnat-rules`.
     * @param {String} routerId ID роутера
     * @param {module:api/RoutersApi~getDnatCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/DnatRulesResponse}
     */
    getDnat(routerId, callback) {
      let postBody = null;
      // verify the required parameter 'routerId' is set
      if (routerId === undefined || routerId === null) {
        throw new Error("Missing the required parameter 'routerId' when calling getDnat");
      }

      let pathParams = {
        'router_id': routerId
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
      let returnType = DnatRulesResponse;
      return this.apiClient.callApi(
        '/api/v1/routers/{router_id}/dnat-rules', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getDnatRule operation.
     * @callback module:api/RoutersApi~getDnatRuleCallback
     * @param {String} error Error message, if any.
     * @param {module:model/DnatRuleResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение правила проброса портов
     * Чтобы получить информацию о правиле проброса портов (DNAT), отправьте GET-запрос на `/api/v1/routers/{router_id}/dnat-rules/{dnat_id}`.
     * @param {String} routerId ID роутера
     * @param {String} dnatId ID правила
     * @param {module:api/RoutersApi~getDnatRuleCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/DnatRuleResponse}
     */
    getDnatRule(routerId, dnatId, callback) {
      let postBody = null;
      // verify the required parameter 'routerId' is set
      if (routerId === undefined || routerId === null) {
        throw new Error("Missing the required parameter 'routerId' when calling getDnatRule");
      }
      // verify the required parameter 'dnatId' is set
      if (dnatId === undefined || dnatId === null) {
        throw new Error("Missing the required parameter 'dnatId' when calling getDnatRule");
      }

      let pathParams = {
        'router_id': routerId,
        'dnat_id': dnatId
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
      let returnType = DnatRuleResponse;
      return this.apiClient.callApi(
        '/api/v1/routers/{router_id}/dnat-rules/{dnat_id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getNetworks operation.
     * @callback module:api/RoutersApi~getNetworksCallback
     * @param {String} error Error message, if any.
     * @param {module:model/NetworksResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка сетей роутера
     * Чтобы получить список сетей роутера, отправьте GET-запрос на `/api/v1/routers/{router_id}/networks`.
     * @param {String} routerId ID роутера
     * @param {module:api/RoutersApi~getNetworksCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/NetworksResponse}
     */
    getNetworks(routerId, callback) {
      let postBody = null;
      // verify the required parameter 'routerId' is set
      if (routerId === undefined || routerId === null) {
        throw new Error("Missing the required parameter 'routerId' when calling getNetworks");
      }

      let pathParams = {
        'router_id': routerId
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
      let returnType = NetworksResponse;
      return this.apiClient.callApi(
        '/api/v1/routers/{router_id}/networks', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getRouter operation.
     * @callback module:api/RoutersApi~getRouterCallback
     * @param {String} error Error message, if any.
     * @param {module:model/RouterResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение информации о роутере
     * Чтобы получить информацию о роутере, отправьте GET-запрос на `/api/v1/routers/{router_id}`.
     * @param {String} routerId ID роутера
     * @param {module:api/RoutersApi~getRouterCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/RouterResponse}
     */
    getRouter(routerId, callback) {
      let postBody = null;
      // verify the required parameter 'routerId' is set
      if (routerId === undefined || routerId === null) {
        throw new Error("Missing the required parameter 'routerId' when calling getRouter");
      }

      let pathParams = {
        'router_id': routerId
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
      let returnType = RouterResponse;
      return this.apiClient.callApi(
        '/api/v1/routers/{router_id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getRouterAvailableNetworks operation.
     * @callback module:api/RoutersApi~getRouterAvailableNetworksCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AvailableNetworksResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка доступных сетей
     * Чтобы получить список локальных сетей, доступных для подключения к роутеру, отправьте GET-запрос на `/api/v1/routers/networks/available`.
     * @param {module:api/RoutersApi~getRouterAvailableNetworksCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/AvailableNetworksResponse}
     */
    getRouterAvailableNetworks(callback) {
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
      let returnType = AvailableNetworksResponse;
      return this.apiClient.callApi(
        '/api/v1/routers/networks/available', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getRouterPresets operation.
     * @callback module:api/RoutersApi~getRouterPresetsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/RouterPresetsResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка тарифов роутеров
     * Чтобы получить список доступных тарифов роутеров, отправьте GET-запрос на `/api/v1/presets/routers`.
     * @param {module:api/RoutersApi~getRouterPresetsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/RouterPresetsResponse}
     */
    getRouterPresets(callback) {
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
      let returnType = RouterPresetsResponse;
      return this.apiClient.callApi(
        '/api/v1/presets/routers', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getRouterStatistics operation.
     * @callback module:api/RoutersApi~getRouterStatisticsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/RouterStatisticsResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение статистики роутера
     * Чтобы получить статистику роутера, отправьте GET-запрос на `/api/v1/routers/{router_id}/statistics/{time_from}/{period}/{keys}`.
     * @param {String} routerId ID роутера
     * @param {String} timeFrom Начало периода
     * @param {String} period Период агрегации
     * @param {String} keys Ключи метрик
     * @param {Object} opts Optional parameters
     * @param {String} [nodeId] ID ноды
     * @param {module:api/RoutersApi~getRouterStatisticsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/RouterStatisticsResponse}
     */
    getRouterStatistics(routerId, timeFrom, period, keys, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'routerId' is set
      if (routerId === undefined || routerId === null) {
        throw new Error("Missing the required parameter 'routerId' when calling getRouterStatistics");
      }
      // verify the required parameter 'timeFrom' is set
      if (timeFrom === undefined || timeFrom === null) {
        throw new Error("Missing the required parameter 'timeFrom' when calling getRouterStatistics");
      }
      // verify the required parameter 'period' is set
      if (period === undefined || period === null) {
        throw new Error("Missing the required parameter 'period' when calling getRouterStatistics");
      }
      // verify the required parameter 'keys' is set
      if (keys === undefined || keys === null) {
        throw new Error("Missing the required parameter 'keys' when calling getRouterStatistics");
      }

      let pathParams = {
        'router_id': routerId,
        'time_from': timeFrom,
        'period': period,
        'keys': keys
      };
      let queryParams = {
        'node_id': opts['nodeId']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = RouterStatisticsResponse;
      return this.apiClient.callApi(
        '/api/v1/routers/{router_id}/statistics/{time_from}/{period}/{keys}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getRouters operation.
     * @callback module:api/RoutersApi~getRoutersCallback
     * @param {String} error Error message, if any.
     * @param {module:model/RoutersResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка роутеров
     * Чтобы получить список роутеров, отправьте GET-запрос на `/api/v1/routers`.
     * @param {module:api/RoutersApi~getRoutersCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/RoutersResponse}
     */
    getRouters(callback) {
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
      let returnType = RoutersResponse;
      return this.apiClient.callApi(
        '/api/v1/routers', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getStaticRoutes operation.
     * @callback module:api/RoutersApi~getStaticRoutesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/StaticRoutesResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка статических маршрутов
     * Чтобы получить список статических маршрутов роутера, отправьте GET-запрос на `/api/v1/routers/{router_id}/static-routes`.
     * @param {String} routerId ID роутера
     * @param {module:api/RoutersApi~getStaticRoutesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/StaticRoutesResponse}
     */
    getStaticRoutes(routerId, callback) {
      let postBody = null;
      // verify the required parameter 'routerId' is set
      if (routerId === undefined || routerId === null) {
        throw new Error("Missing the required parameter 'routerId' when calling getStaticRoutes");
      }

      let pathParams = {
        'router_id': routerId
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
      let returnType = StaticRoutesResponse;
      return this.apiClient.callApi(
        '/api/v1/routers/{router_id}/static-routes', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the patchNetwork operation.
     * @callback module:api/RoutersApi~patchNetworkCallback
     * @param {String} error Error message, if any.
     * @param {module:model/NetworkResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Обновление информации о сети
     * Чтобы включить или выключить DHCP в сети роутера, отправьте PATCH-запрос на `/api/v1/routers/{router_id}/networks/{network_name}`.
     * @param {String} routerId ID роутера
     * @param {String} networkName Имя сети
     * @param {module:model/NetworkEdit} networkEdit 
     * @param {module:api/RoutersApi~patchNetworkCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/NetworkResponse}
     */
    patchNetwork(routerId, networkName, networkEdit, callback) {
      let postBody = networkEdit;
      // verify the required parameter 'routerId' is set
      if (routerId === undefined || routerId === null) {
        throw new Error("Missing the required parameter 'routerId' when calling patchNetwork");
      }
      // verify the required parameter 'networkName' is set
      if (networkName === undefined || networkName === null) {
        throw new Error("Missing the required parameter 'networkName' when calling patchNetwork");
      }
      // verify the required parameter 'networkEdit' is set
      if (networkEdit === undefined || networkEdit === null) {
        throw new Error("Missing the required parameter 'networkEdit' when calling patchNetwork");
      }

      let pathParams = {
        'router_id': routerId,
        'network_name': networkName
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
      let returnType = NetworkResponse;
      return this.apiClient.callApi(
        '/api/v1/routers/{router_id}/networks/{network_name}', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the patchNetworks operation.
     * @callback module:api/RoutersApi~patchNetworksCallback
     * @param {String} error Error message, if any.
     * @param {module:model/NetworksResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Обновление сетей роутера
     * Чтобы обновить набор сетей роутера, отправьте PATCH-запрос на `/api/v1/routers/{router_id}/networks`.
     * @param {String} routerId ID роутера
     * @param {module:model/NetworkIn} networkIn 
     * @param {module:api/RoutersApi~patchNetworksCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/NetworksResponse}
     */
    patchNetworks(routerId, networkIn, callback) {
      let postBody = networkIn;
      // verify the required parameter 'routerId' is set
      if (routerId === undefined || routerId === null) {
        throw new Error("Missing the required parameter 'routerId' when calling patchNetworks");
      }
      // verify the required parameter 'networkIn' is set
      if (networkIn === undefined || networkIn === null) {
        throw new Error("Missing the required parameter 'networkIn' when calling patchNetworks");
      }

      let pathParams = {
        'router_id': routerId
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
      let returnType = NetworksResponse;
      return this.apiClient.callApi(
        '/api/v1/routers/{router_id}/networks', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the postDnat operation.
     * @callback module:api/RoutersApi~postDnatCallback
     * @param {String} error Error message, if any.
     * @param {module:model/DnatRuleResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Добавление правила проброса портов
     * Чтобы добавить правило проброса портов (DNAT), отправьте POST-запрос на `/api/v1/routers/{router_id}/dnat-rules`.
     * @param {String} routerId ID роутера
     * @param {module:model/DnatIn} dnatIn 
     * @param {module:api/RoutersApi~postDnatCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/DnatRuleResponse}
     */
    postDnat(routerId, dnatIn, callback) {
      let postBody = dnatIn;
      // verify the required parameter 'routerId' is set
      if (routerId === undefined || routerId === null) {
        throw new Error("Missing the required parameter 'routerId' when calling postDnat");
      }
      // verify the required parameter 'dnatIn' is set
      if (dnatIn === undefined || dnatIn === null) {
        throw new Error("Missing the required parameter 'dnatIn' when calling postDnat");
      }

      let pathParams = {
        'router_id': routerId
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
      let returnType = DnatRuleResponse;
      return this.apiClient.callApi(
        '/api/v1/routers/{router_id}/dnat-rules', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the postStaticRoute operation.
     * @callback module:api/RoutersApi~postStaticRouteCallback
     * @param {String} error Error message, if any.
     * @param {module:model/StaticRouteResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Добавление статического маршрута
     * Чтобы добавить статический маршрут, отправьте POST-запрос на `/api/v1/routers/{router_id}/static-routes`.
     * @param {String} routerId ID роутера
     * @param {module:model/StaticRouteIn} staticRouteIn 
     * @param {module:api/RoutersApi~postStaticRouteCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/StaticRouteResponse}
     */
    postStaticRoute(routerId, staticRouteIn, callback) {
      let postBody = staticRouteIn;
      // verify the required parameter 'routerId' is set
      if (routerId === undefined || routerId === null) {
        throw new Error("Missing the required parameter 'routerId' when calling postStaticRoute");
      }
      // verify the required parameter 'staticRouteIn' is set
      if (staticRouteIn === undefined || staticRouteIn === null) {
        throw new Error("Missing the required parameter 'staticRouteIn' when calling postStaticRoute");
      }

      let pathParams = {
        'router_id': routerId
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
      let returnType = StaticRouteResponse;
      return this.apiClient.callApi(
        '/api/v1/routers/{router_id}/static-routes', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the updateRouter operation.
     * @callback module:api/RoutersApi~updateRouterCallback
     * @param {String} error Error message, if any.
     * @param {module:model/RouterResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Обновление информации о роутере
     * Чтобы обновить информацию о роутере, отправьте PATCH-запрос на `/api/v1/routers/{router_id}`.
     * @param {String} routerId ID роутера
     * @param {module:model/RouterEdit} routerEdit 
     * @param {module:api/RoutersApi~updateRouterCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/RouterResponse}
     */
    updateRouter(routerId, routerEdit, callback) {
      let postBody = routerEdit;
      // verify the required parameter 'routerId' is set
      if (routerId === undefined || routerId === null) {
        throw new Error("Missing the required parameter 'routerId' when calling updateRouter");
      }
      // verify the required parameter 'routerEdit' is set
      if (routerEdit === undefined || routerEdit === null) {
        throw new Error("Missing the required parameter 'routerEdit' when calling updateRouter");
      }

      let pathParams = {
        'router_id': routerId
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
      let returnType = RouterResponse;
      return this.apiClient.callApi(
        '/api/v1/routers/{router_id}', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the updateRouterNat operation.
     * @callback module:api/RoutersApi~updateRouterNatCallback
     * @param {String} error Error message, if any.
     * @param {module:model/RouterResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Включение NAT для сети
     * Чтобы включить NAT для сети роутера, отправьте PATCH-запрос на `/api/v1/routers/{router_id}/networks/{network_name}/nat`.
     * @param {String} routerId ID роутера
     * @param {String} networkName Имя сети
     * @param {module:model/NatIn} natIn 
     * @param {module:api/RoutersApi~updateRouterNatCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/RouterResponse}
     */
    updateRouterNat(routerId, networkName, natIn, callback) {
      let postBody = natIn;
      // verify the required parameter 'routerId' is set
      if (routerId === undefined || routerId === null) {
        throw new Error("Missing the required parameter 'routerId' when calling updateRouterNat");
      }
      // verify the required parameter 'networkName' is set
      if (networkName === undefined || networkName === null) {
        throw new Error("Missing the required parameter 'networkName' when calling updateRouterNat");
      }
      // verify the required parameter 'natIn' is set
      if (natIn === undefined || natIn === null) {
        throw new Error("Missing the required parameter 'natIn' when calling updateRouterNat");
      }

      let pathParams = {
        'router_id': routerId,
        'network_name': networkName
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
      let returnType = RouterResponse;
      return this.apiClient.callApi(
        '/api/v1/routers/{router_id}/networks/{network_name}/nat', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}
