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
import AiGatewayChatCompletionRequestStreamOptions from './AiGatewayChatCompletionRequestStreamOptions';
import AiGatewayChatMessage from './AiGatewayChatMessage';

/**
 * The AiGatewayChatCompletionRequest model module.
 * @module model/AiGatewayChatCompletionRequest
 * @version 1.0.0
 */
class AiGatewayChatCompletionRequest {
    /**
     * Constructs a new <code>AiGatewayChatCompletionRequest</code>.
     * Запрос Chat Completions в формате OpenAI. Перечислены основные поля, остальные параметры OpenAI передаются модели как есть. Параметры, которые модель не поддерживает, могут быть отклонены с ошибкой 400
     * @alias module:model/AiGatewayChatCompletionRequest
     * @extends Object
     * @param model {String} ID модели из `GET /v1/models`
     * @param messages {Array.<module:model/AiGatewayChatMessage>} История диалога целиком
     */
    constructor(model, messages) { 
        
        AiGatewayChatCompletionRequest.initialize(this, model, messages);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, model, messages) { 
        obj['model'] = model;
        obj['messages'] = messages;
    }

    /**
     * Constructs a <code>AiGatewayChatCompletionRequest</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AiGatewayChatCompletionRequest} obj Optional instance to populate.
     * @return {module:model/AiGatewayChatCompletionRequest} The populated <code>AiGatewayChatCompletionRequest</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new AiGatewayChatCompletionRequest();

            ApiClient.constructFromObject(data, obj, 'Object');
            

            if (data.hasOwnProperty('model')) {
                obj['model'] = ApiClient.convertToType(data['model'], 'String');
            }
            if (data.hasOwnProperty('messages')) {
                obj['messages'] = ApiClient.convertToType(data['messages'], [AiGatewayChatMessage]);
            }
            if (data.hasOwnProperty('stream')) {
                obj['stream'] = ApiClient.convertToType(data['stream'], 'Boolean');
            }
            if (data.hasOwnProperty('stream_options')) {
                obj['stream_options'] = AiGatewayChatCompletionRequestStreamOptions.constructFromObject(data['stream_options']);
            }
            if (data.hasOwnProperty('max_completion_tokens')) {
                obj['max_completion_tokens'] = ApiClient.convertToType(data['max_completion_tokens'], 'Number');
            }
            if (data.hasOwnProperty('max_tokens')) {
                obj['max_tokens'] = ApiClient.convertToType(data['max_tokens'], 'Number');
            }
            if (data.hasOwnProperty('temperature')) {
                obj['temperature'] = ApiClient.convertToType(data['temperature'], 'Number');
            }
            if (data.hasOwnProperty('top_p')) {
                obj['top_p'] = ApiClient.convertToType(data['top_p'], 'Number');
            }
            if (data.hasOwnProperty('n')) {
                obj['n'] = ApiClient.convertToType(data['n'], 'Number');
            }
            if (data.hasOwnProperty('stop')) {
                obj['stop'] = ApiClient.convertToType(data['stop'], 'String');
            }
            if (data.hasOwnProperty('tools')) {
                obj['tools'] = ApiClient.convertToType(data['tools'], [{'String': Object}]);
            }
            if (data.hasOwnProperty('tool_choice')) {
                obj['tool_choice'] = ApiClient.convertToType(data['tool_choice'], 'String');
            }
            if (data.hasOwnProperty('response_format')) {
                obj['response_format'] = ApiClient.convertToType(data['response_format'], {'String': Object});
            }
            if (data.hasOwnProperty('reasoning_effort')) {
                obj['reasoning_effort'] = ApiClient.convertToType(data['reasoning_effort'], 'String');
            }
            if (data.hasOwnProperty('user')) {
                obj['user'] = ApiClient.convertToType(data['user'], 'String');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>AiGatewayChatCompletionRequest</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>AiGatewayChatCompletionRequest</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of AiGatewayChatCompletionRequest.RequiredProperties) {
            if (!data[property]) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }
        // ensure the json data is a string
        if (data['model'] && !(typeof data['model'] === 'string' || data['model'] instanceof String)) {
            throw new Error("Expected the field `model` to be a primitive type in the JSON string but got " + data['model']);
        }
        // ensure the json data is an array
        if (!Array.isArray(data['messages'])) {
            throw new Error("Expected the field `messages` to be an array in the JSON data but got " + data['messages']);
        }
        // validate the optional field `stream_options`
        if (data['stream_options']) { // data not null
          AiGatewayChatCompletionRequestStreamOptions.validateJSON(data['stream_options']);
        }
        // ensure the json data is a string
        if (data['stop'] && !(typeof data['stop'] === 'string' || data['stop'] instanceof String)) {
            throw new Error("Expected the field `stop` to be a primitive type in the JSON string but got " + data['stop']);
        }
        // ensure the json data is an array
        if (!Array.isArray(data['tools'])) {
            throw new Error("Expected the field `tools` to be an array in the JSON data but got " + data['tools']);
        }
        // ensure the json data is a string
        if (data['tool_choice'] && !(typeof data['tool_choice'] === 'string' || data['tool_choice'] instanceof String)) {
            throw new Error("Expected the field `tool_choice` to be a primitive type in the JSON string but got " + data['tool_choice']);
        }
        // ensure the json data is a string
        if (data['reasoning_effort'] && !(typeof data['reasoning_effort'] === 'string' || data['reasoning_effort'] instanceof String)) {
            throw new Error("Expected the field `reasoning_effort` to be a primitive type in the JSON string but got " + data['reasoning_effort']);
        }
        // ensure the json data is a string
        if (data['user'] && !(typeof data['user'] === 'string' || data['user'] instanceof String)) {
            throw new Error("Expected the field `user` to be a primitive type in the JSON string but got " + data['user']);
        }

        return true;
    }


}

AiGatewayChatCompletionRequest.RequiredProperties = ["model", "messages"];

/**
 * ID модели из `GET /v1/models`
 * @member {String} model
 */
AiGatewayChatCompletionRequest.prototype['model'] = undefined;

/**
 * История диалога целиком
 * @member {Array.<module:model/AiGatewayChatMessage>} messages
 */
AiGatewayChatCompletionRequest.prototype['messages'] = undefined;

/**
 * Отправлять ответ потоком Server-Sent Events (`text/event-stream`)
 * @member {Boolean} stream
 * @default false
 */
AiGatewayChatCompletionRequest.prototype['stream'] = false;

/**
 * @member {module:model/AiGatewayChatCompletionRequestStreamOptions} stream_options
 */
AiGatewayChatCompletionRequest.prototype['stream_options'] = undefined;

/**
 * Максимум выходных токенов, включая рассуждения
 * @member {Number} max_completion_tokens
 */
AiGatewayChatCompletionRequest.prototype['max_completion_tokens'] = undefined;

/**
 * Устаревший синоним `max_completion_tokens`
 * @member {Number} max_tokens
 */
AiGatewayChatCompletionRequest.prototype['max_tokens'] = undefined;

/**
 * Температура выборки
 * @member {Number} temperature
 */
AiGatewayChatCompletionRequest.prototype['temperature'] = undefined;

/**
 * Порог nucleus sampling
 * @member {Number} top_p
 */
AiGatewayChatCompletionRequest.prototype['top_p'] = undefined;

/**
 * Количество вариантов ответа
 * @member {Number} n
 * @default 1
 */
AiGatewayChatCompletionRequest.prototype['n'] = 1;

/**
 * Строка или список строк, на которых генерация останавливается
 * @member {String} stop
 */
AiGatewayChatCompletionRequest.prototype['stop'] = undefined;

/**
 * Функции, которые может вызвать модель
 * @member {Array.<Object.<String, Object>>} tools
 */
AiGatewayChatCompletionRequest.prototype['tools'] = undefined;

/**
 * Режим вызова функций: `none`, `auto`, `required` или объект с конкретной функцией
 * @member {module:model/AiGatewayChatCompletionRequest.ToolChoiceEnum} tool_choice
 */
AiGatewayChatCompletionRequest.prototype['tool_choice'] = undefined;

/**
 * Формат ответа: `{\"type\": \"json_object\"}` или `{\"type\": \"json_schema\", \"json_schema\": {...}}`
 * @member {Object.<String, Object>} response_format
 */
AiGatewayChatCompletionRequest.prototype['response_format'] = undefined;

/**
 * Уровень рассуждений для моделей с рассуждениями, например `low`, `high`
 * @member {String} reasoning_effort
 */
AiGatewayChatCompletionRequest.prototype['reasoning_effort'] = undefined;

/**
 * Идентификатор вашего конечного пользователя
 * @member {String} user
 */
AiGatewayChatCompletionRequest.prototype['user'] = undefined;





/**
 * Allowed values for the <code>tool_choice</code> property.
 * @enum {String}
 * @readonly
 */
AiGatewayChatCompletionRequest['ToolChoiceEnum'] = {

    /**
     * value: "none"
     * @const
     */
    "none": "none",

    /**
     * value: "auto"
     * @const
     */
    "auto": "auto",

    /**
     * value: "required"
     * @const
     */
    "required": "required"
};



export default AiGatewayChatCompletionRequest;

