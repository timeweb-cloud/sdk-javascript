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
 * The Mysql model module.
 * @module model/Mysql
 * @version 1.0.0
 */
class Mysql {
    /**
     * Constructs a new <code>Mysql</code>.
     * Параметры MySQL (&#x60;mysql5&#x60; | &#x60;mysql&#x60; | &#x60;mysql8_4&#x60;)
     * @alias module:model/Mysql
     */
    constructor() { 
        
        Mysql.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>Mysql</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Mysql} obj Optional instance to populate.
     * @return {module:model/Mysql} The populated <code>Mysql</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new Mysql();

            if (data.hasOwnProperty('join_buffer_size')) {
                obj['join_buffer_size'] = ApiClient.convertToType(data['join_buffer_size'], 'String');
            }
            if (data.hasOwnProperty('max_connections')) {
                obj['max_connections'] = ApiClient.convertToType(data['max_connections'], 'String');
            }
            if (data.hasOwnProperty('sort_buffer_size')) {
                obj['sort_buffer_size'] = ApiClient.convertToType(data['sort_buffer_size'], 'String');
            }
            if (data.hasOwnProperty('thread_cache_size')) {
                obj['thread_cache_size'] = ApiClient.convertToType(data['thread_cache_size'], 'String');
            }
            if (data.hasOwnProperty('innodb_buffer_pool_size')) {
                obj['innodb_buffer_pool_size'] = ApiClient.convertToType(data['innodb_buffer_pool_size'], 'String');
            }
            if (data.hasOwnProperty('auto_increment_increment')) {
                obj['auto_increment_increment'] = ApiClient.convertToType(data['auto_increment_increment'], 'String');
            }
            if (data.hasOwnProperty('auto_increment_offset')) {
                obj['auto_increment_offset'] = ApiClient.convertToType(data['auto_increment_offset'], 'String');
            }
            if (data.hasOwnProperty('innodb_io_capacity')) {
                obj['innodb_io_capacity'] = ApiClient.convertToType(data['innodb_io_capacity'], 'String');
            }
            if (data.hasOwnProperty('innodb_purge_threads')) {
                obj['innodb_purge_threads'] = ApiClient.convertToType(data['innodb_purge_threads'], 'String');
            }
            if (data.hasOwnProperty('innodb_read_io_threads')) {
                obj['innodb_read_io_threads'] = ApiClient.convertToType(data['innodb_read_io_threads'], 'String');
            }
            if (data.hasOwnProperty('innodb_thread_concurrency')) {
                obj['innodb_thread_concurrency'] = ApiClient.convertToType(data['innodb_thread_concurrency'], 'String');
            }
            if (data.hasOwnProperty('innodb_write_io_threads')) {
                obj['innodb_write_io_threads'] = ApiClient.convertToType(data['innodb_write_io_threads'], 'String');
            }
            if (data.hasOwnProperty('innodb_log_file_size')) {
                obj['innodb_log_file_size'] = ApiClient.convertToType(data['innodb_log_file_size'], 'String');
            }
            if (data.hasOwnProperty('max_allowed_packet')) {
                obj['max_allowed_packet'] = ApiClient.convertToType(data['max_allowed_packet'], 'String');
            }
            if (data.hasOwnProperty('max_heap_table_size')) {
                obj['max_heap_table_size'] = ApiClient.convertToType(data['max_heap_table_size'], 'String');
            }
            if (data.hasOwnProperty('sql_mode')) {
                obj['sql_mode'] = ApiClient.convertToType(data['sql_mode'], 'String');
            }
            if (data.hasOwnProperty('query_cache_type')) {
                obj['query_cache_type'] = ApiClient.convertToType(data['query_cache_type'], 'String');
            }
            if (data.hasOwnProperty('query_cache_size')) {
                obj['query_cache_size'] = ApiClient.convertToType(data['query_cache_size'], 'String');
            }
            if (data.hasOwnProperty('innodb_flush_log_at_trx_commit')) {
                obj['innodb_flush_log_at_trx_commit'] = ApiClient.convertToType(data['innodb_flush_log_at_trx_commit'], 'String');
            }
            if (data.hasOwnProperty('transaction_isolation')) {
                obj['transaction_isolation'] = ApiClient.convertToType(data['transaction_isolation'], 'String');
            }
            if (data.hasOwnProperty('long_query_time')) {
                obj['long_query_time'] = ApiClient.convertToType(data['long_query_time'], 'String');
            }
            if (data.hasOwnProperty('tmp_table_size')) {
                obj['tmp_table_size'] = ApiClient.convertToType(data['tmp_table_size'], 'String');
            }
            if (data.hasOwnProperty('table_open_cache')) {
                obj['table_open_cache'] = ApiClient.convertToType(data['table_open_cache'], 'String');
            }
            if (data.hasOwnProperty('table_open_cache_instances')) {
                obj['table_open_cache_instances'] = ApiClient.convertToType(data['table_open_cache_instances'], 'String');
            }
            if (data.hasOwnProperty('innodb_flush_method')) {
                obj['innodb_flush_method'] = ApiClient.convertToType(data['innodb_flush_method'], 'String');
            }
            if (data.hasOwnProperty('innodb_strict_mode')) {
                obj['innodb_strict_mode'] = ApiClient.convertToType(data['innodb_strict_mode'], 'String');
            }
            if (data.hasOwnProperty('slow_query_log')) {
                obj['slow_query_log'] = ApiClient.convertToType(data['slow_query_log'], 'String');
            }
            if (data.hasOwnProperty('binlog_cache_size')) {
                obj['binlog_cache_size'] = ApiClient.convertToType(data['binlog_cache_size'], 'String');
            }
            if (data.hasOwnProperty('binlog_group_commit_sync_delay')) {
                obj['binlog_group_commit_sync_delay'] = ApiClient.convertToType(data['binlog_group_commit_sync_delay'], 'String');
            }
            if (data.hasOwnProperty('binlog_row_image')) {
                obj['binlog_row_image'] = ApiClient.convertToType(data['binlog_row_image'], 'String');
            }
            if (data.hasOwnProperty('binlog_rows_query_log_events')) {
                obj['binlog_rows_query_log_events'] = ApiClient.convertToType(data['binlog_rows_query_log_events'], 'String');
            }
            if (data.hasOwnProperty('character_set_server')) {
                obj['character_set_server'] = ApiClient.convertToType(data['character_set_server'], 'String');
            }
            if (data.hasOwnProperty('explicit_defaults_for_timestamp')) {
                obj['explicit_defaults_for_timestamp'] = ApiClient.convertToType(data['explicit_defaults_for_timestamp'], 'String');
            }
            if (data.hasOwnProperty('group_concat_max_len')) {
                obj['group_concat_max_len'] = ApiClient.convertToType(data['group_concat_max_len'], 'String');
            }
            if (data.hasOwnProperty('innodb_adaptive_hash_index')) {
                obj['innodb_adaptive_hash_index'] = ApiClient.convertToType(data['innodb_adaptive_hash_index'], 'String');
            }
            if (data.hasOwnProperty('innodb_lock_wait_timeout')) {
                obj['innodb_lock_wait_timeout'] = ApiClient.convertToType(data['innodb_lock_wait_timeout'], 'String');
            }
            if (data.hasOwnProperty('innodb_numa_interleave')) {
                obj['innodb_numa_interleave'] = ApiClient.convertToType(data['innodb_numa_interleave'], 'String');
            }
            if (data.hasOwnProperty('net_read_timeout')) {
                obj['net_read_timeout'] = ApiClient.convertToType(data['net_read_timeout'], 'String');
            }
            if (data.hasOwnProperty('net_write_timeout')) {
                obj['net_write_timeout'] = ApiClient.convertToType(data['net_write_timeout'], 'String');
            }
            if (data.hasOwnProperty('regexp_time_limit')) {
                obj['regexp_time_limit'] = ApiClient.convertToType(data['regexp_time_limit'], 'String');
            }
            if (data.hasOwnProperty('sync_binlog')) {
                obj['sync_binlog'] = ApiClient.convertToType(data['sync_binlog'], 'String');
            }
            if (data.hasOwnProperty('table_definition_cache')) {
                obj['table_definition_cache'] = ApiClient.convertToType(data['table_definition_cache'], 'String');
            }
            if (data.hasOwnProperty('log_bin_trust_function_creators')) {
                obj['log_bin_trust_function_creators'] = ApiClient.convertToType(data['log_bin_trust_function_creators'], 'String');
            }
            if (data.hasOwnProperty('skip_name_resolve')) {
                obj['skip_name_resolve'] = ApiClient.convertToType(data['skip_name_resolve'], 'String');
            }
            if (data.hasOwnProperty('innodb_redo_log_capacity')) {
                obj['innodb_redo_log_capacity'] = ApiClient.convertToType(data['innodb_redo_log_capacity'], 'String');
            }
            if (data.hasOwnProperty('wait_timeout')) {
                obj['wait_timeout'] = ApiClient.convertToType(data['wait_timeout'], 'String');
            }
            if (data.hasOwnProperty('interactive_timeout')) {
                obj['interactive_timeout'] = ApiClient.convertToType(data['interactive_timeout'], 'String');
            }
            if (data.hasOwnProperty('default-time-zone')) {
                obj['default-time-zone'] = ApiClient.convertToType(data['default-time-zone'], 'String');
            }
            if (data.hasOwnProperty('pxc_strict_mode')) {
                obj['pxc_strict_mode'] = ApiClient.convertToType(data['pxc_strict_mode'], 'String');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>Mysql</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>Mysql</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['join_buffer_size'] && !(typeof data['join_buffer_size'] === 'string' || data['join_buffer_size'] instanceof String)) {
            throw new Error("Expected the field `join_buffer_size` to be a primitive type in the JSON string but got " + data['join_buffer_size']);
        }
        // ensure the json data is a string
        if (data['max_connections'] && !(typeof data['max_connections'] === 'string' || data['max_connections'] instanceof String)) {
            throw new Error("Expected the field `max_connections` to be a primitive type in the JSON string but got " + data['max_connections']);
        }
        // ensure the json data is a string
        if (data['sort_buffer_size'] && !(typeof data['sort_buffer_size'] === 'string' || data['sort_buffer_size'] instanceof String)) {
            throw new Error("Expected the field `sort_buffer_size` to be a primitive type in the JSON string but got " + data['sort_buffer_size']);
        }
        // ensure the json data is a string
        if (data['thread_cache_size'] && !(typeof data['thread_cache_size'] === 'string' || data['thread_cache_size'] instanceof String)) {
            throw new Error("Expected the field `thread_cache_size` to be a primitive type in the JSON string but got " + data['thread_cache_size']);
        }
        // ensure the json data is a string
        if (data['innodb_buffer_pool_size'] && !(typeof data['innodb_buffer_pool_size'] === 'string' || data['innodb_buffer_pool_size'] instanceof String)) {
            throw new Error("Expected the field `innodb_buffer_pool_size` to be a primitive type in the JSON string but got " + data['innodb_buffer_pool_size']);
        }
        // ensure the json data is a string
        if (data['auto_increment_increment'] && !(typeof data['auto_increment_increment'] === 'string' || data['auto_increment_increment'] instanceof String)) {
            throw new Error("Expected the field `auto_increment_increment` to be a primitive type in the JSON string but got " + data['auto_increment_increment']);
        }
        // ensure the json data is a string
        if (data['auto_increment_offset'] && !(typeof data['auto_increment_offset'] === 'string' || data['auto_increment_offset'] instanceof String)) {
            throw new Error("Expected the field `auto_increment_offset` to be a primitive type in the JSON string but got " + data['auto_increment_offset']);
        }
        // ensure the json data is a string
        if (data['innodb_io_capacity'] && !(typeof data['innodb_io_capacity'] === 'string' || data['innodb_io_capacity'] instanceof String)) {
            throw new Error("Expected the field `innodb_io_capacity` to be a primitive type in the JSON string but got " + data['innodb_io_capacity']);
        }
        // ensure the json data is a string
        if (data['innodb_purge_threads'] && !(typeof data['innodb_purge_threads'] === 'string' || data['innodb_purge_threads'] instanceof String)) {
            throw new Error("Expected the field `innodb_purge_threads` to be a primitive type in the JSON string but got " + data['innodb_purge_threads']);
        }
        // ensure the json data is a string
        if (data['innodb_read_io_threads'] && !(typeof data['innodb_read_io_threads'] === 'string' || data['innodb_read_io_threads'] instanceof String)) {
            throw new Error("Expected the field `innodb_read_io_threads` to be a primitive type in the JSON string but got " + data['innodb_read_io_threads']);
        }
        // ensure the json data is a string
        if (data['innodb_thread_concurrency'] && !(typeof data['innodb_thread_concurrency'] === 'string' || data['innodb_thread_concurrency'] instanceof String)) {
            throw new Error("Expected the field `innodb_thread_concurrency` to be a primitive type in the JSON string but got " + data['innodb_thread_concurrency']);
        }
        // ensure the json data is a string
        if (data['innodb_write_io_threads'] && !(typeof data['innodb_write_io_threads'] === 'string' || data['innodb_write_io_threads'] instanceof String)) {
            throw new Error("Expected the field `innodb_write_io_threads` to be a primitive type in the JSON string but got " + data['innodb_write_io_threads']);
        }
        // ensure the json data is a string
        if (data['innodb_log_file_size'] && !(typeof data['innodb_log_file_size'] === 'string' || data['innodb_log_file_size'] instanceof String)) {
            throw new Error("Expected the field `innodb_log_file_size` to be a primitive type in the JSON string but got " + data['innodb_log_file_size']);
        }
        // ensure the json data is a string
        if (data['max_allowed_packet'] && !(typeof data['max_allowed_packet'] === 'string' || data['max_allowed_packet'] instanceof String)) {
            throw new Error("Expected the field `max_allowed_packet` to be a primitive type in the JSON string but got " + data['max_allowed_packet']);
        }
        // ensure the json data is a string
        if (data['max_heap_table_size'] && !(typeof data['max_heap_table_size'] === 'string' || data['max_heap_table_size'] instanceof String)) {
            throw new Error("Expected the field `max_heap_table_size` to be a primitive type in the JSON string but got " + data['max_heap_table_size']);
        }
        // ensure the json data is a string
        if (data['sql_mode'] && !(typeof data['sql_mode'] === 'string' || data['sql_mode'] instanceof String)) {
            throw new Error("Expected the field `sql_mode` to be a primitive type in the JSON string but got " + data['sql_mode']);
        }
        // ensure the json data is a string
        if (data['query_cache_type'] && !(typeof data['query_cache_type'] === 'string' || data['query_cache_type'] instanceof String)) {
            throw new Error("Expected the field `query_cache_type` to be a primitive type in the JSON string but got " + data['query_cache_type']);
        }
        // ensure the json data is a string
        if (data['query_cache_size'] && !(typeof data['query_cache_size'] === 'string' || data['query_cache_size'] instanceof String)) {
            throw new Error("Expected the field `query_cache_size` to be a primitive type in the JSON string but got " + data['query_cache_size']);
        }
        // ensure the json data is a string
        if (data['innodb_flush_log_at_trx_commit'] && !(typeof data['innodb_flush_log_at_trx_commit'] === 'string' || data['innodb_flush_log_at_trx_commit'] instanceof String)) {
            throw new Error("Expected the field `innodb_flush_log_at_trx_commit` to be a primitive type in the JSON string but got " + data['innodb_flush_log_at_trx_commit']);
        }
        // ensure the json data is a string
        if (data['transaction_isolation'] && !(typeof data['transaction_isolation'] === 'string' || data['transaction_isolation'] instanceof String)) {
            throw new Error("Expected the field `transaction_isolation` to be a primitive type in the JSON string but got " + data['transaction_isolation']);
        }
        // ensure the json data is a string
        if (data['long_query_time'] && !(typeof data['long_query_time'] === 'string' || data['long_query_time'] instanceof String)) {
            throw new Error("Expected the field `long_query_time` to be a primitive type in the JSON string but got " + data['long_query_time']);
        }
        // ensure the json data is a string
        if (data['tmp_table_size'] && !(typeof data['tmp_table_size'] === 'string' || data['tmp_table_size'] instanceof String)) {
            throw new Error("Expected the field `tmp_table_size` to be a primitive type in the JSON string but got " + data['tmp_table_size']);
        }
        // ensure the json data is a string
        if (data['table_open_cache'] && !(typeof data['table_open_cache'] === 'string' || data['table_open_cache'] instanceof String)) {
            throw new Error("Expected the field `table_open_cache` to be a primitive type in the JSON string but got " + data['table_open_cache']);
        }
        // ensure the json data is a string
        if (data['table_open_cache_instances'] && !(typeof data['table_open_cache_instances'] === 'string' || data['table_open_cache_instances'] instanceof String)) {
            throw new Error("Expected the field `table_open_cache_instances` to be a primitive type in the JSON string but got " + data['table_open_cache_instances']);
        }
        // ensure the json data is a string
        if (data['innodb_flush_method'] && !(typeof data['innodb_flush_method'] === 'string' || data['innodb_flush_method'] instanceof String)) {
            throw new Error("Expected the field `innodb_flush_method` to be a primitive type in the JSON string but got " + data['innodb_flush_method']);
        }
        // ensure the json data is a string
        if (data['innodb_strict_mode'] && !(typeof data['innodb_strict_mode'] === 'string' || data['innodb_strict_mode'] instanceof String)) {
            throw new Error("Expected the field `innodb_strict_mode` to be a primitive type in the JSON string but got " + data['innodb_strict_mode']);
        }
        // ensure the json data is a string
        if (data['slow_query_log'] && !(typeof data['slow_query_log'] === 'string' || data['slow_query_log'] instanceof String)) {
            throw new Error("Expected the field `slow_query_log` to be a primitive type in the JSON string but got " + data['slow_query_log']);
        }
        // ensure the json data is a string
        if (data['binlog_cache_size'] && !(typeof data['binlog_cache_size'] === 'string' || data['binlog_cache_size'] instanceof String)) {
            throw new Error("Expected the field `binlog_cache_size` to be a primitive type in the JSON string but got " + data['binlog_cache_size']);
        }
        // ensure the json data is a string
        if (data['binlog_group_commit_sync_delay'] && !(typeof data['binlog_group_commit_sync_delay'] === 'string' || data['binlog_group_commit_sync_delay'] instanceof String)) {
            throw new Error("Expected the field `binlog_group_commit_sync_delay` to be a primitive type in the JSON string but got " + data['binlog_group_commit_sync_delay']);
        }
        // ensure the json data is a string
        if (data['binlog_row_image'] && !(typeof data['binlog_row_image'] === 'string' || data['binlog_row_image'] instanceof String)) {
            throw new Error("Expected the field `binlog_row_image` to be a primitive type in the JSON string but got " + data['binlog_row_image']);
        }
        // ensure the json data is a string
        if (data['binlog_rows_query_log_events'] && !(typeof data['binlog_rows_query_log_events'] === 'string' || data['binlog_rows_query_log_events'] instanceof String)) {
            throw new Error("Expected the field `binlog_rows_query_log_events` to be a primitive type in the JSON string but got " + data['binlog_rows_query_log_events']);
        }
        // ensure the json data is a string
        if (data['character_set_server'] && !(typeof data['character_set_server'] === 'string' || data['character_set_server'] instanceof String)) {
            throw new Error("Expected the field `character_set_server` to be a primitive type in the JSON string but got " + data['character_set_server']);
        }
        // ensure the json data is a string
        if (data['explicit_defaults_for_timestamp'] && !(typeof data['explicit_defaults_for_timestamp'] === 'string' || data['explicit_defaults_for_timestamp'] instanceof String)) {
            throw new Error("Expected the field `explicit_defaults_for_timestamp` to be a primitive type in the JSON string but got " + data['explicit_defaults_for_timestamp']);
        }
        // ensure the json data is a string
        if (data['group_concat_max_len'] && !(typeof data['group_concat_max_len'] === 'string' || data['group_concat_max_len'] instanceof String)) {
            throw new Error("Expected the field `group_concat_max_len` to be a primitive type in the JSON string but got " + data['group_concat_max_len']);
        }
        // ensure the json data is a string
        if (data['innodb_adaptive_hash_index'] && !(typeof data['innodb_adaptive_hash_index'] === 'string' || data['innodb_adaptive_hash_index'] instanceof String)) {
            throw new Error("Expected the field `innodb_adaptive_hash_index` to be a primitive type in the JSON string but got " + data['innodb_adaptive_hash_index']);
        }
        // ensure the json data is a string
        if (data['innodb_lock_wait_timeout'] && !(typeof data['innodb_lock_wait_timeout'] === 'string' || data['innodb_lock_wait_timeout'] instanceof String)) {
            throw new Error("Expected the field `innodb_lock_wait_timeout` to be a primitive type in the JSON string but got " + data['innodb_lock_wait_timeout']);
        }
        // ensure the json data is a string
        if (data['innodb_numa_interleave'] && !(typeof data['innodb_numa_interleave'] === 'string' || data['innodb_numa_interleave'] instanceof String)) {
            throw new Error("Expected the field `innodb_numa_interleave` to be a primitive type in the JSON string but got " + data['innodb_numa_interleave']);
        }
        // ensure the json data is a string
        if (data['net_read_timeout'] && !(typeof data['net_read_timeout'] === 'string' || data['net_read_timeout'] instanceof String)) {
            throw new Error("Expected the field `net_read_timeout` to be a primitive type in the JSON string but got " + data['net_read_timeout']);
        }
        // ensure the json data is a string
        if (data['net_write_timeout'] && !(typeof data['net_write_timeout'] === 'string' || data['net_write_timeout'] instanceof String)) {
            throw new Error("Expected the field `net_write_timeout` to be a primitive type in the JSON string but got " + data['net_write_timeout']);
        }
        // ensure the json data is a string
        if (data['regexp_time_limit'] && !(typeof data['regexp_time_limit'] === 'string' || data['regexp_time_limit'] instanceof String)) {
            throw new Error("Expected the field `regexp_time_limit` to be a primitive type in the JSON string but got " + data['regexp_time_limit']);
        }
        // ensure the json data is a string
        if (data['sync_binlog'] && !(typeof data['sync_binlog'] === 'string' || data['sync_binlog'] instanceof String)) {
            throw new Error("Expected the field `sync_binlog` to be a primitive type in the JSON string but got " + data['sync_binlog']);
        }
        // ensure the json data is a string
        if (data['table_definition_cache'] && !(typeof data['table_definition_cache'] === 'string' || data['table_definition_cache'] instanceof String)) {
            throw new Error("Expected the field `table_definition_cache` to be a primitive type in the JSON string but got " + data['table_definition_cache']);
        }
        // ensure the json data is a string
        if (data['log_bin_trust_function_creators'] && !(typeof data['log_bin_trust_function_creators'] === 'string' || data['log_bin_trust_function_creators'] instanceof String)) {
            throw new Error("Expected the field `log_bin_trust_function_creators` to be a primitive type in the JSON string but got " + data['log_bin_trust_function_creators']);
        }
        // ensure the json data is a string
        if (data['skip_name_resolve'] && !(typeof data['skip_name_resolve'] === 'string' || data['skip_name_resolve'] instanceof String)) {
            throw new Error("Expected the field `skip_name_resolve` to be a primitive type in the JSON string but got " + data['skip_name_resolve']);
        }
        // ensure the json data is a string
        if (data['innodb_redo_log_capacity'] && !(typeof data['innodb_redo_log_capacity'] === 'string' || data['innodb_redo_log_capacity'] instanceof String)) {
            throw new Error("Expected the field `innodb_redo_log_capacity` to be a primitive type in the JSON string but got " + data['innodb_redo_log_capacity']);
        }
        // ensure the json data is a string
        if (data['wait_timeout'] && !(typeof data['wait_timeout'] === 'string' || data['wait_timeout'] instanceof String)) {
            throw new Error("Expected the field `wait_timeout` to be a primitive type in the JSON string but got " + data['wait_timeout']);
        }
        // ensure the json data is a string
        if (data['interactive_timeout'] && !(typeof data['interactive_timeout'] === 'string' || data['interactive_timeout'] instanceof String)) {
            throw new Error("Expected the field `interactive_timeout` to be a primitive type in the JSON string but got " + data['interactive_timeout']);
        }
        // ensure the json data is a string
        if (data['default-time-zone'] && !(typeof data['default-time-zone'] === 'string' || data['default-time-zone'] instanceof String)) {
            throw new Error("Expected the field `default-time-zone` to be a primitive type in the JSON string but got " + data['default-time-zone']);
        }
        // ensure the json data is a string
        if (data['pxc_strict_mode'] && !(typeof data['pxc_strict_mode'] === 'string' || data['pxc_strict_mode'] instanceof String)) {
            throw new Error("Expected the field `pxc_strict_mode` to be a primitive type in the JSON string but got " + data['pxc_strict_mode']);
        }

