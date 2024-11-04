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
import ClusterEdit from '../model/ClusterEdit';
import ClusterIn from '../model/ClusterIn';
import ClusterResponse from '../model/ClusterResponse';
import ClustersResponse from '../model/ClustersResponse';
import DeleteCluster200Response from '../model/DeleteCluster200Response';
import GetFinances400Response from '../model/GetFinances400Response';
import GetFinances401Response from '../model/GetFinances401Response';
import GetFinances403Response from '../model/GetFinances403Response';
import GetFinances404Response from '../model/GetFinances404Response';
import GetFinances429Response from '../model/GetFinances429Response';
import GetFinances500Response from '../model/GetFinances500Response';
import K8SVersionsResponse from '../model/K8SVersionsResponse';
import NetworkDriversResponse from '../model/NetworkDriversResponse';
import NodeCount from '../model/NodeCount';
import NodeGroupIn from '../model/NodeGroupIn';
import NodeGroupResponse from '../model/NodeGroupResponse';
import NodeGroupsResponse from '../model/NodeGroupsResponse';
import NodesResponse from '../model/NodesResponse';
import PresetsResponse from '../model/PresetsResponse';
import ResourcesResponse from '../model/ResourcesResponse';

/**
* Kubernetes service.
* @module api/KubernetesApi
* @version 1.0.0
*/
export default class KubernetesApi {

