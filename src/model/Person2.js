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
 * The Person2 model module.
 * @module model/Person2
 * @version 1.0.0
 */
class Person2 {
    /**
     * Constructs a new <code>Person2</code>.
     * Администратор домена — физическое лицо
     * @alias module:model/Person2
     * @param type {module:model/Person2.TypeEnum} Тип администратора.
     * @param name {String} ФИО администратора.
     * @param isResident {Boolean} Это логическое значение, которое показывает, является ли администратор резидентом РФ.
     * @param birthdate {String} Дата рождения.
     * @param passportDate {String} Дата выдачи паспорта.
     * @param passportNumber {String} Номер паспорта.
     * @param passportPlace {String} Кем выдан паспорт.
     * @param passportSeries {String} Серия паспорта.
     * @param postcode {String} Почтовый индекс.
     * @param mailingAddress {String} Почтовый адрес.
     * @param phone {String} Контактный телефон.
     * @param email {String} Адрес электронной почты.
     */
    constructor(type, name, isResident, birthdate, passportDate, passportNumber, passportPlace, passportSeries, postcode, mailingAddress, phone, email) { 
        
        Person2.initialize(this, type, name, isResident, birthdate, passportDate, passportNumber, passportPlace, passportSeries, postcode, mailingAddress, phone, email);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, type, name, isResident, birthdate, passportDate, passportNumber, passportPlace, passportSeries, postcode, mailingAddress, phone, email) { 
        obj['type'] = type;
        obj['name'] = name;
        obj['is_resident'] = isResident;
        obj['birthdate'] = birthdate;
        obj['passport_date'] = passportDate;
        obj['passport_number'] = passportNumber;
        obj['passport_place'] = passportPlace;
        obj['passport_series'] = passportSeries;
        obj['postcode'] = postcode;
        obj['mailing_address'] = mailingAddress;
        obj['phone'] = phone;
        obj['email'] = email;
    }