        return true;
    }


}



/**
 * Размер буфера, используемого при соединениях таблиц без индексов (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} join_buffer_size
 */
Mysql.prototype['join_buffer_size'] = undefined;

/**
 * Максимальное количество одновременных подключений к серверу (`mysql5` | `mysql` | `mysql8_4` | `postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} max_connections
 */
Mysql.prototype['max_connections'] = undefined;

/**
 * Размер буфера сортировки для операций ORDER BY и GROUP BY (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} sort_buffer_size
 */
Mysql.prototype['sort_buffer_size'] = undefined;

/**
 * Количество потоков, которые сервер сохраняет для повторного использования (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} thread_cache_size
 */
Mysql.prototype['thread_cache_size'] = undefined;

/**
 * Размер буферного пула InnoDB для хранения данных и индексов в памяти (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} innodb_buffer_pool_size
 */
Mysql.prototype['innodb_buffer_pool_size'] = undefined;

/**
 * Интервал между значениями столбцов с атрибутом `AUTO_INCREMENT` (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} auto_increment_increment
 */
Mysql.prototype['auto_increment_increment'] = undefined;

/**
 * Начальное значение для столбцов с атрибутом `AUTO_INCREMENT` (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} auto_increment_offset
 */
Mysql.prototype['auto_increment_offset'] = undefined;

