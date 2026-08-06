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
 * The KafkaConfigParameters model module.
 * @module model/KafkaConfigParameters
 * @version 1.0.0
 */
class KafkaConfigParameters {
    /**
     * Constructs a new <code>KafkaConfigParameters</code>.
     * Настройки топика Kafka. Все значения возвращаются в виде строк. Не заданные явно параметры возвращаются со значениями по умолчанию.
     * @alias module:model/KafkaConfigParameters
     */
    constructor() { 
        
        KafkaConfigParameters.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>KafkaConfigParameters</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/KafkaConfigParameters} obj Optional instance to populate.
     * @return {module:model/KafkaConfigParameters} The populated <code>KafkaConfigParameters</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new KafkaConfigParameters();

            if (data.hasOwnProperty('partitions')) {
                obj['partitions'] = ApiClient.convertToType(data['partitions'], 'String');
            }
            if (data.hasOwnProperty('cleanup_policy')) {
                obj['cleanup_policy'] = ApiClient.convertToType(data['cleanup_policy'], 'String');
            }
            if (data.hasOwnProperty('compression_type')) {
                obj['compression_type'] = ApiClient.convertToType(data['compression_type'], 'String');
            }
            if (data.hasOwnProperty('delete_retention_ms')) {
                obj['delete_retention_ms'] = ApiClient.convertToType(data['delete_retention_ms'], 'String');
            }
            if (data.hasOwnProperty('file_delete_delay_ms')) {
                obj['file_delete_delay_ms'] = ApiClient.convertToType(data['file_delete_delay_ms'], 'String');
            }
            if (data.hasOwnProperty('flush_messages')) {
                obj['flush_messages'] = ApiClient.convertToType(data['flush_messages'], 'String');
            }
            if (data.hasOwnProperty('flush_ms')) {
                obj['flush_ms'] = ApiClient.convertToType(data['flush_ms'], 'String');
            }
            if (data.hasOwnProperty('index_interval_bytes')) {
                obj['index_interval_bytes'] = ApiClient.convertToType(data['index_interval_bytes'], 'String');
            }
            if (data.hasOwnProperty('min_compaction_lag_ms')) {
                obj['min_compaction_lag_ms'] = ApiClient.convertToType(data['min_compaction_lag_ms'], 'String');
            }
            if (data.hasOwnProperty('max_compaction_lag_ms')) {
                obj['max_compaction_lag_ms'] = ApiClient.convertToType(data['max_compaction_lag_ms'], 'String');
            }
            if (data.hasOwnProperty('max_message_bytes')) {
                obj['max_message_bytes'] = ApiClient.convertToType(data['max_message_bytes'], 'String');
            }
            if (data.hasOwnProperty('message_format_version')) {
                obj['message_format_version'] = ApiClient.convertToType(data['message_format_version'], 'String');
            }
            if (data.hasOwnProperty('message_timestamp_difference_max_ms')) {
                obj['message_timestamp_difference_max_ms'] = ApiClient.convertToType(data['message_timestamp_difference_max_ms'], 'String');
            }
            if (data.hasOwnProperty('message_downconversion_enable')) {
                obj['message_downconversion_enable'] = ApiClient.convertToType(data['message_downconversion_enable'], 'String');
            }
            if (data.hasOwnProperty('message_timestamp_type')) {
                obj['message_timestamp_type'] = ApiClient.convertToType(data['message_timestamp_type'], 'String');
            }
            if (data.hasOwnProperty('min_cleanable_dirty_ratio')) {
                obj['min_cleanable_dirty_ratio'] = ApiClient.convertToType(data['min_cleanable_dirty_ratio'], 'String');
            }
            if (data.hasOwnProperty('min_insync_replicas')) {
                obj['min_insync_replicas'] = ApiClient.convertToType(data['min_insync_replicas'], 'String');
            }
            if (data.hasOwnProperty('preallocate')) {
                obj['preallocate'] = ApiClient.convertToType(data['preallocate'], 'String');
            }
            if (data.hasOwnProperty('retention_bytes')) {
                obj['retention_bytes'] = ApiClient.convertToType(data['retention_bytes'], 'String');
            }
            if (data.hasOwnProperty('retention_ms')) {
                obj['retention_ms'] = ApiClient.convertToType(data['retention_ms'], 'String');
            }
            if (data.hasOwnProperty('segment_bytes')) {
                obj['segment_bytes'] = ApiClient.convertToType(data['segment_bytes'], 'String');
            }
            if (data.hasOwnProperty('segment_index_bytes')) {
                obj['segment_index_bytes'] = ApiClient.convertToType(data['segment_index_bytes'], 'String');
            }
            if (data.hasOwnProperty('segment_jitter_ms')) {
                obj['segment_jitter_ms'] = ApiClient.convertToType(data['segment_jitter_ms'], 'String');
            }
            if (data.hasOwnProperty('segment_ms')) {
                obj['segment_ms'] = ApiClient.convertToType(data['segment_ms'], 'String');
            }
            if (data.hasOwnProperty('unclean_leader_election_enable')) {
                obj['unclean_leader_election_enable'] = ApiClient.convertToType(data['unclean_leader_election_enable'], 'String');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>KafkaConfigParameters</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>KafkaConfigParameters</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['partitions'] && !(typeof data['partitions'] === 'string' || data['partitions'] instanceof String)) {
            throw new Error("Expected the field `partitions` to be a primitive type in the JSON string but got " + data['partitions']);
        }
        // ensure the json data is a string
        if (data['cleanup_policy'] && !(typeof data['cleanup_policy'] === 'string' || data['cleanup_policy'] instanceof String)) {
            throw new Error("Expected the field `cleanup_policy` to be a primitive type in the JSON string but got " + data['cleanup_policy']);
        }
        // ensure the json data is a string
        if (data['compression_type'] && !(typeof data['compression_type'] === 'string' || data['compression_type'] instanceof String)) {
            throw new Error("Expected the field `compression_type` to be a primitive type in the JSON string but got " + data['compression_type']);
        }
        // ensure the json data is a string
        if (data['delete_retention_ms'] && !(typeof data['delete_retention_ms'] === 'string' || data['delete_retention_ms'] instanceof String)) {
            throw new Error("Expected the field `delete_retention_ms` to be a primitive type in the JSON string but got " + data['delete_retention_ms']);
        }
        // ensure the json data is a string
        if (data['file_delete_delay_ms'] && !(typeof data['file_delete_delay_ms'] === 'string' || data['file_delete_delay_ms'] instanceof String)) {
            throw new Error("Expected the field `file_delete_delay_ms` to be a primitive type in the JSON string but got " + data['file_delete_delay_ms']);
        }
        // ensure the json data is a string
        if (data['flush_messages'] && !(typeof data['flush_messages'] === 'string' || data['flush_messages'] instanceof String)) {
            throw new Error("Expected the field `flush_messages` to be a primitive type in the JSON string but got " + data['flush_messages']);
        }
        // ensure the json data is a string
        if (data['flush_ms'] && !(typeof data['flush_ms'] === 'string' || data['flush_ms'] instanceof String)) {
            throw new Error("Expected the field `flush_ms` to be a primitive type in the JSON string but got " + data['flush_ms']);
        }
        // ensure the json data is a string
        if (data['index_interval_bytes'] && !(typeof data['index_interval_bytes'] === 'string' || data['index_interval_bytes'] instanceof String)) {
            throw new Error("Expected the field `index_interval_bytes` to be a primitive type in the JSON string but got " + data['index_interval_bytes']);
        }
        // ensure the json data is a string
        if (data['min_compaction_lag_ms'] && !(typeof data['min_compaction_lag_ms'] === 'string' || data['min_compaction_lag_ms'] instanceof String)) {
            throw new Error("Expected the field `min_compaction_lag_ms` to be a primitive type in the JSON string but got " + data['min_compaction_lag_ms']);
        }
        // ensure the json data is a string
        if (data['max_compaction_lag_ms'] && !(typeof data['max_compaction_lag_ms'] === 'string' || data['max_compaction_lag_ms'] instanceof String)) {
            throw new Error("Expected the field `max_compaction_lag_ms` to be a primitive type in the JSON string but got " + data['max_compaction_lag_ms']);
        }
        // ensure the json data is a string
        if (data['max_message_bytes'] && !(typeof data['max_message_bytes'] === 'string' || data['max_message_bytes'] instanceof String)) {
            throw new Error("Expected the field `max_message_bytes` to be a primitive type in the JSON string but got " + data['max_message_bytes']);
        }
        // ensure the json data is a string
        if (data['message_format_version'] && !(typeof data['message_format_version'] === 'string' || data['message_format_version'] instanceof String)) {
            throw new Error("Expected the field `message_format_version` to be a primitive type in the JSON string but got " + data['message_format_version']);
        }
        // ensure the json data is a string
        if (data['message_timestamp_difference_max_ms'] && !(typeof data['message_timestamp_difference_max_ms'] === 'string' || data['message_timestamp_difference_max_ms'] instanceof String)) {
            throw new Error("Expected the field `message_timestamp_difference_max_ms` to be a primitive type in the JSON string but got " + data['message_timestamp_difference_max_ms']);
        }
        // ensure the json data is a string
        if (data['message_downconversion_enable'] && !(typeof data['message_downconversion_enable'] === 'string' || data['message_downconversion_enable'] instanceof String)) {
            throw new Error("Expected the field `message_downconversion_enable` to be a primitive type in the JSON string but got " + data['message_downconversion_enable']);
        }
        // ensure the json data is a string
        if (data['message_timestamp_type'] && !(typeof data['message_timestamp_type'] === 'string' || data['message_timestamp_type'] instanceof String)) {
            throw new Error("Expected the field `message_timestamp_type` to be a primitive type in the JSON string but got " + data['message_timestamp_type']);
        }
        // ensure the json data is a string
        if (data['min_cleanable_dirty_ratio'] && !(typeof data['min_cleanable_dirty_ratio'] === 'string' || data['min_cleanable_dirty_ratio'] instanceof String)) {
            throw new Error("Expected the field `min_cleanable_dirty_ratio` to be a primitive type in the JSON string but got " + data['min_cleanable_dirty_ratio']);
        }
        // ensure the json data is a string
        if (data['min_insync_replicas'] && !(typeof data['min_insync_replicas'] === 'string' || data['min_insync_replicas'] instanceof String)) {
            throw new Error("Expected the field `min_insync_replicas` to be a primitive type in the JSON string but got " + data['min_insync_replicas']);
        }
        // ensure the json data is a string
        if (data['preallocate'] && !(typeof data['preallocate'] === 'string' || data['preallocate'] instanceof String)) {
            throw new Error("Expected the field `preallocate` to be a primitive type in the JSON string but got " + data['preallocate']);
        }
        // ensure the json data is a string
        if (data['retention_bytes'] && !(typeof data['retention_bytes'] === 'string' || data['retention_bytes'] instanceof String)) {
            throw new Error("Expected the field `retention_bytes` to be a primitive type in the JSON string but got " + data['retention_bytes']);
        }
        // ensure the json data is a string
        if (data['retention_ms'] && !(typeof data['retention_ms'] === 'string' || data['retention_ms'] instanceof String)) {
            throw new Error("Expected the field `retention_ms` to be a primitive type in the JSON string but got " + data['retention_ms']);
        }
        // ensure the json data is a string
        if (data['segment_bytes'] && !(typeof data['segment_bytes'] === 'string' || data['segment_bytes'] instanceof String)) {
            throw new Error("Expected the field `segment_bytes` to be a primitive type in the JSON string but got " + data['segment_bytes']);
        }
        // ensure the json data is a string
        if (data['segment_index_bytes'] && !(typeof data['segment_index_bytes'] === 'string' || data['segment_index_bytes'] instanceof String)) {
            throw new Error("Expected the field `segment_index_bytes` to be a primitive type in the JSON string but got " + data['segment_index_bytes']);
        }
        // ensure the json data is a string
        if (data['segment_jitter_ms'] && !(typeof data['segment_jitter_ms'] === 'string' || data['segment_jitter_ms'] instanceof String)) {
            throw new Error("Expected the field `segment_jitter_ms` to be a primitive type in the JSON string but got " + data['segment_jitter_ms']);
        }
        // ensure the json data is a string
        if (data['segment_ms'] && !(typeof data['segment_ms'] === 'string' || data['segment_ms'] instanceof String)) {
            throw new Error("Expected the field `segment_ms` to be a primitive type in the JSON string but got " + data['segment_ms']);
        }
        // ensure the json data is a string
        if (data['unclean_leader_election_enable'] && !(typeof data['unclean_leader_election_enable'] === 'string' || data['unclean_leader_election_enable'] instanceof String)) {
            throw new Error("Expected the field `unclean_leader_election_enable` to be a primitive type in the JSON string but got " + data['unclean_leader_election_enable']);
        }

