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
import AddServerIP201Response from '../model/AddServerIP201Response';
import AddServerIPRequest from '../model/AddServerIPRequest';
import AutoBackup from '../model/AutoBackup';
import CreateDatabaseBackup409Response from '../model/CreateDatabaseBackup409Response';
import CreateServer from '../model/CreateServer';
import CreateServer201Response from '../model/CreateServer201Response';
import CreateServerDisk201Response from '../model/CreateServerDisk201Response';
import CreateServerDiskBackup201Response from '../model/CreateServerDiskBackup201Response';
import CreateServerDiskBackupRequest from '../model/CreateServerDiskBackupRequest';
import CreateServerDiskRequest from '../model/CreateServerDiskRequest';
import DeleteServer200Response from '../model/DeleteServer200Response';
import DeleteServerIPRequest from '../model/DeleteServerIPRequest';
import GetConfigurators200Response from '../model/GetConfigurators200Response';
import GetFinances400Response from '../model/GetFinances400Response';
import GetFinances401Response from '../model/GetFinances401Response';
import GetFinances403Response from '../model/GetFinances403Response';
import GetFinances429Response from '../model/GetFinances429Response';
import GetFinances500Response from '../model/GetFinances500Response';
import GetImage404Response from '../model/GetImage404Response';
import GetOsList200Response from '../model/GetOsList200Response';
import GetServerDiskAutoBackupSettings200Response from '../model/GetServerDiskAutoBackupSettings200Response';
import GetServerDiskBackup200Response from '../model/GetServerDiskBackup200Response';
import GetServerDiskBackups200Response from '../model/GetServerDiskBackups200Response';
import GetServerDisks200Response from '../model/GetServerDisks200Response';
import GetServerIPs200Response from '../model/GetServerIPs200Response';
import GetServerLogs200Response from '../model/GetServerLogs200Response';
import GetServerStatistics200Response from '../model/GetServerStatistics200Response';
import GetServerStatisticsNew200Response from '../model/GetServerStatisticsNew200Response';
import GetServers200Response from '../model/GetServers200Response';
import GetServersPresets200Response from '../model/GetServersPresets200Response';
import GetSoftware200Response from '../model/GetSoftware200Response';
import PerformActionOnBackupRequest from '../model/PerformActionOnBackupRequest';
import PerformActionOnServerRequest from '../model/PerformActionOnServerRequest';
import UpdateServer from '../model/UpdateServer';
import UpdateServerDiskBackupRequest from '../model/UpdateServerDiskBackupRequest';
import UpdateServerDiskRequest from '../model/UpdateServerDiskRequest';
import UpdateServerIPRequest from '../model/UpdateServerIPRequest';
import UpdateServerNATRequest from '../model/UpdateServerNATRequest';
import UpdateServerOSBootModeRequest from '../model/UpdateServerOSBootModeRequest';

/**
* Servers service.
* @module api/ServersApi
* @version 1.0.0
*/
export default class ServersApi {

