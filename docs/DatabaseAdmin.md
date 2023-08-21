# TimewebCloudApi.DatabaseAdmin

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** | Уникальный идентификатор для каждого экземпляра пользователя базы данных. Автоматически генерируется при создании. | 
**createdAt** | **String** | Значение времени, указанное в комбинированном формате даты и времени ISO8601, которое представляет, когда была создана база данных. | 
**login** | **String** | Имя пользователя базы данных | 
**password** | **String** | Пароль пользователя базы данных | 
**description** | **String** | Описанеие пользователя базы данных | 
**host** | **String** | Хост пользователя | 
**instances** | [**[DatabaseAdminInstancesInner]**](DatabaseAdminInstancesInner.md) |  | 