        return true;
    }


}



/**
 * Количество партиций топика.
 * @member {String} partitions
 */
KafkaConfigParameters.prototype['partitions'] = undefined;

/**
 * Политика очистки старых сегментов лога: `delete` — удалять, `compact` — уплотнять.
 * @member {module:model/KafkaConfigParameters.CleanupPolicyEnum} cleanup_policy
 */
KafkaConfigParameters.prototype['cleanup_policy'] = undefined;

/**
 * Тип сжатия сообщений в топике.
 * @member {module:model/KafkaConfigParameters.CompressionTypeEnum} compression_type
 */
KafkaConfigParameters.prototype['compression_type'] = undefined;

/**
 * Время (в мс) хранения меток удаления для уплотняемых топиков.
 * @member {String} delete_retention_ms
 */
KafkaConfigParameters.prototype['delete_retention_ms'] = undefined;

/**
 * Задержка (в мс) перед удалением файла из файловой системы.
 * @member {String} file_delete_delay_ms
 */
KafkaConfigParameters.prototype['file_delete_delay_ms'] = undefined;

/**
 * Количество сообщений, после которого данные принудительно сбрасываются на диск.
 * @member {String} flush_messages
 */
KafkaConfigParameters.prototype['flush_messages'] = undefined;

/**
 * Интервал (в мс), после которого данные принудительно сбрасываются на диск.
 * @member {String} flush_ms
 */
