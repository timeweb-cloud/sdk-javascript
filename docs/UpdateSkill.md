# TimewebCloudApi.UpdateSkill

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **String** | Название навыка. Изменение названия не создаёт новую версию | [optional] 
**whenToUse** | **String** | Когда применять навык | [optional] 
**instruction** | **String** | Инструкция навыка | [optional] 
**scripts** | [**[SkillScriptInput]**](SkillScriptInput.md) | Новый набор скриптов, заменяет прежний целиком. Пустой массив удаляет все скрипты. Если поле не передано, скрипты не меняются | [optional] 


