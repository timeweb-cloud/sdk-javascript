# TimewebCloudApi.UpdateKafkaConfigParameters

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**partitions** | **Number** | Количество партиций топика. Количество партиций нельзя уменьшить: если передать значение меньше текущего, останется текущее. | [optional] 
**cleanupPolicy** | **String** | Политика очистки старых сегментов лога: &#x60;delete&#x60; — удалять, &#x60;compact&#x60; — уплотнять. | [optional] 
**compressionType** | **String** | Тип сжатия сообщений в топике. | [optional] 
**deleteRetentionMs** | **Number** | Время (в мс) хранения меток удаления для уплотняемых топиков. Максимальное значение — 9223372036854775807. | [optional] 
**fileDeleteDelayMs** | **Number** | Задержка (в мс) перед удалением файла из файловой системы. Максимальное значение — 9223372036854775807. | [optional] 
**flushMessages** | **Number** | Количество сообщений, после которого данные принудительно сбрасываются на диск. Максимальное значение — 9223372036854775807. | [optional] 
**flushMs** | **Number** | Интервал (в мс), после которого данные принудительно сбрасываются на диск. Максимальное значение — 9223372036854775807. | [optional] 
**indexIntervalBytes** | **Number** | Интервал (в байтах), с которым Kafka добавляет запись в индекс смещений. | [optional] 
**minCompactionLagMs** | **Number** | Минимальное время (в мс), в течение которого сообщение остается неуплотненным. Максимальное значение — 9223372036854775807. | [optional] 
**maxCompactionLagMs** | **Number** | Максимальное время (в мс), в течение которого сообщение может оставаться неуплотненным. Максимальное значение — 9223372036854775807. | [optional] 
**maxMessageBytes** | **Number** | Максимальный размер (в байтах) пакета сообщений. | [optional] 
**messageFormatVersion** | **String** | Версия формата сообщений, в котором Kafka добавляет сообщения в лог. | [optional] 
**messageTimestampDifferenceMaxMs** | **Number** | Максимально допустимая разница (в мс) между временной меткой сообщения и временем его получения брокером. Максимальное значение — 9223372036854775807. | [optional] 
**messageDownconversionEnable** | **String** | Понижение версии формата сообщений для старых клиентов. | [optional] 
**messageTimestampType** | **String** | Источник временной метки сообщения: &#x60;CreateTime&#x60; — время создания сообщения клиентом, &#x60;LogAppendTime&#x60; — время добавления сообщения в лог брокером. | [optional] 
**minCleanableDirtyRatio** | **Number** | Доля неуплотненных данных в логе, при которой запускается уплотнение. | [optional] 
**minInsyncReplicas** | **Number** | Минимальное количество синхронизированных реплик, необходимое для подтверждения записи. | [optional] 
**preallocate** | **String** | Предварительное выделение места на диске при создании нового сегмента лога. | [optional] 
**retentionBytes** | **Number** | Максимальный размер (в байтах) партиции топика, после которого старые сегменты удаляются. &#x60;-1&#x60; — без ограничения. Максимальное значение — 9223372036854775807. | [optional] 
**retentionMs** | **Number** | Время (в мс) хранения сообщений в топике. &#x60;-1&#x60; — хранить бессрочно. Максимальное значение — 9223372036854775807. | [optional] 
**segmentBytes** | **Number** | Максимальный размер (в байтах) одного сегмента лога. | [optional] 
**segmentIndexBytes** | **Number** | Максимальный размер (в байтах) индексного файла сегмента лога. | [optional] 
**segmentJitterMs** | **Number** | Максимальное случайное отклонение (в мс) от времени ротации сегмента. Максимальное значение — 9223372036854775807. | [optional] 
**segmentMs** | **Number** | Период (в мс), после которого Kafka создает новый сегмент лога. Максимальное значение — 9223372036854775807. | [optional] 
**uncleanLeaderElectionEnable** | **String** | Возможность выбрать лидером партиции реплику, которая не входит в число синхронизированных. | [optional] 



## Enum: CleanupPolicyEnum


