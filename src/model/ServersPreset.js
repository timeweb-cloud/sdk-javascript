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

/**
 * The ServersPreset model module.
 * @module model/ServersPreset
 * @version 1.0.0
 */
class ServersPreset {
    /**
     * Constructs a new <code>ServersPreset</code>.
     * @alias module:model/ServersPreset
     * @param id {Number} ID тарифа сервера.
     * @param location {module:model/ServersPreset.LocationEnum} Локация сервера.
     * @param price {Number} Стоимость в рублях.
     * @param cpu {Number} Количество ядер процессора.
     * @param cpuFrequency {String} Частота процессора.
     * @param ram {Number} Количество (в Мб) оперативной памяти.
     * @param disk {Number} Размер диска (в Мб).
     * @param diskType {module:model/ServersPreset.DiskTypeEnum} Тип диска.
     * @param bandwidth {Number} Пропускная способность тарифа.
     * @param description {String} Описание тарифа.
     * @param descriptionShort {String} Короткое описание тарифа.
     * @param isAllowedLocalNetwork {Boolean} Есть возможность подключения локальной сети
     * @param tags {Array.<String>} Список тегов тарифа.
     */
    constructor(id, location, price, cpu, cpuFrequency, ram, disk, diskType, bandwidth, description, descriptionShort, isAllowedLocalNetwork, tags) { 
        
        ServersPreset.initialize(this, id, location, price, cpu, cpuFrequency, ram, disk, diskType, bandwidth, description, descriptionShort, isAllowedLocalNetwork, tags);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, id, location, price, cpu, cpuFrequency, ram, disk, diskType, bandwidth, description, descriptionShort, isAllowedLocalNetwork, tags) { 
        obj['id'] = id;
        obj['location'] = location;
        obj['price'] = price;
        obj['cpu'] = cpu;
        obj['cpu_frequency'] = cpuFrequency;
        obj['ram'] = ram;
        obj['disk'] = disk;
        obj['disk_type'] = diskType;
        obj['bandwidth'] = bandwidth;
        obj['description'] = description;
        obj['description_short'] = descriptionShort;
        obj['is_allowed_local_network'] = isAllowedLocalNetwork;
        obj['tags'] = tags;
    }

