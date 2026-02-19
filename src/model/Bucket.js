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
import BucketDiskStats from './BucketDiskStats';
import BucketWebsiteConfig from './BucketWebsiteConfig';

/**
 * The Bucket model module.
 * @module model/Bucket
 * @version 1.0.0
 */
class Bucket {
    /**
     * Constructs a new <code>Bucket</code>.
     * Хранилище S3
     * @alias module:model/Bucket
     * @param id {Number} ID для каждого экземпляра хранилища. Автоматически генерируется при создании.
     * @param name {String} Удобочитаемое имя, установленное для хранилища.
     * @param description {String} Комментарий к хранилищу.
     * @param diskStats {module:model/BucketDiskStats} 
     * @param type {module:model/Bucket.TypeEnum} Тип хранилища.
     * @param presetId {Number} ID тарифа хранилища.
     * @param configuratorId {Number} ID конфигуратора хранилища.
     * @param avatarLink {String} Ссылка на аватар хранилища.
     * @param status {module:model/Bucket.StatusEnum} Статус хранилища.
     * @param objectAmount {Number} Количество файлов в хранилище.
     * @param location {String} Регион хранилища.
     * @param hostname {String} Адрес хранилища для подключения.
     * @param accessKey {String} Ключ доступа от хранилища.
     * @param secretKey {String} Секретный ключ доступа от хранилища.
     * @param movedInQuarantineAt {Date} Дата перемещения в карантин.
     * @param storageClass {module:model/Bucket.StorageClassEnum} Класс хранилища.
     * @param projectId {Number} ID проекта.
     * @param rateId {Number} ID тарифа.
     * @param websiteConfig {module:model/BucketWebsiteConfig} 
     * @param isAllowAutoUpgrade {Boolean} Разрешено ли автоматическое повышение тарифа.
     */
    constructor(id, name, description, diskStats, type, presetId, configuratorId, avatarLink, status, objectAmount, location, hostname, accessKey, secretKey, movedInQuarantineAt, storageClass, projectId, rateId, websiteConfig, isAllowAutoUpgrade) { 
        
        Bucket.initialize(this, id, name, description, diskStats, type, presetId, configuratorId, avatarLink, status, objectAmount, location, hostname, accessKey, secretKey, movedInQuarantineAt, storageClass, projectId, rateId, websiteConfig, isAllowAutoUpgrade);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, id, name, description, diskStats, type, presetId, configuratorId, avatarLink, status, objectAmount, location, hostname, accessKey, secretKey, movedInQuarantineAt, storageClass, projectId, rateId, websiteConfig, isAllowAutoUpgrade) { 
        obj['id'] = id;
        obj['name'] = name;
        obj['description'] = description;
        obj['disk_stats'] = diskStats;
        obj['type'] = type;
        obj['preset_id'] = presetId;
        obj['configurator_id'] = configuratorId;
        obj['avatar_link'] = avatarLink;
        obj['status'] = status;
        obj['object_amount'] = objectAmount;
        obj['location'] = location;
        obj['hostname'] = hostname;
        obj['access_key'] = accessKey;
        obj['secret_key'] = secretKey;
        obj['moved_in_quarantine_at'] = movedInQuarantineAt;
        obj['storage_class'] = storageClass;
        obj['project_id'] = projectId;
        obj['rate_id'] = rateId;
        obj['website_config'] = websiteConfig;
        obj['is_allow_auto_upgrade'] = isAllowAutoUpgrade;
    }

