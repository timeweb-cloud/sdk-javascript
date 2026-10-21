# TimewebCloudApi.InitializeResult

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**protocolVersion** | **String** | Версия протокола: запрошенная клиентом, если сервер её поддерживает, иначе &#x60;2025-11-25&#x60; | 
**capabilities** | **{String: Object}** | Возможности сервера | 
**serverInfo** | [**InitializeResultServerInfo**](InitializeResultServerInfo.md) |  | 
**instructions** | **String** | Правила для модели: какой инструмент на какой вопрос отвечает. MCP-клиенты передают их модели автоматически | [optional] 


