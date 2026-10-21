# TimewebCloudApi.SkillSaveMeta

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**versionCreated** | **Boolean** | Создана ли новая версия. &#x60;false&#x60; — изменился только заголовок или изменений не было | 
**affectedAgentsCount** | **Number** | У скольких агентов навык включён. Их поведение не меняется, пока их не переведут на новую версию | 
**warnings** | **[String]** | Предупреждения, которые не мешают сохранению. &#x60;when_to_use_too_short&#x60; — текст «когда применять» короче 40 символов: модель не сможет отличить подходящий запрос от постороннего | 
**prunedVersions** | **[Number]** | Номера версий, удалённых из истории из-за лимита в 50 версий | 



## Enum: [WarningsEnum]


* `when_to_use_too_short` (value: `"when_to_use_too_short"`)




