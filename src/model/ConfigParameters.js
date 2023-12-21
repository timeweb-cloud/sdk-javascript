/**
 * Timeweb Cloud API
 * # Введение API Timeweb Cloud позволяет вам управлять ресурсами в облаке программным способом с использованием обычных HTTP-запросов.  Множество функций, которые доступны в панели управления Timeweb Cloud, также доступны через API, что позволяет вам автоматизировать ваши собственные сценарии.  В этой документации сперва будет описан общий дизайн и принципы работы API, а после этого конкретные конечные точки. Также будут приведены примеры запросов к ним.   ## Запросы Запросы должны выполняться по протоколу `HTTPS`, чтобы гарантировать шифрование транзакций. Поддерживаются следующие методы запроса: |Метод|Применение| |--- |--- | |GET|Извлекает данные о коллекциях и отдельных ресурсах.| |POST|Для коллекций создает новый ресурс этого типа. Также используется для выполнения действий с конкретным ресурсом.| |PUT|Обновляет существующий ресурс.| |PATCH|Некоторые ресурсы поддерживают частичное обновление, то есть обновление только части атрибутов ресурса, в этом случае вместо метода PUT будет использован PATCH.| |DELETE|Удаляет ресурс.|  Методы `POST`, `PUT` и `PATCH` могут включать объект в тело запроса с типом содержимого `application/json`.  ### Параметры в запросах Некоторые коллекции поддерживают пагинацию, поиск или сортировку в запросах. В параметрах запроса требуется передать: - `limit` — обозначает количество записей, которое необходимо вернуть  - `offset` — указывает на смещение, относительно начала списка  - `search` — позволяет указать набор символов для поиска  - `sort` — можно задать правило сортировки коллекции  ## Ответы Запросы вернут один из следующих кодов состояния ответа HTTP:  |Статус|Описание| |--- |--- | |200 OK|Действие с ресурсом было выполнено успешно.| |201 Created|Ресурс был успешно создан. При этом ресурс может быть как уже готовым к использованию, так и находиться в процессе запуска.| |204 No Content|Действие с ресурсом было выполнено успешно, и ответ не содержит дополнительной информации в теле.| |400 Bad Request|Был отправлен неверный запрос, например, в нем отсутствуют обязательные параметры и т. д. Тело ответа будет содержать дополнительную информацию об ошибке.| |401 Unauthorized|Ошибка аутентификации.| |403 Forbidden|Аутентификация прошла успешно, но недостаточно прав для выполнения действия.| |404 Not Found|Запрашиваемый ресурс не найден.| |409 Conflict|Запрос конфликтует с текущим состоянием.| |423 Locked|Ресурс из запроса заблокирован от применения к нему указанного метода.| |429 Too Many Requests|Был достигнут лимит по количеству запросов в единицу времени.| |500 Internal Server Error|При выполнении запроса произошла какая-то внутренняя ошибка. Чтобы решить эту проблему, лучше всего создать тикет в панели управления.|  ### Структура успешного ответа Все конечные точки будут возвращать данные в формате `JSON`. Ответы на `GET`-запросы будут иметь на верхнем уровне следующую структуру атрибутов:  |Название поля|Тип|Описание| |--- |--- |--- | |[entity_name]|object, object[], string[], number[], boolean|Динамическое поле, которое будет меняться в зависимости от запрашиваемого ресурса и будет содержать все атрибуты, необходимые для описания этого ресурса. Например, при запросе списка баз данных будет возвращаться поле `dbs`, а при запросе конкретного облачного сервера `server`. Для некоторых конечных точек в ответе может возвращаться сразу несколько ресурсов.| |meta|object|Опционально. Объект, который содержит вспомогательную информацию о ресурсе. Чаще всего будет встречаться при запросе коллекций и содержать поле `total`, которое будет указывать на количество элементов в коллекции.| |response_id|string|Опционально. В большинстве случаев в ответе будет содержаться уникальный идентификатор ответа в формате UUIDv4, который однозначно указывает на ваш запрос внутри нашей системы. Если вам потребуется задать вопрос нашей поддержке, приложите к вопросу этот идентификатор — так мы сможем найти ответ на него намного быстрее. Также вы можете использовать этот идентификатор, чтобы убедиться, что это новый ответ на запрос и результат не был получен из кэша.|  Пример запроса на получение списка SSH-ключей: ```     HTTP/2.0 200 OK     {       \"ssh_keys\":[           {             \"body\":\"ssh-rsa AAAAB3NzaC1sdfghjkOAsBwWhs= example@device.local\",             \"created_at\":\"2021-09-15T19:52:27Z\",             \"expired_at\":null,             \"id\":5297,             \"is_default\":false,             \"name\":\"example@device.local\",             \"used_at\":null,             \"used_by\":[]           }       ],       \"meta\":{           \"total\":1       },       \"response_id\":\"94608d15-8672-4eed-8ab6-28bd6fa3cdf7\"     } ```  ### Структура ответа с ошибкой |Название поля|Тип|Описание| |--- |--- |--- | |status_code|number|Короткий числовой идентификатор ошибки.| |error_code|string|Короткий текстовый идентификатор ошибки, который уточняет числовой идентификатор и удобен для программной обработки. Самый простой пример — это код `not_found` для ошибки 404.| |message|string, string[]|Опционально. В большинстве случаев в ответе будет содержаться человекочитаемое подробное описание ошибки или ошибок, которые помогут понять, что нужно исправить.| |response_id|string|Опционально. В большинстве случае в ответе будет содержаться уникальный идентификатор ответа в формате UUIDv4, который однозначно указывает на ваш запрос внутри нашей системы. Если вам потребуется задать вопрос нашей поддержке, приложите к вопросу этот идентификатор — так мы сможем найти ответ на него намного быстрее.|  Пример: ```     HTTP/2.0 403 Forbidden     {       \"status_code\": 403,       \"error_code\":  \"forbidden\",       \"message\":     \"You do not have access for the attempted action\",       \"response_id\": \"94608d15-8672-4eed-8ab6-28bd6fa3cdf7\"     } ```  ## Статусы ресурсов Важно учесть, что при создании большинства ресурсов внутри платформы вам будет сразу возвращен ответ от сервера со статусом `200 OK` или `201 Created` и идентификатором созданного ресурса в теле ответа, но при этом этот ресурс может быть ещё в *состоянии запуска*.  Для того чтобы понять, в каком состоянии сейчас находится ваш ресурс, мы добавили поле `status` в ответ на получение информации о ресурсе.  Список статусов будет отличаться в зависимости от типа ресурса. Увидеть поддерживаемый список статусов вы сможете в описании каждого конкретного ресурса.     ## Ограничение скорости запросов (Rate Limiting) Чтобы обеспечить стабильность для всех пользователей, Timeweb Cloud защищает API от всплесков входящего трафика, анализируя количество запросов c каждого аккаунта к каждой конечной точке.  Если ваше приложение отправляет более 20 запросов в секунду на одну конечную точку, то для этого запроса API может вернуть код состояния HTTP `429 Too Many Requests`.   ## Аутентификация Доступ к API осуществляется с помощью JWT-токена. Токенами можно управлять внутри панели управления Timeweb Cloud в разделе *API и Terraform*.  Токен необходимо передавать в заголовке каждого запроса в формате: ```   Authorization: Bearer $TIMEWEB_CLOUD_TOKEN ```  ## Формат примеров API Примеры в этой документации описаны с помощью `curl`, HTTP-клиента командной строки. На компьютерах `Linux` и `macOS` обычно по умолчанию установлен `curl`, и он доступен для загрузки на всех популярных платформах, включая `Windows`.  Каждый пример разделен на несколько строк символом `\\`, который совместим с `bash`. Типичный пример выглядит так: ```   curl -X PATCH      -H \"Content-Type: application/json\"      -H \"Authorization: Bearer $TIMEWEB_CLOUD_TOKEN\"      -d '{\"name\":\"Cute Corvus\",\"comment\":\"Development Server\"}'      \"https://api.timeweb.cloud/api/v1/dedicated/1051\" ``` - Параметр `-X` задает метод запроса. Для согласованности метод будет указан во всех примерах, даже если он явно не требуется для методов `GET`. - Строки `-H` задают требуемые HTTP-заголовки. - Примеры, для которых требуется объект JSON в теле запроса, передают требуемые данные через параметр `-d`.  Чтобы использовать приведенные примеры, не подставляя каждый раз в них свой токен, вы можете добавить токен один раз в переменные окружения в вашей консоли. Например, на `Linux` это можно сделать с помощью команды:  ``` TIMEWEB_CLOUD_TOKEN=\"token\" ```  После этого токен будет автоматически подставляться в ваши запросы.  Обратите внимание, что все значения в этой документации являются примерами. Не полагайтесь на идентификаторы операционных систем, тарифов и т.д., используемые в примерах. Используйте соответствующую конечную точку для получения значений перед созданием ресурсов.   ## Версионирование API построено согласно принципам [семантического версионирования](https://semver.org/lang/ru). Это значит, что мы гарантируем обратную совместимость всех изменений в пределах одной мажорной версии.  Мажорная версия каждой конечной точки обозначается в пути запроса, например, запрос `/api/v1/servers` указывает, что этот метод имеет версию 1.
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
 * The ConfigParameters model module.
 * @module model/ConfigParameters
 * @version 1.0.0
 */
