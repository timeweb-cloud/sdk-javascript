# TimewebCloudApi.CreateDomainRequestRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**action** | **String** | Тип создаваемой заявки. | 
**fqdn** | **String** | Полное имя домена. | 
**isAutoprolongEnabled** | **Boolean** | Это логическое значение, которое показывает, включено ли автопродление домена. | [optional] 
**isWhoisPrivacyEnabled** | **Boolean** | Это логическое значение, которое показывает, включено ли скрытие данных администратора домена для whois. Опция недоступна для доменов в зонах .ru и .рф. | [optional] 
**ns** | [**[RegisterNsInner]**](RegisterNsInner.md) | Name-серверы для регистрации домена. Если не передавать этот параметр, будут использованы наши стандартные name-серверы. Нужно указать как минимум 2 name-сервера. | [optional] 
**period** | [**DomainPaymentPeriod**](DomainPaymentPeriod.md) |  | [optional] 
**personId** | **Number** | Идентификатор администратора, на которого зарегистрирован домен. | 
**isAntispamEnabled** | **Boolean** | Это логическое значение, которое показывает включена ли услуга \&quot;Антиспам\&quot; для домена | [optional] 
**prime** | [**DomainPrimeType**](DomainPrimeType.md) |  | [optional] 
**authCode** | **String** | Код авторизации для переноса домена. | 



## Enum: ActionEnum


* `transfer` (value: `"transfer"`)




