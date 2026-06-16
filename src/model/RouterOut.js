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
import RouterNetworkMeta from './RouterNetworkMeta';
import RouterOutIpsInner from './RouterOutIpsInner';
import RouterOutNodesInner from './RouterOutNodesInner';
import RouterOutParentServicesInner from './RouterOutParentServicesInner';
import RouterPreset from './RouterPreset';

/**
 * The RouterOut model module.
 * @module model/RouterOut
 * @version 1.0.0
 */
class RouterOut {
    /**
     * Constructs a new <code>RouterOut</code>.
     * @alias module:model/RouterOut
     * @param id {String} ID роутера
     * @param accountId {String} ID аккаунта
     * @param avatarLink {String} Ссылка на аватар роутера
     * @param name {String} Имя роутера
     * @param comment {String} Описание роутера
     * @param status {String} Статус роутера
     * @param zone {String} Зона доступности
     * @param ips {Array.<module:model/RouterOutIpsInner>} IP-адреса
     * @param presetId {Number} ID тарифа
     * @param preset {module:model/RouterPreset} 
     * @param nodes {Array.<module:model/RouterOutNodesInner>} Ноды
     * @param networks {Array.<module:model/RouterNetworkMeta>} Сети
     * @param createdAt {Date} Дата и время создания роутера в формате ISO8601
     * @param parentServices {Array.<module:model/RouterOutParentServicesInner>} Родительские сервисы
     */
    constructor(id, accountId, avatarLink, name, comment, status, zone, ips, presetId, preset, nodes, networks, createdAt, parentServices) { 
        
        RouterOut.initialize(this, id, accountId, avatarLink, name, comment, status, zone, ips, presetId, preset, nodes, networks, createdAt, parentServices);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, id, accountId, avatarLink, name, comment, status, zone, ips, presetId, preset, nodes, networks, createdAt, parentServices) { 
        obj['id'] = id;
        obj['account_id'] = accountId;
        obj['avatar_link'] = avatarLink;
        obj['name'] = name;
        obj['comment'] = comment;
        obj['status'] = status;
        obj['zone'] = zone;
        obj['ips'] = ips;
        obj['preset_id'] = presetId;
        obj['preset'] = preset;
        obj['nodes'] = nodes;
        obj['networks'] = networks;
        obj['created_at'] = createdAt;
        obj['parent_services'] = parentServices;
    }

