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
import AiGatewayBatchRequestCounts from './AiGatewayBatchRequestCounts';

/**
 * The AiGatewayBatch model module.
 * @module model/AiGatewayBatch
 * @version 1.0.0
 */
class AiGatewayBatch {
    /**
     * Constructs a new <code>AiGatewayBatch</code>.
     * Батч
     * @alias module:model/AiGatewayBatch
     * @extends Object
     */
    constructor() { 
        
        AiGatewayBatch.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>AiGatewayBatch</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AiGatewayBatch} obj Optional instance to populate.
     * @return {module:model/AiGatewayBatch} The populated <code>AiGatewayBatch</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new AiGatewayBatch();

            ApiClient.constructFromObject(data, obj, 'Object');
            

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'String');
            }
            if (data.hasOwnProperty('object')) {
                obj['object'] = ApiClient.convertToType(data['object'], 'String');
            }
            if (data.hasOwnProperty('endpoint')) {
                obj['endpoint'] = ApiClient.convertToType(data['endpoint'], 'String');
            }
            if (data.hasOwnProperty('model')) {
                obj['model'] = ApiClient.convertToType(data['model'], 'String');
            }
            if (data.hasOwnProperty('input_file_id')) {
                obj['input_file_id'] = ApiClient.convertToType(data['input_file_id'], 'String');
            }
            if (data.hasOwnProperty('output_file_id')) {
                obj['output_file_id'] = ApiClient.convertToType(data['output_file_id'], 'String');
            }
            if (data.hasOwnProperty('error_file_id')) {
                obj['error_file_id'] = ApiClient.convertToType(data['error_file_id'], 'String');
            }
            if (data.hasOwnProperty('completion_window')) {
                obj['completion_window'] = ApiClient.convertToType(data['completion_window'], 'String');
            }
            if (data.hasOwnProperty('status')) {
                obj['status'] = ApiClient.convertToType(data['status'], 'String');
            }
            if (data.hasOwnProperty('created_at')) {
                obj['created_at'] = ApiClient.convertToType(data['created_at'], 'Number');
            }
            if (data.hasOwnProperty('completed_at')) {
                obj['completed_at'] = ApiClient.convertToType(data['completed_at'], 'Number');
            }
            if (data.hasOwnProperty('expires_at')) {
                obj['expires_at'] = ApiClient.convertToType(data['expires_at'], 'Number');
            }
            if (data.hasOwnProperty('request_counts')) {
                obj['request_counts'] = AiGatewayBatchRequestCounts.constructFromObject(data['request_counts']);
            }
            if (data.hasOwnProperty('metadata')) {
                obj['metadata'] = ApiClient.convertToType(data['metadata'], {'String': Object});
            }
            if (data.hasOwnProperty('usage')) {
                obj['usage'] = ApiClient.convertToType(data['usage'], {'String': Object});
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>AiGatewayBatch</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>AiGatewayBatch</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['id'] && !(typeof data['id'] === 'string' || data['id'] instanceof String)) {
            throw new Error("Expected the field `id` to be a primitive type in the JSON string but got " + data['id']);
        }
        // ensure the json data is a string
        if (data['object'] && !(typeof data['object'] === 'string' || data['object'] instanceof String)) {
            throw new Error("Expected the field `object` to be a primitive type in the JSON string but got " + data['object']);
        }
        // ensure the json data is a string
        if (data['endpoint'] && !(typeof data['endpoint'] === 'string' || data['endpoint'] instanceof String)) {
            throw new Error("Expected the field `endpoint` to be a primitive type in the JSON string but got " + data['endpoint']);
        }
        // ensure the json data is a string
        if (data['model'] && !(typeof data['model'] === 'string' || data['model'] instanceof String)) {
            throw new Error("Expected the field `model` to be a primitive type in the JSON string but got " + data['model']);
        }
        // ensure the json data is a string
        if (data['input_file_id'] && !(typeof data['input_file_id'] === 'string' || data['input_file_id'] instanceof String)) {
            throw new Error("Expected the field `input_file_id` to be a primitive type in the JSON string but got " + data['input_file_id']);
        }
        // ensure the json data is a string
        if (data['output_file_id'] && !(typeof data['output_file_id'] === 'string' || data['output_file_id'] instanceof String)) {
            throw new Error("Expected the field `output_file_id` to be a primitive type in the JSON string but got " + data['output_file_id']);
        }
        // ensure the json data is a string
        if (data['error_file_id'] && !(typeof data['error_file_id'] === 'string' || data['error_file_id'] instanceof String)) {
            throw new Error("Expected the field `error_file_id` to be a primitive type in the JSON string but got " + data['error_file_id']);
        }
        // ensure the json data is a string
        if (data['completion_window'] && !(typeof data['completion_window'] === 'string' || data['completion_window'] instanceof String)) {
            throw new Error("Expected the field `completion_window` to be a primitive type in the JSON string but got " + data['completion_window']);
        }
        // ensure the json data is a string
        if (data['status'] && !(typeof data['status'] === 'string' || data['status'] instanceof String)) {
            throw new Error("Expected the field `status` to be a primitive type in the JSON string but got " + data['status']);
        }
        // validate the optional field `request_counts`
        if (data['request_counts']) { // data not null
          AiGatewayBatchRequestCounts.validateJSON(data['request_counts']);
        }

        return true;
    }


}



