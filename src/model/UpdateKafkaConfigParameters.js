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
 * The UpdateKafkaConfigParameters model module.
 * @module model/UpdateKafkaConfigParameters
 * @version 1.0.0
 */
class UpdateKafkaConfigParameters {
    /**
     * Constructs a new <code>UpdateKafkaConfigParameters</code>.
     * Настройки топика Kafka. Передаются только для кластеров Kafka: для кластеров других типов запрос вернется с ошибкой &#x60;forbidden_change_configuration&#x60;. Не переданные параметры получают значения по умолчанию. Числовые значения можно передавать как числом, так и строкой.
     * @alias module:model/UpdateKafkaConfigParameters
     */
    constructor() { 
        
        UpdateKafkaConfigParameters.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>UpdateKafkaConfigParameters</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/UpdateKafkaConfigParameters} obj Optional instance to populate.
     * @return {module:model/UpdateKafkaConfigParameters} The populated <code>UpdateKafkaConfigParameters</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new UpdateKafkaConfigParameters();

            if (data.hasOwnProperty('partitions')) {
                obj['partitions'] = ApiClient.convertToType(data['partitions'], 'Number');
            }
            if (data.hasOwnProperty('cleanup_policy')) {
                obj['cleanup_policy'] = ApiClient.convertToType(data['cleanup_policy'], 'String');
            }
            if (data.hasOwnProperty('compression_type')) {
                obj['compression_type'] = ApiClient.convertToType(data['compression_type'], 'String');
            }
            if (data.hasOwnProperty('delete_retention_ms')) {
                obj['delete_retention_ms'] = ApiClient.convertToType(data['delete_retention_ms'], 'Number');
            }
            if (data.hasOwnProperty('file_delete_delay_ms')) {
                obj['file_delete_delay_ms'] = ApiClient.convertToType(data['file_delete_delay_ms'], 'Number');
            }
            if (data.hasOwnProperty('flush_messages')) {
                obj['flush_messages'] = ApiClient.convertToType(data['flush_messages'], 'Number');
            }
            if (data.hasOwnProperty('flush_ms')) {
                obj['flush_ms'] = ApiClient.convertToType(data['flush_ms'], 'Number');
            }
            if (data.hasOwnProperty('index_interval_bytes')) {
                obj['index_interval_bytes'] = ApiClient.convertToType(data['index_interval_bytes'], 'Number');
            }
            if (data.hasOwnProperty('min_compaction_lag_ms')) {
                obj['min_compaction_lag_ms'] = ApiClient.convertToType(data['min_compaction_lag_ms'], 'Number');
            }
            if (data.hasOwnProperty('max_compaction_lag_ms')) {
                obj['max_compaction_lag_ms'] = ApiClient.convertToType(data['max_compaction_lag_ms'], 'Number');
            }
            if (data.hasOwnProperty('max_message_bytes')) {
                obj['max_message_bytes'] = ApiClient.convertToType(data['max_message_bytes'], 'Number');
            }
            if (data.hasOwnProperty('message_format_version')) {
                obj['message_format_version'] = ApiClient.convertToType(data['message_format_version'], 'String');
            }
            if (data.hasOwnProperty('message_timestamp_difference_max_ms')) {
                obj['message_timestamp_difference_max_ms'] = ApiClient.convertToType(data['message_timestamp_difference_max_ms'], 'Number');
            }
            if (data.hasOwnProperty('message_downconversion_enable')) {
                obj['message_downconversion_enable'] = ApiClient.convertToType(data['message_downconversion_enable'], 'String');
            }
            if (data.hasOwnProperty('message_timestamp_type')) {
                obj['message_timestamp_type'] = ApiClient.convertToType(data['message_timestamp_type'], 'String');
            }
            if (data.hasOwnProperty('min_cleanable_dirty_ratio')) {
                obj['min_cleanable_dirty_ratio'] = ApiClient.convertToType(data['min_cleanable_dirty_ratio'], 'Number');
            }
            if (data.hasOwnProperty('min_insync_replicas')) {
                obj['min_insync_replicas'] = ApiClient.convertToType(data['min_insync_replicas'], 'Number');
            }
            if (data.hasOwnProperty('preallocate')) {
                obj['preallocate'] = ApiClient.convertToType(data['preallocate'], 'String');
            }
            if (data.hasOwnProperty('retention_bytes')) {
                obj['retention_bytes'] = ApiClient.convertToType(data['retention_bytes'], 'Number');
            }
            if (data.hasOwnProperty('retention_ms')) {
                obj['retention_ms'] = ApiClient.convertToType(data['retention_ms'], 'Number');
            }
            if (data.hasOwnProperty('segment_bytes')) {
                obj['segment_bytes'] = ApiClient.convertToType(data['segment_bytes'], 'Number');
            }
            if (data.hasOwnProperty('segment_index_bytes')) {
                obj['segment_index_bytes'] = ApiClient.convertToType(data['segment_index_bytes'], 'Number');
            }
            if (data.hasOwnProperty('segment_jitter_ms')) {
                obj['segment_jitter_ms'] = ApiClient.convertToType(data['segment_jitter_ms'], 'Number');
            }
            if (data.hasOwnProperty('segment_ms')) {
                obj['segment_ms'] = ApiClient.convertToType(data['segment_ms'], 'Number');
            }
            if (data.hasOwnProperty('unclean_leader_election_enable')) {
                obj['unclean_leader_election_enable'] = ApiClient.convertToType(data['unclean_leader_election_enable'], 'String');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>UpdateKafkaConfigParameters</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>UpdateKafkaConfigParameters</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['cleanup_policy'] && !(typeof data['cleanup_policy'] === 'string' || data['cleanup_policy'] instanceof String)) {
            throw new Error("Expected the field `cleanup_policy` to be a primitive type in the JSON string but got " + data['cleanup_policy']);
        }
        // ensure the json data is a string
        if (data['compression_type'] && !(typeof data['compression_type'] === 'string' || data['compression_type'] instanceof String)) {
            throw new Error("Expected the field `compression_type` to be a primitive type in the JSON string but got " + data['compression_type']);
        }
        // ensure the json data is a string
        if (data['message_format_version'] && !(typeof data['message_format_version'] === 'string' || data['message_format_version'] instanceof String)) {
            throw new Error("Expected the field `message_format_version` to be a primitive type in the JSON string but got " + data['message_format_version']);
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
        if (data['preallocate'] && !(typeof data['preallocate'] === 'string' || data['preallocate'] instanceof String)) {
            throw new Error("Expected the field `preallocate` to be a primitive type in the JSON string but got " + data['preallocate']);
        }
        // ensure the json data is a string
        if (data['unclean_leader_election_enable'] && !(typeof data['unclean_leader_election_enable'] === 'string' || data['unclean_leader_election_enable'] instanceof String)) {
            throw new Error("Expected the field `unclean_leader_election_enable` to be a primitive type in the JSON string but got " + data['unclean_leader_election_enable']);
        }

        return true;
    }


}



