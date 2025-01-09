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
import DomainAllowedBuyPeriodsInner from './DomainAllowedBuyPeriodsInner';
import Subdomain from './Subdomain';

/**
 * The Domain model module.
 * @module model/Domain
 * @version 1.0.0
 */
class Domain {
    /**
     * Constructs a new <code>Domain</code>.
     * Домен
     * @alias module:model/Domain
     * @param allowedBuyPeriods {Array.<module:model/DomainAllowedBuyPeriodsInner>} Допустимые периоды продления домена.
     * @param daysLeft {Number} Количество дней, оставшихся до конца срока регистрации домена.
     * @param domainStatus {module:model/Domain.DomainStatusEnum} Статус домена.
     * @param expiration {String} Дата окончания срока регистрации домена, для доменов без срока окончания регистрации будет приходить 0000-00-00.
     * @param fqdn {String} Полное имя домена.
     * @param id {Number} ID домена.
     * @param isAutoprolongEnabled {Boolean} Это логическое значение, которое показывает, включено ли автопродление домена.
     * @param isPremium {Boolean} Это логическое значение, которое показывает, является ли домен премиальным.
     * @param isProlongAllowed {Boolean} Это логическое значение, которое показывает, можно ли сейчас продлить домен.
     * @param isTechnical {Boolean} Это логическое значение, которое показывает, является ли домен техническим.
     * @param isWhoisPrivacyEnabled {Boolean} Это логическое значение, которое показывает, включено ли скрытие данных администратора домена для whois. Если приходит null, значит для данной зоны эта услуга не доступна.
     * @param linkedIp {String} Привязанный к домену IP-адрес.
     * @param paidTill {String} До какого числа оплачен домен.
     * @param personId {Number} ID администратора, на которого зарегистрирован домен.
     * @param premiumProlongCost {Number} Стоимость премиального домена.
     * @param provider {String} ID регистратора домена.
     * @param requestStatus {module:model/Domain.RequestStatusEnum} Статус заявки на продление/регистрацию/трансфер домена.
     * @param subdomains {Array.<module:model/Subdomain>} Список поддоменов.
     * @param tldId {Number} ID доменной зоны.
     */
    constructor(allowedBuyPeriods, daysLeft, domainStatus, expiration, fqdn, id, isAutoprolongEnabled, isPremium, isProlongAllowed, isTechnical, isWhoisPrivacyEnabled, linkedIp, paidTill, personId, premiumProlongCost, provider, requestStatus, subdomains, tldId) { 
        
        Domain.initialize(this, allowedBuyPeriods, daysLeft, domainStatus, expiration, fqdn, id, isAutoprolongEnabled, isPremium, isProlongAllowed, isTechnical, isWhoisPrivacyEnabled, linkedIp, paidTill, personId, premiumProlongCost, provider, requestStatus, subdomains, tldId);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, allowedBuyPeriods, daysLeft, domainStatus, expiration, fqdn, id, isAutoprolongEnabled, isPremium, isProlongAllowed, isTechnical, isWhoisPrivacyEnabled, linkedIp, paidTill, personId, premiumProlongCost, provider, requestStatus, subdomains, tldId) { 
        obj['allowed_buy_periods'] = allowedBuyPeriods;
        obj['days_left'] = daysLeft;
        obj['domain_status'] = domainStatus;
        obj['expiration'] = expiration;
        obj['fqdn'] = fqdn;
        obj['id'] = id;
        obj['is_autoprolong_enabled'] = isAutoprolongEnabled;
        obj['is_premium'] = isPremium;
        obj['is_prolong_allowed'] = isProlongAllowed;
        obj['is_technical'] = isTechnical;
        obj['is_whois_privacy_enabled'] = isWhoisPrivacyEnabled;
        obj['linked_ip'] = linkedIp;
        obj['paid_till'] = paidTill;
        obj['person_id'] = personId;
        obj['premium_prolong_cost'] = premiumProlongCost;
        obj['provider'] = provider;
        obj['request_status'] = requestStatus;
        obj['subdomains'] = subdomains;
        obj['tld_id'] = tldId;
    }

