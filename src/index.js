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


import ApiClient from './ApiClient';
import AddAiSolutionTelegramBot201Response from './model/AddAiSolutionTelegramBot201Response';
import AddBalancerToProject200Response from './model/AddBalancerToProject200Response';
import AddBalancerToProjectRequest from './model/AddBalancerToProjectRequest';
import AddBitbucket from './model/AddBitbucket';
import AddCdnCertificate422Response from './model/AddCdnCertificate422Response';
import AddCertificate from './model/AddCertificate';
import AddClusterToProjectRequest from './model/AddClusterToProjectRequest';
import AddCountries from './model/AddCountries';
import AddCountriesToAllowedList201Response from './model/AddCountriesToAllowedList201Response';
import AddCountriesToAllowedListRequest from './model/AddCountriesToAllowedListRequest';
import AddDatabaseToProjectRequest from './model/AddDatabaseToProjectRequest';
import AddDedicatedServerToProjectRequest from './model/AddDedicatedServerToProjectRequest';
import AddGit from './model/AddGit';
import AddGithub from './model/AddGithub';
import AddGitlab from './model/AddGitlab';
import AddIPsToAllowedList201Response from './model/AddIPsToAllowedList201Response';
import AddIPsToAllowedListRequest from './model/AddIPsToAllowedListRequest';
import AddIPsToBalancerRequest from './model/AddIPsToBalancerRequest';
import AddIps from './model/AddIps';
import AddKeyToServerRequest from './model/AddKeyToServerRequest';
import AddProvider201Response from './model/AddProvider201Response';
import AddServerIP201Response from './model/AddServerIP201Response';
import AddServerIPRequest from './model/AddServerIPRequest';
import AddServerToProjectRequest from './model/AddServerToProjectRequest';
import AddStorageSubdomainCertificateRequest from './model/AddStorageSubdomainCertificateRequest';
import AddStorageSubdomains200Response from './model/AddStorageSubdomains200Response';
import AddStorageSubdomainsRequest from './model/AddStorageSubdomainsRequest';
import AddStorageToProjectRequest from './model/AddStorageToProjectRequest';
import AddSubdomain201Response from './model/AddSubdomain201Response';
import AddTokenPackage from './model/AddTokenPackage';
import AddedSubdomain from './model/AddedSubdomain';
import AddonConfigOut from './model/AddonConfigOut';
import AddonOut from './model/AddonOut';
import AddonsConfigResponse from './model/AddonsConfigResponse';
import AddonsResponse from './model/AddonsResponse';
import Agent from './model/Agent';
import AgentAdditionalModel from './model/AgentAdditionalModel';
import AgentEntityLimit from './model/AgentEntityLimit';
import AgentModelSettings from './model/AgentModelSettings';
import AgentSettings from './model/AgentSettings';
import AgentSkill from './model/AgentSkill';
import AgentTokenStatistic from './model/AgentTokenStatistic';
import AgentToolsInner from './model/AgentToolsInner';
import AgentV3 from './model/AgentV3';
import AgentV3KnowledgeBasesInner from './model/AgentV3KnowledgeBasesInner';
import AgentWidgetSettings from './model/AgentWidgetSettings';
import AiGatewayBatch from './model/AiGatewayBatch';
import AiGatewayBatchCreateRequest from './model/AiGatewayBatchCreateRequest';
import AiGatewayBatchList from './model/AiGatewayBatchList';
import AiGatewayBatchRequestCounts from './model/AiGatewayBatchRequestCounts';
import AiGatewayChatCompletion from './model/AiGatewayChatCompletion';
import AiGatewayChatCompletionChoicesInner from './model/AiGatewayChatCompletionChoicesInner';
import AiGatewayChatCompletionChunk from './model/AiGatewayChatCompletionChunk';
import AiGatewayChatCompletionChunkChoicesInner from './model/AiGatewayChatCompletionChunkChoicesInner';
import AiGatewayChatCompletionRequest from './model/AiGatewayChatCompletionRequest';
import AiGatewayChatCompletionRequestStreamOptions from './model/AiGatewayChatCompletionRequestStreamOptions';
import AiGatewayChatMessage from './model/AiGatewayChatMessage';
import AiGatewayCompletion from './model/AiGatewayCompletion';
import AiGatewayCompletionChoicesInner from './model/AiGatewayCompletionChoicesInner';
import AiGatewayCompletionRequest from './model/AiGatewayCompletionRequest';
import AiGatewayEmbeddingList from './model/AiGatewayEmbeddingList';
import AiGatewayEmbeddingListDataInner from './model/AiGatewayEmbeddingListDataInner';
import AiGatewayEmbeddingListUsage from './model/AiGatewayEmbeddingListUsage';
import AiGatewayEmbeddingRequest from './model/AiGatewayEmbeddingRequest';
import AiGatewayError from './model/AiGatewayError';
import AiGatewayErrorError from './model/AiGatewayErrorError';
import AiGatewayFile from './model/AiGatewayFile';
import AiGatewayFileDeleted from './model/AiGatewayFileDeleted';
import AiGatewayImageGenerationRequest from './model/AiGatewayImageGenerationRequest';
import AiGatewayImagesResponse from './model/AiGatewayImagesResponse';
import AiGatewayImagesResponseDataInner from './model/AiGatewayImagesResponseDataInner';
import AiGatewayModel from './model/AiGatewayModel';
import AiGatewayModelList from './model/AiGatewayModelList';
import AiGatewayResponse from './model/AiGatewayResponse';
import AiGatewayResponseCreateRequest from './model/AiGatewayResponseCreateRequest';
import AiGatewayResponseCreateRequestReasoning from './model/AiGatewayResponseCreateRequestReasoning';
import AiGatewayResponseDeleted from './model/AiGatewayResponseDeleted';
import AiGatewayResponseIncompleteDetails from './model/AiGatewayResponseIncompleteDetails';
import AiGatewayResponseUsage from './model/AiGatewayResponseUsage';
import AiGatewaySpeechRequest from './model/AiGatewaySpeechRequest';
import AiGatewayToolCall from './model/AiGatewayToolCall';
import AiGatewayToolCallFunction from './model/AiGatewayToolCallFunction';
import AiGatewayTranscription from './model/AiGatewayTranscription';
import AiGatewayUsage from './model/AiGatewayUsage';
import AiGatewayUsageCompletionTokensDetails from './model/AiGatewayUsageCompletionTokensDetails';
import AiGatewayUsagePromptTokensDetails from './model/AiGatewayUsagePromptTokensDetails';
import AiGatewayValidationError from './model/AiGatewayValidationError';
import AiKey from './model/AiKey';
import AiKeyCallsStatisticPoint from './model/AiKeyCallsStatisticPoint';
import AiKeyLimit from './model/AiKeyLimit';
import AiKeyTokenStatisticPoint from './model/AiKeyTokenStatisticPoint';
import AiProvider from './model/AiProvider';
import AiSolution from './model/AiSolution';
import AiSolutionAiKey from './model/AiSolutionAiKey';
import AiSolutionChatMessage from './model/AiSolutionChatMessage';
import AiSolutionChatReply from './model/AiSolutionChatReply';
import AiSolutionChatStatus from './model/AiSolutionChatStatus';
import AiSolutionConversation from './model/AiSolutionConversation';
import AiSolutionTelegramBot from './model/AiSolutionTelegramBot';
import AiSolutionType from './model/AiSolutionType';
import AiSolutionTypeRequirements from './model/AiSolutionTypeRequirements';
import App from './model/App';
import AppConfiguration from './model/AppConfiguration';
import AppDiskStatus from './model/AppDiskStatus';
import AppDomainsInner from './model/AppDomainsInner';
import AppProvider from './model/AppProvider';
import AppV2 from './model/AppV2';
import AppV2Configuration from './model/AppV2Configuration';
import AppV2DiskStatus from './model/AppV2DiskStatus';
import AppV2DomainsInner from './model/AppV2DomainsInner';
import AppV2Provider from './model/AppV2Provider';
import ApproveTelegramPairing from './model/ApproveTelegramPairing';
import AppsPresets from './model/AppsPresets';
import AppsPresetsBackendPresetsInner from './model/AppsPresetsBackendPresetsInner';
import AppsPresetsFrontendPresetsInner from './model/AppsPresetsFrontendPresetsInner';
import AuthorizeUrl from './model/AuthorizeUrl';
import AutoBackup from './model/AutoBackup';
import AutoReplyIsDisabled from './model/AutoReplyIsDisabled';
import AutoReplyIsEnabled from './model/AutoReplyIsEnabled';
import AutoreplyIsDisabled from './model/AutoreplyIsDisabled';
import AutoreplyIsEnabled from './model/AutoreplyIsEnabled';
import AvailabilityZone from './model/AvailabilityZone';
import AvailableFrameworks from './model/AvailableFrameworks';
import AvailableFrameworksBackendFrameworksInner from './model/AvailableFrameworksBackendFrameworksInner';
import AvailableFrameworksFrontendFrameworksInner from './model/AvailableFrameworksFrontendFrameworksInner';
import AvailableNetwork from './model/AvailableNetwork';
import AvailableNetworksResponse from './model/AvailableNetworksResponse';
import AvailableStaticRoute from './model/AvailableStaticRoute';
import AvailableStaticRouteSubnetsInner from './model/AvailableStaticRouteSubnetsInner';
import AvailableStaticRoutesResponse from './model/AvailableStaticRoutesResponse';
import Backup from './model/Backup';
import BackupDownloadUrl from './model/BackupDownloadUrl';
import BackupDownloadUrlRequest from './model/BackupDownloadUrlRequest';
import Balancer from './model/Balancer';
import BalancerNetworksInner from './model/BalancerNetworksInner';
import BalancerNetworksInnerIpsInner from './model/BalancerNetworksInnerIpsInner';
import BaseError from './model/BaseError';
import BindFloatingIp from './model/BindFloatingIp';
import Bonus from './model/Bonus';
import Bot from './model/Bot';
import Branch from './model/Branch';
import Bucket from './model/Bucket';
import BucketDiskStats from './model/BucketDiskStats';
import BucketUser from './model/BucketUser';
import BucketWebsiteConfig from './model/BucketWebsiteConfig';
import BucketWebsiteConfigErrorPagesInner from './model/BucketWebsiteConfigErrorPagesInner';
import Certificate from './model/Certificate';
import CertificateTask from './model/CertificateTask';
import ChangeAgentModel from './model/ChangeAgentModel';
import Chat from './model/Chat';
import ChatFirstMessage from './model/ChatFirstMessage';
import ChatListMetrics from './model/ChatListMetrics';
import ChatMessage from './model/ChatMessage';
import ChatMessageFile from './model/ChatMessageFile';
import ChatsCsv from './model/ChatsCsv';
import CheckDomain200Response from './model/CheckDomain200Response';
import ClearCache from './model/ClearCache';
import Clickhouse from './model/Clickhouse';
import ClusterAction from './model/ClusterAction';
import ClusterEdit from './model/ClusterEdit';
import ClusterEditOidcProvider from './model/ClusterEditOidcProvider';
import ClusterIn from './model/ClusterIn';
import ClusterIn1 from './model/ClusterIn1';
import ClusterInClusterNetworkCidr from './model/ClusterInClusterNetworkCidr';
import ClusterInConfiguration from './model/ClusterInConfiguration';
import ClusterInMaintenanceSlot from './model/ClusterInMaintenanceSlot';
import ClusterInOidcProvider from './model/ClusterInOidcProvider';
import ClusterOut from './model/ClusterOut';
import ClusterResponse from './model/ClusterResponse';
import ClusterVersionEdit from './model/ClusterVersionEdit';
import Clusterk8s from './model/Clusterk8s';
import ClustersResponse from './model/ClustersResponse';
import Commit from './model/Commit';
import ComponentsSchemasBaseError from './model/ComponentsSchemasBaseError';
import ComponentsSchemasMeta from './model/ComponentsSchemasMeta';
import ConfigAccess from './model/ConfigAccess';
import ConfigCache from './model/ConfigCache';
import ConfigCacheAlwaysOnline from './model/ConfigCacheAlwaysOnline';
import ConfigCacheBrowser from './model/ConfigCacheBrowser';
import ConfigCacheCdn from './model/ConfigCacheCdn';
import ConfigCacheCdnTtl from './model/ConfigCacheCdnTtl';
import ConfigCacheQueryArgs from './model/ConfigCacheQueryArgs';
import ConfigDelivery from './model/ConfigDelivery';
import ConfigDeliveryPackaging from './model/ConfigDeliveryPackaging';
import ConfigDeliveryPackagingMp4 from './model/ConfigDeliveryPackagingMp4';
import ConfigDomains from './model/ConfigDomains';
import ConfigHttpHeaders from './model/ConfigHttpHeaders';
import ConfigHttpHeadersCors from './model/ConfigHttpHeadersCors';
import ConfigOrigin from './model/ConfigOrigin';
import ConfigOriginAws from './model/ConfigOriginAws';
import ConfigRobots from './model/ConfigRobots';
import ConfigSecurity from './model/ConfigSecurity';
import ConfigSecuritySecureToken from './model/ConfigSecuritySecureToken';
import ConnectAgentTool from './model/ConnectAgentTool';
import ConnectSkillItem from './model/ConnectSkillItem';
import ConnectSkills from './model/ConnectSkills';
import ConnectTelegram from './model/ConnectTelegram';
import ContainerRegistryPresetsInner from './model/ContainerRegistryPresetsInner';
import ContainerRegistryRepositoriesInner from './model/ContainerRegistryRepositoriesInner';
import CreateAdmin from './model/CreateAdmin';
import CreateAgent from './model/CreateAgent';
import CreateAgent201Response from './model/CreateAgent201Response';
import CreateAgentBotTelegramBot201Response from './model/CreateAgentBotTelegramBot201Response';
import CreateAgentEntityLimit from './model/CreateAgentEntityLimit';
import CreateAgentEntityLimit201Response from './model/CreateAgentEntityLimit201Response';
import CreateAgentSkill201Response from './model/CreateAgentSkill201Response';
import CreateAgentTool201Response from './model/CreateAgentTool201Response';
import CreateAgentV2 from './model/CreateAgentV2';
import CreateAiKey from './model/CreateAiKey';
import CreateAiKey201Response from './model/CreateAiKey201Response';
import CreateAiKeyLimit from './model/CreateAiKeyLimit';
import CreateAiKeyLimit201Response from './model/CreateAiKeyLimit201Response';
import CreateAiSolution from './model/CreateAiSolution';
import CreateAiSolution201Response from './model/CreateAiSolution201Response';
import CreateApp from './model/CreateApp';
import CreateApp201Response from './model/CreateApp201Response';
import CreateAppV2 from './model/CreateAppV2';
import CreateAppV2201Response from './model/CreateAppV2201Response';
import CreateAppV2Configuration from './model/CreateAppV2Configuration';
import CreateAppV2Network from './model/CreateAppV2Network';
import CreateBalancer from './model/CreateBalancer';
import CreateBalancer200Response from './model/CreateBalancer200Response';
import CreateBalancerCertificates from './model/CreateBalancerCertificates';
import CreateBalancerRule200Response from './model/CreateBalancerRule200Response';
import CreateBot from './model/CreateBot';
import CreateCdnResource201Response from './model/CreateCdnResource201Response';
import CreateCluster from './model/CreateCluster';
import CreateClusterAdmin from './model/CreateClusterAdmin';
import CreateClusterBackupSchedule from './model/CreateClusterBackupSchedule';
import CreateClusterConfiguration from './model/CreateClusterConfiguration';
import CreateClusterDiskAutoscaling from './model/CreateClusterDiskAutoscaling';
import CreateClusterInstance from './model/CreateClusterInstance';
import CreateClusterMaintenanceSlot from './model/CreateClusterMaintenanceSlot';
import CreateCrispIntegration from './model/CreateCrispIntegration';
import CreateDatabaseBackup201Response from './model/CreateDatabaseBackup201Response';
import CreateDatabaseBackupDownloadUrl201Response from './model/CreateDatabaseBackupDownloadUrl201Response';
import CreateDatabaseCluster201Response from './model/CreateDatabaseCluster201Response';
import CreateDatabaseInstance201Response from './model/CreateDatabaseInstance201Response';
import CreateDatabaseS3Backup201Response from './model/CreateDatabaseS3Backup201Response';
import CreateDatabaseUser201Response from './model/CreateDatabaseUser201Response';
import CreateDbAutoBackups from './model/CreateDbAutoBackups';
import CreateDedicatedServer from './model/CreateDedicatedServer';
import CreateDedicatedServer201Response from './model/CreateDedicatedServer201Response';
import CreateDeploy201Response from './model/CreateDeploy201Response';
import CreateDeployRequest from './model/CreateDeployRequest';
import CreateDns from './model/CreateDns';
import CreateDnsV2 from './model/CreateDnsV2';
import CreateDocument from './model/CreateDocument';
import CreateDomainDNSRecord201Response from './model/CreateDomainDNSRecord201Response';
import CreateDomainDNSRecordV2201Response from './model/CreateDomainDNSRecordV2201Response';
import CreateDomainMailbox201Response from './model/CreateDomainMailbox201Response';
import CreateDomainMailboxRequest from './model/CreateDomainMailboxRequest';
import CreateDomainMailboxV2201Response from './model/CreateDomainMailboxV2201Response';
import CreateDomainMailboxV2Request from './model/CreateDomainMailboxV2Request';
import CreateDomainRequest201Response from './model/CreateDomainRequest201Response';
import CreateFloatingIp from './model/CreateFloatingIp';
import CreateFloatingIp201Response from './model/CreateFloatingIp201Response';
import CreateHttpResource from './model/CreateHttpResource';
import CreateInstance from './model/CreateInstance';
import CreateJivoIntegration from './model/CreateJivoIntegration';
import CreateKey201Response from './model/CreateKey201Response';
import CreateKeyRequest from './model/CreateKeyRequest';
import CreateKnowledgebase from './model/CreateKnowledgebase';
import CreateKnowledgebase201Response from './model/CreateKnowledgebase201Response';
import CreateKnowledgebaseDocument201Response from './model/CreateKnowledgebaseDocument201Response';
import CreateMaxBot from './model/CreateMaxBot';
import CreateMultipleDomainMailboxes201Response from './model/CreateMultipleDomainMailboxes201Response';
import CreateMultipleDomainMailboxesRequest from './model/CreateMultipleDomainMailboxesRequest';
import CreateMultipleDomainMailboxesRequestMailboxesInner from './model/CreateMultipleDomainMailboxesRequestMailboxesInner';
import CreateMultipleDomainMailboxesV2201Response from './model/CreateMultipleDomainMailboxesV2201Response';
import CreateMultipleDomainMailboxesV2RequestInner from './model/CreateMultipleDomainMailboxesV2RequestInner';
import CreateNetworkDrive from './model/CreateNetworkDrive';
import CreateNetworkDrive201Response from './model/CreateNetworkDrive201Response';
import CreatePerson201Response from './model/CreatePerson201Response';
import CreateProject from './model/CreateProject';
import CreateProject201Response from './model/CreateProject201Response';
import CreateRule from './model/CreateRule';
import CreateS3Backup from './model/CreateS3Backup';
import CreateServer from './model/CreateServer';
import CreateServer201Response from './model/CreateServer201Response';
import CreateServerConfiguration from './model/CreateServerConfiguration';
import CreateServerDisk201Response from './model/CreateServerDisk201Response';
import CreateServerDiskBackup201Response from './model/CreateServerDiskBackup201Response';
import CreateServerDiskBackupDownloadUrl201Response from './model/CreateServerDiskBackupDownloadUrl201Response';
import CreateServerDiskBackupRequest from './model/CreateServerDiskBackupRequest';
import CreateServerDiskRequest from './model/CreateServerDiskRequest';
import CreateServerNetwork from './model/CreateServerNetwork';
import CreateSkill from './model/CreateSkill';
import CreateStorage201Response from './model/CreateStorage201Response';
import CreateStorageRequest from './model/CreateStorageRequest';
import CreateStorageRequestConfigurator from './model/CreateStorageRequestConfigurator';
import CreateTool from './model/CreateTool';
import CreateVPC201Response from './model/CreateVPC201Response';
import CreateVpc from './model/CreateVpc';
import CrispIntegration from './model/CrispIntegration';
import DatabaseAdmin from './model/DatabaseAdmin';
import DatabaseAdminInstancesInner from './model/DatabaseAdminInstancesInner';
import DatabaseCluster from './model/DatabaseCluster';
import DatabaseClusterChildServicesInner from './model/DatabaseClusterChildServicesInner';
import DatabaseClusterDisk from './model/DatabaseClusterDisk';
import DatabaseClusterDiskAutoscaling from './model/DatabaseClusterDiskAutoscaling';
import DatabaseClusterDomainsInner from './model/DatabaseClusterDomainsInner';
import DatabaseClusterMaintenanceSlot from './model/DatabaseClusterMaintenanceSlot';
import DatabaseClusterNetworksInner from './model/DatabaseClusterNetworksInner';
import DatabaseClusterNetworksInnerIpsInner from './model/DatabaseClusterNetworksInnerIpsInner';
import DatabaseClusterParentServicesInner from './model/DatabaseClusterParentServicesInner';
import DatabaseClusterReplicaListInner from './model/DatabaseClusterReplicaListInner';
import DatabaseClusterReplicaListInnerDisk from './model/DatabaseClusterReplicaListInnerDisk';
import DatabaseConfigurator from './model/DatabaseConfigurator';
import DatabaseConfiguratorPrices from './model/DatabaseConfiguratorPrices';
import DatabaseConfiguratorRequirements from './model/DatabaseConfiguratorRequirements';
import DatabaseExtensions from './model/DatabaseExtensions';
import DatabaseInstance from './model/DatabaseInstance';
import DatabaseType from './model/DatabaseType';
import DatabaseTypeRequirements from './model/DatabaseTypeRequirements';
import Db from './model/Db';
import DbDiskStats from './model/DbDiskStats';
import DbExtension from './model/DbExtension';
import DbParametersByType from './model/DbParametersByType';
import DbPrivilegeGroup from './model/DbPrivilegeGroup';
import DbReplication from './model/DbReplication';
import DbType from './model/DbType';
import DbsCreateBackup from './model/DbsCreateBackup';
import DbsUpdateBackup from './model/DbsUpdateBackup';
import DedicatedServer from './model/DedicatedServer';
import DedicatedServerAdditionalService from './model/DedicatedServerAdditionalService';
import DedicatedServerPreset from './model/DedicatedServerPreset';
import DedicatedServerPresetCpu from './model/DedicatedServerPresetCpu';
import DedicatedServerPresetDisk from './model/DedicatedServerPresetDisk';
import DedicatedServerPresetMemory from './model/DedicatedServerPresetMemory';
import DeleteAgent from './model/DeleteAgent';
import DeleteBalancer200Response from './model/DeleteBalancer200Response';
import DeleteCluster200Response from './model/DeleteCluster200Response';
import DeleteCountriesFromAllowedList200Response from './model/DeleteCountriesFromAllowedList200Response';
import DeleteCountriesFromAllowedListRequest from './model/DeleteCountriesFromAllowedListRequest';
import DeleteDatabaseCluster200Response from './model/DeleteDatabaseCluster200Response';
import DeleteDatabaseCluster200ResponseDatabaseDelete from './model/DeleteDatabaseCluster200ResponseDatabaseDelete';
import DeleteIPsFromAllowedList200Response from './model/DeleteIPsFromAllowedList200Response';
import DeleteIPsFromAllowedListRequest from './model/DeleteIPsFromAllowedListRequest';
import DeleteServer200Response from './model/DeleteServer200Response';
import DeleteServerIPRequest from './model/DeleteServerIPRequest';
import DeleteServiceResponse from './model/DeleteServiceResponse';
import DeleteStorage200Response from './model/DeleteStorage200Response';
import Deploy from './model/Deploy';
import DeploySettingsInner from './model/DeploySettingsInner';
import DeployStatus from './model/DeployStatus';
import DnatIn from './model/DnatIn';
import DnatInLocal from './model/DnatInLocal';
import DnatInPublic from './model/DnatInPublic';
import DnatRuleOut from './model/DnatRuleOut';
import DnatRuleResponse from './model/DnatRuleResponse';
import DnatRulesResponse from './model/DnatRulesResponse';
import DnsRecord from './model/DnsRecord';
import DnsRecordData from './model/DnsRecordData';
import DnsRecordV2 from './model/DnsRecordV2';
import DnsRecordV2Data from './model/DnsRecordV2Data';
import Document from './model/Document';
import DocumentStatusInfo from './model/DocumentStatusInfo';
import DocumentStatusInfoDetails from './model/DocumentStatusInfoDetails';
import Domain from './model/Domain';
import DomainAllowedBuyPeriodsInner from './model/DomainAllowedBuyPeriodsInner';
import DomainInfo from './model/DomainInfo';
import DomainNameServer from './model/DomainNameServer';
import DomainNameServerItemsInner from './model/DomainNameServerItemsInner';
import DomainPaymentPeriod from './model/DomainPaymentPeriod';
import DomainPrimeType from './model/DomainPrimeType';
import DomainProlong from './model/DomainProlong';
import DomainRegister from './model/DomainRegister';
import DomainRequest from './model/DomainRequest';
import DomainTransfer from './model/DomainTransfer';
import ErrorResponse from './model/ErrorResponse';
import ExportAgentChatsCsv200Response from './model/ExportAgentChatsCsv200Response';
import Finances from './model/Finances';
import FirewallGroup from './model/FirewallGroup';
import FirewallGroupInAPI from './model/FirewallGroupInAPI';
import FirewallGroupOutResponse from './model/FirewallGroupOutResponse';
import FirewallGroupResource from './model/FirewallGroupResource';
import FirewallGroupResourceOutResponse from './model/FirewallGroupResourceOutResponse';
import FirewallGroupResourcesOutResponse from './model/FirewallGroupResourcesOutResponse';
import FirewallGroupsOutResponse from './model/FirewallGroupsOutResponse';
import FirewallRule from './model/FirewallRule';
import FirewallRuleDirection from './model/FirewallRuleDirection';
import FirewallRuleInAPI from './model/FirewallRuleInAPI';
import FirewallRuleOutResponse from './model/FirewallRuleOutResponse';
import FirewallRuleProtocol from './model/FirewallRuleProtocol';
import FirewallRulesOutResponse from './model/FirewallRulesOutResponse';
import FloatingIp from './model/FloatingIp';
import ForwardIsDisabled from './model/ForwardIsDisabled';
import ForwardIsEnabled from './model/ForwardIsEnabled';
import ForwardingIncomingIsDisabled from './model/ForwardingIncomingIsDisabled';
import ForwardingIncomingIsEnabled from './model/ForwardingIncomingIsEnabled';
import ForwardingOutgoingIsDisabled from './model/ForwardingOutgoingIsDisabled';
import ForwardingOutgoingIsEnabled from './model/ForwardingOutgoingIsEnabled';
import Frameworks from './model/Frameworks';
import Free from './model/Free';
import GetAccountStatus200Response from './model/GetAccountStatus200Response';
import GetAccountStatus403Response from './model/GetAccountStatus403Response';
import GetAgentBotMaxBots200Response from './model/GetAgentBotMaxBots200Response';
import GetAgentBotMaxBots200ResponseMeta from './model/GetAgentBotMaxBots200ResponseMeta';
import GetAgentBotMaxBotsByAgent200Response from './model/GetAgentBotMaxBotsByAgent200Response';
import GetAgentBotMaxBotsByAgent200ResponseMeta from './model/GetAgentBotMaxBotsByAgent200ResponseMeta';
import GetAgentBotTelegramBots200Response from './model/GetAgentBotTelegramBots200Response';
import GetAgentBotTelegramBots200ResponseMeta from './model/GetAgentBotTelegramBots200ResponseMeta';
import GetAgentBotTelegramBotsByAgent200Response from './model/GetAgentBotTelegramBotsByAgent200Response';
import GetAgentBotTelegramBotsByAgent200ResponseMeta from './model/GetAgentBotTelegramBotsByAgent200ResponseMeta';
import GetAgentChatList200Response from './model/GetAgentChatList200Response';
import GetAgentChatList200ResponseMeta from './model/GetAgentChatList200ResponseMeta';
import GetAgentChatMessages200Response from './model/GetAgentChatMessages200Response';
import GetAgentChatMessages200ResponseMeta from './model/GetAgentChatMessages200ResponseMeta';
import GetAgentEntityLimits200Response from './model/GetAgentEntityLimits200Response';
import GetAgentEntityLimits200ResponseMeta from './model/GetAgentEntityLimits200ResponseMeta';
import GetAgentIntegrationCrisp200Response from './model/GetAgentIntegrationCrisp200Response';
import GetAgentIntegrationJivo200Response from './model/GetAgentIntegrationJivo200Response';
import GetAgentSkill200Response from './model/GetAgentSkill200Response';
import GetAgentSkillCatalog200Response from './model/GetAgentSkillCatalog200Response';
import GetAgentSkillCatalog200ResponseMeta from './model/GetAgentSkillCatalog200ResponseMeta';
import GetAgentSkillLibrary200Response from './model/GetAgentSkillLibrary200Response';
import GetAgentSkillLibrary200ResponseMeta from './model/GetAgentSkillLibrary200ResponseMeta';
import GetAgentSkillVersion200Response from './model/GetAgentSkillVersion200Response';
import GetAgentSkillVersions200Response from './model/GetAgentSkillVersions200Response';
import GetAgentSkillVersions200ResponseMeta from './model/GetAgentSkillVersions200ResponseMeta';
import GetAgentSkillsForAgent200Response from './model/GetAgentSkillsForAgent200Response';
import GetAgentSkillsForAgent200ResponseMeta from './model/GetAgentSkillsForAgent200ResponseMeta';
import GetAgentStatistics200Response from './model/GetAgentStatistics200Response';
import GetAgentStatistics200ResponseMeta from './model/GetAgentStatistics200ResponseMeta';
import GetAgentToolTemplatePrices200Response from './model/GetAgentToolTemplatePrices200Response';
import GetAgentToolTemplates200Response from './model/GetAgentToolTemplates200Response';
import GetAgentToolTemplates200ResponseMeta from './model/GetAgentToolTemplates200ResponseMeta';
import GetAgentTools200Response from './model/GetAgentTools200Response';
import GetAgentTools200ResponseMeta from './model/GetAgentTools200ResponseMeta';
import GetAgentToolsByAgent200Response from './model/GetAgentToolsByAgent200Response';
import GetAgentToolsByAgent200ResponseMeta from './model/GetAgentToolsByAgent200ResponseMeta';
import GetAgentV3200Response from './model/GetAgentV3200Response';
import GetAgents200Response from './model/GetAgents200Response';
import GetAgents200ResponseMeta from './model/GetAgents200ResponseMeta';
import GetAgentsTokenPackages200Response from './model/GetAgentsTokenPackages200Response';
import GetAgentsTokenPackages200ResponseMeta from './model/GetAgentsTokenPackages200ResponseMeta';
import GetAgentsV3200Response from './model/GetAgentsV3200Response';
import GetAiKeyCallsStatistic200Response from './model/GetAiKeyCallsStatistic200Response';
import GetAiKeyLimits200Response from './model/GetAiKeyLimits200Response';
import GetAiKeyLimits200ResponseMeta from './model/GetAiKeyLimits200ResponseMeta';
import GetAiKeyModelsStatistic200Response from './model/GetAiKeyModelsStatistic200Response';
import GetAiKeyModelsStatistic200ResponseMeta from './model/GetAiKeyModelsStatistic200ResponseMeta';
import GetAiKeyTokenUsageStatistic200Response from './model/GetAiKeyTokenUsageStatistic200Response';
import GetAiKeyTokenUsageStatistic200ResponseMeta from './model/GetAiKeyTokenUsageStatistic200ResponseMeta';
import GetAiKeys200Response from './model/GetAiKeys200Response';
import GetAiKeys200ResponseMeta from './model/GetAiKeys200ResponseMeta';
import GetAiModelParameters200Response from './model/GetAiModelParameters200Response';
import GetAiModelParameters200ResponseMeta from './model/GetAiModelParameters200ResponseMeta';
import GetAiModelTokenPackages200Response from './model/GetAiModelTokenPackages200Response';
import GetAiModelTokenPackages200ResponseMeta from './model/GetAiModelTokenPackages200ResponseMeta';
import GetAiProvider200Response from './model/GetAiProvider200Response';
import GetAiProviders200Response from './model/GetAiProviders200Response';
import GetAiProviders200ResponseMeta from './model/GetAiProviders200ResponseMeta';
import GetAiSolutionChatStatus200Response from './model/GetAiSolutionChatStatus200Response';
import GetAiSolutionMainChatHistory200Response from './model/GetAiSolutionMainChatHistory200Response';
import GetAllMailboxesV2200Response from './model/GetAllMailboxesV2200Response';
import GetAllProjectResources200Response from './model/GetAllProjectResources200Response';
import GetAppDeploys200Response from './model/GetAppDeploys200Response';
import GetAppLogs200Response from './model/GetAppLogs200Response';
import GetApps200Response from './model/GetApps200Response';
import GetAuthAccessSettings200Response from './model/GetAuthAccessSettings200Response';
import GetAuthAccessSettings200ResponseWhiteList from './model/GetAuthAccessSettings200ResponseWhiteList';
import GetBalancerIPs200Response from './model/GetBalancerIPs200Response';
import GetBalancerRules200Response from './model/GetBalancerRules200Response';
import GetBalancers200Response from './model/GetBalancers200Response';
import GetBalancersPresets200Response from './model/GetBalancersPresets200Response';
import GetBranches200Response from './model/GetBranches200Response';
import GetCdnCertificateTasks200Response from './model/GetCdnCertificateTasks200Response';
import GetCdnCertificates200Response from './model/GetCdnCertificates200Response';
import GetCdnOriginNodes200Response from './model/GetCdnOriginNodes200Response';
import GetCdnPresets200Response from './model/GetCdnPresets200Response';
import GetCdnResourceConfiguration200Response from './model/GetCdnResourceConfiguration200Response';
import GetCdnResourceNodes200Response from './model/GetCdnResourceNodes200Response';
import GetCdnResourceStatistics200Response from './model/GetCdnResourceStatistics200Response';
import GetCdnResources200Response from './model/GetCdnResources200Response';
import GetCommits200Response from './model/GetCommits200Response';
import GetConfigurators200Response from './model/GetConfigurators200Response';
import GetCountries200Response from './model/GetCountries200Response';
import GetDatabaseAutoBackupsSettings200Response from './model/GetDatabaseAutoBackupsSettings200Response';
import GetDatabaseBackup200Response from './model/GetDatabaseBackup200Response';
import GetDatabaseBackups200Response from './model/GetDatabaseBackups200Response';
import GetDatabaseClusterReplicas200Response from './model/GetDatabaseClusterReplicas200Response';
import GetDatabaseClusterTypes200Response from './model/GetDatabaseClusterTypes200Response';
import GetDatabaseClusters200Response from './model/GetDatabaseClusters200Response';
import GetDatabaseConfigurators200Response from './model/GetDatabaseConfigurators200Response';
import GetDatabaseDefaultParameters200Response from './model/GetDatabaseDefaultParameters200Response';
import GetDatabaseDefaultParameters200ResponseConfigParams from './model/GetDatabaseDefaultParameters200ResponseConfigParams';
import GetDatabaseInstances200Response from './model/GetDatabaseInstances200Response';
import GetDatabasePreset200Response from './model/GetDatabasePreset200Response';
import GetDatabasePrivileges200Response from './model/GetDatabasePrivileges200Response';
import GetDatabaseS3Backups200Response from './model/GetDatabaseS3Backups200Response';
import GetDatabaseUsers200Response from './model/GetDatabaseUsers200Response';
import GetDatabasesPresets200Response from './model/GetDatabasesPresets200Response';
import GetDedicatedServerPresetAdditionalServices200Response from './model/GetDedicatedServerPresetAdditionalServices200Response';
import GetDedicatedServers200Response from './model/GetDedicatedServers200Response';
import GetDedicatedServersPresets200Response from './model/GetDedicatedServersPresets200Response';
import GetDeployLogs200Response from './model/GetDeployLogs200Response';
import GetDeploySettings200Response from './model/GetDeploySettings200Response';
import GetDomain200Response from './model/GetDomain200Response';
import GetDomainDNSRecords200Response from './model/GetDomainDNSRecords200Response';
import GetDomainMailInfo200Response from './model/GetDomainMailInfo200Response';
import GetDomainNameServers200Response from './model/GetDomainNameServers200Response';
import GetDomainRequests200Response from './model/GetDomainRequests200Response';
import GetDomains200Response from './model/GetDomains200Response';
import GetFinances200Response from './model/GetFinances200Response';
import GetFinances400Response from './model/GetFinances400Response';
import GetFinances401Response from './model/GetFinances401Response';
import GetFinances429Response from './model/GetFinances429Response';
import GetFinances500Response from './model/GetFinances500Response';
import GetFloatingIps200Response from './model/GetFloatingIps200Response';
import GetImage404Response from './model/GetImage404Response';
import GetKey200Response from './model/GetKey200Response';
import GetKeys200Response from './model/GetKeys200Response';
import GetKnowledgebaseDocumentsV2200Response from './model/GetKnowledgebaseDocumentsV2200Response';
import GetKnowledgebaseDocumentsV2200ResponseMeta from './model/GetKnowledgebaseDocumentsV2200ResponseMeta';
import GetKnowledgebaseV3200Response from './model/GetKnowledgebaseV3200Response';
import GetKnowledgebases200Response from './model/GetKnowledgebases200Response';
import GetKnowledgebasesTokenPackages200Response from './model/GetKnowledgebasesTokenPackages200Response';
import GetKnowledgebasesTokenPackages200ResponseMeta from './model/GetKnowledgebasesTokenPackages200ResponseMeta';
import GetKnowledgebasesV2200Response from './model/GetKnowledgebasesV2200Response';
import GetKnowledgebasesV3200Response from './model/GetKnowledgebasesV3200Response';
import GetKnowledgebasesV3200ResponseMeta from './model/GetKnowledgebasesV3200ResponseMeta';
import GetLocations200Response from './model/GetLocations200Response';
import GetMailboxes200Response from './model/GetMailboxes200Response';
import GetModels200Response from './model/GetModels200Response';
import GetModelsV3200Response from './model/GetModelsV3200Response';
import GetModelsV3200ResponseMeta from './model/GetModelsV3200ResponseMeta';
import GetNetworkDrives200Response from './model/GetNetworkDrives200Response';
import GetNetworkDrivesAvailableResources200Response from './model/GetNetworkDrivesAvailableResources200Response';
import GetNetworkDrivesPresets200Response from './model/GetNetworkDrivesPresets200Response';
import GetNotificationSettings200Response from './model/GetNotificationSettings200Response';
import GetOsList200Response from './model/GetOsList200Response';
import GetPersons200Response from './model/GetPersons200Response';
import GetProjectBalancers200Response from './model/GetProjectBalancers200Response';
import GetProjectClusters200Response from './model/GetProjectClusters200Response';
import GetProjectDatabases200Response from './model/GetProjectDatabases200Response';
import GetProjectDedicatedServers200Response from './model/GetProjectDedicatedServers200Response';
import GetProjectServers200Response from './model/GetProjectServers200Response';
import GetProjectStorages200Response from './model/GetProjectStorages200Response';
import GetProjects200Response from './model/GetProjects200Response';
import GetProviders200Response from './model/GetProviders200Response';
import GetRepositories200Response from './model/GetRepositories200Response';
import GetRestorePoint200Response from './model/GetRestorePoint200Response';
import GetRestorePoints200Response from './model/GetRestorePoints200Response';
import GetServerDiskBackup200Response from './model/GetServerDiskBackup200Response';
import GetServerDiskBackups200Response from './model/GetServerDiskBackups200Response';
import GetServerDisks200Response from './model/GetServerDisks200Response';
import GetServerIPs200Response from './model/GetServerIPs200Response';
import GetServerLogs200Response from './model/GetServerLogs200Response';
import GetServerStatistics200Response from './model/GetServerStatistics200Response';
import GetServerStatistics200ResponseCpuInner from './model/GetServerStatistics200ResponseCpuInner';
import GetServerStatistics200ResponseDiskInner from './model/GetServerStatistics200ResponseDiskInner';
import GetServerStatistics200ResponseNetworkTrafficInner from './model/GetServerStatistics200ResponseNetworkTrafficInner';
import GetServerStatistics200ResponseRamInner from './model/GetServerStatistics200ResponseRamInner';
import GetServerStatisticsNew200Response from './model/GetServerStatisticsNew200Response';
import GetServers200Response from './model/GetServers200Response';
import GetServersPresets200Response from './model/GetServersPresets200Response';
import GetServicePrices200Response from './model/GetServicePrices200Response';
import GetServicePrices200ResponseMeta from './model/GetServicePrices200ResponseMeta';
import GetSoftware200Response from './model/GetSoftware200Response';
import GetStorageSubdomains200Response from './model/GetStorageSubdomains200Response';
import GetStorageTransferStatus200Response from './model/GetStorageTransferStatus200Response';
import GetStorageUsers200Response from './model/GetStorageUsers200Response';
import GetStoragesPresets200Response from './model/GetStoragesPresets200Response';
import GetTLD200Response from './model/GetTLD200Response';
import GetTLDs200Response from './model/GetTLDs200Response';
import GetVPCPorts200Response from './model/GetVPCPorts200Response';
import GetVPCServices200Response from './model/GetVPCServices200Response';
import GetVPCs200Response from './model/GetVPCs200Response';
import HttpResource from './model/HttpResource';
import HttpResourceConfig from './model/HttpResourceConfig';
import Image from './model/Image';
import ImageDownload from './model/ImageDownload';
import ImageDownloadResponse from './model/ImageDownloadResponse';
import ImageDownloadsResponse from './model/ImageDownloadsResponse';
import ImageInAPI from './model/ImageInAPI';
import ImageOutResponse from './model/ImageOutResponse';
import ImageStatus from './model/ImageStatus';
import ImageUpdateAPI from './model/ImageUpdateAPI';
import ImageUrlAuth from './model/ImageUrlAuth';
import ImageUrlIn from './model/ImageUrlIn';
import ImagesOutResponse from './model/ImagesOutResponse';
import IncreaseNodes from './model/IncreaseNodes';
import IndexingSchedule from './model/IndexingSchedule';
import InfoServicePrice from './model/InfoServicePrice';
import InitializeParams from './model/InitializeParams';
import InitializeParamsClientInfo from './model/InitializeParamsClientInfo';
import InitializeResult from './model/InitializeResult';
import InitializeResultServerInfo from './model/InitializeResultServerInfo';
import InstallAgentSkillFromCatalog200Response from './model/InstallAgentSkillFromCatalog200Response';
import InstallAgentSkillFromCatalog200ResponseMeta from './model/InstallAgentSkillFromCatalog200ResponseMeta';
import InstallAndConnectAgentSkill200Response from './model/InstallAndConnectAgentSkill200Response';
import InstallAndConnectSkill from './model/InstallAndConnectSkill';
import InstallTool from './model/InstallTool';
import Invoice from './model/Invoice';
import Ip from './model/Ip';
import IssueCertificate from './model/IssueCertificate';
import JivoIntegration from './model/JivoIntegration';
import JsonRpcError from './model/JsonRpcError';
import JsonRpcErrorResponse from './model/JsonRpcErrorResponse';
import JsonRpcNotification from './model/JsonRpcNotification';
import JsonRpcRequest from './model/JsonRpcRequest';
import JsonRpcResultResponse from './model/JsonRpcResultResponse';
import K8SVersionsResponse from './model/K8SVersionsResponse';
import Kafka from './model/Kafka';
import KafkaConfigParameters from './model/KafkaConfigParameters';
import Knowledgebase from './model/Knowledgebase';
import KnowledgebaseAddTokenPackage from './model/KnowledgebaseAddTokenPackage';
import KnowledgebaseV2 from './model/KnowledgebaseV2';
import KnowledgebaseV3 from './model/KnowledgebaseV3';
import LinkKnowledgebase from './model/LinkKnowledgebase';
import ListAiSolutionConversations200Response from './model/ListAiSolutionConversations200Response';
import ListAiSolutionTelegramBots200Response from './model/ListAiSolutionTelegramBots200Response';
import ListAiSolutionTypes200Response from './model/ListAiSolutionTypes200Response';
import ListAiSolutions200Response from './model/ListAiSolutions200Response';
import Location from './model/Location';
import LocationDto from './model/LocationDto';
import Mailbox from './model/Mailbox';
import MailboxAutoReply from './model/MailboxAutoReply';
import MailboxForwardingIncoming from './model/MailboxForwardingIncoming';
import MailboxForwardingOutgoing from './model/MailboxForwardingOutgoing';
import MailboxResponse from './model/MailboxResponse';
import MailboxSpamFilter from './model/MailboxSpamFilter';
import MailboxV2 from './model/MailboxV2';
import MailboxesBatchV2 from './model/MailboxesBatchV2';
import MasterPresetOutApi from './model/MasterPresetOutApi';
import Meta from './model/Meta';
import Meta1 from './model/Meta1';
import Model from './model/Model';
import ModelBatch from './model/ModelBatch';
import ModelParamInfo from './model/ModelParamInfo';
import ModelParameter from './model/ModelParameter';
import ModelPriceTier from './model/ModelPriceTier';
import ModelV3 from './model/ModelV3';
import Mongodb from './model/Mongodb';
import MountNetworkDrive from './model/MountNetworkDrive';
import Mysql from './model/Mysql';
import NatIn from './model/NatIn';
import Network from './model/Network';
import NetworkDrive from './model/NetworkDrive';
import NetworkDriveAvailableResource from './model/NetworkDriveAvailableResource';
import NetworkDrivePreset from './model/NetworkDrivePreset';
import NetworkDrivePresetRead from './model/NetworkDrivePresetRead';
import NetworkDrivePresetWrite from './model/NetworkDrivePresetWrite';
import NetworkDriveServiceListInner from './model/NetworkDriveServiceListInner';
import NetworkDriversResponse from './model/NetworkDriversResponse';
import NetworkEdit from './model/NetworkEdit';
import NetworkIn from './model/NetworkIn';
import NetworkOut from './model/NetworkOut';
import NetworkResponse from './model/NetworkResponse';
import NetworksResponse from './model/NetworksResponse';
import NodeGroupIn from './model/NodeGroupIn';
import NodeGroupInConfiguration from './model/NodeGroupInConfiguration';
import NodeGroupOut from './model/NodeGroupOut';
import NodeGroupResponse from './model/NodeGroupResponse';
import NodeGroupsResponse from './model/NodeGroupsResponse';
import NodeOut from './model/NodeOut';
import NodesResponse from './model/NodesResponse';
import NotificationSetting from './model/NotificationSetting';
import NotificationSettingChannel from './model/NotificationSettingChannel';
import NotificationSettingChannels from './model/NotificationSettingChannels';
import NotificationSettingType from './model/NotificationSettingType';
import OS from './model/OS';
import Opensearch from './model/Opensearch';
import Org from './model/Org';
import OriginNode from './model/OriginNode';
import OriginServer from './model/OriginServer';
import OutgoingIsDisabled from './model/OutgoingIsDisabled';
import OutgoingIsEnabled from './model/OutgoingIsEnabled';
import PerformActionOnBackupRequest from './model/PerformActionOnBackupRequest';
import PerformActionOnServerRequest from './model/PerformActionOnServerRequest';
import Person from './model/Person';
import Person2 from './model/Person2';
import Policy from './model/Policy';
import Postgres from './model/Postgres';
import Postgresql from './model/Postgresql';
import PreloadCache from './model/PreloadCache';
import Preset from './model/Preset';
import PresetsBalancer from './model/PresetsBalancer';
import PresetsDbs from './model/PresetsDbs';
import PresetsResponse from './model/PresetsResponse';
import PresetsStorage from './model/PresetsStorage';
import Project from './model/Project';
import ProjectResource from './model/ProjectResource';
import PropertiesMysql from './model/PropertiesMysql';
import PropertiesValkey from './model/PropertiesValkey';
import Provider from './model/Provider';
import Providers from './model/Providers';
import Rabbitmq from './model/Rabbitmq';
import ReduceNodes from './model/ReduceNodes';
import RegenerateAiSolutionAiKey200Response from './model/RegenerateAiSolutionAiKey200Response';
import RegistriesResponse from './model/RegistriesResponse';
import RegistryEdit from './model/RegistryEdit';
import RegistryIn from './model/RegistryIn';
import RegistryInConfiguration from './model/RegistryInConfiguration';
import RegistryOut from './model/RegistryOut';
import RegistryOutDiskStats from './model/RegistryOutDiskStats';
import RegistryResponse from './model/RegistryResponse';
import RemoveCountries from './model/RemoveCountries';
import RemoveIps from './model/RemoveIps';
import Replica from './model/Replica';
import ReplicaDisk from './model/ReplicaDisk';
import RepositoriesResponse from './model/RepositoriesResponse';
import Repository from './model/Repository';
import ResetAiSolutionChat from './model/ResetAiSolutionChat';
import ResetAiSolutionChat200Response from './model/ResetAiSolutionChat200Response';
import Resource from './model/Resource';
import ResourceTransfer from './model/ResourceTransfer';
import ResourceType from './model/ResourceType';
import Resources from './model/Resources';
import ResourcesListResult from './model/ResourcesListResult';
import ResourcesReadParams from './model/ResourcesReadParams';
import ResourcesReadResult from './model/ResourcesReadResult';
import ResourcesReadResultContentsInner from './model/ResourcesReadResultContentsInner';
import ResourcesResponse from './model/ResourcesResponse';
import RestorePoint from './model/RestorePoint';
import RetrievalMode from './model/RetrievalMode';
import RetrievalModeRef from './model/RetrievalModeRef';
import RouterEdit from './model/RouterEdit';
import RouterIn from './model/RouterIn';
import RouterInIpsInner from './model/RouterInIpsInner';
import RouterInIpsInnerNat from './model/RouterInIpsInnerNat';
import RouterInNetworksInner from './model/RouterInNetworksInner';
import RouterInParentService from './model/RouterInParentService';
import RouterNetworkMeta from './model/RouterNetworkMeta';
import RouterNetworkMetaDhcp from './model/RouterNetworkMetaDhcp';
import RouterOut from './model/RouterOut';
import RouterOutIpsInner from './model/RouterOutIpsInner';
import RouterOutIpsInnerNat from './model/RouterOutIpsInnerNat';
import RouterOutNodesInner from './model/RouterOutNodesInner';
import RouterOutParentServicesInner from './model/RouterOutParentServicesInner';
import RouterPreset from './model/RouterPreset';
import RouterPresetsResponse from './model/RouterPresetsResponse';
import RouterResponse from './model/RouterResponse';
import RouterStatistic from './model/RouterStatistic';
import RouterStatisticListInner from './model/RouterStatisticListInner';
import RouterStatisticMeta from './model/RouterStatisticMeta';
import RouterStatisticsResponse from './model/RouterStatisticsResponse';
import RoutersResponse from './model/RoutersResponse';
import Rule from './model/Rule';
import S3Backup from './model/S3Backup';
import S3Subdomain from './model/S3Subdomain';
import SchemasBaseError from './model/SchemasBaseError';
import SchemasMeta from './model/SchemasMeta';
import SchemasPresetsResponse from './model/SchemasPresetsResponse';
import SendAiSolutionMessage from './model/SendAiSolutionMessage';
import SendAiSolutionMessage200Response from './model/SendAiSolutionMessage200Response';
import ServerBackup from './model/ServerBackup';
import ServerBackupDownloadUrl from './model/ServerBackupDownloadUrl';
import ServerBackupDownloadUrlRequest from './model/ServerBackupDownloadUrlRequest';
import ServerDisk from './model/ServerDisk';
import ServerIp from './model/ServerIp';
import ServerLog from './model/ServerLog';
import ServersConfigurator from './model/ServersConfigurator';
import ServersConfiguratorRequirements from './model/ServersConfiguratorRequirements';
import ServersOs from './model/ServersOs';
import ServersOsRequirements from './model/ServersOsRequirements';
import ServersPreset from './model/ServersPreset';
import ServersSoftware from './model/ServersSoftware';
import ServersSoftwareRequirements from './model/ServersSoftwareRequirements';
import ServersStatistics from './model/ServersStatistics';
import ServersStatisticsListInner from './model/ServersStatisticsListInner';
import ServersStatisticsMeta from './model/ServersStatisticsMeta';
import ServiceCostType from './model/ServiceCostType';
import ServicePrice from './model/ServicePrice';
import ServicePriceConfiguration from './model/ServicePriceConfiguration';
import ServicePriceType from './model/ServicePriceType';
import ServiceServicePrice from './model/ServiceServicePrice';
import ServiceServicePriceNodeGroupsInner from './model/ServiceServicePriceNodeGroupsInner';
import SetAgentSkill from './model/SetAgentSkill';
import SetAgentSkillForAgent200Response from './model/SetAgentSkillForAgent200Response';
import SetLabels from './model/SetLabels';
import SettingCondition from './model/SettingCondition';
import Skill from './model/Skill';
import SkillAgent from './model/SkillAgent';
import SkillCatalogItem from './model/SkillCatalogItem';
import SkillSaveMeta from './model/SkillSaveMeta';
import SkillScript from './model/SkillScript';
import SkillScriptInput from './model/SkillScriptInput';
import SkillVersion from './model/SkillVersion';
import SpamFilterIsDisabled from './model/SpamFilterIsDisabled';
import SpamFilterIsEnabled from './model/SpamFilterIsEnabled';
import SpamProtectionIsDisabled from './model/SpamProtectionIsDisabled';
import SpamProtectionIsEnabled from './model/SpamProtectionIsEnabled';
import SshKey from './model/SshKey';
import SshKeyUsedByInner from './model/SshKeyUsedByInner';
import StaticRouteIn from './model/StaticRouteIn';
import StaticRouteOut from './model/StaticRouteOut';
import StaticRouteResponse from './model/StaticRouteResponse';
import StaticRoutesResponse from './model/StaticRoutesResponse';
import Statistics from './model/Statistics';
import StatisticsRequestsInner from './model/StatisticsRequestsInner';
import StatisticsTrafficInner from './model/StatisticsTrafficInner';
import Status from './model/Status';
import StatusCompanyInfo from './model/StatusCompanyInfo';
import StopAiSolutionChat from './model/StopAiSolutionChat';
import StreamError from './model/StreamError';
import Subdomain from './model/Subdomain';
import SyncAgentEntityLimits from './model/SyncAgentEntityLimits';
import SyncAgentEntityLimitsLimitsInner from './model/SyncAgentEntityLimitsLimitsInner';
import SyncAgentSkillAgentsVersions200Response from './model/SyncAgentSkillAgentsVersions200Response';
import SyncAgentSkillAgentsVersions200ResponseMeta from './model/SyncAgentSkillAgentsVersions200ResponseMeta';
import SyncAgentSkillVersionsForAgent200Response from './model/SyncAgentSkillVersionsForAgent200Response';
import SyncAiKeyLimits from './model/SyncAiKeyLimits';
import SyncAiKeyLimitsLimitsInner from './model/SyncAiKeyLimitsLimitsInner';
import Tags from './model/Tags';
import TextContent from './model/TextContent';
import TokenPackage from './model/TokenPackage';
import Tool from './model/Tool';
import Tool2 from './model/Tool2';
import Tool2Annotations from './model/Tool2Annotations';
import ToolAuthData from './model/ToolAuthData';
import ToolAuthDataParams from './model/ToolAuthDataParams';
import ToolConfigField from './model/ToolConfigField';
import ToolMethod from './model/ToolMethod';
import ToolPrice from './model/ToolPrice';
import ToolTemplate from './model/ToolTemplate';
import ToolTemplateConfigSchema from './model/ToolTemplateConfigSchema';
import ToolsCallParams from './model/ToolsCallParams';
import ToolsCallResult from './model/ToolsCallResult';
import ToolsListResult from './model/ToolsListResult';
import TopLevelDomain from './model/TopLevelDomain';
import TopLevelDomainAllowedBuyPeriodsInner from './model/TopLevelDomainAllowedBuyPeriodsInner';
import TrafficUsage from './model/TrafficUsage';
import TransferStatus from './model/TransferStatus';
import TransferStatusErrorsInner from './model/TransferStatusErrorsInner';
import TransferStorageRequest from './model/TransferStorageRequest';
import URLType from './model/URLType';
import UpdateAdmin from './model/UpdateAdmin';
import UpdateAgent from './model/UpdateAgent';
import UpdateAgentEntityLimit from './model/UpdateAgentEntityLimit';
import UpdateAgentTool from './model/UpdateAgentTool';
import UpdateAiKey from './model/UpdateAiKey';
import UpdateAiKey200Response from './model/UpdateAiKey200Response';
import UpdateAiKeyLimit from './model/UpdateAiKeyLimit';
import UpdateAiSolution from './model/UpdateAiSolution';
import UpdateAppSettings200Response from './model/UpdateAppSettings200Response';
import UpdateAuthRestrictionsByCountriesRequest from './model/UpdateAuthRestrictionsByCountriesRequest';
import UpdateAutoBackup from './model/UpdateAutoBackup';
import UpdateBalancer from './model/UpdateBalancer';
import UpdateBot from './model/UpdateBot';
import UpdateCluster from './model/UpdateCluster';
import UpdateClusterConfiguration from './model/UpdateClusterConfiguration';
import UpdateClusterV2 from './model/UpdateClusterV2';
import UpdateClusterV2DiskAutoscaling from './model/UpdateClusterV2DiskAutoscaling';
import UpdateClusterV2MaintenanceSlot from './model/UpdateClusterV2MaintenanceSlot';
import UpdateDatabaseCluster200Response from './model/UpdateDatabaseCluster200Response';
import UpdateDatabaseInstance409Response from './model/UpdateDatabaseInstance409Response';
import UpdateDedicatedServerRequest from './model/UpdateDedicatedServerRequest';
import UpdateDocument from './model/UpdateDocument';
import UpdateDomain from './model/UpdateDomain';
import UpdateDomainAutoProlongation200Response from './model/UpdateDomainAutoProlongation200Response';
import UpdateDomainMailInfoRequest from './model/UpdateDomainMailInfoRequest';
import UpdateDomainNameServers from './model/UpdateDomainNameServers';
import UpdateDomainNameServersNameServersInner from './model/UpdateDomainNameServersNameServersInner';
import UpdateFloatingIp from './model/UpdateFloatingIp';
import UpdateHttpResource from './model/UpdateHttpResource';
import UpdateInstance from './model/UpdateInstance';
import UpdateKafkaConfigParameters from './model/UpdateKafkaConfigParameters';
import UpdateKeyRequest from './model/UpdateKeyRequest';
import UpdateKnowledgebase from './model/UpdateKnowledgebase';
import UpdateMailbox from './model/UpdateMailbox';
import UpdateMailboxV2 from './model/UpdateMailboxV2';
import UpdateMailboxV2200Response from './model/UpdateMailboxV2200Response';
import UpdateMaxBot from './model/UpdateMaxBot';
import UpdateNetworkDrive from './model/UpdateNetworkDrive';
import UpdateNotificationSettingsRequest from './model/UpdateNotificationSettingsRequest';
import UpdateNotificationSettingsRequestSettingsInner from './model/UpdateNotificationSettingsRequestSettingsInner';
import UpdateNotificationSettingsRequestSettingsInnerChannels from './model/UpdateNotificationSettingsRequestSettingsInnerChannels';
import UpdatePerson from './model/UpdatePerson';
import UpdateProject from './model/UpdateProject';
import UpdateRule from './model/UpdateRule';
import UpdateS3Backup from './model/UpdateS3Backup';
import UpdateServer from './model/UpdateServer';
import UpdateServerConfigurator from './model/UpdateServerConfigurator';
import UpdateServerDiskBackupRequest from './model/UpdateServerDiskBackupRequest';
import UpdateServerDiskRequest from './model/UpdateServerDiskRequest';
import UpdateServerIPRequest from './model/UpdateServerIPRequest';
import UpdateServerNATRequest from './model/UpdateServerNATRequest';
import UpdateServerOSBootModeRequest from './model/UpdateServerOSBootModeRequest';
import UpdateSettings from './model/UpdateSettings';
import UpdateSkill from './model/UpdateSkill';
import UpdateStorageRequest from './model/UpdateStorageRequest';
import UpdateStorageRequestConfigurator from './model/UpdateStorageRequestConfigurator';
import UpdateStorageUser200Response from './model/UpdateStorageUser200Response';
import UpdateStorageUserRequest from './model/UpdateStorageUserRequest';
import UpdateTool from './model/UpdateTool';
import UpdateVpc from './model/UpdateVpc';
import UploadResult from './model/UploadResult';
import UploadSuccessful from './model/UploadSuccessful';
import UploadSuccessfulResponse from './model/UploadSuccessfulResponse';
import UrlStatus from './model/UrlStatus';
import Use from './model/Use';
import UserNode from './model/UserNode';
import Valkey from './model/Valkey';
import Vds from './model/Vds';
import VdsDisksInner from './model/VdsDisksInner';
import VdsImage from './model/VdsImage';
import VdsNetworksInner from './model/VdsNetworksInner';
import VdsNetworksInnerIpsInner from './model/VdsNetworksInnerIpsInner';
import VdsOs from './model/VdsOs';
import VdsSoftware from './model/VdsSoftware';
import Vpc from './model/Vpc';
import VpcPort from './model/VpcPort';
import VpcPortService from './model/VpcPortService';
import VpcService from './model/VpcService';
import WorkerPresetOutApi from './model/WorkerPresetOutApi';
import AIAgentIntegrationsApi from './api/AIAgentIntegrationsApi';
import AIAgentSkillsApi from './api/AIAgentSkillsApi';
import AIAgentsApi from './api/AIAgentsApi';
import AIGatewayApi from './api/AIGatewayApi';
import AIGatewayInferenceApi from './api/AIGatewayInferenceApi';
import AIModelsApi from './api/AIModelsApi';
import AISolutionsApi from './api/AISolutionsApi';
import AccountApi from './api/AccountApi';
import AppsApi from './api/AppsApi';
import BalancersApi from './api/BalancersApi';
import CDNApi from './api/CDNApi';
import ContainerRegistryApi from './api/ContainerRegistryApi';
import DatabasesApi from './api/DatabasesApi';
import DedicatedServersApi from './api/DedicatedServersApi';
import DomainsApi from './api/DomainsApi';
import FirewallApi from './api/FirewallApi';
import FloatingIPApi from './api/FloatingIPApi';
import ImagesApi from './api/ImagesApi';
import KnowledgeBasesApi from './api/KnowledgeBasesApi';
import KubernetesApi from './api/KubernetesApi';
import LocationsApi from './api/LocationsApi';
import MCPApi from './api/MCPApi';
import MailApi from './api/MailApi';
import NetworkDrivesApi from './api/NetworkDrivesApi';
import PaymentsApi from './api/PaymentsApi';
import ProjectsApi from './api/ProjectsApi';
import RoutersApi from './api/RoutersApi';
import S3Api from './api/S3Api';
import SSHApi from './api/SSHApi';
import ServersApi from './api/ServersApi';
import VPCApi from './api/VPCApi';


