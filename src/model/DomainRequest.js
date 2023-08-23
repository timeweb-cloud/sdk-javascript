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
import DomainPaymentPeriod from './DomainPaymentPeriod';
import DomainPrimeType from './DomainPrimeType';

/**
 * The DomainRequest model module.
 * @module model/DomainRequest
 * @version 1.0.0
 */
class DomainRequest {
    /**
     * Constructs a new <code>DomainRequest</code>.
     * Заявка на продление/регистрацию/трансфер домена.
     * @alias module:model/DomainRequest
     * @param accountId {String} Идентификатор пользователя
     * @param authCode {String} Код авторизации для переноса домена.
     * @param date {Date} Дата создания заявки.
     * @param domainBundleId {String} Идентификационный номер бандла, в который входит данная заявка (null - если заявка не входит ни в один бандл).
     * @param errorCodeTransfer {String} Код ошибки трансфера домена.
     * @param fqdn {String} Полное имя домена.
     * @param groupId {Number} Идентификатор группы доменных зон.
     * @param id {Number} Идентификатор заявки.
     * @param isAntispamEnabled {Boolean} Это логическое значение, которое показывает включена ли услуга \"Антиспам\" для домена
     * @param isAutoprolongEnabled {Boolean} Это логическое значение, которое показывает, включено ли автопродление домена.
     * @param isWhoisPrivacyEnabled {Boolean} Это логическое значение, которое показывает, включено ли скрытие данных администратора домена для whois. Опция недоступна для доменов в зонах .ru и .рф.
     * @param message {String} Информационное сообщение о заявке.
     * @param moneySource {module:model/DomainRequest.MoneySourceEnum} Источник (способ) оплаты заявки.
     * @param period {module:model/DomainPaymentPeriod} 
     * @param personId {Number} Идентификационный номер персоны для заявки на регистрацию.
     * @param prime {module:model/DomainPrimeType} 
     * @param soonExpire {Number} Количество дней до конца регистрации домена, за которые мы уведомим о необходимости продления.
     * @param sortOrder {Number} Это значение используется для сортировки доменных зон в панели управления.
     * @param type {module:model/DomainRequest.TypeEnum} Тип заявки.
     */
    constructor(accountId, authCode, date, domainBundleId, errorCodeTransfer, fqdn, groupId, id, isAntispamEnabled, isAutoprolongEnabled, isWhoisPrivacyEnabled, message, moneySource, period, personId, prime, soonExpire, sortOrder, type) { 
        
        DomainRequest.initialize(this, accountId, authCode, date, domainBundleId, errorCodeTransfer, fqdn, groupId, id, isAntispamEnabled, isAutoprolongEnabled, isWhoisPrivacyEnabled, message, moneySource, period, personId, prime, soonExpire, sortOrder, type);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, accountId, authCode, date, domainBundleId, errorCodeTransfer, fqdn, groupId, id, isAntispamEnabled, isAutoprolongEnabled, isWhoisPrivacyEnabled, message, moneySource, period, personId, prime, soonExpire, sortOrder, type) { 
        obj['account_id'] = accountId;
        obj['auth_code'] = authCode;
        obj['date'] = date;
        obj['domain_bundle_id'] = domainBundleId;
        obj['error_code_transfer'] = errorCodeTransfer;
        obj['fqdn'] = fqdn;
        obj['group_id'] = groupId;
        obj['id'] = id;
        obj['is_antispam_enabled'] = isAntispamEnabled;
        obj['is_autoprolong_enabled'] = isAutoprolongEnabled;
        obj['is_whois_privacy_enabled'] = isWhoisPrivacyEnabled;
        obj['message'] = message;
        obj['money_source'] = moneySource;
        obj['period'] = period;
        obj['person_id'] = personId;
        obj['prime'] = prime;
        obj['soon_expire'] = soonExpire;
        obj['sort_order'] = sortOrder;
        obj['type'] = type;
    }

