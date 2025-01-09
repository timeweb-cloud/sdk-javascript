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
import AppConfiguration from './AppConfiguration';
import AppDiskStatus from './AppDiskStatus';
import AppDomainsInner from './AppDomainsInner';
import AppProvider from './AppProvider';
import Frameworks from './Frameworks';
import Repository from './Repository';

/**
 * The App model module.
 * @module model/App
 * @version 1.0.0
 */
class App {
    /**
     * Constructs a new <code>App</code>.
     * Экземпляр приложения.
     * @alias module:model/App
     * @param id {Number} ID для каждого экземпляра приложения. Автоматически генерируется при создании.
     * @param type {module:model/App.TypeEnum} Тип приложения.
     * @param name {String} Удобочитаемое имя, установленное для приложения.
     * @param status {module:model/App.StatusEnum} Статус приложения.
     * @param provider {module:model/AppProvider} 
     * @param ip {String} IPv4-адрес приложения.
     * @param domains {Array.<module:model/AppDomainsInner>} 
     * @param framework {module:model/Frameworks} 
     * @param location {module:model/App.LocationEnum} Локация сервера.
     * @param repository {module:model/Repository} 
     * @param envVersion {String} Версия окружения.
     * @param envs {Object} Переменные окружения приложения. Объект с ключами и значениями типа string.
     * @param branchName {String} Название ветки репозитория из которой собрано приложение.
     * @param isAutoDeploy {Boolean} Включен ли автоматический деплой.
     * @param commitSha {String} Хэш коммита из которого собрано приложеие.
     * @param comment {String} Комментарий к приложению.
     * @param presetId {Number} ID тарифа.
     * @param indexDir {String} Путь к директории с индексным файлом. Определен для приложений `type: frontend`. Для приложений `type: backend` всегда null.
     * @param buildCmd {String} Команда сборки приложения.
     * @param runCmd {String} Команда для запуска приложения. Определена для приложений `type: backend`. Для приложений `type: frontend` всегда null.
     * @param configuration {module:model/AppConfiguration} 
     * @param diskStatus {module:model/AppDiskStatus} 
     * @param isQemuAgent {Boolean} Включен ли агент QEMU.
     * @param language {String} Язык программирования приложения.
     * @param startTime {Date} Время запуска приложения.
     */
    constructor(id, type, name, status, provider, ip, domains, framework, location, repository, envVersion, envs, branchName, isAutoDeploy, commitSha, comment, presetId, indexDir, buildCmd, runCmd, configuration, diskStatus, isQemuAgent, language, startTime) { 
        
        App.initialize(this, id, type, name, status, provider, ip, domains, framework, location, repository, envVersion, envs, branchName, isAutoDeploy, commitSha, comment, presetId, indexDir, buildCmd, runCmd, configuration, diskStatus, isQemuAgent, language, startTime);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, id, type, name, status, provider, ip, domains, framework, location, repository, envVersion, envs, branchName, isAutoDeploy, commitSha, comment, presetId, indexDir, buildCmd, runCmd, configuration, diskStatus, isQemuAgent, language, startTime) { 
        obj['id'] = id;
        obj['type'] = type;
        obj['name'] = name;
        obj['status'] = status;
        obj['provider'] = provider;
        obj['ip'] = ip;
        obj['domains'] = domains;
        obj['framework'] = framework;
        obj['location'] = location;
        obj['repository'] = repository;
        obj['env_version'] = envVersion;
        obj['envs'] = envs;
        obj['branch_name'] = branchName;
        obj['is_auto_deploy'] = isAutoDeploy;
        obj['commit_sha'] = commitSha;
        obj['comment'] = comment;
        obj['preset_id'] = presetId;
        obj['index_dir'] = indexDir;
        obj['build_cmd'] = buildCmd;
        obj['run_cmd'] = runCmd;
        obj['configuration'] = configuration;
        obj['disk_status'] = diskStatus;
        obj['is_qemu_agent'] = isQemuAgent;
        obj['language'] = language;
        obj['start_time'] = startTime;
    }

