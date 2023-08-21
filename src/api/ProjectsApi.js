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
import AddBalancerToProject200Response from '../model/AddBalancerToProject200Response';
import AddBalancerToProjectRequest from '../model/AddBalancerToProjectRequest';
import AddClusterToProjectRequest from '../model/AddClusterToProjectRequest';
import AddDatabaseToProjectRequest from '../model/AddDatabaseToProjectRequest';
import AddDedicatedServerToProjectRequest from '../model/AddDedicatedServerToProjectRequest';
import AddServerToProjectRequest from '../model/AddServerToProjectRequest';
import AddStorageToProjectRequest from '../model/AddStorageToProjectRequest';
import CreateProject from '../model/CreateProject';
import CreateProject201Response from '../model/CreateProject201Response';
import GetAllProjectResources200Response from '../model/GetAllProjectResources200Response';
import GetFinances400Response from '../model/GetFinances400Response';
import GetFinances401Response from '../model/GetFinances401Response';
import GetFinances403Response from '../model/GetFinances403Response';
import GetFinances404Response from '../model/GetFinances404Response';
import GetFinances429Response from '../model/GetFinances429Response';
import GetFinances500Response from '../model/GetFinances500Response';
import GetProjectBalancers200Response from '../model/GetProjectBalancers200Response';
import GetProjectClusters200Response from '../model/GetProjectClusters200Response';
import GetProjectDatabases200Response from '../model/GetProjectDatabases200Response';
import GetProjectDedicatedServers200Response from '../model/GetProjectDedicatedServers200Response';
import GetProjectServers200Response from '../model/GetProjectServers200Response';
import GetProjectStorages200Response from '../model/GetProjectStorages200Response';
import GetProjects200Response from '../model/GetProjects200Response';
import ResourceTransfer from '../model/ResourceTransfer';
import UpdateProject from '../model/UpdateProject';

/**
* Projects service.
* @module api/ProjectsApi
* @version 1.0.0
*/
export default class ProjectsApi {

