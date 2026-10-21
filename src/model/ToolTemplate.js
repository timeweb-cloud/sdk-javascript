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
import ToolTemplateConfigSchema from './ToolTemplateConfigSchema';

/**
 * The ToolTemplate model module.
 * @module model/ToolTemplate
 * @version 1.0.0
 */
class ToolTemplate {
    /**
     * Constructs a new <code>ToolTemplate</code>.
     * Шаблон MCP-инструмента из маркетплейса
     * @alias module:model/ToolTemplate
     * @param id {Number} ID шаблона. Передаётся в `template_id` при установке
     * @param name {String} Название
     * @param description {String} Описание
     * @param type {module:model/ToolTemplate.TypeEnum} Тип инструмента
     * @param version {String} Версия шаблона
     * @param isApproved {module:model/ToolTemplate.IsApprovedEnum} Шаблон одобрен для маркетплейса: `1` — да, `0` — нет
     * @param isSystem {module:model/ToolTemplate.IsSystemEnum} Системный шаблон платформы: `1` — да, `0` — нет
     * @param installCount {Number} Сколько раз шаблон установлен
     * @param authType {String} Способ авторизации на MCP-сервере
     * @param deploymentType {module:model/ToolTemplate.DeploymentTypeEnum} Где работает MCP-сервер: `managed` — на стороне Timeweb Cloud, `external` — у стороннего сервиса
     * @param createdAt {Date} Дата и время создания
     * @param updatedAt {Date} Дата и время последнего изменения
     */
    constructor(id, name, description, type, version, isApproved, isSystem, installCount, authType, deploymentType, createdAt, updatedAt) { 
        
        ToolTemplate.initialize(this, id, name, description, type, version, isApproved, isSystem, installCount, authType, deploymentType, createdAt, updatedAt);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, id, name, description, type, version, isApproved, isSystem, installCount, authType, deploymentType, createdAt, updatedAt) { 
        obj['id'] = id;
        obj['name'] = name;
        obj['description'] = description;
        obj['type'] = type;
        obj['version'] = version;
        obj['is_approved'] = isApproved;
        obj['is_system'] = isSystem;
        obj['install_count'] = installCount;
        obj['auth_type'] = authType;
        obj['deployment_type'] = deploymentType;
        obj['created_at'] = createdAt;
        obj['updated_at'] = updatedAt;
    }

