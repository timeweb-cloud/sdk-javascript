# TimewebCloudApi.AiSolution

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** | ID решения | 
**accountId** | **String** | ID аккаунта, которому принадлежит решение | 
**name** | **String** | Название решения | 
**description** | **String** | Описание решения | 
**type** | **String** | Тип решения. Сейчас всегда &#x60;openclaw&#x60; | 
**vdsId** | **Number** | ID облачного сервера, на котором развёрнуто решение. Сведения о сервере — в разделе «Облачные серверы» | 
**aiKeyId** | **String** | ID ключа AI Gateway, выпущенного для решения. Сведения о ключе — в разделе AI Gateway; перевыпустить ключ можно только через решение | 
**modelId** | **Number** | ID модели, с которой работает решение | 
**status** | **String** | Статус решения, выводится из состояния его сервера: &#x60;creating&#x60; — сервер разворачивается или выполняет длительную операцию; &#x60;active&#x60; — сервер работает; &#x60;stopped&#x60; — сервер выключен или перезагружается; &#x60;blocked&#x60; — сервер заблокирован или не оплачен; &#x60;error&#x60; — сервер в состоянии ошибки или не найден; &#x60;deleted&#x60; — сервер удаляется. Готовность агента к общению показывает метод получения статуса чата | 
**createdAt** | **Date** | Дата создания | 
**updatedAt** | **Date** | Дата последнего изменения | 



## Enum: TypeEnum


* `openclaw` (value: `"openclaw"`)





## Enum: StatusEnum


* `creating` (value: `"creating"`)

* `active` (value: `"active"`)

* `stopped` (value: `"stopped"`)

* `blocked` (value: `"blocked"`)

* `error` (value: `"error"`)

* `deleted` (value: `"deleted"`)




