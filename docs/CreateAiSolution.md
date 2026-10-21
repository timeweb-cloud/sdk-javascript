# TimewebCloudApi.CreateAiSolution

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**type** | **String** | Тип решения. Доступные типы возвращает метод получения типов AI-решений | 
**name** | **String** | Название решения. Используется и как имя сервера | 
**description** | **String** | Описание решения. Используется и как комментарий к серверу | [optional] 
**modelId** | **Number** | ID модели, с которой будет работать решение. Подходят только действующие текстовые модели (&#x60;type: llm&#x60; в &#x60;GET /api/v3/cloud-ai/models&#x60;) | 
**presetId** | **Number** | ID тарифа сервера из &#x60;GET /api/v1/presets/servers&#x60;. Тариф должен быть не ниже требований типа решения (при создании это не проверяется) и из той же локации, что и зона доступности. Баланса аккаунта должно хватать хотя бы на час работы тарифа | 
**projectId** | **Number** | ID проекта, в который добавляются сервер и ключ AI Gateway решения | [optional] 
**availabilityZone** | **String** | Зона доступности сервера. Если не указана, используется зона по умолчанию для региона аккаунта. Зона должна относиться к локации тарифа, а образ решения должен быть доступен в этой зоне | [optional] 



## Enum: TypeEnum


* `openclaw` (value: `"openclaw"`)





## Enum: AvailabilityZoneEnum


* `spb-1` (value: `"spb-1"`)

* `spb-2` (value: `"spb-2"`)

* `spb-3` (value: `"spb-3"`)

* `spb-4` (value: `"spb-4"`)

* `spb-5` (value: `"spb-5"`)

* `nsk-1` (value: `"nsk-1"`)

* `ekb-1` (value: `"ekb-1"`)

* `kzn-1` (value: `"kzn-1"`)

* `ams-1` (value: `"ams-1"`)

* `gdn-1` (value: `"gdn-1"`)

* `ala-1` (value: `"ala-1"`)

* `nyc-1` (value: `"nyc-1"`)

* `sjc-1` (value: `"sjc-1"`)

* `msk-1` (value: `"msk-1"`)

* `fra-1` (value: `"fra-1"`)

* `hel-1` (value: `"hel-1"`)

* `sta-1` (value: `"sta-1"`)

* `buf-2` (value: `"buf-2"`)

* `par-1` (value: `"par-1"`)

* `lon-1` (value: `"lon-1"`)




