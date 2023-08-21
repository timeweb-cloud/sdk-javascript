# TimewebCloudApi.S3Object

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**key** | **String** | Название файла или папки. | [optional] 
**lastModified** | **Date** | Значение времени, указанное в комбинированном формате даты и времени ISO8601, которое представляет, когда была сделана последняя модификация файла или папки. | [optional] 
**etag** | **String** | Тег. | [optional] 
**size** | **Number** | Размер (в байтах) файла или папки. | [optional] 
**storageClass** | **String** | Класс хранилища. | [optional] 
**checksumAlgorithm** | **[String]** | Алгоритм | [optional] 
**owner** | [**S3ObjectOwner**](S3ObjectOwner.md) |  | [optional] 
**type** | **String** | Тип (файл или папка). | 



## Enum: TypeEnum


* `file` (value: `"file"`)

* `directory` (value: `"directory"`)




