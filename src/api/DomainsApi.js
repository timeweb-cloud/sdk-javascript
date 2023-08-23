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
import AddSubdomain201Response from '../model/AddSubdomain201Response';
import CheckDomain200Response from '../model/CheckDomain200Response';
import CreateDatabaseBackup409Response from '../model/CreateDatabaseBackup409Response';
import CreateDns from '../model/CreateDns';
import CreateDomainDNSRecord201Response from '../model/CreateDomainDNSRecord201Response';
import CreateDomainRequest201Response from '../model/CreateDomainRequest201Response';
import DomainRegister from '../model/DomainRegister';
import GetDomain200Response from '../model/GetDomain200Response';
import GetDomainDNSRecords200Response from '../model/GetDomainDNSRecords200Response';
import GetDomainNameServers200Response from '../model/GetDomainNameServers200Response';
import GetDomainRequests200Response from '../model/GetDomainRequests200Response';
import GetDomains200Response from '../model/GetDomains200Response';
import GetFinances400Response from '../model/GetFinances400Response';
import GetFinances401Response from '../model/GetFinances401Response';
import GetFinances404Response from '../model/GetFinances404Response';
import GetFinances429Response from '../model/GetFinances429Response';
import GetFinances500Response from '../model/GetFinances500Response';
import GetTLD200Response from '../model/GetTLD200Response';
import GetTLDs200Response from '../model/GetTLDs200Response';
import UpdateDomain from '../model/UpdateDomain';
import UpdateDomainAutoProlongation200Response from '../model/UpdateDomainAutoProlongation200Response';
import UpdateDomainNameServers from '../model/UpdateDomainNameServers';
import Use from '../model/Use';

/**
* Domains service.
* @module api/DomainsApi
* @version 1.0.0
*/
export default class DomainsApi {

