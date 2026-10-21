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
import ToolAuthData from './ToolAuthData';
import ToolMethod from './ToolMethod';

/**
 * The Tool model module.
 * @module model/Tool
 * @version 1.0.0
 */
class Tool {
    /**
     * Constructs a new <code>Tool</code>.
     * MCP-инструмент аккаунта
     * @alias module:model/Tool
     * @param id {Number} ID инструмента
     * @param accountId {String} Логин аккаунта-владельца
     * @param templateId {Number} ID шаблона маркетплейса, из которого установлен инструмент. `null` — собственный MCP-сервер
     * @param name {String} Название инструмента
     * @param description {String} Описание инструмента
     * @param type {module:model/Tool.TypeEnum} Тип инструмента. У инструментов из шаблонов может быть `null`
     * @param protocol {module:model/Tool.ProtocolEnum} Транспорт MCP: `http` — Streamable HTTP, `sse` — Server-Sent Events. У инструментов из шаблонов всегда `null`
     * @param url {String} Адрес MCP-сервера. У инструментов из шаблонов всегда `null`
     * @param methods {Array.<module:model/ToolMethod>} Методы MCP-сервера. `null` или пустой массив — методы ещё не получены, например до завершения OAuth2-авторизации
     * @param authData {module:model/ToolAuthData} 
     * @param status {module:model/Tool.StatusEnum} Статус инструмента: `active` — работает, `inactive` — выключен вручную, `pending_auth` — ожидает OAuth2-авторизации, `error` — последнее обновление методов завершилось ошибкой (причина в `status_info`). Агент вызывает только инструменты в статусе `active`
     * @param statusInfo {String} Причина статуса `error`
     * @param createdAt {Date} Дата и время создания
     * @param updatedAt {Date} Дата и время последнего изменения
     */
    constructor(id, accountId, templateId, name, description, type, protocol, url, methods, authData, status, statusInfo, createdAt, updatedAt) { 
        
        Tool.initialize(this, id, accountId, templateId, name, description, type, protocol, url, methods, authData, status, statusInfo, createdAt, updatedAt);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, id, accountId, templateId, name, description, type, protocol, url, methods, authData, status, statusInfo, createdAt, updatedAt) { 
        obj['id'] = id;
        obj['account_id'] = accountId;
        obj['template_id'] = templateId;
        obj['name'] = name;
        obj['description'] = description;
        obj['type'] = type;
        obj['protocol'] = protocol;
        obj['url'] = url;
        obj['methods'] = methods;
        obj['auth_data'] = authData;
        obj['status'] = status;
        obj['status_info'] = statusInfo;
        obj['created_at'] = createdAt;
        obj['updated_at'] = updatedAt;
    }

