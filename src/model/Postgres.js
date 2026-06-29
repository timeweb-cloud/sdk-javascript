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
 * The Postgres model module.
 * @module model/Postgres
 * @version 1.0.0
 */
class Postgres {
    /**
     * Constructs a new <code>Postgres</code>.
     * Параметры PostgreSQL (&#x60;postgres&#x60; | &#x60;postgres14&#x60; | &#x60;postgres15&#x60; | &#x60;postgres16&#x60; | &#x60;postgres17&#x60; | &#x60;postgres18&#x60;)
     * @alias module:model/Postgres
     */
    constructor() { 
        
        Postgres.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>Postgres</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Postgres} obj Optional instance to populate.
     * @return {module:model/Postgres} The populated <code>Postgres</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new Postgres();

            if (data.hasOwnProperty('max_connections')) {
                obj['max_connections'] = ApiClient.convertToType(data['max_connections'], 'String');
            }
            if (data.hasOwnProperty('autovacuum_analyze_scale_factor')) {
                obj['autovacuum_analyze_scale_factor'] = ApiClient.convertToType(data['autovacuum_analyze_scale_factor'], 'String');
            }
            if (data.hasOwnProperty('autovacuum_max_workers')) {
                obj['autovacuum_max_workers'] = ApiClient.convertToType(data['autovacuum_max_workers'], 'String');
            }
            if (data.hasOwnProperty('autovacuum_naptime')) {
                obj['autovacuum_naptime'] = ApiClient.convertToType(data['autovacuum_naptime'], 'String');
            }
            if (data.hasOwnProperty('autovacuum_vacuum_insert_scale_factor')) {
                obj['autovacuum_vacuum_insert_scale_factor'] = ApiClient.convertToType(data['autovacuum_vacuum_insert_scale_factor'], 'String');
            }
            if (data.hasOwnProperty('autovacuum_vacuum_scale_factor')) {
                obj['autovacuum_vacuum_scale_factor'] = ApiClient.convertToType(data['autovacuum_vacuum_scale_factor'], 'String');
            }
            if (data.hasOwnProperty('autovacuum_work_mem')) {
                obj['autovacuum_work_mem'] = ApiClient.convertToType(data['autovacuum_work_mem'], 'String');
            }
            if (data.hasOwnProperty('bgwriter_delay')) {
                obj['bgwriter_delay'] = ApiClient.convertToType(data['bgwriter_delay'], 'String');
            }
            if (data.hasOwnProperty('bgwriter_lru_maxpages')) {
                obj['bgwriter_lru_maxpages'] = ApiClient.convertToType(data['bgwriter_lru_maxpages'], 'String');
            }
            if (data.hasOwnProperty('deadlock_timeout')) {
                obj['deadlock_timeout'] = ApiClient.convertToType(data['deadlock_timeout'], 'String');
            }
            if (data.hasOwnProperty('gin_pending_list_limit')) {
                obj['gin_pending_list_limit'] = ApiClient.convertToType(data['gin_pending_list_limit'], 'String');
            }
            if (data.hasOwnProperty('idle_in_transaction_session_timeout')) {
                obj['idle_in_transaction_session_timeout'] = ApiClient.convertToType(data['idle_in_transaction_session_timeout'], 'String');
            }
            if (data.hasOwnProperty('join_collapse_limit')) {
                obj['join_collapse_limit'] = ApiClient.convertToType(data['join_collapse_limit'], 'String');
            }
            if (data.hasOwnProperty('lock_timeout')) {
                obj['lock_timeout'] = ApiClient.convertToType(data['lock_timeout'], 'String');
            }
            if (data.hasOwnProperty('max_prepared_transactions')) {
                obj['max_prepared_transactions'] = ApiClient.convertToType(data['max_prepared_transactions'], 'String');
            }
            if (data.hasOwnProperty('shared_buffers')) {
                obj['shared_buffers'] = ApiClient.convertToType(data['shared_buffers'], 'String');
            }
            if (data.hasOwnProperty('log_min_duration_statement')) {
                obj['log_min_duration_statement'] = ApiClient.convertToType(data['log_min_duration_statement'], 'String');
            }
            if (data.hasOwnProperty('wal_buffers')) {
                obj['wal_buffers'] = ApiClient.convertToType(data['wal_buffers'], 'String');
            }
            if (data.hasOwnProperty('temp_buffers')) {
                obj['temp_buffers'] = ApiClient.convertToType(data['temp_buffers'], 'String');
            }
            if (data.hasOwnProperty('work_mem')) {
                obj['work_mem'] = ApiClient.convertToType(data['work_mem'], 'String');
            }
            if (data.hasOwnProperty('default_transaction_isolation')) {
                obj['default_transaction_isolation'] = ApiClient.convertToType(data['default_transaction_isolation'], 'String');
            }
            if (data.hasOwnProperty('effective_cache_size')) {
                obj['effective_cache_size'] = ApiClient.convertToType(data['effective_cache_size'], 'String');
            }
            if (data.hasOwnProperty('max_wal_size')) {
                obj['max_wal_size'] = ApiClient.convertToType(data['max_wal_size'], 'String');
            }
            if (data.hasOwnProperty('min_wal_size')) {
                obj['min_wal_size'] = ApiClient.convertToType(data['min_wal_size'], 'String');
            }
            if (data.hasOwnProperty('wal_level')) {
                obj['wal_level'] = ApiClient.convertToType(data['wal_level'], 'String');
            }
            if (data.hasOwnProperty('max_replication_slots')) {
                obj['max_replication_slots'] = ApiClient.convertToType(data['max_replication_slots'], 'String');
            }
            if (data.hasOwnProperty('max_wal_senders')) {
                obj['max_wal_senders'] = ApiClient.convertToType(data['max_wal_senders'], 'String');
            }
            if (data.hasOwnProperty('max_worker_processes')) {
                obj['max_worker_processes'] = ApiClient.convertToType(data['max_worker_processes'], 'String');
            }
            if (data.hasOwnProperty('max_logical_replication_workers')) {
                obj['max_logical_replication_workers'] = ApiClient.convertToType(data['max_logical_replication_workers'], 'String');
            }
            if (data.hasOwnProperty('max_parallel_maintenance_workers')) {
                obj['max_parallel_maintenance_workers'] = ApiClient.convertToType(data['max_parallel_maintenance_workers'], 'String');
            }
            if (data.hasOwnProperty('max_parallel_workers')) {
                obj['max_parallel_workers'] = ApiClient.convertToType(data['max_parallel_workers'], 'String');
            }
            if (data.hasOwnProperty('max_parallel_workers_per_gather')) {
                obj['max_parallel_workers_per_gather'] = ApiClient.convertToType(data['max_parallel_workers_per_gather'], 'String');
            }
            if (data.hasOwnProperty('array_nulls')) {
                obj['array_nulls'] = ApiClient.convertToType(data['array_nulls'], 'String');
            }
            if (data.hasOwnProperty('backend_flush_after')) {
                obj['backend_flush_after'] = ApiClient.convertToType(data['backend_flush_after'], 'String');
            }
            if (data.hasOwnProperty('backslash_quote')) {
                obj['backslash_quote'] = ApiClient.convertToType(data['backslash_quote'], 'String');
            }
            if (data.hasOwnProperty('bgwriter_flush_after')) {
                obj['bgwriter_flush_after'] = ApiClient.convertToType(data['bgwriter_flush_after'], 'String');
            }
            if (data.hasOwnProperty('bgwriter_lru_multiplier')) {
                obj['bgwriter_lru_multiplier'] = ApiClient.convertToType(data['bgwriter_lru_multiplier'], 'String');
            }
            if (data.hasOwnProperty('default_transaction_read_only')) {
                obj['default_transaction_read_only'] = ApiClient.convertToType(data['default_transaction_read_only'], 'String');
            }
            if (data.hasOwnProperty('enable_hashagg')) {
                obj['enable_hashagg'] = ApiClient.convertToType(data['enable_hashagg'], 'String');
            }
            if (data.hasOwnProperty('enable_hashjoin')) {
                obj['enable_hashjoin'] = ApiClient.convertToType(data['enable_hashjoin'], 'String');
            }
            if (data.hasOwnProperty('enable_incremental_sort')) {
                obj['enable_incremental_sort'] = ApiClient.convertToType(data['enable_incremental_sort'], 'String');
            }
            if (data.hasOwnProperty('enable_indexscan')) {
                obj['enable_indexscan'] = ApiClient.convertToType(data['enable_indexscan'], 'String');
            }
            if (data.hasOwnProperty('enable_indexonlyscan')) {
                obj['enable_indexonlyscan'] = ApiClient.convertToType(data['enable_indexonlyscan'], 'String');
            }
            if (data.hasOwnProperty('enable_material')) {
                obj['enable_material'] = ApiClient.convertToType(data['enable_material'], 'String');
            }
            if (data.hasOwnProperty('enable_memoize')) {
                obj['enable_memoize'] = ApiClient.convertToType(data['enable_memoize'], 'String');
            }
            if (data.hasOwnProperty('enable_mergejoin')) {
                obj['enable_mergejoin'] = ApiClient.convertToType(data['enable_mergejoin'], 'String');
            }
            if (data.hasOwnProperty('enable_parallel_append')) {
                obj['enable_parallel_append'] = ApiClient.convertToType(data['enable_parallel_append'], 'String');
            }
            if (data.hasOwnProperty('enable_parallel_hash')) {
                obj['enable_parallel_hash'] = ApiClient.convertToType(data['enable_parallel_hash'], 'String');
            }
            if (data.hasOwnProperty('enable_partition_pruning')) {
                obj['enable_partition_pruning'] = ApiClient.convertToType(data['enable_partition_pruning'], 'String');
            }
            if (data.hasOwnProperty('enable_partitionwise_join')) {
                obj['enable_partitionwise_join'] = ApiClient.convertToType(data['enable_partitionwise_join'], 'String');
            }
            if (data.hasOwnProperty('enable_partitionwise_aggregate')) {
                obj['enable_partitionwise_aggregate'] = ApiClient.convertToType(data['enable_partitionwise_aggregate'], 'String');
            }
            if (data.hasOwnProperty('enable_seqscan')) {
                obj['enable_seqscan'] = ApiClient.convertToType(data['enable_seqscan'], 'String');
            }
            if (data.hasOwnProperty('enable_sort')) {
                obj['enable_sort'] = ApiClient.convertToType(data['enable_sort'], 'String');
            }
            if (data.hasOwnProperty('enable_tidscan')) {
                obj['enable_tidscan'] = ApiClient.convertToType(data['enable_tidscan'], 'String');
            }
            if (data.hasOwnProperty('exit_on_error')) {
                obj['exit_on_error'] = ApiClient.convertToType(data['exit_on_error'], 'String');
            }
            if (data.hasOwnProperty('from_collapse_limit')) {
                obj['from_collapse_limit'] = ApiClient.convertToType(data['from_collapse_limit'], 'String');
            }
            if (data.hasOwnProperty('jit')) {
                obj['jit'] = ApiClient.convertToType(data['jit'], 'String');
            }
            if (data.hasOwnProperty('plan_cache_mode')) {
                obj['plan_cache_mode'] = ApiClient.convertToType(data['plan_cache_mode'], 'String');
            }
            if (data.hasOwnProperty('quote_all_identifiers')) {
                obj['quote_all_identifiers'] = ApiClient.convertToType(data['quote_all_identifiers'], 'String');
            }
            if (data.hasOwnProperty('standard_conforming_strings')) {
                obj['standard_conforming_strings'] = ApiClient.convertToType(data['standard_conforming_strings'], 'String');
            }
            if (data.hasOwnProperty('statement_timeout')) {
                obj['statement_timeout'] = ApiClient.convertToType(data['statement_timeout'], 'String');
            }
            if (data.hasOwnProperty('timezone')) {
                obj['timezone'] = ApiClient.convertToType(data['timezone'], 'String');
            }
            if (data.hasOwnProperty('transform_null_equals')) {
                obj['transform_null_equals'] = ApiClient.convertToType(data['transform_null_equals'], 'String');
            }
            if (data.hasOwnProperty('max_locks_per_transaction')) {
                obj['max_locks_per_transaction'] = ApiClient.convertToType(data['max_locks_per_transaction'], 'String');
            }
            if (data.hasOwnProperty('autovacuum_vacuum_cost_limit')) {
                obj['autovacuum_vacuum_cost_limit'] = ApiClient.convertToType(data['autovacuum_vacuum_cost_limit'], 'String');
            }
            if (data.hasOwnProperty('checkpoint_timeout')) {
                obj['checkpoint_timeout'] = ApiClient.convertToType(data['checkpoint_timeout'], 'String');
            }
            if (data.hasOwnProperty('checkpoint_completion_target')) {
                obj['checkpoint_completion_target'] = ApiClient.convertToType(data['checkpoint_completion_target'], 'String');
            }
            if (data.hasOwnProperty('wal_compression')) {
                obj['wal_compression'] = ApiClient.convertToType(data['wal_compression'], 'String');
            }
            if (data.hasOwnProperty('random_page_cost')) {
                obj['random_page_cost'] = ApiClient.convertToType(data['random_page_cost'], 'String');
            }
            if (data.hasOwnProperty('effective_io_concurrency')) {
                obj['effective_io_concurrency'] = ApiClient.convertToType(data['effective_io_concurrency'], 'String');
            }
            if (data.hasOwnProperty('log_lock_waits')) {
                obj['log_lock_waits'] = ApiClient.convertToType(data['log_lock_waits'], 'String');
            }
            if (data.hasOwnProperty('log_temp_files')) {
                obj['log_temp_files'] = ApiClient.convertToType(data['log_temp_files'], 'String');
            }
            if (data.hasOwnProperty('track_io_timing')) {
                obj['track_io_timing'] = ApiClient.convertToType(data['track_io_timing'], 'String');
            }
            if (data.hasOwnProperty('maintenance_work_mem')) {
                obj['maintenance_work_mem'] = ApiClient.convertToType(data['maintenance_work_mem'], 'String');
            }
            if (data.hasOwnProperty('idle_session_timeout')) {
                obj['idle_session_timeout'] = ApiClient.convertToType(data['idle_session_timeout'], 'String');
            }
            if (data.hasOwnProperty('io_method')) {
                obj['io_method'] = ApiClient.convertToType(data['io_method'], 'String');
            }
            if (data.hasOwnProperty('io_workers')) {
                obj['io_workers'] = ApiClient.convertToType(data['io_workers'], 'String');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>Postgres</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>Postgres</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['max_connections'] && !(typeof data['max_connections'] === 'string' || data['max_connections'] instanceof String)) {
            throw new Error("Expected the field `max_connections` to be a primitive type in the JSON string but got " + data['max_connections']);
        }
        // ensure the json data is a string
        if (data['autovacuum_analyze_scale_factor'] && !(typeof data['autovacuum_analyze_scale_factor'] === 'string' || data['autovacuum_analyze_scale_factor'] instanceof String)) {
            throw new Error("Expected the field `autovacuum_analyze_scale_factor` to be a primitive type in the JSON string but got " + data['autovacuum_analyze_scale_factor']);
        }
        // ensure the json data is a string
        if (data['autovacuum_max_workers'] && !(typeof data['autovacuum_max_workers'] === 'string' || data['autovacuum_max_workers'] instanceof String)) {
            throw new Error("Expected the field `autovacuum_max_workers` to be a primitive type in the JSON string but got " + data['autovacuum_max_workers']);
        }
        // ensure the json data is a string
        if (data['autovacuum_naptime'] && !(typeof data['autovacuum_naptime'] === 'string' || data['autovacuum_naptime'] instanceof String)) {
            throw new Error("Expected the field `autovacuum_naptime` to be a primitive type in the JSON string but got " + data['autovacuum_naptime']);
        }
        // ensure the json data is a string
        if (data['autovacuum_vacuum_insert_scale_factor'] && !(typeof data['autovacuum_vacuum_insert_scale_factor'] === 'string' || data['autovacuum_vacuum_insert_scale_factor'] instanceof String)) {
            throw new Error("Expected the field `autovacuum_vacuum_insert_scale_factor` to be a primitive type in the JSON string but got " + data['autovacuum_vacuum_insert_scale_factor']);
        }
        // ensure the json data is a string
        if (data['autovacuum_vacuum_scale_factor'] && !(typeof data['autovacuum_vacuum_scale_factor'] === 'string' || data['autovacuum_vacuum_scale_factor'] instanceof String)) {
            throw new Error("Expected the field `autovacuum_vacuum_scale_factor` to be a primitive type in the JSON string but got " + data['autovacuum_vacuum_scale_factor']);
        }
        // ensure the json data is a string
        if (data['autovacuum_work_mem'] && !(typeof data['autovacuum_work_mem'] === 'string' || data['autovacuum_work_mem'] instanceof String)) {
            throw new Error("Expected the field `autovacuum_work_mem` to be a primitive type in the JSON string but got " + data['autovacuum_work_mem']);
        }
        // ensure the json data is a string
        if (data['bgwriter_delay'] && !(typeof data['bgwriter_delay'] === 'string' || data['bgwriter_delay'] instanceof String)) {
            throw new Error("Expected the field `bgwriter_delay` to be a primitive type in the JSON string but got " + data['bgwriter_delay']);
        }
        // ensure the json data is a string
        if (data['bgwriter_lru_maxpages'] && !(typeof data['bgwriter_lru_maxpages'] === 'string' || data['bgwriter_lru_maxpages'] instanceof String)) {
            throw new Error("Expected the field `bgwriter_lru_maxpages` to be a primitive type in the JSON string but got " + data['bgwriter_lru_maxpages']);
        }
        // ensure the json data is a string
        if (data['deadlock_timeout'] && !(typeof data['deadlock_timeout'] === 'string' || data['deadlock_timeout'] instanceof String)) {
            throw new Error("Expected the field `deadlock_timeout` to be a primitive type in the JSON string but got " + data['deadlock_timeout']);
        }
        // ensure the json data is a string
        if (data['gin_pending_list_limit'] && !(typeof data['gin_pending_list_limit'] === 'string' || data['gin_pending_list_limit'] instanceof String)) {
            throw new Error("Expected the field `gin_pending_list_limit` to be a primitive type in the JSON string but got " + data['gin_pending_list_limit']);
        }
        // ensure the json data is a string
        if (data['idle_in_transaction_session_timeout'] && !(typeof data['idle_in_transaction_session_timeout'] === 'string' || data['idle_in_transaction_session_timeout'] instanceof String)) {
            throw new Error("Expected the field `idle_in_transaction_session_timeout` to be a primitive type in the JSON string but got " + data['idle_in_transaction_session_timeout']);
        }
        // ensure the json data is a string
        if (data['join_collapse_limit'] && !(typeof data['join_collapse_limit'] === 'string' || data['join_collapse_limit'] instanceof String)) {
            throw new Error("Expected the field `join_collapse_limit` to be a primitive type in the JSON string but got " + data['join_collapse_limit']);
        }
        // ensure the json data is a string
        if (data['lock_timeout'] && !(typeof data['lock_timeout'] === 'string' || data['lock_timeout'] instanceof String)) {
            throw new Error("Expected the field `lock_timeout` to be a primitive type in the JSON string but got " + data['lock_timeout']);
        }
        // ensure the json data is a string
        if (data['max_prepared_transactions'] && !(typeof data['max_prepared_transactions'] === 'string' || data['max_prepared_transactions'] instanceof String)) {
            throw new Error("Expected the field `max_prepared_transactions` to be a primitive type in the JSON string but got " + data['max_prepared_transactions']);
        }
        // ensure the json data is a string
        if (data['shared_buffers'] && !(typeof data['shared_buffers'] === 'string' || data['shared_buffers'] instanceof String)) {
            throw new Error("Expected the field `shared_buffers` to be a primitive type in the JSON string but got " + data['shared_buffers']);
        }
        // ensure the json data is a string
        if (data['log_min_duration_statement'] && !(typeof data['log_min_duration_statement'] === 'string' || data['log_min_duration_statement'] instanceof String)) {
            throw new Error("Expected the field `log_min_duration_statement` to be a primitive type in the JSON string but got " + data['log_min_duration_statement']);
        }
        // ensure the json data is a string
        if (data['wal_buffers'] && !(typeof data['wal_buffers'] === 'string' || data['wal_buffers'] instanceof String)) {
            throw new Error("Expected the field `wal_buffers` to be a primitive type in the JSON string but got " + data['wal_buffers']);
        }
        // ensure the json data is a string
        if (data['temp_buffers'] && !(typeof data['temp_buffers'] === 'string' || data['temp_buffers'] instanceof String)) {
            throw new Error("Expected the field `temp_buffers` to be a primitive type in the JSON string but got " + data['temp_buffers']);
        }
        // ensure the json data is a string
        if (data['work_mem'] && !(typeof data['work_mem'] === 'string' || data['work_mem'] instanceof String)) {
            throw new Error("Expected the field `work_mem` to be a primitive type in the JSON string but got " + data['work_mem']);
        }
        // ensure the json data is a string
        if (data['default_transaction_isolation'] && !(typeof data['default_transaction_isolation'] === 'string' || data['default_transaction_isolation'] instanceof String)) {
            throw new Error("Expected the field `default_transaction_isolation` to be a primitive type in the JSON string but got " + data['default_transaction_isolation']);
        }
        // ensure the json data is a string
        if (data['effective_cache_size'] && !(typeof data['effective_cache_size'] === 'string' || data['effective_cache_size'] instanceof String)) {
            throw new Error("Expected the field `effective_cache_size` to be a primitive type in the JSON string but got " + data['effective_cache_size']);
        }
        // ensure the json data is a string
        if (data['max_wal_size'] && !(typeof data['max_wal_size'] === 'string' || data['max_wal_size'] instanceof String)) {
            throw new Error("Expected the field `max_wal_size` to be a primitive type in the JSON string but got " + data['max_wal_size']);
        }
        // ensure the json data is a string
        if (data['min_wal_size'] && !(typeof data['min_wal_size'] === 'string' || data['min_wal_size'] instanceof String)) {
            throw new Error("Expected the field `min_wal_size` to be a primitive type in the JSON string but got " + data['min_wal_size']);
        }
        // ensure the json data is a string
        if (data['wal_level'] && !(typeof data['wal_level'] === 'string' || data['wal_level'] instanceof String)) {
            throw new Error("Expected the field `wal_level` to be a primitive type in the JSON string but got " + data['wal_level']);
        }
        // ensure the json data is a string
        if (data['max_replication_slots'] && !(typeof data['max_replication_slots'] === 'string' || data['max_replication_slots'] instanceof String)) {
            throw new Error("Expected the field `max_replication_slots` to be a primitive type in the JSON string but got " + data['max_replication_slots']);
        }
        // ensure the json data is a string
        if (data['max_wal_senders'] && !(typeof data['max_wal_senders'] === 'string' || data['max_wal_senders'] instanceof String)) {
            throw new Error("Expected the field `max_wal_senders` to be a primitive type in the JSON string but got " + data['max_wal_senders']);
        }
        // ensure the json data is a string
        if (data['max_worker_processes'] && !(typeof data['max_worker_processes'] === 'string' || data['max_worker_processes'] instanceof String)) {
            throw new Error("Expected the field `max_worker_processes` to be a primitive type in the JSON string but got " + data['max_worker_processes']);
        }
        // ensure the json data is a string
        if (data['max_logical_replication_workers'] && !(typeof data['max_logical_replication_workers'] === 'string' || data['max_logical_replication_workers'] instanceof String)) {
            throw new Error("Expected the field `max_logical_replication_workers` to be a primitive type in the JSON string but got " + data['max_logical_replication_workers']);
        }
        // ensure the json data is a string
        if (data['max_parallel_maintenance_workers'] && !(typeof data['max_parallel_maintenance_workers'] === 'string' || data['max_parallel_maintenance_workers'] instanceof String)) {
            throw new Error("Expected the field `max_parallel_maintenance_workers` to be a primitive type in the JSON string but got " + data['max_parallel_maintenance_workers']);
        }
        // ensure the json data is a string
        if (data['max_parallel_workers'] && !(typeof data['max_parallel_workers'] === 'string' || data['max_parallel_workers'] instanceof String)) {
            throw new Error("Expected the field `max_parallel_workers` to be a primitive type in the JSON string but got " + data['max_parallel_workers']);
        }
        // ensure the json data is a string
        if (data['max_parallel_workers_per_gather'] && !(typeof data['max_parallel_workers_per_gather'] === 'string' || data['max_parallel_workers_per_gather'] instanceof String)) {
            throw new Error("Expected the field `max_parallel_workers_per_gather` to be a primitive type in the JSON string but got " + data['max_parallel_workers_per_gather']);
        }
        // ensure the json data is a string
        if (data['array_nulls'] && !(typeof data['array_nulls'] === 'string' || data['array_nulls'] instanceof String)) {
            throw new Error("Expected the field `array_nulls` to be a primitive type in the JSON string but got " + data['array_nulls']);
        }
        // ensure the json data is a string
        if (data['backend_flush_after'] && !(typeof data['backend_flush_after'] === 'string' || data['backend_flush_after'] instanceof String)) {
            throw new Error("Expected the field `backend_flush_after` to be a primitive type in the JSON string but got " + data['backend_flush_after']);
        }
        // ensure the json data is a string
        if (data['backslash_quote'] && !(typeof data['backslash_quote'] === 'string' || data['backslash_quote'] instanceof String)) {
            throw new Error("Expected the field `backslash_quote` to be a primitive type in the JSON string but got " + data['backslash_quote']);
        }
        // ensure the json data is a string
        if (data['bgwriter_flush_after'] && !(typeof data['bgwriter_flush_after'] === 'string' || data['bgwriter_flush_after'] instanceof String)) {
            throw new Error("Expected the field `bgwriter_flush_after` to be a primitive type in the JSON string but got " + data['bgwriter_flush_after']);
        }
        // ensure the json data is a string
        if (data['bgwriter_lru_multiplier'] && !(typeof data['bgwriter_lru_multiplier'] === 'string' || data['bgwriter_lru_multiplier'] instanceof String)) {
            throw new Error("Expected the field `bgwriter_lru_multiplier` to be a primitive type in the JSON string but got " + data['bgwriter_lru_multiplier']);
        }
        // ensure the json data is a string
        if (data['default_transaction_read_only'] && !(typeof data['default_transaction_read_only'] === 'string' || data['default_transaction_read_only'] instanceof String)) {
            throw new Error("Expected the field `default_transaction_read_only` to be a primitive type in the JSON string but got " + data['default_transaction_read_only']);
        }
        // ensure the json data is a string
        if (data['enable_hashagg'] && !(typeof data['enable_hashagg'] === 'string' || data['enable_hashagg'] instanceof String)) {
            throw new Error("Expected the field `enable_hashagg` to be a primitive type in the JSON string but got " + data['enable_hashagg']);
        }
        // ensure the json data is a string
        if (data['enable_hashjoin'] && !(typeof data['enable_hashjoin'] === 'string' || data['enable_hashjoin'] instanceof String)) {
            throw new Error("Expected the field `enable_hashjoin` to be a primitive type in the JSON string but got " + data['enable_hashjoin']);
        }
        // ensure the json data is a string
        if (data['enable_incremental_sort'] && !(typeof data['enable_incremental_sort'] === 'string' || data['enable_incremental_sort'] instanceof String)) {
            throw new Error("Expected the field `enable_incremental_sort` to be a primitive type in the JSON string but got " + data['enable_incremental_sort']);
        }
        // ensure the json data is a string
        if (data['enable_indexscan'] && !(typeof data['enable_indexscan'] === 'string' || data['enable_indexscan'] instanceof String)) {
            throw new Error("Expected the field `enable_indexscan` to be a primitive type in the JSON string but got " + data['enable_indexscan']);
        }
        // ensure the json data is a string
        if (data['enable_indexonlyscan'] && !(typeof data['enable_indexonlyscan'] === 'string' || data['enable_indexonlyscan'] instanceof String)) {
            throw new Error("Expected the field `enable_indexonlyscan` to be a primitive type in the JSON string but got " + data['enable_indexonlyscan']);
        }
        // ensure the json data is a string
        if (data['enable_material'] && !(typeof data['enable_material'] === 'string' || data['enable_material'] instanceof String)) {
            throw new Error("Expected the field `enable_material` to be a primitive type in the JSON string but got " + data['enable_material']);
        }
        // ensure the json data is a string
        if (data['enable_memoize'] && !(typeof data['enable_memoize'] === 'string' || data['enable_memoize'] instanceof String)) {
            throw new Error("Expected the field `enable_memoize` to be a primitive type in the JSON string but got " + data['enable_memoize']);
        }
        // ensure the json data is a string
        if (data['enable_mergejoin'] && !(typeof data['enable_mergejoin'] === 'string' || data['enable_mergejoin'] instanceof String)) {
            throw new Error("Expected the field `enable_mergejoin` to be a primitive type in the JSON string but got " + data['enable_mergejoin']);
        }
        // ensure the json data is a string
        if (data['enable_parallel_append'] && !(typeof data['enable_parallel_append'] === 'string' || data['enable_parallel_append'] instanceof String)) {
            throw new Error("Expected the field `enable_parallel_append` to be a primitive type in the JSON string but got " + data['enable_parallel_append']);
        }
        // ensure the json data is a string
        if (data['enable_parallel_hash'] && !(typeof data['enable_parallel_hash'] === 'string' || data['enable_parallel_hash'] instanceof String)) {
            throw new Error("Expected the field `enable_parallel_hash` to be a primitive type in the JSON string but got " + data['enable_parallel_hash']);
        }
        // ensure the json data is a string
        if (data['enable_partition_pruning'] && !(typeof data['enable_partition_pruning'] === 'string' || data['enable_partition_pruning'] instanceof String)) {
            throw new Error("Expected the field `enable_partition_pruning` to be a primitive type in the JSON string but got " + data['enable_partition_pruning']);
        }
        // ensure the json data is a string
        if (data['enable_partitionwise_join'] && !(typeof data['enable_partitionwise_join'] === 'string' || data['enable_partitionwise_join'] instanceof String)) {
            throw new Error("Expected the field `enable_partitionwise_join` to be a primitive type in the JSON string but got " + data['enable_partitionwise_join']);
        }
        // ensure the json data is a string
        if (data['enable_partitionwise_aggregate'] && !(typeof data['enable_partitionwise_aggregate'] === 'string' || data['enable_partitionwise_aggregate'] instanceof String)) {
            throw new Error("Expected the field `enable_partitionwise_aggregate` to be a primitive type in the JSON string but got " + data['enable_partitionwise_aggregate']);
        }
        // ensure the json data is a string
        if (data['enable_seqscan'] && !(typeof data['enable_seqscan'] === 'string' || data['enable_seqscan'] instanceof String)) {
            throw new Error("Expected the field `enable_seqscan` to be a primitive type in the JSON string but got " + data['enable_seqscan']);
        }
        // ensure the json data is a string
        if (data['enable_sort'] && !(typeof data['enable_sort'] === 'string' || data['enable_sort'] instanceof String)) {
            throw new Error("Expected the field `enable_sort` to be a primitive type in the JSON string but got " + data['enable_sort']);
        }
        // ensure the json data is a string
        if (data['enable_tidscan'] && !(typeof data['enable_tidscan'] === 'string' || data['enable_tidscan'] instanceof String)) {
            throw new Error("Expected the field `enable_tidscan` to be a primitive type in the JSON string but got " + data['enable_tidscan']);
        }
        // ensure the json data is a string
        if (data['exit_on_error'] && !(typeof data['exit_on_error'] === 'string' || data['exit_on_error'] instanceof String)) {
            throw new Error("Expected the field `exit_on_error` to be a primitive type in the JSON string but got " + data['exit_on_error']);
        }
        // ensure the json data is a string
        if (data['from_collapse_limit'] && !(typeof data['from_collapse_limit'] === 'string' || data['from_collapse_limit'] instanceof String)) {
            throw new Error("Expected the field `from_collapse_limit` to be a primitive type in the JSON string but got " + data['from_collapse_limit']);
        }
        // ensure the json data is a string
        if (data['jit'] && !(typeof data['jit'] === 'string' || data['jit'] instanceof String)) {
            throw new Error("Expected the field `jit` to be a primitive type in the JSON string but got " + data['jit']);
        }
        // ensure the json data is a string
        if (data['plan_cache_mode'] && !(typeof data['plan_cache_mode'] === 'string' || data['plan_cache_mode'] instanceof String)) {
            throw new Error("Expected the field `plan_cache_mode` to be a primitive type in the JSON string but got " + data['plan_cache_mode']);
        }
        // ensure the json data is a string
        if (data['quote_all_identifiers'] && !(typeof data['quote_all_identifiers'] === 'string' || data['quote_all_identifiers'] instanceof String)) {
            throw new Error("Expected the field `quote_all_identifiers` to be a primitive type in the JSON string but got " + data['quote_all_identifiers']);
        }
        // ensure the json data is a string
        if (data['standard_conforming_strings'] && !(typeof data['standard_conforming_strings'] === 'string' || data['standard_conforming_strings'] instanceof String)) {
            throw new Error("Expected the field `standard_conforming_strings` to be a primitive type in the JSON string but got " + data['standard_conforming_strings']);
        }
        // ensure the json data is a string
        if (data['statement_timeout'] && !(typeof data['statement_timeout'] === 'string' || data['statement_timeout'] instanceof String)) {
            throw new Error("Expected the field `statement_timeout` to be a primitive type in the JSON string but got " + data['statement_timeout']);
        }
        // ensure the json data is a string
        if (data['timezone'] && !(typeof data['timezone'] === 'string' || data['timezone'] instanceof String)) {
            throw new Error("Expected the field `timezone` to be a primitive type in the JSON string but got " + data['timezone']);
        }
        // ensure the json data is a string
        if (data['transform_null_equals'] && !(typeof data['transform_null_equals'] === 'string' || data['transform_null_equals'] instanceof String)) {
            throw new Error("Expected the field `transform_null_equals` to be a primitive type in the JSON string but got " + data['transform_null_equals']);
        }
        // ensure the json data is a string
        if (data['max_locks_per_transaction'] && !(typeof data['max_locks_per_transaction'] === 'string' || data['max_locks_per_transaction'] instanceof String)) {
            throw new Error("Expected the field `max_locks_per_transaction` to be a primitive type in the JSON string but got " + data['max_locks_per_transaction']);
        }
        // ensure the json data is a string
        if (data['autovacuum_vacuum_cost_limit'] && !(typeof data['autovacuum_vacuum_cost_limit'] === 'string' || data['autovacuum_vacuum_cost_limit'] instanceof String)) {
            throw new Error("Expected the field `autovacuum_vacuum_cost_limit` to be a primitive type in the JSON string but got " + data['autovacuum_vacuum_cost_limit']);
        }
        // ensure the json data is a string
        if (data['checkpoint_timeout'] && !(typeof data['checkpoint_timeout'] === 'string' || data['checkpoint_timeout'] instanceof String)) {
            throw new Error("Expected the field `checkpoint_timeout` to be a primitive type in the JSON string but got " + data['checkpoint_timeout']);
        }
        // ensure the json data is a string
        if (data['checkpoint_completion_target'] && !(typeof data['checkpoint_completion_target'] === 'string' || data['checkpoint_completion_target'] instanceof String)) {
            throw new Error("Expected the field `checkpoint_completion_target` to be a primitive type in the JSON string but got " + data['checkpoint_completion_target']);
        }
        // ensure the json data is a string
        if (data['wal_compression'] && !(typeof data['wal_compression'] === 'string' || data['wal_compression'] instanceof String)) {
            throw new Error("Expected the field `wal_compression` to be a primitive type in the JSON string but got " + data['wal_compression']);
        }
        // ensure the json data is a string
        if (data['random_page_cost'] && !(typeof data['random_page_cost'] === 'string' || data['random_page_cost'] instanceof String)) {
            throw new Error("Expected the field `random_page_cost` to be a primitive type in the JSON string but got " + data['random_page_cost']);
        }
        // ensure the json data is a string
        if (data['effective_io_concurrency'] && !(typeof data['effective_io_concurrency'] === 'string' || data['effective_io_concurrency'] instanceof String)) {
            throw new Error("Expected the field `effective_io_concurrency` to be a primitive type in the JSON string but got " + data['effective_io_concurrency']);
        }
        // ensure the json data is a string
        if (data['log_lock_waits'] && !(typeof data['log_lock_waits'] === 'string' || data['log_lock_waits'] instanceof String)) {
            throw new Error("Expected the field `log_lock_waits` to be a primitive type in the JSON string but got " + data['log_lock_waits']);
        }
        // ensure the json data is a string
        if (data['log_temp_files'] && !(typeof data['log_temp_files'] === 'string' || data['log_temp_files'] instanceof String)) {
            throw new Error("Expected the field `log_temp_files` to be a primitive type in the JSON string but got " + data['log_temp_files']);
        }
        // ensure the json data is a string
        if (data['track_io_timing'] && !(typeof data['track_io_timing'] === 'string' || data['track_io_timing'] instanceof String)) {
            throw new Error("Expected the field `track_io_timing` to be a primitive type in the JSON string but got " + data['track_io_timing']);
        }
        // ensure the json data is a string
        if (data['maintenance_work_mem'] && !(typeof data['maintenance_work_mem'] === 'string' || data['maintenance_work_mem'] instanceof String)) {
            throw new Error("Expected the field `maintenance_work_mem` to be a primitive type in the JSON string but got " + data['maintenance_work_mem']);
        }
        // ensure the json data is a string
        if (data['idle_session_timeout'] && !(typeof data['idle_session_timeout'] === 'string' || data['idle_session_timeout'] instanceof String)) {
            throw new Error("Expected the field `idle_session_timeout` to be a primitive type in the JSON string but got " + data['idle_session_timeout']);
        }
        // ensure the json data is a string
        if (data['io_method'] && !(typeof data['io_method'] === 'string' || data['io_method'] instanceof String)) {
            throw new Error("Expected the field `io_method` to be a primitive type in the JSON string but got " + data['io_method']);
        }
        // ensure the json data is a string
        if (data['io_workers'] && !(typeof data['io_workers'] === 'string' || data['io_workers'] instanceof String)) {
            throw new Error("Expected the field `io_workers` to be a primitive type in the JSON string but got " + data['io_workers']);
        }

