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


import ApiClient from "../ApiClient";
import CreateAgentBotTelegramBot201Response from '../model/CreateAgentBotTelegramBot201Response';
import CreateBot from '../model/CreateBot';
import CreateCrispIntegration from '../model/CreateCrispIntegration';
import CreateJivoIntegration from '../model/CreateJivoIntegration';
import CreateMaxBot from '../model/CreateMaxBot';
import GetAccountStatus403Response from '../model/GetAccountStatus403Response';
import GetAgentBotMaxBots200Response from '../model/GetAgentBotMaxBots200Response';
import GetAgentBotMaxBotsByAgent200Response from '../model/GetAgentBotMaxBotsByAgent200Response';
import GetAgentBotTelegramBots200Response from '../model/GetAgentBotTelegramBots200Response';
import GetAgentBotTelegramBotsByAgent200Response from '../model/GetAgentBotTelegramBotsByAgent200Response';
import GetAgentIntegrationCrisp200Response from '../model/GetAgentIntegrationCrisp200Response';
import GetAgentIntegrationJivo200Response from '../model/GetAgentIntegrationJivo200Response';
import GetFinances400Response from '../model/GetFinances400Response';
import GetFinances401Response from '../model/GetFinances401Response';
import GetFinances429Response from '../model/GetFinances429Response';
import GetFinances500Response from '../model/GetFinances500Response';
import GetImage404Response from '../model/GetImage404Response';
import UpdateBot from '../model/UpdateBot';
import UpdateDatabaseInstance409Response from '../model/UpdateDatabaseInstance409Response';
import UpdateMaxBot from '../model/UpdateMaxBot';

/**
* AIAgentIntegrations service.
* @module api/AIAgentIntegrationsApi
* @version 1.0.0
*/
export default class AIAgentIntegrationsApi {

