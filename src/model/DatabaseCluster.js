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
import ConfigParameters from './ConfigParameters';
import DatabaseClusterDiskStats from './DatabaseClusterDiskStats';
import DatabaseClusterNetworksInner from './DatabaseClusterNetworksInner';
import DbType from './DbType';

/**
 * The DatabaseCluster model module.
 * @module model/DatabaseCluster
 * @version 1.0.0
 */
class DatabaseCluster {
    /**
     * Constructs a new <code>DatabaseCluster</code>.
     * Кластер базы данных
     * @alias module:model/DatabaseCluster
     * @param id {Number} ID для каждого экземпляра базы данных. Автоматически генерируется при создании.
     * @param createdAt {String} Значение времени, указанное в комбинированном формате даты и времени ISO8601, которое представляет, когда была создана база данных.
     * @param location {module:model/DatabaseCluster.LocationEnum} Локация сервера.
     * @param name {String} Название кластера базы данных.
     * @param networks {Array.<module:model/DatabaseClusterNetworksInner>} Список сетей кластера базы данных.
     * @param type {module:model/DbType} 
     * @param hashType {module:model/DatabaseCluster.HashTypeEnum} Тип хеширования кластера базы данных (mysql5 | mysql | postgres).
     * @param port {Number} Порт
     * @param status {module:model/DatabaseCluster.StatusEnum} Текущий статус кластера базы данных.
     * @param presetId {Number} ID тарифа.
     * @param diskStats {module:model/DatabaseClusterDiskStats} 
     * @param configParameters {module:model/ConfigParameters} 
     * @param isEnabledPublicNetwork {Boolean} Доступность публичного IP-адреса
     */
    constructor(id, createdAt, location, name, networks, type, hashType, port, status, presetId, diskStats, configParameters, isEnabledPublicNetwork) { 
        
        DatabaseCluster.initialize(this, id, createdAt, location, name, networks, type, hashType, port, status, presetId, diskStats, configParameters, isEnabledPublicNetwork);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, id, createdAt, location, name, networks, type, hashType, port, status, presetId, diskStats, configParameters, isEnabledPublicNetwork) { 
        obj['id'] = id;
        obj['created_at'] = createdAt;
        obj['location'] = location;
        obj['name'] = name;
        obj['networks'] = networks;
        obj['type'] = type;
        obj['hash_type'] = hashType;
        obj['port'] = port;
        obj['status'] = status;
        obj['preset_id'] = presetId;
        obj['disk_stats'] = diskStats;
        obj['config_parameters'] = configParameters;
        obj['is_enabled_public_network'] = isEnabledPublicNetwork;
    }

