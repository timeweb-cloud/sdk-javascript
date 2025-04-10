# TimewebCloudApi.CreateServer

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**configuration** | [**CreateServerConfiguration**](CreateServerConfiguration.md) |  | [optional] 
**isDdosGuard** | **Boolean** | Защита от DDoS. Серверу выдается защищенный IP-адрес с защитой уровня L3 / L4. Для включения защиты уровня L7 необходимо создать тикет в техническую поддержку. | [optional] 
**osId** | **Number** | ID операционной системы, которая будет установлена на облачный сервер. Нельзя передавать вместе с &#x60;image_id&#x60;. | [optional] 
**imageId** | **String** | ID образа, который будет установлен на облачный сервер. Нельзя передавать вместе с &#x60;os_id&#x60;. | [optional] 
**softwareId** | **Number** | ID программного обеспечения сервера. | [optional] 
**presetId** | **Number** | ID тарифа сервера. Нельзя передавать вместе с ключом &#x60;configurator&#x60;. | [optional] 
**bandwidth** | **Number** | Пропускная способность тарифа. Доступные значения от 100 до 1000 с шагом 100. | [optional] 
**name** | **String** | Имя облачного сервера. Максимальная длина — 255 символов, имя должно быть уникальным. | 
**avatarId** | **String** | ID аватара сервера. | [optional] 
**comment** | **String** | Комментарий к облачному серверу. Максимальная длина — 255 символов. | [optional] 
**sshKeysIds** | **[Number]** | Список SSH-ключей. | [optional] 
**isLocalNetwork** | **Boolean** | Локальная сеть. | [optional] 
**network** | [**CreateServerNetwork**](CreateServerNetwork.md) |  | [optional] 
**cloudInit** | **String** | Cloud-init скрипт | [optional] 
**availabilityZone** | [**AvailabilityZone**](AvailabilityZone.md) |  | [optional] 


