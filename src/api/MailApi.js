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
import CreateDomainMailbox201Response from '../model/CreateDomainMailbox201Response';
import CreateDomainMailboxRequest from '../model/CreateDomainMailboxRequest';
import CreateMultipleDomainMailboxes201Response from '../model/CreateMultipleDomainMailboxes201Response';
import CreateMultipleDomainMailboxesRequest from '../model/CreateMultipleDomainMailboxesRequest';
import GetDomainMailInfo200Response from '../model/GetDomainMailInfo200Response';
import GetFinances400Response from '../model/GetFinances400Response';
import GetFinances401Response from '../model/GetFinances401Response';
import GetFinances403Response from '../model/GetFinances403Response';
import GetFinances429Response from '../model/GetFinances429Response';
import GetFinances500Response from '../model/GetFinances500Response';
import GetImage404Response from '../model/GetImage404Response';
import GetMailQuota200Response from '../model/GetMailQuota200Response';
import GetMailboxes200Response from '../model/GetMailboxes200Response';
import UpdateDomainMailInfoRequest from '../model/UpdateDomainMailInfoRequest';
import UpdateMailQuotaRequest from '../model/UpdateMailQuotaRequest';
import UpdateMailbox from '../model/UpdateMailbox';

/**
* Mail service.
* @module api/MailApi
* @version 1.0.0
*/
export default class MailApi {

