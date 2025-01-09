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
import AddCountriesToAllowedList201Response from '../model/AddCountriesToAllowedList201Response';
import AddCountriesToAllowedListRequest from '../model/AddCountriesToAllowedListRequest';
import AddIPsToAllowedList201Response from '../model/AddIPsToAllowedList201Response';
import AddIPsToAllowedListRequest from '../model/AddIPsToAllowedListRequest';
import DeleteCountriesFromAllowedList200Response from '../model/DeleteCountriesFromAllowedList200Response';
import DeleteCountriesFromAllowedListRequest from '../model/DeleteCountriesFromAllowedListRequest';
import DeleteIPsFromAllowedList200Response from '../model/DeleteIPsFromAllowedList200Response';
import DeleteIPsFromAllowedListRequest from '../model/DeleteIPsFromAllowedListRequest';
import GetAccountStatus200Response from '../model/GetAccountStatus200Response';
import GetAuthAccessSettings200Response from '../model/GetAuthAccessSettings200Response';
import GetCountries200Response from '../model/GetCountries200Response';
import GetFinances200Response from '../model/GetFinances200Response';
import GetFinances400Response from '../model/GetFinances400Response';
import GetFinances401Response from '../model/GetFinances401Response';
import GetFinances403Response from '../model/GetFinances403Response';
import GetFinances429Response from '../model/GetFinances429Response';
import GetFinances500Response from '../model/GetFinances500Response';
import GetNotificationSettings200Response from '../model/GetNotificationSettings200Response';
import UpdateAuthRestrictionsByCountriesRequest from '../model/UpdateAuthRestrictionsByCountriesRequest';
import UpdateNotificationSettingsRequest from '../model/UpdateNotificationSettingsRequest';

/**
* Account service.
* @module api/AccountApi
* @version 1.0.0
*/
export default class AccountApi {

