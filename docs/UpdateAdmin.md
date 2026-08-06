# TimewebCloudApi.UpdateAdmin

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**login** | **String** | Новое имя пользователя базы данных. Переименование доступно только в кластерах PostgreSQL | [optional] 
**password** | **String** | Пароль пользователя базы данных | [optional] 
**privileges** | [**[PropertiesMysql]**](PropertiesMysql.md) | Список привилегий пользователя базы данных | [optional] 
**description** | **String** | Описание пользователя базы данных | [optional] 
**instanceId** | **Number** | ID инстанса базы данных для применения привилегий. Если поле не передано, то привилегии будут применены ко всем инстансам | [optional] 
**forAll** | **Boolean** | Выдать привилегии на все инстансы базы данных | [optional] 


