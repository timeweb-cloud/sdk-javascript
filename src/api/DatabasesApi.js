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
import AutoBackup from '../model/AutoBackup';
import CreateAdmin from '../model/CreateAdmin';
import CreateCluster from '../model/CreateCluster';
import CreateDatabase201Response from '../model/CreateDatabase201Response';
import CreateDatabaseBackup201Response from '../model/CreateDatabaseBackup201Response';
import CreateDatabaseBackup409Response from '../model/CreateDatabaseBackup409Response';
import CreateDatabaseCluster201Response from '../model/CreateDatabaseCluster201Response';
import CreateDatabaseInstance201Response from '../model/CreateDatabaseInstance201Response';
import CreateDatabaseUser201Response from '../model/CreateDatabaseUser201Response';
import CreateDb from '../model/CreateDb';
import CreateInstance from '../model/CreateInstance';
import DeleteDatabase200Response from '../model/DeleteDatabase200Response';
import DeleteDatabaseCluster200Response from '../model/DeleteDatabaseCluster200Response';
import GetDatabaseAutoBackupsSettings200Response from '../model/GetDatabaseAutoBackupsSettings200Response';
import GetDatabaseBackups200Response from '../model/GetDatabaseBackups200Response';
import GetDatabaseClusters200Response from '../model/GetDatabaseClusters200Response';
import GetDatabaseInstances200Response from '../model/GetDatabaseInstances200Response';
import GetDatabaseUsers200Response from '../model/GetDatabaseUsers200Response';
import GetDatabases200Response from '../model/GetDatabases200Response';
import GetDatabasesPresets200Response from '../model/GetDatabasesPresets200Response';
import GetFinances400Response from '../model/GetFinances400Response';
import GetFinances401Response from '../model/GetFinances401Response';
import GetFinances403Response from '../model/GetFinances403Response';
import GetFinances404Response from '../model/GetFinances404Response';
import GetFinances429Response from '../model/GetFinances429Response';
import GetFinances500Response from '../model/GetFinances500Response';
import UpdateAdmin from '../model/UpdateAdmin';
import UpdateCluster from '../model/UpdateCluster';
import UpdateDb from '../model/UpdateDb';
import UpdateInstance from '../model/UpdateInstance';

/**
* Databases service.
* @module api/DatabasesApi
* @version 1.0.0
*/
export default class DatabasesApi {

