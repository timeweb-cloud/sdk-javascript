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

import ApiClient from '../ApiClient';
import AgentAdditionalModel from './AgentAdditionalModel';
import AgentSettings from './AgentSettings';
import AgentToolsInner from './AgentToolsInner';
import AgentV3KnowledgeBasesInner from './AgentV3KnowledgeBasesInner';

/**
 * The AgentV3 model module.
 * @module model/AgentV3
 * @version 1.0.0
 */
class AgentV3 {
    /**
     * Constructs a new <code>AgentV3</code>.
     * AI агент (API v3)
     * @alias module:model/AgentV3
     * @param id {Number} ID агента
     * @param name {String} Название агента
     * @param description {String} Описание агента
     * @param modelId {Number} ID основной модели агента
     * @param providerId {Number} ID провайдера модели
     * @param settings {module:model/AgentSettings} 
     * @param status {module:model/AgentV3.StatusEnum} Статус агента: - `active` — работает; - `suspended` — приостановлен владельцем; - `blocked` — заблокирован (для агентов с пакетом токенов — закончились токены или подписка); - `deleted` — удалён.
     * @param accessType {module:model/AgentV3.AccessTypeEnum} Тип доступа: `public` — агент отвечает анонимным посетителям сайта через виджет; `private` — только по токену аккаунта.
     * @param accessId {String} Идентификатор доступа агента. Используется для вызова агента из своих приложений через OpenAI-совместимое API (см. https://agent.timeweb.cloud/docs) и для встраивания виджета.
     * @param tokenLimit {Number} Устарело. Дневной лимит агента в токенах без привязки к модели, если он задан; `0` — такого лимита нет. Лимиты в деньгах, по моделям и за другие периоды здесь не отражаются — используйте лимиты агента (`/api/v1/cloud-ai/agents/{id}/entity-limits`).
     * @param usedTokens {Number} Использовано токенов пакета. Для агентов с поресурсной оплатой — `null`.
     * @param autoBuyAdditionalTokens {Boolean} Включена ли автоматическая докупка пакетов токенов
     * @param tools {Array.<module:model/AgentToolsInner>} Инструменты, подключённые к агенту
     * @param additionalModelIds {Array.<Number>} ID дополнительных моделей агента
     * @param additionalModels {Array.<module:model/AgentAdditionalModel>} Дополнительные модели агента с настройками
     * @param isWebSearchEnabled {Boolean} Включён ли веб-поиск
     * @param createdAt {Date} Дата создания агента
     * @param knowledgeBases {Array.<module:model/AgentV3KnowledgeBasesInner>} Базы знаний, подключённые к агенту, с режимом поиска
     */
    constructor(id, name, description, modelId, providerId, settings, status, accessType, accessId, tokenLimit, usedTokens, autoBuyAdditionalTokens, tools, additionalModelIds, additionalModels, isWebSearchEnabled, createdAt, knowledgeBases) { 
        
        AgentV3.initialize(this, id, name, description, modelId, providerId, settings, status, accessType, accessId, tokenLimit, usedTokens, autoBuyAdditionalTokens, tools, additionalModelIds, additionalModels, isWebSearchEnabled, createdAt, knowledgeBases);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, id, name, description, modelId, providerId, settings, status, accessType, accessId, tokenLimit, usedTokens, autoBuyAdditionalTokens, tools, additionalModelIds, additionalModels, isWebSearchEnabled, createdAt, knowledgeBases) { 
        obj['id'] = id;
        obj['name'] = name;
        obj['description'] = description;
        obj['model_id'] = modelId;
        obj['provider_id'] = providerId;
        obj['settings'] = settings;
        obj['status'] = status;
        obj['access_type'] = accessType;
        obj['access_id'] = accessId;
        obj['token_limit'] = tokenLimit;
        obj['used_tokens'] = usedTokens;
        obj['auto_buy_additional_tokens'] = autoBuyAdditionalTokens;
        obj['tools'] = tools;
        obj['additional_model_ids'] = additionalModelIds;
        obj['additional_models'] = additionalModels;
        obj['is_web_search_enabled'] = isWebSearchEnabled;
        obj['created_at'] = createdAt;
        obj['knowledge_bases'] = knowledgeBases;
    }

