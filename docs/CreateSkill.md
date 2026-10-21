# TimewebCloudApi.CreateSkill

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **String** | Название навыка, уникальное в аккаунте | 
**whenToUse** | **String** | Когда применять навык. Описывайте ситуации и формулировки клиента. Если текст короче 40 символов, придёт предупреждение &#x60;when_to_use_too_short&#x60; | 
**instruction** | **String** | Инструкция навыка | 
**scripts** | [**[SkillScriptInput]**](SkillScriptInput.md) | Скрипты навыка: до 20 файлов общим размером до 10 МБ | [optional] 


