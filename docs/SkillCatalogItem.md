# TimewebCloudApi.SkillCatalogItem

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** | ID навыка в каталоге | 
**key** | **String** | Уникальный ключ навыка в каталоге | 
**category** | **String** | Назначение: &#x60;communication&#x60; — манера общения, &#x60;support&#x60; — регламенты обслуживания, &#x60;sales&#x60; — продажи, &#x60;content&#x60; — документы и база знаний, &#x60;safety&#x60; — ограничения и безопасность | 
**name** | **String** | Название навыка | 
**description** | **String** | Краткое описание навыка | 
**whenToUse** | **String** | Когда применять навык | 
**instruction** | **String** | Полная инструкция навыка | 
**version** | **Number** | Версия навыка в каталоге | 
**isInstalled** | **Boolean** | Навык уже установлен в аккаунте | 
**installedSkillId** | **Number** | ID установленного навыка в аккаунте | 
**isModified** | **Boolean** | Установленный навык изменялся владельцем | 
**hasCatalogUpdate** | **Boolean** | В каталоге есть версия новее установленной | 



## Enum: CategoryEnum


* `communication` (value: `"communication"`)

* `support` (value: `"support"`)

* `sales` (value: `"sales"`)

* `content` (value: `"content"`)

* `safety` (value: `"safety"`)




