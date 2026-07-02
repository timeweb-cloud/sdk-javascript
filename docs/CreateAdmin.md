# TimewebCloudApi.CreateAdmin

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**login** | **String** | Имя пользователя базы данных | 
**password** | **String** | Пароль пользователя базы данных | 
**host** | **String** | Хост пользователя | [optional] 
**instanceId** | **Number** | ID инстанса базы данных для применения привилегий. Если поле не передано, то привилегии будут применены ко всем инстансам | [optional] 
**privileges** | [**[PropertiesMysql]**](PropertiesMysql.md) | Список привилегий пользователя базы данных | 
**description** | **String** | Описание пользователя базы данных | [optional] 


