# TimewebCloudApi.Domain

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**allowedBuyPeriods** | [**[DomainAllowedBuyPeriodsInner]**](DomainAllowedBuyPeriodsInner.md) | Допустимые периоды продления домена. | 
**daysLeft** | **Number** | Количество дней, оставшихся до конца срока регистрации домена. | 
**domainStatus** | **String** | Статус домена. | 
**expiration** | **String** | Дата окончания срока регистрации домена, для доменов без срока окончания регистрации будет приходить 0000-00-00. | 
**fqdn** | **String** | Полное имя домена. | 
**id** | **Number** | ID домена. | 
**avatarLink** | **String** | Ссылка на аватар домена. | 
**isAutoprolongEnabled** | **Boolean** | Это логическое значение, которое показывает, включено ли автопродление домена. | 
**isPremium** | **Boolean** | Это логическое значение, которое показывает, является ли домен премиальным. | 
**isProlongAllowed** | **Boolean** | Это логическое значение, которое показывает, можно ли сейчас продлить домен. | 
**isTechnical** | **Boolean** | Это логическое значение, которое показывает, является ли домен техническим. | 
**isWhoisPrivacyEnabled** | **Boolean** | Это логическое значение, которое показывает, включено ли скрытие данных администратора домена для whois. Если приходит null, значит для данной зоны эта услуга не доступна. | 
**linkedIp** | **String** | Привязанный к домену IP-адрес. | 
**paidTill** | **String** | До какого числа оплачен домен. | 
**personId** | **Number** | ID администратора, на которого зарегистрирован домен. | 
**premiumProlongCost** | **Number** | Стоимость премиального домена. | 
**provider** | **String** | ID регистратора домена. | 
**requestStatus** | **String** | Статус заявки на продление/регистрацию/трансфер домена. | 
**subdomains** | [**[Subdomain]**](Subdomain.md) | Список поддоменов. | 
**tldId** | **Number** | ID доменной зоны. | 



## Enum: DomainStatusEnum


* `awaiting_payment` (value: `"awaiting_payment"`)

* `expired` (value: `"expired"`)

* `final_expired` (value: `"final_expired"`)

* `free` (value: `"free"`)

* `no_paid` (value: `"no_paid"`)

* `ns_based` (value: `"ns_based"`)

* `paid` (value: `"paid"`)

* `soon_expire` (value: `"soon_expire"`)

* `today_expired` (value: `"today_expired"`)





## Enum: RequestStatusEnum


* `prolongation_fail` (value: `"prolongation_fail"`)

* `prolongation_request` (value: `"prolongation_request"`)

* `registration_fail` (value: `"registration_fail"`)

* `registration_request` (value: `"registration_request"`)

* `transfer_fail` (value: `"transfer_fail"`)

* `transfer_request` (value: `"transfer_request"`)

* `awaiting_person` (value: `"awaiting_person"`)