/**
 * Количество партиций топика. Количество партиций нельзя уменьшить: если передать значение меньше текущего, останется текущее.
 * @member {Number} partitions
 */
UpdateKafkaConfigParameters.prototype['partitions'] = undefined;

/**
 * Политика очистки старых сегментов лога: `delete` — удалять, `compact` — уплотнять.
 * @member {module:model/UpdateKafkaConfigParameters.CleanupPolicyEnum} cleanup_policy
 */
UpdateKafkaConfigParameters.prototype['cleanup_policy'] = undefined;

/**
 * Тип сжатия сообщений в топике.
 * @member {module:model/UpdateKafkaConfigParameters.CompressionTypeEnum} compression_type
 */
UpdateKafkaConfigParameters.prototype['compression_type'] = undefined;

/**
 * Время (в мс) хранения меток удаления для уплотняемых топиков. Максимальное значение — 9223372036854775807.
 * @member {Number} delete_retention_ms
 */
UpdateKafkaConfigParameters.prototype['delete_retention_ms'] = undefined;

/**
 * Задержка (в мс) перед удалением файла из файловой системы. Максимальное значение — 9223372036854775807.
 * @member {Number} file_delete_delay_ms
 */
UpdateKafkaConfigParameters.prototype['file_delete_delay_ms'] = undefined;

