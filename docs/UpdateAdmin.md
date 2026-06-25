# TimewebCloudApi.UpdateAdmin

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**password** | **String** | Пароль пользователя базы данных | [optional] 
**privileges** | **[String]** | Список привилегий пользователя базы данных | [optional] 
**description** | **String** | Описание пользователя базы данных | [optional] 
**instanceId** | **Number** | ID инстанса базы данных для применения привилегий. Если поле не передано, то привилегии будут применены ко всем инстансам | [optional] 



## Enum: [PrivilegesEnum]


* `ALTER` (value: `"ALTER"`)

* `ALTER_TABLE` (value: `"ALTER_TABLE"`)

* `ALTER_VIEW` (value: `"ALTER_VIEW"`)

* `CREATE_VIEW` (value: `"CREATE_VIEW"`)

* `CREATE_DICTIONARY` (value: `"CREATE_DICTIONARY"`)

* `CREATE_FUNCTION` (value: `"CREATE_FUNCTION"`)

* `CREATE_TABLE` (value: `"CREATE_TABLE"`)

* `CREATE` (value: `"CREATE"`)

* `DELETE` (value: `"DELETE"`)

* `DROP` (value: `"DROP"`)

* `DROP_TABLE` (value: `"DROP_TABLE"`)

* `DROP_VIEW` (value: `"DROP_VIEW"`)

* `DROP_DICTIONARY` (value: `"DROP_DICTIONARY"`)

* `EVENT` (value: `"EVENT"`)

* `INDEX` (value: `"INDEX"`)

* `INSERT` (value: `"INSERT"`)

* `LOCK_TABLES` (value: `"LOCK_TABLES"`)

* `REFERENCES` (value: `"REFERENCES"`)

* `SELECT` (value: `"SELECT"`)

* `SHOW` (value: `"SHOW"`)

* `SHOW_VIEW` (value: `"SHOW_VIEW"`)

* `TRUNCATE` (value: `"TRUNCATE"`)

* `TRIGGER` (value: `"TRIGGER"`)

* `UPDATE` (value: `"UPDATE"`)

* `READ` (value: `"READ"`)

* `WRITE` (value: `"WRITE"`)

* `READ_WRITE` (value: `"READ_WRITE"`)

* `DB_ADMIN` (value: `"DB_ADMIN"`)

* `ALTER_ROUTINE` (value: `"ALTER_ROUTINE"`)

* `CREATE_ROUTINE` (value: `"CREATE_ROUTINE"`)

* `CREATE_TEMPORARY_TABLES` (value: `"CREATE_TEMPORARY_TABLES"`)

* `TEMPORARY` (value: `"TEMPORARY"`)

* `CONFIGURE` (value: `"CONFIGURE"`)

* `READ_DASHBOARD` (value: `"READ_DASHBOARD"`)

* `WRITE_DASHBOARD` (value: `"WRITE_DASHBOARD"`)

* `DESCRIBE` (value: `"DESCRIBE"`)

* `OPTIMIZE` (value: `"OPTIMIZE"`)

* `EXECUTE` (value: `"EXECUTE"`)

* `CREATEDB` (value: `"CREATEDB"`)

* `CREATEROLE` (value: `"CREATEROLE"`)

* `CREATE_DB` (value: `"CREATE_DB"`)

* `CREATE_USER` (value: `"CREATE_USER"`)

* `PROCESS` (value: `"PROCESS"`)

* `SLOW_LOG` (value: `"SLOW_LOG"`)

* `CREATE_TEMPORARY_TABLE` (value: `"CREATE_TEMPORARY_TABLE"`)

* `ADMIN` (value: `"ADMIN"`)

* `BITMAP` (value: `"BITMAP"`)

* `BLOCKING` (value: `"BLOCKING"`)

* `CONNECTION` (value: `"CONNECTION"`)

* `DANGEROUS` (value: `"DANGEROUS"`)

* `GEO` (value: `"GEO"`)

* `HASH` (value: `"HASH"`)

* `HYPERLOGLOG` (value: `"HYPERLOGLOG"`)

* `FAST` (value: `"FAST"`)

* `KEYSPACE` (value: `"KEYSPACE"`)

* `LIST` (value: `"LIST"`)

* `PUBSUB` (value: `"PUBSUB"`)

* `SCRIPTING` (value: `"SCRIPTING"`)

* `SET` (value: `"SET"`)

* `SORTEDSET` (value: `"SORTEDSET"`)

* `SLOW` (value: `"SLOW"`)

* `STREAM` (value: `"STREAM"`)

* `STRING` (value: `"STRING"`)

* `TRANSACTION` (value: `"TRANSACTION"`)

* `dictGet` (value: `"dictGet"`)

* `dbAdmin` (value: `"dbAdmin"`)

* `readWrite` (value: `"readWrite"`)




