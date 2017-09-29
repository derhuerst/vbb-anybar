# *vbb-anybar* ⏱

**Let the status bar show you when to catch the train.**

[![npm version](https://img.shields.io/npm/v/vbb-anybar.svg)](https://www.npmjs.com/package/vbb-anybar)
[![dependency status](https://img.shields.io/david/derhuerst/vbb-anybar.svg)](https://david-dm.org/derhuerst/vbb-anybar)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/vbb-anybar.svg)
[![gitter channel](https://badges.gitter.im/derhuerst/vbb-rest.svg)](https://gitter.im/derhuerst/vbb-rest)


## Installing

```shell
npm install -g vbb-anybar
```


## Usage

*This guide assumes you have the [AnyBar app](https://github.com/tonsky/AnyBar#anybar-os-x-menubar-status-indicator) installed.*

`vbb-anybar` needs the station where you want to catch the train and the direction, which is just the next station your train will pass. You can find them using [`vbb-stations-cli`](https://github.com/derhuerst/vbb-stations-cli#vbb-stations-cli). To set them, run the following:

```shell
vbb-anybar init <station-id> <next-station-id>
```

From now on, if you call `vbb-anybar` (without any arguments), it will talk to the AnyBar app and set a color that tells you when to leave. You would usually run this every few seconds.


## API

```
Usage:
    vbb-anybar
    vbb-anybar init <station-id> <next-station-id>
```


## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/derhuerst/vbb-anybar/issues).
