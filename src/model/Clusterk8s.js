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
 * The Clusterk8s model module.
 * @module model/Clusterk8s
 * @version 1.0.0
 */
class Clusterk8s {
    /**
     * Constructs a new <code>Clusterk8s</code>.
     * Кластер
     * @alias module:model/Clusterk8s
     * @param id {Number} ID для каждого экземпляра кластера. Автоматически генерируется при создании.
     * @param name {String} Удобочитаемое имя, установленное для кластера.
     * @param createdAt {Date} Значение времени, указанное в комбинированном формате даты и времени ISO8601, которое представляет, когда был создан кластер.
     * @param status {module:model/Clusterk8s.StatusEnum} Статус кластера.
     * @param description {String} Описание кластера.
     * @param ha {Boolean} Описание появится позднее.
     * @param k8sVersion {String} Версия k8s.
     * @param networkDriver {String} Описание появится позднее.
     * @param ingress {Boolean} Описание появится позднее.
     * @param cpu {Number} Количество ядер процессора кластера.
     * @param ram {Number} Количество (в Мб) оперативной памяти кластера.
     * @param disk {Number} Размер (в Гб) диска кластера.
     * @param presetId {Number} Тип сервиса кластера.
     */
    constructor(id, name, createdAt, status, description, ha, k8sVersion, networkDriver, ingress, cpu, ram, disk, presetId) { 
        
        Clusterk8s.initialize(this, id, name, createdAt, status, description, ha, k8sVersion, networkDriver, ingress, cpu, ram, disk, presetId);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, id, name, createdAt, status, description, ha, k8sVersion, networkDriver, ingress, cpu, ram, disk, presetId) { 
        obj['id'] = id;
        obj['name'] = name;
        obj['created_at'] = createdAt;
        obj['status'] = status;
        obj['description'] = description;
        obj['ha'] = ha;
        obj['k8s_version'] = k8sVersion;
        obj['network_driver'] = networkDriver;
        obj['ingress'] = ingress;
        obj['cpu'] = cpu;
        obj['ram'] = ram;
        obj['disk'] = disk;
        obj['preset_id'] = presetId;
    }