        return true;
    }


}



/**
 * Максимальное количество одновременных подключений к серверу (`mysql5` | `mysql` | `mysql8_4` | `postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} max_connections
 */
Postgres.prototype['max_connections'] = undefined;

/**
 * Доля изменения строк таблицы перед запуском автоматического анализа (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} autovacuum_analyze_scale_factor
 */
Postgres.prototype['autovacuum_analyze_scale_factor'] = undefined;

/**
 * Максимальное количество процессов autovacuum, которые могут работать одновременно (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} autovacuum_max_workers
 */
Postgres.prototype['autovacuum_max_workers'] = undefined;

/**
 * Интервал между запусками процессов autovacuum (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} autovacuum_naptime
 */
Postgres.prototype['autovacuum_naptime'] = undefined;

/**
 * Доля вставленных строк перед запуском vacuum для таблиц с большим количеством вставок (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} autovacuum_vacuum_insert_scale_factor
 */
Postgres.prototype['autovacuum_vacuum_insert_scale_factor'] = undefined;

/**
 * Доля измененных или удаленных строк перед запуском autovacuum (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} autovacuum_vacuum_scale_factor
 */
Postgres.prototype['autovacuum_vacuum_scale_factor'] = undefined;

/**
 * Объем памяти, используемый одним процессом autovacuum (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} autovacuum_work_mem
 */
