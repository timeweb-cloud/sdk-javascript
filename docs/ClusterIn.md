# TimewebCloudApi.ClusterIn

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **String** | Название кластера | 
**description** | **String** | Описание кластера | [optional] [default to &#39;&#39;]
**ha** | **Boolean** | Описание появится позднее | 
**k8sVersion** | **String** | Версия Kubernetes | 
**networkDriver** | **String** | Тип используемого сетевого драйвера в кластере | 
**ingress** | **Boolean** | Логическое значение, которое показывает, использовать ли Ingress в кластере | 
**presetId** | **Number** | Идентификатор тарифа мастер-ноды | 
**workerGroups** | [**[NodeGroupIn]**](NodeGroupIn.md) | Группы воркеров в кластере | [optional] 


