# TimewebCloudApi.AiSolutionTelegramBot

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**accountKey** | **String** | ID бота в решении: &#x60;b&lt;ID бота в Telegram&gt;&#x60; | 
**botUsername** | **String** | Имя пользователя бота без &#x60;@&#x60;. &#x60;null&#x60;, если Telegram его не вернул | 
**state** | **String** | Состояние бота: &#x60;pending_pairing&#x60; — бот подключён, но владелец ещё не подтверждён (ожидается код подтверждения); &#x60;connected&#x60; — владелец подтверждён, агент отвечает в этом боте | 



## Enum: StateEnum


* `pending_pairing` (value: `"pending_pairing"`)

* `connected` (value: `"connected"`)




