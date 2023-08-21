# TimewebCloudApi.SpamFilterIsDisabled

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**isEnabled** | **Boolean** | Включен ли спам-фильтр | 
**action** | **String** | Что делать с письмами, которые попадают в спам. \\  Параметры: \\  &#x60;move_to_directory&#x60; - переместить в паку спам; \\  &#x60;forward&#x60; - переслать письмо на другой адрес; \\  &#x60;delete&#x60; - удалить письмо; \\  &#x60;tag&#x60; - пометить письмо; | [optional] 
**forwardTo** | **String** | Адрес для пересылки при выбранном действии &#x60;forward&#x60; из параметра &#x60;action&#x60;. Не может быть пустым, если &#x60;action&#x60; выбран &#x60;forward&#x60; | [optional] 
**whiteList** | **[String]** | Белый список адресов от которых письма не будут попадать в спам | [optional] 



## Enum: ActionEnum


* `move_to_directory` (value: `"move_to_directory"`)

* `forward` (value: `"forward"`)

* `delete` (value: `"delete"`)

* `tag` (value: `"tag"`)




