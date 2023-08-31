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

import ApiClient from '../ApiClient';
import VdsDisksInner from './VdsDisksInner';
import VdsImage from './VdsImage';
import VdsNetworksInner from './VdsNetworksInner';
import VdsOs from './VdsOs';
import VdsSoftware from './VdsSoftware';

/**
 * The Vds model module.
 * @module model/Vds
 * @version 1.0.0
 */
class Vds {
    /**
     * Constructs a new <code>Vds</code>.
     * Сервер
     * @alias module:model/Vds
     * @param id {Number} Уникальный идентификатор для каждого экземпляра сервера. Автоматически генерируется при создании.
     * @param name {String} Удобочитаемое имя, установленное для выделенного сервера.
     * @param comment {String} Комментарий к выделенному серверу.
     * @param createdAt {String} Дата создания сервера в формате ISO8061.
     * @param os {module:model/VdsOs} 
     * @param software {module:model/VdsSoftware} 
     * @param presetId {Number} Уникальный идентификатор тарифа сервера.
     * @param location {module:model/Vds.LocationEnum} Локация сервера.
     * @param configuratorId {Number} Уникальный идентификатор конфигуратора сервера.
     * @param bootMode {module:model/Vds.BootModeEnum} Режим загрузки ОС сервера.
     * @param status {module:model/Vds.StatusEnum} Статус сервера.
     * @param startAt {Date} Значение времени, указанное в комбинированном формате даты и времени ISO8601, которое представляет, когда был запущен сервер.
     * @param isDdosGuard {Boolean} Это логическое значение, которое показывает, включена ли защита от DDOS у данного сервера.
     * @param cpu {Number} Количество ядер процессора сервера.
     * @param cpuFrequency {String} Частота ядер процессора сервера.
     * @param ram {Number} Размер (в Мб) ОЗУ сервера.
     * @param disks {Array.<module:model/VdsDisksInner>} Список дисков сервера.
     * @param avatarId {String} Уникальный идентификатор аватара сервера. Описание методов работы с аватарами появится позднее.
     * @param vncPass {String} Пароль от VNC.
     * @param rootPass {String} Пароль root сервера или пароль Администратора для серверов Windows.
     * @param image {module:model/VdsImage} 
     * @param networks {Array.<module:model/VdsNetworksInner>} Список сетей диска.
     * @param cloudInit {String} Cloud-init скрипт
     */
    constructor(id, name, comment, createdAt, os, software, presetId, location, configuratorId, bootMode, status, startAt, isDdosGuard, cpu, cpuFrequency, ram, disks, avatarId, vncPass, rootPass, image, networks, cloudInit) { 
        
        Vds.initialize(this, id, name, comment, createdAt, os, software, presetId, location, configuratorId, bootMode, status, startAt, isDdosGuard, cpu, cpuFrequency, ram, disks, avatarId, vncPass, rootPass, image, networks, cloudInit);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, id, name, comment, createdAt, os, software, presetId, location, configuratorId, bootMode, status, startAt, isDdosGuard, cpu, cpuFrequency, ram, disks, avatarId, vncPass, rootPass, image, networks, cloudInit) { 
        obj['id'] = id;
        obj['name'] = name;
        obj['comment'] = comment;
        obj['created_at'] = createdAt;
        obj['os'] = os;
        obj['software'] = software;
        obj['preset_id'] = presetId;
        obj['location'] = location;
        obj['configurator_id'] = configuratorId;
        obj['boot_mode'] = bootMode;
        obj['status'] = status;
        obj['start_at'] = startAt;
        obj['is_ddos_guard'] = isDdosGuard;
        obj['cpu'] = cpu;
        obj['cpu_frequency'] = cpuFrequency;
        obj['ram'] = ram;
        obj['disks'] = disks;
        obj['avatar_id'] = avatarId;
        obj['vnc_pass'] = vncPass;
        obj['root_pass'] = rootPass;
        obj['image'] = image;
        obj['networks'] = networks;
        obj['cloud_init'] = cloudInit;
    }

