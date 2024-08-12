# TimewebCloudApi.UpdeteSettings

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**isAutoDeploy** | **Boolean** | Автоматический деплой. | [optional] 
**buildCmd** | **String** | Команда сборки приложения. | [optional] 
**envs** | **Object** | Переменные окружения приложения. Объект с ключами и значениями типа string. | [optional] 
**branchName** | **String** | Название ветки репозитория из которой необходимо собрать приложение. | [optional] 
**commitSha** | **String** | Хэш коммита. | [optional] 
**envVersion** | **String** | Версия окружения. | [optional] 
**indexDir** | **String** | Директория с индексным файлом. Обязателен для приложений &#x60;type: frontend&#x60;. Не используется для приложений &#x60;type: backend&#x60;. | [optional] 
**runCmd** | **String** | Команда для запуска приложения. Обязателен для приложений &#x60;type: backend&#x60;. Не используется для приложений &#x60;type: frontend&#x60;. | [optional] 
**framework** | [**Frameworks**](Frameworks.md) |  | [optional] 
**name** | **String** | Имя приложения. | [optional] 
**comment** | **String** | Комментарий к приложения. | [optional] 
**presetId** | **Number** | Идентификатор тарифа. | [optional] 


