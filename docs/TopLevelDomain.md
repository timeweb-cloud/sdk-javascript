# TimewebCloudApi.TopLevelDomain

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**allowedBuyPeriods** | [**[TopLevelDomainAllowedBuyPeriodsInner]**](TopLevelDomainAllowedBuyPeriodsInner.md) | Список доступных периодов для регистрации/продления доменов со стоимостью. | 
**earlyRenewPeriod** | **Number** | Количество дней до истечение срока регистрации, когда можно продлять домен. | 
**gracePeriod** | **Number** | Количество дней, которые действует льготный период когда вы ещё можете продлить домен, после окончания его регистрации | 
**id** | **Number** | ID доменной зоны. | 
**isPublished** | **Boolean** | Это логическое значение, которое показывает, опубликована ли доменная зона. | 
**isRegistered** | **Boolean** | Это логическое значение, которое показывает, зарегистрирована ли доменная зона. | 
**isWhoisPrivacyDefaultEnabled** | **Boolean** | Это логическое значение, которое показывает, включено ли по умолчанию скрытие данных администратора для доменной зоны. | 
**isWhoisPrivacyEnabled** | **Boolean** | Это логическое значение, которое показывает, доступно ли управление скрытием данных администратора для доменной зоны. | 
**name** | **String** | Имя доменной зоны. | 
**price** | **Number** | Цена регистрации домена | 
**prolongPrice** | **Number** | Цена продления домена. | 
**registrar** | **String** | Регистратор доменной зоны. | 
**transfer** | **Number** | Цена услуги трансфера домена. | 
**whoisPrivacyPrice** | **Number** | Цена услуги скрытия данных администратора для доменной зоны. | 



## Enum: RegistrarEnum


* `NIC` (value: `"NIC"`)

* `PDR` (value: `"PDR"`)

* `R01` (value: `"R01"`)

* `timeweb` (value: `"timeweb"`)

* `TimewebVirtreg` (value: `"TimewebVirtreg"`)

* `Webnames` (value: `"Webnames"`)

* `unknown` (value: `"unknown"`)