    /**
     * Constructs a <code>Vds</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Vds} obj Optional instance to populate.
     * @return {module:model/Vds} The populated <code>Vds</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new Vds();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'Number');
            }
            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('comment')) {
                obj['comment'] = ApiClient.convertToType(data['comment'], 'String');
            }
            if (data.hasOwnProperty('created_at')) {
                obj['created_at'] = ApiClient.convertToType(data['created_at'], 'String');
            }
            if (data.hasOwnProperty('os')) {
                obj['os'] = VdsOs.constructFromObject(data['os']);
            }
            if (data.hasOwnProperty('software')) {
                obj['software'] = VdsSoftware.constructFromObject(data['software']);
            }
            if (data.hasOwnProperty('preset_id')) {
                obj['preset_id'] = ApiClient.convertToType(data['preset_id'], 'Number');
            }
            if (data.hasOwnProperty('location')) {
                obj['location'] = ApiClient.convertToType(data['location'], 'String');
            }
            if (data.hasOwnProperty('configurator_id')) {
                obj['configurator_id'] = ApiClient.convertToType(data['configurator_id'], 'Number');
            }
            if (data.hasOwnProperty('boot_mode')) {
                obj['boot_mode'] = ApiClient.convertToType(data['boot_mode'], 'String');
            }
            if (data.hasOwnProperty('status')) {
                obj['status'] = ApiClient.convertToType(data['status'], 'String');
            }
            if (data.hasOwnProperty('start_at')) {
                obj['start_at'] = ApiClient.convertToType(data['start_at'], 'Date');
            }
            if (data.hasOwnProperty('is_ddos_guard')) {
                obj['is_ddos_guard'] = ApiClient.convertToType(data['is_ddos_guard'], 'Boolean');
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
            if (data.hasOwnProperty('disks')) {
                obj['disks'] = ApiClient.convertToType(data['disks'], [VdsDisksInner]);
            }
            if (data.hasOwnProperty('avatar_id')) {
                obj['avatar_id'] = ApiClient.convertToType(data['avatar_id'], 'String');
            }
            if (data.hasOwnProperty('vnc_pass')) {
                obj['vnc_pass'] = ApiClient.convertToType(data['vnc_pass'], 'String');
            }
            if (data.hasOwnProperty('root_pass')) {
                obj['root_pass'] = ApiClient.convertToType(data['root_pass'], 'String');
            }
            if (data.hasOwnProperty('image')) {
                obj['image'] = VdsImage.constructFromObject(data['image']);
            }
            if (data.hasOwnProperty('networks')) {
                obj['networks'] = ApiClient.convertToType(data['networks'], [VdsNetworksInner]);
            }
            if (data.hasOwnProperty('cloud_init')) {
                obj['cloud_init'] = ApiClient.convertToType(data['cloud_init'], 'String');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>Vds</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>Vds</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of Vds.RequiredProperties) {
            if (!data[property]) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }
        // ensure the json data is a string
        if (data['name'] && !(typeof data['name'] === 'string' || data['name'] instanceof String)) {
            throw new Error("Expected the field `name` to be a primitive type in the JSON string but got " + data['name']);
        }
        // ensure the json data is a string
        if (data['comment'] && !(typeof data['comment'] === 'string' || data['comment'] instanceof String)) {
            throw new Error("Expected the field `comment` to be a primitive type in the JSON string but got " + data['comment']);
        }
        // ensure the json data is a string
        if (data['created_at'] && !(typeof data['created_at'] === 'string' || data['created_at'] instanceof String)) {
            throw new Error("Expected the field `created_at` to be a primitive type in the JSON string but got " + data['created_at']);
        }
        // validate the optional field `os`
        if (data['os']) { // data not null
          VdsOs.validateJSON(data['os']);
        }
        // validate the optional field `software`
        if (data['software']) { // data not null
          VdsSoftware.validateJSON(data['software']);
        }
        // ensure the json data is a string
        if (data['location'] && !(typeof data['location'] === 'string' || data['location'] instanceof String)) {
            throw new Error("Expected the field `location` to be a primitive type in the JSON string but got " + data['location']);
        }
        // ensure the json data is a string
        if (data['boot_mode'] && !(typeof data['boot_mode'] === 'string' || data['boot_mode'] instanceof String)) {
            throw new Error("Expected the field `boot_mode` to be a primitive type in the JSON string but got " + data['boot_mode']);
        }
        // ensure the json data is a string
        if (data['status'] && !(typeof data['status'] === 'string' || data['status'] instanceof String)) {
            throw new Error("Expected the field `status` to be a primitive type in the JSON string but got " + data['status']);
        }
        // ensure the json data is a string
        if (data['cpu_frequency'] && !(typeof data['cpu_frequency'] === 'string' || data['cpu_frequency'] instanceof String)) {
            throw new Error("Expected the field `cpu_frequency` to be a primitive type in the JSON string but got " + data['cpu_frequency']);
        }
        if (data['disks']) { // data not null
            // ensure the json data is an array
            if (!Array.isArray(data['disks'])) {
                throw new Error("Expected the field `disks` to be an array in the JSON data but got " + data['disks']);
            }
            // validate the optional field `disks` (array)
            for (const item of data['disks']) {
                VdsDisksInner.validateJSON(item);
            };
        }
        // ensure the json data is a string
        if (data['avatar_id'] && !(typeof data['avatar_id'] === 'string' || data['avatar_id'] instanceof String)) {
            throw new Error("Expected the field `avatar_id` to be a primitive type in the JSON string but got " + data['avatar_id']);
        }
        // ensure the json data is a string
        if (data['vnc_pass'] && !(typeof data['vnc_pass'] === 'string' || data['vnc_pass'] instanceof String)) {
            throw new Error("Expected the field `vnc_pass` to be a primitive type in the JSON string but got " + data['vnc_pass']);
        }
        // ensure the json data is a string
        if (data['root_pass'] && !(typeof data['root_pass'] === 'string' || data['root_pass'] instanceof String)) {
            throw new Error("Expected the field `root_pass` to be a primitive type in the JSON string but got " + data['root_pass']);
        }
        // validate the optional field `image`
        if (data['image']) { // data not null
          VdsImage.validateJSON(data['image']);
        }
        if (data['networks']) { // data not null
            // ensure the json data is an array
            if (!Array.isArray(data['networks'])) {
                throw new Error("Expected the field `networks` to be an array in the JSON data but got " + data['networks']);
            }
            // validate the optional field `networks` (array)
            for (const item of data['networks']) {
                VdsNetworksInner.validateJSON(item);
            };
        }
        // ensure the json data is a string
        if (data['cloud_init'] && !(typeof data['cloud_init'] === 'string' || data['cloud_init'] instanceof String)) {
            throw new Error("Expected the field `cloud_init` to be a primitive type in the JSON string but got " + data['cloud_init']);
        }

        return true;
    }


}

Vds.RequiredProperties = ["id", "name", "comment", "created_at", "os", "software", "preset_id", "location", "configurator_id", "boot_mode", "status", "start_at", "is_ddos_guard", "cpu", "cpu_frequency", "ram", "disks", "avatar_id", "vnc_pass", "root_pass", "image", "networks", "cloud_init"];

/**
 * Уникальный идентификатор для каждого экземпляра сервера. Автоматически генерируется при создании.
 * @member {Number} id
 */
Vds.prototype['id'] = undefined;

/**
 * Удобочитаемое имя, установленное для выделенного сервера.
 * @member {String} name
 */
Vds.prototype['name'] = undefined;

/**
 * Комментарий к выделенному серверу.
 * @member {String} comment
 */
Vds.prototype['comment'] = undefined;

/**
 * Дата создания сервера в формате ISO8061.
 * @member {String} created_at
 */
Vds.prototype['created_at'] = undefined;

/**
 * @member {module:model/VdsOs} os
 */
Vds.prototype['os'] = undefined;

/**
 * @member {module:model/VdsSoftware} software
 */
Vds.prototype['software'] = undefined;

/**
 * Уникальный идентификатор тарифа сервера.
 * @member {Number} preset_id
 */
Vds.prototype['preset_id'] = undefined;

/**
 * Локация сервера.
 * @member {module:model/Vds.LocationEnum} location
 */
Vds.prototype['location'] = undefined;

/**
 * Уникальный идентификатор конфигуратора сервера.
 * @member {Number} configurator_id
 */
Vds.prototype['configurator_id'] = undefined;

/**
 * Режим загрузки ОС сервера.
 * @member {module:model/Vds.BootModeEnum} boot_mode
 */
Vds.prototype['boot_mode'] = undefined;

/**
 * Статус сервера.
 * @member {module:model/Vds.StatusEnum} status
 */
Vds.prototype['status'] = undefined;

/**
 * Значение времени, указанное в комбинированном формате даты и времени ISO8601, которое представляет, когда был запущен сервер.
 * @member {Date} start_at
 */
Vds.prototype['start_at'] = undefined;

/**
 * Это логическое значение, которое показывает, включена ли защита от DDOS у данного сервера.
 * @member {Boolean} is_ddos_guard
 */
Vds.prototype['is_ddos_guard'] = undefined;

/**
 * Количество ядер процессора сервера.
 * @member {Number} cpu
 */
Vds.prototype['cpu'] = undefined;

/**
 * Частота ядер процессора сервера.
 * @member {String} cpu_frequency
 */
Vds.prototype['cpu_frequency'] = undefined;

/**
 * Размер (в Мб) ОЗУ сервера.
 * @member {Number} ram
 */
Vds.prototype['ram'] = undefined;

/**
 * Список дисков сервера.
 * @member {Array.<module:model/VdsDisksInner>} disks
 */
Vds.prototype['disks'] = undefined;

/**
 * Уникальный идентификатор аватара сервера. Описание методов работы с аватарами появится позднее.
 * @member {String} avatar_id
 */
Vds.prototype['avatar_id'] = undefined;

/**
 * Пароль от VNC.
 * @member {String} vnc_pass
 */
Vds.prototype['vnc_pass'] = undefined;

/**
 * Пароль root сервера или пароль Администратора для серверов Windows.
 * @member {String} root_pass
 */
Vds.prototype['root_pass'] = undefined;

/**
 * @member {module:model/VdsImage} image
 */
Vds.prototype['image'] = undefined;

/**
 * Список сетей диска.
 * @member {Array.<module:model/VdsNetworksInner>} networks
 */
Vds.prototype['networks'] = undefined;

/**
 * Cloud-init скрипт
 * @member {String} cloud_init
 */
Vds.prototype['cloud_init'] = undefined;





/**
 * Allowed values for the <code>location</code> property.
 * @enum {String}
 * @readonly
 */
Vds['LocationEnum'] = {

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
 * Allowed values for the <code>boot_mode</code> property.
 * @enum {String}
 * @readonly
 */
Vds['BootModeEnum'] = {

    /**
     * value: "std"
     * @const
     */
    "std": "std",

    /**
     * value: "single"
     * @const
     */
    "single": "single",

    /**
     * value: "cd"
     * @const
     */
    "cd": "cd"
};


/**
 * Allowed values for the <code>status</code> property.
 * @enum {String}
 * @readonly
 */
Vds['StatusEnum'] = {

    /**
     * value: "installing"
     * @const
     */
    "installing": "installing",

    /**
     * value: "software_install"
     * @const
     */
    "software_install": "software_install",

    /**
     * value: "reinstalling"
     * @const
     */
    "reinstalling": "reinstalling",

    /**
     * value: "on"
     * @const
     */
    "on": "on",

    /**
     * value: "off"
     * @const
     */
    "off": "off",

    /**
     * value: "turning_on"
     * @const
     */
    "turning_on": "turning_on",

    /**
     * value: "turning_off"
     * @const
     */
    "turning_off": "turning_off",

    /**
     * value: "hard_turning_off"
     * @const
     */
    "hard_turning_off": "hard_turning_off",

    /**
     * value: "rebooting"
     * @const
     */
    "rebooting": "rebooting",

    /**
     * value: "hard_rebooting"
     * @const
     */
    "hard_rebooting": "hard_rebooting",

    /**
     * value: "removing"
     * @const
     */
    "removing": "removing",

    /**
     * value: "removed"
     * @const
     */
    "removed": "removed",

    /**
     * value: "cloning"
     * @const
     */
    "cloning": "cloning",

    /**
     * value: "transfer"
     * @const
     */
    "transfer": "transfer",

    /**
     * value: "blocked"
     * @const
     */
    "blocked": "blocked",

    /**
     * value: "configuring"
     * @const
     */
    "configuring": "configuring",

    /**
     * value: "no_paid"
     * @const
     */
    "no_paid": "no_paid",

    /**
     * value: "permanent_blocked"
     * @const
     */
    "permanent_blocked": "permanent_blocked"
};



export default Vds;

