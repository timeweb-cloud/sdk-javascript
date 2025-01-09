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
import TopLevelDomainAllowedBuyPeriodsInner from './TopLevelDomainAllowedBuyPeriodsInner';

/**
 * The TopLevelDomain model module.
 * @module model/TopLevelDomain
 * @version 1.0.0
 */
class TopLevelDomain {
    /**
     * Constructs a new <code>TopLevelDomain</code>.
     * Доменная зона.
     * @alias module:model/TopLevelDomain
     * @param allowedBuyPeriods {Array.<module:model/TopLevelDomainAllowedBuyPeriodsInner>} Список доступных периодов для регистрации/продления доменов со стоимостью.
     * @param earlyRenewPeriod {Number} Количество дней до истечение срока регистрации, когда можно продлять домен.
     * @param gracePeriod {Number} Количество дней, которые действует льготный период когда вы ещё можете продлить домен, после окончания его регистрации
     * @param id {Number} ID доменной зоны.
     * @param isPublished {Boolean} Это логическое значение, которое показывает, опубликована ли доменная зона.
     * @param isRegistered {Boolean} Это логическое значение, которое показывает, зарегистрирована ли доменная зона.
     * @param isWhoisPrivacyDefaultEnabled {Boolean} Это логическое значение, которое показывает, включено ли по умолчанию скрытие данных администратора для доменной зоны.
     * @param isWhoisPrivacyEnabled {Boolean} Это логическое значение, которое показывает, доступно ли управление скрытием данных администратора для доменной зоны.
     * @param name {String} Имя доменной зоны.
     * @param price {Number} Цена регистрации домена
     * @param prolongPrice {Number} Цена продления домена.
     * @param registrar {module:model/TopLevelDomain.RegistrarEnum} Регистратор доменной зоны.
     * @param transfer {Number} Цена услуги трансфера домена.
     * @param whoisPrivacyPrice {Number} Цена услуги скрытия данных администратора для доменной зоны.
     */
    constructor(allowedBuyPeriods, earlyRenewPeriod, gracePeriod, id, isPublished, isRegistered, isWhoisPrivacyDefaultEnabled, isWhoisPrivacyEnabled, name, price, prolongPrice, registrar, transfer, whoisPrivacyPrice) { 
        
        TopLevelDomain.initialize(this, allowedBuyPeriods, earlyRenewPeriod, gracePeriod, id, isPublished, isRegistered, isWhoisPrivacyDefaultEnabled, isWhoisPrivacyEnabled, name, price, prolongPrice, registrar, transfer, whoisPrivacyPrice);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, allowedBuyPeriods, earlyRenewPeriod, gracePeriod, id, isPublished, isRegistered, isWhoisPrivacyDefaultEnabled, isWhoisPrivacyEnabled, name, price, prolongPrice, registrar, transfer, whoisPrivacyPrice) { 
        obj['allowed_buy_periods'] = allowedBuyPeriods;
        obj['early_renew_period'] = earlyRenewPeriod;
        obj['grace_period'] = gracePeriod;
        obj['id'] = id;
        obj['is_published'] = isPublished;
        obj['is_registered'] = isRegistered;
        obj['is_whois_privacy_default_enabled'] = isWhoisPrivacyDefaultEnabled;
        obj['is_whois_privacy_enabled'] = isWhoisPrivacyEnabled;
        obj['name'] = name;
        obj['price'] = price;
        obj['prolong_price'] = prolongPrice;
        obj['registrar'] = registrar;
        obj['transfer'] = transfer;
        obj['whois_privacy_price'] = whoisPrivacyPrice;
    }