    /**
     * Constructs a <code>Domain</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Domain} obj Optional instance to populate.
     * @return {module:model/Domain} The populated <code>Domain</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new Domain();

            if (data.hasOwnProperty('allowed_buy_periods')) {
                obj['allowed_buy_periods'] = ApiClient.convertToType(data['allowed_buy_periods'], [DomainAllowedBuyPeriodsInner]);
            }
            if (data.hasOwnProperty('days_left')) {
                obj['days_left'] = ApiClient.convertToType(data['days_left'], 'Number');
            }
            if (data.hasOwnProperty('domain_status')) {
                obj['domain_status'] = ApiClient.convertToType(data['domain_status'], 'String');
            }
            if (data.hasOwnProperty('expiration')) {
                obj['expiration'] = ApiClient.convertToType(data['expiration'], 'String');
            }
            if (data.hasOwnProperty('fqdn')) {
                obj['fqdn'] = ApiClient.convertToType(data['fqdn'], 'String');
            }
            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'Number');
            }
            if (data.hasOwnProperty('is_autoprolong_enabled')) {
                obj['is_autoprolong_enabled'] = ApiClient.convertToType(data['is_autoprolong_enabled'], 'Boolean');
            }
            if (data.hasOwnProperty('is_premium')) {
                obj['is_premium'] = ApiClient.convertToType(data['is_premium'], 'Boolean');
            }
            if (data.hasOwnProperty('is_prolong_allowed')) {
                obj['is_prolong_allowed'] = ApiClient.convertToType(data['is_prolong_allowed'], 'Boolean');
            }
            if (data.hasOwnProperty('is_technical')) {
                obj['is_technical'] = ApiClient.convertToType(data['is_technical'], 'Boolean');
            }
            if (data.hasOwnProperty('is_whois_privacy_enabled')) {
                obj['is_whois_privacy_enabled'] = ApiClient.convertToType(data['is_whois_privacy_enabled'], 'Boolean');
            }
            if (data.hasOwnProperty('linked_ip')) {
                obj['linked_ip'] = ApiClient.convertToType(data['linked_ip'], 'String');
            }
            if (data.hasOwnProperty('paid_till')) {
                obj['paid_till'] = ApiClient.convertToType(data['paid_till'], 'String');
            }
            if (data.hasOwnProperty('person_id')) {
                obj['person_id'] = ApiClient.convertToType(data['person_id'], 'Number');
            }
            if (data.hasOwnProperty('premium_prolong_cost')) {
                obj['premium_prolong_cost'] = ApiClient.convertToType(data['premium_prolong_cost'], 'Number');
            }
            if (data.hasOwnProperty('provider')) {
                obj['provider'] = ApiClient.convertToType(data['provider'], 'String');
            }
            if (data.hasOwnProperty('request_status')) {
                obj['request_status'] = ApiClient.convertToType(data['request_status'], 'String');
            }
            if (data.hasOwnProperty('subdomains')) {
                obj['subdomains'] = ApiClient.convertToType(data['subdomains'], [Subdomain]);
            }
            if (data.hasOwnProperty('tld_id')) {
                obj['tld_id'] = ApiClient.convertToType(data['tld_id'], 'Number');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>Domain</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>Domain</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of Domain.RequiredProperties) {
            if (!data[property]) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }
        if (data['allowed_buy_periods']) { // data not null
            // ensure the json data is an array
            if (!Array.isArray(data['allowed_buy_periods'])) {
                throw new Error("Expected the field `allowed_buy_periods` to be an array in the JSON data but got " + data['allowed_buy_periods']);
            }
            // validate the optional field `allowed_buy_periods` (array)
            for (const item of data['allowed_buy_periods']) {
                DomainAllowedBuyPeriodsInner.validateJSON(item);
            };
        }
        // ensure the json data is a string
        if (data['domain_status'] && !(typeof data['domain_status'] === 'string' || data['domain_status'] instanceof String)) {
            throw new Error("Expected the field `domain_status` to be a primitive type in the JSON string but got " + data['domain_status']);
        }
        // ensure the json data is a string
        if (data['expiration'] && !(typeof data['expiration'] === 'string' || data['expiration'] instanceof String)) {
            throw new Error("Expected the field `expiration` to be a primitive type in the JSON string but got " + data['expiration']);
        }
        // ensure the json data is a string
        if (data['fqdn'] && !(typeof data['fqdn'] === 'string' || data['fqdn'] instanceof String)) {
            throw new Error("Expected the field `fqdn` to be a primitive type in the JSON string but got " + data['fqdn']);
        }
        // ensure the json data is a string
        if (data['linked_ip'] && !(typeof data['linked_ip'] === 'string' || data['linked_ip'] instanceof String)) {
            throw new Error("Expected the field `linked_ip` to be a primitive type in the JSON string but got " + data['linked_ip']);
        }
        // ensure the json data is a string
        if (data['paid_till'] && !(typeof data['paid_till'] === 'string' || data['paid_till'] instanceof String)) {
            throw new Error("Expected the field `paid_till` to be a primitive type in the JSON string but got " + data['paid_till']);
        }
        // ensure the json data is a string
        if (data['provider'] && !(typeof data['provider'] === 'string' || data['provider'] instanceof String)) {
            throw new Error("Expected the field `provider` to be a primitive type in the JSON string but got " + data['provider']);
        }
        // ensure the json data is a string
        if (data['request_status'] && !(typeof data['request_status'] === 'string' || data['request_status'] instanceof String)) {
            throw new Error("Expected the field `request_status` to be a primitive type in the JSON string but got " + data['request_status']);
        }
        if (data['subdomains']) { // data not null
            // ensure the json data is an array
            if (!Array.isArray(data['subdomains'])) {
                throw new Error("Expected the field `subdomains` to be an array in the JSON data but got " + data['subdomains']);
            }
            // validate the optional field `subdomains` (array)
            for (const item of data['subdomains']) {
                Subdomain.validateJSON(item);
            };
        }

        return true;
    }


}

Domain.RequiredProperties = ["allowed_buy_periods", "days_left", "domain_status", "expiration", "fqdn", "id", "is_autoprolong_enabled", "is_premium", "is_prolong_allowed", "is_technical", "is_whois_privacy_enabled", "linked_ip", "paid_till", "person_id", "premium_prolong_cost", "provider", "request_status", "subdomains", "tld_id"];

/**
 * Допустимые периоды продления домена.
 * @member {Array.<module:model/DomainAllowedBuyPeriodsInner>} allowed_buy_periods
 */
Domain.prototype['allowed_buy_periods'] = undefined;

/**
 * Количество дней, оставшихся до конца срока регистрации домена.
 * @member {Number} days_left
 */
Domain.prototype['days_left'] = undefined;

/**
 * Статус домена.
 * @member {module:model/Domain.DomainStatusEnum} domain_status
 */
Domain.prototype['domain_status'] = undefined;

/**
 * Дата окончания срока регистрации домена, для доменов без срока окончания регистрации будет приходить 0000-00-00.
 * @member {String} expiration
 */
Domain.prototype['expiration'] = undefined;

/**
 * Полное имя домена.
 * @member {String} fqdn
 */
Domain.prototype['fqdn'] = undefined;

/**
 * ID домена.
 * @member {Number} id
 */
Domain.prototype['id'] = undefined;

/**
 * Это логическое значение, которое показывает, включено ли автопродление домена.
 * @member {Boolean} is_autoprolong_enabled
 */
Domain.prototype['is_autoprolong_enabled'] = undefined;

/**
 * Это логическое значение, которое показывает, является ли домен премиальным.
 * @member {Boolean} is_premium
 */
Domain.prototype['is_premium'] = undefined;

/**
 * Это логическое значение, которое показывает, можно ли сейчас продлить домен.
 * @member {Boolean} is_prolong_allowed
 */
Domain.prototype['is_prolong_allowed'] = undefined;

/**
 * Это логическое значение, которое показывает, является ли домен техническим.
 * @member {Boolean} is_technical
 */
Domain.prototype['is_technical'] = undefined;

/**
 * Это логическое значение, которое показывает, включено ли скрытие данных администратора домена для whois. Если приходит null, значит для данной зоны эта услуга не доступна.
 * @member {Boolean} is_whois_privacy_enabled
 */
Domain.prototype['is_whois_privacy_enabled'] = undefined;

/**
 * Привязанный к домену IP-адрес.
 * @member {String} linked_ip
 */
Domain.prototype['linked_ip'] = undefined;

/**
 * До какого числа оплачен домен.
 * @member {String} paid_till
 */
Domain.prototype['paid_till'] = undefined;

/**
 * ID администратора, на которого зарегистрирован домен.
 * @member {Number} person_id
 */
Domain.prototype['person_id'] = undefined;

/**
 * Стоимость премиального домена.
 * @member {Number} premium_prolong_cost
 */
Domain.prototype['premium_prolong_cost'] = undefined;

/**
 * ID регистратора домена.
 * @member {String} provider
 */
Domain.prototype['provider'] = undefined;

/**
 * Статус заявки на продление/регистрацию/трансфер домена.
 * @member {module:model/Domain.RequestStatusEnum} request_status
 */
Domain.prototype['request_status'] = undefined;

/**
 * Список поддоменов.
 * @member {Array.<module:model/Subdomain>} subdomains
 */
Domain.prototype['subdomains'] = undefined;

/**
 * ID доменной зоны.
 * @member {Number} tld_id
 */
Domain.prototype['tld_id'] = undefined;





/**
 * Allowed values for the <code>domain_status</code> property.
 * @enum {String}
 * @readonly
 */
Domain['DomainStatusEnum'] = {

    /**
     * value: "awaiting_payment"
     * @const
     */
    "awaiting_payment": "awaiting_payment",

    /**
     * value: "expired"
     * @const
     */
    "expired": "expired",

    /**
     * value: "final_expired"
     * @const
     */
    "final_expired": "final_expired",

    /**
     * value: "free"
     * @const
     */
    "free": "free",

    /**
     * value: "no_paid"
     * @const
     */
    "no_paid": "no_paid",

    /**
     * value: "ns_based"
     * @const
     */
    "ns_based": "ns_based",

    /**
     * value: "paid"
     * @const
     */
    "paid": "paid",

    /**
     * value: "soon_expire"
     * @const
     */
    "soon_expire": "soon_expire",

    /**
     * value: "today_expired"
     * @const
     */
    "today_expired": "today_expired"
};


/**
 * Allowed values for the <code>request_status</code> property.
 * @enum {String}
 * @readonly
 */
Domain['RequestStatusEnum'] = {

    /**
     * value: "prolongation_fail"
     * @const
     */
    "prolongation_fail": "prolongation_fail",

    /**
     * value: "prolongation_request"
     * @const
     */
    "prolongation_request": "prolongation_request",

    /**
     * value: "registration_fail"
     * @const
     */
    "registration_fail": "registration_fail",

    /**
     * value: "registration_request"
     * @const
     */
    "registration_request": "registration_request",

    /**
     * value: "transfer_fail"
     * @const
     */
    "transfer_fail": "transfer_fail",

    /**
     * value: "transfer_request"
     * @const
     */
    "transfer_request": "transfer_request",

    /**
     * value: "awaiting_person"
     * @const
     */
    "awaiting_person": "awaiting_person"
};



export default Domain;

