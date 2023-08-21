# TimewebCloudApi.UpdateDomainRequestRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**moneySource** | **String** | Тип создаваемой заявки. | 
**personId** | **Number** | Идентификатор администратора, на которого зарегистрирован домен. | [optional] 
**paymentType** | **String** | Тип платежной системы. | 
**payerId** | **Number** | Идентификационный номер плательщика | 
**authCode** | **String** | Код авторизации для переноса домена. | 
**bonusId** | **Number** | Идентификатор бонуса. | 



## Enum: MoneySourceEnum


* `bonus` (value: `"bonus"`)





## Enum: PaymentTypeEnum


* `receipt` (value: `"receipt"`)

* `card` (value: `"card"`)

* `mobile-card` (value: `"mobile-card"`)

* `wm` (value: `"wm"`)

* `webmoney` (value: `"webmoney"`)

* `yandex` (value: `"yandex"`)

* `ya` (value: `"ya"`)

* `invoice` (value: `"invoice"`)

* `sofort` (value: `"sofort"`)

* `qiwi_wallet` (value: `"qiwi_wallet"`)

* `wechat` (value: `"wechat"`)




