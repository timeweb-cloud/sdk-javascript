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
import CreateAppV2Configuration from './CreateAppV2Configuration';
import CreateAppV2Network from './CreateAppV2Network';

/**
 * The CreateAppV2 model module.
 * @module model/CreateAppV2
 * @version 1.0.0
 */
class CreateAppV2 {
    /**
     * Constructs a new <code>CreateAppV2</code>.
     * Параметры создания приложения. Для Git-репозитория обязательны provider_id, repository_id, branch_name, commit_sha, build_cmd, is_auto_deploy и framework. Для frontend также обязательны index_dir и preset_id. Для backend из Git обязателен run_cmd. Для backend из готового Docker-образа передайте docker_image и docker_image_tag; Git-параметры не требуются. Для любого backend передайте либо preset_id, либо configuration. Эти поля нельзя передавать одновременно.
     * @alias module:model/CreateAppV2
     * @param type {module:model/CreateAppV2.TypeEnum} Тип приложения: frontend — статический сайт, backend — серверное приложение или Docker-образ.
     * @param name {String} Имя приложения, от 1 до 255 символов. Допустимы латинские и русские буквы, цифры, пробелы и символы - . ( ) , & # [ ] _.
     * @param comment {String} Комментарий к приложению. Обязательное поле; можно передать пустую строку. Допустимы те же символы, что и в имени приложения.
     * @param language {module:model/CreateAppV2.LanguageEnum} Язык или способ развёртывания. Обязателен в v2. Для frontend: `javascript`. Для backend: `node`, `elixir`, `go`, `php`, `python`, `ruby`, `docker`, `docker-compose`, `dotnet`, `java`, `kotlin`, `rust`, `bun`, `deno`, `custom-image`. Для SSR-приложений из Git используйте node, для готового Docker-образа — custom-image.
     */
    constructor(type, name, comment, language) { 
        
        CreateAppV2.initialize(this, type, name, comment, language);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, type, name, comment, language) { 
        obj['type'] = type;
        obj['name'] = name;
        obj['comment'] = comment;
        obj['language'] = language;
    }

