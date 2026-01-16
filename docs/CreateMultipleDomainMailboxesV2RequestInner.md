# TimewebCloudApi.CreateMultipleDomainMailboxesV2RequestInner

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**login** | **String** | Название почтового ящика | 
**password** | **String** | Пароль почтового ящика | 
**ownerFullName** | **String** | ФИО владельца почтового ящика | [optional] 
**comment** | **String** | Комментарий почтового ящика | [optional] 
**filterStatus** | **Boolean** | Статус фильтрации почты | [optional] 
**filterAction** | **String** | Что делать с письмами, которые попадают в спам. \\  Параметры: \\  &#x60;directory&#x60; - переместить в папку спам; \\  &#x60;label&#x60; - пометить письмо; \\  Если передан параметр &#x60;filter_status&#x60;: &#x60;false&#x60;, то значение передавать нельзя | [optional] 



## Enum: FilterActionEnum


* `directory` (value: `"directory"`)

* `label` (value: `"label"`)