/**
 * Количество операций ввода-вывода в секунду `IOPS`, используемых InnoDB (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} innodb_io_capacity
 */
Mysql.prototype['innodb_io_capacity'] = undefined;

/**
 * Количество потоков, используемых для фоновой очистки undo-записей InnoDB (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} innodb_purge_threads
 */
Mysql.prototype['innodb_purge_threads'] = undefined;

/**
 * Количество потоков ввода-вывода для операций чтения InnoDB (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} innodb_read_io_threads
 */
Mysql.prototype['innodb_read_io_threads'] = undefined;

/**
 * Ограничение количества одновременно выполняющихся потоков InnoDB (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} innodb_thread_concurrency
 */
Mysql.prototype['innodb_thread_concurrency'] = undefined;

/**
 * Количество потоков ввода-вывода для операций записи InnoDB (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} innodb_write_io_threads
 */
Mysql.prototype['innodb_write_io_threads'] = undefined;

/**
 * Размер файла журнала транзакций InnoDB redo log (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} innodb_log_file_size
 */
Mysql.prototype['innodb_log_file_size'] = undefined;

/**
 * Максимальный размер пакета данных, который может передаваться между клиентом и сервером (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} max_allowed_packet
 */
Mysql.prototype['max_allowed_packet'] = undefined;

