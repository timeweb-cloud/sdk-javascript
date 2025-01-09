# TimewebCloudApi.VdsNetworksInner

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **String** | ID сети. Есть только у приватных сетей. | [optional] 
**type** | **String** | Тип сети. | 
**natMode** | **String** | Тип преобразования сетевых адресов. | [optional] 
**bandwidth** | **Number** | Пропускная способность сети. | [optional] 
**ips** | [**[VdsNetworksInnerIpsInner]**](VdsNetworksInnerIpsInner.md) | Список IP-адресов сети. | 
**isDdosGuard** | **Boolean** | Это логическое значение, которое показывает, подключена ли DDoS-защита. Только для публичных сетей. | [optional] 
**isImageMounted** | **Boolean** | Это логическое значение, которое показывает, примонтирован ли образ к серверу. | [optional] 
**blockedPorts** | **[Number]** | Список заблокированных портов на сервере. | [optional] 



## Enum: TypeEnum


* `public` (value: `"public"`)

* `local` (value: `"local"`)





## Enum: NatModeEnum


* `dnat_and_snat` (value: `"dnat_and_snat"`)

* `snat` (value: `"snat"`)

* `no_nat` (value: `"no_nat"`)




