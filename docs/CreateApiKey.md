# TimewebCloudApi.CreateApiKey

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **String** | Имя, установленное для токена. | 
**expire** | **Date** | Значение времени, указанное в комбинированном формате даты и времени ISO8601, которое представляет, когда истекает токен. | [optional] 
**isAbleToDelete** | **Boolean** | Это логическое значение, которое показывает, можно ли удалять управляемые сервисы при помощи данного токена без подтверждения через Телеграм, когда это подтверждение включено. | [optional] 
**roles** | **[String]** | Роли, которые могут быть назначены токену. | [optional] 
**projects** | **[Number]** | Список идентификаторов проектов, к которым привязан токен. Если передан null - доступ к проектам не ограничен. | [optional] 



## Enum: [RolesEnum]


* `servers:read` (value: `"servers:read"`)

* `servers:write` (value: `"servers:write"`)

* `databases:read` (value: `"databases:read"`)

* `databases:write` (value: `"databases:write"`)

* `balancers:read` (value: `"balancers:read"`)

* `balancers:write` (value: `"balancers:write"`)

* `storages:read` (value: `"storages:read"`)

* `storages:write` (value: `"storages:write"`)

* `dedicated:read` (value: `"dedicated:read"`)

* `dedicated:write` (value: `"dedicated:write"`)

* `clusters:read` (value: `"clusters:read"`)

* `clusters:write` (value: `"clusters:write"`)

* `vpc:read` (value: `"vpc:read"`)

* `vpc:write` (value: `"vpc:write"`)

* `floating-ips:read` (value: `"floating-ips:read"`)

* `floating-ips:write` (value: `"floating-ips:write"`)

* `domains:read` (value: `"domains:read"`)

* `domains:write` (value: `"domains:write"`)

* `administrators:write` (value: `"administrators:write"`)

* `firewall:read` (value: `"firewall:read"`)

* `firewall:read` (value: `"firewall:read"`)

* `finances:write` (value: `"finances:write"`)

* `support:read` (value: `"support:read"`)

* `support:write` (value: `"support:write"`)

* `vpn:read` (value: `"vpn:read"`)

* `vpn:write` (value: `"vpn:write"`)

* `mail:read` (value: `"mail:read"`)

* `mail:write` (value: `"mail:write"`)

* `apps:read` (value: `"apps:read"`)

* `apps:write` (value: `"apps:write"`)

* `network-drives:read` (value: `"network-drives:read"`)

* `network-drives:write` (value: `"network-drives:write"`)




