# TimewebCloudApi.InstallTool

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**templateId** | **Number** | ID шаблона маркетплейса | 
**name** | **String** | Своё название инструмента. Если не задано, используется название шаблона | [optional] 
**description** | **String** | Своё описание инструмента. Если не задано, используется описание шаблона | [optional] 
**configValues** | **{String: String}** | Значения полей из &#x60;config_schema&#x60; шаблона: ключ — &#x60;fields[].key&#x60;, значение — строка. Поля с &#x60;required: true&#x60; обязательны | [optional] 
**authData** | [**ToolAuthData**](ToolAuthData.md) |  | [optional] 


