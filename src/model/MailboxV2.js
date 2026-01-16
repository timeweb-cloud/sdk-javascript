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
 * The MailboxV2 model module.
 * @module model/MailboxV2
 * @version 1.0.0
 */
class MailboxV2 {
    /**
     * Constructs a new <code>MailboxV2</code>.
     * Почтовый ящик (API v2)
     * @alias module:model/MailboxV2
     * @param idnName {String} IDN домен почтового ящика
     * @param autoreplyMessage {String} Сообщение автоответчика на входящие письма
     * @param autoreplyStatus {Boolean} Включен ли автоответчик на входящие письма
     * @param autoreplySubject {String} Тема сообщения автоответчика на входящие письма
     * @param comment {String} Комментарий к почтовому ящику
     * @param filterAction {module:model/MailboxV2.FilterActionEnum} Что делать с письмами, которые попадают в спам
     * @param filterStatus {Boolean} Включен ли спам-фильтр
     * @param forwardList {Array.<String>} Список адресов для пересылки входящих писем
     * @param forwardStatus {Boolean} Включена ли пересылка входящих писем
     * @param outgoingControl {Boolean} Включена ли пересылка исходящих писем
     * @param outgoingEmail {String} Адрес для пересылки исходящих писем
     * @param password {String} Пароль почтового ящика (всегда возвращается пустой строкой)
     * @param spambox {String} Адрес для пересылки спама при выбранном действии forward
     * @param whiteList {Array.<String>} Белый список адресов от которых письма не будут попадать в спам
     * @param webmail {Boolean} Доступен ли Webmail
     * @param dovecot {Boolean} Есть ли доступ через dovecot
     * @param fqdn {String} Домен почты
     * @param leaveMessages {Boolean} Оставлять ли сообщения на сервере при пересылке
     * @param mailbox {String} Название почтового ящика
     * @param ownerFullName {String} ФИО владельца почтового ящика
     */
    constructor(idnName, autoreplyMessage, autoreplyStatus, autoreplySubject, comment, filterAction, filterStatus, forwardList, forwardStatus, outgoingControl, outgoingEmail, password, spambox, whiteList, webmail, dovecot, fqdn, leaveMessages, mailbox, ownerFullName) { 
        
        MailboxV2.initialize(this, idnName, autoreplyMessage, autoreplyStatus, autoreplySubject, comment, filterAction, filterStatus, forwardList, forwardStatus, outgoingControl, outgoingEmail, password, spambox, whiteList, webmail, dovecot, fqdn, leaveMessages, mailbox, ownerFullName);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, idnName, autoreplyMessage, autoreplyStatus, autoreplySubject, comment, filterAction, filterStatus, forwardList, forwardStatus, outgoingControl, outgoingEmail, password, spambox, whiteList, webmail, dovecot, fqdn, leaveMessages, mailbox, ownerFullName) { 
        obj['idn_name'] = idnName;
        obj['autoreply_message'] = autoreplyMessage;
        obj['autoreply_status'] = autoreplyStatus;
        obj['autoreply_subject'] = autoreplySubject;
        obj['comment'] = comment;
        obj['filter_action'] = filterAction;
        obj['filter_status'] = filterStatus;
        obj['forward_list'] = forwardList;
        obj['forward_status'] = forwardStatus;
        obj['outgoing_control'] = outgoingControl;
        obj['outgoing_email'] = outgoingEmail;
        obj['password'] = password;
        obj['spambox'] = spambox;
        obj['white_list'] = whiteList;
        obj['webmail'] = webmail;
        obj['dovecot'] = dovecot;
        obj['fqdn'] = fqdn;
        obj['leave_messages'] = leaveMessages;
        obj['mailbox'] = mailbox;
        obj['owner_full_name'] = ownerFullName;
    }

