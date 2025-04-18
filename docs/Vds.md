# TimewebCloudApi.Vds

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** | ID для каждого экземпляра сервера. Автоматически генерируется при создании. | 
**name** | **String** | Удобочитаемое имя, установленное для сервера. | 
**comment** | **String** | Комментарий к серверу. | 
**createdAt** | **String** | Дата создания сервера в формате ISO8061. | 
**os** | [**VdsOs**](VdsOs.md) |  | 
**software** | [**VdsSoftware**](VdsSoftware.md) |  | 
**presetId** | **Number** | ID тарифа сервера. | 
**location** | **String** | Локация сервера. | 
**configuratorId** | **Number** | ID конфигуратора сервера. | 
**bootMode** | **String** | Режим загрузки ОС сервера. | 
**status** | **String** | Статус сервера. | 
**startAt** | **Date** | Значение времени, указанное в комбинированном формате даты и времени ISO8601, которое представляет, когда был запущен сервер. | 
**isDdosGuard** | **Boolean** | Это логическое значение, которое показывает, включена ли защита от DDoS у данного сервера. | 
**isMasterSsh** | **Boolean** | Это логическое значение, которое показывает, доступно ли подключение по SSH для поддержки. | 
**isDedicatedCpu** | **Boolean** | Это логическое значение, которое показывает, является ли CPU выделенным. | 
**gpu** | **Number** | Количество видеокарт сервера. | 
**cpu** | **Number** | Количество ядер процессора сервера. | 
**cpuFrequency** | **String** | Частота ядер процессора сервера. | 
**ram** | **Number** | Размер (в Мб) ОЗУ сервера. | 
**disks** | [**[VdsDisksInner]**](VdsDisksInner.md) | Список дисков сервера. | 
**avatarId** | **String** | ID аватара сервера. | 
**avatarLink** | **String** | Ссылка на аватар сервера. | 
**vncPass** | **String** | Пароль от VNC. | 
**rootPass** | **String** | Пароль root сервера или пароль Администратора для серверов Windows. | 
**image** | [**VdsImage**](VdsImage.md) |  | 
**networks** | [**[VdsNetworksInner]**](VdsNetworksInner.md) | Список сетей сервера. | 
**cloudInit** | **String** | Cloud-init скрипт. | 
**isQemuAgent** | **Boolean** | Это логическое значение, которое показывает, включен ли QEMU-agent на сервере. | 
**availabilityZone** | [**AvailabilityZone**](AvailabilityZone.md) |  | 



## Enum: LocationEnum


* `ru-1` (value: `"ru-1"`)

* `ru-2` (value: `"ru-2"`)

* `ru-3` (value: `"ru-3"`)

* `pl-1` (value: `"pl-1"`)

* `kz-1` (value: `"kz-1"`)

* `nl-1` (value: `"nl-1"`)





## Enum: BootModeEnum


* `std` (value: `"std"`)

* `single` (value: `"single"`)

* `cd` (value: `"cd"`)





## Enum: StatusEnum


* `installing` (value: `"installing"`)

* `software_install` (value: `"software_install"`)

* `reinstalling` (value: `"reinstalling"`)

* `on` (value: `"on"`)

* `off` (value: `"off"`)

* `turning_on` (value: `"turning_on"`)

* `turning_off` (value: `"turning_off"`)

* `hard_turning_off` (value: `"hard_turning_off"`)

* `rebooting` (value: `"rebooting"`)

* `hard_rebooting` (value: `"hard_rebooting"`)

* `removing` (value: `"removing"`)

* `removed` (value: `"removed"`)

* `cloning` (value: `"cloning"`)

* `transfer` (value: `"transfer"`)

* `blocked` (value: `"blocked"`)

* `configuring` (value: `"configuring"`)

* `no_paid` (value: `"no_paid"`)

* `permanent_blocked` (value: `"permanent_blocked"`)




