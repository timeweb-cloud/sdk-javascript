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
import ConnectSkills from '../model/ConnectSkills';
import CreateAgentSkill201Response from '../model/CreateAgentSkill201Response';
import CreateSkill from '../model/CreateSkill';
import GetAccountStatus403Response from '../model/GetAccountStatus403Response';
import GetAgentSkill200Response from '../model/GetAgentSkill200Response';
import GetAgentSkillCatalog200Response from '../model/GetAgentSkillCatalog200Response';
import GetAgentSkillLibrary200Response from '../model/GetAgentSkillLibrary200Response';
import GetAgentSkillVersion200Response from '../model/GetAgentSkillVersion200Response';
import GetAgentSkillVersions200Response from '../model/GetAgentSkillVersions200Response';
import GetAgentSkillsForAgent200Response from '../model/GetAgentSkillsForAgent200Response';
import GetFinances400Response from '../model/GetFinances400Response';
import GetFinances401Response from '../model/GetFinances401Response';
import GetFinances429Response from '../model/GetFinances429Response';
import GetFinances500Response from '../model/GetFinances500Response';
import GetImage404Response from '../model/GetImage404Response';
import InstallAgentSkillFromCatalog200Response from '../model/InstallAgentSkillFromCatalog200Response';
import InstallAndConnectAgentSkill200Response from '../model/InstallAndConnectAgentSkill200Response';
import InstallAndConnectSkill from '../model/InstallAndConnectSkill';
import SetAgentSkill from '../model/SetAgentSkill';
import SetAgentSkillForAgent200Response from '../model/SetAgentSkillForAgent200Response';
import SyncAgentSkillAgentsVersions200Response from '../model/SyncAgentSkillAgentsVersions200Response';
import SyncAgentSkillVersionsForAgent200Response from '../model/SyncAgentSkillVersionsForAgent200Response';
import UpdateDatabaseInstance409Response from '../model/UpdateDatabaseInstance409Response';
import UpdateSkill from '../model/UpdateSkill';

/**
* AIAgentSkills service.
* @module api/AIAgentSkillsApi
* @version 1.0.0
*/
export default class AIAgentSkillsApi {

