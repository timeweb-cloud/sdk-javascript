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
import AddCdnCertificate422Response from '../model/AddCdnCertificate422Response';
import AddCertificate from '../model/AddCertificate';
import ClearCache from '../model/ClearCache';
import CreateCdnResource201Response from '../model/CreateCdnResource201Response';
import CreateDatabaseBackup409Response from '../model/CreateDatabaseBackup409Response';
import CreateHttpResource from '../model/CreateHttpResource';
import GetAccountStatus403Response from '../model/GetAccountStatus403Response';
import GetCdnCertificateTasks200Response from '../model/GetCdnCertificateTasks200Response';
import GetCdnCertificates200Response from '../model/GetCdnCertificates200Response';
import GetCdnOriginNodes200Response from '../model/GetCdnOriginNodes200Response';
import GetCdnPresets200Response from '../model/GetCdnPresets200Response';
import GetCdnResourceConfiguration200Response from '../model/GetCdnResourceConfiguration200Response';
import GetCdnResourceNodes200Response from '../model/GetCdnResourceNodes200Response';
import GetCdnResourceStatistics200Response from '../model/GetCdnResourceStatistics200Response';
import GetCdnResources200Response from '../model/GetCdnResources200Response';
import GetFinances400Response from '../model/GetFinances400Response';
import GetFinances401Response from '../model/GetFinances401Response';
import GetFinances429Response from '../model/GetFinances429Response';
import GetFinances500Response from '../model/GetFinances500Response';
import GetImage404Response from '../model/GetImage404Response';
import IssueCertificate from '../model/IssueCertificate';
import PreloadCache from '../model/PreloadCache';
import UpdateHttpResource from '../model/UpdateHttpResource';

/**
* CDN service.
* @module api/CDNApi
* @version 1.0.0
*/
export default class CDNApi {