    /**
    * Constructs a new AIAgentIntegrationsApi. 
    * @alias module:api/AIAgentIntegrationsApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }


    /**
     * Callback function to receive the result of the createAgentBotMaxBot operation.
     * @callback module:api/AIAgentIntegrationsApi~createAgentBotMaxBotCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateAgentBotTelegramBot201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Подключение бота MAX к агенту
     * Чтобы подключить бота MAX к AI агенту, отправьте POST-запрос на `/api/v1/cloud-ai/max-bots`, передав ID агента и токен бота от @MasterBot.  Платформа проверит токен в MAX, сохранит бота и сама подпишет его на события (вебхук) — настраивать подписку в MAX не нужно. После этого агент начинает отвечать пользователям бота.  Один бот может быть подключен только к одному агенту. Если бот уже подключен к агенту, который был удален, бот будет переподключен к новому агенту. Ограничение доступа по списку пользователей для ботов MAX не поддерживается.  Ошибки: - `400 invalid_max_token` — MAX не принял токен; - `400 max_webhook_error` — не удалось подписать бота на события; - `409 bot_already_exists` — бот уже подключен к существующему агенту или к другому аккаунту.  Тело ответа будет представлять собой объект JSON с ключом `bot`.
     * @param {module:model/CreateMaxBot} createMaxBot 
     * @param {module:api/AIAgentIntegrationsApi~createAgentBotMaxBotCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateAgentBotTelegramBot201Response}
     */
    createAgentBotMaxBot(createMaxBot, callback) {
      let postBody = createMaxBot;
      // verify the required parameter 'createMaxBot' is set
      if (createMaxBot === undefined || createMaxBot === null) {
        throw new Error("Missing the required parameter 'createMaxBot' when calling createAgentBotMaxBot");
      }

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = CreateAgentBotTelegramBot201Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/max-bots', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the createAgentBotTelegramBot operation.
     * @callback module:api/AIAgentIntegrationsApi~createAgentBotTelegramBotCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateAgentBotTelegramBot201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Подключение Telegram-бота к агенту
     * Чтобы подключить Telegram-бота к AI агенту, отправьте POST-запрос на `/api/v1/cloud-ai/bots`, передав ID агента и токен бота от @BotFather.  Платформа проверит токен в Telegram, сохранит бота и сама установит ему вебхук — настраивать вебхук в Telegram не нужно. После этого агент начинает отвечать пользователям бота. Ранее накопленные у бота обновления сбрасываются.  Один бот может быть подключен только к одному агенту. Если бот уже подключен к агенту, который был удален, бот будет переподключен к новому агенту.  Ошибки: - `400 invalid_telegram_token` — Telegram не принял токен; - `400 telegram_webhook_error` — не удалось установить вебхук; - `409 bot_already_exists` — бот уже подключен к существующему агенту или к другому аккаунту.  Тело ответа будет представлять собой объект JSON с ключом `bot`.
     * @param {module:model/CreateBot} createBot 
     * @param {module:api/AIAgentIntegrationsApi~createAgentBotTelegramBotCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateAgentBotTelegramBot201Response}
     */
    createAgentBotTelegramBot(createBot, callback) {
      let postBody = createBot;
      // verify the required parameter 'createBot' is set
      if (createBot === undefined || createBot === null) {
        throw new Error("Missing the required parameter 'createBot' when calling createAgentBotTelegramBot");
      }

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = CreateAgentBotTelegramBot201Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/bots', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the createAgentIntegrationCrisp operation.
     * @callback module:api/AIAgentIntegrationsApi~createAgentIntegrationCrispCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetAgentIntegrationCrisp200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Подключение агента к Crisp
     * Чтобы подключить AI агента к Crisp, отправьте POST-запрос на `/api/v1/cloud-ai/agent/{agent_id}/crisp`, передав Website ID сайта и API-токен Crisp (Identifier и Key).  Платформа проверит токен в Crisp и вернет `webhook_secret`. Затем добавьте в Crisp вебхук `https://api.timeweb.cloud/api/v1/crisp/{website_id}/webhook/{webhook_secret}` — подробнее в разделе «Интеграции AI агентов».  К одному агенту можно подключить один сайт Crisp, и один сайт — только к одному агенту.  Ошибки: - `400 invalid_crisp_token` — Crisp не принял токен для этого сайта; - `409 bot_already_exists` — у агента уже есть интеграция с Crisp или сайт подключен к другому агенту; - `503` — интеграция с Crisp временно недоступна.  Тело ответа будет представлять собой объект JSON с ключом `crisp_integration`.
     * @param {Number} agentId ID агента
     * @param {module:model/CreateCrispIntegration} createCrispIntegration 
     * @param {module:api/AIAgentIntegrationsApi~createAgentIntegrationCrispCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetAgentIntegrationCrisp200Response}
     */
    createAgentIntegrationCrisp(agentId, createCrispIntegration, callback) {
      let postBody = createCrispIntegration;
      // verify the required parameter 'agentId' is set
      if (agentId === undefined || agentId === null) {
        throw new Error("Missing the required parameter 'agentId' when calling createAgentIntegrationCrisp");
      }
      // verify the required parameter 'createCrispIntegration' is set
      if (createCrispIntegration === undefined || createCrispIntegration === null) {
        throw new Error("Missing the required parameter 'createCrispIntegration' when calling createAgentIntegrationCrisp");
      }

      let pathParams = {
        'agent_id': agentId
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = GetAgentIntegrationCrisp200Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/agent/{agent_id}/crisp', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the createAgentIntegrationJivo operation.
     * @callback module:api/AIAgentIntegrationsApi~createAgentIntegrationJivoCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetAgentIntegrationJivo200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Подключение агента к Jivo
     * Чтобы подключить AI агента к Jivo, отправьте POST-запрос на `/api/v1/cloud-ai/agent/{agent_id}/jivo`, передав Provider ID, выданный поддержкой Jivo.  Подготовка описана в разделе «Интеграции AI агентов»: адрес для событий и токен бота нужно заранее передать в поддержку Jivo.  Если агент не найден, вернется ошибка `404 agent_not_found`.  К одному агенту можно подключить одну интеграцию Jivo. Если она уже есть, вернется ошибка `409 bot_already_exists`.  Тело ответа будет представлять собой объект JSON с ключом `jivo_integration`.
     * @param {Number} agentId ID агента
     * @param {module:model/CreateJivoIntegration} createJivoIntegration 
     * @param {module:api/AIAgentIntegrationsApi~createAgentIntegrationJivoCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetAgentIntegrationJivo200Response}
     */
    createAgentIntegrationJivo(agentId, createJivoIntegration, callback) {
      let postBody = createJivoIntegration;
      // verify the required parameter 'agentId' is set
      if (agentId === undefined || agentId === null) {
        throw new Error("Missing the required parameter 'agentId' when calling createAgentIntegrationJivo");
      }
      // verify the required parameter 'createJivoIntegration' is set
      if (createJivoIntegration === undefined || createJivoIntegration === null) {
        throw new Error("Missing the required parameter 'createJivoIntegration' when calling createAgentIntegrationJivo");
      }

      let pathParams = {
        'agent_id': agentId
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = GetAgentIntegrationJivo200Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/agent/{agent_id}/jivo', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteAgentBotMaxBot operation.
     * @callback module:api/AIAgentIntegrationsApi~deleteAgentBotMaxBotCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Отключение бота MAX
     * Чтобы отключить бота MAX от агента, отправьте DELETE-запрос на `/api/v1/cloud-ai/max-bots/{bot_id}`.  Платформа отпишет бота от событий в MAX и удалит подключение. Сам бот в MAX не удаляется — его можно подключить снова.
     * @param {String} botId ID бота (поле `id` из ответа)
     * @param {module:api/AIAgentIntegrationsApi~deleteAgentBotMaxBotCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteAgentBotMaxBot(botId, callback) {
      let postBody = null;
      // verify the required parameter 'botId' is set
      if (botId === undefined || botId === null) {
        throw new Error("Missing the required parameter 'botId' when calling deleteAgentBotMaxBot");
      }

      let pathParams = {
        'bot_id': botId
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = null;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/max-bots/{bot_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteAgentBotTelegramBot operation.
     * @callback module:api/AIAgentIntegrationsApi~deleteAgentBotTelegramBotCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Отключение Telegram-бота
     * Чтобы отключить Telegram-бота от агента, отправьте DELETE-запрос на `/api/v1/cloud-ai/bots/{bot_id}`.  Платформа снимет вебхук бота в Telegram и удалит подключение. Сам бот в Telegram не удаляется — его можно подключить снова.
     * @param {String} botId ID бота (поле `id` из ответа)
     * @param {module:api/AIAgentIntegrationsApi~deleteAgentBotTelegramBotCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteAgentBotTelegramBot(botId, callback) {
      let postBody = null;
      // verify the required parameter 'botId' is set
      if (botId === undefined || botId === null) {
        throw new Error("Missing the required parameter 'botId' when calling deleteAgentBotTelegramBot");
      }

      let pathParams = {
        'bot_id': botId
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = null;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/bots/{bot_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteAgentIntegrationCrisp operation.
     * @callback module:api/AIAgentIntegrationsApi~deleteAgentIntegrationCrispCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Отключение агента от Crisp
     * Чтобы отключить AI агента от Crisp, отправьте DELETE-запрос на `/api/v1/cloud-ai/agent/{agent_id}/crisp`.  После удаления интеграции агент перестает отвечать в чатах Crisp. Вебхук в настройках Crisp можно удалить вручную.
     * @param {Number} agentId ID агента
     * @param {module:api/AIAgentIntegrationsApi~deleteAgentIntegrationCrispCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteAgentIntegrationCrisp(agentId, callback) {
      let postBody = null;
      // verify the required parameter 'agentId' is set
      if (agentId === undefined || agentId === null) {
        throw new Error("Missing the required parameter 'agentId' when calling deleteAgentIntegrationCrisp");
      }

      let pathParams = {
        'agent_id': agentId
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = null;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/agent/{agent_id}/crisp', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteAgentIntegrationJivo operation.
     * @callback module:api/AIAgentIntegrationsApi~deleteAgentIntegrationJivoCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Отключение агента от Jivo
     * Чтобы отключить AI агента от Jivo, отправьте DELETE-запрос на `/api/v1/cloud-ai/agent/{agent_id}/jivo`.  После удаления интеграции агент перестает отвечать на события Jivo. Настройки бота в самом Jivo не меняются.
     * @param {Number} agentId ID агента
     * @param {module:api/AIAgentIntegrationsApi~deleteAgentIntegrationJivoCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteAgentIntegrationJivo(agentId, callback) {
      let postBody = null;
      // verify the required parameter 'agentId' is set
      if (agentId === undefined || agentId === null) {
        throw new Error("Missing the required parameter 'agentId' when calling deleteAgentIntegrationJivo");
      }

      let pathParams = {
        'agent_id': agentId
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = null;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/agent/{agent_id}/jivo', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getAgentBotMaxBot operation.
     * @callback module:api/AIAgentIntegrationsApi~getAgentBotMaxBotCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateAgentBotTelegramBot201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение информации о боте MAX
     * Чтобы получить информацию о боте MAX, отправьте GET-запрос на `/api/v1/cloud-ai/max-bots/{bot_id}`.  Тело ответа будет представлять собой объект JSON с ключом `bot`.
     * @param {String} botId ID бота (поле `id` из ответа)
     * @param {module:api/AIAgentIntegrationsApi~getAgentBotMaxBotCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateAgentBotTelegramBot201Response}
     */
    getAgentBotMaxBot(botId, callback) {
      let postBody = null;
      // verify the required parameter 'botId' is set
      if (botId === undefined || botId === null) {
        throw new Error("Missing the required parameter 'botId' when calling getAgentBotMaxBot");
      }

      let pathParams = {
        'bot_id': botId
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = CreateAgentBotTelegramBot201Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/max-bots/{bot_id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getAgentBotMaxBots operation.
     * @callback module:api/AIAgentIntegrationsApi~getAgentBotMaxBotsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetAgentBotMaxBots200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка ботов MAX
     * Чтобы получить список ботов MAX, подключенных к агентам аккаунта, отправьте GET-запрос на `/api/v1/cloud-ai/max-bots`.  Тело ответа будет представлять собой объект JSON с ключами `bots` и `meta`.
     * @param {module:api/AIAgentIntegrationsApi~getAgentBotMaxBotsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetAgentBotMaxBots200Response}
     */
    getAgentBotMaxBots(callback) {
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = GetAgentBotMaxBots200Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/max-bots', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getAgentBotMaxBotsByAgent operation.
     * @callback module:api/AIAgentIntegrationsApi~getAgentBotMaxBotsByAgentCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetAgentBotMaxBotsByAgent200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка ботов MAX агента
     * Чтобы получить список ботов MAX, подключенных к AI агенту, отправьте GET-запрос на `/api/v1/cloud-ai/agents/{agent_id}/max-bots`.  Тело ответа будет представлять собой объект JSON с ключами `bots` и `meta`.
     * @param {Number} agentId ID агента
     * @param {module:api/AIAgentIntegrationsApi~getAgentBotMaxBotsByAgentCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetAgentBotMaxBotsByAgent200Response}
     */
    getAgentBotMaxBotsByAgent(agentId, callback) {
      let postBody = null;
      // verify the required parameter 'agentId' is set
      if (agentId === undefined || agentId === null) {
        throw new Error("Missing the required parameter 'agentId' when calling getAgentBotMaxBotsByAgent");
      }

      let pathParams = {
        'agent_id': agentId
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = GetAgentBotMaxBotsByAgent200Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/agents/{agent_id}/max-bots', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getAgentBotTelegramBot operation.
     * @callback module:api/AIAgentIntegrationsApi~getAgentBotTelegramBotCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateAgentBotTelegramBot201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение информации о Telegram-боте
     * Чтобы получить информацию о Telegram-боте, отправьте GET-запрос на `/api/v1/cloud-ai/bots/{bot_id}`.  Тело ответа будет представлять собой объект JSON с ключом `bot`.
     * @param {String} botId ID бота (поле `id` из ответа)
     * @param {module:api/AIAgentIntegrationsApi~getAgentBotTelegramBotCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateAgentBotTelegramBot201Response}
     */
    getAgentBotTelegramBot(botId, callback) {
      let postBody = null;
      // verify the required parameter 'botId' is set
      if (botId === undefined || botId === null) {
        throw new Error("Missing the required parameter 'botId' when calling getAgentBotTelegramBot");
      }

      let pathParams = {
        'bot_id': botId
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = CreateAgentBotTelegramBot201Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/bots/{bot_id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getAgentBotTelegramBots operation.
     * @callback module:api/AIAgentIntegrationsApi~getAgentBotTelegramBotsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetAgentBotTelegramBots200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка Telegram-ботов
     * Чтобы получить список Telegram-ботов, подключенных к агентам аккаунта, отправьте GET-запрос на `/api/v1/cloud-ai/bots`.  Тело ответа будет представлять собой объект JSON с ключами `bots` и `meta`.
     * @param {module:api/AIAgentIntegrationsApi~getAgentBotTelegramBotsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetAgentBotTelegramBots200Response}
     */
    getAgentBotTelegramBots(callback) {
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = GetAgentBotTelegramBots200Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/bots', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getAgentBotTelegramBotsByAgent operation.
     * @callback module:api/AIAgentIntegrationsApi~getAgentBotTelegramBotsByAgentCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetAgentBotTelegramBotsByAgent200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка Telegram-ботов агента
     * Чтобы получить список Telegram-ботов, подключенных к AI агенту, отправьте GET-запрос на `/api/v1/cloud-ai/agents/{agent_id}/bots`.  Тело ответа будет представлять собой объект JSON с ключами `bots` и `meta`.
     * @param {Number} agentId ID агента
     * @param {module:api/AIAgentIntegrationsApi~getAgentBotTelegramBotsByAgentCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetAgentBotTelegramBotsByAgent200Response}
     */
    getAgentBotTelegramBotsByAgent(agentId, callback) {
      let postBody = null;
      // verify the required parameter 'agentId' is set
      if (agentId === undefined || agentId === null) {
        throw new Error("Missing the required parameter 'agentId' when calling getAgentBotTelegramBotsByAgent");
      }

      let pathParams = {
        'agent_id': agentId
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = GetAgentBotTelegramBotsByAgent200Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/agents/{agent_id}/bots', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getAgentIntegrationCrisp operation.
     * @callback module:api/AIAgentIntegrationsApi~getAgentIntegrationCrispCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetAgentIntegrationCrisp200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение интеграции агента с Crisp
     * Чтобы получить интеграцию AI агента с Crisp, отправьте GET-запрос на `/api/v1/cloud-ai/agent/{agent_id}/crisp`.  В ответе есть `webhook_secret` — по нему можно восстановить адрес вебхука для Crisp. Если агент не подключен к Crisp, вернется ошибка 404.  Тело ответа будет представлять собой объект JSON с ключом `crisp_integration`.
     * @param {Number} agentId ID агента
     * @param {module:api/AIAgentIntegrationsApi~getAgentIntegrationCrispCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetAgentIntegrationCrisp200Response}
     */
    getAgentIntegrationCrisp(agentId, callback) {
      let postBody = null;
      // verify the required parameter 'agentId' is set
      if (agentId === undefined || agentId === null) {
        throw new Error("Missing the required parameter 'agentId' when calling getAgentIntegrationCrisp");
      }

      let pathParams = {
        'agent_id': agentId
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = GetAgentIntegrationCrisp200Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/agent/{agent_id}/crisp', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getAgentIntegrationJivo operation.
     * @callback module:api/AIAgentIntegrationsApi~getAgentIntegrationJivoCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetAgentIntegrationJivo200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение интеграции агента с Jivo
     * Чтобы получить интеграцию AI агента с Jivo, отправьте GET-запрос на `/api/v1/cloud-ai/agent/{agent_id}/jivo`.  Если агент не подключен к Jivo, вернется ошибка 404.  Тело ответа будет представлять собой объект JSON с ключом `jivo_integration`.
     * @param {Number} agentId ID агента
     * @param {module:api/AIAgentIntegrationsApi~getAgentIntegrationJivoCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetAgentIntegrationJivo200Response}
     */
    getAgentIntegrationJivo(agentId, callback) {
      let postBody = null;
      // verify the required parameter 'agentId' is set
      if (agentId === undefined || agentId === null) {
        throw new Error("Missing the required parameter 'agentId' when calling getAgentIntegrationJivo");
      }

      let pathParams = {
        'agent_id': agentId
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = GetAgentIntegrationJivo200Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/agent/{agent_id}/jivo', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the updateAgentBotMaxBot operation.
     * @callback module:api/AIAgentIntegrationsApi~updateAgentBotMaxBotCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateAgentBotTelegramBot201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Изменение бота MAX
     * Чтобы изменить бота MAX, отправьте PATCH-запрос на `/api/v1/cloud-ai/max-bots/{bot_id}`, передав только изменяемые поля.  Через `token` можно заменить токен того же бота: платформа проверит новый токен и заново подпишет бота на события. Перенести подключение на другого бота нельзя — для этого удалите бота и подключите новый.  Ошибки: - `400 invalid_max_token` — MAX не принял токен или токен принадлежит другому боту; - `400 max_webhook_error` — не удалось подписать бота на события.  Тело ответа будет представлять собой объект JSON с ключом `bot`.
     * @param {String} botId ID бота (поле `id` из ответа)
     * @param {module:model/UpdateMaxBot} updateMaxBot 
     * @param {module:api/AIAgentIntegrationsApi~updateAgentBotMaxBotCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateAgentBotTelegramBot201Response}
     */
    updateAgentBotMaxBot(botId, updateMaxBot, callback) {
      let postBody = updateMaxBot;
      // verify the required parameter 'botId' is set
      if (botId === undefined || botId === null) {
        throw new Error("Missing the required parameter 'botId' when calling updateAgentBotMaxBot");
      }
      // verify the required parameter 'updateMaxBot' is set
      if (updateMaxBot === undefined || updateMaxBot === null) {
        throw new Error("Missing the required parameter 'updateMaxBot' when calling updateAgentBotMaxBot");
      }

      let pathParams = {
        'bot_id': botId
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = CreateAgentBotTelegramBot201Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/max-bots/{bot_id}', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the updateAgentBotTelegramBot operation.
     * @callback module:api/AIAgentIntegrationsApi~updateAgentBotTelegramBotCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateAgentBotTelegramBot201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Изменение Telegram-бота
     * Чтобы изменить Telegram-бота, отправьте PATCH-запрос на `/api/v1/cloud-ai/bots/{bot_id}`, передав только изменяемые поля.  Через `token` можно заменить токен того же бота, например после его перевыпуска в @BotFather: платформа проверит новый токен и переустановит вебхук. Перенести подключение на другого бота нельзя — для этого удалите бота и подключите новый. Агента, к которому подключен бот, этим запросом сменить нельзя.  Ошибки: - `400 invalid_telegram_token` — Telegram не принял токен или токен принадлежит другому боту; - `400 telegram_webhook_error` — не удалось переустановить вебхук.  Тело ответа будет представлять собой объект JSON с ключом `bot`.
     * @param {String} botId ID бота (поле `id` из ответа)
     * @param {module:model/UpdateBot} updateBot 
     * @param {module:api/AIAgentIntegrationsApi~updateAgentBotTelegramBotCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateAgentBotTelegramBot201Response}
     */
    updateAgentBotTelegramBot(botId, updateBot, callback) {
      let postBody = updateBot;
      // verify the required parameter 'botId' is set
      if (botId === undefined || botId === null) {
        throw new Error("Missing the required parameter 'botId' when calling updateAgentBotTelegramBot");
      }
      // verify the required parameter 'updateBot' is set
      if (updateBot === undefined || updateBot === null) {
        throw new Error("Missing the required parameter 'updateBot' when calling updateAgentBotTelegramBot");
      }

      let pathParams = {
        'bot_id': botId
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = CreateAgentBotTelegramBot201Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/bots/{bot_id}', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}
