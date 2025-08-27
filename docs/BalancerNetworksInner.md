# TimewebCloudApi.BalancerNetworksInner

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **String** | ID сети. Есть только у приватных сетей. | [optional] 
**type** | **String** | Тип сети. | 
**natMode** | **String** | Тип преобразования сетевых адресов. | [optional] 
**portId** | **String** | ID порта. | [optional] 
**ips** | [**[BalancerNetworksInnerIpsInner]**](BalancerNetworksInnerIpsInner.md) | Список IP-адресов сети. | 



## Enum: TypeEnum


* `public` (value: `"public"`)

* `local` (value: `"local"`)





## Enum: NatModeEnum


* `dnat_and_snat` (value: `"dnat_and_snat"`)

* `snat` (value: `"snat"`)

* `no_nat` (value: `"no_nat"`)




