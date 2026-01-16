# TimewebCloudApi.DnsRecordV2Data

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**priority** | **Number** | Приоритет DNS-записи (для MX и SRV записей). | [optional] 
**subdomain** | **String** | Имя поддомена (только поддомен без основного домена, например &#x60;sub&#x60; для &#x60;sub.example.com&#x60;). Для записей на основном домене это поле отсутствует в ответе. | [optional] 
**value** | **String** | Значение DNS-записи (для A, AAAA, TXT, CNAME, MX записей). | [optional] 
**host** | **String** | Каноническое имя хоста, предоставляющего сервис (для SRV записей). | [optional] 
**port** | **Number** | TCP или UDP порт, на котором работает сервис (для SRV записей). | [optional] 
**service** | **String** | Имя сервиса (для SRV записей). | [optional] 
**protocol** | **String** | Протокол (для SRV записей). | [optional] 