    /**
    * Constructs a new DomainsApi. 
    * @alias module:api/DomainsApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }


    /**
     * Callback function to receive the result of the addDomain operation.
     * @callback module:api/DomainsApi~addDomainCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Добавление домена на аккаунт
     * Чтобы добавить домен на свой аккаунт, отправьте запрос POST на `/api/v1/add-domain/{fqdn}`.
     * @param {String} fqdn Полное имя домена.
     * @param {module:api/DomainsApi~addDomainCallback} callback The callback function, accepting three arguments: error, data, response
     */
    addDomain(fqdn, callback) {
      let postBody = null;
      // verify the required parameter 'fqdn' is set
      if (fqdn === undefined || fqdn === null) {
        throw new Error("Missing the required parameter 'fqdn' when calling addDomain");
      }

      let pathParams = {
        'fqdn': fqdn
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
        '/api/v1/add-domain/{fqdn}', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the addSubdomain operation.
     * @callback module:api/DomainsApi~addSubdomainCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AddSubdomain201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Добавление поддомена
     * Чтобы добавить поддомен, отправьте запрос POST на `/api/v1/domains/{fqdn}/subdomains/{subdomain_fqdn}`, задав необходимые атрибуты.  Поддомен будет добавлен с использованием предоставленной информации. Тело ответа будет содержать объект JSON с информацией о добавленном поддомене.
     * @param {String} fqdn Полное имя домена.
     * @param {String} subdomainFqdn Полное имя поддомена.
     * @param {module:api/DomainsApi~addSubdomainCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/AddSubdomain201Response}
     */
    addSubdomain(fqdn, subdomainFqdn, callback) {
      let postBody = null;
      // verify the required parameter 'fqdn' is set
      if (fqdn === undefined || fqdn === null) {
        throw new Error("Missing the required parameter 'fqdn' when calling addSubdomain");
      }
      // verify the required parameter 'subdomainFqdn' is set
      if (subdomainFqdn === undefined || subdomainFqdn === null) {
        throw new Error("Missing the required parameter 'subdomainFqdn' when calling addSubdomain");
      }

      let pathParams = {
        'fqdn': fqdn,
        'subdomain_fqdn': subdomainFqdn
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
      let returnType = AddSubdomain201Response;
      return this.apiClient.callApi(
        '/api/v1/domains/{fqdn}/subdomains/{subdomain_fqdn}', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the checkDomain operation.
     * @callback module:api/DomainsApi~checkDomainCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CheckDomain200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Проверить, доступен ли домен для регистрации
     * Чтобы проверить, доступен ли домен для регистрации, отправьте запрос GET на `/api/v1/check-domain/{fqdn}`.
     * @param {String} fqdn Полное имя домена.
     * @param {module:api/DomainsApi~checkDomainCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CheckDomain200Response}
     */
    checkDomain(fqdn, callback) {
      let postBody = null;
      // verify the required parameter 'fqdn' is set
      if (fqdn === undefined || fqdn === null) {
        throw new Error("Missing the required parameter 'fqdn' when calling checkDomain");
      }

      let pathParams = {
        'fqdn': fqdn
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
      let returnType = CheckDomain200Response;
      return this.apiClient.callApi(
        '/api/v1/check-domain/{fqdn}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the createDomainDNSRecord operation.
     * @callback module:api/DomainsApi~createDomainDNSRecordCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateDomainDNSRecord201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Добавить информацию о DNS-записи для домена или поддомена
     * Чтобы добавить информацию о DNS-записи для домена или поддомена, отправьте запрос POST на `/api/v1/domains/{fqdn}/dns-records`, задав необходимые атрибуты.  DNS-запись будет добавлена с использованием предоставленной информации. Тело ответа будет содержать объект JSON с информацией о добавленной DNS-записи.
     * @param {String} fqdn Полное имя домена или поддомена.
     * @param {module:model/CreateDns} createDns 
     * @param {module:api/DomainsApi~createDomainDNSRecordCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateDomainDNSRecord201Response}
     */
    createDomainDNSRecord(fqdn, createDns, callback) {
      let postBody = createDns;
      // verify the required parameter 'fqdn' is set
      if (fqdn === undefined || fqdn === null) {
        throw new Error("Missing the required parameter 'fqdn' when calling createDomainDNSRecord");
      }
      // verify the required parameter 'createDns' is set
      if (createDns === undefined || createDns === null) {
        throw new Error("Missing the required parameter 'createDns' when calling createDomainDNSRecord");
      }

      let pathParams = {
        'fqdn': fqdn
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
      let returnType = CreateDomainDNSRecord201Response;
      return this.apiClient.callApi(
        '/api/v1/domains/{fqdn}/dns-records', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the createDomainRequest operation.
     * @callback module:api/DomainsApi~createDomainRequestCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateDomainRequest201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Создание заявки на регистрацию/продление/трансфер домена
     * Чтобы создать заявку на регистрацию/продление/трансфер домена, отправьте POST-запрос в `api/v1/domains-requests`, задав необходимые атрибуты.  Заявка будет создана с использованием предоставленной информации. Тело ответа будет содержать объект JSON с информацией о созданной заявке.
     * @param {module:model/DomainRegister} domainRegister 
     * @param {module:api/DomainsApi~createDomainRequestCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateDomainRequest201Response}
     */
    createDomainRequest(domainRegister, callback) {
      let postBody = domainRegister;
      // verify the required parameter 'domainRegister' is set
      if (domainRegister === undefined || domainRegister === null) {
        throw new Error("Missing the required parameter 'domainRegister' when calling createDomainRequest");
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
      let returnType = CreateDomainRequest201Response;
      return this.apiClient.callApi(
        '/api/v1/domains-requests', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteDomain operation.
     * @callback module:api/DomainsApi~deleteDomainCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Удаление домена
     * Чтобы удалить домен, отправьте запрос DELETE на `/api/v1/domains/{fqdn}`.
     * @param {String} fqdn Полное имя домена.
     * @param {module:api/DomainsApi~deleteDomainCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteDomain(fqdn, callback) {
      let postBody = null;
      // verify the required parameter 'fqdn' is set
      if (fqdn === undefined || fqdn === null) {
        throw new Error("Missing the required parameter 'fqdn' when calling deleteDomain");
      }

      let pathParams = {
        'fqdn': fqdn
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
        '/api/v1/domains/{fqdn}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteDomainDNSRecord operation.
     * @callback module:api/DomainsApi~deleteDomainDNSRecordCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Удалить информацию о DNS-записи для домена или поддомена
     * Чтобы удалить информацию о DNS-записи для домена или поддомена, отправьте запрос DELETE на `/api/v1/domains/{fqdn}/dns-records/{record_id}`.
     * @param {String} fqdn Полное имя домена или поддомена.
     * @param {Number} recordId Идентификатор DNS-записи домена или поддомена.
     * @param {module:api/DomainsApi~deleteDomainDNSRecordCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteDomainDNSRecord(fqdn, recordId, callback) {
      let postBody = null;
      // verify the required parameter 'fqdn' is set
      if (fqdn === undefined || fqdn === null) {
        throw new Error("Missing the required parameter 'fqdn' when calling deleteDomainDNSRecord");
      }
      // verify the required parameter 'recordId' is set
      if (recordId === undefined || recordId === null) {
        throw new Error("Missing the required parameter 'recordId' when calling deleteDomainDNSRecord");
      }

      let pathParams = {
        'fqdn': fqdn,
        'record_id': recordId
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
        '/api/v1/domains/{fqdn}/dns-records/{record_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteSubdomain operation.
     * @callback module:api/DomainsApi~deleteSubdomainCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Удаление поддомена
     * Чтобы удалить поддомен, отправьте запрос DELETE на `/api/v1/domains/{fqdn}/subdomains/{subdomain_fqdn}`.
     * @param {String} fqdn Полное имя домена.
     * @param {String} subdomainFqdn Полное имя поддомена.
     * @param {module:api/DomainsApi~deleteSubdomainCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteSubdomain(fqdn, subdomainFqdn, callback) {
      let postBody = null;
      // verify the required parameter 'fqdn' is set
      if (fqdn === undefined || fqdn === null) {
        throw new Error("Missing the required parameter 'fqdn' when calling deleteSubdomain");
      }
      // verify the required parameter 'subdomainFqdn' is set
      if (subdomainFqdn === undefined || subdomainFqdn === null) {
        throw new Error("Missing the required parameter 'subdomainFqdn' when calling deleteSubdomain");
      }

      let pathParams = {
        'fqdn': fqdn,
        'subdomain_fqdn': subdomainFqdn
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
        '/api/v1/domains/{fqdn}/subdomains/{subdomain_fqdn}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getDomain operation.
     * @callback module:api/DomainsApi~getDomainCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetDomain200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение информации о домене
     * Чтобы отобразить информацию об отдельном домене, отправьте запрос GET на `/api/v1/domains/{fqdn}`.
     * @param {String} fqdn Полное имя домена.
     * @param {module:api/DomainsApi~getDomainCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetDomain200Response}
     */
    getDomain(fqdn, callback) {
      let postBody = null;
      // verify the required parameter 'fqdn' is set
      if (fqdn === undefined || fqdn === null) {
        throw new Error("Missing the required parameter 'fqdn' when calling getDomain");
      }

      let pathParams = {
        'fqdn': fqdn
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
      let returnType = GetDomain200Response;
      return this.apiClient.callApi(
        '/api/v1/domains/{fqdn}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getDomainDNSRecords operation.
     * @callback module:api/DomainsApi~getDomainDNSRecordsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetDomainDNSRecords200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получить информацию обо всех пользовательских DNS-записях домена или поддомена
     * Чтобы получить информацию обо всех пользовательских DNS-записях домена или поддомена, отправьте запрос GET на `/api/v1/domains/{fqdn}/dns-records`.
     * @param {String} fqdn Полное имя домена или поддомена.
     * @param {Object} opts Optional parameters
     * @param {Number} [limit = 100)] Обозначает количество записей, которое необходимо вернуть.
     * @param {Number} [offset = 0)] Указывает на смещение относительно начала списка.
     * @param {module:api/DomainsApi~getDomainDNSRecordsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetDomainDNSRecords200Response}
     */
    getDomainDNSRecords(fqdn, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'fqdn' is set
      if (fqdn === undefined || fqdn === null) {
        throw new Error("Missing the required parameter 'fqdn' when calling getDomainDNSRecords");
      }

      let pathParams = {
        'fqdn': fqdn
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
      let returnType = GetDomainDNSRecords200Response;
      return this.apiClient.callApi(
        '/api/v1/domains/{fqdn}/dns-records', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getDomainDefaultDNSRecords operation.
     * @callback module:api/DomainsApi~getDomainDefaultDNSRecordsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetDomainDNSRecords200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получить информацию обо всех DNS-записях по умолчанию домена или поддомена
     * Чтобы получить информацию обо всех DNS-записях по умолчанию домена или поддомена, отправьте запрос GET на `/api/v1/domains/{fqdn}/default-dns-records`.
     * @param {String} fqdn Полное имя домена или поддомена.
     * @param {Object} opts Optional parameters
     * @param {Number} [limit = 100)] Обозначает количество записей, которое необходимо вернуть.
     * @param {Number} [offset = 0)] Указывает на смещение относительно начала списка.
     * @param {module:api/DomainsApi~getDomainDefaultDNSRecordsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetDomainDNSRecords200Response}
     */
    getDomainDefaultDNSRecords(fqdn, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'fqdn' is set
      if (fqdn === undefined || fqdn === null) {
        throw new Error("Missing the required parameter 'fqdn' when calling getDomainDefaultDNSRecords");
      }

      let pathParams = {
        'fqdn': fqdn
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
      let returnType = GetDomainDNSRecords200Response;
      return this.apiClient.callApi(
        '/api/v1/domains/{fqdn}/default-dns-records', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getDomainNameServers operation.
     * @callback module:api/DomainsApi~getDomainNameServersCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetDomainNameServers200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка name-серверов домена
     * Чтобы получить список name-серверов домена, отправьте запрос GET на `/api/v1/domains/{fqdn}/name-servers`.
     * @param {String} fqdn Полное имя домена.
     * @param {module:api/DomainsApi~getDomainNameServersCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetDomainNameServers200Response}
     */
    getDomainNameServers(fqdn, callback) {
      let postBody = null;
      // verify the required parameter 'fqdn' is set
      if (fqdn === undefined || fqdn === null) {
        throw new Error("Missing the required parameter 'fqdn' when calling getDomainNameServers");
      }

      let pathParams = {
        'fqdn': fqdn
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
      let returnType = GetDomainNameServers200Response;
      return this.apiClient.callApi(
        '/api/v1/domains/{fqdn}/name-servers', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getDomainRequest operation.
     * @callback module:api/DomainsApi~getDomainRequestCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateDomainRequest201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение заявки на регистрацию/продление/трансфер домена
     * Чтобы получить заявку на регистрацию/продление/трансфер домена, отправьте запрос GET на `/api/v1/domains-requests/{request_id}`.
     * @param {Number} requestId Идентификатор заявки на регистрацию/продление/трансфер домена.
     * @param {module:api/DomainsApi~getDomainRequestCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateDomainRequest201Response}
     */
    getDomainRequest(requestId, callback) {
      let postBody = null;
      // verify the required parameter 'requestId' is set
      if (requestId === undefined || requestId === null) {
        throw new Error("Missing the required parameter 'requestId' when calling getDomainRequest");
      }

      let pathParams = {
        'request_id': requestId
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
      let returnType = CreateDomainRequest201Response;
      return this.apiClient.callApi(
        '/api/v1/domains-requests/{request_id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getDomainRequests operation.
     * @callback module:api/DomainsApi~getDomainRequestsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetDomainRequests200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка заявок на регистрацию/продление/трансфер домена
     * Чтобы получить список заявок на регистрацию/продление/трансфер домена, отправьте запрос GET на `/api/v1/domains-requests`.
     * @param {Object} opts Optional parameters
     * @param {Number} [personId] Идентификатор администратора, на которого зарегистрирован домен.
     * @param {module:api/DomainsApi~getDomainRequestsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetDomainRequests200Response}
     */
    getDomainRequests(opts, callback) {
      opts = opts || {};
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
        'person_id': opts['personId']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = GetDomainRequests200Response;
      return this.apiClient.callApi(
        '/api/v1/domains-requests', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getDomains operation.
     * @callback module:api/DomainsApi~getDomainsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetDomains200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка всех доменов
     * Чтобы получить список всех доменов на вашем аккаунте, отправьте GET-запрос на `/api/v1/domains`.   Тело ответа будет представлять собой объект JSON с ключом `domains`.
     * @param {Object} opts Optional parameters
     * @param {Number} [limit = 100)] Обозначает количество записей, которое необходимо вернуть.
     * @param {Number} [offset = 0)] Указывает на смещение относительно начала списка.
     * @param {String} [idnName] Интернационализированное доменное имя.
     * @param {String} [linkedIp] Привязанный к домену IP-адрес.
     * @param {module:model/String} [order] Порядок доменов.
     * @param {module:model/String} [sort] Сортировка доменов.
     * @param {module:api/DomainsApi~getDomainsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetDomains200Response}
     */
    getDomains(opts, callback) {
      opts = opts || {};
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
        'limit': opts['limit'],
        'offset': opts['offset'],
        'idn_name': opts['idnName'],
        'linked_ip': opts['linkedIp'],
        'order': opts['order'],
        'sort': opts['sort']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = GetDomains200Response;
      return this.apiClient.callApi(
        '/api/v1/domains', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getTLD operation.
     * @callback module:api/DomainsApi~getTLDCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetTLD200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получить информацию о доменной зоне по идентификатору
     * Чтобы получить информацию о доменной зоне по идентификатору, отправьте запрос GET на `/api/v1/tlds/{tld_id}`.
     * @param {Number} tldId Идентификатор доменной зоны.
     * @param {module:api/DomainsApi~getTLDCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetTLD200Response}
     */
    getTLD(tldId, callback) {
      let postBody = null;
      // verify the required parameter 'tldId' is set
      if (tldId === undefined || tldId === null) {
        throw new Error("Missing the required parameter 'tldId' when calling getTLD");
      }

      let pathParams = {
        'tld_id': tldId
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
      let returnType = GetTLD200Response;
      return this.apiClient.callApi(
        '/api/v1/tlds/{tld_id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getTLDs operation.
     * @callback module:api/DomainsApi~getTLDsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetTLDs200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получить информацию о доменных зонах
     * Чтобы получить информацию о доменных зонах, отправьте запрос GET на `/api/v1/tlds`.
     * @param {Object} opts Optional parameters
     * @param {Boolean} [isPublished] Это логическое значение, которое показывает, опубликована ли доменная зона.
     * @param {Boolean} [isRegistered] Это логическое значение, которое показывает, зарегистрирована ли доменная зона.
     * @param {module:api/DomainsApi~getTLDsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetTLDs200Response}
     */
    getTLDs(opts, callback) {
      opts = opts || {};
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
        'is_published': opts['isPublished'],
        'is_registered': opts['isRegistered']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = GetTLDs200Response;
      return this.apiClient.callApi(
        '/api/v1/tlds', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the updateDomainAutoProlongation operation.
     * @callback module:api/DomainsApi~updateDomainAutoProlongationCallback
     * @param {String} error Error message, if any.
     * @param {module:model/UpdateDomainAutoProlongation200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Включение/выключение автопродления домена
     * Чтобы включить/выключить автопродление домена, отправьте запрос PATCH на `/api/v1/domains/{fqdn}`, передав в теле запроса параметр `is_autoprolong_enabled`
     * @param {String} fqdn Полное имя домена.
     * @param {module:model/UpdateDomain} updateDomain 
     * @param {module:api/DomainsApi~updateDomainAutoProlongationCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/UpdateDomainAutoProlongation200Response}
     */
    updateDomainAutoProlongation(fqdn, updateDomain, callback) {
      let postBody = updateDomain;
      // verify the required parameter 'fqdn' is set
      if (fqdn === undefined || fqdn === null) {
        throw new Error("Missing the required parameter 'fqdn' when calling updateDomainAutoProlongation");
      }
      // verify the required parameter 'updateDomain' is set
      if (updateDomain === undefined || updateDomain === null) {
        throw new Error("Missing the required parameter 'updateDomain' when calling updateDomainAutoProlongation");
      }

      let pathParams = {
        'fqdn': fqdn
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
      let returnType = UpdateDomainAutoProlongation200Response;
      return this.apiClient.callApi(
        '/api/v1/domains/{fqdn}', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the updateDomainDNSRecord operation.
     * @callback module:api/DomainsApi~updateDomainDNSRecordCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateDomainDNSRecord201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Обновить информацию о DNS-записи домена или поддомена
     * Чтобы обновить информацию о DNS-записи для домена или поддомена, отправьте запрос PATCH на `/api/v1/domains/{fqdn}/dns-records/{record_id}`, задав необходимые атрибуты.  DNS-запись будет обновлена с использованием предоставленной информации. Тело ответа будет содержать объект JSON с информацией об добавленной DNS-записи.
     * @param {String} fqdn Полное имя домена или поддомена.
     * @param {Number} recordId Идентификатор DNS-записи домена или поддомена.
     * @param {module:model/CreateDns} createDns 
     * @param {module:api/DomainsApi~updateDomainDNSRecordCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateDomainDNSRecord201Response}
     */
    updateDomainDNSRecord(fqdn, recordId, createDns, callback) {
      let postBody = createDns;
      // verify the required parameter 'fqdn' is set
      if (fqdn === undefined || fqdn === null) {
        throw new Error("Missing the required parameter 'fqdn' when calling updateDomainDNSRecord");
      }
      // verify the required parameter 'recordId' is set
      if (recordId === undefined || recordId === null) {
        throw new Error("Missing the required parameter 'recordId' when calling updateDomainDNSRecord");
      }
      // verify the required parameter 'createDns' is set
      if (createDns === undefined || createDns === null) {
        throw new Error("Missing the required parameter 'createDns' when calling updateDomainDNSRecord");
      }

      let pathParams = {
        'fqdn': fqdn,
        'record_id': recordId
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
      let returnType = CreateDomainDNSRecord201Response;
      return this.apiClient.callApi(
        '/api/v1/domains/{fqdn}/dns-records/{record_id}', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the updateDomainNameServers operation.
     * @callback module:api/DomainsApi~updateDomainNameServersCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetDomainNameServers200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Изменение name-серверов домена
     * Чтобы изменить name-серверы домена, отправьте запрос PUT на `/api/v1/domains/{fqdn}/name-servers`, задав необходимые атрибуты.  Name-серверы будут изменены с использованием предоставленной информации. Тело ответа будет содержать объект JSON с информацией о name-серверах домена.
     * @param {String} fqdn Полное имя домена.
     * @param {module:model/UpdateDomainNameServers} updateDomainNameServers 
     * @param {module:api/DomainsApi~updateDomainNameServersCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetDomainNameServers200Response}
     */
    updateDomainNameServers(fqdn, updateDomainNameServers, callback) {
      let postBody = updateDomainNameServers;
      // verify the required parameter 'fqdn' is set
      if (fqdn === undefined || fqdn === null) {
        throw new Error("Missing the required parameter 'fqdn' when calling updateDomainNameServers");
      }
      // verify the required parameter 'updateDomainNameServers' is set
      if (updateDomainNameServers === undefined || updateDomainNameServers === null) {
        throw new Error("Missing the required parameter 'updateDomainNameServers' when calling updateDomainNameServers");
      }

      let pathParams = {
        'fqdn': fqdn
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
      let returnType = GetDomainNameServers200Response;
      return this.apiClient.callApi(
        '/api/v1/domains/{fqdn}/name-servers', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the updateDomainRequest operation.
     * @callback module:api/DomainsApi~updateDomainRequestCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateDomainRequest201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Оплата/обновление заявки на регистрацию/продление/трансфер домена
     * Чтобы оплатить/обновить заявку на регистрацию/продление/трансфер домена, отправьте запрос PATCH на `/api/v1/domains-requests/{request_id}`, задав необходимые атрибуты.  Заявка будет обновлена с использованием предоставленной информации. Тело ответа будет содержать объект JSON с информацией о обновленной заявке.
     * @param {Number} requestId Идентификатор заявки на регистрацию/продление/трансфер домена.
     * @param {module:model/Use} use 
     * @param {module:api/DomainsApi~updateDomainRequestCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateDomainRequest201Response}
     */
    updateDomainRequest(requestId, use, callback) {
      let postBody = use;
      // verify the required parameter 'requestId' is set
      if (requestId === undefined || requestId === null) {
        throw new Error("Missing the required parameter 'requestId' when calling updateDomainRequest");
      }
      // verify the required parameter 'use' is set
      if (use === undefined || use === null) {
        throw new Error("Missing the required parameter 'use' when calling updateDomainRequest");
      }

      let pathParams = {
        'request_id': requestId
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
      let returnType = CreateDomainRequest201Response;
      return this.apiClient.callApi(
        '/api/v1/domains-requests/{request_id}', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}