/**
 * ID батча
 * @member {String} id
 */
AiGatewayBatch.prototype['id'] = undefined;

/**
 * Тип объекта
 * @member {module:model/AiGatewayBatch.ObjectEnum} object
 */
AiGatewayBatch.prototype['object'] = undefined;

/**
 * Эндпоинт запросов батча
 * @member {String} endpoint
 */
AiGatewayBatch.prototype['endpoint'] = undefined;

/**
 * Модель батча. На этапе `validating` может быть `null`
 * @member {String} model
 */
AiGatewayBatch.prototype['model'] = undefined;

/**
 * ID входного файла
 * @member {String} input_file_id
 */
AiGatewayBatch.prototype['input_file_id'] = undefined;

/**
 * ID файла результатов — когда батч выполнен
 * @member {String} output_file_id
 */
AiGatewayBatch.prototype['output_file_id'] = undefined;

/**
 * ID файла с ошибками отдельных запросов, если они были
 * @member {String} error_file_id
 */
AiGatewayBatch.prototype['error_file_id'] = undefined;

/**
 * Срок выполнения
 * @member {String} completion_window
 */
AiGatewayBatch.prototype['completion_window'] = undefined;

/**
 * Статус батча. `cancelling` — отмена выполняется, может занять несколько минут
 * @member {module:model/AiGatewayBatch.StatusEnum} status
 */
AiGatewayBatch.prototype['status'] = undefined;

/**
 * Время создания, Unix-время в секундах
 * @member {Number} created_at
 */
AiGatewayBatch.prototype['created_at'] = undefined;

/**
 * Время завершения, Unix-время в секундах
 * @member {Number} completed_at
 */
AiGatewayBatch.prototype['completed_at'] = undefined;

/**
 * Крайний срок выполнения, Unix-время в секундах
 * @member {Number} expires_at
 */
AiGatewayBatch.prototype['expires_at'] = undefined;

/**
 * @member {module:model/AiGatewayBatchRequestCounts} request_counts
 */
AiGatewayBatch.prototype['request_counts'] = undefined;

/**
 * Метки батча из запроса
 * @member {Object.<String, Object>} metadata
 */
AiGatewayBatch.prototype['metadata'] = undefined;

/**
 * Расход токенов батча
 * @member {Object.<String, Object>} usage
 */
AiGatewayBatch.prototype['usage'] = undefined;





/**
 * Allowed values for the <code>object</code> property.
 * @enum {String}
 * @readonly
 */
AiGatewayBatch['ObjectEnum'] = {

    /**
     * value: "batch"
     * @const
     */
    "batch": "batch"
};


/**
 * Allowed values for the <code>status</code> property.
 * @enum {String}
 * @readonly
 */
AiGatewayBatch['StatusEnum'] = {

    /**
     * value: "validating"
     * @const
     */
    "validating": "validating",

    /**
     * value: "failed"
     * @const
     */
    "failed": "failed",

    /**
     * value: "in_progress"
     * @const
     */
    "in_progress": "in_progress",

    /**
     * value: "finalizing"
     * @const
     */
    "finalizing": "finalizing",

    /**
     * value: "completed"
     * @const
     */
    "completed": "completed",

    /**
     * value: "expired"
     * @const
     */
    "expired": "expired",

    /**
     * value: "cancelling"
     * @const
     */
    "cancelling": "cancelling",

    /**
     * value: "cancelled"
     * @const
     */
    "cancelled": "cancelled"
};



export default AiGatewayBatch;

