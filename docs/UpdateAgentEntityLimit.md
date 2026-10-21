# TimewebCloudApi.UpdateAgentEntityLimit

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**limit** | **Number** | Лимит в токенах за период. Не действует, если задан &#x60;money_limit&#x60;. &#x60;0&#x60; — запрещены все запросы. | [optional] 
**moneyLimit** | **Number** | Лимит расходов за период в валюте аккаунта, до 8 знаков после запятой. Приоритетнее &#x60;limit&#x60;. &#x60;0&#x60; — запрещены все запросы. &#x60;null&#x60; — снять денежный лимит (только вместе с &#x60;limit&#x60;). | [optional] 


