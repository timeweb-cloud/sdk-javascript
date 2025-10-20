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
import Document from './Document';

/**
 * The Knowledgebase model module.
 * @module model/Knowledgebase
 * @version 1.0.0
 */
class Knowledgebase {
    /**
     * Constructs a new <code>Knowledgebase</code>.
     * База знаний
     * @alias module:model/Knowledgebase
     * @param id {Number} Уникальный идентификатор базы знаний
     * @param name {String} Название базы знаний
     * @param dbaasId {Number} ID базы данных (opensearch или qdrant)
     * @param status {module:model/Knowledgebase.StatusEnum} Статус базы знаний
     * @param totalTokens {Number} Всего токенов выделено
     * @param usedTokens {Number} Использовано токенов
     * @param remainingTokens {Number} Осталось токенов
     * @param tokenPackageId {Number} ID пакета токенов
     * @param subscriptionRenewalDate {Date} Дата обновления подписки
     * @param documents {Array.<module:model/Document>} Документы в базе знаний
     * @param agentsIds {Array.<Number>} ID агентов, связанных с базой знаний
     * @param createdAt {Date} Дата создания базы знаний
     */
    constructor(id, name, dbaasId, status, totalTokens, usedTokens, remainingTokens, tokenPackageId, subscriptionRenewalDate, documents, agentsIds, createdAt) { 
        
        Knowledgebase.initialize(this, id, name, dbaasId, status, totalTokens, usedTokens, remainingTokens, tokenPackageId, subscriptionRenewalDate, documents, agentsIds, createdAt);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, id, name, dbaasId, status, totalTokens, usedTokens, remainingTokens, tokenPackageId, subscriptionRenewalDate, documents, agentsIds, createdAt) { 
        obj['id'] = id;
        obj['name'] = name;
        obj['dbaas_id'] = dbaasId;
        obj['status'] = status;
        obj['total_tokens'] = totalTokens;
        obj['used_tokens'] = usedTokens;
        obj['remaining_tokens'] = remainingTokens;
        obj['token_package_id'] = tokenPackageId;
        obj['subscription_renewal_date'] = subscriptionRenewalDate;
        obj['documents'] = documents;
        obj['agents_ids'] = agentsIds;
        obj['created_at'] = createdAt;
    }

    /**
     * Constructs a <code>Knowledgebase</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Knowledgebase} obj Optional instance to populate.
     * @return {module:model/Knowledgebase} The populated <code>Knowledgebase</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new Knowledgebase();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'Number');
            }
            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('description')) {
                obj['description'] = ApiClient.convertToType(data['description'], 'String');
            }
            if (data.hasOwnProperty('dbaas_id')) {
                obj['dbaas_id'] = ApiClient.convertToType(data['dbaas_id'], 'Number');
            }
            if (data.hasOwnProperty('status')) {
                obj['status'] = ApiClient.convertToType(data['status'], 'String');
            }
            if (data.hasOwnProperty('last_sync')) {
                obj['last_sync'] = ApiClient.convertToType(data['last_sync'], 'Date');
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
            if (data.hasOwnProperty('documents')) {
                obj['documents'] = ApiClient.convertToType(data['documents'], [Document]);
            }
            if (data.hasOwnProperty('agents_ids')) {
                obj['agents_ids'] = ApiClient.convertToType(data['agents_ids'], ['Number']);
            }
            if (data.hasOwnProperty('created_at')) {
                obj['created_at'] = ApiClient.convertToType(data['created_at'], 'Date');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>Knowledgebase</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>Knowledgebase</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of Knowledgebase.RequiredProperties) {
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
        // ensure the json data is a string
        if (data['status'] && !(typeof data['status'] === 'string' || data['status'] instanceof String)) {
            throw new Error("Expected the field `status` to be a primitive type in the JSON string but got " + data['status']);
        }
        if (data['documents']) { // data not null
            // ensure the json data is an array
            if (!Array.isArray(data['documents'])) {
                throw new Error("Expected the field `documents` to be an array in the JSON data but got " + data['documents']);
            }
            // validate the optional field `documents` (array)
            for (const item of data['documents']) {
                Document.validateJSON(item);
            };
        }
        // ensure the json data is an array
        if (!Array.isArray(data['agents_ids'])) {
            throw new Error("Expected the field `agents_ids` to be an array in the JSON data but got " + data['agents_ids']);
        }

        return true;
    }


}

Knowledgebase.RequiredProperties = ["id", "name", "dbaas_id", "status", "total_tokens", "used_tokens", "remaining_tokens", "token_package_id", "subscription_renewal_date", "documents", "agents_ids", "created_at"];

/**
 * Уникальный идентификатор базы знаний
 * @member {Number} id
 */
Knowledgebase.prototype['id'] = undefined;

/**
 * Название базы знаний
 * @member {String} name
 */
Knowledgebase.prototype['name'] = undefined;

/**
 * Описание базы знаний
 * @member {String} description
 */
Knowledgebase.prototype['description'] = undefined;

/**
 * ID базы данных (opensearch или qdrant)
 * @member {Number} dbaas_id
 */
Knowledgebase.prototype['dbaas_id'] = undefined;

/**
 * Статус базы знаний
 * @member {module:model/Knowledgebase.StatusEnum} status
 */
Knowledgebase.prototype['status'] = undefined;

/**
 * Дата последней синхронизации
 * @member {Date} last_sync
 */
Knowledgebase.prototype['last_sync'] = undefined;

/**
 * Всего токенов выделено
 * @member {Number} total_tokens
 */
Knowledgebase.prototype['total_tokens'] = undefined;

/**
 * Использовано токенов
 * @member {Number} used_tokens
 */
Knowledgebase.prototype['used_tokens'] = undefined;

/**
 * Осталось токенов
 * @member {Number} remaining_tokens
 */
Knowledgebase.prototype['remaining_tokens'] = undefined;

/**
 * ID пакета токенов
 * @member {Number} token_package_id
 */
Knowledgebase.prototype['token_package_id'] = undefined;

/**
 * Дата обновления подписки
 * @member {Date} subscription_renewal_date
 */
Knowledgebase.prototype['subscription_renewal_date'] = undefined;

/**
 * Документы в базе знаний
 * @member {Array.<module:model/Document>} documents
 */
Knowledgebase.prototype['documents'] = undefined;

/**
 * ID агентов, связанных с базой знаний
 * @member {Array.<Number>} agents_ids
 */
Knowledgebase.prototype['agents_ids'] = undefined;

/**
 * Дата создания базы знаний
 * @member {Date} created_at
 */
Knowledgebase.prototype['created_at'] = undefined;





/**
 * Allowed values for the <code>status</code> property.
 * @enum {String}
 * @readonly
 */
Knowledgebase['StatusEnum'] = {

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
     * value: "creating"
     * @const
     */
    "creating": "creating",

    /**
     * value: "deleted"
     * @const
     */
    "deleted": "deleted"
};



export default Knowledgebase;