/**
 * Максимальный размер таблиц типа MEMORY (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} max_heap_table_size
 */
Mysql.prototype['max_heap_table_size'] = undefined;

/**
 * Режим работы SQL сервера, определяющий поведение обработки запросов (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} sql_mode
 */
Mysql.prototype['sql_mode'] = undefined;

/**
 * Тип кэша запросов (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} query_cache_type
 */
Mysql.prototype['query_cache_type'] = undefined;

/**
 * Объем памяти, выделяемый для кэширования результатов запросов (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} query_cache_size
 */
Mysql.prototype['query_cache_size'] = undefined;

/**
 * Режим записи журнала InnoDB при фиксации транзакций (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} innodb_flush_log_at_trx_commit
 */
Mysql.prototype['innodb_flush_log_at_trx_commit'] = undefined;

/**
 * Уровень изоляции транзакций по умолчанию (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} transaction_isolation
 */
Mysql.prototype['transaction_isolation'] = undefined;

/**
 * Время выполнения запроса, после которого он считается долгим и может попасть в slow query log (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} long_query_time
 */
Mysql.prototype['long_query_time'] = undefined;

/**
 * Максимальный размер временных таблиц в памяти (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} tmp_table_size
 */
Mysql.prototype['tmp_table_size'] = undefined;