    /**
     * Constructs a <code>Clusterk8s</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Clusterk8s} obj Optional instance to populate.
     * @return {module:model/Clusterk8s} The populated <code>Clusterk8s</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new Clusterk8s();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'Number');
            }
            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('created_at')) {
                obj['created_at'] = ApiClient.convertToType(data['created_at'], 'Date');
            }
            if (data.hasOwnProperty('status')) {
                obj['status'] = ApiClient.convertToType(data['status'], 'String');
            }
            if (data.hasOwnProperty('description')) {
                obj['description'] = ApiClient.convertToType(data['description'], 'String');
            }
            if (data.hasOwnProperty('ha')) {
                obj['ha'] = ApiClient.convertToType(data['ha'], 'Boolean');
            }
            if (data.hasOwnProperty('k8s_version')) {
                obj['k8s_version'] = ApiClient.convertToType(data['k8s_version'], 'String');
            }
            if (data.hasOwnProperty('network_driver')) {
                obj['network_driver'] = ApiClient.convertToType(data['network_driver'], 'String');
            }
            if (data.hasOwnProperty('ingress')) {
                obj['ingress'] = ApiClient.convertToType(data['ingress'], 'Boolean');
            }
            if (data.hasOwnProperty('cpu')) {
                obj['cpu'] = ApiClient.convertToType(data['cpu'], 'Number');
            }
            if (data.hasOwnProperty('ram')) {
                obj['ram'] = ApiClient.convertToType(data['ram'], 'Number');
            }
            if (data.hasOwnProperty('disk')) {
                obj['disk'] = ApiClient.convertToType(data['disk'], 'Number');
            }
            if (data.hasOwnProperty('preset_id')) {
                obj['preset_id'] = ApiClient.convertToType(data['preset_id'], 'Number');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>Clusterk8s</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>Clusterk8s</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of Clusterk8s.RequiredProperties) {
            if (!data[property]) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }
        // ensure the json data is a string
        if (data['name'] && !(typeof data['name'] === 'string' || data['name'] instanceof String)) {
            throw new Error("Expected the field `name` to be a primitive type in the JSON string but got " + data['name']);
        }
        // ensure the json data is a string
        if (data['status'] && !(typeof data['status'] === 'string' || data['status'] instanceof String)) {
            throw new Error("Expected the field `status` to be a primitive type in the JSON string but got " + data['status']);
        }
        // ensure the json data is a string
        if (data['description'] && !(typeof data['description'] === 'string' || data['description'] instanceof String)) {
            throw new Error("Expected the field `description` to be a primitive type in the JSON string but got " + data['description']);
        }
        // ensure the json data is a string
        if (data['k8s_version'] && !(typeof data['k8s_version'] === 'string' || data['k8s_version'] instanceof String)) {
            throw new Error("Expected the field `k8s_version` to be a primitive type in the JSON string but got " + data['k8s_version']);
        }
        // ensure the json data is a string
        if (data['network_driver'] && !(typeof data['network_driver'] === 'string' || data['network_driver'] instanceof String)) {
            throw new Error("Expected the field `network_driver` to be a primitive type in the JSON string but got " + data['network_driver']);
        }

        return true;
    }


}

Clusterk8s.RequiredProperties = ["id", "name", "created_at", "status", "description", "ha", "k8s_version", "network_driver", "ingress", "cpu", "ram", "disk", "preset_id"];

/**
 * ID для каждого экземпляра кластера. Автоматически генерируется при создании.
 * @member {Number} id
 */
Clusterk8s.prototype['id'] = undefined;

/**
 * Удобочитаемое имя, установленное для кластера.
 * @member {String} name
 */
Clusterk8s.prototype['name'] = undefined;

/**
 * Значение времени, указанное в комбинированном формате даты и времени ISO8601, которое представляет, когда был создан кластер.
 * @member {Date} created_at
 */
Clusterk8s.prototype['created_at'] = undefined;

/**
 * Статус кластера.
 * @member {module:model/Clusterk8s.StatusEnum} status
 */
Clusterk8s.prototype['status'] = undefined;

/**
 * Описание кластера.
 * @member {String} description
 */
Clusterk8s.prototype['description'] = undefined;

/**
 * Описание появится позднее.
 * @member {Boolean} ha
 */
Clusterk8s.prototype['ha'] = undefined;

/**
 * Версия k8s.
 * @member {String} k8s_version
 */
Clusterk8s.prototype['k8s_version'] = undefined;

/**
 * Описание появится позднее.
 * @member {String} network_driver
 */
Clusterk8s.prototype['network_driver'] = undefined;

/**
 * Описание появится позднее.
 * @member {Boolean} ingress
 */
Clusterk8s.prototype['ingress'] = undefined;

/**
 * Количество ядер процессора кластера.
 * @member {Number} cpu
 */
Clusterk8s.prototype['cpu'] = undefined;

/**
 * Количество (в Мб) оперативной памяти кластера.
 * @member {Number} ram
 */
Clusterk8s.prototype['ram'] = undefined;

/**
 * Размер (в Гб) диска кластера.
 * @member {Number} disk
 */
Clusterk8s.prototype['disk'] = undefined;

/**
 * Тип сервиса кластера.
 * @member {Number} preset_id
 */
Clusterk8s.prototype['preset_id'] = undefined;





/**
 * Allowed values for the <code>status</code> property.
 * @enum {String}
 * @readonly
 */
Clusterk8s['StatusEnum'] = {

    /**
     * value: "installing"
     * @const
     */
    "installing": "installing",

    /**
     * value: "provisioning"
     * @const
     */
    "provisioning": "provisioning",

    /**
     * value: "active"
     * @const
     */
    "active": "active",

    /**
     * value: "unpaid"
     * @const
     */
    "unpaid": "unpaid"
};



export default Clusterk8s;

