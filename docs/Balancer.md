# TimewebCloudApi.Balancer

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** | ID для каждого экземпляра балансировщика. Автоматически генерируется при создании. | 
**algo** | **String** | Алгоритм переключений балансировщика. | 
**createdAt** | **Date** | Значение времени, указанное в комбинированном формате даты и времени ISO8601, которое представляет, когда был создан балансировщик. | 
**fall** | **Number** | Порог количества ошибок. | 
**inter** | **Number** | Интервал проверки. | 
**ip** | **String** | IP-адрес сетевого интерфейса IPv4. | 
**localIp** | **String** | Локальный IP-адрес сетевого интерфейса IPv4. | 
**isKeepalive** | **Boolean** | Это логическое значение, которое показывает, выдает ли балансировщик сигнал о проверке жизнеспособности. | 
**name** | **String** | Удобочитаемое имя, установленное для балансировщика. | 
**path** | **String** | Адрес балансировщика. | 
**port** | **Number** | Порт балансировщика. | 
**proto** | **String** | Протокол. | 
**rise** | **Number** | Порог количества успешных ответов. | 
**maxconn** | **Number** | Максимальное количество соединений. | 
**connectTimeout** | **Number** | Таймаут подключения. | 
**clientTimeout** | **Number** | Таймаут клиента. | 
**serverTimeout** | **Number** | Таймаут сервера. | 
**httprequestTimeout** | **Number** | Таймаут HTTP запроса. | 
**presetId** | **Number** | ID тарифа. | 
**isSsl** | **Boolean** | Это логическое значение, которое показывает, требуется ли перенаправление на SSL. | 
**status** | **String** | Статус балансировщика. | 
**isSticky** | **Boolean** | Это логическое значение, которое показывает, сохраняется ли сессия. | 
**timeout** | **Number** | Таймаут ответа балансировщика. | 
**avatarLink** | **String** | Ссылка на аватар балансировщика. | 
**isUseProxy** | **Boolean** | Это логическое значение, которое показывает, выступает ли балансировщик в качестве прокси. | 
**rules** | [**[Rule]**](Rule.md) |  | 
**ips** | **[String]** | Список IP-адресов, привязанных к балансировщику | 
**location** | **String** | Географическое расположение балансировщика | 
**availabilityZone** | [**AvailabilityZone**](AvailabilityZone.md) |  | 



## Enum: AlgoEnum


* `roundrobin` (value: `"roundrobin"`)

* `leastconn` (value: `"leastconn"`)





## Enum: ProtoEnum


* `http` (value: `"http"`)

* `http2` (value: `"http2"`)

* `https` (value: `"https"`)

* `tcp` (value: `"tcp"`)





## Enum: StatusEnum


* `started` (value: `"started"`)

* `stoped` (value: `"stoped"`)

* `starting` (value: `"starting"`)

* `no_paid` (value: `"no_paid"`)





## Enum: LocationEnum


* `ru-1` (value: `"ru-1"`)

* `pl-1` (value: `"pl-1"`)




