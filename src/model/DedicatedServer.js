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
 * The DedicatedServer model module.
 * @module model/DedicatedServer
 * @version 1.0.0
 */
class DedicatedServer {
    /**
     * Constructs a new <code>DedicatedServer</code>.
     * Выделенный сервер
     * @alias module:model/DedicatedServer
     * @param id {Number} ID для каждого экземпляра выделенного сервера. Автоматически генерируется при создании.
     * @param cpuDescription {String} Описание параметров процессора выделенного сервера.
     * @param hddDescription {String} Описание параметров жёсткого диска выделенного сервера.
     * @param ramDescription {String} Описание ОЗУ выделенного сервера.
     * @param createdAt {Date} Значение времени, указанное в комбинированном формате даты и времени ISO8601, которое представляет, когда был создан выделенный сервер.
     * @param ip {String} IP-адрес сетевого интерфейса IPv4.
     * @param ipmiIp {String} IP-адрес сетевого интерфейса IPMI.
     * @param ipmiLogin {String} Логин, используемый для входа в IPMI-консоль.
     * @param ipmiPassword {String} Пароль, используемый для входа в IPMI-консоль.
     * @param ipv6 {String} IP-адрес сетевого интерфейса IPv6.
     * @param nodeId {Number} Внутренний дополнительный ID сервера.
     * @param name {String} Удобочитаемое имя, установленное для выделенного сервера.
     * @param comment {String} Комментарий к выделенному серверу.
     * @param vncPass {String} Пароль для подключения к VNC-консоли выделенного сервера.
     * @param status {module:model/DedicatedServer.StatusEnum} Строка состояния, указывающая состояние выделенного сервера. Может быть «installing», «installed», «on» или «off».
     * @param osId {Number} ID операционной системы, установленной на выделенный сервер.
     * @param cpId {Number} ID панели управления, установленной на выделенный сервер.
     * @param bandwidthId {Number} ID интернет-канала, установленного на выделенный сервер.
     * @param networkDriveId {Array.<Number>} Массив уникальных ID сетевых дисков, подключенных к выделенному серверу.
     * @param additionalIpAddrId {Array.<Number>} Массив уникальных ID дополнительных IP-адресов, подключенных к выделенному серверу.
     * @param planId {Number} ID списка дополнительных услуг выделенного сервера.
     * @param price {Number} Стоимость выделенного сервера.
     * @param location {module:model/DedicatedServer.LocationEnum} Локация сервера.
     * @param autoinstallReady {Number} Количество готовых к автоматической выдаче серверов. Если значение равно 0, сервер будет установлен через инженеров.
     * @param password {String} Пароль root сервера или пароль Администратора для серверов Windows.
     * @param avatarLink {String} Ссылка на аватар сервера.
     * @param isPreInstalled {Boolean} Это логическое значение, которое показывает, готов ли выделенный сервер к моментальной выдаче.
     * @param presetId {Number} ID тарифа сервера.
     * @param projectId {Number} ID проекта
     */
    constructor(id, cpuDescription, hddDescription, ramDescription, createdAt, ip, ipmiIp, ipmiLogin, ipmiPassword, ipv6, nodeId, name, comment, vncPass, status, osId, cpId, bandwidthId, networkDriveId, additionalIpAddrId, planId, price, location, autoinstallReady, password, avatarLink, isPreInstalled, presetId, projectId) { 
        
        DedicatedServer.initialize(this, id, cpuDescription, hddDescription, ramDescription, createdAt, ip, ipmiIp, ipmiLogin, ipmiPassword, ipv6, nodeId, name, comment, vncPass, status, osId, cpId, bandwidthId, networkDriveId, additionalIpAddrId, planId, price, location, autoinstallReady, password, avatarLink, isPreInstalled, presetId, projectId);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, id, cpuDescription, hddDescription, ramDescription, createdAt, ip, ipmiIp, ipmiLogin, ipmiPassword, ipv6, nodeId, name, comment, vncPass, status, osId, cpId, bandwidthId, networkDriveId, additionalIpAddrId, planId, price, location, autoinstallReady, password, avatarLink, isPreInstalled, presetId, projectId) { 
        obj['id'] = id;
        obj['cpu_description'] = cpuDescription;
        obj['hdd_description'] = hddDescription;
        obj['ram_description'] = ramDescription;
        obj['created_at'] = createdAt;
        obj['ip'] = ip;
        obj['ipmi_ip'] = ipmiIp;
        obj['ipmi_login'] = ipmiLogin;
        obj['ipmi_password'] = ipmiPassword;
        obj['ipv6'] = ipv6;
        obj['node_id'] = nodeId;
        obj['name'] = name;
        obj['comment'] = comment;
        obj['vnc_pass'] = vncPass;
        obj['status'] = status;
        obj['os_id'] = osId;
        obj['cp_id'] = cpId;
        obj['bandwidth_id'] = bandwidthId;
        obj['network_drive_id'] = networkDriveId;
        obj['additional_ip_addr_id'] = additionalIpAddrId;
        obj['plan_id'] = planId;
        obj['price'] = price;
        obj['location'] = location;
        obj['autoinstall_ready'] = autoinstallReady;
        obj['password'] = password;
        obj['avatar_link'] = avatarLink;
        obj['is_pre_installed'] = isPreInstalled;
        obj['preset_id'] = presetId;
        obj['project_id'] = projectId;
    }