    /**
     * Constructs a <code>Person2</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Person2} obj Optional instance to populate.
     * @return {module:model/Person2} The populated <code>Person2</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new Person2();

            if (data.hasOwnProperty('type')) {
                obj['type'] = ApiClient.convertToType(data['type'], 'String');
            }
            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('is_resident')) {
                obj['is_resident'] = ApiClient.convertToType(data['is_resident'], 'Boolean');
            }
            if (data.hasOwnProperty('birthdate')) {
                obj['birthdate'] = ApiClient.convertToType(data['birthdate'], 'String');
            }
            if (data.hasOwnProperty('passport_date')) {
                obj['passport_date'] = ApiClient.convertToType(data['passport_date'], 'String');
            }
            if (data.hasOwnProperty('passport_number')) {
                obj['passport_number'] = ApiClient.convertToType(data['passport_number'], 'String');
            }
            if (data.hasOwnProperty('passport_place')) {
                obj['passport_place'] = ApiClient.convertToType(data['passport_place'], 'String');
            }
            if (data.hasOwnProperty('passport_series')) {
                obj['passport_series'] = ApiClient.convertToType(data['passport_series'], 'String');
            }
            if (data.hasOwnProperty('postcode')) {
                obj['postcode'] = ApiClient.convertToType(data['postcode'], 'String');
            }
            if (data.hasOwnProperty('mailing_address')) {
                obj['mailing_address'] = ApiClient.convertToType(data['mailing_address'], 'String');
            }
            if (data.hasOwnProperty('phone')) {
                obj['phone'] = ApiClient.convertToType(data['phone'], 'String');
            }
            if (data.hasOwnProperty('email')) {
                obj['email'] = ApiClient.convertToType(data['email'], 'String');
            }
            if (data.hasOwnProperty('country_code')) {
                obj['country_code'] = ApiClient.convertToType(data['country_code'], 'String');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>Person2</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>Person2</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of Person2.RequiredProperties) {
            if (!data[property]) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }
        // ensure the json data is a string
        if (data['type'] && !(typeof data['type'] === 'string' || data['type'] instanceof String)) {
            throw new Error("Expected the field `type` to be a primitive type in the JSON string but got " + data['type']);
        }
        // ensure the json data is a string
        if (data['name'] && !(typeof data['name'] === 'string' || data['name'] instanceof String)) {
            throw new Error("Expected the field `name` to be a primitive type in the JSON string but got " + data['name']);
        }
        // ensure the json data is a string
        if (data['birthdate'] && !(typeof data['birthdate'] === 'string' || data['birthdate'] instanceof String)) {
            throw new Error("Expected the field `birthdate` to be a primitive type in the JSON string but got " + data['birthdate']);
        }
        // ensure the json data is a string
        if (data['passport_date'] && !(typeof data['passport_date'] === 'string' || data['passport_date'] instanceof String)) {
            throw new Error("Expected the field `passport_date` to be a primitive type in the JSON string but got " + data['passport_date']);
        }
        // ensure the json data is a string
        if (data['passport_number'] && !(typeof data['passport_number'] === 'string' || data['passport_number'] instanceof String)) {
            throw new Error("Expected the field `passport_number` to be a primitive type in the JSON string but got " + data['passport_number']);
        }
        // ensure the json data is a string
        if (data['passport_place'] && !(typeof data['passport_place'] === 'string' || data['passport_place'] instanceof String)) {
            throw new Error("Expected the field `passport_place` to be a primitive type in the JSON string but got " + data['passport_place']);
        }
        // ensure the json data is a string
        if (data['passport_series'] && !(typeof data['passport_series'] === 'string' || data['passport_series'] instanceof String)) {
            throw new Error("Expected the field `passport_series` to be a primitive type in the JSON string but got " + data['passport_series']);
        }
        // ensure the json data is a string
        if (data['postcode'] && !(typeof data['postcode'] === 'string' || data['postcode'] instanceof String)) {
            throw new Error("Expected the field `postcode` to be a primitive type in the JSON string but got " + data['postcode']);
        }
        // ensure the json data is a string
        if (data['mailing_address'] && !(typeof data['mailing_address'] === 'string' || data['mailing_address'] instanceof String)) {
            throw new Error("Expected the field `mailing_address` to be a primitive type in the JSON string but got " + data['mailing_address']);
        }
        // ensure the json data is a string
        if (data['phone'] && !(typeof data['phone'] === 'string' || data['phone'] instanceof String)) {
            throw new Error("Expected the field `phone` to be a primitive type in the JSON string but got " + data['phone']);
        }
        // ensure the json data is a string
        if (data['email'] && !(typeof data['email'] === 'string' || data['email'] instanceof String)) {
            throw new Error("Expected the field `email` to be a primitive type in the JSON string but got " + data['email']);
        }
        // ensure the json data is a string
        if (data['country_code'] && !(typeof data['country_code'] === 'string' || data['country_code'] instanceof String)) {
            throw new Error("Expected the field `country_code` to be a primitive type in the JSON string but got " + data['country_code']);
        }

        return true;
    }


}

Person2.RequiredProperties = ["type", "name", "is_resident", "birthdate", "passport_date", "passport_number", "passport_place", "passport_series", "postcode", "mailing_address", "phone", "email"];

/**
 * Тип администратора.
 * @member {module:model/Person2.TypeEnum} type
 */
Person2.prototype['type'] = undefined;

/**
 * ФИО администратора.
 * @member {String} name
 */
Person2.prototype['name'] = undefined;

/**
 * Это логическое значение, которое показывает, является ли администратор резидентом РФ.
 * @member {Boolean} is_resident
 */
Person2.prototype['is_resident'] = undefined;

/**
 * Дата рождения.
 * @member {String} birthdate
 */
Person2.prototype['birthdate'] = undefined;

/**
 * Дата выдачи паспорта.
 * @member {String} passport_date
 */
Person2.prototype['passport_date'] = undefined;

/**
 * Номер паспорта.
 * @member {String} passport_number
 */
Person2.prototype['passport_number'] = undefined;

/**
 * Кем выдан паспорт.
 * @member {String} passport_place
 */
Person2.prototype['passport_place'] = undefined;

/**
 * Серия паспорта.
 * @member {String} passport_series
 */
Person2.prototype['passport_series'] = undefined;

/**
 * Почтовый индекс.
 * @member {String} postcode
 */
Person2.prototype['postcode'] = undefined;

/**
 * Почтовый адрес.
 * @member {String} mailing_address
 */
Person2.prototype['mailing_address'] = undefined;

/**
 * Контактный телефон.
 * @member {String} phone
 */
Person2.prototype['phone'] = undefined;

/**
 * Адрес электронной почты.
 * @member {String} email
 */
Person2.prototype['email'] = undefined;

/**
 * Код страны. Только для нерезидентов РФ (`is_resident: false`); для резидентов поле передавать не нужно.
 * @member {String} country_code
 */
Person2.prototype['country_code'] = undefined;





/**
 * Allowed values for the <code>type</code> property.
 * @enum {String}
 * @readonly
 */
Person2['TypeEnum'] = {

    /**
     * value: "person"
     * @const
     */
    "person": "person"
};



export default Person2;

