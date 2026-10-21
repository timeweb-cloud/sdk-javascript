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
import AddAiSolutionTelegramBot201Response from '../model/AddAiSolutionTelegramBot201Response';
import ApproveTelegramPairing from '../model/ApproveTelegramPairing';
import ConnectTelegram from '../model/ConnectTelegram';
import CreateAiSolution from '../model/CreateAiSolution';
import CreateAiSolution201Response from '../model/CreateAiSolution201Response';
import ErrorResponse from '../model/ErrorResponse';
import GetAccountStatus403Response from '../model/GetAccountStatus403Response';
import GetAiSolutionChatStatus200Response from '../model/GetAiSolutionChatStatus200Response';
import GetAiSolutionMainChatHistory200Response from '../model/GetAiSolutionMainChatHistory200Response';
import GetFinances400Response from '../model/GetFinances400Response';
import GetFinances401Response from '../model/GetFinances401Response';
import GetFinances429Response from '../model/GetFinances429Response';
import GetFinances500Response from '../model/GetFinances500Response';
import GetImage404Response from '../model/GetImage404Response';
import ListAiSolutionConversations200Response from '../model/ListAiSolutionConversations200Response';
import ListAiSolutionTelegramBots200Response from '../model/ListAiSolutionTelegramBots200Response';
import ListAiSolutionTypes200Response from '../model/ListAiSolutionTypes200Response';
import ListAiSolutions200Response from '../model/ListAiSolutions200Response';
import RegenerateAiSolutionAiKey200Response from '../model/RegenerateAiSolutionAiKey200Response';
import ResetAiSolutionChat from '../model/ResetAiSolutionChat';
import ResetAiSolutionChat200Response from '../model/ResetAiSolutionChat200Response';
import SendAiSolutionMessage from '../model/SendAiSolutionMessage';
import SendAiSolutionMessage200Response from '../model/SendAiSolutionMessage200Response';
import StopAiSolutionChat from '../model/StopAiSolutionChat';
import StreamError from '../model/StreamError';
import UpdateAiSolution from '../model/UpdateAiSolution';
import UpdateDatabaseInstance409Response from '../model/UpdateDatabaseInstance409Response';

/**
* AISolutions service.
* @module api/AISolutionsApi
* @version 1.0.0
*/
export default class AISolutionsApi {