KafkaConfigParameters.prototype['flush_ms'] = undefined;

/**
 * Интервал (в байтах), с которым Kafka добавляет запись в индекс смещений.
 * @member {String} index_interval_bytes
 */
KafkaConfigParameters.prototype['index_interval_bytes'] = undefined;

/**
 * Минимальное время (в мс), в течение которого сообщение остается неуплотненным.
 * @member {String} min_compaction_lag_ms
 */
KafkaConfigParameters.prototype['min_compaction_lag_ms'] = undefined;

/**
 * Максимальное время (в мс), в течение которого сообщение может оставаться неуплотненным.
 * @member {String} max_compaction_lag_ms
 */
KafkaConfigParameters.prototype['max_compaction_lag_ms'] = undefined;

/**
 * Максимальный размер (в байтах) пакета сообщений.
 * @member {String} max_message_bytes
 */
KafkaConfigParameters.prototype['max_message_bytes'] = undefined;

/**
 * Версия формата сообщений, в котором Kafka добавляет сообщения в лог.
 * @member {String} message_format_version
 */
KafkaConfigParameters.prototype['message_format_version'] = undefined;

/**
 * Максимально допустимая разница (в мс) между временной меткой сообщения и временем его получения брокером.
 * @member {String} message_timestamp_difference_max_ms
 */