    /**
     * Constructs a <code>DatabaseCluster</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/DatabaseCluster} obj Optional instance to populate.
     * @return {module:model/DatabaseCluster} The populated <code>DatabaseCluster</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new DatabaseCluster();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'Number');
            }
            if (data.hasOwnProperty('created_at')) {
                obj['created_at'] = ApiClient.convertToType(data['created_at'], 'String');
            }
            if (data.hasOwnProperty('location')) {
                obj['location'] = ApiClient.convertToType(data['location'], 'String');
            }
            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('networks')) {
                obj['networks'] = ApiClient.convertToType(data['networks'], [DatabaseClusterNetworksInner]);
            }
            if (data.hasOwnProperty('type')) {
                obj['type'] = DbType.constructFromObject(data['type']);
            }
            if (data.hasOwnProperty('hash_type')) {
                obj['hash_type'] = ApiClient.convertToType(data['hash_type'], 'String');
            }
            if (data.hasOwnProperty('port')) {
                obj['port'] = ApiClient.convertToType(data['port'], 'Number');
            }
            if (data.hasOwnProperty('status')) {
                obj['status'] = ApiClient.convertToType(data['status'], 'String');
            }
            if (data.hasOwnProperty('preset_id')) {
                obj['preset_id'] = ApiClient.convertToType(data['preset_id'], 'Number');
            }
            if (data.hasOwnProperty('disk_stats')) {
                obj['disk_stats'] = DatabaseClusterDiskStats.constructFromObject(data['disk_stats']);
            }
            if (data.hasOwnProperty('config_parameters')) {
                obj['config_parameters'] = ConfigParameters.constructFromObject(data['config_parameters']);
            }
            if (data.hasOwnProperty('is_enabled_public_network')) {
                obj['is_enabled_public_network'] = ApiClient.convertToType(data['is_enabled_public_network'], 'Boolean');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>DatabaseCluster</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>DatabaseCluster</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of DatabaseCluster.RequiredProperties) {
            if (!data[property]) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }
        // ensure the json data is a string
        if (data['created_at'] && !(typeof data['created_at'] === 'string' || data['created_at'] instanceof String)) {
            throw new Error("Expected the field `created_at` to be a primitive type in the JSON string but got " + data['created_at']);
        }
        // ensure the json data is a string
        if (data['location'] && !(typeof data['location'] === 'string' || data['location'] instanceof String)) {
            throw new Error("Expected the field `location` to be a primitive type in the JSON string but got " + data['location']);
        }
        // ensure the json data is a string
        if (data['name'] && !(typeof data['name'] === 'string' || data['name'] instanceof String)) {
            throw new Error("Expected the field `name` to be a primitive type in the JSON string but got " + data['name']);
        }
        if (data['networks']) { // data not null
            // ensure the json data is an array
            if (!Array.isArray(data['networks'])) {
                throw new Error("Expected the field `networks` to be an array in the JSON data but got " + data['networks']);
            }
            // validate the optional field `networks` (array)
            for (const item of data['networks']) {
                DatabaseClusterNetworksInner.validateJSON(item);
            };
        }
        // ensure the json data is a string
        if (data['hash_type'] && !(typeof data['hash_type'] === 'string' || data['hash_type'] instanceof String)) {
            throw new Error("Expected the field `hash_type` to be a primitive type in the JSON string but got " + data['hash_type']);
        }
        // ensure the json data is a string
        if (data['status'] && !(typeof data['status'] === 'string' || data['status'] instanceof String)) {
            throw new Error("Expected the field `status` to be a primitive type in the JSON string but got " + data['status']);
        }
        // validate the optional field `disk_stats`
        if (data['disk_stats']) { // data not null
          DatabaseClusterDiskStats.validateJSON(data['disk_stats']);
        }
        // validate the optional field `config_parameters`
        if (data['config_parameters']) { // data not null
          ConfigParameters.validateJSON(data['config_parameters']);
        }

        return true;
    }


}

DatabaseCluster.RequiredProperties = ["id", "created_at", "location", "name", "networks", "type", "hash_type", "port", "status", "preset_id", "disk_stats", "config_parameters", "is_enabled_public_network"];

/**
 * ID для каждого экземпляра базы данных. Автоматически генерируется при создании.
 * @member {Number} id
 */
DatabaseCluster.prototype['id'] = undefined;

/**
 * Значение времени, указанное в комбинированном формате даты и времени ISO8601, которое представляет, когда была создана база данных.
 * @member {String} created_at
 */
DatabaseCluster.prototype['created_at'] = undefined;

/**
 * Локация сервера.
 * @member {module:model/DatabaseCluster.LocationEnum} location
 */
DatabaseCluster.prototype['location'] = undefined;

/**
 * Название кластера базы данных.
 * @member {String} name
 */
DatabaseCluster.prototype['name'] = undefined;

/**
 * Список сетей кластера базы данных.
 * @member {Array.<module:model/DatabaseClusterNetworksInner>} networks
 */
DatabaseCluster.prototype['networks'] = undefined;

/**
 * @member {module:model/DbType} type
 */
DatabaseCluster.prototype['type'] = undefined;

/**
 * Тип хеширования кластера базы данных (mysql5 | mysql | postgres).
 * @member {module:model/DatabaseCluster.HashTypeEnum} hash_type
 */
DatabaseCluster.prototype['hash_type'] = undefined;

/**
 * Порт
 * @member {Number} port
 */
DatabaseCluster.prototype['port'] = undefined;

/**
 * Текущий статус кластера базы данных.
 * @member {module:model/DatabaseCluster.StatusEnum} status
 */
DatabaseCluster.prototype['status'] = undefined;

/**
 * ID тарифа.
 * @member {Number} preset_id
 */
DatabaseCluster.prototype['preset_id'] = undefined;

/**
 * @member {module:model/DatabaseClusterDiskStats} disk_stats
 */
DatabaseCluster.prototype['disk_stats'] = undefined;

/**
 * @member {module:model/ConfigParameters} config_parameters
 */
DatabaseCluster.prototype['config_parameters'] = undefined;

/**
 * Доступность публичного IP-адреса
 * @member {Boolean} is_enabled_public_network
 */
DatabaseCluster.prototype['is_enabled_public_network'] = undefined;





/**
 * Allowed values for the <code>location</code> property.
 * @enum {String}
 * @readonly
 */
DatabaseCluster['LocationEnum'] = {

    /**
     * value: "ru-1"
     * @const
     */
    "ru-1": "ru-1",

    /**
     * value: "ru-2"
     * @const
     */
    "ru-2": "ru-2",

    /**
     * value: "pl-1"
     * @const
     */
    "pl-1": "pl-1",

    /**
     * value: "kz-1"
     * @const
     */
    "kz-1": "kz-1"
};


/**
 * Allowed values for the <code>hash_type</code> property.
 * @enum {String}
 * @readonly
 */
DatabaseCluster['HashTypeEnum'] = {

    /**
     * value: "caching_sha2"
     * @const
     */
    "caching_sha2": "caching_sha2",

    /**
     * value: "mysql_native"
     * @const
     */
    "mysql_native": "mysql_native",

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
DatabaseCluster['StatusEnum'] = {

    /**
     * value: "started"
     * @const
     */
    "started": "started",

    /**
     * value: "starting"
     * @const
     */
    "starting": "starting",

    /**
     * value: "stopped"
     * @const
     */
    "stopped": "stopped",

    /**
     * value: "no_paid"
     * @const
     */
    "no_paid": "no_paid",

    /**
     * value: "lan_transfer"
     * @const
     */
    "lan_transfer": "lan_transfer",

    /**
     * value: "error"
     * @const
     */
    "error": "error",

    /**
     * value: "blocked"
     * @const
     */
    "blocked": "blocked",

    /**
     * value: "backup_recovery"
     * @const
     */
    "backup_recovery": "backup_recovery",

    /**
     * value: "rebooting"
     * @const
     */
    "rebooting": "rebooting",

    /**
     * value: "turning_off"
     * @const
     */
    "turning_off": "turning_off",

    /**
     * value: "turning_on"
     * @const
     */
    "turning_on": "turning_on"
};



export default DatabaseCluster;