    /**
     * Constructs a <code>App</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/App} obj Optional instance to populate.
     * @return {module:model/App} The populated <code>App</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new App();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'Number');
            }
            if (data.hasOwnProperty('type')) {
                obj['type'] = ApiClient.convertToType(data['type'], 'String');
            }
            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('status')) {
                obj['status'] = ApiClient.convertToType(data['status'], 'String');
            }
            if (data.hasOwnProperty('provider')) {
                obj['provider'] = AppProvider.constructFromObject(data['provider']);
            }
            if (data.hasOwnProperty('ip')) {
                obj['ip'] = ApiClient.convertToType(data['ip'], 'String');
            }
            if (data.hasOwnProperty('domains')) {
                obj['domains'] = ApiClient.convertToType(data['domains'], [AppDomainsInner]);
            }
            if (data.hasOwnProperty('framework')) {
                obj['framework'] = Frameworks.constructFromObject(data['framework']);
            }
            if (data.hasOwnProperty('location')) {
                obj['location'] = ApiClient.convertToType(data['location'], 'String');
            }
            if (data.hasOwnProperty('repository')) {
                obj['repository'] = Repository.constructFromObject(data['repository']);
            }
            if (data.hasOwnProperty('env_version')) {
                obj['env_version'] = ApiClient.convertToType(data['env_version'], 'String');
            }
            if (data.hasOwnProperty('envs')) {
                obj['envs'] = ApiClient.convertToType(data['envs'], Object);
            }
            if (data.hasOwnProperty('branch_name')) {
                obj['branch_name'] = ApiClient.convertToType(data['branch_name'], 'String');
            }
            if (data.hasOwnProperty('is_auto_deploy')) {
                obj['is_auto_deploy'] = ApiClient.convertToType(data['is_auto_deploy'], 'Boolean');
            }
            if (data.hasOwnProperty('commit_sha')) {
                obj['commit_sha'] = ApiClient.convertToType(data['commit_sha'], 'String');
            }
            if (data.hasOwnProperty('comment')) {
                obj['comment'] = ApiClient.convertToType(data['comment'], 'String');
            }
            if (data.hasOwnProperty('preset_id')) {
                obj['preset_id'] = ApiClient.convertToType(data['preset_id'], 'Number');
            }
            if (data.hasOwnProperty('index_dir')) {
                obj['index_dir'] = ApiClient.convertToType(data['index_dir'], 'String');
            }
            if (data.hasOwnProperty('build_cmd')) {
                obj['build_cmd'] = ApiClient.convertToType(data['build_cmd'], 'String');
            }
            if (data.hasOwnProperty('run_cmd')) {
                obj['run_cmd'] = ApiClient.convertToType(data['run_cmd'], 'String');
            }
            if (data.hasOwnProperty('configuration')) {
                obj['configuration'] = AppConfiguration.constructFromObject(data['configuration']);
            }
            if (data.hasOwnProperty('disk_status')) {
                obj['disk_status'] = AppDiskStatus.constructFromObject(data['disk_status']);
            }
            if (data.hasOwnProperty('is_qemu_agent')) {
                obj['is_qemu_agent'] = ApiClient.convertToType(data['is_qemu_agent'], 'Boolean');
            }
            if (data.hasOwnProperty('language')) {
                obj['language'] = ApiClient.convertToType(data['language'], 'String');
            }
            if (data.hasOwnProperty('start_time')) {
                obj['start_time'] = ApiClient.convertToType(data['start_time'], 'Date');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>App</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>App</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of App.RequiredProperties) {
            if (!data[property]) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }
        // ensure the json data is a string
        if (data['type'] && !(typeof data['type'] === 'string' || data['type'] instanceof String)) {
            throw new Error("Expected the field `type` to be a primitive type in the JSON string but got " + data['type']);
        }
        // ensure the json data is a string
        if (data['name'] && !(typeof data['name'] === 'string' || data['name'] instanceof String)) {
            throw new Error("Expected the field `name` to be a primitive type in the JSON string but got " + data['name']);
        }
        // ensure the json data is a string
        if (data['status'] && !(typeof data['status'] === 'string' || data['status'] instanceof String)) {
            throw new Error("Expected the field `status` to be a primitive type in the JSON string but got " + data['status']);
        }
        // validate the optional field `provider`
        if (data['provider']) { // data not null
          AppProvider.validateJSON(data['provider']);
        }
        // ensure the json data is a string
        if (data['ip'] && !(typeof data['ip'] === 'string' || data['ip'] instanceof String)) {
            throw new Error("Expected the field `ip` to be a primitive type in the JSON string but got " + data['ip']);
        }
        if (data['domains']) { // data not null
            // ensure the json data is an array
            if (!Array.isArray(data['domains'])) {
                throw new Error("Expected the field `domains` to be an array in the JSON data but got " + data['domains']);
            }
            // validate the optional field `domains` (array)
            for (const item of data['domains']) {
                AppDomainsInner.validateJSON(item);
            };
        }
        // ensure the json data is a string
        if (data['location'] && !(typeof data['location'] === 'string' || data['location'] instanceof String)) {
            throw new Error("Expected the field `location` to be a primitive type in the JSON string but got " + data['location']);
        }
        // validate the optional field `repository`
        if (data['repository']) { // data not null
          Repository.validateJSON(data['repository']);
        }
        // ensure the json data is a string
        if (data['env_version'] && !(typeof data['env_version'] === 'string' || data['env_version'] instanceof String)) {
            throw new Error("Expected the field `env_version` to be a primitive type in the JSON string but got " + data['env_version']);
        }
        // ensure the json data is a string
        if (data['branch_name'] && !(typeof data['branch_name'] === 'string' || data['branch_name'] instanceof String)) {
            throw new Error("Expected the field `branch_name` to be a primitive type in the JSON string but got " + data['branch_name']);
        }
        // ensure the json data is a string
        if (data['commit_sha'] && !(typeof data['commit_sha'] === 'string' || data['commit_sha'] instanceof String)) {
            throw new Error("Expected the field `commit_sha` to be a primitive type in the JSON string but got " + data['commit_sha']);
        }
        // ensure the json data is a string
        if (data['comment'] && !(typeof data['comment'] === 'string' || data['comment'] instanceof String)) {
            throw new Error("Expected the field `comment` to be a primitive type in the JSON string but got " + data['comment']);
        }
        // ensure the json data is a string
        if (data['index_dir'] && !(typeof data['index_dir'] === 'string' || data['index_dir'] instanceof String)) {
            throw new Error("Expected the field `index_dir` to be a primitive type in the JSON string but got " + data['index_dir']);
        }
        // ensure the json data is a string
        if (data['build_cmd'] && !(typeof data['build_cmd'] === 'string' || data['build_cmd'] instanceof String)) {
            throw new Error("Expected the field `build_cmd` to be a primitive type in the JSON string but got " + data['build_cmd']);
        }
        // ensure the json data is a string
        if (data['run_cmd'] && !(typeof data['run_cmd'] === 'string' || data['run_cmd'] instanceof String)) {
            throw new Error("Expected the field `run_cmd` to be a primitive type in the JSON string but got " + data['run_cmd']);
        }
        // validate the optional field `configuration`
        if (data['configuration']) { // data not null
          AppConfiguration.validateJSON(data['configuration']);
        }
        // validate the optional field `disk_status`
        if (data['disk_status']) { // data not null
          AppDiskStatus.validateJSON(data['disk_status']);
        }
        // ensure the json data is a string
        if (data['language'] && !(typeof data['language'] === 'string' || data['language'] instanceof String)) {
            throw new Error("Expected the field `language` to be a primitive type in the JSON string but got " + data['language']);
        }

        return true;
    }


}

App.RequiredProperties = ["id", "type", "name", "status", "provider", "ip", "domains", "framework", "location", "repository", "env_version", "envs", "branch_name", "is_auto_deploy", "commit_sha", "comment", "preset_id", "index_dir", "build_cmd", "run_cmd", "configuration", "disk_status", "is_qemu_agent", "language", "start_time"];

/**
 * ID для каждого экземпляра приложения. Автоматически генерируется при создании.
 * @member {Number} id
 */
App.prototype['id'] = undefined;

/**
 * Тип приложения.
 * @member {module:model/App.TypeEnum} type
 */
App.prototype['type'] = undefined;

/**
 * Удобочитаемое имя, установленное для приложения.
 * @member {String} name
 */
App.prototype['name'] = undefined;

/**
 * Статус приложения.
 * @member {module:model/App.StatusEnum} status
 */
App.prototype['status'] = undefined;

/**
 * @member {module:model/AppProvider} provider
 */
App.prototype['provider'] = undefined;

/**
 * IPv4-адрес приложения.
 * @member {String} ip
 */
App.prototype['ip'] = undefined;

/**
 * @member {Array.<module:model/AppDomainsInner>} domains
 */
App.prototype['domains'] = undefined;

/**
 * @member {module:model/Frameworks} framework
 */
App.prototype['framework'] = undefined;

/**
 * Локация сервера.
 * @member {module:model/App.LocationEnum} location
 */
App.prototype['location'] = undefined;

/**
 * @member {module:model/Repository} repository
 */
App.prototype['repository'] = undefined;

/**
 * Версия окружения.
 * @member {String} env_version
 */
App.prototype['env_version'] = undefined;

/**
 * Переменные окружения приложения. Объект с ключами и значениями типа string.
 * @member {Object} envs
 */
App.prototype['envs'] = undefined;

/**
 * Название ветки репозитория из которой собрано приложение.
 * @member {String} branch_name
 */
App.prototype['branch_name'] = undefined;

/**
 * Включен ли автоматический деплой.
 * @member {Boolean} is_auto_deploy
 */
App.prototype['is_auto_deploy'] = undefined;

/**
 * Хэш коммита из которого собрано приложеие.
 * @member {String} commit_sha
 */
App.prototype['commit_sha'] = undefined;

/**
 * Комментарий к приложению.
 * @member {String} comment
 */
App.prototype['comment'] = undefined;

/**
 * ID тарифа.
 * @member {Number} preset_id
 */
App.prototype['preset_id'] = undefined;

/**
 * Путь к директории с индексным файлом. Определен для приложений `type: frontend`. Для приложений `type: backend` всегда null.
 * @member {String} index_dir
 */
App.prototype['index_dir'] = undefined;

/**
 * Команда сборки приложения.
 * @member {String} build_cmd
 */
App.prototype['build_cmd'] = undefined;

/**
 * Команда для запуска приложения. Определена для приложений `type: backend`. Для приложений `type: frontend` всегда null.
 * @member {String} run_cmd
 */
App.prototype['run_cmd'] = undefined;

/**
 * @member {module:model/AppConfiguration} configuration
 */
App.prototype['configuration'] = undefined;

/**
 * @member {module:model/AppDiskStatus} disk_status
 */
App.prototype['disk_status'] = undefined;

/**
 * Включен ли агент QEMU.
 * @member {Boolean} is_qemu_agent
 */
App.prototype['is_qemu_agent'] = undefined;

/**
 * Язык программирования приложения.
 * @member {String} language
 */
App.prototype['language'] = undefined;

/**
 * Время запуска приложения.
 * @member {Date} start_time
 */
App.prototype['start_time'] = undefined;





/**
 * Allowed values for the <code>type</code> property.
 * @enum {String}
 * @readonly
 */
App['TypeEnum'] = {

    /**
     * value: "backend"
     * @const
     */
    "backend": "backend",

    /**
     * value: "frontend"
     * @const
     */
    "frontend": "frontend"
};


/**
 * Allowed values for the <code>status</code> property.
 * @enum {String}
 * @readonly
 */
App['StatusEnum'] = {

    /**
     * value: "active"
     * @const
     */
    "active": "active",

    /**
     * value: "paused"
     * @const
     */
    "paused": "paused",

    /**
     * value: "no_paid"
     * @const
     */
    "no_paid": "no_paid",

    /**
     * value: "deploy"
     * @const
     */
    "deploy": "deploy",

    /**
     * value: "failure"
     * @const
     */
    "failure": "failure",

    /**
     * value: "startup_error"
     * @const
     */
    "startup_error": "startup_error",

    /**
     * value: "new"
     * @const
     */
    "new": "new",

    /**
     * value: "reboot"
     * @const
     */
    "reboot": "reboot"
};


/**
 * Allowed values for the <code>location</code> property.
 * @enum {String}
 * @readonly
 */
App['LocationEnum'] = {

    /**
     * value: "ru-1"
     * @const
     */
    "ru-1": "ru-1",

    /**
     * value: "pl-1"
     * @const
     */
    "pl-1": "pl-1",

    /**
     * value: "nl-1"
     * @const
     */
    "nl-1": "nl-1"
};



export default App;

