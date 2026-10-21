# TimewebCloudApi.DocumentStatusInfoDetails

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**startedAt** | **Date** | &#x60;indexing&#x60;: время начала индексации | [optional] 
**currentStage** | **String** | &#x60;indexing&#x60;: текущий этап | [optional] 
**progress** | **Number** | &#x60;indexing&#x60;: прогресс в процентах | [optional] 
**indexingDurationMs** | **Number** | &#x60;indexed&#x60;: длительность индексации в миллисекундах | [optional] 
**tokensUsed** | **Number** | &#x60;indexed&#x60;: израсходовано токенов | [optional] 
**tokensEstimated** | **Number** | &#x60;indexed&#x60;: оценка количества токенов перед индексацией | [optional] 
**chunksCount** | **Number** | &#x60;indexed&#x60;: количество фрагментов, на которые разбит документ | [optional] 
**needed** | **Number** | &#x60;INSUFFICIENT_TOKENS&#x60;: сколько токенов нужно | [optional] 
**available** | **Number** | &#x60;INSUFFICIENT_TOKENS&#x60;: сколько токенов доступно | [optional] 
**estimated** | **Number** | &#x60;INSUFFICIENT_TOKENS&#x60;: оценка без запаса | [optional] 
**balance** | **Number** | &#x60;CRITICAL_BALANCE&#x60;, &#x60;NEGATIVE_BALANCE&#x60;: текущий остаток токенов | [optional] 
**minRequired** | **Number** | &#x60;CRITICAL_BALANCE&#x60;: минимально необходимый остаток | [optional] 


