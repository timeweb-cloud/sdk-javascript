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
import AddGithub from '../model/AddGithub';
import AddProvider201Response from '../model/AddProvider201Response';
import AppsPresets from '../model/AppsPresets';
import AvailableFrameworks from '../model/AvailableFrameworks';
import CreateApp from '../model/CreateApp';
import CreateApp201Response from '../model/CreateApp201Response';
import CreateDatabaseBackup409Response from '../model/CreateDatabaseBackup409Response';
import CreateDeploy201Response from '../model/CreateDeploy201Response';
import CreateDeployRequest from '../model/CreateDeployRequest';
import GetApp200Response from '../model/GetApp200Response';
import GetAppDeploys200Response from '../model/GetAppDeploys200Response';
import GetAppLogs200Response from '../model/GetAppLogs200Response';
import GetApps200Response from '../model/GetApps200Response';
import GetBranches200Response from '../model/GetBranches200Response';
import GetCommits200Response from '../model/GetCommits200Response';
import GetDeployLogs200Response from '../model/GetDeployLogs200Response';
import GetDeploySettings200Response from '../model/GetDeploySettings200Response';
import GetFinances400Response from '../model/GetFinances400Response';
import GetFinances401Response from '../model/GetFinances401Response';
import GetFinances403Response from '../model/GetFinances403Response';
import GetFinances404Response from '../model/GetFinances404Response';
import GetFinances429Response from '../model/GetFinances429Response';
import GetFinances500Response from '../model/GetFinances500Response';
import GetProviders200Response from '../model/GetProviders200Response';
import GetRepositories200Response from '../model/GetRepositories200Response';
import GetServerStatistics200Response from '../model/GetServerStatistics200Response';
import UpdateAppSettings200Response from '../model/UpdateAppSettings200Response';
import UpdeteSettings from '../model/UpdeteSettings';

/**
* Apps service.
* @module api/AppsApi
* @version 1.0.0
*/
export default class AppsApi {

