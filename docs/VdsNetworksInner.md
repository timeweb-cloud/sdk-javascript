# TimewebCloudApi.VdsNetworksInner

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **String** | Уникальный идентификатор сети. Есть только у приватных сетей. | [optional] 
**type** | **String** | Тип сети. | 
**natMode** | **String** | Тип преобразования сетевых адресов. | [optional] 
**bandwidth** | **Number** | Пропускная способность сети. | [optional] 
**ips** | [**[VdsNetworksInnerIpsInner]**](VdsNetworksInnerIpsInner.md) | Список IP-адресов сети. | 
**isDdosGuard** | **Boolean** | Подключена ли DDoS-защита. Только для публичных сетей. | [optional] 



## Enum: TypeEnum


* `public` (value: `"public"`)

* `local` (value: `"local"`)





## Enum: NatModeEnum


* `dnat_and_snat` (value: `"dnat_and_snat"`)

* `snat` (value: `"snat"`)

* `no_nat` (value: `"no_nat"`)




