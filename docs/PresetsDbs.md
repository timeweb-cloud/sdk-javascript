# TimewebCloudApi.PresetsDbs

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** | ID для каждого экземпляра тарифа базы данных. | [optional] 
**description** | **String** | Описание тарифа. | [optional] 
**descriptionShort** | **String** | Краткое описание тарифа. | [optional] 
**cpu** | **Number** | Количество ядер процессора тарифа. | [optional] 
**cpuFrequency** | **String** | Частота процессора (в ГГц). | [optional] 
**ram** | **Number** | Объём оперативной памяти тарифа (в Мб). | [optional] 
**disk** | **Number** | Размер диска тарифа (в Мб). | [optional] 
**type** | **String** | Семейство СУБД тарифа. Значение не совпадает с типом кластера, который передаётся в поле &#x60;type&#x60; при создании кластера (&#x60;POST /api/v1/databases&#x60;): там используется версионированный тип, например &#x60;postgres17&#x60;. Тарифы для Valkey возвращаются со значением &#x60;redis&#x60; — отдельного значения &#x60;valkey&#x60; в этом поле не бывает. | [optional] 
**price** | **Number** | Стоимость тарифа базы данных | [optional] 
**location** | **String** | Географическое расположение тарифа. | [optional] 
**tags** | **[String]** | Теги тарифа, в том числе тег группы тарифов, в пределах которой доступна смена тарифа. | [optional] 



## Enum: TypeEnum


* `mysql` (value: `"mysql"`)

* `mysql5` (value: `"mysql5"`)

* `postgres` (value: `"postgres"`)

* `redis` (value: `"redis"`)

* `mongodb` (value: `"mongodb"`)

* `opensearch` (value: `"opensearch"`)

* `clickhouse` (value: `"clickhouse"`)

* `kafka` (value: `"kafka"`)

* `rabbitmq` (value: `"rabbitmq"`)





## Enum: LocationEnum


* `ru-1` (value: `"ru-1"`)

* `ru-3` (value: `"ru-3"`)

* `pl-1` (value: `"pl-1"`)

* `nl-1` (value: `"nl-1"`)

* `de-1` (value: `"de-1"`)

* `us-2` (value: `"us-2"`)

* `us-3` (value: `"us-3"`)