    /**
     * Constructs a <code>DomainRequest</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/DomainRequest} obj Optional instance to populate.
     * @return {module:model/DomainRequest} The populated <code>DomainRequest</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new DomainRequest();

            if (data.hasOwnProperty('account_id')) {
                obj['account_id'] = ApiClient.convertToType(data['account_id'], 'String');
            }
            if (data.hasOwnProperty('auth_code')) {
                obj['auth_code'] = ApiClient.convertToType(data['auth_code'], 'String');
            }
            if (data.hasOwnProperty('date')) {
                obj['date'] = ApiClient.convertToType(data['date'], 'Date');
            }
            if (data.hasOwnProperty('domain_bundle_id')) {
                obj['domain_bundle_id'] = ApiClient.convertToType(data['domain_bundle_id'], 'String');
            }
            if (data.hasOwnProperty('error_code_transfer')) {
                obj['error_code_transfer'] = ApiClient.convertToType(data['error_code_transfer'], 'String');
            }
            if (data.hasOwnProperty('fqdn')) {
                obj['fqdn'] = ApiClient.convertToType(data['fqdn'], 'String');
            }
            if (data.hasOwnProperty('group_id')) {
                obj['group_id'] = ApiClient.convertToType(data['group_id'], 'Number');
            }
            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'Number');
            }
            if (data.hasOwnProperty('is_antispam_enabled')) {
                obj['is_antispam_enabled'] = ApiClient.convertToType(data['is_antispam_enabled'], 'Boolean');
            }
            if (data.hasOwnProperty('is_autoprolong_enabled')) {
                obj['is_autoprolong_enabled'] = ApiClient.convertToType(data['is_autoprolong_enabled'], 'Boolean');
            }
            if (data.hasOwnProperty('is_whois_privacy_enabled')) {
                obj['is_whois_privacy_enabled'] = ApiClient.convertToType(data['is_whois_privacy_enabled'], 'Boolean');
            }
            if (data.hasOwnProperty('message')) {
                obj['message'] = ApiClient.convertToType(data['message'], 'String');
            }
            if (data.hasOwnProperty('money_source')) {
                obj['money_source'] = ApiClient.convertToType(data['money_source'], 'String');
            }
            if (data.hasOwnProperty('period')) {
                obj['period'] = DomainPaymentPeriod.constructFromObject(data['period']);
            }
            if (data.hasOwnProperty('person_id')) {
                obj['person_id'] = ApiClient.convertToType(data['person_id'], 'Number');
            }
            if (data.hasOwnProperty('prime')) {
                obj['prime'] = DomainPrimeType.constructFromObject(data['prime']);
            }
            if (data.hasOwnProperty('soon_expire')) {
                obj['soon_expire'] = ApiClient.convertToType(data['soon_expire'], 'Number');
            }
            if (data.hasOwnProperty('sort_order')) {
                obj['sort_order'] = ApiClient.convertToType(data['sort_order'], 'Number');
            }
            if (data.hasOwnProperty('type')) {
                obj['type'] = ApiClient.convertToType(data['type'], 'String');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>DomainRequest</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>DomainRequest</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of DomainRequest.RequiredProperties) {
            if (!data[property]) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }
        // ensure the json data is a string
        if (data['account_id'] && !(typeof data['account_id'] === 'string' || data['account_id'] instanceof String)) {
            throw new Error("Expected the field `account_id` to be a primitive type in the JSON string but got " + data['account_id']);
        }
        // ensure the json data is a string
        if (data['auth_code'] && !(typeof data['auth_code'] === 'string' || data['auth_code'] instanceof String)) {
            throw new Error("Expected the field `auth_code` to be a primitive type in the JSON string but got " + data['auth_code']);
        }
        // ensure the json data is a string
        if (data['domain_bundle_id'] && !(typeof data['domain_bundle_id'] === 'string' || data['domain_bundle_id'] instanceof String)) {
            throw new Error("Expected the field `domain_bundle_id` to be a primitive type in the JSON string but got " + data['domain_bundle_id']);
        }
        // ensure the json data is a string
        if (data['error_code_transfer'] && !(typeof data['error_code_transfer'] === 'string' || data['error_code_transfer'] instanceof String)) {
            throw new Error("Expected the field `error_code_transfer` to be a primitive type in the JSON string but got " + data['error_code_transfer']);
        }
        // ensure the json data is a string
        if (data['fqdn'] && !(typeof data['fqdn'] === 'string' || data['fqdn'] instanceof String)) {
            throw new Error("Expected the field `fqdn` to be a primitive type in the JSON string but got " + data['fqdn']);
        }
        // ensure the json data is a string
        if (data['message'] && !(typeof data['message'] === 'string' || data['message'] instanceof String)) {
            throw new Error("Expected the field `message` to be a primitive type in the JSON string but got " + data['message']);
        }
        // ensure the json data is a string
        if (data['money_source'] && !(typeof data['money_source'] === 'string' || data['money_source'] instanceof String)) {
            throw new Error("Expected the field `money_source` to be a primitive type in the JSON string but got " + data['money_source']);
        }
        // ensure the json data is a string
        if (data['type'] && !(typeof data['type'] === 'string' || data['type'] instanceof String)) {
            throw new Error("Expected the field `type` to be a primitive type in the JSON string but got " + data['type']);
        }

        return true;
    }


}

DomainRequest.RequiredProperties = ["account_id", "auth_code", "date", "domain_bundle_id", "error_code_transfer", "fqdn", "group_id", "id", "is_antispam_enabled", "is_autoprolong_enabled", "is_whois_privacy_enabled", "message", "money_source", "period", "person_id", "prime", "soon_expire", "sort_order", "type"];

/**
 * Идентификатор пользователя
 * @member {String} account_id
 */
DomainRequest.prototype['account_id'] = undefined;

/**
 * Код авторизации для переноса домена.
 * @member {String} auth_code
 */
DomainRequest.prototype['auth_code'] = undefined;

/**
 * Дата создания заявки.
 * @member {Date} date
 */
DomainRequest.prototype['date'] = undefined;

/**
 * Идентификационный номер бандла, в который входит данная заявка (null - если заявка не входит ни в один бандл).
 * @member {String} domain_bundle_id
 */
DomainRequest.prototype['domain_bundle_id'] = undefined;

/**
 * Код ошибки трансфера домена.
 * @member {String} error_code_transfer
 */
DomainRequest.prototype['error_code_transfer'] = undefined;

/**
 * Полное имя домена.
 * @member {String} fqdn
 */
DomainRequest.prototype['fqdn'] = undefined;

/**
 * Идентификатор группы доменных зон.
 * @member {Number} group_id
 */
DomainRequest.prototype['group_id'] = undefined;

/**
 * Идентификатор заявки.
 * @member {Number} id
 */
DomainRequest.prototype['id'] = undefined;

/**
 * Это логическое значение, которое показывает включена ли услуга \"Антиспам\" для домена
 * @member {Boolean} is_antispam_enabled
 */
DomainRequest.prototype['is_antispam_enabled'] = undefined;

/**
 * Это логическое значение, которое показывает, включено ли автопродление домена.
 * @member {Boolean} is_autoprolong_enabled
 */
DomainRequest.prototype['is_autoprolong_enabled'] = undefined;

/**
 * Это логическое значение, которое показывает, включено ли скрытие данных администратора домена для whois. Опция недоступна для доменов в зонах .ru и .рф.
 * @member {Boolean} is_whois_privacy_enabled
 */
DomainRequest.prototype['is_whois_privacy_enabled'] = undefined;

/**
 * Информационное сообщение о заявке.
 * @member {String} message
 */
DomainRequest.prototype['message'] = undefined;

/**
 * Источник (способ) оплаты заявки.
 * @member {module:model/DomainRequest.MoneySourceEnum} money_source
 */
DomainRequest.prototype['money_source'] = undefined;

/**
 * @member {module:model/DomainPaymentPeriod} period
 */
DomainRequest.prototype['period'] = undefined;

/**
 * Идентификационный номер персоны для заявки на регистрацию.
 * @member {Number} person_id
 */
DomainRequest.prototype['person_id'] = undefined;

/**
 * @member {module:model/DomainPrimeType} prime
 */
DomainRequest.prototype['prime'] = undefined;

/**
 * Количество дней до конца регистрации домена, за которые мы уведомим о необходимости продления.
 * @member {Number} soon_expire
 */
DomainRequest.prototype['soon_expire'] = undefined;

/**
 * Это значение используется для сортировки доменных зон в панели управления.
 * @member {Number} sort_order
 */
DomainRequest.prototype['sort_order'] = undefined;

/**
 * Тип заявки.
 * @member {module:model/DomainRequest.TypeEnum} type
 */
DomainRequest.prototype['type'] = undefined;





/**
 * Allowed values for the <code>money_source</code> property.
 * @enum {String}
 * @readonly
 */
DomainRequest['MoneySourceEnum'] = {

    /**
     * value: "use"
     * @const
     */
    "use": "use",

    /**
     * value: "bonus"
     * @const
     */
    "bonus": "bonus",

    /**
     * value: "invoice"
     * @const
     */
    "invoice": "invoice"
};


/**
 * Allowed values for the <code>type</code> property.
 * @enum {String}
 * @readonly
 */
DomainRequest['TypeEnum'] = {

    /**
     * value: "request"
     * @const
     */
    "request": "request",

    /**
     * value: "prolong"
     * @const
     */
    "prolong": "prolong",

    /**
     * value: "transfer"
     * @const
     */
    "transfer": "transfer"
};



export default DomainRequest;

