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
 * The DbParametersByType model module.
 * @module model/DbParametersByType
 * @version 1.0.0
 */
class DbParametersByType {
    /**
     * Constructs a new <code>DbParametersByType</code>.
     * Имена параметров конфигурации, доступных для каждого типа кластера базы данных. Ключ объекта — тип кластера (значение поля &#x60;type&#x60; при создании кластера), значение — массив имён параметров, которые можно передать в &#x60;config_parameters&#x60; для кластера этого типа. Наборы параметров различаются между версиями одной СУБД. Значения параметров этот метод не возвращает — рекомендуемые значения можно получить в &#x60;GET /api/v1/dbs/default-parameters&#x60;.
     * @alias module:model/DbParametersByType
     * @param mysql5 {Array.<String>} Параметры, доступные для кластеров типа `mysql5`.
     * @param mysql {Array.<String>} Параметры, доступные для кластеров типа `mysql`.
     * @param mysql84 {Array.<String>} Параметры, доступные для кластеров типа `mysql8_4`.
     * @param postgres {Array.<String>} Параметры, доступные для кластеров типа `postgres` (PostgreSQL 13).
     * @param postgres14 {Array.<String>} Параметры, доступные для кластеров типа `postgres14`.
     * @param postgres15 {Array.<String>} Параметры, доступные для кластеров типа `postgres15`.
     * @param postgres16 {Array.<String>} Параметры, доступные для кластеров типа `postgres16`.
     * @param postgres17 {Array.<String>} Параметры, доступные для кластеров типа `postgres17`.
     * @param postgres18 {Array.<String>} Параметры, доступные для кластеров типа `postgres18`. Набор отличается от предыдущих версий PostgreSQL — например, добавлены `io_method` и `io_workers`.
     * @param redis {Array.<String>} Параметры, доступные для кластеров типа `redis`.
     * @param redis7 {Array.<String>} Параметры, доступные для кластеров типа `redis7`.
     * @param redis81 {Array.<String>} Параметры, доступные для кластеров типа `redis8_1`.
     * @param valkey {Array.<String>} Параметры, доступные для кластеров типа `valkey`.
     * @param valkey7 {Array.<String>} Параметры, доступные для кластеров типа `valkey7`.
     * @param valkey81 {Array.<String>} Параметры, доступные для кластеров типа `valkey8_1`.
     * @param valkey91 {Array.<String>} Параметры, доступные для кластеров типа `valkey9_1`.
     * @param mongodb4 {Array.<String>} Для кластеров типа `mongodb4` настраиваемых параметров нет — всегда пустой массив.
     * @param mongodb {Array.<String>} Для кластеров типа `mongodb` настраиваемых параметров нет — всегда пустой массив.
     * @param mongodb6 {Array.<String>} Для кластеров типа `mongodb6` настраиваемых параметров нет — всегда пустой массив.
     * @param mongodb7 {Array.<String>} Для кластеров типа `mongodb7` настраиваемых параметров нет — всегда пустой массив.
     * @param mongodb80 {Array.<String>} Для кластеров типа `mongodb8_0` настраиваемых параметров нет — всегда пустой массив.
     * @param opensearch {Array.<String>} Для кластеров типа `opensearch` настраиваемых параметров нет — всегда пустой массив.
     * @param opensearch219 {Array.<String>} Для кластеров типа `opensearch2_19` настраиваемых параметров нет — всегда пустой массив.
     * @param clickhouse {Array.<String>} Для кластеров типа `clickhouse` настраиваемых параметров нет — всегда пустой массив.
     * @param clickhouse24 {Array.<String>} Для кластеров типа `clickhouse24` настраиваемых параметров нет — всегда пустой массив.
     * @param clickhouse25 {Array.<String>} Для кластеров типа `clickhouse25` настраиваемых параметров нет — всегда пустой массив.
     * @param kafka {Array.<String>} Для кластеров типа `kafka` настраиваемых параметров нет — всегда пустой массив.
     * @param rabbitmq {Array.<String>} Для кластеров типа `rabbitmq` настраиваемых параметров нет — всегда пустой массив.
     * @param rabbitmq40 {Array.<String>} Для кластеров типа `rabbitmq4_0` настраиваемых параметров нет — всегда пустой массив.
     */
    constructor(mysql5, mysql, mysql84, postgres, postgres14, postgres15, postgres16, postgres17, postgres18, redis, redis7, redis81, valkey, valkey7, valkey81, valkey91, mongodb4, mongodb, mongodb6, mongodb7, mongodb80, opensearch, opensearch219, clickhouse, clickhouse24, clickhouse25, kafka, rabbitmq, rabbitmq40) { 
        
        DbParametersByType.initialize(this, mysql5, mysql, mysql84, postgres, postgres14, postgres15, postgres16, postgres17, postgres18, redis, redis7, redis81, valkey, valkey7, valkey81, valkey91, mongodb4, mongodb, mongodb6, mongodb7, mongodb80, opensearch, opensearch219, clickhouse, clickhouse24, clickhouse25, kafka, rabbitmq, rabbitmq40);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, mysql5, mysql, mysql84, postgres, postgres14, postgres15, postgres16, postgres17, postgres18, redis, redis7, redis81, valkey, valkey7, valkey81, valkey91, mongodb4, mongodb, mongodb6, mongodb7, mongodb80, opensearch, opensearch219, clickhouse, clickhouse24, clickhouse25, kafka, rabbitmq, rabbitmq40) { 
        obj['mysql5'] = mysql5;
        obj['mysql'] = mysql;
        obj['mysql8_4'] = mysql84;
        obj['postgres'] = postgres;
        obj['postgres14'] = postgres14;
        obj['postgres15'] = postgres15;
        obj['postgres16'] = postgres16;
        obj['postgres17'] = postgres17;
        obj['postgres18'] = postgres18;
        obj['redis'] = redis;
        obj['redis7'] = redis7;
        obj['redis8_1'] = redis81;
        obj['valkey'] = valkey;
        obj['valkey7'] = valkey7;
        obj['valkey8_1'] = valkey81;
        obj['valkey9_1'] = valkey91;
        obj['mongodb4'] = mongodb4;
        obj['mongodb'] = mongodb;
        obj['mongodb6'] = mongodb6;
        obj['mongodb7'] = mongodb7;
        obj['mongodb8_0'] = mongodb80;
        obj['opensearch'] = opensearch;
        obj['opensearch2_19'] = opensearch219;
        obj['clickhouse'] = clickhouse;
        obj['clickhouse24'] = clickhouse24;
        obj['clickhouse25'] = clickhouse25;
        obj['kafka'] = kafka;
        obj['rabbitmq'] = rabbitmq;
        obj['rabbitmq4_0'] = rabbitmq40;
    }