KafkaConfigParameters.prototype['message_timestamp_difference_max_ms'] = undefined;

/**
 * Понижение версии формата сообщений для старых клиентов.
 * @member {module:model/KafkaConfigParameters.MessageDownconversionEnableEnum} message_downconversion_enable
 */
KafkaConfigParameters.prototype['message_downconversion_enable'] = undefined;

/**
 * Источник временной метки сообщения: `CreateTime` — время создания сообщения клиентом, `LogAppendTime` — время добавления сообщения в лог брокером.
 * @member {module:model/KafkaConfigParameters.MessageTimestampTypeEnum} message_timestamp_type
 */
KafkaConfigParameters.prototype['message_timestamp_type'] = undefined;

/**
 * Доля неуплотненных данных в логе, при которой запускается уплотнение.
 * @member {String} min_cleanable_dirty_ratio
 */
KafkaConfigParameters.prototype['min_cleanable_dirty_ratio'] = undefined;

/**
 * Минимальное количество синхронизированных реплик, необходимое для подтверждения записи.
 * @member {String} min_insync_replicas
 */
KafkaConfigParameters.prototype['min_insync_replicas'] = undefined;

/**
 * Предварительное выделение места на диске при создании нового сегмента лога.
 * @member {module:model/KafkaConfigParameters.PreallocateEnum} preallocate
 */