    /**
    * Constructs a new ServersApi. 
    * @alias module:api/ServersApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }


    /**
     * Callback function to receive the result of the addServerIP operation.
     * @callback module:api/ServersApi~addServerIPCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AddServerIP201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Добавление IP-адреса сервера
     * Чтобы добавить IP-адрес сервера, отправьте POST-запрос на `/api/v1/servers/{server_id}/ips`. \\  На данный момент IPv6 доступны только для серверов с локацией `ru-1`.
     * @param {Number} serverId ID облачного сервера.
     * @param {module:model/AddServerIPRequest} addServerIPRequest 
     * @param {module:api/ServersApi~addServerIPCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/AddServerIP201Response}
     */
    addServerIP(serverId, addServerIPRequest, callback) {
      let postBody = addServerIPRequest;
      // verify the required parameter 'serverId' is set
      if (serverId === undefined || serverId === null) {
        throw new Error("Missing the required parameter 'serverId' when calling addServerIP");
      }
      // verify the required parameter 'addServerIPRequest' is set
      if (addServerIPRequest === undefined || addServerIPRequest === null) {
        throw new Error("Missing the required parameter 'addServerIPRequest' when calling addServerIP");
      }

      let pathParams = {
        'server_id': serverId
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
      let returnType = AddServerIP201Response;
      return this.apiClient.callApi(
        '/api/v1/servers/{server_id}/ips', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the cloneServer operation.
     * @callback module:api/ServersApi~cloneServerCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateServer201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Клонирование сервера
     * Чтобы клонировать сервер, отправьте POST-запрос на `/api/v1/servers/{server_id}/clone`.
     * @param {Number} serverId ID облачного сервера.
     * @param {module:api/ServersApi~cloneServerCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateServer201Response}
     */
    cloneServer(serverId, callback) {
      let postBody = null;
      // verify the required parameter 'serverId' is set
      if (serverId === undefined || serverId === null) {
        throw new Error("Missing the required parameter 'serverId' when calling cloneServer");
      }

      let pathParams = {
        'server_id': serverId
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
      let returnType = CreateServer201Response;
      return this.apiClient.callApi(
        '/api/v1/servers/{server_id}/clone', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the createServer operation.
     * @callback module:api/ServersApi~createServerCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateServer201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Создание сервера
     * Чтобы создать сервер, отправьте POST-запрос в `api/v1/servers`, задав необходимые атрибуты. Обязательно должен присутствовать один из параметров `configuration` или `preset_id`, а также `image_id` или `os_id`.  Cервер будет создан с использованием предоставленной информации. Тело ответа будет содержать объект JSON с информацией о созданном сервере.
     * @param {module:model/CreateServer} createServer 
     * @param {module:api/ServersApi~createServerCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateServer201Response}
     */
    createServer(createServer, callback) {
      let postBody = createServer;
      // verify the required parameter 'createServer' is set
      if (createServer === undefined || createServer === null) {
        throw new Error("Missing the required parameter 'createServer' when calling createServer");
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
      let returnType = CreateServer201Response;
      return this.apiClient.callApi(
        '/api/v1/servers', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the createServerDisk operation.
     * @callback module:api/ServersApi~createServerDiskCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateServerDisk201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Создание диска сервера
     * Чтобы создать диск сервера, отправьте POST-запрос на `/api/v1/servers/{server_id}/disks`. Системный диск создать нельзя.
     * @param {Number} serverId ID облачного сервера.
     * @param {Object} opts Optional parameters
     * @param {module:model/CreateServerDiskRequest} [createServerDiskRequest] 
     * @param {module:api/ServersApi~createServerDiskCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateServerDisk201Response}
     */
    createServerDisk(serverId, opts, callback) {
      opts = opts || {};
      let postBody = opts['createServerDiskRequest'];
      // verify the required parameter 'serverId' is set
      if (serverId === undefined || serverId === null) {
        throw new Error("Missing the required parameter 'serverId' when calling createServerDisk");
      }

      let pathParams = {
        'server_id': serverId
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
      let returnType = CreateServerDisk201Response;
      return this.apiClient.callApi(
        '/api/v1/servers/{server_id}/disks', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the createServerDiskBackup operation.
     * @callback module:api/ServersApi~createServerDiskBackupCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateServerDiskBackup201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Создание бэкапа диска сервера
     * Чтобы создать бэкап диска сервера, отправьте POST-запрос на `/api/v1/servers/{server_id}/disks/{disk_id}/backups`.   Тело ответа будет представлять собой объект JSON с ключом `backup`.
     * @param {Number} serverId ID облачного сервера.
     * @param {Number} diskId ID диска сервера.
     * @param {Object} opts Optional parameters
     * @param {module:model/CreateServerDiskBackupRequest} [createServerDiskBackupRequest] 
     * @param {module:api/ServersApi~createServerDiskBackupCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateServerDiskBackup201Response}
     */
    createServerDiskBackup(serverId, diskId, opts, callback) {
      opts = opts || {};
      let postBody = opts['createServerDiskBackupRequest'];
      // verify the required parameter 'serverId' is set
      if (serverId === undefined || serverId === null) {
        throw new Error("Missing the required parameter 'serverId' when calling createServerDiskBackup");
      }
      // verify the required parameter 'diskId' is set
      if (diskId === undefined || diskId === null) {
        throw new Error("Missing the required parameter 'diskId' when calling createServerDiskBackup");
      }

      let pathParams = {
        'server_id': serverId,
        'disk_id': diskId
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
      let returnType = CreateServerDiskBackup201Response;
      return this.apiClient.callApi(
        '/api/v1/servers/{server_id}/disks/{disk_id}/backups', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteServer operation.
     * @callback module:api/ServersApi~deleteServerCallback
     * @param {String} error Error message, if any.
     * @param {module:model/DeleteServer200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Удаление сервера
     * Чтобы удалить сервер, отправьте запрос DELETE в `/api/v1/servers/{server_id}`.\\  Обратите внимание, если на аккаунте включено удаление серверов по смс, то вернется ошибка 423.
     * @param {Number} serverId ID облачного сервера.
     * @param {Object} opts Optional parameters
     * @param {String} [hash] Хеш, который совместно с кодом авторизации надо отправить для удаления, если включено подтверждение удаления сервисов через Телеграм.
     * @param {String} [code] Код подтверждения, который придет к вам в Телеграм, после запроса удаления, если включено подтверждение удаления сервисов.  При помощи API токена сервисы можно удалять без подтверждения, если параметр токена `is_able_to_delete` установлен в значение `true`
     * @param {module:api/ServersApi~deleteServerCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/DeleteServer200Response}
     */
    deleteServer(serverId, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'serverId' is set
      if (serverId === undefined || serverId === null) {
        throw new Error("Missing the required parameter 'serverId' when calling deleteServer");
      }

      let pathParams = {
        'server_id': serverId
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
      let returnType = DeleteServer200Response;
      return this.apiClient.callApi(
        '/api/v1/servers/{server_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteServerDisk operation.
     * @callback module:api/ServersApi~deleteServerDiskCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Удаление диска сервера
     * Чтобы удалить диск сервера, отправьте DELETE-запрос на `/api/v1/servers/{server_id}/disks/{disk_id}`. Нельзя удалять системный диск.
     * @param {Number} serverId ID облачного сервера.
     * @param {Number} diskId ID диска сервера.
     * @param {module:api/ServersApi~deleteServerDiskCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteServerDisk(serverId, diskId, callback) {
      let postBody = null;
      // verify the required parameter 'serverId' is set
      if (serverId === undefined || serverId === null) {
        throw new Error("Missing the required parameter 'serverId' when calling deleteServerDisk");
      }
      // verify the required parameter 'diskId' is set
      if (diskId === undefined || diskId === null) {
        throw new Error("Missing the required parameter 'diskId' when calling deleteServerDisk");
      }

      let pathParams = {
        'server_id': serverId,
        'disk_id': diskId
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
        '/api/v1/servers/{server_id}/disks/{disk_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteServerDiskBackup operation.
     * @callback module:api/ServersApi~deleteServerDiskBackupCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Удаление бэкапа диска сервера
     * Чтобы удалить бэкап диска сервера, отправьте DELETE-запрос на `/api/v1/servers/{server_id}/disks/{disk_id}/backups/{backup_id}`.
     * @param {Number} serverId ID облачного сервера.
     * @param {Number} diskId ID диска сервера.
     * @param {Number} backupId ID бэкапа сервера.
     * @param {module:api/ServersApi~deleteServerDiskBackupCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteServerDiskBackup(serverId, diskId, backupId, callback) {
      let postBody = null;
      // verify the required parameter 'serverId' is set
      if (serverId === undefined || serverId === null) {
        throw new Error("Missing the required parameter 'serverId' when calling deleteServerDiskBackup");
      }
      // verify the required parameter 'diskId' is set
      if (diskId === undefined || diskId === null) {
        throw new Error("Missing the required parameter 'diskId' when calling deleteServerDiskBackup");
      }
      // verify the required parameter 'backupId' is set
      if (backupId === undefined || backupId === null) {
        throw new Error("Missing the required parameter 'backupId' when calling deleteServerDiskBackup");
      }

      let pathParams = {
        'server_id': serverId,
        'disk_id': diskId,
        'backup_id': backupId
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
        '/api/v1/servers/{server_id}/disks/{disk_id}/backups/{backup_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteServerIP operation.
     * @callback module:api/ServersApi~deleteServerIPCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Удаление IP-адреса сервера
     * Чтобы удалить IP-адрес сервера, отправьте DELETE-запрос на `/api/v1/servers/{server_id}/ips`. Нельзя удалить основной IP-адрес
     * @param {Number} serverId ID облачного сервера.
     * @param {module:model/DeleteServerIPRequest} deleteServerIPRequest 
     * @param {module:api/ServersApi~deleteServerIPCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteServerIP(serverId, deleteServerIPRequest, callback) {
      let postBody = deleteServerIPRequest;
      // verify the required parameter 'serverId' is set
      if (serverId === undefined || serverId === null) {
        throw new Error("Missing the required parameter 'serverId' when calling deleteServerIP");
      }
      // verify the required parameter 'deleteServerIPRequest' is set
      if (deleteServerIPRequest === undefined || deleteServerIPRequest === null) {
        throw new Error("Missing the required parameter 'deleteServerIPRequest' when calling deleteServerIP");
      }

      let pathParams = {
        'server_id': serverId
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
        '/api/v1/servers/{server_id}/ips', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getConfigurators operation.
     * @callback module:api/ServersApi~getConfiguratorsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetConfigurators200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка конфигураторов серверов
     * Чтобы получить список всех конфигураторов серверов, отправьте GET-запрос на `/api/v1/configurator/servers`.   Тело ответа будет представлять собой объект JSON с ключом `server_configurators`.
     * @param {module:api/ServersApi~getConfiguratorsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetConfigurators200Response}
     */
    getConfigurators(callback) {
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
      let returnType = GetConfigurators200Response;
      return this.apiClient.callApi(
        '/api/v1/configurator/servers', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getOsList operation.
     * @callback module:api/ServersApi~getOsListCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetOsList200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка операционных систем
     * Чтобы получить список всех операционных систем, отправьте GET-запрос на `/api/v1/os/servers`.   Тело ответа будет представлять собой объект JSON с ключом `servers_os`.
     * @param {module:api/ServersApi~getOsListCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetOsList200Response}
     */
    getOsList(callback) {
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
      let returnType = GetOsList200Response;
      return this.apiClient.callApi(
        '/api/v1/os/servers', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getServer operation.
     * @callback module:api/ServersApi~getServerCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateServer201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение сервера
     * Чтобы получить сервер, отправьте запрос GET в `/api/v1/servers/{server_id}`.
     * @param {Number} serverId ID облачного сервера.
     * @param {module:api/ServersApi~getServerCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateServer201Response}
     */
    getServer(serverId, callback) {
      let postBody = null;
      // verify the required parameter 'serverId' is set
      if (serverId === undefined || serverId === null) {
        throw new Error("Missing the required parameter 'serverId' when calling getServer");
      }

      let pathParams = {
        'server_id': serverId
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
      let returnType = CreateServer201Response;
      return this.apiClient.callApi(
        '/api/v1/servers/{server_id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getServerDisk operation.
     * @callback module:api/ServersApi~getServerDiskCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateServerDisk201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение диска сервера
     * Чтобы получить диск сервера, отправьте GET-запрос на `/api/v1/servers/{server_id}/disks/{disk_id}`.
     * @param {Number} serverId ID облачного сервера.
     * @param {Number} diskId ID диска сервера.
     * @param {module:api/ServersApi~getServerDiskCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateServerDisk201Response}
     */
    getServerDisk(serverId, diskId, callback) {
      let postBody = null;
      // verify the required parameter 'serverId' is set
      if (serverId === undefined || serverId === null) {
        throw new Error("Missing the required parameter 'serverId' when calling getServerDisk");
      }
      // verify the required parameter 'diskId' is set
      if (diskId === undefined || diskId === null) {
        throw new Error("Missing the required parameter 'diskId' when calling getServerDisk");
      }

      let pathParams = {
        'server_id': serverId,
        'disk_id': diskId
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
      let returnType = CreateServerDisk201Response;
      return this.apiClient.callApi(
        '/api/v1/servers/{server_id}/disks/{disk_id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getServerDiskAutoBackupSettings operation.
     * @callback module:api/ServersApi~getServerDiskAutoBackupSettingsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetServerDiskAutoBackupSettings200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получить настройки автобэкапов диска сервера
     * Чтобы полученить настройки автобэкапов диска сервера, отправьте GET-запрос на `/api/v1/servers/{server_id}/disks/{disk_id}/auto-backups`.
     * @param {Number} serverId ID облачного сервера.
     * @param {Number} diskId ID диска сервера.
     * @param {module:api/ServersApi~getServerDiskAutoBackupSettingsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetServerDiskAutoBackupSettings200Response}
     */
    getServerDiskAutoBackupSettings(serverId, diskId, callback) {
      let postBody = null;
      // verify the required parameter 'serverId' is set
      if (serverId === undefined || serverId === null) {
        throw new Error("Missing the required parameter 'serverId' when calling getServerDiskAutoBackupSettings");
      }
      // verify the required parameter 'diskId' is set
      if (diskId === undefined || diskId === null) {
        throw new Error("Missing the required parameter 'diskId' when calling getServerDiskAutoBackupSettings");
      }

      let pathParams = {
        'server_id': serverId,
        'disk_id': diskId
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
      let returnType = GetServerDiskAutoBackupSettings200Response;
      return this.apiClient.callApi(
        '/api/v1/servers/{server_id}/disks/{disk_id}/auto-backups', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getServerDiskBackup operation.
     * @callback module:api/ServersApi~getServerDiskBackupCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetServerDiskBackup200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение бэкапа диска сервера
     * Чтобы получить бэкап диска сервера, отправьте GET-запрос на `/api/v1/servers/{server_id}/disks/{disk_id}/backups/{backup_id}`.   Тело ответа будет представлять собой объект JSON с ключом `backup`.
     * @param {Number} serverId ID облачного сервера.
     * @param {Number} diskId ID диска сервера.
     * @param {Number} backupId ID бэкапа сервера.
     * @param {module:api/ServersApi~getServerDiskBackupCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetServerDiskBackup200Response}
     */
    getServerDiskBackup(serverId, diskId, backupId, callback) {
      let postBody = null;
      // verify the required parameter 'serverId' is set
      if (serverId === undefined || serverId === null) {
        throw new Error("Missing the required parameter 'serverId' when calling getServerDiskBackup");
      }
      // verify the required parameter 'diskId' is set
      if (diskId === undefined || diskId === null) {
        throw new Error("Missing the required parameter 'diskId' when calling getServerDiskBackup");
      }
      // verify the required parameter 'backupId' is set
      if (backupId === undefined || backupId === null) {
        throw new Error("Missing the required parameter 'backupId' when calling getServerDiskBackup");
      }

      let pathParams = {
        'server_id': serverId,
        'disk_id': diskId,
        'backup_id': backupId
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
      let returnType = GetServerDiskBackup200Response;
      return this.apiClient.callApi(
        '/api/v1/servers/{server_id}/disks/{disk_id}/backups/{backup_id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getServerDiskBackups operation.
     * @callback module:api/ServersApi~getServerDiskBackupsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetServerDiskBackups200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка бэкапов диска сервера
     * Чтобы получить список бэкапов диска сервера, отправьте GET-запрос на `/api/v1/servers/{server_id}/disks/{disk_id}/backups`.   Тело ответа будет представлять собой объект JSON с ключом `backups`.
     * @param {Number} serverId ID облачного сервера.
     * @param {Number} diskId ID диска сервера.
     * @param {module:api/ServersApi~getServerDiskBackupsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetServerDiskBackups200Response}
     */
    getServerDiskBackups(serverId, diskId, callback) {
      let postBody = null;
      // verify the required parameter 'serverId' is set
      if (serverId === undefined || serverId === null) {
        throw new Error("Missing the required parameter 'serverId' when calling getServerDiskBackups");
      }
      // verify the required parameter 'diskId' is set
      if (diskId === undefined || diskId === null) {
        throw new Error("Missing the required parameter 'diskId' when calling getServerDiskBackups");
      }

      let pathParams = {
        'server_id': serverId,
        'disk_id': diskId
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
      let returnType = GetServerDiskBackups200Response;
      return this.apiClient.callApi(
        '/api/v1/servers/{server_id}/disks/{disk_id}/backups', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getServerDisks operation.
     * @callback module:api/ServersApi~getServerDisksCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetServerDisks200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка дисков сервера
     * Чтобы получить список дисков сервера, отправьте GET-запрос на `/api/v1/servers/{server_id}/disks`.
     * @param {Number} serverId ID облачного сервера.
     * @param {module:api/ServersApi~getServerDisksCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetServerDisks200Response}
     */
    getServerDisks(serverId, callback) {
      let postBody = null;
      // verify the required parameter 'serverId' is set
      if (serverId === undefined || serverId === null) {
        throw new Error("Missing the required parameter 'serverId' when calling getServerDisks");
      }

      let pathParams = {
        'server_id': serverId
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
      let returnType = GetServerDisks200Response;
      return this.apiClient.callApi(
        '/api/v1/servers/{server_id}/disks', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getServerIPs operation.
     * @callback module:api/ServersApi~getServerIPsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetServerIPs200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка IP-адресов сервера
     * Чтобы получить список IP-адресов сервера, отправьте GET-запрос на `/api/v1/servers/{server_id}/ips`. \\  На данный момент IPv6 доступны только для локации `ru-1`.
     * @param {Number} serverId ID облачного сервера.
     * @param {module:api/ServersApi~getServerIPsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetServerIPs200Response}
     */
    getServerIPs(serverId, callback) {
      let postBody = null;
      // verify the required parameter 'serverId' is set
      if (serverId === undefined || serverId === null) {
        throw new Error("Missing the required parameter 'serverId' when calling getServerIPs");
      }

      let pathParams = {
        'server_id': serverId
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
      let returnType = GetServerIPs200Response;
      return this.apiClient.callApi(
        '/api/v1/servers/{server_id}/ips', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getServerLogs operation.
     * @callback module:api/ServersApi~getServerLogsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetServerLogs200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка логов сервера
     * Чтобы получить список логов сервера, отправьте GET-запрос на `/api/v1/servers/{server_id}/logs`.
     * @param {Number} serverId ID облачного сервера.
     * @param {Object} opts Optional parameters
     * @param {Number} [limit = 100)] Обозначает количество записей, которое необходимо вернуть.
     * @param {Number} [offset = 0)] Указывает на смещение относительно начала списка.
     * @param {module:model/String} [order = 'asc')] Сортировка элементов по дате
     * @param {module:api/ServersApi~getServerLogsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetServerLogs200Response}
     */
    getServerLogs(serverId, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'serverId' is set
      if (serverId === undefined || serverId === null) {
        throw new Error("Missing the required parameter 'serverId' when calling getServerLogs");
      }

      let pathParams = {
        'server_id': serverId
      };
      let queryParams = {
        'limit': opts['limit'],
        'offset': opts['offset'],
        'order': opts['order']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = GetServerLogs200Response;
      return this.apiClient.callApi(
        '/api/v1/servers/{server_id}/logs', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getServerStatistics operation.
     * @callback module:api/ServersApi~getServerStatisticsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetServerStatistics200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение статистики сервера
     * Чтобы получить статистику сервера, отправьте GET-запрос на `/api/v1/servers/{server_id}/statistics`.
     * @param {Number} serverId ID облачного сервера.
     * @param {String} dateFrom Дата начала сбора статистики. Строка в формате ISO 8061, закодированная в ASCII, пример: `2023-05-25%202023-05-25T14%3A35%3A38`
     * @param {String} dateTo Дата окончания сбора статистики. Строка в формате ISO 8061, закодированная в ASCII, пример: `2023-05-26%202023-05-25T14%3A35%3A38`
     * @param {module:api/ServersApi~getServerStatisticsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetServerStatistics200Response}
     */
    getServerStatistics(serverId, dateFrom, dateTo, callback) {
      let postBody = null;
      // verify the required parameter 'serverId' is set
      if (serverId === undefined || serverId === null) {
        throw new Error("Missing the required parameter 'serverId' when calling getServerStatistics");
      }
      // verify the required parameter 'dateFrom' is set
      if (dateFrom === undefined || dateFrom === null) {
        throw new Error("Missing the required parameter 'dateFrom' when calling getServerStatistics");
      }
      // verify the required parameter 'dateTo' is set
      if (dateTo === undefined || dateTo === null) {
        throw new Error("Missing the required parameter 'dateTo' when calling getServerStatistics");
      }

      let pathParams = {
        'server_id': serverId
      };
      let queryParams = {
        'date_from': dateFrom,
        'date_to': dateTo
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = GetServerStatistics200Response;
      return this.apiClient.callApi(
        '/api/v1/servers/{server_id}/statistics', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getServerStatisticsNew operation.
     * @callback module:api/ServersApi~getServerStatisticsNewCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetServerStatisticsNew200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение статистики сервера
     * Чтобы получить статистику сервера, отправьте GET-запрос на `/api/v1/servers/{server_id}/statistics/{time_from}/{period}/{keys}`.
     * @param {Number} serverId ID облачного сервера.
     * @param {String} timeFrom Дата начала сбора статистики.
     * @param {String} period Количество часов за период которых нужна статистика.
     * @param {module:model/String} keys Ключи выбираемых видов статистики.
     * @param {module:api/ServersApi~getServerStatisticsNewCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetServerStatisticsNew200Response}
     */
    getServerStatisticsNew(serverId, timeFrom, period, keys, callback) {
      let postBody = null;
      // verify the required parameter 'serverId' is set
      if (serverId === undefined || serverId === null) {
        throw new Error("Missing the required parameter 'serverId' when calling getServerStatisticsNew");
      }
      // verify the required parameter 'timeFrom' is set
      if (timeFrom === undefined || timeFrom === null) {
        throw new Error("Missing the required parameter 'timeFrom' when calling getServerStatisticsNew");
      }
      // verify the required parameter 'period' is set
      if (period === undefined || period === null) {
        throw new Error("Missing the required parameter 'period' when calling getServerStatisticsNew");
      }
      // verify the required parameter 'keys' is set
      if (keys === undefined || keys === null) {
        throw new Error("Missing the required parameter 'keys' when calling getServerStatisticsNew");
      }

      let pathParams = {
        'server_id': serverId,
        'time_from': timeFrom,
        'period': period,
        'keys': keys
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
      let returnType = GetServerStatisticsNew200Response;
      return this.apiClient.callApi(
        '/api/v1/servers/{server_id}/statistics/{time_from}/{period}/{keys}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getServers operation.
     * @callback module:api/ServersApi~getServersCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetServers200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка серверов
     * Чтобы получить список серверов, отправьте GET-запрос на `/api/v1/servers`.   Тело ответа будет представлять собой объект JSON с ключом `servers`.
     * @param {Object} opts Optional parameters
     * @param {Number} [limit = 100)] Обозначает количество записей, которое необходимо вернуть.
     * @param {Number} [offset = 0)] Указывает на смещение относительно начала списка.
     * @param {module:api/ServersApi~getServersCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetServers200Response}
     */
    getServers(opts, callback) {
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
      let returnType = GetServers200Response;
      return this.apiClient.callApi(
        '/api/v1/servers', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getServersPresets operation.
     * @callback module:api/ServersApi~getServersPresetsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetServersPresets200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка тарифов серверов
     * Чтобы получить список всех тарифов серверов, отправьте GET-запрос на `/api/v1/presets/servers`.   Тело ответа будет представлять собой объект JSON с ключом `server_presets`.
     * @param {module:api/ServersApi~getServersPresetsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetServersPresets200Response}
     */
    getServersPresets(callback) {
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
      let returnType = GetServersPresets200Response;
      return this.apiClient.callApi(
        '/api/v1/presets/servers', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getSoftware operation.
     * @callback module:api/ServersApi~getSoftwareCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetSoftware200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка ПО из маркетплейса
     * Чтобы получить список ПО из маркетплейса, отправьте GET-запрос на `/api/v1/software/servers`.   Тело ответа будет представлять собой объект JSON с ключом `servers_software`.
     * @param {module:api/ServersApi~getSoftwareCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetSoftware200Response}
     */
    getSoftware(callback) {
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
      let returnType = GetSoftware200Response;
      return this.apiClient.callApi(
        '/api/v1/software/servers', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the hardShutdownServer operation.
     * @callback module:api/ServersApi~hardShutdownServerCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Принудительное выключение сервера
     * Чтобы выполнить принудительное выключение сервера, отправьте POST-запрос на `/api/v1/servers/{server_id}/hard-shutdown`.
     * @param {Number} serverId ID облачного сервера.
     * @param {module:api/ServersApi~hardShutdownServerCallback} callback The callback function, accepting three arguments: error, data, response
     */
    hardShutdownServer(serverId, callback) {
      let postBody = null;
      // verify the required parameter 'serverId' is set
      if (serverId === undefined || serverId === null) {
        throw new Error("Missing the required parameter 'serverId' when calling hardShutdownServer");
      }

      let pathParams = {
        'server_id': serverId
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
        '/api/v1/servers/{server_id}/hard-shutdown', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the imageUnmountAndServerReload operation.
     * @callback module:api/ServersApi~imageUnmountAndServerReloadCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Отмонтирование ISO образа и перезагрузка сервера
     * Чтобы отмонтировать ISO образ и перезагрузить сервер, отправьте POST-запрос на `/api/v1/servers/{server_id}/image-unmount`.
     * @param {Number} serverId ID облачного сервера.
     * @param {module:api/ServersApi~imageUnmountAndServerReloadCallback} callback The callback function, accepting three arguments: error, data, response
     */
    imageUnmountAndServerReload(serverId, callback) {
      let postBody = null;
      // verify the required parameter 'serverId' is set
      if (serverId === undefined || serverId === null) {
        throw new Error("Missing the required parameter 'serverId' when calling imageUnmountAndServerReload");
      }

      let pathParams = {
        'server_id': serverId
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
        '/api/v1/servers/{server_id}/image-unmount', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the performActionOnBackup operation.
     * @callback module:api/ServersApi~performActionOnBackupCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Выполнение действия над бэкапом диска сервера
     * Чтобы выполнить действие над бэкапом диска сервера, отправьте POST-запрос на `/api/v1/servers/{server_id}/disks/{disk_id}/backups/{backup_id}/action`.
     * @param {Number} serverId ID облачного сервера.
     * @param {Number} diskId ID диска сервера.
     * @param {Number} backupId ID бэкапа сервера.
     * @param {Object} opts Optional parameters
     * @param {module:model/PerformActionOnBackupRequest} [performActionOnBackupRequest] 
     * @param {module:api/ServersApi~performActionOnBackupCallback} callback The callback function, accepting three arguments: error, data, response
     */
    performActionOnBackup(serverId, diskId, backupId, opts, callback) {
      opts = opts || {};
      let postBody = opts['performActionOnBackupRequest'];
      // verify the required parameter 'serverId' is set
      if (serverId === undefined || serverId === null) {
        throw new Error("Missing the required parameter 'serverId' when calling performActionOnBackup");
      }
      // verify the required parameter 'diskId' is set
      if (diskId === undefined || diskId === null) {
        throw new Error("Missing the required parameter 'diskId' when calling performActionOnBackup");
      }
      // verify the required parameter 'backupId' is set
      if (backupId === undefined || backupId === null) {
        throw new Error("Missing the required parameter 'backupId' when calling performActionOnBackup");
      }

      let pathParams = {
        'server_id': serverId,
        'disk_id': diskId,
        'backup_id': backupId
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
        '/api/v1/servers/{server_id}/disks/{disk_id}/backups/{backup_id}/action', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the performActionOnServer operation.
     * @callback module:api/ServersApi~performActionOnServerCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Выполнение действия над сервером
     * Чтобы выполнить действие над сервером, отправьте POST-запрос на `/api/v1/servers/{server_id}/action`.
     * @param {Number} serverId ID облачного сервера.
     * @param {Object} opts Optional parameters
     * @param {module:model/PerformActionOnServerRequest} [performActionOnServerRequest] 
     * @param {module:api/ServersApi~performActionOnServerCallback} callback The callback function, accepting three arguments: error, data, response
     */
    performActionOnServer(serverId, opts, callback) {
      opts = opts || {};
      let postBody = opts['performActionOnServerRequest'];
      // verify the required parameter 'serverId' is set
      if (serverId === undefined || serverId === null) {
        throw new Error("Missing the required parameter 'serverId' when calling performActionOnServer");
      }

      let pathParams = {
        'server_id': serverId
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
        '/api/v1/servers/{server_id}/action', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the rebootServer operation.
     * @callback module:api/ServersApi~rebootServerCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Перезагрузка сервера
     * Чтобы перезагрузить сервер, отправьте POST-запрос на `/api/v1/servers/{server_id}/reboot`.
     * @param {Number} serverId ID облачного сервера.
     * @param {module:api/ServersApi~rebootServerCallback} callback The callback function, accepting three arguments: error, data, response
     */
    rebootServer(serverId, callback) {
      let postBody = null;
      // verify the required parameter 'serverId' is set
      if (serverId === undefined || serverId === null) {
        throw new Error("Missing the required parameter 'serverId' when calling rebootServer");
      }

      let pathParams = {
        'server_id': serverId
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
        '/api/v1/servers/{server_id}/reboot', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the resetServerPassword operation.
     * @callback module:api/ServersApi~resetServerPasswordCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Сброс пароля сервера
     * Чтобы сбросить пароль сервера, отправьте POST-запрос на `/api/v1/servers/{server_id}/reset-password`.
     * @param {Number} serverId ID облачного сервера.
     * @param {module:api/ServersApi~resetServerPasswordCallback} callback The callback function, accepting three arguments: error, data, response
     */
    resetServerPassword(serverId, callback) {
      let postBody = null;
      // verify the required parameter 'serverId' is set
      if (serverId === undefined || serverId === null) {
        throw new Error("Missing the required parameter 'serverId' when calling resetServerPassword");
      }

      let pathParams = {
        'server_id': serverId
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
        '/api/v1/servers/{server_id}/reset-password', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the shutdownServer operation.
     * @callback module:api/ServersApi~shutdownServerCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Выключение сервера
     * Чтобы выключить сервер, отправьте POST-запрос на `/api/v1/servers/{server_id}/shutdown`.
     * @param {Number} serverId ID облачного сервера.
     * @param {module:api/ServersApi~shutdownServerCallback} callback The callback function, accepting three arguments: error, data, response
     */
    shutdownServer(serverId, callback) {
      let postBody = null;
      // verify the required parameter 'serverId' is set
      if (serverId === undefined || serverId === null) {
        throw new Error("Missing the required parameter 'serverId' when calling shutdownServer");
      }

      let pathParams = {
        'server_id': serverId
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
        '/api/v1/servers/{server_id}/shutdown', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the startServer operation.
     * @callback module:api/ServersApi~startServerCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Запуск сервера
     * Чтобы запустить сервер, отправьте POST-запрос на `/api/v1/servers/{server_id}/start`.
     * @param {Number} serverId ID облачного сервера.
     * @param {module:api/ServersApi~startServerCallback} callback The callback function, accepting three arguments: error, data, response
     */
    startServer(serverId, callback) {
      let postBody = null;
      // verify the required parameter 'serverId' is set
      if (serverId === undefined || serverId === null) {
        throw new Error("Missing the required parameter 'serverId' when calling startServer");
      }

      let pathParams = {
        'server_id': serverId
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
        '/api/v1/servers/{server_id}/start', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the updateServer operation.
     * @callback module:api/ServersApi~updateServerCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateServer201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Изменение сервера
     * Чтобы обновить только определенные атрибуты сервера, отправьте запрос PATCH в `/api/v1/servers/{server_id}`.
     * @param {Number} serverId ID облачного сервера.
     * @param {module:model/UpdateServer} updateServer 
     * @param {module:api/ServersApi~updateServerCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateServer201Response}
     */
    updateServer(serverId, updateServer, callback) {
      let postBody = updateServer;
      // verify the required parameter 'serverId' is set
      if (serverId === undefined || serverId === null) {
        throw new Error("Missing the required parameter 'serverId' when calling updateServer");
      }
      // verify the required parameter 'updateServer' is set
      if (updateServer === undefined || updateServer === null) {
        throw new Error("Missing the required parameter 'updateServer' when calling updateServer");
      }

      let pathParams = {
        'server_id': serverId
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
      let returnType = CreateServer201Response;
      return this.apiClient.callApi(
        '/api/v1/servers/{server_id}', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the updateServerDisk operation.
     * @callback module:api/ServersApi~updateServerDiskCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateServerDisk201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Изменение параметров диска сервера
     * Чтобы изменить параметры диска сервера, отправьте PATCH-запрос на `/api/v1/servers/{server_id}/disks/{disk_id}`.
     * @param {Number} serverId ID облачного сервера.
     * @param {Number} diskId ID диска сервера.
     * @param {Object} opts Optional parameters
     * @param {module:model/UpdateServerDiskRequest} [updateServerDiskRequest] 
     * @param {module:api/ServersApi~updateServerDiskCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateServerDisk201Response}
     */
    updateServerDisk(serverId, diskId, opts, callback) {
      opts = opts || {};
      let postBody = opts['updateServerDiskRequest'];
      // verify the required parameter 'serverId' is set
      if (serverId === undefined || serverId === null) {
        throw new Error("Missing the required parameter 'serverId' when calling updateServerDisk");
      }
      // verify the required parameter 'diskId' is set
      if (diskId === undefined || diskId === null) {
        throw new Error("Missing the required parameter 'diskId' when calling updateServerDisk");
      }

      let pathParams = {
        'server_id': serverId,
        'disk_id': diskId
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
      let returnType = CreateServerDisk201Response;
      return this.apiClient.callApi(
        '/api/v1/servers/{server_id}/disks/{disk_id}', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the updateServerDiskAutoBackupSettings operation.
     * @callback module:api/ServersApi~updateServerDiskAutoBackupSettingsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetServerDiskAutoBackupSettings200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Изменение настроек автобэкапов диска сервера
     * Чтобы изменить настройки автобэкапов диска сервера, отправьте PATCH-запрос на `/api/v1/servers/{server_id}/disks/{disk_id}/auto-backups`.
     * @param {Number} serverId ID облачного сервера.
     * @param {Number} diskId ID диска сервера.
     * @param {Object} opts Optional parameters
     * @param {module:model/AutoBackup} [autoBackup] При значении `is_enabled`: `true`, поля `copy_count`, `creation_start_at`, `interval` являются обязательными
     * @param {module:api/ServersApi~updateServerDiskAutoBackupSettingsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetServerDiskAutoBackupSettings200Response}
     */
    updateServerDiskAutoBackupSettings(serverId, diskId, opts, callback) {
      opts = opts || {};
      let postBody = opts['autoBackup'];
      // verify the required parameter 'serverId' is set
      if (serverId === undefined || serverId === null) {
        throw new Error("Missing the required parameter 'serverId' when calling updateServerDiskAutoBackupSettings");
      }
      // verify the required parameter 'diskId' is set
      if (diskId === undefined || diskId === null) {
        throw new Error("Missing the required parameter 'diskId' when calling updateServerDiskAutoBackupSettings");
      }

      let pathParams = {
        'server_id': serverId,
        'disk_id': diskId
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
      let returnType = GetServerDiskAutoBackupSettings200Response;
      return this.apiClient.callApi(
        '/api/v1/servers/{server_id}/disks/{disk_id}/auto-backups', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the updateServerDiskBackup operation.
     * @callback module:api/ServersApi~updateServerDiskBackupCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetServerDiskBackup200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Изменение бэкапа диска сервера
     * Чтобы изменить бэкап диска сервера, отправьте PATCH-запрос на `/api/v1/servers/{server_id}/disks/{disk_id}/backups/{backup_id}`.
     * @param {Number} serverId ID облачного сервера.
     * @param {Number} diskId ID диска сервера.
     * @param {Number} backupId ID бэкапа сервера.
     * @param {Object} opts Optional parameters
     * @param {module:model/UpdateServerDiskBackupRequest} [updateServerDiskBackupRequest] 
     * @param {module:api/ServersApi~updateServerDiskBackupCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetServerDiskBackup200Response}
     */
    updateServerDiskBackup(serverId, diskId, backupId, opts, callback) {
      opts = opts || {};
      let postBody = opts['updateServerDiskBackupRequest'];
      // verify the required parameter 'serverId' is set
      if (serverId === undefined || serverId === null) {
        throw new Error("Missing the required parameter 'serverId' when calling updateServerDiskBackup");
      }
      // verify the required parameter 'diskId' is set
      if (diskId === undefined || diskId === null) {
        throw new Error("Missing the required parameter 'diskId' when calling updateServerDiskBackup");
      }
      // verify the required parameter 'backupId' is set
      if (backupId === undefined || backupId === null) {
        throw new Error("Missing the required parameter 'backupId' when calling updateServerDiskBackup");
      }

      let pathParams = {
        'server_id': serverId,
        'disk_id': diskId,
        'backup_id': backupId
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
      let returnType = GetServerDiskBackup200Response;
      return this.apiClient.callApi(
        '/api/v1/servers/{server_id}/disks/{disk_id}/backups/{backup_id}', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the updateServerIP operation.
     * @callback module:api/ServersApi~updateServerIPCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AddServerIP201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Изменение IP-адреса сервера
     * Чтобы изменить IP-адрес сервера, отправьте POST-запрос на `/api/v1/servers/{server_id}/ips`.
     * @param {Number} serverId ID облачного сервера.
     * @param {module:model/UpdateServerIPRequest} updateServerIPRequest 
     * @param {module:api/ServersApi~updateServerIPCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/AddServerIP201Response}
     */
    updateServerIP(serverId, updateServerIPRequest, callback) {
      let postBody = updateServerIPRequest;
      // verify the required parameter 'serverId' is set
      if (serverId === undefined || serverId === null) {
        throw new Error("Missing the required parameter 'serverId' when calling updateServerIP");
      }
      // verify the required parameter 'updateServerIPRequest' is set
      if (updateServerIPRequest === undefined || updateServerIPRequest === null) {
        throw new Error("Missing the required parameter 'updateServerIPRequest' when calling updateServerIP");
      }

      let pathParams = {
        'server_id': serverId
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
      let returnType = AddServerIP201Response;
      return this.apiClient.callApi(
        '/api/v1/servers/{server_id}/ips', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the updateServerNAT operation.
     * @callback module:api/ServersApi~updateServerNATCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Изменение правил маршрутизации трафика сервера (NAT)
     * Чтобы измененить правила маршрутизации трафика сервера (NAT), отправьте PATCH-запрос на `/api/v1/servers/{server_id}/local-networks/nat-mode`.
     * @param {Number} serverId ID облачного сервера.
     * @param {Object} opts Optional parameters
     * @param {module:model/UpdateServerNATRequest} [updateServerNATRequest] 
     * @param {module:api/ServersApi~updateServerNATCallback} callback The callback function, accepting three arguments: error, data, response
     */
    updateServerNAT(serverId, opts, callback) {
      opts = opts || {};
      let postBody = opts['updateServerNATRequest'];
      // verify the required parameter 'serverId' is set
      if (serverId === undefined || serverId === null) {
        throw new Error("Missing the required parameter 'serverId' when calling updateServerNAT");
      }

      let pathParams = {
        'server_id': serverId
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
        '/api/v1/servers/{server_id}/local-networks/nat-mode', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the updateServerOSBootMode operation.
     * @callback module:api/ServersApi~updateServerOSBootModeCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Выбор типа загрузки операционной системы сервера
     * Чтобы изменить тип загрузки операционной системы сервера, отправьте POST-запрос на `/api/v1/servers/{server_id}/boot-mode`. \\  После смены типа загрузки сервер будет перезапущен.
     * @param {Number} serverId ID облачного сервера.
     * @param {Object} opts Optional parameters
     * @param {module:model/UpdateServerOSBootModeRequest} [updateServerOSBootModeRequest] 
     * @param {module:api/ServersApi~updateServerOSBootModeCallback} callback The callback function, accepting three arguments: error, data, response
     */
    updateServerOSBootMode(serverId, opts, callback) {
      opts = opts || {};
      let postBody = opts['updateServerOSBootModeRequest'];
      // verify the required parameter 'serverId' is set
      if (serverId === undefined || serverId === null) {
        throw new Error("Missing the required parameter 'serverId' when calling updateServerOSBootMode");
      }

      let pathParams = {
        'server_id': serverId
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
        '/api/v1/servers/{server_id}/boot-mode', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}
