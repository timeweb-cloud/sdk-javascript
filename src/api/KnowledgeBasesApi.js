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
import CreateKnowledgebase from '../model/CreateKnowledgebase';
import CreateKnowledgebase201Response from '../model/CreateKnowledgebase201Response';
import GetAccountStatus403Response from '../model/GetAccountStatus403Response';
import GetFinances400Response from '../model/GetFinances400Response';
import GetFinances401Response from '../model/GetFinances401Response';
import GetFinances429Response from '../model/GetFinances429Response';
import GetFinances500Response from '../model/GetFinances500Response';
import GetImage404Response from '../model/GetImage404Response';
import GetKnowledgebaseDocumentsV2200Response from '../model/GetKnowledgebaseDocumentsV2200Response';
import GetKnowledgebaseStatistics200Response from '../model/GetKnowledgebaseStatistics200Response';
import GetKnowledgebases200Response from '../model/GetKnowledgebases200Response';
import GetKnowledgebasesV2200Response from '../model/GetKnowledgebasesV2200Response';
import UpdateKnowledgebase from '../model/UpdateKnowledgebase';
import UploadFilesToKnowledgebase200Response from '../model/UploadFilesToKnowledgebase200Response';

/**
* KnowledgeBases service.
* @module api/KnowledgeBasesApi
* @version 1.0.0
*/
export default class KnowledgeBasesApi {

