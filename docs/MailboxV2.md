# TimewebCloudApi.MailboxV2

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**idnName** | **String** | IDN домен почтового ящика | 
**autoreplyMessage** | **String** | Сообщение автоответчика на входящие письма | 
**autoreplyStatus** | **Boolean** | Включен ли автоответчик на входящие письма | 
**autoreplySubject** | **String** | Тема сообщения автоответчика на входящие письма | 
**comment** | **String** | Комментарий к почтовому ящику | 
**filterAction** | **String** | Что делать с письмами, которые попадают в спам | 
**filterStatus** | **Boolean** | Включен ли спам-фильтр | 
**forwardList** | **[String]** | Список адресов для пересылки входящих писем | 
**forwardStatus** | **Boolean** | Включена ли пересылка входящих писем | 
**outgoingControl** | **Boolean** | Включена ли пересылка исходящих писем | 
**outgoingEmail** | **String** | Адрес для пересылки исходящих писем | 
**password** | **String** | Пароль почтового ящика (всегда возвращается пустой строкой) | 
**spambox** | **String** | Адрес для пересылки спама при выбранном действии forward | 
**whiteList** | **[String]** | Белый список адресов от которых письма не будут попадать в спам | 
**webmail** | **Boolean** | Доступен ли Webmail | 
**dovecot** | **Boolean** | Есть ли доступ через dovecot | 
**fqdn** | **String** | Домен почты | 
**leaveMessages** | **Boolean** | Оставлять ли сообщения на сервере при пересылке | 
**mailbox** | **String** | Название почтового ящика | 
**ownerFullName** | **String** | ФИО владельца почтового ящика | 



## Enum: FilterActionEnum


* `directory` (value: `"directory"`)

* `forward` (value: `"forward"`)

* `delete` (value: `"delete"`)

* `tag` (value: `"tag"`)




