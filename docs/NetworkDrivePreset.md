# TimewebCloudApi.NetworkDrivePreset

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** | ID тарифа. | 
**costPerGb** | **Number** | Стоимость тарифа сетевого диска. | 
**min** | **Number** | Минимальный размер диска (в Гб). | 
**max** | **Number** | Максимальный размер диска (в Гб). | 
**step** | **Number** | Размер шага диска | 
**type** | **String** | Тип сетевого диска. | 
**read** | [**NetworkDrivePresetRead**](NetworkDrivePresetRead.md) |  | 
**write** | [**NetworkDrivePresetWrite**](NetworkDrivePresetWrite.md) |  | 



## Enum: TypeEnum


* `nvme` (value: `"nvme"`)

* `hdd` (value: `"hdd"`)