    /**
     * Constructs a <code>Bucket</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Bucket} obj Optional instance to populate.
     * @return {module:model/Bucket} The populated <code>Bucket</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new Bucket();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'Number');
            }
            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('description')) {
                obj['description'] = ApiClient.convertToType(data['description'], 'String');
            }
            if (data.hasOwnProperty('disk_stats')) {
                obj['disk_stats'] = BucketDiskStats.constructFromObject(data['disk_stats']);
            }
            if (data.hasOwnProperty('type')) {
                obj['type'] = ApiClient.convertToType(data['type'], 'String');
            }
            if (data.hasOwnProperty('preset_id')) {
                obj['preset_id'] = ApiClient.convertToType(data['preset_id'], 'Number');
            }
            if (data.hasOwnProperty('configurator_id')) {
                obj['configurator_id'] = ApiClient.convertToType(data['configurator_id'], 'Number');
            }
            if (data.hasOwnProperty('avatar_link')) {
                obj['avatar_link'] = ApiClient.convertToType(data['avatar_link'], 'String');
            }
            if (data.hasOwnProperty('status')) {
                obj['status'] = ApiClient.convertToType(data['status'], 'String');
            }
            if (data.hasOwnProperty('object_amount')) {
                obj['object_amount'] = ApiClient.convertToType(data['object_amount'], 'Number');
            }
            if (data.hasOwnProperty('location')) {
                obj['location'] = ApiClient.convertToType(data['location'], 'String');
            }
            if (data.hasOwnProperty('hostname')) {
                obj['hostname'] = ApiClient.convertToType(data['hostname'], 'String');
            }
            if (data.hasOwnProperty('access_key')) {
                obj['access_key'] = ApiClient.convertToType(data['access_key'], 'String');
            }
            if (data.hasOwnProperty('secret_key')) {
                obj['secret_key'] = ApiClient.convertToType(data['secret_key'], 'String');
            }
            if (data.hasOwnProperty('moved_in_quarantine_at')) {
                obj['moved_in_quarantine_at'] = ApiClient.convertToType(data['moved_in_quarantine_at'], 'Date');
            }
            if (data.hasOwnProperty('storage_class')) {
                obj['storage_class'] = ApiClient.convertToType(data['storage_class'], 'String');
            }
            if (data.hasOwnProperty('project_id')) {
                obj['project_id'] = ApiClient.convertToType(data['project_id'], 'Number');
            }
            if (data.hasOwnProperty('rate_id')) {
                obj['rate_id'] = ApiClient.convertToType(data['rate_id'], 'Number');
            }
            if (data.hasOwnProperty('website_config')) {
                obj['website_config'] = BucketWebsiteConfig.constructFromObject(data['website_config']);
            }
            if (data.hasOwnProperty('is_allow_auto_upgrade')) {
                obj['is_allow_auto_upgrade'] = ApiClient.convertToType(data['is_allow_auto_upgrade'], 'Boolean');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>Bucket</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>Bucket</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of Bucket.RequiredProperties) {
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
        // validate the optional field `disk_stats`
        if (data['disk_stats']) { // data not null
          BucketDiskStats.validateJSON(data['disk_stats']);
        }
        // ensure the json data is a string
        if (data['type'] && !(typeof data['type'] === 'string' || data['type'] instanceof String)) {
            throw new Error("Expected the field `type` to be a primitive type in the JSON string but got " + data['type']);
        }
        // ensure the json data is a string
        if (data['avatar_link'] && !(typeof data['avatar_link'] === 'string' || data['avatar_link'] instanceof String)) {
            throw new Error("Expected the field `avatar_link` to be a primitive type in the JSON string but got " + data['avatar_link']);
        }
        // ensure the json data is a string
        if (data['status'] && !(typeof data['status'] === 'string' || data['status'] instanceof String)) {
            throw new Error("Expected the field `status` to be a primitive type in the JSON string but got " + data['status']);
        }
        // ensure the json data is a string
        if (data['location'] && !(typeof data['location'] === 'string' || data['location'] instanceof String)) {
            throw new Error("Expected the field `location` to be a primitive type in the JSON string but got " + data['location']);
        }
        // ensure the json data is a string
        if (data['hostname'] && !(typeof data['hostname'] === 'string' || data['hostname'] instanceof String)) {
            throw new Error("Expected the field `hostname` to be a primitive type in the JSON string but got " + data['hostname']);
        }
        // ensure the json data is a string
        if (data['access_key'] && !(typeof data['access_key'] === 'string' || data['access_key'] instanceof String)) {
            throw new Error("Expected the field `access_key` to be a primitive type in the JSON string but got " + data['access_key']);
        }
        // ensure the json data is a string
        if (data['secret_key'] && !(typeof data['secret_key'] === 'string' || data['secret_key'] instanceof String)) {
            throw new Error("Expected the field `secret_key` to be a primitive type in the JSON string but got " + data['secret_key']);
        }
        // ensure the json data is a string
        if (data['storage_class'] && !(typeof data['storage_class'] === 'string' || data['storage_class'] instanceof String)) {
            throw new Error("Expected the field `storage_class` to be a primitive type in the JSON string but got " + data['storage_class']);
        }
        // validate the optional field `website_config`
        if (data['website_config']) { // data not null
          BucketWebsiteConfig.validateJSON(data['website_config']);
        }

        return true;
    }


}

Bucket.RequiredProperties = ["id", "name", "description", "disk_stats", "type", "preset_id", "configurator_id", "avatar_link", "status", "object_amount", "location", "hostname", "access_key", "secret_key", "moved_in_quarantine_at", "storage_class", "project_id", "rate_id", "website_config", "is_allow_auto_upgrade"];

/**
 * ID для каждого экземпляра хранилища. Автоматически генерируется при создании.
 * @member {Number} id
 */
Bucket.prototype['id'] = undefined;

/**
 * Удобочитаемое имя, установленное для хранилища.
 * @member {String} name
 */
Bucket.prototype['name'] = undefined;

/**
 * Комментарий к хранилищу.
 * @member {String} description
 */
Bucket.prototype['description'] = undefined;

/**
 * @member {module:model/BucketDiskStats} disk_stats
 */
Bucket.prototype['disk_stats'] = undefined;

/**
 * Тип хранилища.
 * @member {module:model/Bucket.TypeEnum} type
 */
Bucket.prototype['type'] = undefined;

/**
 * ID тарифа хранилища.
 * @member {Number} preset_id
 */
Bucket.prototype['preset_id'] = undefined;

/**
 * ID конфигуратора хранилища.
 * @member {Number} configurator_id
 */
Bucket.prototype['configurator_id'] = undefined;

/**
 * Ссылка на аватар хранилища.
 * @member {String} avatar_link
 */
Bucket.prototype['avatar_link'] = undefined;

/**
 * Статус хранилища.
 * @member {module:model/Bucket.StatusEnum} status
 */
Bucket.prototype['status'] = undefined;

/**
 * Количество файлов в хранилище.
 * @member {Number} object_amount
 */
Bucket.prototype['object_amount'] = undefined;

/**
 * Регион хранилища.
 * @member {String} location
 */
Bucket.prototype['location'] = undefined;

/**
 * Адрес хранилища для подключения.
 * @member {String} hostname
 */
Bucket.prototype['hostname'] = undefined;

/**
 * Ключ доступа от хранилища.
 * @member {String} access_key
 */
Bucket.prototype['access_key'] = undefined;

/**
 * Секретный ключ доступа от хранилища.
 * @member {String} secret_key
 */
Bucket.prototype['secret_key'] = undefined;

/**
 * Дата перемещения в карантин.
 * @member {Date} moved_in_quarantine_at
 */
Bucket.prototype['moved_in_quarantine_at'] = undefined;

/**
 * Класс хранилища.
 * @member {module:model/Bucket.StorageClassEnum} storage_class
 */
Bucket.prototype['storage_class'] = undefined;

/**
 * ID проекта.
 * @member {Number} project_id
 */
Bucket.prototype['project_id'] = undefined;

/**
 * ID тарифа.
 * @member {Number} rate_id
 */
Bucket.prototype['rate_id'] = undefined;

/**
 * @member {module:model/BucketWebsiteConfig} website_config
 */
Bucket.prototype['website_config'] = undefined;

/**
 * Разрешено ли автоматическое повышение тарифа.
 * @member {Boolean} is_allow_auto_upgrade
 */
Bucket.prototype['is_allow_auto_upgrade'] = undefined;





/**
 * Allowed values for the <code>type</code> property.
 * @enum {String}
 * @readonly
 */
Bucket['TypeEnum'] = {

    /**
     * value: "private"
     * @const
     */
    "private": "private",

    /**
     * value: "public"
     * @const
     */
    "public": "public"
};


/**
 * Allowed values for the <code>status</code> property.
 * @enum {String}
 * @readonly
 */
Bucket['StatusEnum'] = {

    /**
     * value: "no_paid"
     * @const
     */
    "no_paid": "no_paid",

    /**
     * value: "created"
     * @const
     */
    "created": "created",

    /**
     * value: "transfer"
     * @const
     */
    "transfer": "transfer"
};


/**
 * Allowed values for the <code>storage_class</code> property.
 * @enum {String}
 * @readonly
 */
Bucket['StorageClassEnum'] = {

    /**
     * value: "cold"
     * @const
     */
    "cold": "cold",

    /**
     * value: "hot"
     * @const
     */
    "hot": "hot"
};



export default Bucket;