/**
 * Количество сообщений, после которого данные принудительно сбрасываются на диск. Максимальное значение — 9223372036854775807.
 * @member {Number} flush_messages
 */
UpdateKafkaConfigParameters.prototype['flush_messages'] = undefined;

/**
 * Интервал (в мс), после которого данные принудительно сбрасываются на диск. Максимальное значение — 9223372036854775807.
 * @member {Number} flush_ms
 */
UpdateKafkaConfigParameters.prototype['flush_ms'] = undefined;

/**
 * Интервал (в байтах), с которым Kafka добавляет запись в индекс смещений.
 * @member {Number} index_interval_bytes
 */
UpdateKafkaConfigParameters.prototype['index_interval_bytes'] = undefined;

/**
 * Минимальное время (в мс), в течение которого сообщение остается неуплотненным. Максимальное значение — 9223372036854775807.
 * @member {Number} min_compaction_lag_ms
 */
UpdateKafkaConfigParameters.prototype['min_compaction_lag_ms'] = undefined;

/**
 * Максимальное время (в мс), в течение которого сообщение может оставаться неуплотненным. Максимальное значение — 9223372036854775807.
 * @member {Number} max_compaction_lag_ms
 */
UpdateKafkaConfigParameters.prototype['max_compaction_lag_ms'] = undefined;

/**
 * Максимальный размер (в байтах) пакета сообщений.
 * @member {Number} max_message_bytes
 */
UpdateKafkaConfigParameters.prototype['max_message_bytes'] = undefined;

/**
 * Версия формата сообщений, в котором Kafka добавляет сообщения в лог.
 * @member {module:model/UpdateKafkaConfigParameters.MessageFormatVersionEnum} message_format_version
 */
UpdateKafkaConfigParameters.prototype['message_format_version'] = undefined;

/**
 * Максимально допустимая разница (в мс) между временной меткой сообщения и временем его получения брокером. Максимальное значение — 9223372036854775807.
 * @member {Number} message_timestamp_difference_max_ms
 */
UpdateKafkaConfigParameters.prototype['message_timestamp_difference_max_ms'] = undefined;

/**
 * Понижение версии формата сообщений для старых клиентов.
 * @member {module:model/UpdateKafkaConfigParameters.MessageDownconversionEnableEnum} message_downconversion_enable
 */
UpdateKafkaConfigParameters.prototype['message_downconversion_enable'] = undefined;

/**
 * Источник временной метки сообщения: `CreateTime` — время создания сообщения клиентом, `LogAppendTime` — время добавления сообщения в лог брокером.
 * @member {module:model/UpdateKafkaConfigParameters.MessageTimestampTypeEnum} message_timestamp_type
 */
UpdateKafkaConfigParameters.prototype['message_timestamp_type'] = undefined;

/**
 * Доля неуплотненных данных в логе, при которой запускается уплотнение.
 * @member {Number} min_cleanable_dirty_ratio
 */
UpdateKafkaConfigParameters.prototype['min_cleanable_dirty_ratio'] = undefined;

/**
 * Минимальное количество синхронизированных реплик, необходимое для подтверждения записи.
 * @member {Number} min_insync_replicas
 */
UpdateKafkaConfigParameters.prototype['min_insync_replicas'] = undefined;

/**
 * Предварительное выделение места на диске при создании нового сегмента лога.
 * @member {module:model/UpdateKafkaConfigParameters.PreallocateEnum} preallocate
 */
UpdateKafkaConfigParameters.prototype['preallocate'] = undefined;

/**
 * Максимальный размер (в байтах) партиции топика, после которого старые сегменты удаляются. `-1` — без ограничения. Максимальное значение — 9223372036854775807.
 * @member {Number} retention_bytes
 */
