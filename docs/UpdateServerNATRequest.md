# TimewebCloudApi.UpdateServerNATRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**natMode** | **String** | Правило для маршрутизации трафика. \\  Досутпные правила: &#x60;dnat_and_snat&#x60; – разрешен входящий и исходящий трафик, &#x60;snat&#x60; – разрешен только исходящий трафик, &#x60;no_nat&#x60; – разрешен трафик только в локальной сети. | 



## Enum: NatModeEnum


* `dnat_and_snat` (value: `"dnat_and_snat"`)

* `snat` (value: `"snat"`)

* `no_nat` (value: `"no_nat"`)