    /**
    * Constructs a new KubernetesApi. 
    * @alias module:api/KubernetesApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }


    /**
     * Callback function to receive the result of the createCluster operation.
     * @callback module:api/KubernetesApi~createClusterCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ClusterResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Создание кластера
     * Чтобы создать кластер, отправьте POST-запрос на `/api/v1/k8s/clusters`.
     * @param {module:model/ClusterIn} clusterIn 
     * @param {module:api/KubernetesApi~createClusterCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ClusterResponse}
     */
    createCluster(clusterIn, callback) {
      let postBody = clusterIn;
      // verify the required parameter 'clusterIn' is set
      if (clusterIn === undefined || clusterIn === null) {
        throw new Error("Missing the required parameter 'clusterIn' when calling createCluster");
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
      let returnType = ClusterResponse;
      return this.apiClient.callApi(
        '/api/v1/k8s/clusters', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the createClusterNodeGroup operation.
     * @callback module:api/KubernetesApi~createClusterNodeGroupCallback
     * @param {String} error Error message, if any.
     * @param {module:model/NodeGroupResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Создание группы нод
     * Чтобы создать группу нод кластера, отправьте POST-запрос в `/api/v1/k8s/clusters/{cluster_id}/groups`.
     * @param {Number} clusterId Уникальный идентификатор кластера
     * @param {module:model/NodeGroupIn} nodeGroupIn 
     * @param {module:api/KubernetesApi~createClusterNodeGroupCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/NodeGroupResponse}
     */
    createClusterNodeGroup(clusterId, nodeGroupIn, callback) {
      let postBody = nodeGroupIn;
      // verify the required parameter 'clusterId' is set
      if (clusterId === undefined || clusterId === null) {
        throw new Error("Missing the required parameter 'clusterId' when calling createClusterNodeGroup");
      }
      // verify the required parameter 'nodeGroupIn' is set
      if (nodeGroupIn === undefined || nodeGroupIn === null) {
        throw new Error("Missing the required parameter 'nodeGroupIn' when calling createClusterNodeGroup");
      }

      let pathParams = {
        'cluster_id': clusterId
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
      let returnType = NodeGroupResponse;
      return this.apiClient.callApi(
        '/api/v1/k8s/clusters/{cluster_id}/groups', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteCluster operation.
     * @callback module:api/KubernetesApi~deleteClusterCallback
     * @param {String} error Error message, if any.
     * @param {module:model/DeleteCluster200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Удаление кластера
     * Чтобы удалить кластер, отправьте DELETE-запрос в `/api/v1/k8s/clusters/{cluster_id}`
     * @param {Number} clusterId Уникальный идентификатор кластера
     * @param {Object} opts Optional parameters
     * @param {String} [hash] Хеш, который совместно с кодом авторизации надо отправить для удаления, если включено подтверждение удаления сервисов через Телеграм.
     * @param {String} [code] Код подтверждения, который придет к вам в Телеграм, после запроса удаления, если включено подтверждение удаления сервисов.  При помощи API токена сервисы можно удалять без подтверждения, если параметр токена `is_able_to_delete` установлен в значение `true`
     * @param {module:api/KubernetesApi~deleteClusterCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/DeleteCluster200Response}
     */
    deleteCluster(clusterId, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'clusterId' is set
      if (clusterId === undefined || clusterId === null) {
        throw new Error("Missing the required parameter 'clusterId' when calling deleteCluster");
      }

      let pathParams = {
        'cluster_id': clusterId
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
      let returnType = DeleteCluster200Response;
      return this.apiClient.callApi(
        '/api/v1/k8s/clusters/{cluster_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteClusterNode operation.
     * @callback module:api/KubernetesApi~deleteClusterNodeCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Удаление ноды
     * Чтобы удалить ноду, отправьте DELETE-запрос в `/api/v1/k8s/clusters/{cluster_id}/nodes/{node_id}`.
     * @param {Number} clusterId Уникальный идентификатор кластера
     * @param {Number} nodeId Уникальный идентификатор группы нод
     * @param {module:api/KubernetesApi~deleteClusterNodeCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteClusterNode(clusterId, nodeId, callback) {
      let postBody = null;
      // verify the required parameter 'clusterId' is set
      if (clusterId === undefined || clusterId === null) {
        throw new Error("Missing the required parameter 'clusterId' when calling deleteClusterNode");
      }
      // verify the required parameter 'nodeId' is set
      if (nodeId === undefined || nodeId === null) {
        throw new Error("Missing the required parameter 'nodeId' when calling deleteClusterNode");
      }

      let pathParams = {
        'cluster_id': clusterId,
        'node_id': nodeId
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
        '/api/v1/k8s/clusters/{cluster_id}/nodes/{node_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteClusterNodeGroup operation.
     * @callback module:api/KubernetesApi~deleteClusterNodeGroupCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Удаление группы нод
     * Чтобы удалить группу нод, отправьте DELETE-запрос в `/api/v1/k8s/clusters/{cluster_id}/groups/{group_id}`.
     * @param {Number} clusterId Уникальный идентификатор кластера
     * @param {Number} groupId Уникальный идентификатор группы
     * @param {module:api/KubernetesApi~deleteClusterNodeGroupCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteClusterNodeGroup(clusterId, groupId, callback) {
      let postBody = null;
      // verify the required parameter 'clusterId' is set
      if (clusterId === undefined || clusterId === null) {
        throw new Error("Missing the required parameter 'clusterId' when calling deleteClusterNodeGroup");
      }
      // verify the required parameter 'groupId' is set
      if (groupId === undefined || groupId === null) {
        throw new Error("Missing the required parameter 'groupId' when calling deleteClusterNodeGroup");
      }

      let pathParams = {
        'cluster_id': clusterId,
        'group_id': groupId
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
        '/api/v1/k8s/clusters/{cluster_id}/groups/{group_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getCluster operation.
     * @callback module:api/KubernetesApi~getClusterCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ClusterResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение информации о кластере
     * Чтобы получить информацию о кластере, отправьте GET-запрос в `/api/v1/k8s/clusters/{cluster_id}`
     * @param {Number} clusterId Уникальный идентификатор кластера
     * @param {module:api/KubernetesApi~getClusterCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ClusterResponse}
     */
    getCluster(clusterId, callback) {
      let postBody = null;
      // verify the required parameter 'clusterId' is set
      if (clusterId === undefined || clusterId === null) {
        throw new Error("Missing the required parameter 'clusterId' when calling getCluster");
      }

      let pathParams = {
        'cluster_id': clusterId
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
      let returnType = ClusterResponse;
      return this.apiClient.callApi(
        '/api/v1/k8s/clusters/{cluster_id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getClusterKubeconfig operation.
     * @callback module:api/KubernetesApi~getClusterKubeconfigCallback
     * @param {String} error Error message, if any.
     * @param {String} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение файла kubeconfig
     * Чтобы получить файл kubeconfig, отправьте GET-запрос в `/api/v1/k8s/clusters/{cluster_id}/kubeconfig`.
     * @param {Number} clusterId Уникальный идентификатор кластера
     * @param {module:api/KubernetesApi~getClusterKubeconfigCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link String}
     */
    getClusterKubeconfig(clusterId, callback) {
      let postBody = null;
      // verify the required parameter 'clusterId' is set
      if (clusterId === undefined || clusterId === null) {
        throw new Error("Missing the required parameter 'clusterId' when calling getClusterKubeconfig");
      }

      let pathParams = {
        'cluster_id': clusterId
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/yaml', 'application/json'];
      let returnType = 'String';
      return this.apiClient.callApi(
        '/api/v1/k8s/clusters/{cluster_id}/kubeconfig', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getClusterNodeGroup operation.
     * @callback module:api/KubernetesApi~getClusterNodeGroupCallback
     * @param {String} error Error message, if any.
     * @param {module:model/NodeGroupResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение информации о группе нод
     * Чтобы получить информацию о группе нод, отправьте GET-запрос в `/api/v1/k8s/clusters/{cluster_id}/groups/{group_id}`.
     * @param {Number} clusterId Уникальный идентификатор кластера
     * @param {Number} groupId Уникальный идентификатор группы
     * @param {module:api/KubernetesApi~getClusterNodeGroupCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/NodeGroupResponse}
     */
    getClusterNodeGroup(clusterId, groupId, callback) {
      let postBody = null;
      // verify the required parameter 'clusterId' is set
      if (clusterId === undefined || clusterId === null) {
        throw new Error("Missing the required parameter 'clusterId' when calling getClusterNodeGroup");
      }
      // verify the required parameter 'groupId' is set
      if (groupId === undefined || groupId === null) {
        throw new Error("Missing the required parameter 'groupId' when calling getClusterNodeGroup");
      }

      let pathParams = {
        'cluster_id': clusterId,
        'group_id': groupId
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
      let returnType = NodeGroupResponse;
      return this.apiClient.callApi(
        '/api/v1/k8s/clusters/{cluster_id}/groups/{group_id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getClusterNodeGroups operation.
     * @callback module:api/KubernetesApi~getClusterNodeGroupsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/NodeGroupsResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение групп нод кластера
     * Чтобы получить группы нод кластера, отправьте GET-запрос в `/api/v1/k8s/clusters/{cluster_id}/groups`.
     * @param {Number} clusterId Уникальный идентификатор кластера
     * @param {module:api/KubernetesApi~getClusterNodeGroupsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/NodeGroupsResponse}
     */
    getClusterNodeGroups(clusterId, callback) {
      let postBody = null;
      // verify the required parameter 'clusterId' is set
      if (clusterId === undefined || clusterId === null) {
        throw new Error("Missing the required parameter 'clusterId' when calling getClusterNodeGroups");
      }

      let pathParams = {
        'cluster_id': clusterId
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
      let returnType = NodeGroupsResponse;
      return this.apiClient.callApi(
        '/api/v1/k8s/clusters/{cluster_id}/groups', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getClusterNodes operation.
     * @callback module:api/KubernetesApi~getClusterNodesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/NodesResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка нод
     * Чтобы получить список нод, отправьте GET-запрос в `/api/v1/k8s/clusters/{cluster_id}/nodes`.
     * @param {Number} clusterId Уникальный идентификатор кластера
     * @param {module:api/KubernetesApi~getClusterNodesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/NodesResponse}
     */
    getClusterNodes(clusterId, callback) {
      let postBody = null;
      // verify the required parameter 'clusterId' is set
      if (clusterId === undefined || clusterId === null) {
        throw new Error("Missing the required parameter 'clusterId' when calling getClusterNodes");
      }

      let pathParams = {
        'cluster_id': clusterId
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
      let returnType = NodesResponse;
      return this.apiClient.callApi(
        '/api/v1/k8s/clusters/{cluster_id}/nodes', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getClusterNodesFromGroup operation.
     * @callback module:api/KubernetesApi~getClusterNodesFromGroupCallback
     * @param {String} error Error message, if any.
     * @param {module:model/NodesResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка нод, принадлежащих группе
     * Чтобы получить список нод принадлежащих группе, отправьте GET-запрос в `/api/v1/k8s/clusters/{cluster_id}/groups/{group_id}/nodes`.
     * @param {Number} clusterId Уникальный идентификатор кластера
     * @param {Number} groupId Уникальный идентификатор группы
     * @param {Object} opts Optional parameters
     * @param {Number} [limit = 100)] Обозначает количество записей, которое необходимо вернуть.
     * @param {Number} [offset = 0)] Указывает на смещение, относительно начала списка.
     * @param {module:api/KubernetesApi~getClusterNodesFromGroupCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/NodesResponse}
     */
    getClusterNodesFromGroup(clusterId, groupId, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'clusterId' is set
      if (clusterId === undefined || clusterId === null) {
        throw new Error("Missing the required parameter 'clusterId' when calling getClusterNodesFromGroup");
      }
      // verify the required parameter 'groupId' is set
      if (groupId === undefined || groupId === null) {
        throw new Error("Missing the required parameter 'groupId' when calling getClusterNodesFromGroup");
      }

      let pathParams = {
        'cluster_id': clusterId,
        'group_id': groupId
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
      let returnType = NodesResponse;
      return this.apiClient.callApi(
        '/api/v1/k8s/clusters/{cluster_id}/groups/{group_id}/nodes', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getClusterResources operation.
     * @callback module:api/KubernetesApi~getClusterResourcesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ResourcesResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение ресурсов кластера
     * Устаревший метод, работает только для старых кластеров. \\  Чтобы получить ресурсы кластера, отправьте GET-запрос в `/api/v1/k8s/clusters/{cluster_id}/resources`.
     * @param {Number} clusterId Уникальный идентификатор кластера
     * @param {module:api/KubernetesApi~getClusterResourcesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ResourcesResponse}
     */
    getClusterResources(clusterId, callback) {
      let postBody = null;
      // verify the required parameter 'clusterId' is set
      if (clusterId === undefined || clusterId === null) {
        throw new Error("Missing the required parameter 'clusterId' when calling getClusterResources");
      }

      let pathParams = {
        'cluster_id': clusterId
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
      let returnType = ResourcesResponse;
      return this.apiClient.callApi(
        '/api/v1/k8s/clusters/{cluster_id}/resources', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getClusters operation.
     * @callback module:api/KubernetesApi~getClustersCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ClustersResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка кластеров
     * Чтобы получить список кластеров, отправьте GET-запрос на `/api/v1/k8s/clusters`.
     * @param {Object} opts Optional parameters
     * @param {Number} [limit = 100)] Обозначает количество записей, которое необходимо вернуть.
     * @param {Number} [offset = 0)] Указывает на смещение относительно начала списка.
     * @param {module:api/KubernetesApi~getClustersCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ClustersResponse}
     */
    getClusters(opts, callback) {
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
      let returnType = ClustersResponse;
      return this.apiClient.callApi(
        '/api/v1/k8s/clusters', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getK8SNetworkDrivers operation.
     * @callback module:api/KubernetesApi~getK8SNetworkDriversCallback
     * @param {String} error Error message, if any.
     * @param {module:model/NetworkDriversResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка сетевых драйверов k8s
     * Чтобы получить список сетевых драйверов k8s, отправьте GET-запрос в `/api/v1/k8s/network-drivers`.
     * @param {module:api/KubernetesApi~getK8SNetworkDriversCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/NetworkDriversResponse}
     */
    getK8SNetworkDrivers(callback) {
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
      let returnType = NetworkDriversResponse;
      return this.apiClient.callApi(
        '/api/v1/k8s/network-drivers', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getK8SVersions operation.
     * @callback module:api/KubernetesApi~getK8SVersionsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/K8SVersionsResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка версий k8s
     * Чтобы получить список версий k8s, отправьте GET-запрос в `/api/v1/k8s/k8s-versions`.
     * @param {module:api/KubernetesApi~getK8SVersionsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/K8SVersionsResponse}
     */
    getK8SVersions(callback) {
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
      let returnType = K8SVersionsResponse;
      return this.apiClient.callApi(
        '/api/v1/k8s/k8s-versions', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getKubernetesPresets operation.
     * @callback module:api/KubernetesApi~getKubernetesPresetsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/PresetsResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка тарифов
     * Чтобы получить список тарифов, отправьте GET-запрос в `/api/v1/presets/k8s`.
     * @param {module:api/KubernetesApi~getKubernetesPresetsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/PresetsResponse}
     */
    getKubernetesPresets(callback) {
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
      let returnType = PresetsResponse;
      return this.apiClient.callApi(
        '/api/v1/presets/k8s', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the increaseCountOfNodesInGroup operation.
     * @callback module:api/KubernetesApi~increaseCountOfNodesInGroupCallback
     * @param {String} error Error message, if any.
     * @param {module:model/NodesResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Увеличение количества нод в группе на указанное количество
     * Чтобы увеличить количество нод в группе на указанное значение, отправьте POST-запрос на `/api/v1/k8s/clusters/{cluster_id}/groups/{group_id}/nodes`
     * @param {Number} clusterId Уникальный идентификатор кластера
     * @param {Number} groupId Уникальный идентификатор группы
     * @param {module:model/NodeCount} nodeCount 
     * @param {module:api/KubernetesApi~increaseCountOfNodesInGroupCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/NodesResponse}
     */
    increaseCountOfNodesInGroup(clusterId, groupId, nodeCount, callback) {
      let postBody = nodeCount;
      // verify the required parameter 'clusterId' is set
      if (clusterId === undefined || clusterId === null) {
        throw new Error("Missing the required parameter 'clusterId' when calling increaseCountOfNodesInGroup");
      }
      // verify the required parameter 'groupId' is set
      if (groupId === undefined || groupId === null) {
        throw new Error("Missing the required parameter 'groupId' when calling increaseCountOfNodesInGroup");
      }
      // verify the required parameter 'nodeCount' is set
      if (nodeCount === undefined || nodeCount === null) {
        throw new Error("Missing the required parameter 'nodeCount' when calling increaseCountOfNodesInGroup");
      }

      let pathParams = {
        'cluster_id': clusterId,
        'group_id': groupId
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
      let returnType = NodesResponse;
      return this.apiClient.callApi(
        '/api/v1/k8s/clusters/{cluster_id}/groups/{group_id}/nodes', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the reduceCountOfNodesInGroup operation.
     * @callback module:api/KubernetesApi~reduceCountOfNodesInGroupCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Уменьшение количества нод в группе на указанное количество
     * Чтобы уменьшить количество нод в группе на указанное значение, отправьте DELETE-запрос в `/api/v1/k8s/clusters/{cluster_id}/groups/{group_id}/nodes`.
     * @param {Number} clusterId Уникальный идентификатор кластера
     * @param {Number} groupId Уникальный идентификатор группы
     * @param {module:model/NodeCount} nodeCount 
     * @param {module:api/KubernetesApi~reduceCountOfNodesInGroupCallback} callback The callback function, accepting three arguments: error, data, response
     */
    reduceCountOfNodesInGroup(clusterId, groupId, nodeCount, callback) {
      let postBody = nodeCount;
      // verify the required parameter 'clusterId' is set
      if (clusterId === undefined || clusterId === null) {
        throw new Error("Missing the required parameter 'clusterId' when calling reduceCountOfNodesInGroup");
      }
      // verify the required parameter 'groupId' is set
      if (groupId === undefined || groupId === null) {
        throw new Error("Missing the required parameter 'groupId' when calling reduceCountOfNodesInGroup");
      }
      // verify the required parameter 'nodeCount' is set
      if (nodeCount === undefined || nodeCount === null) {
        throw new Error("Missing the required parameter 'nodeCount' when calling reduceCountOfNodesInGroup");
      }

      let pathParams = {
        'cluster_id': clusterId,
        'group_id': groupId
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
        '/api/v1/k8s/clusters/{cluster_id}/groups/{group_id}/nodes', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the updateCluster operation.
     * @callback module:api/KubernetesApi~updateClusterCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ClusterResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Обновление информации о кластере
     * Чтобы обновить информацию о кластере, отправьте PATCH-запрос в `/api/v1/k8s/clusters/{cluster_id}`
     * @param {Number} clusterId Уникальный идентификатор кластера
     * @param {module:model/ClusterEdit} clusterEdit 
     * @param {module:api/KubernetesApi~updateClusterCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ClusterResponse}
     */
    updateCluster(clusterId, clusterEdit, callback) {
      let postBody = clusterEdit;
      // verify the required parameter 'clusterId' is set
      if (clusterId === undefined || clusterId === null) {
        throw new Error("Missing the required parameter 'clusterId' when calling updateCluster");
      }
      // verify the required parameter 'clusterEdit' is set
      if (clusterEdit === undefined || clusterEdit === null) {
        throw new Error("Missing the required parameter 'clusterEdit' when calling updateCluster");
      }

      let pathParams = {
        'cluster_id': clusterId
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
      let returnType = ClusterResponse;
      return this.apiClient.callApi(
        '/api/v1/k8s/clusters/{cluster_id}', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}