Postgres.prototype['autovacuum_work_mem'] = undefined;

/**
 * Интервал между циклами фонового процесса записи страниц (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} bgwriter_delay
 */
Postgres.prototype['bgwriter_delay'] = undefined;

/**
 * Максимальное количество страниц, записываемых background writer за один цикл (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} bgwriter_lru_maxpages
 */
Postgres.prototype['bgwriter_lru_maxpages'] = undefined;

/**
 * Время ожидания блокировки перед проверкой взаимной блокировки (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} deadlock_timeout
 */
Postgres.prototype['deadlock_timeout'] = undefined;

/**
 * Максимальный размер списка ожидающих вставок индекса GIN (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} gin_pending_list_limit
 */
Postgres.prototype['gin_pending_list_limit'] = undefined;

/**
 * Время ожидания неактивной транзакционной сессии перед завершением соединения (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} idle_in_transaction_session_timeout
 */
Postgres.prototype['idle_in_transaction_session_timeout'] = undefined;

/**
 * Максимальное количество таблиц в JOIN, которые планировщик может переупорядочить (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} join_collapse_limit
 */
Postgres.prototype['join_collapse_limit'] = undefined;

/**
 * Максимальное время ожидания блокировки перед отменой запроса (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} lock_timeout
 */
Postgres.prototype['lock_timeout'] = undefined;