    /**
    * Constructs a new AISolutionsApi. 
    * @alias module:api/AISolutionsApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }


    /**
     * Callback function to receive the result of the addAiSolutionTelegramBot operation.
     * @callback module:api/AISolutionsApi~addAiSolutionTelegramBotCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AddAiSolutionTelegramBot201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Подключение Telegram-бота к AI-решению
     * Чтобы подключить Telegram-бота к решению, отправьте POST-запрос на `/api/v1/cloud-ai/solutions/{solution_id}/telegram/bots`.  Принимает токен бота от @BotFather, проверяет его в Telegram и настраивает бота на сервере решения. Владелец подтверждается кодом: пока он не подтверждён, бот никому не отвечает. Напишите боту в личные сообщения, получите в ответ код и передайте его в метод подтверждения владельца.  К решению можно подключить только одного бота: повторный запрос для того же бота обновляет его токен, для другого бота — возвращает 409 `ai_solution_already_has_a_connected_telegram_bot`. Если Telegram отклонил токен, ответ — 400 `ai_solution_telegram_token_is_invalid`.  Перед вызовом убедитесь, что чат готов (`ready: true` в методе получения статуса чата): пока сервер решения разворачивается или выключен, запрос завершается ошибкой.
     * @param {Number} solutionId ID AI-решения
     * @param {module:model/ConnectTelegram} connectTelegram 
     * @param {module:api/AISolutionsApi~addAiSolutionTelegramBotCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/AddAiSolutionTelegramBot201Response}
     */
    addAiSolutionTelegramBot(solutionId, connectTelegram, callback) {
      let postBody = connectTelegram;
      // verify the required parameter 'solutionId' is set
      if (solutionId === undefined || solutionId === null) {
        throw new Error("Missing the required parameter 'solutionId' when calling addAiSolutionTelegramBot");
      }
      // verify the required parameter 'connectTelegram' is set
      if (connectTelegram === undefined || connectTelegram === null) {
        throw new Error("Missing the required parameter 'connectTelegram' when calling addAiSolutionTelegramBot");
      }

      let pathParams = {
        'solution_id': solutionId
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
      let returnType = AddAiSolutionTelegramBot201Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/solutions/{solution_id}/telegram/bots', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the approveAiSolutionTelegramPairing operation.
     * @callback module:api/AISolutionsApi~approveAiSolutionTelegramPairingCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Подтверждение владельца Telegram-бота AI-решения
     * Чтобы подтвердить владельца Telegram-бота, отправьте POST-запрос на `/api/v1/cloud-ai/solutions/{solution_id}/telegram/bots/{account_key}/pairing/approve`.  Передайте код, который бот прислал в личные сообщения в ответ на первое сообщение. После подтверждения агент отвечает этому пользователю Telegram в боте, а бот переходит в состояние `connected`. Владелец привязывается к конкретному боту. Повторный запрос с кодом, уже подтверждённым в последние 15 минут, считается успешным. Некорректный `account_key` — ответ 400 `ai_solution_telegram_token_is_invalid`.
     * @param {Number} solutionId ID AI-решения
     * @param {String} accountKey ID Telegram-бота в решении (`account_key` из списка ботов) в формате `b<число>`, например `b123456789`
     * @param {module:model/ApproveTelegramPairing} approveTelegramPairing 
     * @param {module:api/AISolutionsApi~approveAiSolutionTelegramPairingCallback} callback The callback function, accepting three arguments: error, data, response
     */
    approveAiSolutionTelegramPairing(solutionId, accountKey, approveTelegramPairing, callback) {
      let postBody = approveTelegramPairing;
      // verify the required parameter 'solutionId' is set
      if (solutionId === undefined || solutionId === null) {
        throw new Error("Missing the required parameter 'solutionId' when calling approveAiSolutionTelegramPairing");
      }
      // verify the required parameter 'accountKey' is set
      if (accountKey === undefined || accountKey === null) {
        throw new Error("Missing the required parameter 'accountKey' when calling approveAiSolutionTelegramPairing");
      }
      // verify the required parameter 'approveTelegramPairing' is set
      if (approveTelegramPairing === undefined || approveTelegramPairing === null) {
        throw new Error("Missing the required parameter 'approveTelegramPairing' when calling approveAiSolutionTelegramPairing");
      }

      let pathParams = {
        'solution_id': solutionId,
        'account_key': accountKey
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
      let returnType = null;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/solutions/{solution_id}/telegram/bots/{account_key}/pairing/approve', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the createAiSolution operation.
     * @callback module:api/AISolutionsApi~createAiSolutionCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateAiSolution201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Создание AI-решения
     * Чтобы создать AI-решение, отправьте POST-запрос на `/api/v1/cloud-ai/solutions`.  Выпускает для решения ключ AI Gateway и создаёт облачный сервер из образа решения; агент на сервере настраивается на выбранную модель через этот ключ. Сервер тарифицируется по выбранному тарифу, обращения к модели — через ключ AI Gateway.  Решение возвращается в статусе `creating`: развёртывание сервера и настройка агента занимают несколько минут. Дождитесь статуса `active`, а затем `ready: true` в методе получения статуса чата.  Тариф (`preset_id`) должен быть из той же локации, что и зона доступности (`availability_zone` или зона по умолчанию для региона аккаунта), иначе — 400 `invalid_location_zone`. Соответствие тарифа `requirements` типа решения при создании не проверяется — выбирайте тариф не ниже требований сами. Ответ 409 `no_free_node` означает, что в выбранной зоне сейчас нет свободных ресурсов под этот тариф — выберите другой тариф или зону. Неподходящая или устаревшая модель — 404 `model_not_found`.
     * @param {module:model/CreateAiSolution} createAiSolution 
     * @param {module:api/AISolutionsApi~createAiSolutionCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateAiSolution201Response}
     */
    createAiSolution(createAiSolution, callback) {
      let postBody = createAiSolution;
      // verify the required parameter 'createAiSolution' is set
      if (createAiSolution === undefined || createAiSolution === null) {
        throw new Error("Missing the required parameter 'createAiSolution' when calling createAiSolution");
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
      let returnType = CreateAiSolution201Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/solutions', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteAiSolution operation.
     * @callback module:api/AISolutionsApi~deleteAiSolutionCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Удаление AI-решения
     * Чтобы удалить AI-решение, отправьте DELETE-запрос на `/api/v1/cloud-ai/solutions/{solution_id}`.  Решение удаляется вместе с сервером и ключом AI Gateway. Действие необратимо: решение и история его чата становятся недоступны.
     * @param {Number} solutionId ID AI-решения
     * @param {module:api/AISolutionsApi~deleteAiSolutionCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteAiSolution(solutionId, callback) {
      let postBody = null;
      // verify the required parameter 'solutionId' is set
      if (solutionId === undefined || solutionId === null) {
        throw new Error("Missing the required parameter 'solutionId' when calling deleteAiSolution");
      }

      let pathParams = {
        'solution_id': solutionId
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
        '/api/v1/cloud-ai/solutions/{solution_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getAiSolution operation.
     * @callback module:api/AISolutionsApi~getAiSolutionCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateAiSolution201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение AI-решения
     * Чтобы получить AI-решение, отправьте GET-запрос на `/api/v1/cloud-ai/solutions/{solution_id}`.  Статус решения выводится из текущего состояния его сервера. Тело ответа будет представлять собой объект JSON с ключом `ai_solution`.
     * @param {Number} solutionId ID AI-решения
     * @param {module:api/AISolutionsApi~getAiSolutionCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateAiSolution201Response}
     */
    getAiSolution(solutionId, callback) {
      let postBody = null;
      // verify the required parameter 'solutionId' is set
      if (solutionId === undefined || solutionId === null) {
        throw new Error("Missing the required parameter 'solutionId' when calling getAiSolution");
      }

      let pathParams = {
        'solution_id': solutionId
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
      let returnType = CreateAiSolution201Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/solutions/{solution_id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getAiSolutionChatFullHistory operation.
     * @callback module:api/AISolutionsApi~getAiSolutionChatFullHistoryCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetAiSolutionMainChatHistory200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение всей истории чата AI-решения
     * Чтобы получить сообщения всех разговоров решения, отправьте GET-запрос на `/api/v1/cloud-ai/solutions/{solution_id}/chat/history`.  В отличие от `chat/messages` (только основной разговор) и `chat/conversations/{conversation_id}/messages` (конкретный разговор), возвращает сообщения из всех разговоров сразу. Сообщения отсортированы по дате создания от новых к старым. Тело ответа будет представлять собой объект JSON с ключами `ai_solution_chat_messages` и `meta`.
     * @param {Number} solutionId ID AI-решения
     * @param {Object} opts Optional parameters
     * @param {Number} [limit = 100)] Количество сообщений на странице, от 1 до 10 000
     * @param {Number} [offset = 0)] Количество сообщений, которые нужно пропустить
     * @param {module:api/AISolutionsApi~getAiSolutionChatFullHistoryCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetAiSolutionMainChatHistory200Response}
     */
    getAiSolutionChatFullHistory(solutionId, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'solutionId' is set
      if (solutionId === undefined || solutionId === null) {
        throw new Error("Missing the required parameter 'solutionId' when calling getAiSolutionChatFullHistory");
      }

      let pathParams = {
        'solution_id': solutionId
      };
      let queryParams = {
        'limit': opts['limit'],
        'offset': opts['offset']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = GetAiSolutionMainChatHistory200Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/solutions/{solution_id}/chat/history', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getAiSolutionChatHistory operation.
     * @callback module:api/AISolutionsApi~getAiSolutionChatHistoryCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetAiSolutionMainChatHistory200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение истории разговора AI-решения
     * Чтобы получить историю разговора, отправьте GET-запрос на `/api/v1/cloud-ai/solutions/{solution_id}/chat/conversations/{conversation_id}/messages`.  Сообщения отсортированы по дате создания от новых к старым: первая страница — последние сообщения разговора. Для несуществующего разговора возвращается пустой список. Тело ответа будет представлять собой объект JSON с ключами `ai_solution_chat_messages` и `meta`.
     * @param {Number} solutionId ID AI-решения
     * @param {String} conversationId ID разговора. У основного разговора решения — `solution-<solution_id>`
     * @param {Object} opts Optional parameters
     * @param {Number} [limit = 100)] Количество сообщений на странице, от 1 до 10 000
     * @param {Number} [offset = 0)] Количество сообщений, которые нужно пропустить
     * @param {module:api/AISolutionsApi~getAiSolutionChatHistoryCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetAiSolutionMainChatHistory200Response}
     */
    getAiSolutionChatHistory(solutionId, conversationId, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'solutionId' is set
      if (solutionId === undefined || solutionId === null) {
        throw new Error("Missing the required parameter 'solutionId' when calling getAiSolutionChatHistory");
      }
      // verify the required parameter 'conversationId' is set
      if (conversationId === undefined || conversationId === null) {
        throw new Error("Missing the required parameter 'conversationId' when calling getAiSolutionChatHistory");
      }

      let pathParams = {
        'solution_id': solutionId,
        'conversation_id': conversationId
      };
      let queryParams = {
        'limit': opts['limit'],
        'offset': opts['offset']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = GetAiSolutionMainChatHistory200Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/solutions/{solution_id}/chat/conversations/{conversation_id}/messages', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getAiSolutionChatStatus operation.
     * @callback module:api/AISolutionsApi~getAiSolutionChatStatusCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetAiSolutionChatStatus200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение статуса чата AI-решения
     * Чтобы узнать, готов ли агент решения принимать сообщения, отправьте GET-запрос на `/api/v1/cloud-ai/solutions/{solution_id}/chat/status`.  Готовность чата отличается от статуса решения: тот выводится из состояния сервера, а сервер включается задолго до того, как будет установлено и настроено ПО агента. После создания или запуска решения опрашивайте этот метод, пока `ready` не станет `true`. Тело ответа будет представлять собой объект JSON с ключом `ai_solution_chat_status`.
     * @param {Number} solutionId ID AI-решения
     * @param {module:api/AISolutionsApi~getAiSolutionChatStatusCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetAiSolutionChatStatus200Response}
     */
    getAiSolutionChatStatus(solutionId, callback) {
      let postBody = null;
      // verify the required parameter 'solutionId' is set
      if (solutionId === undefined || solutionId === null) {
        throw new Error("Missing the required parameter 'solutionId' when calling getAiSolutionChatStatus");
      }

      let pathParams = {
        'solution_id': solutionId
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
      let returnType = GetAiSolutionChatStatus200Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/solutions/{solution_id}/chat/status', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getAiSolutionMainChatHistory operation.
     * @callback module:api/AISolutionsApi~getAiSolutionMainChatHistoryCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetAiSolutionMainChatHistory200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение истории основного разговора AI-решения
     * Чтобы получить историю основного разговора решения, отправьте GET-запрос на `/api/v1/cloud-ai/solutions/{solution_id}/chat/messages`.  ID основного разговора знать не нужно; для других разговоров используйте метод с явным `conversation_id`. Сообщения отсортированы по дате создания от новых к старым: первая страница — последние сообщения. Тело ответа будет представлять собой объект JSON с ключами `ai_solution_chat_messages` и `meta` (`meta.total` — общее количество сообщений).
     * @param {Number} solutionId ID AI-решения
     * @param {Object} opts Optional parameters
     * @param {Number} [limit = 100)] Количество сообщений на странице, от 1 до 10 000
     * @param {Number} [offset = 0)] Количество сообщений, которые нужно пропустить
     * @param {module:api/AISolutionsApi~getAiSolutionMainChatHistoryCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetAiSolutionMainChatHistory200Response}
     */
    getAiSolutionMainChatHistory(solutionId, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'solutionId' is set
      if (solutionId === undefined || solutionId === null) {
        throw new Error("Missing the required parameter 'solutionId' when calling getAiSolutionMainChatHistory");
      }

      let pathParams = {
        'solution_id': solutionId
      };
      let queryParams = {
        'limit': opts['limit'],
        'offset': opts['offset']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = GetAiSolutionMainChatHistory200Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/solutions/{solution_id}/chat/messages', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the listAiSolutionConversations operation.
     * @callback module:api/AISolutionsApi~listAiSolutionConversationsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ListAiSolutionConversations200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка разговоров AI-решения
     * Чтобы получить список разговоров с агентом решения, отправьте GET-запрос на `/api/v1/cloud-ai/solutions/{solution_id}/chat/conversations`.  Возвращает все разговоры решения, в которых есть сообщения, включая основной, отсортированные по дате последнего сообщения от новых к старым. Тело ответа будет представлять собой объект JSON с ключами `ai_solution_conversations` и `meta`.
     * @param {Number} solutionId ID AI-решения
     * @param {module:api/AISolutionsApi~listAiSolutionConversationsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ListAiSolutionConversations200Response}
     */
    listAiSolutionConversations(solutionId, callback) {
      let postBody = null;
      // verify the required parameter 'solutionId' is set
      if (solutionId === undefined || solutionId === null) {
        throw new Error("Missing the required parameter 'solutionId' when calling listAiSolutionConversations");
      }

      let pathParams = {
        'solution_id': solutionId
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
      let returnType = ListAiSolutionConversations200Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/solutions/{solution_id}/chat/conversations', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the listAiSolutionTelegramBots operation.
     * @callback module:api/AISolutionsApi~listAiSolutionTelegramBotsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ListAiSolutionTelegramBots200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка Telegram-ботов AI-решения
     * Чтобы получить список Telegram-ботов решения, отправьте GET-запрос на `/api/v1/cloud-ai/solutions/{solution_id}/telegram/bots`.  Возвращает подключённых к решению ботов и состояние их подтверждения. Список читается с сервера решения. Тело ответа будет представлять собой объект JSON с ключами `ai_solution_telegram_bots` и `meta`.  Перед вызовом убедитесь, что чат готов (`ready: true` в методе получения статуса чата): пока сервер решения разворачивается или выключен, запрос завершается ошибкой.
     * @param {Number} solutionId ID AI-решения
     * @param {module:api/AISolutionsApi~listAiSolutionTelegramBotsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ListAiSolutionTelegramBots200Response}
     */
    listAiSolutionTelegramBots(solutionId, callback) {
      let postBody = null;
      // verify the required parameter 'solutionId' is set
      if (solutionId === undefined || solutionId === null) {
        throw new Error("Missing the required parameter 'solutionId' when calling listAiSolutionTelegramBots");
      }

      let pathParams = {
        'solution_id': solutionId
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
      let returnType = ListAiSolutionTelegramBots200Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/solutions/{solution_id}/telegram/bots', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the listAiSolutionTypes operation.
     * @callback module:api/AISolutionsApi~listAiSolutionTypesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ListAiSolutionTypes200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка типов AI-решений
     * Чтобы получить список типов AI-решений, отправьте GET-запрос на `/api/v1/cloud-ai/solutions/types`.  Возвращает каталог готовых решений, которые можно развернуть на облачном сервере, с минимальными требованиями к конфигурации сервера (`requirements`). Тело ответа будет представлять собой объект JSON с ключами `ai_solution_types` и `meta`.
     * @param {module:api/AISolutionsApi~listAiSolutionTypesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ListAiSolutionTypes200Response}
     */
    listAiSolutionTypes(callback) {
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
      let returnType = ListAiSolutionTypes200Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/solutions/types', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the listAiSolutions operation.
     * @callback module:api/AISolutionsApi~listAiSolutionsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ListAiSolutions200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка AI-решений
     * Чтобы получить список AI-решений аккаунта, отправьте GET-запрос на `/api/v1/cloud-ai/solutions`.  Возвращает все решения аккаунта, кроме удалённых. Статус каждого решения выводится из текущего состояния его сервера. Тело ответа будет представлять собой объект JSON с ключами `ai_solutions` и `meta`.
     * @param {module:api/AISolutionsApi~listAiSolutionsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ListAiSolutions200Response}
     */
    listAiSolutions(callback) {
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
      let returnType = ListAiSolutions200Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/solutions', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the regenerateAiSolutionAiKey operation.
     * @callback module:api/AISolutionsApi~regenerateAiSolutionAiKeyCallback
     * @param {String} error Error message, if any.
     * @param {module:model/RegenerateAiSolutionAiKey200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Перевыпуск ключа AI Gateway решения
     * Чтобы перевыпустить ключ AI Gateway решения, отправьте POST-запрос на `/api/v1/cloud-ai/solutions/{solution_id}/ai-key/regenerate`.  Единственный способ сменить этот ключ: он выпущен платформой для решения и в разделе AI Gateway доступен только для чтения. Новый ключ сразу записывается в конфигурацию агента на сервере решения, старый перестаёт работать немедленно. Сервер должен быть включён и полностью развёрнут — это проверяется до перевыпуска, потому что отменить его нельзя. Если записать новый ключ на сервер не удалось, повторите запрос.
     * @param {Number} solutionId ID AI-решения
     * @param {module:api/AISolutionsApi~regenerateAiSolutionAiKeyCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/RegenerateAiSolutionAiKey200Response}
     */
    regenerateAiSolutionAiKey(solutionId, callback) {
      let postBody = null;
      // verify the required parameter 'solutionId' is set
      if (solutionId === undefined || solutionId === null) {
        throw new Error("Missing the required parameter 'solutionId' when calling regenerateAiSolutionAiKey");
      }

      let pathParams = {
        'solution_id': solutionId
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
      let returnType = RegenerateAiSolutionAiKey200Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/solutions/{solution_id}/ai-key/regenerate', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the removeAiSolutionTelegramBot operation.
     * @callback module:api/AISolutionsApi~removeAiSolutionTelegramBotCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Отключение Telegram-бота от AI-решения
     * Чтобы отключить Telegram-бота от решения, отправьте DELETE-запрос на `/api/v1/cloud-ai/solutions/{solution_id}/telegram/bots/{account_key}`.  Удаляет бота из конфигурации сервера решения: агент перестаёт отвечать в этом боте. Если бот не подключён, запрос всё равно возвращает 204. Некорректный `account_key` — ответ 400 `ai_solution_telegram_token_is_invalid`.  Перед вызовом убедитесь, что чат готов (`ready: true` в методе получения статуса чата): пока сервер решения разворачивается или выключен, запрос завершается ошибкой.
     * @param {Number} solutionId ID AI-решения
     * @param {String} accountKey ID Telegram-бота в решении (`account_key` из списка ботов) в формате `b<число>`, например `b123456789`
     * @param {module:api/AISolutionsApi~removeAiSolutionTelegramBotCallback} callback The callback function, accepting three arguments: error, data, response
     */
    removeAiSolutionTelegramBot(solutionId, accountKey, callback) {
      let postBody = null;
      // verify the required parameter 'solutionId' is set
      if (solutionId === undefined || solutionId === null) {
        throw new Error("Missing the required parameter 'solutionId' when calling removeAiSolutionTelegramBot");
      }
      // verify the required parameter 'accountKey' is set
      if (accountKey === undefined || accountKey === null) {
        throw new Error("Missing the required parameter 'accountKey' when calling removeAiSolutionTelegramBot");
      }

      let pathParams = {
        'solution_id': solutionId,
        'account_key': accountKey
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
        '/api/v1/cloud-ai/solutions/{solution_id}/telegram/bots/{account_key}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the resetAiSolutionChat operation.
     * @callback module:api/AISolutionsApi~resetAiSolutionChatCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ResetAiSolutionChat200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Сброс контекста разговора AI-решения
     * Чтобы сбросить контекст разговора, отправьте POST-запрос на `/api/v1/cloud-ai/solutions/{solution_id}/chat/reset`.  Контекст сбрасывается на месте: разговор сохраняет `conversation_id`, но агент больше не видит предыдущих сообщений. Без `conversation_id` сбрасывается основной разговор решения. В историю добавляется служебное сообщение с ролью `context-reset`, отмечающее границу текущего контекста, — оно и возвращается в ответе (с ключом `ai_solution_chat_message`). Отметка добавляется и для разговора, в котором ещё не было сообщений.  Перед вызовом убедитесь, что чат готов (`ready: true` в методе получения статуса чата): пока сервер решения разворачивается или выключен, запрос завершается ошибкой.
     * @param {Number} solutionId ID AI-решения
     * @param {Object} opts Optional parameters
     * @param {module:model/ResetAiSolutionChat} [resetAiSolutionChat] 
     * @param {module:api/AISolutionsApi~resetAiSolutionChatCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ResetAiSolutionChat200Response}
     */
    resetAiSolutionChat(solutionId, opts, callback) {
      opts = opts || {};
      let postBody = opts['resetAiSolutionChat'];
      // verify the required parameter 'solutionId' is set
      if (solutionId === undefined || solutionId === null) {
        throw new Error("Missing the required parameter 'solutionId' when calling resetAiSolutionChat");
      }

      let pathParams = {
        'solution_id': solutionId
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
      let returnType = ResetAiSolutionChat200Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/solutions/{solution_id}/chat/reset', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the sendAiSolutionMessage operation.
     * @callback module:api/AISolutionsApi~sendAiSolutionMessageCallback
     * @param {String} error Error message, if any.
     * @param {module:model/SendAiSolutionMessage200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Отправка сообщения агенту AI-решения
     * Чтобы отправить сообщение агенту решения, отправьте POST-запрос на `/api/v1/cloud-ai/solutions/{solution_id}/chat/messages`.  Ответ возвращается целиком после завершения хода агента (ожидание — до 3 минут). Без `conversation_id` сообщение уходит в основной разговор решения; новый разговор начинается только при явной передаче нового ID. Без `message` агент сам здоровается — так можно показать первую реплику чата. Чтобы получать ответ по мере генерации, используйте потоковый метод.  Перед вызовом убедитесь, что чат готов (`ready: true` в методе получения статуса чата): пока сервер решения разворачивается или выключен, запрос завершается ошибкой.
     * @param {Number} solutionId ID AI-решения
     * @param {module:model/SendAiSolutionMessage} sendAiSolutionMessage 
     * @param {module:api/AISolutionsApi~sendAiSolutionMessageCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/SendAiSolutionMessage200Response}
     */
    sendAiSolutionMessage(solutionId, sendAiSolutionMessage, callback) {
      let postBody = sendAiSolutionMessage;
      // verify the required parameter 'solutionId' is set
      if (solutionId === undefined || solutionId === null) {
        throw new Error("Missing the required parameter 'solutionId' when calling sendAiSolutionMessage");
      }
      // verify the required parameter 'sendAiSolutionMessage' is set
      if (sendAiSolutionMessage === undefined || sendAiSolutionMessage === null) {
        throw new Error("Missing the required parameter 'sendAiSolutionMessage' when calling sendAiSolutionMessage");
      }

      let pathParams = {
        'solution_id': solutionId
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
      let returnType = SendAiSolutionMessage200Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/solutions/{solution_id}/chat/messages', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the shutdownAiSolution operation.
     * @callback module:api/AISolutionsApi~shutdownAiSolutionCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Выключение AI-решения
     * Чтобы выключить AI-решение, отправьте POST-запрос на `/api/v1/cloud-ai/solutions/{solution_id}/shutdown`.  Выключает сервер решения. Действие асинхронное: следите за результатом по статусу решения (обычно 1–2 минуты до `stopped`). Пока сервер выключен, чат недоступен, а сервер продолжает тарифицироваться. Выключение уже выключенного решения возвращает 204. Пока над сервером выполняется другое действие, ответ — 409 `ai_solution_is_busy`.
     * @param {Number} solutionId ID AI-решения
     * @param {module:api/AISolutionsApi~shutdownAiSolutionCallback} callback The callback function, accepting three arguments: error, data, response
     */
    shutdownAiSolution(solutionId, callback) {
      let postBody = null;
      // verify the required parameter 'solutionId' is set
      if (solutionId === undefined || solutionId === null) {
        throw new Error("Missing the required parameter 'solutionId' when calling shutdownAiSolution");
      }

      let pathParams = {
        'solution_id': solutionId
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
        '/api/v1/cloud-ai/solutions/{solution_id}/shutdown', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the startAiSolution operation.
     * @callback module:api/AISolutionsApi~startAiSolutionCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Запуск AI-решения
     * Чтобы запустить AI-решение, отправьте POST-запрос на `/api/v1/cloud-ai/solutions/{solution_id}/start`.  Включает сервер решения. Действие асинхронное: следите за результатом по статусу решения, а готовность агента проверяйте методом получения статуса чата. Пока над сервером выполняется действие, запуск и выключение возвращают 409 `ai_solution_is_busy`.  Не вызывайте метод для работающего решения: запрос будет принят (204) и запустит действие над сервером, а решение на несколько минут станет занятым.
     * @param {Number} solutionId ID AI-решения
     * @param {module:api/AISolutionsApi~startAiSolutionCallback} callback The callback function, accepting three arguments: error, data, response
     */
    startAiSolution(solutionId, callback) {
      let postBody = null;
      // verify the required parameter 'solutionId' is set
      if (solutionId === undefined || solutionId === null) {
        throw new Error("Missing the required parameter 'solutionId' when calling startAiSolution");
      }

      let pathParams = {
        'solution_id': solutionId
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
        '/api/v1/cloud-ai/solutions/{solution_id}/start', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the stopAiSolutionChat operation.
     * @callback module:api/AISolutionsApi~stopAiSolutionChatCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Остановка хода агента AI-решения
     * Чтобы остановить текущий ход агента, отправьте POST-запрос на `/api/v1/cloud-ai/solutions/{solution_id}/chat/stop`.  Прерывает генерацию ответа — например, если ответ зациклился или тратит слишком много токенов. Без `conversation_id` останавливается текущий ход основного разговора решения. Ход прерывается на стороне агента: закрыть соединение недостаточно, потому что принятый агентом ход продолжает выполняться независимо от клиента. Если хода нет, запрос всё равно возвращает 204.  Перед вызовом убедитесь, что чат готов (`ready: true` в методе получения статуса чата): пока сервер решения разворачивается или выключен, запрос завершается ошибкой.
     * @param {Number} solutionId ID AI-решения
     * @param {Object} opts Optional parameters
     * @param {module:model/StopAiSolutionChat} [stopAiSolutionChat] 
     * @param {module:api/AISolutionsApi~stopAiSolutionChatCallback} callback The callback function, accepting three arguments: error, data, response
     */
    stopAiSolutionChat(solutionId, opts, callback) {
      opts = opts || {};
      let postBody = opts['stopAiSolutionChat'];
      // verify the required parameter 'solutionId' is set
      if (solutionId === undefined || solutionId === null) {
        throw new Error("Missing the required parameter 'solutionId' when calling stopAiSolutionChat");
      }

      let pathParams = {
        'solution_id': solutionId
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
      let returnType = null;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/solutions/{solution_id}/chat/stop', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the streamAiSolutionChat operation.
     * @callback module:api/AISolutionsApi~streamAiSolutionChatCallback
     * @param {String} error Error message, if any.
     * @param {String} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Отправка сообщения агенту AI-решения с потоковым ответом
     * Чтобы отправить сообщение агенту решения и получать ответ потоком, отправьте POST-запрос на `https://agent.timeweb.cloud/api/v1/cloud-ai/solutions/{solution_id}/chat/stream`.  Метод работает на `https://agent.timeweb.cloud`, а не на `https://api.timeweb.cloud`: шлюз публичного API накапливает ответ целиком и не может передавать его по частям. Авторизация та же — API-токен в заголовке `Authorization`; токену с ограниченными правами нужен доступ на запись к AI-сервисам. Тело запроса такое же, как у метода отправки сообщения.  Ответ — `text/event-stream`: каждое событие приходит как `event: <тип>` и `data: <JSON>`. Отправка сообщения и подписка на ответ — один запрос, поэтому начало ответа не теряется. Строки, начинающиеся с `:`, — комментарии для поддержания соединения (каждые 15 секунд), их нужно игнорировать. ID разговора возвращается в заголовке ответа `X-Conversation-Id`.  Типы событий: - `subscribed` `{}` — ход принят; - `delta` `{text, seq, runId}` — очередной фрагмент ответа; - `tool` `{name, target, phase, status, seq, runId}` — агент использует инструмент; - `message` `{text, seq, id, stopReason}` — финальный ответ целиком, всегда после последнего `delta`; - `done` `{phase, seq, runId}` — ход завершён; - `error` `{reason, message, budget?}` — ход не удался. `reason`: `empty_reply` — агент не выдал текста; `stream_failed` — поток прервался; `agent_failed` — ход упал на стороне агента при исправном соединении, повтор имеет смысл; `budget_exceeded` — исчерпан лимит расходов ключа AI Gateway решения, в `budget` `{max, spent, resetAt}` — цифры лимита, если они известны. `error` всегда последнее событие потока и может прийти после `done` (например, с `empty_reply`).  Ошибки, возникшие до начала потока (решение не найдено, некорректный запрос, нет доступа), возвращаются обычным JSON-ответом с соответствующим HTTP-статусом. Если сервер решения выключен или недоступен, поток может открыться и сразу завершиться событием `error` с `reason: stream_failed` — проверяйте готовность чата заранее методом получения статуса чата.
     * @param {Number} solutionId ID AI-решения
     * @param {module:model/SendAiSolutionMessage} sendAiSolutionMessage 
     * @param {module:api/AISolutionsApi~streamAiSolutionChatCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link String}
     */
    streamAiSolutionChat(solutionId, sendAiSolutionMessage, opts, callback) {
      opts = opts || {};
      let postBody = sendAiSolutionMessage;
      // verify the required parameter 'solutionId' is set
      if (solutionId === undefined || solutionId === null) {
        throw new Error("Missing the required parameter 'solutionId' when calling streamAiSolutionChat");
      }
      // verify the required parameter 'sendAiSolutionMessage' is set
      if (sendAiSolutionMessage === undefined || sendAiSolutionMessage === null) {
        throw new Error("Missing the required parameter 'sendAiSolutionMessage' when calling streamAiSolutionChat");
      }

      let pathParams = {
        'solution_id': solutionId
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = ['application/json'];
      let accepts = ['text/event-stream', 'application/json'];
      let returnType = 'String';
      let basePaths = ['https://agent.timeweb.cloud'];
      let basePath = basePaths[0]; // by default use the first one in "servers" defined in OpenAPI
      if (typeof opts['_base_path_index'] !== 'undefined') {
        if (opts['_base_path_index']  >= basePaths.length || opts['_base_path_index'] <  0) {
          throw new Error("Invalid index " + opts['_base_path_index'] + " when selecting the host settings. Must be less than " + basePaths.length);
        }
        basePath = basePaths[opts['_base_path_index']];
      }

      return this.apiClient.callApi(
        '/api/v1/cloud-ai/solutions/{solution_id}/chat/stream', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, basePath, callback
      );
    }

    /**
     * Callback function to receive the result of the updateAiSolution operation.
     * @callback module:api/AISolutionsApi~updateAiSolutionCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateAiSolution201Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Изменение AI-решения
     * Чтобы изменить AI-решение, отправьте PATCH-запрос на `/api/v1/cloud-ai/solutions/{solution_id}`.  Меняются только переданные поля; `description: null` очищает описание. Смена модели переписывает конфигурацию агента на сервере решения и перезапускает агента, поэтому сервер должен быть включён и полностью развёрнут — иначе запрос завершится ошибкой и ничего не изменится. Смена только названия или описания сервер не затрагивает. Неподходящая модель — 404 `model_not_found`.
     * @param {Number} solutionId ID AI-решения
     * @param {module:model/UpdateAiSolution} updateAiSolution 
     * @param {module:api/AISolutionsApi~updateAiSolutionCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateAiSolution201Response}
     */
    updateAiSolution(solutionId, updateAiSolution, callback) {
      let postBody = updateAiSolution;
      // verify the required parameter 'solutionId' is set
      if (solutionId === undefined || solutionId === null) {
        throw new Error("Missing the required parameter 'solutionId' when calling updateAiSolution");
      }
      // verify the required parameter 'updateAiSolution' is set
      if (updateAiSolution === undefined || updateAiSolution === null) {
        throw new Error("Missing the required parameter 'updateAiSolution' when calling updateAiSolution");
      }

      let pathParams = {
        'solution_id': solutionId
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
      let returnType = CreateAiSolution201Response;
      return this.apiClient.callApi(
        '/api/v1/cloud-ai/solutions/{solution_id}', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}
