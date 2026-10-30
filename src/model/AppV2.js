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
import AppV2Configuration from './AppV2Configuration';
import AppV2DiskStatus from './AppV2DiskStatus';
import AppV2DomainsInner from './AppV2DomainsInner';
import AppV2Provider from './AppV2Provider';
import Repository from './Repository';

/**
 * The AppV2 model module.
 * @module model/AppV2
 * @version 1.0.0
 */
class AppV2 {
    /**
     * Constructs a new <code>AppV2</code>.
     * Приложение v2. Создание и первый деплой выполняются асинхронно. Поля сервера и инфраструктуры могут отсутствовать, пока соответствующие ресурсы не созданы.
     * @alias module:model/AppV2
     * @param id {Number} ID для каждого экземпляра приложения. Автоматически генерируется при создании.
     * @param type {module:model/AppV2.TypeEnum} Тип приложения.
     * @param name {String} Удобочитаемое имя, установленное для приложения.
     * @param status {module:model/AppV2.StatusEnum} Текущее состояние приложения. После принятия запроса на создание — new. Ответ 201 не означает завершение развёртывания.
     * @param provider {module:model/AppV2Provider} 
     * @param domains {Array.<module:model/AppV2DomainsInner>} Домены приложения. В начальном ответе на создание массив пуст.
     * @param isAutoDeploy {Boolean} Включен ли автоматический деплой.
     * @param presetId {Number} ID тарифа приложения; 0 при использовании конфигуратора.
     * @param avatarLink {String} Ссылка на аватар приложения.
     * @param startTime {Date} Время последнего изменения записи приложения.
     * @param configuratorId {Number} ID конфигуратора приложения; null при использовании готового тарифа.
     * @param createdAt {Date} Время создания записи приложения.
     * @param requestsLimit {Number} Ограничение количества запросов; null, если индивидуальный лимит не задан.
     * @param reverseProxy {Object} Настройки обратного прокси. В начальном ответе на создание — null.
     */
    constructor(id, type, name, status, provider, domains, isAutoDeploy, presetId, avatarLink, startTime, configuratorId, createdAt, requestsLimit, reverseProxy) { 
        
        AppV2.initialize(this, id, type, name, status, provider, domains, isAutoDeploy, presetId, avatarLink, startTime, configuratorId, createdAt, requestsLimit, reverseProxy);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, id, type, name, status, provider, domains, isAutoDeploy, presetId, avatarLink, startTime, configuratorId, createdAt, requestsLimit, reverseProxy) { 
        obj['id'] = id;
        obj['type'] = type;
        obj['name'] = name;
        obj['status'] = status;
        obj['provider'] = provider;
        obj['domains'] = domains;
        obj['is_auto_deploy'] = isAutoDeploy;
        obj['preset_id'] = presetId;
        obj['avatar_link'] = avatarLink;
        obj['start_time'] = startTime;
        obj['configurator_id'] = configuratorId;
        obj['created_at'] = createdAt;
        obj['requests_limit'] = requestsLimit;
        obj['reverse_proxy'] = reverseProxy;
    }