    /**
    * Constructs a new DatabasesApi. 
    * @alias module:api/DatabasesApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }


    /**
     * Callback function to receive the result of the createDatabase operation.
     * @callback module:api/DatabasesApi~createDatabaseCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateDatabase201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Создание базы данных
     * Чтобы создать базу данных на вашем аккаунте, отправьте POST-запрос на `/api/v1/dbs`, задав необходимые атрибуты.  База данных будет создана с использованием предоставленной информации. Тело ответа будет содержать объект JSON с информацией о созданной базе данных.
     * @param {module:model/CreateDb} createDb 
     * @param {module:api/DatabasesApi~createDatabaseCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateDatabase201Response}
     */
    createDatabase(createDb, callback) {
      let postBody = createDb;
      // verify the required parameter 'createDb' is set
      if (createDb === undefined || createDb === null) {
        throw new Error("Missing the required parameter 'createDb' when calling createDatabase");
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
      let returnType = CreateDatabase201Response;
      return this.apiClient.callApi(
        '/api/v1/dbs', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the createDatabaseBackup operation.
     * @callback module:api/DatabasesApi~createDatabaseBackupCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateDatabaseBackup201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Создание бэкапа базы данных
     * Чтобы создать бэкап базы данных, отправьте запрос POST в `api/v1/dbs/{db_id}/backups`. 
     * @param {Number} dbId Идентификатор базы данных
     * @param {module:api/DatabasesApi~createDatabaseBackupCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateDatabaseBackup201Response}
     */
    createDatabaseBackup(dbId, callback) {
      let postBody = null;
      // verify the required parameter 'dbId' is set
      if (dbId === undefined || dbId === null) {
        throw new Error("Missing the required parameter 'dbId' when calling createDatabaseBackup");
      }

      let pathParams = {
        'db_id': dbId
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
      let returnType = CreateDatabaseBackup201Response;
      return this.apiClient.callApi(
        '/api/v1/dbs/{db_id}/backups', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the createDatabaseCluster operation.
     * @callback module:api/DatabasesApi~createDatabaseClusterCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateDatabaseCluster201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Создание кластера базы данных
     * Чтобы создать кластер базы данных на вашем аккаунте, отправьте POST-запрос на `/api/v1/databases`.   Вместе с кластером будет создан один инстанс базы данных и один пользователь.
     * @param {module:model/CreateCluster} createCluster 
     * @param {module:api/DatabasesApi~createDatabaseClusterCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateDatabaseCluster201Response}
     */
    createDatabaseCluster(createCluster, callback) {
      let postBody = createCluster;
      // verify the required parameter 'createCluster' is set
      if (createCluster === undefined || createCluster === null) {
        throw new Error("Missing the required parameter 'createCluster' when calling createDatabaseCluster");
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
      let returnType = CreateDatabaseCluster201Response;
      return this.apiClient.callApi(
        '/api/v1/databases', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the createDatabaseInstance operation.
     * @callback module:api/DatabasesApi~createDatabaseInstanceCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateDatabaseInstance201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Создание инстанса базы данных
     * Чтобы создать инстанс базы данных, отправьте POST-запрос на `/api/v1/databases/{db_cluster_id}/instances`.
     * @param {Number} dbClusterId Идентификатор кластера базы данных
     * @param {module:model/CreateInstance} createInstance 
     * @param {module:api/DatabasesApi~createDatabaseInstanceCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateDatabaseInstance201Response}
     */
    createDatabaseInstance(dbClusterId, createInstance, callback) {
      let postBody = createInstance;
      // verify the required parameter 'dbClusterId' is set
      if (dbClusterId === undefined || dbClusterId === null) {
        throw new Error("Missing the required parameter 'dbClusterId' when calling createDatabaseInstance");
      }
      // verify the required parameter 'createInstance' is set
      if (createInstance === undefined || createInstance === null) {
        throw new Error("Missing the required parameter 'createInstance' when calling createDatabaseInstance");
      }

      let pathParams = {
        'db_cluster_id': dbClusterId
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
      let returnType = CreateDatabaseInstance201Response;
      return this.apiClient.callApi(
        '/api/v1/databases/{db_cluster_id}/instances', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the createDatabaseUser operation.
     * @callback module:api/DatabasesApi~createDatabaseUserCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateDatabaseUser201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Создание пользователя базы данных
     * Чтобы создать пользователя базы данных, отправьте POST-запрос на `/api/v1/databases/{db_cluster_id}/admins`.
     * @param {Number} dbClusterId Идентификатор кластера базы данных
     * @param {module:model/CreateAdmin} createAdmin 
     * @param {module:api/DatabasesApi~createDatabaseUserCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateDatabaseUser201Response}
     */
    createDatabaseUser(dbClusterId, createAdmin, callback) {
      let postBody = createAdmin;
      // verify the required parameter 'dbClusterId' is set
      if (dbClusterId === undefined || dbClusterId === null) {
        throw new Error("Missing the required parameter 'dbClusterId' when calling createDatabaseUser");
      }
      // verify the required parameter 'createAdmin' is set
      if (createAdmin === undefined || createAdmin === null) {
        throw new Error("Missing the required parameter 'createAdmin' when calling createDatabaseUser");
      }

      let pathParams = {
        'db_cluster_id': dbClusterId
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
      let returnType = CreateDatabaseUser201Response;
      return this.apiClient.callApi(
        '/api/v1/databases/{db_cluster_id}/admins', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteDatabase operation.
     * @callback module:api/DatabasesApi~deleteDatabaseCallback
     * @param {String} error Error message, if any.
     * @param {module:model/DeleteDatabase200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Удаление базы данных
     * Чтобы удалить базу данных, отправьте запрос DELETE в `api/v1/dbs/{db_id}`. 
     * @param {Number} dbId Идентификатор базы данных
     * @param {Object} opts Optional parameters
     * @param {String} [hash] Хеш, который совместно с кодом авторизации надо отправить для удаления, если включено подтверждение удаления сервисов через Телеграм.
     * @param {String} [code] Код подтверждения, который придет к вам в Телеграм, после запроса удаления, если включено подтверждение удаления сервисов.  При помощи API токена сервисы можно удалять без подтверждения, если параметр токена `is_able_to_delete` установлен в значение `true`
     * @param {module:api/DatabasesApi~deleteDatabaseCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/DeleteDatabase200Response}
     */
    deleteDatabase(dbId, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'dbId' is set
      if (dbId === undefined || dbId === null) {
        throw new Error("Missing the required parameter 'dbId' when calling deleteDatabase");
      }

      let pathParams = {
        'db_id': dbId
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
      let returnType = DeleteDatabase200Response;
      return this.apiClient.callApi(
        '/api/v1/dbs/{db_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteDatabaseBackup operation.
     * @callback module:api/DatabasesApi~deleteDatabaseBackupCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Удаление бэкапа базы данных
     * Чтобы удалить бэкап базы данных, отправьте запрос DELETE в `api/v1/dbs/{db_id}/backups/{backup_id}`. 
     * @param {Number} dbId Идентификатор базы данных
     * @param {Number} backupId Идентификатор резевной копии
     * @param {module:api/DatabasesApi~deleteDatabaseBackupCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteDatabaseBackup(dbId, backupId, callback) {
      let postBody = null;
      // verify the required parameter 'dbId' is set
      if (dbId === undefined || dbId === null) {
        throw new Error("Missing the required parameter 'dbId' when calling deleteDatabaseBackup");
      }
      // verify the required parameter 'backupId' is set
      if (backupId === undefined || backupId === null) {
        throw new Error("Missing the required parameter 'backupId' when calling deleteDatabaseBackup");
      }

      let pathParams = {
        'db_id': dbId,
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
        '/api/v1/dbs/{db_id}/backups/{backup_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteDatabaseCluster operation.
     * @callback module:api/DatabasesApi~deleteDatabaseClusterCallback
     * @param {String} error Error message, if any.
     * @param {module:model/DeleteDatabaseCluster200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Удаление кластера базы данных
     * Чтобы удалить кластер базы данных, отправьте DELETE-запрос на `/api/v1/databases/{db_cluster_id}`.
     * @param {Number} dbClusterId Идентификатор кластера базы данных
     * @param {Object} opts Optional parameters
     * @param {String} [hash] Хеш, который совместно с кодом авторизации надо отправить для удаления, если включено подтверждение удаления сервисов через Телеграм.
     * @param {String} [code] Код подтверждения, который придет к вам в Телеграм, после запроса удаления, если включено подтверждение удаления сервисов.  При помощи API токена сервисы можно удалять без подтверждения, если параметр токена `is_able_to_delete` установлен в значение `true`
     * @param {module:api/DatabasesApi~deleteDatabaseClusterCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/DeleteDatabaseCluster200Response}
     */
    deleteDatabaseCluster(dbClusterId, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'dbClusterId' is set
      if (dbClusterId === undefined || dbClusterId === null) {
        throw new Error("Missing the required parameter 'dbClusterId' when calling deleteDatabaseCluster");
      }

      let pathParams = {
        'db_cluster_id': dbClusterId
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
      let returnType = DeleteDatabaseCluster200Response;
      return this.apiClient.callApi(
        '/api/v1/databases/{db_cluster_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteDatabaseInstance operation.
     * @callback module:api/DatabasesApi~deleteDatabaseInstanceCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Удаление инстанса базы данных
     * Чтобы удалить инстанс базы данных, отправьте DELETE-запрос на `/api/v1/databases/{db_cluster_id}/instances/{instance_id}`.
     * @param {Number} dbClusterId Идентификатор кластера базы данных
     * @param {Number} instanceId Идентификатор инстанса базы данных
     * @param {module:api/DatabasesApi~deleteDatabaseInstanceCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteDatabaseInstance(dbClusterId, instanceId, callback) {
      let postBody = null;
      // verify the required parameter 'dbClusterId' is set
      if (dbClusterId === undefined || dbClusterId === null) {
        throw new Error("Missing the required parameter 'dbClusterId' when calling deleteDatabaseInstance");
      }
      // verify the required parameter 'instanceId' is set
      if (instanceId === undefined || instanceId === null) {
        throw new Error("Missing the required parameter 'instanceId' when calling deleteDatabaseInstance");
      }

      let pathParams = {
        'db_cluster_id': dbClusterId,
        'instance_id': instanceId
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
        '/api/v1/databases/{db_cluster_id}/instances/{instance_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteDatabaseUser operation.
     * @callback module:api/DatabasesApi~deleteDatabaseUserCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Удаление пользователя базы данных
     * Чтобы удалить пользователя базы данных на вашем аккаунте, отправьте DELETE-запрос на `/api/v1/databases/{db_cluster_id}/admins/{admin_id}`.
     * @param {Number} dbClusterId Идентификатор кластера базы данных
     * @param {Number} adminId Идентификатор пользователя базы данных
     * @param {module:api/DatabasesApi~deleteDatabaseUserCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteDatabaseUser(dbClusterId, adminId, callback) {
      let postBody = null;
      // verify the required parameter 'dbClusterId' is set
      if (dbClusterId === undefined || dbClusterId === null) {
        throw new Error("Missing the required parameter 'dbClusterId' when calling deleteDatabaseUser");
      }
      // verify the required parameter 'adminId' is set
      if (adminId === undefined || adminId === null) {
        throw new Error("Missing the required parameter 'adminId' when calling deleteDatabaseUser");
      }

      let pathParams = {
        'db_cluster_id': dbClusterId,
        'admin_id': adminId
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
        '/api/v1/databases/{db_cluster_id}/admins/{admin_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getDatabase operation.
     * @callback module:api/DatabasesApi~getDatabaseCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateDatabase201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение базы данных
     * Чтобы отобразить информацию об отдельной базе данных, отправьте запрос GET на `api/v1/dbs/{db_id}`. 
     * @param {Number} dbId Идентификатор базы данных
     * @param {module:api/DatabasesApi~getDatabaseCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateDatabase201Response}
     */
    getDatabase(dbId, callback) {
      let postBody = null;
      // verify the required parameter 'dbId' is set
      if (dbId === undefined || dbId === null) {
        throw new Error("Missing the required parameter 'dbId' when calling getDatabase");
      }

      let pathParams = {
        'db_id': dbId
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
      let returnType = CreateDatabase201Response;
      return this.apiClient.callApi(
        '/api/v1/dbs/{db_id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getDatabaseAutoBackupsSettings operation.
     * @callback module:api/DatabasesApi~getDatabaseAutoBackupsSettingsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetDatabaseAutoBackupsSettings200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение настроек автобэкапов базы данных
     * Чтобы получить список настроек автобэкапов базы данных, отправьте запрос GET в `api/v1/dbs/{db_id}/auto-backups`
     * @param {Number} dbId Идентификатор базы данных
     * @param {module:api/DatabasesApi~getDatabaseAutoBackupsSettingsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetDatabaseAutoBackupsSettings200Response}
     */
    getDatabaseAutoBackupsSettings(dbId, callback) {
      let postBody = null;
      // verify the required parameter 'dbId' is set
      if (dbId === undefined || dbId === null) {
        throw new Error("Missing the required parameter 'dbId' when calling getDatabaseAutoBackupsSettings");
      }

      let pathParams = {
        'db_id': dbId
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
      let returnType = GetDatabaseAutoBackupsSettings200Response;
      return this.apiClient.callApi(
        '/api/v1/dbs/{db_id}/auto-backups', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getDatabaseBackup operation.
     * @callback module:api/DatabasesApi~getDatabaseBackupCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateDatabaseBackup201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение бэкапа базы данных
     * Чтобы получить бэкап базы данных, отправьте запрос GET в `api/v1/dbs/{db_id}/backups/{backup_id}`. 
     * @param {Number} dbId Идентификатор базы данных
     * @param {Number} backupId Идентификатор резевной копии
     * @param {module:api/DatabasesApi~getDatabaseBackupCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateDatabaseBackup201Response}
     */
    getDatabaseBackup(dbId, backupId, callback) {
      let postBody = null;
      // verify the required parameter 'dbId' is set
      if (dbId === undefined || dbId === null) {
        throw new Error("Missing the required parameter 'dbId' when calling getDatabaseBackup");
      }
      // verify the required parameter 'backupId' is set
      if (backupId === undefined || backupId === null) {
        throw new Error("Missing the required parameter 'backupId' when calling getDatabaseBackup");
      }

      let pathParams = {
        'db_id': dbId,
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
      let returnType = CreateDatabaseBackup201Response;
      return this.apiClient.callApi(
        '/api/v1/dbs/{db_id}/backups/{backup_id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getDatabaseBackups operation.
     * @callback module:api/DatabasesApi~getDatabaseBackupsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetDatabaseBackups200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Список бэкапов базы данных
     * Чтобы получить список бэкапов базы данных, отправьте запрос GET в `api/v1/dbs/{db_id}/backups`. 
     * @param {Number} dbId Идентификатор базы данных
     * @param {Object} opts Optional parameters
     * @param {Number} [limit = 100)] Обозначает количество записей, которое необходимо вернуть.
     * @param {Number} [offset = 0)] Указывает на смещение относительно начала списка.
     * @param {module:api/DatabasesApi~getDatabaseBackupsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetDatabaseBackups200Response}
     */
    getDatabaseBackups(dbId, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'dbId' is set
      if (dbId === undefined || dbId === null) {
        throw new Error("Missing the required parameter 'dbId' when calling getDatabaseBackups");
      }

      let pathParams = {
        'db_id': dbId
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
      let returnType = GetDatabaseBackups200Response;
      return this.apiClient.callApi(
        '/api/v1/dbs/{db_id}/backups', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getDatabaseCluster operation.
     * @callback module:api/DatabasesApi~getDatabaseClusterCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateDatabaseCluster201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение кластера базы данных
     * Чтобы получить кластер базы данных на вашем аккаунте, отправьте GET-запрос на `/api/v1/databases/{db_cluster_id}`.
     * @param {Number} dbClusterId Идентификатор кластера базы данных
     * @param {module:api/DatabasesApi~getDatabaseClusterCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateDatabaseCluster201Response}
     */
    getDatabaseCluster(dbClusterId, callback) {
      let postBody = null;
      // verify the required parameter 'dbClusterId' is set
      if (dbClusterId === undefined || dbClusterId === null) {
        throw new Error("Missing the required parameter 'dbClusterId' when calling getDatabaseCluster");
      }

      let pathParams = {
        'db_cluster_id': dbClusterId
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
      let returnType = CreateDatabaseCluster201Response;
      return this.apiClient.callApi(
        '/api/v1/databases/{db_cluster_id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getDatabaseClusters operation.
     * @callback module:api/DatabasesApi~getDatabaseClustersCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetDatabaseClusters200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка кластеров баз данных
     * Чтобы получить список кластеров баз данных, отправьте GET-запрос на `/api/v1/databases`.   Тело ответа будет представлять собой объект JSON с ключом `dbs`.
     * @param {Object} opts Optional parameters
     * @param {Number} [limit = 100)] Обозначает количество записей, которое необходимо вернуть.
     * @param {Number} [offset = 0)] Указывает на смещение относительно начала списка.
     * @param {module:api/DatabasesApi~getDatabaseClustersCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetDatabaseClusters200Response}
     */
    getDatabaseClusters(opts, callback) {
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
      let returnType = GetDatabaseClusters200Response;
      return this.apiClient.callApi(
        '/api/v1/databases', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getDatabaseInstance operation.
     * @callback module:api/DatabasesApi~getDatabaseInstanceCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateDatabaseInstance201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение инстанса базы данных
     * Чтобы получить инстанс базы данных, отправьте GET-запрос на `/api/v1/databases/{db_cluster_id}/instances/{instance_id}`.
     * @param {Number} dbClusterId Идентификатор кластера базы данных
     * @param {Number} instanceId Идентификатор инстанса базы данных
     * @param {module:api/DatabasesApi~getDatabaseInstanceCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateDatabaseInstance201Response}
     */
    getDatabaseInstance(dbClusterId, instanceId, callback) {
      let postBody = null;
      // verify the required parameter 'dbClusterId' is set
      if (dbClusterId === undefined || dbClusterId === null) {
        throw new Error("Missing the required parameter 'dbClusterId' when calling getDatabaseInstance");
      }
      // verify the required parameter 'instanceId' is set
      if (instanceId === undefined || instanceId === null) {
        throw new Error("Missing the required parameter 'instanceId' when calling getDatabaseInstance");
      }

      let pathParams = {
        'db_cluster_id': dbClusterId,
        'instance_id': instanceId
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
      let returnType = CreateDatabaseInstance201Response;
      return this.apiClient.callApi(
        '/api/v1/databases/{db_cluster_id}/instances/{instance_id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getDatabaseInstances operation.
     * @callback module:api/DatabasesApi~getDatabaseInstancesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetDatabaseInstances200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка инстансов баз данных
     * Чтобы получить список баз данных на вашем аккаунте, отправьте GET-запрос на `/api/v1/databases/{db_cluster_id}/instances`.
     * @param {Number} dbClusterId Идентификатор кластера базы данных
     * @param {module:api/DatabasesApi~getDatabaseInstancesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetDatabaseInstances200Response}
     */
    getDatabaseInstances(dbClusterId, callback) {
      let postBody = null;
      // verify the required parameter 'dbClusterId' is set
      if (dbClusterId === undefined || dbClusterId === null) {
        throw new Error("Missing the required parameter 'dbClusterId' when calling getDatabaseInstances");
      }

      let pathParams = {
        'db_cluster_id': dbClusterId
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
      let returnType = GetDatabaseInstances200Response;
      return this.apiClient.callApi(
        '/api/v1/databases/{db_cluster_id}/instances', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getDatabaseUser operation.
     * @callback module:api/DatabasesApi~getDatabaseUserCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateDatabaseUser201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение пользователя базы данных
     * Чтобы получить пользователя базы данных на вашем аккаунте, отправьте GET-запрос на `/api/v1/databases/{db_cluster_id}/admins/{admin_id}`.
     * @param {Number} dbClusterId Идентификатор кластера базы данных
     * @param {Number} adminId Идентификатор пользователя базы данных
     * @param {module:api/DatabasesApi~getDatabaseUserCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateDatabaseUser201Response}
     */
    getDatabaseUser(dbClusterId, adminId, callback) {
      let postBody = null;
      // verify the required parameter 'dbClusterId' is set
      if (dbClusterId === undefined || dbClusterId === null) {
        throw new Error("Missing the required parameter 'dbClusterId' when calling getDatabaseUser");
      }
      // verify the required parameter 'adminId' is set
      if (adminId === undefined || adminId === null) {
        throw new Error("Missing the required parameter 'adminId' when calling getDatabaseUser");
      }

      let pathParams = {
        'db_cluster_id': dbClusterId,
        'admin_id': adminId
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
      let returnType = CreateDatabaseUser201Response;
      return this.apiClient.callApi(
        '/api/v1/databases/{db_cluster_id}/admins/{admin_id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getDatabaseUsers operation.
     * @callback module:api/DatabasesApi~getDatabaseUsersCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetDatabaseUsers200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка пользователей базы данных
     * Чтобы получить список пользователей базы данных на вашем аккаунте, отправьте GET-запрос на `/api/v1/databases/{db_cluster_id}/admins`.
     * @param {Number} dbClusterId Идентификатор кластера базы данных
     * @param {module:api/DatabasesApi~getDatabaseUsersCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetDatabaseUsers200Response}
     */
    getDatabaseUsers(dbClusterId, callback) {
      let postBody = null;
      // verify the required parameter 'dbClusterId' is set
      if (dbClusterId === undefined || dbClusterId === null) {
        throw new Error("Missing the required parameter 'dbClusterId' when calling getDatabaseUsers");
      }

      let pathParams = {
        'db_cluster_id': dbClusterId
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
      let returnType = GetDatabaseUsers200Response;
      return this.apiClient.callApi(
        '/api/v1/databases/{db_cluster_id}/admins', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getDatabases operation.
     * @callback module:api/DatabasesApi~getDatabasesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetDatabases200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка всех баз данных
     * Чтобы получить список всех баз данных на вашем аккаунте, отправьте GET-запрос на `/api/v1/dbs`.   Тело ответа будет представлять собой объект JSON с ключом `dbs`.
     * @param {Object} opts Optional parameters
     * @param {Number} [limit = 100)] Обозначает количество записей, которое необходимо вернуть.
     * @param {Number} [offset = 0)] Указывает на смещение относительно начала списка.
     * @param {module:api/DatabasesApi~getDatabasesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetDatabases200Response}
     */
    getDatabases(opts, callback) {
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
      let returnType = GetDatabases200Response;
      return this.apiClient.callApi(
        '/api/v1/dbs', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getDatabasesPresets operation.
     * @callback module:api/DatabasesApi~getDatabasesPresetsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetDatabasesPresets200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка тарифов для баз данных
     * Чтобы получить список тарифов для баз данных, отправьте GET-запрос на `/api/v1/presets/dbs`.   Тело ответа будет представлять собой объект JSON с ключом `databases_presets`.
     * @param {module:api/DatabasesApi~getDatabasesPresetsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetDatabasesPresets200Response}
     */
    getDatabasesPresets(callback) {
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
      let returnType = GetDatabasesPresets200Response;
      return this.apiClient.callApi(
        '/api/v1/presets/dbs', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the restoreDatabaseFromBackup operation.
     * @callback module:api/DatabasesApi~restoreDatabaseFromBackupCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Восстановление базы данных из бэкапа
     * Чтобы восстановить базу данных из бэкапа, отправьте запрос PUT в `api/v1/dbs/{db_id}/backups/{backup_id}`. 
     * @param {Number} dbId Идентификатор базы данных
     * @param {Number} backupId Идентификатор резевной копии
     * @param {module:api/DatabasesApi~restoreDatabaseFromBackupCallback} callback The callback function, accepting three arguments: error, data, response
     */
    restoreDatabaseFromBackup(dbId, backupId, callback) {
      let postBody = null;
      // verify the required parameter 'dbId' is set
      if (dbId === undefined || dbId === null) {
        throw new Error("Missing the required parameter 'dbId' when calling restoreDatabaseFromBackup");
      }
      // verify the required parameter 'backupId' is set
      if (backupId === undefined || backupId === null) {
        throw new Error("Missing the required parameter 'backupId' when calling restoreDatabaseFromBackup");
      }

      let pathParams = {
        'db_id': dbId,
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
        '/api/v1/dbs/{db_id}/backups/{backup_id}', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the updateDatabase operation.
     * @callback module:api/DatabasesApi~updateDatabaseCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateDatabase201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Обновление базы данных
     * Чтобы обновить только определенные атрибуты базы данных, отправьте запрос PATCH в `api/v1/dbs/{db_id}`. 
     * @param {Number} dbId Идентификатор базы данных
     * @param {module:model/UpdateDb} updateDb 
     * @param {module:api/DatabasesApi~updateDatabaseCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateDatabase201Response}
     */
    updateDatabase(dbId, updateDb, callback) {
      let postBody = updateDb;
      // verify the required parameter 'dbId' is set
      if (dbId === undefined || dbId === null) {
        throw new Error("Missing the required parameter 'dbId' when calling updateDatabase");
      }
      // verify the required parameter 'updateDb' is set
      if (updateDb === undefined || updateDb === null) {
        throw new Error("Missing the required parameter 'updateDb' when calling updateDatabase");
      }

      let pathParams = {
        'db_id': dbId
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
      let returnType = CreateDatabase201Response;
      return this.apiClient.callApi(
        '/api/v1/dbs/{db_id}', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the updateDatabaseAutoBackupsSettings operation.
     * @callback module:api/DatabasesApi~updateDatabaseAutoBackupsSettingsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetDatabaseAutoBackupsSettings200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Изменение настроек автобэкапов базы данных
     * Чтобы изменить список настроек автобэкапов базы данных, отправьте запрос PATCH в `api/v1/dbs/{db_id}/auto-backups`
     * @param {Number} dbId Идентификатор базы данных
     * @param {Object} opts Optional parameters
     * @param {module:model/AutoBackup} [autoBackup] При значении `is_enabled`: `true`, поля `copy_count`, `creation_start_at`, `interval` являются обязательными
     * @param {module:api/DatabasesApi~updateDatabaseAutoBackupsSettingsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetDatabaseAutoBackupsSettings200Response}
     */
    updateDatabaseAutoBackupsSettings(dbId, opts, callback) {
      opts = opts || {};
      let postBody = opts['autoBackup'];
      // verify the required parameter 'dbId' is set
      if (dbId === undefined || dbId === null) {
        throw new Error("Missing the required parameter 'dbId' when calling updateDatabaseAutoBackupsSettings");
      }

      let pathParams = {
        'db_id': dbId
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
      let returnType = GetDatabaseAutoBackupsSettings200Response;
      return this.apiClient.callApi(
        '/api/v1/dbs/{db_id}/auto-backups', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the updateDatabaseCluster operation.
     * @callback module:api/DatabasesApi~updateDatabaseClusterCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateDatabaseCluster201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Изменение кластера базы данных
     * Чтобы изменить кластер базы данных на вашем аккаунте, отправьте PATCH-запрос на `/api/v1/databases/{db_cluster_id}`.
     * @param {Number} dbClusterId Идентификатор кластера базы данных
     * @param {module:model/UpdateCluster} updateCluster 
     * @param {module:api/DatabasesApi~updateDatabaseClusterCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateDatabaseCluster201Response}
     */
    updateDatabaseCluster(dbClusterId, updateCluster, callback) {
      let postBody = updateCluster;
      // verify the required parameter 'dbClusterId' is set
      if (dbClusterId === undefined || dbClusterId === null) {
        throw new Error("Missing the required parameter 'dbClusterId' when calling updateDatabaseCluster");
      }
      // verify the required parameter 'updateCluster' is set
      if (updateCluster === undefined || updateCluster === null) {
        throw new Error("Missing the required parameter 'updateCluster' when calling updateDatabaseCluster");
      }

      let pathParams = {
        'db_cluster_id': dbClusterId
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
      let returnType = CreateDatabaseCluster201Response;
      return this.apiClient.callApi(
        '/api/v1/databases/{db_cluster_id}', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the updateDatabaseInstance operation.
     * @callback module:api/DatabasesApi~updateDatabaseInstanceCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateDatabaseInstance201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Изменение инстанса базы данных
     * Чтобы изменить инстанс базы данных, отправьте PATCH-запрос на `/api/v1/databases/{db_cluster_id}/instances/{instance_id}`.
     * @param {Number} dbClusterId Идентификатор кластера базы данных
     * @param {module:model/UpdateInstance} updateInstance 
     * @param {module:api/DatabasesApi~updateDatabaseInstanceCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateDatabaseInstance201Response}
     */
    updateDatabaseInstance(dbClusterId, updateInstance, callback) {
      let postBody = updateInstance;
      // verify the required parameter 'dbClusterId' is set
      if (dbClusterId === undefined || dbClusterId === null) {
        throw new Error("Missing the required parameter 'dbClusterId' when calling updateDatabaseInstance");
      }
      // verify the required parameter 'updateInstance' is set
      if (updateInstance === undefined || updateInstance === null) {
        throw new Error("Missing the required parameter 'updateInstance' when calling updateDatabaseInstance");
      }

      let pathParams = {
        'db_cluster_id': dbClusterId
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
      let returnType = CreateDatabaseInstance201Response;
      return this.apiClient.callApi(
        '/api/v1/databases/{db_cluster_id}/instances/{instance_id}', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the updateDatabaseUser operation.
     * @callback module:api/DatabasesApi~updateDatabaseUserCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateDatabaseUser201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Изменение пользователя базы данных
     * Чтобы изменить пользователя базы данных на вашем аккаунте, отправьте PATCH-запрос на `/api/v1/databases/{db_cluster_id}/admins/{admin_id}`.
     * @param {Number} dbClusterId Идентификатор кластера базы данных
     * @param {Number} adminId Идентификатор пользователя базы данных
     * @param {module:model/UpdateAdmin} updateAdmin 
     * @param {module:api/DatabasesApi~updateDatabaseUserCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateDatabaseUser201Response}
     */
    updateDatabaseUser(dbClusterId, adminId, updateAdmin, callback) {
      let postBody = updateAdmin;
      // verify the required parameter 'dbClusterId' is set
      if (dbClusterId === undefined || dbClusterId === null) {
        throw new Error("Missing the required parameter 'dbClusterId' when calling updateDatabaseUser");
      }
      // verify the required parameter 'adminId' is set
      if (adminId === undefined || adminId === null) {
        throw new Error("Missing the required parameter 'adminId' when calling updateDatabaseUser");
      }
      // verify the required parameter 'updateAdmin' is set
      if (updateAdmin === undefined || updateAdmin === null) {
        throw new Error("Missing the required parameter 'updateAdmin' when calling updateDatabaseUser");
      }

      let pathParams = {
        'db_cluster_id': dbClusterId,
        'admin_id': adminId
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
      let returnType = CreateDatabaseUser201Response;
      return this.apiClient.callApi(
        '/api/v1/databases/{db_cluster_id}/admins/{admin_id}', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}