/**
 * Максимальное количество подготовленных транзакций, которые могут существовать одновременно (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} max_prepared_transactions
 */
Postgres.prototype['max_prepared_transactions'] = undefined;

/**
 * Размер общей памяти, используемой PostgreSQL для буферного кэша (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} shared_buffers
 */
Postgres.prototype['shared_buffers'] = undefined;

/**
 * Минимальное время выполнения запроса, после которого он записывается в журнал (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} log_min_duration_statement
 */
Postgres.prototype['log_min_duration_statement'] = undefined;

/**
 * Размер памяти, используемой для буферизации WAL-записей (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} wal_buffers
 */
Postgres.prototype['wal_buffers'] = undefined;

/**
 * Максимальный объем памяти для временных таблиц каждой сессии (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} temp_buffers
 */
Postgres.prototype['temp_buffers'] = undefined;

/**
 * Объем памяти, используемый одной операцией сортировки или хеширования (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} work_mem
 */
Postgres.prototype['work_mem'] = undefined;

/**
 * Уровень изоляции транзакций по умолчанию (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} default_transaction_isolation
 */
Postgres.prototype['default_transaction_isolation'] = undefined;

/**
 * Оценка объема дискового кэша, доступного планировщику запросов (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} effective_cache_size
 */
Postgres.prototype['effective_cache_size'] = undefined;

