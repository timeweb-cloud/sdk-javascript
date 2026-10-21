# TimewebCloudApi.TokenPackage

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** | ID пакета | 
**modelId** | **Number** | ID модели, к которой относится пакет | 
**serviceTypeId** | **Number** | ID тарифа пакета в биллинге | 
**name** | **String** | Название пакета | 
**packageType** | **String** | Тип пакета: &#x60;base&#x60; — пакет подписки, &#x60;additional&#x60; — дополнительный пакет, &#x60;promo&#x60; — промо-пакет | 
**type** | **String** | Для чего пакет: &#x60;agent&#x60; — AI агент, &#x60;knowledgebase&#x60; — база знаний | 
**tokenAmount** | **Number** | Количество токенов в пакете | 
**price** | **Number** | Цена пакета в рублях | 
**durationDays** | **Number** | Период подписки в днях. &#x60;null&#x60; для дополнительных пакетов | 
**isAvailable** | **Boolean** | Пакет доступен для покупки | 



## Enum: PackageTypeEnum


* `base` (value: `"base"`)

* `additional` (value: `"additional"`)

* `promo` (value: `"promo"`)





## Enum: TypeEnum


* `agent` (value: `"agent"`)

* `knowledgebase` (value: `"knowledgebase"`)




