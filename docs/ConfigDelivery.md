# TimewebCloudApi.ConfigDelivery

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**http3** | **Boolean** | Раздавать контент по HTTP/3 (QUIC). | [optional] 
**gzip** | **Boolean** | Сжимать ответы алгоритмом gzip. | [optional] 
**largeFiles** | **Boolean** | Режим раздачи больших файлов. | [optional] 
**sliceSize** | **Number** | Размер слайса в мегабайтах — файл забирается с источника и кэшируется частями такого размера. &#x60;null&#x60; — не использовать слайсинг. | [optional] 
**imageOptimization** | **Boolean** | Оптимизировать изображения на лету. | [optional] 
**packaging** | [**ConfigDeliveryPackaging**](ConfigDeliveryPackaging.md) |  | [optional] 


