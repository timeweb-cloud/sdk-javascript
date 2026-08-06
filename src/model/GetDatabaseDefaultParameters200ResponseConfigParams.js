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
import Mysql from './Mysql';
import Postgres from './Postgres';
import Valkey from './Valkey';

/**
 * The GetDatabaseDefaultParameters200ResponseConfigParams model module.
 * @module model/GetDatabaseDefaultParameters200ResponseConfigParams
 * @version 1.0.0
 */
class GetDatabaseDefaultParameters200ResponseConfigParams {
    /**
     * Constructs a new <code>GetDatabaseDefaultParameters200ResponseConfigParams</code>.
     * Рекомендуемые значения параметров базы данных (mysql | postgres | valkey).
     * @alias module:model/GetDatabaseDefaultParameters200ResponseConfigParams
     * @param {(module:model/Mysql|module:model/Postgres|module:model/Valkey)} instance The actual instance to initialize GetDatabaseDefaultParameters200ResponseConfigParams.
     */
    constructor(instance = null) {
        if (instance === null) {
            this.actualInstance = null;
            return;
        }
        var match = 0;
        var errorMessages = [];
        try {
            if (typeof instance === "Mysql") {
                this.actualInstance = instance;
            } else {
                // plain JS object
                // validate the object
                Mysql.validateJSON(instance); // throw an exception if no match
                // create Mysql from JS object
                this.actualInstance = Mysql.constructFromObject(instance);
            }
            match++;
        } catch(err) {
            // json data failed to deserialize into Mysql
            errorMessages.push("Failed to construct Mysql: " + err)
        }

        try {
            if (typeof instance === "Postgres") {
                this.actualInstance = instance;
            } else {
                // plain JS object
                // validate the object
                Postgres.validateJSON(instance); // throw an exception if no match
                // create Postgres from JS object
                this.actualInstance = Postgres.constructFromObject(instance);
            }
            match++;
        } catch(err) {
            // json data failed to deserialize into Postgres
            errorMessages.push("Failed to construct Postgres: " + err)
        }

        try {
            if (typeof instance === "Valkey") {
                this.actualInstance = instance;
            } else {
                // plain JS object
                // validate the object
                Valkey.validateJSON(instance); // throw an exception if no match
                // create Valkey from JS object
                this.actualInstance = Valkey.constructFromObject(instance);
            }
            match++;
        } catch(err) {
            // json data failed to deserialize into Valkey
            errorMessages.push("Failed to construct Valkey: " + err)
        }

        if (match > 1) {
            throw new Error("Multiple matches found constructing `GetDatabaseDefaultParameters200ResponseConfigParams` with oneOf schemas Mysql, Postgres, Valkey. Input: " + JSON.stringify(instance));
        } else if (match === 0) {
            this.actualInstance = null; // clear the actual instance in case there are multiple matches
            throw new Error("No match found constructing `GetDatabaseDefaultParameters200ResponseConfigParams` with oneOf schemas Mysql, Postgres, Valkey. Details: " +
                            errorMessages.join(", "));
        } else { // only 1 match
            // the input is valid
        }
    }

    /**
     * Constructs a <code>GetDatabaseDefaultParameters200ResponseConfigParams</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/GetDatabaseDefaultParameters200ResponseConfigParams} obj Optional instance to populate.
     * @return {module:model/GetDatabaseDefaultParameters200ResponseConfigParams} The populated <code>GetDatabaseDefaultParameters200ResponseConfigParams</code> instance.
     */
    static constructFromObject(data, obj) {
        return new GetDatabaseDefaultParameters200ResponseConfigParams(data);
    }

    /**
     * Gets the actual instance, which can be <code>Mysql</code>, <code>Postgres</code>, <code>Valkey</code>.
     * @return {(module:model/Mysql|module:model/Postgres|module:model/Valkey)} The actual instance.
     */
    getActualInstance() {
        return this.actualInstance;
    }