    /**
     * Constructs a <code>TopLevelDomain</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/TopLevelDomain} obj Optional instance to populate.
     * @return {module:model/TopLevelDomain} The populated <code>TopLevelDomain</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new TopLevelDomain();

            if (data.hasOwnProperty('allowed_buy_periods')) {
                obj['allowed_buy_periods'] = ApiClient.convertToType(data['allowed_buy_periods'], [TopLevelDomainAllowedBuyPeriodsInner]);
            }
            if (data.hasOwnProperty('early_renew_period')) {
                obj['early_renew_period'] = ApiClient.convertToType(data['early_renew_period'], 'Number');
            }
            if (data.hasOwnProperty('grace_period')) {
                obj['grace_period'] = ApiClient.convertToType(data['grace_period'], 'Number');
            }
            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'Number');
            }
            if (data.hasOwnProperty('is_published')) {
                obj['is_published'] = ApiClient.convertToType(data['is_published'], 'Boolean');
            }
            if (data.hasOwnProperty('is_registered')) {
                obj['is_registered'] = ApiClient.convertToType(data['is_registered'], 'Boolean');
            }
            if (data.hasOwnProperty('is_whois_privacy_default_enabled')) {
                obj['is_whois_privacy_default_enabled'] = ApiClient.convertToType(data['is_whois_privacy_default_enabled'], 'Boolean');
            }
            if (data.hasOwnProperty('is_whois_privacy_enabled')) {
                obj['is_whois_privacy_enabled'] = ApiClient.convertToType(data['is_whois_privacy_enabled'], 'Boolean');
            }
            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('price')) {
                obj['price'] = ApiClient.convertToType(data['price'], 'Number');
            }
            if (data.hasOwnProperty('prolong_price')) {
                obj['prolong_price'] = ApiClient.convertToType(data['prolong_price'], 'Number');
            }
            if (data.hasOwnProperty('registrar')) {
                obj['registrar'] = ApiClient.convertToType(data['registrar'], 'String');
            }
            if (data.hasOwnProperty('transfer')) {
                obj['transfer'] = ApiClient.convertToType(data['transfer'], 'Number');
            }
            if (data.hasOwnProperty('whois_privacy_price')) {
                obj['whois_privacy_price'] = ApiClient.convertToType(data['whois_privacy_price'], 'Number');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>TopLevelDomain</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>TopLevelDomain</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of TopLevelDomain.RequiredProperties) {
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
                TopLevelDomainAllowedBuyPeriodsInner.validateJSON(item);
            };
        }
        // ensure the json data is a string
        if (data['name'] && !(typeof data['name'] === 'string' || data['name'] instanceof String)) {
            throw new Error("Expected the field `name` to be a primitive type in the JSON string but got " + data['name']);
        }
        // ensure the json data is a string
        if (data['registrar'] && !(typeof data['registrar'] === 'string' || data['registrar'] instanceof String)) {
            throw new Error("Expected the field `registrar` to be a primitive type in the JSON string but got " + data['registrar']);
        }

        return true;
    }


}

TopLevelDomain.RequiredProperties = ["allowed_buy_periods", "early_renew_period", "grace_period", "id", "is_published", "is_registered", "is_whois_privacy_default_enabled", "is_whois_privacy_enabled", "name", "price", "prolong_price", "registrar", "transfer", "whois_privacy_price"];

/**
 * Список доступных периодов для регистрации/продления доменов со стоимостью.
 * @member {Array.<module:model/TopLevelDomainAllowedBuyPeriodsInner>} allowed_buy_periods
 */
TopLevelDomain.prototype['allowed_buy_periods'] = undefined;

/**
 * Количество дней до истечение срока регистрации, когда можно продлять домен.
 * @member {Number} early_renew_period
 */
TopLevelDomain.prototype['early_renew_period'] = undefined;

/**
 * Количество дней, которые действует льготный период когда вы ещё можете продлить домен, после окончания его регистрации
 * @member {Number} grace_period
 */
TopLevelDomain.prototype['grace_period'] = undefined;

/**
 * ID доменной зоны.
 * @member {Number} id
 */
TopLevelDomain.prototype['id'] = undefined;

/**
 * Это логическое значение, которое показывает, опубликована ли доменная зона.
 * @member {Boolean} is_published
 */
TopLevelDomain.prototype['is_published'] = undefined;

/**
 * Это логическое значение, которое показывает, зарегистрирована ли доменная зона.
 * @member {Boolean} is_registered
 */
TopLevelDomain.prototype['is_registered'] = undefined;

/**
 * Это логическое значение, которое показывает, включено ли по умолчанию скрытие данных администратора для доменной зоны.
 * @member {Boolean} is_whois_privacy_default_enabled
 */
TopLevelDomain.prototype['is_whois_privacy_default_enabled'] = undefined;

/**
 * Это логическое значение, которое показывает, доступно ли управление скрытием данных администратора для доменной зоны.
 * @member {Boolean} is_whois_privacy_enabled
 */
TopLevelDomain.prototype['is_whois_privacy_enabled'] = undefined;

/**
 * Имя доменной зоны.
 * @member {String} name
 */
TopLevelDomain.prototype['name'] = undefined;

/**
 * Цена регистрации домена
 * @member {Number} price
 */
TopLevelDomain.prototype['price'] = undefined;

/**
 * Цена продления домена.
 * @member {Number} prolong_price
 */
TopLevelDomain.prototype['prolong_price'] = undefined;

/**
 * Регистратор доменной зоны.
 * @member {module:model/TopLevelDomain.RegistrarEnum} registrar
 */
TopLevelDomain.prototype['registrar'] = undefined;

/**
 * Цена услуги трансфера домена.
 * @member {Number} transfer
 */
TopLevelDomain.prototype['transfer'] = undefined;

/**
 * Цена услуги скрытия данных администратора для доменной зоны.
 * @member {Number} whois_privacy_price
 */
TopLevelDomain.prototype['whois_privacy_price'] = undefined;





/**
 * Allowed values for the <code>registrar</code> property.
 * @enum {String}
 * @readonly
 */
TopLevelDomain['RegistrarEnum'] = {

    /**
     * value: "NIC"
     * @const
     */
    "NIC": "NIC",

    /**
     * value: "PDR"
     * @const
     */
    "PDR": "PDR",

    /**
     * value: "R01"
     * @const
     */
    "R01": "R01",

    /**
     * value: "timeweb"
     * @const
     */
    "timeweb": "timeweb",

    /**
     * value: "TimewebVirtreg"
     * @const
     */
    "TimewebVirtreg": "TimewebVirtreg",

    /**
     * value: "Webnames"
     * @const
     */
    "Webnames": "Webnames",

    /**
     * value: "unknown"
     * @const
     */
    "unknown": "unknown"
};



export default TopLevelDomain;

