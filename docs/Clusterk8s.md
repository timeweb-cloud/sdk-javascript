# TimewebCloudApi.Clusterk8s

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** | Уникальный идентификатор для каждого экземпляра крастера. Автоматически генерируется при создании. | 
**name** | **String** | Удобочитаемое имя, установленное для кластера. | 
**createdAt** | **Date** | Значение времени, указанное в комбинированном формате даты и времени ISO8601, которое представляет, когда был создан кластер. | 
**status** | **String** | Статус кластера. | 
**description** | **String** | Описание кластера. | 
**ha** | **Boolean** | Описание появится позднее. | 
**k8sVersion** | **String** | Версия k8s. | 
**networkDriver** | **String** | Описание появится позднее. | 
**ingress** | **Boolean** | Описание появится позднее. | 
**cpu** | **Number** | Количество ядер процессора кластера. | 
**ram** | **Number** | Количество (в Мб) оперативной памяти кластера. | 
**disk** | **Number** | Размер (в Гб) диска кластера. | 
**presetId** | **Number** | Тип сервиса кластера. | 



## Enum: StatusEnum


* `installing` (value: `"installing"`)

* `provisioning` (value: `"provisioning"`)

* `active` (value: `"active"`)

* `unpaid` (value: `"unpaid"`)




