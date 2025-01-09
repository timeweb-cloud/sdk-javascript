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
    instance = new TimewebCloudApi.ConfigParameters();
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

  describe('ConfigParameters', function() {
    it('should create an instance of ConfigParameters', function() {
      // uncomment below and update the code to test ConfigParameters
      //var instance = new TimewebCloudApi.ConfigParameters();
      //expect(instance).to.be.a(TimewebCloudApi.ConfigParameters);
    });

    it('should have the property autoIncrementIncrement (base name: "auto_increment_increment")', function() {
      // uncomment below and update the code to test the property autoIncrementIncrement
      //var instance = new TimewebCloudApi.ConfigParameters();
      //expect(instance).to.be();
    });

    it('should have the property autoIncrementOffset (base name: "auto_increment_offset")', function() {
      // uncomment below and update the code to test the property autoIncrementOffset
      //var instance = new TimewebCloudApi.ConfigParameters();
      //expect(instance).to.be();
    });

    it('should have the property innodbIoCapacity (base name: "innodb_io_capacity")', function() {
      // uncomment below and update the code to test the property innodbIoCapacity
      //var instance = new TimewebCloudApi.ConfigParameters();
      //expect(instance).to.be();
    });

    it('should have the property innodbPurgeThreads (base name: "innodb_purge_threads")', function() {
      // uncomment below and update the code to test the property innodbPurgeThreads
      //var instance = new TimewebCloudApi.ConfigParameters();
      //expect(instance).to.be();
    });

    it('should have the property innodbReadIoThreads (base name: "innodb_read_io_threads")', function() {
      // uncomment below and update the code to test the property innodbReadIoThreads
      //var instance = new TimewebCloudApi.ConfigParameters();
      //expect(instance).to.be();
    });

    it('should have the property innodbThreadConcurrency (base name: "innodb_thread_concurrency")', function() {
      // uncomment below and update the code to test the property innodbThreadConcurrency
      //var instance = new TimewebCloudApi.ConfigParameters();
      //expect(instance).to.be();
    });

    it('should have the property innodbWriteIoThreads (base name: "innodb_write_io_threads")', function() {
      // uncomment below and update the code to test the property innodbWriteIoThreads
      //var instance = new TimewebCloudApi.ConfigParameters();
      //expect(instance).to.be();
    });

    it('should have the property joinBufferSize (base name: "join_buffer_size")', function() {
      // uncomment below and update the code to test the property joinBufferSize
      //var instance = new TimewebCloudApi.ConfigParameters();
      //expect(instance).to.be();
    });

    it('should have the property maxAllowedPacket (base name: "max_allowed_packet")', function() {
      // uncomment below and update the code to test the property maxAllowedPacket
      //var instance = new TimewebCloudApi.ConfigParameters();
      //expect(instance).to.be();
    });

    it('should have the property maxHeapTableSize (base name: "max_heap_table_size")', function() {
      // uncomment below and update the code to test the property maxHeapTableSize
      //var instance = new TimewebCloudApi.ConfigParameters();
      //expect(instance).to.be();
    });

    it('should have the property autovacuumAnalyzeScaleFactor (base name: "autovacuum_analyze_scale_factor")', function() {
      // uncomment below and update the code to test the property autovacuumAnalyzeScaleFactor
      //var instance = new TimewebCloudApi.ConfigParameters();
      //expect(instance).to.be();
    });

    it('should have the property bgwriterDelay (base name: "bgwriter_delay")', function() {
      // uncomment below and update the code to test the property bgwriterDelay
      //var instance = new TimewebCloudApi.ConfigParameters();
      //expect(instance).to.be();
    });

    it('should have the property bgwriterLruMaxpages (base name: "bgwriter_lru_maxpages")', function() {
      // uncomment below and update the code to test the property bgwriterLruMaxpages
      //var instance = new TimewebCloudApi.ConfigParameters();
      //expect(instance).to.be();
    });

    it('should have the property deadlockTimeout (base name: "deadlock_timeout")', function() {
      // uncomment below and update the code to test the property deadlockTimeout
      //var instance = new TimewebCloudApi.ConfigParameters();
      //expect(instance).to.be();
    });

    it('should have the property ginPendingListLimit (base name: "gin_pending_list_limit")', function() {
      // uncomment below and update the code to test the property ginPendingListLimit
      //var instance = new TimewebCloudApi.ConfigParameters();
      //expect(instance).to.be();
    });

    it('should have the property idleInTransactionSessionTimeout (base name: "idle_in_transaction_session_timeout")', function() {
      // uncomment below and update the code to test the property idleInTransactionSessionTimeout
      //var instance = new TimewebCloudApi.ConfigParameters();
      //expect(instance).to.be();
    });

    it('should have the property idleSessionTimeout (base name: "idle_session_timeout")', function() {
      // uncomment below and update the code to test the property idleSessionTimeout
      //var instance = new TimewebCloudApi.ConfigParameters();
      //expect(instance).to.be();
    });

    it('should have the property joinCollapseLimit (base name: "join_collapse_limit")', function() {
      // uncomment below and update the code to test the property joinCollapseLimit
      //var instance = new TimewebCloudApi.ConfigParameters();
      //expect(instance).to.be();
    });

    it('should have the property lockTimeout (base name: "lock_timeout")', function() {
      // uncomment below and update the code to test the property lockTimeout
      //var instance = new TimewebCloudApi.ConfigParameters();
      //expect(instance).to.be();
    });

    it('should have the property maxPreparedTransactions (base name: "max_prepared_transactions")', function() {
      // uncomment below and update the code to test the property maxPreparedTransactions
      //var instance = new TimewebCloudApi.ConfigParameters();
      //expect(instance).to.be();
    });

    it('should have the property maxConnections (base name: "max_connections")', function() {
      // uncomment below and update the code to test the property maxConnections
      //var instance = new TimewebCloudApi.ConfigParameters();
      //expect(instance).to.be();
    });

    it('should have the property sharedBuffers (base name: "shared_buffers")', function() {
      // uncomment below and update the code to test the property sharedBuffers
      //var instance = new TimewebCloudApi.ConfigParameters();
      //expect(instance).to.be();
    });

    it('should have the property walBuffers (base name: "wal_buffers")', function() {
      // uncomment below and update the code to test the property walBuffers
      //var instance = new TimewebCloudApi.ConfigParameters();
      //expect(instance).to.be();
    });

    it('should have the property tempBuffers (base name: "temp_buffers")', function() {
      // uncomment below and update the code to test the property tempBuffers
      //var instance = new TimewebCloudApi.ConfigParameters();
      //expect(instance).to.be();
    });

    it('should have the property workMem (base name: "work_mem")', function() {
      // uncomment below and update the code to test the property workMem
      //var instance = new TimewebCloudApi.ConfigParameters();
      //expect(instance).to.be();
    });

    it('should have the property sqlMode (base name: "sql_mode")', function() {
      // uncomment below and update the code to test the property sqlMode
      //var instance = new TimewebCloudApi.ConfigParameters();
      //expect(instance).to.be();
    });

    it('should have the property queryCacheType (base name: "query_cache_type")', function() {
      // uncomment below and update the code to test the property queryCacheType
      //var instance = new TimewebCloudApi.ConfigParameters();
      //expect(instance).to.be();
    });

    it('should have the property queryCacheSize (base name: "query_cache_size")', function() {
      // uncomment below and update the code to test the property queryCacheSize
      //var instance = new TimewebCloudApi.ConfigParameters();
      //expect(instance).to.be();
    });

  });

}));