    /**
    * Constructs a new MailApi. 
    * @alias module:api/MailApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }


    /**
     * Callback function to receive the result of the createDomainMailbox operation.
     * @callback module:api/MailApi~createDomainMailboxCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateDomainMailbox201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Создание почтового ящика
     * Чтобы создать почтовый ящик, отправьте POST-запрос на `/api/v1/mail/domains/{domain}`.
     * @param {String} domain Полное имя домена
     * @param {module:model/CreateDomainMailboxRequest} createDomainMailboxRequest 
     * @param {module:api/MailApi~createDomainMailboxCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateDomainMailbox201Response}
     */
    createDomainMailbox(domain, createDomainMailboxRequest, callback) {
      let postBody = createDomainMailboxRequest;
      // verify the required parameter 'domain' is set
      if (domain === undefined || domain === null) {
        throw new Error("Missing the required parameter 'domain' when calling createDomainMailbox");
      }
      // verify the required parameter 'createDomainMailboxRequest' is set
      if (createDomainMailboxRequest === undefined || createDomainMailboxRequest === null) {
        throw new Error("Missing the required parameter 'createDomainMailboxRequest' when calling createDomainMailbox");
      }

      let pathParams = {
        'domain': domain
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
      let returnType = CreateDomainMailbox201Response;
      return this.apiClient.callApi(
        '/api/v1/mail/domains/{domain}', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the createMultipleDomainMailboxes operation.
     * @callback module:api/MailApi~createMultipleDomainMailboxesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateMultipleDomainMailboxes201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Множественное создание почтовых ящиков
     * Чтобы создать почтовый ящики, отправьте POST-запрос на `/api/v1/mail/domains/{domain}/batch`.
     * @param {String} domain Полное имя домена
     * @param {module:model/CreateMultipleDomainMailboxesRequest} createMultipleDomainMailboxesRequest 
     * @param {module:api/MailApi~createMultipleDomainMailboxesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateMultipleDomainMailboxes201Response}
     */
    createMultipleDomainMailboxes(domain, createMultipleDomainMailboxesRequest, callback) {
      let postBody = createMultipleDomainMailboxesRequest;
      // verify the required parameter 'domain' is set
      if (domain === undefined || domain === null) {
        throw new Error("Missing the required parameter 'domain' when calling createMultipleDomainMailboxes");
      }
      // verify the required parameter 'createMultipleDomainMailboxesRequest' is set
      if (createMultipleDomainMailboxesRequest === undefined || createMultipleDomainMailboxesRequest === null) {
        throw new Error("Missing the required parameter 'createMultipleDomainMailboxesRequest' when calling createMultipleDomainMailboxes");
      }

      let pathParams = {
        'domain': domain
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
      let returnType = CreateMultipleDomainMailboxes201Response;
      return this.apiClient.callApi(
        '/api/v1/mail/domains/{domain}/batch', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteMailbox operation.
     * @callback module:api/MailApi~deleteMailboxCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Удаление почтового ящика
     * Чтобы удалить почтовый ящик, отправьте DELETE-запрос на `/api/v1/mail/domains/{domain}/mailboxes/{mailbox}`.
     * @param {String} domain Полное имя домена
     * @param {String} mailbox Название почтового ящика
     * @param {module:api/MailApi~deleteMailboxCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteMailbox(domain, mailbox, callback) {
      let postBody = null;
      // verify the required parameter 'domain' is set
      if (domain === undefined || domain === null) {
        throw new Error("Missing the required parameter 'domain' when calling deleteMailbox");
      }
      // verify the required parameter 'mailbox' is set
      if (mailbox === undefined || mailbox === null) {
        throw new Error("Missing the required parameter 'mailbox' when calling deleteMailbox");
      }

      let pathParams = {
        'domain': domain,
        'mailbox': mailbox
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
        '/api/v1/mail/domains/{domain}/mailboxes/{mailbox}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getDomainMailInfo operation.
     * @callback module:api/MailApi~getDomainMailInfoCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetDomainMailInfo200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение почтовой информации о домене
     * Чтобы получить почтовую информацию о домене, отправьте GET-запрос на `/api/v1/mail/domains/{domain}/info`.
     * @param {String} domain Полное имя домена
     * @param {module:api/MailApi~getDomainMailInfoCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetDomainMailInfo200Response}
     */
    getDomainMailInfo(domain, callback) {
      let postBody = null;
      // verify the required parameter 'domain' is set
      if (domain === undefined || domain === null) {
        throw new Error("Missing the required parameter 'domain' when calling getDomainMailInfo");
      }

      let pathParams = {
        'domain': domain
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
      let returnType = GetDomainMailInfo200Response;
      return this.apiClient.callApi(
        '/api/v1/mail/domains/{domain}/info', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getDomainMailboxes operation.
     * @callback module:api/MailApi~getDomainMailboxesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetMailboxes200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка почтовых ящиков домена
     * Чтобы получить список почтовых ящиков домена, отправьте GET-запрос на `/api/v1/mail/domains/{domain}`.
     * @param {String} domain Полное имя домена
     * @param {Object} opts Optional parameters
     * @param {Number} [limit = 100)] Обозначает количество записей, которое необходимо вернуть.
     * @param {Number} [offset = 0)] Указывает на смещение относительно начала списка.
     * @param {String} [search] Поиск почтового ящика по названию
     * @param {module:api/MailApi~getDomainMailboxesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetMailboxes200Response}
     */
    getDomainMailboxes(domain, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'domain' is set
      if (domain === undefined || domain === null) {
        throw new Error("Missing the required parameter 'domain' when calling getDomainMailboxes");
      }

      let pathParams = {
        'domain': domain
      };
      let queryParams = {
        'limit': opts['limit'],
        'offset': opts['offset'],
        'search': opts['search']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = GetMailboxes200Response;
      return this.apiClient.callApi(
        '/api/v1/mail/domains/{domain}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getMailQuota operation.
     * @callback module:api/MailApi~getMailQuotaCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetMailQuota200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение квоты почты аккаунта
     * Чтобы получить квоту почты аккаунта, отправьте GET-запрос на `/api/v1/mail/quota`.
     * @param {module:api/MailApi~getMailQuotaCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetMailQuota200Response}
     */
    getMailQuota(callback) {
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
      let returnType = GetMailQuota200Response;
      return this.apiClient.callApi(
        '/api/v1/mail/quota', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getMailbox operation.
     * @callback module:api/MailApi~getMailboxCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateDomainMailbox201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение почтового ящика
     * Чтобы получить почтовый ящик, отправьте GET-запрос на `/api/v1/mail/domains/{domain}/mailboxes/{mailbox}`.
     * @param {String} domain Полное имя домена
     * @param {String} mailbox Название почтового ящика
     * @param {module:api/MailApi~getMailboxCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateDomainMailbox201Response}
     */
    getMailbox(domain, mailbox, callback) {
      let postBody = null;
      // verify the required parameter 'domain' is set
      if (domain === undefined || domain === null) {
        throw new Error("Missing the required parameter 'domain' when calling getMailbox");
      }
      // verify the required parameter 'mailbox' is set
      if (mailbox === undefined || mailbox === null) {
        throw new Error("Missing the required parameter 'mailbox' when calling getMailbox");
      }

      let pathParams = {
        'domain': domain,
        'mailbox': mailbox
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
      let returnType = CreateDomainMailbox201Response;
      return this.apiClient.callApi(
        '/api/v1/mail/domains/{domain}/mailboxes/{mailbox}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getMailboxes operation.
     * @callback module:api/MailApi~getMailboxesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetMailboxes200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка почтовых ящиков аккаунта
     * Чтобы получить список почтовых ящиков аккаунта, отправьте GET-запрос на `/api/v1/mail`.
     * @param {Object} opts Optional parameters
     * @param {Number} [limit = 100)] Обозначает количество записей, которое необходимо вернуть.
     * @param {Number} [offset = 0)] Указывает на смещение относительно начала списка.
     * @param {String} [search] Поиск почтового ящика по названию
     * @param {module:api/MailApi~getMailboxesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetMailboxes200Response}
     */
    getMailboxes(opts, callback) {
      opts = opts || {};
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
        'limit': opts['limit'],
        'offset': opts['offset'],
        'search': opts['search']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = GetMailboxes200Response;
      return this.apiClient.callApi(
        '/api/v1/mail', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the updateDomainMailInfo operation.
     * @callback module:api/MailApi~updateDomainMailInfoCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetDomainMailInfo200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Изменение почтовой информации о домене
     * Чтобы изменить почтовую информацию о домене, отправьте PATCH-запрос на `/api/v1/mail/domains/{domain}/info`.
     * @param {String} domain Полное имя домена
     * @param {module:model/UpdateDomainMailInfoRequest} updateDomainMailInfoRequest 
     * @param {module:api/MailApi~updateDomainMailInfoCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetDomainMailInfo200Response}
     */
    updateDomainMailInfo(domain, updateDomainMailInfoRequest, callback) {
      let postBody = updateDomainMailInfoRequest;
      // verify the required parameter 'domain' is set
      if (domain === undefined || domain === null) {
        throw new Error("Missing the required parameter 'domain' when calling updateDomainMailInfo");
      }
      // verify the required parameter 'updateDomainMailInfoRequest' is set
      if (updateDomainMailInfoRequest === undefined || updateDomainMailInfoRequest === null) {
        throw new Error("Missing the required parameter 'updateDomainMailInfoRequest' when calling updateDomainMailInfo");
      }

      let pathParams = {
        'domain': domain
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
      let returnType = GetDomainMailInfo200Response;
      return this.apiClient.callApi(
        '/api/v1/mail/domains/{domain}/info', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the updateMailQuota operation.
     * @callback module:api/MailApi~updateMailQuotaCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetMailQuota200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Изменение квоты почты аккаунта
     * Чтобы получить инфомацию по квоте почты аккаунта, отправьте GET-запрос на `/api/v1/mail/quota`.
     * @param {module:model/UpdateMailQuotaRequest} updateMailQuotaRequest 
     * @param {module:api/MailApi~updateMailQuotaCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetMailQuota200Response}
     */
    updateMailQuota(updateMailQuotaRequest, callback) {
      let postBody = updateMailQuotaRequest;
      // verify the required parameter 'updateMailQuotaRequest' is set
      if (updateMailQuotaRequest === undefined || updateMailQuotaRequest === null) {
        throw new Error("Missing the required parameter 'updateMailQuotaRequest' when calling updateMailQuota");
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
      let returnType = GetMailQuota200Response;
      return this.apiClient.callApi(
        '/api/v1/mail/quota', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the updateMailbox operation.
     * @callback module:api/MailApi~updateMailboxCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateDomainMailbox201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Изменение почтового ящика
     * Чтобы изменить почтовый ящик, отправьте PATCH-запрос на `/api/v1/mail/domains/{domain}/mailboxes/{mailbox}`.
     * @param {String} domain Полное имя домена
     * @param {String} mailbox Название почтового ящика
     * @param {module:model/UpdateMailbox} updateMailbox 
     * @param {module:api/MailApi~updateMailboxCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateDomainMailbox201Response}
     */
    updateMailbox(domain, mailbox, updateMailbox, callback) {
      let postBody = updateMailbox;
      // verify the required parameter 'domain' is set
      if (domain === undefined || domain === null) {
        throw new Error("Missing the required parameter 'domain' when calling updateMailbox");
      }
      // verify the required parameter 'mailbox' is set
      if (mailbox === undefined || mailbox === null) {
        throw new Error("Missing the required parameter 'mailbox' when calling updateMailbox");
      }
      // verify the required parameter 'updateMailbox' is set
      if (updateMailbox === undefined || updateMailbox === null) {
        throw new Error("Missing the required parameter 'updateMailbox' when calling updateMailbox");
      }

      let pathParams = {
        'domain': domain,
        'mailbox': mailbox
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
      let returnType = CreateDomainMailbox201Response;
      return this.apiClient.callApi(
        '/api/v1/mail/domains/{domain}/mailboxes/{mailbox}', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}
