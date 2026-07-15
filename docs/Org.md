# TimewebCloudApi.Org

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**type** | **String** | Тип администратора. | 
**name** | **String** | Название организации. | 
**isResident** | **Boolean** | Это логическое значение, которое показывает, является ли администратор резидентом РФ. | 
**contactName** | **String** | Контактное лицо организации. | 
**inn** | **String** | ИНН организации. | 
**kpp** | **String** | КПП организации. | [optional] 
**legalAddress** | **String** | Юридический адрес организации. | 
**postcode** | **String** | Почтовый индекс. | 
**mailingAddress** | **String** | Почтовый адрес. | 
**phone** | **String** | Контактный телефон. | 
**email** | **String** | Адрес электронной почты. | 
**countryCode** | **String** | Код страны. Только для нерезидентов РФ (&#x60;is_resident: false&#x60;); для резидентов поле передавать не нужно. | [optional] 



## Enum: TypeEnum


* `org` (value: `"org"`)




