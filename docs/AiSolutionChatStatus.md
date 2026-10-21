# TimewebCloudApi.AiSolutionChatStatus

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**ready** | **Boolean** | Готов ли чат принимать сообщения | 
**reason** | **String** | Почему чат ещё не готов. Отсутствует, если чат готов. &#x60;unreachable&#x60; — до сервера не достучаться (разворачивается, выключен или нет публичного IP); &#x60;software_installing&#x60; — устанавливается ПО агента; &#x60;configuring&#x60; — агент настраивается; &#x60;install_failed&#x60; — установка ПО не удалась, пересоздайте решение; &#x60;machine_error&#x60; — сервер в состоянии ошибки, пересоздайте решение; &#x60;deleted&#x60; — решение удалено; &#x60;outdated&#x60; — сервер создан старой версией решения, пересоздайте решение | [optional] 



## Enum: ReasonEnum


* `unreachable` (value: `"unreachable"`)

* `software_installing` (value: `"software_installing"`)

* `configuring` (value: `"configuring"`)

* `install_failed` (value: `"install_failed"`)

* `machine_error` (value: `"machine_error"`)

* `deleted` (value: `"deleted"`)

* `outdated` (value: `"outdated"`)