    /**
     * Constructs a <code>CreateAppV2</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/CreateAppV2} obj Optional instance to populate.
     * @return {module:model/CreateAppV2} The populated <code>CreateAppV2</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new CreateAppV2();

            if (data.hasOwnProperty('provider_id')) {
                obj['provider_id'] = ApiClient.convertToType(data['provider_id'], 'String');
            }
            if (data.hasOwnProperty('type')) {
                obj['type'] = ApiClient.convertToType(data['type'], 'String');
            }
            if (data.hasOwnProperty('repository_id')) {
                obj['repository_id'] = ApiClient.convertToType(data['repository_id'], 'String');
            }
            if (data.hasOwnProperty('build_cmd')) {
                obj['build_cmd'] = ApiClient.convertToType(data['build_cmd'], 'String');
            }
            if (data.hasOwnProperty('envs')) {
                obj['envs'] = ApiClient.convertToType(data['envs'], {'String': 'String'});
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
            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('comment')) {
                obj['comment'] = ApiClient.convertToType(data['comment'], 'String');
            }
            if (data.hasOwnProperty('preset_id')) {
                obj['preset_id'] = ApiClient.convertToType(data['preset_id'], 'Number');
            }
            if (data.hasOwnProperty('env_version')) {
                obj['env_version'] = ApiClient.convertToType(data['env_version'], 'String');
            }
            if (data.hasOwnProperty('framework')) {
                obj['framework'] = ApiClient.convertToType(data['framework'], 'String');
            }
            if (data.hasOwnProperty('index_dir')) {
                obj['index_dir'] = ApiClient.convertToType(data['index_dir'], 'String');
            }
            if (data.hasOwnProperty('run_cmd')) {
                obj['run_cmd'] = ApiClient.convertToType(data['run_cmd'], 'String');
            }
            if (data.hasOwnProperty('system_dependencies')) {
                obj['system_dependencies'] = ApiClient.convertToType(data['system_dependencies'], ['String']);
            }
            if (data.hasOwnProperty('project_id')) {
                obj['project_id'] = ApiClient.convertToType(data['project_id'], 'Number');
            }
            if (data.hasOwnProperty('configuration')) {
                obj['configuration'] = CreateAppV2Configuration.constructFromObject(data['configuration']);
            }
            if (data.hasOwnProperty('language')) {
                obj['language'] = ApiClient.convertToType(data['language'], 'String');
            }
            if (data.hasOwnProperty('build_entry_path')) {
                obj['build_entry_path'] = ApiClient.convertToType(data['build_entry_path'], 'String');
            }
            if (data.hasOwnProperty('network')) {
                obj['network'] = CreateAppV2Network.constructFromObject(data['network']);
            }
            if (data.hasOwnProperty('health_check')) {
                obj['health_check'] = ApiClient.convertToType(data['health_check'], 'String');
            }
            if (data.hasOwnProperty('global_env_ids')) {
                obj['global_env_ids'] = ApiClient.convertToType(data['global_env_ids'], ['Number']);
            }
            if (data.hasOwnProperty('docker_image')) {
                obj['docker_image'] = ApiClient.convertToType(data['docker_image'], 'String');
            }
            if (data.hasOwnProperty('docker_image_tag')) {
                obj['docker_image_tag'] = ApiClient.convertToType(data['docker_image_tag'], 'String');
            }
            if (data.hasOwnProperty('is_russian_trusted_ca')) {
                obj['is_russian_trusted_ca'] = ApiClient.convertToType(data['is_russian_trusted_ca'], 'Boolean');
            }
            if (data.hasOwnProperty('is_tci_trusted_ca')) {
                obj['is_tci_trusted_ca'] = ApiClient.convertToType(data['is_tci_trusted_ca'], 'Boolean');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>CreateAppV2</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>CreateAppV2</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of CreateAppV2.RequiredProperties) {
            if (!data[property]) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }
        // ensure the json data is a string
        if (data['provider_id'] && !(typeof data['provider_id'] === 'string' || data['provider_id'] instanceof String)) {
            throw new Error("Expected the field `provider_id` to be a primitive type in the JSON string but got " + data['provider_id']);
        }
        // ensure the json data is a string
        if (data['type'] && !(typeof data['type'] === 'string' || data['type'] instanceof String)) {
            throw new Error("Expected the field `type` to be a primitive type in the JSON string but got " + data['type']);
        }
        // ensure the json data is a string
        if (data['repository_id'] && !(typeof data['repository_id'] === 'string' || data['repository_id'] instanceof String)) {
            throw new Error("Expected the field `repository_id` to be a primitive type in the JSON string but got " + data['repository_id']);
        }
        // ensure the json data is a string
        if (data['build_cmd'] && !(typeof data['build_cmd'] === 'string' || data['build_cmd'] instanceof String)) {
            throw new Error("Expected the field `build_cmd` to be a primitive type in the JSON string but got " + data['build_cmd']);
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
        if (data['name'] && !(typeof data['name'] === 'string' || data['name'] instanceof String)) {
            throw new Error("Expected the field `name` to be a primitive type in the JSON string but got " + data['name']);
        }
        // ensure the json data is a string
        if (data['comment'] && !(typeof data['comment'] === 'string' || data['comment'] instanceof String)) {
            throw new Error("Expected the field `comment` to be a primitive type in the JSON string but got " + data['comment']);
        }
        // ensure the json data is a string
        if (data['env_version'] && !(typeof data['env_version'] === 'string' || data['env_version'] instanceof String)) {
            throw new Error("Expected the field `env_version` to be a primitive type in the JSON string but got " + data['env_version']);
        }
        // ensure the json data is a string
        if (data['framework'] && !(typeof data['framework'] === 'string' || data['framework'] instanceof String)) {
            throw new Error("Expected the field `framework` to be a primitive type in the JSON string but got " + data['framework']);
        }
        // ensure the json data is a string
        if (data['index_dir'] && !(typeof data['index_dir'] === 'string' || data['index_dir'] instanceof String)) {
            throw new Error("Expected the field `index_dir` to be a primitive type in the JSON string but got " + data['index_dir']);
        }
        // ensure the json data is a string
        if (data['run_cmd'] && !(typeof data['run_cmd'] === 'string' || data['run_cmd'] instanceof String)) {
            throw new Error("Expected the field `run_cmd` to be a primitive type in the JSON string but got " + data['run_cmd']);
        }
        // ensure the json data is an array
        if (!Array.isArray(data['system_dependencies'])) {
            throw new Error("Expected the field `system_dependencies` to be an array in the JSON data but got " + data['system_dependencies']);
        }
        // validate the optional field `configuration`
        if (data['configuration']) { // data not null
          CreateAppV2Configuration.validateJSON(data['configuration']);
        }
        // ensure the json data is a string
        if (data['language'] && !(typeof data['language'] === 'string' || data['language'] instanceof String)) {
            throw new Error("Expected the field `language` to be a primitive type in the JSON string but got " + data['language']);
        }
        // ensure the json data is a string
        if (data['build_entry_path'] && !(typeof data['build_entry_path'] === 'string' || data['build_entry_path'] instanceof String)) {
            throw new Error("Expected the field `build_entry_path` to be a primitive type in the JSON string but got " + data['build_entry_path']);
        }
        // validate the optional field `network`
        if (data['network']) { // data not null
          CreateAppV2Network.validateJSON(data['network']);
        }
        // ensure the json data is a string
        if (data['health_check'] && !(typeof data['health_check'] === 'string' || data['health_check'] instanceof String)) {
            throw new Error("Expected the field `health_check` to be a primitive type in the JSON string but got " + data['health_check']);
        }
        // ensure the json data is an array
        if (!Array.isArray(data['global_env_ids'])) {
            throw new Error("Expected the field `global_env_ids` to be an array in the JSON data but got " + data['global_env_ids']);
        }
        // ensure the json data is a string
        if (data['docker_image'] && !(typeof data['docker_image'] === 'string' || data['docker_image'] instanceof String)) {
            throw new Error("Expected the field `docker_image` to be a primitive type in the JSON string but got " + data['docker_image']);
        }
        // ensure the json data is a string
        if (data['docker_image_tag'] && !(typeof data['docker_image_tag'] === 'string' || data['docker_image_tag'] instanceof String)) {
            throw new Error("Expected the field `docker_image_tag` to be a primitive type in the JSON string but got " + data['docker_image_tag']);
        }

        return true;
    }


}

CreateAppV2.RequiredProperties = ["type", "name", "comment", "language"];

/**
 * ID провайдера. Обязателен при создании из Git-репозитория. Не требуется для готового Docker-образа.
 * @member {String} provider_id
 */
CreateAppV2.prototype['provider_id'] = undefined;

/**
 * Тип приложения: frontend — статический сайт, backend — серверное приложение или Docker-образ.
 * @member {module:model/CreateAppV2.TypeEnum} type
 */
CreateAppV2.prototype['type'] = undefined;

/**
 * ID репозитория. Обязателен при создании из Git-репозитория. Не требуется для готового Docker-образа.
 * @member {String} repository_id
 */
CreateAppV2.prototype['repository_id'] = undefined;

/**
 * Команда сборки приложения из Git-репозитория. Обязательна для Git; можно передать пустую строку, если сборка не нужна.
 * @member {String} build_cmd
 */
CreateAppV2.prototype['build_cmd'] = undefined;

/**
 * Переменные окружения приложения. Ключи и значения — строки. Длина ключа — не более 255 символов, значения — не более 10240. По умолчанию пустой объект.
 * @member {Object.<String, String>} envs
 */
CreateAppV2.prototype['envs'] = undefined;

/**
 * Ветка Git-репозитория, из которой необходимо собрать приложение. Обязательна при создании из Git.
 * @member {String} branch_name
 */
CreateAppV2.prototype['branch_name'] = undefined;

/**
 * Автоматически запускать деплой при изменении Git-репозитория. Поле обязательно при создании из Git. Для провайдера git и готового Docker-образа автодеплой выключен.
 * @member {Boolean} is_auto_deploy
 */
CreateAppV2.prototype['is_auto_deploy'] = undefined;

/**
 * Хэш коммита для первого деплоя. Обязателен при создании из Git.
 * @member {String} commit_sha
 */
CreateAppV2.prototype['commit_sha'] = undefined;

/**
 * Имя приложения, от 1 до 255 символов. Допустимы латинские и русские буквы, цифры, пробелы и символы - . ( ) , & # [ ] _.
 * @member {String} name
 */
CreateAppV2.prototype['name'] = undefined;

/**
 * Комментарий к приложению. Обязательное поле; можно передать пустую строку. Допустимы те же символы, что и в имени приложения.
 * @member {String} comment
 */
CreateAppV2.prototype['comment'] = undefined;

/**
 * ID тарифа приложения. Обязателен для frontend. Для backend передайте либо preset_id, либо configuration. Нельзя передавать вместе с configuration. Доступные тарифы: GET /api/v1/presets/apps.
 * @member {Number} preset_id
 */
CreateAppV2.prototype['preset_id'] = undefined;

/**
 * Версия окружения для сборки и запуска, например версия Node.js. Можно передать null.
 * @member {String} env_version
 */
CreateAppV2.prototype['env_version'] = undefined;

/**
 * Фреймворк приложения, строка с учётом регистра. Обязателен при создании из Git. Для frontend: `angular`, `astro`, `ember`, `next.js`, `nuxt`, `preact`, `react`, `remix`, `solid`, `solid-start`, `svelte`, `sveltekit`, `tanstack-start`, `vue`, `static-nobuild`, `another`. Для backend: `django`, `express`, `phoenix`, `Spring`, `laravel`, `beego`, `fastapi`, `ASP.NET Core`, `hapi`, `celery`, `flask`, `gin`, `docker`, `docker-compose`, `fastify`, `nest`, `symfony`, `yii`, `next.js`, `nuxt`, `astro`, `tanstack-start`, `solid-start`, `ktor`, `axum`, `actix`, `tornado`, `aiohttp`, `fiber`, `echo`, `Micronaut`, `Quarkus`, `remix`, `sveltekit`. Для готового Docker-образа не требуется.
 * @member {module:model/CreateAppV2.FrameworkEnum} framework
 */
CreateAppV2.prototype['framework'] = undefined;

/**
 * Путь к каталогу с собранными статическими файлами, например /dist. Обязателен для frontend. Не используется для backend.
 * @member {String} index_dir
 */
CreateAppV2.prototype['index_dir'] = undefined;

/**
 * Команда запуска backend-приложения из Git. Обязательна для backend из Git. Не требуется для готового Docker-образа и frontend.
 * @member {String} run_cmd
 */
CreateAppV2.prototype['run_cmd'] = undefined;

/**
 * Системные пакеты для установки в окружение приложения. Допустимы строчные латинские буквы, цифры и символы . + - =. По умолчанию пустой массив.
 * @member {Array.<String>} system_dependencies
 */
CreateAppV2.prototype['system_dependencies'] = undefined;

/**
 * ID проекта, в который необходимо добавить приложение. Проект должен принадлежать аккаунту.
 * @member {Number} project_id
 */
CreateAppV2.prototype['project_id'] = undefined;

/**
 * @member {module:model/CreateAppV2Configuration} configuration
 */
CreateAppV2.prototype['configuration'] = undefined;

/**
 * Язык или способ развёртывания. Обязателен в v2. Для frontend: `javascript`. Для backend: `node`, `elixir`, `go`, `php`, `python`, `ruby`, `docker`, `docker-compose`, `dotnet`, `java`, `kotlin`, `rust`, `bun`, `deno`, `custom-image`. Для SSR-приложений из Git используйте node, для готового Docker-образа — custom-image.
 * @member {module:model/CreateAppV2.LanguageEnum} language
 */
CreateAppV2.prototype['language'] = undefined;

/**
 * Каталог приложения в Git-репозитории, относительно которого выполняется сборка. Непустой путь начинается с /, не содержит .. или двойной начальный /. Допустимы латинские буквы, цифры, . - _ /. Можно передать пустую строку.
 * @member {String} build_entry_path
 */
CreateAppV2.prototype['build_entry_path'] = undefined;

/**
 * @member {module:model/CreateAppV2Network} network
 */
CreateAppV2.prototype['network'] = undefined;

/**
 * HTTP-путь для проверки работоспособности backend-приложения.
 * @member {String} health_check
 */
CreateAppV2.prototype['health_check'] = undefined;

/**
 * ID глобальных переменных окружения аккаунта, которые необходимо связать с приложением.
 * @member {Array.<Number>} global_env_ids
 */
CreateAppV2.prototype['global_env_ids'] = undefined;

/**
 * Имя готового Docker-образа для backend, без тега. Передавайте вместе с docker_image_tag. При указании обоих полей Git-параметры не требуются.
 * @member {String} docker_image
 */
CreateAppV2.prototype['docker_image'] = undefined;

/**
 * Тег готового Docker-образа. Передавайте вместе с docker_image.
 * @member {String} docker_image_tag
 */
CreateAppV2.prototype['docker_image_tag'] = undefined;

/**
 * Добавить доверенные корневые сертификаты Минцифры в окружение backend-приложения. Применяется в российском регионе.
 * @member {Boolean} is_russian_trusted_ca
 * @default false
 */
CreateAppV2.prototype['is_russian_trusted_ca'] = false;

/**
 * Добавить доверенные корневые сертификаты ТЦИ в окружение backend-приложения. Применяется в российском регионе.
 * @member {Boolean} is_tci_trusted_ca
 * @default false
 */
CreateAppV2.prototype['is_tci_trusted_ca'] = false;





/**
 * Allowed values for the <code>type</code> property.
 * @enum {String}
 * @readonly
 */
CreateAppV2['TypeEnum'] = {

    /**
     * value: "frontend"
     * @const
     */
    "frontend": "frontend",

    /**
     * value: "backend"
     * @const
     */
    "backend": "backend"
};


/**
 * Allowed values for the <code>framework</code> property.
 * @enum {String}
 * @readonly
 */
CreateAppV2['FrameworkEnum'] = {

    /**
     * value: "django"
     * @const
     */
    "django": "django",

    /**
     * value: "express"
     * @const
     */
    "express": "express",

    /**
     * value: "phoenix"
     * @const
     */
    "phoenix": "phoenix",

    /**
     * value: "Spring"
     * @const
     */
    "Spring": "Spring",

    /**
     * value: "laravel"
     * @const
     */
    "laravel": "laravel",

    /**
     * value: "beego"
     * @const
     */
    "beego": "beego",

    /**
     * value: "fastapi"
     * @const
     */
    "fastapi": "fastapi",

    /**
     * value: "ASP.NET Core"
     * @const
     */
    "ASP.NET Core": "ASP.NET Core",

    /**
     * value: "hapi"
     * @const
     */
    "hapi": "hapi",

    /**
     * value: "celery"
     * @const
     */
    "celery": "celery",

    /**
     * value: "flask"
     * @const
     */
    "flask": "flask",

    /**
     * value: "gin"
     * @const
     */
    "gin": "gin",

    /**
     * value: "docker"
     * @const
     */
    "docker": "docker",

    /**
     * value: "docker-compose"
     * @const
     */
    "docker-compose": "docker-compose",

    /**
     * value: "fastify"
     * @const
     */
    "fastify": "fastify",

    /**
     * value: "nest"
     * @const
     */
    "nest": "nest",

    /**
     * value: "symfony"
     * @const
     */
    "symfony": "symfony",

    /**
     * value: "yii"
     * @const
     */
    "yii": "yii",

    /**
     * value: "next.js"
     * @const
     */
    "next.js": "next.js",

    /**
     * value: "nuxt"
     * @const
     */
    "nuxt": "nuxt",

    /**
     * value: "astro"
     * @const
     */
    "astro": "astro",

    /**
     * value: "tanstack-start"
     * @const
     */
    "tanstack-start": "tanstack-start",

    /**
     * value: "solid-start"
     * @const
     */
    "solid-start": "solid-start",

    /**
     * value: "ktor"
     * @const
     */
    "ktor": "ktor",

    /**
     * value: "axum"
     * @const
     */
    "axum": "axum",

    /**
     * value: "actix"
     * @const
     */
    "actix": "actix",

    /**
     * value: "tornado"
     * @const
     */
    "tornado": "tornado",

    /**
     * value: "aiohttp"
     * @const
     */
    "aiohttp": "aiohttp",

    /**
     * value: "fiber"
     * @const
     */
    "fiber": "fiber",

    /**
     * value: "echo"
     * @const
     */
    "echo": "echo",

    /**
     * value: "Micronaut"
     * @const
     */
    "Micronaut": "Micronaut",

    /**
     * value: "Quarkus"
     * @const
     */
    "Quarkus": "Quarkus",

    /**
     * value: "remix"
     * @const
     */
    "remix": "remix",

    /**
     * value: "sveltekit"
     * @const
     */
    "sveltekit": "sveltekit",

    /**
     * value: "angular"
     * @const
     */
    "angular": "angular",

    /**
     * value: "ember"
     * @const
     */
    "ember": "ember",

    /**
     * value: "preact"
     * @const
     */
    "preact": "preact",

    /**
     * value: "react"
     * @const
     */
    "react": "react",

    /**
     * value: "solid"
     * @const
     */
    "solid": "solid",

    /**
     * value: "svelte"
     * @const
     */
    "svelte": "svelte",

    /**
     * value: "vue"
     * @const
     */
    "vue": "vue",

    /**
     * value: "static-nobuild"
     * @const
     */
    "static-nobuild": "static-nobuild",

    /**
     * value: "another"
     * @const
     */
    "another": "another"
};


/**
 * Allowed values for the <code>language</code> property.
 * @enum {String}
 * @readonly
 */
CreateAppV2['LanguageEnum'] = {

    /**
     * value: "javascript"
     * @const
     */
    "javascript": "javascript",

    /**
     * value: "node"
     * @const
     */
    "node": "node",

    /**
     * value: "elixir"
     * @const
     */
    "elixir": "elixir",

    /**
     * value: "go"
     * @const
     */
    "go": "go",

    /**
     * value: "php"
     * @const
     */
    "php": "php",

    /**
     * value: "python"
     * @const
     */
    "python": "python",

    /**
     * value: "ruby"
     * @const
     */
    "ruby": "ruby",

    /**
     * value: "docker"
     * @const
     */
    "docker": "docker",

    /**
     * value: "docker-compose"
     * @const
     */
    "docker-compose": "docker-compose",

    /**
     * value: "dotnet"
     * @const
     */
    "dotnet": "dotnet",

    /**
     * value: "java"
     * @const
     */
    "java": "java",

    /**
     * value: "kotlin"
     * @const
     */
    "kotlin": "kotlin",

    /**
     * value: "rust"
     * @const
     */
    "rust": "rust",

    /**
     * value: "bun"
     * @const
     */
    "bun": "bun",

    /**
     * value: "deno"
     * @const
     */
    "deno": "deno",

    /**
     * value: "custom-image"
     * @const
     */
    "custom-image": "custom-image"
};



export default CreateAppV2;

