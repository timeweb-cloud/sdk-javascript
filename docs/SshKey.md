# TimewebCloudApi.SshKey

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** | ID SSH-ключа. | 
**name** | **String** | Название SSH-ключа. | 
**body** | **String** | Тело SSH-ключа. | 
**createdAt** | **Date** | Значение времени, указанное в комбинированном формате даты и времени ISO8601, которое представляет, когда был создан SSH-ключ. | 
**usedBy** | [**[SshKeyUsedByInner]**](SshKeyUsedByInner.md) | Список серверов, которые используют SSH-ключ. | 
**isDefault** | **Boolean** | Это логическое значение, которое показывает, будет ли выбираться SSH-ключ по умолчанию при создании сервера. | [optional] 


