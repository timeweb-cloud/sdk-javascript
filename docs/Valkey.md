# TimewebCloudApi.Valkey

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**clientOutputBufferLimitNormal** | **String** | Ограничение буфера вывода для обычных клиентских подключений. Формат: &#x60;hard-limit soft-limit soft-seconds&#x60; (&#x60;valkey&#x60; | &#x60;valkey7&#x60; | &#x60;valkey8_1&#x60; | &#x60;valkey9_1&#x60;). | [optional] 
**clientOutputBufferLimitPubsub** | **String** | Ограничение буфера вывода для клиентов pub/sub. Формат: &#x60;hard-limit soft-limit soft-seconds&#x60; (&#x60;valkey&#x60; | &#x60;valkey7&#x60; | &#x60;valkey8_1&#x60; | &#x60;valkey9_1&#x60;). | [optional] 
**databases** | **String** | Количество логических баз данных на сервере (&#x60;valkey&#x60; | &#x60;valkey7&#x60; | &#x60;valkey8_1&#x60; | &#x60;valkey9_1&#x60;). | [optional] 
**timeout** | **String** | Время ожидания в секундах перед закрытием неактивного клиентского соединения. &#x60;0&#x60; — отключено (&#x60;valkey&#x60; | &#x60;valkey7&#x60; | &#x60;valkey8_1&#x60; | &#x60;valkey9_1&#x60;). | [optional] 
**maxmemoryPolicy** | **String** | Политика вытеснения ключей при достижении лимита памяти (&#x60;valkey&#x60; | &#x60;valkey7&#x60; | &#x60;valkey8_1&#x60; | &#x60;valkey9_1&#x60;). | [optional] 
**slowlogLogSlowerThan** | **String** | Минимальное время выполнения команды в микросекундах для записи в журнал медленных команд (&#x60;valkey&#x60; | &#x60;valkey7&#x60; | &#x60;valkey8_1&#x60; | &#x60;valkey9_1&#x60;). | [optional] 
**slowlogMaxLen** | **String** | Максимальное количество записей, хранящихся в журнале медленных команд (&#x60;valkey&#x60; | &#x60;valkey7&#x60; | &#x60;valkey8_1&#x60; | &#x60;valkey9_1&#x60;). | [optional] 
**save** | **String** | Условие создания снимка RDB на диск. Формат: &#x60;seconds changes&#x60; — сохранение выполняется, если за указанное время было сделано не менее указанного количества изменений (&#x60;valkey&#x60; | &#x60;valkey7&#x60; | &#x60;valkey8_1&#x60; | &#x60;valkey9_1&#x60;). | [optional] 
**appendonly** | **String** | Включение режима AOF (Append Only File) для персистентного хранения данных (&#x60;valkey&#x60; | &#x60;valkey7&#x60; | &#x60;valkey8_1&#x60; | &#x60;valkey9_1&#x60;). | [optional] 
**appendfsync** | **String** | Режим синхронизации AOF-файла с диском: &#x60;always&#x60; — при каждой записи, &#x60;everysec&#x60; — раз в секунду, &#x60;no&#x60; — управление передаётся ОС (&#x60;valkey&#x60; | &#x60;valkey7&#x60; | &#x60;valkey8_1&#x60; | &#x60;valkey9_1&#x60;). | [optional] 
**tcpKeepalive** | **String** | Интервал проверки активности TCP-соединения в секундах. &#x60;0&#x60; — отключено (&#x60;valkey&#x60; | &#x60;valkey7&#x60; | &#x60;valkey8_1&#x60; | &#x60;valkey9_1&#x60;). | [optional] 