KafkaConfigParameters.prototype['preallocate'] = undefined;

/**
 * Максимальный размер (в байтах) партиции топика, после которого старые сегменты удаляются. `-1` — без ограничения.
 * @member {String} retention_bytes
 */
KafkaConfigParameters.prototype['retention_bytes'] = undefined;

/**
 * Время (в мс) хранения сообщений в топике. `-1` — хранить бессрочно.
 * @member {String} retention_ms
 */
KafkaConfigParameters.prototype['retention_ms'] = undefined;

/**
 * Максимальный размер (в байтах) одного сегмента лога.
 * @member {String} segment_bytes
 */
KafkaConfigParameters.prototype['segment_bytes'] = undefined;

/**
 * Максимальный размер (в байтах) индексного файла сегмента лога.
 * @member {String} segment_index_bytes
 */
KafkaConfigParameters.prototype['segment_index_bytes'] = undefined;

/**
 * Максимальное случайное отклонение (в мс) от времени ротации сегмента.
 * @member {String} segment_jitter_ms
 */
KafkaConfigParameters.prototype['segment_jitter_ms'] = undefined;

/**
 * Период (в мс), после которого Kafka создает новый сегмент лога.
 * @member {String} segment_ms
 */
KafkaConfigParameters.prototype['segment_ms'] = undefined;

/**
 * Возможность выбрать лидером партиции реплику, которая не входит в число синхронизированных.
 * @member {module:model/KafkaConfigParameters.UncleanLeaderElectionEnableEnum} unclean_leader_election_enable
 */
KafkaConfigParameters.prototype['unclean_leader_election_enable'] = undefined;





/**
 * Allowed values for the <code>cleanup_policy</code> property.
 * @enum {String}
 * @readonly
 */
KafkaConfigParameters['CleanupPolicyEnum'] = {

    /**
     * value: "delete"
     * @const
     */
    "delete": "delete",

    /**
     * value: "compact"
     * @const
     */
    "compact": "compact"
};


/**
 * Allowed values for the <code>compression_type</code> property.
 * @enum {String}
 * @readonly
 */
KafkaConfigParameters['CompressionTypeEnum'] = {

    /**
     * value: "uncompressed"
     * @const
     */
    "uncompressed": "uncompressed",

    /**
     * value: "zstd"
     * @const
     */
    "zstd": "zstd",

    /**
     * value: "lz4"
     * @const
     */
    "lz4": "lz4",

    /**
     * value: "snappy"
     * @const
     */
    "snappy": "snappy",

    /**
     * value: "gzip"
     * @const
     */
    "gzip": "gzip",

    /**
     * value: "producer"
     * @const
     */
    "producer": "producer"
};


/**
 * Allowed values for the <code>message_downconversion_enable</code> property.
 * @enum {String}
 * @readonly
 */
KafkaConfigParameters['MessageDownconversionEnableEnum'] = {

    /**
     * value: "ON"
     * @const
     */
    "ON": "ON",

    /**
     * value: "OFF"
     * @const
     */
    "OFF": "OFF"
};


/**
 * Allowed values for the <code>message_timestamp_type</code> property.
 * @enum {String}
 * @readonly
 */
KafkaConfigParameters['MessageTimestampTypeEnum'] = {

    /**
     * value: "CreateTime"
     * @const
     */
    "CreateTime": "CreateTime",

    /**
     * value: "LogAppendTime"
     * @const
     */
    "LogAppendTime": "LogAppendTime"
};


/**
 * Allowed values for the <code>preallocate</code> property.
 * @enum {String}
 * @readonly
 */
KafkaConfigParameters['PreallocateEnum'] = {

    /**
     * value: "ON"
     * @const
     */
    "ON": "ON",

    /**
     * value: "OFF"
     * @const
     */
    "OFF": "OFF"
};


/**
 * Allowed values for the <code>unclean_leader_election_enable</code> property.
 * @enum {String}
 * @readonly
 */
KafkaConfigParameters['UncleanLeaderElectionEnableEnum'] = {

    /**
     * value: "ON"
     * @const
     */
    "ON": "ON",

    /**
     * value: "OFF"
     * @const
     */
    "OFF": "OFF"
};



export default KafkaConfigParameters;

