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
    instance = new TimewebCloudApi.ConfigParametersPostgres();
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

  describe('ConfigParametersPostgres', function() {
    it('should create an instance of ConfigParametersPostgres', function() {
      // uncomment below and update the code to test ConfigParametersPostgres
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be.a(TimewebCloudApi.ConfigParametersPostgres);
    });

    it('should have the property maxConnections (base name: "max_connections")', function() {
      // uncomment below and update the code to test the property maxConnections
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property autovacuumAnalyzeScaleFactor (base name: "autovacuum_analyze_scale_factor")', function() {
      // uncomment below and update the code to test the property autovacuumAnalyzeScaleFactor
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property autovacuumMaxWorkers (base name: "autovacuum_max_workers")', function() {
      // uncomment below and update the code to test the property autovacuumMaxWorkers
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property autovacuumNaptime (base name: "autovacuum_naptime")', function() {
      // uncomment below and update the code to test the property autovacuumNaptime
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property autovacuumVacuumInsertScaleFactor (base name: "autovacuum_vacuum_insert_scale_factor")', function() {
      // uncomment below and update the code to test the property autovacuumVacuumInsertScaleFactor
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property autovacuumVacuumScaleFactor (base name: "autovacuum_vacuum_scale_factor")', function() {
      // uncomment below and update the code to test the property autovacuumVacuumScaleFactor
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property autovacuumWorkMem (base name: "autovacuum_work_mem")', function() {
      // uncomment below and update the code to test the property autovacuumWorkMem
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property bgwriterDelay (base name: "bgwriter_delay")', function() {
      // uncomment below and update the code to test the property bgwriterDelay
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property bgwriterLruMaxpages (base name: "bgwriter_lru_maxpages")', function() {
      // uncomment below and update the code to test the property bgwriterLruMaxpages
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property deadlockTimeout (base name: "deadlock_timeout")', function() {
      // uncomment below and update the code to test the property deadlockTimeout
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property ginPendingListLimit (base name: "gin_pending_list_limit")', function() {
      // uncomment below and update the code to test the property ginPendingListLimit
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property idleInTransactionSessionTimeout (base name: "idle_in_transaction_session_timeout")', function() {
      // uncomment below and update the code to test the property idleInTransactionSessionTimeout
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property joinCollapseLimit (base name: "join_collapse_limit")', function() {
      // uncomment below and update the code to test the property joinCollapseLimit
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property lockTimeout (base name: "lock_timeout")', function() {
      // uncomment below and update the code to test the property lockTimeout
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property maxPreparedTransactions (base name: "max_prepared_transactions")', function() {
      // uncomment below and update the code to test the property maxPreparedTransactions
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property sharedBuffers (base name: "shared_buffers")', function() {
      // uncomment below and update the code to test the property sharedBuffers
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property logMinDurationStatement (base name: "log_min_duration_statement")', function() {
      // uncomment below and update the code to test the property logMinDurationStatement
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property walBuffers (base name: "wal_buffers")', function() {
      // uncomment below and update the code to test the property walBuffers
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property tempBuffers (base name: "temp_buffers")', function() {
      // uncomment below and update the code to test the property tempBuffers
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property workMem (base name: "work_mem")', function() {
      // uncomment below and update the code to test the property workMem
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property defaultTransactionIsolation (base name: "default_transaction_isolation")', function() {
      // uncomment below and update the code to test the property defaultTransactionIsolation
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property effectiveCacheSize (base name: "effective_cache_size")', function() {
      // uncomment below and update the code to test the property effectiveCacheSize
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property maxWalSize (base name: "max_wal_size")', function() {
      // uncomment below and update the code to test the property maxWalSize
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property minWalSize (base name: "min_wal_size")', function() {
      // uncomment below and update the code to test the property minWalSize
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property walLevel (base name: "wal_level")', function() {
      // uncomment below and update the code to test the property walLevel
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property maxReplicationSlots (base name: "max_replication_slots")', function() {
      // uncomment below and update the code to test the property maxReplicationSlots
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property maxWalSenders (base name: "max_wal_senders")', function() {
      // uncomment below and update the code to test the property maxWalSenders
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property maxWorkerProcesses (base name: "max_worker_processes")', function() {
      // uncomment below and update the code to test the property maxWorkerProcesses
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property maxLogicalReplicationWorkers (base name: "max_logical_replication_workers")', function() {
      // uncomment below and update the code to test the property maxLogicalReplicationWorkers
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property maxParallelMaintenanceWorkers (base name: "max_parallel_maintenance_workers")', function() {
      // uncomment below and update the code to test the property maxParallelMaintenanceWorkers
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property maxParallelWorkers (base name: "max_parallel_workers")', function() {
      // uncomment below and update the code to test the property maxParallelWorkers
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property maxParallelWorkersPerGather (base name: "max_parallel_workers_per_gather")', function() {
      // uncomment below and update the code to test the property maxParallelWorkersPerGather
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property arrayNulls (base name: "array_nulls")', function() {
      // uncomment below and update the code to test the property arrayNulls
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property backendFlushAfter (base name: "backend_flush_after")', function() {
      // uncomment below and update the code to test the property backendFlushAfter
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property backslashQuote (base name: "backslash_quote")', function() {
      // uncomment below and update the code to test the property backslashQuote
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property bgwriterFlushAfter (base name: "bgwriter_flush_after")', function() {
      // uncomment below and update the code to test the property bgwriterFlushAfter
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property bgwriterLruMultiplier (base name: "bgwriter_lru_multiplier")', function() {
      // uncomment below and update the code to test the property bgwriterLruMultiplier
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property defaultTransactionReadOnly (base name: "default_transaction_read_only")', function() {
      // uncomment below and update the code to test the property defaultTransactionReadOnly
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property enableHashagg (base name: "enable_hashagg")', function() {
      // uncomment below and update the code to test the property enableHashagg
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property enableHashjoin (base name: "enable_hashjoin")', function() {
      // uncomment below and update the code to test the property enableHashjoin
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property enableIncrementalSort (base name: "enable_incremental_sort")', function() {
      // uncomment below and update the code to test the property enableIncrementalSort
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property enableIndexscan (base name: "enable_indexscan")', function() {
      // uncomment below and update the code to test the property enableIndexscan
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property enableIndexonlyscan (base name: "enable_indexonlyscan")', function() {
      // uncomment below and update the code to test the property enableIndexonlyscan
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property enableMaterial (base name: "enable_material")', function() {
      // uncomment below and update the code to test the property enableMaterial
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property enableMemoize (base name: "enable_memoize")', function() {
      // uncomment below and update the code to test the property enableMemoize
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property enableMergejoin (base name: "enable_mergejoin")', function() {
      // uncomment below and update the code to test the property enableMergejoin
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property enableParallelAppend (base name: "enable_parallel_append")', function() {
      // uncomment below and update the code to test the property enableParallelAppend
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property enableParallelHash (base name: "enable_parallel_hash")', function() {
      // uncomment below and update the code to test the property enableParallelHash
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property enablePartitionPruning (base name: "enable_partition_pruning")', function() {
      // uncomment below and update the code to test the property enablePartitionPruning
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property enablePartitionwiseJoin (base name: "enable_partitionwise_join")', function() {
      // uncomment below and update the code to test the property enablePartitionwiseJoin
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property enablePartitionwiseAggregate (base name: "enable_partitionwise_aggregate")', function() {
      // uncomment below and update the code to test the property enablePartitionwiseAggregate
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property enableSeqscan (base name: "enable_seqscan")', function() {
      // uncomment below and update the code to test the property enableSeqscan
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property enableSort (base name: "enable_sort")', function() {
      // uncomment below and update the code to test the property enableSort
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property enableTidscan (base name: "enable_tidscan")', function() {
      // uncomment below and update the code to test the property enableTidscan
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property exitOnError (base name: "exit_on_error")', function() {
      // uncomment below and update the code to test the property exitOnError
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property fromCollapseLimit (base name: "from_collapse_limit")', function() {
      // uncomment below and update the code to test the property fromCollapseLimit
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property jit (base name: "jit")', function() {
      // uncomment below and update the code to test the property jit
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property planCacheMode (base name: "plan_cache_mode")', function() {
      // uncomment below and update the code to test the property planCacheMode
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property quoteAllIdentifiers (base name: "quote_all_identifiers")', function() {
      // uncomment below and update the code to test the property quoteAllIdentifiers
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property standardConformingStrings (base name: "standard_conforming_strings")', function() {
      // uncomment below and update the code to test the property standardConformingStrings
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property statementTimeout (base name: "statement_timeout")', function() {
      // uncomment below and update the code to test the property statementTimeout
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property timezone (base name: "timezone")', function() {
      // uncomment below and update the code to test the property timezone
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property transformNullEquals (base name: "transform_null_equals")', function() {
      // uncomment below and update the code to test the property transformNullEquals
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property maxLocksPerTransaction (base name: "max_locks_per_transaction")', function() {
      // uncomment below and update the code to test the property maxLocksPerTransaction
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property autovacuumVacuumCostLimit (base name: "autovacuum_vacuum_cost_limit")', function() {
      // uncomment below and update the code to test the property autovacuumVacuumCostLimit
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property checkpointTimeout (base name: "checkpoint_timeout")', function() {
      // uncomment below and update the code to test the property checkpointTimeout
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property checkpointCompletionTarget (base name: "checkpoint_completion_target")', function() {
      // uncomment below and update the code to test the property checkpointCompletionTarget
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property walCompression (base name: "wal_compression")', function() {
      // uncomment below and update the code to test the property walCompression
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property randomPageCost (base name: "random_page_cost")', function() {
      // uncomment below and update the code to test the property randomPageCost
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property effectiveIoConcurrency (base name: "effective_io_concurrency")', function() {
      // uncomment below and update the code to test the property effectiveIoConcurrency
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property logLockWaits (base name: "log_lock_waits")', function() {
      // uncomment below and update the code to test the property logLockWaits
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property logTempFiles (base name: "log_temp_files")', function() {
      // uncomment below and update the code to test the property logTempFiles
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property trackIoTiming (base name: "track_io_timing")', function() {
      // uncomment below and update the code to test the property trackIoTiming
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property maintenanceWorkMem (base name: "maintenance_work_mem")', function() {
      // uncomment below and update the code to test the property maintenanceWorkMem
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property idleSessionTimeout (base name: "idle_session_timeout")', function() {
      // uncomment below and update the code to test the property idleSessionTimeout
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property ioMethod (base name: "io_method")', function() {
      // uncomment below and update the code to test the property ioMethod
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

    it('should have the property ioWorkers (base name: "io_workers")', function() {
      // uncomment below and update the code to test the property ioWorkers
      //var instance = new TimewebCloudApi.ConfigParametersPostgres();
      //expect(instance).to.be();
    });

  });

}));
