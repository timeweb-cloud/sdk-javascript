# TimewebCloudApi.CreateDomainMailboxV2Request

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**mailbox** | **String** | Название почтового ящика | 
**password** | **String** | Пароль почтового ящика | 
**comment** | **String** | Комментарий почтового ящика | [optional] 
**ownerFullName** | **String** | ФИО владельца почтового ящика | [optional] 
**filterStatus** | **Boolean** | Статус фильтрации почты | [optional] 
**filterAction** | **String** | Что делать с письмами, которые попадают в спам. \\  Параметры: \\  &#x60;directory&#x60; - переместить в папку спам; \\  &#x60;label&#x60; - пометить письмо; \\  Если передан параметр &#x60;filter_status&#x60;: &#x60;false&#x60;, то значение передавать нельзя | [optional] 



## Enum: FilterActionEnum


* `directory` (value: `"directory"`)

* `label` (value: `"label"`)