    /**
     * Constructs a <code>ServersPreset</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ServersPreset} obj Optional instance to populate.
     * @return {module:model/ServersPreset} The populated <code>ServersPreset</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new ServersPreset();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'Number');
            }
            if (data.hasOwnProperty('location')) {
                obj['location'] = ApiClient.convertToType(data['location'], 'String');
            }
            if (data.hasOwnProperty('price')) {
                obj['price'] = ApiClient.convertToType(data['price'], 'Number');
            }
            if (data.hasOwnProperty('cpu')) {
                obj['cpu'] = ApiClient.convertToType(data['cpu'], 'Number');
            }
            if (data.hasOwnProperty('cpu_frequency')) {
                obj['cpu_frequency'] = ApiClient.convertToType(data['cpu_frequency'], 'String');
            }
            if (data.hasOwnProperty('ram')) {
                obj['ram'] = ApiClient.convertToType(data['ram'], 'Number');
            }
            if (data.hasOwnProperty('disk')) {
                obj['disk'] = ApiClient.convertToType(data['disk'], 'Number');
            }
            if (data.hasOwnProperty('disk_type')) {
                obj['disk_type'] = ApiClient.convertToType(data['disk_type'], 'String');
            }
            if (data.hasOwnProperty('bandwidth')) {
                obj['bandwidth'] = ApiClient.convertToType(data['bandwidth'], 'Number');
            }
            if (data.hasOwnProperty('description')) {
                obj['description'] = ApiClient.convertToType(data['description'], 'String');
            }
            if (data.hasOwnProperty('description_short')) {
                obj['description_short'] = ApiClient.convertToType(data['description_short'], 'String');
            }
            if (data.hasOwnProperty('is_allowed_local_network')) {
                obj['is_allowed_local_network'] = ApiClient.convertToType(data['is_allowed_local_network'], 'Boolean');
            }
            if (data.hasOwnProperty('tags')) {
                obj['tags'] = ApiClient.convertToType(data['tags'], ['String']);
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>ServersPreset</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>ServersPreset</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of ServersPreset.RequiredProperties) {
            if (!data[property]) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }
        // ensure the json data is a string
        if (data['location'] && !(typeof data['location'] === 'string' || data['location'] instanceof String)) {
            throw new Error("Expected the field `location` to be a primitive type in the JSON string but got " + data['location']);
        }
        // ensure the json data is a string
        if (data['cpu_frequency'] && !(typeof data['cpu_frequency'] === 'string' || data['cpu_frequency'] instanceof String)) {
            throw new Error("Expected the field `cpu_frequency` to be a primitive type in the JSON string but got " + data['cpu_frequency']);
        }
        // ensure the json data is a string
        if (data['disk_type'] && !(typeof data['disk_type'] === 'string' || data['disk_type'] instanceof String)) {
            throw new Error("Expected the field `disk_type` to be a primitive type in the JSON string but got " + data['disk_type']);
        }
        // ensure the json data is a string
        if (data['description'] && !(typeof data['description'] === 'string' || data['description'] instanceof String)) {
            throw new Error("Expected the field `description` to be a primitive type in the JSON string but got " + data['description']);
        }
        // ensure the json data is a string
        if (data['description_short'] && !(typeof data['description_short'] === 'string' || data['description_short'] instanceof String)) {
            throw new Error("Expected the field `description_short` to be a primitive type in the JSON string but got " + data['description_short']);
        }
        // ensure the json data is an array
        if (!Array.isArray(data['tags'])) {
            throw new Error("Expected the field `tags` to be an array in the JSON data but got " + data['tags']);
        }

        return true;
    }


}

ServersPreset.RequiredProperties = ["id", "location", "price", "cpu", "cpu_frequency", "ram", "disk", "disk_type", "bandwidth", "description", "description_short", "is_allowed_local_network", "tags"];

/**
 * ID тарифа сервера.
 * @member {Number} id
 */
ServersPreset.prototype['id'] = undefined;

/**
 * Локация сервера.
 * @member {module:model/ServersPreset.LocationEnum} location
 */
ServersPreset.prototype['location'] = undefined;

/**
 * Стоимость в рублях.
 * @member {Number} price
 */
ServersPreset.prototype['price'] = undefined;

/**
 * Количество ядер процессора.
 * @member {Number} cpu
 */
ServersPreset.prototype['cpu'] = undefined;

/**
 * Частота процессора.
 * @member {String} cpu_frequency
 */
ServersPreset.prototype['cpu_frequency'] = undefined;

/**
 * Количество (в Мб) оперативной памяти.
 * @member {Number} ram
 */
ServersPreset.prototype['ram'] = undefined;

/**
 * Размер диска (в Мб).
 * @member {Number} disk
 */
ServersPreset.prototype['disk'] = undefined;

/**
 * Тип диска.
 * @member {module:model/ServersPreset.DiskTypeEnum} disk_type
 */
ServersPreset.prototype['disk_type'] = undefined;

/**
 * Пропускная способность тарифа.
 * @member {Number} bandwidth
 */
ServersPreset.prototype['bandwidth'] = undefined;

/**
 * Описание тарифа.
 * @member {String} description
 */
ServersPreset.prototype['description'] = undefined;

/**
 * Короткое описание тарифа.
 * @member {String} description_short
 */
ServersPreset.prototype['description_short'] = undefined;

/**
 * Есть возможность подключения локальной сети
 * @member {Boolean} is_allowed_local_network
 */
ServersPreset.prototype['is_allowed_local_network'] = undefined;

/**
 * Список тегов тарифа.
 * @member {Array.<String>} tags
 */
ServersPreset.prototype['tags'] = undefined;





/**
 * Allowed values for the <code>location</code> property.
 * @enum {String}
 * @readonly
 */
ServersPreset['LocationEnum'] = {

    /**
     * value: "ru-1"
     * @const
     */
    "ru-1": "ru-1",

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
 * Allowed values for the <code>disk_type</code> property.
 * @enum {String}
 * @readonly
 */
ServersPreset['DiskTypeEnum'] = {

    /**
     * value: "ssd"
     * @const
     */
    "ssd": "ssd",

    /**
     * value: "nvme"
     * @const
     */
    "nvme": "nvme",

    /**
     * value: "hdd"
     * @const
     */
    "hdd": "hdd"
};



export default ServersPreset;

