# TimewebCloudApi.ConfigParameters

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**autoIncrementIncrement** | **String** | Интервал между значениями столбцов с атрибутом &#x60;AUTO_INCREMENT&#x60; (&#x60;mysql5&#x60; | &#x60;mysql&#x60;). | [optional] 
**autoIncrementOffset** | **String** | Начальное значение для столбцов с атрибутом &#x60;AUTO_INCREMENT&#x60; (&#x60;mysql5&#x60; | &#x60;mysql&#x60;). | [optional] 
**innodbIoCapacity** | **String** | Количество операций ввода-вывода в секунду &#x60;IOPS&#x60; (&#x60;mysql5&#x60; | &#x60;mysql&#x60;). | [optional] 
**innodbPurgeThreads** | **String** | Количество потоков ввода-вывода, используемых для операций очистки (&#x60;mysql5&#x60; | &#x60;mysql&#x60;). | [optional] 
**innodbReadIoThreads** | **String** | Количество потоков ввода-вывода, используемых для операций чтения (&#x60;mysql5&#x60; | &#x60;mysql&#x60;). | [optional] 
**innodbThreadConcurrency** | **String** | Максимальное число потоков, которые могут исполняться (&#x60;mysql5&#x60; | &#x60;mysql&#x60;). | [optional] 
**innodbWriteIoThreads** | **String** | Количество потоков ввода-вывода, используемых для операций записи (&#x60;mysql5&#x60; | &#x60;mysql&#x60;). | [optional] 
**joinBufferSize** | **String** | Минимальный размер буфера (&#x60;mysql5&#x60; | &#x60;mysql&#x60;). | [optional] 
**maxAllowedPacket** | **String** | Максимальный размер одного пакета, строки или параметра, отправляемого функцией &#x60;mysql_stmt_send_long_data()&#x60; (&#x60;mysql5&#x60; | &#x60;mysql&#x60;). | [optional] 
**maxHeapTableSize** | **String** | Максимальный размер пользовательских MEMORY-таблиц (&#x60;mysql5&#x60; | &#x60;mysql&#x60;). | [optional] 
**autovacuumAnalyzeScaleFactor** | **String** | Доля измененных или удаленных записей в таблице, при которой процесс автоочистки выполнит команду &#x60;ANALYZE&#x60; (&#x60;postgres&#x60; | &#x60;postgres14&#x60;| &#x60;postgres15&#x60;). | [optional] 
**bgwriterDelay** | **String** | Задержка между запусками процесса фоновой записи (&#x60;postgres&#x60; | &#x60;postgres14&#x60;| &#x60;postgres15&#x60;). | [optional] 
**bgwriterLruMaxpages** | **String** | Максимальное число элементов буферного кеша (&#x60;postgres&#x60; | &#x60;postgres14&#x60;| &#x60;postgres15&#x60;). | [optional] 
**deadlockTimeout** | **String** | Время ожидания, по истечении которого будет выполняться проверка состояния перекрестной блокировки (&#x60;postgres&#x60; | &#x60;postgres14&#x60;| &#x60;postgres15&#x60;). | [optional] 
**ginPendingListLimit** | **String** | Максимальный размер очереди записей индекса &#x60;GIN&#x60; (&#x60;postgres&#x60; | &#x60;postgres14&#x60;| &#x60;postgres15&#x60;). | [optional] 
**idleInTransactionSessionTimeout** | **String** | Время простоя открытой транзакции, при превышении которого будет завершена сессия с этой транзакцией (&#x60;postgres&#x60; | &#x60;postgres14&#x60;| &#x60;postgres15&#x60;). | [optional] 
**idleSessionTimeout** | **String** | Время простоя не открытой транзакции, при превышении которого будет завершена сессия с этой транзакцией (&#x60;postgres&#x60; | &#x60;postgres14&#x60;| &#x60;postgres15&#x60;). | [optional] 
**joinCollapseLimit** | **String** | Значение количества элементов в списке &#x60;FROM&#x60; при превышении которого, планировщик будет переносить в список явные инструкции &#x60;JOIN&#x60; (&#x60;postgres&#x60; | &#x60;postgres14&#x60;| &#x60;postgres15&#x60;). | [optional] 
**lockTimeout** | **String** | Время ожидания освобождения блокировки (&#x60;postgres&#x60; | &#x60;postgres14&#x60;| &#x60;postgres15&#x60;). | [optional] 
**maxPreparedTransactions** | **String** | Максимальное число транзакций, которые могут одновременно находиться в подготовленном состоянии (&#x60;postgres&#x60; | &#x60;postgres14&#x60;| &#x60;postgres15&#x60;). | [optional] 
**maxConnections** | **String** | Допустимое количество соединений (&#x60;postgres&#x60; | &#x60;postgres14&#x60;| &#x60;postgres15&#x60; | &#x60;mysql&#x60;). | [optional] 
**sharedBuffers** | **String** | Устанавливает количество буферов общей памяти, используемых сервером (&#x60;postgres&#x60; | &#x60;postgres14&#x60;| &#x60;postgres15&#x60;). | [optional] 
**walBuffers** | **String** | Устанавливает количество буферов дисковых страниц в общей памяти для WAL (&#x60;postgres&#x60; | &#x60;postgres14&#x60;| &#x60;postgres15&#x60;). | [optional] 
**tempBuffers** | **String** | Устанавливает максимальное количество временных буферов, используемых каждой сессией (&#x60;postgres&#x60; | &#x60;postgres14&#x60;| &#x60;postgres15&#x60;). | [optional] 
**workMem** | **String** | Устанавливает максимальное количество памяти, используемое для рабочих пространств запросов (&#x60;postgres&#x60; | &#x60;postgres14&#x60;| &#x60;postgres15&#x60;). | [optional] 
**sqlMode** | **String** | Устанавливает режим SQL. Можно задать несколько режимов, разделяя их запятой. (&#x60;mysql&#x60;). | [optional] 
**queryCacheType** | **String** | Параметр включает или отключает работу MySQL Query Cache (&#x60;mysql&#x60;). | [optional] 
**queryCacheSize** | **String** | Размер в байтах, доступный для кэша запросов (&#x60;mysql&#x60;). | [optional] 