    /**
     * Constructs a <code>DbParametersByType</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/DbParametersByType} obj Optional instance to populate.
     * @return {module:model/DbParametersByType} The populated <code>DbParametersByType</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new DbParametersByType();

            if (data.hasOwnProperty('mysql5')) {
                obj['mysql5'] = ApiClient.convertToType(data['mysql5'], ['String']);
            }
            if (data.hasOwnProperty('mysql')) {
                obj['mysql'] = ApiClient.convertToType(data['mysql'], ['String']);
            }
            if (data.hasOwnProperty('mysql8_4')) {
                obj['mysql8_4'] = ApiClient.convertToType(data['mysql8_4'], ['String']);
            }
            if (data.hasOwnProperty('postgres')) {
                obj['postgres'] = ApiClient.convertToType(data['postgres'], ['String']);
            }
            if (data.hasOwnProperty('postgres14')) {
                obj['postgres14'] = ApiClient.convertToType(data['postgres14'], ['String']);
            }
            if (data.hasOwnProperty('postgres15')) {
                obj['postgres15'] = ApiClient.convertToType(data['postgres15'], ['String']);
            }
            if (data.hasOwnProperty('postgres16')) {
                obj['postgres16'] = ApiClient.convertToType(data['postgres16'], ['String']);
            }
            if (data.hasOwnProperty('postgres17')) {
                obj['postgres17'] = ApiClient.convertToType(data['postgres17'], ['String']);
            }
            if (data.hasOwnProperty('postgres18')) {
                obj['postgres18'] = ApiClient.convertToType(data['postgres18'], ['String']);
            }
            if (data.hasOwnProperty('redis')) {
                obj['redis'] = ApiClient.convertToType(data['redis'], ['String']);
            }
            if (data.hasOwnProperty('redis7')) {
                obj['redis7'] = ApiClient.convertToType(data['redis7'], ['String']);
            }
            if (data.hasOwnProperty('redis8_1')) {
                obj['redis8_1'] = ApiClient.convertToType(data['redis8_1'], ['String']);
            }
            if (data.hasOwnProperty('valkey')) {
                obj['valkey'] = ApiClient.convertToType(data['valkey'], ['String']);
            }
            if (data.hasOwnProperty('valkey7')) {
                obj['valkey7'] = ApiClient.convertToType(data['valkey7'], ['String']);
            }
            if (data.hasOwnProperty('valkey8_1')) {
                obj['valkey8_1'] = ApiClient.convertToType(data['valkey8_1'], ['String']);
            }
            if (data.hasOwnProperty('valkey9_1')) {
                obj['valkey9_1'] = ApiClient.convertToType(data['valkey9_1'], ['String']);
            }
            if (data.hasOwnProperty('mongodb4')) {
                obj['mongodb4'] = ApiClient.convertToType(data['mongodb4'], ['String']);
            }
            if (data.hasOwnProperty('mongodb')) {
                obj['mongodb'] = ApiClient.convertToType(data['mongodb'], ['String']);
            }
            if (data.hasOwnProperty('mongodb6')) {
                obj['mongodb6'] = ApiClient.convertToType(data['mongodb6'], ['String']);
            }
            if (data.hasOwnProperty('mongodb7')) {
                obj['mongodb7'] = ApiClient.convertToType(data['mongodb7'], ['String']);
            }
            if (data.hasOwnProperty('mongodb8_0')) {
                obj['mongodb8_0'] = ApiClient.convertToType(data['mongodb8_0'], ['String']);
            }
            if (data.hasOwnProperty('opensearch')) {
                obj['opensearch'] = ApiClient.convertToType(data['opensearch'], ['String']);
            }
            if (data.hasOwnProperty('opensearch2_19')) {
                obj['opensearch2_19'] = ApiClient.convertToType(data['opensearch2_19'], ['String']);
            }
            if (data.hasOwnProperty('clickhouse')) {
                obj['clickhouse'] = ApiClient.convertToType(data['clickhouse'], ['String']);
            }
            if (data.hasOwnProperty('clickhouse24')) {
                obj['clickhouse24'] = ApiClient.convertToType(data['clickhouse24'], ['String']);
            }
            if (data.hasOwnProperty('clickhouse25')) {
                obj['clickhouse25'] = ApiClient.convertToType(data['clickhouse25'], ['String']);
            }
            if (data.hasOwnProperty('kafka')) {
                obj['kafka'] = ApiClient.convertToType(data['kafka'], ['String']);
            }
            if (data.hasOwnProperty('rabbitmq')) {
                obj['rabbitmq'] = ApiClient.convertToType(data['rabbitmq'], ['String']);
            }
            if (data.hasOwnProperty('rabbitmq4_0')) {
                obj['rabbitmq4_0'] = ApiClient.convertToType(data['rabbitmq4_0'], ['String']);
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>DbParametersByType</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>DbParametersByType</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of DbParametersByType.RequiredProperties) {
            if (!data[property]) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }
        // ensure the json data is an array
        if (!Array.isArray(data['mysql5'])) {
            throw new Error("Expected the field `mysql5` to be an array in the JSON data but got " + data['mysql5']);
        }
        // ensure the json data is an array
        if (!Array.isArray(data['mysql'])) {
            throw new Error("Expected the field `mysql` to be an array in the JSON data but got " + data['mysql']);
        }
        // ensure the json data is an array
        if (!Array.isArray(data['mysql8_4'])) {
            throw new Error("Expected the field `mysql8_4` to be an array in the JSON data but got " + data['mysql8_4']);
        }
        // ensure the json data is an array
        if (!Array.isArray(data['postgres'])) {
            throw new Error("Expected the field `postgres` to be an array in the JSON data but got " + data['postgres']);
        }
        // ensure the json data is an array
        if (!Array.isArray(data['postgres14'])) {
            throw new Error("Expected the field `postgres14` to be an array in the JSON data but got " + data['postgres14']);
        }
        // ensure the json data is an array
        if (!Array.isArray(data['postgres15'])) {
            throw new Error("Expected the field `postgres15` to be an array in the JSON data but got " + data['postgres15']);
        }
        // ensure the json data is an array
        if (!Array.isArray(data['postgres16'])) {
            throw new Error("Expected the field `postgres16` to be an array in the JSON data but got " + data['postgres16']);
        }
        // ensure the json data is an array
        if (!Array.isArray(data['postgres17'])) {
            throw new Error("Expected the field `postgres17` to be an array in the JSON data but got " + data['postgres17']);
        }
        // ensure the json data is an array
        if (!Array.isArray(data['postgres18'])) {
            throw new Error("Expected the field `postgres18` to be an array in the JSON data but got " + data['postgres18']);
        }
        // ensure the json data is an array
        if (!Array.isArray(data['redis'])) {
            throw new Error("Expected the field `redis` to be an array in the JSON data but got " + data['redis']);
        }
        // ensure the json data is an array
        if (!Array.isArray(data['redis7'])) {
            throw new Error("Expected the field `redis7` to be an array in the JSON data but got " + data['redis7']);
        }
        // ensure the json data is an array
        if (!Array.isArray(data['redis8_1'])) {
            throw new Error("Expected the field `redis8_1` to be an array in the JSON data but got " + data['redis8_1']);
        }
        // ensure the json data is an array
        if (!Array.isArray(data['valkey'])) {
            throw new Error("Expected the field `valkey` to be an array in the JSON data but got " + data['valkey']);
        }
        // ensure the json data is an array
        if (!Array.isArray(data['valkey7'])) {
            throw new Error("Expected the field `valkey7` to be an array in the JSON data but got " + data['valkey7']);
        }
        // ensure the json data is an array
        if (!Array.isArray(data['valkey8_1'])) {
            throw new Error("Expected the field `valkey8_1` to be an array in the JSON data but got " + data['valkey8_1']);
        }
        // ensure the json data is an array
        if (!Array.isArray(data['valkey9_1'])) {
            throw new Error("Expected the field `valkey9_1` to be an array in the JSON data but got " + data['valkey9_1']);
        }
        // ensure the json data is an array
        if (!Array.isArray(data['mongodb4'])) {
            throw new Error("Expected the field `mongodb4` to be an array in the JSON data but got " + data['mongodb4']);
        }
        // ensure the json data is an array
        if (!Array.isArray(data['mongodb'])) {
            throw new Error("Expected the field `mongodb` to be an array in the JSON data but got " + data['mongodb']);
        }
        // ensure the json data is an array
        if (!Array.isArray(data['mongodb6'])) {
            throw new Error("Expected the field `mongodb6` to be an array in the JSON data but got " + data['mongodb6']);
        }
        // ensure the json data is an array
        if (!Array.isArray(data['mongodb7'])) {
            throw new Error("Expected the field `mongodb7` to be an array in the JSON data but got " + data['mongodb7']);
        }
        // ensure the json data is an array
        if (!Array.isArray(data['mongodb8_0'])) {
            throw new Error("Expected the field `mongodb8_0` to be an array in the JSON data but got " + data['mongodb8_0']);
        }
        // ensure the json data is an array
        if (!Array.isArray(data['opensearch'])) {
            throw new Error("Expected the field `opensearch` to be an array in the JSON data but got " + data['opensearch']);
        }
        // ensure the json data is an array
        if (!Array.isArray(data['opensearch2_19'])) {
            throw new Error("Expected the field `opensearch2_19` to be an array in the JSON data but got " + data['opensearch2_19']);
        }
        // ensure the json data is an array
        if (!Array.isArray(data['clickhouse'])) {
            throw new Error("Expected the field `clickhouse` to be an array in the JSON data but got " + data['clickhouse']);
        }
        // ensure the json data is an array
        if (!Array.isArray(data['clickhouse24'])) {
            throw new Error("Expected the field `clickhouse24` to be an array in the JSON data but got " + data['clickhouse24']);
        }
        // ensure the json data is an array
        if (!Array.isArray(data['clickhouse25'])) {
            throw new Error("Expected the field `clickhouse25` to be an array in the JSON data but got " + data['clickhouse25']);
        }
        // ensure the json data is an array
        if (!Array.isArray(data['kafka'])) {
            throw new Error("Expected the field `kafka` to be an array in the JSON data but got " + data['kafka']);
        }
        // ensure the json data is an array
        if (!Array.isArray(data['rabbitmq'])) {
            throw new Error("Expected the field `rabbitmq` to be an array in the JSON data but got " + data['rabbitmq']);
        }
        // ensure the json data is an array
        if (!Array.isArray(data['rabbitmq4_0'])) {
            throw new Error("Expected the field `rabbitmq4_0` to be an array in the JSON data but got " + data['rabbitmq4_0']);
        }

        return true;
    }


}

DbParametersByType.RequiredProperties = ["mysql5", "mysql", "mysql8_4", "postgres", "postgres14", "postgres15", "postgres16", "postgres17", "postgres18", "redis", "redis7", "redis8_1", "valkey", "valkey7", "valkey8_1", "valkey9_1", "mongodb4", "mongodb", "mongodb6", "mongodb7", "mongodb8_0", "opensearch", "opensearch2_19", "clickhouse", "clickhouse24", "clickhouse25", "kafka", "rabbitmq", "rabbitmq4_0"];

/**
 * Параметры, доступные для кластеров типа `mysql5`.
 * @member {Array.<String>} mysql5
 */
DbParametersByType.prototype['mysql5'] = undefined;

/**
 * Параметры, доступные для кластеров типа `mysql`.
 * @member {Array.<String>} mysql
 */
DbParametersByType.prototype['mysql'] = undefined;

/**
 * Параметры, доступные для кластеров типа `mysql8_4`.
 * @member {Array.<String>} mysql8_4
 */
DbParametersByType.prototype['mysql8_4'] = undefined;

/**
 * Параметры, доступные для кластеров типа `postgres` (PostgreSQL 13).
 * @member {Array.<String>} postgres
 */
DbParametersByType.prototype['postgres'] = undefined;

/**
 * Параметры, доступные для кластеров типа `postgres14`.
 * @member {Array.<String>} postgres14
 */
DbParametersByType.prototype['postgres14'] = undefined;

/**
 * Параметры, доступные для кластеров типа `postgres15`.
 * @member {Array.<String>} postgres15
 */
DbParametersByType.prototype['postgres15'] = undefined;

/**
 * Параметры, доступные для кластеров типа `postgres16`.
 * @member {Array.<String>} postgres16
 */
DbParametersByType.prototype['postgres16'] = undefined;

/**
 * Параметры, доступные для кластеров типа `postgres17`.
 * @member {Array.<String>} postgres17
 */
DbParametersByType.prototype['postgres17'] = undefined;

/**
 * Параметры, доступные для кластеров типа `postgres18`. Набор отличается от предыдущих версий PostgreSQL — например, добавлены `io_method` и `io_workers`.
 * @member {Array.<String>} postgres18
 */
DbParametersByType.prototype['postgres18'] = undefined;

/**
 * Параметры, доступные для кластеров типа `redis`.
 * @member {Array.<String>} redis
 */
DbParametersByType.prototype['redis'] = undefined;

/**
 * Параметры, доступные для кластеров типа `redis7`.
 * @member {Array.<String>} redis7
 */
DbParametersByType.prototype['redis7'] = undefined;

/**
 * Параметры, доступные для кластеров типа `redis8_1`.
 * @member {Array.<String>} redis8_1
 */
DbParametersByType.prototype['redis8_1'] = undefined;

/**
 * Параметры, доступные для кластеров типа `valkey`.
 * @member {Array.<String>} valkey
 */
DbParametersByType.prototype['valkey'] = undefined;

/**
 * Параметры, доступные для кластеров типа `valkey7`.
 * @member {Array.<String>} valkey7
 */
DbParametersByType.prototype['valkey7'] = undefined;

/**
 * Параметры, доступные для кластеров типа `valkey8_1`.
 * @member {Array.<String>} valkey8_1
 */
DbParametersByType.prototype['valkey8_1'] = undefined;

/**
 * Параметры, доступные для кластеров типа `valkey9_1`.
 * @member {Array.<String>} valkey9_1
 */
DbParametersByType.prototype['valkey9_1'] = undefined;

/**
 * Для кластеров типа `mongodb4` настраиваемых параметров нет — всегда пустой массив.
 * @member {Array.<String>} mongodb4
 */
DbParametersByType.prototype['mongodb4'] = undefined;

/**
 * Для кластеров типа `mongodb` настраиваемых параметров нет — всегда пустой массив.
 * @member {Array.<String>} mongodb
 */
DbParametersByType.prototype['mongodb'] = undefined;

/**
 * Для кластеров типа `mongodb6` настраиваемых параметров нет — всегда пустой массив.
 * @member {Array.<String>} mongodb6
 */
DbParametersByType.prototype['mongodb6'] = undefined;

/**
 * Для кластеров типа `mongodb7` настраиваемых параметров нет — всегда пустой массив.
 * @member {Array.<String>} mongodb7
 */
DbParametersByType.prototype['mongodb7'] = undefined;

/**
 * Для кластеров типа `mongodb8_0` настраиваемых параметров нет — всегда пустой массив.
 * @member {Array.<String>} mongodb8_0
 */
DbParametersByType.prototype['mongodb8_0'] = undefined;

/**
 * Для кластеров типа `opensearch` настраиваемых параметров нет — всегда пустой массив.
 * @member {Array.<String>} opensearch
 */
DbParametersByType.prototype['opensearch'] = undefined;

/**
 * Для кластеров типа `opensearch2_19` настраиваемых параметров нет — всегда пустой массив.
 * @member {Array.<String>} opensearch2_19
 */
DbParametersByType.prototype['opensearch2_19'] = undefined;

/**
 * Для кластеров типа `clickhouse` настраиваемых параметров нет — всегда пустой массив.
 * @member {Array.<String>} clickhouse
 */
DbParametersByType.prototype['clickhouse'] = undefined;

/**
 * Для кластеров типа `clickhouse24` настраиваемых параметров нет — всегда пустой массив.
 * @member {Array.<String>} clickhouse24
 */
DbParametersByType.prototype['clickhouse24'] = undefined;

/**
 * Для кластеров типа `clickhouse25` настраиваемых параметров нет — всегда пустой массив.
 * @member {Array.<String>} clickhouse25
 */
DbParametersByType.prototype['clickhouse25'] = undefined;

/**
 * Для кластеров типа `kafka` настраиваемых параметров нет — всегда пустой массив.
 * @member {Array.<String>} kafka
 */
DbParametersByType.prototype['kafka'] = undefined;

/**
 * Для кластеров типа `rabbitmq` настраиваемых параметров нет — всегда пустой массив.
 * @member {Array.<String>} rabbitmq
 */
DbParametersByType.prototype['rabbitmq'] = undefined;

/**
 * Для кластеров типа `rabbitmq4_0` настраиваемых параметров нет — всегда пустой массив.
 * @member {Array.<String>} rabbitmq4_0
 */
DbParametersByType.prototype['rabbitmq4_0'] = undefined;






export default DbParametersByType;

