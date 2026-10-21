# TimewebCloudApi.ToolAuthDataParams

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**token** | **String** | Токен для заголовка &#x60;Authorization: Bearer&#x60; (для &#x60;bearer&#x60;). В ответах заменён на &#x60;********&#x60; | [optional] 
**headers** | **{String: String}** | HTTP-заголовки, которые передаются MCP-серверу (для &#x60;custom_headers&#x60;). В ответах значения заменены на &#x60;********&#x60; | [optional] 
**clientId** | **String** | ID OAuth2-клиента (для &#x60;oauth2&#x60;). Не нужен, если сервер поддерживает динамическую регистрацию клиентов | [optional] 
**clientSecret** | **String** | Секрет OAuth2-клиента (для &#x60;oauth2&#x60;). В ответах заменён на &#x60;********&#x60; | [optional] 
**authorizationUrl** | **String** | Адрес страницы авторизации провайдера (для &#x60;oauth2&#x60;). Если не задан, определяется по метаданным сервера | [optional] 
**tokenUrl** | **String** | Адрес получения токенов провайдера (для &#x60;oauth2&#x60;). Если не задан, определяется по метаданным сервера | [optional] 
**registrationUrl** | **String** | Адрес динамической регистрации клиента (для &#x60;oauth2&#x60;) | [optional] 
**scopes** | **[String]** | Запрашиваемые права (для &#x60;oauth2&#x60;). Если не заданы, берутся из метаданных сервера | [optional] 


