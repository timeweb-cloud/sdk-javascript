# TimewebCloudApi.DnsRecordV2

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** | ID DNS-записи. | 
**type** | **String** | Тип DNS-записи. | 
**data** | [**DnsRecordV2Data**](DnsRecordV2Data.md) |  | 
**fqdn** | **String** | Домен, относительно которого указано &#x60;data.subdomain&#x60;. Полное имя записи — &#x60;data.subdomain&#x60; + &#x60;.&#x60; + &#x60;fqdn&#x60;, а если &#x60;data.subdomain&#x60; нет — &#x60;fqdn&#x60;. | 
**ttl** | **Number** | Время жизни DNS-записи в секундах. | 



## Enum: TypeEnum


* `TXT` (value: `"TXT"`)

* `SRV` (value: `"SRV"`)

* `CNAME` (value: `"CNAME"`)

* `AAAA` (value: `"AAAA"`)

* `MX` (value: `"MX"`)

* `A` (value: `"A"`)

* `PTR` (value: `"PTR"`)

* `HTTPS` (value: `"HTTPS"`)

* `SVCB` (value: `"SVCB"`)

* `CAA` (value: `"CAA"`)