    /**
     * Constructs a <code>RouterOut</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/RouterOut} obj Optional instance to populate.
     * @return {module:model/RouterOut} The populated <code>RouterOut</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new RouterOut();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'String');
            }
            if (data.hasOwnProperty('account_id')) {
                obj['account_id'] = ApiClient.convertToType(data['account_id'], 'String');
            }
            if (data.hasOwnProperty('avatar_link')) {
                obj['avatar_link'] = ApiClient.convertToType(data['avatar_link'], 'String');
            }
            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('comment')) {
                obj['comment'] = ApiClient.convertToType(data['comment'], 'String');
            }
            if (data.hasOwnProperty('status')) {
                obj['status'] = ApiClient.convertToType(data['status'], 'String');
            }
            if (data.hasOwnProperty('zone')) {
                obj['zone'] = ApiClient.convertToType(data['zone'], 'String');
            }
            if (data.hasOwnProperty('ips')) {
                obj['ips'] = ApiClient.convertToType(data['ips'], [RouterOutIpsInner]);
            }
            if (data.hasOwnProperty('preset_id')) {
                obj['preset_id'] = ApiClient.convertToType(data['preset_id'], 'Number');
            }
            if (data.hasOwnProperty('preset')) {
                obj['preset'] = RouterPreset.constructFromObject(data['preset']);
            }
            if (data.hasOwnProperty('nodes')) {
                obj['nodes'] = ApiClient.convertToType(data['nodes'], [RouterOutNodesInner]);
            }
            if (data.hasOwnProperty('networks')) {
                obj['networks'] = ApiClient.convertToType(data['networks'], [RouterNetworkMeta]);
            }
            if (data.hasOwnProperty('created_at')) {
                obj['created_at'] = ApiClient.convertToType(data['created_at'], 'Date');
            }
            if (data.hasOwnProperty('project_id')) {
                obj['project_id'] = ApiClient.convertToType(data['project_id'], 'Number');
            }
            if (data.hasOwnProperty('parent_services')) {
                obj['parent_services'] = ApiClient.convertToType(data['parent_services'], [RouterOutParentServicesInner]);
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>RouterOut</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>RouterOut</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of RouterOut.RequiredProperties) {
            if (!data[property]) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }
        // ensure the json data is a string
        if (data['id'] && !(typeof data['id'] === 'string' || data['id'] instanceof String)) {
            throw new Error("Expected the field `id` to be a primitive type in the JSON string but got " + data['id']);
        }
        // ensure the json data is a string
        if (data['account_id'] && !(typeof data['account_id'] === 'string' || data['account_id'] instanceof String)) {
            throw new Error("Expected the field `account_id` to be a primitive type in the JSON string but got " + data['account_id']);
        }
        // ensure the json data is a string
        if (data['avatar_link'] && !(typeof data['avatar_link'] === 'string' || data['avatar_link'] instanceof String)) {
            throw new Error("Expected the field `avatar_link` to be a primitive type in the JSON string but got " + data['avatar_link']);
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
        if (data['status'] && !(typeof data['status'] === 'string' || data['status'] instanceof String)) {
            throw new Error("Expected the field `status` to be a primitive type in the JSON string but got " + data['status']);
        }
        // ensure the json data is a string
        if (data['zone'] && !(typeof data['zone'] === 'string' || data['zone'] instanceof String)) {
            throw new Error("Expected the field `zone` to be a primitive type in the JSON string but got " + data['zone']);
        }
        if (data['ips']) { // data not null
            // ensure the json data is an array
            if (!Array.isArray(data['ips'])) {
                throw new Error("Expected the field `ips` to be an array in the JSON data but got " + data['ips']);
            }
            // validate the optional field `ips` (array)
            for (const item of data['ips']) {
                RouterOutIpsInner.validateJSON(item);
            };
        }
        // validate the optional field `preset`
        if (data['preset']) { // data not null
          RouterPreset.validateJSON(data['preset']);
        }
        if (data['nodes']) { // data not null
            // ensure the json data is an array
            if (!Array.isArray(data['nodes'])) {
                throw new Error("Expected the field `nodes` to be an array in the JSON data but got " + data['nodes']);
            }
            // validate the optional field `nodes` (array)
            for (const item of data['nodes']) {
                RouterOutNodesInner.validateJSON(item);
            };
        }
        if (data['networks']) { // data not null
            // ensure the json data is an array
            if (!Array.isArray(data['networks'])) {
                throw new Error("Expected the field `networks` to be an array in the JSON data but got " + data['networks']);
            }
            // validate the optional field `networks` (array)
            for (const item of data['networks']) {
                RouterNetworkMeta.validateJSON(item);
            };
        }
        if (data['parent_services']) { // data not null
            // ensure the json data is an array
            if (!Array.isArray(data['parent_services'])) {
                throw new Error("Expected the field `parent_services` to be an array in the JSON data but got " + data['parent_services']);
            }
            // validate the optional field `parent_services` (array)
            for (const item of data['parent_services']) {
                RouterOutParentServicesInner.validateJSON(item);
            };
        }

        return true;
    }


}

RouterOut.RequiredProperties = ["id", "account_id", "avatar_link", "name", "comment", "status", "zone", "ips", "preset_id", "preset", "nodes", "networks", "created_at", "parent_services"];

/**
 * ID роутера
 * @member {String} id
 */
RouterOut.prototype['id'] = undefined;

/**
 * ID аккаунта
 * @member {String} account_id
 */
RouterOut.prototype['account_id'] = undefined;

/**
 * Ссылка на аватар роутера
 * @member {String} avatar_link
 */
RouterOut.prototype['avatar_link'] = undefined;

/**
 * Имя роутера
 * @member {String} name
 */
RouterOut.prototype['name'] = undefined;

/**
 * Описание роутера
 * @member {String} comment
 */
RouterOut.prototype['comment'] = undefined;

/**
 * Статус роутера
 * @member {String} status
 */
RouterOut.prototype['status'] = undefined;

/**
 * Зона доступности
 * @member {String} zone
 */
RouterOut.prototype['zone'] = undefined;

/**
 * IP-адреса
 * @member {Array.<module:model/RouterOutIpsInner>} ips
 */
RouterOut.prototype['ips'] = undefined;

/**
 * ID тарифа
 * @member {Number} preset_id
 */
RouterOut.prototype['preset_id'] = undefined;

/**
 * @member {module:model/RouterPreset} preset
 */
RouterOut.prototype['preset'] = undefined;

/**
 * Ноды
 * @member {Array.<module:model/RouterOutNodesInner>} nodes
 */
RouterOut.prototype['nodes'] = undefined;

/**
 * Сети
 * @member {Array.<module:model/RouterNetworkMeta>} networks
 */
RouterOut.prototype['networks'] = undefined;

/**
 * Дата и время создания роутера в формате ISO8601
 * @member {Date} created_at
 */
RouterOut.prototype['created_at'] = undefined;

/**
 * ID проекта
 * @member {Number} project_id
 */
RouterOut.prototype['project_id'] = undefined;

/**
 * Родительские сервисы
 * @member {Array.<module:model/RouterOutParentServicesInner>} parent_services
 */
RouterOut.prototype['parent_services'] = undefined;






export default RouterOut;

