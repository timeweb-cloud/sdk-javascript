# TimewebCloudApi.App

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** | Уникальный идентификатор для каждого экземпляра приложения. Автоматически генерируется при создании. | 
**type** | **String** | Тип приложения. | 
**name** | **String** | Удобочитаемое имя, установленное для приложения. | 
**status** | **String** | Статус приложения. | 
**provider** | [**AppProvider**](AppProvider.md) |  | 
**ip** | **String** | IPv4-адрес приложения. | 
**domains** | [**[AppDomainsInner]**](AppDomainsInner.md) |  | 
**framework** | [**Frameworks**](Frameworks.md) |  | 
**location** | **String** | Локация сервера. | 
**repository** | [**Repository**](Repository.md) |  | 
**envVersion** | **String** | Версия окружения. | 
**envs** | **Object** | Переменные окружения приложения. Объект с ключами и значениями типа string. | 
**branchName** | **String** | Название ветки репозитория из которой собрано приложение. | 
**isAutoDeploy** | **Boolean** | Включен ли автоматический деплой. | 
**commitSha** | **String** | Хэш коммита из которого собрано приложеие. | 
**comment** | **String** | Комментарий к приложению. | 
**presetId** | **Number** | Идентификатор тарифа. | 
**indexDir** | **String** | Директория с индексным файлом. Определено для приложений &#x60;type: frontend&#x60;. Для приложений &#x60;type: backend&#x60; всегда null. | 
**buildCmd** | **String** | Команда сборки приложения. | 
**runCmd** | **String** | Команда для запуска приложения. Определено для приложений &#x60;type: backend&#x60;. Для приложений &#x60;type: frontend&#x60; всегда null. | 
**configuration** | [**AppConfiguration**](AppConfiguration.md) |  | 
**diskStatus** | [**AppDiskStatus**](AppDiskStatus.md) |  | 
**isQemuAgent** | **Boolean** | Включен ли агент QEMU. | 
**language** | **String** | Язык программирования приложения. | 
**startTime** | **Date** | Время запуска приложения. | 



## Enum: TypeEnum


* `backend` (value: `"backend"`)

* `frontend` (value: `"frontend"`)





## Enum: StatusEnum


* `active` (value: `"active"`)

* `paused` (value: `"paused"`)

* `no_paid` (value: `"no_paid"`)

* `deploy` (value: `"deploy"`)

* `failure` (value: `"failure"`)

* `startup_error` (value: `"startup_error"`)

* `new` (value: `"new"`)

* `reboot` (value: `"reboot"`)





## Enum: LocationEnum


* `ru-1` (value: `"ru-1"`)

* `pl-1` (value: `"pl-1"`)

* `nl-1` (value: `"nl-1"`)