    /**
    * Constructs a new AIAgentSkillsApi. 
    * @alias module:api/AIAgentSkillsApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }


    /**
     * Callback function to receive the result of the applyAgentSkillCatalogUpdate operation.
     * @callback module:api/AIAgentSkillsApi~applyAgentSkillCatalogUpdateCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateAgentSkill201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Применение обновления навыка из каталога
     * Чтобы применить к установленному навыку новую версию из каталога, отправьте POST-запрос на `/api/v1/cloud-ai/skills/{skill_id}/apply-catalog-update`.  Текст «когда применять» и инструкция заменяются каталожными, при этом создаётся новая версия: прежний текст, в том числе ваши правки, остаётся в истории. Название навыка не меняется. Если обновления нет, ничего не меняется (`meta.version_created` — `false`).  Для навыка, установленного не из каталога, вернётся 409 с `error_code` `skill_is_not_installed_from_catalog`.
     * @param {Number} skillId ID навыка
     * @param {module:api/AIAgentSkillsApi~applyAgentSkillCatalogUpdateCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateAgentSkill201Response}
     */
    applyAgentSkillCatalogUpdate(skillId, callback) {
      let postBody = null;
      // verify the required parameter 'skillId' is set
      if (skillId === undefined || skillId === null) {
        throw new Error("Missing the required parameter 'skillId' when calling applyAgentSkillCatalogUpdate");
      }

      let pathParams = {
        'skill_id': skillId
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
      let returnType = CreateAgentSkill201Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/skills/{skill_id}/apply-catalog-update', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the connectAgentSkillsToAgent operation.
     * @callback module:api/AIAgentSkillsApi~connectAgentSkillsToAgentCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetAgentSkillsForAgent200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Подключение нескольких навыков к агенту
     * Чтобы подключить и сразу включить у агента несколько навыков, отправьте POST-запрос на `/api/v1/cloud-ai/agents/{agent_id}/skills/connect`.  Навыки, которых нет в аккаунте, пропускаются без ошибки. Уже подключённые навыки включаются; если для них передана версия, агент закрепляется на ней. В ответе — только навыки, которые удалось подключить.
     * @param {Number} agentId ID агента
     * @param {module:model/ConnectSkills} connectSkills 
     * @param {module:api/AIAgentSkillsApi~connectAgentSkillsToAgentCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetAgentSkillsForAgent200Response}
     */
    connectAgentSkillsToAgent(agentId, connectSkills, callback) {
      let postBody = connectSkills;
      // verify the required parameter 'agentId' is set
      if (agentId === undefined || agentId === null) {
        throw new Error("Missing the required parameter 'agentId' when calling connectAgentSkillsToAgent");
      }
      // verify the required parameter 'connectSkills' is set
      if (connectSkills === undefined || connectSkills === null) {
        throw new Error("Missing the required parameter 'connectSkills' when calling connectAgentSkillsToAgent");
      }

      let pathParams = {
        'agent_id': agentId
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
      let returnType = GetAgentSkillsForAgent200Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/agents/{agent_id}/skills/connect', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the createAgentSkill operation.
     * @callback module:api/AIAgentSkillsApi~createAgentSkillCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateAgentSkill201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Создание навыка
     * Чтобы создать навык, отправьте POST-запрос на `/api/v1/cloud-ai/skills`.  Навык создаётся с версией 1 и ни к одному агенту не подключается. Предупреждения о качестве текста приходят в `meta.warnings` и не мешают сохранению. Скрипты передаются в теле запроса. Их общий размер — до 10 МБ, а всё тело запроса — до 16 МБ; запрос с телом больше отклоняется до проверки.  Если навык с таким названием уже есть, вернётся 409 с `error_code` `skill_name_already_exists`. Если скрипты не прошли проверку (больше 20 файлов, повторяющиеся имена, общий размер больше 10 МБ, файл без содержимого), вернётся 400 с `error_code` `skill_scripts_invalid`.
     * @param {module:model/CreateSkill} createSkill 
     * @param {module:api/AIAgentSkillsApi~createAgentSkillCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateAgentSkill201Response}
     */
    createAgentSkill(createSkill, callback) {
      let postBody = createSkill;
      // verify the required parameter 'createSkill' is set
      if (createSkill === undefined || createSkill === null) {
        throw new Error("Missing the required parameter 'createSkill' when calling createAgentSkill");
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
      let returnType = CreateAgentSkill201Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/skills', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteAgentSkill operation.
     * @callback module:api/AIAgentSkillsApi~deleteAgentSkillCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Удаление навыка
     * Чтобы удалить навык, отправьте DELETE-запрос на `/api/v1/cloud-ai/skills/{skill_id}`.  Навык отключается от всех агентов, история версий и скрипты удаляются. Срабатывания навыка под старыми ответами агентов сохраняются.
     * @param {Number} skillId ID навыка
     * @param {module:api/AIAgentSkillsApi~deleteAgentSkillCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteAgentSkill(skillId, callback) {
      let postBody = null;
      // verify the required parameter 'skillId' is set
      if (skillId === undefined || skillId === null) {
        throw new Error("Missing the required parameter 'skillId' when calling deleteAgentSkill");
      }

      let pathParams = {
        'skill_id': skillId
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
        '/api/v1/cloud-ai/skills/{skill_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the disconnectAgentSkillFromAgent operation.
     * @callback module:api/AIAgentSkillsApi~disconnectAgentSkillFromAgentCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Отключение навыка от агента
     * Чтобы полностью отключить навык от агента, отправьте DELETE-запрос на `/api/v1/cloud-ai/agents/{agent_id}/skills/{skill_id}`.  Закреплённая версия при этом не сохраняется. Чтобы выключить навык на время, используйте PUT-запрос с `is_enabled: false`. Если навык не подключён к агенту, вернётся 404 с `error_code` `agent_skill_link_not_found`.
     * @param {Number} agentId ID агента
     * @param {Number} skillId ID навыка
     * @param {module:api/AIAgentSkillsApi~disconnectAgentSkillFromAgentCallback} callback The callback function, accepting three arguments: error, data, response
     */
    disconnectAgentSkillFromAgent(agentId, skillId, callback) {
      let postBody = null;
      // verify the required parameter 'agentId' is set
      if (agentId === undefined || agentId === null) {
        throw new Error("Missing the required parameter 'agentId' when calling disconnectAgentSkillFromAgent");
      }
      // verify the required parameter 'skillId' is set
      if (skillId === undefined || skillId === null) {
        throw new Error("Missing the required parameter 'skillId' when calling disconnectAgentSkillFromAgent");
      }

      let pathParams = {
        'agent_id': agentId,
        'skill_id': skillId
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
        '/api/v1/cloud-ai/agents/{agent_id}/skills/{skill_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the duplicateAgentSkill operation.
     * @callback module:api/AIAgentSkillsApi~duplicateAgentSkillCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateAgentSkill201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Копирование навыка
     * Чтобы создать копию навыка, отправьте POST-запрос на `/api/v1/cloud-ai/skills/{skill_id}/duplicate`.  Копия получает свободное название вида «Название (копия)» или «Название (копия 2)», текст и скрипты текущей версии оригинала и собственную историю с версии 1. К агентам копия не подключается. Копия навыка из каталога становится обычным навыком аккаунта.
     * @param {Number} skillId ID навыка
     * @param {module:api/AIAgentSkillsApi~duplicateAgentSkillCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateAgentSkill201Response}
     */
    duplicateAgentSkill(skillId, callback) {
      let postBody = null;
      // verify the required parameter 'skillId' is set
      if (skillId === undefined || skillId === null) {
        throw new Error("Missing the required parameter 'skillId' when calling duplicateAgentSkill");
      }

      let pathParams = {
        'skill_id': skillId
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
      let returnType = CreateAgentSkill201Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/skills/{skill_id}/duplicate', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getAgentSkill operation.
     * @callback module:api/AIAgentSkillsApi~getAgentSkillCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetAgentSkill200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение навыка
     * Чтобы получить карточку навыка, отправьте GET-запрос на `/api/v1/cloud-ai/skills/{skill_id}`.  В карточке есть скрипты текущей версии (без содержимого), счётчик версий и агенты, к которым подключён навык.
     * @param {Number} skillId ID навыка
     * @param {module:api/AIAgentSkillsApi~getAgentSkillCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetAgentSkill200Response}
     */
    getAgentSkill(skillId, callback) {
      let postBody = null;
      // verify the required parameter 'skillId' is set
      if (skillId === undefined || skillId === null) {
        throw new Error("Missing the required parameter 'skillId' when calling getAgentSkill");
      }

      let pathParams = {
        'skill_id': skillId
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
      let returnType = GetAgentSkill200Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/skills/{skill_id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getAgentSkillCatalog operation.
     * @callback module:api/AIAgentSkillsApi~getAgentSkillCatalogCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetAgentSkillCatalog200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение каталога навыков
     * Чтобы получить каталог готовых навыков Timeweb Cloud, отправьте GET-запрос на `/api/v1/cloud-ai/skill-catalog`.  Навыки приходят в порядке показа, сгруппированные по `category`. Инструкция возвращается полностью, чтобы её можно было прочитать до установки. Для установленных навыков заполнены `is_installed`, `installed_skill_id`, `is_modified` и `has_catalog_update`.
     * @param {module:api/AIAgentSkillsApi~getAgentSkillCatalogCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetAgentSkillCatalog200Response}
     */
    getAgentSkillCatalog(callback) {
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
      let returnType = GetAgentSkillCatalog200Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/skill-catalog', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getAgentSkillLibrary operation.
     * @callback module:api/AIAgentSkillsApi~getAgentSkillLibraryCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetAgentSkillLibrary200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка навыков
     * Чтобы получить навыки аккаунта, отправьте GET-запрос на `/api/v1/cloud-ai/skills`.  Сначала идут недавно изменённые. Параметр `search` ищет по названию и по тексту инструкции.
     * @param {Object} opts Optional parameters
     * @param {String} [search] Поиск по названию навыка и по тексту инструкции
     * @param {module:api/AIAgentSkillsApi~getAgentSkillLibraryCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetAgentSkillLibrary200Response}
     */
    getAgentSkillLibrary(opts, callback) {
      opts = opts || {};
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
        'search': opts['search']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = GetAgentSkillLibrary200Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/skills', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getAgentSkillVersion operation.
     * @callback module:api/AIAgentSkillsApi~getAgentSkillVersionCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetAgentSkillVersion200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение версии навыка
     * Чтобы получить текст конкретной версии навыка, отправьте GET-запрос на `/api/v1/cloud-ai/skills/{skill_id}/versions/{version}`.  Номер версии сработавшего навыка есть в срабатываниях под ответами агента.
     * @param {Number} skillId ID навыка
     * @param {Number} version Номер версии навыка
     * @param {module:api/AIAgentSkillsApi~getAgentSkillVersionCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetAgentSkillVersion200Response}
     */
    getAgentSkillVersion(skillId, version, callback) {
      let postBody = null;
      // verify the required parameter 'skillId' is set
      if (skillId === undefined || skillId === null) {
        throw new Error("Missing the required parameter 'skillId' when calling getAgentSkillVersion");
      }
      // verify the required parameter 'version' is set
      if (version === undefined || version === null) {
        throw new Error("Missing the required parameter 'version' when calling getAgentSkillVersion");
      }

      let pathParams = {
        'skill_id': skillId,
        'version': version
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
      let returnType = GetAgentSkillVersion200Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/skills/{skill_id}/versions/{version}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getAgentSkillVersions operation.
     * @callback module:api/AIAgentSkillsApi~getAgentSkillVersionsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetAgentSkillVersions200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение истории версий навыка
     * Чтобы получить историю версий навыка, отправьте GET-запрос на `/api/v1/cloud-ai/skills/{skill_id}/versions`.
     * @param {Number} skillId ID навыка
     * @param {module:api/AIAgentSkillsApi~getAgentSkillVersionsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetAgentSkillVersions200Response}
     */
    getAgentSkillVersions(skillId, callback) {
      let postBody = null;
      // verify the required parameter 'skillId' is set
      if (skillId === undefined || skillId === null) {
        throw new Error("Missing the required parameter 'skillId' when calling getAgentSkillVersions");
      }

      let pathParams = {
        'skill_id': skillId
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
      let returnType = GetAgentSkillVersions200Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/skills/{skill_id}/versions', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getAgentSkillsForAgent operation.
     * @callback module:api/AIAgentSkillsApi~getAgentSkillsForAgentCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetAgentSkillsForAgent200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение навыков агента
     * Чтобы получить навыки агента, отправьте GET-запрос на `/api/v1/cloud-ai/agents/{agent_id}/skills`.  В ответе все навыки аккаунта: неподключённые приходят с `is_connected: false`. `has_newer_version: true` означает, что агент закреплён на устаревшей версии.
     * @param {Number} agentId ID агента
     * @param {module:api/AIAgentSkillsApi~getAgentSkillsForAgentCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetAgentSkillsForAgent200Response}
     */
    getAgentSkillsForAgent(agentId, callback) {
      let postBody = null;
      // verify the required parameter 'agentId' is set
      if (agentId === undefined || agentId === null) {
        throw new Error("Missing the required parameter 'agentId' when calling getAgentSkillsForAgent");
      }

      let pathParams = {
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
      let returnType = GetAgentSkillsForAgent200Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/agents/{agent_id}/skills', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the installAgentSkillFromCatalog operation.
     * @callback module:api/AIAgentSkillsApi~installAgentSkillFromCatalogCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InstallAgentSkillFromCatalog200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Установка навыка из каталога
     * Чтобы установить навык из каталога в библиотеку аккаунта, отправьте POST-запрос на `/api/v1/cloud-ai/skill-catalog/{catalog_item_id}/install`.  Повторная установка не создаёт копию, а возвращает уже установленный навык с `meta.already_installed: true`. Если название занято вашим навыком, к нему добавляется «(копия)». Чтобы сразу включить навык у агента, используйте `POST /api/v1/cloud-ai/agents/{agent_id}/skills/install-and-connect`.
     * @param {Number} catalogItemId ID навыка в каталоге
     * @param {module:api/AIAgentSkillsApi~installAgentSkillFromCatalogCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/InstallAgentSkillFromCatalog200Response}
     */
    installAgentSkillFromCatalog(catalogItemId, callback) {
      let postBody = null;
      // verify the required parameter 'catalogItemId' is set
      if (catalogItemId === undefined || catalogItemId === null) {
        throw new Error("Missing the required parameter 'catalogItemId' when calling installAgentSkillFromCatalog");
      }

      let pathParams = {
        'catalog_item_id': catalogItemId
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
      let returnType = InstallAgentSkillFromCatalog200Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/skill-catalog/{catalog_item_id}/install', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the installAndConnectAgentSkill operation.
     * @callback module:api/AIAgentSkillsApi~installAndConnectAgentSkillCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InstallAndConnectAgentSkill200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Установка навыка из каталога и включение у агента
     * Чтобы установить навык из каталога и сразу включить его у агента, отправьте POST-запрос на `/api/v1/cloud-ai/agents/{agent_id}/skills/install-and-connect`.  Если навык уже установлен, копия не создаётся (`meta.already_installed: true`), навык просто включается у агента.
     * @param {Number} agentId ID агента
     * @param {module:model/InstallAndConnectSkill} installAndConnectSkill 
     * @param {module:api/AIAgentSkillsApi~installAndConnectAgentSkillCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/InstallAndConnectAgentSkill200Response}
     */
    installAndConnectAgentSkill(agentId, installAndConnectSkill, callback) {
      let postBody = installAndConnectSkill;
      // verify the required parameter 'agentId' is set
      if (agentId === undefined || agentId === null) {
        throw new Error("Missing the required parameter 'agentId' when calling installAndConnectAgentSkill");
      }
      // verify the required parameter 'installAndConnectSkill' is set
      if (installAndConnectSkill === undefined || installAndConnectSkill === null) {
        throw new Error("Missing the required parameter 'installAndConnectSkill' when calling installAndConnectAgentSkill");
      }

      let pathParams = {
        'agent_id': agentId
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
      let returnType = InstallAndConnectAgentSkill200Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/agents/{agent_id}/skills/install-and-connect', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the rollbackAgentSkillVersion operation.
     * @callback module:api/AIAgentSkillsApi~rollbackAgentSkillVersionCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateAgentSkill201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Переключение навыка на версию из истории
     * Чтобы сделать версию из истории текущей, отправьте POST-запрос на `/api/v1/cloud-ai/skills/{skill_id}/versions/{version}/rollback`.  Новая версия не создаётся (`meta.version_created` — `false`), название навыка не меняется. Агенты остаются на своих закреплённых версиях. Если выбранная версия уже текущая, ничего не меняется.
     * @param {Number} skillId ID навыка
     * @param {Number} version Номер версии навыка
     * @param {module:api/AIAgentSkillsApi~rollbackAgentSkillVersionCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateAgentSkill201Response}
     */
    rollbackAgentSkillVersion(skillId, version, callback) {
      let postBody = null;
      // verify the required parameter 'skillId' is set
      if (skillId === undefined || skillId === null) {
        throw new Error("Missing the required parameter 'skillId' when calling rollbackAgentSkillVersion");
      }
      // verify the required parameter 'version' is set
      if (version === undefined || version === null) {
        throw new Error("Missing the required parameter 'version' when calling rollbackAgentSkillVersion");
      }

      let pathParams = {
        'skill_id': skillId,
        'version': version
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
      let returnType = CreateAgentSkill201Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/skills/{skill_id}/versions/{version}/rollback', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the setAgentSkillForAgent operation.
     * @callback module:api/AIAgentSkillsApi~setAgentSkillForAgentCallback
     * @param {String} error Error message, if any.
     * @param {module:model/SetAgentSkillForAgent200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Включение и выключение навыка у агента
     * Чтобы включить или выключить навык у агента, отправьте PUT-запрос на `/api/v1/cloud-ai/agents/{agent_id}/skills/{skill_id}`.  Первое включение подключает навык и закрепляет агента на текущей версии навыка или на версии из `version`. Выключение сохраняет закреплённую версию, поэтому повторное включение вернёт то же поведение. Изменения действуют сразу. Выключение неподключённого навыка ничего не меняет.
     * @param {Number} agentId ID агента
     * @param {Number} skillId ID навыка
     * @param {module:model/SetAgentSkill} setAgentSkill 
     * @param {module:api/AIAgentSkillsApi~setAgentSkillForAgentCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/SetAgentSkillForAgent200Response}
     */
    setAgentSkillForAgent(agentId, skillId, setAgentSkill, callback) {
      let postBody = setAgentSkill;
      // verify the required parameter 'agentId' is set
      if (agentId === undefined || agentId === null) {
        throw new Error("Missing the required parameter 'agentId' when calling setAgentSkillForAgent");
      }
      // verify the required parameter 'skillId' is set
      if (skillId === undefined || skillId === null) {
        throw new Error("Missing the required parameter 'skillId' when calling setAgentSkillForAgent");
      }
      // verify the required parameter 'setAgentSkill' is set
      if (setAgentSkill === undefined || setAgentSkill === null) {
        throw new Error("Missing the required parameter 'setAgentSkill' when calling setAgentSkillForAgent");
      }

      let pathParams = {
        'agent_id': agentId,
        'skill_id': skillId
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
      let returnType = SetAgentSkillForAgent200Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/agents/{agent_id}/skills/{skill_id}', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the syncAgentSkillAgentsVersions operation.
     * @callback module:api/AIAgentSkillsApi~syncAgentSkillAgentsVersionsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/SyncAgentSkillAgentsVersions200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Перевод всех агентов навыка на текущую версию
     * Чтобы перевести всех агентов, у которых включён навык, на его текущую версию, отправьте POST-запрос на `/api/v1/cloud-ai/skills/{skill_id}/agents/sync-versions`.  Агенты, у которых навык выключен, остаются на своих версиях. Сколько агентов переведено, видно в `meta.updated_count`.
     * @param {Number} skillId ID навыка
     * @param {module:api/AIAgentSkillsApi~syncAgentSkillAgentsVersionsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/SyncAgentSkillAgentsVersions200Response}
     */
    syncAgentSkillAgentsVersions(skillId, callback) {
      let postBody = null;
      // verify the required parameter 'skillId' is set
      if (skillId === undefined || skillId === null) {
        throw new Error("Missing the required parameter 'skillId' when calling syncAgentSkillAgentsVersions");
      }

      let pathParams = {
        'skill_id': skillId
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
      let returnType = SyncAgentSkillAgentsVersions200Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/skills/{skill_id}/agents/sync-versions', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the syncAgentSkillVersionsForAgent operation.
     * @callback module:api/AIAgentSkillsApi~syncAgentSkillVersionsForAgentCallback
     * @param {String} error Error message, if any.
     * @param {module:model/SyncAgentSkillVersionsForAgent200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Перевод всех навыков агента на текущие версии
     * Чтобы перевести все включённые у агента навыки на их текущие версии, отправьте POST-запрос на `/api/v1/cloud-ai/agents/{agent_id}/skills/sync-versions`.  В ответе все навыки аккаунта с состоянием у агента, как в списке навыков агента. Сколько навыков переведено, видно в `updated_count` в корне ответа.
     * @param {Number} agentId ID агента
     * @param {module:api/AIAgentSkillsApi~syncAgentSkillVersionsForAgentCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/SyncAgentSkillVersionsForAgent200Response}
     */
    syncAgentSkillVersionsForAgent(agentId, callback) {
      let postBody = null;
      // verify the required parameter 'agentId' is set
      if (agentId === undefined || agentId === null) {
        throw new Error("Missing the required parameter 'agentId' when calling syncAgentSkillVersionsForAgent");
      }

      let pathParams = {
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
      let returnType = SyncAgentSkillVersionsForAgent200Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/agents/{agent_id}/skills/sync-versions', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the updateAgentSkill operation.
     * @callback module:api/AIAgentSkillsApi~updateAgentSkillCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateAgentSkill201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Изменение навыка
     * Чтобы изменить навык, отправьте PATCH-запрос на `/api/v1/cloud-ai/skills/{skill_id}`, передав только изменяемые поля.  Изменение «когда применять», инструкции или скриптов создаёт новую версию. Переименование и сохранение без изменений версию не создают (`meta.version_created`). Подключённые агенты остаются на своих версиях. Сколько агентов затронуто, видно в `meta.affected_agents_count`. Если в истории уже 50 версий, самая старая свободная версия удаляется (`meta.pruned_versions`). Скрипты передаются в теле запроса. Их общий размер — до 10 МБ, а всё тело запроса — до 16 МБ; запрос с телом больше отклоняется до проверки.  Возможные ошибки 409: `skill_name_already_exists` — название занято; `skill_versions_limit_exceeded` — все 50 версий заняты текущей и закреплёнными за агентами; `skill_was_modified_concurrently` — навык одновременно изменён другим запросом, повторите сохранение.
     * @param {Number} skillId ID навыка
     * @param {module:model/UpdateSkill} updateSkill 
     * @param {module:api/AIAgentSkillsApi~updateAgentSkillCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateAgentSkill201Response}
     */
    updateAgentSkill(skillId, updateSkill, callback) {
      let postBody = updateSkill;
      // verify the required parameter 'skillId' is set
      if (skillId === undefined || skillId === null) {
        throw new Error("Missing the required parameter 'skillId' when calling updateAgentSkill");
      }
      // verify the required parameter 'updateSkill' is set
      if (updateSkill === undefined || updateSkill === null) {
        throw new Error("Missing the required parameter 'updateSkill' when calling updateAgentSkill");
      }

      let pathParams = {
        'skill_id': skillId
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
      let returnType = CreateAgentSkill201Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/skills/{skill_id}', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the updateAgentSkillVersionForAgent operation.
     * @callback module:api/AIAgentSkillsApi~updateAgentSkillVersionForAgentCallback
     * @param {String} error Error message, if any.
     * @param {module:model/SetAgentSkillForAgent200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Перевод агента на текущую версию навыка
     * Чтобы перевести агента на текущую версию навыка, отправьте POST-запрос на `/api/v1/cloud-ai/agents/{agent_id}/skills/{skill_id}/update-version`.  Если навык не подключён к агенту, вернётся 404 с `error_code` `agent_skill_link_not_found`.
     * @param {Number} agentId ID агента
     * @param {Number} skillId ID навыка
     * @param {module:api/AIAgentSkillsApi~updateAgentSkillVersionForAgentCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/SetAgentSkillForAgent200Response}
     */
    updateAgentSkillVersionForAgent(agentId, skillId, callback) {
      let postBody = null;
      // verify the required parameter 'agentId' is set
      if (agentId === undefined || agentId === null) {
        throw new Error("Missing the required parameter 'agentId' when calling updateAgentSkillVersionForAgent");
      }
      // verify the required parameter 'skillId' is set
      if (skillId === undefined || skillId === null) {
        throw new Error("Missing the required parameter 'skillId' when calling updateAgentSkillVersionForAgent");
      }

      let pathParams = {
        'agent_id': agentId,
        'skill_id': skillId
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
      let returnType = SetAgentSkillForAgent200Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/agents/{agent_id}/skills/{skill_id}/update-version', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}