    /**
    * Constructs a new AppsApi. 
    * @alias module:api/AppsApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }


    /**
     * Callback function to receive the result of the addProvider operation.
     * @callback module:api/AppsApi~addProviderCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AddProvider201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Привязка vcs провайдера
     * Чтобы привязать аккаунт провайдера отправьте POST-запрос в `/api/v1/vcs-provider`, задав необходимые атрибуты.
     * @param {module:model/AddGithub} addGithub 
     * @param {module:api/AppsApi~addProviderCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/AddProvider201Response}
     */
    addProvider(addGithub, callback) {
      let postBody = addGithub;
      // verify the required parameter 'addGithub' is set
      if (addGithub === undefined || addGithub === null) {
        throw new Error("Missing the required parameter 'addGithub' when calling addProvider");
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
      let returnType = AddProvider201Response;
      return this.apiClient.callApi(
        '/api/v1/vcs-provider', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the createApp operation.
     * @callback module:api/AppsApi~createAppCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateApp201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Создание приложения
     * Чтобы создать приложение, отправьте POST-запрос в `/api/v1/apps`, задав необходимые атрибуты.
     * @param {module:model/CreateApp} createApp 
     * @param {module:api/AppsApi~createAppCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateApp201Response}
     */
    createApp(createApp, callback) {
      let postBody = createApp;
      // verify the required parameter 'createApp' is set
      if (createApp === undefined || createApp === null) {
        throw new Error("Missing the required parameter 'createApp' when calling createApp");
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
      let returnType = CreateApp201Response;
      return this.apiClient.callApi(
        '/api/v1/apps', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the createDeploy operation.
     * @callback module:api/AppsApi~createDeployCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateDeploy201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Запуск деплоя приложения
     * Чтобы запустить деплой приложения, отправьте POST-запрос в `/api/v1/apps/{app_id}/deploy`, задав необходимые атрибуты.
     * @param {String} appId 
     * @param {module:model/CreateDeployRequest} createDeployRequest 
     * @param {module:api/AppsApi~createDeployCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateDeploy201Response}
     */
    createDeploy(appId, createDeployRequest, callback) {
      let postBody = createDeployRequest;
      // verify the required parameter 'appId' is set
      if (appId === undefined || appId === null) {
        throw new Error("Missing the required parameter 'appId' when calling createDeploy");
      }
      // verify the required parameter 'createDeployRequest' is set
      if (createDeployRequest === undefined || createDeployRequest === null) {
        throw new Error("Missing the required parameter 'createDeployRequest' when calling createDeploy");
      }

      let pathParams = {
        'app_id': appId
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
      let returnType = CreateDeploy201Response;
      return this.apiClient.callApi(
        '/api/v1/apps/{app_id}/deploy', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteApp operation.
     * @callback module:api/AppsApi~deleteAppCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Удаление приложения
     * Чтобы удалить приложение, отправьте DELETE-запрос в `/api/v1/apps/{app_id}`.
     * @param {String} appId 
     * @param {module:api/AppsApi~deleteAppCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteApp(appId, callback) {
      let postBody = null;
      // verify the required parameter 'appId' is set
      if (appId === undefined || appId === null) {
        throw new Error("Missing the required parameter 'appId' when calling deleteApp");
      }

      let pathParams = {
        'app_id': appId
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
        '/api/v1/apps/{app_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteProvider operation.
     * @callback module:api/AppsApi~deleteProviderCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Отвязка vcs провайдера от аккаунта
     * Чтобы отвязать vcs провайдера от аккаунта, отправьте DELETE-запрос в `/api/v1/vcs-provider/{provider_id}`.
     * @param {String} providerId 
     * @param {module:api/AppsApi~deleteProviderCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteProvider(providerId, callback) {
      let postBody = null;
      // verify the required parameter 'providerId' is set
      if (providerId === undefined || providerId === null) {
        throw new Error("Missing the required parameter 'providerId' when calling deleteProvider");
      }

      let pathParams = {
        'provider_id': providerId
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
        '/api/v1/vcs-provider/{provider_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the deployAction operation.
     * @callback module:api/AppsApi~deployActionCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateDeploy201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Остановка деплоя приложения
     * Чтобы остановить деплой приложения, отправьте POST-запрос в `api/v1/apps/{app_id}/deploy/{deploy_id}/stop`.
     * @param {String} appId 
     * @param {String} deployId 
     * @param {module:api/AppsApi~deployActionCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateDeploy201Response}
     */
    deployAction(appId, deployId, callback) {
      let postBody = null;
      // verify the required parameter 'appId' is set
      if (appId === undefined || appId === null) {
        throw new Error("Missing the required parameter 'appId' when calling deployAction");
      }
      // verify the required parameter 'deployId' is set
      if (deployId === undefined || deployId === null) {
        throw new Error("Missing the required parameter 'deployId' when calling deployAction");
      }

      let pathParams = {
        'app_id': appId,
        'deploy_id': deployId
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
      let returnType = CreateDeploy201Response;
      return this.apiClient.callApi(
        '/api/v1/apps/{app_id}/deploy/{deploy_id}/stop', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getApp operation.
     * @callback module:api/AppsApi~getAppCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetApp200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение приложения по id
     * Чтобы получить приложение по id, отправьте GET-запрос на `/api/v1/apps/{app_id}`.
     * @param {String} appId 
     * @param {module:api/AppsApi~getAppCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetApp200Response}
     */
    getApp(appId, callback) {
      let postBody = null;
      // verify the required parameter 'appId' is set
      if (appId === undefined || appId === null) {
        throw new Error("Missing the required parameter 'appId' when calling getApp");
      }

      let pathParams = {
        'app_id': appId
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
      let returnType = GetApp200Response;
      return this.apiClient.callApi(
        '/api/v1/apps/{app_id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getAppDeploys operation.
     * @callback module:api/AppsApi~getAppDeploysCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetAppDeploys200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка деплоев приложения
     * Чтобы получить список деплоев приложения, отправьте GET-запрос на `/api/v1/apps/{app_id}/deploys`.
     * @param {String} appId 
     * @param {Object} opts Optional parameters
     * @param {Number} [limit = 5)] Обозначает количество записей, которое необходимо вернуть.
     * @param {Number} [offset = 0)] Указывает на смещение относительно начала списка.
     * @param {module:api/AppsApi~getAppDeploysCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetAppDeploys200Response}
     */
    getAppDeploys(appId, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'appId' is set
      if (appId === undefined || appId === null) {
        throw new Error("Missing the required parameter 'appId' when calling getAppDeploys");
      }

      let pathParams = {
        'app_id': appId
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
      let returnType = GetAppDeploys200Response;
      return this.apiClient.callApi(
        '/api/v1/apps/{app_id}/deploys', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getAppLogs operation.
     * @callback module:api/AppsApi~getAppLogsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetAppLogs200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение логов приложения
     * Чтобы получить логи приложения, отправьте GET-запрос на `/api/v1/apps/{app_id}/logs`.
     * @param {String} appId 
     * @param {module:api/AppsApi~getAppLogsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetAppLogs200Response}
     */
    getAppLogs(appId, callback) {
      let postBody = null;
      // verify the required parameter 'appId' is set
      if (appId === undefined || appId === null) {
        throw new Error("Missing the required parameter 'appId' when calling getAppLogs");
      }

      let pathParams = {
        'app_id': appId
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
      let returnType = GetAppLogs200Response;
      return this.apiClient.callApi(
        '/api/v1/apps/{app_id}/logs', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getAppStatistics operation.
     * @callback module:api/AppsApi~getAppStatisticsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetServerStatistics200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение статистики приложения
     * Чтобы получить статистику сервера, отправьте GET-запрос на `/api/v1/apps/{app_id}/statistics`. Метод поддерживает только приложения `type: backend`.
     * @param {String} appId 
     * @param {String} dateFrom Дата начала сбора статистики. Строка в формате ISO 8061, закодированная в ASCII, пример: `2023-05-25%202023-05-25T14%3A35%3A38`
     * @param {String} dateTo Дата окончания сбора статистики. Строка в формате ISO 8061, закодированная в ASCII, пример: `2023-05-26%202023-05-25T14%3A35%3A38`
     * @param {module:api/AppsApi~getAppStatisticsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetServerStatistics200Response}
     */
    getAppStatistics(appId, dateFrom, dateTo, callback) {
      let postBody = null;
      // verify the required parameter 'appId' is set
      if (appId === undefined || appId === null) {
        throw new Error("Missing the required parameter 'appId' when calling getAppStatistics");
      }
      // verify the required parameter 'dateFrom' is set
      if (dateFrom === undefined || dateFrom === null) {
        throw new Error("Missing the required parameter 'dateFrom' when calling getAppStatistics");
      }
      // verify the required parameter 'dateTo' is set
      if (dateTo === undefined || dateTo === null) {
        throw new Error("Missing the required parameter 'dateTo' when calling getAppStatistics");
      }

      let pathParams = {
        'app_id': appId
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
        '/api/v1/apps/{app_id}/statistics', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getApps operation.
     * @callback module:api/AppsApi~getAppsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetApps200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка приложений
     * Чтобы получить список приложений, отправьте GET-запрос на `/api/v1/apps`.
     * @param {module:api/AppsApi~getAppsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetApps200Response}
     */
    getApps(callback) {
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
      let returnType = GetApps200Response;
      return this.apiClient.callApi(
        '/api/v1/apps', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getAppsPresets operation.
     * @callback module:api/AppsApi~getAppsPresetsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AppsPresets} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка доступных тарифов для приложения
     * Чтобы получить список доступных тарифов, отправьте GET-запрос на `/api/v1/presets/apps`.
     * @param {String} appId 
     * @param {module:api/AppsApi~getAppsPresetsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/AppsPresets}
     */
    getAppsPresets(appId, callback) {
      let postBody = null;
      // verify the required parameter 'appId' is set
      if (appId === undefined || appId === null) {
        throw new Error("Missing the required parameter 'appId' when calling getAppsPresets");
      }

      let pathParams = {
        'app_id': appId
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
      let returnType = AppsPresets;
      return this.apiClient.callApi(
        '/api/v1/presets/apps', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getBranches operation.
     * @callback module:api/AppsApi~getBranchesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetBranches200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка веток репозитория
     * Чтобы получить список веток репозитория, отправьте GET-запрос на `/api/v1/vcs-provider/{provider_id}/repository/{repository_id}`.
     * @param {String} providerId 
     * @param {String} repositoryId 
     * @param {module:api/AppsApi~getBranchesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetBranches200Response}
     */
    getBranches(providerId, repositoryId, callback) {
      let postBody = null;
      // verify the required parameter 'providerId' is set
      if (providerId === undefined || providerId === null) {
        throw new Error("Missing the required parameter 'providerId' when calling getBranches");
      }
      // verify the required parameter 'repositoryId' is set
      if (repositoryId === undefined || repositoryId === null) {
        throw new Error("Missing the required parameter 'repositoryId' when calling getBranches");
      }

      let pathParams = {
        'provider_id': providerId,
        'repository_id': repositoryId
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
      let returnType = GetBranches200Response;
      return this.apiClient.callApi(
        '/api/v1/vcs-provider/{provider_id}/repository/{repository_id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getCommits operation.
     * @callback module:api/AppsApi~getCommitsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetCommits200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка коммитов ветки репозитория
     * Чтобы получить список коммитов ветки репозитория, отправьте GET-запрос на `/api/v1/vcs-provider/{provider_id}/repository/{repository_id}/branch`.
     * @param {String} accountId 
     * @param {String} providerId 
     * @param {String} repositoryId 
     * @param {String} name Название ветки
     * @param {module:api/AppsApi~getCommitsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetCommits200Response}
     */
    getCommits(accountId, providerId, repositoryId, name, callback) {
      let postBody = null;
      // verify the required parameter 'accountId' is set
      if (accountId === undefined || accountId === null) {
        throw new Error("Missing the required parameter 'accountId' when calling getCommits");
      }
      // verify the required parameter 'providerId' is set
      if (providerId === undefined || providerId === null) {
        throw new Error("Missing the required parameter 'providerId' when calling getCommits");
      }
      // verify the required parameter 'repositoryId' is set
      if (repositoryId === undefined || repositoryId === null) {
        throw new Error("Missing the required parameter 'repositoryId' when calling getCommits");
      }
      // verify the required parameter 'name' is set
      if (name === undefined || name === null) {
        throw new Error("Missing the required parameter 'name' when calling getCommits");
      }

      let pathParams = {
        'account_id': accountId,
        'provider_id': providerId,
        'repository_id': repositoryId
      };
      let queryParams = {
        'name': name
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = GetCommits200Response;
      return this.apiClient.callApi(
        '/api/v1/vcs-provider/{provider_id}/repository/{repository_id}/branch', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getDeployLogs operation.
     * @callback module:api/AppsApi~getDeployLogsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetDeployLogs200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение логов деплоя приложения
     * Чтобы получить информацию о деплое, отправьте GET-запрос на `/app/{app_id}/deploy/{deploy_id}`.
     * @param {String} appId 
     * @param {String} deployId 
     * @param {Object} opts Optional parameters
     * @param {Boolean} [debug] Управляет выводом логов деплоя
     * @param {module:api/AppsApi~getDeployLogsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetDeployLogs200Response}
     */
    getDeployLogs(appId, deployId, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'appId' is set
      if (appId === undefined || appId === null) {
        throw new Error("Missing the required parameter 'appId' when calling getDeployLogs");
      }
      // verify the required parameter 'deployId' is set
      if (deployId === undefined || deployId === null) {
        throw new Error("Missing the required parameter 'deployId' when calling getDeployLogs");
      }

      let pathParams = {
        'app_id': appId,
        'deploy_id': deployId
      };
      let queryParams = {
        'debug': opts['debug']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = GetDeployLogs200Response;
      return this.apiClient.callApi(
        '/api/v1/apps/{app_id}/deploy/{deploy_id}/logs', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getDeploySettings operation.
     * @callback module:api/AppsApi~getDeploySettingsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetDeploySettings200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка дефолтных настроек деплоя для приложения
     * Чтобы получить список настроек деплоя, отправьте GET-запрос на `/api/v1/deploy-settings/apps`.
     * @param {String} appId 
     * @param {module:api/AppsApi~getDeploySettingsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetDeploySettings200Response}
     */
    getDeploySettings(appId, callback) {
      let postBody = null;
      // verify the required parameter 'appId' is set
      if (appId === undefined || appId === null) {
        throw new Error("Missing the required parameter 'appId' when calling getDeploySettings");
      }

      let pathParams = {
        'app_id': appId
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
      let returnType = GetDeploySettings200Response;
      return this.apiClient.callApi(
        '/api/v1/deploy-settings/apps', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getFrameworks operation.
     * @callback module:api/AppsApi~getFrameworksCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AvailableFrameworks} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка доступных фреймворков для приложения
     * Чтобы получить список доступных фреймворков, отправьте GET-запрос на `/api/v1/frameworks/apps`.
     * @param {String} appId 
     * @param {module:api/AppsApi~getFrameworksCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/AvailableFrameworks}
     */
    getFrameworks(appId, callback) {
      let postBody = null;
      // verify the required parameter 'appId' is set
      if (appId === undefined || appId === null) {
        throw new Error("Missing the required parameter 'appId' when calling getFrameworks");
      }

      let pathParams = {
        'app_id': appId
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
      let returnType = AvailableFrameworks;
      return this.apiClient.callApi(
        '/api/v1/frameworks/apps', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getProviders operation.
     * @callback module:api/AppsApi~getProvidersCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetProviders200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка vcs провайдеров
     * Чтобы получить список vcs провайдеров, отправьте GET-запрос на `/api/v1/vcs-provider`.
     * @param {module:api/AppsApi~getProvidersCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetProviders200Response}
     */
    getProviders(callback) {
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
      let returnType = GetProviders200Response;
      return this.apiClient.callApi(
        '/api/v1/vcs-provider', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getRepositories operation.
     * @callback module:api/AppsApi~getRepositoriesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetRepositories200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка репозиториев vcs провайдера
     * Чтобы получить список репозиториев vcs провайдера, отправьте GET-запрос на `/api/v1/vcs-provider/{provider_id}`.
     * @param {String} providerId 
     * @param {module:api/AppsApi~getRepositoriesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetRepositories200Response}
     */
    getRepositories(providerId, callback) {
      let postBody = null;
      // verify the required parameter 'providerId' is set
      if (providerId === undefined || providerId === null) {
        throw new Error("Missing the required parameter 'providerId' when calling getRepositories");
      }

      let pathParams = {
        'provider_id': providerId
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
      let returnType = GetRepositories200Response;
      return this.apiClient.callApi(
        '/api/v1/vcs-provider/{provider_id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the updateAppSettings operation.
     * @callback module:api/AppsApi~updateAppSettingsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/UpdateAppSettings200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Изменение настроек приложения
     * Чтобы изменить настройки приложения отправьте PATCH-запрос в `/api/v1/apps/{app_id}`, задав необходимые атрибуты.
     * @param {String} appId 
     * @param {module:model/UpdeteSettings} updeteSettings 
     * @param {module:api/AppsApi~updateAppSettingsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/UpdateAppSettings200Response}
     */
    updateAppSettings(appId, updeteSettings, callback) {
      let postBody = updeteSettings;
      // verify the required parameter 'appId' is set
      if (appId === undefined || appId === null) {
        throw new Error("Missing the required parameter 'appId' when calling updateAppSettings");
      }
      // verify the required parameter 'updeteSettings' is set
      if (updeteSettings === undefined || updeteSettings === null) {
        throw new Error("Missing the required parameter 'updeteSettings' when calling updateAppSettings");
      }

      let pathParams = {
        'app_id': appId
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
      let returnType = UpdateAppSettings200Response;
      return this.apiClient.callApi(
        '/api/v1/apps/{app_id}', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the updateAppState operation.
     * @callback module:api/AppsApi~updateAppStateCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Изменение состояния приложения
     * Чтобы изменить состояние приложения отправьте PATCH-запрос в `/api/v1/apps/{app_id}/action/{action}`, задав необходимые атрибуты.
     * @param {String} appId 
     * @param {module:model/String} action 
     * @param {module:api/AppsApi~updateAppStateCallback} callback The callback function, accepting three arguments: error, data, response
     */
    updateAppState(appId, action, callback) {
      let postBody = null;
      // verify the required parameter 'appId' is set
      if (appId === undefined || appId === null) {
        throw new Error("Missing the required parameter 'appId' when calling updateAppState");
      }
      // verify the required parameter 'action' is set
      if (action === undefined || action === null) {
        throw new Error("Missing the required parameter 'action' when calling updateAppState");
      }

      let pathParams = {
        'app_id': appId,
        'action': action
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
        '/api/v1/apps/{app_id}/action/{action}', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}
