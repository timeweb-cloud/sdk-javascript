# TimewebCloudApi.DnsRecordV2

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**type** | **String** | Тип DNS-записи. | 
**id** | **Number** | ID DNS-записи. | [optional] 
**fqdn** | **String** | Полное имя основного домена. | [optional] 
**data** | [**DnsRecordV2Data**](DnsRecordV2Data.md) |  | 
**ttl** | **Number** | Время жизни DNS-записи. | [optional] 



## Enum: TypeEnum


* `TXT` (value: `"TXT"`)

* `SRV` (value: `"SRV"`)

* `CNAME` (value: `"CNAME"`)

* `AAAA` (value: `"AAAA"`)

* `MX` (value: `"MX"`)

* `A` (value: `"A"`)




