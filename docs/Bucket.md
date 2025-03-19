# TimewebCloudApi.Bucket

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** | ID для каждого экземпляра хранилища. Автоматически генерируется при создании. | 
**name** | **String** | Удобочитаемое имя, установленное для хранилища. | 
**description** | **String** | Комментарий к хранилищу. | [optional] 
**diskStats** | [**BucketDiskStats**](BucketDiskStats.md) |  | 
**type** | **String** | Тип хранилища. | 
**presetId** | **Number** | ID тарифа хранилища. | 
**status** | **String** | Статус хранилища. | 
**objectAmount** | **Number** | Количество файлов в хранилище. | 
**location** | **String** | Регион хранилища. | 
**hostname** | **String** | Адрес хранилища для подключения. | 
**accessKey** | **String** | Ключ доступа от хранилища. | 
**secretKey** | **String** | Секретный ключ доступа от хранилища. | 



## Enum: TypeEnum


* `private` (value: `"private"`)

* `public` (value: `"public"`)





## Enum: StatusEnum


* `no_paid` (value: `"no_paid"`)

* `created` (value: `"created"`)

* `transfer` (value: `"transfer"`)




