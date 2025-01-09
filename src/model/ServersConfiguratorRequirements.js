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
 * The ServersConfiguratorRequirements model module.
 * @module model/ServersConfiguratorRequirements
 * @version 1.0.0
 */
class ServersConfiguratorRequirements {
    /**
     * Constructs a new <code>ServersConfiguratorRequirements</code>.
     * @alias module:model/ServersConfiguratorRequirements
     * @param cpuMin {Number} Минимальное количество ядер процессора.
     * @param cpuStep {Number} Размер шага ядер процессора.
     * @param cpuMax {Number} Максимальное количество ядер процессора.
     * @param ramMin {Number} Минимальное количество оперативной памяти (в Мб).
     * @param ramStep {Number} Размер шага оперативной памяти.
     * @param ramMax {Number} Максимальное количество оперативной памяти (в Мб).
     * @param diskMin {Number} Минимальный размер диска (в Мб).
     * @param diskStep {Number} Размер шага диска
     * @param diskMax {Number} Максимальный размер диска (в Мб).
     * @param networkBandwidthMin {Number} Минимальныая пропускная способноть интернет-канала (в Мб)
     * @param networkBandwidthStep {Number} Размер шага пропускной способноти интернет-канала (в Мб)
     * @param networkBandwidthMax {Number} Максимальная пропускная способноть интернет-канала (в Мб)
     * @param gpuMin {Number} Минимальное количество видеокарт
     * @param gpuMax {Number} Максимальное количество видеокарт
     * @param gpuStep {Number} Размер шага видеокарт
     */
    constructor(cpuMin, cpuStep, cpuMax, ramMin, ramStep, ramMax, diskMin, diskStep, diskMax, networkBandwidthMin, networkBandwidthStep, networkBandwidthMax, gpuMin, gpuMax, gpuStep) { 
        
        ServersConfiguratorRequirements.initialize(this, cpuMin, cpuStep, cpuMax, ramMin, ramStep, ramMax, diskMin, diskStep, diskMax, networkBandwidthMin, networkBandwidthStep, networkBandwidthMax, gpuMin, gpuMax, gpuStep);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, cpuMin, cpuStep, cpuMax, ramMin, ramStep, ramMax, diskMin, diskStep, diskMax, networkBandwidthMin, networkBandwidthStep, networkBandwidthMax, gpuMin, gpuMax, gpuStep) { 
        obj['cpu_min'] = cpuMin;
        obj['cpu_step'] = cpuStep;
        obj['cpu_max'] = cpuMax;
        obj['ram_min'] = ramMin;
        obj['ram_step'] = ramStep;
        obj['ram_max'] = ramMax;
        obj['disk_min'] = diskMin;
        obj['disk_step'] = diskStep;
        obj['disk_max'] = diskMax;
        obj['network_bandwidth_min'] = networkBandwidthMin;
        obj['network_bandwidth_step'] = networkBandwidthStep;
        obj['network_bandwidth_max'] = networkBandwidthMax;
        obj['gpu_min'] = gpuMin;
        obj['gpu_max'] = gpuMax;
        obj['gpu_step'] = gpuStep;
    }