    /**
     * Sets the actual instance, which can be <code>Mysql</code>, <code>Postgres</code>, <code>Valkey</code>.
     * @param {(module:model/Mysql|module:model/Postgres|module:model/Valkey)} obj The actual instance.
     */
    setActualInstance(obj) {
       this.actualInstance = GetDatabaseDefaultParameters200ResponseConfigParams.constructFromObject(obj).getActualInstance();
    }

    /**
     * Returns the JSON representation of the actual instance.
     * @return {string}
     */
    toJSON = function(){
        return this.getActualInstance();
    }

    /**
     * Create an instance of GetDatabaseDefaultParameters200ResponseConfigParams from a JSON string.
     * @param {string} json_string JSON string.
     * @return {module:model/GetDatabaseDefaultParameters200ResponseConfigParams} An instance of GetDatabaseDefaultParameters200ResponseConfigParams.
     */
    static fromJSON = function(json_string){
        return GetDatabaseDefaultParameters200ResponseConfigParams.constructFromObject(JSON.parse(json_string));
    }
}

/**
 * Размер буфера, используемого при соединениях таблиц без индексов (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} join_buffer_size
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['join_buffer_size'] = undefined;

/**
 * Максимальное количество одновременных подключений к серверу (`mysql5` | `mysql` | `mysql8_4` | `postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} max_connections
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['max_connections'] = undefined;

/**
 * Размер буфера сортировки для операций ORDER BY и GROUP BY (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} sort_buffer_size
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['sort_buffer_size'] = undefined;

/**
 * Количество потоков, которые сервер сохраняет для повторного использования (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} thread_cache_size
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['thread_cache_size'] = undefined;

/**
 * Размер буферного пула InnoDB для хранения данных и индексов в памяти (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} innodb_buffer_pool_size
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['innodb_buffer_pool_size'] = undefined;

/**
 * Интервал между значениями столбцов с атрибутом `AUTO_INCREMENT` (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} auto_increment_increment
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['auto_increment_increment'] = undefined;

/**
 * Начальное значение для столбцов с атрибутом `AUTO_INCREMENT` (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} auto_increment_offset
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['auto_increment_offset'] = undefined;

/**
 * Количество операций ввода-вывода в секунду `IOPS`, используемых InnoDB (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} innodb_io_capacity
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['innodb_io_capacity'] = undefined;

/**
 * Количество потоков, используемых для фоновой очистки undo-записей InnoDB (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} innodb_purge_threads
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['innodb_purge_threads'] = undefined;

/**
 * Количество потоков ввода-вывода для операций чтения InnoDB (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} innodb_read_io_threads
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['innodb_read_io_threads'] = undefined;

/**
 * Ограничение количества одновременно выполняющихся потоков InnoDB (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} innodb_thread_concurrency
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['innodb_thread_concurrency'] = undefined;

/**
 * Количество потоков ввода-вывода для операций записи InnoDB (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} innodb_write_io_threads
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['innodb_write_io_threads'] = undefined;

/**
 * Размер файла журнала транзакций InnoDB redo log (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} innodb_log_file_size
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['innodb_log_file_size'] = undefined;

/**
 * Максимальный размер пакета данных, который может передаваться между клиентом и сервером (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} max_allowed_packet
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['max_allowed_packet'] = undefined;

/**
 * Максимальный размер таблиц типа MEMORY (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} max_heap_table_size
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['max_heap_table_size'] = undefined;

/**
 * Режим работы SQL сервера, определяющий поведение обработки запросов (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} sql_mode
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['sql_mode'] = undefined;

/**
 * Тип кэша запросов (`mysql5`).
 * @member {String} query_cache_type
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['query_cache_type'] = undefined;

/**
 * Объем памяти, выделяемый для кэширования результатов запросов (`mysql5`).
 * @member {String} query_cache_size
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['query_cache_size'] = undefined;

/**
 * Максимальный размер результата запроса, который может быть закэширован (`mysql5`).
 * @member {String} query_cache_limit
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['query_cache_limit'] = undefined;

/**
 * Режим записи журнала InnoDB при фиксации транзакций (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} innodb_flush_log_at_trx_commit
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['innodb_flush_log_at_trx_commit'] = undefined;

/**
 * Уровень изоляции транзакций по умолчанию (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} transaction_isolation
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['transaction_isolation'] = undefined;

/**
 * Время выполнения запроса, после которого он считается долгим и может попасть в slow query log (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} long_query_time
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['long_query_time'] = undefined;

/**
 * Максимальный размер временных таблиц в памяти (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} tmp_table_size
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['tmp_table_size'] = undefined;

/**
 * Количество открытых таблиц, которые сервер может хранить в кэше (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} table_open_cache
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['table_open_cache'] = undefined;

/**
 * Количество экземпляров кэша открытых таблиц для снижения конкуренции между потоками (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} table_open_cache_instances
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['table_open_cache_instances'] = undefined;

/**
 * Метод выполнения операций записи и синхронизации файлов InnoDB (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} innodb_flush_method
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['innodb_flush_method'] = undefined;

/**
 * Включение строгой проверки операций InnoDB (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} innodb_strict_mode
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['innodb_strict_mode'] = undefined;

/**
 * Включение журнала медленных запросов (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} slow_query_log
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['slow_query_log'] = undefined;

/**
 * Размер кэша бинарного журнала для транзакций (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} binlog_cache_size
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['binlog_cache_size'] = undefined;

/**
 * Задержка синхронизации групповой фиксации бинарного журнала в микросекундах (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} binlog_group_commit_sync_delay
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['binlog_group_commit_sync_delay'] = undefined;

/**
 * Количество информации, записываемой в бинарный журнал при row-based репликации (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} binlog_row_image
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['binlog_row_image'] = undefined;

/**
 * Включение записи SQL-запросов в бинарный журнал при row-based репликации (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} binlog_rows_query_log_events
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['binlog_rows_query_log_events'] = undefined;

/**
 * Кодировка по умолчанию для сервера MySQL (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} character_set_server
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['character_set_server'] = undefined;

/**
 * Определяет автоматическое поведение TIMESTAMP без явных значений по умолчанию (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} explicit_defaults_for_timestamp
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['explicit_defaults_for_timestamp'] = undefined;

/**
 * Максимальная длина результата функции GROUP_CONCAT (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} group_concat_max_len
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['group_concat_max_len'] = undefined;

/**
 * Включение или отключение адаптивного хэш-индекса InnoDB для ускорения поиска по индексам (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} innodb_adaptive_hash_index
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['innodb_adaptive_hash_index'] = undefined;

/**
 * Время ожидания блокировки InnoDB перед завершением транзакции с ошибкой (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} innodb_lock_wait_timeout
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['innodb_lock_wait_timeout'] = undefined;

/**
 * Включение распределения памяти InnoDB между NUMA-узлами (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} innodb_numa_interleave
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['innodb_numa_interleave'] = undefined;

/**
 * Время ожидания данных от клиента при чтении сетевого соединения (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} net_read_timeout
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['net_read_timeout'] = undefined;

/**
 * Время ожидания записи данных клиенту через сетевое соединение (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} net_write_timeout
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['net_write_timeout'] = undefined;

/**
 * Максимальное время выполнения регулярных выражений (`mysql` | `mysql8_4`).
 * @member {String} regexp_time_limit
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['regexp_time_limit'] = undefined;

/**
 * Количество операций записи бинарного журнала перед принудительной синхронизацией на диск (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} sync_binlog
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['sync_binlog'] = undefined;

/**
 * Количество определений таблиц, хранящихся в кэше (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} table_definition_cache
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['table_definition_cache'] = undefined;

/**
 * Разрешение создания хранимых функций без проверки бинарной регистрации (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} log_bin_trust_function_creators
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['log_bin_trust_function_creators'] = undefined;

/**
 * Отключение DNS-разрешения имен клиентов при подключении к серверу (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} skip_name_resolve
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['skip_name_resolve'] = undefined;

/**
 * Общий размер redo log InnoDB для хранения журнала восстановления (`mysql8_4`).
 * @member {String} innodb_redo_log_capacity
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['innodb_redo_log_capacity'] = undefined;

/**
 * Время ожидания неактивного клиентского соединения перед закрытием (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} wait_timeout
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['wait_timeout'] = undefined;

/**
 * Время ожидания неактивного интерактивного соединения перед закрытием (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} interactive_timeout
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['interactive_timeout'] = undefined;

/**
 * Часовой пояс сервера MySQL по умолчанию (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} default-time-zone
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['default-time-zone'] = undefined;

/**
 * Режим строгой проверки операций в Percona XtraDB Cluster (`mysql5` | `mysql` | `mysql8_4`).
 * @member {String} pxc_strict_mode
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['pxc_strict_mode'] = undefined;

/**
 * Доля изменения строк таблицы перед запуском автоматического анализа (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} autovacuum_analyze_scale_factor
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['autovacuum_analyze_scale_factor'] = undefined;

/**
 * Максимальное количество процессов autovacuum, которые могут работать одновременно (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} autovacuum_max_workers
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['autovacuum_max_workers'] = undefined;

/**
 * Интервал между запусками процессов autovacuum (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} autovacuum_naptime
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['autovacuum_naptime'] = undefined;

/**
 * Доля вставленных строк перед запуском vacuum для таблиц с большим количеством вставок (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} autovacuum_vacuum_insert_scale_factor
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['autovacuum_vacuum_insert_scale_factor'] = undefined;

/**
 * Доля измененных или удаленных строк перед запуском autovacuum (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} autovacuum_vacuum_scale_factor
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['autovacuum_vacuum_scale_factor'] = undefined;

/**
 * Объем памяти, используемый одним процессом autovacuum (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} autovacuum_work_mem
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['autovacuum_work_mem'] = undefined;

/**
 * Интервал между циклами фонового процесса записи страниц (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} bgwriter_delay
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['bgwriter_delay'] = undefined;

/**
 * Максимальное количество страниц, записываемых background writer за один цикл (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} bgwriter_lru_maxpages
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['bgwriter_lru_maxpages'] = undefined;

/**
 * Время ожидания блокировки перед проверкой взаимной блокировки (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} deadlock_timeout
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['deadlock_timeout'] = undefined;

/**
 * Максимальный размер списка ожидающих вставок индекса GIN (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} gin_pending_list_limit
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['gin_pending_list_limit'] = undefined;

/**
 * Время ожидания неактивной транзакционной сессии перед завершением соединения (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} idle_in_transaction_session_timeout
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['idle_in_transaction_session_timeout'] = undefined;

/**
 * Максимальное количество таблиц в JOIN, которые планировщик может переупорядочить (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} join_collapse_limit
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['join_collapse_limit'] = undefined;

/**
 * Максимальное время ожидания блокировки перед отменой запроса (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} lock_timeout
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['lock_timeout'] = undefined;

/**
 * Максимальное количество подготовленных транзакций, которые могут существовать одновременно (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} max_prepared_transactions
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['max_prepared_transactions'] = undefined;

/**
 * Размер общей памяти, используемой PostgreSQL для буферного кэша (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} shared_buffers
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['shared_buffers'] = undefined;

/**
 * Минимальное время выполнения запроса, после которого он записывается в журнал (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} log_min_duration_statement
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['log_min_duration_statement'] = undefined;

/**
 * Размер памяти, используемой для буферизации WAL-записей (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} wal_buffers
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['wal_buffers'] = undefined;

/**
 * Максимальный объем памяти для временных таблиц каждой сессии (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} temp_buffers
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['temp_buffers'] = undefined;

/**
 * Объем памяти, используемый одной операцией сортировки или хеширования (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} work_mem
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['work_mem'] = undefined;

/**
 * Уровень изоляции транзакций по умолчанию (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} default_transaction_isolation
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['default_transaction_isolation'] = undefined;

/**
 * Оценка объема дискового кэша, доступного планировщику запросов (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} effective_cache_size
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['effective_cache_size'] = undefined;

/**
 * Максимальный размер WAL перед запуском контрольной точки (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} max_wal_size
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['max_wal_size'] = undefined;

/**
 * Минимальный размер WAL, который сохраняется между контрольными точками (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} min_wal_size
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['min_wal_size'] = undefined;

/**
 * Уровень детализации записи WAL для восстановления и репликации (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} wal_level
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['wal_level'] = undefined;

/**
 * Максимальное количество слотов репликации, которые могут быть созданы (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} max_replication_slots
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['max_replication_slots'] = undefined;

/**
 * Максимальное количество процессов отправки WAL для репликации (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} max_wal_senders
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['max_wal_senders'] = undefined;

/**
 * Максимальное количество фоновых процессов PostgreSQL (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} max_worker_processes
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['max_worker_processes'] = undefined;

/**
 * Максимальное количество процессов логической репликации (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} max_logical_replication_workers
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['max_logical_replication_workers'] = undefined;

/**
 * Максимальное количество параллельных процессов для операций обслуживания (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} max_parallel_maintenance_workers
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['max_parallel_maintenance_workers'] = undefined;

/**
 * Максимальное количество параллельных рабочих процессов для запросов (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} max_parallel_workers
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['max_parallel_workers'] = undefined;

/**
 * Максимальное количество параллельных рабочих процессов на один Gather-узел (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} max_parallel_workers_per_gather
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['max_parallel_workers_per_gather'] = undefined;

/**
 * Разрешение использования NULL в массивах PostgreSQL (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} array_nulls
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['array_nulls'] = undefined;

/**
 * Количество страниц, после записи которых выполняется принудительная очистка данных на диск серверным процессом (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} backend_flush_after
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['backend_flush_after'] = undefined;

/**
 * Управление использованием обратного слеша в строковых литералах (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} backslash_quote
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['backslash_quote'] = undefined;

/**
 * Количество страниц, после которого background writer выполняет очистку данных на диск (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} bgwriter_flush_after
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['bgwriter_flush_after'] = undefined;

/**
 * Множитель количества страниц, которые background writer пытается очистить (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} bgwriter_lru_multiplier
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['bgwriter_lru_multiplier'] = undefined;

/**
 * Определяет режим транзакций только для чтения по умолчанию (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} default_transaction_read_only
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['default_transaction_read_only'] = undefined;

/**
 * Разрешение использования Hash Aggregate планировщиком запросов (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} enable_hashagg
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['enable_hashagg'] = undefined;

/**
 * Разрешение использования Hash Join планировщиком запросов (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} enable_hashjoin
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['enable_hashjoin'] = undefined;

/**
 * Разрешение использования инкрементальной сортировки планировщиком (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} enable_incremental_sort
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['enable_incremental_sort'] = undefined;

/**
 * Разрешение использования обычного индексного сканирования (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} enable_indexscan
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['enable_indexscan'] = undefined;

/**
 * Разрешение использования index-only scan (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} enable_indexonlyscan
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['enable_indexonlyscan'] = undefined;

/**
 * Разрешение использования материализации промежуточных результатов запросов (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} enable_material
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['enable_material'] = undefined;

/**
 * Разрешение использования Memoize узлов планировщиком запросов (`postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} enable_memoize
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['enable_memoize'] = undefined;

/**
 * Разрешение использования Merge Join планировщиком запросов (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} enable_mergejoin
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['enable_mergejoin'] = undefined;

/**
 * Разрешение использования параллельного Append для запросов (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} enable_parallel_append
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['enable_parallel_append'] = undefined;

/**
 * Разрешение использования параллельных Hash операций (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} enable_parallel_hash
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['enable_parallel_hash'] = undefined;

/**
 * Разрешение удаления ненужных разделов таблицы при планировании запроса (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} enable_partition_pruning
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['enable_partition_pruning'] = undefined;

/**
 * Разрешение выполнения соединений между секционированными таблицами с учетом секций (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} enable_partitionwise_join
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['enable_partitionwise_join'] = undefined;

/**
 * Разрешение выполнения агрегатных операций отдельно для секций таблиц (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} enable_partitionwise_aggregate
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['enable_partitionwise_aggregate'] = undefined;

/**
 * Разрешение использования последовательного сканирования таблиц планировщиком запросов (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} enable_seqscan
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['enable_seqscan'] = undefined;

/**
 * Разрешение использования операций сортировки планировщиком запросов (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} enable_sort
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['enable_sort'] = undefined;

/**
 * Разрешение использования TID Scan для поиска строк по физическим идентификаторам (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} enable_tidscan
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['enable_tidscan'] = undefined;

/**
 * Завершение сессии при возникновении ошибки SQL (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} exit_on_error
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['exit_on_error'] = undefined;

/**
 * Максимальное количество элементов FROM, которые планировщик может объединять при оптимизации запросов (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} from_collapse_limit
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['from_collapse_limit'] = undefined;

/**
 * Включение JIT-компиляции для ускорения выполнения запросов (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} jit
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['jit'] = undefined;

/**
 * Режим использования кэша планов подготовленных запросов (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} plan_cache_mode
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['plan_cache_mode'] = undefined;

/**
 * Всегда заключать идентификаторы в кавычки при генерации SQL (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} quote_all_identifiers
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['quote_all_identifiers'] = undefined;

/**
 * Использование стандартного поведения строковых литералов SQL (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} standard_conforming_strings
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['standard_conforming_strings'] = undefined;

/**
 * Максимальное время выполнения SQL-запроса перед автоматической отменой (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} statement_timeout
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['statement_timeout'] = undefined;

/**
 * Часовой пояс сервера PostgreSQL по умолчанию (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} timezone
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['timezone'] = undefined;

/**
 * Преобразование выражений вида `NULL = NULL` в проверку IS NULL (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} transform_null_equals
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['transform_null_equals'] = undefined;

/**
 * Количество объектов, которые может блокировать одна транзакция (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} max_locks_per_transaction
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['max_locks_per_transaction'] = undefined;

/**
 * Лимит стоимости операций autovacuum перед приостановкой работы (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} autovacuum_vacuum_cost_limit
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['autovacuum_vacuum_cost_limit'] = undefined;

/**
 * Максимальный интервал времени между автоматическими контрольными точками (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} checkpoint_timeout
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['checkpoint_timeout'] = undefined;

/**
 * Доля интервала checkpoint, за которую PostgreSQL распределяет запись данных (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} checkpoint_completion_target
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['checkpoint_completion_target'] = undefined;

/**
 * Включение сжатия WAL-записей для уменьшения объема журнала (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} wal_compression
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['wal_compression'] = undefined;

/**
 * Оценочная стоимость случайного чтения страницы для планировщика запросов (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} random_page_cost
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['random_page_cost'] = undefined;

/**
 * Количество параллельных операций ввода-вывода, которые планировщик может учитывать (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} effective_io_concurrency
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['effective_io_concurrency'] = undefined;

/**
 * Включение записи в журнал информации об ожидании блокировок дольше deadlock_timeout (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} log_lock_waits
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['log_lock_waits'] = undefined;

/**
 * Минимальный размер временных файлов, при котором они записываются в журнал (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} log_temp_files
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['log_temp_files'] = undefined;

/**
 * Включение сбора статистики времени операций ввода-вывода (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} track_io_timing
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['track_io_timing'] = undefined;

/**
 * Максимальный объем памяти для операций обслуживания, таких как VACUUM и CREATE INDEX (`postgres` | `postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} maintenance_work_mem
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['maintenance_work_mem'] = undefined;

/**
 * Время ожидания неактивной сессии перед автоматическим завершением соединения (`postgres14` | `postgres15` | `postgres16` | `postgres17` | `postgres18`).
 * @member {String} idle_session_timeout
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['idle_session_timeout'] = undefined;

/**
 * Метод выполнения операций ввода-вывода PostgreSQL (`postgres18`).
 * @member {String} io_method
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['io_method'] = undefined;

/**
 * Количество фоновых процессов для выполнения операций ввода-вывода (`postgres18`).
 * @member {String} io_workers
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['io_workers'] = undefined;

/**
 * Ограничение буфера вывода для обычных клиентских подключений. Формат: `hard-limit soft-limit soft-seconds` (`valkey` | `valkey7` | `valkey8_1` | `valkey9_1`).
 * @member {String} client-output-buffer-limit normal
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['client-output-buffer-limit normal'] = undefined;

/**
 * Настройка уведомлений о событиях пространства ключей (`valkey` | `valkey7` | `valkey8_1` | `valkey9_1`).
 * @member {String} notify-keyspace-events
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['notify-keyspace-events'] = undefined;

/**
 * Ограничение буфера вывода для клиентов pub/sub. Формат: `hard-limit soft-limit soft-seconds` (`valkey` | `valkey7` | `valkey8_1` | `valkey9_1`).
 * @member {String} client-output-buffer-limit pubsub
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['client-output-buffer-limit pubsub'] = undefined;

/**
 * Количество логических баз данных на сервере (`valkey` | `valkey7` | `valkey8_1` | `valkey9_1`).
 * @member {String} databases
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['databases'] = undefined;

/**
 * Время ожидания в секундах перед закрытием неактивного клиентского соединения. `0` — отключено (`valkey` | `valkey7` | `valkey8_1` | `valkey9_1`).
 * @member {String} timeout
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['timeout'] = undefined;

/**
 * Политика вытеснения ключей при достижении лимита памяти (`valkey` | `valkey7` | `valkey8_1` | `valkey9_1`).
 * @member {String} maxmemory-policy
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['maxmemory-policy'] = undefined;

/**
 * Минимальное время выполнения команды в микросекундах для записи в журнал медленных команд (`valkey` | `valkey7` | `valkey8_1` | `valkey9_1`).
 * @member {String} slowlog-log-slower-than
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['slowlog-log-slower-than'] = undefined;

/**
 * Максимальное количество записей, хранящихся в журнале медленных команд (`valkey` | `valkey7` | `valkey8_1` | `valkey9_1`).
 * @member {String} slowlog-max-len
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['slowlog-max-len'] = undefined;

/**
 * Условие создания снимка RDB на диск. Формат: `seconds changes` — сохранение выполняется, если за указанное время было сделано не менее указанного количества изменений (`valkey` | `valkey7` | `valkey8_1` | `valkey9_1`).
 * @member {String} save
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['save'] = undefined;

/**
 * Включение режима AOF (Append Only File) для персистентного хранения данных (`valkey` | `valkey7` | `valkey8_1` | `valkey9_1`).
 * @member {String} appendonly
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['appendonly'] = undefined;

/**
 * Режим синхронизации AOF-файла с диском: `always` — при каждой записи, `everysec` — раз в секунду, `no` — управление передаётся ОС (`valkey` | `valkey7` | `valkey8_1` | `valkey9_1`).
 * @member {String} appendfsync
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['appendfsync'] = undefined;

/**
 * Интервал проверки активности TCP-соединения в секундах. `0` — отключено (`valkey` | `valkey7` | `valkey8_1` | `valkey9_1`).
 * @member {String} tcp-keepalive
 */
GetDatabaseDefaultParameters200ResponseConfigParams.prototype['tcp-keepalive'] = undefined;


GetDatabaseDefaultParameters200ResponseConfigParams.OneOf = ["Mysql", "Postgres", "Valkey"];

export default GetDatabaseDefaultParameters200ResponseConfigParams;

