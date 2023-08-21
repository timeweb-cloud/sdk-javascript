# TimewebCloudApi.ClusterOut

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** | Уникальный идентификатор кластера | 
**name** | **String** | Название | 
**createdAt** | **Date** | Дата и время создания кластера в формате ISO8601 | 
**status** | **String** | Статус | 
**description** | **String** | Описание | 
**ha** | **Boolean** | Описание появится позже | 
**k8sVersion** | **String** | Версия Kubernetes | 
**networkDriver** | **String** | Используемый сетевой драйвер | 
**ingress** | **Boolean** | Логическое значение, показывающее, включен ли Ingress | 
**presetId** | **Number** | Идентификатор тарифа мастер-ноды | 
**cpu** | **Number** | Общее количество ядер | [optional] [default to 0]
**ram** | **Number** | Общее количество памяти | [optional] [default to 0]
**disk** | **Number** | Общее дисковое пространство | [optional] [default to 0]


