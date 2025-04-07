# TimewebCloudApi.CreateBalancer

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **String** | Удобочитаемое имя, установленное для балансировщика. | 
**algo** | **String** | Алгоритм переключений балансировщика. | 
**isSticky** | **Boolean** | Это логическое значение, которое показывает, сохраняется ли сессия. | 
**isUseProxy** | **Boolean** | Это логическое значение, которое показывает, выступает ли балансировщик в качестве прокси. | 
**isSsl** | **Boolean** | Это логическое значение, которое показывает, требуется ли перенаправление на SSL. | 
**isKeepalive** | **Boolean** | Это логическое значение, которое показывает, выдает ли балансировщик сигнал о проверке жизнеспособности. | 
**proto** | **String** | Протокол. | 
**port** | **Number** | Порт балансировщика. | 
**path** | **String** | Адрес балансировщика. | 
**inter** | **Number** | Интервал проверки. | 
**timeout** | **Number** | Таймаут ответа балансировщика. | 
**fall** | **Number** | Порог количества ошибок. | 
**rise** | **Number** | Порог количества успешных ответов. | 
**maxconn** | **Number** | Максимальное количество соединений. | [optional] 
**connectTimeout** | **Number** | Таймаут подключения. | [optional] 
**clientTimeout** | **Number** | Таймаут клиента. | [optional] 
**serverTimeout** | **Number** | Таймаут сервера. | [optional] 
**httprequestTimeout** | **Number** | Таймаут HTTP запроса. | [optional] 
**presetId** | **Number** | ID тарифа. | 
**network** | [**Network**](Network.md) |  | [optional] 
**availabilityZone** | [**AvailabilityZone**](AvailabilityZone.md) |  | [optional] 



## Enum: AlgoEnum


* `roundrobin` (value: `"roundrobin"`)

* `leastconn` (value: `"leastconn"`)





## Enum: ProtoEnum


* `http` (value: `"http"`)

* `http2` (value: `"http2"`)

* `https` (value: `"https"`)

* `tcp` (value: `"tcp"`)




