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
 * The ClusterOut model module.
 * @module model/ClusterOut
 * @version 1.0.0
 */
class ClusterOut {
    /**
     * Constructs a new <code>ClusterOut</code>.
     * @alias module:model/ClusterOut
     * @param id {Number} ID кластера
     * @param name {String} Название
     * @param createdAt {Date} Дата и время создания кластера в формате ISO8601
     * @param status {String} Статус
     * @param description {String} Описание
     * @param k8sVersion {String} Версия Kubernetes
     * @param networkDriver {module:model/ClusterOut.NetworkDriverEnum} Используемый сетевой драйвер
     * @param avatarLink {String} Ссылка на аватар кластера.
     * @param ingress {Boolean} Логическое значение, показывающее, включен ли Ingress
     * @param presetId {Number} ID тарифа мастер-ноды
     */
    constructor(id, name, createdAt, status, description, k8sVersion, networkDriver, avatarLink, ingress, presetId) { 
        
        ClusterOut.initialize(this, id, name, createdAt, status, description, k8sVersion, networkDriver, avatarLink, ingress, presetId);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, id, name, createdAt, status, description, k8sVersion, networkDriver, avatarLink, ingress, presetId) { 
        obj['id'] = id;
        obj['name'] = name;
        obj['created_at'] = createdAt;
        obj['status'] = status;
        obj['description'] = description;
        obj['k8s_version'] = k8sVersion;
        obj['network_driver'] = networkDriver;
        obj['avatar_link'] = avatarLink;
        obj['ingress'] = ingress;
        obj['preset_id'] = presetId;
    }

    /**
     * Constructs a <code>ClusterOut</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ClusterOut} obj Optional instance to populate.
     * @return {module:model/ClusterOut} The populated <code>ClusterOut</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new ClusterOut();

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
            if (data.hasOwnProperty('k8s_version')) {
                obj['k8s_version'] = ApiClient.convertToType(data['k8s_version'], 'String');
            }
            if (data.hasOwnProperty('network_driver')) {
                obj['network_driver'] = ApiClient.convertToType(data['network_driver'], 'String');
            }
            if (data.hasOwnProperty('avatar_link')) {
                obj['avatar_link'] = ApiClient.convertToType(data['avatar_link'], 'String');
            }
            if (data.hasOwnProperty('ingress')) {
                obj['ingress'] = ApiClient.convertToType(data['ingress'], 'Boolean');
            }
            if (data.hasOwnProperty('preset_id')) {
                obj['preset_id'] = ApiClient.convertToType(data['preset_id'], 'Number');
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
            if (data.hasOwnProperty('availability_zone')) {
                obj['availability_zone'] = ApiClient.convertToType(data['availability_zone'], 'String');
            }
            if (data.hasOwnProperty('project_id')) {
                obj['project_id'] = ApiClient.convertToType(data['project_id'], 'Number');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>ClusterOut</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>ClusterOut</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of ClusterOut.RequiredProperties) {
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
        // ensure the json data is a string
        if (data['avatar_link'] && !(typeof data['avatar_link'] === 'string' || data['avatar_link'] instanceof String)) {
            throw new Error("Expected the field `avatar_link` to be a primitive type in the JSON string but got " + data['avatar_link']);
        }
        // ensure the json data is a string
        if (data['availability_zone'] && !(typeof data['availability_zone'] === 'string' || data['availability_zone'] instanceof String)) {
            throw new Error("Expected the field `availability_zone` to be a primitive type in the JSON string but got " + data['availability_zone']);
        }

        return true;
    }


}

ClusterOut.RequiredProperties = ["id", "name", "created_at", "status", "description", "k8s_version", "network_driver", "avatar_link", "ingress", "preset_id"];

/**
 * ID кластера
 * @member {Number} id
 */
ClusterOut.prototype['id'] = undefined;

/**
 * Название
 * @member {String} name
 */
ClusterOut.prototype['name'] = undefined;

/**
 * Дата и время создания кластера в формате ISO8601
 * @member {Date} created_at
 */
ClusterOut.prototype['created_at'] = undefined;

/**
 * Статус
 * @member {String} status
 */
ClusterOut.prototype['status'] = undefined;

/**
 * Описание
 * @member {String} description
 */
ClusterOut.prototype['description'] = undefined;

/**
 * Версия Kubernetes
 * @member {String} k8s_version
 */
ClusterOut.prototype['k8s_version'] = undefined;

/**
 * Используемый сетевой драйвер
 * @member {module:model/ClusterOut.NetworkDriverEnum} network_driver
 */
ClusterOut.prototype['network_driver'] = undefined;

/**
 * Ссылка на аватар кластера.
 * @member {String} avatar_link
 */
ClusterOut.prototype['avatar_link'] = undefined;

/**
 * Логическое значение, показывающее, включен ли Ingress
 * @member {Boolean} ingress
 */
ClusterOut.prototype['ingress'] = undefined;

/**
 * ID тарифа мастер-ноды
 * @member {Number} preset_id
 */
ClusterOut.prototype['preset_id'] = undefined;

/**
 * Общее количество ядер
 * @member {Number} cpu
 * @default 0
 */
ClusterOut.prototype['cpu'] = 0;

/**
 * Общее количество памяти
 * @member {Number} ram
 * @default 0
 */
ClusterOut.prototype['ram'] = 0;

/**
 * Общее дисковое пространство
 * @member {Number} disk
 * @default 0
 */
ClusterOut.prototype['disk'] = 0;

/**
 * Зона доступности
 * @member {module:model/ClusterOut.AvailabilityZoneEnum} availability_zone
 */
ClusterOut.prototype['availability_zone'] = undefined;

/**
 * ID проекта
 * @member {Number} project_id
 */
ClusterOut.prototype['project_id'] = undefined;





/**
 * Allowed values for the <code>network_driver</code> property.
 * @enum {String}
 * @readonly
 */
ClusterOut['NetworkDriverEnum'] = {

    /**
     * value: "kuberouter"
     * @const
     */
    "kuberouter": "kuberouter",

    /**
     * value: "calico"
     * @const
     */
    "calico": "calico",

    /**
     * value: "flannel"
     * @const
     */
    "flannel": "flannel",

    /**
     * value: "cilium"
     * @const
     */
    "cilium": "cilium"
};


/**
 * Allowed values for the <code>availability_zone</code> property.
 * @enum {String}
 * @readonly
 */
ClusterOut['AvailabilityZoneEnum'] = {

    /**
     * value: "spb-3"
     * @const
     */
    "spb-3": "spb-3",

    /**
     * value: "msk-1"
     * @const
     */
    "msk-1": "msk-1",

    /**
     * value: "ams-1"
     * @const
     */
    "ams-1": "ams-1"
};



export default ClusterOut;

