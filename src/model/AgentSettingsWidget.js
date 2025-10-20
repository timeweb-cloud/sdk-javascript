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
 * The AgentSettingsWidget model module.
 * @module model/AgentSettingsWidget
 * @version 1.0.0
 */
class AgentSettingsWidget {
    /**
     * Constructs a new <code>AgentSettingsWidget</code>.
     * Настройки виджета
     * @alias module:model/AgentSettingsWidget
     * @param whitelistDomains {Array.<String>} Массив разрешенных доменов для виджета
     * @param name {String} Отображаемое имя агента в виджете
     * @param welcomeMessage {String} Приветственное сообщение, показываемое при открытии виджета
     * @param primaryColor {String} Основной цвет виджета (hex-код цвета в формате #RRGGBB)
     * @param font {String} Семейство шрифтов для виджета
     * @param chatPosition {module:model/AgentSettingsWidget.ChatPositionEnum} Позиция виджета чата на странице
     */
    constructor(whitelistDomains, name, welcomeMessage, primaryColor, font, chatPosition) { 
        
        AgentSettingsWidget.initialize(this, whitelistDomains, name, welcomeMessage, primaryColor, font, chatPosition);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, whitelistDomains, name, welcomeMessage, primaryColor, font, chatPosition) { 
        obj['whitelist_domains'] = whitelistDomains;
        obj['name'] = name;
        obj['welcome_message'] = welcomeMessage;
        obj['primary_color'] = primaryColor;
        obj['font'] = font;
        obj['chat_position'] = chatPosition;
    }

    /**
     * Constructs a <code>AgentSettingsWidget</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AgentSettingsWidget} obj Optional instance to populate.
     * @return {module:model/AgentSettingsWidget} The populated <code>AgentSettingsWidget</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new AgentSettingsWidget();

            if (data.hasOwnProperty('whitelist_domains')) {
                obj['whitelist_domains'] = ApiClient.convertToType(data['whitelist_domains'], ['String']);
            }
            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('signature')) {
                obj['signature'] = ApiClient.convertToType(data['signature'], 'String');
            }
            if (data.hasOwnProperty('welcome_message')) {
                obj['welcome_message'] = ApiClient.convertToType(data['welcome_message'], 'String');
            }
            if (data.hasOwnProperty('primary_color')) {
                obj['primary_color'] = ApiClient.convertToType(data['primary_color'], 'String');
            }
            if (data.hasOwnProperty('font')) {
                obj['font'] = ApiClient.convertToType(data['font'], 'String');
            }
            if (data.hasOwnProperty('icon_url')) {
                obj['icon_url'] = ApiClient.convertToType(data['icon_url'], 'String');
            }
            if (data.hasOwnProperty('chat_position')) {
                obj['chat_position'] = ApiClient.convertToType(data['chat_position'], 'String');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>AgentSettingsWidget</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>AgentSettingsWidget</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of AgentSettingsWidget.RequiredProperties) {
            if (!data[property]) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }
        // ensure the json data is an array
        if (!Array.isArray(data['whitelist_domains'])) {
            throw new Error("Expected the field `whitelist_domains` to be an array in the JSON data but got " + data['whitelist_domains']);
        }
        // ensure the json data is a string
        if (data['name'] && !(typeof data['name'] === 'string' || data['name'] instanceof String)) {
            throw new Error("Expected the field `name` to be a primitive type in the JSON string but got " + data['name']);
        }
        // ensure the json data is a string
        if (data['signature'] && !(typeof data['signature'] === 'string' || data['signature'] instanceof String)) {
            throw new Error("Expected the field `signature` to be a primitive type in the JSON string but got " + data['signature']);
        }
        // ensure the json data is a string
        if (data['welcome_message'] && !(typeof data['welcome_message'] === 'string' || data['welcome_message'] instanceof String)) {
            throw new Error("Expected the field `welcome_message` to be a primitive type in the JSON string but got " + data['welcome_message']);
        }
        // ensure the json data is a string
        if (data['primary_color'] && !(typeof data['primary_color'] === 'string' || data['primary_color'] instanceof String)) {
            throw new Error("Expected the field `primary_color` to be a primitive type in the JSON string but got " + data['primary_color']);
        }
        // ensure the json data is a string
        if (data['font'] && !(typeof data['font'] === 'string' || data['font'] instanceof String)) {
            throw new Error("Expected the field `font` to be a primitive type in the JSON string but got " + data['font']);
        }
        // ensure the json data is a string
        if (data['icon_url'] && !(typeof data['icon_url'] === 'string' || data['icon_url'] instanceof String)) {
            throw new Error("Expected the field `icon_url` to be a primitive type in the JSON string but got " + data['icon_url']);
        }
        // ensure the json data is a string
        if (data['chat_position'] && !(typeof data['chat_position'] === 'string' || data['chat_position'] instanceof String)) {
            throw new Error("Expected the field `chat_position` to be a primitive type in the JSON string but got " + data['chat_position']);
        }

        return true;
    }


}

AgentSettingsWidget.RequiredProperties = ["whitelist_domains", "name", "welcome_message", "primary_color", "font", "chat_position"];

/**
 * Массив разрешенных доменов для виджета
 * @member {Array.<String>} whitelist_domains
 */
AgentSettingsWidget.prototype['whitelist_domains'] = undefined;

/**
 * Отображаемое имя агента в виджете
 * @member {String} name
 */
AgentSettingsWidget.prototype['name'] = undefined;

/**
 * Подпись/подзаголовок, отображаемый под именем агента в виджете
 * @member {String} signature
 */
AgentSettingsWidget.prototype['signature'] = undefined;

/**
 * Приветственное сообщение, показываемое при открытии виджета
 * @member {String} welcome_message
 */
AgentSettingsWidget.prototype['welcome_message'] = undefined;

/**
 * Основной цвет виджета (hex-код цвета в формате #RRGGBB)
 * @member {String} primary_color
 */
AgentSettingsWidget.prototype['primary_color'] = undefined;

/**
 * Семейство шрифтов для виджета
 * @member {String} font
 */
AgentSettingsWidget.prototype['font'] = undefined;

/**
 * URL иконки виджета
 * @member {String} icon_url
 */
AgentSettingsWidget.prototype['icon_url'] = undefined;

/**
 * Позиция виджета чата на странице
 * @member {module:model/AgentSettingsWidget.ChatPositionEnum} chat_position
 */
AgentSettingsWidget.prototype['chat_position'] = undefined;





/**
 * Allowed values for the <code>chat_position</code> property.
 * @enum {String}
 * @readonly
 */
AgentSettingsWidget['ChatPositionEnum'] = {

    /**
     * value: "bottom_right"
     * @const
     */
    "bottom_right": "bottom_right",

    /**
     * value: "bottom_left"
     * @const
     */
    "bottom_left": "bottom_left",

    /**
     * value: "top_right"
     * @const
     */
    "top_right": "top_right",

    /**
     * value: "top_left"
     * @const
     */
    "top_left": "top_left"
};



export default AgentSettingsWidget;

