# TimewebCloudApi.UpdateServer

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**configurator** | [**UpdateServerConfigurator**](UpdateServerConfigurator.md) |  | [optional] 
**osId** | **Number** | ID операционной системы, которая будет установлена на облачный сервер. | [optional] 
**softwareId** | **Number** | ID программного обеспечения сервера. | [optional] 
**presetId** | **Number** | ID тарифа сервера. Нельзя передавать вместе с ключом &#x60;configurator&#x60;. | [optional] 
**bandwidth** | **Number** | Пропускная способность тарифа. Доступные значения от 100 до 1000 с шагом 100. | [optional] 
**name** | **String** | Имя облачного сервера. Максимальная длина — 255 символов. | [optional] 
**avatarId** | **String** | ID аватара сервера. Описание методов работы с аватарами появится позднее. | [optional] 
**comment** | **String** | Комментарий к облачному серверу. Максимальная длина — 255 символов. | [optional] 
**imageId** | **String** | ID образа, который будет установлен на облачный сервер. Нельзя передавать вместе с &#x60;os_id&#x60;. | [optional] 
**cloudInit** | **String** | Cloud-init скрипт | [optional] 


