# TimewebCloudApi.ChatListMetrics

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**totalReactions** | **Number** | Количество чатов с учётом фильтра &#x60;response_time_ranges&#x60; (без учёта &#x60;reaction_type&#x60;) | 
**totalTime** | **Number** | Количество чатов с учётом фильтра &#x60;reaction_type&#x60; (без учёта &#x60;response_time_ranges&#x60;) | 
**withLikes** | **Number** | Чатов хотя бы с одной положительной оценкой | 
**withDislikes** | **Number** | Чатов хотя бы с одной отрицательной оценкой | 
**withAny** | **Number** | Чатов хотя бы с одной оценкой | 
**responseTimeGroupsReactions** | **{String: Number}** | Количество чатов по среднему времени ответа (в секундах) с учётом фильтра &#x60;response_time_ranges&#x60; | 
**responseTimeGroupsTime** | **{String: Number}** | Количество чатов по среднему времени ответа (в секундах) с учётом фильтра &#x60;reaction_type&#x60; | 