UpdateKafkaConfigParameters.prototype['retention_bytes'] = undefined;

/**
 * Время (в мс) хранения сообщений в топике. `-1` — хранить бессрочно. Максимальное значение — 9223372036854775807.
 * @member {Number} retention_ms
 */
UpdateKafkaConfigParameters.prototype['retention_ms'] = undefined;

/**
 * Максимальный размер (в байтах) одного сегмента лога.
 * @member {Number} segment_bytes
 */
UpdateKafkaConfigParameters.prototype['segment_bytes'] = undefined;

/**
 * Максимальный размер (в байтах) индексного файла сегмента лога.
 * @member {Number} segment_index_bytes
 */
UpdateKafkaConfigParameters.prototype['segment_index_bytes'] = undefined;

/**
 * Максимальное случайное отклонение (в мс) от времени ротации сегмента. Максимальное значение — 9223372036854775807.
 * @member {Number} segment_jitter_ms
 */
UpdateKafkaConfigParameters.prototype['segment_jitter_ms'] = undefined;

/**
 * Период (в мс), после которого Kafka создает новый сегмент лога. Максимальное значение — 9223372036854775807.
 * @member {Number} segment_ms
 */
UpdateKafkaConfigParameters.prototype['segment_ms'] = undefined;

/**
 * Возможность выбрать лидером партиции реплику, которая не входит в число синхронизированных.
 * @member {module:model/UpdateKafkaConfigParameters.UncleanLeaderElectionEnableEnum} unclean_leader_election_enable
 */
UpdateKafkaConfigParameters.prototype['unclean_leader_election_enable'] = undefined;





/**
 * Allowed values for the <code>cleanup_policy</code> property.
 * @enum {String}
 * @readonly
 */
