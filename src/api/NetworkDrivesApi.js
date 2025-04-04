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
import CreateDatabaseBackup409Response from '../model/CreateDatabaseBackup409Response';
import CreateNetworkDrive from '../model/CreateNetworkDrive';
import CreateNetworkDrive201Response from '../model/CreateNetworkDrive201Response';
import GetFinances400Response from '../model/GetFinances400Response';
import GetFinances401Response from '../model/GetFinances401Response';
import GetFinances403Response from '../model/GetFinances403Response';
import GetFinances429Response from '../model/GetFinances429Response';
import GetFinances500Response from '../model/GetFinances500Response';
import GetImage404Response from '../model/GetImage404Response';
import GetNetworkDrives200Response from '../model/GetNetworkDrives200Response';
import GetNetworkDrivesAvailableResources200Response from '../model/GetNetworkDrivesAvailableResources200Response';
import GetNetworkDrivesPresets200Response from '../model/GetNetworkDrivesPresets200Response';
import MountNetworkDrive from '../model/MountNetworkDrive';
import UpdateNetworkDrive from '../model/UpdateNetworkDrive';

/**
* NetworkDrives service.
* @module api/NetworkDrivesApi
* @version 1.0.0
*/
export default class NetworkDrivesApi {

    /**
    * Constructs a new NetworkDrivesApi. 
    * @alias module:api/NetworkDrivesApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }


    /**
     * Callback function to receive the result of the createNetworkDrive operation.
     * @callback module:api/NetworkDrivesApi~createNetworkDriveCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateNetworkDrive201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Создание сетевого диска
     * Чтобы создать создать сетевой диск, отправьте POST-запрос в `/api/v1/network-drives`, задав необходимые атрибуты.
     * @param {module:model/CreateNetworkDrive} createNetworkDrive 
     * @param {module:api/NetworkDrivesApi~createNetworkDriveCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateNetworkDrive201Response}
     */
    createNetworkDrive(createNetworkDrive, callback) {
      let postBody = createNetworkDrive;
      // verify the required parameter 'createNetworkDrive' is set
      if (createNetworkDrive === undefined || createNetworkDrive === null) {
        throw new Error("Missing the required parameter 'createNetworkDrive' when calling createNetworkDrive");
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
      let returnType = CreateNetworkDrive201Response;
      return this.apiClient.callApi(
        '/api/v1/network-drives', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteNetworkDrive operation.
     * @callback module:api/NetworkDrivesApi~deleteNetworkDriveCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Удаление сетевого диска по идентификатору
     * Чтобы удалить сетевой диск, отправьте DELETE-запрос на `/api/v1/network-drives/{network_drive_id}`
     * @param {String} networkDriveId ID сетевого диска
     * @param {module:api/NetworkDrivesApi~deleteNetworkDriveCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteNetworkDrive(networkDriveId, callback) {
      let postBody = null;
      // verify the required parameter 'networkDriveId' is set
      if (networkDriveId === undefined || networkDriveId === null) {
        throw new Error("Missing the required parameter 'networkDriveId' when calling deleteNetworkDrive");
      }

      let pathParams = {
        'network-drive-id': networkDriveId
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
        '/api/v1/network-drives/{network_drive_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getNetworkDrive operation.
     * @callback module:api/NetworkDrivesApi~getNetworkDriveCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateNetworkDrive201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение сетевого диска
     * Чтобы отобразить информацию об отдельном сетевом диске, отправьте запрос GET на `api/v1/network-drives/{network_drive_id}`.
     * @param {String} networkDriveId ID сетевого диска
     * @param {module:api/NetworkDrivesApi~getNetworkDriveCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateNetworkDrive201Response}
     */
    getNetworkDrive(networkDriveId, callback) {
      let postBody = null;
      // verify the required parameter 'networkDriveId' is set
      if (networkDriveId === undefined || networkDriveId === null) {
        throw new Error("Missing the required parameter 'networkDriveId' when calling getNetworkDrive");
      }

      let pathParams = {
        'network-drive-id': networkDriveId
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
      let returnType = CreateNetworkDrive201Response;
      return this.apiClient.callApi(
        '/api/v1/network-drives/{network_drive_id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getNetworkDrives operation.
     * @callback module:api/NetworkDrivesApi~getNetworkDrivesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetNetworkDrives200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка cетевых дисков
     * Чтобы получить список сетевых дисков, отправьте GET-запрос на `/api/v1/network-drives`.
     * @param {module:api/NetworkDrivesApi~getNetworkDrivesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetNetworkDrives200Response}
     */
    getNetworkDrives(callback) {
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
      let returnType = GetNetworkDrives200Response;
      return this.apiClient.callApi(
        '/api/v1/network-drives', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getNetworkDrivesAvailableResources operation.
     * @callback module:api/NetworkDrivesApi~getNetworkDrivesAvailableResourcesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetNetworkDrivesAvailableResources200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка сервисов доступных для подключения диска
     * Чтобы получить список сервисов, отправьте GET-запрос на `/api/v1/network-drives/available-resources`.
     * @param {module:api/NetworkDrivesApi~getNetworkDrivesAvailableResourcesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetNetworkDrivesAvailableResources200Response}
     */
    getNetworkDrivesAvailableResources(callback) {
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
      let returnType = GetNetworkDrivesAvailableResources200Response;
      return this.apiClient.callApi(
        '/api/v1/network-drives/available-resources', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getNetworkDrivesPresets operation.
     * @callback module:api/NetworkDrivesApi~getNetworkDrivesPresetsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetNetworkDrivesPresets200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка доступных тарифов для сетевого диска
     * Чтобы получить список тарифов, отправьте GET-запрос на `/api/v1/presets/network-drives`.
     * @param {module:api/NetworkDrivesApi~getNetworkDrivesPresetsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetNetworkDrivesPresets200Response}
     */
    getNetworkDrivesPresets(callback) {
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
      let returnType = GetNetworkDrivesPresets200Response;
      return this.apiClient.callApi(
        '/api/v1/presets/network-drives', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the mountNetworkDrive operation.
     * @callback module:api/NetworkDrivesApi~mountNetworkDriveCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Подключить сетевой диск к сервису
     * Чтобы подключить сетевой диск к сервису, отправьте POST-запрос на `/api/v1/network-drives/{network_drive_id}/mount`.
     * @param {String} networkDriveId ID сетевого диска
     * @param {module:model/MountNetworkDrive} mountNetworkDrive 
     * @param {module:api/NetworkDrivesApi~mountNetworkDriveCallback} callback The callback function, accepting three arguments: error, data, response
     */
    mountNetworkDrive(networkDriveId, mountNetworkDrive, callback) {
      let postBody = mountNetworkDrive;
      // verify the required parameter 'networkDriveId' is set
      if (networkDriveId === undefined || networkDriveId === null) {
        throw new Error("Missing the required parameter 'networkDriveId' when calling mountNetworkDrive");
      }
      // verify the required parameter 'mountNetworkDrive' is set
      if (mountNetworkDrive === undefined || mountNetworkDrive === null) {
        throw new Error("Missing the required parameter 'mountNetworkDrive' when calling mountNetworkDrive");
      }

      let pathParams = {
        'network-drive-id': networkDriveId
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
        '/api/v1/network-drives/{network_drive_id}/mount', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the unmountNetworkDrive operation.
     * @callback module:api/NetworkDrivesApi~unmountNetworkDriveCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Отключить сетевой диск от сервиса
     * Чтобы отключить сетевой диск от сервиса, отправьте POST-запрос на `/api/v1/network-drives/{network_drive_id}/unmount`.
     * @param {String} networkDriveId ID сетевого диска
     * @param {module:api/NetworkDrivesApi~unmountNetworkDriveCallback} callback The callback function, accepting three arguments: error, data, response
     */
    unmountNetworkDrive(networkDriveId, callback) {
      let postBody = null;
      // verify the required parameter 'networkDriveId' is set
      if (networkDriveId === undefined || networkDriveId === null) {
        throw new Error("Missing the required parameter 'networkDriveId' when calling unmountNetworkDrive");
      }

      let pathParams = {
        'network-drive-id': networkDriveId
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
        '/api/v1/network-drives/{network_drive_id}/unmount', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the updateNetworkDrive operation.
     * @callback module:api/NetworkDrivesApi~updateNetworkDriveCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateNetworkDrive201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Изменение сетевого диска по ID
     * Чтобы изменить сетевой диск, отправьте PATCH-запрос на `/api/v1/network-drives/{network_drive_id}`
     * @param {String} networkDriveId ID сетевого диска
     * @param {module:model/UpdateNetworkDrive} updateNetworkDrive 
     * @param {module:api/NetworkDrivesApi~updateNetworkDriveCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateNetworkDrive201Response}
     */
    updateNetworkDrive(networkDriveId, updateNetworkDrive, callback) {
      let postBody = updateNetworkDrive;
      // verify the required parameter 'networkDriveId' is set
      if (networkDriveId === undefined || networkDriveId === null) {
        throw new Error("Missing the required parameter 'networkDriveId' when calling updateNetworkDrive");
      }
      // verify the required parameter 'updateNetworkDrive' is set
      if (updateNetworkDrive === undefined || updateNetworkDrive === null) {
        throw new Error("Missing the required parameter 'updateNetworkDrive' when calling updateNetworkDrive");
      }

      let pathParams = {
        'network-drive-id': networkDriveId
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
      let returnType = CreateNetworkDrive201Response;
      return this.apiClient.callApi(
        '/api/v1/network-drives/{network_drive_id}', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}