class ConfigParameters {
    /**
     * Constructs a new <code>ConfigParameters</code>.
     * @alias module:model/ConfigParameters
     */
    constructor() { 
        
        ConfigParameters.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>ConfigParameters</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ConfigParameters} obj Optional instance to populate.
     * @return {module:model/ConfigParameters} The populated <code>ConfigParameters</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new ConfigParameters();

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
            if (data.hasOwnProperty('join_buffer_size')) {
                obj['join_buffer_size'] = ApiClient.convertToType(data['join_buffer_size'], 'String');
            }
            if (data.hasOwnProperty('max_allowed_packet')) {
                obj['max_allowed_packet'] = ApiClient.convertToType(data['max_allowed_packet'], 'String');
            }
            if (data.hasOwnProperty('max_heap_table_size')) {
                obj['max_heap_table_size'] = ApiClient.convertToType(data['max_heap_table_size'], 'String');
            }
            if (data.hasOwnProperty('autovacuum_analyze_scale_factor')) {
                obj['autovacuum_analyze_scale_factor'] = ApiClient.convertToType(data['autovacuum_analyze_scale_factor'], 'String');
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
            if (data.hasOwnProperty('idle_session_timeout')) {
                obj['idle_session_timeout'] = ApiClient.convertToType(data['idle_session_timeout'], 'String');
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
            if (data.hasOwnProperty('max_connections')) {
                obj['max_connections'] = ApiClient.convertToType(data['max_connections'], 'String');
            }
            if (data.hasOwnProperty('shared_buffers')) {
                obj['shared_buffers'] = ApiClient.convertToType(data['shared_buffers'], 'String');
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
            if (data.hasOwnProperty('sql_mode')) {
                obj['sql_mode'] = ApiClient.convertToType(data['sql_mode'], 'String');
            }
            if (data.hasOwnProperty('query_cache_type')) {
                obj['query_cache_type'] = ApiClient.convertToType(data['query_cache_type'], 'String');
            }
            if (data.hasOwnProperty('query_cache_size')) {
                obj['query_cache_size'] = ApiClient.convertToType(data['query_cache_size'], 'String');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>ConfigParameters</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>ConfigParameters</code>.
     */
    static validateJSON(data) {
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
        if (data['join_buffer_size'] && !(typeof data['join_buffer_size'] === 'string' || data['join_buffer_size'] instanceof String)) {
            throw new Error("Expected the field `join_buffer_size` to be a primitive type in the JSON string but got " + data['join_buffer_size']);
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
        if (data['autovacuum_analyze_scale_factor'] && !(typeof data['autovacuum_analyze_scale_factor'] === 'string' || data['autovacuum_analyze_scale_factor'] instanceof String)) {
            throw new Error("Expected the field `autovacuum_analyze_scale_factor` to be a primitive type in the JSON string but got " + data['autovacuum_analyze_scale_factor']);
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
        if (data['idle_session_timeout'] && !(typeof data['idle_session_timeout'] === 'string' || data['idle_session_timeout'] instanceof String)) {
            throw new Error("Expected the field `idle_session_timeout` to be a primitive type in the JSON string but got " + data['idle_session_timeout']);
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
        if (data['max_connections'] && !(typeof data['max_connections'] === 'string' || data['max_connections'] instanceof String)) {
            throw new Error("Expected the field `max_connections` to be a primitive type in the JSON string but got " + data['max_connections']);
        }
        // ensure the json data is a string
        if (data['shared_buffers'] && !(typeof data['shared_buffers'] === 'string' || data['shared_buffers'] instanceof String)) {
            throw new Error("Expected the field `shared_buffers` to be a primitive type in the JSON string but got " + data['shared_buffers']);
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

        return true;
    }


}



/**
 * Интервал между значениями столбцов с атрибутом `AUTO_INCREMENT` (`mysql5` | `mysql`).
 * @member {String} auto_increment_increment
 */
ConfigParameters.prototype['auto_increment_increment'] = undefined;

/**
 * Начальное значение для столбцов с атрибутом `AUTO_INCREMENT` (`mysql5` | `mysql`).
 * @member {String} auto_increment_offset
 */
ConfigParameters.prototype['auto_increment_offset'] = undefined;

/**
 * Количество операций ввода-вывода в секунду `IOPS` (`mysql5` | `mysql`).
 * @member {String} innodb_io_capacity
 */
ConfigParameters.prototype['innodb_io_capacity'] = undefined;

/**
 * Количество потоков ввода-вывода, используемых для операций очистки (`mysql5` | `mysql`).
 * @member {String} innodb_purge_threads
 */
ConfigParameters.prototype['innodb_purge_threads'] = undefined;

/**
 * Количество потоков ввода-вывода, используемых для операций чтения (`mysql5` | `mysql`).
 * @member {String} innodb_read_io_threads
 */
ConfigParameters.prototype['innodb_read_io_threads'] = undefined;

/**
 * Максимальное число потоков, которые могут исполняться (`mysql5` | `mysql`).
 * @member {String} innodb_thread_concurrency
 */
ConfigParameters.prototype['innodb_thread_concurrency'] = undefined;

/**
 * Количество потоков ввода-вывода, используемых для операций записи (`mysql5` | `mysql`).
 * @member {String} innodb_write_io_threads
 */
ConfigParameters.prototype['innodb_write_io_threads'] = undefined;

/**
 * Минимальный размер буфера (`mysql5` | `mysql`).
 * @member {String} join_buffer_size
 */
ConfigParameters.prototype['join_buffer_size'] = undefined;

/**
 * Максимальный размер одного пакета, строки или параметра, отправляемого функцией `mysql_stmt_send_long_data()` (`mysql5` | `mysql`).
 * @member {String} max_allowed_packet
 */
ConfigParameters.prototype['max_allowed_packet'] = undefined;

/**
 * Максимальный размер пользовательских MEMORY-таблиц (`mysql5` | `mysql`).
 * @member {String} max_heap_table_size
 */
ConfigParameters.prototype['max_heap_table_size'] = undefined;

/**
 * Доля измененных или удаленных записей в таблице, при которой процесс автоочистки выполнит команду `ANALYZE` (`postgres` | `postgres14`| `postgres15`).
 * @member {String} autovacuum_analyze_scale_factor
 */
ConfigParameters.prototype['autovacuum_analyze_scale_factor'] = undefined;

/**
 * Задержка между запусками процесса фоновой записи (`postgres` | `postgres14`| `postgres15`).
 * @member {String} bgwriter_delay
 */
ConfigParameters.prototype['bgwriter_delay'] = undefined;

/**
 * Максимальное число элементов буферного кеша (`postgres` | `postgres14`| `postgres15`).
 * @member {String} bgwriter_lru_maxpages
 */
ConfigParameters.prototype['bgwriter_lru_maxpages'] = undefined;

/**
 * Время ожидания, по истечении которого будет выполняться проверка состояния перекрестной блокировки (`postgres` | `postgres14`| `postgres15`).
 * @member {String} deadlock_timeout
 */
ConfigParameters.prototype['deadlock_timeout'] = undefined;

/**
 * Максимальный размер очереди записей индекса `GIN` (`postgres` | `postgres14`| `postgres15`).
 * @member {String} gin_pending_list_limit
 */
ConfigParameters.prototype['gin_pending_list_limit'] = undefined;

/**
 * Время простоя открытой транзакции, при превышении которого будет завершена сессия с этой транзакцией (`postgres` | `postgres14`| `postgres15`).
 * @member {String} idle_in_transaction_session_timeout
 */
ConfigParameters.prototype['idle_in_transaction_session_timeout'] = undefined;

/**
 * Время простоя не открытой транзакции, при превышении которого будет завершена сессия с этой транзакцией (`postgres` | `postgres14`| `postgres15`).
 * @member {String} idle_session_timeout
 */
ConfigParameters.prototype['idle_session_timeout'] = undefined;

/**
 * Значение количества элементов в списке `FROM` при превышении которого, планировщик будет переносить в список явные инструкции `JOIN` (`postgres` | `postgres14`| `postgres15`).
 * @member {String} join_collapse_limit
 */
ConfigParameters.prototype['join_collapse_limit'] = undefined;

/**
 * Время ожидания освобождения блокировки (`postgres` | `postgres14`| `postgres15`).
 * @member {String} lock_timeout
 */
ConfigParameters.prototype['lock_timeout'] = undefined;

/**
 * Максимальное число транзакций, которые могут одновременно находиться в подготовленном состоянии (`postgres` | `postgres14`| `postgres15`).
 * @member {String} max_prepared_transactions
 */
ConfigParameters.prototype['max_prepared_transactions'] = undefined;

/**
 * Допустимое количество соединений (`postgres` | `postgres14`| `postgres15` | `mysql`).
 * @member {String} max_connections
 */
ConfigParameters.prototype['max_connections'] = undefined;

/**
 * Устанавливает количество буферов общей памяти, используемых сервером (`postgres` | `postgres14`| `postgres15`).
 * @member {String} shared_buffers
 */
ConfigParameters.prototype['shared_buffers'] = undefined;

/**
 * Устанавливает количество буферов дисковых страниц в общей памяти для WAL (`postgres` | `postgres14`| `postgres15`).
 * @member {String} wal_buffers
 */
ConfigParameters.prototype['wal_buffers'] = undefined;

/**
 * Устанавливает максимальное количество временных буферов, используемых каждой сессией (`postgres` | `postgres14`| `postgres15`).
 * @member {String} temp_buffers
 */
ConfigParameters.prototype['temp_buffers'] = undefined;

/**
 * Устанавливает максимальное количество памяти, используемое для рабочих пространств запросов (`postgres` | `postgres14`| `postgres15`).
 * @member {String} work_mem
 */
ConfigParameters.prototype['work_mem'] = undefined;

/**
 * Устанавливает режим SQL. Можно задать несколько режимов, разделяя их запятой. (`mysql`).
 * @member {String} sql_mode
 */
ConfigParameters.prototype['sql_mode'] = undefined;

/**
 * Параметр включает или отключает работу MySQL Query Cache (`mysql`).
 * @member {String} query_cache_type
 */
ConfigParameters.prototype['query_cache_type'] = undefined;

/**
 * Размер в байтах, доступный для кэша запросов (`mysql`).
 * @member {String} query_cache_size
 */
ConfigParameters.prototype['query_cache_size'] = undefined;






export default ConfigParameters;

