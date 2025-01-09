/**
 * Timeweb Cloud API
 * # Введение API Timeweb Cloud позволяет вам управлять ресурсами в облаке программным способом с использованием обычных HTTP-запросов.  Множество функций, которые доступны в панели управления Timeweb Cloud, также доступны через API, что позволяет вам автоматизировать ваши собственные сценарии.  В этой документации сперва будет описан общий дизайн и принципы работы API, а после этого конкретные конечные точки. Также будут приведены примеры запросов к ним.   ## Запросы Запросы должны выполняться по протоколу `HTTPS`, чтобы гарантировать шифрование транзакций. Поддерживаются следующие методы запроса: |Метод|Применение| |--- |--- | |GET|Извлекает данные о коллекциях и отдельных ресурсах.| |POST|Для коллекций создает новый ресурс этого типа. Также используется для выполнения действий с конкретным ресурсом.| |PUT|Обновляет существующий ресурс.| |PATCH|Некоторые ресурсы поддерживают частичное обновление, то есть обновление только части атрибутов ресурса, в этом случае вместо метода PUT будет использован PATCH.| |DELETE|Удаляет ресурс.|  Методы `POST`, `PUT` и `PATCH` могут включать объект в тело запроса с типом содержимого `application/json`.  ### Параметры в запросах Некоторые коллекции поддерживают пагинацию, поиск или сортировку в запросах. В параметрах запроса требуется передать: - `limit` — обозначает количество записей, которое необходимо вернуть  - `offset` — указывает на смещение, относительно начала списка  - `search` — позволяет указать набор символов для поиска  - `sort` — можно задать правило сортировки коллекции  ## Ответы Запросы вернут один из следующих кодов состояния ответа HTTP:  |Статус|Описание| |--- |--- | |200 OK|Действие с ресурсом было выполнено успешно.| |201 Created|Ресурс был успешно создан. При этом ресурс может быть как уже готовым к использованию, так и находиться в процессе запуска.| |204 No Content|Действие с ресурсом было выполнено успешно, и ответ не содержит дополнительной информации в теле.| |400 Bad Request|Был отправлен неверный запрос, например, в нем отсутствуют обязательные параметры и т. д. Тело ответа будет содержать дополнительную информацию об ошибке.| |401 Unauthorized|Ошибка аутентификации.| |403 Forbidden|Аутентификация прошла успешно, но недостаточно прав для выполнения действия.| |404 Not Found|Запрашиваемый ресурс не найден.| |409 Conflict|Запрос конфликтует с текущим состоянием.| |423 Locked|Ресурс из запроса заблокирован от применения к нему указанного метода.| |429 Too Many Requests|Был достигнут лимит по количеству запросов в единицу времени.| |500 Internal Server Error|При выполнении запроса произошла какая-то внутренняя ошибка. Чтобы решить эту проблему, лучше всего создать тикет в панели управления.|  ### Структура успешного ответа Все конечные точки будут возвращать данные в формате `JSON`. Ответы на `GET`-запросы будут иметь на верхнем уровне следующую структуру атрибутов:  |Название поля|Тип|Описание| |--- |--- |--- | |[entity_name]|object, object[], string[], number[], boolean|Динамическое поле, которое будет меняться в зависимости от запрашиваемого ресурса и будет содержать все атрибуты, необходимые для описания этого ресурса. Например, при запросе списка баз данных будет возвращаться поле `dbs`, а при запросе конкретного облачного сервера `server`. Для некоторых конечных точек в ответе может возвращаться сразу несколько ресурсов.| |meta|object|Опционально. Объект, который содержит вспомогательную информацию о ресурсе. Чаще всего будет встречаться при запросе коллекций и содержать поле `total`, которое будет указывать на количество элементов в коллекции.| |response_id|string|Опционально. В большинстве случаев в ответе будет содержаться уникальный идентификатор ответа в формате UUIDv4, который однозначно указывает на ваш запрос внутри нашей системы. Если вам потребуется задать вопрос нашей поддержке, приложите к вопросу этот идентификатор — так мы сможем найти ответ на него намного быстрее. Также вы можете использовать этот идентификатор, чтобы убедиться, что это новый ответ на запрос и результат не был получен из кэша.|  Пример запроса на получение списка SSH-ключей: ```     HTTP/2.0 200 OK     {       \"ssh_keys\":[           {             \"body\":\"ssh-rsa AAAAB3NzaC1sdfghjkOAsBwWhs= example@device.local\",             \"created_at\":\"2021-09-15T19:52:27Z\",             \"expired_at\":null,             \"id\":5297,             \"is_default\":false,             \"name\":\"example@device.local\",             \"used_at\":null,             \"used_by\":[]           }       ],       \"meta\":{           \"total\":1       },       \"response_id\":\"94608d15-8672-4eed-8ab6-28bd6fa3cdf7\"     } ```  ### Структура ответа с ошибкой |Название поля|Тип|Описание| |--- |--- |--- | |status_code|number|Короткий числовой идентификатор ошибки.| |error_code|string|Короткий текстовый идентификатор ошибки, который уточняет числовой идентификатор и удобен для программной обработки. Самый простой пример — это код `not_found` для ошибки 404.| |message|string, string[]|Опционально. В большинстве случаев в ответе будет содержаться человекочитаемое подробное описание ошибки или ошибок, которые помогут понять, что нужно исправить.| |response_id|string|Опционально. В большинстве случае в ответе будет содержаться уникальный идентификатор ответа в формате UUIDv4, который однозначно указывает на ваш запрос внутри нашей системы. Если вам потребуется задать вопрос нашей поддержке, приложите к вопросу этот идентификатор — так мы сможем найти ответ на него намного быстрее.|  Пример: ```     HTTP/2.0 403 Forbidden     {       \"status_code\": 403,       \"error_code\":  \"forbidden\",       \"message\":     \"You do not have access for the attempted action\",       \"response_id\": \"94608d15-8672-4eed-8ab6-28bd6fa3cdf7\"     } ```  ## Статусы ресурсов Важно учесть, что при создании большинства ресурсов внутри платформы вам будет сразу возвращен ответ от сервера со статусом `200 OK` или `201 Created` и идентификатором созданного ресурса в теле ответа, но при этом этот ресурс может быть ещё в *состоянии запуска*.  Для того чтобы понять, в каком состоянии сейчас находится ваш ресурс, мы добавили поле `status` в ответ на получение информации о ресурсе.  Список статусов будет отличаться в зависимости от типа ресурса. Увидеть поддерживаемый список статусов вы сможете в описании каждого конкретного ресурса.     ## Ограничение скорости запросов (Rate Limiting) Чтобы обеспечить стабильность для всех пользователей, Timeweb Cloud защищает API от всплесков входящего трафика, анализируя количество запросов c каждого аккаунта к каждой конечной точке.  Если ваше приложение отправляет более 20 запросов в секунду на одну конечную точку, то для этого запроса API может вернуть код состояния HTTP `429 Too Many Requests`.   ## Аутентификация Доступ к API осуществляется с помощью JWT-токена. Токенами можно управлять внутри панели управления Timeweb Cloud в разделе *API и Terraform*.  Токен необходимо передавать в заголовке каждого запроса в формате: ```   Authorization: Bearer $TIMEWEB_CLOUD_TOKEN ```  ## Формат примеров API Примеры в этой документации описаны с помощью `curl`, HTTP-клиента командной строки. На компьютерах `Linux` и `macOS` обычно по умолчанию установлен `curl`, и он доступен для загрузки на всех популярных платформах, включая `Windows`.  Каждый пример разделен на несколько строк символом `\\`, который совместим с `bash`. Типичный пример выглядит так: ```   curl -X PATCH      -H \"Content-Type: application/json\"      -H \"Authorization: Bearer $TIMEWEB_CLOUD_TOKEN\"      -d '{\"name\":\"Cute Corvus\",\"comment\":\"Development Server\"}'      \"https://api.timeweb.cloud/api/v1/dedicated/1051\" ``` - Параметр `-X` задает метод запроса. Для согласованности метод будет указан во всех примерах, даже если он явно не требуется для методов `GET`. - Строки `-H` задают требуемые HTTP-заголовки. - Примеры, для которых требуется объект JSON в теле запроса, передают требуемые данные через параметр `-d`.  Чтобы использовать приведенные примеры, не подставляя каждый раз в них свой токен, вы можете добавить токен один раз в переменные окружения в вашей консоли. Например, на `Linux` это можно сделать с помощью команды:  ``` TIMEWEB_CLOUD_TOKEN=\"token\" ```  После этого токен будет автоматически подставляться в ваши запросы.  Обратите внимание, что все значения в этой документации являются примерами. Не полагайтесь на идентификаторы операционных систем, тарифов и т.д., используемые в примерах. Используйте соответствующую конечную точку для получения значений перед созданием ресурсов.   ## Версионирование API построено согласно принципам [семантического версионирования](https://semver.org/lang/ru). Это значит, что мы гарантируем обратную совместимость всех изменений в пределах одной мажорной версии.  Мажорная версия каждой конечной точки обозначается в пути запроса, например, запрос `/api/v1/servers` указывает, что этот метод имеет версию 1.
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
import AddBalancerToProject200Response from './model/AddBalancerToProject200Response';
import AddBalancerToProjectRequest from './model/AddBalancerToProjectRequest';
import AddBitbucket from './model/AddBitbucket';
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
import AddedSubdomain from './model/AddedSubdomain';
import ApiKey from './model/ApiKey';
import App from './model/App';
import AppConfiguration from './model/AppConfiguration';
import AppDiskStatus from './model/AppDiskStatus';
import AppDomainsInner from './model/AppDomainsInner';
import AppProvider from './model/AppProvider';
import AppsPresets from './model/AppsPresets';
import AppsPresetsBackendPresetsInner from './model/AppsPresetsBackendPresetsInner';
import AppsPresetsFrontendPresetsInner from './model/AppsPresetsFrontendPresetsInner';
import AutoBackup from './model/AutoBackup';
import AutoReplyIsDisabled from './model/AutoReplyIsDisabled';
import AutoReplyIsEnabled from './model/AutoReplyIsEnabled';
import AvailabilityZone from './model/AvailabilityZone';
import AvailableFrameworks from './model/AvailableFrameworks';
import AvailableFrameworksBackendFrameworksInner from './model/AvailableFrameworksBackendFrameworksInner';
import AvailableFrameworksFrontendFrameworksInner from './model/AvailableFrameworksFrontendFrameworksInner';
import Backup from './model/Backup';
import Balancer from './model/Balancer';
import BaseError from './model/BaseError';
import BindFloatingIp from './model/BindFloatingIp';
import Bonus from './model/Bonus';
import Branch from './model/Branch';
import Bucket from './model/Bucket';
import BucketDiskStats from './model/BucketDiskStats';
import BucketUser from './model/BucketUser';
import CheckDomain200Response from './model/CheckDomain200Response';
import ClusterEdit from './model/ClusterEdit';
import ClusterIn from './model/ClusterIn';
import ClusterOut from './model/ClusterOut';
import ClusterResponse from './model/ClusterResponse';
import Clusterk8s from './model/Clusterk8s';
import ClustersResponse from './model/ClustersResponse';
import Commit from './model/Commit';
import ConfigParameters from './model/ConfigParameters';
import CopyStorageFileRequest from './model/CopyStorageFileRequest';
import CreateAdmin from './model/CreateAdmin';
import CreateApiKey from './model/CreateApiKey';
import CreateApp from './model/CreateApp';
import CreateApp201Response from './model/CreateApp201Response';
import CreateBalancer from './model/CreateBalancer';
import CreateBalancer200Response from './model/CreateBalancer200Response';
import CreateBalancerRule200Response from './model/CreateBalancerRule200Response';
import CreateCluster from './model/CreateCluster';
import CreateClusterAdmin from './model/CreateClusterAdmin';
import CreateClusterInstance from './model/CreateClusterInstance';
import CreateDatabase201Response from './model/CreateDatabase201Response';
import CreateDatabaseBackup201Response from './model/CreateDatabaseBackup201Response';
import CreateDatabaseBackup409Response from './model/CreateDatabaseBackup409Response';
import CreateDatabaseCluster201Response from './model/CreateDatabaseCluster201Response';
import CreateDatabaseInstance201Response from './model/CreateDatabaseInstance201Response';
import CreateDatabaseUser201Response from './model/CreateDatabaseUser201Response';
import CreateDb from './model/CreateDb';
import CreateDbAutoBackups from './model/CreateDbAutoBackups';
import CreateDedicatedServer from './model/CreateDedicatedServer';
import CreateDedicatedServer201Response from './model/CreateDedicatedServer201Response';
import CreateDeploy201Response from './model/CreateDeploy201Response';
import CreateDeployRequest from './model/CreateDeployRequest';
import CreateDns from './model/CreateDns';
import CreateDomainDNSRecord201Response from './model/CreateDomainDNSRecord201Response';
import CreateDomainMailbox201Response from './model/CreateDomainMailbox201Response';
import CreateDomainMailboxRequest from './model/CreateDomainMailboxRequest';
import CreateDomainRequest201Response from './model/CreateDomainRequest201Response';
import CreateFloatingIp from './model/CreateFloatingIp';
import CreateFloatingIp201Response from './model/CreateFloatingIp201Response';
import CreateFolderInStorageRequest from './model/CreateFolderInStorageRequest';
import CreateInstance from './model/CreateInstance';
import CreateKey201Response from './model/CreateKey201Response';
import CreateKeyRequest from './model/CreateKeyRequest';
import CreateMultipleDomainMailboxes201Response from './model/CreateMultipleDomainMailboxes201Response';
import CreateMultipleDomainMailboxesRequest from './model/CreateMultipleDomainMailboxesRequest';
import CreateMultipleDomainMailboxesRequestMailboxesInner from './model/CreateMultipleDomainMailboxesRequestMailboxesInner';
import CreateNetworkDrive from './model/CreateNetworkDrive';
import CreateNetworkDrive201Response from './model/CreateNetworkDrive201Response';
import CreateProject from './model/CreateProject';
import CreateProject201Response from './model/CreateProject201Response';
import CreateRule from './model/CreateRule';
import CreateServer from './model/CreateServer';
import CreateServer201Response from './model/CreateServer201Response';
import CreateServerConfiguration from './model/CreateServerConfiguration';
import CreateServerDisk201Response from './model/CreateServerDisk201Response';
import CreateServerDiskBackup201Response from './model/CreateServerDiskBackup201Response';
import CreateServerDiskBackupRequest from './model/CreateServerDiskBackupRequest';
import CreateServerDiskRequest from './model/CreateServerDiskRequest';
import CreateStorage201Response from './model/CreateStorage201Response';
import CreateStorageRequest from './model/CreateStorageRequest';
import CreateToken201Response from './model/CreateToken201Response';
import CreateVPC201Response from './model/CreateVPC201Response';
import CreateVpc from './model/CreateVpc';
import CreatedApiKey from './model/CreatedApiKey';
import DatabaseAdmin from './model/DatabaseAdmin';
import DatabaseAdminInstancesInner from './model/DatabaseAdminInstancesInner';
import DatabaseCluster from './model/DatabaseCluster';
import DatabaseClusterDiskStats from './model/DatabaseClusterDiskStats';
import DatabaseClusterNetworksInner from './model/DatabaseClusterNetworksInner';
import DatabaseClusterNetworksInnerIpsInner from './model/DatabaseClusterNetworksInnerIpsInner';
import DatabaseInstance from './model/DatabaseInstance';
import DatabaseType from './model/DatabaseType';
import DatabaseTypeRequirements from './model/DatabaseTypeRequirements';
import Db from './model/Db';
import DbDiskStats from './model/DbDiskStats';
import DbType from './model/DbType';
import DedicatedServer from './model/DedicatedServer';
import DedicatedServerAdditionalService from './model/DedicatedServerAdditionalService';
import DedicatedServerPreset from './model/DedicatedServerPreset';
import DedicatedServerPresetCpu from './model/DedicatedServerPresetCpu';
import DedicatedServerPresetDisk from './model/DedicatedServerPresetDisk';
import DedicatedServerPresetMemory from './model/DedicatedServerPresetMemory';
import DeleteBalancer200Response from './model/DeleteBalancer200Response';
import DeleteCluster200Response from './model/DeleteCluster200Response';
import DeleteCountriesFromAllowedList200Response from './model/DeleteCountriesFromAllowedList200Response';
import DeleteCountriesFromAllowedListRequest from './model/DeleteCountriesFromAllowedListRequest';
import DeleteDatabase200Response from './model/DeleteDatabase200Response';
import DeleteDatabaseCluster200Response from './model/DeleteDatabaseCluster200Response';
import DeleteIPsFromAllowedList200Response from './model/DeleteIPsFromAllowedList200Response';
import DeleteIPsFromAllowedListRequest from './model/DeleteIPsFromAllowedListRequest';
import DeleteServer200Response from './model/DeleteServer200Response';
import DeleteServerIPRequest from './model/DeleteServerIPRequest';
import DeleteServiceResponse from './model/DeleteServiceResponse';
import DeleteStorage200Response from './model/DeleteStorage200Response';
import DeleteStorageFileRequest from './model/DeleteStorageFileRequest';
import Deploy from './model/Deploy';
import DeploySettingsInner from './model/DeploySettingsInner';
import DeployStatus from './model/DeployStatus';
import DnsRecord from './model/DnsRecord';
import DnsRecordData from './model/DnsRecordData';
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
import EditApiKey from './model/EditApiKey';
import Finances from './model/Finances';
import FirewallGroupInAPI from './model/FirewallGroupInAPI';
import FirewallGroupOutAPI from './model/FirewallGroupOutAPI';
import FirewallGroupOutResponse from './model/FirewallGroupOutResponse';
import FirewallGroupResourceOutAPI from './model/FirewallGroupResourceOutAPI';
import FirewallGroupResourceOutResponse from './model/FirewallGroupResourceOutResponse';
import FirewallGroupResourcesOutResponse from './model/FirewallGroupResourcesOutResponse';
import FirewallGroupsOutResponse from './model/FirewallGroupsOutResponse';
import FirewallRuleDirection from './model/FirewallRuleDirection';
import FirewallRuleInAPI from './model/FirewallRuleInAPI';
import FirewallRuleOutAPI from './model/FirewallRuleOutAPI';
import FirewallRuleOutResponse from './model/FirewallRuleOutResponse';
import FirewallRuleProtocol from './model/FirewallRuleProtocol';
import FirewallRulesOutResponse from './model/FirewallRulesOutResponse';
import FloatingIp from './model/FloatingIp';
import ForwardingIncomingIsDisabled from './model/ForwardingIncomingIsDisabled';
import ForwardingIncomingIsEnabled from './model/ForwardingIncomingIsEnabled';
import ForwardingOutgoingIsDisabled from './model/ForwardingOutgoingIsDisabled';
import ForwardingOutgoingIsEnabled from './model/ForwardingOutgoingIsEnabled';
import Frameworks from './model/Frameworks';
import Free from './model/Free';
import GetAccountStatus200Response from './model/GetAccountStatus200Response';
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
import GetCommits200Response from './model/GetCommits200Response';
import GetConfigurators200Response from './model/GetConfigurators200Response';
import GetCountries200Response from './model/GetCountries200Response';
import GetDatabaseAutoBackupsSettings200Response from './model/GetDatabaseAutoBackupsSettings200Response';
import GetDatabaseBackups200Response from './model/GetDatabaseBackups200Response';
import GetDatabaseClusterTypes200Response from './model/GetDatabaseClusterTypes200Response';
import GetDatabaseClusters200Response from './model/GetDatabaseClusters200Response';
import GetDatabaseInstances200Response from './model/GetDatabaseInstances200Response';
import GetDatabaseUsers200Response from './model/GetDatabaseUsers200Response';
import GetDatabases200Response from './model/GetDatabases200Response';
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
import GetFinances403Response from './model/GetFinances403Response';
import GetFinances429Response from './model/GetFinances429Response';
import GetFinances500Response from './model/GetFinances500Response';
import GetFloatingIps200Response from './model/GetFloatingIps200Response';
import GetImage404Response from './model/GetImage404Response';
import GetKey200Response from './model/GetKey200Response';
import GetKeys200Response from './model/GetKeys200Response';
import GetLocations200Response from './model/GetLocations200Response';
import GetMailQuota200Response from './model/GetMailQuota200Response';
import GetMailboxes200Response from './model/GetMailboxes200Response';
import GetNetworkDrives200Response from './model/GetNetworkDrives200Response';
import GetNetworkDrivesAvailableResources200Response from './model/GetNetworkDrivesAvailableResources200Response';
import GetNetworkDrivesPresets200Response from './model/GetNetworkDrivesPresets200Response';
import GetNotificationSettings200Response from './model/GetNotificationSettings200Response';
import GetOsList200Response from './model/GetOsList200Response';
import GetProjectBalancers200Response from './model/GetProjectBalancers200Response';
import GetProjectClusters200Response from './model/GetProjectClusters200Response';
import GetProjectDatabases200Response from './model/GetProjectDatabases200Response';
import GetProjectDedicatedServers200Response from './model/GetProjectDedicatedServers200Response';
import GetProjectServers200Response from './model/GetProjectServers200Response';
import GetProjectStorages200Response from './model/GetProjectStorages200Response';
import GetProjects200Response from './model/GetProjects200Response';
import GetProviders200Response from './model/GetProviders200Response';
import GetRepositories200Response from './model/GetRepositories200Response';
import GetServerDiskAutoBackupSettings200Response from './model/GetServerDiskAutoBackupSettings200Response';
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
import GetServers200Response from './model/GetServers200Response';
import GetServersPresets200Response from './model/GetServersPresets200Response';
import GetSoftware200Response from './model/GetSoftware200Response';
import GetStorageFilesList200Response from './model/GetStorageFilesList200Response';
import GetStorageSubdomains200Response from './model/GetStorageSubdomains200Response';
import GetStorageTransferStatus200Response from './model/GetStorageTransferStatus200Response';
import GetStorageUsers200Response from './model/GetStorageUsers200Response';
import GetStoragesPresets200Response from './model/GetStoragesPresets200Response';
import GetTLD200Response from './model/GetTLD200Response';
import GetTLDs200Response from './model/GetTLDs200Response';
import GetTokens200Response from './model/GetTokens200Response';
import GetVPCPorts200Response from './model/GetVPCPorts200Response';
import GetVPCServices200Response from './model/GetVPCServices200Response';
import GetVPCs200Response from './model/GetVPCs200Response';
import ImageDownloadAPI from './model/ImageDownloadAPI';
import ImageDownloadResponse from './model/ImageDownloadResponse';
import ImageDownloadsResponse from './model/ImageDownloadsResponse';
import ImageInAPI from './model/ImageInAPI';
import ImageOutAPI from './model/ImageOutAPI';
import ImageOutResponse from './model/ImageOutResponse';
import ImageStatus from './model/ImageStatus';
import ImageUpdateAPI from './model/ImageUpdateAPI';
import ImageUrlAuth from './model/ImageUrlAuth';
import ImageUrlIn from './model/ImageUrlIn';
import ImagesOutResponse from './model/ImagesOutResponse';
import Invoice from './model/Invoice';
import K8SVersionsResponse from './model/K8SVersionsResponse';
import Location from './model/Location';
import LocationDto from './model/LocationDto';
import Mailbox from './model/Mailbox';
import MailboxAutoReply from './model/MailboxAutoReply';
import MailboxForwardingIncoming from './model/MailboxForwardingIncoming';
import MailboxForwardingOutgoing from './model/MailboxForwardingOutgoing';
import MailboxSpamFilter from './model/MailboxSpamFilter';
import MasterPresetOutApi from './model/MasterPresetOutApi';
import Meta from './model/Meta';
import MountNetworkDrive from './model/MountNetworkDrive';
import Network from './model/Network';
import NetworkDrive from './model/NetworkDrive';
import NetworkDriveAvailableResource from './model/NetworkDriveAvailableResource';
import NetworkDrivePreset from './model/NetworkDrivePreset';
import NetworkDrivePresetRead from './model/NetworkDrivePresetRead';
import NetworkDrivePresetWrite from './model/NetworkDrivePresetWrite';
import NetworkDriveServiceListInner from './model/NetworkDriveServiceListInner';
import NetworkDriversResponse from './model/NetworkDriversResponse';
import NodeCount from './model/NodeCount';
import NodeGroupIn from './model/NodeGroupIn';
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
import PerformActionOnBackupRequest from './model/PerformActionOnBackupRequest';
import PerformActionOnServerRequest from './model/PerformActionOnServerRequest';
import Policy from './model/Policy';
import PresetsBalancer from './model/PresetsBalancer';
import PresetsDbs from './model/PresetsDbs';
import PresetsResponse from './model/PresetsResponse';
import PresetsStorage from './model/PresetsStorage';
import Project from './model/Project';
import ProjectResource from './model/ProjectResource';
import Provider from './model/Provider';
import Providers from './model/Providers';
import Quota from './model/Quota';
import RefreshApiKey from './model/RefreshApiKey';
import RemoveCountries from './model/RemoveCountries';
import RemoveIps from './model/RemoveIps';
import RenameStorageFileRequest from './model/RenameStorageFileRequest';
import Repository from './model/Repository';
import Resource from './model/Resource';
import ResourceTransfer from './model/ResourceTransfer';
import ResourceType from './model/ResourceType';
import Resources from './model/Resources';
import ResourcesResponse from './model/ResourcesResponse';
import Rule from './model/Rule';
import S3Object from './model/S3Object';
import S3ObjectOwner from './model/S3ObjectOwner';
import S3Subdomain from './model/S3Subdomain';
import SchemasBaseError from './model/SchemasBaseError';
import ServerBackup from './model/ServerBackup';
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
import SettingCondition from './model/SettingCondition';
import SpamFilterIsDisabled from './model/SpamFilterIsDisabled';
import SpamFilterIsEnabled from './model/SpamFilterIsEnabled';
import SshKey from './model/SshKey';
import SshKeyUsedByInner from './model/SshKeyUsedByInner';
import Status from './model/Status';
import StatusCompanyInfo from './model/StatusCompanyInfo';
import Subdomain from './model/Subdomain';
import TopLevelDomain from './model/TopLevelDomain';
import TopLevelDomainAllowedBuyPeriodsInner from './model/TopLevelDomainAllowedBuyPeriodsInner';
import TransferStatus from './model/TransferStatus';
import TransferStatusErrorsInner from './model/TransferStatusErrorsInner';
import TransferStorageRequest from './model/TransferStorageRequest';
import URLType from './model/URLType';
import UpdateAdmin from './model/UpdateAdmin';
import UpdateAppSettings200Response from './model/UpdateAppSettings200Response';
import UpdateAuthRestrictionsByCountriesRequest from './model/UpdateAuthRestrictionsByCountriesRequest';
import UpdateBalancer from './model/UpdateBalancer';
import UpdateCluster from './model/UpdateCluster';
import UpdateDb from './model/UpdateDb';
import UpdateDedicatedServerRequest from './model/UpdateDedicatedServerRequest';
import UpdateDomain from './model/UpdateDomain';
import UpdateDomainAutoProlongation200Response from './model/UpdateDomainAutoProlongation200Response';
import UpdateDomainMailInfoRequest from './model/UpdateDomainMailInfoRequest';
import UpdateDomainNameServers from './model/UpdateDomainNameServers';
import UpdateDomainNameServersNameServersInner from './model/UpdateDomainNameServersNameServersInner';
import UpdateFloatingIp from './model/UpdateFloatingIp';
import UpdateInstance from './model/UpdateInstance';
import UpdateKeyRequest from './model/UpdateKeyRequest';
import UpdateMailQuotaRequest from './model/UpdateMailQuotaRequest';
import UpdateMailbox from './model/UpdateMailbox';
import UpdateNetworkDrive from './model/UpdateNetworkDrive';
import UpdateNotificationSettingsRequest from './model/UpdateNotificationSettingsRequest';
import UpdateNotificationSettingsRequestSettingsInner from './model/UpdateNotificationSettingsRequestSettingsInner';
import UpdateNotificationSettingsRequestSettingsInnerChannels from './model/UpdateNotificationSettingsRequestSettingsInnerChannels';
import UpdateProject from './model/UpdateProject';
import UpdateRule from './model/UpdateRule';
import UpdateServer from './model/UpdateServer';
import UpdateServerConfigurator from './model/UpdateServerConfigurator';
import UpdateServerDiskBackupRequest from './model/UpdateServerDiskBackupRequest';
import UpdateServerDiskRequest from './model/UpdateServerDiskRequest';
import UpdateServerIPRequest from './model/UpdateServerIPRequest';
import UpdateServerNATRequest from './model/UpdateServerNATRequest';
import UpdateServerOSBootModeRequest from './model/UpdateServerOSBootModeRequest';
import UpdateStorageRequest from './model/UpdateStorageRequest';
import UpdateStorageUser200Response from './model/UpdateStorageUser200Response';
import UpdateStorageUserRequest from './model/UpdateStorageUserRequest';
import UpdateToken200Response from './model/UpdateToken200Response';
import UpdateVpc from './model/UpdateVpc';
import UpdeteSettings from './model/UpdeteSettings';
import UploadSuccessful from './model/UploadSuccessful';
import UploadSuccessfulResponse from './model/UploadSuccessfulResponse';
import UrlStatus from './model/UrlStatus';
import Use from './model/Use';
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
import APIKeysApi from './api/APIKeysApi';
import AccountApi from './api/AccountApi';
import AppsApi from './api/AppsApi';
import BalancersApi from './api/BalancersApi';
import DatabasesApi from './api/DatabasesApi';
import DedicatedServersApi from './api/DedicatedServersApi';
import DomainsApi from './api/DomainsApi';
import FirewallApi from './api/FirewallApi';
import FloatingIPApi from './api/FloatingIPApi';
import ImagesApi from './api/ImagesApi';
import KubernetesApi from './api/KubernetesApi';
import LocationsApi from './api/LocationsApi';
import MailApi from './api/MailApi';
import NetworkDrivesApi from './api/NetworkDrivesApi';
import ProjectsApi from './api/ProjectsApi';
import S3Api from './api/S3Api';
import SSHApi from './api/SSHApi';
import ServersApi from './api/ServersApi';
import VPCApi from './api/VPCApi';


/**
* # Введение API Timeweb Cloud позволяет вам управлять ресурсами в облаке программным способом с использованием обычных HTTP-запросов.  Множество функций, которые доступны в панели управления Timeweb Cloud, также доступны через API, что позволяет вам автоматизировать ваши собственные сценарии.  В этой документации сперва будет описан общий дизайн и принципы работы API, а после этого конкретные конечные точки. Также будут приведены примеры запросов к ним.   ## Запросы Запросы должны выполняться по протоколу &#x60;HTTPS&#x60;, чтобы гарантировать шифрование транзакций. Поддерживаются следующие методы запроса: |Метод|Применение| |--- |--- | |GET|Извлекает данные о коллекциях и отдельных ресурсах.| |POST|Для коллекций создает новый ресурс этого типа. Также используется для выполнения действий с конкретным ресурсом.| |PUT|Обновляет существующий ресурс.| |PATCH|Некоторые ресурсы поддерживают частичное обновление, то есть обновление только части атрибутов ресурса, в этом случае вместо метода PUT будет использован PATCH.| |DELETE|Удаляет ресурс.|  Методы &#x60;POST&#x60;, &#x60;PUT&#x60; и &#x60;PATCH&#x60; могут включать объект в тело запроса с типом содержимого &#x60;application/json&#x60;.  ### Параметры в запросах Некоторые коллекции поддерживают пагинацию, поиск или сортировку в запросах. В параметрах запроса требуется передать: - &#x60;limit&#x60; — обозначает количество записей, которое необходимо вернуть  - &#x60;offset&#x60; — указывает на смещение, относительно начала списка  - &#x60;search&#x60; — позволяет указать набор символов для поиска  - &#x60;sort&#x60; — можно задать правило сортировки коллекции  ## Ответы Запросы вернут один из следующих кодов состояния ответа HTTP:  |Статус|Описание| |--- |--- | |200 OK|Действие с ресурсом было выполнено успешно.| |201 Created|Ресурс был успешно создан. При этом ресурс может быть как уже готовым к использованию, так и находиться в процессе запуска.| |204 No Content|Действие с ресурсом было выполнено успешно, и ответ не содержит дополнительной информации в теле.| |400 Bad Request|Был отправлен неверный запрос, например, в нем отсутствуют обязательные параметры и т. д. Тело ответа будет содержать дополнительную информацию об ошибке.| |401 Unauthorized|Ошибка аутентификации.| |403 Forbidden|Аутентификация прошла успешно, но недостаточно прав для выполнения действия.| |404 Not Found|Запрашиваемый ресурс не найден.| |409 Conflict|Запрос конфликтует с текущим состоянием.| |423 Locked|Ресурс из запроса заблокирован от применения к нему указанного метода.| |429 Too Many Requests|Был достигнут лимит по количеству запросов в единицу времени.| |500 Internal Server Error|При выполнении запроса произошла какая-то внутренняя ошибка. Чтобы решить эту проблему, лучше всего создать тикет в панели управления.|  ### Структура успешного ответа Все конечные точки будут возвращать данные в формате &#x60;JSON&#x60;. Ответы на &#x60;GET&#x60;-запросы будут иметь на верхнем уровне следующую структуру атрибутов:  |Название поля|Тип|Описание| |--- |--- |--- | |[entity_name]|object, object[], string[], number[], boolean|Динамическое поле, которое будет меняться в зависимости от запрашиваемого ресурса и будет содержать все атрибуты, необходимые для описания этого ресурса. Например, при запросе списка баз данных будет возвращаться поле &#x60;dbs&#x60;, а при запросе конкретного облачного сервера &#x60;server&#x60;. Для некоторых конечных точек в ответе может возвращаться сразу несколько ресурсов.| |meta|object|Опционально. Объект, который содержит вспомогательную информацию о ресурсе. Чаще всего будет встречаться при запросе коллекций и содержать поле &#x60;total&#x60;, которое будет указывать на количество элементов в коллекции.| |response_id|string|Опционально. В большинстве случаев в ответе будет содержаться уникальный идентификатор ответа в формате UUIDv4, который однозначно указывает на ваш запрос внутри нашей системы. Если вам потребуется задать вопрос нашей поддержке, приложите к вопросу этот идентификатор — так мы сможем найти ответ на него намного быстрее. Также вы можете использовать этот идентификатор, чтобы убедиться, что это новый ответ на запрос и результат не был получен из кэша.|  Пример запроса на получение списка SSH-ключей: &#x60;&#x60;&#x60;     HTTP/2.0 200 OK     {       \&quot;ssh_keys\&quot;:[           {             \&quot;body\&quot;:\&quot;ssh-rsa AAAAB3NzaC1sdfghjkOAsBwWhs&#x3D; example@device.local\&quot;,             \&quot;created_at\&quot;:\&quot;2021-09-15T19:52:27Z\&quot;,             \&quot;expired_at\&quot;:null,             \&quot;id\&quot;:5297,             \&quot;is_default\&quot;:false,             \&quot;name\&quot;:\&quot;example@device.local\&quot;,             \&quot;used_at\&quot;:null,             \&quot;used_by\&quot;:[]           }       ],       \&quot;meta\&quot;:{           \&quot;total\&quot;:1       },       \&quot;response_id\&quot;:\&quot;94608d15-8672-4eed-8ab6-28bd6fa3cdf7\&quot;     } &#x60;&#x60;&#x60;  ### Структура ответа с ошибкой |Название поля|Тип|Описание| |--- |--- |--- | |status_code|number|Короткий числовой идентификатор ошибки.| |error_code|string|Короткий текстовый идентификатор ошибки, который уточняет числовой идентификатор и удобен для программной обработки. Самый простой пример — это код &#x60;not_found&#x60; для ошибки 404.| |message|string, string[]|Опционально. В большинстве случаев в ответе будет содержаться человекочитаемое подробное описание ошибки или ошибок, которые помогут понять, что нужно исправить.| |response_id|string|Опционально. В большинстве случае в ответе будет содержаться уникальный идентификатор ответа в формате UUIDv4, который однозначно указывает на ваш запрос внутри нашей системы. Если вам потребуется задать вопрос нашей поддержке, приложите к вопросу этот идентификатор — так мы сможем найти ответ на него намного быстрее.|  Пример: &#x60;&#x60;&#x60;     HTTP/2.0 403 Forbidden     {       \&quot;status_code\&quot;: 403,       \&quot;error_code\&quot;:  \&quot;forbidden\&quot;,       \&quot;message\&quot;:     \&quot;You do not have access for the attempted action\&quot;,       \&quot;response_id\&quot;: \&quot;94608d15-8672-4eed-8ab6-28bd6fa3cdf7\&quot;     } &#x60;&#x60;&#x60;  ## Статусы ресурсов Важно учесть, что при создании большинства ресурсов внутри платформы вам будет сразу возвращен ответ от сервера со статусом &#x60;200 OK&#x60; или &#x60;201 Created&#x60; и идентификатором созданного ресурса в теле ответа, но при этом этот ресурс может быть ещё в *состоянии запуска*.  Для того чтобы понять, в каком состоянии сейчас находится ваш ресурс, мы добавили поле &#x60;status&#x60; в ответ на получение информации о ресурсе.  Список статусов будет отличаться в зависимости от типа ресурса. Увидеть поддерживаемый список статусов вы сможете в описании каждого конкретного ресурса.     ## Ограничение скорости запросов (Rate Limiting) Чтобы обеспечить стабильность для всех пользователей, Timeweb Cloud защищает API от всплесков входящего трафика, анализируя количество запросов c каждого аккаунта к каждой конечной точке.  Если ваше приложение отправляет более 20 запросов в секунду на одну конечную точку, то для этого запроса API может вернуть код состояния HTTP &#x60;429 Too Many Requests&#x60;.   ## Аутентификация Доступ к API осуществляется с помощью JWT-токена. Токенами можно управлять внутри панели управления Timeweb Cloud в разделе *API и Terraform*.  Токен необходимо передавать в заголовке каждого запроса в формате: &#x60;&#x60;&#x60;   Authorization: Bearer $TIMEWEB_CLOUD_TOKEN &#x60;&#x60;&#x60;  ## Формат примеров API Примеры в этой документации описаны с помощью &#x60;curl&#x60;, HTTP-клиента командной строки. На компьютерах &#x60;Linux&#x60; и &#x60;macOS&#x60; обычно по умолчанию установлен &#x60;curl&#x60;, и он доступен для загрузки на всех популярных платформах, включая &#x60;Windows&#x60;.  Каждый пример разделен на несколько строк символом &#x60;\\&#x60;, который совместим с &#x60;bash&#x60;. Типичный пример выглядит так: &#x60;&#x60;&#x60;   curl -X PATCH      -H \&quot;Content-Type: application/json\&quot;      -H \&quot;Authorization: Bearer $TIMEWEB_CLOUD_TOKEN\&quot;      -d &#39;{\&quot;name\&quot;:\&quot;Cute Corvus\&quot;,\&quot;comment\&quot;:\&quot;Development Server\&quot;}&#39;      \&quot;https://api.timeweb.cloud/api/v1/dedicated/1051\&quot; &#x60;&#x60;&#x60; - Параметр &#x60;-X&#x60; задает метод запроса. Для согласованности метод будет указан во всех примерах, даже если он явно не требуется для методов &#x60;GET&#x60;. - Строки &#x60;-H&#x60; задают требуемые HTTP-заголовки. - Примеры, для которых требуется объект JSON в теле запроса, передают требуемые данные через параметр &#x60;-d&#x60;.  Чтобы использовать приведенные примеры, не подставляя каждый раз в них свой токен, вы можете добавить токен один раз в переменные окружения в вашей консоли. Например, на &#x60;Linux&#x60; это можно сделать с помощью команды:  &#x60;&#x60;&#x60; TIMEWEB_CLOUD_TOKEN&#x3D;\&quot;token\&quot; &#x60;&#x60;&#x60;  После этого токен будет автоматически подставляться в ваши запросы.  Обратите внимание, что все значения в этой документации являются примерами. Не полагайтесь на идентификаторы операционных систем, тарифов и т.д., используемые в примерах. Используйте соответствующую конечную точку для получения значений перед созданием ресурсов.   ## Версионирование API построено согласно принципам [семантического версионирования](https://semver.org/lang/ru). Это значит, что мы гарантируем обратную совместимость всех изменений в пределах одной мажорной версии.  Мажорная версия каждой конечной точки обозначается в пути запроса, например, запрос &#x60;/api/v1/servers&#x60; указывает, что этот метод имеет версию 1..<br>
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
     * The AddedSubdomain model constructor.
     * @property {module:model/AddedSubdomain}
     */
    AddedSubdomain,

    /**
     * The ApiKey model constructor.
     * @property {module:model/ApiKey}
     */
    ApiKey,

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
     * The Backup model constructor.
     * @property {module:model/Backup}
     */
    Backup,

    /**
     * The Balancer model constructor.
     * @property {module:model/Balancer}
     */
    Balancer,

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
     * The CheckDomain200Response model constructor.
     * @property {module:model/CheckDomain200Response}
     */
    CheckDomain200Response,

    /**
     * The ClusterEdit model constructor.
     * @property {module:model/ClusterEdit}
     */
    ClusterEdit,

    /**
     * The ClusterIn model constructor.
     * @property {module:model/ClusterIn}
     */
    ClusterIn,

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
     * The ConfigParameters model constructor.
     * @property {module:model/ConfigParameters}
     */
    ConfigParameters,

    /**
     * The CopyStorageFileRequest model constructor.
     * @property {module:model/CopyStorageFileRequest}
     */
    CopyStorageFileRequest,

    /**
     * The CreateAdmin model constructor.
     * @property {module:model/CreateAdmin}
     */
    CreateAdmin,

    /**
     * The CreateApiKey model constructor.
     * @property {module:model/CreateApiKey}
     */
    CreateApiKey,

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
     * The CreateBalancerRule200Response model constructor.
     * @property {module:model/CreateBalancerRule200Response}
     */
    CreateBalancerRule200Response,

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
     * The CreateClusterInstance model constructor.
     * @property {module:model/CreateClusterInstance}
     */
    CreateClusterInstance,

    /**
     * The CreateDatabase201Response model constructor.
     * @property {module:model/CreateDatabase201Response}
     */
    CreateDatabase201Response,

    /**
     * The CreateDatabaseBackup201Response model constructor.
     * @property {module:model/CreateDatabaseBackup201Response}
     */
    CreateDatabaseBackup201Response,

    /**
     * The CreateDatabaseBackup409Response model constructor.
     * @property {module:model/CreateDatabaseBackup409Response}
     */
    CreateDatabaseBackup409Response,

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
     * The CreateDatabaseUser201Response model constructor.
     * @property {module:model/CreateDatabaseUser201Response}
     */
    CreateDatabaseUser201Response,

    /**
     * The CreateDb model constructor.
     * @property {module:model/CreateDb}
     */
    CreateDb,

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
     * The CreateDomainDNSRecord201Response model constructor.
     * @property {module:model/CreateDomainDNSRecord201Response}
     */
    CreateDomainDNSRecord201Response,

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
     * The CreateFolderInStorageRequest model constructor.
     * @property {module:model/CreateFolderInStorageRequest}
     */
    CreateFolderInStorageRequest,

    /**
     * The CreateInstance model constructor.
     * @property {module:model/CreateInstance}
     */
    CreateInstance,

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
     * The CreateToken201Response model constructor.
     * @property {module:model/CreateToken201Response}
     */
    CreateToken201Response,

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
     * The CreatedApiKey model constructor.
     * @property {module:model/CreatedApiKey}
     */
    CreatedApiKey,

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
     * The DatabaseClusterDiskStats model constructor.
     * @property {module:model/DatabaseClusterDiskStats}
     */
    DatabaseClusterDiskStats,

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
     * The DbType model constructor.
     * @property {module:model/DbType}
     */
    DbType,

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
     * The DeleteDatabase200Response model constructor.
     * @property {module:model/DeleteDatabase200Response}
     */
    DeleteDatabase200Response,

    /**
     * The DeleteDatabaseCluster200Response model constructor.
     * @property {module:model/DeleteDatabaseCluster200Response}
     */
    DeleteDatabaseCluster200Response,

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
     * The DeleteStorageFileRequest model constructor.
     * @property {module:model/DeleteStorageFileRequest}
     */
    DeleteStorageFileRequest,

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
     * The EditApiKey model constructor.
     * @property {module:model/EditApiKey}
     */
    EditApiKey,

    /**
     * The Finances model constructor.
     * @property {module:model/Finances}
     */
    Finances,

    /**
     * The FirewallGroupInAPI model constructor.
     * @property {module:model/FirewallGroupInAPI}
     */
    FirewallGroupInAPI,

    /**
     * The FirewallGroupOutAPI model constructor.
     * @property {module:model/FirewallGroupOutAPI}
     */
    FirewallGroupOutAPI,

    /**
     * The FirewallGroupOutResponse model constructor.
     * @property {module:model/FirewallGroupOutResponse}
     */
    FirewallGroupOutResponse,

    /**
     * The FirewallGroupResourceOutAPI model constructor.
     * @property {module:model/FirewallGroupResourceOutAPI}
     */
    FirewallGroupResourceOutAPI,

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
     * The FirewallRuleOutAPI model constructor.
     * @property {module:model/FirewallRuleOutAPI}
     */
    FirewallRuleOutAPI,

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
     * The GetDatabaseBackups200Response model constructor.
     * @property {module:model/GetDatabaseBackups200Response}
     */
    GetDatabaseBackups200Response,

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
     * The GetDatabaseInstances200Response model constructor.
     * @property {module:model/GetDatabaseInstances200Response}
     */
    GetDatabaseInstances200Response,

    /**
     * The GetDatabaseUsers200Response model constructor.
     * @property {module:model/GetDatabaseUsers200Response}
     */
    GetDatabaseUsers200Response,

    /**
     * The GetDatabases200Response model constructor.
     * @property {module:model/GetDatabases200Response}
     */
    GetDatabases200Response,

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
     * The GetFinances403Response model constructor.
     * @property {module:model/GetFinances403Response}
     */
    GetFinances403Response,

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
     * The GetLocations200Response model constructor.
     * @property {module:model/GetLocations200Response}
     */
    GetLocations200Response,

    /**
     * The GetMailQuota200Response model constructor.
     * @property {module:model/GetMailQuota200Response}
     */
    GetMailQuota200Response,

    /**
     * The GetMailboxes200Response model constructor.
     * @property {module:model/GetMailboxes200Response}
     */
    GetMailboxes200Response,

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
     * The GetServerDiskAutoBackupSettings200Response model constructor.
     * @property {module:model/GetServerDiskAutoBackupSettings200Response}
     */
    GetServerDiskAutoBackupSettings200Response,

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
     * The GetSoftware200Response model constructor.
     * @property {module:model/GetSoftware200Response}
     */
    GetSoftware200Response,

    /**
     * The GetStorageFilesList200Response model constructor.
     * @property {module:model/GetStorageFilesList200Response}
     */
    GetStorageFilesList200Response,

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
     * The GetTokens200Response model constructor.
     * @property {module:model/GetTokens200Response}
     */
    GetTokens200Response,

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
     * The ImageDownloadAPI model constructor.
     * @property {module:model/ImageDownloadAPI}
     */
    ImageDownloadAPI,

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
     * The ImageOutAPI model constructor.
     * @property {module:model/ImageOutAPI}
     */
    ImageOutAPI,

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
     * The Invoice model constructor.
     * @property {module:model/Invoice}
     */
    Invoice,

    /**
     * The K8SVersionsResponse model constructor.
     * @property {module:model/K8SVersionsResponse}
     */
    K8SVersionsResponse,

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
     * The MailboxSpamFilter model constructor.
     * @property {module:model/MailboxSpamFilter}
     */
    MailboxSpamFilter,

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
     * The MountNetworkDrive model constructor.
     * @property {module:model/MountNetworkDrive}
     */
    MountNetworkDrive,

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
     * The NodeCount model constructor.
     * @property {module:model/NodeCount}
     */
    NodeCount,

    /**
     * The NodeGroupIn model constructor.
     * @property {module:model/NodeGroupIn}
     */
    NodeGroupIn,

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
     * The Policy model constructor.
     * @property {module:model/Policy}
     */
    Policy,

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
     * The Quota model constructor.
     * @property {module:model/Quota}
     */
    Quota,

    /**
     * The RefreshApiKey model constructor.
     * @property {module:model/RefreshApiKey}
     */
    RefreshApiKey,

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
     * The RenameStorageFileRequest model constructor.
     * @property {module:model/RenameStorageFileRequest}
     */
    RenameStorageFileRequest,

    /**
     * The Repository model constructor.
     * @property {module:model/Repository}
     */
    Repository,

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
     * The ResourcesResponse model constructor.
     * @property {module:model/ResourcesResponse}
     */
    ResourcesResponse,

    /**
     * The Rule model constructor.
     * @property {module:model/Rule}
     */
    Rule,

    /**
     * The S3Object model constructor.
     * @property {module:model/S3Object}
     */
    S3Object,

    /**
     * The S3ObjectOwner model constructor.
     * @property {module:model/S3ObjectOwner}
     */
    S3ObjectOwner,

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
     * The ServerBackup model constructor.
     * @property {module:model/ServerBackup}
     */
    ServerBackup,

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
     * The SettingCondition model constructor.
     * @property {module:model/SettingCondition}
     */
    SettingCondition,

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
     * The Subdomain model constructor.
     * @property {module:model/Subdomain}
     */
    Subdomain,

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
     * The UpdateBalancer model constructor.
     * @property {module:model/UpdateBalancer}
     */
    UpdateBalancer,

    /**
     * The UpdateCluster model constructor.
     * @property {module:model/UpdateCluster}
     */
    UpdateCluster,

    /**
     * The UpdateDb model constructor.
     * @property {module:model/UpdateDb}
     */
    UpdateDb,

    /**
     * The UpdateDedicatedServerRequest model constructor.
     * @property {module:model/UpdateDedicatedServerRequest}
     */
    UpdateDedicatedServerRequest,

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
     * The UpdateInstance model constructor.
     * @property {module:model/UpdateInstance}
     */
    UpdateInstance,

    /**
     * The UpdateKeyRequest model constructor.
     * @property {module:model/UpdateKeyRequest}
     */
    UpdateKeyRequest,

    /**
     * The UpdateMailQuotaRequest model constructor.
     * @property {module:model/UpdateMailQuotaRequest}
     */
    UpdateMailQuotaRequest,

    /**
     * The UpdateMailbox model constructor.
     * @property {module:model/UpdateMailbox}
     */
    UpdateMailbox,

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
     * The UpdateStorageRequest model constructor.
     * @property {module:model/UpdateStorageRequest}
     */
    UpdateStorageRequest,

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
     * The UpdateToken200Response model constructor.
     * @property {module:model/UpdateToken200Response}
     */
    UpdateToken200Response,

    /**
     * The UpdateVpc model constructor.
     * @property {module:model/UpdateVpc}
     */
    UpdateVpc,

    /**
     * The UpdeteSettings model constructor.
     * @property {module:model/UpdeteSettings}
     */
    UpdeteSettings,

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
    * The APIKeysApi service constructor.
    * @property {module:api/APIKeysApi}
    */
    APIKeysApi,

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
    * The ProjectsApi service constructor.
    * @property {module:api/ProjectsApi}
    */
    ProjectsApi,

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
