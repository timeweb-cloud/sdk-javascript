# TimewebCloudApi.CreateApp

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**providerId** | **String** | Уникальный идентификатор провайдера. | 
**type** | **String** | Тип приложения. | 
**repositoryId** | **String** | Уникальный идентификатор репозитория. | 
**buildCmd** | **String** | Команда сборки приложения. | 
**envs** | **Object** | Переменные окружения приложения. Объект с ключами и значениями типа string. | [optional] 
**branchName** | **String** | Название ветки репозитория из которой необходимо собрать приложение. | 
**isAutoDeploy** | **Boolean** | Автоматический деплой. | 
**commitSha** | **String** | Хэш коммита из которого необходимо собрать приложение. | 
**name** | **String** | Имя приложения. | 
**comment** | **String** | Комментарий к приложения. | 
**presetId** | **Number** | Идентификатор тарифа. | 
**envVersion** | **String** | Версия окружения. | [optional] 
**framework** | [**Frameworks**](Frameworks.md) |  | 
**indexDir** | **String** | Директория с индексным файлом. Обязателен для приложений &#x60;type: frontend&#x60;. Не используется для приложений &#x60;type: backend&#x60;. Должно начинаться с &#x60;/&#x60;. | [optional] 
**runCmd** | **String** | Команда для запуска приложения. Обязателен для приложений &#x60;type: backend&#x60;. Не используется для приложений &#x60;type: frontend&#x60;. | [optional] 



## Enum: TypeEnum


* `frontend` (value: `"frontend"`)

* `backend` (value: `"backend"`)