    /**
     * Constructs a <code>ToolTemplate</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ToolTemplate} obj Optional instance to populate.
     * @return {module:model/ToolTemplate} The populated <code>ToolTemplate</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new ToolTemplate();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'Number');
            }
            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('key')) {
                obj['key'] = ApiClient.convertToType(data['key'], 'String');
            }
            if (data.hasOwnProperty('description')) {
                obj['description'] = ApiClient.convertToType(data['description'], 'String');
            }
            if (data.hasOwnProperty('type')) {
                obj['type'] = ApiClient.convertToType(data['type'], 'String');
            }
            if (data.hasOwnProperty('version')) {
                obj['version'] = ApiClient.convertToType(data['version'], 'String');
            }
            if (data.hasOwnProperty('is_approved')) {
                obj['is_approved'] = ApiClient.convertToType(data['is_approved'], 'Number');
            }
            if (data.hasOwnProperty('author_account_id')) {
                obj['author_account_id'] = ApiClient.convertToType(data['author_account_id'], 'String');
            }
            if (data.hasOwnProperty('is_system')) {
                obj['is_system'] = ApiClient.convertToType(data['is_system'], 'Number');
            }
            if (data.hasOwnProperty('install_count')) {
                obj['install_count'] = ApiClient.convertToType(data['install_count'], 'Number');
            }
            if (data.hasOwnProperty('category')) {
                obj['category'] = ApiClient.convertToType(data['category'], 'String');
            }
            if (data.hasOwnProperty('config_schema')) {
                obj['config_schema'] = ToolTemplateConfigSchema.constructFromObject(data['config_schema']);
            }
            if (data.hasOwnProperty('auth_type')) {
                obj['auth_type'] = ApiClient.convertToType(data['auth_type'], 'String');
            }
            if (data.hasOwnProperty('deployment_type')) {
                obj['deployment_type'] = ApiClient.convertToType(data['deployment_type'], 'String');
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
     * Validates the JSON data with respect to <code>ToolTemplate</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>ToolTemplate</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of ToolTemplate.RequiredProperties) {
            if (!data[property]) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }
        // ensure the json data is a string
        if (data['name'] && !(typeof data['name'] === 'string' || data['name'] instanceof String)) {
            throw new Error("Expected the field `name` to be a primitive type in the JSON string but got " + data['name']);
        }
        // ensure the json data is a string
        if (data['key'] && !(typeof data['key'] === 'string' || data['key'] instanceof String)) {
            throw new Error("Expected the field `key` to be a primitive type in the JSON string but got " + data['key']);
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
        if (data['version'] && !(typeof data['version'] === 'string' || data['version'] instanceof String)) {
            throw new Error("Expected the field `version` to be a primitive type in the JSON string but got " + data['version']);
        }
        // ensure the json data is a string
        if (data['author_account_id'] && !(typeof data['author_account_id'] === 'string' || data['author_account_id'] instanceof String)) {
            throw new Error("Expected the field `author_account_id` to be a primitive type in the JSON string but got " + data['author_account_id']);
        }
        // ensure the json data is a string
        if (data['category'] && !(typeof data['category'] === 'string' || data['category'] instanceof String)) {
            throw new Error("Expected the field `category` to be a primitive type in the JSON string but got " + data['category']);
        }
        // validate the optional field `config_schema`
        if (data['config_schema']) { // data not null
          ToolTemplateConfigSchema.validateJSON(data['config_schema']);
        }
        // ensure the json data is a string
        if (data['auth_type'] && !(typeof data['auth_type'] === 'string' || data['auth_type'] instanceof String)) {
            throw new Error("Expected the field `auth_type` to be a primitive type in the JSON string but got " + data['auth_type']);
        }
        // ensure the json data is a string
        if (data['deployment_type'] && !(typeof data['deployment_type'] === 'string' || data['deployment_type'] instanceof String)) {
            throw new Error("Expected the field `deployment_type` to be a primitive type in the JSON string but got " + data['deployment_type']);
        }

        return true;
    }


}

ToolTemplate.RequiredProperties = ["id", "name", "description", "type", "version", "is_approved", "is_system", "install_count", "auth_type", "deployment_type", "created_at", "updated_at"];

/**
 * ID шаблона. Передаётся в `template_id` при установке
 * @member {Number} id
 */
ToolTemplate.prototype['id'] = undefined;

/**
 * Название
 * @member {String} name
 */
ToolTemplate.prototype['name'] = undefined;

/**
 * Уникальный ключ шаблона
 * @member {String} key
 */
ToolTemplate.prototype['key'] = undefined;

/**
 * Описание
 * @member {String} description
 */
ToolTemplate.prototype['description'] = undefined;

/**
 * Тип инструмента
 * @member {module:model/ToolTemplate.TypeEnum} type
 */
ToolTemplate.prototype['type'] = undefined;

/**
 * Версия шаблона
 * @member {String} version
 */
ToolTemplate.prototype['version'] = undefined;

/**
 * Шаблон одобрен для маркетплейса: `1` — да, `0` — нет
 * @member {module:model/ToolTemplate.IsApprovedEnum} is_approved
 */
ToolTemplate.prototype['is_approved'] = undefined;

/**
 * Автор шаблона. `null` — шаблон Timeweb Cloud
 * @member {String} author_account_id
 */
ToolTemplate.prototype['author_account_id'] = undefined;

/**
 * Системный шаблон платформы: `1` — да, `0` — нет
 * @member {module:model/ToolTemplate.IsSystemEnum} is_system
 */
ToolTemplate.prototype['is_system'] = undefined;

/**
 * Сколько раз шаблон установлен
 * @member {Number} install_count
 */
ToolTemplate.prototype['install_count'] = undefined;

/**
 * Категория шаблона
 * @member {module:model/ToolTemplate.CategoryEnum} category
 */
ToolTemplate.prototype['category'] = undefined;

/**
 * @member {module:model/ToolTemplateConfigSchema} config_schema
 */
ToolTemplate.prototype['config_schema'] = undefined;

/**
 * Способ авторизации на MCP-сервере
 * @member {String} auth_type
 */
ToolTemplate.prototype['auth_type'] = undefined;

/**
 * Где работает MCP-сервер: `managed` — на стороне Timeweb Cloud, `external` — у стороннего сервиса
 * @member {module:model/ToolTemplate.DeploymentTypeEnum} deployment_type
 */
ToolTemplate.prototype['deployment_type'] = undefined;

/**
 * Дата и время создания
 * @member {Date} created_at
 */
ToolTemplate.prototype['created_at'] = undefined;

/**
 * Дата и время последнего изменения
 * @member {Date} updated_at
 */
ToolTemplate.prototype['updated_at'] = undefined;





/**
 * Allowed values for the <code>type</code> property.
 * @enum {String}
 * @readonly
 */
ToolTemplate['TypeEnum'] = {

    /**
     * value: "MCP"
     * @const
     */
    "MCP": "MCP"
};


/**
 * Allowed values for the <code>is_approved</code> property.
 * @enum {Number}
 * @readonly
 */
ToolTemplate['IsApprovedEnum'] = {

    /**
     * value: 0
     * @const
     */
    "0": 0,

    /**
     * value: 1
     * @const
     */
    "1": 1
};


/**
 * Allowed values for the <code>is_system</code> property.
 * @enum {Number}
 * @readonly
 */
ToolTemplate['IsSystemEnum'] = {

    /**
     * value: 0
     * @const
     */
    "0": 0,

    /**
     * value: 1
     * @const
     */
    "1": 1
};


/**
 * Allowed values for the <code>category</code> property.
 * @enum {String}
 * @readonly
 */
ToolTemplate['CategoryEnum'] = {

    /**
     * value: "search"
     * @const
     */
    "search": "search",

    /**
     * value: "null"
     * @const
     */
    "null": "null"
};


/**
 * Allowed values for the <code>deployment_type</code> property.
 * @enum {String}
 * @readonly
 */
ToolTemplate['DeploymentTypeEnum'] = {

    /**
     * value: "managed"
     * @const
     */
    "managed": "managed",

    /**
     * value: "external"
     * @const
     */
    "external": "external"
};



export default ToolTemplate;

