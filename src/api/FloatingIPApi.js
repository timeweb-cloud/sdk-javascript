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
import BindFloatingIp from '../model/BindFloatingIp';
import CreateDatabaseBackup409Response from '../model/CreateDatabaseBackup409Response';
import CreateFloatingIp from '../model/CreateFloatingIp';
import CreateFloatingIp201Response from '../model/CreateFloatingIp201Response';
import GetFinances400Response from '../model/GetFinances400Response';
import GetFinances401Response from '../model/GetFinances401Response';
import GetFinances403Response from '../model/GetFinances403Response';
import GetFinances404Response from '../model/GetFinances404Response';
import GetFinances429Response from '../model/GetFinances429Response';
import GetFinances500Response from '../model/GetFinances500Response';
import GetFloatingIps200Response from '../model/GetFloatingIps200Response';
import UpdateFloatingIp from '../model/UpdateFloatingIp';

/**
* FloatingIP service.
* @module api/FloatingIPApi
* @version 1.0.0
*/
export default class FloatingIPApi {

    /**
    * Constructs a new FloatingIPApi. 
    * @alias module:api/FloatingIPApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }


    /**
     * Callback function to receive the result of the bindFloatingIp operation.
     * @callback module:api/FloatingIPApi~bindFloatingIpCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Привязать IP к сервису
     * Чтобы привязать IP к сервису, отправьте POST-запрос на `/api/v1/floating-ip/{floating_ip_id}/bind`.
     * @param {String} floatingIpId Идентификатор плавающего IP
     * @param {module:model/BindFloatingIp} bindFloatingIp 
     * @param {module:api/FloatingIPApi~bindFloatingIpCallback} callback The callback function, accepting three arguments: error, data, response
     */
    bindFloatingIp(floatingIpId, bindFloatingIp, callback) {
      let postBody = bindFloatingIp;
      // verify the required parameter 'floatingIpId' is set
      if (floatingIpId === undefined || floatingIpId === null) {
        throw new Error("Missing the required parameter 'floatingIpId' when calling bindFloatingIp");
      }
      // verify the required parameter 'bindFloatingIp' is set
      if (bindFloatingIp === undefined || bindFloatingIp === null) {
        throw new Error("Missing the required parameter 'bindFloatingIp' when calling bindFloatingIp");
      }

      let pathParams = {
        'floating_ip_id': floatingIpId
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
        '/api/v1/floating-ips/{floating_ip_id}/bind', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the createFloatingIp operation.
     * @callback module:api/FloatingIPApi~createFloatingIpCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateFloatingIp201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Создание плавающего IP
     * Чтобы создать создать плавающий IP, отправьте POST-запрос в `/api/v1/floating-ip`, задав необходимые атрибуты.
     * @param {module:model/CreateFloatingIp} createFloatingIp 
     * @param {module:api/FloatingIPApi~createFloatingIpCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateFloatingIp201Response}
     */
    createFloatingIp(createFloatingIp, callback) {
      let postBody = createFloatingIp;
      // verify the required parameter 'createFloatingIp' is set
      if (createFloatingIp === undefined || createFloatingIp === null) {
        throw new Error("Missing the required parameter 'createFloatingIp' when calling createFloatingIp");
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
      let returnType = CreateFloatingIp201Response;
      return this.apiClient.callApi(
        '/api/v1/floating-ips', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteFloatingIP operation.
     * @callback module:api/FloatingIPApi~deleteFloatingIPCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Удаление плавающего IP по идентификатору
     * Чтобы удалить плавающий IP, отправьте DELETE-запрос на `/api/v1/floating-ips/{floating_ip_id}`
     * @param {String} floatingIpId Идентификатор плавающего IP
     * @param {module:api/FloatingIPApi~deleteFloatingIPCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteFloatingIP(floatingIpId, callback) {
      let postBody = null;
      // verify the required parameter 'floatingIpId' is set
      if (floatingIpId === undefined || floatingIpId === null) {
        throw new Error("Missing the required parameter 'floatingIpId' when calling deleteFloatingIP");
      }

      let pathParams = {
        'floating_ip_id': floatingIpId
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
        '/api/v1/floating-ips/{floating_ip_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getFloatingIp operation.
     * @callback module:api/FloatingIPApi~getFloatingIpCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateFloatingIp201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение плавающего IP
     * Чтобы отобразить информацию об отдельном плавающем IP, отправьте запрос GET на `api/v1/floating-ips/{floating_ip_id}`.
     * @param {String} floatingIpId Идентификатор плавающего IP
     * @param {module:api/FloatingIPApi~getFloatingIpCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateFloatingIp201Response}
     */
    getFloatingIp(floatingIpId, callback) {
      let postBody = null;
      // verify the required parameter 'floatingIpId' is set
      if (floatingIpId === undefined || floatingIpId === null) {
        throw new Error("Missing the required parameter 'floatingIpId' when calling getFloatingIp");
      }

      let pathParams = {
        'floating_ip_id': floatingIpId
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
      let returnType = CreateFloatingIp201Response;
      return this.apiClient.callApi(
        '/api/v1/floating-ips/{floating_ip_id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getFloatingIps operation.
     * @callback module:api/FloatingIPApi~getFloatingIpsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetFloatingIps200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка плавающих IP
     * Чтобы получить список плавающих IP, отправьте GET-запрос на `/api/v1/floating-ips`.
     * @param {module:api/FloatingIPApi~getFloatingIpsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetFloatingIps200Response}
     */
    getFloatingIps(callback) {
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
      let returnType = GetFloatingIps200Response;
      return this.apiClient.callApi(
        '/api/v1/floating-ips', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the unbindFloatingIp operation.
     * @callback module:api/FloatingIPApi~unbindFloatingIpCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Отвязать IP от сервиса
     * Чтобы отвязать IP от сервиса, отправьте POST-запрос на `/api/v1/floating-ip/{floating_ip_id}/unbind`.
     * @param {String} floatingIpId Идентификатор плавающего IP
     * @param {module:api/FloatingIPApi~unbindFloatingIpCallback} callback The callback function, accepting three arguments: error, data, response
     */
    unbindFloatingIp(floatingIpId, callback) {
      let postBody = null;
      // verify the required parameter 'floatingIpId' is set
      if (floatingIpId === undefined || floatingIpId === null) {
        throw new Error("Missing the required parameter 'floatingIpId' when calling unbindFloatingIp");
      }

      let pathParams = {
        'floating_ip_id': floatingIpId
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
        '/api/v1/floating-ips/{floating_ip_id}/unbind', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the updateFloatingIP operation.
     * @callback module:api/FloatingIPApi~updateFloatingIPCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateFloatingIp201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Изменение плавающего IP по идентификатору
     * Чтобы изменить плавающий IP, отправьте PATCH-запрос на `/api/v1/floating-ips/{floating_ip_id}`
     * @param {String} floatingIpId Идентификатор плавающего IP
     * @param {module:model/UpdateFloatingIp} updateFloatingIp 
     * @param {module:api/FloatingIPApi~updateFloatingIPCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateFloatingIp201Response}
     */
    updateFloatingIP(floatingIpId, updateFloatingIp, callback) {
      let postBody = updateFloatingIp;
      // verify the required parameter 'floatingIpId' is set
      if (floatingIpId === undefined || floatingIpId === null) {
        throw new Error("Missing the required parameter 'floatingIpId' when calling updateFloatingIP");
      }
      // verify the required parameter 'updateFloatingIp' is set
      if (updateFloatingIp === undefined || updateFloatingIp === null) {
        throw new Error("Missing the required parameter 'updateFloatingIp' when calling updateFloatingIP");
      }

      let pathParams = {
        'floating_ip_id': floatingIpId
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
      let returnType = CreateFloatingIp201Response;
      return this.apiClient.callApi(
        '/api/v1/floating-ips/{floating_ip_id}', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}
