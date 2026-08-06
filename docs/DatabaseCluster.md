# TimewebCloudApi.DatabaseCluster

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** | ID для каждого экземпляра базы данных. Автоматически генерируется при создании. | 
**createdAt** | **String** | Значение времени, указанное в комбинированном формате даты и времени ISO8601, которое представляет, когда была создана база данных. | 
**location** | **String** | Локация сервера. | 
**name** | **String** | Название кластера базы данных. | 
**description** | **String** | Описание кластера базы данных. | 
**networks** | [**[DatabaseClusterNetworksInner]**](DatabaseClusterNetworksInner.md) | Список сетей кластера базы данных. | 
**isEnabledPublicIpv6** | **Boolean** | Использование публичного IPv6-адреса. | 
**type** | **String** | Тип базы данных. Список возможных значений шире, чем список типов, доступных при создании нового кластера. | 
**hashType** | **String** | Тип хеширования кластера базы данных (mysql5 | mysql | postgres). | 
**avatarLink** | **String** | Ссылка на аватар для базы данных. | 
**port** | **Number** | Порт | 
**status** | **String** | Текущий статус кластера базы данных. Значение &#x60;read_only&#x60; означает, что запись в кластер заблокирована из-за переполнения диска — чтобы снять блокировку, освободите место или увеличьте размер диска. | 
**presetId** | **Number** | ID тарифа. Равен &#x60;null&#x60; у кластеров, созданных через конфигуратор — в этом случае заполнен &#x60;configurator_id&#x60;. | 
**configuratorId** | **Number** | ID конфигуратора. Равен &#x60;null&#x60; у кластеров, созданных по тарифу. | 
**cpu** | **Number** | Количество ядер процессора. | 
**cpuFrequency** | **String** | Частота процессора. | 
**isDedicatedCpu** | **Boolean** | Используются ли выделенные ядра процессора. | 
**ram** | **Number** | Объем оперативной памяти (в Мб). | 
**disk** | [**DatabaseClusterDisk**](DatabaseClusterDisk.md) |  | 
**hasAdditionalDisk** | **Boolean** | Подключен ли к кластеру дополнительный диск. | 
**diskAutoscaling** | [**DatabaseClusterDiskAutoscaling**](DatabaseClusterDiskAutoscaling.md) |  | 
**configParameters** | [**Mysql**](Mysql.md) |  | 
**isEnabledPublicNetwork** | **Boolean** | Доступность публичного IP-адреса | 
**isSecureConnectionEnabled** | **Boolean** | Включено ли защищенное подключение к кластеру базы данных. | 
**isAutobackupsEnabled** | **Boolean** | Включены ли автоматические резервные копии кластера базы данных. | 
**isBackupScheduleEnabled** | **Boolean** | Включено ли расписание резервного копирования кластера базы данных. | 
**availabilityZone** | [**AvailabilityZone**](AvailabilityZone.md) |  | 
**projectId** | **Number** | ID проекта, в котором находится кластер базы данных. | [optional] 
**replicaList** | [**[DatabaseClusterReplicaListInner]**](DatabaseClusterReplicaListInner.md) | Список реплик кластера базы данных. | 
**domains** | [**[DatabaseClusterDomainsInner]**](DatabaseClusterDomainsInner.md) | Список доменов кластера базы данных. Если публичная сеть отключена (&#x60;is_enabled_public_network: false&#x60;), список всегда пустой. | 
**childServices** | [**[DatabaseClusterChildServicesInner]**](DatabaseClusterChildServicesInner.md) | Список дочерних сервисов кластера базы данных. | 
**parentServices** | [**[DatabaseClusterParentServicesInner]**](DatabaseClusterParentServicesInner.md) | Список родительских сервисов кластера базы данных. | 
**maintenanceSlot** | [**DatabaseClusterMaintenanceSlot**](DatabaseClusterMaintenanceSlot.md) |  | 



## Enum: LocationEnum


* `ru-1` (value: `"ru-1"`)

* `ru-3` (value: `"ru-3"`)

* `pl-1` (value: `"pl-1"`)

* `nl-1` (value: `"nl-1"`)

* `de-1` (value: `"de-1"`)

* `us-2` (value: `"us-2"`)

* `us-3` (value: `"us-3"`)





## Enum: TypeEnum


* `mysql` (value: `"mysql"`)

* `mysql5` (value: `"mysql5"`)

* `mysql8_4` (value: `"mysql8_4"`)

* `postgres` (value: `"postgres"`)

* `postgres14` (value: `"postgres14"`)

* `postgres15` (value: `"postgres15"`)

* `postgres16` (value: `"postgres16"`)

* `postgres17` (value: `"postgres17"`)

* `postgres18` (value: `"postgres18"`)

* `redis` (value: `"redis"`)

* `redis7` (value: `"redis7"`)

* `redis8_1` (value: `"redis8_1"`)

* `valkey` (value: `"valkey"`)

* `valkey7` (value: `"valkey7"`)

* `valkey8_1` (value: `"valkey8_1"`)

* `valkey9_1` (value: `"valkey9_1"`)

* `mongodb` (value: `"mongodb"`)

* `mongodb4` (value: `"mongodb4"`)

* `mongodb6` (value: `"mongodb6"`)

* `mongodb7` (value: `"mongodb7"`)

* `mongodb8_0` (value: `"mongodb8_0"`)

* `opensearch` (value: `"opensearch"`)

* `opensearch2_19` (value: `"opensearch2_19"`)

* `clickhouse` (value: `"clickhouse"`)

* `clickhouse24` (value: `"clickhouse24"`)

* `clickhouse25` (value: `"clickhouse25"`)

* `kafka` (value: `"kafka"`)

* `rabbitmq` (value: `"rabbitmq"`)

* `rabbitmq4_0` (value: `"rabbitmq4_0"`)





## Enum: HashTypeEnum


* `caching_sha2` (value: `"caching_sha2"`)

* `mysql_native` (value: `"mysql_native"`)

* `null` (value: `"null"`)





## Enum: StatusEnum


* `started` (value: `"started"`)

* `starting` (value: `"starting"`)

* `stopped` (value: `"stopped"`)

* `no_paid` (value: `"no_paid"`)

* `lan_transfer` (value: `"lan_transfer"`)

* `error` (value: `"error"`)

* `blocked` (value: `"blocked"`)

* `backup_recovery` (value: `"backup_recovery"`)

* `transfer` (value: `"transfer"`)

* `rebooting` (value: `"rebooting"`)

* `turning_off` (value: `"turning_off"`)

* `turning_on` (value: `"turning_on"`)

* `read_only` (value: `"read_only"`)

* `user_transfer` (value: `"user_transfer"`)




