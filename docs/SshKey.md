# TimewebCloudApi.SshKey

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** | Уникальный идентификатор SSH-ключа | 
**name** | **String** | Название SSH-ключа | 
**body** | **String** | Тело SSH-ключа | 
**createdAt** | **Date** | Дата создания ключа | 
**usedBy** | [**[SshKeyUsedByInner]**](SshKeyUsedByInner.md) | Список серверов, которые используют SSH-ключ | 
**isDefault** | **Boolean** | Будет ли выбираться SSh-ключ по умолчанию при создании сервера | [optional] 