/**
 * Максимальный размер WAL перед запуском контрольной точки (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} max_wal_size
 */
Postgres.prototype['max_wal_size'] = undefined;

/**
 * Минимальный размер WAL, который сохраняется между контрольными точками (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} min_wal_size
 */
Postgres.prototype['min_wal_size'] = undefined;

/**
 * Уровень детализации записи WAL для восстановления и репликации (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} wal_level
 */
Postgres.prototype['wal_level'] = undefined;

/**
 * Максимальное количество слотов репликации, которые могут быть созданы (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} max_replication_slots
 */
Postgres.prototype['max_replication_slots'] = undefined;

/**
 * Максимальное количество процессов отправки WAL для репликации (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} max_wal_senders
 */
Postgres.prototype['max_wal_senders'] = undefined;

/**
 * Максимальное количество фоновых процессов PostgreSQL (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} max_worker_processes
 */
Postgres.prototype['max_worker_processes'] = undefined;

/**
 * Максимальное количество процессов логической репликации (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} max_logical_replication_workers
 */
Postgres.prototype['max_logical_replication_workers'] = undefined;

/**
 * Максимальное количество параллельных процессов для операций обслуживания (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} max_parallel_maintenance_workers
 */
Postgres.prototype['max_parallel_maintenance_workers'] = undefined;

