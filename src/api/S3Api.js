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
import AddStorageSubdomainCertificateRequest from '../model/AddStorageSubdomainCertificateRequest';
import AddStorageSubdomains200Response from '../model/AddStorageSubdomains200Response';
import AddStorageSubdomainsRequest from '../model/AddStorageSubdomainsRequest';
import CreateStorage201Response from '../model/CreateStorage201Response';
import CreateStorageRequest from '../model/CreateStorageRequest';
import DeleteStorage200Response from '../model/DeleteStorage200Response';
import GetFinances400Response from '../model/GetFinances400Response';
import GetFinances401Response from '../model/GetFinances401Response';
import GetFinances403Response from '../model/GetFinances403Response';
import GetFinances429Response from '../model/GetFinances429Response';
import GetFinances500Response from '../model/GetFinances500Response';
import GetImage404Response from '../model/GetImage404Response';
import GetProjectStorages200Response from '../model/GetProjectStorages200Response';
import GetStorageSubdomains200Response from '../model/GetStorageSubdomains200Response';
import GetStorageTransferStatus200Response from '../model/GetStorageTransferStatus200Response';
import GetStorageUsers200Response from '../model/GetStorageUsers200Response';
import GetStoragesPresets200Response from '../model/GetStoragesPresets200Response';
import TransferStorageRequest from '../model/TransferStorageRequest';
import UpdateStorageRequest from '../model/UpdateStorageRequest';
import UpdateStorageUser200Response from '../model/UpdateStorageUser200Response';
import UpdateStorageUserRequest from '../model/UpdateStorageUserRequest';

/**
* S3 service.
* @module api/S3Api
* @version 1.0.0
*/
export default class S3Api {

