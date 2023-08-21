/**
 * Timeweb Cloud API
 * # Введение API Timeweb Cloud позволяет вам управлять ресурсами в облаке программным способом с использованием обычных HTTP-запросов.  Множество функций, которые доступны в панели управления Timeweb Cloud, также доступны через API, что позволяет вам автоматизировать ваши собственные сценарии.  В этой документации сперва будет описан общий дизайн и принципы работы API, а после этого конкретные конечные точки. Также будут приведены примеры запросов к ним.   ## Запросы Запросы должны выполняться по протоколу `HTTPS`, чтобы гарантировать шифрование транзакций. Поддерживаются следующие методы запроса: |Метод|Применение| |--- |--- | |GET|Извлекает данные о коллекциях и отдельных ресурсах.| |POST|Для коллекций создает новый ресурс этого типа. Также используется для выполнения действий с конкретным ресурсом.| |PUT|Обновляет существующий ресурс.| |PATCH|Некоторые ресурсы поддерживают частичное обновление, то есть обновление только части атрибутов ресурса, в этом случае вместо метода PUT будет использован PATCH.| |DELETE|Удаляет ресурс.|  Методы `POST`, `PUT` и `PATCH` могут включать объект в тело запроса с типом содержимого `application/json`.  ### Параметры в запросах Некоторые коллекции поддерживают пагинацию, поиск или сортировку в запросах. В параметрах запроса требуется передать: - `limit` — обозначает количество записей, которое необходимо вернуть  - `offset` — указывает на смещение, относительно начала списка  - `search` — позволяет указать набор символов для поиска  - `sort` — можно задать правило сортировки коллекции  ## Ответы Запросы вернут один из следующих кодов состояния ответа HTTP:  |Статус|Описание| |--- |--- | |200 OK|Действие с ресурсом было выполнено успешно.| |201 Created|Ресурс был успешно создан. При этом ресурс может быть как уже готовым к использованию, так и находиться в процессе запуска.| |204 No Content|Действие с ресурсом было выполнено успешно, и ответ не содержит дополнительной информации в теле.| |400 Bad Request|Был отправлен неверный запрос, например, в нем отсутствуют обязательные параметры и т. д. Тело ответа будет содержать дополнительную информацию об ошибке.| |401 Unauthorized|Ошибка аутентификации.| |403 Forbidden|Аутентификация прошла успешно, но недостаточно прав для выполнения действия.| |404 Not Found|Запрашиваемый ресурс не найден.| |409 Conflict|Запрос конфликтует с текущим состоянием.| |423 Locked|Ресурс из запроса заблокирован от применения к нему указанного метода.| |429 Too Many Requests|Был достигнут лимит по количеству запросов в единицу времени.| |500 Internal Server Error|При выполнении запроса произошла какая-то внутренняя ошибка. Чтобы решить эту проблему, лучше всего создать тикет в панели управления.|  ### Структура успешного ответа Все конечные точки будут возвращать данные в формате `JSON`. Ответы на `GET`-запросы будут иметь на верхнем уровне следующую структуру атрибутов:  |Название поля|Тип|Описание| |--- |--- |--- | |[entity_name]|object, object[], string[], number[], boolean|Динамическое поле, которое будет меняться в зависимости от запрашиваемого ресурса и будет содержать все атрибуты, необходимые для описания этого ресурса. Например, при запросе списка баз данных будет возвращаться поле `dbs`, а при запросе конкретного облачного сервера `server`. Для некоторых конечных точек в ответе может возвращаться сразу несколько ресурсов.| |meta|object|Опционально. Объект, который содержит вспомогательную информацию о ресурсе. Чаще всего будет встречаться при запросе коллекций и содержать поле `total`, которое будет указывать на количество элементов в коллекции.| |response_id|string|Опционально. В большинстве случаев в ответе будет содержаться уникальный идентификатор ответа в формате UUIDv4, который однозначно указывает на ваш запрос внутри нашей системы. Если вам потребуется задать вопрос нашей поддержке, приложите к вопросу этот идентификатор — так мы сможем найти ответ на него намного быстрее. Также вы можете использовать этот идентификатор, чтобы убедиться, что это новый ответ на запрос и результат не был получен из кэша.|  Пример запроса на получение списка SSH-ключей: ```     HTTP/2.0 200 OK     {       \"ssh_keys\":[           {             \"body\":\"ssh-rsa AAAAB3NzaC1sdfghjkOAsBwWhs= example@device.local\",             \"created_at\":\"2021-09-15T19:52:27Z\",             \"expired_at\":null,             \"id\":5297,             \"is_default\":false,             \"name\":\"example@device.local\",             \"used_at\":null,             \"used_by\":[]           }       ],       \"meta\":{           \"total\":1       },       \"response_id\":\"94608d15-8672-4eed-8ab6-28bd6fa3cdf7\"     } ```  ### Структура ответа с ошибкой |Название поля|Тип|Описание| |--- |--- |--- | |status_code|number|Короткий числовой идентификатор ошибки.| |error_code|string|Короткий текстовый идентификатор ошибки, который уточняет числовой идентификатор и удобен для программной обработки. Самый простой пример — это код `not_found` для ошибки 404.| |message|string, string[]|Опционально. В большинстве случаев в ответе будет содержаться человекочитаемое подробное описание ошибки или ошибок, которые помогут понять, что нужно исправить.| |response_id|string|Опционально. В большинстве случае в ответе будет содержаться уникальный идентификатор ответа в формате UUIDv4, который однозначно указывает на ваш запрос внутри нашей системы. Если вам потребуется задать вопрос нашей поддержке, приложите к вопросу этот идентификатор — так мы сможем найти ответ на него намного быстрее.|  Пример: ```     HTTP/2.0 403 Forbidden     {       \"status_code\": 403,       \"error_code\":  \"forbidden\",       \"message\":     \"You do not have access for the attempted action\",       \"response_id\": \"94608d15-8672-4eed-8ab6-28bd6fa3cdf7\"     } ```  ## Статусы ресурсов Важно учесть, что при создании большинства ресурсов внутри платформы вам будет сразу возвращен ответ от сервера со статусом `200 OK` или `201 Created` и идентификатором созданного ресурса в теле ответа, но при этом этот ресурс может быть ещё в *состоянии запуска*.  Для того чтобы понять, в каком состоянии сейчас находится ваш ресурс, мы добавили поле `status` в ответ на получение информации о ресурсе.  Список статусов будет отличаться в зависимости от типа ресурса. Увидеть поддерживаемый список статусов вы сможете в описании каждого конкретного ресурса.     ## Ограничение скорости запросов (Rate Limiting) Чтобы обеспечить стабильность для всех пользователей, Timeweb Cloud защищает API от всплесков входящего трафика, анализируя количество запросов c каждого аккаунта к каждой конечной точке.  Если ваше приложение отправляет более 20 запросов в секунду на одну конечную точку, то для этого запроса API может вернуть код состояния HTTP `429 Too Many Requests`.   ## Аутентификация Доступ к API осуществляется с помощью JWT-токена. Токенами можно управлять внутри панели управления Timeweb Cloud в разделе *API и Terraform*.  Токен необходимо передавать в заголовке каждого запроса в формате: ```   Authorization: Bearer $TIMEWEB_CLOUD_TOKEN ```  ## Формат примеров API Примеры в этой документации описаны с помощью `curl`, HTTP-клиента командной строки. На компьютерах `Linux` и `macOS` обычно по умолчанию установлен `curl`, и он доступен для загрузки на всех популярных платформах, включая `Windows`.  Каждый пример разделен на несколько строк символом `\\`, который совместим с `bash`. Типичный пример выглядит так: ```   curl -X PATCH      -H \"Content-Type: application/json\"      -H \"Authorization: Bearer $TIMEWEB_CLOUD_TOKEN\"      -d '{\"name\":\"Cute Corvus\",\"comment\":\"Development Server\"}'      \"https://api.timeweb.cloud/api/v1/dedicated/1051\" ``` - Параметр `-X` задает метод запроса. Для согласованности метод будет указан во всех примерах, даже если он явно не требуется для методов `GET`. - Строки `-H` задают требуемые HTTP-заголовки. - Примеры, для которых требуется объект JSON в теле запроса, передают требуемые данные через параметр `-d`.  Чтобы использовать приведенные примеры, не подставляя каждый раз в них свой токен, вы можете добавить токен один раз в переменные окружения в вашей консоли. Например, на `Linux` это можно сделать с помощью команды:  ``` TIMEWEB_CLOUD_TOKEN=\"token\" ```  После этого токен будет автоматически подставляться в ваши запросы.  Обратите внимание, что все значения в этой документации являются примерами. Не полагайтесь на идентификаторы операционных систем, тарифов и т.д., используемые в примерах. Используйте соответствующую конечную точку для получения значений перед созданием ресурсов.   ## Версионирование API построено согласно принципам [семантического версионирования](https://semver.org/lang/ru). Это значит, что мы гарантируем обратную совместимость всех изменений в пределах одной мажорной версии.  Мажорная версия каждой конечной точки обозначается в пути запроса, например, запрос `/api/v1/servers` указывает, что этот метод имеет версию 1.
 *
 * The version of the OpenAPI document: 
 * Contact: info@timeweb.cloud
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */


import ApiClient from "../ApiClient";
import CreateDedicatedServer from '../model/CreateDedicatedServer';
import CreateDedicatedServer201Response from '../model/CreateDedicatedServer201Response';
import GetDedicatedServerPresetAdditionalServices200Response from '../model/GetDedicatedServerPresetAdditionalServices200Response';
import GetDedicatedServers200Response from '../model/GetDedicatedServers200Response';
import GetDedicatedServersPresets200Response from '../model/GetDedicatedServersPresets200Response';
import GetFinances400Response from '../model/GetFinances400Response';
import GetFinances401Response from '../model/GetFinances401Response';
import GetFinances403Response from '../model/GetFinances403Response';
import GetFinances404Response from '../model/GetFinances404Response';
import GetFinances429Response from '../model/GetFinances429Response';
import GetFinances500Response from '../model/GetFinances500Response';
import UpdateDedicatedServerRequest from '../model/UpdateDedicatedServerRequest';

/**
* DedicatedServers service.
* @module api/DedicatedServersApi
* @version 1.0.0
*/
export default class DedicatedServersApi {

    /**
    * Constructs a new DedicatedServersApi. 
    * @alias module:api/DedicatedServersApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }


    /**
     * Callback function to receive the result of the createDedicatedServer operation.
     * @callback module:api/DedicatedServersApi~createDedicatedServerCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateDedicatedServer201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Создание выделенного сервера
     * Чтобы создать выделенный сервер, отправьте POST-запрос в `api/v1/dedicated-servers`, задав необходимые атрибуты.  Выделенный сервер будет создан с использованием предоставленной информации. Тело ответа будет содержать объект JSON с информацией о созданном выделенном сервере.
     * @param {module:model/CreateDedicatedServer} createDedicatedServer 
     * @param {module:api/DedicatedServersApi~createDedicatedServerCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateDedicatedServer201Response}
     */
    createDedicatedServer(createDedicatedServer, callback) {
      let postBody = createDedicatedServer;
      // verify the required parameter 'createDedicatedServer' is set
      if (createDedicatedServer === undefined || createDedicatedServer === null) {
        throw new Error("Missing the required parameter 'createDedicatedServer' when calling createDedicatedServer");
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
      let returnType = CreateDedicatedServer201Response;
      return this.apiClient.callApi(
        '/api/v1/dedicated-servers', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteDedicatedServer operation.
     * @callback module:api/DedicatedServersApi~deleteDedicatedServerCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Удаление выделенного сервера
     * Чтобы удалить выделенный сервер, отправьте запрос DELETE в `api/v1/dedicated-servers/{dedicated_id}`. 
     * @param {Number} dedicatedId Уникальный идентификатор выделенного сервера.
     * @param {module:api/DedicatedServersApi~deleteDedicatedServerCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteDedicatedServer(dedicatedId, callback) {
      let postBody = null;
      // verify the required parameter 'dedicatedId' is set
      if (dedicatedId === undefined || dedicatedId === null) {
        throw new Error("Missing the required parameter 'dedicatedId' when calling deleteDedicatedServer");
      }

      let pathParams = {
        'dedicated_id': dedicatedId
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
        '/api/v1/dedicated-servers/{dedicated_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getDedicatedServer operation.
     * @callback module:api/DedicatedServersApi~getDedicatedServerCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateDedicatedServer201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение выделенного сервера
     * Чтобы отобразить информацию об отдельном выделенном сервере, отправьте запрос GET на `api/v1/dedicated-servers/{dedicated_id}`. 
     * @param {Number} dedicatedId Уникальный идентификатор выделенного сервера.
     * @param {module:api/DedicatedServersApi~getDedicatedServerCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateDedicatedServer201Response}
     */
    getDedicatedServer(dedicatedId, callback) {
      let postBody = null;
      // verify the required parameter 'dedicatedId' is set
      if (dedicatedId === undefined || dedicatedId === null) {
        throw new Error("Missing the required parameter 'dedicatedId' when calling getDedicatedServer");
      }

      let pathParams = {
        'dedicated_id': dedicatedId
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
      let returnType = CreateDedicatedServer201Response;
      return this.apiClient.callApi(
        '/api/v1/dedicated-servers/{dedicated_id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getDedicatedServerPresetAdditionalServices operation.
     * @callback module:api/DedicatedServersApi~getDedicatedServerPresetAdditionalServicesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetDedicatedServerPresetAdditionalServices200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение дополнительных услуг для выделенного сервера
     * Чтобы получить список всех дополнительных услуг для выделенных серверов, отправьте GET-запрос на `/api/v1/presets/dedicated-servers/{preset_id}/additional-services`.
     * @param {Number} presetId Уникальный идентификатор тарифа выделенного сервера.
     * @param {module:api/DedicatedServersApi~getDedicatedServerPresetAdditionalServicesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetDedicatedServerPresetAdditionalServices200Response}
     */
    getDedicatedServerPresetAdditionalServices(presetId, callback) {
      let postBody = null;
      // verify the required parameter 'presetId' is set
      if (presetId === undefined || presetId === null) {
        throw new Error("Missing the required parameter 'presetId' when calling getDedicatedServerPresetAdditionalServices");
      }

      let pathParams = {
        'preset_id': presetId
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
      let returnType = GetDedicatedServerPresetAdditionalServices200Response;
      return this.apiClient.callApi(
        '/api/v1/presets/dedicated-servers/{preset_id}/additional-services', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getDedicatedServers operation.
     * @callback module:api/DedicatedServersApi~getDedicatedServersCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetDedicatedServers200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка выделенных серверов
     * Чтобы получить список всех выделенных серверов на вашем аккаунте, отправьте GET-запрос на `/api/v1/dedicated-servers`.   Тело ответа будет представлять собой объект JSON с ключом `dedicated_servers`.
     * @param {module:api/DedicatedServersApi~getDedicatedServersCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetDedicatedServers200Response}
     */
    getDedicatedServers(callback) {
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
      let returnType = GetDedicatedServers200Response;
      return this.apiClient.callApi(
        '/api/v1/dedicated-servers', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getDedicatedServersPresets operation.
     * @callback module:api/DedicatedServersApi~getDedicatedServersPresetsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetDedicatedServersPresets200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка тарифов для выделенного сервера
     * Чтобы получить список всех тарифов выделенных серверов, отправьте GET-запрос на `/api/v1/presets/dedicated-servers`.
     * @param {Object} opts Optional parameters
     * @param {module:model/String} [location] Получение тарифов определенной локации.
     * @param {module:api/DedicatedServersApi~getDedicatedServersPresetsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetDedicatedServersPresets200Response}
     */
    getDedicatedServersPresets(opts, callback) {
      opts = opts || {};
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
        'location': opts['location']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = GetDedicatedServersPresets200Response;
      return this.apiClient.callApi(
        '/api/v1/presets/dedicated-servers', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the updateDedicatedServer operation.
     * @callback module:api/DedicatedServersApi~updateDedicatedServerCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateDedicatedServer201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Обновление выделенного сервера
     * Чтобы обновить только определенные атрибуты выделенного сервера, отправьте запрос PATCH в `api/v1/dedicated-servers/{dedicated_id}`. 
     * @param {Number} dedicatedId Уникальный идентификатор выделенного сервера.
     * @param {Object} opts Optional parameters
     * @param {module:model/UpdateDedicatedServerRequest} [updateDedicatedServerRequest] 
     * @param {module:api/DedicatedServersApi~updateDedicatedServerCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateDedicatedServer201Response}
     */
    updateDedicatedServer(dedicatedId, opts, callback) {
      opts = opts || {};
      let postBody = opts['updateDedicatedServerRequest'];
      // verify the required parameter 'dedicatedId' is set
      if (dedicatedId === undefined || dedicatedId === null) {
        throw new Error("Missing the required parameter 'dedicatedId' when calling updateDedicatedServer");
      }

      let pathParams = {
        'dedicated_id': dedicatedId
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
      let returnType = CreateDedicatedServer201Response;
      return this.apiClient.callApi(
        '/api/v1/dedicated-servers/{dedicated_id}', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}