/**
 * Количество открытых таблиц, которые сервер может хранить в кэше (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} table_open_cache
 */
Mysql.prototype['table_open_cache'] = undefined;

/**
 * Количество экземпляров кэша открытых таблиц для снижения конкуренции между потоками (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} table_open_cache_instances
 */
Mysql.prototype['table_open_cache_instances'] = undefined;

/**
 * Метод выполнения операций записи и синхронизации файлов InnoDB (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} innodb_flush_method
 */
Mysql.prototype['innodb_flush_method'] = undefined;

/**
 * Включение строгой проверки операций InnoDB (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} innodb_strict_mode
 */
Mysql.prototype['innodb_strict_mode'] = undefined;

/**
 * Включение журнала медленных запросов (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} slow_query_log
 */
Mysql.prototype['slow_query_log'] = undefined;

/**
 * Размер кэша бинарного журнала для транзакций (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} binlog_cache_size
 */
Mysql.prototype['binlog_cache_size'] = undefined;

/**
 * Задержка синхронизации групповой фиксации бинарного журнала в микросекундах (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} binlog_group_commit_sync_delay
 */
Mysql.prototype['binlog_group_commit_sync_delay'] = undefined;

/**
 * Количество информации, записываемой в бинарный журнал при row-based репликации (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} binlog_row_image
 */