    /**
     * Constructs a <code>ServersConfiguratorRequirements</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ServersConfiguratorRequirements} obj Optional instance to populate.
     * @return {module:model/ServersConfiguratorRequirements} The populated <code>ServersConfiguratorRequirements</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new ServersConfiguratorRequirements();

            if (data.hasOwnProperty('cpu_min')) {
                obj['cpu_min'] = ApiClient.convertToType(data['cpu_min'], 'Number');
            }
            if (data.hasOwnProperty('cpu_step')) {
                obj['cpu_step'] = ApiClient.convertToType(data['cpu_step'], 'Number');
            }
            if (data.hasOwnProperty('cpu_max')) {
                obj['cpu_max'] = ApiClient.convertToType(data['cpu_max'], 'Number');
            }
            if (data.hasOwnProperty('ram_min')) {
                obj['ram_min'] = ApiClient.convertToType(data['ram_min'], 'Number');
            }
            if (data.hasOwnProperty('ram_step')) {
                obj['ram_step'] = ApiClient.convertToType(data['ram_step'], 'Number');
            }
            if (data.hasOwnProperty('ram_max')) {
                obj['ram_max'] = ApiClient.convertToType(data['ram_max'], 'Number');
            }
            if (data.hasOwnProperty('disk_min')) {
                obj['disk_min'] = ApiClient.convertToType(data['disk_min'], 'Number');
            }
            if (data.hasOwnProperty('disk_step')) {
                obj['disk_step'] = ApiClient.convertToType(data['disk_step'], 'Number');
            }
            if (data.hasOwnProperty('disk_max')) {
                obj['disk_max'] = ApiClient.convertToType(data['disk_max'], 'Number');
            }
            if (data.hasOwnProperty('network_bandwidth_min')) {
                obj['network_bandwidth_min'] = ApiClient.convertToType(data['network_bandwidth_min'], 'Number');
            }
            if (data.hasOwnProperty('network_bandwidth_step')) {
                obj['network_bandwidth_step'] = ApiClient.convertToType(data['network_bandwidth_step'], 'Number');
            }
            if (data.hasOwnProperty('network_bandwidth_max')) {
                obj['network_bandwidth_max'] = ApiClient.convertToType(data['network_bandwidth_max'], 'Number');
            }
            if (data.hasOwnProperty('gpu_min')) {
                obj['gpu_min'] = ApiClient.convertToType(data['gpu_min'], 'Number');
            }
            if (data.hasOwnProperty('gpu_max')) {
                obj['gpu_max'] = ApiClient.convertToType(data['gpu_max'], 'Number');
            }
            if (data.hasOwnProperty('gpu_step')) {
                obj['gpu_step'] = ApiClient.convertToType(data['gpu_step'], 'Number');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>ServersConfiguratorRequirements</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>ServersConfiguratorRequirements</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of ServersConfiguratorRequirements.RequiredProperties) {
            if (!data[property]) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }

        return true;
    }


}

ServersConfiguratorRequirements.RequiredProperties = ["cpu_min", "cpu_step", "cpu_max", "ram_min", "ram_step", "ram_max", "disk_min", "disk_step", "disk_max", "network_bandwidth_min", "network_bandwidth_step", "network_bandwidth_max", "gpu_min", "gpu_max", "gpu_step"];

/**
 * Минимальное количество ядер процессора.
 * @member {Number} cpu_min
 */
ServersConfiguratorRequirements.prototype['cpu_min'] = undefined;

/**
 * Размер шага ядер процессора.
 * @member {Number} cpu_step
 */
ServersConfiguratorRequirements.prototype['cpu_step'] = undefined;

/**
 * Максимальное количество ядер процессора.
 * @member {Number} cpu_max
 */
ServersConfiguratorRequirements.prototype['cpu_max'] = undefined;

/**
 * Минимальное количество оперативной памяти (в Мб).
 * @member {Number} ram_min
 */
ServersConfiguratorRequirements.prototype['ram_min'] = undefined;

/**
 * Размер шага оперативной памяти.
 * @member {Number} ram_step
 */
ServersConfiguratorRequirements.prototype['ram_step'] = undefined;

/**
 * Максимальное количество оперативной памяти (в Мб).
 * @member {Number} ram_max
 */
ServersConfiguratorRequirements.prototype['ram_max'] = undefined;

/**
 * Минимальный размер диска (в Мб).
 * @member {Number} disk_min
 */
ServersConfiguratorRequirements.prototype['disk_min'] = undefined;

/**
 * Размер шага диска
 * @member {Number} disk_step
 */
ServersConfiguratorRequirements.prototype['disk_step'] = undefined;

/**
 * Максимальный размер диска (в Мб).
 * @member {Number} disk_max
 */
ServersConfiguratorRequirements.prototype['disk_max'] = undefined;

/**
 * Минимальныая пропускная способноть интернет-канала (в Мб)
 * @member {Number} network_bandwidth_min
 */
ServersConfiguratorRequirements.prototype['network_bandwidth_min'] = undefined;

/**
 * Размер шага пропускной способноти интернет-канала (в Мб)
 * @member {Number} network_bandwidth_step
 */
ServersConfiguratorRequirements.prototype['network_bandwidth_step'] = undefined;

/**
 * Максимальная пропускная способноть интернет-канала (в Мб)
 * @member {Number} network_bandwidth_max
 */
ServersConfiguratorRequirements.prototype['network_bandwidth_max'] = undefined;

/**
 * Минимальное количество видеокарт
 * @member {Number} gpu_min
 */
ServersConfiguratorRequirements.prototype['gpu_min'] = undefined;

/**
 * Максимальное количество видеокарт
 * @member {Number} gpu_max
 */
ServersConfiguratorRequirements.prototype['gpu_max'] = undefined;

/**
 * Размер шага видеокарт
 * @member {Number} gpu_step
 */
ServersConfiguratorRequirements.prototype['gpu_step'] = undefined;






export default ServersConfiguratorRequirements;

