# TimewebCloudApi.TokenPackage

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** | Уникальный идентификатор пакета | 
**modelId** | **Number** | ID модели, к которой применяется пакет токенов | 
**name** | **String** | Название пакета токенов | 
**packageType** | **String** | Тип пакета (base - базовый, additional - дополнительный, promo - промо) | 
**type** | **String** | Тип сущности, к которой относится пакет (agent - агент, knowledgebase - база знаний) | 
**tokenAmount** | **Number** | Количество токенов в пакете | 
**price** | **Number** | Цена пакета в целых единицах | 
**durationDays** | **Number** | Продолжительность пакета в днях (null для дополнительных пакетов) | [optional] 
**isAvailable** | **Boolean** | Флаг, указывающий доступность пакета | 



## Enum: PackageTypeEnum


* `base` (value: `"base"`)

* `additional` (value: `"additional"`)

* `promo` (value: `"promo"`)





## Enum: TypeEnum


* `agent` (value: `"agent"`)

* `knowledgebase` (value: `"knowledgebase"`)




