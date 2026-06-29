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

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD.
    define(['expect.js', process.cwd()+'/src/index'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    factory(require('expect.js'), require(process.cwd()+'/src/index'));
  } else {
    // Browser globals (root is window)
    factory(root.expect, root.TimewebCloudApi);
  }
}(this, function(expect, TimewebCloudApi) {
  'use strict';

  var instance;

  beforeEach(function() {
    instance = new TimewebCloudApi.ConfigParametersMysql();
  });

  var getProperty = function(object, getter, property) {
    // Use getter method if present; otherwise, get the property directly.
    if (typeof object[getter] === 'function')
      return object[getter]();
    else
      return object[property];
  }

  var setProperty = function(object, setter, property, value) {
    // Use setter method if present; otherwise, set the property directly.
    if (typeof object[setter] === 'function')
      object[setter](value);
    else
      object[property] = value;
  }

  describe('ConfigParametersMysql', function() {
    it('should create an instance of ConfigParametersMysql', function() {
      // uncomment below and update the code to test ConfigParametersMysql
      //var instance = new TimewebCloudApi.ConfigParametersMysql();
      //expect(instance).to.be.a(TimewebCloudApi.ConfigParametersMysql);
    });

    it('should have the property joinBufferSize (base name: "join_buffer_size")', function() {
      // uncomment below and update the code to test the property joinBufferSize
      //var instance = new TimewebCloudApi.ConfigParametersMysql();
      //expect(instance).to.be();
    });

    it('should have the property maxConnections (base name: "max_connections")', function() {
      // uncomment below and update the code to test the property maxConnections
      //var instance = new TimewebCloudApi.ConfigParametersMysql();
      //expect(instance).to.be();
    });

    it('should have the property sortBufferSize (base name: "sort_buffer_size")', function() {
      // uncomment below and update the code to test the property sortBufferSize
      //var instance = new TimewebCloudApi.ConfigParametersMysql();
      //expect(instance).to.be();
    });

    it('should have the property threadCacheSize (base name: "thread_cache_size")', function() {
      // uncomment below and update the code to test the property threadCacheSize
      //var instance = new TimewebCloudApi.ConfigParametersMysql();
      //expect(instance).to.be();
    });

    it('should have the property innodbBufferPoolSize (base name: "innodb_buffer_pool_size")', function() {
      // uncomment below and update the code to test the property innodbBufferPoolSize
      //var instance = new TimewebCloudApi.ConfigParametersMysql();
      //expect(instance).to.be();
    });

    it('should have the property autoIncrementIncrement (base name: "auto_increment_increment")', function() {
      // uncomment below and update the code to test the property autoIncrementIncrement
      //var instance = new TimewebCloudApi.ConfigParametersMysql();
      //expect(instance).to.be();
    });

    it('should have the property autoIncrementOffset (base name: "auto_increment_offset")', function() {
      // uncomment below and update the code to test the property autoIncrementOffset
      //var instance = new TimewebCloudApi.ConfigParametersMysql();
      //expect(instance).to.be();
    });

    it('should have the property innodbIoCapacity (base name: "innodb_io_capacity")', function() {
      // uncomment below and update the code to test the property innodbIoCapacity
      //var instance = new TimewebCloudApi.ConfigParametersMysql();
      //expect(instance).to.be();
    });

    it('should have the property innodbPurgeThreads (base name: "innodb_purge_threads")', function() {
      // uncomment below and update the code to test the property innodbPurgeThreads
      //var instance = new TimewebCloudApi.ConfigParametersMysql();
      //expect(instance).to.be();
    });

    it('should have the property innodbReadIoThreads (base name: "innodb_read_io_threads")', function() {
      // uncomment below and update the code to test the property innodbReadIoThreads
      //var instance = new TimewebCloudApi.ConfigParametersMysql();
      //expect(instance).to.be();
    });

    it('should have the property innodbThreadConcurrency (base name: "innodb_thread_concurrency")', function() {
      // uncomment below and update the code to test the property innodbThreadConcurrency
      //var instance = new TimewebCloudApi.ConfigParametersMysql();
      //expect(instance).to.be();
    });

    it('should have the property innodbWriteIoThreads (base name: "innodb_write_io_threads")', function() {
      // uncomment below and update the code to test the property innodbWriteIoThreads
      //var instance = new TimewebCloudApi.ConfigParametersMysql();
      //expect(instance).to.be();
    });

    it('should have the property innodbLogFileSize (base name: "innodb_log_file_size")', function() {
      // uncomment below and update the code to test the property innodbLogFileSize
      //var instance = new TimewebCloudApi.ConfigParametersMysql();
      //expect(instance).to.be();
    });

    it('should have the property maxAllowedPacket (base name: "max_allowed_packet")', function() {
      // uncomment below and update the code to test the property maxAllowedPacket
      //var instance = new TimewebCloudApi.ConfigParametersMysql();
      //expect(instance).to.be();
    });

    it('should have the property maxHeapTableSize (base name: "max_heap_table_size")', function() {
      // uncomment below and update the code to test the property maxHeapTableSize
      //var instance = new TimewebCloudApi.ConfigParametersMysql();
      //expect(instance).to.be();
    });

    it('should have the property sqlMode (base name: "sql_mode")', function() {
      // uncomment below and update the code to test the property sqlMode
      //var instance = new TimewebCloudApi.ConfigParametersMysql();
      //expect(instance).to.be();
    });

    it('should have the property queryCacheType (base name: "query_cache_type")', function() {
      // uncomment below and update the code to test the property queryCacheType
      //var instance = new TimewebCloudApi.ConfigParametersMysql();
      //expect(instance).to.be();
    });

    it('should have the property queryCacheSize (base name: "query_cache_size")', function() {
      // uncomment below and update the code to test the property queryCacheSize
      //var instance = new TimewebCloudApi.ConfigParametersMysql();
      //expect(instance).to.be();
    });

    it('should have the property innodbFlushLogAtTrxCommit (base name: "innodb_flush_log_at_trx_commit")', function() {
      // uncomment below and update the code to test the property innodbFlushLogAtTrxCommit
      //var instance = new TimewebCloudApi.ConfigParametersMysql();
      //expect(instance).to.be();
    });

    it('should have the property transactionIsolation (base name: "transaction_isolation")', function() {
      // uncomment below and update the code to test the property transactionIsolation
      //var instance = new TimewebCloudApi.ConfigParametersMysql();
      //expect(instance).to.be();
    });

    it('should have the property longQueryTime (base name: "long_query_time")', function() {
      // uncomment below and update the code to test the property longQueryTime
      //var instance = new TimewebCloudApi.ConfigParametersMysql();
      //expect(instance).to.be();
    });

    it('should have the property tmpTableSize (base name: "tmp_table_size")', function() {
      // uncomment below and update the code to test the property tmpTableSize
      //var instance = new TimewebCloudApi.ConfigParametersMysql();
      //expect(instance).to.be();
    });

    it('should have the property tableOpenCache (base name: "table_open_cache")', function() {
      // uncomment below and update the code to test the property tableOpenCache
      //var instance = new TimewebCloudApi.ConfigParametersMysql();
      //expect(instance).to.be();
    });

    it('should have the property tableOpenCacheInstances (base name: "table_open_cache_instances")', function() {
      // uncomment below and update the code to test the property tableOpenCacheInstances
      //var instance = new TimewebCloudApi.ConfigParametersMysql();
      //expect(instance).to.be();
    });

    it('should have the property innodbFlushMethod (base name: "innodb_flush_method")', function() {
      // uncomment below and update the code to test the property innodbFlushMethod
      //var instance = new TimewebCloudApi.ConfigParametersMysql();
      //expect(instance).to.be();
    });

    it('should have the property innodbStrictMode (base name: "innodb_strict_mode")', function() {
      // uncomment below and update the code to test the property innodbStrictMode
      //var instance = new TimewebCloudApi.ConfigParametersMysql();
      //expect(instance).to.be();
    });

    it('should have the property slowQueryLog (base name: "slow_query_log")', function() {
      // uncomment below and update the code to test the property slowQueryLog
      //var instance = new TimewebCloudApi.ConfigParametersMysql();
      //expect(instance).to.be();
    });

    it('should have the property binlogCacheSize (base name: "binlog_cache_size")', function() {
      // uncomment below and update the code to test the property binlogCacheSize
      //var instance = new TimewebCloudApi.ConfigParametersMysql();
      //expect(instance).to.be();
    });

    it('should have the property binlogGroupCommitSyncDelay (base name: "binlog_group_commit_sync_delay")', function() {
      // uncomment below and update the code to test the property binlogGroupCommitSyncDelay
      //var instance = new TimewebCloudApi.ConfigParametersMysql();
      //expect(instance).to.be();
    });

    it('should have the property binlogRowImage (base name: "binlog_row_image")', function() {
      // uncomment below and update the code to test the property binlogRowImage
      //var instance = new TimewebCloudApi.ConfigParametersMysql();
      //expect(instance).to.be();
    });

    it('should have the property binlogRowsQueryLogEvents (base name: "binlog_rows_query_log_events")', function() {
      // uncomment below and update the code to test the property binlogRowsQueryLogEvents
      //var instance = new TimewebCloudApi.ConfigParametersMysql();
      //expect(instance).to.be();
    });

    it('should have the property characterSetServer (base name: "character_set_server")', function() {
      // uncomment below and update the code to test the property characterSetServer
      //var instance = new TimewebCloudApi.ConfigParametersMysql();
      //expect(instance).to.be();
    });

    it('should have the property explicitDefaultsForTimestamp (base name: "explicit_defaults_for_timestamp")', function() {
      // uncomment below and update the code to test the property explicitDefaultsForTimestamp
      //var instance = new TimewebCloudApi.ConfigParametersMysql();
      //expect(instance).to.be();
    });

    it('should have the property groupConcatMaxLen (base name: "group_concat_max_len")', function() {
      // uncomment below and update the code to test the property groupConcatMaxLen
      //var instance = new TimewebCloudApi.ConfigParametersMysql();
      //expect(instance).to.be();
    });

    it('should have the property innodbAdaptiveHashIndex (base name: "innodb_adaptive_hash_index")', function() {
      // uncomment below and update the code to test the property innodbAdaptiveHashIndex
      //var instance = new TimewebCloudApi.ConfigParametersMysql();
      //expect(instance).to.be();
    });

    it('should have the property innodbLockWaitTimeout (base name: "innodb_lock_wait_timeout")', function() {
      // uncomment below and update the code to test the property innodbLockWaitTimeout
      //var instance = new TimewebCloudApi.ConfigParametersMysql();
      //expect(instance).to.be();
    });

    it('should have the property innodbNumaInterleave (base name: "innodb_numa_interleave")', function() {
      // uncomment below and update the code to test the property innodbNumaInterleave
      //var instance = new TimewebCloudApi.ConfigParametersMysql();
      //expect(instance).to.be();
    });

    it('should have the property netReadTimeout (base name: "net_read_timeout")', function() {
      // uncomment below and update the code to test the property netReadTimeout
      //var instance = new TimewebCloudApi.ConfigParametersMysql();
      //expect(instance).to.be();
    });

    it('should have the property netWriteTimeout (base name: "net_write_timeout")', function() {
      // uncomment below and update the code to test the property netWriteTimeout
      //var instance = new TimewebCloudApi.ConfigParametersMysql();
      //expect(instance).to.be();
    });

    it('should have the property regexpTimeLimit (base name: "regexp_time_limit")', function() {
      // uncomment below and update the code to test the property regexpTimeLimit
      //var instance = new TimewebCloudApi.ConfigParametersMysql();
      //expect(instance).to.be();
    });

    it('should have the property syncBinlog (base name: "sync_binlog")', function() {
      // uncomment below and update the code to test the property syncBinlog
      //var instance = new TimewebCloudApi.ConfigParametersMysql();
      //expect(instance).to.be();
    });

    it('should have the property tableDefinitionCache (base name: "table_definition_cache")', function() {
      // uncomment below and update the code to test the property tableDefinitionCache
      //var instance = new TimewebCloudApi.ConfigParametersMysql();
      //expect(instance).to.be();
    });

    it('should have the property logBinTrustFunctionCreators (base name: "log_bin_trust_function_creators")', function() {
      // uncomment below and update the code to test the property logBinTrustFunctionCreators
      //var instance = new TimewebCloudApi.ConfigParametersMysql();
      //expect(instance).to.be();
    });

    it('should have the property skipNameResolve (base name: "skip_name_resolve")', function() {
      // uncomment below and update the code to test the property skipNameResolve
      //var instance = new TimewebCloudApi.ConfigParametersMysql();
      //expect(instance).to.be();
    });

    it('should have the property innodbRedoLogCapacity (base name: "innodb_redo_log_capacity")', function() {
      // uncomment below and update the code to test the property innodbRedoLogCapacity
      //var instance = new TimewebCloudApi.ConfigParametersMysql();
      //expect(instance).to.be();
    });

    it('should have the property waitTimeout (base name: "wait_timeout")', function() {
      // uncomment below and update the code to test the property waitTimeout
      //var instance = new TimewebCloudApi.ConfigParametersMysql();
      //expect(instance).to.be();
    });

    it('should have the property interactiveTimeout (base name: "interactive_timeout")', function() {
      // uncomment below and update the code to test the property interactiveTimeout
      //var instance = new TimewebCloudApi.ConfigParametersMysql();
      //expect(instance).to.be();
    });

    it('should have the property defaultTimeZone (base name: "default-time-zone")', function() {
      // uncomment below and update the code to test the property defaultTimeZone
      //var instance = new TimewebCloudApi.ConfigParametersMysql();
      //expect(instance).to.be();
    });

    it('should have the property pxcStrictMode (base name: "pxc_strict_mode")', function() {
      // uncomment below and update the code to test the property pxcStrictMode
      //var instance = new TimewebCloudApi.ConfigParametersMysql();
      //expect(instance).to.be();
    });

  });

}));