/**
* # Введение API Timeweb Cloud позволяет вам управлять ресурсами в облаке программным способом с использованием обычных HTTP-запросов.  Множество функций, которые доступны в панели управления Timeweb Cloud, также доступны через API, что позволяет вам автоматизировать ваши собственные сценарии.  В этой документации сперва будет описан общий дизайн и принципы работы API, а после этого конкретные конечные точки. Также будут приведены примеры запросов к ним.   ## Запросы Запросы должны выполняться по протоколу &#x60;HTTPS&#x60;, чтобы гарантировать шифрование транзакций. Поддерживаются следующие методы запроса: |Метод|Применение| |--- |--- | |GET|Извлекает данные о коллекциях и отдельных ресурсах.| |POST|Для коллекций создает новый ресурс этого типа. Также используется для выполнения действий с конкретным ресурсом.| |PUT|Обновляет существующий ресурс.| |PATCH|Некоторые ресурсы поддерживают частичное обновление, то есть обновление только части атрибутов ресурса, в этом случае вместо метода PUT будет использован PATCH.| |DELETE|Удаляет ресурс.|  Методы &#x60;POST&#x60;, &#x60;PUT&#x60; и &#x60;PATCH&#x60; могут включать объект в тело запроса с типом содержимого &#x60;application/json&#x60;.  ### Параметры в запросах Некоторые коллекции поддерживают пагинацию, поиск или сортировку в запросах. В параметрах запроса требуется передать: - &#x60;limit&#x60; — обозначает количество записей, которое необходимо вернуть  - &#x60;offset&#x60; — указывает на смещение, относительно начала списка  - &#x60;search&#x60; — позволяет указать набор символов для поиска  - &#x60;sort&#x60; — можно задать правило сортировки коллекции  ## Ответы Запросы вернут один из следующих кодов состояния ответа HTTP:  |Статус|Описание| |--- |--- | |200 OK|Действие с ресурсом было выполнено успешно.| |201 Created|Ресурс был успешно создан. При этом ресурс может быть как уже готовым к использованию, так и находиться в процессе запуска.| |204 No Content|Действие с ресурсом было выполнено успешно, и ответ не содержит дополнительной информации в теле.| |400 Bad Request|Был отправлен неверный запрос, например, в нем отсутствуют обязательные параметры и т. д. Тело ответа будет содержать дополнительную информацию об ошибке.| |401 Unauthorized|Ошибка аутентификации.| |403 Forbidden|Аутентификация прошла успешно, но недостаточно прав для выполнения действия.| |404 Not Found|Запрашиваемый ресурс не найден.| |409 Conflict|Запрос конфликтует с текущим состоянием.| |423 Locked|Ресурс из запроса заблокирован от применения к нему указанного метода.| |429 Too Many Requests|Был достигнут лимит по количеству запросов в единицу времени.| |500 Internal Server Error|При выполнении запроса произошла какая-то внутренняя ошибка. Чтобы решить эту проблему, лучше всего создать тикет в панели управления.|  ### Структура успешного ответа Все конечные точки будут возвращать данные в формате &#x60;JSON&#x60;. Ответы на &#x60;GET&#x60;-запросы будут иметь на верхнем уровне следующую структуру атрибутов:  |Название поля|Тип|Описание| |--- |--- |--- | |[entity_name]|object, object[], string[], number[], boolean|Динамическое поле, которое будет меняться в зависимости от запрашиваемого ресурса и будет содержать все атрибуты, необходимые для описания этого ресурса. Например, при запросе списка баз данных будет возвращаться поле &#x60;dbs&#x60;, а при запросе конкретного облачного сервера &#x60;server&#x60;. Для некоторых конечных точек в ответе может возвращаться сразу несколько ресурсов.| |meta|object|Опционально. Объект, который содержит вспомогательную информацию о ресурсе. Чаще всего будет встречаться при запросе коллекций и содержать поле &#x60;total&#x60;, которое будет указывать на количество элементов в коллекции.| |response_id|string|Опционально. В большинстве случаев в ответе будет содержаться ID ответа в формате UUIDv4, который однозначно указывает на ваш запрос внутри нашей системы. Если вам потребуется задать вопрос нашей поддержке, приложите к вопросу этот ID— так мы сможем найти ответ на него намного быстрее. Также вы можете использовать этот ID, чтобы убедиться, что это новый ответ на запрос и результат не был получен из кэша.|  Пример запроса на получение списка SSH-ключей: &#x60;&#x60;&#x60;     HTTP/2.0 200 OK     {       \&quot;ssh_keys\&quot;:[           {             \&quot;body\&quot;:\&quot;ssh-rsa AAAAB3NzaC1sdfghjkOAsBwWhs&#x3D; example@device.local\&quot;,             \&quot;created_at\&quot;:\&quot;2021-09-15T19:52:27Z\&quot;,             \&quot;expired_at\&quot;:null,             \&quot;id\&quot;:5297,             \&quot;is_default\&quot;:false,             \&quot;name\&quot;:\&quot;example@device.local\&quot;,             \&quot;used_at\&quot;:null,             \&quot;used_by\&quot;:[]           }       ],       \&quot;meta\&quot;:{           \&quot;total\&quot;:1       },       \&quot;response_id\&quot;:\&quot;94608d15-8672-4eed-8ab6-28bd6fa3cdf7\&quot;     } &#x60;&#x60;&#x60;  ### Структура ответа с ошибкой |Название поля|Тип|Описание| |--- |--- |--- | |status_code|number|Короткий числовой идентификатор ошибки.| |error_code|string|Короткий текстовый идентификатор ошибки, который уточняет числовой идентификатор и удобен для программной обработки. Самый простой пример — это код &#x60;not_found&#x60; для ошибки 404.| |message|string, string[]|Опционально. В большинстве случаев в ответе будет содержаться человекочитаемое подробное описание ошибки или ошибок, которые помогут понять, что нужно исправить.| |response_id|string|Опционально. В большинстве случае в ответе будет содержаться ID ответа в формате UUIDv4, который однозначно указывает на ваш запрос внутри нашей системы. Если вам потребуется задать вопрос нашей поддержке, приложите к вопросу этот ID — так мы сможем найти ответ на него намного быстрее.|  Пример: &#x60;&#x60;&#x60;     HTTP/2.0 403 Forbidden     {       \&quot;status_code\&quot;: 403,       \&quot;error_code\&quot;:  \&quot;forbidden\&quot;,       \&quot;message\&quot;:     \&quot;You do not have access for the attempted action\&quot;,       \&quot;response_id\&quot;: \&quot;94608d15-8672-4eed-8ab6-28bd6fa3cdf7\&quot;     } &#x60;&#x60;&#x60;  ## Статусы ресурсов Важно учесть, что при создании большинства ресурсов внутри платформы вам будет сразу возвращен ответ от сервера со статусом &#x60;200 OK&#x60; или &#x60;201 Created&#x60; и ID созданного ресурса в теле ответа, но при этом этот ресурс может быть ещё в *состоянии запуска*.  Для того чтобы понять, в каком состоянии сейчас находится ваш ресурс, мы добавили поле &#x60;status&#x60; в ответ на получение информации о ресурсе.  Список статусов будет отличаться в зависимости от типа ресурса. Увидеть поддерживаемый список статусов вы сможете в описании каждого конкретного ресурса.     ## Ограничение скорости запросов (Rate Limiting) Чтобы обеспечить стабильность для всех пользователей, Timeweb Cloud защищает API от всплесков входящего трафика, анализируя количество запросов c каждого аккаунта к каждой конечной точке.  Если ваше приложение отправляет более 20 запросов в секунду на одну конечную точку, то для этого запроса API может вернуть код состояния HTTP &#x60;429 Too Many Requests&#x60;.   ## Аутентификация Доступ к API осуществляется с помощью JWT-токена. Токенами можно управлять внутри панели управления Timeweb Cloud в разделе *API и Terraform*.  Токен необходимо передавать в заголовке каждого запроса в формате: &#x60;&#x60;&#x60;   Authorization: Bearer $TIMEWEB_CLOUD_TOKEN &#x60;&#x60;&#x60;  ## Формат примеров API Примеры в этой документации описаны с помощью &#x60;curl&#x60;, HTTP-клиента командной строки. На компьютерах &#x60;Linux&#x60; и &#x60;macOS&#x60; обычно по умолчанию установлен &#x60;curl&#x60;, и он доступен для загрузки на всех популярных платформах, включая &#x60;Windows&#x60;.  Каждый пример разделен на несколько строк символом &#x60;\\&#x60;, который совместим с &#x60;bash&#x60;. Типичный пример выглядит так: &#x60;&#x60;&#x60;   curl -X PATCH      -H \&quot;Content-Type: application/json\&quot;      -H \&quot;Authorization: Bearer $TIMEWEB_CLOUD_TOKEN\&quot;      -d &#39;{\&quot;name\&quot;:\&quot;Cute Corvus\&quot;,\&quot;comment\&quot;:\&quot;Development Server\&quot;}&#39;      \&quot;https://api.timeweb.cloud/api/v1/dedicated/1051\&quot; &#x60;&#x60;&#x60; - Параметр &#x60;-X&#x60; задает метод запроса. Для согласованности метод будет указан во всех примерах, даже если он явно не требуется для методов &#x60;GET&#x60;. - Строки &#x60;-H&#x60; задают требуемые HTTP-заголовки. - Примеры, для которых требуется объект JSON в теле запроса, передают требуемые данные через параметр &#x60;-d&#x60;.  Чтобы использовать приведенные примеры, не подставляя каждый раз в них свой токен, вы можете добавить токен один раз в переменные окружения в вашей консоли. Например, на &#x60;Linux&#x60; это можно сделать с помощью команды:  &#x60;&#x60;&#x60; TIMEWEB_CLOUD_TOKEN&#x3D;\&quot;token\&quot; &#x60;&#x60;&#x60;  После этого токен будет автоматически подставляться в ваши запросы.  Обратите внимание, что все значения в этой документации являются примерами. Не полагайтесь на IDы операционных систем, тарифов и т.д., используемые в примерах. Используйте соответствующую конечную точку для получения значений перед созданием ресурсов.   ## Версионирование API построено согласно принципам [семантического версионирования](https://semver.org/lang/ru). Это значит, что мы гарантируем обратную совместимость всех изменений в пределах одной мажорной версии.  Мажорная версия каждой конечной точки обозначается в пути запроса, например, запрос &#x60;/api/v1/servers&#x60; указывает, что этот метод имеет версию 1..<br>
* The <code>index</code> module provides access to constructors for all the classes which comprise the public API.
* <p>
* An AMD (recommended!) or CommonJS application will generally do something equivalent to the following:
* <pre>
* var TimewebCloudApi = require('index'); // See note below*.
* var xxxSvc = new TimewebCloudApi.XxxApi(); // Allocate the API class we're going to use.
* var yyyModel = new TimewebCloudApi.Yyy(); // Construct a model instance.
* yyyModel.someProperty = 'someValue';
* ...
* var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
* ...
* </pre>
* <em>*NOTE: For a top-level AMD script, use require(['index'], function(){...})
* and put the application logic within the callback function.</em>
* </p>
* <p>
* A non-AMD browser application (discouraged) might do something like this:
* <pre>
* var xxxSvc = new TimewebCloudApi.XxxApi(); // Allocate the API class we're going to use.
* var yyy = new TimewebCloudApi.Yyy(); // Construct a model instance.
* yyyModel.someProperty = 'someValue';
* ...
* var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
* ...
* </pre>
* </p>
* @module index
* @version 1.0.0
*/
export {
    /**
     * The ApiClient constructor.
     * @property {module:ApiClient}
     */
    ApiClient,

    /**
     * The AddAiSolutionTelegramBot201Response model constructor.
     * @property {module:model/AddAiSolutionTelegramBot201Response}
     */
    AddAiSolutionTelegramBot201Response,

    /**
     * The AddBalancerToProject200Response model constructor.
     * @property {module:model/AddBalancerToProject200Response}
     */
    AddBalancerToProject200Response,

    /**
     * The AddBalancerToProjectRequest model constructor.
     * @property {module:model/AddBalancerToProjectRequest}
     */
    AddBalancerToProjectRequest,

    /**
     * The AddBitbucket model constructor.
     * @property {module:model/AddBitbucket}
     */
    AddBitbucket,

    /**
     * The AddCdnCertificate422Response model constructor.
     * @property {module:model/AddCdnCertificate422Response}
     */
    AddCdnCertificate422Response,

    /**
     * The AddCertificate model constructor.
     * @property {module:model/AddCertificate}
     */
    AddCertificate,

    /**
     * The AddClusterToProjectRequest model constructor.
     * @property {module:model/AddClusterToProjectRequest}
     */
    AddClusterToProjectRequest,

    /**
     * The AddCountries model constructor.
     * @property {module:model/AddCountries}
     */
    AddCountries,

    /**
     * The AddCountriesToAllowedList201Response model constructor.
     * @property {module:model/AddCountriesToAllowedList201Response}
     */
    AddCountriesToAllowedList201Response,

    /**
     * The AddCountriesToAllowedListRequest model constructor.
     * @property {module:model/AddCountriesToAllowedListRequest}
     */
    AddCountriesToAllowedListRequest,

    /**
     * The AddDatabaseToProjectRequest model constructor.
     * @property {module:model/AddDatabaseToProjectRequest}
     */
    AddDatabaseToProjectRequest,

    /**
     * The AddDedicatedServerToProjectRequest model constructor.
     * @property {module:model/AddDedicatedServerToProjectRequest}
     */
    AddDedicatedServerToProjectRequest,

    /**
     * The AddGit model constructor.
     * @property {module:model/AddGit}
     */
    AddGit,

    /**
     * The AddGithub model constructor.
     * @property {module:model/AddGithub}
     */
    AddGithub,

    /**
     * The AddGitlab model constructor.
     * @property {module:model/AddGitlab}
     */
    AddGitlab,

    /**
     * The AddIPsToAllowedList201Response model constructor.
     * @property {module:model/AddIPsToAllowedList201Response}
     */
    AddIPsToAllowedList201Response,

    /**
     * The AddIPsToAllowedListRequest model constructor.
     * @property {module:model/AddIPsToAllowedListRequest}
     */
    AddIPsToAllowedListRequest,

    /**
     * The AddIPsToBalancerRequest model constructor.
     * @property {module:model/AddIPsToBalancerRequest}
     */
    AddIPsToBalancerRequest,

    /**
     * The AddIps model constructor.
     * @property {module:model/AddIps}
     */
    AddIps,

    /**
     * The AddKeyToServerRequest model constructor.
     * @property {module:model/AddKeyToServerRequest}
     */
    AddKeyToServerRequest,

    /**
     * The AddProvider201Response model constructor.
     * @property {module:model/AddProvider201Response}
     */
    AddProvider201Response,

    /**
     * The AddServerIP201Response model constructor.
     * @property {module:model/AddServerIP201Response}
     */
    AddServerIP201Response,

    /**
     * The AddServerIPRequest model constructor.
     * @property {module:model/AddServerIPRequest}
     */
    AddServerIPRequest,

    /**
     * The AddServerToProjectRequest model constructor.
     * @property {module:model/AddServerToProjectRequest}
     */
    AddServerToProjectRequest,

    /**
     * The AddStorageSubdomainCertificateRequest model constructor.
     * @property {module:model/AddStorageSubdomainCertificateRequest}
     */
    AddStorageSubdomainCertificateRequest,

    /**
     * The AddStorageSubdomains200Response model constructor.
     * @property {module:model/AddStorageSubdomains200Response}
     */
    AddStorageSubdomains200Response,

    /**
     * The AddStorageSubdomainsRequest model constructor.
     * @property {module:model/AddStorageSubdomainsRequest}
     */
    AddStorageSubdomainsRequest,

    /**
     * The AddStorageToProjectRequest model constructor.
     * @property {module:model/AddStorageToProjectRequest}
     */
    AddStorageToProjectRequest,

    /**
     * The AddSubdomain201Response model constructor.
     * @property {module:model/AddSubdomain201Response}
     */
    AddSubdomain201Response,

    /**
     * The AddTokenPackage model constructor.
     * @property {module:model/AddTokenPackage}
     */
    AddTokenPackage,

    /**
     * The AddedSubdomain model constructor.
     * @property {module:model/AddedSubdomain}
     */
    AddedSubdomain,

    /**
     * The AddonConfigOut model constructor.
     * @property {module:model/AddonConfigOut}
     */
    AddonConfigOut,

    /**
     * The AddonOut model constructor.
     * @property {module:model/AddonOut}
     */
    AddonOut,

    /**
     * The AddonsConfigResponse model constructor.
     * @property {module:model/AddonsConfigResponse}
     */
    AddonsConfigResponse,

    /**
     * The AddonsResponse model constructor.
     * @property {module:model/AddonsResponse}
     */
    AddonsResponse,

    /**
     * The Agent model constructor.
     * @property {module:model/Agent}
     */
    Agent,

    /**
     * The AgentAdditionalModel model constructor.
     * @property {module:model/AgentAdditionalModel}
     */
    AgentAdditionalModel,

    /**
     * The AgentEntityLimit model constructor.
     * @property {module:model/AgentEntityLimit}
     */
    AgentEntityLimit,

    /**
     * The AgentModelSettings model constructor.
     * @property {module:model/AgentModelSettings}
     */
    AgentModelSettings,

    /**
     * The AgentSettings model constructor.
     * @property {module:model/AgentSettings}
     */
    AgentSettings,

    /**
     * The AgentSkill model constructor.
     * @property {module:model/AgentSkill}
     */
    AgentSkill,

    /**
     * The AgentTokenStatistic model constructor.
     * @property {module:model/AgentTokenStatistic}
     */
    AgentTokenStatistic,

    /**
     * The AgentToolsInner model constructor.
     * @property {module:model/AgentToolsInner}
     */
    AgentToolsInner,

    /**
     * The AgentV3 model constructor.
     * @property {module:model/AgentV3}
     */
    AgentV3,

    /**
     * The AgentV3KnowledgeBasesInner model constructor.
     * @property {module:model/AgentV3KnowledgeBasesInner}
     */
    AgentV3KnowledgeBasesInner,

    /**
     * The AgentWidgetSettings model constructor.
     * @property {module:model/AgentWidgetSettings}
     */
    AgentWidgetSettings,

    /**
     * The AiGatewayBatch model constructor.
     * @property {module:model/AiGatewayBatch}
     */
    AiGatewayBatch,

    /**
     * The AiGatewayBatchCreateRequest model constructor.
     * @property {module:model/AiGatewayBatchCreateRequest}
     */
    AiGatewayBatchCreateRequest,

    /**
     * The AiGatewayBatchList model constructor.
     * @property {module:model/AiGatewayBatchList}
     */
    AiGatewayBatchList,

    /**
     * The AiGatewayBatchRequestCounts model constructor.
     * @property {module:model/AiGatewayBatchRequestCounts}
     */
    AiGatewayBatchRequestCounts,

    /**
     * The AiGatewayChatCompletion model constructor.
     * @property {module:model/AiGatewayChatCompletion}
     */
    AiGatewayChatCompletion,

    /**
     * The AiGatewayChatCompletionChoicesInner model constructor.
     * @property {module:model/AiGatewayChatCompletionChoicesInner}
     */
    AiGatewayChatCompletionChoicesInner,

    /**
     * The AiGatewayChatCompletionChunk model constructor.
     * @property {module:model/AiGatewayChatCompletionChunk}
     */
    AiGatewayChatCompletionChunk,

    /**
     * The AiGatewayChatCompletionChunkChoicesInner model constructor.
     * @property {module:model/AiGatewayChatCompletionChunkChoicesInner}
     */
    AiGatewayChatCompletionChunkChoicesInner,

    /**
     * The AiGatewayChatCompletionRequest model constructor.
     * @property {module:model/AiGatewayChatCompletionRequest}
     */
    AiGatewayChatCompletionRequest,

    /**
     * The AiGatewayChatCompletionRequestStreamOptions model constructor.
     * @property {module:model/AiGatewayChatCompletionRequestStreamOptions}
     */
    AiGatewayChatCompletionRequestStreamOptions,

    /**
     * The AiGatewayChatMessage model constructor.
     * @property {module:model/AiGatewayChatMessage}
     */
    AiGatewayChatMessage,

    /**
     * The AiGatewayCompletion model constructor.
     * @property {module:model/AiGatewayCompletion}
     */
    AiGatewayCompletion,

    /**
     * The AiGatewayCompletionChoicesInner model constructor.
     * @property {module:model/AiGatewayCompletionChoicesInner}
     */
    AiGatewayCompletionChoicesInner,

    /**
     * The AiGatewayCompletionRequest model constructor.
     * @property {module:model/AiGatewayCompletionRequest}
     */
    AiGatewayCompletionRequest,

    /**
     * The AiGatewayEmbeddingList model constructor.
     * @property {module:model/AiGatewayEmbeddingList}
     */
    AiGatewayEmbeddingList,

    /**
     * The AiGatewayEmbeddingListDataInner model constructor.
     * @property {module:model/AiGatewayEmbeddingListDataInner}
     */
    AiGatewayEmbeddingListDataInner,

    /**
     * The AiGatewayEmbeddingListUsage model constructor.
     * @property {module:model/AiGatewayEmbeddingListUsage}
     */
    AiGatewayEmbeddingListUsage,

    /**
     * The AiGatewayEmbeddingRequest model constructor.
     * @property {module:model/AiGatewayEmbeddingRequest}
     */
    AiGatewayEmbeddingRequest,

    /**
     * The AiGatewayError model constructor.
     * @property {module:model/AiGatewayError}
     */
    AiGatewayError,

    /**
     * The AiGatewayErrorError model constructor.
     * @property {module:model/AiGatewayErrorError}
     */
    AiGatewayErrorError,

    /**
     * The AiGatewayFile model constructor.
     * @property {module:model/AiGatewayFile}
     */
    AiGatewayFile,

    /**
     * The AiGatewayFileDeleted model constructor.
     * @property {module:model/AiGatewayFileDeleted}
     */
    AiGatewayFileDeleted,

    /**
     * The AiGatewayImageGenerationRequest model constructor.
     * @property {module:model/AiGatewayImageGenerationRequest}
     */
    AiGatewayImageGenerationRequest,

    /**
     * The AiGatewayImagesResponse model constructor.
     * @property {module:model/AiGatewayImagesResponse}
     */
    AiGatewayImagesResponse,

    /**
     * The AiGatewayImagesResponseDataInner model constructor.
     * @property {module:model/AiGatewayImagesResponseDataInner}
     */
    AiGatewayImagesResponseDataInner,

    /**
     * The AiGatewayModel model constructor.
     * @property {module:model/AiGatewayModel}
     */
    AiGatewayModel,

    /**
     * The AiGatewayModelList model constructor.
     * @property {module:model/AiGatewayModelList}
     */
    AiGatewayModelList,

    /**
     * The AiGatewayResponse model constructor.
     * @property {module:model/AiGatewayResponse}
     */
    AiGatewayResponse,

    /**
     * The AiGatewayResponseCreateRequest model constructor.
     * @property {module:model/AiGatewayResponseCreateRequest}
     */
    AiGatewayResponseCreateRequest,

    /**
     * The AiGatewayResponseCreateRequestReasoning model constructor.
     * @property {module:model/AiGatewayResponseCreateRequestReasoning}
     */
    AiGatewayResponseCreateRequestReasoning,

    /**
     * The AiGatewayResponseDeleted model constructor.
     * @property {module:model/AiGatewayResponseDeleted}
     */
    AiGatewayResponseDeleted,

    /**
     * The AiGatewayResponseIncompleteDetails model constructor.
     * @property {module:model/AiGatewayResponseIncompleteDetails}
     */
    AiGatewayResponseIncompleteDetails,

    /**
     * The AiGatewayResponseUsage model constructor.
     * @property {module:model/AiGatewayResponseUsage}
     */
    AiGatewayResponseUsage,

    /**
     * The AiGatewaySpeechRequest model constructor.
     * @property {module:model/AiGatewaySpeechRequest}
     */
    AiGatewaySpeechRequest,

    /**
     * The AiGatewayToolCall model constructor.
     * @property {module:model/AiGatewayToolCall}
     */
    AiGatewayToolCall,

    /**
     * The AiGatewayToolCallFunction model constructor.
     * @property {module:model/AiGatewayToolCallFunction}
     */
    AiGatewayToolCallFunction,

    /**
     * The AiGatewayTranscription model constructor.
     * @property {module:model/AiGatewayTranscription}
     */
    AiGatewayTranscription,

    /**
     * The AiGatewayUsage model constructor.
     * @property {module:model/AiGatewayUsage}
     */
    AiGatewayUsage,

    /**
     * The AiGatewayUsageCompletionTokensDetails model constructor.
     * @property {module:model/AiGatewayUsageCompletionTokensDetails}
     */
    AiGatewayUsageCompletionTokensDetails,

    /**
     * The AiGatewayUsagePromptTokensDetails model constructor.
     * @property {module:model/AiGatewayUsagePromptTokensDetails}
     */
    AiGatewayUsagePromptTokensDetails,

    /**
     * The AiGatewayValidationError model constructor.
     * @property {module:model/AiGatewayValidationError}
     */
    AiGatewayValidationError,

    /**
     * The AiKey model constructor.
     * @property {module:model/AiKey}
     */
    AiKey,

    /**
     * The AiKeyCallsStatisticPoint model constructor.
     * @property {module:model/AiKeyCallsStatisticPoint}
     */
    AiKeyCallsStatisticPoint,

    /**
     * The AiKeyLimit model constructor.
     * @property {module:model/AiKeyLimit}
     */
    AiKeyLimit,

    /**
     * The AiKeyTokenStatisticPoint model constructor.
     * @property {module:model/AiKeyTokenStatisticPoint}
     */
    AiKeyTokenStatisticPoint,

    /**
     * The AiProvider model constructor.
     * @property {module:model/AiProvider}
     */
    AiProvider,

    /**
     * The AiSolution model constructor.
     * @property {module:model/AiSolution}
     */
    AiSolution,

    /**
     * The AiSolutionAiKey model constructor.
     * @property {module:model/AiSolutionAiKey}
     */
    AiSolutionAiKey,

    /**
     * The AiSolutionChatMessage model constructor.
     * @property {module:model/AiSolutionChatMessage}
     */
    AiSolutionChatMessage,

    /**
     * The AiSolutionChatReply model constructor.
     * @property {module:model/AiSolutionChatReply}
     */
    AiSolutionChatReply,

    /**
     * The AiSolutionChatStatus model constructor.
     * @property {module:model/AiSolutionChatStatus}
     */
    AiSolutionChatStatus,

    /**
     * The AiSolutionConversation model constructor.
     * @property {module:model/AiSolutionConversation}
     */
    AiSolutionConversation,

    /**
     * The AiSolutionTelegramBot model constructor.
     * @property {module:model/AiSolutionTelegramBot}
     */
    AiSolutionTelegramBot,

    /**
     * The AiSolutionType model constructor.
     * @property {module:model/AiSolutionType}
     */
    AiSolutionType,

    /**
     * The AiSolutionTypeRequirements model constructor.
     * @property {module:model/AiSolutionTypeRequirements}
     */
    AiSolutionTypeRequirements,

    /**
     * The App model constructor.
     * @property {module:model/App}
     */
    App,

    /**
     * The AppConfiguration model constructor.
     * @property {module:model/AppConfiguration}
     */
    AppConfiguration,

    /**
     * The AppDiskStatus model constructor.
     * @property {module:model/AppDiskStatus}
     */
    AppDiskStatus,

    /**
     * The AppDomainsInner model constructor.
     * @property {module:model/AppDomainsInner}
     */
    AppDomainsInner,

    /**
     * The AppProvider model constructor.
     * @property {module:model/AppProvider}
     */
    AppProvider,

    /**
     * The AppV2 model constructor.
     * @property {module:model/AppV2}
     */
    AppV2,

    /**
     * The AppV2Configuration model constructor.
     * @property {module:model/AppV2Configuration}
     */
    AppV2Configuration,

    /**
     * The AppV2DiskStatus model constructor.
     * @property {module:model/AppV2DiskStatus}
     */
    AppV2DiskStatus,

    /**
     * The AppV2DomainsInner model constructor.
     * @property {module:model/AppV2DomainsInner}
     */
    AppV2DomainsInner,

    /**
     * The AppV2Provider model constructor.
     * @property {module:model/AppV2Provider}
     */
    AppV2Provider,

    /**
     * The ApproveTelegramPairing model constructor.
     * @property {module:model/ApproveTelegramPairing}
     */
    ApproveTelegramPairing,

    /**
     * The AppsPresets model constructor.
     * @property {module:model/AppsPresets}
     */
    AppsPresets,

    /**
     * The AppsPresetsBackendPresetsInner model constructor.
     * @property {module:model/AppsPresetsBackendPresetsInner}
     */
    AppsPresetsBackendPresetsInner,

    /**
     * The AppsPresetsFrontendPresetsInner model constructor.
     * @property {module:model/AppsPresetsFrontendPresetsInner}
     */
    AppsPresetsFrontendPresetsInner,

    /**
     * The AuthorizeUrl model constructor.
     * @property {module:model/AuthorizeUrl}
     */
    AuthorizeUrl,

    /**
     * The AutoBackup model constructor.
     * @property {module:model/AutoBackup}
     */
    AutoBackup,

    /**
     * The AutoReplyIsDisabled model constructor.
     * @property {module:model/AutoReplyIsDisabled}
     */
    AutoReplyIsDisabled,

    /**
     * The AutoReplyIsEnabled model constructor.
     * @property {module:model/AutoReplyIsEnabled}
     */
    AutoReplyIsEnabled,

    /**
     * The AutoreplyIsDisabled model constructor.
     * @property {module:model/AutoreplyIsDisabled}
     */
    AutoreplyIsDisabled,

    /**
     * The AutoreplyIsEnabled model constructor.
     * @property {module:model/AutoreplyIsEnabled}
     */
    AutoreplyIsEnabled,

    /**
     * The AvailabilityZone model constructor.
     * @property {module:model/AvailabilityZone}
     */
    AvailabilityZone,

    /**
     * The AvailableFrameworks model constructor.
     * @property {module:model/AvailableFrameworks}
     */
    AvailableFrameworks,

    /**
     * The AvailableFrameworksBackendFrameworksInner model constructor.
     * @property {module:model/AvailableFrameworksBackendFrameworksInner}
     */
    AvailableFrameworksBackendFrameworksInner,

    /**
     * The AvailableFrameworksFrontendFrameworksInner model constructor.
     * @property {module:model/AvailableFrameworksFrontendFrameworksInner}
     */
    AvailableFrameworksFrontendFrameworksInner,

    /**
     * The AvailableNetwork model constructor.
     * @property {module:model/AvailableNetwork}
     */
    AvailableNetwork,

    /**
     * The AvailableNetworksResponse model constructor.
     * @property {module:model/AvailableNetworksResponse}
     */
    AvailableNetworksResponse,

    /**
     * The AvailableStaticRoute model constructor.
     * @property {module:model/AvailableStaticRoute}
     */
    AvailableStaticRoute,

    /**
     * The AvailableStaticRouteSubnetsInner model constructor.
     * @property {module:model/AvailableStaticRouteSubnetsInner}
     */
    AvailableStaticRouteSubnetsInner,

    /**
     * The AvailableStaticRoutesResponse model constructor.
     * @property {module:model/AvailableStaticRoutesResponse}
     */
    AvailableStaticRoutesResponse,

    /**
     * The Backup model constructor.
     * @property {module:model/Backup}
     */
    Backup,

    /**
     * The BackupDownloadUrl model constructor.
     * @property {module:model/BackupDownloadUrl}
     */
    BackupDownloadUrl,

    /**
     * The BackupDownloadUrlRequest model constructor.
     * @property {module:model/BackupDownloadUrlRequest}
     */
    BackupDownloadUrlRequest,

    /**
     * The Balancer model constructor.
     * @property {module:model/Balancer}
     */
    Balancer,

    /**
     * The BalancerNetworksInner model constructor.
     * @property {module:model/BalancerNetworksInner}
     */
    BalancerNetworksInner,

    /**
     * The BalancerNetworksInnerIpsInner model constructor.
     * @property {module:model/BalancerNetworksInnerIpsInner}
     */
    BalancerNetworksInnerIpsInner,

    /**
     * The BaseError model constructor.
     * @property {module:model/BaseError}
     */
    BaseError,

    /**
     * The BindFloatingIp model constructor.
     * @property {module:model/BindFloatingIp}
     */
    BindFloatingIp,

    /**
     * The Bonus model constructor.
     * @property {module:model/Bonus}
     */
    Bonus,

    /**
     * The Bot model constructor.
     * @property {module:model/Bot}
     */
    Bot,

    /**
     * The Branch model constructor.
     * @property {module:model/Branch}
     */
    Branch,

    /**
     * The Bucket model constructor.
     * @property {module:model/Bucket}
     */
    Bucket,

    /**
     * The BucketDiskStats model constructor.
     * @property {module:model/BucketDiskStats}
     */
    BucketDiskStats,

    /**
     * The BucketUser model constructor.
     * @property {module:model/BucketUser}
     */
    BucketUser,

    /**
     * The BucketWebsiteConfig model constructor.
     * @property {module:model/BucketWebsiteConfig}
     */
    BucketWebsiteConfig,

    /**
     * The BucketWebsiteConfigErrorPagesInner model constructor.
     * @property {module:model/BucketWebsiteConfigErrorPagesInner}
     */
    BucketWebsiteConfigErrorPagesInner,

    /**
     * The Certificate model constructor.
     * @property {module:model/Certificate}
     */
    Certificate,

    /**
     * The CertificateTask model constructor.
     * @property {module:model/CertificateTask}
     */
    CertificateTask,

    /**
     * The ChangeAgentModel model constructor.
     * @property {module:model/ChangeAgentModel}
     */
    ChangeAgentModel,

    /**
     * The Chat model constructor.
     * @property {module:model/Chat}
     */
    Chat,

    /**
     * The ChatFirstMessage model constructor.
     * @property {module:model/ChatFirstMessage}
     */
    ChatFirstMessage,

    /**
     * The ChatListMetrics model constructor.
     * @property {module:model/ChatListMetrics}
     */
    ChatListMetrics,

    /**
     * The ChatMessage model constructor.
     * @property {module:model/ChatMessage}
     */
    ChatMessage,

    /**
     * The ChatMessageFile model constructor.
     * @property {module:model/ChatMessageFile}
     */
    ChatMessageFile,

    /**
     * The ChatsCsv model constructor.
     * @property {module:model/ChatsCsv}
     */
    ChatsCsv,

    /**
     * The CheckDomain200Response model constructor.
     * @property {module:model/CheckDomain200Response}
     */
    CheckDomain200Response,

    /**
     * The ClearCache model constructor.
     * @property {module:model/ClearCache}
     */
    ClearCache,

    /**
     * The Clickhouse model constructor.
     * @property {module:model/Clickhouse}
     */
    Clickhouse,

    /**
     * The ClusterAction model constructor.
     * @property {module:model/ClusterAction}
     */
    ClusterAction,

    /**
     * The ClusterEdit model constructor.
     * @property {module:model/ClusterEdit}
     */
    ClusterEdit,

    /**
     * The ClusterEditOidcProvider model constructor.
     * @property {module:model/ClusterEditOidcProvider}
     */
    ClusterEditOidcProvider,

    /**
     * The ClusterIn model constructor.
     * @property {module:model/ClusterIn}
     */
    ClusterIn,

    /**
     * The ClusterIn1 model constructor.
     * @property {module:model/ClusterIn1}
     */
    ClusterIn1,

    /**
     * The ClusterInClusterNetworkCidr model constructor.
     * @property {module:model/ClusterInClusterNetworkCidr}
     */
    ClusterInClusterNetworkCidr,

    /**
     * The ClusterInConfiguration model constructor.
     * @property {module:model/ClusterInConfiguration}
     */
    ClusterInConfiguration,

    /**
     * The ClusterInMaintenanceSlot model constructor.
     * @property {module:model/ClusterInMaintenanceSlot}
     */
    ClusterInMaintenanceSlot,

    /**
     * The ClusterInOidcProvider model constructor.
     * @property {module:model/ClusterInOidcProvider}
     */
    ClusterInOidcProvider,

    /**
     * The ClusterOut model constructor.
     * @property {module:model/ClusterOut}
     */
    ClusterOut,

    /**
     * The ClusterResponse model constructor.
     * @property {module:model/ClusterResponse}
     */
    ClusterResponse,

    /**
     * The ClusterVersionEdit model constructor.
     * @property {module:model/ClusterVersionEdit}
     */
    ClusterVersionEdit,

    /**
     * The Clusterk8s model constructor.
     * @property {module:model/Clusterk8s}
     */
    Clusterk8s,

    /**
     * The ClustersResponse model constructor.
     * @property {module:model/ClustersResponse}
     */
    ClustersResponse,

    /**
     * The Commit model constructor.
     * @property {module:model/Commit}
     */
    Commit,

    /**
     * The ComponentsSchemasBaseError model constructor.
     * @property {module:model/ComponentsSchemasBaseError}
     */
    ComponentsSchemasBaseError,

    /**
     * The ComponentsSchemasMeta model constructor.
     * @property {module:model/ComponentsSchemasMeta}
     */
    ComponentsSchemasMeta,

    /**
     * The ConfigAccess model constructor.
     * @property {module:model/ConfigAccess}
     */
    ConfigAccess,

    /**
     * The ConfigCache model constructor.
     * @property {module:model/ConfigCache}
     */
    ConfigCache,

    /**
     * The ConfigCacheAlwaysOnline model constructor.
     * @property {module:model/ConfigCacheAlwaysOnline}
     */
    ConfigCacheAlwaysOnline,

    /**
     * The ConfigCacheBrowser model constructor.
     * @property {module:model/ConfigCacheBrowser}
     */
    ConfigCacheBrowser,

    /**
     * The ConfigCacheCdn model constructor.
     * @property {module:model/ConfigCacheCdn}
     */
    ConfigCacheCdn,

    /**
     * The ConfigCacheCdnTtl model constructor.
     * @property {module:model/ConfigCacheCdnTtl}
     */
    ConfigCacheCdnTtl,

    /**
     * The ConfigCacheQueryArgs model constructor.
     * @property {module:model/ConfigCacheQueryArgs}
     */
    ConfigCacheQueryArgs,

    /**
     * The ConfigDelivery model constructor.
     * @property {module:model/ConfigDelivery}
     */
    ConfigDelivery,

    /**
     * The ConfigDeliveryPackaging model constructor.
     * @property {module:model/ConfigDeliveryPackaging}
     */
    ConfigDeliveryPackaging,

    /**
     * The ConfigDeliveryPackagingMp4 model constructor.
     * @property {module:model/ConfigDeliveryPackagingMp4}
     */
    ConfigDeliveryPackagingMp4,

    /**
     * The ConfigDomains model constructor.
     * @property {module:model/ConfigDomains}
     */
    ConfigDomains,

    /**
     * The ConfigHttpHeaders model constructor.
     * @property {module:model/ConfigHttpHeaders}
     */
    ConfigHttpHeaders,

    /**
     * The ConfigHttpHeadersCors model constructor.
     * @property {module:model/ConfigHttpHeadersCors}
     */
    ConfigHttpHeadersCors,

    /**
     * The ConfigOrigin model constructor.
     * @property {module:model/ConfigOrigin}
     */
    ConfigOrigin,

    /**
     * The ConfigOriginAws model constructor.
     * @property {module:model/ConfigOriginAws}
     */
    ConfigOriginAws,

    /**
     * The ConfigRobots model constructor.
     * @property {module:model/ConfigRobots}
     */
    ConfigRobots,

    /**
     * The ConfigSecurity model constructor.
     * @property {module:model/ConfigSecurity}
     */
    ConfigSecurity,

    /**
     * The ConfigSecuritySecureToken model constructor.
     * @property {module:model/ConfigSecuritySecureToken}
     */
    ConfigSecuritySecureToken,

    /**
     * The ConnectAgentTool model constructor.
     * @property {module:model/ConnectAgentTool}
     */
    ConnectAgentTool,

    /**
     * The ConnectSkillItem model constructor.
     * @property {module:model/ConnectSkillItem}
     */
    ConnectSkillItem,

    /**
     * The ConnectSkills model constructor.
     * @property {module:model/ConnectSkills}
     */
    ConnectSkills,

    /**
     * The ConnectTelegram model constructor.
     * @property {module:model/ConnectTelegram}
     */
    ConnectTelegram,

    /**
     * The ContainerRegistryPresetsInner model constructor.
     * @property {module:model/ContainerRegistryPresetsInner}
     */
    ContainerRegistryPresetsInner,

    /**
     * The ContainerRegistryRepositoriesInner model constructor.
     * @property {module:model/ContainerRegistryRepositoriesInner}
     */
    ContainerRegistryRepositoriesInner,

    /**
     * The CreateAdmin model constructor.
     * @property {module:model/CreateAdmin}
     */
    CreateAdmin,

    /**
     * The CreateAgent model constructor.
     * @property {module:model/CreateAgent}
     */
    CreateAgent,

    /**
     * The CreateAgent201Response model constructor.
     * @property {module:model/CreateAgent201Response}
     */
    CreateAgent201Response,

    /**
     * The CreateAgentBotTelegramBot201Response model constructor.
     * @property {module:model/CreateAgentBotTelegramBot201Response}
     */
    CreateAgentBotTelegramBot201Response,

    /**
     * The CreateAgentEntityLimit model constructor.
     * @property {module:model/CreateAgentEntityLimit}
     */
    CreateAgentEntityLimit,

    /**
     * The CreateAgentEntityLimit201Response model constructor.
     * @property {module:model/CreateAgentEntityLimit201Response}
     */
    CreateAgentEntityLimit201Response,

    /**
     * The CreateAgentSkill201Response model constructor.
     * @property {module:model/CreateAgentSkill201Response}
     */
    CreateAgentSkill201Response,

    /**
     * The CreateAgentTool201Response model constructor.
     * @property {module:model/CreateAgentTool201Response}
     */
    CreateAgentTool201Response,

    /**
     * The CreateAgentV2 model constructor.
     * @property {module:model/CreateAgentV2}
     */
    CreateAgentV2,

    /**
     * The CreateAiKey model constructor.
     * @property {module:model/CreateAiKey}
     */
    CreateAiKey,

    /**
     * The CreateAiKey201Response model constructor.
     * @property {module:model/CreateAiKey201Response}
     */
    CreateAiKey201Response,

    /**
     * The CreateAiKeyLimit model constructor.
     * @property {module:model/CreateAiKeyLimit}
     */
    CreateAiKeyLimit,

    /**
     * The CreateAiKeyLimit201Response model constructor.
     * @property {module:model/CreateAiKeyLimit201Response}
     */
    CreateAiKeyLimit201Response,

    /**
     * The CreateAiSolution model constructor.
     * @property {module:model/CreateAiSolution}
     */
    CreateAiSolution,

    /**
     * The CreateAiSolution201Response model constructor.
     * @property {module:model/CreateAiSolution201Response}
     */
    CreateAiSolution201Response,

    /**
     * The CreateApp model constructor.
     * @property {module:model/CreateApp}
     */
    CreateApp,

    /**
     * The CreateApp201Response model constructor.
     * @property {module:model/CreateApp201Response}
     */
    CreateApp201Response,

    /**
     * The CreateAppV2 model constructor.
     * @property {module:model/CreateAppV2}
     */
    CreateAppV2,

    /**
     * The CreateAppV2201Response model constructor.
     * @property {module:model/CreateAppV2201Response}
     */
    CreateAppV2201Response,

    /**
     * The CreateAppV2Configuration model constructor.
     * @property {module:model/CreateAppV2Configuration}
     */
    CreateAppV2Configuration,

    /**
     * The CreateAppV2Network model constructor.
     * @property {module:model/CreateAppV2Network}
     */
    CreateAppV2Network,

    /**
     * The CreateBalancer model constructor.
     * @property {module:model/CreateBalancer}
     */
    CreateBalancer,

    /**
     * The CreateBalancer200Response model constructor.
     * @property {module:model/CreateBalancer200Response}
     */
    CreateBalancer200Response,

    /**
     * The CreateBalancerCertificates model constructor.
     * @property {module:model/CreateBalancerCertificates}
     */
    CreateBalancerCertificates,

    /**
     * The CreateBalancerRule200Response model constructor.
     * @property {module:model/CreateBalancerRule200Response}
     */
    CreateBalancerRule200Response,

    /**
     * The CreateBot model constructor.
     * @property {module:model/CreateBot}
     */
    CreateBot,

    /**
     * The CreateCdnResource201Response model constructor.
     * @property {module:model/CreateCdnResource201Response}
     */
    CreateCdnResource201Response,

    /**
     * The CreateCluster model constructor.
     * @property {module:model/CreateCluster}
     */
    CreateCluster,

    /**
     * The CreateClusterAdmin model constructor.
     * @property {module:model/CreateClusterAdmin}
     */
    CreateClusterAdmin,

    /**
     * The CreateClusterBackupSchedule model constructor.
     * @property {module:model/CreateClusterBackupSchedule}
     */
    CreateClusterBackupSchedule,

    /**
     * The CreateClusterConfiguration model constructor.
     * @property {module:model/CreateClusterConfiguration}
     */
    CreateClusterConfiguration,

    /**
     * The CreateClusterDiskAutoscaling model constructor.
     * @property {module:model/CreateClusterDiskAutoscaling}
     */
    CreateClusterDiskAutoscaling,

    /**
     * The CreateClusterInstance model constructor.
     * @property {module:model/CreateClusterInstance}
     */
    CreateClusterInstance,

    /**
     * The CreateClusterMaintenanceSlot model constructor.
     * @property {module:model/CreateClusterMaintenanceSlot}
     */
    CreateClusterMaintenanceSlot,

    /**
     * The CreateCrispIntegration model constructor.
     * @property {module:model/CreateCrispIntegration}
     */
    CreateCrispIntegration,

    /**
     * The CreateDatabaseBackup201Response model constructor.
     * @property {module:model/CreateDatabaseBackup201Response}
     */
    CreateDatabaseBackup201Response,

    /**
     * The CreateDatabaseBackupDownloadUrl201Response model constructor.
     * @property {module:model/CreateDatabaseBackupDownloadUrl201Response}
     */
    CreateDatabaseBackupDownloadUrl201Response,

    /**
     * The CreateDatabaseCluster201Response model constructor.
     * @property {module:model/CreateDatabaseCluster201Response}
     */
    CreateDatabaseCluster201Response,

    /**
     * The CreateDatabaseInstance201Response model constructor.
     * @property {module:model/CreateDatabaseInstance201Response}
     */
    CreateDatabaseInstance201Response,

    /**
     * The CreateDatabaseS3Backup201Response model constructor.
     * @property {module:model/CreateDatabaseS3Backup201Response}
     */
    CreateDatabaseS3Backup201Response,

    /**
     * The CreateDatabaseUser201Response model constructor.
     * @property {module:model/CreateDatabaseUser201Response}
     */
    CreateDatabaseUser201Response,

    /**
     * The CreateDbAutoBackups model constructor.
     * @property {module:model/CreateDbAutoBackups}
     */
    CreateDbAutoBackups,

    /**
     * The CreateDedicatedServer model constructor.
     * @property {module:model/CreateDedicatedServer}
     */
    CreateDedicatedServer,

    /**
     * The CreateDedicatedServer201Response model constructor.
     * @property {module:model/CreateDedicatedServer201Response}
     */
    CreateDedicatedServer201Response,

    /**
     * The CreateDeploy201Response model constructor.
     * @property {module:model/CreateDeploy201Response}
     */
    CreateDeploy201Response,

    /**
     * The CreateDeployRequest model constructor.
     * @property {module:model/CreateDeployRequest}
     */
    CreateDeployRequest,

    /**
     * The CreateDns model constructor.
     * @property {module:model/CreateDns}
     */
    CreateDns,

    /**
     * The CreateDnsV2 model constructor.
     * @property {module:model/CreateDnsV2}
     */
    CreateDnsV2,

    /**
     * The CreateDocument model constructor.
     * @property {module:model/CreateDocument}
     */
    CreateDocument,

    /**
     * The CreateDomainDNSRecord201Response model constructor.
     * @property {module:model/CreateDomainDNSRecord201Response}
     */
    CreateDomainDNSRecord201Response,

    /**
     * The CreateDomainDNSRecordV2201Response model constructor.
     * @property {module:model/CreateDomainDNSRecordV2201Response}
     */
    CreateDomainDNSRecordV2201Response,

    /**
     * The CreateDomainMailbox201Response model constructor.
     * @property {module:model/CreateDomainMailbox201Response}
     */
    CreateDomainMailbox201Response,

    /**
     * The CreateDomainMailboxRequest model constructor.
     * @property {module:model/CreateDomainMailboxRequest}
     */
    CreateDomainMailboxRequest,

    /**
     * The CreateDomainMailboxV2201Response model constructor.
     * @property {module:model/CreateDomainMailboxV2201Response}
     */
    CreateDomainMailboxV2201Response,

    /**
     * The CreateDomainMailboxV2Request model constructor.
     * @property {module:model/CreateDomainMailboxV2Request}
     */
    CreateDomainMailboxV2Request,

    /**
     * The CreateDomainRequest201Response model constructor.
     * @property {module:model/CreateDomainRequest201Response}
     */
    CreateDomainRequest201Response,

    /**
     * The CreateFloatingIp model constructor.
     * @property {module:model/CreateFloatingIp}
     */
    CreateFloatingIp,

    /**
     * The CreateFloatingIp201Response model constructor.
     * @property {module:model/CreateFloatingIp201Response}
     */
    CreateFloatingIp201Response,

    /**
     * The CreateHttpResource model constructor.
     * @property {module:model/CreateHttpResource}
     */
    CreateHttpResource,

    /**
     * The CreateInstance model constructor.
     * @property {module:model/CreateInstance}
     */
    CreateInstance,

    /**
     * The CreateJivoIntegration model constructor.
     * @property {module:model/CreateJivoIntegration}
     */
    CreateJivoIntegration,

    /**
     * The CreateKey201Response model constructor.
     * @property {module:model/CreateKey201Response}
     */
    CreateKey201Response,

    /**
     * The CreateKeyRequest model constructor.
     * @property {module:model/CreateKeyRequest}
     */
    CreateKeyRequest,

    /**
     * The CreateKnowledgebase model constructor.
     * @property {module:model/CreateKnowledgebase}
     */
    CreateKnowledgebase,

    /**
     * The CreateKnowledgebase201Response model constructor.
     * @property {module:model/CreateKnowledgebase201Response}
     */
    CreateKnowledgebase201Response,

    /**
     * The CreateKnowledgebaseDocument201Response model constructor.
     * @property {module:model/CreateKnowledgebaseDocument201Response}
     */
    CreateKnowledgebaseDocument201Response,

    /**
     * The CreateMaxBot model constructor.
     * @property {module:model/CreateMaxBot}
     */
    CreateMaxBot,

    /**
     * The CreateMultipleDomainMailboxes201Response model constructor.
     * @property {module:model/CreateMultipleDomainMailboxes201Response}
     */
    CreateMultipleDomainMailboxes201Response,

    /**
     * The CreateMultipleDomainMailboxesRequest model constructor.
     * @property {module:model/CreateMultipleDomainMailboxesRequest}
     */
    CreateMultipleDomainMailboxesRequest,

    /**
     * The CreateMultipleDomainMailboxesRequestMailboxesInner model constructor.
     * @property {module:model/CreateMultipleDomainMailboxesRequestMailboxesInner}
     */
    CreateMultipleDomainMailboxesRequestMailboxesInner,

    /**
     * The CreateMultipleDomainMailboxesV2201Response model constructor.
     * @property {module:model/CreateMultipleDomainMailboxesV2201Response}
     */
    CreateMultipleDomainMailboxesV2201Response,

    /**
     * The CreateMultipleDomainMailboxesV2RequestInner model constructor.
     * @property {module:model/CreateMultipleDomainMailboxesV2RequestInner}
     */
    CreateMultipleDomainMailboxesV2RequestInner,

    /**
     * The CreateNetworkDrive model constructor.
     * @property {module:model/CreateNetworkDrive}
     */
    CreateNetworkDrive,

    /**
     * The CreateNetworkDrive201Response model constructor.
     * @property {module:model/CreateNetworkDrive201Response}
     */
    CreateNetworkDrive201Response,

    /**
     * The CreatePerson201Response model constructor.
     * @property {module:model/CreatePerson201Response}
     */
    CreatePerson201Response,

    /**
     * The CreateProject model constructor.
     * @property {module:model/CreateProject}
     */
    CreateProject,

    /**
     * The CreateProject201Response model constructor.
     * @property {module:model/CreateProject201Response}
     */
    CreateProject201Response,

    /**
     * The CreateRule model constructor.
     * @property {module:model/CreateRule}
     */
    CreateRule,

    /**
     * The CreateS3Backup model constructor.
     * @property {module:model/CreateS3Backup}
     */
    CreateS3Backup,

    /**
     * The CreateServer model constructor.
     * @property {module:model/CreateServer}
     */
    CreateServer,

    /**
     * The CreateServer201Response model constructor.
     * @property {module:model/CreateServer201Response}
     */
    CreateServer201Response,

    /**
     * The CreateServerConfiguration model constructor.
     * @property {module:model/CreateServerConfiguration}
     */
    CreateServerConfiguration,

    /**
     * The CreateServerDisk201Response model constructor.
     * @property {module:model/CreateServerDisk201Response}
     */
    CreateServerDisk201Response,

    /**
     * The CreateServerDiskBackup201Response model constructor.
     * @property {module:model/CreateServerDiskBackup201Response}
     */
    CreateServerDiskBackup201Response,

    /**
     * The CreateServerDiskBackupDownloadUrl201Response model constructor.
     * @property {module:model/CreateServerDiskBackupDownloadUrl201Response}
     */
    CreateServerDiskBackupDownloadUrl201Response,

    /**
     * The CreateServerDiskBackupRequest model constructor.
     * @property {module:model/CreateServerDiskBackupRequest}
     */
    CreateServerDiskBackupRequest,

    /**
     * The CreateServerDiskRequest model constructor.
     * @property {module:model/CreateServerDiskRequest}
     */
    CreateServerDiskRequest,

    /**
     * The CreateServerNetwork model constructor.
     * @property {module:model/CreateServerNetwork}
     */
    CreateServerNetwork,

    /**
     * The CreateSkill model constructor.
     * @property {module:model/CreateSkill}
     */
    CreateSkill,

    /**
     * The CreateStorage201Response model constructor.
     * @property {module:model/CreateStorage201Response}
     */
    CreateStorage201Response,

    /**
     * The CreateStorageRequest model constructor.
     * @property {module:model/CreateStorageRequest}
     */
    CreateStorageRequest,

    /**
     * The CreateStorageRequestConfigurator model constructor.
     * @property {module:model/CreateStorageRequestConfigurator}
     */
    CreateStorageRequestConfigurator,

    /**
     * The CreateTool model constructor.
     * @property {module:model/CreateTool}
     */
    CreateTool,

    /**
     * The CreateVPC201Response model constructor.
     * @property {module:model/CreateVPC201Response}
     */
    CreateVPC201Response,

    /**
     * The CreateVpc model constructor.
     * @property {module:model/CreateVpc}
     */
    CreateVpc,

    /**
     * The CrispIntegration model constructor.
     * @property {module:model/CrispIntegration}
     */
    CrispIntegration,

    /**
     * The DatabaseAdmin model constructor.
     * @property {module:model/DatabaseAdmin}
     */
    DatabaseAdmin,

    /**
     * The DatabaseAdminInstancesInner model constructor.
     * @property {module:model/DatabaseAdminInstancesInner}
     */
    DatabaseAdminInstancesInner,

    /**
     * The DatabaseCluster model constructor.
     * @property {module:model/DatabaseCluster}
     */
    DatabaseCluster,

    /**
     * The DatabaseClusterChildServicesInner model constructor.
     * @property {module:model/DatabaseClusterChildServicesInner}
     */
    DatabaseClusterChildServicesInner,

    /**
     * The DatabaseClusterDisk model constructor.
     * @property {module:model/DatabaseClusterDisk}
     */
    DatabaseClusterDisk,

    /**
     * The DatabaseClusterDiskAutoscaling model constructor.
     * @property {module:model/DatabaseClusterDiskAutoscaling}
     */
    DatabaseClusterDiskAutoscaling,

    /**
     * The DatabaseClusterDomainsInner model constructor.
     * @property {module:model/DatabaseClusterDomainsInner}
     */
    DatabaseClusterDomainsInner,

    /**
     * The DatabaseClusterMaintenanceSlot model constructor.
     * @property {module:model/DatabaseClusterMaintenanceSlot}
     */
    DatabaseClusterMaintenanceSlot,

    /**
     * The DatabaseClusterNetworksInner model constructor.
     * @property {module:model/DatabaseClusterNetworksInner}
     */
    DatabaseClusterNetworksInner,

    /**
     * The DatabaseClusterNetworksInnerIpsInner model constructor.
     * @property {module:model/DatabaseClusterNetworksInnerIpsInner}
     */
    DatabaseClusterNetworksInnerIpsInner,

    /**
     * The DatabaseClusterParentServicesInner model constructor.
     * @property {module:model/DatabaseClusterParentServicesInner}
     */
    DatabaseClusterParentServicesInner,

    /**
     * The DatabaseClusterReplicaListInner model constructor.
     * @property {module:model/DatabaseClusterReplicaListInner}
     */
    DatabaseClusterReplicaListInner,

    /**
     * The DatabaseClusterReplicaListInnerDisk model constructor.
     * @property {module:model/DatabaseClusterReplicaListInnerDisk}
     */
    DatabaseClusterReplicaListInnerDisk,

    /**
     * The DatabaseConfigurator model constructor.
     * @property {module:model/DatabaseConfigurator}
     */
    DatabaseConfigurator,

    /**
     * The DatabaseConfiguratorPrices model constructor.
     * @property {module:model/DatabaseConfiguratorPrices}
     */
    DatabaseConfiguratorPrices,

    /**
     * The DatabaseConfiguratorRequirements model constructor.
     * @property {module:model/DatabaseConfiguratorRequirements}
     */
    DatabaseConfiguratorRequirements,

    /**
     * The DatabaseExtensions model constructor.
     * @property {module:model/DatabaseExtensions}
     */
    DatabaseExtensions,

    /**
     * The DatabaseInstance model constructor.
     * @property {module:model/DatabaseInstance}
     */
    DatabaseInstance,

    /**
     * The DatabaseType model constructor.
     * @property {module:model/DatabaseType}
     */
    DatabaseType,

    /**
     * The DatabaseTypeRequirements model constructor.
     * @property {module:model/DatabaseTypeRequirements}
     */
    DatabaseTypeRequirements,

    /**
     * The Db model constructor.
     * @property {module:model/Db}
     */
    Db,

    /**
     * The DbDiskStats model constructor.
     * @property {module:model/DbDiskStats}
     */
    DbDiskStats,

    /**
     * The DbExtension model constructor.
     * @property {module:model/DbExtension}
     */
    DbExtension,

    /**
     * The DbParametersByType model constructor.
     * @property {module:model/DbParametersByType}
     */
    DbParametersByType,

    /**
     * The DbPrivilegeGroup model constructor.
     * @property {module:model/DbPrivilegeGroup}
     */
    DbPrivilegeGroup,

    /**
     * The DbReplication model constructor.
     * @property {module:model/DbReplication}
     */
    DbReplication,

    /**
     * The DbType model constructor.
     * @property {module:model/DbType}
     */
    DbType,

    /**
     * The DbsCreateBackup model constructor.
     * @property {module:model/DbsCreateBackup}
     */
    DbsCreateBackup,

    /**
     * The DbsUpdateBackup model constructor.
     * @property {module:model/DbsUpdateBackup}
     */
    DbsUpdateBackup,

    /**
     * The DedicatedServer model constructor.
     * @property {module:model/DedicatedServer}
     */
    DedicatedServer,

    /**
     * The DedicatedServerAdditionalService model constructor.
     * @property {module:model/DedicatedServerAdditionalService}
     */
    DedicatedServerAdditionalService,

    /**
     * The DedicatedServerPreset model constructor.
     * @property {module:model/DedicatedServerPreset}
     */
    DedicatedServerPreset,

    /**
     * The DedicatedServerPresetCpu model constructor.
     * @property {module:model/DedicatedServerPresetCpu}
     */
    DedicatedServerPresetCpu,

    /**
     * The DedicatedServerPresetDisk model constructor.
     * @property {module:model/DedicatedServerPresetDisk}
     */
    DedicatedServerPresetDisk,

    /**
     * The DedicatedServerPresetMemory model constructor.
     * @property {module:model/DedicatedServerPresetMemory}
     */
    DedicatedServerPresetMemory,

    /**
     * The DeleteAgent model constructor.
     * @property {module:model/DeleteAgent}
     */
    DeleteAgent,

    /**
     * The DeleteBalancer200Response model constructor.
     * @property {module:model/DeleteBalancer200Response}
     */
    DeleteBalancer200Response,

    /**
     * The DeleteCluster200Response model constructor.
     * @property {module:model/DeleteCluster200Response}
     */
    DeleteCluster200Response,

    /**
     * The DeleteCountriesFromAllowedList200Response model constructor.
     * @property {module:model/DeleteCountriesFromAllowedList200Response}
     */
    DeleteCountriesFromAllowedList200Response,

    /**
     * The DeleteCountriesFromAllowedListRequest model constructor.
     * @property {module:model/DeleteCountriesFromAllowedListRequest}
     */
    DeleteCountriesFromAllowedListRequest,

    /**
     * The DeleteDatabaseCluster200Response model constructor.
     * @property {module:model/DeleteDatabaseCluster200Response}
     */
    DeleteDatabaseCluster200Response,

    /**
     * The DeleteDatabaseCluster200ResponseDatabaseDelete model constructor.
     * @property {module:model/DeleteDatabaseCluster200ResponseDatabaseDelete}
     */
    DeleteDatabaseCluster200ResponseDatabaseDelete,

    /**
     * The DeleteIPsFromAllowedList200Response model constructor.
     * @property {module:model/DeleteIPsFromAllowedList200Response}
     */
    DeleteIPsFromAllowedList200Response,

    /**
     * The DeleteIPsFromAllowedListRequest model constructor.
     * @property {module:model/DeleteIPsFromAllowedListRequest}
     */
    DeleteIPsFromAllowedListRequest,

    /**
     * The DeleteServer200Response model constructor.
     * @property {module:model/DeleteServer200Response}
     */
    DeleteServer200Response,

    /**
     * The DeleteServerIPRequest model constructor.
     * @property {module:model/DeleteServerIPRequest}
     */
    DeleteServerIPRequest,

    /**
     * The DeleteServiceResponse model constructor.
     * @property {module:model/DeleteServiceResponse}
     */
    DeleteServiceResponse,

    /**
     * The DeleteStorage200Response model constructor.
     * @property {module:model/DeleteStorage200Response}
     */
    DeleteStorage200Response,

    /**
     * The Deploy model constructor.
     * @property {module:model/Deploy}
     */
    Deploy,

    /**
     * The DeploySettingsInner model constructor.
     * @property {module:model/DeploySettingsInner}
     */
    DeploySettingsInner,

    /**
     * The DeployStatus model constructor.
     * @property {module:model/DeployStatus}
     */
    DeployStatus,

    /**
     * The DnatIn model constructor.
     * @property {module:model/DnatIn}
     */
    DnatIn,

    /**
     * The DnatInLocal model constructor.
     * @property {module:model/DnatInLocal}
     */
    DnatInLocal,

    /**
     * The DnatInPublic model constructor.
     * @property {module:model/DnatInPublic}
     */
    DnatInPublic,

    /**
     * The DnatRuleOut model constructor.
     * @property {module:model/DnatRuleOut}
     */
    DnatRuleOut,

    /**
     * The DnatRuleResponse model constructor.
     * @property {module:model/DnatRuleResponse}
     */
    DnatRuleResponse,

    /**
     * The DnatRulesResponse model constructor.
     * @property {module:model/DnatRulesResponse}
     */
    DnatRulesResponse,

    /**
     * The DnsRecord model constructor.
     * @property {module:model/DnsRecord}
     */
    DnsRecord,

    /**
     * The DnsRecordData model constructor.
     * @property {module:model/DnsRecordData}
     */
    DnsRecordData,

    /**
     * The DnsRecordV2 model constructor.
     * @property {module:model/DnsRecordV2}
     */
    DnsRecordV2,

    /**
     * The DnsRecordV2Data model constructor.
     * @property {module:model/DnsRecordV2Data}
     */
    DnsRecordV2Data,

    /**
     * The Document model constructor.
     * @property {module:model/Document}
     */
    Document,

    /**
     * The DocumentStatusInfo model constructor.
     * @property {module:model/DocumentStatusInfo}
     */
    DocumentStatusInfo,

    /**
     * The DocumentStatusInfoDetails model constructor.
     * @property {module:model/DocumentStatusInfoDetails}
     */
    DocumentStatusInfoDetails,

    /**
     * The Domain model constructor.
     * @property {module:model/Domain}
     */
    Domain,

    /**
     * The DomainAllowedBuyPeriodsInner model constructor.
     * @property {module:model/DomainAllowedBuyPeriodsInner}
     */
    DomainAllowedBuyPeriodsInner,

    /**
     * The DomainInfo model constructor.
     * @property {module:model/DomainInfo}
     */
    DomainInfo,

    /**
     * The DomainNameServer model constructor.
     * @property {module:model/DomainNameServer}
     */
    DomainNameServer,

    /**
     * The DomainNameServerItemsInner model constructor.
     * @property {module:model/DomainNameServerItemsInner}
     */
    DomainNameServerItemsInner,

    /**
     * The DomainPaymentPeriod model constructor.
     * @property {module:model/DomainPaymentPeriod}
     */
    DomainPaymentPeriod,

    /**
     * The DomainPrimeType model constructor.
     * @property {module:model/DomainPrimeType}
     */
    DomainPrimeType,

    /**
     * The DomainProlong model constructor.
     * @property {module:model/DomainProlong}
     */
    DomainProlong,

    /**
     * The DomainRegister model constructor.
     * @property {module:model/DomainRegister}
     */
    DomainRegister,

    /**
     * The DomainRequest model constructor.
     * @property {module:model/DomainRequest}
     */
    DomainRequest,

    /**
     * The DomainTransfer model constructor.
     * @property {module:model/DomainTransfer}
     */
    DomainTransfer,

    /**
     * The ErrorResponse model constructor.
     * @property {module:model/ErrorResponse}
     */
    ErrorResponse,

    /**
     * The ExportAgentChatsCsv200Response model constructor.
     * @property {module:model/ExportAgentChatsCsv200Response}
     */
    ExportAgentChatsCsv200Response,

    /**
     * The Finances model constructor.
     * @property {module:model/Finances}
     */
    Finances,

    /**
     * The FirewallGroup model constructor.
     * @property {module:model/FirewallGroup}
     */
    FirewallGroup,

    /**
     * The FirewallGroupInAPI model constructor.
     * @property {module:model/FirewallGroupInAPI}
     */
    FirewallGroupInAPI,

    /**
     * The FirewallGroupOutResponse model constructor.
     * @property {module:model/FirewallGroupOutResponse}
     */
    FirewallGroupOutResponse,

    /**
     * The FirewallGroupResource model constructor.
     * @property {module:model/FirewallGroupResource}
     */
    FirewallGroupResource,

    /**
     * The FirewallGroupResourceOutResponse model constructor.
     * @property {module:model/FirewallGroupResourceOutResponse}
     */
    FirewallGroupResourceOutResponse,

    /**
     * The FirewallGroupResourcesOutResponse model constructor.
     * @property {module:model/FirewallGroupResourcesOutResponse}
     */
    FirewallGroupResourcesOutResponse,

    /**
     * The FirewallGroupsOutResponse model constructor.
     * @property {module:model/FirewallGroupsOutResponse}
     */
    FirewallGroupsOutResponse,

    /**
     * The FirewallRule model constructor.
     * @property {module:model/FirewallRule}
     */
    FirewallRule,

    /**
     * The FirewallRuleDirection model constructor.
     * @property {module:model/FirewallRuleDirection}
     */
    FirewallRuleDirection,

    /**
     * The FirewallRuleInAPI model constructor.
     * @property {module:model/FirewallRuleInAPI}
     */
    FirewallRuleInAPI,

    /**
     * The FirewallRuleOutResponse model constructor.
     * @property {module:model/FirewallRuleOutResponse}
     */
    FirewallRuleOutResponse,

    /**
     * The FirewallRuleProtocol model constructor.
     * @property {module:model/FirewallRuleProtocol}
     */
    FirewallRuleProtocol,

    /**
     * The FirewallRulesOutResponse model constructor.
     * @property {module:model/FirewallRulesOutResponse}
     */
    FirewallRulesOutResponse,

    /**
     * The FloatingIp model constructor.
     * @property {module:model/FloatingIp}
     */
    FloatingIp,

    /**
     * The ForwardIsDisabled model constructor.
     * @property {module:model/ForwardIsDisabled}
     */
    ForwardIsDisabled,

    /**
     * The ForwardIsEnabled model constructor.
     * @property {module:model/ForwardIsEnabled}
     */
    ForwardIsEnabled,

    /**
     * The ForwardingIncomingIsDisabled model constructor.
     * @property {module:model/ForwardingIncomingIsDisabled}
     */
    ForwardingIncomingIsDisabled,

    /**
     * The ForwardingIncomingIsEnabled model constructor.
     * @property {module:model/ForwardingIncomingIsEnabled}
     */
    ForwardingIncomingIsEnabled,

    /**
     * The ForwardingOutgoingIsDisabled model constructor.
     * @property {module:model/ForwardingOutgoingIsDisabled}
     */
    ForwardingOutgoingIsDisabled,

    /**
     * The ForwardingOutgoingIsEnabled model constructor.
     * @property {module:model/ForwardingOutgoingIsEnabled}
     */
    ForwardingOutgoingIsEnabled,

    /**
     * The Frameworks model constructor.
     * @property {module:model/Frameworks}
     */
    Frameworks,

    /**
     * The Free model constructor.
     * @property {module:model/Free}
     */
    Free,

    /**
     * The GetAccountStatus200Response model constructor.
     * @property {module:model/GetAccountStatus200Response}
     */
    GetAccountStatus200Response,

    /**
     * The GetAccountStatus403Response model constructor.
     * @property {module:model/GetAccountStatus403Response}
     */
    GetAccountStatus403Response,

    /**
     * The GetAgentBotMaxBots200Response model constructor.
     * @property {module:model/GetAgentBotMaxBots200Response}
     */
    GetAgentBotMaxBots200Response,

    /**
     * The GetAgentBotMaxBots200ResponseMeta model constructor.
     * @property {module:model/GetAgentBotMaxBots200ResponseMeta}
     */
    GetAgentBotMaxBots200ResponseMeta,

    /**
     * The GetAgentBotMaxBotsByAgent200Response model constructor.
     * @property {module:model/GetAgentBotMaxBotsByAgent200Response}
     */
    GetAgentBotMaxBotsByAgent200Response,

    /**
     * The GetAgentBotMaxBotsByAgent200ResponseMeta model constructor.
     * @property {module:model/GetAgentBotMaxBotsByAgent200ResponseMeta}
     */
    GetAgentBotMaxBotsByAgent200ResponseMeta,

    /**
     * The GetAgentBotTelegramBots200Response model constructor.
     * @property {module:model/GetAgentBotTelegramBots200Response}
     */
    GetAgentBotTelegramBots200Response,

    /**
     * The GetAgentBotTelegramBots200ResponseMeta model constructor.
     * @property {module:model/GetAgentBotTelegramBots200ResponseMeta}
     */
    GetAgentBotTelegramBots200ResponseMeta,

    /**
     * The GetAgentBotTelegramBotsByAgent200Response model constructor.
     * @property {module:model/GetAgentBotTelegramBotsByAgent200Response}
     */
    GetAgentBotTelegramBotsByAgent200Response,

    /**
     * The GetAgentBotTelegramBotsByAgent200ResponseMeta model constructor.
     * @property {module:model/GetAgentBotTelegramBotsByAgent200ResponseMeta}
     */
    GetAgentBotTelegramBotsByAgent200ResponseMeta,

    /**
     * The GetAgentChatList200Response model constructor.
     * @property {module:model/GetAgentChatList200Response}
     */
    GetAgentChatList200Response,

    /**
     * The GetAgentChatList200ResponseMeta model constructor.
     * @property {module:model/GetAgentChatList200ResponseMeta}
     */
    GetAgentChatList200ResponseMeta,

    /**
     * The GetAgentChatMessages200Response model constructor.
     * @property {module:model/GetAgentChatMessages200Response}
     */
    GetAgentChatMessages200Response,

    /**
     * The GetAgentChatMessages200ResponseMeta model constructor.
     * @property {module:model/GetAgentChatMessages200ResponseMeta}
     */
    GetAgentChatMessages200ResponseMeta,

    /**
     * The GetAgentEntityLimits200Response model constructor.
     * @property {module:model/GetAgentEntityLimits200Response}
     */
    GetAgentEntityLimits200Response,

    /**
     * The GetAgentEntityLimits200ResponseMeta model constructor.
     * @property {module:model/GetAgentEntityLimits200ResponseMeta}
     */
    GetAgentEntityLimits200ResponseMeta,

    /**
     * The GetAgentIntegrationCrisp200Response model constructor.
     * @property {module:model/GetAgentIntegrationCrisp200Response}
     */
    GetAgentIntegrationCrisp200Response,

    /**
     * The GetAgentIntegrationJivo200Response model constructor.
     * @property {module:model/GetAgentIntegrationJivo200Response}
     */
    GetAgentIntegrationJivo200Response,

    /**
     * The GetAgentSkill200Response model constructor.
     * @property {module:model/GetAgentSkill200Response}
     */
    GetAgentSkill200Response,

    /**
     * The GetAgentSkillCatalog200Response model constructor.
     * @property {module:model/GetAgentSkillCatalog200Response}
     */
    GetAgentSkillCatalog200Response,

    /**
     * The GetAgentSkillCatalog200ResponseMeta model constructor.
     * @property {module:model/GetAgentSkillCatalog200ResponseMeta}
     */
    GetAgentSkillCatalog200ResponseMeta,

    /**
     * The GetAgentSkillLibrary200Response model constructor.
     * @property {module:model/GetAgentSkillLibrary200Response}
     */
    GetAgentSkillLibrary200Response,

    /**
     * The GetAgentSkillLibrary200ResponseMeta model constructor.
     * @property {module:model/GetAgentSkillLibrary200ResponseMeta}
     */
    GetAgentSkillLibrary200ResponseMeta,

    /**
     * The GetAgentSkillVersion200Response model constructor.
     * @property {module:model/GetAgentSkillVersion200Response}
     */
    GetAgentSkillVersion200Response,

    /**
     * The GetAgentSkillVersions200Response model constructor.
     * @property {module:model/GetAgentSkillVersions200Response}
     */
    GetAgentSkillVersions200Response,

    /**
     * The GetAgentSkillVersions200ResponseMeta model constructor.
     * @property {module:model/GetAgentSkillVersions200ResponseMeta}
     */
    GetAgentSkillVersions200ResponseMeta,

    /**
     * The GetAgentSkillsForAgent200Response model constructor.
     * @property {module:model/GetAgentSkillsForAgent200Response}
     */
    GetAgentSkillsForAgent200Response,

    /**
     * The GetAgentSkillsForAgent200ResponseMeta model constructor.
     * @property {module:model/GetAgentSkillsForAgent200ResponseMeta}
     */
    GetAgentSkillsForAgent200ResponseMeta,

    /**
     * The GetAgentStatistics200Response model constructor.
     * @property {module:model/GetAgentStatistics200Response}
     */
    GetAgentStatistics200Response,

    /**
     * The GetAgentStatistics200ResponseMeta model constructor.
     * @property {module:model/GetAgentStatistics200ResponseMeta}
     */
    GetAgentStatistics200ResponseMeta,

    /**
     * The GetAgentToolTemplatePrices200Response model constructor.
     * @property {module:model/GetAgentToolTemplatePrices200Response}
     */
    GetAgentToolTemplatePrices200Response,

    /**
     * The GetAgentToolTemplates200Response model constructor.
     * @property {module:model/GetAgentToolTemplates200Response}
     */
    GetAgentToolTemplates200Response,

    /**
     * The GetAgentToolTemplates200ResponseMeta model constructor.
     * @property {module:model/GetAgentToolTemplates200ResponseMeta}
     */
    GetAgentToolTemplates200ResponseMeta,

    /**
     * The GetAgentTools200Response model constructor.
     * @property {module:model/GetAgentTools200Response}
     */
    GetAgentTools200Response,

    /**
     * The GetAgentTools200ResponseMeta model constructor.
     * @property {module:model/GetAgentTools200ResponseMeta}
     */
    GetAgentTools200ResponseMeta,

    /**
     * The GetAgentToolsByAgent200Response model constructor.
     * @property {module:model/GetAgentToolsByAgent200Response}
     */
    GetAgentToolsByAgent200Response,

    /**
     * The GetAgentToolsByAgent200ResponseMeta model constructor.
     * @property {module:model/GetAgentToolsByAgent200ResponseMeta}
     */
    GetAgentToolsByAgent200ResponseMeta,

    /**
     * The GetAgentV3200Response model constructor.
     * @property {module:model/GetAgentV3200Response}
     */
    GetAgentV3200Response,

    /**
     * The GetAgents200Response model constructor.
     * @property {module:model/GetAgents200Response}
     */
    GetAgents200Response,

    /**
     * The GetAgents200ResponseMeta model constructor.
     * @property {module:model/GetAgents200ResponseMeta}
     */
    GetAgents200ResponseMeta,

    /**
     * The GetAgentsTokenPackages200Response model constructor.
     * @property {module:model/GetAgentsTokenPackages200Response}
     */
    GetAgentsTokenPackages200Response,

    /**
     * The GetAgentsTokenPackages200ResponseMeta model constructor.
     * @property {module:model/GetAgentsTokenPackages200ResponseMeta}
     */
    GetAgentsTokenPackages200ResponseMeta,

    /**
     * The GetAgentsV3200Response model constructor.
     * @property {module:model/GetAgentsV3200Response}
     */
    GetAgentsV3200Response,

    /**
     * The GetAiKeyCallsStatistic200Response model constructor.
     * @property {module:model/GetAiKeyCallsStatistic200Response}
     */
    GetAiKeyCallsStatistic200Response,

    /**
     * The GetAiKeyLimits200Response model constructor.
     * @property {module:model/GetAiKeyLimits200Response}
     */
    GetAiKeyLimits200Response,

    /**
     * The GetAiKeyLimits200ResponseMeta model constructor.
     * @property {module:model/GetAiKeyLimits200ResponseMeta}
     */
    GetAiKeyLimits200ResponseMeta,

    /**
     * The GetAiKeyModelsStatistic200Response model constructor.
     * @property {module:model/GetAiKeyModelsStatistic200Response}
     */
    GetAiKeyModelsStatistic200Response,

    /**
     * The GetAiKeyModelsStatistic200ResponseMeta model constructor.
     * @property {module:model/GetAiKeyModelsStatistic200ResponseMeta}
     */
    GetAiKeyModelsStatistic200ResponseMeta,

    /**
     * The GetAiKeyTokenUsageStatistic200Response model constructor.
     * @property {module:model/GetAiKeyTokenUsageStatistic200Response}
     */
    GetAiKeyTokenUsageStatistic200Response,

    /**
     * The GetAiKeyTokenUsageStatistic200ResponseMeta model constructor.
     * @property {module:model/GetAiKeyTokenUsageStatistic200ResponseMeta}
     */
    GetAiKeyTokenUsageStatistic200ResponseMeta,

    /**
     * The GetAiKeys200Response model constructor.
     * @property {module:model/GetAiKeys200Response}
     */
    GetAiKeys200Response,

    /**
     * The GetAiKeys200ResponseMeta model constructor.
     * @property {module:model/GetAiKeys200ResponseMeta}
     */
    GetAiKeys200ResponseMeta,

    /**
     * The GetAiModelParameters200Response model constructor.
     * @property {module:model/GetAiModelParameters200Response}
     */
    GetAiModelParameters200Response,

    /**
     * The GetAiModelParameters200ResponseMeta model constructor.
     * @property {module:model/GetAiModelParameters200ResponseMeta}
     */
    GetAiModelParameters200ResponseMeta,

    /**
     * The GetAiModelTokenPackages200Response model constructor.
     * @property {module:model/GetAiModelTokenPackages200Response}
     */
    GetAiModelTokenPackages200Response,

    /**
     * The GetAiModelTokenPackages200ResponseMeta model constructor.
     * @property {module:model/GetAiModelTokenPackages200ResponseMeta}
     */
    GetAiModelTokenPackages200ResponseMeta,

    /**
     * The GetAiProvider200Response model constructor.
     * @property {module:model/GetAiProvider200Response}
     */
    GetAiProvider200Response,

    /**
     * The GetAiProviders200Response model constructor.
     * @property {module:model/GetAiProviders200Response}
     */
    GetAiProviders200Response,

    /**
     * The GetAiProviders200ResponseMeta model constructor.
     * @property {module:model/GetAiProviders200ResponseMeta}
     */
    GetAiProviders200ResponseMeta,

    /**
     * The GetAiSolutionChatStatus200Response model constructor.
     * @property {module:model/GetAiSolutionChatStatus200Response}
     */
    GetAiSolutionChatStatus200Response,

    /**
     * The GetAiSolutionMainChatHistory200Response model constructor.
     * @property {module:model/GetAiSolutionMainChatHistory200Response}
     */
    GetAiSolutionMainChatHistory200Response,

    /**
     * The GetAllMailboxesV2200Response model constructor.
     * @property {module:model/GetAllMailboxesV2200Response}
     */
    GetAllMailboxesV2200Response,

    /**
     * The GetAllProjectResources200Response model constructor.
     * @property {module:model/GetAllProjectResources200Response}
     */
    GetAllProjectResources200Response,

    /**
     * The GetAppDeploys200Response model constructor.
     * @property {module:model/GetAppDeploys200Response}
     */
    GetAppDeploys200Response,

    /**
     * The GetAppLogs200Response model constructor.
     * @property {module:model/GetAppLogs200Response}
     */
    GetAppLogs200Response,

    /**
     * The GetApps200Response model constructor.
     * @property {module:model/GetApps200Response}
     */
    GetApps200Response,

    /**
     * The GetAuthAccessSettings200Response model constructor.
     * @property {module:model/GetAuthAccessSettings200Response}
     */
    GetAuthAccessSettings200Response,

    /**
     * The GetAuthAccessSettings200ResponseWhiteList model constructor.
     * @property {module:model/GetAuthAccessSettings200ResponseWhiteList}
     */
    GetAuthAccessSettings200ResponseWhiteList,

    /**
     * The GetBalancerIPs200Response model constructor.
     * @property {module:model/GetBalancerIPs200Response}
     */
    GetBalancerIPs200Response,

    /**
     * The GetBalancerRules200Response model constructor.
     * @property {module:model/GetBalancerRules200Response}
     */
    GetBalancerRules200Response,

    /**
     * The GetBalancers200Response model constructor.
     * @property {module:model/GetBalancers200Response}
     */
    GetBalancers200Response,

    /**
     * The GetBalancersPresets200Response model constructor.
     * @property {module:model/GetBalancersPresets200Response}
     */
    GetBalancersPresets200Response,

    /**
     * The GetBranches200Response model constructor.
     * @property {module:model/GetBranches200Response}
     */
    GetBranches200Response,

    /**
     * The GetCdnCertificateTasks200Response model constructor.
     * @property {module:model/GetCdnCertificateTasks200Response}
     */
    GetCdnCertificateTasks200Response,

    /**
     * The GetCdnCertificates200Response model constructor.
     * @property {module:model/GetCdnCertificates200Response}
     */
    GetCdnCertificates200Response,

    /**
     * The GetCdnOriginNodes200Response model constructor.
     * @property {module:model/GetCdnOriginNodes200Response}
     */
    GetCdnOriginNodes200Response,

    /**
     * The GetCdnPresets200Response model constructor.
     * @property {module:model/GetCdnPresets200Response}
     */
    GetCdnPresets200Response,

    /**
     * The GetCdnResourceConfiguration200Response model constructor.
     * @property {module:model/GetCdnResourceConfiguration200Response}
     */
    GetCdnResourceConfiguration200Response,

    /**
     * The GetCdnResourceNodes200Response model constructor.
     * @property {module:model/GetCdnResourceNodes200Response}
     */
    GetCdnResourceNodes200Response,

    /**
     * The GetCdnResourceStatistics200Response model constructor.
     * @property {module:model/GetCdnResourceStatistics200Response}
     */
    GetCdnResourceStatistics200Response,

    /**
     * The GetCdnResources200Response model constructor.
     * @property {module:model/GetCdnResources200Response}
     */
    GetCdnResources200Response,

    /**
     * The GetCommits200Response model constructor.
     * @property {module:model/GetCommits200Response}
     */
    GetCommits200Response,

    /**
     * The GetConfigurators200Response model constructor.
     * @property {module:model/GetConfigurators200Response}
     */
    GetConfigurators200Response,

    /**
     * The GetCountries200Response model constructor.
     * @property {module:model/GetCountries200Response}
     */
    GetCountries200Response,

    /**
     * The GetDatabaseAutoBackupsSettings200Response model constructor.
     * @property {module:model/GetDatabaseAutoBackupsSettings200Response}
     */
    GetDatabaseAutoBackupsSettings200Response,

    /**
     * The GetDatabaseBackup200Response model constructor.
     * @property {module:model/GetDatabaseBackup200Response}
     */
    GetDatabaseBackup200Response,

    /**
     * The GetDatabaseBackups200Response model constructor.
     * @property {module:model/GetDatabaseBackups200Response}
     */
    GetDatabaseBackups200Response,

    /**
     * The GetDatabaseClusterReplicas200Response model constructor.
     * @property {module:model/GetDatabaseClusterReplicas200Response}
     */
    GetDatabaseClusterReplicas200Response,

    /**
     * The GetDatabaseClusterTypes200Response model constructor.
     * @property {module:model/GetDatabaseClusterTypes200Response}
     */
    GetDatabaseClusterTypes200Response,

    /**
     * The GetDatabaseClusters200Response model constructor.
     * @property {module:model/GetDatabaseClusters200Response}
     */
    GetDatabaseClusters200Response,

    /**
     * The GetDatabaseConfigurators200Response model constructor.
     * @property {module:model/GetDatabaseConfigurators200Response}
     */
    GetDatabaseConfigurators200Response,

    /**
     * The GetDatabaseDefaultParameters200Response model constructor.
     * @property {module:model/GetDatabaseDefaultParameters200Response}
     */
    GetDatabaseDefaultParameters200Response,

    /**
     * The GetDatabaseDefaultParameters200ResponseConfigParams model constructor.
     * @property {module:model/GetDatabaseDefaultParameters200ResponseConfigParams}
     */
    GetDatabaseDefaultParameters200ResponseConfigParams,

    /**
     * The GetDatabaseInstances200Response model constructor.
     * @property {module:model/GetDatabaseInstances200Response}
     */
    GetDatabaseInstances200Response,

    /**
     * The GetDatabasePreset200Response model constructor.
     * @property {module:model/GetDatabasePreset200Response}
     */
    GetDatabasePreset200Response,

    /**
     * The GetDatabasePrivileges200Response model constructor.
     * @property {module:model/GetDatabasePrivileges200Response}
     */
    GetDatabasePrivileges200Response,

    /**
     * The GetDatabaseS3Backups200Response model constructor.
     * @property {module:model/GetDatabaseS3Backups200Response}
     */
    GetDatabaseS3Backups200Response,

    /**
     * The GetDatabaseUsers200Response model constructor.
     * @property {module:model/GetDatabaseUsers200Response}
     */
    GetDatabaseUsers200Response,

    /**
     * The GetDatabasesPresets200Response model constructor.
     * @property {module:model/GetDatabasesPresets200Response}
     */
    GetDatabasesPresets200Response,

    /**
     * The GetDedicatedServerPresetAdditionalServices200Response model constructor.
     * @property {module:model/GetDedicatedServerPresetAdditionalServices200Response}
     */
    GetDedicatedServerPresetAdditionalServices200Response,

    /**
     * The GetDedicatedServers200Response model constructor.
     * @property {module:model/GetDedicatedServers200Response}
     */
    GetDedicatedServers200Response,

    /**
     * The GetDedicatedServersPresets200Response model constructor.
     * @property {module:model/GetDedicatedServersPresets200Response}
     */
    GetDedicatedServersPresets200Response,

    /**
     * The GetDeployLogs200Response model constructor.
     * @property {module:model/GetDeployLogs200Response}
     */
    GetDeployLogs200Response,

    /**
     * The GetDeploySettings200Response model constructor.
     * @property {module:model/GetDeploySettings200Response}
     */
    GetDeploySettings200Response,

    /**
     * The GetDomain200Response model constructor.
     * @property {module:model/GetDomain200Response}
     */
    GetDomain200Response,

    /**
     * The GetDomainDNSRecords200Response model constructor.
     * @property {module:model/GetDomainDNSRecords200Response}
     */
    GetDomainDNSRecords200Response,

    /**
     * The GetDomainMailInfo200Response model constructor.
     * @property {module:model/GetDomainMailInfo200Response}
     */
    GetDomainMailInfo200Response,

    /**
     * The GetDomainNameServers200Response model constructor.
     * @property {module:model/GetDomainNameServers200Response}
     */
    GetDomainNameServers200Response,

    /**
     * The GetDomainRequests200Response model constructor.
     * @property {module:model/GetDomainRequests200Response}
     */
    GetDomainRequests200Response,

    /**
     * The GetDomains200Response model constructor.
     * @property {module:model/GetDomains200Response}
     */
    GetDomains200Response,

    /**
     * The GetFinances200Response model constructor.
     * @property {module:model/GetFinances200Response}
     */
    GetFinances200Response,

    /**
     * The GetFinances400Response model constructor.
     * @property {module:model/GetFinances400Response}
     */
    GetFinances400Response,

    /**
     * The GetFinances401Response model constructor.
     * @property {module:model/GetFinances401Response}
     */
    GetFinances401Response,

    /**
     * The GetFinances429Response model constructor.
     * @property {module:model/GetFinances429Response}
     */
    GetFinances429Response,

    /**
     * The GetFinances500Response model constructor.
     * @property {module:model/GetFinances500Response}
     */
    GetFinances500Response,

    /**
     * The GetFloatingIps200Response model constructor.
     * @property {module:model/GetFloatingIps200Response}
     */
    GetFloatingIps200Response,

    /**
     * The GetImage404Response model constructor.
     * @property {module:model/GetImage404Response}
     */
    GetImage404Response,

    /**
     * The GetKey200Response model constructor.
     * @property {module:model/GetKey200Response}
     */
    GetKey200Response,

    /**
     * The GetKeys200Response model constructor.
     * @property {module:model/GetKeys200Response}
     */
    GetKeys200Response,

    /**
     * The GetKnowledgebaseDocumentsV2200Response model constructor.
     * @property {module:model/GetKnowledgebaseDocumentsV2200Response}
     */
    GetKnowledgebaseDocumentsV2200Response,

    /**
     * The GetKnowledgebaseDocumentsV2200ResponseMeta model constructor.
     * @property {module:model/GetKnowledgebaseDocumentsV2200ResponseMeta}
     */
    GetKnowledgebaseDocumentsV2200ResponseMeta,

    /**
     * The GetKnowledgebaseV3200Response model constructor.
     * @property {module:model/GetKnowledgebaseV3200Response}
     */
    GetKnowledgebaseV3200Response,

    /**
     * The GetKnowledgebases200Response model constructor.
     * @property {module:model/GetKnowledgebases200Response}
     */
    GetKnowledgebases200Response,

    /**
     * The GetKnowledgebasesTokenPackages200Response model constructor.
     * @property {module:model/GetKnowledgebasesTokenPackages200Response}
     */
    GetKnowledgebasesTokenPackages200Response,

    /**
     * The GetKnowledgebasesTokenPackages200ResponseMeta model constructor.
     * @property {module:model/GetKnowledgebasesTokenPackages200ResponseMeta}
     */
    GetKnowledgebasesTokenPackages200ResponseMeta,

    /**
     * The GetKnowledgebasesV2200Response model constructor.
     * @property {module:model/GetKnowledgebasesV2200Response}
     */
    GetKnowledgebasesV2200Response,

    /**
     * The GetKnowledgebasesV3200Response model constructor.
     * @property {module:model/GetKnowledgebasesV3200Response}
     */
    GetKnowledgebasesV3200Response,

    /**
     * The GetKnowledgebasesV3200ResponseMeta model constructor.
     * @property {module:model/GetKnowledgebasesV3200ResponseMeta}
     */
    GetKnowledgebasesV3200ResponseMeta,

    /**
     * The GetLocations200Response model constructor.
     * @property {module:model/GetLocations200Response}
     */
    GetLocations200Response,

    /**
     * The GetMailboxes200Response model constructor.
     * @property {module:model/GetMailboxes200Response}
     */
    GetMailboxes200Response,

    /**
     * The GetModels200Response model constructor.
     * @property {module:model/GetModels200Response}
     */
    GetModels200Response,

    /**
     * The GetModelsV3200Response model constructor.
     * @property {module:model/GetModelsV3200Response}
     */
    GetModelsV3200Response,

    /**
     * The GetModelsV3200ResponseMeta model constructor.
     * @property {module:model/GetModelsV3200ResponseMeta}
     */
    GetModelsV3200ResponseMeta,

    /**
     * The GetNetworkDrives200Response model constructor.
     * @property {module:model/GetNetworkDrives200Response}
     */
    GetNetworkDrives200Response,

    /**
     * The GetNetworkDrivesAvailableResources200Response model constructor.
     * @property {module:model/GetNetworkDrivesAvailableResources200Response}
     */
    GetNetworkDrivesAvailableResources200Response,

    /**
     * The GetNetworkDrivesPresets200Response model constructor.
     * @property {module:model/GetNetworkDrivesPresets200Response}
     */
    GetNetworkDrivesPresets200Response,

    /**
     * The GetNotificationSettings200Response model constructor.
     * @property {module:model/GetNotificationSettings200Response}
     */
    GetNotificationSettings200Response,

    /**
     * The GetOsList200Response model constructor.
     * @property {module:model/GetOsList200Response}
     */
    GetOsList200Response,

    /**
     * The GetPersons200Response model constructor.
     * @property {module:model/GetPersons200Response}
     */
    GetPersons200Response,

    /**
     * The GetProjectBalancers200Response model constructor.
     * @property {module:model/GetProjectBalancers200Response}
     */
    GetProjectBalancers200Response,

    /**
     * The GetProjectClusters200Response model constructor.
     * @property {module:model/GetProjectClusters200Response}
     */
    GetProjectClusters200Response,

    /**
     * The GetProjectDatabases200Response model constructor.
     * @property {module:model/GetProjectDatabases200Response}
     */
    GetProjectDatabases200Response,

    /**
     * The GetProjectDedicatedServers200Response model constructor.
     * @property {module:model/GetProjectDedicatedServers200Response}
     */
    GetProjectDedicatedServers200Response,

    /**
     * The GetProjectServers200Response model constructor.
     * @property {module:model/GetProjectServers200Response}
     */
    GetProjectServers200Response,

    /**
     * The GetProjectStorages200Response model constructor.
     * @property {module:model/GetProjectStorages200Response}
     */
    GetProjectStorages200Response,

    /**
     * The GetProjects200Response model constructor.
     * @property {module:model/GetProjects200Response}
     */
    GetProjects200Response,

    /**
     * The GetProviders200Response model constructor.
     * @property {module:model/GetProviders200Response}
     */
    GetProviders200Response,

    /**
     * The GetRepositories200Response model constructor.
     * @property {module:model/GetRepositories200Response}
     */
    GetRepositories200Response,

    /**
     * The GetRestorePoint200Response model constructor.
     * @property {module:model/GetRestorePoint200Response}
     */
    GetRestorePoint200Response,

    /**
     * The GetRestorePoints200Response model constructor.
     * @property {module:model/GetRestorePoints200Response}
     */
    GetRestorePoints200Response,

    /**
     * The GetServerDiskBackup200Response model constructor.
     * @property {module:model/GetServerDiskBackup200Response}
     */
    GetServerDiskBackup200Response,

    /**
     * The GetServerDiskBackups200Response model constructor.
     * @property {module:model/GetServerDiskBackups200Response}
     */
    GetServerDiskBackups200Response,

    /**
     * The GetServerDisks200Response model constructor.
     * @property {module:model/GetServerDisks200Response}
     */
    GetServerDisks200Response,

    /**
     * The GetServerIPs200Response model constructor.
     * @property {module:model/GetServerIPs200Response}
     */
    GetServerIPs200Response,

    /**
     * The GetServerLogs200Response model constructor.
     * @property {module:model/GetServerLogs200Response}
     */
    GetServerLogs200Response,

    /**
     * The GetServerStatistics200Response model constructor.
     * @property {module:model/GetServerStatistics200Response}
     */
    GetServerStatistics200Response,

    /**
     * The GetServerStatistics200ResponseCpuInner model constructor.
     * @property {module:model/GetServerStatistics200ResponseCpuInner}
     */
    GetServerStatistics200ResponseCpuInner,

    /**
     * The GetServerStatistics200ResponseDiskInner model constructor.
     * @property {module:model/GetServerStatistics200ResponseDiskInner}
     */
    GetServerStatistics200ResponseDiskInner,

    /**
     * The GetServerStatistics200ResponseNetworkTrafficInner model constructor.
     * @property {module:model/GetServerStatistics200ResponseNetworkTrafficInner}
     */
    GetServerStatistics200ResponseNetworkTrafficInner,

    /**
     * The GetServerStatistics200ResponseRamInner model constructor.
     * @property {module:model/GetServerStatistics200ResponseRamInner}
     */
    GetServerStatistics200ResponseRamInner,

    /**
     * The GetServerStatisticsNew200Response model constructor.
     * @property {module:model/GetServerStatisticsNew200Response}
     */
    GetServerStatisticsNew200Response,

    /**
     * The GetServers200Response model constructor.
     * @property {module:model/GetServers200Response}
     */
    GetServers200Response,

    /**
     * The GetServersPresets200Response model constructor.
     * @property {module:model/GetServersPresets200Response}
     */
    GetServersPresets200Response,

    /**
     * The GetServicePrices200Response model constructor.
     * @property {module:model/GetServicePrices200Response}
     */
    GetServicePrices200Response,

    /**
     * The GetServicePrices200ResponseMeta model constructor.
     * @property {module:model/GetServicePrices200ResponseMeta}
     */
    GetServicePrices200ResponseMeta,

    /**
     * The GetSoftware200Response model constructor.
     * @property {module:model/GetSoftware200Response}
     */
    GetSoftware200Response,

    /**
     * The GetStorageSubdomains200Response model constructor.
     * @property {module:model/GetStorageSubdomains200Response}
     */
    GetStorageSubdomains200Response,

    /**
     * The GetStorageTransferStatus200Response model constructor.
     * @property {module:model/GetStorageTransferStatus200Response}
     */
    GetStorageTransferStatus200Response,

    /**
     * The GetStorageUsers200Response model constructor.
     * @property {module:model/GetStorageUsers200Response}
     */
    GetStorageUsers200Response,

    /**
     * The GetStoragesPresets200Response model constructor.
     * @property {module:model/GetStoragesPresets200Response}
     */
    GetStoragesPresets200Response,

    /**
     * The GetTLD200Response model constructor.
     * @property {module:model/GetTLD200Response}
     */
    GetTLD200Response,

    /**
     * The GetTLDs200Response model constructor.
     * @property {module:model/GetTLDs200Response}
     */
    GetTLDs200Response,

    /**
     * The GetVPCPorts200Response model constructor.
     * @property {module:model/GetVPCPorts200Response}
     */
    GetVPCPorts200Response,

    /**
     * The GetVPCServices200Response model constructor.
     * @property {module:model/GetVPCServices200Response}
     */
    GetVPCServices200Response,

    /**
     * The GetVPCs200Response model constructor.
     * @property {module:model/GetVPCs200Response}
     */
    GetVPCs200Response,

    /**
     * The HttpResource model constructor.
     * @property {module:model/HttpResource}
     */
    HttpResource,

    /**
     * The HttpResourceConfig model constructor.
     * @property {module:model/HttpResourceConfig}
     */
    HttpResourceConfig,

    /**
     * The Image model constructor.
     * @property {module:model/Image}
     */
    Image,

    /**
     * The ImageDownload model constructor.
     * @property {module:model/ImageDownload}
     */
    ImageDownload,

    /**
     * The ImageDownloadResponse model constructor.
     * @property {module:model/ImageDownloadResponse}
     */
    ImageDownloadResponse,

    /**
     * The ImageDownloadsResponse model constructor.
     * @property {module:model/ImageDownloadsResponse}
     */
    ImageDownloadsResponse,

    /**
     * The ImageInAPI model constructor.
     * @property {module:model/ImageInAPI}
     */
    ImageInAPI,

    /**
     * The ImageOutResponse model constructor.
     * @property {module:model/ImageOutResponse}
     */
    ImageOutResponse,

    /**
     * The ImageStatus model constructor.
     * @property {module:model/ImageStatus}
     */
    ImageStatus,

    /**
     * The ImageUpdateAPI model constructor.
     * @property {module:model/ImageUpdateAPI}
     */
    ImageUpdateAPI,

    /**
     * The ImageUrlAuth model constructor.
     * @property {module:model/ImageUrlAuth}
     */
    ImageUrlAuth,

    /**
     * The ImageUrlIn model constructor.
     * @property {module:model/ImageUrlIn}
     */
    ImageUrlIn,

    /**
     * The ImagesOutResponse model constructor.
     * @property {module:model/ImagesOutResponse}
     */
    ImagesOutResponse,

    /**
     * The IncreaseNodes model constructor.
     * @property {module:model/IncreaseNodes}
     */
    IncreaseNodes,

    /**
     * The IndexingSchedule model constructor.
     * @property {module:model/IndexingSchedule}
     */
    IndexingSchedule,

    /**
     * The InfoServicePrice model constructor.
     * @property {module:model/InfoServicePrice}
     */
    InfoServicePrice,

    /**
     * The InitializeParams model constructor.
     * @property {module:model/InitializeParams}
     */
    InitializeParams,

    /**
     * The InitializeParamsClientInfo model constructor.
     * @property {module:model/InitializeParamsClientInfo}
     */
    InitializeParamsClientInfo,

    /**
     * The InitializeResult model constructor.
     * @property {module:model/InitializeResult}
     */
    InitializeResult,

    /**
     * The InitializeResultServerInfo model constructor.
     * @property {module:model/InitializeResultServerInfo}
     */
    InitializeResultServerInfo,

    /**
     * The InstallAgentSkillFromCatalog200Response model constructor.
     * @property {module:model/InstallAgentSkillFromCatalog200Response}
     */
    InstallAgentSkillFromCatalog200Response,

    /**
     * The InstallAgentSkillFromCatalog200ResponseMeta model constructor.
     * @property {module:model/InstallAgentSkillFromCatalog200ResponseMeta}
     */
    InstallAgentSkillFromCatalog200ResponseMeta,

    /**
     * The InstallAndConnectAgentSkill200Response model constructor.
     * @property {module:model/InstallAndConnectAgentSkill200Response}
     */
    InstallAndConnectAgentSkill200Response,

    /**
     * The InstallAndConnectSkill model constructor.
     * @property {module:model/InstallAndConnectSkill}
     */
    InstallAndConnectSkill,

    /**
     * The InstallTool model constructor.
     * @property {module:model/InstallTool}
     */
    InstallTool,

    /**
     * The Invoice model constructor.
     * @property {module:model/Invoice}
     */
    Invoice,

    /**
     * The Ip model constructor.
     * @property {module:model/Ip}
     */
    Ip,

    /**
     * The IssueCertificate model constructor.
     * @property {module:model/IssueCertificate}
     */
    IssueCertificate,

    /**
     * The JivoIntegration model constructor.
     * @property {module:model/JivoIntegration}
     */
    JivoIntegration,

    /**
     * The JsonRpcError model constructor.
     * @property {module:model/JsonRpcError}
     */
    JsonRpcError,

    /**
     * The JsonRpcErrorResponse model constructor.
     * @property {module:model/JsonRpcErrorResponse}
     */
    JsonRpcErrorResponse,

    /**
     * The JsonRpcNotification model constructor.
     * @property {module:model/JsonRpcNotification}
     */
    JsonRpcNotification,

    /**
     * The JsonRpcRequest model constructor.
     * @property {module:model/JsonRpcRequest}
     */
    JsonRpcRequest,

    /**
     * The JsonRpcResultResponse model constructor.
     * @property {module:model/JsonRpcResultResponse}
     */
    JsonRpcResultResponse,

    /**
     * The K8SVersionsResponse model constructor.
     * @property {module:model/K8SVersionsResponse}
     */
    K8SVersionsResponse,

    /**
     * The Kafka model constructor.
     * @property {module:model/Kafka}
     */
    Kafka,

    /**
     * The KafkaConfigParameters model constructor.
     * @property {module:model/KafkaConfigParameters}
     */
    KafkaConfigParameters,

    /**
     * The Knowledgebase model constructor.
     * @property {module:model/Knowledgebase}
     */
    Knowledgebase,

    /**
     * The KnowledgebaseAddTokenPackage model constructor.
     * @property {module:model/KnowledgebaseAddTokenPackage}
     */
    KnowledgebaseAddTokenPackage,

    /**
     * The KnowledgebaseV2 model constructor.
     * @property {module:model/KnowledgebaseV2}
     */
    KnowledgebaseV2,

    /**
     * The KnowledgebaseV3 model constructor.
     * @property {module:model/KnowledgebaseV3}
     */
    KnowledgebaseV3,

    /**
     * The LinkKnowledgebase model constructor.
     * @property {module:model/LinkKnowledgebase}
     */
    LinkKnowledgebase,

    /**
     * The ListAiSolutionConversations200Response model constructor.
     * @property {module:model/ListAiSolutionConversations200Response}
     */
    ListAiSolutionConversations200Response,

    /**
     * The ListAiSolutionTelegramBots200Response model constructor.
     * @property {module:model/ListAiSolutionTelegramBots200Response}
     */
    ListAiSolutionTelegramBots200Response,

    /**
     * The ListAiSolutionTypes200Response model constructor.
     * @property {module:model/ListAiSolutionTypes200Response}
     */
    ListAiSolutionTypes200Response,

    /**
     * The ListAiSolutions200Response model constructor.
     * @property {module:model/ListAiSolutions200Response}
     */
    ListAiSolutions200Response,

    /**
     * The Location model constructor.
     * @property {module:model/Location}
     */
    Location,

    /**
     * The LocationDto model constructor.
     * @property {module:model/LocationDto}
     */
    LocationDto,

    /**
     * The Mailbox model constructor.
     * @property {module:model/Mailbox}
     */
    Mailbox,

    /**
     * The MailboxAutoReply model constructor.
     * @property {module:model/MailboxAutoReply}
     */
    MailboxAutoReply,

    /**
     * The MailboxForwardingIncoming model constructor.
     * @property {module:model/MailboxForwardingIncoming}
     */
    MailboxForwardingIncoming,

    /**
     * The MailboxForwardingOutgoing model constructor.
     * @property {module:model/MailboxForwardingOutgoing}
     */
    MailboxForwardingOutgoing,

    /**
     * The MailboxResponse model constructor.
     * @property {module:model/MailboxResponse}
     */
    MailboxResponse,

    /**
     * The MailboxSpamFilter model constructor.
     * @property {module:model/MailboxSpamFilter}
     */
    MailboxSpamFilter,

    /**
     * The MailboxV2 model constructor.
     * @property {module:model/MailboxV2}
     */
    MailboxV2,

    /**
     * The MailboxesBatchV2 model constructor.
     * @property {module:model/MailboxesBatchV2}
     */
    MailboxesBatchV2,

    /**
     * The MasterPresetOutApi model constructor.
     * @property {module:model/MasterPresetOutApi}
     */
    MasterPresetOutApi,

    /**
     * The Meta model constructor.
     * @property {module:model/Meta}
     */
    Meta,

    /**
     * The Meta1 model constructor.
     * @property {module:model/Meta1}
     */
    Meta1,

    /**
     * The Model model constructor.
     * @property {module:model/Model}
     */
    Model,

    /**
     * The ModelBatch model constructor.
     * @property {module:model/ModelBatch}
     */
    ModelBatch,

    /**
     * The ModelParamInfo model constructor.
     * @property {module:model/ModelParamInfo}
     */
    ModelParamInfo,

    /**
     * The ModelParameter model constructor.
     * @property {module:model/ModelParameter}
     */
    ModelParameter,

    /**
     * The ModelPriceTier model constructor.
     * @property {module:model/ModelPriceTier}
     */
    ModelPriceTier,

    /**
     * The ModelV3 model constructor.
     * @property {module:model/ModelV3}
     */
    ModelV3,

    /**
     * The Mongodb model constructor.
     * @property {module:model/Mongodb}
     */
    Mongodb,

    /**
     * The MountNetworkDrive model constructor.
     * @property {module:model/MountNetworkDrive}
     */
    MountNetworkDrive,

    /**
     * The Mysql model constructor.
     * @property {module:model/Mysql}
     */
    Mysql,

    /**
     * The NatIn model constructor.
     * @property {module:model/NatIn}
     */
    NatIn,

    /**
     * The Network model constructor.
     * @property {module:model/Network}
     */
    Network,

    /**
     * The NetworkDrive model constructor.
     * @property {module:model/NetworkDrive}
     */
    NetworkDrive,

    /**
     * The NetworkDriveAvailableResource model constructor.
     * @property {module:model/NetworkDriveAvailableResource}
     */
    NetworkDriveAvailableResource,

    /**
     * The NetworkDrivePreset model constructor.
     * @property {module:model/NetworkDrivePreset}
     */
    NetworkDrivePreset,

    /**
     * The NetworkDrivePresetRead model constructor.
     * @property {module:model/NetworkDrivePresetRead}
     */
    NetworkDrivePresetRead,

    /**
     * The NetworkDrivePresetWrite model constructor.
     * @property {module:model/NetworkDrivePresetWrite}
     */
    NetworkDrivePresetWrite,

    /**
     * The NetworkDriveServiceListInner model constructor.
     * @property {module:model/NetworkDriveServiceListInner}
     */
    NetworkDriveServiceListInner,

    /**
     * The NetworkDriversResponse model constructor.
     * @property {module:model/NetworkDriversResponse}
     */
    NetworkDriversResponse,

    /**
     * The NetworkEdit model constructor.
     * @property {module:model/NetworkEdit}
     */
    NetworkEdit,

    /**
     * The NetworkIn model constructor.
     * @property {module:model/NetworkIn}
     */
    NetworkIn,

    /**
     * The NetworkOut model constructor.
     * @property {module:model/NetworkOut}
     */
    NetworkOut,

    /**
     * The NetworkResponse model constructor.
     * @property {module:model/NetworkResponse}
     */
    NetworkResponse,

    /**
     * The NetworksResponse model constructor.
     * @property {module:model/NetworksResponse}
     */
    NetworksResponse,

    /**
     * The NodeGroupIn model constructor.
     * @property {module:model/NodeGroupIn}
     */
    NodeGroupIn,

    /**
     * The NodeGroupInConfiguration model constructor.
     * @property {module:model/NodeGroupInConfiguration}
     */
    NodeGroupInConfiguration,

    /**
     * The NodeGroupOut model constructor.
     * @property {module:model/NodeGroupOut}
     */
    NodeGroupOut,

    /**
     * The NodeGroupResponse model constructor.
     * @property {module:model/NodeGroupResponse}
     */
    NodeGroupResponse,

    /**
     * The NodeGroupsResponse model constructor.
     * @property {module:model/NodeGroupsResponse}
     */
    NodeGroupsResponse,

    /**
     * The NodeOut model constructor.
     * @property {module:model/NodeOut}
     */
    NodeOut,

    /**
     * The NodesResponse model constructor.
     * @property {module:model/NodesResponse}
     */
    NodesResponse,

    /**
     * The NotificationSetting model constructor.
     * @property {module:model/NotificationSetting}
     */
    NotificationSetting,

    /**
     * The NotificationSettingChannel model constructor.
     * @property {module:model/NotificationSettingChannel}
     */
    NotificationSettingChannel,

    /**
     * The NotificationSettingChannels model constructor.
     * @property {module:model/NotificationSettingChannels}
     */
    NotificationSettingChannels,

    /**
     * The NotificationSettingType model constructor.
     * @property {module:model/NotificationSettingType}
     */
    NotificationSettingType,

    /**
     * The OS model constructor.
     * @property {module:model/OS}
     */
    OS,

    /**
     * The Opensearch model constructor.
     * @property {module:model/Opensearch}
     */
    Opensearch,

    /**
     * The Org model constructor.
     * @property {module:model/Org}
     */
    Org,

    /**
     * The OriginNode model constructor.
     * @property {module:model/OriginNode}
     */
    OriginNode,

    /**
     * The OriginServer model constructor.
     * @property {module:model/OriginServer}
     */
    OriginServer,

    /**
     * The OutgoingIsDisabled model constructor.
     * @property {module:model/OutgoingIsDisabled}
     */
    OutgoingIsDisabled,

    /**
     * The OutgoingIsEnabled model constructor.
     * @property {module:model/OutgoingIsEnabled}
     */
    OutgoingIsEnabled,

    /**
     * The PerformActionOnBackupRequest model constructor.
     * @property {module:model/PerformActionOnBackupRequest}
     */
    PerformActionOnBackupRequest,

    /**
     * The PerformActionOnServerRequest model constructor.
     * @property {module:model/PerformActionOnServerRequest}
     */
    PerformActionOnServerRequest,

    /**
     * The Person model constructor.
     * @property {module:model/Person}
     */
    Person,

    /**
     * The Person2 model constructor.
     * @property {module:model/Person2}
     */
    Person2,

    /**
     * The Policy model constructor.
     * @property {module:model/Policy}
     */
    Policy,

    /**
     * The Postgres model constructor.
     * @property {module:model/Postgres}
     */
    Postgres,

    /**
     * The Postgresql model constructor.
     * @property {module:model/Postgresql}
     */
    Postgresql,

    /**
     * The PreloadCache model constructor.
     * @property {module:model/PreloadCache}
     */
    PreloadCache,

    /**
     * The Preset model constructor.
     * @property {module:model/Preset}
     */
    Preset,

    /**
     * The PresetsBalancer model constructor.
     * @property {module:model/PresetsBalancer}
     */
    PresetsBalancer,

    /**
     * The PresetsDbs model constructor.
     * @property {module:model/PresetsDbs}
     */
    PresetsDbs,

    /**
     * The PresetsResponse model constructor.
     * @property {module:model/PresetsResponse}
     */
    PresetsResponse,

    /**
     * The PresetsStorage model constructor.
     * @property {module:model/PresetsStorage}
     */
    PresetsStorage,

    /**
     * The Project model constructor.
     * @property {module:model/Project}
     */
    Project,

    /**
     * The ProjectResource model constructor.
     * @property {module:model/ProjectResource}
     */
    ProjectResource,

    /**
     * The PropertiesMysql model constructor.
     * @property {module:model/PropertiesMysql}
     */
    PropertiesMysql,

    /**
     * The PropertiesValkey model constructor.
     * @property {module:model/PropertiesValkey}
     */
    PropertiesValkey,

    /**
     * The Provider model constructor.
     * @property {module:model/Provider}
     */
    Provider,

    /**
     * The Providers model constructor.
     * @property {module:model/Providers}
     */
    Providers,

    /**
     * The Rabbitmq model constructor.
     * @property {module:model/Rabbitmq}
     */
    Rabbitmq,

    /**
     * The ReduceNodes model constructor.
     * @property {module:model/ReduceNodes}
     */
    ReduceNodes,

    /**
     * The RegenerateAiSolutionAiKey200Response model constructor.
     * @property {module:model/RegenerateAiSolutionAiKey200Response}
     */
    RegenerateAiSolutionAiKey200Response,

    /**
     * The RegistriesResponse model constructor.
     * @property {module:model/RegistriesResponse}
     */
    RegistriesResponse,

    /**
     * The RegistryEdit model constructor.
     * @property {module:model/RegistryEdit}
     */
    RegistryEdit,

    /**
     * The RegistryIn model constructor.
     * @property {module:model/RegistryIn}
     */
    RegistryIn,

    /**
     * The RegistryInConfiguration model constructor.
     * @property {module:model/RegistryInConfiguration}
     */
    RegistryInConfiguration,

    /**
     * The RegistryOut model constructor.
     * @property {module:model/RegistryOut}
     */
    RegistryOut,

    /**
     * The RegistryOutDiskStats model constructor.
     * @property {module:model/RegistryOutDiskStats}
     */
    RegistryOutDiskStats,

    /**
     * The RegistryResponse model constructor.
     * @property {module:model/RegistryResponse}
     */
    RegistryResponse,

    /**
     * The RemoveCountries model constructor.
     * @property {module:model/RemoveCountries}
     */
    RemoveCountries,

    /**
     * The RemoveIps model constructor.
     * @property {module:model/RemoveIps}
     */
    RemoveIps,

    /**
     * The Replica model constructor.
     * @property {module:model/Replica}
     */
    Replica,

    /**
     * The ReplicaDisk model constructor.
     * @property {module:model/ReplicaDisk}
     */
    ReplicaDisk,

    /**
     * The RepositoriesResponse model constructor.
     * @property {module:model/RepositoriesResponse}
     */
    RepositoriesResponse,

    /**
     * The Repository model constructor.
     * @property {module:model/Repository}
     */
    Repository,

    /**
     * The ResetAiSolutionChat model constructor.
     * @property {module:model/ResetAiSolutionChat}
     */
    ResetAiSolutionChat,

    /**
     * The ResetAiSolutionChat200Response model constructor.
     * @property {module:model/ResetAiSolutionChat200Response}
     */
    ResetAiSolutionChat200Response,

    /**
     * The Resource model constructor.
     * @property {module:model/Resource}
     */
    Resource,

    /**
     * The ResourceTransfer model constructor.
     * @property {module:model/ResourceTransfer}
     */
    ResourceTransfer,

    /**
     * The ResourceType model constructor.
     * @property {module:model/ResourceType}
     */
    ResourceType,

    /**
     * The Resources model constructor.
     * @property {module:model/Resources}
     */
    Resources,

    /**
     * The ResourcesListResult model constructor.
     * @property {module:model/ResourcesListResult}
     */
    ResourcesListResult,

    /**
     * The ResourcesReadParams model constructor.
     * @property {module:model/ResourcesReadParams}
     */
    ResourcesReadParams,

    /**
     * The ResourcesReadResult model constructor.
     * @property {module:model/ResourcesReadResult}
     */
    ResourcesReadResult,

    /**
     * The ResourcesReadResultContentsInner model constructor.
     * @property {module:model/ResourcesReadResultContentsInner}
     */
    ResourcesReadResultContentsInner,

    /**
     * The ResourcesResponse model constructor.
     * @property {module:model/ResourcesResponse}
     */
    ResourcesResponse,

    /**
     * The RestorePoint model constructor.
     * @property {module:model/RestorePoint}
     */
    RestorePoint,

    /**
     * The RetrievalMode model constructor.
     * @property {module:model/RetrievalMode}
     */
    RetrievalMode,

    /**
     * The RetrievalModeRef model constructor.
     * @property {module:model/RetrievalModeRef}
     */
    RetrievalModeRef,

    /**
     * The RouterEdit model constructor.
     * @property {module:model/RouterEdit}
     */
    RouterEdit,

    /**
     * The RouterIn model constructor.
     * @property {module:model/RouterIn}
     */
    RouterIn,

    /**
     * The RouterInIpsInner model constructor.
     * @property {module:model/RouterInIpsInner}
     */
    RouterInIpsInner,

    /**
     * The RouterInIpsInnerNat model constructor.
     * @property {module:model/RouterInIpsInnerNat}
     */
    RouterInIpsInnerNat,

    /**
     * The RouterInNetworksInner model constructor.
     * @property {module:model/RouterInNetworksInner}
     */
    RouterInNetworksInner,

    /**
     * The RouterInParentService model constructor.
     * @property {module:model/RouterInParentService}
     */
    RouterInParentService,

    /**
     * The RouterNetworkMeta model constructor.
     * @property {module:model/RouterNetworkMeta}
     */
    RouterNetworkMeta,

    /**
     * The RouterNetworkMetaDhcp model constructor.
     * @property {module:model/RouterNetworkMetaDhcp}
     */
    RouterNetworkMetaDhcp,

    /**
     * The RouterOut model constructor.
     * @property {module:model/RouterOut}
     */
    RouterOut,

    /**
     * The RouterOutIpsInner model constructor.
     * @property {module:model/RouterOutIpsInner}
     */
    RouterOutIpsInner,

    /**
     * The RouterOutIpsInnerNat model constructor.
     * @property {module:model/RouterOutIpsInnerNat}
     */
    RouterOutIpsInnerNat,

    /**
     * The RouterOutNodesInner model constructor.
     * @property {module:model/RouterOutNodesInner}
     */
    RouterOutNodesInner,

    /**
     * The RouterOutParentServicesInner model constructor.
     * @property {module:model/RouterOutParentServicesInner}
     */
    RouterOutParentServicesInner,

    /**
     * The RouterPreset model constructor.
     * @property {module:model/RouterPreset}
     */
    RouterPreset,

    /**
     * The RouterPresetsResponse model constructor.
     * @property {module:model/RouterPresetsResponse}
     */
    RouterPresetsResponse,

    /**
     * The RouterResponse model constructor.
     * @property {module:model/RouterResponse}
     */
    RouterResponse,

    /**
     * The RouterStatistic model constructor.
     * @property {module:model/RouterStatistic}
     */
    RouterStatistic,

    /**
     * The RouterStatisticListInner model constructor.
     * @property {module:model/RouterStatisticListInner}
     */
    RouterStatisticListInner,

    /**
     * The RouterStatisticMeta model constructor.
     * @property {module:model/RouterStatisticMeta}
     */
    RouterStatisticMeta,

    /**
     * The RouterStatisticsResponse model constructor.
     * @property {module:model/RouterStatisticsResponse}
     */
    RouterStatisticsResponse,

    /**
     * The RoutersResponse model constructor.
     * @property {module:model/RoutersResponse}
     */
    RoutersResponse,

    /**
     * The Rule model constructor.
     * @property {module:model/Rule}
     */
    Rule,

    /**
     * The S3Backup model constructor.
     * @property {module:model/S3Backup}
     */
    S3Backup,

    /**
     * The S3Subdomain model constructor.
     * @property {module:model/S3Subdomain}
     */
    S3Subdomain,

    /**
     * The SchemasBaseError model constructor.
     * @property {module:model/SchemasBaseError}
     */
    SchemasBaseError,

    /**
     * The SchemasMeta model constructor.
     * @property {module:model/SchemasMeta}
     */
    SchemasMeta,

    /**
     * The SchemasPresetsResponse model constructor.
     * @property {module:model/SchemasPresetsResponse}
     */
    SchemasPresetsResponse,

    /**
     * The SendAiSolutionMessage model constructor.
     * @property {module:model/SendAiSolutionMessage}
     */
    SendAiSolutionMessage,

    /**
     * The SendAiSolutionMessage200Response model constructor.
     * @property {module:model/SendAiSolutionMessage200Response}
     */
    SendAiSolutionMessage200Response,

    /**
     * The ServerBackup model constructor.
     * @property {module:model/ServerBackup}
     */
    ServerBackup,

    /**
     * The ServerBackupDownloadUrl model constructor.
     * @property {module:model/ServerBackupDownloadUrl}
     */
    ServerBackupDownloadUrl,

    /**
     * The ServerBackupDownloadUrlRequest model constructor.
     * @property {module:model/ServerBackupDownloadUrlRequest}
     */
    ServerBackupDownloadUrlRequest,

    /**
     * The ServerDisk model constructor.
     * @property {module:model/ServerDisk}
     */
    ServerDisk,

    /**
     * The ServerIp model constructor.
     * @property {module:model/ServerIp}
     */
    ServerIp,

    /**
     * The ServerLog model constructor.
     * @property {module:model/ServerLog}
     */
    ServerLog,

    /**
     * The ServersConfigurator model constructor.
     * @property {module:model/ServersConfigurator}
     */
    ServersConfigurator,

    /**
     * The ServersConfiguratorRequirements model constructor.
     * @property {module:model/ServersConfiguratorRequirements}
     */
    ServersConfiguratorRequirements,

    /**
     * The ServersOs model constructor.
     * @property {module:model/ServersOs}
     */
    ServersOs,

    /**
     * The ServersOsRequirements model constructor.
     * @property {module:model/ServersOsRequirements}
     */
    ServersOsRequirements,

    /**
     * The ServersPreset model constructor.
     * @property {module:model/ServersPreset}
     */
    ServersPreset,

    /**
     * The ServersSoftware model constructor.
     * @property {module:model/ServersSoftware}
     */
    ServersSoftware,

    /**
     * The ServersSoftwareRequirements model constructor.
     * @property {module:model/ServersSoftwareRequirements}
     */
    ServersSoftwareRequirements,

    /**
     * The ServersStatistics model constructor.
     * @property {module:model/ServersStatistics}
     */
    ServersStatistics,

    /**
     * The ServersStatisticsListInner model constructor.
     * @property {module:model/ServersStatisticsListInner}
     */
    ServersStatisticsListInner,

    /**
     * The ServersStatisticsMeta model constructor.
     * @property {module:model/ServersStatisticsMeta}
     */
    ServersStatisticsMeta,

    /**
     * The ServiceCostType model constructor.
     * @property {module:model/ServiceCostType}
     */
    ServiceCostType,

    /**
     * The ServicePrice model constructor.
     * @property {module:model/ServicePrice}
     */
    ServicePrice,

    /**
     * The ServicePriceConfiguration model constructor.
     * @property {module:model/ServicePriceConfiguration}
     */
    ServicePriceConfiguration,

    /**
     * The ServicePriceType model constructor.
     * @property {module:model/ServicePriceType}
     */
    ServicePriceType,

    /**
     * The ServiceServicePrice model constructor.
     * @property {module:model/ServiceServicePrice}
     */
    ServiceServicePrice,

    /**
     * The ServiceServicePriceNodeGroupsInner model constructor.
     * @property {module:model/ServiceServicePriceNodeGroupsInner}
     */
    ServiceServicePriceNodeGroupsInner,

    /**
     * The SetAgentSkill model constructor.
     * @property {module:model/SetAgentSkill}
     */
    SetAgentSkill,

    /**
     * The SetAgentSkillForAgent200Response model constructor.
     * @property {module:model/SetAgentSkillForAgent200Response}
     */
    SetAgentSkillForAgent200Response,

    /**
     * The SetLabels model constructor.
     * @property {module:model/SetLabels}
     */
    SetLabels,

    /**
     * The SettingCondition model constructor.
     * @property {module:model/SettingCondition}
     */
    SettingCondition,

    /**
     * The Skill model constructor.
     * @property {module:model/Skill}
     */
    Skill,

    /**
     * The SkillAgent model constructor.
     * @property {module:model/SkillAgent}
     */
    SkillAgent,

    /**
     * The SkillCatalogItem model constructor.
     * @property {module:model/SkillCatalogItem}
     */
    SkillCatalogItem,

    /**
     * The SkillSaveMeta model constructor.
     * @property {module:model/SkillSaveMeta}
     */
    SkillSaveMeta,

    /**
     * The SkillScript model constructor.
     * @property {module:model/SkillScript}
     */
    SkillScript,

    /**
     * The SkillScriptInput model constructor.
     * @property {module:model/SkillScriptInput}
     */
    SkillScriptInput,

    /**
     * The SkillVersion model constructor.
     * @property {module:model/SkillVersion}
     */
    SkillVersion,

    /**
     * The SpamFilterIsDisabled model constructor.
     * @property {module:model/SpamFilterIsDisabled}
     */
    SpamFilterIsDisabled,

    /**
     * The SpamFilterIsEnabled model constructor.
     * @property {module:model/SpamFilterIsEnabled}
     */
    SpamFilterIsEnabled,

    /**
     * The SpamProtectionIsDisabled model constructor.
     * @property {module:model/SpamProtectionIsDisabled}
     */
    SpamProtectionIsDisabled,

    /**
     * The SpamProtectionIsEnabled model constructor.
     * @property {module:model/SpamProtectionIsEnabled}
     */
    SpamProtectionIsEnabled,

    /**
     * The SshKey model constructor.
     * @property {module:model/SshKey}
     */
    SshKey,

    /**
     * The SshKeyUsedByInner model constructor.
     * @property {module:model/SshKeyUsedByInner}
     */
    SshKeyUsedByInner,

    /**
     * The StaticRouteIn model constructor.
     * @property {module:model/StaticRouteIn}
     */
    StaticRouteIn,

    /**
     * The StaticRouteOut model constructor.
     * @property {module:model/StaticRouteOut}
     */
    StaticRouteOut,

    /**
     * The StaticRouteResponse model constructor.
     * @property {module:model/StaticRouteResponse}
     */
    StaticRouteResponse,

    /**
     * The StaticRoutesResponse model constructor.
     * @property {module:model/StaticRoutesResponse}
     */
    StaticRoutesResponse,

    /**
     * The Statistics model constructor.
     * @property {module:model/Statistics}
     */
    Statistics,

    /**
     * The StatisticsRequestsInner model constructor.
     * @property {module:model/StatisticsRequestsInner}
     */
    StatisticsRequestsInner,

    /**
     * The StatisticsTrafficInner model constructor.
     * @property {module:model/StatisticsTrafficInner}
     */
    StatisticsTrafficInner,

    /**
     * The Status model constructor.
     * @property {module:model/Status}
     */
    Status,

    /**
     * The StatusCompanyInfo model constructor.
     * @property {module:model/StatusCompanyInfo}
     */
    StatusCompanyInfo,

    /**
     * The StopAiSolutionChat model constructor.
     * @property {module:model/StopAiSolutionChat}
     */
    StopAiSolutionChat,

    /**
     * The StreamError model constructor.
     * @property {module:model/StreamError}
     */
    StreamError,

    /**
     * The Subdomain model constructor.
     * @property {module:model/Subdomain}
     */
    Subdomain,

    /**
     * The SyncAgentEntityLimits model constructor.
     * @property {module:model/SyncAgentEntityLimits}
     */
    SyncAgentEntityLimits,

    /**
     * The SyncAgentEntityLimitsLimitsInner model constructor.
     * @property {module:model/SyncAgentEntityLimitsLimitsInner}
     */
    SyncAgentEntityLimitsLimitsInner,

    /**
     * The SyncAgentSkillAgentsVersions200Response model constructor.
     * @property {module:model/SyncAgentSkillAgentsVersions200Response}
     */
    SyncAgentSkillAgentsVersions200Response,

    /**
     * The SyncAgentSkillAgentsVersions200ResponseMeta model constructor.
     * @property {module:model/SyncAgentSkillAgentsVersions200ResponseMeta}
     */
    SyncAgentSkillAgentsVersions200ResponseMeta,

    /**
     * The SyncAgentSkillVersionsForAgent200Response model constructor.
     * @property {module:model/SyncAgentSkillVersionsForAgent200Response}
     */
    SyncAgentSkillVersionsForAgent200Response,

    /**
     * The SyncAiKeyLimits model constructor.
     * @property {module:model/SyncAiKeyLimits}
     */
    SyncAiKeyLimits,

    /**
     * The SyncAiKeyLimitsLimitsInner model constructor.
     * @property {module:model/SyncAiKeyLimitsLimitsInner}
     */
    SyncAiKeyLimitsLimitsInner,

    /**
     * The Tags model constructor.
     * @property {module:model/Tags}
     */
    Tags,

    /**
     * The TextContent model constructor.
     * @property {module:model/TextContent}
     */
    TextContent,

    /**
     * The TokenPackage model constructor.
     * @property {module:model/TokenPackage}
     */
    TokenPackage,

    /**
     * The Tool model constructor.
     * @property {module:model/Tool}
     */
    Tool,

    /**
     * The Tool2 model constructor.
     * @property {module:model/Tool2}
     */
    Tool2,

    /**
     * The Tool2Annotations model constructor.
     * @property {module:model/Tool2Annotations}
     */
    Tool2Annotations,

    /**
     * The ToolAuthData model constructor.
     * @property {module:model/ToolAuthData}
     */
    ToolAuthData,

    /**
     * The ToolAuthDataParams model constructor.
     * @property {module:model/ToolAuthDataParams}
     */
    ToolAuthDataParams,

    /**
     * The ToolConfigField model constructor.
     * @property {module:model/ToolConfigField}
     */
    ToolConfigField,

    /**
     * The ToolMethod model constructor.
     * @property {module:model/ToolMethod}
     */
    ToolMethod,

    /**
     * The ToolPrice model constructor.
     * @property {module:model/ToolPrice}
     */
    ToolPrice,

    /**
     * The ToolTemplate model constructor.
     * @property {module:model/ToolTemplate}
     */
    ToolTemplate,

    /**
     * The ToolTemplateConfigSchema model constructor.
     * @property {module:model/ToolTemplateConfigSchema}
     */
    ToolTemplateConfigSchema,

    /**
     * The ToolsCallParams model constructor.
     * @property {module:model/ToolsCallParams}
     */
    ToolsCallParams,

    /**
     * The ToolsCallResult model constructor.
     * @property {module:model/ToolsCallResult}
     */
    ToolsCallResult,

    /**
     * The ToolsListResult model constructor.
     * @property {module:model/ToolsListResult}
     */
    ToolsListResult,

    /**
     * The TopLevelDomain model constructor.
     * @property {module:model/TopLevelDomain}
     */
    TopLevelDomain,

    /**
     * The TopLevelDomainAllowedBuyPeriodsInner model constructor.
     * @property {module:model/TopLevelDomainAllowedBuyPeriodsInner}
     */
    TopLevelDomainAllowedBuyPeriodsInner,

    /**
     * The TrafficUsage model constructor.
     * @property {module:model/TrafficUsage}
     */
    TrafficUsage,

    /**
     * The TransferStatus model constructor.
     * @property {module:model/TransferStatus}
     */
    TransferStatus,

    /**
     * The TransferStatusErrorsInner model constructor.
     * @property {module:model/TransferStatusErrorsInner}
     */
    TransferStatusErrorsInner,

    /**
     * The TransferStorageRequest model constructor.
     * @property {module:model/TransferStorageRequest}
     */
    TransferStorageRequest,

    /**
     * The URLType model constructor.
     * @property {module:model/URLType}
     */
    URLType,

    /**
     * The UpdateAdmin model constructor.
     * @property {module:model/UpdateAdmin}
     */
    UpdateAdmin,

    /**
     * The UpdateAgent model constructor.
     * @property {module:model/UpdateAgent}
     */
    UpdateAgent,

    /**
     * The UpdateAgentEntityLimit model constructor.
     * @property {module:model/UpdateAgentEntityLimit}
     */
    UpdateAgentEntityLimit,

    /**
     * The UpdateAgentTool model constructor.
     * @property {module:model/UpdateAgentTool}
     */
    UpdateAgentTool,

    /**
     * The UpdateAiKey model constructor.
     * @property {module:model/UpdateAiKey}
     */
    UpdateAiKey,

    /**
     * The UpdateAiKey200Response model constructor.
     * @property {module:model/UpdateAiKey200Response}
     */
    UpdateAiKey200Response,

    /**
     * The UpdateAiKeyLimit model constructor.
     * @property {module:model/UpdateAiKeyLimit}
     */
    UpdateAiKeyLimit,

    /**
     * The UpdateAiSolution model constructor.
     * @property {module:model/UpdateAiSolution}
     */
    UpdateAiSolution,

    /**
     * The UpdateAppSettings200Response model constructor.
     * @property {module:model/UpdateAppSettings200Response}
     */
    UpdateAppSettings200Response,

    /**
     * The UpdateAuthRestrictionsByCountriesRequest model constructor.
     * @property {module:model/UpdateAuthRestrictionsByCountriesRequest}
     */
    UpdateAuthRestrictionsByCountriesRequest,

    /**
     * The UpdateAutoBackup model constructor.
     * @property {module:model/UpdateAutoBackup}
     */
    UpdateAutoBackup,

    /**
     * The UpdateBalancer model constructor.
     * @property {module:model/UpdateBalancer}
     */
    UpdateBalancer,

    /**
     * The UpdateBot model constructor.
     * @property {module:model/UpdateBot}
     */
    UpdateBot,

    /**
     * The UpdateCluster model constructor.
     * @property {module:model/UpdateCluster}
     */
    UpdateCluster,

    /**
     * The UpdateClusterConfiguration model constructor.
     * @property {module:model/UpdateClusterConfiguration}
     */
    UpdateClusterConfiguration,

    /**
     * The UpdateClusterV2 model constructor.
     * @property {module:model/UpdateClusterV2}
     */
    UpdateClusterV2,

    /**
     * The UpdateClusterV2DiskAutoscaling model constructor.
     * @property {module:model/UpdateClusterV2DiskAutoscaling}
     */
    UpdateClusterV2DiskAutoscaling,

    /**
     * The UpdateClusterV2MaintenanceSlot model constructor.
     * @property {module:model/UpdateClusterV2MaintenanceSlot}
     */
    UpdateClusterV2MaintenanceSlot,

    /**
     * The UpdateDatabaseCluster200Response model constructor.
     * @property {module:model/UpdateDatabaseCluster200Response}
     */
    UpdateDatabaseCluster200Response,

    /**
     * The UpdateDatabaseInstance409Response model constructor.
     * @property {module:model/UpdateDatabaseInstance409Response}
     */
    UpdateDatabaseInstance409Response,

    /**
     * The UpdateDedicatedServerRequest model constructor.
     * @property {module:model/UpdateDedicatedServerRequest}
     */
    UpdateDedicatedServerRequest,

    /**
     * The UpdateDocument model constructor.
     * @property {module:model/UpdateDocument}
     */
    UpdateDocument,

    /**
     * The UpdateDomain model constructor.
     * @property {module:model/UpdateDomain}
     */
    UpdateDomain,

    /**
     * The UpdateDomainAutoProlongation200Response model constructor.
     * @property {module:model/UpdateDomainAutoProlongation200Response}
     */
    UpdateDomainAutoProlongation200Response,

    /**
     * The UpdateDomainMailInfoRequest model constructor.
     * @property {module:model/UpdateDomainMailInfoRequest}
     */
    UpdateDomainMailInfoRequest,

    /**
     * The UpdateDomainNameServers model constructor.
     * @property {module:model/UpdateDomainNameServers}
     */
    UpdateDomainNameServers,

    /**
     * The UpdateDomainNameServersNameServersInner model constructor.
     * @property {module:model/UpdateDomainNameServersNameServersInner}
     */
    UpdateDomainNameServersNameServersInner,

    /**
     * The UpdateFloatingIp model constructor.
     * @property {module:model/UpdateFloatingIp}
     */
    UpdateFloatingIp,

    /**
     * The UpdateHttpResource model constructor.
     * @property {module:model/UpdateHttpResource}
     */
    UpdateHttpResource,

    /**
     * The UpdateInstance model constructor.
     * @property {module:model/UpdateInstance}
     */
    UpdateInstance,

    /**
     * The UpdateKafkaConfigParameters model constructor.
     * @property {module:model/UpdateKafkaConfigParameters}
     */
    UpdateKafkaConfigParameters,

    /**
     * The UpdateKeyRequest model constructor.
     * @property {module:model/UpdateKeyRequest}
     */
    UpdateKeyRequest,

    /**
     * The UpdateKnowledgebase model constructor.
     * @property {module:model/UpdateKnowledgebase}
     */
    UpdateKnowledgebase,

    /**
     * The UpdateMailbox model constructor.
     * @property {module:model/UpdateMailbox}
     */
    UpdateMailbox,

    /**
     * The UpdateMailboxV2 model constructor.
     * @property {module:model/UpdateMailboxV2}
     */
    UpdateMailboxV2,

    /**
     * The UpdateMailboxV2200Response model constructor.
     * @property {module:model/UpdateMailboxV2200Response}
     */
    UpdateMailboxV2200Response,

    /**
     * The UpdateMaxBot model constructor.
     * @property {module:model/UpdateMaxBot}
     */
    UpdateMaxBot,

    /**
     * The UpdateNetworkDrive model constructor.
     * @property {module:model/UpdateNetworkDrive}
     */
    UpdateNetworkDrive,

    /**
     * The UpdateNotificationSettingsRequest model constructor.
     * @property {module:model/UpdateNotificationSettingsRequest}
     */
    UpdateNotificationSettingsRequest,

    /**
     * The UpdateNotificationSettingsRequestSettingsInner model constructor.
     * @property {module:model/UpdateNotificationSettingsRequestSettingsInner}
     */
    UpdateNotificationSettingsRequestSettingsInner,

    /**
     * The UpdateNotificationSettingsRequestSettingsInnerChannels model constructor.
     * @property {module:model/UpdateNotificationSettingsRequestSettingsInnerChannels}
     */
    UpdateNotificationSettingsRequestSettingsInnerChannels,

    /**
     * The UpdatePerson model constructor.
     * @property {module:model/UpdatePerson}
     */
    UpdatePerson,

    /**
     * The UpdateProject model constructor.
     * @property {module:model/UpdateProject}
     */
    UpdateProject,

    /**
     * The UpdateRule model constructor.
     * @property {module:model/UpdateRule}
     */
    UpdateRule,

    /**
     * The UpdateS3Backup model constructor.
     * @property {module:model/UpdateS3Backup}
     */
    UpdateS3Backup,

    /**
     * The UpdateServer model constructor.
     * @property {module:model/UpdateServer}
     */
    UpdateServer,

    /**
     * The UpdateServerConfigurator model constructor.
     * @property {module:model/UpdateServerConfigurator}
     */
    UpdateServerConfigurator,

    /**
     * The UpdateServerDiskBackupRequest model constructor.
     * @property {module:model/UpdateServerDiskBackupRequest}
     */
    UpdateServerDiskBackupRequest,

    /**
     * The UpdateServerDiskRequest model constructor.
     * @property {module:model/UpdateServerDiskRequest}
     */
    UpdateServerDiskRequest,

    /**
     * The UpdateServerIPRequest model constructor.
     * @property {module:model/UpdateServerIPRequest}
     */
    UpdateServerIPRequest,

    /**
     * The UpdateServerNATRequest model constructor.
     * @property {module:model/UpdateServerNATRequest}
     */
    UpdateServerNATRequest,

    /**
     * The UpdateServerOSBootModeRequest model constructor.
     * @property {module:model/UpdateServerOSBootModeRequest}
     */
    UpdateServerOSBootModeRequest,

    /**
     * The UpdateSettings model constructor.
     * @property {module:model/UpdateSettings}
     */
    UpdateSettings,

    /**
     * The UpdateSkill model constructor.
     * @property {module:model/UpdateSkill}
     */
    UpdateSkill,

    /**
     * The UpdateStorageRequest model constructor.
     * @property {module:model/UpdateStorageRequest}
     */
    UpdateStorageRequest,

    /**
     * The UpdateStorageRequestConfigurator model constructor.
     * @property {module:model/UpdateStorageRequestConfigurator}
     */
    UpdateStorageRequestConfigurator,

    /**
     * The UpdateStorageUser200Response model constructor.
     * @property {module:model/UpdateStorageUser200Response}
     */
    UpdateStorageUser200Response,

    /**
     * The UpdateStorageUserRequest model constructor.
     * @property {module:model/UpdateStorageUserRequest}
     */
    UpdateStorageUserRequest,

    /**
     * The UpdateTool model constructor.
     * @property {module:model/UpdateTool}
     */
    UpdateTool,

    /**
     * The UpdateVpc model constructor.
     * @property {module:model/UpdateVpc}
     */
    UpdateVpc,

    /**
     * The UploadResult model constructor.
     * @property {module:model/UploadResult}
     */
    UploadResult,

    /**
     * The UploadSuccessful model constructor.
     * @property {module:model/UploadSuccessful}
     */
    UploadSuccessful,

    /**
     * The UploadSuccessfulResponse model constructor.
     * @property {module:model/UploadSuccessfulResponse}
     */
    UploadSuccessfulResponse,

    /**
     * The UrlStatus model constructor.
     * @property {module:model/UrlStatus}
     */
    UrlStatus,

    /**
     * The Use model constructor.
     * @property {module:model/Use}
     */
    Use,

    /**
     * The UserNode model constructor.
     * @property {module:model/UserNode}
     */
    UserNode,

    /**
     * The Valkey model constructor.
     * @property {module:model/Valkey}
     */
    Valkey,

    /**
     * The Vds model constructor.
     * @property {module:model/Vds}
     */
    Vds,

    /**
     * The VdsDisksInner model constructor.
     * @property {module:model/VdsDisksInner}
     */
    VdsDisksInner,

    /**
     * The VdsImage model constructor.
     * @property {module:model/VdsImage}
     */
    VdsImage,

    /**
     * The VdsNetworksInner model constructor.
     * @property {module:model/VdsNetworksInner}
     */
    VdsNetworksInner,

    /**
     * The VdsNetworksInnerIpsInner model constructor.
     * @property {module:model/VdsNetworksInnerIpsInner}
     */
    VdsNetworksInnerIpsInner,

    /**
     * The VdsOs model constructor.
     * @property {module:model/VdsOs}
     */
    VdsOs,

    /**
     * The VdsSoftware model constructor.
     * @property {module:model/VdsSoftware}
     */
    VdsSoftware,

    /**
     * The Vpc model constructor.
     * @property {module:model/Vpc}
     */
    Vpc,

    /**
     * The VpcPort model constructor.
     * @property {module:model/VpcPort}
     */
    VpcPort,

    /**
     * The VpcPortService model constructor.
     * @property {module:model/VpcPortService}
     */
    VpcPortService,

    /**
     * The VpcService model constructor.
     * @property {module:model/VpcService}
     */
    VpcService,

    /**
     * The WorkerPresetOutApi model constructor.
     * @property {module:model/WorkerPresetOutApi}
     */
    WorkerPresetOutApi,

    /**
    * The AIAgentIntegrationsApi service constructor.
    * @property {module:api/AIAgentIntegrationsApi}
    */
    AIAgentIntegrationsApi,

    /**
    * The AIAgentSkillsApi service constructor.
    * @property {module:api/AIAgentSkillsApi}
    */
    AIAgentSkillsApi,

    /**
    * The AIAgentsApi service constructor.
    * @property {module:api/AIAgentsApi}
    */
    AIAgentsApi,

    /**
    * The AIGatewayApi service constructor.
    * @property {module:api/AIGatewayApi}
    */
    AIGatewayApi,

    /**
    * The AIGatewayInferenceApi service constructor.
    * @property {module:api/AIGatewayInferenceApi}
    */
    AIGatewayInferenceApi,

    /**
    * The AIModelsApi service constructor.
    * @property {module:api/AIModelsApi}
    */
    AIModelsApi,

    /**
    * The AISolutionsApi service constructor.
    * @property {module:api/AISolutionsApi}
    */
    AISolutionsApi,

    /**
    * The AccountApi service constructor.
    * @property {module:api/AccountApi}
    */
    AccountApi,

    /**
    * The AppsApi service constructor.
    * @property {module:api/AppsApi}
    */
    AppsApi,

    /**
    * The BalancersApi service constructor.
    * @property {module:api/BalancersApi}
    */
    BalancersApi,

    /**
    * The CDNApi service constructor.
    * @property {module:api/CDNApi}
    */
    CDNApi,

    /**
    * The ContainerRegistryApi service constructor.
    * @property {module:api/ContainerRegistryApi}
    */
    ContainerRegistryApi,

    /**
    * The DatabasesApi service constructor.
    * @property {module:api/DatabasesApi}
    */
    DatabasesApi,

    /**
    * The DedicatedServersApi service constructor.
    * @property {module:api/DedicatedServersApi}
    */
    DedicatedServersApi,

    /**
    * The DomainsApi service constructor.
    * @property {module:api/DomainsApi}
    */
    DomainsApi,

    /**
    * The FirewallApi service constructor.
    * @property {module:api/FirewallApi}
    */
    FirewallApi,

    /**
    * The FloatingIPApi service constructor.
    * @property {module:api/FloatingIPApi}
    */
    FloatingIPApi,

    /**
    * The ImagesApi service constructor.
    * @property {module:api/ImagesApi}
    */
    ImagesApi,

    /**
    * The KnowledgeBasesApi service constructor.
    * @property {module:api/KnowledgeBasesApi}
    */
    KnowledgeBasesApi,

    /**
    * The KubernetesApi service constructor.
    * @property {module:api/KubernetesApi}
    */
    KubernetesApi,

    /**
    * The LocationsApi service constructor.
    * @property {module:api/LocationsApi}
    */
    LocationsApi,

    /**
    * The MCPApi service constructor.
    * @property {module:api/MCPApi}
    */
    MCPApi,

    /**
    * The MailApi service constructor.
    * @property {module:api/MailApi}
    */
    MailApi,

    /**
    * The NetworkDrivesApi service constructor.
    * @property {module:api/NetworkDrivesApi}
    */
    NetworkDrivesApi,

    /**
    * The PaymentsApi service constructor.
    * @property {module:api/PaymentsApi}
    */
    PaymentsApi,

    /**
    * The ProjectsApi service constructor.
    * @property {module:api/ProjectsApi}
    */
    ProjectsApi,

    /**
    * The RoutersApi service constructor.
    * @property {module:api/RoutersApi}
    */
    RoutersApi,

    /**
    * The S3Api service constructor.
    * @property {module:api/S3Api}
    */
    S3Api,

    /**
    * The SSHApi service constructor.
    * @property {module:api/SSHApi}
    */
    SSHApi,

    /**
    * The ServersApi service constructor.
    * @property {module:api/ServersApi}
    */
    ServersApi,

    /**
    * The VPCApi service constructor.
    * @property {module:api/VPCApi}
    */
    VPCApi
};
