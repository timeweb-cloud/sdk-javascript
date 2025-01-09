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
import BaseError from '../model/BaseError';
import GetFinances400Response from '../model/GetFinances400Response';
import GetFinances401Response from '../model/GetFinances401Response';
import GetFinances429Response from '../model/GetFinances429Response';
import GetFinances500Response from '../model/GetFinances500Response';
import GetImage404Response from '../model/GetImage404Response';
import ImageDownloadResponse from '../model/ImageDownloadResponse';
import ImageDownloadsResponse from '../model/ImageDownloadsResponse';
import ImageInAPI from '../model/ImageInAPI';
import ImageOutResponse from '../model/ImageOutResponse';
import ImageUpdateAPI from '../model/ImageUpdateAPI';
import ImageUrlIn from '../model/ImageUrlIn';
import ImagesOutResponse from '../model/ImagesOutResponse';
import UploadSuccessfulResponse from '../model/UploadSuccessfulResponse';

/**
* Images service.
* @module api/ImagesApi
* @version 1.0.0
*/
export default class ImagesApi {

    /**
    * Constructs a new ImagesApi. 
    * @alias module:api/ImagesApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }


    /**
     * Callback function to receive the result of the createImage operation.
     * @callback module:api/ImagesApi~createImageCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ImageOutResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Создание образа
     * Чтобы создать образ, отправьте POST запрос в `/api/v1/images`, задав необходимые атрибуты.   Для загрузки собственного образа вам нужно отправить параметры `location`, `os` и не указывать `disk_id`. Поддерживается два способа загрузки:  1. По ссылке. Для этого укажите `upload_url` с ссылкой на загрузку образа 2. Из файла. Для этого воспользуйтесь методом POST `/api/v1/images/{image_id}` Образ будет создан с использованием предоставленной информации.    Тело ответа будет содержать объект JSON с информацией о созданном образе.
     * @param {module:model/ImageInAPI} imageInAPI 
     * @param {module:api/ImagesApi~createImageCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ImageOutResponse}
     */
    createImage(imageInAPI, callback) {
      let postBody = imageInAPI;
      // verify the required parameter 'imageInAPI' is set
      if (imageInAPI === undefined || imageInAPI === null) {
        throw new Error("Missing the required parameter 'imageInAPI' when calling createImage");
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
      let returnType = ImageOutResponse;
      return this.apiClient.callApi(
        '/api/v1/images', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the createImageDownloadUrl operation.
     * @callback module:api/ImagesApi~createImageDownloadUrlCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ImageDownloadResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Создание ссылки на скачивание образа
     * Чтобы создать ссылку на скачивание образа, отправьте запрос POST в `/api/v1/images/{image_id}/download-url`.
     * @param {String} imageId ID образа
     * @param {module:model/ImageUrlIn} imageUrlIn 
     * @param {module:api/ImagesApi~createImageDownloadUrlCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ImageDownloadResponse}
     */
    createImageDownloadUrl(imageId, imageUrlIn, callback) {
      let postBody = imageUrlIn;
      // verify the required parameter 'imageId' is set
      if (imageId === undefined || imageId === null) {
        throw new Error("Missing the required parameter 'imageId' when calling createImageDownloadUrl");
      }
      // verify the required parameter 'imageUrlIn' is set
      if (imageUrlIn === undefined || imageUrlIn === null) {
        throw new Error("Missing the required parameter 'imageUrlIn' when calling createImageDownloadUrl");
      }

      let pathParams = {
        'image_id': imageId
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
      let returnType = ImageDownloadResponse;
      return this.apiClient.callApi(
        '/api/v1/images/{image_id}/download-url', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteImage operation.
     * @callback module:api/ImagesApi~deleteImageCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Удаление образа
     * Чтобы удалить образ, отправьте запрос DELETE в `/api/v1/images/{image_id}`.
     * @param {String} imageId ID образа
     * @param {module:api/ImagesApi~deleteImageCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteImage(imageId, callback) {
      let postBody = null;
      // verify the required parameter 'imageId' is set
      if (imageId === undefined || imageId === null) {
        throw new Error("Missing the required parameter 'imageId' when calling deleteImage");
      }

      let pathParams = {
        'image_id': imageId
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
        '/api/v1/images/{image_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteImageDownloadURL operation.
     * @callback module:api/ImagesApi~deleteImageDownloadURLCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Удаление ссылки на образ
     * Чтобы удалить ссылку на образ, отправьте DELETE запрос в `/api/v1/images/{image_id}/download-url/{image_url_id}`.
     * @param {String} imageId ID образа
     * @param {String} imageUrlId ID ссылки
     * @param {module:api/ImagesApi~deleteImageDownloadURLCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteImageDownloadURL(imageId, imageUrlId, callback) {
      let postBody = null;
      // verify the required parameter 'imageId' is set
      if (imageId === undefined || imageId === null) {
        throw new Error("Missing the required parameter 'imageId' when calling deleteImageDownloadURL");
      }
      // verify the required parameter 'imageUrlId' is set
      if (imageUrlId === undefined || imageUrlId === null) {
        throw new Error("Missing the required parameter 'imageUrlId' when calling deleteImageDownloadURL");
      }

      let pathParams = {
        'image_id': imageId,
        'image_url_id': imageUrlId
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
        '/api/v1/images/{image_id}/download-url/{image_url_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getImage operation.
     * @callback module:api/ImagesApi~getImageCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ImageOutResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение информации о образе
     * Чтобы получить образ, отправьте запрос GET в `/api/v1/images/{image_id}`.
     * @param {String} imageId ID образа
     * @param {module:api/ImagesApi~getImageCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ImageOutResponse}
     */
    getImage(imageId, callback) {
      let postBody = null;
      // verify the required parameter 'imageId' is set
      if (imageId === undefined || imageId === null) {
        throw new Error("Missing the required parameter 'imageId' when calling getImage");
      }

      let pathParams = {
        'image_id': imageId
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
      let returnType = ImageOutResponse;
      return this.apiClient.callApi(
        '/api/v1/images/{image_id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getImageDownloadURL operation.
     * @callback module:api/ImagesApi~getImageDownloadURLCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ImageDownloadResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение информации о ссылке на скачивание образа
     * Чтобы получить информацию о ссылке на скачивание образа, отправьте запрос GET в `/api/v1/images/{image_id}/download-url/{image_url_id}`.
     * @param {String} imageId ID образа
     * @param {String} imageUrlId ID ссылки
     * @param {module:api/ImagesApi~getImageDownloadURLCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ImageDownloadResponse}
     */
    getImageDownloadURL(imageId, imageUrlId, callback) {
      let postBody = null;
      // verify the required parameter 'imageId' is set
      if (imageId === undefined || imageId === null) {
        throw new Error("Missing the required parameter 'imageId' when calling getImageDownloadURL");
      }
      // verify the required parameter 'imageUrlId' is set
      if (imageUrlId === undefined || imageUrlId === null) {
        throw new Error("Missing the required parameter 'imageUrlId' when calling getImageDownloadURL");
      }

      let pathParams = {
        'image_id': imageId,
        'image_url_id': imageUrlId
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
      let returnType = ImageDownloadResponse;
      return this.apiClient.callApi(
        '/api/v1/images/{image_id}/download-url/{image_url_id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getImageDownloadURLs operation.
     * @callback module:api/ImagesApi~getImageDownloadURLsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ImageDownloadsResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение информации о ссылках на скачивание образов
     * Чтобы получить информацию о ссылках на скачивание образов, отправьте запрос GET в `/api/v1/images/{image_id}/download-url`.
     * @param {String} imageId ID образа
     * @param {Object} opts Optional parameters
     * @param {Number} [limit = 100)] 
     * @param {Number} [offset = 0)] 
     * @param {module:api/ImagesApi~getImageDownloadURLsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ImageDownloadsResponse}
     */
    getImageDownloadURLs(imageId, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'imageId' is set
      if (imageId === undefined || imageId === null) {
        throw new Error("Missing the required parameter 'imageId' when calling getImageDownloadURLs");
      }

      let pathParams = {
        'image_id': imageId
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
      let returnType = ImageDownloadsResponse;
      return this.apiClient.callApi(
        '/api/v1/images/{image_id}/download-url', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getImages operation.
     * @callback module:api/ImagesApi~getImagesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ImagesOutResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Получение списка образов
     * Чтобы получить список образов, отправьте GET запрос на `/api/v1/images`
     * @param {Object} opts Optional parameters
     * @param {Number} [limit = 100)] 
     * @param {Number} [offset = 0)] 
     * @param {module:api/ImagesApi~getImagesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ImagesOutResponse}
     */
    getImages(opts, callback) {
      opts = opts || {};
      let postBody = null;

      let pathParams = {
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
      let returnType = ImagesOutResponse;
      return this.apiClient.callApi(
        '/api/v1/images', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the updateImage operation.
     * @callback module:api/ImagesApi~updateImageCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ImageOutResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Обновление информации о образе
     * Чтобы обновить только определенные атрибуты образа, отправьте запрос PATCH в `/api/v1/images/{image_id}`.
     * @param {String} imageId ID образа
     * @param {module:model/ImageUpdateAPI} imageUpdateAPI 
     * @param {module:api/ImagesApi~updateImageCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ImageOutResponse}
     */
    updateImage(imageId, imageUpdateAPI, callback) {
      let postBody = imageUpdateAPI;
      // verify the required parameter 'imageId' is set
      if (imageId === undefined || imageId === null) {
        throw new Error("Missing the required parameter 'imageId' when calling updateImage");
      }
      // verify the required parameter 'imageUpdateAPI' is set
      if (imageUpdateAPI === undefined || imageUpdateAPI === null) {
        throw new Error("Missing the required parameter 'imageUpdateAPI' when calling updateImage");
      }

      let pathParams = {
        'image_id': imageId
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
      let returnType = ImageOutResponse;
      return this.apiClient.callApi(
        '/api/v1/images/{image_id}', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the uploadImage operation.
     * @callback module:api/ImagesApi~uploadImageCallback
     * @param {String} error Error message, if any.
     * @param {module:model/UploadSuccessfulResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Загрузка образа
     * Чтобы загрузить свой образ, отправьте POST запрос в `/api/v1/images/{image_id}`, отправив файл как `multipart/form-data`, указав имя файла в заголовке `Content-Disposition`.   Перед загрузкой, нужно создать образ используя POST `/api/v1/images`, указав параметры `location`, `os`   Тело ответа будет содержать объект JSON с информацией о загруженном образе.
     * @param {String} imageId 
     * @param {Object} opts Optional parameters
     * @param {String} [contentDisposition] 
     * @param {module:api/ImagesApi~uploadImageCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/UploadSuccessfulResponse}
     */
    uploadImage(imageId, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'imageId' is set
      if (imageId === undefined || imageId === null) {
        throw new Error("Missing the required parameter 'imageId' when calling uploadImage");
      }

      let pathParams = {
        'image_id': imageId
      };
      let queryParams = {
      };
      let headerParams = {
        'content-disposition': opts['contentDisposition']
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = UploadSuccessfulResponse;
      return this.apiClient.callApi(
        '/api/v1/images/{image_id}', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}