/**
 * Максимальное количество параллельных рабочих процессов для запросов (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} max_parallel_workers
 */
Postgres.prototype['max_parallel_workers'] = undefined;

/**
 * Максимальное количество параллельных рабочих процессов на один Gather-узел (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} max_parallel_workers_per_gather
 */
Postgres.prototype['max_parallel_workers_per_gather'] = undefined;

/**
 * Разрешение использования NULL в массивах PostgreSQL (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} array_nulls
 */
Postgres.prototype['array_nulls'] = undefined;

/**
 * Количество страниц, после записи которых выполняется принудительная очистка данных на диск серверным процессом (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} backend_flush_after
 */
Postgres.prototype['backend_flush_after'] = undefined;

/**
 * Управление использованием обратного слеша в строковых литералах (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} backslash_quote
 */
Postgres.prototype['backslash_quote'] = undefined;

/**
 * Количество страниц, после которого background writer выполняет очистку данных на диск (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} bgwriter_flush_after
 */
Postgres.prototype['bgwriter_flush_after'] = undefined;

/**
 * Множитель количества страниц, которые background writer пытается очистить (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} bgwriter_lru_multiplier
 */
Postgres.prototype['bgwriter_lru_multiplier'] = undefined;

/**
 * Определяет режим транзакций только для чтения по умолчанию (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} default_transaction_read_only
 */