    /**
     * Constructs a <code>DedicatedServer</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/DedicatedServer} obj Optional instance to populate.
     * @return {module:model/DedicatedServer} The populated <code>DedicatedServer</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new DedicatedServer();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'Number');
            }
            if (data.hasOwnProperty('cpu_description')) {
                obj['cpu_description'] = ApiClient.convertToType(data['cpu_description'], 'String');
            }
            if (data.hasOwnProperty('hdd_description')) {
                obj['hdd_description'] = ApiClient.convertToType(data['hdd_description'], 'String');
            }
            if (data.hasOwnProperty('ram_description')) {
                obj['ram_description'] = ApiClient.convertToType(data['ram_description'], 'String');
            }
            if (data.hasOwnProperty('created_at')) {
                obj['created_at'] = ApiClient.convertToType(data['created_at'], 'Date');
            }
            if (data.hasOwnProperty('ip')) {
                obj['ip'] = ApiClient.convertToType(data['ip'], 'String');
            }
            if (data.hasOwnProperty('ipmi_ip')) {
                obj['ipmi_ip'] = ApiClient.convertToType(data['ipmi_ip'], 'String');
            }
            if (data.hasOwnProperty('ipmi_login')) {
                obj['ipmi_login'] = ApiClient.convertToType(data['ipmi_login'], 'String');
            }
            if (data.hasOwnProperty('ipmi_password')) {
                obj['ipmi_password'] = ApiClient.convertToType(data['ipmi_password'], 'String');
            }
            if (data.hasOwnProperty('ipv6')) {
                obj['ipv6'] = ApiClient.convertToType(data['ipv6'], 'String');
            }
            if (data.hasOwnProperty('node_id')) {
                obj['node_id'] = ApiClient.convertToType(data['node_id'], 'Number');
            }
            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('comment')) {
                obj['comment'] = ApiClient.convertToType(data['comment'], 'String');
            }
            if (data.hasOwnProperty('vnc_pass')) {
                obj['vnc_pass'] = ApiClient.convertToType(data['vnc_pass'], 'String');
            }
            if (data.hasOwnProperty('status')) {
                obj['status'] = ApiClient.convertToType(data['status'], 'String');
            }
            if (data.hasOwnProperty('os_id')) {
                obj['os_id'] = ApiClient.convertToType(data['os_id'], 'Number');
            }
            if (data.hasOwnProperty('cp_id')) {
                obj['cp_id'] = ApiClient.convertToType(data['cp_id'], 'Number');
            }
            if (data.hasOwnProperty('bandwidth_id')) {
                obj['bandwidth_id'] = ApiClient.convertToType(data['bandwidth_id'], 'Number');
            }
            if (data.hasOwnProperty('network_drive_id')) {
                obj['network_drive_id'] = ApiClient.convertToType(data['network_drive_id'], ['Number']);
            }
            if (data.hasOwnProperty('additional_ip_addr_id')) {
                obj['additional_ip_addr_id'] = ApiClient.convertToType(data['additional_ip_addr_id'], ['Number']);
            }
            if (data.hasOwnProperty('plan_id')) {
                obj['plan_id'] = ApiClient.convertToType(data['plan_id'], 'Number');
            }
            if (data.hasOwnProperty('price')) {
                obj['price'] = ApiClient.convertToType(data['price'], 'Number');
            }
            if (data.hasOwnProperty('location')) {
                obj['location'] = ApiClient.convertToType(data['location'], 'String');
            }
            if (data.hasOwnProperty('autoinstall_ready')) {
                obj['autoinstall_ready'] = ApiClient.convertToType(data['autoinstall_ready'], 'Number');
            }
            if (data.hasOwnProperty('password')) {
                obj['password'] = ApiClient.convertToType(data['password'], 'String');
            }
            if (data.hasOwnProperty('avatar_link')) {
                obj['avatar_link'] = ApiClient.convertToType(data['avatar_link'], 'String');
            }
            if (data.hasOwnProperty('is_pre_installed')) {
                obj['is_pre_installed'] = ApiClient.convertToType(data['is_pre_installed'], 'Boolean');
            }
            if (data.hasOwnProperty('preset_id')) {
                obj['preset_id'] = ApiClient.convertToType(data['preset_id'], 'Number');
            }
            if (data.hasOwnProperty('project_id')) {
                obj['project_id'] = ApiClient.convertToType(data['project_id'], 'Number');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>DedicatedServer</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>DedicatedServer</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of DedicatedServer.RequiredProperties) {
            if (!data[property]) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }
        // ensure the json data is a string
        if (data['cpu_description'] && !(typeof data['cpu_description'] === 'string' || data['cpu_description'] instanceof String)) {
            throw new Error("Expected the field `cpu_description` to be a primitive type in the JSON string but got " + data['cpu_description']);
        }
        // ensure the json data is a string
        if (data['hdd_description'] && !(typeof data['hdd_description'] === 'string' || data['hdd_description'] instanceof String)) {
            throw new Error("Expected the field `hdd_description` to be a primitive type in the JSON string but got " + data['hdd_description']);
        }
        // ensure the json data is a string
        if (data['ram_description'] && !(typeof data['ram_description'] === 'string' || data['ram_description'] instanceof String)) {
            throw new Error("Expected the field `ram_description` to be a primitive type in the JSON string but got " + data['ram_description']);
        }
        // ensure the json data is a string
        if (data['ip'] && !(typeof data['ip'] === 'string' || data['ip'] instanceof String)) {
            throw new Error("Expected the field `ip` to be a primitive type in the JSON string but got " + data['ip']);
        }
        // ensure the json data is a string
        if (data['ipmi_ip'] && !(typeof data['ipmi_ip'] === 'string' || data['ipmi_ip'] instanceof String)) {
            throw new Error("Expected the field `ipmi_ip` to be a primitive type in the JSON string but got " + data['ipmi_ip']);
        }
        // ensure the json data is a string
        if (data['ipmi_login'] && !(typeof data['ipmi_login'] === 'string' || data['ipmi_login'] instanceof String)) {
            throw new Error("Expected the field `ipmi_login` to be a primitive type in the JSON string but got " + data['ipmi_login']);
        }
        // ensure the json data is a string
        if (data['ipmi_password'] && !(typeof data['ipmi_password'] === 'string' || data['ipmi_password'] instanceof String)) {
            throw new Error("Expected the field `ipmi_password` to be a primitive type in the JSON string but got " + data['ipmi_password']);
        }
        // ensure the json data is a string
        if (data['ipv6'] && !(typeof data['ipv6'] === 'string' || data['ipv6'] instanceof String)) {
            throw new Error("Expected the field `ipv6` to be a primitive type in the JSON string but got " + data['ipv6']);
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
        if (data['vnc_pass'] && !(typeof data['vnc_pass'] === 'string' || data['vnc_pass'] instanceof String)) {
            throw new Error("Expected the field `vnc_pass` to be a primitive type in the JSON string but got " + data['vnc_pass']);
        }
        // ensure the json data is a string
        if (data['status'] && !(typeof data['status'] === 'string' || data['status'] instanceof String)) {
            throw new Error("Expected the field `status` to be a primitive type in the JSON string but got " + data['status']);
        }
        // ensure the json data is an array
        if (!Array.isArray(data['network_drive_id'])) {
            throw new Error("Expected the field `network_drive_id` to be an array in the JSON data but got " + data['network_drive_id']);
        }
        // ensure the json data is an array
        if (!Array.isArray(data['additional_ip_addr_id'])) {
            throw new Error("Expected the field `additional_ip_addr_id` to be an array in the JSON data but got " + data['additional_ip_addr_id']);
        }
        // ensure the json data is a string
        if (data['location'] && !(typeof data['location'] === 'string' || data['location'] instanceof String)) {
            throw new Error("Expected the field `location` to be a primitive type in the JSON string but got " + data['location']);
        }
        // ensure the json data is a string
        if (data['password'] && !(typeof data['password'] === 'string' || data['password'] instanceof String)) {
            throw new Error("Expected the field `password` to be a primitive type in the JSON string but got " + data['password']);
        }
        // ensure the json data is a string
        if (data['avatar_link'] && !(typeof data['avatar_link'] === 'string' || data['avatar_link'] instanceof String)) {
            throw new Error("Expected the field `avatar_link` to be a primitive type in the JSON string but got " + data['avatar_link']);
        }

        return true;
    }


}

DedicatedServer.RequiredProperties = ["id", "cpu_description", "hdd_description", "ram_description", "created_at", "ip", "ipmi_ip", "ipmi_login", "ipmi_password", "ipv6", "node_id", "name", "comment", "vnc_pass", "status", "os_id", "cp_id", "bandwidth_id", "network_drive_id", "additional_ip_addr_id", "plan_id", "price", "location", "autoinstall_ready", "password", "avatar_link", "is_pre_installed", "preset_id", "project_id"];

/**
 * ID для каждого экземпляра выделенного сервера. Автоматически генерируется при создании.
 * @member {Number} id
 */
DedicatedServer.prototype['id'] = undefined;

/**
 * Описание параметров процессора выделенного сервера.
 * @member {String} cpu_description
 */
DedicatedServer.prototype['cpu_description'] = undefined;

/**
 * Описание параметров жёсткого диска выделенного сервера.
 * @member {String} hdd_description
 */
DedicatedServer.prototype['hdd_description'] = undefined;

/**
 * Описание ОЗУ выделенного сервера.
 * @member {String} ram_description
 */
DedicatedServer.prototype['ram_description'] = undefined;

/**
 * Значение времени, указанное в комбинированном формате даты и времени ISO8601, которое представляет, когда был создан выделенный сервер.
 * @member {Date} created_at
 */
DedicatedServer.prototype['created_at'] = undefined;

/**
 * IP-адрес сетевого интерфейса IPv4.
 * @member {String} ip
 */
DedicatedServer.prototype['ip'] = undefined;

/**
 * IP-адрес сетевого интерфейса IPMI.
 * @member {String} ipmi_ip
 */
DedicatedServer.prototype['ipmi_ip'] = undefined;

/**
 * Логин, используемый для входа в IPMI-консоль.
 * @member {String} ipmi_login
 */
DedicatedServer.prototype['ipmi_login'] = undefined;

/**
 * Пароль, используемый для входа в IPMI-консоль.
 * @member {String} ipmi_password
 */
DedicatedServer.prototype['ipmi_password'] = undefined;

/**
 * IP-адрес сетевого интерфейса IPv6.
 * @member {String} ipv6
 */
DedicatedServer.prototype['ipv6'] = undefined;

/**
 * Внутренний дополнительный ID сервера.
 * @member {Number} node_id
 */
DedicatedServer.prototype['node_id'] = undefined;

/**
 * Удобочитаемое имя, установленное для выделенного сервера.
 * @member {String} name
 */
DedicatedServer.prototype['name'] = undefined;

/**
 * Комментарий к выделенному серверу.
 * @member {String} comment
 */
DedicatedServer.prototype['comment'] = undefined;

/**
 * Пароль для подключения к VNC-консоли выделенного сервера.
 * @member {String} vnc_pass
 */
DedicatedServer.prototype['vnc_pass'] = undefined;

/**
 * Строка состояния, указывающая состояние выделенного сервера. Может быть «installing», «installed», «on» или «off».
 * @member {module:model/DedicatedServer.StatusEnum} status
 */
DedicatedServer.prototype['status'] = undefined;

/**
 * ID операционной системы, установленной на выделенный сервер.
 * @member {Number} os_id
 */
DedicatedServer.prototype['os_id'] = undefined;

/**
 * ID панели управления, установленной на выделенный сервер.
 * @member {Number} cp_id
 */
DedicatedServer.prototype['cp_id'] = undefined;

/**
 * ID интернет-канала, установленного на выделенный сервер.
 * @member {Number} bandwidth_id
 */
DedicatedServer.prototype['bandwidth_id'] = undefined;

/**
 * Массив уникальных ID сетевых дисков, подключенных к выделенному серверу.
 * @member {Array.<Number>} network_drive_id
 */
DedicatedServer.prototype['network_drive_id'] = undefined;

/**
 * Массив уникальных ID дополнительных IP-адресов, подключенных к выделенному серверу.
 * @member {Array.<Number>} additional_ip_addr_id
 */
DedicatedServer.prototype['additional_ip_addr_id'] = undefined;

/**
 * ID списка дополнительных услуг выделенного сервера.
 * @member {Number} plan_id
 */
DedicatedServer.prototype['plan_id'] = undefined;

/**
 * Стоимость выделенного сервера.
 * @member {Number} price
 */
DedicatedServer.prototype['price'] = undefined;

/**
 * Локация сервера.
 * @member {module:model/DedicatedServer.LocationEnum} location
 */
DedicatedServer.prototype['location'] = undefined;

/**
 * Количество готовых к автоматической выдаче серверов. Если значение равно 0, сервер будет установлен через инженеров.
 * @member {Number} autoinstall_ready
 */
DedicatedServer.prototype['autoinstall_ready'] = undefined;

/**
 * Пароль root сервера или пароль Администратора для серверов Windows.
 * @member {String} password
 */
DedicatedServer.prototype['password'] = undefined;

/**
 * Ссылка на аватар сервера.
 * @member {String} avatar_link
 */
DedicatedServer.prototype['avatar_link'] = undefined;

/**
 * Это логическое значение, которое показывает, готов ли выделенный сервер к моментальной выдаче.
 * @member {Boolean} is_pre_installed
 */
DedicatedServer.prototype['is_pre_installed'] = undefined;

/**
 * ID тарифа сервера.
 * @member {Number} preset_id
 */
DedicatedServer.prototype['preset_id'] = undefined;

/**
 * ID проекта
 * @member {Number} project_id
 */
DedicatedServer.prototype['project_id'] = undefined;





/**
 * Allowed values for the <code>status</code> property.
 * @enum {String}
 * @readonly
 */
DedicatedServer['StatusEnum'] = {

    /**
     * value: "installing"
     * @const
     */
    "installing": "installing",

    /**
     * value: "installed"
     * @const
     */
    "installed": "installed",

    /**
     * value: "on"
     * @const
     */
    "on": "on",

    /**
     * value: "off"
     * @const
     */
    "off": "off"
};


/**
 * Allowed values for the <code>location</code> property.
 * @enum {String}
 * @readonly
 */
DedicatedServer['LocationEnum'] = {

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
     * value: "tr-1"
     * @const
     */
    "tr-1": "tr-1",

    /**
     * value: "us-2"
     * @const
     */
    "us-2": "us-2",

    /**
     * value: "de-1"
     * @const
     */
    "de-1": "de-1",

    /**
     * value: "fi-1"
     * @const
     */
    "fi-1": "fi-1"
};



export default DedicatedServer;

