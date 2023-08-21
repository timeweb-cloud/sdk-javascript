# TimewebCloudApi.UpdateBalancer

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **String** | Удобочитаемое имя, установленное для балансировщика. | [optional] 
**algo** | **String** | Алгоритм переключений балансировщика. | [optional] 
**isSticky** | **Boolean** | Это логическое значение, которое показывает, сохраняется ли сессия. | [optional] 
**isUseProxy** | **Boolean** | Это логическое значение, которое показывает, выступает ли балансировщик в качестве прокси. | [optional] 
**isSsl** | **Boolean** | Это логическое значение, которое показывает, требуется ли перенаправление на SSL. | [optional] 
**isKeepalive** | **Boolean** | Это логическое значение, которое показывает, выдает ли балансировщик сигнал о проверке жизнеспособности. | [optional] 
**proto** | **String** | Протокол. | [optional] 
**port** | **Number** | Порт балансировщика. | [optional] 
**path** | **String** | Адрес балансировщика. | [optional] 
**inter** | **Number** | Интервал проверки. | [optional] 
**timeout** | **Number** | Таймаут ответа балансировщика. | [optional] 
**fall** | **Number** | Порог количества ошибок. | [optional] 
**rise** | **Number** | Порог количества успешных ответов. | [optional] 
**presetId** | **Number** | Идентификатор тарифа. | [optional] 



## Enum: AlgoEnum


* `roundrobin` (value: `"roundrobin"`)

* `leastconn` (value: `"leastconn"`)





## Enum: ProtoEnum


* `http` (value: `"http"`)

* `http2` (value: `"http2"`)

* `https` (value: `"https"`)

* `tcp` (value: `"tcp"`)