    /**
    * Constructs a new S3Api. 
    * @alias module:api/S3Api
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }


    /**
     * Callback function to receive the result of the addStorageSubdomainCertificate operation.
     * @callback module:api/S3Api~addStorageSubdomainCertificateCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Добавление сертификата для поддомена хранилища
     * Чтобы добавить сертификат для поддомена хранилища, отправьте POST-запрос на `/api/v1/storages/certificates/generate`.
     * @param {module:model/AddStorageSubdomainCertificateRequest} addStorageSubdomainCertificateRequest 
     * @param {module:api/S3Api~addStorageSubdomainCertificateCallback} callback The callback function, accepting three arguments: error, data, response
     */
    addStorageSubdomainCertificate(addStorageSubdomainCertificateRequest, callback) {
      let postBody = addStorageSubdomainCertificateRequest;
      // verify the required parameter 'addStorageSubdomainCertificateRequest' is set
      if (addStorageSubdomainCertificateRequest === undefined || addStorageSubdomainCertificateRequest === null) {
        throw new Error("Missing the required parameter 'addStorageSubdomainCertificateRequest' when calling addStorageSubdomainCertificate");
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
        '/api/v1/storages/certificates/generate', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the addStorageSubdomains operation.
     * @callback module:api/S3Api~addStorageSubdomainsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AddStorageSubdomains200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Добавление поддоменов для хранилища
     * Чтобы добавить поддомены для хранилища, отправьте POST-запрос на `/api/v1/storages/buckets/{bucket_id}/subdomains`.
     * @param {Number} bucketId ID хранилища.
     * @param {module:model/AddStorageSubdomainsRequest} addStorageSubdomainsRequest 
     * @param {module:api/S3Api~addStorageSubdomainsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/AddStorageSubdomains200Response}
     */
    addStorageSubdomains(bucketId, addStorageSubdomainsRequest, callback) {
      let postBody = addStorageSubdomainsRequest;
      // verify the required parameter 'bucketId' is set
      if (bucketId === undefined || bucketId === null) {
        throw new Error("Missing the required parameter 'bucketId' when calling addStorageSubdomains");
      }
      // verify the required parameter 'addStorageSubdomainsRequest' is set
      if (addStorageSubdomainsRequest === undefined || addStorageSubdomainsRequest === null) {
        throw new Error("Missing the required parameter 'addStorageSubdomainsRequest' when calling addStorageSubdomains");
      }

      let pathParams = {
        'bucket_id': bucketId
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
      let returnType = AddStorageSubdomains200Response;
      return this.apiClient.callApi(
        '/api/v1/storages/buckets/{bucket_id}/subdomains', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the createStorage operation.
     * @callback module:api/S3Api~createStorageCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateStorage201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Создание хранилища
     * Чтобы создать хранилище, отправьте POST-запрос на `/api/v1/storages/buckets`.
     * @param {module:model/CreateStorageRequest} createStorageRequest 
     * @param {module:api/S3Api~createStorageCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateStorage201Response}
     */
    createStorage(createStorageRequest, callback) {
      let postBody = createStorageRequest;
      // verify the required parameter 'createStorageRequest' is set
      if (createStorageRequest === undefined || createStorageRequest === null) {
        throw new Error("Missing the required parameter 'createStorageRequest' when calling createStorage");
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
      let returnType = CreateStorage201Response;
      return this.apiClient.callApi(
        '/api/v1/storages/buckets', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteStorage operation.
     * @callback module:api/S3Api~deleteStorageCallback
     * @param {String} error Error message, if any.
     * @param {module:model/DeleteStorage200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Удаление хранилища на аккаунте
     * Чтобы удалить хранилище, отправьте DELETE-запрос на `/api/v1/storages/buckets/{bucket_id}`.
     * @param {Number} bucketId ID хранилища.
     * @param {Object} opts Optional parameters
     * @param {String} [hash] Хеш, который совместно с кодом авторизации надо отправить для удаления, если включено подтверждение удаления сервисов через Телеграм.
     * @param {String} [code] Код подтверждения, который придет к вам в Телеграм, после запроса удаления, если включено подтверждение удаления сервисов.  При помощи API токена сервисы можно удалять без подтверждения, если параметр токена `is_able_to_delete` установлен в значение `true`
     * @param {module:api/S3Api~deleteStorageCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/DeleteStorage200Response}
     */
    deleteStorage(bucketId, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'bucketId' is set
      if (bucketId === undefined || bucketId === null) {
        throw new Error("Missing the required parameter 'bucketId' when calling deleteStorage");
      }

      let pathParams = {
        'bucket_id': bucketId
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
      let returnType = DeleteStorage200Response;
      return this.apiClient.callApi(
        '/api/v1/storages/buckets/{bucket_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteStorageSubdomains operation.
     * @callback module:api/S3Api~deleteStorageSubdomainsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AddStorageSubdomains200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Удаление поддоменов хранилища
     * Чтобы удалить поддомены хранилища, отправьте DELETE-запрос на `/api/v1/storages/buckets/{bucket_id}/subdomains`.
     * @param {Number} bucketId ID хранилища.
     * @param {module:model/AddStorageSubdomainsRequest} addStorageSubdomainsRequest 
     * @param {module:api/S3Api~deleteStorageSubdomainsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/AddStorageSubdomains200Response}
     */
    deleteStorageSubdomains(bucketId, addStorageSubdomainsRequest, callback) {
      let postBody = addStorageSubdomainsRequest;
      // verify the required parameter 'bucketId' is set
      if (bucketId === undefined || bucketId === null) {
        throw new Error("Missing the required parameter 'bucketId' when calling deleteStorageSubdomains");
      }
      // verify the required parameter 'addStorageSubdomainsRequest' is set
      if (addStorageSubdomainsRequest === undefined || addStorageSubdomainsRequest === null) {
        throw new Error("Missing the required parameter 'addStorageSubdomainsRequest' when calling deleteStorageSubdomains");
      }

      let pathParams = {
        'bucket_id': bucketId
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
      let returnType = AddStorageSubdomains200Response;
      return this.apiClient.callApi(
        '/api/v1/storages/buckets/{bucket_id}/subdomains', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getStorageSubdomains operation.
     * @callback module:api/S3Api~getStorageSubdomainsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetStorageSubdomains200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка поддоменов хранилища
     * Чтобы получить список поддоменов хранилища, отправьте GET-запрос на `/api/v1/storages/buckets/{bucket_id}/subdomains`.
     * @param {Number} bucketId ID хранилища.
     * @param {module:api/S3Api~getStorageSubdomainsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetStorageSubdomains200Response}
     */
    getStorageSubdomains(bucketId, callback) {
      let postBody = null;
      // verify the required parameter 'bucketId' is set
      if (bucketId === undefined || bucketId === null) {
        throw new Error("Missing the required parameter 'bucketId' when calling getStorageSubdomains");
      }

      let pathParams = {
        'bucket_id': bucketId
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
      let returnType = GetStorageSubdomains200Response;
      return this.apiClient.callApi(
        '/api/v1/storages/buckets/{bucket_id}/subdomains', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getStorageTransferStatus operation.
     * @callback module:api/S3Api~getStorageTransferStatusCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetStorageTransferStatus200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение статуса переноса хранилища от стороннего S3 в Timeweb Cloud
     * Чтобы получить статус переноса хранилища от стороннего S3 в Timeweb Cloud, отправьте GET-запрос на `/api/v1/storages/buckets/{bucket_id}/transfer-status`.
     * @param {Number} bucketId ID хранилища.
     * @param {module:api/S3Api~getStorageTransferStatusCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetStorageTransferStatus200Response}
     */
    getStorageTransferStatus(bucketId, callback) {
      let postBody = null;
      // verify the required parameter 'bucketId' is set
      if (bucketId === undefined || bucketId === null) {
        throw new Error("Missing the required parameter 'bucketId' when calling getStorageTransferStatus");
      }

      let pathParams = {
        'bucket_id': bucketId
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
      let returnType = GetStorageTransferStatus200Response;
      return this.apiClient.callApi(
        '/api/v1/storages/buckets/{bucket_id}/transfer-status', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getStorageUsers operation.
     * @callback module:api/S3Api~getStorageUsersCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetStorageUsers200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка пользователей хранилищ аккаунта
     * Чтобы получить список пользователей хранилищ аккаунта, отправьте GET-запрос на `/api/v1/storages/users`.
     * @param {module:api/S3Api~getStorageUsersCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetStorageUsers200Response}
     */
    getStorageUsers(callback) {
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
      let returnType = GetStorageUsers200Response;
      return this.apiClient.callApi(
        '/api/v1/storages/users', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getStorages operation.
     * @callback module:api/S3Api~getStoragesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetProjectStorages200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка хранилищ аккаунта
     * Чтобы получить список хранилищ аккаунта, отправьте GET-запрос на `/api/v1/storages/buckets`.
     * @param {module:api/S3Api~getStoragesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetProjectStorages200Response}
     */
    getStorages(callback) {
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
      let returnType = GetProjectStorages200Response;
      return this.apiClient.callApi(
        '/api/v1/storages/buckets', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getStoragesPresets operation.
     * @callback module:api/S3Api~getStoragesPresetsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetStoragesPresets200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка тарифов для хранилищ
     * Чтобы получить список тарифов для хранилищ, отправьте GET-запрос на `/api/v1/presets/storages`.   Тело ответа будет представлять собой объект JSON с ключом `storages_presets`.
     * @param {module:api/S3Api~getStoragesPresetsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetStoragesPresets200Response}
     */
    getStoragesPresets(callback) {
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
      let returnType = GetStoragesPresets200Response;
      return this.apiClient.callApi(
        '/api/v1/presets/storages', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the transferStorage operation.
     * @callback module:api/S3Api~transferStorageCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Перенос хранилища от стороннего провайдера S3 в Timeweb Cloud
     * Чтобы перенести хранилище от стороннего провайдера S3 в Timeweb Cloud, отправьте POST-запрос на `/api/v1/storages/transfer`.
     * @param {module:model/TransferStorageRequest} transferStorageRequest 
     * @param {module:api/S3Api~transferStorageCallback} callback The callback function, accepting three arguments: error, data, response
     */
    transferStorage(transferStorageRequest, callback) {
      let postBody = transferStorageRequest;
      // verify the required parameter 'transferStorageRequest' is set
      if (transferStorageRequest === undefined || transferStorageRequest === null) {
        throw new Error("Missing the required parameter 'transferStorageRequest' when calling transferStorage");
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
        '/api/v1/storages/transfer', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the updateStorage operation.
     * @callback module:api/S3Api~updateStorageCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateStorage201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Изменение хранилища на аккаунте
     * Чтобы изменить хранилище, отправьте PATCH-запрос на `/api/v1/storages/buckets/{bucket_id}`.
     * @param {Number} bucketId ID хранилища.
     * @param {module:model/UpdateStorageRequest} updateStorageRequest 
     * @param {module:api/S3Api~updateStorageCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateStorage201Response}
     */
    updateStorage(bucketId, updateStorageRequest, callback) {
      let postBody = updateStorageRequest;
      // verify the required parameter 'bucketId' is set
      if (bucketId === undefined || bucketId === null) {
        throw new Error("Missing the required parameter 'bucketId' when calling updateStorage");
      }
      // verify the required parameter 'updateStorageRequest' is set
      if (updateStorageRequest === undefined || updateStorageRequest === null) {
        throw new Error("Missing the required parameter 'updateStorageRequest' when calling updateStorage");
      }

      let pathParams = {
        'bucket_id': bucketId
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
      let returnType = CreateStorage201Response;
      return this.apiClient.callApi(
        '/api/v1/storages/buckets/{bucket_id}', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the updateStorageUser operation.
     * @callback module:api/S3Api~updateStorageUserCallback
     * @param {String} error Error message, if any.
     * @param {module:model/UpdateStorageUser200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Изменение пароля пользователя-администратора хранилища
     * Чтобы изменить пароль пользователя-администратора хранилища, отправьте POST-запрос на `/api/v1/storages/users/{user_id}`.
     * @param {Number} userId ID пользователя хранилища.
     * @param {module:model/UpdateStorageUserRequest} updateStorageUserRequest 
     * @param {module:api/S3Api~updateStorageUserCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/UpdateStorageUser200Response}
     */
    updateStorageUser(userId, updateStorageUserRequest, callback) {
      let postBody = updateStorageUserRequest;
      // verify the required parameter 'userId' is set
      if (userId === undefined || userId === null) {
        throw new Error("Missing the required parameter 'userId' when calling updateStorageUser");
      }
      // verify the required parameter 'updateStorageUserRequest' is set
      if (updateStorageUserRequest === undefined || updateStorageUserRequest === null) {
        throw new Error("Missing the required parameter 'updateStorageUserRequest' when calling updateStorageUser");
      }

      let pathParams = {
        'user_id': userId
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
      let returnType = UpdateStorageUser200Response;
      return this.apiClient.callApi(
        '/api/v1/storages/users/{user_id}', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}
