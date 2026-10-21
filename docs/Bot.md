# TimewebCloudApi.Bot

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **String** | ID бота в Timeweb Cloud | 
**accountId** | **String** | Логин аккаунта, которому принадлежит бот | 
**agentId** | **Number** | ID агента, который отвечает от имени бота | 
**username** | **String** | Username бота в мессенджере (без &#x60;@&#x60;) | 
**firstName** | **String** | Имя бота в мессенджере | 
**description** | **String** | Комментарий к боту. Пустая строка, если не задан | 
**status** | **String** | Статус подключения: &#x60;pending&#x60; — ожидает подключения, &#x60;active&#x60; — работает, &#x60;error&#x60; — ошибка подключения | 
**whitelistEnabled** | **Boolean** | Включено ли ограничение доступа по списку username. У MAX-ботов всегда &#x60;false&#x60; | 
**whitelistUsernames** | **[String]** | Username пользователей, которым разрешено писать боту: в нижнем регистре, без &#x60;@&#x60;. У MAX-ботов всегда пустой | 
**createdAt** | **Date** | Дата и время создания | 
**updatedAt** | **Date** | Дата и время последнего обновления | 



## Enum: StatusEnum


* `pending` (value: `"pending"`)

* `active` (value: `"active"`)

* `error` (value: `"error"`)