Postgres.prototype['default_transaction_read_only'] = undefined;

/**
 * Разрешение использования Hash Aggregate планировщиком запросов (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} enable_hashagg
 */
Postgres.prototype['enable_hashagg'] = undefined;

/**
 * Разрешение использования Hash Join планировщиком запросов (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} enable_hashjoin
 */
Postgres.prototype['enable_hashjoin'] = undefined;

/**
 * Разрешение использования инкрементальной сортировки планировщиком (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} enable_incremental_sort
 */
Postgres.prototype['enable_incremental_sort'] = undefined;

/**
 * Разрешение использования обычного индексного сканирования (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} enable_indexscan
 */
Postgres.prototype['enable_indexscan'] = undefined;

/**
 * Разрешение использования index-only scan (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} enable_indexonlyscan
 */
Postgres.prototype['enable_indexonlyscan'] = undefined;

/**
 * Разрешение использования материализации промежуточных результатов запросов (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} enable_material
 */
Postgres.prototype['enable_material'] = undefined;

/**
 * Разрешение использования Memoize узлов планировщиком запросов (`postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} enable_memoize
 */
Postgres.prototype['enable_memoize'] = undefined;

/**
 * Разрешение использования Merge Join планировщиком запросов (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} enable_mergejoin
 */
Postgres.prototype['enable_mergejoin'] = undefined;

