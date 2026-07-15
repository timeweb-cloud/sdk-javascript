# TimewebCloudApi.Person2

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**type** | **String** | Тип администратора. | 
**name** | **String** | ФИО администратора. | 
**isResident** | **Boolean** | Это логическое значение, которое показывает, является ли администратор резидентом РФ. | 
**birthdate** | **String** | Дата рождения. | 
**passportDate** | **String** | Дата выдачи паспорта. | 
**passportNumber** | **String** | Номер паспорта. | 
**passportPlace** | **String** | Кем выдан паспорт. | 
**passportSeries** | **String** | Серия паспорта. | 
**postcode** | **String** | Почтовый индекс. | 
**mailingAddress** | **String** | Почтовый адрес. | 
**phone** | **String** | Контактный телефон. | 
**email** | **String** | Адрес электронной почты. | 
**countryCode** | **String** | Код страны. Только для нерезидентов РФ (&#x60;is_resident: false&#x60;); для резидентов поле передавать не нужно. | [optional] 



## Enum: TypeEnum


* `person` (value: `"person"`)