    /**
    * Constructs a new KnowledgeBasesApi. 
    * @alias module:api/KnowledgeBasesApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }


    /**
     * Callback function to receive the result of the addAdditionalTokenPackageToKnowledgebase operation.
     * @callback module:api/KnowledgeBasesApi~addAdditionalTokenPackageToKnowledgebaseCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Добавление дополнительного пакета токенов
     * Чтобы добавить дополнительный пакет токенов для базы знаний, отправьте POST-запрос на `/api/v1/cloud-ai/knowledge-bases/{id}/add-additional-token-package`.
     * @param {Number} id ID базы знаний
     * @param {Object} opts Optional parameters
     * @param {module:model/AddTokenPackage} [addTokenPackage] 
     * @param {module:api/KnowledgeBasesApi~addAdditionalTokenPackageToKnowledgebaseCallback} callback The callback function, accepting three arguments: error, data, response
     */
    addAdditionalTokenPackageToKnowledgebase(id, opts, callback) {
      opts = opts || {};
      let postBody = opts['addTokenPackage'];
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling addAdditionalTokenPackageToKnowledgebase");
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
        '/api/v1/cloud-ai/knowledge-bases/{id}/add-additional-token-package', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the createKnowledgebase operation.
     * @callback module:api/KnowledgeBasesApi~createKnowledgebaseCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateKnowledgebase201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Создание базы знаний
     * Чтобы создать базу знаний, отправьте POST-запрос на `/api/v1/cloud-ai/knowledge-bases`, задав необходимые атрибуты.  База знаний будет создана с использованием предоставленной информации. Тело ответа будет содержать объект JSON с информацией о созданной базе знаний.
     * @param {module:model/CreateKnowledgebase} createKnowledgebase 
     * @param {module:api/KnowledgeBasesApi~createKnowledgebaseCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateKnowledgebase201Response}
     */
    createKnowledgebase(createKnowledgebase, callback) {
      let postBody = createKnowledgebase;
      // verify the required parameter 'createKnowledgebase' is set
      if (createKnowledgebase === undefined || createKnowledgebase === null) {
        throw new Error("Missing the required parameter 'createKnowledgebase' when calling createKnowledgebase");
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
      let returnType = CreateKnowledgebase201Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/knowledge-bases', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteDocument operation.
     * @callback module:api/KnowledgeBasesApi~deleteDocumentCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Удаление документа из базы знаний
     * Чтобы удалить документ из базы знаний, отправьте DELETE-запрос на `/api/v1/cloud-ai/knowledge-bases/{id}/documents/{document_id}`.
     * @param {Number} id ID базы знаний
     * @param {Number} documentId ID документа
     * @param {module:api/KnowledgeBasesApi~deleteDocumentCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteDocument(id, documentId, callback) {
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling deleteDocument");
      }
      // verify the required parameter 'documentId' is set
      if (documentId === undefined || documentId === null) {
        throw new Error("Missing the required parameter 'documentId' when calling deleteDocument");
      }

      let pathParams = {
        'id': id,
        'document_id': documentId
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
        '/api/v1/cloud-ai/knowledge-bases/{id}/documents/{document_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteKnowledgebase operation.
     * @callback module:api/KnowledgeBasesApi~deleteKnowledgebaseCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Удаление базы знаний
     * Чтобы удалить базу знаний, отправьте DELETE-запрос на `/api/v1/cloud-ai/knowledge-bases/{id}`.
     * @param {Number} id ID базы знаний
     * @param {module:api/KnowledgeBasesApi~deleteKnowledgebaseCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteKnowledgebase(id, callback) {
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling deleteKnowledgebase");
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
        '/api/v1/cloud-ai/knowledge-bases/{id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the downloadDocument operation.
     * @callback module:api/KnowledgeBasesApi~downloadDocumentCallback
     * @param {String} error Error message, if any.
     * @param {File} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Скачивание документа из базы знаний
     * Чтобы скачать документ из базы знаний, отправьте GET-запрос на `/api/v1/cloud-ai/knowledge-bases/{id}/documents/{document_id}/download`.
     * @param {Number} id ID базы знаний
     * @param {Number} documentId ID документа
     * @param {module:api/KnowledgeBasesApi~downloadDocumentCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link File}
     */
    downloadDocument(id, documentId, callback) {
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling downloadDocument");
      }
      // verify the required parameter 'documentId' is set
      if (documentId === undefined || documentId === null) {
        throw new Error("Missing the required parameter 'documentId' when calling downloadDocument");
      }

      let pathParams = {
        'id': id,
        'document_id': documentId
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/octet-stream', 'application/json'];
      let returnType = File;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/knowledge-bases/{id}/documents/{document_id}/download', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getKnowledgebase operation.
     * @callback module:api/KnowledgeBasesApi~getKnowledgebaseCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateKnowledgebase201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение базы знаний
     * Чтобы получить информацию о базе знаний, отправьте GET-запрос на `/api/v1/cloud-ai/knowledge-bases/{id}`.
     * @param {Number} id ID базы знаний
     * @param {module:api/KnowledgeBasesApi~getKnowledgebaseCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateKnowledgebase201Response}
     */
    getKnowledgebase(id, callback) {
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling getKnowledgebase");
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
      let returnType = CreateKnowledgebase201Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/knowledge-bases/{id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getKnowledgebaseDocumentsV2 operation.
     * @callback module:api/KnowledgeBasesApi~getKnowledgebaseDocumentsV2Callback
     * @param {String} error Error message, if any.
     * @param {module:model/GetKnowledgebaseDocumentsV2200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка документов базы знаний
     * Чтобы получить список документов базы знаний, отправьте GET-запрос на `/api/v2/cloud-ai/knowledge-bases/{id}/documents`.  Тело ответа будет представлять собой объект JSON с ключами `knowledgebase_documents` и `meta`.
     * @param {Number} id ID базы знаний
     * @param {Object} opts Optional parameters
     * @param {Number} [limit = 10)] Количество документов на странице (по умолчанию: 10, максимум: 100)
     * @param {Number} [offset = 0)] Количество документов для пропуска (по умолчанию: 0)
     * @param {module:model/String} [sortBy = 'indexing_timestamp')] Поле для сортировки (по умолчанию: indexing_timestamp - время последней индексации документа)
     * @param {module:model/String} [sortOrder = 'DESC')] Порядок сортировки (по умолчанию: DESC)
     * @param {module:api/KnowledgeBasesApi~getKnowledgebaseDocumentsV2Callback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetKnowledgebaseDocumentsV2200Response}
     */
    getKnowledgebaseDocumentsV2(id, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling getKnowledgebaseDocumentsV2");
      }

      let pathParams = {
        'id': id
      };
      let queryParams = {
        'limit': opts['limit'],
        'offset': opts['offset'],
        'sort_by': opts['sortBy'],
        'sort_order': opts['sortOrder']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = GetKnowledgebaseDocumentsV2200Response;
      return this.apiClient.callApi(
        '/api/v2/cloud-ai/knowledge-bases/{id}/documents', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getKnowledgebaseStatistics operation.
     * @callback module:api/KnowledgeBasesApi~getKnowledgebaseStatisticsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetKnowledgebaseStatistics200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение статистики использования токенов базы знаний
     * Чтобы получить статистику использования токенов базы знаний, отправьте GET-запрос на `/api/v1/cloud-ai/knowledge-bases/{id}/statistic`.  Можно указать временной диапазон и интервал агрегации.
     * @param {Number} id ID базы знаний
     * @param {Object} opts Optional parameters
     * @param {Date} [startTime] Начало временного диапазона (ISO 8601)
     * @param {Date} [endTime] Конец временного диапазона (ISO 8601)
     * @param {Number} [interval = 60)] Интервал в минутах (по умолчанию 60)
     * @param {module:api/KnowledgeBasesApi~getKnowledgebaseStatisticsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetKnowledgebaseStatistics200Response}
     */
    getKnowledgebaseStatistics(id, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling getKnowledgebaseStatistics");
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
      let returnType = GetKnowledgebaseStatistics200Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/knowledge-bases/{id}/statistic', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getKnowledgebases operation.
     * @callback module:api/KnowledgeBasesApi~getKnowledgebasesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetKnowledgebases200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка баз знаний
     * Чтобы получить список баз знаний, отправьте GET-запрос на `/api/v1/cloud-ai/knowledge-bases`.  Тело ответа будет представлять собой объект JSON с ключом `knowledgebases`.
     * @param {module:api/KnowledgeBasesApi~getKnowledgebasesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetKnowledgebases200Response}
     */
    getKnowledgebases(callback) {
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
      let returnType = GetKnowledgebases200Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/knowledge-bases', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getKnowledgebasesV2 operation.
     * @callback module:api/KnowledgeBasesApi~getKnowledgebasesV2Callback
     * @param {String} error Error message, if any.
     * @param {module:model/GetKnowledgebasesV2200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка баз знаний (v2)
     * Чтобы получить список баз знаний, отправьте GET-запрос на `/api/v2/cloud-ai/knowledge-bases`.  Версия API v2 возвращает оптимизированный ответ с количеством документов вместо полного списка документов.  Тело ответа будет представлять собой объект JSON с ключом `knowledgebases`.
     * @param {module:api/KnowledgeBasesApi~getKnowledgebasesV2Callback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetKnowledgebasesV2200Response}
     */
    getKnowledgebasesV2(callback) {
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
      let returnType = GetKnowledgebasesV2200Response;
      return this.apiClient.callApi(
        '/api/v2/cloud-ai/knowledge-bases', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the linkKnowledgebaseToAgent operation.
     * @callback module:api/KnowledgeBasesApi~linkKnowledgebaseToAgentCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Привязка базы знаний к агенту
     * Чтобы привязать базу знаний к AI агенту, отправьте POST-запрос на `/api/v1/cloud-ai/knowledge-bases/{id}/link/{agent_id}`.
     * @param {Number} id ID базы знаний
     * @param {Number} agentId ID агента
     * @param {module:api/KnowledgeBasesApi~linkKnowledgebaseToAgentCallback} callback The callback function, accepting three arguments: error, data, response
     */
    linkKnowledgebaseToAgent(id, agentId, callback) {
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling linkKnowledgebaseToAgent");
      }
      // verify the required parameter 'agentId' is set
      if (agentId === undefined || agentId === null) {
        throw new Error("Missing the required parameter 'agentId' when calling linkKnowledgebaseToAgent");
      }

      let pathParams = {
        'id': id,
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
      let returnType = null;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/knowledge-bases/{id}/link/{agent_id}', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the reindexDocument operation.
     * @callback module:api/KnowledgeBasesApi~reindexDocumentCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Переиндексация документа
     * Чтобы переиндексировать документ в базе знаний, отправьте POST-запрос на `/api/v1/cloud-ai/knowledge-bases/{id}/documents/{document_id}/reindex`.
     * @param {Number} id ID базы знаний
     * @param {Number} documentId ID документа
     * @param {module:api/KnowledgeBasesApi~reindexDocumentCallback} callback The callback function, accepting three arguments: error, data, response
     */
    reindexDocument(id, documentId, callback) {
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling reindexDocument");
      }
      // verify the required parameter 'documentId' is set
      if (documentId === undefined || documentId === null) {
        throw new Error("Missing the required parameter 'documentId' when calling reindexDocument");
      }

      let pathParams = {
        'id': id,
        'document_id': documentId
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
        '/api/v1/cloud-ai/knowledge-bases/{id}/documents/{document_id}/reindex', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the unlinkKnowledgebaseFromAgent operation.
     * @callback module:api/KnowledgeBasesApi~unlinkKnowledgebaseFromAgentCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Отвязка базы знаний от агента
     * Чтобы отвязать базу знаний от AI агента, отправьте DELETE-запрос на `/api/v1/cloud-ai/knowledge-bases/{id}/link/{agent_id}`.
     * @param {Number} id ID базы знаний
     * @param {Number} agentId ID агента
     * @param {module:api/KnowledgeBasesApi~unlinkKnowledgebaseFromAgentCallback} callback The callback function, accepting three arguments: error, data, response
     */
    unlinkKnowledgebaseFromAgent(id, agentId, callback) {
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling unlinkKnowledgebaseFromAgent");
      }
      // verify the required parameter 'agentId' is set
      if (agentId === undefined || agentId === null) {
        throw new Error("Missing the required parameter 'agentId' when calling unlinkKnowledgebaseFromAgent");
      }

      let pathParams = {
        'id': id,
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
      let returnType = null;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/knowledge-bases/{id}/link/{agent_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the updateKnowledgebase operation.
     * @callback module:api/KnowledgeBasesApi~updateKnowledgebaseCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateKnowledgebase201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Обновление базы знаний
     * Чтобы обновить базу знаний, отправьте PATCH-запрос на `/api/v1/cloud-ai/knowledge-bases/{id}`.
     * @param {Number} id ID базы знаний
     * @param {module:model/UpdateKnowledgebase} updateKnowledgebase 
     * @param {module:api/KnowledgeBasesApi~updateKnowledgebaseCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateKnowledgebase201Response}
     */
    updateKnowledgebase(id, updateKnowledgebase, callback) {
      let postBody = updateKnowledgebase;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling updateKnowledgebase");
      }
      // verify the required parameter 'updateKnowledgebase' is set
      if (updateKnowledgebase === undefined || updateKnowledgebase === null) {
        throw new Error("Missing the required parameter 'updateKnowledgebase' when calling updateKnowledgebase");
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
      let returnType = CreateKnowledgebase201Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/knowledge-bases/{id}', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the uploadFilesToKnowledgebase operation.
     * @callback module:api/KnowledgeBasesApi~uploadFilesToKnowledgebaseCallback
     * @param {String} error Error message, if any.
     * @param {module:model/UploadFilesToKnowledgebase200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Загрузка файлов в базу знаний
     * Чтобы загрузить файлы в базу знаний, отправьте POST-запрос на `/api/v1/cloud-ai/knowledge-bases/{id}/upload` с файлами в формате multipart/form-data.  Поддерживаемые форматы: CSV, XML, Markdown (md), HTML, TXT. JSON не поддерживается. Максимум 10 файлов, до 10 МБ каждый.
     * @param {Number} id ID базы знаний
     * @param {Array.<File>} files Файлы для загрузки (максимум 10 файлов, 10 МБ каждый)
     * @param {module:api/KnowledgeBasesApi~uploadFilesToKnowledgebaseCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/UploadFilesToKnowledgebase200Response}
     */
    uploadFilesToKnowledgebase(id, files, callback) {
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling uploadFilesToKnowledgebase");
      }
      // verify the required parameter 'files' is set
      if (files === undefined || files === null) {
        throw new Error("Missing the required parameter 'files' when calling uploadFilesToKnowledgebase");
      }

      let pathParams = {
        'id': id
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
        'files': this.apiClient.buildCollectionParam(files, 'passthrough')
      };

      let authNames = ['Bearer'];
      let contentTypes = ['multipart/form-data'];
      let accepts = ['application/json'];
      let returnType = UploadFilesToKnowledgebase200Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/knowledge-bases/{id}/upload', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}
