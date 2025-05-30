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
 * The CreateDedicatedServer model module.
 * @module model/CreateDedicatedServer
 * @version 1.0.0
 */
class CreateDedicatedServer {
    /**
     * Constructs a new <code>CreateDedicatedServer</code>.
     * @alias module:model/CreateDedicatedServer
     * @param planId {Number} ID списка дополнительных услуг выделенного сервера.
     * @param presetId {Number} ID тарифа выделенного сервера.
     * @param paymentPeriod {module:model/CreateDedicatedServer.PaymentPeriodEnum} Период оплаты.
     * @param name {String} Удобочитаемое имя выделенного сервера. Максимальная длина — 255 символов, имя должно быть уникальным.
     */
    constructor(planId, presetId, paymentPeriod, name) { 
        
        CreateDedicatedServer.initialize(this, planId, presetId, paymentPeriod, name);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, planId, presetId, paymentPeriod, name) { 
        obj['plan_id'] = planId;
        obj['preset_id'] = presetId;
        obj['payment_period'] = paymentPeriod;
        obj['name'] = name;
    }

    /**
     * Constructs a <code>CreateDedicatedServer</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/CreateDedicatedServer} obj Optional instance to populate.
     * @return {module:model/CreateDedicatedServer} The populated <code>CreateDedicatedServer</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new CreateDedicatedServer();

            if (data.hasOwnProperty('plan_id')) {
                obj['plan_id'] = ApiClient.convertToType(data['plan_id'], 'Number');
            }
            if (data.hasOwnProperty('preset_id')) {
                obj['preset_id'] = ApiClient.convertToType(data['preset_id'], 'Number');
            }
            if (data.hasOwnProperty('os_id')) {
                obj['os_id'] = ApiClient.convertToType(data['os_id'], 'Number');
            }
            if (data.hasOwnProperty('cp_id')) {
                obj['cp_id'] = ApiClient.convertToType(data['cp_id'], 'Number');
            }
            if (data.hasOwnProperty('bandwidth_id')) {
                obj['bandwidth_id'] = ApiClient.convertToType(data['bandwidth_id'], 'Number');
            }
            if (data.hasOwnProperty('network_drive_id')) {
                obj['network_drive_id'] = ApiClient.convertToType(data['network_drive_id'], 'Number');
            }
            if (data.hasOwnProperty('additional_ip_addr_id')) {
                obj['additional_ip_addr_id'] = ApiClient.convertToType(data['additional_ip_addr_id'], 'Number');
            }
            if (data.hasOwnProperty('payment_period')) {
                obj['payment_period'] = ApiClient.convertToType(data['payment_period'], 'String');
            }
            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('comment')) {
                obj['comment'] = ApiClient.convertToType(data['comment'], 'String');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>CreateDedicatedServer</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>CreateDedicatedServer</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of CreateDedicatedServer.RequiredProperties) {
            if (!data[property]) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }
        // ensure the json data is a string
        if (data['payment_period'] && !(typeof data['payment_period'] === 'string' || data['payment_period'] instanceof String)) {
            throw new Error("Expected the field `payment_period` to be a primitive type in the JSON string but got " + data['payment_period']);
        }
        // ensure the json data is a string
        if (data['name'] && !(typeof data['name'] === 'string' || data['name'] instanceof String)) {
            throw new Error("Expected the field `name` to be a primitive type in the JSON string but got " + data['name']);
        }
        // ensure the json data is a string
        if (data['comment'] && !(typeof data['comment'] === 'string' || data['comment'] instanceof String)) {
            throw new Error("Expected the field `comment` to be a primitive type in the JSON string but got " + data['comment']);
        }

        return true;
    }


}

CreateDedicatedServer.RequiredProperties = ["plan_id", "preset_id", "payment_period", "name"];

/**
 * ID списка дополнительных услуг выделенного сервера.
 * @member {Number} plan_id
 */
CreateDedicatedServer.prototype['plan_id'] = undefined;

/**
 * ID тарифа выделенного сервера.
 * @member {Number} preset_id
 */
CreateDedicatedServer.prototype['preset_id'] = undefined;

/**
 * ID операционной системы, которая будет установлена на выделенный сервер.
 * @member {Number} os_id
 */
CreateDedicatedServer.prototype['os_id'] = undefined;

/**
 * ID панели управления, которая будет установлена на выделенный сервер.
 * @member {Number} cp_id
 */
CreateDedicatedServer.prototype['cp_id'] = undefined;

/**
 * ID интернет-канала, который будет установлен на выделенный сервер.
 * @member {Number} bandwidth_id
 */
CreateDedicatedServer.prototype['bandwidth_id'] = undefined;

/**
 * ID сетевого диска, который будет установлен на выделенный сервер.
 * @member {Number} network_drive_id
 */
CreateDedicatedServer.prototype['network_drive_id'] = undefined;

/**
 * ID дополнительного IP-адреса, который будет установлен на выделенный сервер.
 * @member {Number} additional_ip_addr_id
 */
CreateDedicatedServer.prototype['additional_ip_addr_id'] = undefined;

/**
 * Период оплаты.
 * @member {module:model/CreateDedicatedServer.PaymentPeriodEnum} payment_period
 */
CreateDedicatedServer.prototype['payment_period'] = undefined;

/**
 * Удобочитаемое имя выделенного сервера. Максимальная длина — 255 символов, имя должно быть уникальным.
 * @member {String} name
 */
CreateDedicatedServer.prototype['name'] = undefined;

/**
 * Комментарий к выделенному серверу. Максимальная длина — 255 символов.
 * @member {String} comment
 */
CreateDedicatedServer.prototype['comment'] = undefined;





/**
 * Allowed values for the <code>payment_period</code> property.
 * @enum {String}
 * @readonly
 */
CreateDedicatedServer['PaymentPeriodEnum'] = {

    /**
     * value: "P1M"
     * @const
     */
    "P1M": "P1M",

    /**
     * value: "P3M"
     * @const
     */
    "P3M": "P3M",

    /**
     * value: "P6M"
     * @const
     */
    "P6M": "P6M",

    /**
     * value: "P1Y"
     * @const
     */
    "P1Y": "P1Y"
};



export default CreateDedicatedServer;