UpdateKafkaConfigParameters['CleanupPolicyEnum'] = {

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
UpdateKafkaConfigParameters['CompressionTypeEnum'] = {

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
 * Allowed values for the <code>message_format_version</code> property.
 * @enum {String}
 * @readonly
 */
UpdateKafkaConfigParameters['MessageFormatVersionEnum'] = {

    /**
     * value: "0.8.0"
     * @const
     */
    "0.8.0": "0.8.0",

    /**
     * value: "0.8.1"
     * @const
     */
    "0.8.1": "0.8.1",

    /**
     * value: "0.8.2"
     * @const
     */
    "0.8.2": "0.8.2",

    /**
     * value: "0.9.0"
     * @const
     */
    "0.9.0": "0.9.0",

    /**
     * value: "0.10.0-IV0"
     * @const
     */
    "0.10.0-IV0": "0.10.0-IV0",

    /**
     * value: "0.10.0-IV1"
     * @const
     */
    "0.10.0-IV1": "0.10.0-IV1",

    /**
     * value: "0.10.1-IV0"
     * @const
     */
    "0.10.1-IV0": "0.10.1-IV0",

    /**
     * value: "0.10.1-IV1"
     * @const
     */
    "0.10.1-IV1": "0.10.1-IV1",

    /**
     * value: "0.10.1-IV2"
     * @const
     */
    "0.10.1-IV2": "0.10.1-IV2",

    /**
     * value: "0.10.2-IV0"
     * @const
     */
    "0.10.2-IV0": "0.10.2-IV0",

    /**
     * value: "0.11.0-IV0"
     * @const
     */
    "0.11.0-IV0": "0.11.0-IV0",

    /**
     * value: "0.11.0-IV1"
     * @const
     */
    "0.11.0-IV1": "0.11.0-IV1",

    /**
     * value: "0.11.0-IV2"
     * @const
     */
    "0.11.0-IV2": "0.11.0-IV2",

    /**
     * value: "1.0-IV0"
     * @const
     */
    "1.0-IV0": "1.0-IV0",

    /**
     * value: "1.1-IV0"
     * @const
     */
    "1.1-IV0": "1.1-IV0",

    /**
     * value: "2.0-IV0"
     * @const
     */
    "2.0-IV0": "2.0-IV0",

    /**
     * value: "2.0-IV1"
     * @const
     */
    "2.0-IV1": "2.0-IV1",

    /**
     * value: "2.1-IV0"
     * @const
     */
    "2.1-IV0": "2.1-IV0",

    /**
     * value: "2.1-IV1"
     * @const
     */
    "2.1-IV1": "2.1-IV1",

    /**
     * value: "2.1-IV2"
     * @const
     */
    "2.1-IV2": "2.1-IV2",

    /**
     * value: "2.2-IV0"
     * @const
     */
    "2.2-IV0": "2.2-IV0",

    /**
     * value: "2.2-IV1"
     * @const
     */
    "2.2-IV1": "2.2-IV1",

    /**
     * value: "2.3-IV0"
     * @const
     */
    "2.3-IV0": "2.3-IV0",

    /**
     * value: "2.3-IV1"
     * @const
     */
    "2.3-IV1": "2.3-IV1",

    /**
     * value: "2.4-IV0"
     * @const
     */
    "2.4-IV0": "2.4-IV0",

    /**
     * value: "2.4-IV1"
     * @const
     */
    "2.4-IV1": "2.4-IV1",

    /**
     * value: "2.5-IV0"
     * @const
     */
    "2.5-IV0": "2.5-IV0",

    /**
     * value: "2.6-IV0"
     * @const
     */
    "2.6-IV0": "2.6-IV0",

    /**
     * value: "2.7-IV0"
     * @const
     */
    "2.7-IV0": "2.7-IV0",

    /**
     * value: "2.7-IV1"
     * @const
     */
    "2.7-IV1": "2.7-IV1",

    /**
     * value: "2.7-IV2"
     * @const
     */
    "2.7-IV2": "2.7-IV2",

    /**
     * value: "2.8-IV0"
     * @const
     */
    "2.8-IV0": "2.8-IV0",

    /**
     * value: "2.8-IV1"
     * @const
     */
    "2.8-IV1": "2.8-IV1",

    /**
     * value: "3.0-IV0"
     * @const
     */
    "3.0-IV0": "3.0-IV0",

    /**
     * value: "3.0-IV1"
     * @const
     */
    "3.0-IV1": "3.0-IV1",

    /**
     * value: "3.1-IV0"
     * @const
     */
    "3.1-IV0": "3.1-IV0",

    /**
     * value: "3.2-IV0"
     * @const
     */
    "3.2-IV0": "3.2-IV0",

    /**
     * value: "3.3-IV0"
     * @const
     */
    "3.3-IV0": "3.3-IV0",

    /**
     * value: "3.3-IV1"
     * @const
     */
    "3.3-IV1": "3.3-IV1",

    /**
     * value: "3.3-IV2"
     * @const
     */
    "3.3-IV2": "3.3-IV2",

    /**
     * value: "3.3-IV3"
     * @const
     */
    "3.3-IV3": "3.3-IV3",

    /**
     * value: "3.4-IV0"
     * @const
     */
    "3.4-IV0": "3.4-IV0",

    /**
     * value: "3.5-IV0"
     * @const
     */
    "3.5-IV0": "3.5-IV0",

    /**
     * value: "3.5-IV1"
     * @const
     */
    "3.5-IV1": "3.5-IV1",

    /**
     * value: "3.5-IV2"
     * @const
     */
    "3.5-IV2": "3.5-IV2"
};


/**
 * Allowed values for the <code>message_downconversion_enable</code> property.
 * @enum {String}
 * @readonly
 */
UpdateKafkaConfigParameters['MessageDownconversionEnableEnum'] = {

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
UpdateKafkaConfigParameters['MessageTimestampTypeEnum'] = {

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
UpdateKafkaConfigParameters['PreallocateEnum'] = {

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
UpdateKafkaConfigParameters['UncleanLeaderElectionEnableEnum'] = {

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



export default UpdateKafkaConfigParameters;

