# TimewebCloudApi.CreateBot

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**agentId** | **Number** | ID агента, который будет отвечать от имени бота | 
**token** | **String** | Токен бота, выданный @BotFather | 
**description** | **String** | Комментарий к боту | [optional] 
**whitelistEnabled** | **Boolean** | Ограничить доступ к боту списком &#x60;whitelist_usernames&#x60; | [optional] 
**whitelistUsernames** | **[String]** | Username пользователей Telegram, которым разрешено писать боту. Можно с &#x60;@&#x60; и в любом регистре — они будут приведены к нижнему регистру без &#x60;@&#x60;, дубли удаляются. Действует, только если &#x60;whitelist_enabled&#x60; равен &#x60;true&#x60; и список не пуст | [optional] 