    /**
     * Constructs a <code>AppV2</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AppV2} obj Optional instance to populate.
     * @return {module:model/AppV2} The populated <code>AppV2</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new AppV2();

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
                obj['provider'] = AppV2Provider.constructFromObject(data['provider']);
            }
            if (data.hasOwnProperty('ip')) {
                obj['ip'] = ApiClient.convertToType(data['ip'], 'String');
            }
            if (data.hasOwnProperty('domains')) {
                obj['domains'] = ApiClient.convertToType(data['domains'], [AppV2DomainsInner]);
            }
            if (data.hasOwnProperty('framework')) {
                obj['framework'] = ApiClient.convertToType(data['framework'], 'String');
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
                obj['envs'] = ApiClient.convertToType(data['envs'], {'String': 'String'});
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
            if (data.hasOwnProperty('avatar_link')) {
                obj['avatar_link'] = ApiClient.convertToType(data['avatar_link'], 'String');
            }
            if (data.hasOwnProperty('run_cmd')) {
                obj['run_cmd'] = ApiClient.convertToType(data['run_cmd'], 'String');
            }
            if (data.hasOwnProperty('configuration')) {
                obj['configuration'] = AppV2Configuration.constructFromObject(data['configuration']);
            }
            if (data.hasOwnProperty('disk_status')) {
                obj['disk_status'] = AppV2DiskStatus.constructFromObject(data['disk_status']);
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
            if (data.hasOwnProperty('branch')) {
                obj['branch'] = ApiClient.convertToType(data['branch'], 'String');
            }
            if (data.hasOwnProperty('configurator_id')) {
                obj['configurator_id'] = ApiClient.convertToType(data['configurator_id'], 'Number');
            }
            if (data.hasOwnProperty('project_id')) {
                obj['project_id'] = ApiClient.convertToType(data['project_id'], 'Number');
            }
            if (data.hasOwnProperty('system_dependencies')) {
                obj['system_dependencies'] = ApiClient.convertToType(data['system_dependencies'], ['String']);
            }
            if (data.hasOwnProperty('created_at')) {
                obj['created_at'] = ApiClient.convertToType(data['created_at'], 'Date');
            }
            if (data.hasOwnProperty('availability_zone')) {
                obj['availability_zone'] = ApiClient.convertToType(data['availability_zone'], 'String');
            }
            if (data.hasOwnProperty('requests_limit')) {
                obj['requests_limit'] = ApiClient.convertToType(data['requests_limit'], 'Number');
            }
            if (data.hasOwnProperty('build_entry_path')) {
                obj['build_entry_path'] = ApiClient.convertToType(data['build_entry_path'], 'String');
            }
            if (data.hasOwnProperty('health_check')) {
                obj['health_check'] = ApiClient.convertToType(data['health_check'], 'String');
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
            if (data.hasOwnProperty('blocked_ports')) {
                obj['blocked_ports'] = ApiClient.convertToType(data['blocked_ports'], ['Number']);
            }
            if (data.hasOwnProperty('reverse_proxy')) {
                obj['reverse_proxy'] = ApiClient.convertToType(data['reverse_proxy'], Object);
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>AppV2</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>AppV2</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of AppV2.RequiredProperties) {
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
          AppV2Provider.validateJSON(data['provider']);
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
                AppV2DomainsInner.validateJSON(item);
            };
        }
        // ensure the json data is a string
        if (data['framework'] && !(typeof data['framework'] === 'string' || data['framework'] instanceof String)) {
            throw new Error("Expected the field `framework` to be a primitive type in the JSON string but got " + data['framework']);
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
        if (data['avatar_link'] && !(typeof data['avatar_link'] === 'string' || data['avatar_link'] instanceof String)) {
            throw new Error("Expected the field `avatar_link` to be a primitive type in the JSON string but got " + data['avatar_link']);
        }
        // ensure the json data is a string
        if (data['run_cmd'] && !(typeof data['run_cmd'] === 'string' || data['run_cmd'] instanceof String)) {
            throw new Error("Expected the field `run_cmd` to be a primitive type in the JSON string but got " + data['run_cmd']);
        }
        // validate the optional field `configuration`
        if (data['configuration']) { // data not null
          AppV2Configuration.validateJSON(data['configuration']);
        }
        // validate the optional field `disk_status`
        if (data['disk_status']) { // data not null
          AppV2DiskStatus.validateJSON(data['disk_status']);
        }
        // ensure the json data is a string
        if (data['language'] && !(typeof data['language'] === 'string' || data['language'] instanceof String)) {
            throw new Error("Expected the field `language` to be a primitive type in the JSON string but got " + data['language']);
        }
        // ensure the json data is a string
        if (data['branch'] && !(typeof data['branch'] === 'string' || data['branch'] instanceof String)) {
            throw new Error("Expected the field `branch` to be a primitive type in the JSON string but got " + data['branch']);
        }
        // ensure the json data is an array
        if (!Array.isArray(data['system_dependencies'])) {
            throw new Error("Expected the field `system_dependencies` to be an array in the JSON data but got " + data['system_dependencies']);
        }
        // ensure the json data is a string
        if (data['availability_zone'] && !(typeof data['availability_zone'] === 'string' || data['availability_zone'] instanceof String)) {
            throw new Error("Expected the field `availability_zone` to be a primitive type in the JSON string but got " + data['availability_zone']);
        }
        // ensure the json data is a string
        if (data['build_entry_path'] && !(typeof data['build_entry_path'] === 'string' || data['build_entry_path'] instanceof String)) {
            throw new Error("Expected the field `build_entry_path` to be a primitive type in the JSON string but got " + data['build_entry_path']);
        }
        // ensure the json data is a string
        if (data['health_check'] && !(typeof data['health_check'] === 'string' || data['health_check'] instanceof String)) {
            throw new Error("Expected the field `health_check` to be a primitive type in the JSON string but got " + data['health_check']);
        }
        // ensure the json data is a string
        if (data['docker_image'] && !(typeof data['docker_image'] === 'string' || data['docker_image'] instanceof String)) {
            throw new Error("Expected the field `docker_image` to be a primitive type in the JSON string but got " + data['docker_image']);
        }
        // ensure the json data is a string
        if (data['docker_image_tag'] && !(typeof data['docker_image_tag'] === 'string' || data['docker_image_tag'] instanceof String)) {
            throw new Error("Expected the field `docker_image_tag` to be a primitive type in the JSON string but got " + data['docker_image_tag']);
        }
        // ensure the json data is an array
        if (!Array.isArray(data['blocked_ports'])) {
            throw new Error("Expected the field `blocked_ports` to be an array in the JSON data but got " + data['blocked_ports']);
        }

        return true;
    }


}

AppV2.RequiredProperties = ["id", "type", "name", "status", "provider", "domains", "is_auto_deploy", "preset_id", "avatar_link", "start_time", "configurator_id", "created_at", "requests_limit", "reverse_proxy"];

/**
 * ID для каждого экземпляра приложения. Автоматически генерируется при создании.
 * @member {Number} id
 */
AppV2.prototype['id'] = undefined;

/**
 * Тип приложения.
 * @member {module:model/AppV2.TypeEnum} type
 */
AppV2.prototype['type'] = undefined;

/**
 * Удобочитаемое имя, установленное для приложения.
 * @member {String} name
 */
AppV2.prototype['name'] = undefined;

/**
 * Текущее состояние приложения. После принятия запроса на создание — new. Ответ 201 не означает завершение развёртывания.
 * @member {module:model/AppV2.StatusEnum} status
 */
AppV2.prototype['status'] = undefined;

/**
 * @member {module:model/AppV2Provider} provider
 */
AppV2.prototype['provider'] = undefined;

/**
 * Публичный IPv4-адрес. Отсутствует, пока сервер и IP-адрес не созданы.
 * @member {String} ip
 */
AppV2.prototype['ip'] = undefined;

/**
 * Домены приложения. В начальном ответе на создание массив пуст.
 * @member {Array.<module:model/AppV2DomainsInner>} domains
 */
AppV2.prototype['domains'] = undefined;

/**
 * Фреймворк приложения. Поле может отсутствовать до создания инфраструктуры.
 * @member {module:model/AppV2.FrameworkEnum} framework
 */
AppV2.prototype['framework'] = undefined;

/**
 * Локация сервера. Может отсутствовать до создания сервера.
 * @member {module:model/AppV2.LocationEnum} location
 */
AppV2.prototype['location'] = undefined;

/**
 * @member {module:model/Repository} repository
 */
AppV2.prototype['repository'] = undefined;

/**
 * Версия окружения. Поле может отсутствовать до создания инфраструктуры.
 * @member {String} env_version
 */
AppV2.prototype['env_version'] = undefined;

/**
 * Переменные окружения приложения. Объект с ключами и значениями типа string. Поле может отсутствовать до создания инфраструктуры.
 * @member {Object.<String, String>} envs
 */
AppV2.prototype['envs'] = undefined;

/**
 * Включен ли автоматический деплой.
 * @member {Boolean} is_auto_deploy
 */
AppV2.prototype['is_auto_deploy'] = undefined;

/**
 * Хэш коммита, из которого собрано приложение.
 * @member {String} commit_sha
 */
AppV2.prototype['commit_sha'] = undefined;

/**
 * Комментарий к приложению.
 * @member {String} comment
 */
AppV2.prototype['comment'] = undefined;

/**
 * ID тарифа приложения; 0 при использовании конфигуратора.
 * @member {Number} preset_id
 */
AppV2.prototype['preset_id'] = undefined;

/**
 * Каталог со статическими файлами frontend-приложения. До создания инфраструктуры поле отсутствует. Для backend — null.
 * @member {String} index_dir
 */
AppV2.prototype['index_dir'] = undefined;

/**
 * Команда сборки приложения. Поле может отсутствовать до создания инфраструктуры.
 * @member {String} build_cmd
 */
AppV2.prototype['build_cmd'] = undefined;

/**
 * Ссылка на аватар приложения.
 * @member {String} avatar_link
 */
AppV2.prototype['avatar_link'] = undefined;

/**
 * Команда запуска backend-приложения. До создания инфраструктуры поле отсутствует. Для frontend — null.
 * @member {String} run_cmd
 */
AppV2.prototype['run_cmd'] = undefined;

/**
 * @member {module:model/AppV2Configuration} configuration
 */
AppV2.prototype['configuration'] = undefined;

/**
 * @member {module:model/AppV2DiskStatus} disk_status
 */
AppV2.prototype['disk_status'] = undefined;

/**
 * Включён ли агент QEMU. Для frontend — null. Для backend поле отсутствует до создания сервера.
 * @member {Boolean} is_qemu_agent
 */
AppV2.prototype['is_qemu_agent'] = undefined;

/**
 * Язык или способ развёртывания. Может отсутствовать до создания инфраструктуры. Поле может отсутствовать до создания инфраструктуры.
 * @member {module:model/AppV2.LanguageEnum} language
 */
AppV2.prototype['language'] = undefined;

/**
 * Время последнего изменения записи приложения.
 * @member {Date} start_time
 */
AppV2.prototype['start_time'] = undefined;

/**
 * Ветка Git-репозитория. В ответе v2 поле называется branch.
 * @member {String} branch
 */
AppV2.prototype['branch'] = undefined;

/**
 * ID конфигуратора приложения; null при использовании готового тарифа.
 * @member {Number} configurator_id
 */
AppV2.prototype['configurator_id'] = undefined;

/**
 * ID проекта приложения. Может отсутствовать, если проект не задан.
 * @member {Number} project_id
 */
AppV2.prototype['project_id'] = undefined;

/**
 * Системные пакеты приложения. Поле отсутствует, если зависимости не заданы.
 * @member {Array.<String>} system_dependencies
 */
AppV2.prototype['system_dependencies'] = undefined;

/**
 * Время создания записи приложения.
 * @member {Date} created_at
 */
AppV2.prototype['created_at'] = undefined;

/**
 * Зона доступности сервера. Может быть null или отсутствовать до создания сервера.
 * @member {module:model/AppV2.AvailabilityZoneEnum} availability_zone
 */
AppV2.prototype['availability_zone'] = undefined;

/**
 * Ограничение количества запросов; null, если индивидуальный лимит не задан.
 * @member {Number} requests_limit
 */
AppV2.prototype['requests_limit'] = undefined;

/**
 * Каталог приложения в Git-репозитории, относительно которого выполняется сборка. Может отсутствовать до создания инфраструктуры.
 * @member {String} build_entry_path
 */
AppV2.prototype['build_entry_path'] = undefined;

/**
 * HTTP-путь для проверки работоспособности backend-приложения. Может отсутствовать до создания инфраструктуры.
 * @member {String} health_check
 */
AppV2.prototype['health_check'] = undefined;

/**
 * Имя готового Docker-образа без тега. Присутствует для backend из готового Docker-образа.
 * @member {String} docker_image
 */
AppV2.prototype['docker_image'] = undefined;

/**
 * Тег готового Docker-образа. Присутствует для backend из готового Docker-образа.
 * @member {String} docker_image_tag
 */
AppV2.prototype['docker_image_tag'] = undefined;

/**
 * Добавлены ли доверенные корневые сертификаты Минцифры в окружение backend-приложения. Поле возвращается в российском регионе после создания инфраструктуры.
 * @member {Boolean} is_russian_trusted_ca
 */
AppV2.prototype['is_russian_trusted_ca'] = undefined;

/**
 * Добавлены ли доверенные корневые сертификаты ТЦИ в окружение backend-приложения. Поле возвращается в российском регионе после создания инфраструктуры.
 * @member {Boolean} is_tci_trusted_ca
 */
AppV2.prototype['is_tci_trusted_ca'] = undefined;

/**
 * Заблокированные порты backend-приложения. Поле может отсутствовать до создания сервера.
 * @member {Array.<Number>} blocked_ports
 */
AppV2.prototype['blocked_ports'] = undefined;

/**
 * Настройки обратного прокси. В начальном ответе на создание — null.
 * @member {Object} reverse_proxy
 */
AppV2.prototype['reverse_proxy'] = undefined;





/**
 * Allowed values for the <code>type</code> property.
 * @enum {String}
 * @readonly
 */
AppV2['TypeEnum'] = {

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
AppV2['StatusEnum'] = {

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
    "reboot": "reboot",

    /**
     * value: "blocked"
     * @const
     */
    "blocked": "blocked",

    /**
     * value: "request_limit_exceeded"
     * @const
     */
    "request_limit_exceeded": "request_limit_exceeded"
};


/**
 * Allowed values for the <code>framework</code> property.
 * @enum {String}
 * @readonly
 */
AppV2['FrameworkEnum'] = {

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
 * Allowed values for the <code>location</code> property.
 * @enum {String}
 * @readonly
 */
AppV2['LocationEnum'] = {

    /**
     * value: "ru-1"
     * @const
     */
    "ru-1": "ru-1",

    /**
     * value: "ru-2"
     * @const
     */
    "ru-2": "ru-2",

    /**
     * value: "ru-3"
     * @const
     */
    "ru-3": "ru-3",

    /**
     * value: "pl-1"
     * @const
     */
    "pl-1": "pl-1",

    /**
     * value: "kz-1"
     * @const
     */
    "kz-1": "kz-1",

    /**
     * value: "nl-1"
     * @const
     */
    "nl-1": "nl-1",

    /**
     * value: "us-1"
     * @const
     */
    "us-1": "us-1",

    /**
     * value: "us-2"
     * @const
     */
    "us-2": "us-2",

    /**
     * value: "de-1"
     * @const
     */
    "de-1": "de-1"
};


/**
 * Allowed values for the <code>language</code> property.
 * @enum {String}
 * @readonly
 */
AppV2['LanguageEnum'] = {

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


/**
 * Allowed values for the <code>availability_zone</code> property.
 * @enum {String}
 * @readonly
 */
AppV2['AvailabilityZoneEnum'] = {

    /**
     * value: "spb-1"
     * @const
     */
    "spb-1": "spb-1",

    /**
     * value: "spb-2"
     * @const
     */
    "spb-2": "spb-2",

    /**
     * value: "spb-3"
     * @const
     */
    "spb-3": "spb-3",

    /**
     * value: "spb-4"
     * @const
     */
    "spb-4": "spb-4",

    /**
     * value: "nsk-1"
     * @const
     */
    "nsk-1": "nsk-1",

    /**
     * value: "ams-1"
     * @const
     */
    "ams-1": "ams-1",

    /**
     * value: "gdn-1"
     * @const
     */
    "gdn-1": "gdn-1",

    /**
     * value: "ala-1"
     * @const
     */
    "ala-1": "ala-1",

    /**
     * value: "nyc-1"
     * @const
     */
    "nyc-1": "nyc-1",

    /**
     * value: "msk-1"
     * @const
     */
    "msk-1": "msk-1"
};



export default AppV2;

