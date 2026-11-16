# TimewebCloudApi.DnsRecordV2Data

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**priority** | **Number** | Приоритет DNS-записи (для MX, SRV, HTTPS и SVCB записей). | [optional] 
**subdomain** | **String** | Имя записи относительно &#x60;fqdn&#x60;, например &#x60;sub&#x60; для &#x60;sub.example.com&#x60; или &#x60;mail._domainkey&#x60;. Для записей самого &#x60;fqdn&#x60; это поле отсутствует в ответе. | [optional] 
**value** | **String** | Значение DNS-записи (для всех типов, кроме SRV: у SRV цель записи в поле &#x60;host&#x60;). | [optional] 
**host** | **String** | Каноническое имя хоста, предоставляющего сервис (для SRV записей). | [optional] 
**port** | **Number** | TCP или UDP порт, на котором работает сервис (для SRV записей). | [optional] 
**service** | **String** | Имя сервиса (для SRV записей). | [optional] 
**protocol** | **String** | Протокол (для SRV записей). | [optional] 


