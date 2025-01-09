# TimewebCloudApi.UpdateAdmin

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**password** | **String** | Пароль пользователя базы данных | [optional] 
**privileges** | **[String]** | Список привилегий пользователя базы данных | [optional] 
**description** | **String** | Описание пользователя базы данных | [optional] 
**instanceId** | **Number** | ID инстанса базы данных для приминения привилегий. В данных момент поле доступно только для кластеров MySQL. Если поле не передано, то привилегии будут применены ко всем инстансам | [optional] 



## Enum: [PrivilegesEnum]


* `ALTER` (value: `"ALTER"`)

* `CREATE_VIEW` (value: `"CREATE_VIEW"`)

* `CREATE` (value: `"CREATE"`)

* `DELETE` (value: `"DELETE"`)

* `DROP` (value: `"DROP"`)

* `EVENT` (value: `"EVENT"`)

* `INDEX` (value: `"INDEX"`)

* `INSERT` (value: `"INSERT"`)

* `LOCK_TABLES` (value: `"LOCK_TABLES"`)

* `REFERENCES` (value: `"REFERENCES"`)

* `SELECT` (value: `"SELECT"`)

* `SHOW_VIEW` (value: `"SHOW_VIEW"`)

* `TRUNCATE` (value: `"TRUNCATE"`)

* `UPDATE` (value: `"UPDATE"`)

* `READ` (value: `"READ"`)

* `WRITE` (value: `"WRITE"`)

* `CONNECTION` (value: `"CONNECTION"`)

* `FAST` (value: `"FAST"`)

* `readWrite` (value: `"readWrite"`)

* `ALTER_ROUTINE` (value: `"ALTER_ROUTINE"`)

* `CREATE_ROUTINE` (value: `"CREATE_ROUTINE"`)

* `TRANSACTION` (value: `"TRANSACTION"`)




