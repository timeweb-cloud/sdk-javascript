# TimewebCloudApi.DomainRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**accountId** | **String** | ID пользователя | 
**authCode** | **String** | Код авторизации для переноса домена. | 
**date** | **Date** | Дата создания заявки. | 
**domainBundleId** | **String** | Идентификационный номер бандла, в который входит данная заявка (null - если заявка не входит ни в один бандл). | 
**errorCodeTransfer** | **String** | Код ошибки трансфера домена. | 
**fqdn** | **String** | Полное имя домена. | 
**groupId** | **Number** | ID группы доменных зон. | 
**id** | **Number** | ID заявки. | 
**isAntispamEnabled** | **Boolean** | Это логическое значение, которое показывает включена ли услуга \&quot;Антиспам\&quot; для домена | 
**isAutoprolongEnabled** | **Boolean** | Это логическое значение, которое показывает, включено ли автопродление домена. | 
**isWhoisPrivacyEnabled** | **Boolean** | Это логическое значение, которое показывает, включено ли скрытие данных администратора домена для whois. Опция недоступна для доменов в зонах .ru и .рф. | 
**message** | **String** | Информационное сообщение о заявке. | 
**moneySource** | **String** | Источник (способ) оплаты заявки. | 
**period** | [**DomainPaymentPeriod**](DomainPaymentPeriod.md) |  | 
**personId** | **Number** | Идентификационный номер персоны для заявки на регистрацию. | 
**prime** | [**DomainPrimeType**](DomainPrimeType.md) |  | 
**soonExpire** | **Number** | Количество дней до конца регистрации домена, за которые мы уведомим о необходимости продления. | 
**sortOrder** | **Number** | Это значение используется для сортировки доменных зон в панели управления. | 
**type** | **String** | Тип заявки. | 



## Enum: MoneySourceEnum


* `use` (value: `"use"`)

* `bonus` (value: `"bonus"`)

* `invoice` (value: `"invoice"`)





## Enum: TypeEnum


* `request` (value: `"request"`)

* `prolong` (value: `"prolong"`)

* `transfer` (value: `"transfer"`)




