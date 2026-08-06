# TimewebCloudApi.DatabaseInstance

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** | ID для каждого экземпляра базы данных. Автоматически генерируется при создании. | 
**createdAt** | **String** | Значение времени, указанное в комбинированном формате даты и времени ISO8601, которое представляет, когда была создана база данных. | 
**name** | **String** | Название базы данных. | 
**description** | **String** | Описание базы данных | 
**extensions** | [**DatabaseExtensions**](DatabaseExtensions.md) |  | 
**ownerId** | **Number** | ID администратора базы данных, который является владельцем этой базы данных. &#x60;null&#x60;, если владелец не задан. | 
**configParameters** | [**KafkaConfigParameters**](KafkaConfigParameters.md) |  | 


