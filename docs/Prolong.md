# TimewebCloudApi.Prolong

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**action** | **String** | Тип создаваемой заявки. | 
**fqdn** | **String** | Полное имя домена. | 
**isAntispamEnabled** | **Boolean** | Это логическое значение, которое показывает включена ли услуга \&quot;Антиспам\&quot; для домена | [optional] 
**isAutoprolongEnabled** | **Boolean** | Это логическое значение, которое показывает, включено ли автопродление домена. | [optional] 
**isWhoisPrivacyEnabled** | **Boolean** | Это логическое значение, которое показывает, включено ли скрытие данных администратора домена для whois. Опция недоступна для доменов в зонах .ru и .рф. | [optional] 
**period** | [**DomainPaymentPeriod**](DomainPaymentPeriod.md) |  | [optional] 
**personId** | **Number** | Идентификатор администратора, на которого зарегистрирован домен. | [optional] 
**prime** | [**DomainPrimeType**](DomainPrimeType.md) |  | [optional] 



## Enum: ActionEnum


* `prolong` (value: `"prolong"`)




