# TimewebCloudApi.FirewallRule

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **String** | ID правила. | 
**description** | **String** | Описание правила. | 
**direction** | [**FirewallRuleDirection**](FirewallRuleDirection.md) |  | 
**protocol** | [**FirewallRuleProtocol**](FirewallRuleProtocol.md) |  | 
**port** | **String** | Порт или диапазон портов, в случае tcp или udp. | [optional] 
**cidr** | **String** | Сетевой адрес или подсеть. Поддерживаются протоколы IPv4  и IPv6. | [optional] 
**groupId** | **String** | ID группы правил. | 