Mysql.prototype['binlog_row_image'] = undefined;

/**
 * Включение записи SQL-запросов в бинарный журнал при row-based репликации (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} binlog_rows_query_log_events
 */
Mysql.prototype['binlog_rows_query_log_events'] = undefined;

/**
 * Кодировка по умолчанию для сервера MySQL (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} character_set_server
 */
Mysql.prototype['character_set_server'] = undefined;

/**
 * Определяет автоматическое поведение TIMESTAMP без явных значений по умолчанию (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} explicit_defaults_for_timestamp
 */
Mysql.prototype['explicit_defaults_for_timestamp'] = undefined;

/**
 * Максимальная длина результата функции GROUP_CONCAT (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} group_concat_max_len
 */
Mysql.prototype['group_concat_max_len'] = undefined;

/**
 * Включение или отключение адаптивного хэш-индекса InnoDB для ускорения поиска по индексам (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} innodb_adaptive_hash_index
 */
Mysql.prototype['innodb_adaptive_hash_index'] = undefined;

/**
 * Время ожидания блокировки InnoDB перед завершением транзакции с ошибкой (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} innodb_lock_wait_timeout
 */
Mysql.prototype['innodb_lock_wait_timeout'] = undefined;

/**
 * Включение распределения памяти InnoDB между NUMA-узлами (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} innodb_numa_interleave
 */