    /**
    * Constructs a new CDNApi. 
    * @alias module:api/CDNApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }


    /**
     * Callback function to receive the result of the addCdnCertificate operation.
     * @callback module:api/CDNApi~addCdnCertificateCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Загрузка собственного сертификата CDN
     * Чтобы загрузить собственный SSL-сертификат, отправьте POST-запрос на `/api/v1/cdn/certificates`.  После загрузки сертификат появится в списке `/api/v1/cdn/certificates` — привязать его к ресурсу можно, передав его ID в поле `config.security.certificate_id` PATCH-запроса на `/api/v1/cdn/http-resources/{resource_id}`.  Если сертификат или приватный ключ не проходят проверку — например, истек срок действия или ключ не соответствует сертификату — вернется ошибка `422`.
     * @param {module:model/AddCertificate} addCertificate 
     * @param {module:api/CDNApi~addCdnCertificateCallback} callback The callback function, accepting three arguments: error, data, response
     */
    addCdnCertificate(addCertificate, callback) {
      let postBody = addCertificate;
      // verify the required parameter 'addCertificate' is set
      if (addCertificate === undefined || addCertificate === null) {
        throw new Error("Missing the required parameter 'addCertificate' when calling addCdnCertificate");
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
        '/api/v1/cdn/certificates', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the archiveCdnCertificateTask operation.
     * @callback module:api/CDNApi~archiveCdnCertificateTaskCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Архивация задачи на выпуск сертификата
     * Чтобы убрать из списка задачу на выпуск сертификата, отправьте POST-запрос на `/api/v1/cdn/certificates/tasks/{task_id}/archive`.
     * @param {Number} taskId ID задачи на выпуск сертификата
     * @param {module:api/CDNApi~archiveCdnCertificateTaskCallback} callback The callback function, accepting three arguments: error, data, response
     */
    archiveCdnCertificateTask(taskId, callback) {
      let postBody = null;
      // verify the required parameter 'taskId' is set
      if (taskId === undefined || taskId === null) {
        throw new Error("Missing the required parameter 'taskId' when calling archiveCdnCertificateTask");
      }

      let pathParams = {
        'task_id': taskId
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
        '/api/v1/cdn/certificates/tasks/{task_id}/archive', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the clearCdnResourceCache operation.
     * @callback module:api/CDNApi~clearCdnResourceCacheCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Очистка кэша CDN-ресурса
     * Чтобы очистить кэш на узлах CDN, отправьте POST-запрос на `/api/v1/cdn/http-resources/{resource_id}/clear-cache`.  При `purge_type` = `full` очищается весь кэш ресурса, при `purge_type` = `partial` — только файлы из списка `paths`.
     * @param {Number} resourceId ID CDN-ресурса
     * @param {module:model/ClearCache} clearCache 
     * @param {module:api/CDNApi~clearCdnResourceCacheCallback} callback The callback function, accepting three arguments: error, data, response
     */
    clearCdnResourceCache(resourceId, clearCache, callback) {
      let postBody = clearCache;
      // verify the required parameter 'resourceId' is set
      if (resourceId === undefined || resourceId === null) {
        throw new Error("Missing the required parameter 'resourceId' when calling clearCdnResourceCache");
      }
      // verify the required parameter 'clearCache' is set
      if (clearCache === undefined || clearCache === null) {
        throw new Error("Missing the required parameter 'clearCache' when calling clearCdnResourceCache");
      }

      let pathParams = {
        'resource_id': resourceId
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
        '/api/v1/cdn/http-resources/{resource_id}/clear-cache', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the createCdnResource operation.
     * @callback module:api/CDNApi~createCdnResourceCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateCdnResource201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Создание CDN-ресурса
     * Чтобы создать CDN-ресурс, отправьте POST-запрос на `/api/v1/cdn/http-resources`.  Источник контента задается ровно одним из полей: `storage_id` для S3-хранилища или `server` для произвольного origin-сервера. Если ни одно из них не передано, вернется ошибка `400`.  Сразу после создания ресурсу выдается технический домен `cdn_domain`, а сам ресурс какое-то время находится в статусе `processing`, пока конфигурация применяется на узлах CDN.
     * @param {module:model/CreateHttpResource} createHttpResource 
     * @param {module:api/CDNApi~createCdnResourceCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateCdnResource201Response}
     */
    createCdnResource(createHttpResource, callback) {
      let postBody = createHttpResource;
      // verify the required parameter 'createHttpResource' is set
      if (createHttpResource === undefined || createHttpResource === null) {
        throw new Error("Missing the required parameter 'createHttpResource' when calling createCdnResource");
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
      let returnType = CreateCdnResource201Response;
      return this.apiClient.callApi(
        '/api/v1/cdn/http-resources', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteCdnCertificate operation.
     * @callback module:api/CDNApi~deleteCdnCertificateCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Удаление сертификата CDN
     * Чтобы удалить SSL-сертификат, отправьте DELETE-запрос на `/api/v1/cdn/certificates/{certificate_id}`.  Если сертификат привязан к CDN-ресурсу, вернется ошибка `409` — сначала отвяжите его, передав `config.security.certificate_id` = `null` в PATCH-запросе на `/api/v1/cdn/http-resources/{resource_id}`.
     * @param {Number} certificateId ID сертификата
     * @param {module:api/CDNApi~deleteCdnCertificateCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteCdnCertificate(certificateId, callback) {
      let postBody = null;
      // verify the required parameter 'certificateId' is set
      if (certificateId === undefined || certificateId === null) {
        throw new Error("Missing the required parameter 'certificateId' when calling deleteCdnCertificate");
      }

      let pathParams = {
        'certificate_id': certificateId
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
        '/api/v1/cdn/certificates/{certificate_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteCdnResource operation.
     * @callback module:api/CDNApi~deleteCdnResourceCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Удаление CDN-ресурса
     * Чтобы удалить CDN-ресурс, отправьте DELETE-запрос на `/api/v1/cdn/http-resources/{resource_id}`. Вместе с ресурсом освобождается его технический домен, а привязанный сертификат отвязывается.
     * @param {Number} resourceId ID CDN-ресурса
     * @param {module:api/CDNApi~deleteCdnResourceCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteCdnResource(resourceId, callback) {
      let postBody = null;
      // verify the required parameter 'resourceId' is set
      if (resourceId === undefined || resourceId === null) {
        throw new Error("Missing the required parameter 'resourceId' when calling deleteCdnResource");
      }

      let pathParams = {
        'resource_id': resourceId
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
        '/api/v1/cdn/http-resources/{resource_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getCdnCertificateTasks operation.
     * @callback module:api/CDNApi~getCdnCertificateTasksCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetCdnCertificateTasks200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка задач на выпуск сертификатов
     * Чтобы получить список задач на выпуск сертификатов Let's Encrypt, отправьте GET-запрос на `/api/v1/cdn/certificates/tasks`.
     * @param {Object} opts Optional parameters
     * @param {Number} [resourceId] Оставить в выдаче только задачи указанного CDN-ресурса.
     * @param {module:api/CDNApi~getCdnCertificateTasksCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetCdnCertificateTasks200Response}
     */
    getCdnCertificateTasks(opts, callback) {
      opts = opts || {};
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
        'resource_id': opts['resourceId']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = GetCdnCertificateTasks200Response;
      return this.apiClient.callApi(
        '/api/v1/cdn/certificates/tasks', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getCdnCertificates operation.
     * @callback module:api/CDNApi~getCdnCertificatesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetCdnCertificates200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка сертификатов CDN
     * Чтобы получить список SSL-сертификатов, доступных для доменов CDN-ресурсов, отправьте GET-запрос на `/api/v1/cdn/certificates`.
     * @param {Object} opts Optional parameters
     * @param {Number} [resourceId] Оставить в выдаче только сертификаты, подходящие для доменов указанного CDN-ресурса.
     * @param {module:api/CDNApi~getCdnCertificatesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetCdnCertificates200Response}
     */
    getCdnCertificates(opts, callback) {
      opts = opts || {};
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
        'resource_id': opts['resourceId']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = GetCdnCertificates200Response;
      return this.apiClient.callApi(
        '/api/v1/cdn/certificates', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getCdnOriginNodes operation.
     * @callback module:api/CDNApi~getCdnOriginNodesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetCdnOriginNodes200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка подсетей узлов CDN
     * Чтобы получить список IP-адресов и подсетей, с которых узлы CDN обращаются к источнику контента, отправьте GET-запрос на `/api/v1/cdn/nodes/origin`. Этот список удобно использовать, чтобы разрешить доступ к origin-серверу только для узлов CDN.
     * @param {Object} opts Optional parameters
     * @param {Boolean} [withExtraZones = false)] Добавить в выдачу узлы дополнительных зон раздачи.
     * @param {module:api/CDNApi~getCdnOriginNodesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetCdnOriginNodes200Response}
     */
    getCdnOriginNodes(opts, callback) {
      opts = opts || {};
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
        'with_extra_zones': opts['withExtraZones']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = GetCdnOriginNodes200Response;
      return this.apiClient.callApi(
        '/api/v1/cdn/nodes/origin', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getCdnPresets operation.
     * @callback module:api/CDNApi~getCdnPresetsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetCdnPresets200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка тарифов CDN
     * Чтобы получить список доступных тарифов CDN, отправьте GET-запрос на `/api/v1/cdn/presets`. ID тарифа из этого списка указывается в поле `preset_id` при создании и изменении ресурса.
     * @param {module:api/CDNApi~getCdnPresetsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetCdnPresets200Response}
     */
    getCdnPresets(callback) {
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
      let returnType = GetCdnPresets200Response;
      return this.apiClient.callApi(
        '/api/v1/cdn/presets', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getCdnResource operation.
     * @callback module:api/CDNApi~getCdnResourceCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateCdnResource201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение CDN-ресурса
     * Чтобы получить информацию об отдельном CDN-ресурсе, отправьте GET-запрос на `/api/v1/cdn/http-resources/{resource_id}`.
     * @param {Number} resourceId ID CDN-ресурса
     * @param {module:api/CDNApi~getCdnResourceCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateCdnResource201Response}
     */
    getCdnResource(resourceId, callback) {
      let postBody = null;
      // verify the required parameter 'resourceId' is set
      if (resourceId === undefined || resourceId === null) {
        throw new Error("Missing the required parameter 'resourceId' when calling getCdnResource");
      }

      let pathParams = {
        'resource_id': resourceId
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
      let returnType = CreateCdnResource201Response;
      return this.apiClient.callApi(
        '/api/v1/cdn/http-resources/{resource_id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getCdnResourceConfiguration operation.
     * @callback module:api/CDNApi~getCdnResourceConfigurationCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetCdnResourceConfiguration200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение конфигурации CDN-ресурса
     * Чтобы получить текущую конфигурацию CDN-ресурса, отправьте GET-запрос на `/api/v1/cdn/http-resources/{resource_id}/configuration`.  Изменить конфигурацию можно в поле `config` PATCH-запроса на `/api/v1/cdn/http-resources/{resource_id}`.
     * @param {Number} resourceId ID CDN-ресурса
     * @param {module:api/CDNApi~getCdnResourceConfigurationCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetCdnResourceConfiguration200Response}
     */
    getCdnResourceConfiguration(resourceId, callback) {
      let postBody = null;
      // verify the required parameter 'resourceId' is set
      if (resourceId === undefined || resourceId === null) {
        throw new Error("Missing the required parameter 'resourceId' when calling getCdnResourceConfiguration");
      }

      let pathParams = {
        'resource_id': resourceId
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
      let returnType = GetCdnResourceConfiguration200Response;
      return this.apiClient.callApi(
        '/api/v1/cdn/http-resources/{resource_id}/configuration', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getCdnResourceNodes operation.
     * @callback module:api/CDNApi~getCdnResourceNodesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetCdnResourceNodes200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка раздающих узлов CDN-ресурса
     * Чтобы получить список узлов, которые раздают контент доменов ресурса, отправьте GET-запрос на `/api/v1/cdn/nodes/http-resources/{resource_id}`.
     * @param {Number} resourceId ID CDN-ресурса
     * @param {Object} opts Optional parameters
     * @param {Boolean} [withExtraZones = false)] Добавить в выдачу узлы дополнительных зон раздачи.
     * @param {Array.<String>} [country] Оставить в выдаче только основные зоны раздачи в указанных странах. Коды стран в формате ISO 3166-1 alpha-2.
     * @param {module:api/CDNApi~getCdnResourceNodesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetCdnResourceNodes200Response}
     */
    getCdnResourceNodes(resourceId, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'resourceId' is set
      if (resourceId === undefined || resourceId === null) {
        throw new Error("Missing the required parameter 'resourceId' when calling getCdnResourceNodes");
      }

      let pathParams = {
        'resource_id': resourceId
      };
      let queryParams = {
        'with_extra_zones': opts['withExtraZones'],
        'country': this.apiClient.buildCollectionParam(opts['country'], 'multi')
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = GetCdnResourceNodes200Response;
      return this.apiClient.callApi(
        '/api/v1/cdn/nodes/http-resources/{resource_id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getCdnResourceStatistics operation.
     * @callback module:api/CDNApi~getCdnResourceStatisticsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetCdnResourceStatistics200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение статистики CDN-ресурса
     * Чтобы получить статистику трафика и запросов CDN-ресурса, отправьте GET-запрос на `/api/v1/cdn/http-resources/{resource_id}/statistics`.  Данные возвращаются с разбивкой по часовым интервалам. Если период не указан, вернется статистика за последние 6 часов.
     * @param {Number} resourceId ID CDN-ресурса
     * @param {Object} opts Optional parameters
     * @param {Date} [from] Начало периода в формате ISO 8601. По умолчанию — 6 часов назад.
     * @param {Date} [to] Конец периода в формате ISO 8601. По умолчанию — текущий момент. Должен быть не раньше `from`.
     * @param {module:api/CDNApi~getCdnResourceStatisticsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetCdnResourceStatistics200Response}
     */
    getCdnResourceStatistics(resourceId, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'resourceId' is set
      if (resourceId === undefined || resourceId === null) {
        throw new Error("Missing the required parameter 'resourceId' when calling getCdnResourceStatistics");
      }

      let pathParams = {
        'resource_id': resourceId
      };
      let queryParams = {
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
      let returnType = GetCdnResourceStatistics200Response;
      return this.apiClient.callApi(
        '/api/v1/cdn/http-resources/{resource_id}/statistics', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getCdnResources operation.
     * @callback module:api/CDNApi~getCdnResourcesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetCdnResources200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка CDN-ресурсов
     * Чтобы получить список CDN-ресурсов, отправьте GET-запрос на `/api/v1/cdn/http-resources`.
     * @param {Object} opts Optional parameters
     * @param {Number} [bucketId] Оставить в выдаче только ресурсы, источником контента которых является указанное S3-хранилище.
     * @param {module:api/CDNApi~getCdnResourcesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetCdnResources200Response}
     */
    getCdnResources(opts, callback) {
      opts = opts || {};
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
        'bucket_id': opts['bucketId']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = GetCdnResources200Response;
      return this.apiClient.callApi(
        '/api/v1/cdn/http-resources', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the issueCdnCertificate operation.
     * @callback module:api/CDNApi~issueCdnCertificateCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Выпуск сертификата Let's Encrypt для CDN-ресурса
     * Чтобы выпустить бесплатный сертификат Let's Encrypt для доменов CDN-ресурса, отправьте POST-запрос на `/api/v1/cdn/certificates/issue`.  Выпуск выполняется асинхронно: в ответ возвращается код `202`, а следить за ходом выпуска можно по списку задач `/api/v1/cdn/certificates/tasks`. Готовый сертификат привязывается к ресурсу автоматически.  Перед выпуском убедитесь, что домены ресурса указывают на его технический домен `cdn_domain` — иначе вернется ошибка `422`.
     * @param {module:model/IssueCertificate} issueCertificate 
     * @param {module:api/CDNApi~issueCdnCertificateCallback} callback The callback function, accepting three arguments: error, data, response
     */
    issueCdnCertificate(issueCertificate, callback) {
      let postBody = issueCertificate;
      // verify the required parameter 'issueCertificate' is set
      if (issueCertificate === undefined || issueCertificate === null) {
        throw new Error("Missing the required parameter 'issueCertificate' when calling issueCdnCertificate");
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
        '/api/v1/cdn/certificates/issue', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the preloadCdnResourceCache operation.
     * @callback module:api/CDNApi~preloadCdnResourceCacheCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Предварительная загрузка кэша CDN-ресурса
     * Чтобы заранее загрузить файлы в кэш узлов CDN, не дожидаясь первого обращения пользователей, отправьте POST-запрос на `/api/v1/cdn/http-resources/{resource_id}/preload-cache`.
     * @param {Number} resourceId ID CDN-ресурса
     * @param {module:model/PreloadCache} preloadCache 
     * @param {module:api/CDNApi~preloadCdnResourceCacheCallback} callback The callback function, accepting three arguments: error, data, response
     */
    preloadCdnResourceCache(resourceId, preloadCache, callback) {
      let postBody = preloadCache;
      // verify the required parameter 'resourceId' is set
      if (resourceId === undefined || resourceId === null) {
        throw new Error("Missing the required parameter 'resourceId' when calling preloadCdnResourceCache");
      }
      // verify the required parameter 'preloadCache' is set
      if (preloadCache === undefined || preloadCache === null) {
        throw new Error("Missing the required parameter 'preloadCache' when calling preloadCdnResourceCache");
      }

      let pathParams = {
        'resource_id': resourceId
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
        '/api/v1/cdn/http-resources/{resource_id}/preload-cache', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the resumeCdnResource operation.
     * @callback module:api/CDNApi~resumeCdnResourceCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateCdnResource201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Возобновление раздачи CDN-ресурса
     * Чтобы возобновить раздачу контента после приостановки, отправьте POST-запрос на `/api/v1/cdn/http-resources/{resource_id}/resume`.  Если ресурс заблокирован, вернется ошибка `409`.
     * @param {Number} resourceId ID CDN-ресурса
     * @param {module:api/CDNApi~resumeCdnResourceCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateCdnResource201Response}
     */
    resumeCdnResource(resourceId, callback) {
      let postBody = null;
      // verify the required parameter 'resourceId' is set
      if (resourceId === undefined || resourceId === null) {
        throw new Error("Missing the required parameter 'resourceId' when calling resumeCdnResource");
      }

      let pathParams = {
        'resource_id': resourceId
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
      let returnType = CreateCdnResource201Response;
      return this.apiClient.callApi(
        '/api/v1/cdn/http-resources/{resource_id}/resume', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the suspendCdnResource operation.
     * @callback module:api/CDNApi~suspendCdnResourceCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateCdnResource201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Приостановка раздачи CDN-ресурса
     * Чтобы приостановить раздачу контента, отправьте POST-запрос на `/api/v1/cdn/http-resources/{resource_id}/suspend`. Ресурс перейдет в статус `stopped`, его настройки и домены сохранятся.  Если ресурс заблокирован, вернется ошибка `409`.
     * @param {Number} resourceId ID CDN-ресурса
     * @param {module:api/CDNApi~suspendCdnResourceCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateCdnResource201Response}
     */
    suspendCdnResource(resourceId, callback) {
      let postBody = null;
      // verify the required parameter 'resourceId' is set
      if (resourceId === undefined || resourceId === null) {
        throw new Error("Missing the required parameter 'resourceId' when calling suspendCdnResource");
      }

      let pathParams = {
        'resource_id': resourceId
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
      let returnType = CreateCdnResource201Response;
      return this.apiClient.callApi(
        '/api/v1/cdn/http-resources/{resource_id}/suspend', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the updateCdnResource operation.
     * @callback module:api/CDNApi~updateCdnResourceCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateCdnResource201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Изменение CDN-ресурса
     * Чтобы изменить CDN-ресурс, отправьте PATCH-запрос на `/api/v1/cdn/http-resources/{resource_id}`.  Передавайте только те поля, которые нужно изменить: переданные значения накладываются на текущую конфигурацию, а непереданные остаются без изменений. Чтобы сбросить настройку, передайте в соответствующем поле `null`.  Поля `storage_id` и `config.origin.servers` нельзя передавать вместе — источник контента может быть только один.
     * @param {Number} resourceId ID CDN-ресурса
     * @param {module:model/UpdateHttpResource} updateHttpResource 
     * @param {module:api/CDNApi~updateCdnResourceCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateCdnResource201Response}
     */
    updateCdnResource(resourceId, updateHttpResource, callback) {
      let postBody = updateHttpResource;
      // verify the required parameter 'resourceId' is set
      if (resourceId === undefined || resourceId === null) {
        throw new Error("Missing the required parameter 'resourceId' when calling updateCdnResource");
      }
      // verify the required parameter 'updateHttpResource' is set
      if (updateHttpResource === undefined || updateHttpResource === null) {
        throw new Error("Missing the required parameter 'updateHttpResource' when calling updateCdnResource");
      }

      let pathParams = {
        'resource_id': resourceId
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
      let returnType = CreateCdnResource201Response;
      return this.apiClient.callApi(
        '/api/v1/cdn/http-resources/{resource_id}', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}
