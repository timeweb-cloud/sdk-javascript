# TimewebCloudApi.AgentWidgetSettings

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**whitelistDomains** | **[String]** | Домены, на которых разрешено показывать виджет. Пустой массив — без ограничений. | 
**name** | **String** | Отображаемое имя агента в виджете | 
**signature** | **String** | Подпись под именем агента в виджете | [optional] 
**welcomeMessage** | **String** | Приветственное сообщение при открытии виджета | 
**primaryColor** | **String** | Основной цвет виджета в формате &#x60;#RRGGBB&#x60; | 
**textColor** | **String** | Цвет текста в формате &#x60;#RRGGBB&#x60; | [optional] 
**backgroundColor** | **String** | Цвет фона в формате &#x60;#RRGGBB&#x60; | [optional] 
**headerFooterColor** | **String** | Цвет шапки и подвала виджета в формате &#x60;#RRGGBB&#x60; | [optional] 
**font** | **String** | Шрифт виджета. Пустая строка — шрифт сайта. | 
**iconUrl** | **String** | URL иконки агента в виджете | [optional] 
**useAvatar** | **Boolean** | Использовать загруженный в панели аватар как иконку агента | [optional] [default to false]
**showButton** | **Boolean** | Показывать кнопку открытия виджета | [optional] [default to true]
**showToolProcessing** | **Boolean** | Показывать в виджете статус выполнения инструментов агента | [optional] [default to false]
**showConfirmationButtons** | **Boolean** | Показывать кнопки подтверждения и отмены операций, которые агент выполняет через инструменты | [optional] [default to true]
**chatPosition** | **String** | Положение виджета на странице | 
**chatPositionAdjustmentX** | **Number** | Смещение виджета по горизонтали в пикселях | [optional] 
**chatPositionAdjustmentY** | **Number** | Смещение виджета по вертикали в пикселях | [optional] 



## Enum: ChatPositionEnum


* `bottom_right` (value: `"bottom_right"`)

* `bottom_left` (value: `"bottom_left"`)

* `top_right` (value: `"top_right"`)

* `top_left` (value: `"top_left"`)