    /**
     * Constructs a <code>Tool</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Tool} obj Optional instance to populate.
     * @return {module:model/Tool} The populated <code>Tool</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new Tool();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'Number');
            }
            if (data.hasOwnProperty('account_id')) {
                obj['account_id'] = ApiClient.convertToType(data['account_id'], 'String');
            }
            if (data.hasOwnProperty('template_id')) {
                obj['template_id'] = ApiClient.convertToType(data['template_id'], 'Number');
            }
            if (data.hasOwnProperty('key')) {
                obj['key'] = ApiClient.convertToType(data['key'], 'String');
            }
            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('description')) {
                obj['description'] = ApiClient.convertToType(data['description'], 'String');
            }
            if (data.hasOwnProperty('type')) {
                obj['type'] = ApiClient.convertToType(data['type'], 'String');
            }
            if (data.hasOwnProperty('protocol')) {
                obj['protocol'] = ApiClient.convertToType(data['protocol'], 'String');
            }
            if (data.hasOwnProperty('url')) {
                obj['url'] = ApiClient.convertToType(data['url'], 'String');
            }
            if (data.hasOwnProperty('methods')) {
                obj['methods'] = ApiClient.convertToType(data['methods'], [ToolMethod]);
            }
            if (data.hasOwnProperty('auth_data')) {
                obj['auth_data'] = ToolAuthData.constructFromObject(data['auth_data']);
            }
            if (data.hasOwnProperty('status')) {
                obj['status'] = ApiClient.convertToType(data['status'], 'String');
            }
            if (data.hasOwnProperty('status_info')) {
                obj['status_info'] = ApiClient.convertToType(data['status_info'], 'String');
            }
            if (data.hasOwnProperty('created_at')) {
                obj['created_at'] = ApiClient.convertToType(data['created_at'], 'Date');
            }
            if (data.hasOwnProperty('updated_at')) {
                obj['updated_at'] = ApiClient.convertToType(data['updated_at'], 'Date');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>Tool</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>Tool</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of Tool.RequiredProperties) {
            if (!data[property]) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }
        // ensure the json data is a string
        if (data['account_id'] && !(typeof data['account_id'] === 'string' || data['account_id'] instanceof String)) {
            throw new Error("Expected the field `account_id` to be a primitive type in the JSON string but got " + data['account_id']);
        }
        // ensure the json data is a string
        if (data['key'] && !(typeof data['key'] === 'string' || data['key'] instanceof String)) {
            throw new Error("Expected the field `key` to be a primitive type in the JSON string but got " + data['key']);
        }
        // ensure the json data is a string
        if (data['name'] && !(typeof data['name'] === 'string' || data['name'] instanceof String)) {
            throw new Error("Expected the field `name` to be a primitive type in the JSON string but got " + data['name']);
        }
        // ensure the json data is a string
        if (data['description'] && !(typeof data['description'] === 'string' || data['description'] instanceof String)) {
            throw new Error("Expected the field `description` to be a primitive type in the JSON string but got " + data['description']);
        }
        // ensure the json data is a string
        if (data['type'] && !(typeof data['type'] === 'string' || data['type'] instanceof String)) {
            throw new Error("Expected the field `type` to be a primitive type in the JSON string but got " + data['type']);
        }
        // ensure the json data is a string
        if (data['protocol'] && !(typeof data['protocol'] === 'string' || data['protocol'] instanceof String)) {
            throw new Error("Expected the field `protocol` to be a primitive type in the JSON string but got " + data['protocol']);
        }
        // ensure the json data is a string
        if (data['url'] && !(typeof data['url'] === 'string' || data['url'] instanceof String)) {
            throw new Error("Expected the field `url` to be a primitive type in the JSON string but got " + data['url']);
        }
        if (data['methods']) { // data not null
            // ensure the json data is an array
            if (!Array.isArray(data['methods'])) {
                throw new Error("Expected the field `methods` to be an array in the JSON data but got " + data['methods']);
            }
            // validate the optional field `methods` (array)
            for (const item of data['methods']) {
                ToolMethod.validateJSON(item);
            };
        }
        // validate the optional field `auth_data`
        if (data['auth_data']) { // data not null
          ToolAuthData.validateJSON(data['auth_data']);
        }
        // ensure the json data is a string
        if (data['status'] && !(typeof data['status'] === 'string' || data['status'] instanceof String)) {
            throw new Error("Expected the field `status` to be a primitive type in the JSON string but got " + data['status']);
        }
        // ensure the json data is a string
        if (data['status_info'] && !(typeof data['status_info'] === 'string' || data['status_info'] instanceof String)) {
            throw new Error("Expected the field `status_info` to be a primitive type in the JSON string but got " + data['status_info']);
        }

        return true;
    }


}

Tool.RequiredProperties = ["id", "account_id", "template_id", "name", "description", "type", "protocol", "url", "methods", "auth_data", "status", "status_info", "created_at", "updated_at"];

/**
 * ID инструмента
 * @member {Number} id
 */
Tool.prototype['id'] = undefined;

/**
 * Логин аккаунта-владельца
 * @member {String} account_id
 */
Tool.prototype['account_id'] = undefined;

/**
 * ID шаблона маркетплейса, из которого установлен инструмент. `null` — собственный MCP-сервер
 * @member {Number} template_id
 */
Tool.prototype['template_id'] = undefined;

/**
 * Ключ шаблона маркетплейса. Сейчас в ответах не возвращается
 * @member {String} key
 */
Tool.prototype['key'] = undefined;

/**
 * Название инструмента
 * @member {String} name
 */
Tool.prototype['name'] = undefined;

/**
 * Описание инструмента
 * @member {String} description
 */
Tool.prototype['description'] = undefined;

/**
 * Тип инструмента. У инструментов из шаблонов может быть `null`
 * @member {module:model/Tool.TypeEnum} type
 */
Tool.prototype['type'] = undefined;

/**
 * Транспорт MCP: `http` — Streamable HTTP, `sse` — Server-Sent Events. У инструментов из шаблонов всегда `null`
 * @member {module:model/Tool.ProtocolEnum} protocol
 */
Tool.prototype['protocol'] = undefined;

/**
 * Адрес MCP-сервера. У инструментов из шаблонов всегда `null`
 * @member {String} url
 */
Tool.prototype['url'] = undefined;

/**
 * Методы MCP-сервера. `null` или пустой массив — методы ещё не получены, например до завершения OAuth2-авторизации
 * @member {Array.<module:model/ToolMethod>} methods
 */
Tool.prototype['methods'] = undefined;

/**
 * @member {module:model/ToolAuthData} auth_data
 */
Tool.prototype['auth_data'] = undefined;

/**
 * Статус инструмента: `active` — работает, `inactive` — выключен вручную, `pending_auth` — ожидает OAuth2-авторизации, `error` — последнее обновление методов завершилось ошибкой (причина в `status_info`). Агент вызывает только инструменты в статусе `active`
 * @member {module:model/Tool.StatusEnum} status
 */
Tool.prototype['status'] = undefined;

/**
 * Причина статуса `error`
 * @member {String} status_info
 */
Tool.prototype['status_info'] = undefined;

/**
 * Дата и время создания
 * @member {Date} created_at
 */
Tool.prototype['created_at'] = undefined;

/**
 * Дата и время последнего изменения
 * @member {Date} updated_at
 */
Tool.prototype['updated_at'] = undefined;





/**
 * Allowed values for the <code>type</code> property.
 * @enum {String}
 * @readonly
 */
Tool['TypeEnum'] = {

    /**
     * value: "MCP"
     * @const
     */
    "MCP": "MCP",

    /**
     * value: "null"
     * @const
     */
    "null": "null"
};


/**
 * Allowed values for the <code>protocol</code> property.
 * @enum {String}
 * @readonly
 */
Tool['ProtocolEnum'] = {

    /**
     * value: "http"
     * @const
     */
    "http": "http",

    /**
     * value: "sse"
     * @const
     */
    "sse": "sse",

    /**
     * value: "null"
     * @const
     */
    "null": "null"
};


/**
 * Allowed values for the <code>status</code> property.
 * @enum {String}
 * @readonly
 */
Tool['StatusEnum'] = {

    /**
     * value: "active"
     * @const
     */
    "active": "active",

    /**
     * value: "inactive"
     * @const
     */
    "inactive": "inactive",

    /**
     * value: "pending_auth"
     * @const
     */
    "pending_auth": "pending_auth",

    /**
     * value: "error"
     * @const
     */
    "error": "error"
};



export default Tool;