    /**
    * Constructs a new ProjectsApi. 
    * @alias module:api/ProjectsApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }


    /**
     * Callback function to receive the result of the addBalancerToProject operation.
     * @callback module:api/ProjectsApi~addBalancerToProjectCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AddBalancerToProject200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Добавление балансировщика в проект
     * Чтобы добавить балансировщик в проект, отправьте POST-запрос на `/api/v1/projects/{project_id}/resources/balancers`, задав необходимые атрибуты.  Балансировщик будет добавлен в указанный проект. Тело ответа будет содержать объект JSON с информацией о добавленном балансировщике.
     * @param {Number} projectId Уникальный идентификатор проекта.
     * @param {module:model/AddBalancerToProjectRequest} addBalancerToProjectRequest 
     * @param {module:api/ProjectsApi~addBalancerToProjectCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/AddBalancerToProject200Response}
     */
    addBalancerToProject(projectId, addBalancerToProjectRequest, callback) {
      let postBody = addBalancerToProjectRequest;
      // verify the required parameter 'projectId' is set
      if (projectId === undefined || projectId === null) {
        throw new Error("Missing the required parameter 'projectId' when calling addBalancerToProject");
      }
      // verify the required parameter 'addBalancerToProjectRequest' is set
      if (addBalancerToProjectRequest === undefined || addBalancerToProjectRequest === null) {
        throw new Error("Missing the required parameter 'addBalancerToProjectRequest' when calling addBalancerToProject");
      }

      let pathParams = {
        'project_id': projectId
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
      let returnType = AddBalancerToProject200Response;
      return this.apiClient.callApi(
        '/api/v1/projects/{project_id}/resources/balancers', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the addClusterToProject operation.
     * @callback module:api/ProjectsApi~addClusterToProjectCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AddBalancerToProject200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Добавление кластера в проект
     * Чтобы добавить кластер в проект, отправьте POST-запрос на `/api/v1/projects/{project_id}/resources/clusters`, задав необходимые атрибуты.  Кластер будет добавлен в указанный проект. Тело ответа будет содержать объект JSON с информацией о добавленном кластере.
     * @param {Number} projectId Уникальный идентификатор проекта.
     * @param {module:model/AddClusterToProjectRequest} addClusterToProjectRequest 
     * @param {module:api/ProjectsApi~addClusterToProjectCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/AddBalancerToProject200Response}
     */
    addClusterToProject(projectId, addClusterToProjectRequest, callback) {
      let postBody = addClusterToProjectRequest;
      // verify the required parameter 'projectId' is set
      if (projectId === undefined || projectId === null) {
        throw new Error("Missing the required parameter 'projectId' when calling addClusterToProject");
      }
      // verify the required parameter 'addClusterToProjectRequest' is set
      if (addClusterToProjectRequest === undefined || addClusterToProjectRequest === null) {
        throw new Error("Missing the required parameter 'addClusterToProjectRequest' when calling addClusterToProject");
      }

      let pathParams = {
        'project_id': projectId
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
      let returnType = AddBalancerToProject200Response;
      return this.apiClient.callApi(
        '/api/v1/projects/{project_id}/resources/clusters', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the addDatabaseToProject operation.
     * @callback module:api/ProjectsApi~addDatabaseToProjectCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AddBalancerToProject200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Добавление базы данных в проект
     * Чтобы добавить базу данных в проект, отправьте POST-запрос на `/api/v1/projects/{project_id}/resources/databases`, задав необходимые атрибуты.  База данных будет добавлена в указанный проект. Тело ответа будет содержать объект JSON с информацией о добавленной базе данных.
     * @param {Number} projectId Уникальный идентификатор проекта.
     * @param {module:model/AddDatabaseToProjectRequest} addDatabaseToProjectRequest 
     * @param {module:api/ProjectsApi~addDatabaseToProjectCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/AddBalancerToProject200Response}
     */
    addDatabaseToProject(projectId, addDatabaseToProjectRequest, callback) {
      let postBody = addDatabaseToProjectRequest;
      // verify the required parameter 'projectId' is set
      if (projectId === undefined || projectId === null) {
        throw new Error("Missing the required parameter 'projectId' when calling addDatabaseToProject");
      }
      // verify the required parameter 'addDatabaseToProjectRequest' is set
      if (addDatabaseToProjectRequest === undefined || addDatabaseToProjectRequest === null) {
        throw new Error("Missing the required parameter 'addDatabaseToProjectRequest' when calling addDatabaseToProject");
      }

      let pathParams = {
        'project_id': projectId
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
      let returnType = AddBalancerToProject200Response;
      return this.apiClient.callApi(
        '/api/v1/projects/{project_id}/resources/databases', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the addDedicatedServerToProject operation.
     * @callback module:api/ProjectsApi~addDedicatedServerToProjectCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AddBalancerToProject200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Добавление выделенного сервера в проект
     * Чтобы добавить выделенный сервер в проект, отправьте POST-запрос на `/api/v1/projects/{project_id}/resources/dedicated`, задав необходимые атрибуты.  Выделенный сервер будет добавлен в указанный проект. Тело ответа будет содержать объект JSON с информацией о добавленном выделенном сервере.
     * @param {Number} projectId Уникальный идентификатор проекта.
     * @param {module:model/AddDedicatedServerToProjectRequest} addDedicatedServerToProjectRequest 
     * @param {module:api/ProjectsApi~addDedicatedServerToProjectCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/AddBalancerToProject200Response}
     */
    addDedicatedServerToProject(projectId, addDedicatedServerToProjectRequest, callback) {
      let postBody = addDedicatedServerToProjectRequest;
      // verify the required parameter 'projectId' is set
      if (projectId === undefined || projectId === null) {
        throw new Error("Missing the required parameter 'projectId' when calling addDedicatedServerToProject");
      }
      // verify the required parameter 'addDedicatedServerToProjectRequest' is set
      if (addDedicatedServerToProjectRequest === undefined || addDedicatedServerToProjectRequest === null) {
        throw new Error("Missing the required parameter 'addDedicatedServerToProjectRequest' when calling addDedicatedServerToProject");
      }

      let pathParams = {
        'project_id': projectId
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
      let returnType = AddBalancerToProject200Response;
      return this.apiClient.callApi(
        '/api/v1/projects/{project_id}/resources/dedicated', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the addServerToProject operation.
     * @callback module:api/ProjectsApi~addServerToProjectCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AddBalancerToProject200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Добавление сервера в проект
     * Чтобы добавить сервер в проект, отправьте POST-запрос на `/api/v1/projects/{project_id}/resources/servers`, задав необходимые атрибуты.  Сервер будет добавлен в указанный проект. Тело ответа будет содержать объект JSON с информацией о добавленном сервере.
     * @param {Number} projectId Уникальный идентификатор проекта.
     * @param {module:model/AddServerToProjectRequest} addServerToProjectRequest 
     * @param {module:api/ProjectsApi~addServerToProjectCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/AddBalancerToProject200Response}
     */
    addServerToProject(projectId, addServerToProjectRequest, callback) {
      let postBody = addServerToProjectRequest;
      // verify the required parameter 'projectId' is set
      if (projectId === undefined || projectId === null) {
        throw new Error("Missing the required parameter 'projectId' when calling addServerToProject");
      }
      // verify the required parameter 'addServerToProjectRequest' is set
      if (addServerToProjectRequest === undefined || addServerToProjectRequest === null) {
        throw new Error("Missing the required parameter 'addServerToProjectRequest' when calling addServerToProject");
      }

      let pathParams = {
        'project_id': projectId
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
      let returnType = AddBalancerToProject200Response;
      return this.apiClient.callApi(
        '/api/v1/projects/{project_id}/resources/servers', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the addStorageToProject operation.
     * @callback module:api/ProjectsApi~addStorageToProjectCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AddBalancerToProject200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Добавление хранилища в проект
     * Чтобы добавить хранилище в проект, отправьте POST-запрос на `/api/v1/projects/{project_id}/resources/buckets`, задав необходимые атрибуты.  Хранилище будет добавлено в указанный проект. Тело ответа будет содержать объект JSON с информацией о добавленном хранилище.
     * @param {Number} projectId Уникальный идентификатор проекта.
     * @param {module:model/AddStorageToProjectRequest} addStorageToProjectRequest 
     * @param {module:api/ProjectsApi~addStorageToProjectCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/AddBalancerToProject200Response}
     */
    addStorageToProject(projectId, addStorageToProjectRequest, callback) {
      let postBody = addStorageToProjectRequest;
      // verify the required parameter 'projectId' is set
      if (projectId === undefined || projectId === null) {
        throw new Error("Missing the required parameter 'projectId' when calling addStorageToProject");
      }
      // verify the required parameter 'addStorageToProjectRequest' is set
      if (addStorageToProjectRequest === undefined || addStorageToProjectRequest === null) {
        throw new Error("Missing the required parameter 'addStorageToProjectRequest' when calling addStorageToProject");
      }

      let pathParams = {
        'project_id': projectId
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
      let returnType = AddBalancerToProject200Response;
      return this.apiClient.callApi(
        '/api/v1/projects/{project_id}/resources/buckets', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the createProject operation.
     * @callback module:api/ProjectsApi~createProjectCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateProject201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Создание проекта
     * Чтобы создать проект, отправьте POST-запрос в `api/v1/projects`, задав необходимые атрибуты.  Проект будет создан с использованием предоставленной информации. Тело ответа будет содержать объект JSON с информацией о созданном проекте.
     * @param {module:model/CreateProject} createProject 
     * @param {module:api/ProjectsApi~createProjectCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateProject201Response}
     */
    createProject(createProject, callback) {
      let postBody = createProject;
      // verify the required parameter 'createProject' is set
      if (createProject === undefined || createProject === null) {
        throw new Error("Missing the required parameter 'createProject' when calling createProject");
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
      let returnType = CreateProject201Response;
      return this.apiClient.callApi(
        '/api/v1/projects', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteProject operation.
     * @callback module:api/ProjectsApi~deleteProjectCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Удаление проекта
     * Чтобы удалить проект, отправьте запрос DELETE в `api/v1/projects/{project_id}`.
     * @param {Number} projectId Уникальный идентификатор проекта.
     * @param {module:api/ProjectsApi~deleteProjectCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteProject(projectId, callback) {
      let postBody = null;
      // verify the required parameter 'projectId' is set
      if (projectId === undefined || projectId === null) {
        throw new Error("Missing the required parameter 'projectId' when calling deleteProject");
      }

      let pathParams = {
        'project_id': projectId
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
        '/api/v1/projects/{project_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getAccountBalancers operation.
     * @callback module:api/ProjectsApi~getAccountBalancersCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetProjectBalancers200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка всех балансировщиков на аккаунте
     * Чтобы получить список всех балансировщиков на аккаунте, отправьте GET-запрос на `/api/v1/projects/resources/balancers`.
     * @param {module:api/ProjectsApi~getAccountBalancersCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetProjectBalancers200Response}
     */
    getAccountBalancers(callback) {
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
      let returnType = GetProjectBalancers200Response;
      return this.apiClient.callApi(
        '/api/v1/projects/resources/balancers', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getAccountClusters operation.
     * @callback module:api/ProjectsApi~getAccountClustersCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetProjectClusters200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка всех кластеров на аккаунте
     * Чтобы получить список всех кластеров на аккаунте, отправьте GET-запрос на `/api/v1/projects/resources/clusters`.
     * @param {module:api/ProjectsApi~getAccountClustersCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetProjectClusters200Response}
     */
    getAccountClusters(callback) {
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
      let returnType = GetProjectClusters200Response;
      return this.apiClient.callApi(
        '/api/v1/projects/resources/clusters', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getAccountDatabases operation.
     * @callback module:api/ProjectsApi~getAccountDatabasesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetProjectDatabases200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка всех баз данных на аккаунте
     * Чтобы получить список всех баз данных на аккаунте, отправьте GET-запрос на `/api/v1/projects/resources/databases`.
     * @param {module:api/ProjectsApi~getAccountDatabasesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetProjectDatabases200Response}
     */
    getAccountDatabases(callback) {
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
      let returnType = GetProjectDatabases200Response;
      return this.apiClient.callApi(
        '/api/v1/projects/resources/databases', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getAccountDedicatedServers operation.
     * @callback module:api/ProjectsApi~getAccountDedicatedServersCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetProjectDedicatedServers200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка всех выделенных серверов на аккаунте
     * Чтобы получить список всех выделенных серверов на аккаунте, отправьте GET-запрос на `/api/v1/projects/resources/dedicated`.
     * @param {module:api/ProjectsApi~getAccountDedicatedServersCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetProjectDedicatedServers200Response}
     */
    getAccountDedicatedServers(callback) {
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
      let returnType = GetProjectDedicatedServers200Response;
      return this.apiClient.callApi(
        '/api/v1/projects/resources/dedicated', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getAccountServers operation.
     * @callback module:api/ProjectsApi~getAccountServersCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetProjectServers200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка всех серверов на аккаунте
     * Чтобы получить список всех серверов на аккаунте, отправьте GET-запрос на `/api/v1/projects/resources/servers`.
     * @param {module:api/ProjectsApi~getAccountServersCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetProjectServers200Response}
     */
    getAccountServers(callback) {
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
      let returnType = GetProjectServers200Response;
      return this.apiClient.callApi(
        '/api/v1/projects/resources/servers', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getAccountStorages operation.
     * @callback module:api/ProjectsApi~getAccountStoragesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetProjectStorages200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка всех хранилищ на аккаунте
     * Чтобы получить список всех хранилищ на аккаунте, отправьте GET-запрос на `/api/v1/projects/resources/buckets`.
     * @param {module:api/ProjectsApi~getAccountStoragesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetProjectStorages200Response}
     */
    getAccountStorages(callback) {
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
        '/api/v1/projects/resources/buckets', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getAllProjectResources operation.
     * @callback module:api/ProjectsApi~getAllProjectResourcesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetAllProjectResources200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение всех ресурсов проекта
     * Чтобы получить все ресурсы проекта, отправьте GET-запрос на `/api/v1/projects/{project_id}/resources`.
     * @param {Number} projectId Уникальный идентификатор проекта.
     * @param {module:api/ProjectsApi~getAllProjectResourcesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetAllProjectResources200Response}
     */
    getAllProjectResources(projectId, callback) {
      let postBody = null;
      // verify the required parameter 'projectId' is set
      if (projectId === undefined || projectId === null) {
        throw new Error("Missing the required parameter 'projectId' when calling getAllProjectResources");
      }

      let pathParams = {
        'project_id': projectId
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
      let returnType = GetAllProjectResources200Response;
      return this.apiClient.callApi(
        '/api/v1/projects/{project_id}/resources', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getProject operation.
     * @callback module:api/ProjectsApi~getProjectCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateProject201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение проекта по идентификатору
     * Чтобы получить проект по идентификатору, отправьте GET-запрос на `/api/v1/projects/{project_id}`.
     * @param {Number} projectId Уникальный идентификатор проекта.
     * @param {module:api/ProjectsApi~getProjectCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateProject201Response}
     */
    getProject(projectId, callback) {
      let postBody = null;
      // verify the required parameter 'projectId' is set
      if (projectId === undefined || projectId === null) {
        throw new Error("Missing the required parameter 'projectId' when calling getProject");
      }

      let pathParams = {
        'project_id': projectId
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
      let returnType = CreateProject201Response;
      return this.apiClient.callApi(
        '/api/v1/projects/{project_id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getProjectBalancers operation.
     * @callback module:api/ProjectsApi~getProjectBalancersCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetProjectBalancers200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка балансировщиков проекта
     * Чтобы получить список балансировщиков проекта, отправьте GET-запрос на `/api/v1/projects/{project_id}/resources/balancers`.
     * @param {Number} projectId Уникальный идентификатор проекта.
     * @param {module:api/ProjectsApi~getProjectBalancersCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetProjectBalancers200Response}
     */
    getProjectBalancers(projectId, callback) {
      let postBody = null;
      // verify the required parameter 'projectId' is set
      if (projectId === undefined || projectId === null) {
        throw new Error("Missing the required parameter 'projectId' when calling getProjectBalancers");
      }

      let pathParams = {
        'project_id': projectId
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
      let returnType = GetProjectBalancers200Response;
      return this.apiClient.callApi(
        '/api/v1/projects/{project_id}/resources/balancers', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getProjectClusters operation.
     * @callback module:api/ProjectsApi~getProjectClustersCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetProjectClusters200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка кластеров проекта
     * Чтобы получить список кластеров проекта, отправьте GET-запрос на `/api/v1/projects/{project_id}/resources/clusters`.
     * @param {Number} projectId Уникальный идентификатор проекта.
     * @param {module:api/ProjectsApi~getProjectClustersCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetProjectClusters200Response}
     */
    getProjectClusters(projectId, callback) {
      let postBody = null;
      // verify the required parameter 'projectId' is set
      if (projectId === undefined || projectId === null) {
        throw new Error("Missing the required parameter 'projectId' when calling getProjectClusters");
      }

      let pathParams = {
        'project_id': projectId
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
      let returnType = GetProjectClusters200Response;
      return this.apiClient.callApi(
        '/api/v1/projects/{project_id}/resources/clusters', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getProjectDatabases operation.
     * @callback module:api/ProjectsApi~getProjectDatabasesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetProjectDatabases200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка баз данных проекта
     * Чтобы получить список баз данных проекта, отправьте GET-запрос на `/api/v1/projects/{project_id}/resources/databases`.
     * @param {Number} projectId Уникальный идентификатор проекта.
     * @param {module:api/ProjectsApi~getProjectDatabasesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetProjectDatabases200Response}
     */
    getProjectDatabases(projectId, callback) {
      let postBody = null;
      // verify the required parameter 'projectId' is set
      if (projectId === undefined || projectId === null) {
        throw new Error("Missing the required parameter 'projectId' when calling getProjectDatabases");
      }

      let pathParams = {
        'project_id': projectId
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
      let returnType = GetProjectDatabases200Response;
      return this.apiClient.callApi(
        '/api/v1/projects/{project_id}/resources/databases', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getProjectDedicatedServers operation.
     * @callback module:api/ProjectsApi~getProjectDedicatedServersCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetProjectDedicatedServers200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка выделенных серверов проекта
     * Чтобы получить список выделенных серверов проекта, отправьте GET-запрос на `/api/v1/projects/{project_id}/resources/dedicated`.
     * @param {Number} projectId Уникальный идентификатор проекта.
     * @param {module:api/ProjectsApi~getProjectDedicatedServersCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetProjectDedicatedServers200Response}
     */
    getProjectDedicatedServers(projectId, callback) {
      let postBody = null;
      // verify the required parameter 'projectId' is set
      if (projectId === undefined || projectId === null) {
        throw new Error("Missing the required parameter 'projectId' when calling getProjectDedicatedServers");
      }

      let pathParams = {
        'project_id': projectId
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
      let returnType = GetProjectDedicatedServers200Response;
      return this.apiClient.callApi(
        '/api/v1/projects/{project_id}/resources/dedicated', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getProjectServers operation.
     * @callback module:api/ProjectsApi~getProjectServersCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetProjectServers200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка серверов проекта
     * Чтобы получить список серверов проекта, отправьте GET-запрос на `/api/v1/projects/{project_id}/resources/servers`.
     * @param {Number} projectId Уникальный идентификатор проекта.
     * @param {module:api/ProjectsApi~getProjectServersCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetProjectServers200Response}
     */
    getProjectServers(projectId, callback) {
      let postBody = null;
      // verify the required parameter 'projectId' is set
      if (projectId === undefined || projectId === null) {
        throw new Error("Missing the required parameter 'projectId' when calling getProjectServers");
      }

      let pathParams = {
        'project_id': projectId
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
      let returnType = GetProjectServers200Response;
      return this.apiClient.callApi(
        '/api/v1/projects/{project_id}/resources/servers', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getProjectStorages operation.
     * @callback module:api/ProjectsApi~getProjectStoragesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetProjectStorages200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка хранилищ проекта
     * Чтобы получить список хранилищ проекта, отправьте GET-запрос на `/api/v1/projects/{project_id}/resources/buckets`.
     * @param {Number} projectId Уникальный идентификатор проекта.
     * @param {module:api/ProjectsApi~getProjectStoragesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetProjectStorages200Response}
     */
    getProjectStorages(projectId, callback) {
      let postBody = null;
      // verify the required parameter 'projectId' is set
      if (projectId === undefined || projectId === null) {
        throw new Error("Missing the required parameter 'projectId' when calling getProjectStorages");
      }

      let pathParams = {
        'project_id': projectId
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
        '/api/v1/projects/{project_id}/resources/buckets', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getProjects operation.
     * @callback module:api/ProjectsApi~getProjectsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetProjects200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка проектов
     * Чтобы получить список всех проектов на вашем аккаунте, отправьте GET-запрос на `/api/v1/dedicated-servers`.   Тело ответа будет представлять собой объект JSON с ключом `projects`.
     * @param {module:api/ProjectsApi~getProjectsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetProjects200Response}
     */
    getProjects(callback) {
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
      let returnType = GetProjects200Response;
      return this.apiClient.callApi(
        '/api/v1/projects', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the transferResourceToAnotherProject operation.
     * @callback module:api/ProjectsApi~transferResourceToAnotherProjectCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AddBalancerToProject200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Перенести ресурс в другой проект
     * Чтобы перенести ресурс в другой проект, отправьте запрос PUT в `api/v1/projects/{project_id}/resources/transfer`. 
     * @param {Number} projectId Уникальный идентификатор проекта.
     * @param {module:model/ResourceTransfer} resourceTransfer 
     * @param {module:api/ProjectsApi~transferResourceToAnotherProjectCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/AddBalancerToProject200Response}
     */
    transferResourceToAnotherProject(projectId, resourceTransfer, callback) {
      let postBody = resourceTransfer;
      // verify the required parameter 'projectId' is set
      if (projectId === undefined || projectId === null) {
        throw new Error("Missing the required parameter 'projectId' when calling transferResourceToAnotherProject");
      }
      // verify the required parameter 'resourceTransfer' is set
      if (resourceTransfer === undefined || resourceTransfer === null) {
        throw new Error("Missing the required parameter 'resourceTransfer' when calling transferResourceToAnotherProject");
      }

      let pathParams = {
        'project_id': projectId
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
      let returnType = AddBalancerToProject200Response;
      return this.apiClient.callApi(
        '/api/v1/projects/{project_id}/resources/transfer', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the updateProject operation.
     * @callback module:api/ProjectsApi~updateProjectCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateProject201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Изменение проекта
     * Чтобы изменить проект, отправьте запрос PUT в `api/v1/projects/{project_id}`.
     * @param {Number} projectId Уникальный идентификатор проекта.
     * @param {module:model/UpdateProject} updateProject 
     * @param {module:api/ProjectsApi~updateProjectCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateProject201Response}
     */
    updateProject(projectId, updateProject, callback) {
      let postBody = updateProject;
      // verify the required parameter 'projectId' is set
      if (projectId === undefined || projectId === null) {
        throw new Error("Missing the required parameter 'projectId' when calling updateProject");
      }
      // verify the required parameter 'updateProject' is set
      if (updateProject === undefined || updateProject === null) {
        throw new Error("Missing the required parameter 'updateProject' when calling updateProject");
      }

      let pathParams = {
        'project_id': projectId
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
      let returnType = CreateProject201Response;
      return this.apiClient.callApi(
        '/api/v1/projects/{project_id}', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}