    /**
     * Constructs a <code>AgentV3</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AgentV3} obj Optional instance to populate.
     * @return {module:model/AgentV3} The populated <code>AgentV3</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new AgentV3();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'Number');
            }
            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('description')) {
                obj['description'] = ApiClient.convertToType(data['description'], 'String');
            }
            if (data.hasOwnProperty('project_id')) {
                obj['project_id'] = ApiClient.convertToType(data['project_id'], 'Number');
            }
            if (data.hasOwnProperty('model_id')) {
                obj['model_id'] = ApiClient.convertToType(data['model_id'], 'Number');
            }
            if (data.hasOwnProperty('provider_id')) {
                obj['provider_id'] = ApiClient.convertToType(data['provider_id'], 'Number');
            }
            if (data.hasOwnProperty('settings')) {
                obj['settings'] = AgentSettings.constructFromObject(data['settings']);
            }
            if (data.hasOwnProperty('status')) {
                obj['status'] = ApiClient.convertToType(data['status'], 'String');
            }
            if (data.hasOwnProperty('access_type')) {
                obj['access_type'] = ApiClient.convertToType(data['access_type'], 'String');
            }
            if (data.hasOwnProperty('access_id')) {
                obj['access_id'] = ApiClient.convertToType(data['access_id'], 'String');
            }
            if (data.hasOwnProperty('token_limit')) {
                obj['token_limit'] = ApiClient.convertToType(data['token_limit'], 'Number');
            }
            if (data.hasOwnProperty('total_tokens')) {
                obj['total_tokens'] = ApiClient.convertToType(data['total_tokens'], 'Number');
            }
            if (data.hasOwnProperty('used_tokens')) {
                obj['used_tokens'] = ApiClient.convertToType(data['used_tokens'], 'Number');
            }
            if (data.hasOwnProperty('remaining_tokens')) {
                obj['remaining_tokens'] = ApiClient.convertToType(data['remaining_tokens'], 'Number');
            }
            if (data.hasOwnProperty('token_package_id')) {
                obj['token_package_id'] = ApiClient.convertToType(data['token_package_id'], 'Number');
            }
            if (data.hasOwnProperty('subscription_renewal_date')) {
                obj['subscription_renewal_date'] = ApiClient.convertToType(data['subscription_renewal_date'], 'Date');
            }
            if (data.hasOwnProperty('auto_buy_additional_tokens')) {
                obj['auto_buy_additional_tokens'] = ApiClient.convertToType(data['auto_buy_additional_tokens'], 'Boolean');
            }
            if (data.hasOwnProperty('tools')) {
                obj['tools'] = ApiClient.convertToType(data['tools'], [AgentToolsInner]);
            }
            if (data.hasOwnProperty('additional_model_ids')) {
                obj['additional_model_ids'] = ApiClient.convertToType(data['additional_model_ids'], ['Number']);
            }
            if (data.hasOwnProperty('additional_models')) {
                obj['additional_models'] = ApiClient.convertToType(data['additional_models'], [AgentAdditionalModel]);
            }
            if (data.hasOwnProperty('is_web_search_enabled')) {
                obj['is_web_search_enabled'] = ApiClient.convertToType(data['is_web_search_enabled'], 'Boolean');
            }
            if (data.hasOwnProperty('ai_gateway_key_id')) {
                obj['ai_gateway_key_id'] = ApiClient.convertToType(data['ai_gateway_key_id'], 'String');
            }
            if (data.hasOwnProperty('created_at')) {
                obj['created_at'] = ApiClient.convertToType(data['created_at'], 'Date');
            }
            if (data.hasOwnProperty('knowledge_bases')) {
                obj['knowledge_bases'] = ApiClient.convertToType(data['knowledge_bases'], [AgentV3KnowledgeBasesInner]);
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>AgentV3</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>AgentV3</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of AgentV3.RequiredProperties) {
            if (!data[property]) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }
        // ensure the json data is a string
        if (data['name'] && !(typeof data['name'] === 'string' || data['name'] instanceof String)) {
            throw new Error("Expected the field `name` to be a primitive type in the JSON string but got " + data['name']);
        }
        // ensure the json data is a string
        if (data['description'] && !(typeof data['description'] === 'string' || data['description'] instanceof String)) {
            throw new Error("Expected the field `description` to be a primitive type in the JSON string but got " + data['description']);
        }
        // validate the optional field `settings`
        if (data['settings']) { // data not null
          AgentSettings.validateJSON(data['settings']);
        }
        // ensure the json data is a string
        if (data['status'] && !(typeof data['status'] === 'string' || data['status'] instanceof String)) {
            throw new Error("Expected the field `status` to be a primitive type in the JSON string but got " + data['status']);
        }
        // ensure the json data is a string
        if (data['access_type'] && !(typeof data['access_type'] === 'string' || data['access_type'] instanceof String)) {
            throw new Error("Expected the field `access_type` to be a primitive type in the JSON string but got " + data['access_type']);
        }
        // ensure the json data is a string
        if (data['access_id'] && !(typeof data['access_id'] === 'string' || data['access_id'] instanceof String)) {
            throw new Error("Expected the field `access_id` to be a primitive type in the JSON string but got " + data['access_id']);
        }
        if (data['tools']) { // data not null
            // ensure the json data is an array
            if (!Array.isArray(data['tools'])) {
                throw new Error("Expected the field `tools` to be an array in the JSON data but got " + data['tools']);
            }
            // validate the optional field `tools` (array)
            for (const item of data['tools']) {
                AgentToolsInner.validateJSON(item);
            };
        }
        // ensure the json data is an array
        if (!Array.isArray(data['additional_model_ids'])) {
            throw new Error("Expected the field `additional_model_ids` to be an array in the JSON data but got " + data['additional_model_ids']);
        }
        if (data['additional_models']) { // data not null
            // ensure the json data is an array
            if (!Array.isArray(data['additional_models'])) {
                throw new Error("Expected the field `additional_models` to be an array in the JSON data but got " + data['additional_models']);
            }
            // validate the optional field `additional_models` (array)
            for (const item of data['additional_models']) {
                AgentAdditionalModel.validateJSON(item);
            };
        }
        // ensure the json data is a string
        if (data['ai_gateway_key_id'] && !(typeof data['ai_gateway_key_id'] === 'string' || data['ai_gateway_key_id'] instanceof String)) {
            throw new Error("Expected the field `ai_gateway_key_id` to be a primitive type in the JSON string but got " + data['ai_gateway_key_id']);
        }
        if (data['knowledge_bases']) { // data not null
            // ensure the json data is an array
            if (!Array.isArray(data['knowledge_bases'])) {
                throw new Error("Expected the field `knowledge_bases` to be an array in the JSON data but got " + data['knowledge_bases']);
            }
            // validate the optional field `knowledge_bases` (array)
            for (const item of data['knowledge_bases']) {
                AgentV3KnowledgeBasesInner.validateJSON(item);
            };
        }

        return true;
    }


}

AgentV3.RequiredProperties = ["id", "name", "description", "model_id", "provider_id", "settings", "status", "access_type", "access_id", "token_limit", "used_tokens", "auto_buy_additional_tokens", "tools", "additional_model_ids", "additional_models", "is_web_search_enabled", "created_at", "knowledge_bases"];

/**
 * ID агента
 * @member {Number} id
 */
AgentV3.prototype['id'] = undefined;

/**
 * Название агента
 * @member {String} name
 */
AgentV3.prototype['name'] = undefined;

/**
 * Описание агента
 * @member {String} description
 */
AgentV3.prototype['description'] = undefined;

/**
 * ID проекта, в котором находится агент
 * @member {Number} project_id
 */
AgentV3.prototype['project_id'] = undefined;

/**
 * ID основной модели агента
 * @member {Number} model_id
 */
AgentV3.prototype['model_id'] = undefined;

/**
 * ID провайдера модели
 * @member {Number} provider_id
 */
AgentV3.prototype['provider_id'] = undefined;

/**
 * @member {module:model/AgentSettings} settings
 */
AgentV3.prototype['settings'] = undefined;

/**
 * Статус агента: - `active` — работает; - `suspended` — приостановлен владельцем; - `blocked` — заблокирован (для агентов с пакетом токенов — закончились токены или подписка); - `deleted` — удалён.
 * @member {module:model/AgentV3.StatusEnum} status
 */
AgentV3.prototype['status'] = undefined;

/**
 * Тип доступа: `public` — агент отвечает анонимным посетителям сайта через виджет; `private` — только по токену аккаунта.
 * @member {module:model/AgentV3.AccessTypeEnum} access_type
 */
AgentV3.prototype['access_type'] = undefined;

/**
 * Идентификатор доступа агента. Используется для вызова агента из своих приложений через OpenAI-совместимое API (см. https://agent.timeweb.cloud/docs) и для встраивания виджета.
 * @member {String} access_id
 */
AgentV3.prototype['access_id'] = undefined;

/**
 * Устарело. Дневной лимит агента в токенах без привязки к модели, если он задан; `0` — такого лимита нет. Лимиты в деньгах, по моделям и за другие периоды здесь не отражаются — используйте лимиты агента (`/api/v1/cloud-ai/agents/{id}/entity-limits`).
 * @member {Number} token_limit
 */
AgentV3.prototype['token_limit'] = undefined;

/**
 * Всего токенов в пакете. Только для агентов с пакетом токенов (устаревшая схема оплаты).
 * @member {Number} total_tokens
 */
AgentV3.prototype['total_tokens'] = undefined;

/**
 * Использовано токенов пакета. Для агентов с поресурсной оплатой — `null`.
 * @member {Number} used_tokens
 */
AgentV3.prototype['used_tokens'] = undefined;

/**
 * Осталось токенов в пакете. Только для агентов с пакетом токенов.
 * @member {Number} remaining_tokens
 */
AgentV3.prototype['remaining_tokens'] = undefined;

/**
 * ID пакета токенов. Только для агентов с пакетом токенов; у агентов с поресурсной оплатой поле отсутствует.
 * @member {Number} token_package_id
 */
AgentV3.prototype['token_package_id'] = undefined;

/**
 * Дата продления подписки на пакет токенов. Только для агентов с пакетом токенов.
 * @member {Date} subscription_renewal_date
 */
AgentV3.prototype['subscription_renewal_date'] = undefined;

/**
 * Включена ли автоматическая докупка пакетов токенов
 * @member {Boolean} auto_buy_additional_tokens
 */
AgentV3.prototype['auto_buy_additional_tokens'] = undefined;

/**
 * Инструменты, подключённые к агенту
 * @member {Array.<module:model/AgentToolsInner>} tools
 */
AgentV3.prototype['tools'] = undefined;

/**
 * ID дополнительных моделей агента
 * @member {Array.<Number>} additional_model_ids
 */
AgentV3.prototype['additional_model_ids'] = undefined;

/**
 * Дополнительные модели агента с настройками
 * @member {Array.<module:model/AgentAdditionalModel>} additional_models
 */
AgentV3.prototype['additional_models'] = undefined;

/**
 * Включён ли веб-поиск
 * @member {Boolean} is_web_search_enabled
 */
AgentV3.prototype['is_web_search_enabled'] = undefined;

/**
 * ID ключа AI Gateway, к которому привязан агент. `null` — агента можно привязать к ключу (см. обновление агента); поле отсутствует — привязка недоступна.
 * @member {String} ai_gateway_key_id
 */
AgentV3.prototype['ai_gateway_key_id'] = undefined;

/**
 * Дата создания агента
 * @member {Date} created_at
 */
AgentV3.prototype['created_at'] = undefined;

/**
 * Базы знаний, подключённые к агенту, с режимом поиска
 * @member {Array.<module:model/AgentV3KnowledgeBasesInner>} knowledge_bases
 */
AgentV3.prototype['knowledge_bases'] = undefined;





/**
 * Allowed values for the <code>status</code> property.
 * @enum {String}
 * @readonly
 */
AgentV3['StatusEnum'] = {

    /**
     * value: "active"
     * @const
     */
    "active": "active",

    /**
     * value: "blocked"
     * @const
     */
    "blocked": "blocked",

    /**
     * value: "deleted"
     * @const
     */
    "deleted": "deleted",

    /**
     * value: "suspended"
     * @const
     */
    "suspended": "suspended"
};


/**
 * Allowed values for the <code>access_type</code> property.
 * @enum {String}
 * @readonly
 */
AgentV3['AccessTypeEnum'] = {

    /**
     * value: "public"
     * @const
     */
    "public": "public",

    /**
     * value: "private"
     * @const
     */
    "private": "private"
};



export default AgentV3;