/**
 * Разрешение использования параллельного Append для запросов (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} enable_parallel_append
 */
Postgres.prototype['enable_parallel_append'] = undefined;

/**
 * Разрешение использования параллельных Hash операций (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} enable_parallel_hash
 */
Postgres.prototype['enable_parallel_hash'] = undefined;

/**
 * Разрешение удаления ненужных разделов таблицы при планировании запроса (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} enable_partition_pruning
 */
Postgres.prototype['enable_partition_pruning'] = undefined;

/**
 * Разрешение выполнения соединений между секционированными таблицами с учетом секций (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} enable_partitionwise_join
 */
Postgres.prototype['enable_partitionwise_join'] = undefined;

/**
 * Разрешение выполнения агрегатных операций отдельно для секций таблиц (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} enable_partitionwise_aggregate
 */
Postgres.prototype['enable_partitionwise_aggregate'] = undefined;

/**
 * Разрешение использования последовательного сканирования таблиц планировщиком запросов (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} enable_seqscan
 */
Postgres.prototype['enable_seqscan'] = undefined;

/**
 * Разрешение использования операций сортировки планировщиком запросов (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} enable_sort
 */
Postgres.prototype['enable_sort'] = undefined;

/**
 * Разрешение использования TID Scan для поиска строк по физическим идентификаторам (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} enable_tidscan
 */
Postgres.prototype['enable_tidscan'] = undefined;

/**
 * Завершение сессии при возникновении ошибки SQL (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} exit_on_error
 */
Postgres.prototype['exit_on_error'] = undefined;

/**
 * Максимальное количество элементов FROM, которые планировщик может объединять при оптимизации запросов (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} from_collapse_limit
 */
Postgres.prototype['from_collapse_limit'] = undefined;

/**
 * Включение JIT-компиляции для ускорения выполнения запросов (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} jit
 */
Postgres.prototype['jit'] = undefined;

/**
 * Режим использования кэша планов подготовленных запросов (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} plan_cache_mode
 */
Postgres.prototype['plan_cache_mode'] = undefined;

/**
 * Всегда заключать идентификаторы в кавычки при генерации SQL (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} quote_all_identifiers
 */
Postgres.prototype['quote_all_identifiers'] = undefined;

/**
 * Использование стандартного поведения строковых литералов SQL (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} standard_conforming_strings
 */
Postgres.prototype['standard_conforming_strings'] = undefined;

/**
 * Максимальное время выполнения SQL-запроса перед автоматической отменой (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} statement_timeout
 */
Postgres.prototype['statement_timeout'] = undefined;

/**
 * Часовой пояс сервера PostgreSQL по умолчанию (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} timezone
 */
Postgres.prototype['timezone'] = undefined;

/**
 * Преобразование выражений вида `NULL = NULL` в проверку IS NULL (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} transform_null_equals
 */
Postgres.prototype['transform_null_equals'] = undefined;

/**
 * Количество объектов, которые может блокировать одна транзакция (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} max_locks_per_transaction
 */
Postgres.prototype['max_locks_per_transaction'] = undefined;

/**
 * Лимит стоимости операций autovacuum перед приостановкой работы (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} autovacuum_vacuum_cost_limit
 */
Postgres.prototype['autovacuum_vacuum_cost_limit'] = undefined;

/**
 * Максимальный интервал времени между автоматическими контрольными точками (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} checkpoint_timeout
 */
Postgres.prototype['checkpoint_timeout'] = undefined;

/**
 * Доля интервала checkpoint, за которую PostgreSQL распределяет запись данных (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} checkpoint_completion_target
 */
Postgres.prototype['checkpoint_completion_target'] = undefined;

/**
 * Включение сжатия WAL-записей для уменьшения объема журнала (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} wal_compression
 */
Postgres.prototype['wal_compression'] = undefined;

/**
 * Оценочная стоимость случайного чтения страницы для планировщика запросов (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} random_page_cost
 */
Postgres.prototype['random_page_cost'] = undefined;

/**
 * Количество параллельных операций ввода-вывода, которые планировщик может учитывать (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} effective_io_concurrency
 */
Postgres.prototype['effective_io_concurrency'] = undefined;

/**
 * Включение записи в журнал информации об ожидании блокировок дольше deadlock_timeout (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} log_lock_waits
 */
Postgres.prototype['log_lock_waits'] = undefined;

/**
 * Минимальный размер временных файлов, при котором они записываются в журнал (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} log_temp_files
 */
Postgres.prototype['log_temp_files'] = undefined;

/**
 * Включение сбора статистики времени операций ввода-вывода (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} track_io_timing
 */
Postgres.prototype['track_io_timing'] = undefined;

/**
 * Максимальный объем памяти для операций обслуживания, таких как VACUUM и CREATE INDEX (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} maintenance_work_mem
 */
Postgres.prototype['maintenance_work_mem'] = undefined;

/**
 * Время ожидания неактивной сессии перед автоматическим завершением соединения (`postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} idle_session_timeout
 */
Postgres.prototype['idle_session_timeout'] = undefined;

/**
 * Метод выполнения операций ввода-вывода PostgreSQL (`postgres18`).
 * @member {String} io_method
 */
Postgres.prototype['io_method'] = undefined;

/**
 * Количество фоновых процессов для выполнения операций ввода-вывода (`postgres18`).
 * @member {String} io_workers
 */
Postgres.prototype['io_workers'] = undefined;






export default Postgres;

