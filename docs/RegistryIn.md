# TimewebCloudApi.RegistryIn

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **String** | Имя реестра. Должно быть уникальным, от 3 до 48 символов, начинаться и заканчиваться буквой или числом, содержать только латинские буквы в нижнем регистре, цифры и символ «-», без пробелов | 
**description** | **String** | Описание реестра | [optional] 
**presetId** | **Number** | ID тарифа. Нельзя передавать вместе с &#x60;configuration&#x60; | [optional] 
**configuration** | [**RegistryInConfiguration**](RegistryInConfiguration.md) |  | [optional] 
**projectId** | **Number** | ID проекта | [optional] 