Mysql.prototype['innodb_numa_interleave'] = undefined;

/**
 * Время ожидания данных от клиента при чтении сетевого соединения (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} net_read_timeout
 */
Mysql.prototype['net_read_timeout'] = undefined;

/**
 * Время ожидания записи данных клиенту через сетевое соединение (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} net_write_timeout
 */
Mysql.prototype['net_write_timeout'] = undefined;

/**
 * Максимальное время выполнения регулярных выражений (`mysql` | `mysql8_4`).
 * @member {String} regexp_time_limit
 */
Mysql.prototype['regexp_time_limit'] = undefined;

/**
 * Количество операций записи бинарного журнала перед принудительной синхронизацией на диск (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} sync_binlog
 */
Mysql.prototype['sync_binlog'] = undefined;

/**
 * Количество определений таблиц, хранящихся в кэше (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} table_definition_cache
 */
Mysql.prototype['table_definition_cache'] = undefined;

/**
 * Разрешение создания хранимых функций без проверки бинарной регистрации (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} log_bin_trust_function_creators
 */
Mysql.prototype['log_bin_trust_function_creators'] = undefined;

/**
 * Отключение DNS-разрешения имен клиентов при подключении к серверу (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} skip_name_resolve
 */
Mysql.prototype['skip_name_resolve'] = undefined;

/**
 * Общий размер redo log InnoDB для хранения журнала восстановления (`mysql8_4`).
 * @member {String} innodb_redo_log_capacity
 */
Mysql.prototype['innodb_redo_log_capacity'] = undefined;

/**
 * Время ожидания неактивного клиентского соединения перед закрытием (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} wait_timeout
 */
Mysql.prototype['wait_timeout'] = undefined;

/**
 * Время ожидания неактивного интерактивного соединения перед закрытием (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} interactive_timeout
 */
Mysql.prototype['interactive_timeout'] = undefined;

/**
 * Часовой пояс сервера MySQL по умолчанию (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} default-time-zone
 */
Mysql.prototype['default-time-zone'] = undefined;

/**
 * Режим строгой проверки операций в Percona XtraDB Cluster (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} pxc_strict_mode
 */
Mysql.prototype['pxc_strict_mode'] = undefined;






export default Mysql;

