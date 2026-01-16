# TimewebCloudApi.MailboxResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**idnName** | **String** | IDN имя домена | [optional] 
**autoreplyMessage** | **String** | Сообщение автоответчика | [optional] 
**autoreplyStatus** | **Boolean** | Статус автоответчика | [optional] 
**autoreplySubject** | **String** | Тема автоответчика | [optional] 
**comment** | **String** | Комментарий | [optional] 
**filterAction** | **String** | Действие фильтра спама | [optional] 
**filterStatus** | **Boolean** | Статус фильтра спама | [optional] 
**forwardList** | **[String]** | Список адресов для пересылки | [optional] 
**forwardStatus** | **Boolean** | Статус пересылки | [optional] 
**outgoingControl** | **Boolean** | Контроль исходящей почты | [optional] 
**outgoingEmail** | **String** | Email для исходящих писем | [optional] 
**password** | **String** | Пароль (пустая строка в ответе) | [optional] 
**whiteList** | **[String]** | Белый список адресов | [optional] 
**webmail** | **Boolean** | Доступ к веб-почте | [optional] 
**dovecot** | **Boolean** | Использование Dovecot | [optional] 
**fqdn** | **String** | Полное доменное имя | [optional] 
**leaveMessages** | **Boolean** | Оставлять копии писем при пересылке | [optional] 
**mailbox** | **String** | Имя почтового ящика | [optional] 
**ownerFullName** | **String** | ФИО владельца | [optional] 



## Enum: FilterActionEnum


* `directory` (value: `"directory"`)

* `label` (value: `"label"`)