* `delete` (value: `"delete"`)

* `compact` (value: `"compact"`)





## Enum: CompressionTypeEnum


* `uncompressed` (value: `"uncompressed"`)

* `zstd` (value: `"zstd"`)

* `lz4` (value: `"lz4"`)

* `snappy` (value: `"snappy"`)

* `gzip` (value: `"gzip"`)

* `producer` (value: `"producer"`)





## Enum: MessageFormatVersionEnum


* `0.8.0` (value: `"0.8.0"`)

* `0.8.1` (value: `"0.8.1"`)

* `0.8.2` (value: `"0.8.2"`)

* `0.9.0` (value: `"0.9.0"`)

* `0.10.0-IV0` (value: `"0.10.0-IV0"`)

* `0.10.0-IV1` (value: `"0.10.0-IV1"`)

* `0.10.1-IV0` (value: `"0.10.1-IV0"`)

* `0.10.1-IV1` (value: `"0.10.1-IV1"`)

* `0.10.1-IV2` (value: `"0.10.1-IV2"`)

* `0.10.2-IV0` (value: `"0.10.2-IV0"`)

* `0.11.0-IV0` (value: `"0.11.0-IV0"`)

* `0.11.0-IV1` (value: `"0.11.0-IV1"`)

* `0.11.0-IV2` (value: `"0.11.0-IV2"`)

* `1.0-IV0` (value: `"1.0-IV0"`)

* `1.1-IV0` (value: `"1.1-IV0"`)

* `2.0-IV0` (value: `"2.0-IV0"`)

* `2.0-IV1` (value: `"2.0-IV1"`)

* `2.1-IV0` (value: `"2.1-IV0"`)

* `2.1-IV1` (value: `"2.1-IV1"`)

* `2.1-IV2` (value: `"2.1-IV2"`)

* `2.2-IV0` (value: `"2.2-IV0"`)

* `2.2-IV1` (value: `"2.2-IV1"`)

* `2.3-IV0` (value: `"2.3-IV0"`)

* `2.3-IV1` (value: `"2.3-IV1"`)

* `2.4-IV0` (value: `"2.4-IV0"`)

* `2.4-IV1` (value: `"2.4-IV1"`)

* `2.5-IV0` (value: `"2.5-IV0"`)

* `2.6-IV0` (value: `"2.6-IV0"`)

* `2.7-IV0` (value: `"2.7-IV0"`)

* `2.7-IV1` (value: `"2.7-IV1"`)

* `2.7-IV2` (value: `"2.7-IV2"`)

* `2.8-IV0` (value: `"2.8-IV0"`)

* `2.8-IV1` (value: `"2.8-IV1"`)

* `3.0-IV0` (value: `"3.0-IV0"`)

* `3.0-IV1` (value: `"3.0-IV1"`)

* `3.1-IV0` (value: `"3.1-IV0"`)

* `3.2-IV0` (value: `"3.2-IV0"`)

* `3.3-IV0` (value: `"3.3-IV0"`)

* `3.3-IV1` (value: `"3.3-IV1"`)

* `3.3-IV2` (value: `"3.3-IV2"`)

* `3.3-IV3` (value: `"3.3-IV3"`)

* `3.4-IV0` (value: `"3.4-IV0"`)

* `3.5-IV0` (value: `"3.5-IV0"`)

* `3.5-IV1` (value: `"3.5-IV1"`)

* `3.5-IV2` (value: `"3.5-IV2"`)





## Enum: MessageDownconversionEnableEnum


* `ON` (value: `"ON"`)

* `OFF` (value: `"OFF"`)





## Enum: MessageTimestampTypeEnum


* `CreateTime` (value: `"CreateTime"`)

* `LogAppendTime` (value: `"LogAppendTime"`)





## Enum: PreallocateEnum


* `ON` (value: `"ON"`)

* `OFF` (value: `"OFF"`)





## Enum: UncleanLeaderElectionEnableEnum


* `ON` (value: `"ON"`)

* `OFF` (value: `"OFF"`)