    /**
    * Constructs a new AccountApi. 
    * @alias module:api/AccountApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }


    /**
     * Callback function to receive the result of the addCountriesToAllowedList operation.
     * @callback module:api/AccountApi~addCountriesToAllowedListCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AddCountriesToAllowedList201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Добавление стран в список разрешенных
     * Чтобы добавить страны в список разрешенных, отправьте POST-запрос в `api/v1/access/countries`, передав в теле запроса параметр `countries` со списком стран.
     * @param {module:model/AddCountriesToAllowedListRequest} addCountriesToAllowedListRequest 
     * @param {module:api/AccountApi~addCountriesToAllowedListCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/AddCountriesToAllowedList201Response}
     */
    addCountriesToAllowedList(addCountriesToAllowedListRequest, callback) {
      let postBody = addCountriesToAllowedListRequest;
      // verify the required parameter 'addCountriesToAllowedListRequest' is set
      if (addCountriesToAllowedListRequest === undefined || addCountriesToAllowedListRequest === null) {
        throw new Error("Missing the required parameter 'addCountriesToAllowedListRequest' when calling addCountriesToAllowedList");
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
      let returnType = AddCountriesToAllowedList201Response;
      return this.apiClient.callApi(
        '/api/v1/auth/access/countries', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the addIPsToAllowedList operation.
     * @callback module:api/AccountApi~addIPsToAllowedListCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AddIPsToAllowedList201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Добавление IP-адресов в список разрешенных
     * Чтобы добавить IP-адреса в список разрешенных, отправьте POST-запрос в `api/v1/access/ips`, передав в теле запроса параметр `ips` со списком IP-адресов.
     * @param {module:model/AddIPsToAllowedListRequest} addIPsToAllowedListRequest 
     * @param {module:api/AccountApi~addIPsToAllowedListCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/AddIPsToAllowedList201Response}
     */
    addIPsToAllowedList(addIPsToAllowedListRequest, callback) {
      let postBody = addIPsToAllowedListRequest;
      // verify the required parameter 'addIPsToAllowedListRequest' is set
      if (addIPsToAllowedListRequest === undefined || addIPsToAllowedListRequest === null) {
        throw new Error("Missing the required parameter 'addIPsToAllowedListRequest' when calling addIPsToAllowedList");
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
      let returnType = AddIPsToAllowedList201Response;
      return this.apiClient.callApi(
        '/api/v1/auth/access/ips', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteCountriesFromAllowedList operation.
     * @callback module:api/AccountApi~deleteCountriesFromAllowedListCallback
     * @param {String} error Error message, if any.
     * @param {module:model/DeleteCountriesFromAllowedList200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Удаление стран из списка разрешенных
     * Чтобы удалить страны из списка разрешенных, отправьте DELETE-запрос в `api/v1/access/countries`, передав в теле запроса параметр `countries` со списком стран.
     * @param {module:model/DeleteCountriesFromAllowedListRequest} deleteCountriesFromAllowedListRequest 
     * @param {module:api/AccountApi~deleteCountriesFromAllowedListCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/DeleteCountriesFromAllowedList200Response}
     */
    deleteCountriesFromAllowedList(deleteCountriesFromAllowedListRequest, callback) {
      let postBody = deleteCountriesFromAllowedListRequest;
      // verify the required parameter 'deleteCountriesFromAllowedListRequest' is set
      if (deleteCountriesFromAllowedListRequest === undefined || deleteCountriesFromAllowedListRequest === null) {
        throw new Error("Missing the required parameter 'deleteCountriesFromAllowedListRequest' when calling deleteCountriesFromAllowedList");
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
      let returnType = DeleteCountriesFromAllowedList200Response;
      return this.apiClient.callApi(
        '/api/v1/auth/access/countries', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteIPsFromAllowedList operation.
     * @callback module:api/AccountApi~deleteIPsFromAllowedListCallback
     * @param {String} error Error message, if any.
     * @param {module:model/DeleteIPsFromAllowedList200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Удаление IP-адресов из списка разрешенных
     * Чтобы удалить IP-адреса из списка разрешенных, отправьте DELETE-запрос в `api/v1/access/ips`, передав в теле запроса параметр `ips` со списком IP-адресов.
     * @param {module:model/DeleteIPsFromAllowedListRequest} deleteIPsFromAllowedListRequest 
     * @param {module:api/AccountApi~deleteIPsFromAllowedListCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/DeleteIPsFromAllowedList200Response}
     */
    deleteIPsFromAllowedList(deleteIPsFromAllowedListRequest, callback) {
      let postBody = deleteIPsFromAllowedListRequest;
      // verify the required parameter 'deleteIPsFromAllowedListRequest' is set
      if (deleteIPsFromAllowedListRequest === undefined || deleteIPsFromAllowedListRequest === null) {
        throw new Error("Missing the required parameter 'deleteIPsFromAllowedListRequest' when calling deleteIPsFromAllowedList");
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
      let returnType = DeleteIPsFromAllowedList200Response;
      return this.apiClient.callApi(
        '/api/v1/auth/access/ips', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getAccountStatus operation.
     * @callback module:api/AccountApi~getAccountStatusCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetAccountStatus200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение статуса аккаунта
     * Чтобы получить статус аккаунта, отправьте GET-запрос на `/api/v1/account/status`.
     * @param {module:api/AccountApi~getAccountStatusCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetAccountStatus200Response}
     */
    getAccountStatus(callback) {
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
      let returnType = GetAccountStatus200Response;
      return this.apiClient.callApi(
        '/api/v1/account/status', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getAuthAccessSettings operation.
     * @callback module:api/AccountApi~getAuthAccessSettingsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetAuthAccessSettings200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получить информацию о ограничениях авторизации пользователя
     * Чтобы получить информацию о ограничениях авторизации пользователя, отправьте GET-запрос на `/api/v1/auth/access`.   Тело ответа будет представлять собой объект JSON с ключами `is_ip_restrictions_enabled`, `is_country_restrictions_enabled` и `white_list`.
     * @param {module:api/AccountApi~getAuthAccessSettingsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetAuthAccessSettings200Response}
     */
    getAuthAccessSettings(callback) {
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
      let returnType = GetAuthAccessSettings200Response;
      return this.apiClient.callApi(
        '/api/v1/auth/access', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getCountries operation.
     * @callback module:api/AccountApi~getCountriesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetCountries200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка стран
     * Чтобы получить список стран, отправьте GET-запрос на `/api/v1/auth/access/countries`.   Тело ответа будет представлять собой объект JSON с ключом `countries`.
     * @param {module:api/AccountApi~getCountriesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetCountries200Response}
     */
    getCountries(callback) {
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
      let returnType = GetCountries200Response;
      return this.apiClient.callApi(
        '/api/v1/auth/access/countries', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getFinances operation.
     * @callback module:api/AccountApi~getFinancesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetFinances200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение платежной информации
     * Чтобы получить платежную информацию, отправьте GET-запрос на `/api/v1/account/finances`.
     * @param {module:api/AccountApi~getFinancesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetFinances200Response}
     */
    getFinances(callback) {
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
      let returnType = GetFinances200Response;
      return this.apiClient.callApi(
        '/api/v1/account/finances', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getNotificationSettings operation.
     * @callback module:api/AccountApi~getNotificationSettingsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetNotificationSettings200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение настроек уведомлений аккаунта
     * Чтобы получить статус аккаунта, отправьте GET запрос на `/api/v1/account/notification-settings`.
     * @param {module:api/AccountApi~getNotificationSettingsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetNotificationSettings200Response}
     */
    getNotificationSettings(callback) {
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
      let returnType = GetNotificationSettings200Response;
      return this.apiClient.callApi(
        '/api/v1/account/notification-settings', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the updateAuthRestrictionsByCountries operation.
     * @callback module:api/AccountApi~updateAuthRestrictionsByCountriesCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Включение/отключение ограничений по стране
     * Чтобы включить/отключить ограничения по стране, отправьте POST-запрос в `api/v1/access/countries/enabled`, передав в теле запроса параметр `is_enabled`
     * @param {module:model/UpdateAuthRestrictionsByCountriesRequest} updateAuthRestrictionsByCountriesRequest 
     * @param {module:api/AccountApi~updateAuthRestrictionsByCountriesCallback} callback The callback function, accepting three arguments: error, data, response
     */
    updateAuthRestrictionsByCountries(updateAuthRestrictionsByCountriesRequest, callback) {
      let postBody = updateAuthRestrictionsByCountriesRequest;
      // verify the required parameter 'updateAuthRestrictionsByCountriesRequest' is set
      if (updateAuthRestrictionsByCountriesRequest === undefined || updateAuthRestrictionsByCountriesRequest === null) {
        throw new Error("Missing the required parameter 'updateAuthRestrictionsByCountriesRequest' when calling updateAuthRestrictionsByCountries");
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
      let returnType = null;
      return this.apiClient.callApi(
        '/api/v1/auth/access/countries/enabled', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the updateAuthRestrictionsByIP operation.
     * @callback module:api/AccountApi~updateAuthRestrictionsByIPCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Включение/отключение ограничений по IP-адресу
     * Чтобы включить/отключить ограничения по IP-адресу, отправьте POST-запрос в `api/v1/access/ips/enabled`, передав в теле запроса параметр `is_enabled`
     * @param {module:model/UpdateAuthRestrictionsByCountriesRequest} updateAuthRestrictionsByCountriesRequest 
     * @param {module:api/AccountApi~updateAuthRestrictionsByIPCallback} callback The callback function, accepting three arguments: error, data, response
     */
    updateAuthRestrictionsByIP(updateAuthRestrictionsByCountriesRequest, callback) {
      let postBody = updateAuthRestrictionsByCountriesRequest;
      // verify the required parameter 'updateAuthRestrictionsByCountriesRequest' is set
      if (updateAuthRestrictionsByCountriesRequest === undefined || updateAuthRestrictionsByCountriesRequest === null) {
        throw new Error("Missing the required parameter 'updateAuthRestrictionsByCountriesRequest' when calling updateAuthRestrictionsByIP");
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
      let returnType = null;
      return this.apiClient.callApi(
        '/api/v1/auth/access/ips/enabled', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the updateNotificationSettings operation.
     * @callback module:api/AccountApi~updateNotificationSettingsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetNotificationSettings200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Изменение настроек уведомлений аккаунта
     * Чтобы изменить настройки уведомлений аккаунта, отправьте PATCH запрос на `/api/v1/account/notification-settings`.
     * @param {module:model/UpdateNotificationSettingsRequest} updateNotificationSettingsRequest 
     * @param {module:api/AccountApi~updateNotificationSettingsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetNotificationSettings200Response}
     */
    updateNotificationSettings(updateNotificationSettingsRequest, callback) {
      let postBody = updateNotificationSettingsRequest;
      // verify the required parameter 'updateNotificationSettingsRequest' is set
      if (updateNotificationSettingsRequest === undefined || updateNotificationSettingsRequest === null) {
        throw new Error("Missing the required parameter 'updateNotificationSettingsRequest' when calling updateNotificationSettings");
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
      let returnType = GetNotificationSettings200Response;
      return this.apiClient.callApi(
        '/api/v1/account/notification-settings', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}