    /**
     * Constructs a <code>MailboxV2</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/MailboxV2} obj Optional instance to populate.
     * @return {module:model/MailboxV2} The populated <code>MailboxV2</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new MailboxV2();

            if (data.hasOwnProperty('idn_name')) {
                obj['idn_name'] = ApiClient.convertToType(data['idn_name'], 'String');
            }
            if (data.hasOwnProperty('autoreply_message')) {
                obj['autoreply_message'] = ApiClient.convertToType(data['autoreply_message'], 'String');
            }
            if (data.hasOwnProperty('autoreply_status')) {
                obj['autoreply_status'] = ApiClient.convertToType(data['autoreply_status'], 'Boolean');
            }
            if (data.hasOwnProperty('autoreply_subject')) {
                obj['autoreply_subject'] = ApiClient.convertToType(data['autoreply_subject'], 'String');
            }
            if (data.hasOwnProperty('comment')) {
                obj['comment'] = ApiClient.convertToType(data['comment'], 'String');
            }
            if (data.hasOwnProperty('filter_action')) {
                obj['filter_action'] = ApiClient.convertToType(data['filter_action'], 'String');
            }
            if (data.hasOwnProperty('filter_status')) {
                obj['filter_status'] = ApiClient.convertToType(data['filter_status'], 'Boolean');
            }
            if (data.hasOwnProperty('forward_list')) {
                obj['forward_list'] = ApiClient.convertToType(data['forward_list'], ['String']);
            }
            if (data.hasOwnProperty('forward_status')) {
                obj['forward_status'] = ApiClient.convertToType(data['forward_status'], 'Boolean');
            }
            if (data.hasOwnProperty('outgoing_control')) {
                obj['outgoing_control'] = ApiClient.convertToType(data['outgoing_control'], 'Boolean');
            }
            if (data.hasOwnProperty('outgoing_email')) {
                obj['outgoing_email'] = ApiClient.convertToType(data['outgoing_email'], 'String');
            }
            if (data.hasOwnProperty('password')) {
                obj['password'] = ApiClient.convertToType(data['password'], 'String');
            }
            if (data.hasOwnProperty('spambox')) {
                obj['spambox'] = ApiClient.convertToType(data['spambox'], 'String');
            }
            if (data.hasOwnProperty('white_list')) {
                obj['white_list'] = ApiClient.convertToType(data['white_list'], ['String']);
            }
            if (data.hasOwnProperty('webmail')) {
                obj['webmail'] = ApiClient.convertToType(data['webmail'], 'Boolean');
            }
            if (data.hasOwnProperty('dovecot')) {
                obj['dovecot'] = ApiClient.convertToType(data['dovecot'], 'Boolean');
            }
            if (data.hasOwnProperty('fqdn')) {
                obj['fqdn'] = ApiClient.convertToType(data['fqdn'], 'String');
            }
            if (data.hasOwnProperty('leave_messages')) {
                obj['leave_messages'] = ApiClient.convertToType(data['leave_messages'], 'Boolean');
            }
            if (data.hasOwnProperty('mailbox')) {
                obj['mailbox'] = ApiClient.convertToType(data['mailbox'], 'String');
            }
            if (data.hasOwnProperty('owner_full_name')) {
                obj['owner_full_name'] = ApiClient.convertToType(data['owner_full_name'], 'String');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>MailboxV2</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>MailboxV2</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of MailboxV2.RequiredProperties) {
            if (!data[property]) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }
        // ensure the json data is a string
        if (data['idn_name'] && !(typeof data['idn_name'] === 'string' || data['idn_name'] instanceof String)) {
            throw new Error("Expected the field `idn_name` to be a primitive type in the JSON string but got " + data['idn_name']);
        }
        // ensure the json data is a string
        if (data['autoreply_message'] && !(typeof data['autoreply_message'] === 'string' || data['autoreply_message'] instanceof String)) {
            throw new Error("Expected the field `autoreply_message` to be a primitive type in the JSON string but got " + data['autoreply_message']);
        }
        // ensure the json data is a string
        if (data['autoreply_subject'] && !(typeof data['autoreply_subject'] === 'string' || data['autoreply_subject'] instanceof String)) {
            throw new Error("Expected the field `autoreply_subject` to be a primitive type in the JSON string but got " + data['autoreply_subject']);
        }
        // ensure the json data is a string
        if (data['comment'] && !(typeof data['comment'] === 'string' || data['comment'] instanceof String)) {
            throw new Error("Expected the field `comment` to be a primitive type in the JSON string but got " + data['comment']);
        }
        // ensure the json data is a string
        if (data['filter_action'] && !(typeof data['filter_action'] === 'string' || data['filter_action'] instanceof String)) {
            throw new Error("Expected the field `filter_action` to be a primitive type in the JSON string but got " + data['filter_action']);
        }
        // ensure the json data is an array
        if (!Array.isArray(data['forward_list'])) {
            throw new Error("Expected the field `forward_list` to be an array in the JSON data but got " + data['forward_list']);
        }
        // ensure the json data is a string
        if (data['outgoing_email'] && !(typeof data['outgoing_email'] === 'string' || data['outgoing_email'] instanceof String)) {
            throw new Error("Expected the field `outgoing_email` to be a primitive type in the JSON string but got " + data['outgoing_email']);
        }
        // ensure the json data is a string
        if (data['password'] && !(typeof data['password'] === 'string' || data['password'] instanceof String)) {
            throw new Error("Expected the field `password` to be a primitive type in the JSON string but got " + data['password']);
        }
        // ensure the json data is a string
        if (data['spambox'] && !(typeof data['spambox'] === 'string' || data['spambox'] instanceof String)) {
            throw new Error("Expected the field `spambox` to be a primitive type in the JSON string but got " + data['spambox']);
        }
        // ensure the json data is an array
        if (!Array.isArray(data['white_list'])) {
            throw new Error("Expected the field `white_list` to be an array in the JSON data but got " + data['white_list']);
        }
        // ensure the json data is a string
        if (data['fqdn'] && !(typeof data['fqdn'] === 'string' || data['fqdn'] instanceof String)) {
            throw new Error("Expected the field `fqdn` to be a primitive type in the JSON string but got " + data['fqdn']);
        }
        // ensure the json data is a string
        if (data['mailbox'] && !(typeof data['mailbox'] === 'string' || data['mailbox'] instanceof String)) {
            throw new Error("Expected the field `mailbox` to be a primitive type in the JSON string but got " + data['mailbox']);
        }
        // ensure the json data is a string
        if (data['owner_full_name'] && !(typeof data['owner_full_name'] === 'string' || data['owner_full_name'] instanceof String)) {
            throw new Error("Expected the field `owner_full_name` to be a primitive type in the JSON string but got " + data['owner_full_name']);
        }

        return true;
    }


}

MailboxV2.RequiredProperties = ["idn_name", "autoreply_message", "autoreply_status", "autoreply_subject", "comment", "filter_action", "filter_status", "forward_list", "forward_status", "outgoing_control", "outgoing_email", "password", "spambox", "white_list", "webmail", "dovecot", "fqdn", "leave_messages", "mailbox", "owner_full_name"];

/**
 * IDN домен почтового ящика
 * @member {String} idn_name
 */
MailboxV2.prototype['idn_name'] = undefined;

/**
 * Сообщение автоответчика на входящие письма
 * @member {String} autoreply_message
 */
MailboxV2.prototype['autoreply_message'] = undefined;

/**
 * Включен ли автоответчик на входящие письма
 * @member {Boolean} autoreply_status
 */
MailboxV2.prototype['autoreply_status'] = undefined;

/**
 * Тема сообщения автоответчика на входящие письма
 * @member {String} autoreply_subject
 */
MailboxV2.prototype['autoreply_subject'] = undefined;

/**
 * Комментарий к почтовому ящику
 * @member {String} comment
 */
MailboxV2.prototype['comment'] = undefined;

/**
 * Что делать с письмами, которые попадают в спам
 * @member {module:model/MailboxV2.FilterActionEnum} filter_action
 */
MailboxV2.prototype['filter_action'] = undefined;

/**
 * Включен ли спам-фильтр
 * @member {Boolean} filter_status
 */
MailboxV2.prototype['filter_status'] = undefined;

/**
 * Список адресов для пересылки входящих писем
 * @member {Array.<String>} forward_list
 */
MailboxV2.prototype['forward_list'] = undefined;

/**
 * Включена ли пересылка входящих писем
 * @member {Boolean} forward_status
 */
MailboxV2.prototype['forward_status'] = undefined;

/**
 * Включена ли пересылка исходящих писем
 * @member {Boolean} outgoing_control
 */
MailboxV2.prototype['outgoing_control'] = undefined;

/**
 * Адрес для пересылки исходящих писем
 * @member {String} outgoing_email
 */
MailboxV2.prototype['outgoing_email'] = undefined;

/**
 * Пароль почтового ящика (всегда возвращается пустой строкой)
 * @member {String} password
 */
MailboxV2.prototype['password'] = undefined;

/**
 * Адрес для пересылки спама при выбранном действии forward
 * @member {String} spambox
 */
MailboxV2.prototype['spambox'] = undefined;

/**
 * Белый список адресов от которых письма не будут попадать в спам
 * @member {Array.<String>} white_list
 */
MailboxV2.prototype['white_list'] = undefined;

/**
 * Доступен ли Webmail
 * @member {Boolean} webmail
 */
MailboxV2.prototype['webmail'] = undefined;

/**
 * Есть ли доступ через dovecot
 * @member {Boolean} dovecot
 */
MailboxV2.prototype['dovecot'] = undefined;

/**
 * Домен почты
 * @member {String} fqdn
 */
MailboxV2.prototype['fqdn'] = undefined;

/**
 * Оставлять ли сообщения на сервере при пересылке
 * @member {Boolean} leave_messages
 */
MailboxV2.prototype['leave_messages'] = undefined;

/**
 * Название почтового ящика
 * @member {String} mailbox
 */
MailboxV2.prototype['mailbox'] = undefined;

/**
 * ФИО владельца почтового ящика
 * @member {String} owner_full_name
 */
MailboxV2.prototype['owner_full_name'] = undefined;





/**
 * Allowed values for the <code>filter_action</code> property.
 * @enum {String}
 * @readonly
 */
MailboxV2['FilterActionEnum'] = {

    /**
     * value: "directory"
     * @const
     */
    "directory": "directory",

    /**
     * value: "forward"
     * @const
     */
    "forward": "forward",

    /**
     * value: "delete"
     * @const
     */
    "delete": "delete",

    /**
     * value: "tag"
     * @const
     */
    "tag": "tag"
};



export default MailboxV2;

